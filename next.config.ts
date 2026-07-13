import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Points next-intl at the request-scoped config (see lib/i18n/request.ts — Agent 05).
const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

const securityHeaders = [
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
  // The prototype ships ZERO bitmap assets — every image surface is a <MediaSlot>.
  // When real photography arrives (CMS/public), configure remotePatterns here.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
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
        source: '/:locale/academy/webinare/anmeldung',
        destination: '/:locale/kontakt',
        permanent: true,
      },
      {
        source: '/:locale/downloads',
        destination: '/:locale/ressourcen/downloads',
        permanent: true,
      },
      {
        source: '/:locale/produkte/:category/index',
        destination: '/:locale/produkte/:category',
        permanent: true,
      },
      {
        source: '/:locale/ressourcen',
        destination: '/:locale/ressourcen/downloads',
        permanent: true,
      },
      {
        source: '/:locale/ressourcen/co2-rechner',
        destination: '/:locale/co2-rechner',
        permanent: true,
      },
      {
        source: '/:locale/ressourcen/katalog',
        destination: '/:locale/produkte/finder',
        permanent: true,
      },
      {
        source: '/:locale/unternehmen/karriere',
        destination: '/:locale/karriere',
        permanent: true,
      },
      {
        source: '/:locale/unternehmen/kontakt',
        destination: '/:locale/kontakt',
        permanent: true,
      },
      {
        source: '/:locale/unternehmen/news',
        destination: '/:locale/news',
        permanent: true,
      },
      {
        source: '/:locale/unternehmen/partner',
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
        destination: '/ressourcen/downloads',
        permanent: true,
      },
      {
        source: '/produkte/:category/index',
        destination: '/produkte/:category',
        permanent: true,
      },
      {
        source: '/ressourcen',
        destination: '/ressourcen/downloads',
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
    ];
  },
};

export default withNextIntl(nextConfig);
