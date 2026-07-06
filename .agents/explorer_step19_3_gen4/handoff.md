# Handoff Report — Step 19: SEO Metadata & JSON-LD Explorer

## 1. Observation

### Active Routes
There are 18 active routes found under the `app/[locale]/` directory, which map directly to the corresponding hashes in the prototype. We observed these through `list_dir` on `app/[locale]/`:
- `app/[locale]/page.tsx` (Home page)
- `app/[locale]/produkte/page.tsx` (Products Overview)
- `app/[locale]/produkte/finder/page.tsx` (Product Finder)
- `app/[locale]/loesungen/page.tsx` (Lösungen)
- `app/[locale]/co2-rechner/page.tsx` (CO₂-Rechner)
- `app/[locale]/academy/page.tsx` (Academy)
- `app/[locale]/trust-center/page.tsx` (Trust Center)
- `app/[locale]/partnerschaft/page.tsx` (Partnerschaft)
- `app/[locale]/service/page.tsx` (Service & Downloads)
- `app/[locale]/maerkte/page.tsx` (Markets Hub)
- `app/[locale]/maerkte/[slug]/page.tsx` (Geo City programmatic SEO page, handles 27 cities)
- `app/[locale]/referenzen/page.tsx` (References Globe)
- `app/[locale]/unternehmen/page.tsx` (About Us)
- `app/[locale]/karriere/page.tsx` (Careers)
- `app/[locale]/news/page.tsx` (News & Events)
- `app/[locale]/kontakt/page.tsx` (Contact)
- `app/[locale]/projektanfrage/page.tsx` (RFQ Wizard)
- `app/[locale]/impressum/page.tsx` (Imprint)

### Translation Dictionaries
In `messages/de.json`, we observed the `"pages"` block starting at line 23:
```json
  "pages": {
    "products": [
      "Produktsystem",
      "PP-R/PP-RCT Überblick, d20–d630"
    ],
    "finder": [
      "Produktfinder",
      "Live filtern statt PDF wälzen"
    ],
    "co2": [
      "CO₂-Rechner",
      "Vergleich vs. Kupfer, Stahl, PVC"
    ],
    ...
```
Each route maps directly to a key in the `"pages"` namespace containing a two-element array: index 0 is the localized title, and index 1 is the localized description.

For the exceptions:
- **Home page**: `home.lead` (line 108) provides the description, and `home.h1a` + `home.h1b` provides the title.
- **Impressum**: `imprint.title` (line 573) and `imprint.eyebrow` (line 572).
- **Geo City Page**: Generates metadata dynamically using local data from `GEO_MARKETS` and localized values from `geoContent` and `geo` namespaces.

### ESLint Rules
In `eslint.config.mjs`, we observed the universal i18n guard config at lines 11-27:
```javascript
  {
    // ── UNIVERSAL i18n GUARD (binding, see agents/RULES.md) ──
    // ...
    files: ['app/**/*.tsx', 'components/**/*.tsx'],
    rules: {
      'react/jsx-no-literals': [
        'error',
        {
          noStrings: true,
          allowedStrings: ['·', '—', '/', '+', '×', '•', 'K-Aqua', 'KWT', 'KESSEL', 'PP-R', 'PP-RCT', 'ISO', 'CO₂'],
          ignoreProps: true,
        },
      ],
    },
  }
```
`ignoreProps: true` permits string literals within component props (such as `<JsonLd type="Organization" />` or `<script type="application/ld+json">`). Thus, injecting JSON-LD schema objects using React's standard `dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}` on a `<script>` tag will not trigger any lint errors since both `type` and `dangerouslySetInnerHTML` are attributes/props. Furthermore, `'·'` and `'—'` are allowed strings, meaning they can be used safely inside JSX.

### Existing Metadata Implementation
We ran a project-wide search for `generateMetadata`. Only `app/[locale]/maerkte/[slug]/page.tsx` had an implementation of `generateMetadata` (lines 23-54). All other pages had no metadata definitions.

