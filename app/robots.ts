import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://k-aqua.de/sitemap.xml',
    host: 'https://k-aqua.de',
  };
}
