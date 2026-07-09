import { test, expect } from '@playwright/test';
import { spawn, ChildProcess } from 'child_process';
import path from 'path';

test.describe('Next.js Server Hydration Check', () => {
  let nextProcess: ChildProcess;
  const port = 3004;
  const baseUrl = `http://localhost:${port}`;

  test.beforeAll(async () => {
    // Start Next.js server on port 3003 directly using node
    const nextBin = path.resolve(__dirname, '../../node_modules/next/dist/bin/next');
    nextProcess = spawn('node', [nextBin, 'start', '-p', String(port)], {
      cwd: path.resolve(__dirname, '../../'),
      stdio: 'pipe',
      detached: true,
      env: { ...process.env, PORT: String(port) },
    });

    // Wait for the server to be ready
    await new Promise<void>((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          try {
            process.kill(-nextProcess.pid!, 'SIGKILL');
          } catch (e) {}
          reject(new Error('Next.js server failed to start within 30 seconds'));
        }
      }, 30000);

      nextProcess.stdout?.on('data', (data) => {
        const output = data.toString();
        console.log(`[Next.js stdout] ${output}`);
        if (output.includes('Ready') || output.includes('started') || output.includes('localhost:') || output.includes('0.0.0.0:')) {
          resolved = true;
          clearTimeout(timeout);
          resolve();
        }
      });

      nextProcess.stderr?.on('data', (data) => {
        console.error(`[Next.js stderr] ${data.toString()}`);
      });

      nextProcess.on('error', (err) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          reject(err);
        }
      });
    });

    // Wait extra seconds to ensure the port binding is fully complete and accepting connections
    await new Promise((r) => setTimeout(r, 2000));
  });

  test.afterAll(async () => {
    if (nextProcess && nextProcess.pid) {
      try {
        console.log(`Killing Next.js process group: ${nextProcess.pid}`);
        process.kill(-nextProcess.pid, 'SIGKILL');
      } catch (err) {
        console.error('Failed to kill Next.js process group:', err);
      }
      // Wait slightly for clean socket release
      await new Promise((r) => setTimeout(r, 1000));
    }
  });

  const locales = ['', '/de', '/en', '/ar'];

  for (const locale of locales) {
    test(`should load the homepage at '${locale || '/'}' without console or hydration errors`, async ({ page }) => {
      const consoleErrors: { type: string; text: string }[] = [];
      const pageErrors: Error[] = [];

      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error' || type === 'warning') {
          consoleErrors.push({ type, text });
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err);
      });

      const url = `${baseUrl}${locale}`;
      console.log(`Navigating to ${url}...`);
      const response = await page.goto(url, { waitUntil: 'networkidle' });
      expect(response?.status()).toBe(200);

      console.log(`Console outputs collected for ${locale || '/'}:`, consoleErrors);
      console.log(`Page errors collected for ${locale || '/'}:`, pageErrors);

      // Verify no page-level uncaught exceptions
      expect(pageErrors).toEqual([]);

      // Filter for actual critical hydration errors/warnings or uncaught exceptions in console
      const criticalErrors = consoleErrors.filter(({ type, text }) => {
        const lower = text.toLowerCase();
        
        // Match React hydration error warnings/errors or did not match
        const isHydrationMismatch = lower.includes('hydration') ||
                                    lower.includes('did not match') ||
                                    lower.includes('matching') ||
                                    lower.includes('text content did not match') ||
                                    lower.includes('server-side') ||
                                    lower.includes('client-side') ||
                                    lower.includes('react-dom');
        
        // If it's an error, check if it's a critical error (exclude minor browser things if any, but default to true)
        if (type === 'error') {
          return true;
        }

        // If it's a warning, flag if it is a hydration mismatch
        if (type === 'warning') {
          return isHydrationMismatch;
        }

        return false;
      });

      expect(criticalErrors).toEqual([]);
    });
  }
});
