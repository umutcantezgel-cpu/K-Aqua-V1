# Handoff — Step 19: SEO Metadata & JSON-LD Investigation

## 1. Observation

### Active Page Files Under `app/[locale]` (Excluding `dev/`)
We searched the `app/[locale]` directory and identified **18 active page files**:
- `app/[locale]/page.tsx` (Home page)
- `app/[locale]/academy/page.tsx`
- `app/[locale]/co2-rechner/page.tsx`
- `app/[locale]/impressum/page.tsx`
- `app/[locale]/karriere/page.tsx`
- `app/[locale]/kontakt/page.tsx`
- `app/[locale]/loesungen/page.tsx`
- `app/[locale]/maerkte/page.tsx`
- `app/[locale]/maerkte/[slug]/page.tsx` (Dynamic route)
- `app/[locale]/news/page.tsx`
- `app/[locale]/partnerschaft/page.tsx`
- `app/[locale]/produkte/page.tsx`
- `app/[locale]/produkte/finder/page.tsx`
- `app/[locale]/projektanfrage/page.tsx`
- `app/[locale]/referenzen/page.tsx`
- `app/[locale]/service/page.tsx`
- `app/[locale]/trust-center/page.tsx`
- `app/[locale]/unternehmen/page.tsx`

### Root Layout Analysis (`app/[locale]/layout.tsx`)
We inspected the root layout file `app/[locale]/layout.tsx` (lines 1 to 62):
- **HTML tags & Attributes**: Correctly supports dynamic language (`lang`) and text direction (`dir`) attributes:
  ```tsx
  37:   const dir = locale === 'ar' ? 'rtl' : 'ltr';
  38: 
  39:   return (
  40:     <html lang={locale} dir={dir} suppressHydrationWarning>
  ```
- **Metadata**: Lacks any defined `metadata` object or `generateMetadata` function.

### Translation Files analysis (`messages/`)
- We searched for `"seo"`, `"metadata"`, and `"description"` in `messages/de.json`, `messages/en.json`, and `messages/ar.json`.
- There are no dedicated SEO metadata keys.
- However, we noted a script `scripts/check-locale-parity.mjs` (run via `pnpm i18n:check`), which compares all `.json` files in the `messages/` folder (12 files in total: `ar.json`, `de.json`, `en.json`, `es.json`, `fr.json`, `it.json`, `nl.json`, `pl.json`, `pt.json`, `ru.json`, `tr.json`, `zh.json`).
- If any keys are added for `de`, `en`, and `ar`, they must also be added to all other 9 language files to avoid breaking the locale parity test.

### Individual Page Analysis
- `app/[locale]/page.tsx` is marked with `'use client'` on line 1, which prevents direct export of `generateMetadata` or `metadata`.
- `app/[locale]/maerkte/[slug]/page.tsx` already has an inline `generateMetadata` implementation that sets canonicals and language alternates for the active locales (`de`, `en`, `ar` and `x-default` pointing to `de`).

---

## 2. Logic Chain

1. **Active Page Identification**: Using `find_by_name` for `**/page.tsx` under `app/[locale]` (excluding `dev/**`) correctly retrieved the 18 active routes.
2. **Metadata Setup**: The missing metadata configuration in `app/[locale]/layout.tsx` and `'use client'` on `app/[locale]/page.tsx` means Next.js does not currently render SEO tags (titles, descriptions, alternates) for general pages. The home page needs to be refactored: either extracting its client-side components to a sub-component so that `page.tsx` can be a Server Component exporting metadata, or utilizing layout-level dynamic title generation.
3. **Translation Strategy**: Because `i18n:check` strictly checks for parity across all 12 JSON files, introducing new SEO translations requires adding placeholder keys across all 12 files to maintain build stability.
4. **Helper Utility Design**: A central helper `lib/seo/metadata.ts` should take localized title and description, page path, current locale, and optional parameters (`ogImage`, `noIndex`, `excludeBrandSuffix`). It will compute absolute canonicals and alternate URLs dynamically to prevent duplication of alternate link generation.

---

## 3. Caveats

- **Images**: No default OG images exist in the codebase. The utility will fall back to a placeholder URL (`/images/og-default.png`), which needs to be added by the implementer in the `public` directory.
- **Client Pages**: The Home page must be converted to a Server Component to support metadata export. The current home page contents should be moved to a client component (e.g. `components/sections/HomeClient.tsx` or similar).

---

## 4. Conclusion & Proposed Implementation

