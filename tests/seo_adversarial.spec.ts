import { test, expect } from '@playwright/test';

const TEST_ROUTES = [
  '/',
  '/produkte',
  '/produkte/finder',
  '/maerkte/dubai',
  '/co2-rechner',
];

const LOCALES = ['de', 'en', 'ar'];

test.describe('Adversarial SEO & JSON-LD Verification', () => {
  
  // 1. Check RTL / LTR direction metadata on html tags
  test.describe('Direction Metadata', () => {
    for (const route of TEST_ROUTES) {
      const path = route === '/' ? '' : route;
      
      test(`should set LTR for German route: /de${path}`, async ({ page }) => {
        const response = await page.goto(`http://localhost:3001/de${path}`);
        expect(response?.status()).toBe(200);
        
        const html = page.locator('html');
        await expect(html).toHaveAttribute('dir', 'ltr');
        await expect(html).toHaveAttribute('lang', 'de');
      });

      test(`should set LTR for English route: /en${path}`, async ({ page }) => {
        const response = await page.goto(`http://localhost:3001/en${path}`);
        expect(response?.status()).toBe(200);
        
        const html = page.locator('html');
        await expect(html).toHaveAttribute('dir', 'ltr');
        await expect(html).toHaveAttribute('lang', 'en');
      });

      test(`should set RTL for Arabic route: /ar${path}`, async ({ page }) => {
        const response = await page.goto(`http://localhost:3001/ar${path}`);
        expect(response?.status()).toBe(200);
        
        const html = page.locator('html');
        await expect(html).toHaveAttribute('dir', 'rtl');
        await expect(html).toHaveAttribute('lang', 'ar');
      });
    }
  });

  // 2. Verify hreflang alternates and canonical constraints
  test.describe('Hreflangs and Canonical Alternates', () => {
    for (const route of TEST_ROUTES) {
      const cleanRoute = route.replace(/^\/+|\/+$/g, '');
      
      for (const locale of LOCALES) {
        const path = route === '/' ? '' : route;
        const pageUrl = `http://localhost:3001/${locale}${path}`;

        test(`should render correct canonical and alternates for ${locale} page: ${route}`, async ({ page }) => {
          await page.goto(pageUrl);

          // Verify Canonical
          const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
          expect(canonical).toBeTruthy();
          
          // Verify format: https://k-aqua.de/{locale}/{cleanRoute}
          const expectedCanonical = cleanRoute 
            ? `https://k-aqua.de/${locale}/${cleanRoute}`
            : `https://k-aqua.de/${locale}/`;
          expect(canonical).toBe(expectedCanonical);

          // Check that canonical has NO double slashes
          expect(canonical).not.toMatch(/https:\/\/k-aqua\.de\/.*\/\//);
          
          if (cleanRoute) {
            // Check that canonical has no trailing slashes for subpages
            expect(canonical).not.toMatch(/https:\/\/k-aqua\.de\/.*\/$/);
          }

          // Verify hreflangs
          const deAlternate = await page.locator('link[rel="alternate"][hreflang="de"]').getAttribute('href');
          const enAlternate = await page.locator('link[rel="alternate"][hreflang="en"]').getAttribute('href');
          const arAlternate = await page.locator('link[rel="alternate"][hreflang="ar"]').getAttribute('href');
          const xDefaultAlternate = await page.locator('link[rel="alternate"][hreflang="x-default"]').getAttribute('href');

          const expectedDe = cleanRoute ? `https://k-aqua.de/de/${cleanRoute}` : `https://k-aqua.de/de/`;
          const expectedEn = cleanRoute ? `https://k-aqua.de/en/${cleanRoute}` : `https://k-aqua.de/en/`;
          const expectedAr = cleanRoute ? `https://k-aqua.de/ar/${cleanRoute}` : `https://k-aqua.de/ar/`;

          expect(deAlternate).toBe(expectedDe);
          expect(enAlternate).toBe(expectedEn);
          expect(arAlternate).toBe(expectedAr);
          expect(xDefaultAlternate).toBe(expectedDe); // x-default points to DE
        });
      }
    }
  });

  // 3. JSON-LD compliance with Schema.org structures
  test.describe('JSON-LD Schema.org Compliance', () => {
    
    test('should render compliant Organization schema on Homepage', async ({ page }) => {
      await page.goto('http://localhost:3001/de');
      
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      let foundOrg = false;
      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        const schema = JSON.parse(content);
        
        if (schema['@type'] === 'Organization') {
          foundOrg = true;
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema.name).toBe('KWT GmbH');
          expect(schema.alternateName).toBe('K-Aqua');
          expect(schema.url).toBe('https://k-aqua.de');
          expect(schema.logo).toContain('https://k-aqua.de/');
          
          // Postal Address
          expect(schema.address).toBeDefined();
          expect(schema.address['@type']).toBe('PostalAddress');
          expect(schema.address.streetAddress).toBe('Auweg 3');
          expect(schema.address.addressLocality).toBe('Waldsolms-Brandoberndorf');
          expect(schema.address.postalCode).toBe('35647');
          expect(schema.address.addressCountry).toBe('DE');

          // Contact Point
          expect(schema.contactPoint).toBeDefined();
          expect(schema.contactPoint['@type']).toBe('ContactPoint');
          expect(schema.contactPoint.contactType).toBe('customer service');
          expect(schema.contactPoint.telephone).toBeTruthy();
          expect(schema.contactPoint.email).toContain('@k-aqua.de');
          expect(schema.contactPoint.areaServed).toBe('Global');
          expect(schema.contactPoint.availableLanguage).toEqual(expect.arrayContaining(['de', 'en', 'ar']));
        }
      }
      expect(foundOrg).toBe(true);
    });

    test('should render compliant Product ItemList schema on Products page', async ({ page }) => {
      await page.goto('http://localhost:3001/de/produkte');
      
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      
      let foundItemList = false;
      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        const schema = JSON.parse(content);
        
        if (schema['@type'] === 'ItemList') {
          foundItemList = true;
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema.name).toBeTruthy();
          expect(schema.description).toBeTruthy();
          expect(Array.isArray(schema.itemListElement)).toBe(true);
          expect(schema.itemListElement.length).toBeGreaterThan(0);

          for (const element of schema.itemListElement) {
            expect(element['@type']).toBe('ListItem');
            expect(typeof element.position).toBe('number');
            expect(element.item).toBeDefined();
            expect(element.item['@type']).toBe('Product');
            expect(element.item.name).toBeTruthy();
            expect(element.item.description).toBeTruthy();
            expect(element.item.brand['@type']).toBe('Brand');
            expect(element.item.brand.name).toBe('K-Aqua');
            expect(element.item.url).toContain('https://k-aqua.de/');
          }
        }
      }
      expect(foundItemList).toBe(true);
    });

    test('should render compliant Product & FAQPage schemas on Geo City pages', async ({ page }) => {
      // Test Dubai route
      await page.goto('http://localhost:3001/de/maerkte/dubai');
      
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      
      let foundProduct = false;
      let foundFAQ = false;

      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        const schema = JSON.parse(content);
        
        if (schema['@type'] === 'Product') {
          foundProduct = true;
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema.name).toContain('K-Aqua Piping System');
          expect(schema.name).toContain('Dubai');
          expect(schema.brand['@type']).toBe('Brand');
          expect(schema.brand.name).toBe('K-Aqua');
          
          expect(schema.offers).toBeDefined();
          expect(schema.offers['@type']).toBe('Offer');
          expect(schema.offers.priceCurrency).toBe('EUR');
          expect(schema.offers.price).toBe('0.00');
          expect(schema.offers.priceSpecification['@type']).toBe('PriceSpecification');
          expect(schema.offers.priceSpecification.valueAddedTaxIncluded).toBe(true);
          expect(schema.offers.availability).toBe('https://schema.org/InStock');
          expect(schema.offers.seller['@type']).toBe('Organization');
          expect(schema.offers.seller.name).toBe('KWT GmbH');
        }

        if (schema['@type'] === 'FAQPage') {
          foundFAQ = true;
          expect(schema['@context']).toBe('https://schema.org');
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBeGreaterThanOrEqual(2);

          for (const entity of schema.mainEntity) {
            expect(entity['@type']).toBe('Question');
            expect(entity.name).toBeTruthy();
            expect(entity.acceptedAnswer['@type']).toBe('Answer');
            expect(entity.acceptedAnswer.text).toBeTruthy();
          }
        }
      }
      expect(foundProduct).toBe(true);
      expect(foundFAQ).toBe(true);
    });

    test('should have fully localized FAQ content for Arabic Geo pages', async ({ page }) => {
      await page.goto('http://localhost:3001/ar/maerkte/dubai');
      
      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      
      let foundFAQ = false;
      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        const schema = JSON.parse(content);
        
        if (schema['@type'] === 'FAQPage') {
          foundFAQ = true;
          
          // Validate that questions and answers contain Arabic characters
          const arabicRegex = /[\u0600-\u06FF]/;
          
          for (const entity of schema.mainEntity) {
            expect(entity.name).toMatch(arabicRegex);
            expect(entity.acceptedAnswer.text).toMatch(arabicRegex);
          }
        }
      }
      expect(foundFAQ).toBe(true);
    });
  });

  // 4. Adversarial validation (no invalid chars, properly escaped HTML injection)
  test.describe('Adversarial & Injection Resistance Checks', () => {
    
    test('should not contain unescaped HTML characters in JSON-LD scripts', async ({ page }) => {
      for (const route of TEST_ROUTES) {
        const path = route === '/' ? '' : route;
        await page.goto(`http://localhost:3001/de${path}`);
        
        const jsonLdScripts = page.locator('script[type="application/ld+json"]');
        const count = await jsonLdScripts.count();
        
        for (let i = 0; i < count; i++) {
          const rawContent = await jsonLdScripts.nth(i).innerHTML();
          
          // Verify that raw content doesn't contain raw HTML tag syntax (like <div or <span)
          // which could indicate HTML injection vulnerabilities.
          expect(rawContent).not.toMatch(/<[a-zA-Z]+/);
        }
      }
    });

    test('should have valid and safe meta title and description values without raw tags', async ({ page }) => {
      for (const route of TEST_ROUTES) {
        const path = route === '/' ? '' : route;
        await page.goto(`http://localhost:3001/de${path}`);

        const title = await page.title();
        expect(title).not.toMatch(/<.*>/); // No HTML tags in title

        const description = await page.locator('meta[name="description"]').getAttribute('content');
        if (description) {
          expect(description).not.toMatch(/<.*>/); // No HTML tags in description
        }
      }
    });
  });
});