### Client vs. Server Components
We searched for `'use client'` in the `app` folder and found:
`app/[locale]/page.tsx` is currently a Client Component. Because Next.js doesn't allow exporting `generateMetadata` from client component files, we must convert `app/[locale]/page.tsx` into a Server Component. Since it doesn't contain any React state hooks (`useState`/`useEffect`), this transition is straightforward (replacing the client-side `useTranslations` with server-side `getTranslations`).

---

## 2. Logic Chain

1. **Centralizing SEO Helpers**: To avoid code duplication across 18 routes, we should implement a central metadata helper in `lib/seo/metadata.ts` and a central schema generator in `lib/seo/schemas.ts`.
2. **Developing the JSON-LD Component**: The JSON-LD script is injected into the document using `dangerouslySetInnerHTML`. We can build a reusable `<JsonLd>` component in `components/seo/JsonLd.tsx`. Since `ignoreProps: true` is configured in ESLint, the linter ignores all string literals inside JSX props, allowing `type="application/ld+json"` without violation.
3. **Handling the Home Page client limitation**: The Home page is the only main route with `'use client';` at the top. Next.js App Router rules prohibit exporting metadata from Client Components. Removing `'use client';` and converting it to a Server Component using `getTranslations` enables exporting `generateMetadata` directly while maintaining its children as client-side animated elements.
4. **Rich Results Testing strategy**: Rich results validation (such as `Organization` and `FAQPage`) can be automated locally by adding a Playwright end-to-end test under `tests/seo.spec.ts`. It will launch pages, parse the injected `<script type="application/ld+json">` contents as JSON, and check their conformity against Schema.org types and required fields.

---

## 3. Caveats

- **Slug Lokalisierung**: The optional pathnames localization (`pathnames`-Map in `next-intl`) is prepared but not enforced in Phase 1 (German slugs remain default).
- **External Rich Results Testing**: Google's official Rich Results Test is an online service; local validation checks syntactic validity and structure (valid JSON-LD, correct schema type and fields), which is a robust local proxy.

---

## 4. Conclusion & Proposed Implementation Structure

### Proposed Files

#### A. Central Metadata Helper (`lib/seo/metadata.ts`)
```typescript
import { Metadata } from 'next';
import { routing } from '@/lib/i18n/routing';

interface MetadataOptions {
  locale: string;
  path: string; // e.g. "/produkte", "/maerkte/dubai"
  title: string;
  description: string;
  noIndex?: boolean;
}

export function getMetadata({
  locale,
  path,
  title,
  description,
  noIndex = false,
}: MetadataOptions): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  
  // Normalize path format
  const cleanPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  // Build canonical URL
  const canonicalUrl = `${siteUrl}/${locale}${cleanPath}`;

  // Build alternate links (hreflangs)
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${siteUrl}/${loc}${cleanPath}`;
  }
  // x-default points to the default locale (de)
  languages['x-default'] = `${siteUrl}/de${cleanPath}`;

  const fullTitle = `${title} · K-Aqua`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: 'K-Aqua',
      locale: locale === 'ar' ? 'ar_AE' : locale === 'en' ? 'en_US' : 'de_DE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
      },
    },
  };
}
```

#### B. JSON-LD Schema Generators (`lib/seo/schemas.ts`)
```typescript
/**
 * Generates the Organization schema for the root website metadata.
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'KWT GmbH',
    brand: {
      '@type': 'Brand',
      name: 'K-Aqua',
    },
    url: 'https://k-aqua.de',
    logo: 'https://k-aqua.de/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Auweg 3',
      addressLocality: 'Waldsolms-Brandoberndorf',
      postalCode: '35647',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49 6085 9868-410',
      contactType: 'customer service',
      email: 'info@k-aqua.de',
    },
  };
}

/**
 * Generates the Website schema.
 */
export function getWebSiteSchema(locale: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'K-Aqua',
    url: `${siteUrl}/${locale}`,
  };
}

/**
 * Generates WebPage schema for standard subpages.
 */