### 1. File Refactoring for Home Page (`app/[locale]/page.tsx`)
- Convert `app/[locale]/page.tsx` into a Server Component.
- Move client page logic into `components/sections/HomeClient.tsx` or rename the page file and export metadata from the wrapper.

### 2. New SEO translation namespace in `messages/*.json`
Add the following key structure to **all 12 files** under `messages/`:
```json
  "seo": {
    "home": {
      "title": "...",
      "description": "..."
    },
    "academy": {
      "title": "Academy",
      "description": "..."
    },
    "co2": {
      "title": "CO₂-Rechner",
      "description": "..."
    },
    "impressum": {
      "title": "Impressum",
      "description": "..."
    },
    "karriere": {
      "title": "Karriere & Jobs",
      "description": "..."
    },
    "kontakt": {
      "title": "Kontakt & Support",
      "description": "..."
    },
    "solutions": {
      "title": "Materialvorteile & Lösungen",
      "description": "..."
    },
    "markets": {
      "title": "Märkte & Standorte",
      "description": "..."
    },
    "news": {
      "title": "News & Events",
      "description": "..."
    },
    "partner": {
      "title": "KESSEL-Partnerschaft",
      "description": "..."
    },
    "products": {
      "title": "Produktsystem & Dimensionen",
      "description": "..."
    },
    "finder": {
      "title": "Produktfinder",
      "description": "..."
    },
    "rfq": {
      "title": "Projektanfrage",
      "description": "..."
    },
    "references": {
      "title": "Referenzprojekte",
      "description": "..."
    },
    "service": {
      "title": "Service & Downloads",
      "description": "..."
    },
    "trust": {
      "title": "Trust Center",
      "description": "..."
    },
    "about": {
      "title": "Über uns",
      "description": "..."
    }
  }
```

### 3. Helper Utility: `lib/seo/metadata.ts`
```typescript
import type { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  locale: string;
  ogImage?: string;
  noIndex?: boolean;
  excludeBrandSuffix?: boolean;
}

export function generatePageMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  noIndex = false,
  excludeBrandSuffix = false,
}: MetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const suffix = cleanPath === '/' ? '' : cleanPath;
  const absoluteUrl = (lang: string) => `${siteUrl}/${lang}${suffix}`;

  const canonicalUrl = absoluteUrl(locale);
  const displayTitle = excludeBrandSuffix ? title : `${title} | K-Aqua`;

  const languages: Record<string, string> = {
    de: absoluteUrl('de'),
    en: absoluteUrl('en'),
    ar: absoluteUrl('ar'),
    'x-default': absoluteUrl('de'), // Default fallback to German
  };

  const ogImageUrl = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`)
    : `${siteUrl}/images/og-default.png`;

  return {
    title: displayTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: displayTitle,
      description,
      url: canonicalUrl,
      siteName: 'K-Aqua',
      locale: locale === 'ar' ? 'ar_AR' : locale === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: displayTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description,
      images: [ogImageUrl],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}
```

### 4. JSON-LD Utility Helper: `lib/seo/jsonld.ts`
Implement schema markup helper components or objects:
```typescript
import { routing } from '@/lib/i18n/routing';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KWT GmbH',
    brand: 'K-Aqua',
    url: 'https://k-aqua.de',
    logo: 'https://k-aqua.de/images/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-6085-98999-0',
      contactType: 'sales',
      areaServed: 'Worldwide',
      availableLanguage: ['German', 'English', 'Arabic'],
    },
    sameAs: [
      // Add social links here
    ],
  };
}

export function getWebSiteSchema(locale: string) {
  const siteUrl = 'https://k-aqua.de';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'K-Aqua',
    url: `${siteUrl}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/${locale}/produkte?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
```

---

## 5. Verification Method

### Testing the changes
To verify the configuration is syntactically sound and does not violate routing/translations:
1. Run locale parity check to verify translation keys match across all files:
   ```bash
   pnpm i18n:check
   ```
2. Run TypeScript compilation to check type-safety of the helper:
   ```bash
   pnpm typecheck
   ```
3. Perform Next.js production build:
   ```bash
   pnpm build
   ```
4. Verify the HTML output page headers (e.g. view source or inspect DOM on local server) contains alternate links like:
   ```html
   <link rel="canonical" href="https://k-aqua.de/de/academy" />
   <link rel="alternate" hreflang="de" href="https://k-aqua.de/de/academy" />
   <link rel="alternate" hreflang="en" href="https://k-aqua.de/en/academy" />
   <link rel="alternate" hreflang="ar" href="https://k-aqua.de/ar/academy" />
   <link rel="alternate" hreflang="x-default" href="https://k-aqua.de/de/academy" />
   ```
