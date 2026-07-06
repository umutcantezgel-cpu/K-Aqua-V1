import { MetadataRoute } from 'next';
import { GEO_MARKETS } from '@/lib/data/geo';

const locales = ['de', 'en', 'ar'];

const staticRoutes = [
  '',
  'academy',
  'co2-rechner',
  'impressum',
  'karriere',
  'kontakt',
  'loesungen',
  'maerkte',
  'news',
  'partnerschaft',
  'produkte',
  'produkte/finder',
  'projektanfrage',
  'referenzen',
  'service',
  'trust-center',
  'unternehmen',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://k-aqua.de';
  const entries: MetadataRoute.Sitemap = [];

  // 1. Static routes (17 routes * 3 locales = 51 entries)
  for (const route of staticRoutes) {
    for (const locale of locales) {
      const url = route === '' 
        ? `${domain}/${locale}/` 
        : `${domain}/${locale}/${route}`;

      const alternateLanguages: Record<string, string> = {};
      for (const loc of locales) {
        alternateLanguages[loc] = route === '' 
          ? `${domain}/${loc}/` 
          : `${domain}/${loc}/${route}`;
      }
      alternateLanguages['x-default'] = route === '' 
        ? `${domain}/de/` 
        : `${domain}/de/${route}`;

      entries.push({
        url,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  // 2. Dynamic market routes (28 routes * 3 locales = 84 entries)
  for (const market of GEO_MARKETS) {
    const route = `maerkte/${market.slug}`;
    for (const locale of locales) {
      const url = `${domain}/${locale}/${route}`;

      const alternateLanguages: Record<string, string> = {};
      for (const loc of locales) {
        alternateLanguages[loc] = `${domain}/${loc}/${route}`;
      }
      alternateLanguages['x-default'] = `${domain}/de/${route}`;

      entries.push({
        url,
        alternates: {
          languages: alternateLanguages,
        },
      });
    }
  }

  return entries;
}
