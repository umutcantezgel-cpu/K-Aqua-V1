import { MetadataRoute } from 'next';
import { getBaseUrl } from "@/lib/env";
import { ALL_LOCALE_CODES } from "@/lib/i18n/languages";

export default function robots(): MetadataRoute.Robots {
  const domain = getBaseUrl();
  const allowedLocales = ['de', 'en', 'ar'];
  const disallowedLocales = ALL_LOCALE_CODES.filter(loc => !allowedLocales.includes(loc));

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dev/',
        '/api/',
        '/*?*', // Prevent crawling of parametric URLs like sorting/filtering which waste crawl budget
        ...disallowedLocales.map(loc => `/${loc}/`) // Block non-core languages to save crawl budget
      ],
    },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
