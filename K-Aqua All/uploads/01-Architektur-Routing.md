# Architektur & Routing


## Next.js Konfiguration
```javascript
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
    optimizePackageImports: ['lucide-react', 'motion', 'motion/react'],
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

```

## i18n Routing Setup (lib/i18n/routing.ts)
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['de', 'en', 'ar', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'tr', 'ru', 'zh'],

  // Used when no locale matches
  defaultLocale: 'de',
  localePrefix: 'always'
});


```

## Middleware (middleware.ts)
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

// Locale negotiation + redirect. Only locales whose dictionaries are 100 %
// complete may be listed in routing.locales (see agents/RULES.md → language purity).
export default createMiddleware(routing);

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

```

