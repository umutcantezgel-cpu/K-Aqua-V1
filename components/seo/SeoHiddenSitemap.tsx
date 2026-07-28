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
    <nav data-nosnippet="true" className="sr-only" aria-label="Complete Sitemap for SEO">
      <ul>
        {/* Main Navigation Pages */}
        <li><Link href="/">K-Aqua Homepage</Link></li>
        <li><Link href="/produkte">Alle K-Aqua Produkte</Link></li>
        <li><Link href="/produkte/finder">Product Finder für Rohre</Link></li>
        <li><Link href="/co2-rechner">CO₂-Rechner für PP-R Rohre</Link></li>
        <li><Link href="/projektanfrage">Projektanfrage starten</Link></li>
        <li><Link href="/loesungen">PP-R Lösungen und Vorteile</Link></li>
        <li><Link href="/academy">K-Aqua Academy</Link></li>
        <li><Link href="/trust-center">Trust Center und Zertifikate</Link></li>
        <li><Link href="/service">Service und Downloads</Link></li>
        <li><Link href="/partnerschaft">K-Aqua Partnernetzwerk</Link></li>
        <li><Link href="/maerkte">Alle K-Aqua Märkte</Link></li>
        <li><Link href="/referenzen">Referenzprojekte weltweit</Link></li>
        <li><Link href="/unternehmen">Über KWT GmbH</Link></li>
        <li><Link href="/karriere">Karriere bei K-Aqua</Link></li>
        <li><Link href="/news">K-Aqua News und Presse</Link></li>
        <li><Link href="/kontakt">Kontakt zu K-Aqua</Link></li>
        <li><Link href="/ressourcen/ausschreibungstexte">Ausschreibungstexte für PP-R</Link></li>
        <li><Link href="/ressourcen/support">Technischer Support</Link></li>
        {/* Product Categories */}
        <li><Link href="/produkte/pipes">PP-R und PP-RCT Rohre</Link></li>
        <li><Link href="/produkte/fittings">PP-R Formteile und Fittings</Link></li>
        <li><Link href="/produkte/valves">PP-R Armaturen und Ventile</Link></li>
        <li><Link href="/produkte/tools">Werkzeuge für PP-R Rohrsysteme</Link></li>
        <li><Link href="/produkte/transition-fittings">PP-R Übergangsformteile</Link></li>
        <li><Link href="/produkte/weld-in-saddles">PP-R Einschweißsattel</Link></li>
        <li><Link href="/produkte/accessories">PP-R Zubehör und Ersatzteile</Link></li>
        {/* Products */}
        {products.map(p => {
          if (variantSlugs.has(p.slug)) return null;
          return (
            <li key={`prod-${p.slug}`}>
              <Link href={`/produkte/${p.category}/${p.slug}`}>{p.title || p.slug}</Link>
            </li>
          );
        })}
        {/* News */}
        {newsSlugs.map(slug => (
          <li key={`news-${slug}`}>
            <Link href={`/news/${slug}`}>{slug}</Link>
          </li>
        ))}
        <ul className="flex flex-col gap-1">
          {GEO_HUBS.map(hub => (
            <li key={hub.slug}>
              <Link href={`/maerkte/${hub.slug}`}>Region {hub.name}</Link>
            </li>
          ))}
          {GEO_MARKETS.map(market => (
            <li key={market.slug}>
              <Link href={`/maerkte/${market.hubSlug}/${market.slug}`}>Stadt {market.city}</Link>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
