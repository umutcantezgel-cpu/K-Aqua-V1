# Handoff Report — Step 18: Geo City Pages (pSEO)

## 1. Observation
We have inspected the requirements in `agents/18_geo_city_pages_pSEO.md`, the guidelines in `agents/RULES.md`, and the existing codebase. Key findings include:

*   **Data Structure**: `lib/data/geo.ts` defines the `GEO_MARKETS` array with 28 markets and a helper function `nearestMarkets(slug, n)` using the Haversine formula.
*   **Locales & Routing**: `lib/i18n/routing.ts` defines `routing.locales` as `['de', 'en', 'ar']`. This means `generateStaticParams` needs to return a cartesian product of $3 \times 28 = 84$ pages.
*   **Globe Component**: `components/globe/Globe.tsx` is a browser-only client component that renders a Canvas-based interactive globe using custom projection math (`project` function) and a built-in TopoJSON decoder (`decodeTopo`). It fetches `/data/countries-110m.json` locally, matching RULE 9. It exposes `flyTo(lon, lat)` and `setActive(title)` via `useImperativeHandle`.
*   **Logical Styling**: `eslint.config.mjs` enforces the `react/jsx-no-literals` rule, allowing only a small set of brand words and separators: `['·', '—', '/', '+', '×', '•', 'K-Aqua', 'KWT', 'KESSEL', 'PP-R', 'PP-RCT', 'ISO', 'CO₂']`. Logical Tailwind properties (`text-start`, logical directions) are required by RULE 8. Arrows in `@/components/ui/icon.tsx` automatically mirror in RTL using the `rtl-flip` class.

---

## 2. Logic Chain
To implement Step 18 properly:

1.  **Dynamic Page Structure**: We must split the page logic into:
    *   `app/[locale]/maerkte/[slug]/page.tsx`: An async Server Component to perform static params generation (`generateStaticParams`), metadata resolution (`generateMetadata`), and server-side translation pre-fetching.
    *   `components/sections/GeoCity.tsx`: A Client Component (`'use client';`) loaded dynamically with `ssr: false` in the page, to initialize the canvas-based Globe, invoke `flyTo` and `setActive` dynamically, and react to reduced-motion preferences.
2.  **RTL and Translation Integrity**:
    *   All UI texts (including lists, Water Profile, and Logistik notes) must be translated. Since the German texts exist in the data module but English/Arabic translations are stored in `messages/*.json` under `geoContent.<slug>`, we must read from the `geoContent` translations namespace, falling back to the data module values only if unavailable.
    *   RTL layout support is achieved by setting logical directions: `ps-` instead of `pl-`, `pe-` instead of `pr-`, `text-start` instead of `text-left`. Directional icons like `ArrowRight` will automatically mirror because they are wrapped in `rtl-flip` inside the design system.
3.  **Linter Compliance**:
    *   Because `react/jsx-no-literals` blocks hardcoding string literals, units like `km` and dynamic text separators like ` · ` must be stored in variables outside of the JSX body and injected as expressions (e.g. `{unitKm}`).

---

## 3. Caveats
*   **Production Note**: The prototype included a developer-facing annotation note in the footer of the GeoCity view explaining programmatic SEO. Because this text is not localized in translation files, we recommend omitting it in production to prevent hardcoding literals or violating i18n purity rules.
*   **Market Slugs**: The requirements mention $3 \times 27 = 81$ static pages. However, `lib/data/geo.ts` actually contains 28 markets. We should construct the cartesian product dynamically from the array length, yielding 84 static pages.
*   **Coordinate Names**: Slugs in the typescript data module are `abudhabi`, `kuwait`, and `kualalumpur`. In `ROUTE_MAP.md`, they are listed as `abu-dhabi`, `kuwait-stadt`, and `kuala-lumpur`. The typescript and dictionary values are canonical and must be followed.

---

## 4. Conclusion
We propose creating the two files outlined below:

### File 1: `app/[locale]/maerkte/[slug]/page.tsx`
This Server Component handles static parameter generation and dynamic localized metadata:

