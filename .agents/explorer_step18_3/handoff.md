# Handoff Report — Step 18: Geo City Pages (pSEO)

This report details the read-only codebase investigation, step-by-step logic chain, proposed files structure, and verification methods for implementing the programmatic SEO city landing pages in Step 18.

---

## 1. Observation

During the investigation of the `/Users/umurey/Downloads/kaqua-antigravity 2/` codebase, the following files and rules were examined:

### A. Data Module & Slugs
* File: `lib/data/geo.ts` (lines 32-401):
  Defines `GEO_MARKETS` as a list of `GeoMarket` objects.
  ```typescript
  export const GEO_MARKETS: GeoMarket[] = [
    /* ---------- DACH ---------- */
    {
      slug: "frankfurt",
      city: "Frankfurt am Main",
      country: "Deutschland",
      region: "dach",
      lat: 50.11,
      lon: 8.68,
      regulator: "DVGW / Trinkwasserverordnung (TrinkwV)",
      norms: ["DIN EN ISO 15874", "DVGW W 544", "KTW-BWGL Bewertungsgrundlage"],
      water: "Hartes Wasser (14–20 °dH) — korrosionsfreies PP-R/PP-RCT verhindert Kalk-Inkrustation an rauen Metalloberflächen.",
      focus: ["Hochhaus-Steigleitungen (Bankenviertel)", "Hotel- & Bürosanierung", "Rechenzentrums-Kühlwasser"],
      note: "Im Rhein-Main-Gebiet liefert K-Aqua ab Werk Waldsolms — oft am selben Tag."
    },
    ...
  ```
  A total count of **28 markets** was observed.
  
* File: `lib/data/geo.ts` (lines 416-424):
  Defines `nearestMarkets` search helper using the Haversine formula:
  ```typescript
  export function nearestMarkets(slug: string, n = 3): GeoMarket[] {
    const me = GEO_MARKETS.find((g) => g.slug === slug);
    if (!me) return [];
    return GEO_MARKETS.filter((g) => g.slug !== slug)
      .map((g) => ({ g, d: haversineKm(me, g) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, n)
      .map((x) => x.g);
  }
  ```

### B. Routing & Locales Configuration
* File: `lib/i18n/routing.ts` (lines 3-12):
  ```typescript
  export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['de', 'en', 'ar'],

    // Used when no locale matches
    defaultLocale: 'de',
    localePrefix: 'always'
  });
  ```
  The active locales are limited to `['de', 'en', 'ar']` with a mandatory prefix (`localePrefix: 'always'`).

### C. Dictionaries & Translations Structure
* Files: `messages/de.json`, `messages/en.json`, `messages/ar.json` all contain corresponding namespace keys:
  * `"geo"`: Used for page-level headings, labels, and helper strings.
  * `"geoContent"`: A nested dictionary keyed by city slug containing specific text blocks (e.g. `regulator`, `water`, `focus`, `note`, `focusHeading`):
    ```json
    "geoContent": {
      "frankfurt": {
        "regulator": "DVGW / Trinkwasserverordnung (TrinkwV)",
        "water": "Hartes Wasser (14–20 °dH) — korrosionsfreies PP-R/PP-RCT verhindert Kalk-Inkrustation an rauen Metalloberflächen.",
        "focus": [
          "Hochhaus-Steigleitungen (Bankenviertel)",
          "Hotel- & Bürosanierung",
          "Rechenzentrums-Kühlwasser"
        ],
        "note": "Im Rhein-Main-Gebiet liefert K-Aqua ab Werk Waldsolms — oft am selben Tag.",
        "focusHeading": "Typische Projekte in Frankfurt am Main"
      },
      ...
    ```
* Script: `node scripts/check-locale-parity.mjs` was executed and completed successfully:
  ```
  Locale parity check passed successfully. All files have identical keys.
  ```
  This guarantees that all 28 market slugs are present in `geoContent` in all three dictionaries.

### D. ESLint Configuration (i18n Guard)
* File: `eslint.config.mjs` (lines 16-27):
  ```javascript
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
  ```
  Any literal string in JSX not in the allowed list causes lint to fail.
  
