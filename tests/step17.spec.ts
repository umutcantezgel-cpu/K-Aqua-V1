import { test, expect } from "@playwright/test";

test.describe("Step 17: Geo: Märkte-Hub (360°-Welt)", () => {
  
  test.describe("German Locale /de/maerkte", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/de/maerkte");
    });

    test("should load the German page successfully with localized header", async ({ page }) => {
      const heading = page.locator("h1");
      await expect(heading).toContainText("Eine Welt voller");
      await expect(heading).toContainText("Märkten.");

      // Check lead text contains numbers
      const lead = page.locator("p.text-lead");
      await expect(lead).toContainText("28 Märkte");
    });

    test("should have the default 'Alle' chip active and show the correct counts on region chips", async ({ page }) => {
      // Find all region filter chips
      const allChip = page.locator("button[aria-pressed='true']");
      await expect(allChip).toContainText("Alle (28)");

      // Check count labels on other chips
      const dachChip = page.locator("button:has-text('DACH')");
      await expect(dachChip).toContainText("DACH (6)");

      const europaChip = page.locator("button:has-text('Europa')");
      await expect(europaChip).toContainText("Europa (5)");

      const nahostChip = page.locator("button:has-text('Naher & Mittlerer Osten')");
      await expect(nahostChip).toContainText("Naher & Mittlerer Osten (12)");

      const globalChip = page.locator("button:has-text('Afrika & Asien-Pazifik')");
      await expect(globalChip).toContainText("Afrika & Asien-Pazifik (5)");
    });

    test("should filter list items when clicking a region chip", async ({ page }) => {
      // Initially, we should see 28 list items
      const listItems = page.locator("a[href^='/de/maerkte/']");
      const initialCount = await listItems.count();
      expect(initialCount).toBe(28);

      // Click the Europa chip
      const europaChip = page.locator("button:has-text('Europa')");
      await europaChip.click();

      // Now we should see only 5 items
      const filteredCount = await listItems.count();
      expect(filteredCount).toBe(5);

      // Check some cities visibility
      const londonItem = page.locator("a[href='/de/maerkte/london']");
      await expect(londonItem).toBeVisible();
      const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
      await expect(frankfurtItem).not.toBeVisible();
    });

    test("should update the tooltip when hovering over a list item", async ({ page }) => {
      // Hover over Frankfurt item
      const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
      await frankfurtItem.hover();

      // Tooltip card should appear and contain details
      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator("strong")).toContainText("Frankfurt am Main");
      await expect(tooltip).toContainText("Deutschland");
      await expect(tooltip).toContainText("ab Werk Waldsolms");
    });

    test("should work with keyboard tab-navigation and focus styles", async ({ page }) => {
      // Focus on Frankfurt link
      const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
      await frankfurtItem.focus();
      await expect(frankfurtItem).toBeFocused();

      // Tooltip should update when focused via keyboard
      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator("strong")).toContainText("Frankfurt am Main");
    });

    test("should navigate to /maerkte/<slug> when clicking a list item", async ({ page }) => {
      const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
      await frankfurtItem.click();

      // It should navigate to /de/maerkte/frankfurt
      await expect(page).toHaveURL(/.*\/maerkte\/frankfurt/);
    });
  });

  test.describe("Arabic Locale /ar/maerkte (RTL)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/ar/maerkte");
    });

    test("should load Arabic page with RTL direction attribute", async ({ page }) => {
      const htmlDir = await page.getAttribute("html", "dir");
      expect(htmlDir).toBe("rtl");

      // Check Arabic headline
      const heading = page.locator("h1");
      await expect(heading).toContainText("عالم مليء");

      // Verify list item count in Arabic
      const listItems = page.locator("a[href^='/ar/maerkte/']");
      expect(await listItems.count()).toBe(28);
    });
  });
});
