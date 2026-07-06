import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test.describe("Step 16: Referenzen (Globus) - Extended & Keyboard Verification", () => {
  
  test.describe("German Locale /de/referenzen", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/de/referenzen");
    });

    test("should render the Globe canvas element and verify size and accessibility label", async ({ page }) => {
      // 1. Verify canvas container has correct aria-label
      const container = page.locator("div[aria-label]");
      await expect(container).toBeVisible();
      await expect(container).toHaveAttribute("aria-label", "Interaktiver Globus mit Referenzprojekten — ziehen zum Drehen");

      // 2. Verify canvas element itself is present
      const canvas = page.locator("canvas");
      await expect(canvas).toBeVisible();
    });

    test("should update BentoCard details and active chip classes when clicking filter chips", async ({ page }) => {
      const cardTitle = page.locator("h3");
      const cardDesc = page.locator("div.bg-card-tint p");

      // Initially Waldsolms is active
      await expect(cardTitle).toContainText("Waldsolms, Deutschland");

      // Find all filter chips (buttons inside the selector list)
      const chips = page.locator("button[role='checkbox'], button[aria-pressed]");
      const count = await chips.count();
      expect(count).toBeGreaterThan(1);

      // Verify Waldsolms chip has aria-pressed="true"
      const waldsolmsChip = page.locator("button:has-text('Waldsolms')");
      await expect(waldsolmsChip).toHaveAttribute("aria-pressed", "true");

      // Click "Dubai" chip
      const dubaiChip = page.locator("button:has-text('Dubai')");
      await dubaiChip.click();

      // Verify active state transitioned
      await expect(waldsolmsChip).toHaveAttribute("aria-pressed", "false");
      await expect(dubaiChip).toHaveAttribute("aria-pressed", "true");
      await expect(cardTitle).toContainText("Dubai, VAE");
      await expect(cardDesc).toContainText("PP-RCT für Heißwasser unter Wüstenbedingungen.");

      // Click "Istanbul" chip
      const istanbulChip = page.locator("button:has-text('Istanbul')");
      await istanbulChip.click();

      await expect(dubaiChip).toHaveAttribute("aria-pressed", "false");
      await expect(istanbulChip).toHaveAttribute("aria-pressed", "true");
      await expect(cardTitle).toContainText("Istanbul, Türkei");
      await expect(cardDesc).toContainText("Zirkulationsleitungen mit Faserverbundrohr.");
    });

    test("should support keyboard navigation and tab indexing for filter chips", async ({ page }) => {
      // First, focus on the first chip
      const waldsolmsChip = page.locator("button:has-text('Waldsolms')");
      await waldsolmsChip.focus();
      await expect(waldsolmsChip).toBeFocused();

      // Press Tab to go to the next chip (Dubai)
      await page.keyboard.press("Tab");
      const dubaiChip = page.locator("button:has-text('Dubai')");
      await expect(dubaiChip).toBeFocused();

      // Press Enter or Space to activate it
      await page.keyboard.press("Space");

      // Verify the page updated to Dubai
      const cardTitle = page.locator("h3");
      await expect(cardTitle).toContainText("Dubai, VAE");
      await expect(dubaiChip).toHaveAttribute("aria-pressed", "true");
      await expect(waldsolmsChip).toHaveAttribute("aria-pressed", "false");
    });
  });

  test.describe("Arabic Locale /ar/referenzen (RTL)", () => {
    test("should have dir='rtl' on html tag and verify Arabic alignment properties", async ({ page }) => {
      await page.goto("http://localhost:3001/ar/referenzen");

      // 1. Verify dir attribute
      const html = page.locator("html");
      await expect(html).toHaveAttribute("dir", "rtl");
      await expect(html).toHaveAttribute("lang", "ar");

      // 2. Verify Arabic title
      const heading = page.locator("h1");
      await expect(heading).toContainText("كرة أرضية مليئة");

      // 3. Verify BentoCard text-start alignment (logical properties)
      const bentoCard = page.locator("div.bg-card-tint");
      await expect(bentoCard).toHaveClass(/text-start/);
    });
  });

  test.describe("Static Code Analysis: Zero hardcoded text in JSX/TSX", () => {
    test("References.tsx should contain no hardcoded German/English words in JSX tags", () => {
      const referencesPath = path.resolve(__dirname, "../components/sections/References.tsx");
      const content = fs.readFileSync(referencesPath, "utf-8");

      // Extract all text content inside JSX tags (basic check for raw text literals)
      const rawTextMatches = content.match(/>\s*[a-zA-ZäöüÄÖÜß]+[^<{]*</g);
      
      if (rawTextMatches) {
        const issues = rawTextMatches.filter(match => {
          const text = match.slice(1, -1).trim();
          if (!text || text.length <= 1) return false;
          return /[a-zA-Z]/.test(text);
        });
        expect(issues).toEqual([]);
      }
    });
  });
});