export function getWebPageSchema(locale: string, path: string, name: string, description: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${name} · K-Aqua`,
    description,
    url: `${siteUrl}/${locale}${path === '/' ? '' : path}`,
    inLanguage: locale,
  };
}

/**
 * Generates Product schema for product overview.
 */
export function getProductSchema(locale: string, name: string, description: string, image?: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: image || `${siteUrl}/logo.png`,
    brand: {
      '@type': 'Brand',
      name: 'K-Aqua',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '0.00',
      offerCount: '1',
      priceValidUntil: '2027-12-31',
      availability: 'https://schema.org/InStock',
    },
  };
}

/**
 * Generates dynamic schemas for localized pSEO city pages.
 */
export function getGeoCitySchema(
  locale: string,
  slug: string,
  city: string,
  regulator: string,
  water: string,
  description: string
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://k-aqua.de';
  const url = `${siteUrl}/${locale}/maerkte/${slug}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `K-Aqua PP-R & PP-RCT System — ${city}`,
    description,
    url,
    brand: {
      '@type': 'Brand',
      name: 'K-Aqua',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'de' 
          ? `Welche Trinkwassernormen gelten in ${city}?`
          : locale === 'ar'
          ? `ما هي معايير مياه الشرب المعمول بها في ${city}؟`
          : `Which drinking water standards apply in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: regulator,
        },
      },
      {
        '@type': 'Question',
        name: locale === 'de'
          ? `Wie verhält sich das K-Aqua System bei den Wasserbedingungen in ${city}?`
          : locale === 'ar'
          ? `كيف يتكيف نظام K-Aqua مع ظروف المياه في ${city}؟`
          : `How does the K-Aqua system perform under the water conditions in ${city}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: water,
        },
      },
    ],
  };

  return [productSchema, faqSchema];
}
```

#### C. Reusable JSON-LD component (`components/seo/JsonLd.tsx`)
```tsx
import React from 'react';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

## 5. Integration Plan & Code Diffs for the 18 Pages

Here are the precise integration diff structures for each of the 18 active routes.

### 1. Home page (`app/[locale]/page.tsx`)
Converts the page from a client component to a server component to allow exporting metadata and JSON-LD.
```diff
- 'use client';
- 
  import React from 'react';
- import { useTranslations } from 'next-intl';
+ import { getTranslations } from 'next-intl/server';
+ import { getMetadata } from '@/lib/seo/metadata';
+ import { getOrganizationSchema, getWebSiteSchema } from '@/lib/seo/schemas';
+ import { JsonLd } from '@/components/seo/JsonLd';
+ import type { Metadata } from 'next';
  import { ArrowRight } from 'lucide-react';
  ...

+ interface Props {
+   params: Promise<{ locale: string }>;
+ }
+ 
+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const tHome = await getTranslations({ locale, namespace: 'home' });
+   const title = `${tHome('h1a')} ${tHome('h1b')}`;
+   const description = tHome('lead');
+   return getMetadata({
+     locale,
+     path: '/',
+     title,
+     description,
+   });
+ }

- export default function Page() {
-   const tHome = useTranslations('home');
-   const tHomex = useTranslations('homex');
+ export default async function Page({ params }: Props) {
+   const { locale } = await params;
+   const tHome = await getTranslations({ locale, namespace: 'home' });
+   const tHomex = await getTranslations({ locale, namespace: 'homex' });
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={[getOrganizationSchema(), getWebSiteSchema(locale)]} />
        {/* 1) Hero (Hero-Scrollytelling) */}
        ...
```

### 2. Products Overview (`app/[locale]/produkte/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Link } from "@/lib/i18n/navigation";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/produkte",
+     title: t("products.0"),
+     description: t("products.1"),
+   });
+ }

  export default async function ProduktePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "products" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/produkte", tPages("products.0"), tPages("products.1"));

    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 3. Product Finder (`app/[locale]/produkte/finder/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { ProductFinder } from "@/components/tools/ProductFinder";
  import { PRODUCTS } from "@/lib/data/products";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/produkte/finder",
+     title: t("finder.0"),
+     description: t("finder.1"),
+   });
+ }

  export default async function FinderPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "finder" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/produkte/finder", tPages("finder.0"), tPages("finder.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <ProductFinder data={data} initialProducts={PRODUCTS} />
+     </>
    );
  }
```

### 4. Lösungen (`app/[locale]/loesungen/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/loesungen",
+     title: t("solutions.0"),
+     description: t("solutions.1"),
+   });
+ }

  export default async function SolutionsPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "solutions" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/loesungen", tPages("solutions.0"), tPages("solutions.1"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 5. CO₂-Rechner (`app/[locale]/co2-rechner/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Co2Calculator } from "@/components/tools/Co2Calculator";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/co2-rechner",
