import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at the request-scoped config (see lib/i18n/request.ts - Agent 05).
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'self' blob:;
  frame-ancestors 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Barrel-Importe auflösen. 51 Dateien importieren aus 'lucide-react' in der
  // Form `import { ArrowRight, Shield } from 'lucide-react'` — ohne diese
  // Option zieht jeder davon den gesamten Index des Pakets mit und der Bundler
  // muss ihn erst per Tree-Shaking wieder abtragen. Die Optimierung war in
  // `docs/lighthouse.md` dokumentiert, im Baum aber nicht mehr vorhanden:
  // `experimental` fehlte vollständig.
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'motion'],
  },
  // Nur mitnehmen, was zur Laufzeit wirklich vom Dateisystem gelesen wird.
  //
  // Vorher stand hier `./public/**/*` — damit wanderte der gesamte
  // Öffentlichkeitsordner in JEDES Serverless-Bundle: 150 MB Bilder und 113 MB
  // Videos, zusammen 263 MB. Next.js liefert diese Dateien statisch aus; die
  // Serverless-Funktion greift nie auf sie zu. Vercels Grenze für eine
  // entpackte Funktion liegt bei 250 MB — der Eintrag war also nicht nur
  // Ballast, sondern eine tickende Zeitbombe.
  //
  // Belegt wird der Bedarf so:
  //   content/**   lib/products.ts liest die Produkt-Markdowns (readFileSync)
  //   messages/**  lib/i18n/request.ts liest die Sprachdateien (readFileSync)
  //   kaqua-3d     app/api/3d-view/[slug]/route.ts liest die Demo-HTML aus
  //                `kaqua-3d/dist` bzw. `public/kaqua-3d` (existsSync/readFileSync)
  outputFileTracingIncludes: {
    '/**': [
      './content/**/*',
      './messages/**/*',
      './kaqua-3d/dist/**/*',
      './public/kaqua-3d/**/*',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },

  // Qualitäts-Gates: scharf. Ein Build bricht ab, sobald TypeScript einen
  // Fehler meldet oder ESLint einen Error wirft (Warnings bleiben erlaubt).
  // Nicht auf `true` zurückstellen — das war der Grund, warum kaputter Code
  // monatelang unbemerkt deployt werden konnte.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    // Unterseiten, die in afeb284 (18.07.2026) entfernt wurden und seitdem
    // ersatzlos 404 lieferten. Sie stehen teils noch im Index und in externen
    // Links — daher permanent auf die jeweilige Oberseite umleiten.
    const removedSubpages: Record<string, string> = {
      'academy/faq': 'academy',
      'academy/glossar': 'academy',
      'academy/schulungen': 'academy',
      'academy/webinare': 'academy',
      'academy/zertifizierung': 'academy',
      'loesungen/hochhaus': 'loesungen',
      'loesungen/hotels': 'loesungen',
      'loesungen/krankenhaus': 'loesungen',
      'loesungen/rechenzentrum': 'loesungen',
      'loesungen/vorfertigung': 'loesungen',
      'maerkte/trinkwasser': 'maerkte',
      'maerkte/industrie': 'maerkte',
      'maerkte/klimaanlagen': 'maerkte',
      'maerkte/landwirtschaft': 'maerkte',
      'maerkte/schiffbau': 'maerkte',
    };
    const removedSubpageRedirects = Object.entries(removedSubpages).flatMap(
      ([from, to]) => [
        {
          source: `/:locale([a-zA-Z-]{2,7})/${from}`,
          destination: `/:locale/${to}`,
          permanent: true,
        },
        { source: `/${from}`, destination: `/${to}`, permanent: true },
      ]
    );

    // Zwei Produktseiten beschrieben dieselbe Katalogtabelle.
    //
    // Beim Abgleich mit dem Herstellerkatalog 06-2025 stellte sich heraus:
    // „Stub End" und „Flange Adaptor" sind beide die Tabelle „Flange adaptor"
    // auf S. 90 — identischer Artikelbereich AQ79040–AQ790315. „Cross over
    // with socket" und „Cross over" sind beide die Tabelle „Cross over" auf
    // S. 91 (AQ287…); die Schnittzeichnung dort zeigt an beiden Enden eine
    // Muffe mit Einstecktiefe t, das Bauteil IST also das gemuffte. Der
    // eigenständige Artikel daneben ist „Cross over pipe" (AQ285…), das
    // glatte Bogenrohr — der bleibt unangetastet.
    //
    // Kanonisch ist jeweils der Name, unter dem der Katalog die Tabelle führt.
    // Die Dubletten lieferten sonst zwei URLs mit identischem Inhalt, was sich
    // im Index gegenseitig kannibalisiert.
    const duplicateProducts: Record<string, string> = {
      'produkte/fittings/stub-end': 'produkte/fittings/flange-adaptor',
      'produkte/fittings/cross-over-with-socket': 'produkte/fittings/cross-over',
    };
    const duplicateProductRedirects = Object.entries(duplicateProducts).flatMap(
      ([from, to]) => [
        {
          source: `/:locale([a-zA-Z-]{2,7})/${from}`,
          destination: `/:locale/${to}`,
          permanent: true,
        },
        { source: `/${from}`, destination: `/${to}`, permanent: true },
      ]
    );

    return [
      ...removedSubpageRedirects,
      ...duplicateProductRedirects,
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/katalog',
        destination: '/:locale/produkte',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/wissen',
        destination: '/:locale/academy',
        permanent: true,
      },
      {
        source: '/produkte/katalog',
        destination: '/produkte',
        permanent: true,
      },
      {
        source: '/wissen',
        destination: '/academy',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/academy/webinare/anmeldung',
        destination: '/:locale/kontakt',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/downloads',
        destination: '/:locale/ressourcen/ausschreibungstexte',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/ressourcen/downloads',
        destination: '/:locale/ressourcen/ausschreibungstexte',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/:category/index',
        destination: '/:locale/produkte/:category',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/ressourcen',
        destination: '/:locale/ressourcen/ausschreibungstexte',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/ressourcen/co2-rechner',
        destination: '/:locale/co2-rechner',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/ressourcen/katalog',
        destination: '/:locale/produkte/finder',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/unternehmen/karriere',
        destination: '/:locale/karriere',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/unternehmen/kontakt',
        destination: '/:locale/kontakt',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/unternehmen/news',
        destination: '/:locale/news',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/unternehmen/partner',
        destination: '/:locale/partnerschaft',
        permanent: true,
      },
      // Non-locale prefixed versions
      {
        source: '/academy/webinare/anmeldung',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/downloads',
        destination: '/ressourcen/ausschreibungstexte',
        permanent: true,
      },
      {
        source: '/produkte/:category/index',
        destination: '/produkte/:category',
        permanent: true,
      },
      {
        source: '/ressourcen',
        destination: '/ressourcen/ausschreibungstexte',
        permanent: true,
      },
      {
        source: '/ressourcen/co2-rechner',
        destination: '/co2-rechner',
        permanent: true,
      },
      {
        source: '/ressourcen/katalog',
        destination: '/produkte/finder',
        permanent: true,
      },
      {
        source: '/unternehmen/karriere',
        destination: '/karriere',
        permanent: true,
      },
      {
        source: '/unternehmen/kontakt',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/unternehmen/news',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/unternehmen/partner',
        destination: '/partnerschaft',
        permanent: true,
      },
      // Old .php and .html URLs from crawled site
      {
        source: '/about.php',
        destination: '/unternehmen',
        permanent: true,
      },
      {
        source: '/contact.php',
        destination: '/kontakt',
        permanent: true,
      },
      {
        source: '/career.php',
        destination: '/karriere',
        permanent: true,
      },
      {
        source: '/career.html',
        destination: '/karriere',
        permanent: true,
      },
      {
        source: '/privacy.php',
        destination: '/datenschutz',
        permanent: true,
      },
      {
        source: '/imprint.php',
        destination: '/impressum',
        permanent: true,
      },
      {
        source: '/solutions.php',
        destination: '/loesungen',
        permanent: true,
      },
      {
        source: '/products.php',
        destination: '/produkte',
        permanent: true,
      },
      {
        source: '/service.php',
        destination: '/ressourcen/support',
        permanent: true,
      },
      {
        source: '/references.php',
        destination: '/referenzen',
        permanent: true,
      },
      {
        source: '/news.php',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/events.php',
        destination: '/news',
        permanent: true,
      },
      // Fix locale-prefixed static asset requests (e.g. /ar/pdf/...)
      {
        source: '/:locale([a-zA-Z-]{2,7})/pdf/:path*',
        destination: '/pdf/:path*',
        permanent: true,
      },
      // Redirects for fixed product slugs
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/accessories/backing-flange',
        destination: '/:locale/produkte/accessories/backing-flange-pp-steel-sfbf',
        permanent: true,
      },
      {
        source: '/produkte/accessories/backing-flange',
        destination: '/produkte/accessories/backing-flange-pp-steel-sfbf',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/accessories/flat-gasket-for-unions',
        destination: '/:locale/produkte/accessories/flat-gasket-for-unions-pp-r',
        permanent: true,
      },
      {
        source: '/produkte/accessories/flat-gasket-for-unions',
        destination: '/produkte/accessories/flat-gasket-for-unions-pp-r',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/fittings/elbow-45-female-male',
        destination: '/:locale/produkte/fittings/elbow-45-femalemale',
        permanent: true,
      },
      {
        source: '/produkte/fittings/elbow-45-female-male',
        destination: '/produkte/fittings/elbow-45-femalemale',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/tools/hand-welding-machine-20-32',
        destination: '/:locale/produkte/tools/hand-welding-machine-2032-complete-set',
        permanent: true,
      },
      {
        source: '/produkte/tools/hand-welding-machine-20-32',
        destination: '/produkte/tools/hand-welding-machine-2032-complete-set',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/tools/pipe-cutter-20-40',
        destination: '/:locale/produkte/tools/pipe-cutter-2040',
        permanent: true,
      },
      {
        source: '/produkte/tools/pipe-cutter-20-40',
        destination: '/produkte/tools/pipe-cutter-2040',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/tools/pipe-cutter-50-125',
        destination: '/:locale/produkte/tools/pipe-cutter-50125',
        permanent: true,
      },
      {
        source: '/produkte/tools/pipe-cutter-50-125',
        destination: '/produkte/tools/pipe-cutter-50125',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/tools/pipe-cutter-50-125-114',
        destination: '/:locale/produkte/tools/pipe-cutter-50125-1',
        permanent: true,
      },
      {
        source: '/produkte/tools/pipe-cutter-50-125-114',
        destination: '/produkte/tools/pipe-cutter-50125-1',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/valves/pp-r-ball-valve-brass',
        destination: '/:locale/produkte/valves/pp-r-ball-valve-ball-in-brass-chromium-plated',
        permanent: true,
      },
      {
        source: '/produkte/valves/pp-r-ball-valve-brass',
        destination: '/produkte/valves/pp-r-ball-valve-ball-in-brass-chromium-plated',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/produkte/valves/tee-90-female-thread-internal-valve',
        destination: '/:locale/produkte/valves/tee-90-female-thread-for-internal-valve',
        permanent: true,
      },
      {
        source: '/produkte/valves/tee-90-female-thread-internal-valve',
        destination: '/produkte/valves/tee-90-female-thread-for-internal-valve',
        permanent: true,
      },
      // News slug alias redirects
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/trinkwasserhygiene-legionellen',
        destination: '/:locale/news/trinkwasserhygiene-legionellenpraevention-ppr',
        permanent: true,
      },
      {
        source: '/news/trinkwasserhygiene-legionellen',
        destination: '/news/trinkwasserhygiene-legionellenpraevention-ppr',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/brandschutz-feuerwiderstandsklasse',
        destination: '/:locale/news/brandschutz-feuerwiderstandsklasse-b1-ppr-rohre',
        permanent: true,
      },
      {
        source: '/news/brandschutz-feuerwiderstandsklasse',
        destination: '/news/brandschutz-feuerwiderstandsklasse-b1-ppr-rohre',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/schweisstechnik-sicherheit',
        destination: '/:locale/news/schweisstechnik-sicherheit-homogene-materialverbindung-ppr',
        permanent: true,
      },
      {
        source: '/news/schweisstechnik-sicherheit',
        destination: '/news/schweisstechnik-sicherheit-homogene-materialverbindung-ppr',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/lebenszykluskosten-tco',
        destination: '/:locale/news/lebenszykluskosten-tco-investition-ppr-rohre',
        permanent: true,
      },
      {
        source: '/news/lebenszykluskosten-tco',
        destination: '/news/lebenszykluskosten-tco-investition-ppr-rohre',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/messing-polypropylen',
        destination: '/:locale/news/messing-trifft-polypropylen-uebergaenge-bestand',
        permanent: true,
      },
      {
        source: '/news/messing-polypropylen',
        destination: '/news/messing-trifft-polypropylen-uebergaenge-bestand',
        permanent: true,
      },
      {
        source: '/:locale([a-zA-Z-]{2,7})/news/druckverlust-stroemungsdynamik',
        destination: '/:locale/news/druckverlust-stroemungsdynamik-effizienz-ppr',
        permanent: true,
      },
      {
        source: '/news/druckverlust-stroemungsdynamik',
        destination: '/news/druckverlust-stroemungsdynamik-effizienz-ppr',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Aggressive caching for static assets in public/data/ (TopoJSON etc.)
        source: '/data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: '/:path*.(woff2|woff|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images aggressively
        source: '/:path*.(jpg|jpeg|png|gif|svg|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Prevent indexing of PDF files to fix "Nicht analysierbare Datentypen"
        source: '/pdf/:path*.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Edge-cache HTML pages to reduce TTFB / response time
        source: '/:locale(de|en|ar)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
