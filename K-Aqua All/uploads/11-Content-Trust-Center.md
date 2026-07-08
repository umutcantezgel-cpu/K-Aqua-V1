# Trust Center

## Texte aus `messages/de.json` -> `trust`
```json
{
  "eyebrow": "Trust Center",
  "title1": "Vertrauen ist",
  "titleGrad": "messbar.",
  "lead": "Zertifikate, GENAU-Framework und Audit-Dokumente — als Self-Service. Kein tagelanges Warten auf manuelle Zusendung.",
  "certs": [
    [
      "ISO 9001:2015",
      "Qualitätsmanagement"
    ],
    [
      "ISO 14001:2015",
      "Umweltmanagement"
    ],
    [
      "ISO 50001:2018",
      "Energiemanagement"
    ]
  ],
  "accred": "DAkkS-akkreditiert",
  "certNo": "Zertifikat-Nr.",
  "valid": "Gültig",
  "download": "Download",
  "genauEyebrow": "GENAU-Framework",
  "genauTitle": "Fünf Buchstaben. Ein System.",
  "genauLead": "Das GENAU-Managementsystem ist im House of KWT verankert — klicken Sie sich durch die fünf Säulen.",
  "genau": [
    [
      "Gesundheit",
      "Arbeits- und Gesundheitsschutz mit kontinuierlicher Gefahrenermittlung — jeder Mitarbeitende ist verpflichtet, Risiken aktiv zu melden."
    ],
    [
      "Energie",
      "Optimierung der Energieeffizienz nach ISO 50001 — vom Extruder bis zum geschlossenen Kühlwasserkreislauf."
    ],
    [
      "Nachhaltigkeit",
      "100 % der Schnittreste und Produktionsabfälle gehen zurück in den Wertstoffkreislauf."
    ],
    [
      "Arbeitssicherheit",
      "Prävention und Risikobewertung als tägliche Praxis — nicht als jährliche Pflichtübung."
    ],
    [
      "Umwelt",
      "Umweltmanagement nach ISO 14001: Ressourcenschonung ist Teil des Qualitätsverständnisses."
    ]
  ],
  "rfpEyebrow": "Self-Service",
  "rfpTitle": "Ihr RFP-Dokumentenpaket.",
  "rfpLead": "Stellen Sie Ihr Audit- und Ausschreibungspaket selbst zusammen — statt tagelang auf manuelle Zusendung zu warten.",
  "docs": [
    "ISO 9001:2015 Zertifikat (DE/EN)",
    "ISO 14001:2015 Zertifikat (DE/EN)",
    "ISO 50001:2018 Zertifikat (DE/EN)",
    "GENAU-Politik & Risikobewertung",
    "Trinkwasser-Konformität (DVGW/KTW)",
    "EPD-Datenblätter (Typ III, EN 15804)",
    "GAEB-Ausschreibungstexte",
    "Qualitätssicherungs-Handbuch"
  ],
  "inPackage": "Dokumente im Paket.",
  "pickLeft": "Wählen Sie links aus.",
  "requestZip": "Per Klick als ZIP anfordern:",
  "requestBtn": "Paket anfordern",
  "mailSubject": "RFP-Dokumentenpaket",
  "mailBody": "Bitte senden Sie mir folgende Dokumente:",
  "scope3": "Scope-3-Emissionsdaten und EPD-Rohdaten auf Anfrage — proaktive Transparenz statt Pflichterfüllung."
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/trust-center/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { TrustCenter } from "@/components/tools/TrustCenter";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("trust") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/trust-center",
    locale,
  });
}

export default async function TrustCenterPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "trust" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    certs: t.raw("certs") as [string, string][],
    accred: t("accred"),
    certNo: t("certNo"),
    valid: t("valid"),
    download: t("download"),
    genauEyebrow: t("genauEyebrow"),
    genauTitle: t("genauTitle"),
    genauLead: t("genauLead"),
    genau: t.raw("genau") as [string, string][],
    rfpEyebrow: t("rfpEyebrow"),
    rfpTitle: t("rfpTitle"),
    rfpLead: t("rfpLead"),
    docs: t.raw("docs") as string[],
    inPackage: t("inPackage"),
    pickLeft: t("pickLeft"),
    requestZip: t("requestZip"),
    requestBtn: t("requestBtn"),
    mailSubject: t("mailSubject"),
    mailBody: t("mailBody"),
    scope3: t("scope3"),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${data.title1} ${data.titleGrad}`,
    "description": data.lead,
    "url": `${siteUrl}/${locale}/trust-center`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <TrustCenter data={data} />
    </>
  );
}

```


