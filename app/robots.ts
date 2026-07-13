import { MetadataRoute } from 'next';
import { getBaseUrl } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  const domain = getBaseUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dev/',
        '/api/',
        '/*?*', // Prevent crawling of parametric URLs like sorting/filtering which waste crawl budget
      ],
    },
    sitemap: `${domain}/sitemap.xml`,
    host: domain,
  };
}
