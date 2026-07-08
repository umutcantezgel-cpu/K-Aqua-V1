# Produktfinder

## Texte aus `messages/de.json` -> `finder`
```json
{
  "eyebrow": "Produktfinder",
  "title1": "Keine PDF-Wüste.",
  "titleGrad": "Sofort Daten.",
  "lead": "Statt 220-seitiger Kataloge: Filtern Sie das komplette PP-R/PP-RCT-System interaktiv — Dimension, Druckstufe, Wandstärke, alles live.",
  "type": "Produkttyp",
  "types": {
    "mono": "PP-R Monolayer",
    "fiber": "PP-RCT Faserverbund (GF)",
    "fitting": "Formteile"
  },
  "sdr": "Druckstufe (SDR)",
  "maxD": "Max. Außendurchmesser",
  "upTo": "bis",
  "maxDAria": "Maximaler Außendurchmesser in Millimetern",
  "found": "Artikelvarianten gefunden — jede sofort mit Wandstärke, Innendurchmesser und Nenndruck.",
  "catalog": "Katalog (PDF)",
  "tableHead": [
    "Typ",
    "d (mm)",
    "SDR",
    "Wand (mm)",
    "di (mm)",
    "Nenndruck"
  ],
  "more": "+ {n} weitere — Filter verfeinern für die volle Liste.",
  "none": "Keine Treffer — Filter lockern.",
  "nextEyebrow": "Weiterdenken",
  "nextTitle": "Wie klimafreundlich ist Ihre Planung?",
  "nextLead": "Übergeben Sie Dimension und Länge direkt an den CO₂-Rechner und vergleichen Sie gegen Kupfer, Edelstahl und PVC.",
  "nextCta": "Zum CO₂-Rechner",
  "totalNote": "Repräsentatives Sortiment vor der Live-ERP/Katalog-Anbindung.",
  "searchPlaceholder": "Produkte suchen...",
  "sortLabel": "Sortieren nach",
  "sortOptions": {
    "d": "Durchmesser",
    "sdr": "SDR",
    "type": "Typ"
  },
  "viewTable": "Tabelle",
  "viewCards": "Karten",
  "exportCsv": "CSV Export",
  "detailClose": "Detailfenster schließen",
  "detailType": "Typ",
  "detailWall": "Wandstärke",
  "detailDi": "Innendurchmesser",
  "detailPn": "Nenndruck",
  "detailCta": "Für dieses Produkt anfragen",
  "replace": "Ersetzen",
  "remove": "Entfernen",
  "browse": "oder Dateien durchsuchen",
  "pipeFxLabel": "Pipe FX: Druckring"
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/produkte/finder/page.tsx
```tsx
import React from "react";
import ProductFinder from "@/components/tools/ProductFinder";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/produkte/finder",
    locale,
  });
}

export default async function FinderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta[0],
    "description": meta[1],
    "url": `${siteUrl}/${locale}/produkte/finder`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <ProductFinder />
    </>
  );
}

```


