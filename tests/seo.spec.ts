import { test, expect } from '@playwright/test';

/** Nur die JSON-LD-Felder, die dieser Test tatsächlich prüft. */
type JsonLdNode = {
  '@context'?: string;
  '@type'?: string;
  name?: string;
  address?: { streetAddress?: string };
  contactPoint?: { telephone?: string };
  mainEntity?: Array<{ '@type'?: string; acceptedAnswer?: { '@type'?: string } }>;
};

const ACTIVE_ROUTES = [
  '/',
  '/produkte',
  '/produkte/finder',
  '/loesungen',
  '/co2-rechner',
  '/academy',
  '/trust-center',
  '/partnerschaft',
  '/service',
  '/maerkte',
  '/maerkte/frankfurt',
  '/maerkte/dubai',
  '/referenzen',
  '/unternehmen',
  '/karriere',
  '/projektanfrage',
  '/news',
  '/kontakt',
  '/impressum',
];

test.describe('Step 19: SEO Metadata & JSON-LD Validation', () => {
  for (const route of ACTIVE_ROUTES) {
    test(`should render valid metadata and JSON-LD for German route: ${route}`, async ({ page }) => {
      const response = await page.goto(`http://localhost:3001/de${route === '/' ? '' : route}`);
      expect(response?.status()).toBe(200);

      const title = await page.title();
      expect(title).toContain('K-Aqua');
      expect(title).toContain('·');

      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(10);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical).toContain('https://k-aqua.de/de');

      // Verify hreflang alternates are present
      const alternates = page.locator('link[rel="alternate"]');
      const alternateCount = await alternates.count();
      expect(alternateCount).toBeGreaterThanOrEqual(3); // de, en, ar, and x-default

      const jsonLdScripts = page.locator('script[type="application/ld+json"]');
      const count = await jsonLdScripts.count();
      expect(count).toBeGreaterThanOrEqual(1);

      for (let i = 0; i < count; i++) {
        const content = await jsonLdScripts.nth(i).innerHTML();
        expect(content).toBeTruthy();

        let parsedSchema: JsonLdNode = {};
        expect(() => {
          parsedSchema = JSON.parse(content);
        }).not.toThrow();

        expect(parsedSchema['@context']).toBe('https://schema.org');
        expect(parsedSchema['@type']).toBeTruthy();

        if (route === '/') {
          if (parsedSchema['@type'] === 'Organization') {
            expect(parsedSchema.name).toBe('KWT GmbH');
            expect(parsedSchema.address?.streetAddress).toBe('Auweg 3');
            expect(parsedSchema.contactPoint?.telephone).toContain('9868-410');
          }
        }

        if (route.startsWith('/maerkte/') && route !== '/maerkte') {
          if (parsedSchema['@type'] === 'FAQPage') {
            const mainEntity = parsedSchema.mainEntity ?? [];
            expect(Array.isArray(parsedSchema.mainEntity)).toBe(true);
            expect(mainEntity.length).toBeGreaterThanOrEqual(1);
            expect(mainEntity[0]?.['@type']).toBe('Question');
            expect(mainEntity[0]?.acceptedAnswer?.['@type']).toBe('Answer');
          }
        }
      }
    });
  }
});
