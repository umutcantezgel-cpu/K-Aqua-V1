import { test, expect } from "@playwright/test";

test.describe("Step 18: Geo City Pages (pSEO)", () => {
  
  test.describe("German Locale /de/maerkte/dubai", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/de/maerkte/dubai");
    });

    test("should load the Dubai page successfully and incorporate Dubai in the title", async ({ page }) => {
      // Document title check
      const title = await page.title();
      expect(title).toContain("Dubai");
      expect(title).toContain("Märkte & Standorte");

      // Heading check
      const heading = page.locator("h1");
      await expect(heading).toContainText("Dubai");
    });

    test("should have the correct meta description", async ({ page }) => {
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute(
        "content",
        "Trinkwassersysteme d20–d630, geprüft gegen die Anforderungen vor Ort — DEWA — Dubai Electricity & Water Authority"
      );
    });

    test("should have correct canonical and hreflang alternate links", async ({ page }) => {
      // Canonical link
      const canonical = page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute("href", "https://k-aqua.de/de/maerkte/dubai");

      // Alternate links
      const altDe = page.locator('link[rel="alternate"][hreflang="de"]');
      await expect(altDe).toHaveAttribute("href", "https://k-aqua.de/de/maerkte/dubai");

      const altEn = page.locator('link[rel="alternate"][hreflang="en"]');
      await expect(altEn).toHaveAttribute("href", "https://k-aqua.de/en/maerkte/dubai");

      const altAr = page.locator('link[rel="alternate"][hreflang="ar"]');
      await expect(altAr).toHaveAttribute("href", "https://k-aqua.de/ar/maerkte/dubai");

      const altDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
      await expect(altDefault).toHaveAttribute("href", "https://k-aqua.de/de/maerkte/dubai");
    });

    test("should render the 3 closest markets correctly", async ({ page }) => {
      // The 3 closest markets to Dubai are Abu Dhabi, Maskat, and Doha.
      const abudhabiLink = page.locator('a[href="/de/maerkte/abudhabi"]');
      await expect(abudhabiLink).toBeVisible();
      await expect(abudhabiLink).toContainText("Abu Dhabi");

      const maskatLink = page.locator('a[href="/de/maerkte/maskat"]');
      await expect(maskatLink).toBeVisible();
      await expect(maskatLink).toContainText("Maskat");

      const dohaLink = page.locator('a[href="/de/maerkte/doha"]');
      await expect(dohaLink).toBeVisible();
      await expect(dohaLink).toContainText("Doha");
    });
  });

  test.describe("Arabic Locale /ar/maerkte/dubai", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("http://localhost:3001/ar/maerkte/dubai");
    });

    test("should render in RTL", async ({ page }) => {
      const htmlDir = await page.getAttribute("html", "dir");
      expect(htmlDir).toBe("rtl");
    });

    test("should have Arabic translations in title, description and links", async ({ page }) => {
      // Title contains Arabic translation for Märkte & Standorte
      const title = await page.title();
      expect(title).toContain("Dubai");
      expect(title).toContain("الأسواق والمواقع");

      // Description contains Arabic translation for regulator
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute(
        "content",
        "أنظمة مياه شرب d20–d630، مطابقة للمتطلبات المحلية — DEWA — هيئة كهرباء ومياه دبي"
      );

      // Closest markets links are translated and prefixed with /ar
      const abudhabiLink = page.locator('a[href="/ar/maerkte/abudhabi"]');
      await expect(abudhabiLink).toBeVisible();
    });
  });

  test.describe("Unknown Slug Behavior", () => {
    test("should return 404 for unknown slug", async ({ page }) => {
      const response = await page.goto("http://localhost:3001/de/maerkte/not-a-real-city");
      expect(response?.status()).toBe(404);
    });
  });
});
