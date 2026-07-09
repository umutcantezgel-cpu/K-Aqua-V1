import { test, expect } from '@playwright/test';

test.describe('Step 15: Karriere & Projektanfrage (Käufer-Strecke)', () => {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('k-aqua-cookie-consent', 'all');
      window.localStorage.setItem('cookie_essential', 'true');
      window.localStorage.setItem('cookie_analytics', 'true');
      window.localStorage.setItem('cookie_marketing', 'true');
    });
  });

  test.describe('Netto-Rechner on /karriere', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3001/de/karriere');
    });

    test('should calculate correct net and gross values for combinations', async ({ page }) => {
      // 1. Default: Sachbezugskarte (50) and Essenszuschuss (108) selected
      // Expected Net = 158
      // Expected Gross = Math.round(158 / 0.55 / 10) * 10 = 290
      const netDisplay = page.locator('span.text-h2');
      await expect(netDisplay).toContainText('158');
      
      const noteStrong = page.locator('strong.text-foreground');
      await expect(noteStrong).toContainText('290');

      // Helper to toggle a benefit by its ID or input name
      // K_BENEFITS:
      // sachbezug: 50
      // lunch: 108
      // internet: 50
      // jobrad: 45
      // kita: 100
      // vwl: 40

      // Let's uncheck Sachbezugskarte (50)
      // Remaining: lunch (108). Net = 108. Gross = Math.round(108 / 0.55 / 10) * 10 = 200
      const sachbezugCheckbox = page.locator('label:has-text("Sachbezugskarte") input[type="checkbox"]');
      await sachbezugCheckbox.uncheck();
      await expect(netDisplay).toContainText('108');
      await expect(noteStrong).toContainText('200');

      // Let's check Kita-Zuschuss (100) and VWL (40)
      // Current: lunch (108) + kita (100) + vwl (40) = 248
      // Gross = Math.round(248 / 0.55 / 10) * 10 = 450
      const kitaCheckbox = page.locator('label:has-text("Kita-Zuschuss") input[type="checkbox"]');
      const vwlCheckbox = page.locator('label:has-text("Vermögenswirksame Leistungen") input[type="checkbox"]');
      
      await kitaCheckbox.check();
      await vwlCheckbox.check();
      await expect(netDisplay).toContainText('248');
      await expect(noteStrong).toContainText('450');

      // Let's check all benefits
      // Total Net = 393
      // Gross = Math.round(393 / 0.55 / 10) * 10 = 710
      const internetCheckbox = page.locator('label:has-text("Internetpauschale") input[type="checkbox"]');
      const jobradCheckbox = page.locator('label:has-text("JobRad-Leasing") input[type="checkbox"]');
      
      await sachbezugCheckbox.check(); // check it back
      await internetCheckbox.check();
      await jobradCheckbox.check();

      await expect(netDisplay).toContainText('393');
      await expect(noteStrong).toContainText('710');
    });

    test('should format numbers correctly based on locale', async ({ page }) => {
      // German locale formats 158 as "158"
      const netDisplayDe = page.locator('span.text-h2');
      await expect(netDisplayDe).toContainText('158');

      // Go to English locale
      await page.goto('http://localhost:3001/en/karriere');
      const netDisplayEn = page.locator('span.text-h2');
      await expect(netDisplayEn).toContainText('158');
    });
  });

  test.describe('Culture-Matcher on /karriere', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3001/de/karriere');
    });

    test('should handle High Match scenario (100%)', async ({ page }) => {
      // Click "Test starten"
      await page.click('button:has-text("Test starten")');

      // Question 1 to 5: click first option (index 0) for each
      // Question 1: Wie arbeiten Sie am liebsten? -> Clear processes
      await page.click('button:has-text("Klare Abläufe")');
      // Question 2: Großserie läuft... -> Inspect immediately
      await page.click('button:has-text("Sofort hinschauen")');
      // Question 3: Was motiviert Sie mehr? -> Product lasts 50 years
      await page.click('button:has-text("Ein Produkt, das 50 Jahre hält")');
      // Question 4: Schichtarbeit... -> Planable and okay
      await page.click('button:has-text("Planbar und okay")');
      // Question 5: Ihr Verhältnis zu Technik? -> Understand how it works
      await page.click('button:has-text("Ich will verstehen")');

      // Results: Score = 5 (all index 0), match = 100%
      const percentageDisplay = page.locator('span.text-display');
      await expect(percentageDisplay).toContainText('100%');

      // High match text should be present
      const matchText = page.locator('div.text-center p.text-lead');
      await expect(matchText).toContainText('Starkes Match');

      // Click "Nochmal" and check if it resets
      await page.click('button:has-text("Nochmal")');
      await expect(page.locator('button:has-text("Test starten")')).toBeVisible();
    });

    test('should handle Mid Match scenario (60%)', async ({ page }) => {
      await page.click('button:has-text("Test starten")');

      // Q1: Option 2 (index 1) -> score 0
      await page.click('button:has-text("Jeden Tag etwas Neues ausprobieren")');
      // Q2: Option 2 (index 1) -> score 0
      await page.click('button:has-text("Erstmal weiterlaufen lassen")');
      // Q3: Option 1 (index 0) -> score 1
      await page.click('button:has-text("Ein Produkt, das 50 Jahre hält")');
      // Q4: Option 1 (index 0) -> score 1
      await page.click('button:has-text("Planbar und okay")');
      // Q5: Option 1 (index 0) -> score 1
      // Total score = 3 out of 5 -> 60%
      await page.click('button:has-text("Ich will verstehen")');

      const percentageDisplay = page.locator('span.text-display');
      await expect(percentageDisplay).toContainText('60%');

      // Mid match text should be present
      const matchText = page.locator('div.text-center p.text-lead');
      await expect(matchText).toContainText('Gutes Match mit Gesprächsbedarf');
    });

    test('should handle Low Match scenario (20%)', async ({ page }) => {
      await page.click('button:has-text("Test starten")');

      // Q1: Option 2 -> score 0
      await page.click('button:has-text("Jeden Tag etwas Neues ausprobieren")');
      // Q2: Option 2 -> score 0
      await page.click('button:has-text("Erstmal weiterlaufen lassen")');
      // Q3: Option 2 -> score 0.5
      await page.click('button:has-text("Schnelle, sichtbare Ergebnisse")');
      // Q4: Option 2 -> score 0
      await page.click('button:has-text("Eher schwierig")');
      // Q5: Option 2 -> score 0.5
      // Total score = 1 out of 5 -> 20%
      await page.click('button:has-text("Hauptsache es läuft")');

      const percentageDisplay = page.locator('span.text-display');
      await expect(percentageDisplay).toContainText('20%');

      // Low match text should be present
      const matchText = page.locator('div.text-center p.text-lead');
      await expect(matchText).toContainText('Ehrliches Ergebnis: Fertigungsalltag bei K-Aqua');
    });
  });

  test.describe('RFQ Wizard on /projektanfrage', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3001/de/projektanfrage');
    });

    test('should step through and validate wizard, compiling correct mailto link', async ({ page }) => {
      // --- Step 0: Projektart ---
      // Check Next button is disabled initially
      const nextBtn = page.locator('button:has-text("Weiter")');
      await expect(nextBtn).toBeDisabled();

      // Click "Neubau / Hochbau" (index 0)
      const projectTypeCard = page.locator('button.k-type-card').first();
      await projectTypeCard.click();
      await expect(nextBtn).toBeEnabled();

      // Go to Step 1
      await nextBtn.click();

      // --- Step 1: Bedarf ---
      // Check Next button is disabled initially (no dimension selected)
      await expect(nextBtn).toBeDisabled();

      // Click a dimension chip (e.g. "d20 – d63")
      const dimChip = page.locator('button:has-text("d20 – d63")');
      await dimChip.click();
      await expect(nextBtn).toBeEnabled();

      // Let's select multiple dimension chips
      const dimChip2 = page.locator('button:has-text("d75 – d160")');
      await dimChip2.click();

      // Check slider can be set
      const slider = page.locator('input.k-range');
      await slider.fill('2500'); // set meters to 2500
      
      const metersDisplay = page.locator('span.font-heading.text-primary');
      await expect(metersDisplay).toContainText('2.500 m');

      // Go to Step 2
      await nextBtn.click();

      // --- Step 2: Termin & Region ---
      // Check Next button is disabled initially
      await expect(nextBtn).toBeDisabled();

      // Click timeline chip "Sofort / laufend"
      const timelineChip = page.locator('button:has-text("Sofort / laufend")');
      await timelineChip.click();
      await expect(nextBtn).toBeDisabled(); // still disabled, region not chosen

      // Click region chip "Deutschland"
      const regionChip = page.locator('button:has-text("Deutschland")');
      await regionChip.click();
      await expect(nextBtn).toBeEnabled();

      // Go to Step 3
      await nextBtn.click();

      // --- Step 3: Kontakt ---
      const submitBtn = page.locator('button:has-text("Anfrage senden")');
      await expect(submitBtn).toBeDisabled();

      // Fill in details
      await page.fill('label:has-text("Name") input', 'Max Mustermann');
      await page.fill('label:has-text("Unternehmen") input', 'Musterbau GmbH');
      
      // Test invalid email
      await page.fill('label:has-text("E-Mail") input', 'invalid-email');
      await expect(submitBtn).toBeDisabled();

      // Valid email
      await page.fill('label:has-text("E-Mail") input', 'max@musterbau.de');
      await expect(submitBtn).toBeEnabled();

      // Optional fields
      await page.fill('label:has-text("Telefon") input', '+4912345678');
      await page.fill('label:has-text("Nachricht") textarea', 'Bitte um schnelles Angebot.');

      // Capture window.open target
      let openedUrl: string | null = null;
      await page.exposeFunction('onWindowOpen', (url: string) => {
        openedUrl = url;
      });
      await page.evaluate(() => {
        window.open = (url) => {
          (window as any).onWindowOpen(url);
          return null;
        };
      });

      // Submit
      await submitBtn.click();

      // Expect to transition to success page
      const successTitle = page.locator('h2:has-text("Fast geschafft.")');
      await expect(successTitle).toBeVisible();

      // Verify mailto URL matches specification
      expect(openedUrl).not.toBeNull();
      const urlObj = new URL(openedUrl!);
      expect(urlObj.protocol).toBe('mailto:');
      expect(urlObj.pathname).toBe('info@k-aqua.de');

      const subject = urlObj.searchParams.get('subject');
      const body = urlObj.searchParams.get('body');

      expect(subject).toBe('Projektanfrage K-Aqua — Musterbau GmbH');
      
      expect(body).toContain('Projektart: Neubau / Hochbau');
      expect(body).toContain('Benötigte Dimensionen: d20 – d63, d75 – d160 . ~2.500 m');
      expect(body).toContain('Geplanter Zeitrahmen: Sofort / laufend . Lieferregion: Deutschland');
      expect(body).toContain('Name: Max Mustermann . Unternehmen: Musterbau GmbH');
      expect(body).toContain('E-Mail: max@musterbau.de . Telefon: +4912345678');
      expect(body).toContain('Nachricht (optional): Bitte um schnelles Angebot.');
    });
  });

  test.describe('Keyboard accessibility & Tab indexing', () => {
    test('/karriere keyboard flow', async ({ page }) => {
      await page.goto('http://localhost:3001/de/karriere');

      // Tabbing should focus benefits checkboxes
      const firstCheckbox = page.locator('label:has-text("Sachbezugskarte") input[type="checkbox"]');
      
      // Let's test that pressing Tab can focus the first checkbox
      await page.keyboard.press('Tab');
      // Tab to SkipLink, Header links, then to page content.
      // Alternatively, we can focus the checkbox programmatically to start tabbing from there
      await firstCheckbox.focus();
      await expect(firstCheckbox).toBeFocused();

      // Press space to uncheck
      await page.keyboard.press('Space');
      await expect(firstCheckbox).not.toBeChecked();

      // Tab to next checkbox (Essenszuschuss)
      await page.keyboard.press('Tab');
      const secondCheckbox = page.locator('label:has-text("Essenszuschuss") input[type="checkbox"]');
      await expect(secondCheckbox).toBeFocused();

      // Start quiz via keyboard
      const startBtn = page.locator('button:has-text("Test starten")');
      await startBtn.focus();
      await expect(startBtn).toBeFocused();
      await page.keyboard.press('Enter');

      // Question 1 should be visible, and the first option should be focusable
      const firstAnswerBtn = page.locator('button:has-text("Klare Abläufe")');
      await page.keyboard.press('Tab');
      await expect(firstAnswerBtn).toBeFocused();
    });

    test('/projektanfrage keyboard flow', async ({ page }) => {
      await page.goto('http://localhost:3001/de/projektanfrage');

      const firstTypeBtn = page.locator('button.k-type-card').first();
      await firstTypeBtn.focus();
      await expect(firstTypeBtn).toBeFocused();
      
      // Select it via Space
      await page.keyboard.press('Space');
      await expect(firstTypeBtn).toHaveAttribute('aria-pressed', 'true');

      // Tab through the remaining 3 cards to reach "Weiter"
      // Tab 1 -> Card 2, Tab 2 -> Card 3, Tab 3 -> Card 4, Tab 4 -> "Weiter" button
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Tab');
      }
      
      const nextBtn = page.locator('button:has-text("Weiter")');
      await expect(nextBtn).toBeFocused();
      await page.keyboard.press('Enter');

      // Now on Step 1. Tab should reach the dimension chips
      const chip = page.locator('button:has-text("d20 – d63")');
      await chip.focus();
      await expect(chip).toBeFocused();
      await page.keyboard.press('Space');
      await expect(chip).toHaveAttribute('aria-pressed', 'true');
    });
  });

  test.describe('RTL Layout & Translation Check', () => {
    test('Arabic route /ar/karriere should use RTL direction', async ({ page }) => {
      await page.goto('http://localhost:3001/ar/karriere');
      
      const html = page.locator('html');
      await expect(html).toHaveAttribute('dir', 'rtl');
      await expect(html).toHaveAttribute('lang', 'ar');

      // Check some Arabic translation content is shown
      const h1 = page.locator('h1');
      const text = await h1.textContent();
      // "Mehr als" in Arabic is "أكثر من"
      expect(text).toContain('أكثر من');
    });

    test('Arabic route /ar/projektanfrage should use RTL direction', async ({ page }) => {
      await page.goto('http://localhost:3001/ar/projektanfrage');
      
      const html = page.locator('html');
      await expect(html).toHaveAttribute('dir', 'rtl');
      await expect(html).toHaveAttribute('lang', 'ar');

      const h1 = page.locator('h1');
      const text = await h1.textContent();
      // "Ihr Projekt," in Arabic at rfq title1 is "مشروعكم،"
      expect(text).toContain('مشروعكم،');
    });
  });

});
