# Märkte & Standorte (Geo)

## Texte aus `messages/de.json` -> `geo`
```json
{
  "eyebrow": "Märkte & Standorte",
  "title1": "Eine Welt voller",
  "title2": "Märkten.",
  "lead": "{n} Märkte in {c} Ländern — jeder mit eigener Landingpage: Normen, Wasserprofil, Anwendungsfälle, Logistik. Greifen Sie die Welt und drehen Sie sie frei; die Liste fliegt Sie punktgenau zur Stadt.",
  "all": "Alle",
  "cityTitle": "PP-R/PP-RCT Rohrsysteme in {city}.",
  "cityLead": "Trinkwassersysteme d20–d630, geprüft gegen die Anforderungen vor Ort —",
  "allMarkets": "Alle Märkte",
  "request": "Projekt anfragen",
  "finder": "Produktfinder",
  "fromPlant": "km ab Werk Waldsolms",
  "regFrame": "Regulatorischer Rahmen",
  "water": "Wasserprofil & Materialantwort",
  "typical": "Typische Projekte in {city}",
  "onSite": "Verarbeitung vor Ort",
  "onSiteText": "Schweißtechnik-Einweisung und Videodokumentation für Ihre Kolonne — in der Academy.",
  "toAcademy": "Zur Academy",
  "nearbyEyebrow": "Verwandte Märkte",
  "nearby": "In der Nähe.",
  "prodNote": "Hinweis Produktion: Diese Seiten entsprechen dem Programmatic-SEO-Template (Daten-Slice: Produkt × Regulatorik × Region). In Next.js werden sie per ISR aus dem Headless CMS generiert — inkl. hreflang, Product-/Offer-Schema und semantischer interner Verlinkung.",
  "km": "km"
}
```

## Texte aus `messages/de.json` -> `regions`
```json
{
  "dach": "DACH",
  "europa": "Europa",
  "nahost": "Naher & Mittlerer Osten",
  "global": "Afrika & Asien-Pazifik"
}
```

## Texte aus `messages/de.json` -> `markets`
```json
{}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/maerkte/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import MarketsHub from "@/components/sections/MarketsHub";
import { GEO_MARKETS } from "@/lib/data/geo";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("markets") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/maerkte",
    locale,
  });
}

export default async function MaerktePage({ params }: Props) {
  const { locale } = await params;
  
  // Fetch translation objects
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });

  const totalMarkets = GEO_MARKETS.length;
  const totalCountries = new Set(GEO_MARKETS.map((g) => g.country)).size;

  // Extract translation dictionaries
  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    title1: tGeo("title1"),
    title2: tGeo("title2"),
    lead: tGeo("lead", { n: totalMarkets, c: totalCountries }),
    all: tGeo("all"),
    fromPlant: tGeo("fromPlant"),
    canvasAria: tRoot("home.globeAria"),
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get raw geoContent translations for all markets
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${geoTrans.title1} ${geoTrans.title2}`,
    "description": geoTrans.lead,
    "url": `${siteUrl}/${locale}/maerkte`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <MarketsHub
        locale={locale}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        geoContentTrans={geoContentTrans}
      />
    </>
  );
}


```


