import { test, expect } from '@playwright/test';

const TEST_ROUTES = [
  '/',
  '/produkte',
  '/maerkte/frankfurt',
  '/maerkte/dubai'
];

test.describe('Adversarial SEO & JSON-LD Compliance Verification', () => {

  // Test 1: RTL and LTR directionality, language tags
  test('RTL/LTR direction and html lang checks', async ({ page }) => {
    // German (LTR)
    await page.goto('http://localhost:3001/de');
    const htmlDe = page.locator('html');
    await expect(htmlDe).toHaveAttribute('lang', 'de');
    await expect(htmlDe).toHaveAttribute('dir', 'ltr');

    // English (LTR)
    await page.goto('http://localhost:3001/en');
    const htmlEn = page.locator('html');
    await expect(htmlEn).toHaveAttribute('lang', 'en');
    await expect(htmlEn).toHaveAttribute('dir', 'ltr');

    // Arabic (RTL)
    await page.goto('http://localhost:3001/ar');
    const htmlAr = page.locator('html');
    await expect(htmlAr).toHaveAttribute('lang', 'ar');
    await expect(htmlAr).toHaveAttribute('dir', 'rtl');
  });

  // Test 2: Hreflang alternates & canonical tag validation across multiple routes and languages
  for (const route of TEST_ROUTES) {
    for (const locale of ['de', 'en', 'ar']) {
      const urlPath = `${locale}${route === '/' ? '' : route}`;
      test(`Hreflangs and Canonical for /${urlPath}`, async ({ page }) => {
        await page.goto(`http://localhost:3001/${urlPath}`);

        // Canonical verification
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBe(`https://k-aqua.de/${locale}${route === '/' ? '/' : route}`);

        // Hreflang verification
        const deHref = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute('href');
        const enHref = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
        const arHref = await page.locator('link[rel="alternate"][hreflang="ar"]').getAttribute('href');
        const defaultHref = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');

        const expectedSuffix = route === '/' ? '/' : route;
        expect(deHref).toBe(`https://k-aqua.de/de${expectedSuffix}`);
        expect(enHref).toBe(`https://k-aqua.de/en${expectedSuffix}`);
        expect(arHref).toBe(`https://k-aqua.de/ar${expectedSuffix}`);
        expect(defaultHref).toBe(`https://k-aqua.de/de${expectedSuffix}`); // x-default points to de locale
      });
    }
  }

  // Test 3: Canonical query param stripping (Adversarial query injection)
  test('Should strip query parameters from canonical URL to prevent duplicate content indexing', async ({ page }) => {
    // Injecting query parameters
    await page.goto('http://localhost:3001/de/produkte?gclid=test1234&utm_source=adv-seo&page=2');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    // It should not contain the query parameters
    expect(canonical).toBe('https://k-aqua.de/de/produkte');
  });

  // Test 4: Parseability and compliance of JSON-LD schemas
  test('Verify compliance of Organization, WebSite, ItemList, Product, and FAQPage structures', async ({ page }) => {
    // 4.1 Organization & WebSite on Home Page
    await page.goto('http://localhost:3001/de');
    const scriptsHome = page.locator('script[type="application/ld+json"]');
    const countHome = await scriptsHome.count();
    expect(countHome).toBeGreaterThanOrEqual(2);

    let foundOrg = false;
    let foundWebSite = false;

    for (let i = 0; i < countHome; i++) {
      const jsonText = await scriptsHome.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);
      expect(schema['@context']).toBe('https://schema.org');

      if (schema['@type'] === 'Organization') {
        foundOrg = true;
        expect(schema.name).toBe('KWT GmbH');
        expect(schema.alternateName).toBe('K-Aqua');
        expect(schema.address).toEqual({
          '@type': 'PostalAddress',
          streetAddress: 'Auweg 3',
          addressLocality: 'Waldsolms-Brandoberndorf',
          postalCode: '35647',
          addressCountry: 'DE'
        });
        expect(schema.contactPoint.email).toBe('info@k-aqua.de');
        expect(schema.contactPoint.telephone).toContain('9868-410');
      }

      if (schema['@type'] === 'WebSite') {
        foundWebSite = true;
        expect(schema.name).toBe('K-Aqua');
        expect(schema.url).toBe('https://k-aqua.de/de');
      }
    }
    expect(foundOrg).toBe(true);
    expect(foundWebSite).toBe(true);

    // 4.2 ItemList Product Catalog on /produkte
    await page.goto('http://localhost:3001/en/produkte');
    const scriptsProd = page.locator('script[type="application/ld+json"]');
    const countProd = await scriptsProd.count();
    
    let foundItemList = false;
    for (let i = 0; i < countProd; i++) {
      const jsonText = await scriptsProd.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);
      if (schema['@type'] === 'ItemList') {
        foundItemList = true;
        expect(Array.isArray(schema.itemListElement)).toBe(true);
        expect(schema.itemListElement.length).toBeGreaterThan(0);
        
        for (const element of schema.itemListElement) {
          expect(element['@type']).toBe('ListItem');
          expect(element.position).toBeGreaterThanOrEqual(1);
          expect(element.item['@type']).toBe('Product');
          expect(element.item.brand.name).toBe('K-Aqua');
        }
      }
    }
    expect(foundItemList).toBe(true);

    // 4.3 Product + FAQPage on Geo Cities
    await page.goto('http://localhost:3001/de/maerkte/frankfurt');
    const scriptsGeo = page.locator('script[type="application/ld+json"]');
    const countGeo = await scriptsGeo.count();

    let foundProduct = false;
    let foundFAQ = false;

    for (let i = 0; i < countGeo; i++) {
      const jsonText = await scriptsGeo.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);

      if (schema['@type'] === 'Product' && schema.name.includes('Frankfurt')) {
        foundProduct = true;
        expect(schema.brand.name).toBe('K-Aqua');
        expect(schema.offers['@type']).toBe('Offer');
        expect(schema.offers.seller['@type']).toBe('Organization');
        expect(schema.offers.seller.name).toBe('KWT GmbH');
      }

      if (schema['@type'] === 'FAQPage') {
        foundFAQ = true;
        expect(Array.isArray(schema.mainEntity)).toBe(true);
        expect(schema.mainEntity.length).toBeGreaterThanOrEqual(2);
        
        for (const faq of schema.mainEntity) {
          expect(faq['@type']).toBe('Question');
          expect(faq.acceptedAnswer['@type']).toBe('Answer');
          expect(typeof faq.name).toBe('string');
          expect(typeof faq.acceptedAnswer.text).toBe('string');
        }
      }
    }
    expect(foundProduct).toBe(true);
    expect(foundFAQ).toBe(true);
  });

  // Test 5: FAQ Localization correctness (Adversarial schema inspection)
  test('Verify FAQs match language and do not fallback to English on German/Arabic pages', async ({ page }) => {
    // German FAQ
    await page.goto('http://localhost:3001/de/maerkte/frankfurt');
    const scriptsDe = page.locator('script[type="application/ld+json"]');
    const countDe = await scriptsDe.count();
    let deFaqOk = false;
    for (let i = 0; i < countDe; i++) {
      const jsonText = await scriptsDe.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);
      if (schema['@type'] === 'FAQPage') {
        deFaqOk = true;
        expect(schema.mainEntity[0].name).toContain('Welche Wasserbehörde regelt Trinkwassersysteme');
      }
    }
    expect(deFaqOk).toBe(true);

    // English FAQ
    await page.goto('http://localhost:3001/en/maerkte/frankfurt');
    const scriptsEn = page.locator('script[type="application/ld+json"]');
    const countEn = await scriptsEn.count();
    let enFaqOk = false;
    for (let i = 0; i < countEn; i++) {
      const jsonText = await scriptsEn.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);
      if (schema['@type'] === 'FAQPage') {
        enFaqOk = true;
        expect(schema.mainEntity[0].name).toContain('Which water authority regulates drinking water systems');
      }
    }
    expect(enFaqOk).toBe(true);

    // Arabic FAQ
    await page.goto('http://localhost:3001/ar/maerkte/frankfurt');
    const scriptsAr = page.locator('script[type="application/ld+json"]');
    const countAr = await scriptsAr.count();
    let arFaqOk = false;
    for (let i = 0; i < countAr; i++) {
      const jsonText = await scriptsAr.nth(i).innerHTML();
      const schema = JSON.parse(jsonText);
      if (schema['@type'] === 'FAQPage') {
        arFaqOk = true;
        expect(schema.mainEntity[0].name).toContain('ما هي الهيئة التنظيمية لشبكات مياه الشرب');
      }
    }
    expect(arFaqOk).toBe(true);
  });

  // Test 6: Fallback for invalid paths / missing cities
  test('Verify 404 behavior for invalid paths and missing cities', async ({ page }) => {
    // Invalid city slug
    const responseGeo = await page.goto('http://localhost:3001/de/maerkte/non-existent-city');
    expect(responseGeo?.status()).toBe(404);

    // Invalid locale
    const responseLocale = await page.goto('http://localhost:3001/fr/produkte');
    expect(responseLocale?.status()).toBe(404);
  });
});