+     title: t("co2.0"),
+     description: t("co2.1"),
+   });
+ }

  export default async function Co2Page({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "co2" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/co2-rechner", tPages("co2.0"), tPages("co2.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <Co2Calculator data={data} />
+     </>
    );
  }
```

### 6. Academy (`app/[locale]/academy/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Academy } from "@/components/tools/Academy";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/academy",
+     title: t("academy.0"),
+     description: t("academy.1"),
+   });
+ }

  export default async function AcademyPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "academy" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/academy", tPages("academy.0"), tPages("academy.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <Academy data={data} />
+     </>
    );
  }
```

### 7. Trust Center (`app/[locale]/trust-center/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { TrustCenter } from "@/components/tools/TrustCenter";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/trust-center",
+     title: t("trust.0"),
+     description: t("trust.1"),
+   });
+ }

  export default async function TrustPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "trust" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/trust-center", tPages("trust.0"), tPages("trust.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <TrustCenter data={data} />
+     </>
    );
  }
```

### 8. Partnerschaft (`app/[locale]/partnerschaft/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Partner } from "@/components/sections/Partner";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/partnerschaft",
+     title: t("partner.0"),
+     description: t("partner.1"),
+   });
+ }

  export default async function PartnerPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "partner" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/partnerschaft", tPages("partner.0"), tPages("partner.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <Partner data={data} />
+     </>
    );
  }
```

### 9. Service & Downloads (`app/[locale]/service/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/service",
+     title: t("service.0"),
+     description: t("service.1"),
+   });
+ }

  export default async function ServicePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "service" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/service", tPages("service.0"), tPages("service.1"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 10. Markets Hub (`app/[locale]/maerkte/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { MarketsHub } from "@/components/sections/MarketsHub";
  import { GEO_MARKETS } from "@/lib/data/geo";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/maerkte",
+     title: t("markets.0"),
+     description: t("markets.1"),
+   });
+ }

  export default async function MarketsPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "geo" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/maerkte", tPages("markets.0"), tPages("markets.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <MarketsHub data={data} locales={locales} initialMarkets={GEO_MARKETS} />
+     </>
    );
  }
```

### 11. Geo City Programmatic SEO Page (`app/[locale]/maerkte/[slug]/page.tsx`)
Replaces custom metadata with the centralized helper and injects localized dynamic Product and FAQPage JSON-LD.
```diff
  import React from "react";
  import { notFound } from "next/navigation";
  import type { Metadata } from "next";
  import { GEO_MARKETS, nearestMarkets } from "@/lib/data/geo";
  import { routing } from "@/lib/i18n/routing";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getGeoCitySchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
  import GeoCity from "@/components/sections/GeoCity";

  interface Props {
    params: Promise<{ locale: string; slug: string }>;
  }
  ...

  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const market = GEO_MARKETS.find((m) => m.slug === slug);
    if (!market) return {};

    const tGeo = await getTranslations({ locale, namespace: "geo" });
-   
-   // Clean localized title
-   const title = `${market.city} | ${tGeo("eyebrow")} — K-Aqua`;
-   
-   // Localized description using the regulator info
+   const title = `${market.city} · ${tGeo("eyebrow")}`;
    const tRoot = await getTranslations({ locale });
    const geoContentTrans = tRoot.raw("geoContent") as Record<string, { regulator: string }>;
    const localizedRegulator = geoContentTrans[slug]?.regulator || market.regulator;
    const description = `${tGeo("cityLead")} ${localizedRegulator}`;

