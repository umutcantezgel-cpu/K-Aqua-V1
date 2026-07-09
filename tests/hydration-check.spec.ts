import { test, expect } from '@playwright/test';

test.describe('Initial Render & Hydration Verification', () => {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const pageErrors: Error[] = [];

  test.beforeEach(({ page }) => {
    consoleErrors.length = 0;
    consoleWarnings.length = 0;
    pageErrors.length = 0;

    page.on('console', (msg) => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(text);
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err);
    });
  });

  test('should render the homepage in German without console errors or hydration warnings', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/de');
    expect(response?.status()).toBe(200);

    // Wait for network idle to ensure everything has run
    await page.waitForLoadState('networkidle');

    // Print gathered console outputs for logging/verification
    if (consoleErrors.length > 0) {
      console.log('Gathered console errors (DE):', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.error('Gathered page errors (DE):', pageErrors);
    }

    // Filter console errors for React hydration warnings / errors
    const hydrationErrors = consoleErrors.filter(msg =>
      msg.toLowerCase().includes('hydration') ||
      msg.toLowerCase().includes('react-dom') ||
      msg.toLowerCase().includes('did not match') ||
      msg.toLowerCase().includes('text content did not match')
    );

    expect(pageErrors).toEqual([]);
    expect(hydrationErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('should render the homepage in English without console errors or hydration warnings', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/en');
    expect(response?.status()).toBe(200);

    await page.waitForLoadState('networkidle');

    if (consoleErrors.length > 0) {
      console.log('Gathered console errors (EN):', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.error('Gathered page errors (EN):', pageErrors);
    }

    const hydrationErrors = consoleErrors.filter(msg =>
      msg.toLowerCase().includes('hydration') ||
      msg.toLowerCase().includes('react-dom') ||
      msg.toLowerCase().includes('did not match') ||
      msg.toLowerCase().includes('text content did not match')
    );

    expect(pageErrors).toEqual([]);
    expect(hydrationErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test('should render the homepage in Arabic without console errors or hydration warnings', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/ar');
    expect(response?.status()).toBe(200);

    await page.waitForLoadState('networkidle');

    if (consoleErrors.length > 0) {
      console.log('Gathered console errors (AR):', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.error('Gathered page errors (AR):', pageErrors);
    }

    const hydrationErrors = consoleErrors.filter(msg =>
      msg.toLowerCase().includes('hydration') ||
      msg.toLowerCase().includes('react-dom') ||
      msg.toLowerCase().includes('did not match') ||
      msg.toLowerCase().includes('text content did not match')
    );

    expect(pageErrors).toEqual([]);
    expect(hydrationErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
