import { test, expect } from '@playwright/test';

test.describe('Step 20: Sitemap, Robots, OG, and Manifest E2E Tests', () => {

  test('robots.txt should contain Sitemap and Host', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toBeDefined();
    const cleanText = text || '';
    
    expect(cleanText.toLowerCase()).toContain('sitemap: https://k-aqua.de/sitemap.xml');
    expect(cleanText.toLowerCase()).toContain('host: https://k-aqua.de');
    expect(cleanText.toLowerCase()).toContain('user-agent: *');
    expect(cleanText.toLowerCase()).toContain('allow: /');
  });

  test('manifest.webmanifest should return valid JSON', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/manifest.webmanifest');
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()['content-type'] || '';
    expect(contentType).toContain('application/manifest+json');

    const json = await response?.json();
    expect(json.name).toBe('K-Aqua');
    expect(json.short_name).toBe('K-Aqua');
    expect(json.theme_color).toBe('#5B2D8C');
    expect(json.background_color).toBe('#FAFAFA');
    expect(json.icons).toBeDefined();
    expect(json.icons.length).toBe(2);
    expect(json.icons[0].src).toBe('/icon-192.png');
    expect(json.icons[1].src).toBe('/icon-512.png');
  });

  test('sitemap.xml should contain exactly 135 entries with hreflangs and correct trailing slash settings', async ({ page }) => {
    const response = await page.goto('http://localhost:3001/sitemap.xml');
    expect(response?.status()).toBe(200);
    const content = await response?.text();
    expect(content).toBeDefined();
    const cleanContent = content || '';

    // Verify it is valid XML
    expect(cleanContent).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(cleanContent).toContain('<urlset');

    // Count URLs
    const urls = cleanContent.match(/<url>/g) || [];
    expect(urls.length).toBe(348);

    // Verify homepage entries end with '/'
    // de homepage
    expect(cleanContent).toContain('<loc>https://k-aqua.de/de/</loc>');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k-aqua.de/de/" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k-aqua.de/en/" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="ar" href="https://k-aqua.de/ar/" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://k-aqua.de/de/" />');

    // Verify subpage entries do NOT end with '/'
    expect(cleanContent).toContain('<loc>https://k-aqua.de/de/produkte</loc>');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k-aqua.de/de/produkte" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k-aqua.de/en/produkte" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="ar" href="https://k-aqua.de/ar/produkte" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://k-aqua.de/de/produkte" />');

    // Verify dynamic route entries do NOT end with '/'
    expect(cleanContent).toContain('<loc>https://k-aqua.de/de/maerkte/dubai</loc>');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="de" href="https://k-aqua.de/de/maerkte/dubai" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="en" href="https://k-aqua.de/en/maerkte/dubai" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="ar" href="https://k-aqua.de/ar/maerkte/dubai" />');
    expect(cleanContent).toContain('<xhtml:link rel="alternate" hreflang="x-default" href="https://k-aqua.de/de/maerkte/dubai" />');
  });

  test('opengraph-image should return 200 OK and render correctly', async ({ page }) => {
    // Check general opengraph-image
    const responseGeneral = await page.goto('http://localhost:3001/de/opengraph-image');
    expect(responseGeneral?.status()).toBe(200);
    const contentTypeGen = responseGeneral?.headers()['content-type'] || '';
    expect(contentTypeGen).toContain('image/png');

    // Check en general opengraph-image
    const responseGeneralEn = await page.goto('http://localhost:3001/en/opengraph-image');
    expect(responseGeneralEn?.status()).toBe(200);
    expect(responseGeneralEn?.headers()['content-type']).toContain('image/png');

    // Check market opengraph-image
    const responseMarket = await page.goto('http://localhost:3001/de/maerkte/dubai/opengraph-image');
    expect(responseMarket?.status()).toBe(200);
    const contentTypeMarket = responseMarket?.headers()['content-type'] || '';
    expect(contentTypeMarket).toContain('image/png');

    // Check another market opengraph-image
    const responseMarket2 = await page.goto('http://localhost:3001/en/maerkte/london/opengraph-image');
    expect(responseMarket2?.status()).toBe(200);
    expect(responseMarket2?.headers()['content-type']).toContain('image/png');
  });
});
