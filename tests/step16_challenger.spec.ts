import { test, expect } from "@playwright/test";

test.describe("Challenger Step 16: Referenzen (Globus) Deep Verification", () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('k-aqua-cookie-consent', 'all');
      window.localStorage.setItem('cookie_essential', 'true');
      window.localStorage.setItem('cookie_analytics', 'true');
      window.localStorage.setItem('cookie_marketing', 'true');
    });
  });

  test.describe("Page Load & Canvas Rendering", () => {
    test("should load /de/referenzen and render a visible canvas", async ({ page }) => {
      await page.goto("http://localhost:3001/de/referenzen");
      
      // Verify canvas element is visible
      const canvas = page.locator("canvas");
      await expect(canvas).toBeVisible();
      
      // Verify accessibility canvas-aria label is present
      const container = page.locator("div[aria-label]");
      await expect(container).toBeVisible();
      await expect(container).toHaveAttribute("aria-label", /Interaktiver Globus/);
    });
  });

  test.describe("Chip Clicking & BentoCard Synchronization", () => {
    const locales = [
      {
        lang: "de",
        path: "/de/referenzen",
        projects: [
          { name: "Waldsolms", title: "Waldsolms, Deutschland", desc: "Stammwerk & Entwicklung" },
          { name: "Dubai", title: "Dubai, VAE", desc: "PP-RCT für Heißwasser" },
          { name: "Warschau", title: "Warschau, Polen", desc: "Wohnquartier-Neubau" },
          { name: "Istanbul", title: "Istanbul, Türkei", desc: "Hotelkomplex" },
          { name: "Singapur", title: "Singapur", desc: "Infrastrukturprojekt" },
          { name: "Kapstadt", title: "Kapstadt, Südafrika", desc: "Krankenhausneubau" },
          { name: "London", title: "London, UK", desc: "Bürosanierung" },
        ],
      },
      {
        lang: "en",
        path: "/en/referenzen",
        projects: [
          { name: "Waldsolms", title: "Waldsolms, Germany", desc: "Main plant & development" },
          { name: "Dubai", title: "Dubai, UAE", desc: "High-rise riser pipes" },
          { name: "Warsaw", title: "Warsaw, Poland", desc: "Residential quarter new build" },
          { name: "Istanbul", title: "Istanbul, Turkey", desc: "Hotel complex" },
          { name: "Singapore", title: "Singapore", desc: "Infrastructure project" },
          { name: "Cape Town", title: "Cape Town, South Africa", desc: "hygienic drinking water distribution" },
          { name: "London", title: "London, UK", desc: "Office renovation" },
        ],
      },
      {
        lang: "ar",
        path: "/ar/referenzen",
        projects: [
          { name: "فالدسولمس", title: "فالدسولمس، ألمانيا", desc: "المصنع الرئيسي والتطوير" },
          { name: "دبي", title: "دبي، الإمارات العربية المتحدة", desc: "خطوط صاعدة للمباني" },
          { name: "وارسو", title: "وارسو، بولندا", desc: "بناء حي سكني جديد" },
          { name: "إسطنبول", title: "إسطنبول، تركيا", desc: "مجمع فندقي" },
          { name: "سنغافورة", title: "سنغافورة", desc: "مشروع بنية تحتية" },
          { name: "كيب تاون", title: "كيب تاون، جنوب أفريقيا", desc: "بناء مستشفى جديد" },
          { name: "لندن", title: "لندن، المملكة المتحدة", desc: "تجديد مكاتب" },
        ],
      },
    ];

    for (const locale of locales) {
      test(`should sync card details when clicking all chips in locale: ${locale.lang}`, async ({ page }) => {
        await page.goto(`http://localhost:3001${locale.path}`);
        
        for (const proj of locale.projects) {
          // Find the specific chip button
          const chip = page.locator(`button:has-text("${proj.name}")`);
          await expect(chip).toBeVisible();
          await chip.click();

          // Assert active class/state or styling changes
          await expect(chip).toHaveAttribute("aria-pressed", "true");

          // Bento Card assertions
          const cardTitle = page.locator("div.bg-card-tint h3");
          const cardDesc = page.locator("div.bg-card-tint p");
          
          await expect(cardTitle).toContainText(proj.title);
          await expect(cardDesc).toContainText(proj.desc);
        }
      });
    }
  });

  test.describe("Keyboard Accessibility (Tab Navigation)", () => {
    test("should navigate chips via keyboard and trigger updates with Enter", async ({ page }) => {
      await page.goto("http://localhost:3001/de/referenzen");

      // Verify the default is Waldsolms
      const cardTitle = page.locator("div.bg-card-tint h3");
      await expect(cardTitle).toContainText("Waldsolms, Deutschland");

      // Focus/click the first chip to establish keyboard focus
      const waldsolmsChip = page.locator("button:has-text('Waldsolms')");
      await waldsolmsChip.click();
      await expect(waldsolmsChip).toBeFocused();

      // Tab to Dubai
      await page.keyboard.press("Tab");
      const dubaiChip = page.locator("button:has-text('Dubai')");
      await expect(dubaiChip).toBeFocused();

      // Tab to Warschau
      await page.keyboard.press("Tab");
      const warsawChip = page.locator("button:has-text('Warschau')");
      await expect(warsawChip).toBeFocused();

      // Press Enter to activate Warschau
      await page.keyboard.press("Enter");

      // BentoCard should update to Warschau
      await expect(cardTitle).toContainText("Warschau, Polen");
      await expect(waldsolmsChip).toHaveAttribute("aria-pressed", "false");
      await expect(warsawChip).toHaveAttribute("aria-pressed", "true");

      // Tab to Istanbul
      await page.keyboard.press("Tab");
      const istanbulChip = page.locator("button:has-text('Istanbul')");
      await expect(istanbulChip).toBeFocused();

      // Press Space to activate Istanbul
      await page.keyboard.press("Space");

      // BentoCard should update to Istanbul
      await expect(cardTitle).toContainText("Istanbul, Türkei");
      await expect(warsawChip).toHaveAttribute("aria-pressed", "false");
      await expect(istanbulChip).toHaveAttribute("aria-pressed", "true");
    });
  });

  test.describe("RTL Arabic Locale Setup", () => {
    test("should render dir='rtl' and verify layout direction on /ar/referenzen", async ({ page }) => {
      await page.goto("http://localhost:3001/ar/referenzen");

      // Check root html direction
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

      // Check the computed text alignment of the heading or container
      const heading = page.locator("h1");
      const alignment = await heading.evaluate((el) => window.getComputedStyle(el).textAlign);
      // Under RTL, text-start resolves to start (which corresponds to right-aligned)
      expect(["start", "right"]).toContain(alignment);
    });
  });
});
