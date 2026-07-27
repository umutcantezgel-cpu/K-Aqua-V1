import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at the request-scoped config (see lib/i18n/request.ts - Agent 05).
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const isDev = process.env.NODE_ENV === 'development';
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self' data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
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
    value: 'DENY',
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
  // The prototype ships ZERO bitmap assets - every image surface is a <MediaSlot>.
  // When real photography arrives (CMS/public), configure remotePatterns here.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  outputFileTracingIncludes: {
    '/[locale]/produkte/[category]/[slug]': ['./content/**/*'],
    '/[locale]/produkte/[category]': ['./content/**/*'],
    '/[locale]/produkte': ['./content/**/*'],
    '/[locale]/sitemap': ['./content/**/*'],
    '/[locale]/news': ['./content/**/*'],
    '/[locale]/news/[slug]': ['./content/**/*'],
    '/*': ['./messages/**/*'],
    '/[locale]/**/*': ['./messages/**/*'],
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react', 
      'motion', 
      'motion/react',
      'recharts',
      'framer-motion',
      'three',
      '@react-three/fiber',
      '@react-three/drei'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
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
    ];
  },
};

export default withNextIntl(nextConfig);
