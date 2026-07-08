# CO2-Rechner

## Texte aus `messages/de.json` -> `co2`
```json
{
  "eyebrow": "CO₂- & Lebenszyklus-Rechner",
  "title1": "Rechnen Sie",
  "titleGrad": "grün.",
  "lead": "Modellieren Sie Ihr Bauvorhaben und vergleichen Sie das K-Aqua-System direkt mit Kupfer, Edelstahl und PVC — als Argument für LEED, BREEAM und DGNB.",
  "project": "Ihr Bauvorhaben",
  "dia": "Nennweite",
  "length": "Leitungslänge",
  "sdrClass": "SDR-Klasse",
  "disclaimer": "Demonstrationswerte. Verbindliche Faktoren liefert die ecoinvent-Datenbank bzw. produktspezifische Typ-III-EPDs (EN 15804).",
  "savedLabel": "Ersparnis vs. bester Metall-Alternative",
  "savedBody1": "CO₂-Äquivalent über die Errichtungsphase — entspricht der Jahres-Absorption von",
  "trees": "{n} Bäumen",
  "or": "oder",
  "carKm": "{n} Pkw-Kilometern",
  "compareTitle": "Systemvergleich (kg CO₂e gesamt)",
  "materials": {
    "kaqua": "K-Aqua PP-RCT",
    "pvc": "PVC-C",
    "copper": "Kupfer",
    "steel": "Edelstahl"
  },
  "auditor": "Auditor-Cockpit:",
  "auditorBody": "EPD-Nachweise, ISO-Zertifikate und GAEB-Texte als Paket — im",
  "trustLink": "Trust Center"
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/co2-rechner/page.tsx
```tsx
import React from "react";
import Co2Calculator from "@/components/tools/Co2Calculator";
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
  const meta = t.raw("co2") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/co2-rechner",
    locale,
  });
}

export default async function Co2RechnerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta[0],
    "description": meta[1],
    "url": `${siteUrl}/${locale}/co2-rechner`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Co2Calculator />
    </>
  );
}


```


