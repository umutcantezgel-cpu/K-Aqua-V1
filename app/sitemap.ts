import { MetadataRoute } from 'next';
import { GEO_MARKETS, GEO_HUBS } from '@/lib/data/geo';
import { getAllProducts } from '@/lib/products';
// CATALOG import removed - catalog pages excluded from sitemap (noindex)
import { newsRegistry } from '@/content/news';
import { getBaseUrl } from "@/lib/env";

const locales = ['de', 'en', 'ar'];

const staticRoutes = [
  '',
  'academy',
  'datenschutz',
  'impressum',
  'karriere',
  'kontakt',
  'loesungen',
  'maerkte',
  'news',
  'partnerschaft',
  'produkte',
  'produkte/pipes',
  'produkte/fittings',
  'produkte/valves',
  'produkte/tools',
  'produkte/transition-fittings',
  'produkte/weld-in-saddles',
  'produkte/accessories',
  'projektanfrage',
  'co2-rechner',

  'referenzen',
  'ressourcen/support',
  'ressourcen/ausschreibungstexte',
  'service',
  'sitemap',
  'trust-center',
  'unternehmen',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = getBaseUrl();
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  const pushRoute = (
    route: string,
    changeFrequency: 'weekly' | 'monthly' | 'yearly',
    priority: number,
  ) => {
    const urlFor = (loc: string) => (route === '' ? `${domain}/${loc}` : `${domain}/${loc}/${route}`);
    for (const locale of locales) {
      const alternateLanguages: Record<string, string> = {};
      for (const loc of locales) alternateLanguages[loc] = urlFor(loc);
      alternateLanguages['x-default'] = urlFor('de');
      entries.push({
        url: urlFor(locale),
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: alternateLanguages },
      });
    }
  };

  // 1. Static routes
  for (const route of staticRoutes) {
    pushRoute(route, route === '' ? 'weekly' : 'monthly', route === '' ? 1.0 : 0.8);
  }

  // 2. Dynamic market routes (Hubs and Cities)
  for (const hub of GEO_HUBS) {
    pushRoute(`maerkte/${hub.slug}`, 'monthly', 0.9);
  }
  for (const market of GEO_MARKETS) {
    pushRoute(`maerkte/${market.hubSlug}/${market.slug}`, 'monthly', 0.8);
  }

  // 3. Dynamic product detail routes (markdown-based)
  // Exclude product variants that have canonical rewrites to a primary variant
  const variantSlugs = new Set([
    'k-fiber-pipe-pp-r-sdr-74',
    'k-fiber-pipe-pp-r-sdr-9',
    'k-fiber-pipe-pp-r-sdr-17',
    'k-fiber-pipe-pp-rct-sdr-74',
    'k-fiber-uv-pipe-pp-r-sdr-74',
    'k-fiber-uv-pipe-pp-rct-sdr-74',
    'k-fiberclima-pipe-pp-rct-sdr-11',
    'k-pipe-pp-r-sdr-6',
    'k-pipe-pp-rct-sdr-74',
    'k-pipe-purple-pp-r-sdr-11',
    'reducing-tee-large-sizes',
    'elbow-45',
    'elbow-45-femalemale',
    'metal-union-female-thread',
    'metal-union-female-thread-yellow-brass',
    'flat-gasket-for-unions-pp-r',
    'adjustable-battery-female-thread',
    'concealed-valve-chrome-heavy-part',
    'hand-welding-machine-2063-complete-set',
    'hand-welding-machine-mirror-50125',
    'pipe-cutter-2040',
    'pipe-cutter-50125-1'
  ]);
  for (const product of getAllProducts()) {
    if (variantSlugs.has(product.slug)) continue;
    pushRoute(`produkte/${product.category}/${product.slug}`, 'yearly', 0.6);
  }

  // 4. Catalog detail routes - excluded from sitemap (noindex pages to prevent keyword cannibalization)

  // 5. News articles
  for (const slug of Object.keys(newsRegistry)) {
    pushRoute(`news/${slug}`, 'yearly', 0.6);
  }

  return entries;
}