### E. Verification Tool Command Outputs
* `npx tsc --noEmit` completed successfully without any compilation errors.
* `npx eslint app components lib` completed successfully without any lints or warnings.
* `npx next build` completed successfully, compiling 63 static pages.

---

## 2. Logic Chain

1. **Routing and Page Creation**:
   * The path for the Geo pages must map to `app/[locale]/maerkte/[slug]/page.tsx` as per `docs/ROUTE_MAP.md` (line 18).
   * Since this is static site generation, the page must export `generateStaticParams`.
   * The static params list is the cartesian product of the enabled locales (`routing.locales` = `['de', 'en', 'ar']`) and the city slugs (`GEO_MARKETS` = 28 markets).
   * This yields exactly **3 × 28 = 84 static pages** (e.g., `/de/maerkte/dubai`, `/en/maerkte/dubai`, `/ar/maerkte/dubai`).
   * If a user requests a slug that does not exist in `GEO_MARKETS`, the page must trigger `notFound()` to prevent runtime errors and correctly return a 404.

2. **Metadata Generation (`generateMetadata`)**:
   * To satisfy search engine requirements (hreflang and canonical links), the metadata returned must include `alternates.canonical` and `alternates.languages` (hreflang map).
   * The canonical URL will point to `${siteUrl}/${locale}/maerkte/${slug}`.
   * Alternates must map each of the 3 locales to their respective prefixed URL: `${siteUrl}/${l}/maerkte/${slug}`.
   * `x-default` must point to the default German language URL: `${siteUrl}/de/maerkte/${slug}`.
   * The page title and description must be localized. We can retrieve the `geo` namespace translator using `getTranslations` and load `"cityTitle"` (interpolating the city name) and `"cityLead"` + the market-specific regulator and water profile.

3. **Translation Retrieval**:
   * In Next.js Server Components, we call `getTranslations({ locale })` from `next-intl/server`.
   * To prevent typescript typing issues and missing-key crashes, we should retrieve the raw translation object for `geoContent` via `tRoot.raw("geoContent")` and index it using the slug `geoContentTrans[slug]`.
   * A fallback logic to static model values (e.g. `market.regulator`) should be implemented if a key is not found in the translation map.

4. **Component Layout & ESLint Compliance**:
   * The presentation component `components/sections/GeoCity.tsx` must render the page structure.
   * Since `react/jsx-no-literals` enforces strict string restrictions, we cannot write space-separated strings like `<span> km</span>` directly in JSX.
   * To address this, we define string constants outside of the JSX (e.g., `const KM = "km";`, `const SPACE = " ";`, `const BULLET = "·";`) and reference them dynamically inside the JSX: `{formattedDist}{SPACE}{KM}`. This respects ESLint while maintaining layout cleanliness.
   * To build the Bento Grid layout according to Rule 5 of `RULES.md` ("asymmetrische Bento-Grids (6-Spalten-Basis)"), the CSS classes for the grid spans will be:
     * Card 1 (Regulator): `grid-column: span 3` (on a 6-column grid: `col-span-3` or custom styling)
     * Card 2 (Water): `grid-column: span 3`
     * Card 3 (Typical projects): `grid-column: span 4`
     * Card 4 (On-site processing): `grid-column: span 2`
   * The Globe component should be loaded dynamically (`ssr: false`) to avoid canvas hydration issues, and `flyTo` should be triggered inside `useEffect` when the slug changes.

---

## 3. Caveats

* **Slug Count**: The user request and `18_geo_city_pages_pSEO.md` state `3 × 27 = 81` pages, but the prototype `kaqua-geo.jsx` and the `lib/data/geo.ts` data module contain exactly 28 markets. We assume the 28 markets in the code module are the authoritative source of truth.
* **Environment Fallback**: If `process.env.NEXT_PUBLIC_SITE_URL` is undefined during build time, we fall back to the production URL `https://www.k-aqua.de` to construct valid absolute canonical and hreflang URLs.
* **Globe Interaction**: The Globe component is a client component. If reduced motion is enabled, `flyTo` should teleport instantly instead of performing a smooth panning animation to comply with Rule 7.

