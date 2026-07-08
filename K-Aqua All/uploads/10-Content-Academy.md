# Academy

## Texte aus `messages/de.json` -> `academy`
```json
{
  "eyebrow": "K-Aqua Academy",
  "title1": "Wissen, das",
  "titleGrad": "verbindet.",
  "lead": "Vier Schweißverfahren im Video — und ein Quiz, das Sie zum Schweiß-Meister macht. Optimiert für die Baustelle: große Ziele, hohe Kontraste.",
  "videos": [
    {
      "t": "Muffenschweißen von Hand",
      "s": "bis d63 — Handschweißgerät"
    },
    {
      "t": "Muffenschweißen mit Maschine",
      "s": "mittlere Dimensionen"
    },
    {
      "t": "Elektroschweißen",
      "s": "Heizwendel-Fittings"
    },
    {
      "t": "Stumpfschweißen",
      "s": "Großdimensionen bis d630"
    }
  ],
  "quizEyebrow": "Schweiß-Meister-Quiz",
  "quizTitle": "Fünf Fragen. Ein Abzeichen.",
  "intro": "Testen Sie Ihr Verarbeitungs-Wissen zu PP-R/PP-RCT. Fehlerfrei = Titel „Schweiß-Meister\".",
  "start": "Quiz starten",
  "qLabel": "Frage",
  "quiz": [
    {
      "q": "Welches Schweißverfahren ist für Großdimensionen (z. B. d630) Standard?",
      "o": [
        "Muffenschweißen von Hand",
        "Stumpfschweißen (Butt Fusion)",
        "Kleben"
      ]
    },
    {
      "q": "Wofür steht SDR bei Rohrsystemen?",
      "o": [
        "Standard Dimension Ratio (d/s)",
        "Static Density Rating",
        "Sicherheits-Druck-Reserve"
      ]
    },
    {
      "q": "Was unterscheidet PP-RCT von klassischem PP-R?",
      "o": [
        "Niedrigerer Preis",
        "Modifizierte Kristallstruktur → mehr Temperatur- & Druckreserve",
        "Metallische Verstärkung"
      ]
    },
    {
      "q": "Welchen Recycling-Code trägt Polypropylen?",
      "o": [
        "Code 3",
        "Code 5",
        "Code 7"
      ]
    },
    {
      "q": "Beim Elektroschweißen (Electrofusion) kommt die Wärme …",
      "o": [
        "aus einem Heizelement-Spiegel",
        "aus eingebetteten Heizwendeln im Fitting",
        "aus Heißluft"
      ]
    }
  ],
  "resPerfect": "Perfekt — Titel „Schweiß-Meister\" verdient!",
  "resGood": "Solide! Titel „Schweiß-Geselle\" gesichert. Für den Meister: alle fünf richtig.",
  "resLow": "Die Videos oben helfen — danach klappt der Meister.",
  "retry": "Nochmal versuchen",
  "titlePerfect": "Schweiß-Meister",
  "titleGood": "Schweiß-Geselle"
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/academy/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { Academy } from "@/components/tools/Academy";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("academy") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "academy" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    videos: t.raw("videos") as { t: string; s: string }[],
    quizEyebrow: t("quizEyebrow"),
    quizTitle: t("quizTitle"),
    intro: t("intro"),
    start: t("start"),
    qLabel: t("qLabel"),
    quiz: t.raw("quiz") as { q: string; o: string[] }[],
    resPerfect: t("resPerfect"),
    resGood: t("resGood"),
    resLow: t("resLow"),
    retry: t("retry"),
    titlePerfect: t("titlePerfect"),
    titleGood: t("titleGood"),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${data.title1} ${data.titleGrad}`,
    "description": data.lead,
    "url": `${siteUrl}/${locale}/academy`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Academy data={data} />
    </>
  );
}


```