```tsx
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { GEO_MARKETS } from "@/lib/data/geo";
import GeoCity from "@/components/sections/GeoCity";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const market of GEO_MARKETS) {
      params.push({ locale, slug: market.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const market = GEO_MARKETS.find((m) => m.slug === slug);
  if (!market) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const title = `${market.city} - K-Aqua ${tGeo("eyebrow")}`;
  const description = `${tGeo("cityLead")} ${market.regulator}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/maerkte/${slug}`,
      languages: {
        de: `/de/maerkte/${slug}`,
        en: `/en/maerkte/${slug}`,
        ar: `/ar/maerkte/${slug}`,
        "x-default": `/maerkte/${slug}`,
      },
    },
  };
}

export default async function GeoCityPage({ params }: Props) {
  const { locale, slug } = await params;
  const market = GEO_MARKETS.find((m) => m.slug === slug);
  if (!market) {
    notFound();
  }

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });

  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    allMarkets: tGeo("allMarkets"),
    cityTitle: tGeo("cityTitle"),
    cityLead: tGeo("cityLead"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical"),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

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

### File 2: `components/sections/GeoCity.tsx`
This Client Component encapsulates the interactive elements, local D3 canvas, and smooth `flyTo` rotations:

```tsx
"use client";

import React, { useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { IconChip } from "@/components/ui/IconChip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Globe as GlobeIcon, MapPin, Shield, Droplet, Factory, Wrench, Check, ArrowRight } from "@/components/ui/icon";
import { WALDSOLMS, haversineKm, nearestMarkets, GeoMarket } from "@/lib/data/geo";
import type { GlobeRef, GlobeMarker } from "@/components/globe/Globe";

const Globe = dynamic(
  () => import("@/components/globe/Globe").then((mod) => mod.Globe),
  { ssr: false }
);

interface GeoCityProps {
  locale: string;
  slug: string;
  market: GeoMarket;
  geoTrans: {
    eyebrow: string;
    allMarkets: string;
    cityTitle: string;
    cityLead: string;
    request: string;
    finder: string;
    fromPlant: string;
    regFrame: string;
    water: string;
    typical: string;
    onSite: string;
    onSiteText: string;
    toAcademy: string;
    nearbyEyebrow: string;
    nearby: string;
  };
  regionsTrans: Record<string, string>;
  geoContentTrans: Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;
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

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.flyTo(market.lon, market.lat);
      if (globeRef.current.setActive) {
        globeRef.current.setActive(market.city);
      }
    }
  }, [market]);

  const regionLabel = regionsTrans[market.region] || market.region;

  const distance = useMemo(() => {
    return haversineKm(WALDSOLMS, market);
  }, [market]);

  const formattedDistance = useMemo(() => {
    return new Intl.NumberFormat(locale).format(distance);
  }, [distance, locale]);

  const relatedMarkets = useMemo(() => {
    return nearestMarkets(slug, 3);
  }, [slug]);

  const markers = useMemo<GlobeMarker[]>(() => [
    {
      lat: market.lat,
      lon: market.lon,
      title: market.city,
      label: market.city,
    }
  ], [market]);

  const renderedTitle = useMemo(() => {
    const parts = geoTrans.cityTitle.split("{city}");
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
          {market.city}
        </span>
        {parts[1] || ""}
      </>
    );
  }, [geoTrans.cityTitle, market.city]);

  const unitKm = "km";
  const separator = " · ";

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Hero Sektion */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 text-start">
              <Reveal>
                <Link
                  href="/maerkte"
                  className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline mb-6 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                >
                  <GlobeIcon size={16} />
                  {geoTrans.allMarkets}
                </Link>
              </Reveal>
              <Reveal delay={0.05}>
                <Eyebrow>
                  {market.country}
                  {separator}
                  {regionLabel}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                  {renderedTitle}
                </h1>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch]">
                  {geoTrans.cityLead}{" "}
                  {geoContentTrans[market.slug]?.regulator || market.regulator}
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Button href="/projektanfrage" icon={<ArrowRight size={18} />}>
                    {geoTrans.request}
                  </Button>
                  <Button variant="ghost" href="/produkte/finder">
                    {geoTrans.finder}
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <Reveal delay={0.15}>
                <div className="flex flex-col items-center">
                  <div 
                    className="relative flex items-center justify-center border border-card-border/30 rounded-full p-4 bg-background/50 shadow-diffuse select-none"
                    style={{ width: 312, height: 312 }}
                  >
                    <Globe
                      ref={globeRef}
                      size={280}
                      markers={markers}
                      interactive={true}
                      whirl={false}
                      speed={0}
                    />
                  </div>
                  <Chip className="mt-4">
                    <MapPin size={14} className="text-primary" />
                    <span>
                      <strong className="text-foreground font-bold">{formattedDistance}</strong>{" "}
                      {geoTrans.fromPlant}
                    </span>
                  </Chip>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-12 lg:py-20 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
            
            <Reveal className="lg:col-span-3">
              <Card className="h-full flex flex-col gap-4 text-start bg-card border border-card-border">
                <IconChip>
                  <Shield size={24} />
                </IconChip>
                <h2 className="text-h3 font-heading font-bold text-foreground">
                  {geoTrans.regFrame}
                </h2>
                <p className="text-body font-semibold text-foreground leading-snug">
                  {geoContentTrans[market.slug]?.regulator || market.regulator}
                </p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {market.norms.map((n) => (
                    <li key={n} className="flex items-center gap-2 text-muted-foreground text-small text-start">
                      <Check size={16} className="text-accent-strong shrink-0" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-3">
              <Card className="h-full flex flex-col gap-4 text-start bg-card border border-card-border">
                <IconChip>
                  <Droplet size={24} />
                </IconChip>
                <h2 className="text-h3 font-heading font-bold text-foreground">
                  {geoTrans.water}
                </h2>
                <p className="text-body text-muted-foreground leading-relaxed">
                  {geoContentTrans[market.slug]?.water || market.water}
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-4">
              <Card className="h-full flex flex-col gap-4 text-start bg-card border border-card-border">
                <IconChip>
                  <Factory size={24} />
                </IconChip>
                <h2 className="text-h3 font-heading font-bold text-foreground">
                  {geoContentTrans[market.slug]?.focusHeading || geoTrans.typical.replace("{city}", market.city)}
                </h2>
                <div className="flex flex-wrap gap-2 my-2 justify-start text-start">
                  {(geoContentTrans[market.slug]?.focus || market.focus).map((f) => (
                    <Chip key={f} className="text-small bg-background border-card-border py-1 px-3">
                      {f}
                    </Chip>
                  ))}
                </div>
                <p className="text-body text-muted-foreground leading-relaxed mt-auto">
                  {geoContentTrans[market.slug]?.note || market.note}
                </p>
              </Card>
            </Reveal>

            <Reveal delay={0.18} className="lg:col-span-2">
              <Card className="h-full flex flex-col justify-between text-start bg-card border border-card-border">
                <div className="flex flex-col gap-4">
                  <IconChip>
                    <Wrench size={24} />
                  </IconChip>
                  <h2 className="text-h3 font-heading font-bold text-foreground">
                    {geoTrans.onSite}
                  </h2>
                  <p className="text-body text-muted-foreground leading-relaxed">
                    {geoTrans.onSiteText}
                  </p>
                </div>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-1.5 text-primary font-heading font-semibold hover:underline mt-6 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded text-start"
                >
                  {geoTrans.toAcademy}
                  <ArrowRight size={16} />
                </Link>
              </Card>
            </Reveal>

          </div>
        </div>
      </section>

      {/* In der Nähe */}
      <section className="py-16 lg:py-20 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={geoTrans.nearbyEyebrow}
              title={geoTrans.nearby}
              align="left"
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {relatedMarkets.map((r, i) => {
              const distanceBetween = haversineKm(market, r);
              const formattedDistanceBetween = new Intl.NumberFormat(locale).format(distanceBetween);
              const cardSubtitle = `${r.country}${separator}${formattedDistanceBetween} ${unitKm}`;
              const localizedRegulator = geoContentTrans[r.slug]?.regulator || r.regulator;
              const shortRegulator = localizedRegulator.split("—")[0].trim();

              return (
                <Reveal key={r.slug} delay={i * 0.07}>
                  <Link
                    href={`/maerkte/${r.slug}`}
                    className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                  >
                    <Card className="h-full cursor-pointer hover:-translate-y-1 hover:shadow-lift transition-all duration-fast p-6 flex flex-col gap-2 text-start bg-card border border-card-border">
                      <span className="text-[13px] text-muted-foreground">
                        {cardSubtitle}
                      </span>
                      <h3 className="text-h3 font-heading font-bold text-foreground flex items-center gap-2">
                        {r.city}
                        <ArrowRight size={18} className="text-primary" />
                      </h3>
                      <p className="text-body text-muted-foreground text-small leading-relaxed">
                        {shortRegulator}
                      </p>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## 5. Verification Method
1.  **Build Verification**:
    Run `pnpm build` to verify that Next.js statically compiles all 84 pages successfully without any routing or rendering errors.
2.  **Lint & Typecheck**:
    Run `pnpm lint` and `pnpm typecheck` to confirm that:
    *   No typescript compilation errors occur.
    *   No `react/jsx-no-literals` lint errors are triggered by the proposed file implementation.
3.  **UI & RTL Verification**:
    Spin up the dev environment with `pnpm dev` and visit `/ar/maerkte/dubai` to check:
    *   The page renders RTL correctly (canvas offsets, layout, and texts start from the right).
    *   The Mini-Globus properly rotates (`flyTo`) and focuses (`setActive`) on Dubai.
    *   All dynamic text strings correspond to their correct translations.
    *   The hreflang language alternates and canonical URL are present and correct in the `<head>` of the page.
