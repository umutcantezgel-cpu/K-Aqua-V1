# Partnerschaft

## Texte aus `messages/de.json` -> `partner`
```json
{
  "eyebrow": "Partnerschaft",
  "title1": "Zwei Marken.",
  "titleGrad": "Eine Haltung.",
  "lead": "Die enge, jahrzehntelange Partnerschaft mit KESSEL überträgt Premium-Vertrauen aus der Entwässerung in die Wasserversorgung.",
  "onionAria": "Zwiebelschalenmodell der Partnerschaft",
  "rings": [
    {
      "l": "Kernmarke",
      "t": "KESSEL — Leading in Drainage",
      "d": "Premiumhersteller der Entwässerungstechnik. Weltleitmessen wie die ISH, das PlanerPortal und das KundenForum machen KESSEL zur Autorität der TGA-Branche."
    },
    {
      "l": "System",
      "t": "K-Aqua — führend in der Wasserversorgung",
      "d": "Die Versorgungsseite derselben Ingenieurs-DNA: vollständiges PP-R/PP-RCT-System d20–d630, gefertigt in Deutschland. Entwässerung und Versorgung aus einer Wertegemeinschaft."
    },
    {
      "l": "Service",
      "t": "Gemeinsames Ökosystem",
      "d": "Planer profitieren doppelt: Schulungen, Schweißtechnik-Support und digitale Planungswerkzeuge — perspektivisch bis zum parametrischen Rohrnetz-Konfigurator."
    }
  ],
  "whyEyebrow": "Warum PP-R/PP-RCT",
  "whyTitle": "Das Rückgrat des Produktversprechens.",
  "cards": [
    {
      "t": "Absolute Korrosionsfreiheit",
      "d": "Immun gegen elektrochemische Korrosion — kein Lochfraß, keine Rohrbrüche wie bei Kupfer oder verzinktem Stahl."
    },
    {
      "t": "Thermische Effizienz",
      "d": "Minimaler Wärmeverlust in der Warmwasserzirkulation — direkte Energieeinsparung über Jahrzehnte."
    },
    {
      "t": "Hygienische Neutralität",
      "d": "Geschmacks- und geruchsneutral; die extrem glatte Innenoberfläche verhindert Biofilm und Inkrustation."
    }
  ]
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/partnerschaft/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { Partner } from "@/components/sections/Partner";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("partner") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/partnerschaft",
    locale,
  });
}

export default async function PartnerschaftPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partner" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    onionAria: t("onionAria"),
    rings: t.raw("rings") as { l: string; t: string; d: string }[],
    whyEyebrow: t("whyEyebrow"),
    whyTitle: t("whyTitle"),
    cards: t.raw("cards") as { t: string; d: string }[],
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${data.title1} ${data.titleGrad}`,
    "description": data.lead,
    "url": `${siteUrl}/${locale}/partnerschaft`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Partner data={data} />
    </>
  );
}

```


