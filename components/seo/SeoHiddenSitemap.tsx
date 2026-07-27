import React from 'react';
import { Link } from '@/lib/i18n/navigation';
import { getAllProducts } from '@/lib/products';
import { newsRegistry } from '@/content/news';
import { GEO_HUBS, GEO_MARKETS } from '@/lib/data/geo';

export default function SeoHiddenSitemap() {
  const products = getAllProducts();
  const newsSlugs = Object.keys(newsRegistry);

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

  return (
    <nav className="sr-only" aria-label="Hidden Sitemap for SEO">
      <ul>
        {/* Products */}
        {products.map(p => {
          if (variantSlugs.has(p.slug)) return null;
          return (
            <li key={`prod-${p.slug}`}>
              <Link href={`/produkte/${p.category}/${p.slug}`}>{p.title}</Link>
            </li>
          );
        })}
        {/* News */}
        {newsSlugs.map(slug => (
          <li key={`news-${slug}`}>
            <Link href={`/news/${slug}`}>{slug}</Link>
          </li>
        ))}
        {/* Hubs */}
        {GEO_HUBS.map(hub => (
          <li key={`hub-${hub.slug}`}>
            <Link href={`/maerkte/${hub.slug}`}>{hub.name}</Link>
          </li>
        ))}
        {/* Markets */}
        {GEO_MARKETS.map(market => (
          <li key={`market-${market.slug}`}>
            <Link href={`/maerkte/${market.hubSlug}/${market.slug}`}>{market.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
