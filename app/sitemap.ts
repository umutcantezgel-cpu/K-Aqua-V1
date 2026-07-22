import { MetadataRoute } from 'next';
import { GEO_MARKETS } from '@/lib/data/geo';
import { getAllProducts } from '@/lib/products';
import { CATALOG } from '@/lib/data/catalog';
import { newsRegistry } from '@/content/news';
import { getBaseUrl } from "@/lib/env";

const locales = ['de', 'en', 'ar'];

const staticRoutes = [
  '',
  'academy',
  'co2-rechner',
  'datenschutz',
  'impressum',
  'karriere',
  'kontakt',
  'loesungen',
  'maerkte',
  'news',
  'partnerschaft',
  'produkte',
  'produkte/finder',
  'produkte/pipes',
  'produkte/fittings',
  'produkte/valves',
  'produkte/tools',
  'produkte/transition-fittings',
  'projektanfrage',
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

  // 2. Dynamic market routes
  for (const market of GEO_MARKETS) {
    pushRoute(`maerkte/${market.slug}`, 'monthly', 0.9);
  }

  // 3. Dynamic product detail routes (markdown-based)
  for (const product of getAllProducts()) {
    pushRoute(`produkte/${product.category}/${product.slug}`, 'yearly', 0.6);
  }

  // 4. Catalog detail routes
  for (const category of CATALOG) {
    for (const item of category.items) {
      pushRoute(`produkte/katalog/${category.id}/${item.slug}`, 'yearly', 0.5);
    }
  }

  // 5. News articles
  for (const slug of Object.keys(newsRegistry)) {
    pushRoute(`news/${slug}`, 'yearly', 0.6);
  }

  return entries;
}
