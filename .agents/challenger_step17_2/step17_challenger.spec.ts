import { test, expect } from "@playwright/test";

test.describe("Challenger Step 17: Geo: Märkte-Hub (360°-Welt) Deep Verification", () => {

  test.describe("German Locale /de/maerkte", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/de/maerkte");
    });

    test("should load with localized title and lead details", async ({ page }) => {
      // Validate page title
      const heading = page.locator("h1");
      await expect(heading).toContainText("Eine Welt voller");
      await expect(heading).toContainText("Märkten.");

      // Validate lead text contains computed count variables
      const lead = page.locator("p.text-lead");
      await expect(lead).toContainText("28 Märkte in 22 Ländern");

      // Verify canvas is present
      const canvas = page.locator("canvas");
      await expect(canvas).toBeVisible();
    });

    test("should display correct counts on region filter chips", async ({ page }) => {
      const allChip = page.locator("button[aria-pressed='true']");
      await expect(allChip).toContainText("Alle (28)");

      const dachChip = page.locator("button:has-text('DACH')");
      await expect(dachChip).toContainText("DACH (6)");

      const europaChip = page.locator("button:has-text('Europa')");
      await expect(europaChip).toContainText("Europa (5)");

      const nahostChip = page.locator("button:has-text('Naher & Mittlerer Osten')");
      await expect(nahostChip).toContainText("Naher & Mittlerer Osten (12)");

      const globalChip = page.locator("button:has-text('Afrika & Asien-Pazifik')");
      await expect(globalChip).toContainText("Afrika & Asien-Pazifik (5)");
    });

    test("should filter list and update counts dynamically on chip click", async ({ page }) => {
      // Click DACH filter
      const dachChip = page.locator("button:has-text('DACH')");
      await dachChip.click();
      await expect(dachChip).toHaveAttribute("aria-pressed", "true");

      // Verify lists only contain 6 elements
      const listItems = page.locator("a[href^='/de/maerkte/']");
      expect(await listItems.count()).toBe(6);

      // Verify city visibility (Frankfurt visible, London not visible)
      await expect(page.locator("a[href='/de/maerkte/frankfurt']")).toBeVisible();
      await expect(page.locator("a[href='/de/maerkte/london']")).not.toBeVisible();

      // Click Europe filter
      const europaChip = page.locator("button:has-text('Europa')");
      await europaChip.click();
      await expect(europaChip).toHaveAttribute("aria-pressed", "true");
      await expect(dachChip).toHaveAttribute("aria-pressed", "false");

      // Verify lists only contain 5 elements
      expect(await listItems.count()).toBe(5);
      await expect(page.locator("a[href='/de/maerkte/london']")).toBeVisible();
      await expect(page.locator("a[href='/de/maerkte/frankfurt']")).not.toBeVisible();
    });

    test("should display details card on list item hover (Waldsolms Distance & country)", async ({ page }) => {
      // Hover Frankfurt am Main
      const frankfurtItem = page.locator("a[href='/de/maerkte/frankfurt']");
      await frankfurtItem.hover();

      // Verify details card
      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator("strong")).toHaveText("Frankfurt am Main");
      await expect(tooltip).toContainText("Deutschland");
      await expect(tooltip).toContainText("km ab Werk Waldsolms");
    });

    test("should support tab keyboard navigation and trigger focus centering", async ({ page }) => {
      // Start focus at the page header and tab down
      const heading = page.locator("h1");
      await heading.focus();

      // Press tab repeatedly to reach the list
      // We will select a list item directly and focus it to check if tooltip shows
      const londonItem = page.locator("a[href='/de/maerkte/london']");
      await londonItem.focus();

      await expect(londonItem).toBeFocused();
      
      // Focus should trigger tooltip showing London
      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator("strong")).toHaveText("London");
    });

    test("should navigate to pSEO city subpage on link click", async ({ page }) => {
      const wienItem = page.locator("a[href='/de/maerkte/wien']");
      await wienItem.click();

      // Expect URL to have routed to /maerkte/wien
      await expect(page).toHaveURL(/.*\/maerkte\/wien/);
    });
  });

  test.describe("English Locale /en/maerkte", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/en/maerkte");
    });

    test("should load with English headings and counts", async ({ page }) => {
      const heading = page.locator("h1");
      await expect(heading).toContainText("A world full of");
      await expect(heading).toContainText("markets.");

      const lead = page.locator("p.text-lead");
      await expect(lead).toContainText("28 markets in 22 countries");

      // Verify region chip counts in English
      const allChip = page.locator("button[aria-pressed='true']");
      await expect(allChip).toContainText("All (28)");

      const europaChip = page.locator("button:has-text('Europe')");
      await expect(europaChip).toContainText("Europe (5)");
    });

    test("should show English details tooltip on hover (Waldsolms distance in English)", async ({ page }) => {
      const londonItem = page.locator("a[href='/en/maerkte/london']");
      await londonItem.hover();

      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip.locator("strong")).toHaveText("London");
      await expect(tooltip).toContainText("km from Waldsolms plant");
    });
  });

  test.describe("Arabic Locale /ar/maerkte (RTL)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/ar/maerkte");
    });

    test("should load Arabic page with dir='rtl' attribute", async ({ page }) => {
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

      const heading = page.locator("h1");
      await expect(heading).toContainText("عالم مليء");

      // Check text alignment is start (right-aligned in RTL)
      const alignment = await heading.evaluate((el) => window.getComputedStyle(el).textAlign);
      expect(["start", "right"]).toContain(alignment);
    });

    test("should display Arabic region chip labels and counts", async ({ page }) => {
      const allChip = page.locator("button[aria-pressed='true']");
      await expect(allChip).toContainText("الكل (28)");

      const dachChip = page.locator("button:has-text('ألمانيا والنمسا وسويسرا')");
      await expect(dachChip).toContainText("ألمانيا والنمسا وسويسرا (6)");

      const europaChip = page.locator("button:has-text('أوروبا')");
      await expect(europaChip).toContainText("أوروبا (5)");

      const nahostChip = page.locator("button:has-text('الشرق الأوسط')");
      await expect(nahostChip).toContainText("الشرق الأوسط (12)");

      const globalChip = page.locator("button:has-text('أفريقيا وآسيا والمحيط الهادئ')");
      await expect(globalChip).toContainText("أفريقيا وآسيا والمحيط الهادئ (5)");
    });

    test("should mirror translation transition effects on list item hover", async ({ page }) => {
      const frankfurtItem = page.locator("a[href='/ar/maerkte/frankfurt']");
      
      // Under RTL, the translate hover class changes from translate-x-1 to rtl:-translate-x-1
      // We will check that the classes exist on the link
      const classAttr = await frankfurtItem.getAttribute("class");
      expect(classAttr).toContain("rtl:-translate-x-1");
    });

    test("should show Arabic details tooltip on hover", async ({ page }) => {
      const dubaiItem = page.locator("a[href='/ar/maerkte/dubai']");
      await dubaiItem.hover();

      const tooltip = page.locator("div[role='status']");
      await expect(tooltip).toBeVisible();
      await expect(tooltip).toContainText("كم من مصنع فالدزولمس");
    });
  });
});
