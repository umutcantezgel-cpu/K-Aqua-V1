import fs from 'node:fs';
import path from 'node:path';
import { GEO_HUBS, GEO_MARKETS } from '../lib/data/geo';
import { getAllProducts } from '../lib/products';
import { newsRegistry, resolveLocalized } from '../content/news';

const ROOT_DIR = process.cwd();
const LOCALES = ['de', 'en', 'ar'];

interface MetaResult {
  locale: string;
  url: string;
  title: string;
  description: string;
  titlePresent: boolean;
  descPresent: boolean;
  titleUnique: boolean;
  descUnique: boolean;
  status: 'PASS' | 'FAIL';
  failureReasons: string[];
}

function loadLocaleJson(locale: string): any {
  const filePath = path.join(ROOT_DIR, 'messages', `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Locale file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

/**
 * Replicates constructMetadata formatting from lib/seo/metadata.ts
 */
function formatTitle(rawTitle: string): string {
  if (!rawTitle) return '';
  let cleanTitle = rawTitle.replace(/\s*?[|·-]\s*?K-Aqua(.*)?$/i, '').trim();
  cleanTitle = cleanTitle.replace(/^K-Aqua\s*?[|·-]\s*?/i, '').trim();
  return `${cleanTitle} | K-Aqua`;
}

function formatDescription(rawDesc: string, locale: string): string {
  if (!rawDesc) return '';
  let desc = rawDesc.trim();
  if (desc.length < 130) {
    if (locale === 'de') desc += ' Entdecken Sie unsere zertifizierten PP-R & PP-RCT Rohrleitungssysteme.';
    else if (locale === 'en') desc += ' Discover our certified PP-R & PP-RCT piping systems.';
    else if (locale === 'ar') desc += ' اكتشف أنظمة الأنابيب المعتمدة من PP-R و PP-RCT.';
  }
  return desc;
}

function getNestedValue(obj: any, pathStr: string): any {
  const parts = pathStr.split('.');
  let curr = obj;
  for (const p of parts) {
    if (curr === null || curr === undefined) return undefined;
    curr = curr[p];
  }
  return curr;
}

function interpolate(template: string, vars: Record<string, string>): string {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '');
}

function collectRoutesForLocale(locale: string, msgs: any): { url: string; title: string; description: string }[] {
  const routes: { url: string; title: string; description: string }[] = [];

  // Helper for static pages
  const addStatic = (path: string, rawTitle: string, rawDesc: string) => {
    routes.push({
      url: path === '' ? `/${locale}` : `/${locale}/${path}`,
      title: formatTitle(rawTitle),
      description: formatDescription(rawDesc, locale),
    });
  };

  // 1. Home
  const h1a = getNestedValue(msgs, 'home.h1a') || '';
  const h1b = getNestedValue(msgs, 'home.h1b') || '';
  const homeLead = getNestedValue(msgs, 'home.lead') || '';
  addStatic('', `${h1a} ${h1b}`, homeLead);

  // 2. Static pages defined in messages[locale].pages
  const pagesMap: Record<string, string> = {
    academy: 'academy',
    'co2-rechner': 'co2',
    datenschutz: 'datenschutz',
    impressum: 'impressum',
    karriere: 'career',
    kontakt: 'contact',
    maerkte: 'markets',
    partnerschaft: 'partner',
    'produkte/finder': 'finder',
    projektanfrage: 'rfq',
    referenzen: 'references',
    service: 'service',
    'trust-center': 'trust',
    unternehmen: 'about',
  };

  for (const [routePath, key] of Object.entries(pagesMap)) {
    const arr = getNestedValue(msgs, `pages.${key}`);
    if (Array.isArray(arr)) {
      addStatic(routePath, arr[0] || '', arr[1] || '');
    } else if (typeof arr === 'string') {
      addStatic(routePath, arr, '');
    }
  }

  // 3. Loesungen
  const solTitle = getNestedValue(msgs, 'solutions.index.meta.title') || getNestedValue(msgs, 'pages.solutions.0') || 'Lösungen & K-Aqua Vorteile';
  const solDesc = getNestedValue(msgs, 'solutions.index.meta.desc') || getNestedValue(msgs, 'pages.solutions.1') || '';
  addStatic('loesungen', solTitle, solDesc);

  // 4. News overview
  const newsTitle = getNestedValue(msgs, 'news.meta.title') || getNestedValue(msgs, 'pages.news.0') || 'News & Insights';
  const newsDesc = getNestedValue(msgs, 'news.meta.desc') || getNestedValue(msgs, 'pages.news.1') || '';
  addStatic('news', newsTitle, newsDesc);

  // 5. Products main overview
  const prodTitle = getNestedValue(msgs, 'products.metaTitle') || getNestedValue(msgs, 'pages.products.0') || 'Produkte & Fittings';
  const prodDesc = getNestedValue(msgs, 'products.metaDesc') || getNestedValue(msgs, 'pages.products.1') || '';
  addStatic('produkte', prodTitle, prodDesc);

  // 6. Product Subcategories (pipes, fittings, valves, tools, transition-fittings)
  const categorySpecs: { cat: string; ns: string; isMetaChild: boolean }[] = [
    { cat: 'pipes', ns: 'products.pipes.meta', isMetaChild: true },
    { cat: 'fittings', ns: 'products.fittings.meta', isMetaChild: true },
    { cat: 'valves', ns: 'products.valves', isMetaChild: false },
    { cat: 'tools', ns: 'products.tools', isMetaChild: false },
    { cat: 'transition-fittings', ns: 'products.transitionFittings.meta', isMetaChild: true },
  ];

  for (const spec of categorySpecs) {
    const subTitle = spec.isMetaChild
      ? getNestedValue(msgs, `${spec.ns}.title`)
      : getNestedValue(msgs, `${spec.ns}.metaTitle`);
    const subDesc = spec.isMetaChild
      ? getNestedValue(msgs, `${spec.ns}.desc`)
      : getNestedValue(msgs, `${spec.ns}.metaDesc`);
    addStatic(`produkte/${spec.cat}`, subTitle || '', subDesc || '');
  }

  // 7. Ressourcen subpages
  const aussTitle = getNestedValue(msgs, 'resources.ausschreibungstexte.meta.title') || 'Ausschreibungstexte & GAEB-Dateien';
  const aussDesc = getNestedValue(msgs, 'resources.ausschreibungstexte.meta.desc') || '';
  addStatic('ressourcen/ausschreibungstexte', aussTitle, aussDesc);

  const suppTitle = getNestedValue(msgs, 'resources.support.title') || getNestedValue(msgs, 'resources.support.metaTitle') || 'Technische Ressourcen & Download Center';
  const suppDesc = getNestedValue(msgs, 'resources.support.metaDesc') || '';
  addStatic('ressourcen/support', suppTitle, suppDesc);

  // 8. Sitemap
  addStatic('sitemap', 'HTML Sitemap: Alle Seiten', 'Sitemap der K-Aqua Website mit allen Produkten, News und Ressourcen.');

  // 9. Geo Hubs
  const hubMetaTitleTpl = getNestedValue(msgs, 'geo.hubMetaTitle') || 'K-Aqua Rohrsysteme in {country}';
  const hubLeadTpl = getNestedValue(msgs, 'geo.hubLead') || '';
  for (const hub of GEO_HUBS) {
    const tTitle = interpolate(hubMetaTitleTpl, { country: hub.name });
    const tDesc = getNestedValue(msgs, `geo.hubs.${hub.slug}.metaDesc`) ||
      getNestedValue(msgs, `geo.hubs.${hub.slug}.description`) ||
      interpolate(hubLeadTpl, { country: hub.name }) ||
      hub.description;
    addStatic(`maerkte/${hub.slug}`, tTitle, tDesc);
  }

  // 10. Geo Cities
  const cityMetaTitleTpl = getNestedValue(msgs, 'geo.cityMetaTitle') || 'K-Aqua Rohrsysteme in {city}, {country}';
  const cityMetaDescTpl = getNestedValue(msgs, 'geo.cityMetaDesc') || 'PP-R & PP-RCT Rohrsysteme für {city}. Konform mit {regulator}.';
  const cityLeadTpl = getNestedValue(msgs, 'geo.cityLead') || '';
  for (const market of GEO_MARKETS) {
    const tTitle = interpolate(cityMetaTitleTpl, { city: market.city, country: market.country });
    let tDesc = interpolate(cityMetaDescTpl, { city: market.city, regulator: market.regulator });
    if (!tDesc || tDesc.trim() === '') {
      tDesc = `${interpolate(cityLeadTpl, { city: market.city })} ${market.regulator}. ${market.water}`;
    }
    addStatic(`maerkte/${market.hubSlug}/${market.slug}`, tTitle, tDesc);
  }

  // 11. Product detail pages
  const variantSlugs = new Set([
    'k-fiber-pipe-pp-r-sdr-74',
    'k-fiber-pipe-pp-r-sdr-9',
    'k-fiber-pipe-pp-r-sdr-17',
    'k-pipe-pp-r-sdr-6',
    'hand-welding-machine-20-63',
  ]);
  const products = getAllProducts();
  for (const prod of products) {
    if (variantSlugs.has(prod.slug)) continue;
    const catLabel = getNestedValue(msgs, `catalogx.cats.${prod.category}.label`) || prod.category;
    const itemSeo1 = getNestedValue(msgs, `catalogx.items.${prod.slug}.seo_p1`);
    const rawTitle = `${prod.title} (${catLabel})`;
    const rawDesc = itemSeo1 || (prod as any).metaDescription || (prod as any).description || `${prod.title} - Hochwertiges K-Aqua PP-R Rohrsystem.`;
    addStatic(`produkte/${prod.category}/${prod.slug}`, rawTitle, rawDesc);
  }

  // 12. News detail pages
  for (const [slug, article] of Object.entries(newsRegistry)) {
    const rawTitle = resolveLocalized((article as any).title, locale);
    const rawDesc = resolveLocalized((article as any).teaser || (article as any).excerpt || (article as any).lead, locale) || `${rawTitle} - K-Aqua News & Insights`;
    addStatic(`news/${slug}`, rawTitle, rawDesc);
  }

  return routes;
}

function runMetaVerification() {
  console.log('========================================================================');
  console.log('  K-AQUA READ-ONLY VERIFICATION: META-TITLE & META-DESCRIPTION AUDIT');
  console.log('========================================================================\n');

  let totalAudited = 0;
  let totalPassed = 0;
  let totalFailed = 0;
  const allResults: MetaResult[] = [];

  for (const locale of LOCALES) {
    const msgs = loadLocaleJson(locale);
    const routes = collectRoutesForLocale(locale, msgs);

    // Track uniqueness within locale
    const titleCounts = new Map<string, number>();
    const descCounts = new Map<string, number>();

    for (const r of routes) {
      if (r.title) titleCounts.set(r.title, (titleCounts.get(r.title) || 0) + 1);
      if (r.description) descCounts.set(r.description, (descCounts.get(r.description) || 0) + 1);
    }

    for (const r of routes) {
      totalAudited++;
      const titlePresent = Boolean(r.title && r.title.trim().length > 0);
      const descPresent = Boolean(r.description && r.description.trim().length > 0);
      const titleUnique = (titleCounts.get(r.title) || 0) <= 1;
      const descUnique = (descCounts.get(r.description) || 0) <= 1;

      const failureReasons: string[] = [];
      if (!titlePresent) failureReasons.push('Missing Title');
      if (!descPresent) failureReasons.push('Missing Description');
      if (!titleUnique) failureReasons.push(`Duplicate Title ("${r.title}")`);
      if (!descUnique) failureReasons.push(`Duplicate Description ("${r.description.slice(0, 40)}…")`);

      const pass = titlePresent && descPresent && titleUnique && descUnique;
      if (pass) totalPassed++;
      else totalFailed++;

      allResults.push({
        locale,
        url: r.url,
        title: r.title,
        description: r.description,
        titlePresent,
        descPresent,
        titleUnique,
        descUnique,
        status: pass ? 'PASS' : 'FAIL',
        failureReasons,
      });
    }
  }

  // Print Clean Table Summary
  console.log('| Locale | Status | URL Path                                   | Title Preview                              | Failure Details');
  console.log('|--------|--------|--------------------------------------------|--------------------------------------------|----------------------------------------------------');

  for (const res of allResults) {
    const statusIcon = res.status === 'PASS' ? '✓ PASS' : '✖ FAIL';
    const loc = res.locale.padStart(6);
    const urlPadded = res.url.slice(0, 42).padEnd(42);
    const titlePreview = (res.title.length > 40 ? res.title.slice(0, 37) + '...' : res.title).padEnd(42);
    const details = res.failureReasons.length > 0 ? res.failureReasons.join('; ') : 'OK (Unique & Present)';

    console.log(`| ${loc} | ${statusIcon} | ${urlPadded} | ${titlePreview} | ${details}`);
  }

  console.log('\n========================================================================');
  console.log(`  META VERIFICATION SUMMARY (Locales: ${LOCALES.join(', ')})`);
  console.log(`  Total Page URLs Audited : ${totalAudited}`);
  console.log(`  Passed (Unique & Present): ${totalPassed}`);
  console.log(`  Failed                  : ${totalFailed}`);
  console.log('========================================================================\n');

  if (totalFailed > 0) {
    console.error('\n✖ FAILING URL DETAILS:');
    for (const res of allResults.filter(r => r.status === 'FAIL')) {
      console.error(`  - [${res.locale}] ${res.url}: ${res.failureReasons.join('; ')}`);
      console.error(`    Title: "${res.title}"`);
      console.error(`    Desc : "${res.description}"\n`);
    }
    console.error('✖ Meta verification FAILED: One or more page URLs have empty or duplicate Meta-Title / Meta-Description.');
    process.exit(1);
  } else {
    console.log('✓ Meta verification PASSED: Every page URL across de, en, ar has a non-empty and unique Meta-Title and Meta-Description.');
    process.exit(0);
  }
}

runMetaVerification();
