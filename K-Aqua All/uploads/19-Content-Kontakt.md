# Kontakt & Rechtliches

## Texte aus `messages/de.json` -> `contact`
```json
{
  "eyebrow": "Kontakt",
  "title1": "Sprechen wir über Ihr",
  "titleGrad": "Projekt.",
  "locTitle": "Standort Deutschland",
  "salesTitle": "Vertrieb",
  "supportTitle": "Qualität & technischer Support",
  "supportText": "Unser Support-Team hilft bei technischen Fragen rund um Planung, Material und Verarbeitung.",
  "formEyebrow": "Schnellkontakt",
  "formTitle": "In 30 Sekunden Nachricht senden.",
  "formLead": "Direkt an unser Team — keine Anmeldung, keine Wartezeit.",
  "fName": "Name",
  "fEmail": "E-Mail",
  "fTopic": "Anliegen",
  "fMsg": "Ihre Nachricht",
  "topics": [
    "Vertriebsanfrage",
    "Technischer Support",
    "Karriere",
    "Sonstiges"
  ],
  "send": "Nachricht senden",
  "privacy": "Mit dem Absenden öffnen Sie eine vorausgefüllte E-Mail. Es werden keine Daten auf dieser Seite gespeichert.",
  "mailSubject": "Kontaktanfrage über k-aqua.de",
  "doneTitle": "Nachricht bereit.",
  "doneText": "Ihr E-Mail-Programm hat sich mit der vorausgefüllten Nachricht geöffnet — einfach absenden."
}
```

## Texte aus `messages/de.json` -> `imprint`
```json
{
  "eyebrow": "Rechtliches",
  "title": "Impressum",
  "rows": [
    [
      "Unternehmen",
      "KWT GmbH, Auweg 3, 35647 Waldsolms-Brandoberndorf"
    ],
    [
      "Geschäftsführung",
      "Philipp Nickel, Marcello Gallio"
    ],
    [
      "Registergericht",
      "Wetzlar HRB 6732"
    ],
    [
      "Sitz",
      "Waldsolms"
    ],
    [
      "USt-IdNr.",
      "DE 296238486"
    ],
    [
      "Telefon / Fax",
      "+49 (0)60 85 / 9868-410 · Fax -420"
    ],
    [
      "E-Mail",
      "info@k-aqua.de"
    ]
  ]
}
```

## Texte aus `messages/de.json` -> `privacy`
```json
{
  "eyebrow": "Rechtliches",
  "title": "Datenschutzerklärung",
  "warning": "HINWEIS: Dies ist ein prüfungsbedürftiger DSGVO-Entwurf. Er muss vor Veröffentlichung von der Unternehmensführung oder Rechtsberatung freigegeben werden.",
  "sections": [
    {
      "h": "1. Datenschutz auf einen Blick",
      "p": "Wir freuen uns über Ihren Besuch auf unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Im Folgenden informieren wir Sie über die Erhebung personenbezogener Daten bei Nutzung unserer Website."
    },
    {
      "h": "2. Verantwortlicher",
      "p": "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:\n\nKessel Wassertechnologie GmbH (KWT)\nAuweg 3\n35647 Waldsolms-Brandoberndorf\nDeutschland\n\nTelefon: +49 (0)60 85 / 9868-410\nE-Mail: info@k-aqua.de"
    },
    {
      "h": "3. Datenerfassung auf dieser Website",
      "p": "Server-Log-Dateien\nDer Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:\n\n- Browsertyp und Browserversion\n- verwendetes Betriebssystem\n- Referrer URL\n- Hostname des zugreifenden Rechners\n- Uhrzeit der Serveranfrage\n- IP-Adresse\n\nEine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO."
    },
    {
      "h": "4. Cookies",
      "p": "Unsere Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Es werden essenzielle, funktionale und Analyse-Cookies unterschieden."
    },
    {
      "h": "5. Kontaktformular",
      "p": "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
    },
    {
      "h": "6. Ihre Rechte",
      "p": "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
    }
  ]
}
```

## Zugehörige Seite (Next.js Page)
### app/[locale]/kontakt/page.tsx
```tsx
import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Phone, Wrench, ArrowUpRight } from "@/components/ui/icon";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { QuickContactForm } from "@/components/tools/QuickContactForm";
import { GlobeScrollFX } from "@/components/globe/GlobeScrollFX";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("contact") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/kontakt",
    locale,
  });
}

const COMPANY_NAME = "KWT GmbH";
const STREET_ADDRESS = "Auweg 3";
const CITY_ZIP = "35647 Waldsolms-Brandoberndorf";

const SALES_PHONE = "Tel. +49 (0)60 85 / 9868-410";
const SALES_FAX = "Fax +49 (0)60 85 / 9868-420";
const SALES_EMAIL = "info@k-aqua.de";
const SALES_EMAIL_HREF = "mailto:info@k-aqua.de";

const SUPPORT_EMAIL = "support@k-aqua.de";
const SUPPORT_EMAIL_HREF = "mailto:support@k-aqua.de";

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const tFooter = await getTranslations({ locale, namespace: "footer" });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${t("title1")} ${t("titleGrad")}`,
    "description": `${t("locTitle")} - ${t("salesTitle")}`,
    "url": `${siteUrl}/${locale}/kontakt`,
  };

  const formTranslations = {
    formTitle: t("formTitle"),
    formLead: t("formLead"),
    fName: t("fName"),
    fEmail: t("fEmail"),
    fTopic: t("fTopic"),
    fMsg: t("fMsg"),
    topics: t.raw("topics") as string[],
    send: t("send"),
    privacy: t("privacy"),
    mailSubject: t("mailSubject"),
    doneTitle: t("doneTitle"),
    doneText: t("doneText"),
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1]">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>
              </h1>
            </Reveal>
          </div>
        </section>

        {/* Contact Layout Section */}
        <section className="py-20 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: 3 Info Cards */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Physical Location */}
                <Reveal>
                  <Card className="h-full text-start p-8 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                        {t("locTitle")}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-6">
                        {COMPANY_NAME}
                        <br />
                        {STREET_ADDRESS}
                        <br />
                        {CITY_ZIP}
                      </p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Auweg+3,+35647+Waldsolms"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {tFooter("directions")}
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </Card>
                </Reveal>

                {/* Sales Contact */}
                <Reveal delay={0.08}>
                  <Card className="h-full text-start p-8 flex flex-col justify-between min-h-[220px]">
                    <div>
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                        <Phone className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                        {t("salesTitle")}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-6">
                        {SALES_PHONE}
                        <br />
                        {SALES_FAX}
                      </p>
                    </div>
                    <a
                      href={SALES_EMAIL_HREF}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {SALES_EMAIL}
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </Card>
                </Reveal>

                {/* Technical Support */}
                <Reveal delay={0.16}>
                  <Card className="h-full text-start p-8 flex flex-col justify-between min-h-[220px]" tint>
                    <div>
                      <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0 mb-6">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                        {t("supportTitle")}
                      </h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-6">
                        {t("supportText")}
                      </p>
                    </div>
                    <a
                      href={SUPPORT_EMAIL_HREF}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary-hover font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {SUPPORT_EMAIL}
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </a>
                  </Card>
                </Reveal>
              </div>

              {/* Right Column: Quick Contact Form */}
              <div className="lg:col-span-7 h-full">
                <Reveal delay={0.1}>
                  <QuickContactForm translations={formTranslations} />
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* Globe Section */}
        <section className="py-12 border-t border-card-border/50 bg-background flex justify-center items-center">
          <GlobeScrollFX variant="network" fx="orbit" size={300} />
        </section>
      </div>
    </>
  );
}

```


