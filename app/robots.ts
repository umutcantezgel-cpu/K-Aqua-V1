import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
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
    sitemap: 'https://k-aqua.de/sitemap.xml',
    host: 'https://k-aqua.de',
  };
}
