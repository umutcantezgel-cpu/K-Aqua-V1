import { test, expect } from "@playwright/test";

test.describe("Step 16: Referenzen (Globus)", () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('k-aqua-cookie-consent', 'all');
      window.localStorage.setItem('cookie_essential', 'true');
      window.localStorage.setItem('cookie_analytics', 'true');
      window.localStorage.setItem('cookie_marketing', 'true');
    });
  });

  test.describe("German Locale /de/referenzen", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/de/referenzen");
    });

    test("should render the references page with default project detail card", async ({ page }) => {
      // Check for page title/headline
      const heading = page.locator("h1");
      await expect(heading).toContainText("Ein Globus voller");
      await expect(heading).toContainText("Projekte.");

      // Check default project (Waldsolms) details inside the Bento Card
      const cardTitle = page.locator("div.bg-card-tint h3");
      const cardDesc = page.locator("div.bg-card-tint p");
      
      await expect(cardTitle).toContainText("Waldsolms, Deutschland");
      await expect(cardDesc).toContainText("Stammwerk & Entwicklung — hier entsteht jedes K-Aqua-Rohr.");
    });

    test("should update the active project when clicking a selector chip", async ({ page }) => {
      // Find and click the Dubai chip (which should display VAE/Dubai)
      const dubaiChip = page.locator("button:has-text('Dubai')");
      await dubaiChip.click();

      // Card title and description should be updated
      const cardTitle = page.locator("div.bg-card-tint h3");
      const cardDesc = page.locator("div.bg-card-tint p");

      await expect(cardTitle).toContainText("Dubai, VAE");
      await expect(cardDesc).toContainText("PP-RCT für Heißwasser unter Wüstenbedingungen.");
    });
  });

  test.describe("English Locale /en/referenzen", () => {
    test("should render translated page and project details", async ({ page }) => {
      await page.goto("http://localhost:3001/en/referenzen");

      // Check headline
      const heading = page.locator("h1");
      await expect(heading).toContainText("A globe full of");
      await expect(heading).toContainText("projects.");

      // Check default project (Waldsolms) details in English
      const cardTitle = page.locator("div.bg-card-tint h3");
      const cardDesc = page.locator("div.bg-card-tint p");

      await expect(cardTitle).toContainText("Waldsolms, Germany");
      await expect(cardDesc).toContainText("Main plant & development — this is where every K-Aqua pipe is made.");
    });
  });

  test.describe("Arabic Locale /ar/referenzen (RTL)", () => {
    test("should render translated page and projects in Arabic", async ({ page }) => {
      await page.goto("http://localhost:3001/ar/referenzen");

      // Check Arabic headline
      const heading = page.locator("h1");
      await expect(heading).toContainText("كرة أرضية مليئة");
      await expect(heading).toContainText("بالمشاريع.");

      // Check default project in Arabic
      const cardTitle = page.locator("div.bg-card-tint h3");
      const cardDesc = page.locator("div.bg-card-tint p");

      await expect(cardTitle).toContainText("فالدسولمس، ألمانيا");
      await expect(cardDesc).toContainText("المصنع الرئيسي والتطوير — هنا يتم تصنيع كل أنبوب K-Aqua.");
    });
  });
});