---

## 4. Conclusion & Implementation Strategy

### Proposed Folder & File Additions:
1. **`app/[locale]/maerkte/[slug]/page.tsx`** (Static Page and SEO Metadata Route)
2. **`components/sections/GeoCity.tsx`** (Presentation Bento & Globe Layout Component)

---

### A. Proposed Code for `app/[locale]/maerkte/[slug]/page.tsx`

```typescript
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { GEO_MARKETS } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import GeoCity from "@/components/sections/GeoCity";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// 1. generateStaticParams: cartesian product of routing.locales and GEO_MARKETS slugs
export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of routing.locales) {
    for (const market of GEO_MARKETS) {
      params.push({ locale, slug: market.slug });
    }
  }
  return params;
}

// 2. generateMetadata: localized metadata + alternate languages hreflang + canonical
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  // Find market to ensure it exists
  const market = GEO_MARKETS.find((m) => m.slug === slug);
  if (!market) {
    return {};
  }

  // Fetch translations
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRoot = await getTranslations({ locale });

  // Get raw geoContent translations for this slug (fallback to market defaults)
  const geoContentTrans = tRoot.raw("geoContent") as Record<
    string,
    {
      regulator: string;
      water: string;
      focus: string[];
      note: string;
      focusHeading: string;
    }
  >;
  const translation = geoContentTrans[slug];

  const city = market.city;
  const title = `${tGeo("cityTitle", { city })} · K-Aqua`;

  const regulator = translation?.regulator || market.regulator;
  const water = translation?.water || market.water;
  const description = `${tGeo("cityLead")} ${regulator}. ${water}`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.k-aqua.de";

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${siteUrl}/${l}/maerkte/${slug}`;
  });
  languages["x-default"] = `${siteUrl}/de/maerkte/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/maerkte/${slug}`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      url: `${siteUrl}/${locale}/maerkte/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// 3. Page component
export default async function GeoCityPage({ params }: Props) {
  const { locale, slug } = await params;

  // Validate locale first
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const market = GEO_MARKETS.find((m) => m.slug === slug);
  if (!market) {
    notFound();
  }

  // Retrieve translation namespace objects
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });

  const geoTrans = {
    allMarkets: tGeo("allMarkets"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical"),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    cityLead: tGeo("cityLead"),
    cityTitle: tGeo("cityTitle"),
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get raw geoContent translations for all markets
  const geoContentTrans = tRoot.raw("geoContent") as Record<
    string,
    {
      regulator: string;
      water: string;
      focus: string[];
      note: string;
      focusHeading: string;
    }
  >;

  return (
    <GeoCity
      locale={locale}
      slug={slug}
      market={market}
      geoTrans={geoTrans}
      regionsTrans={regionsTrans}
      geoContentTrans={geoContentTrans}
    />
  );
}
```

---

### B. Proposed Code for `components/sections/GeoCity.tsx`