-   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
-   const languages: Record<string, string> = {};
-   for (const loc of routing.locales) {
-     languages[loc] = `${siteUrl}/${loc}/maerkte/${slug}`;
-   }
-   languages["x-default"] = `${siteUrl}/de/maerkte/${slug}`;
- 
-   return {
-     title,
-     description,
-     alternates: {
-       canonical: `${siteUrl}/${locale}/maerkte/${slug}`,
-       languages,
-     },
-   };
+   return getMetadata({
+     locale,
+     path: `/maerkte/${slug}`,
+     title,
+     description,
+   });
  }

  export default async function GeoCityPage({ params }: Props) {
    ...
    const localizedData = {
      regulator: geoContentTrans[slug]?.regulator || market.regulator,
      water: geoContentTrans[slug]?.water || market.water,
      focus: geoContentTrans[slug]?.focus || market.focus,
      note: geoContentTrans[slug]?.note || market.note,
      focusHeading: geoContentTrans[slug]?.focusHeading || tGeo("typical", { city: market.city })
    };
+
+   const geoCitySchema = getGeoCitySchema(
+     locale,
+     slug,
+     market.city,
+     localizedData.regulator,
+     localizedData.water,
+     `${tGeo("cityLead")} ${localizedData.regulator}`
+   );

    ...
    return (
+     <>
+       <JsonLd data={geoCitySchema} />
        <GeoCity
          locale={locale}
          market={market}
          localizedData={localizedData}
          geoTrans={geoTrans}
          regionsTrans={regionsTrans}
          nearestMarkets={nearestLocalized}
        />
+     </>
    );
  }
```

### 12. References Globe (`app/[locale]/referenzen/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { References } from "@/components/sections/References";
  import { GEO_MARKETS } from "@/lib/data/geo";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/referenzen",
+     title: t("references.0"),
+     description: t("references.1"),
+   });
+ }

  export default async function ReferenzenPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "references" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/referenzen", tPages("references.0"), tPages("references.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <References data={data} initialMarkets={GEO_MARKETS} />
+     </>
    );
  }
```

### 13. Unternehmen / About Us (`app/[locale]/unternehmen/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/unternehmen",
+     title: t("about.0"),
+     description: t("about.1"),
+   });
+ }

  export default async function AboutPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/unternehmen", tPages("about.0"), tPages("about.1"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 14. Karriere (`app/[locale]/karriere/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Career } from "@/components/tools/Career";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/karriere",
+     title: t("career.0"),
+     description: t("career.1"),
+   });
+ }

  export default async function KarrierePage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "career" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/karriere", tPages("career.0"), tPages("career.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <Career data={data} />
+     </>
    );
  }
```

### 15. News & Events (`app/[locale]/news/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/news",
+     title: t("news.0"),
+     description: t("news.1"),
+   });
+ }

  export default async function NewsPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "news" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/news", tPages("news.0"), tPages("news.1"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 16. Kontakt (`app/[locale]/kontakt/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/kontakt",
+     title: t("contact.0"),
+     description: t("contact.1"),
+   });
+ }

  export default async function KontaktPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/kontakt", tPages("contact.0"), tPages("contact.1"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

### 17. Projektanfrage / RFQ (`app/[locale]/projektanfrage/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { RfqWizard } from "@/components/tools/RfqWizard";

  interface Props {
    params: Promise<{ locale: string }>;
  }

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "pages" });
+   return getMetadata({
+     locale,
+     path: "/projektanfrage",
+     title: t("rfq.0"),
+     description: t("rfq.1"),
+   });
+ }

  export default async function RfqPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "rfq" });
+   const tPages = await getTranslations({ locale, namespace: "pages" });
+   const webPageSchema = getWebPageSchema(locale, "/projektanfrage", tPages("rfq.0"), tPages("rfq.1"));
    ...
    return (
+     <>
+       <JsonLd data={webPageSchema} />
        <RfqWizard data={data} />
+     </>
    );
  }
```

### 18. Impressum (`app/[locale]/impressum/page.tsx`)
```diff
  import React from "react";
  import { getTranslations } from "next-intl/server";
