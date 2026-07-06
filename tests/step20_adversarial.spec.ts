import { test, expect } from '@playwright/test';

test.describe('Adversarial Verification for Sitemap, Robots, Manifest, and Dynamic OG Images', () => {

  test('Sitemap.xml should be valid XML and contain exactly 135 loc elements', async ({ request }) => {
    const response = await request.get('http://localhost:3001/sitemap.xml');
    expect(response.status()).toBe(200);
    
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('xml');

    const body = await response.text();
    
    // Check if it starts with xml declaration
    expect(body.trim().startsWith('<?xml')).toBe(true);
    
    // Count opening/closing url tags to ensure they match and are exactly 135
    const openUrlTags = (body.match(/<url>/g) || []).length;
    const closeUrlTags = (body.match(/<\/url>/g) || []).length;
    expect(openUrlTags).toBe(135);
    expect(closeUrlTags).toBe(135);
    
    const openLocTags = (body.match(/<loc>/g) || []).length;
    const closeLocTags = (body.match(/<\/loc>/g) || []).length;
    expect(openLocTags).toBe(135);
    expect(closeLocTags).toBe(135);
    
    // Count hreflang links (xhtml:link) - each url entry should have 4 alternate link tags (de, en, ar, x-default)
    const alternateTags = (body.match(/<xhtml:link/g) || []).length;
    expect(alternateTags).toBe(540);
  });

  test('Robots.txt should have correct Content-Type header and valid structure', async ({ request }) => {
    const response = await request.get('http://localhost:3001/robots.txt');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('text/plain');
    
    const body = await response.text();
    expect(body).toContain('User-Agent: *');
    expect(body).toContain('Allow: /');
    expect(body).toContain('Host: https://k-aqua.de');
    expect(body).toContain('Sitemap: https://k-aqua.de/sitemap.xml');
  });

  test('Manifest.webmanifest should have correct Content-Type header and valid JSON', async ({ request }) => {
    const response = await request.get('http://localhost:3001/manifest.webmanifest');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('application/manifest+json');
    
    const json = await response.json();
    expect(json).toBeDefined();
    expect(json.name).toBe('K-Aqua');
    expect(json.short_name).toBe('K-Aqua');
    expect(json.theme_color).toBe('#5B2D8C');
    expect(json.background_color).toBe('#FAFAFA');
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBe(2);
  });

  // Verify that dynamic OG image URLs actually render dynamic images for multiple different locales and cities without falling back or returning 500 errors
  const testCases = [
    { locale: 'de', city: 'frankfurt' },
    { locale: 'de', city: 'dubai' },
    { locale: 'de', city: 'london' },
    { locale: 'en', city: 'frankfurt' },
    { locale: 'en', city: 'dubai' },
    { locale: 'en', city: 'london' },
    { locale: 'ar', city: 'frankfurt' },
    { locale: 'ar', city: 'dubai' },
    { locale: 'ar', city: 'london' },
    { locale: 'de', city: 'berlin' },
    { locale: 'en', city: 'muenchen' },
    { locale: 'ar', city: 'hamburg' },
    // Custom/non-existent cities to verify robustness/no 500 errors
    { locale: 'de', city: 'custom-city-slug' },
    { locale: 'en', city: 'another-custom-city' },
  ];

  for (const { locale, city } of testCases) {
    test(`Dynamic OG Image for locale "${locale}" and city "${city}" should render 200 OK image/png`, async ({ request }) => {
      const url = `http://localhost:3001/${locale}/maerkte/${city}/opengraph-image`;
      const response = await request.get(url);
      expect(response.status()).toBe(200);
      const contentType = response.headers()['content-type'] || '';
      expect(contentType).toContain('image/png');
      
      const bodyBuffer = await response.body();
      expect(bodyBuffer.length).toBeGreaterThan(1000); // PNG must be reasonably sized
      
      // PNG magic number/signature check
      expect(bodyBuffer[0]).toBe(0x89);
      expect(bodyBuffer[1]).toBe(0x50); // P
      expect(bodyBuffer[2]).toBe(0x4e); // N
      expect(bodyBuffer[3]).toBe(0x47); // G
    });
  }

  // Also test root level OG image for all locales
  for (const locale of ['de', 'en', 'ar']) {
    test(`General OG Image for locale "${locale}" should render 200 OK image/png`, async ({ request }) => {
      const url = `http://localhost:3001/${locale}/opengraph-image`;
      const response = await request.get(url);
      expect(response.status()).toBe(200);
      const contentType = response.headers()['content-type'] || '';
      expect(contentType).toContain('image/png');
      
      const bodyBuffer = await response.body();
      expect(bodyBuffer.length).toBeGreaterThan(1000);
      
      // PNG Signature
      expect(bodyBuffer[0]).toBe(0x89);
      expect(bodyBuffer[1]).toBe(0x50);
      expect(bodyBuffer[2]).toBe(0x4e);
      expect(bodyBuffer[3]).toBe(0x47);
    });
  }
});