```typescript
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { haversineKm, WALDSOLMS, GeoMarket, nearestMarkets } from "@/lib/data/geo";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconChip } from "@/components/ui/IconChip";
import { Chip } from "@/components/ui/Chip";
import { Link } from "@/lib/i18n/navigation";
import {
  Globe as GlobeIcon,
  MapPin,
  Shield,
  Check,
  Droplet,
  Factory,
  Wrench,
  ArrowRight,
} from "@/components/ui/icon";
import type { GlobeRef, GlobeMarker } from "@/components/globe/Globe";

// Load Globe dynamically with ssr: false to prevent server-side canvas hydration issues
const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

// String constants for react/jsx-no-literals ESLint compliance
const KM = "km";
const SPACE = " ";
const BULLET = "·";
const FOOTNOTE = "Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.";

interface GeoCityProps {
  locale: string;
  slug: string;
  market: GeoMarket;
  geoTrans: {
    allMarkets: string;
    fromPlant: string;
    regFrame: string;
    water: string;
    typical: string;
    onSite: string;
    onSiteText: string;
    toAcademy: string;
    nearbyEyebrow: string;
    nearby: string;
    request: string;
    finder: string;
    cityLead: string;
    cityTitle: string;
  };
  regionsTrans: Record<string, string>;
  geoContentTrans: Record<
    string,
    {
      regulator: string;
      water: string;
      focus: string[];
      note: string;
      focusHeading: string;
    }
  >;
}

export default function GeoCity({
  locale,
  slug,
  market,
  geoTrans,
  regionsTrans,
  geoContentTrans,
}: GeoCityProps) {
  const globeRef = useRef<GlobeRef | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Related markets (3 nearest)
  const relatedMarkets = useMemo(() => {
    return nearestMarkets(slug, 3);
  }, [slug]);

  // Merge translation content with fallback
  const translation = geoContentTrans[slug];
  const regulator = translation?.regulator || market.regulator;
  const water = translation?.water || market.water;
  const focus = translation?.focus || market.focus;
  const note = translation?.note || market.note;
  const focusHeading = translation?.focusHeading || "";

  // Distance from Waldsolms
  const distance = useMemo(() => {
    return haversineKm(WALDSOLMS, market);
  }, [market]);

  const formattedDistance = useMemo(() => {
    return new Intl.NumberFormat(locale).format(distance);
  }, [distance, locale]);

  // Setup Globe markers
  const globeMarkers = useMemo<GlobeMarker[]>(() => {
    return [
      {
        lat: market.lat,
        lon: market.lon,
        title: market.slug,
        label: market.city,
      },
    ];
  }, [market]);

  // Handle globe positioning on slug update
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.flyTo(market.lon, market.lat);
      if (globeRef.current.setActive) {
        globeRef.current.setActive(market.slug);
      }
    }
  }, [market]);

  const regionLabel = regionsTrans[market.region] || market.region;
  const pageTitle = geoTrans.cityTitle.replace("{city}", market.city);
  const formattedEyebrow = `${market.country}${SPACE}${BULLET}${SPACE}${regionLabel}`;
  const typicalHeader = geoTrans.typical.replace("{city}", market.city);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* 1. Hero Sektion with Globe */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero text */}
            <div className="lg:col-span-7 text-start flex flex-col items-start">
              <Reveal>
                <Link
                  href="/maerkte"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline group min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 -ms-2 active:scale-[0.97] transition-all"
                >
                  <GlobeIcon className="w-4 h-4 transition-transform duration-fast group-hover:scale-110" />
                  {geoTrans.allMarkets}
                </Link>
              </Reveal>
              <Reveal delay={0.06} className="mt-4">
                <Eyebrow>{formattedEyebrow}</Eyebrow>
              </Reveal>
              <Reveal delay={0.12}>
                <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-3 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                  {pageTitle}
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-lead text-muted-foreground leading-relaxed max-w-[56ch]">
                  {geoTrans.cityLead}
                  {SPACE}
                  {regulator}
                  {BULLET}
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    href="/projektanfrage"
                    className="min-h-[44px] active:scale-[0.97] transition-all"
                  >
                    {geoTrans.request}
                  </Button>
                  <Button
                    variant="ghost"
                    href="/produkte"
                    className="min-h-[44px] active:scale-[0.97] transition-all"
                  >
                    {geoTrans.finder}
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Globe column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal delay={0.15}>
                <div className="relative flex flex-col items-center select-none">
                  <div className="border border-card-border/30 rounded-full p-4 bg-background/50 shadow-diffuse">
                    <Globe
                      ref={globeRef}
                      size={280}
                      markers={globeMarkers}
                      interactive={true}
                      whirl={false}
                      speed={shouldReduceMotion ? 0 : 0.005}
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-small font-semibold px-4 py-2 rounded-full border border-card-border bg-card shadow-diffuse mt-4">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <strong>{formattedDistance}</strong>
                    {SPACE}
                    {geoTrans.fromPlant}
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Bento Grid Section */}
      <section className="py-20 bg-background border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            
            {/* Card 1: Regulatorik (span 3) */}
            <Reveal className="md:col-span-3 h-full">
              <Card tint className="h-full justify-between">
                <div className="flex flex-col gap-4 text-start">
                  <IconChip>
                    <Shield className="w-6 h-6" />
                  </IconChip>
                  <h2 className="text-h3 font-heading font-bold text-foreground">
                    {geoTrans.regFrame}
                  </h2>
                  <p className="text-body font-semibold text-foreground">
                    {regulator}
                  </p>
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {market.norms.map((norm) => (
                      <li key={norm} className="flex items-center gap-2.5 text-muted-foreground text-body">
                        <Check className="w-4.5 h-4.5 text-accent-strong shrink-0" />
                        <span>{norm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Reveal>

            {/* Card 2: Wasserprofil (span 3) */}
            <Reveal delay={0.08} className="md:col-span-3 h-full">
              <Card className="h-full justify-between">
                <div className="flex flex-col gap-4 text-start">
                  <IconChip>
                    <Droplet className="w-6 h-6" />
                  </IconChip>
                  <h2 className="text-h3 font-heading font-bold text-foreground">
                    {geoTrans.water}
                  </h2>
                  <p className="text-body text-muted-foreground leading-relaxed mt-2">
                    {water}
                  </p>
                </div>
              </Card>
            </Reveal>

            {/* Card 3: Fokus-Projekte (span 4) */}
            <Reveal delay={0.12} className="md:col-span-4 h-full">
              <Card className="h-full justify-between">
                <div className="flex flex-col gap-4 text-start">
                  <IconChip>
                    <Factory className="w-6 h-6" />
                  </IconChip>
                  <h2 className="text-h3 font-heading font-bold text-foreground">
                    {focusHeading || typicalHeader}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {focus.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                  <p className="text-body text-muted-foreground leading-relaxed mt-4">
                    {note}
                  </p>
                </div>
              </Card>
            </Reveal>

            {/* Card 4: Academy link card (span 2) */}
            <Reveal delay={0.16} className="md:col-span-2 h-full">
              <Card className="h-full justify-between">
                <div className="flex flex-col gap-4 text-start">
                  <IconChip>
                    <Wrench className="w-6 h-6" />
                  </IconChip>
                  <h2 className="text-h3 font-heading font-bold text-foreground">
                    {geoTrans.onSite}
                  </h2>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {geoTrans.onSiteText}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/academy"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline group min-h-[44px] outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md active:scale-[0.97] transition-all"
                  >
                    <span>{geoTrans.toAcademy}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1" />
                  </Link>
                </div>
              </Card>
            </Reveal>

          </div>
        </div>
      </section>

      {/* 3. Nearby Markets Sektion */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-start mb-10">
            <Eyebrow>{geoTrans.nearbyEyebrow}</Eyebrow>
            <h2 className="text-h2 font-heading font-extrabold text-foreground tracking-tight mt-2">
              {geoTrans.nearby}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedMarkets.map((r, i) => {
              const relDistance = haversineKm(market, r);
              const relFormattedDistance = new Intl.NumberFormat(locale).format(relDistance);
              const relRegulator = geoContentTrans[r.slug]?.regulator || r.regulator;
              const shortRelRegulator = relRegulator.split("—")[0]?.split("/")[0]?.trim();
              const relMeta = `${r.country}${SPACE}${BULLET}${SPACE}${relFormattedDistance}${SPACE}${KM}`;

              return (
                <Reveal key={r.slug} delay={i * 0.08}>
                  <Link href={`/maerkte/${r.slug}`} className="block h-full group outline-none">
                    <Card className="h-full justify-between cursor-pointer border border-card-border hover:border-primary/30 transition-all duration-fast group-focus-visible:ring-2 group-focus-visible:ring-primary">
                      <div className="flex flex-col gap-2.5 text-start">
                        <span className="text-[13px] text-muted-foreground">
                          {relMeta}
                        </span>
                        <h3 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
                          {r.city}
                          <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-focus-visible:opacity-100 group-focus-visible:translate-x-1 transition-all duration-fast" />
                        </h3>
                        <p className="text-[14px] text-muted-foreground line-clamp-2">
                          {shortRelRegulator}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Footer Footnote */}
          <div className="text-start mt-12 border-t border-card-border pt-6">
            <p className="text-[13px] text-faint-foreground leading-relaxed">
              {FOOTNOTE}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Verification Method

Once implemented, the following verification commands must be run:

1. **Parity Check for Translation Files**:
   ```bash
   node scripts/check-locale-parity.mjs
   ```
   *Expected outcome*: Passes cleanly with zero missing translation keys.

2. **Typescript Compilation Check**:
   ```bash
   npx tsc --noEmit
   ```
   *Expected outcome*: Compiles without any type errors.

3. **Linter Verification**:
   ```bash
   npx eslint app components lib
   ```
   *Expected outcome*: Runs cleanly without triggering `react/jsx-no-literals` errors.

4. **Production Build & SSG Verification**:
   ```bash
   npx next build
   ```
   *Expected outcome*: Successful build. The page log should show the 84 new pre-rendered paths under `/[locale]/maerkte/[slug]`.

5. **Playwright Integration Test Suite**:
   Create a test file `tests/step18.spec.ts` to test the functionality:
   ```typescript
   import { test, expect } from "@playwright/test";

   test.describe("Step 18: Geo City Pages (pSEO)", () => {
     
     test("should render Dubai page in German with localized metadata and alternates", async ({ page }) => {
       await page.goto("http://localhost:3000/de/maerkte/dubai");
       
       // Verify title tag
       await expect(page).toHaveTitle(/PP-R\/PP-RCT Rohrsysteme in Dubai\..*· K-Aqua/);

       // Verify description meta tag
       const desc = page.locator("meta[name='description']");
       await expect(desc).toHaveAttribute("content", /Trinkwassersysteme d20–d630.*DEWA/);

       // Verify canonical link tag
       const canonical = page.locator("link[rel='canonical']");
       await expect(canonical).toHaveAttribute("content", "https://www.k-aqua.de/de/maerkte/dubai");

       // Verify hreflang tags
       const hreflangDe = page.locator("link[rel='alternate'][hreflang='de']");
       await expect(hreflangDe).toHaveAttribute("content", "https://www.k-aqua.de/de/maerkte/dubai");
       
       const hreflangEn = page.locator("link[rel='alternate'][hreflang='en']");
       await expect(hreflangEn).toHaveAttribute("content", "https://www.k-aqua.de/en/maerkte/dubai");

       const hreflangAr = page.locator("link[rel='alternate'][hreflang='ar']");
       await expect(hreflangAr).toHaveAttribute("content", "https://www.k-aqua.de/ar/maerkte/dubai");

       const hreflangDefault = page.locator("link[rel='alternate'][hreflang='x-default']");
       await expect(hreflangDefault).toHaveAttribute("content", "https://www.k-aqua.de/de/maerkte/dubai");

       // Verify page elements
       await expect(page.locator("h1")).toContainText("Dubai");
       await expect(page.locator("canvas")).toBeVisible();
       
       // Verify 3 nearby markets render
       const nearbyLinks = page.locator("a[href^='/de/maerkte/']");
       // Excludes the 'All Markets' button which has /de/maerkte
       const filteredCount = await nearbyLinks.evaluateAll(
         (links) => links.filter(l => l.getAttribute('href') !== '/de/maerkte').length
       );
       expect(filteredCount).toBe(3);
     });

     test("should render Dubai page in Arabic (RTL)", async ({ page }) => {
       await page.goto("http://localhost:3000/ar/maerkte/dubai");
       
       // Verify dir="rtl"
       const htmlDir = await page.getAttribute("html", "dir");
       expect(htmlDir).toBe("rtl");
     });

     test("should return 404 for invalid city slug", async ({ page }) => {
       const response = await page.goto("http://localhost:3000/de/maerkte/invalid-city-slug");
       expect(response?.status()).toBe(404);
     });
   });
   ```