+ import { getMetadata } from "@/lib/seo/metadata";
+ import { getWebPageSchema } from "@/lib/seo/schemas";
+ import { JsonLd } from "@/components/seo/JsonLd";
+ import type { Metadata } from "next";
  import { Card } from "@/components/ui/Card";
  ...

+ export async function generateMetadata({ params }: Props): Promise<Metadata> {
+   const { locale } = await params;
+   const t = await getTranslations({ locale, namespace: "imprint" });
+   return getMetadata({
+     locale,
+     path: "/impressum",
+     title: t("title"),
+     description: t("eyebrow"),
+   });
+ }

  export default async function ImpressumPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "imprint" });
+   const webPageSchema = getWebPageSchema(locale, "/impressum", t("title"), t("eyebrow"));
    ...
    return (
      <div className="flex flex-col w-full min-h-screen bg-background">
+       <JsonLd data={webPageSchema} />
        {/* Hero Section */}
```

---

## 6. Verification Method

To verify the integration, run the following:

1. **Verify ESLint and TypeScript compilation**:
   ```bash
   npm run lint
   npm run typecheck
   ```
2. **Execute E2E Integration test**:
   Write a Playwright test file at `tests/seo.spec.ts` with the following content:
   ```typescript
   import { test, expect } from '@playwright/test';

   const ACTIVE_ROUTES = [
     '/',
     '/produkte',
     '/produkte/finder',
     '/loesungen',
     '/co2-rechner',
     '/academy',
     '/trust-center',
     '/partnerschaft',
     '/service',
     '/maerkte',
     '/maerkte/frankfurt',
     '/maerkte/dubai',
     '/referenzen',
     '/unternehmen',
     '/karriere',
     '/projektanfrage',
     '/news',
     '/kontakt',
     '/impressum',
   ];

   test.describe('Step 19: SEO Metadata & JSON-LD Validation', () => {
     for (const route of ACTIVE_ROUTES) {
       test(`should render valid metadata and JSON-LD for German route: ${route}`, async ({ page }) => {
         const response = await page.goto(`http://localhost:3001/de${route === '/' ? '' : route}`);
         expect(response?.status()).toBe(200);

         const title = await page.title();
         expect(title).toContain('K-Aqua');

         const description = await page.locator('meta[name="description"]').getAttribute('content');
         expect(description).toBeTruthy();
         expect(description!.length).toBeGreaterThan(10);

         const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
         expect(canonical).toBeTruthy();
         expect(canonical).toContain('https://k-aqua.de/de');

         const jsonLdScripts = page.locator('script[type="application/ld+json"]');
         const count = await jsonLdScripts.count();
         expect(count).toBeGreaterThanOrEqual(1);

         for (let i = 0; i < count; i++) {
           const content = await jsonLdScripts.nth(i).innerHTML();
           expect(content).toBeTruthy();

           let parsedSchema: any;
           expect(() => {
             parsedSchema = JSON.parse(content);
           }).not.toThrow();

           expect(parsedSchema['@context']).toBe('https://schema.org');
           expect(parsedSchema['@type']).toBeTruthy();

           if (route === '/') {
             if (parsedSchema['@type'] === 'Organization') {
               expect(parsedSchema.name).toBe('KWT GmbH');
               expect(parsedSchema.address?.streetAddress).toBe('Auweg 3');
               expect(parsedSchema.contactPoint?.telephone).toBe('+49 6085 9868-410');
             }
           }

           if (route.startsWith('/maerkte/') && route !== '/maerkte') {
             if (parsedSchema['@type'] === 'FAQPage') {
               expect(Array.isArray(parsedSchema.mainEntity)).toBe(true);
               expect(parsedSchema.mainEntity.length).toBeGreaterThanOrEqual(1);
               expect(parsedSchema.mainEntity[0]['@type']).toBe('Question');
               expect(parsedSchema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
             }
           }
         }
       });
     }
   });
   ```
   Start the local dev server (`npm run dev`) and run the test using:
   ```bash
   npx playwright test tests/seo.spec.ts
   ```
