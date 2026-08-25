"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import { Chip } from "@/components/ui/Chip";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Download, Check } from "@/components/ui/icon";
import { Box, Sparkles, Layers } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

// Echte Zertifikatsnummern, abgelesen aus der Urkunde, die diese Seite ohnehin
// zum Download anbietet: public/pdf/kwt-iso-certificates-en.pdf, ausgestellt von
// der SKZ - Cert GmbH, Würzburg (DAkkS-akkreditiert, D-ZM-17265-01-00) für die
// KWT GmbH, Auweg 3, 35647 Waldsolms-Brandoberndorf.
//
// Hier standen zuvor „Q-2025-6732", „U-2025-6733", „E-2025-6734" unter einem
// `TODO(content)` — erfundene Nummern, dazu eine erfundene Laufzeit
// („10/2025 – 10/2028"). Zertifikatsnummern sind eine Konformitätsaussage; sie
// zu erfinden ist schwerer zu vertreten als eine falsche Artikelnummer. Die
// Belege lagen die ganze Zeit im ausgelieferten PDF.
//
// Reihenfolge folgt `trust.certs` in messages/: 9001, 14001, 50001 — im
// Zertifikat als Suffix .Q (Qualität), .U (Umwelt), .E (Energie).
// Nur die nackte Nummer: Die Beschriftung „Zertifikat-Nr." setzt die Komponente
// selbst davor (`data.certNo`), sonst stünde sie doppelt da.
const CERT_NUMBERS = [
  "000932.Q",
  "000932.U",
  "000932.E"
];

// Alle drei tragen dieselbe Laufzeit und dieselbe Projektnummer
// (000932.EQU/24.R) — sie wurden in einem Audit ausgestellt.
const VALIDITY_DATES = [
  "01.10.2025 – 22.11.2027",
  "01.10.2025 – 22.11.2027",
  "01.10.2025 – 22.11.2027"
];

const SUPPORT_EMAIL_PREFIX = "mailto:support@k-aqua.de";
const QUERY_SUBJECT = "?subject=";
const QUERY_BODY = "&body=";
const NEWLINE_MINUS = "\n\n- ";
const NEWLINE_MINUS_JOIN = "\n- ";
const ENSPACE = " ";
const SLASH = " / ";
const COLON = ": ";
const OPEN_PAREN = " (";
const CLOSE_PAREN = ")";
const GENAU_LETTERS = ["G", "E", "N", "A", "U"];

interface TrustCenterData {
  eyebrow: string;
  title1: string;
  titleGrad: string;
  lead: string;
  certs: [string, string][];
  accred: string;
  certNo: string;
  valid: string;
  download: string;
  genauEyebrow: string;
  genauTitle: string;
  genauLead: string;
  genau: [string, string][];
  rfpEyebrow: string;
  rfpTitle: string;
  rfpLead: string;
  docs: string[];
  inPackage: string;
  pickLeft: string;
  requestZip: string;
  requestBtn: string;
  mailSubject: string;
  mailBody: string;
  scope3: string;
}

interface TrustCenterProps {
  data: TrustCenterData;
}

export function TrustCenter({ data }: TrustCenterProps) {
  const locale = useLocale();
  const t = useTranslations("trust");
  const [activeGenauIdx, setActiveGenauIdx] = useState<number>(0);
  const [pickedDocs, setPickedDocs] = useState<string[]>([]);
  const downloadUrl = locale === "de" ? "/pdf/kwt-iso-zertifikat-de.pdf" : "/pdf/kwt-iso-certificates-en.pdf";

  // Alle drei Karten führen auf dieselbe Urkunde — das ist richtig, die Datei
  // enthält alle drei Zertifikate. Bisher landete jeder Klick aber auf Seite 1,
  // also bei ISO 50001, auch wenn man auf „ISO 9001" geklickt hatte.
  //
  // Seitenreihenfolge in BEIDEN Dateien (deutsch wie englisch, am gerenderten
  // PDF geprüft): 1 = ISO 50001, 2 = ISO 9001, 3 = ISO 14001.
  // Kartenreihenfolge laut `trust.certs`: 9001, 14001, 50001.
  const CERT_PDF_PAGES = [2, 3, 1];

  const handleToggleDoc = (doc: string) => {
    if (pickedDocs.includes(doc)) {
      setPickedDocs(pickedDocs.filter((d) => d !== doc));
    } else {
      setPickedDocs([...pickedDocs, doc]);
    }
  };

  const mailtoHref = `${SUPPORT_EMAIL_PREFIX}${QUERY_SUBJECT}${encodeURIComponent(
    data.mailSubject
  )}${QUERY_BODY}${encodeURIComponent(
    data.mailBody + NEWLINE_MINUS + pickedDocs.join(NEWLINE_MINUS_JOIN)
  )}`;

  const docCountText = `${pickedDocs.length}${SLASH}${data.docs.length}`;
  const requestBtnText = `${data.requestBtn}${
    pickedDocs.length > 0 ? `${OPEN_PAREN}${pickedDocs.length}${CLOSE_PAREN}` : ""
  }`;

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-20 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <div className="max-w-[760px] mb-12 flex flex-col gap-3 text-start items-start animate-reveal">
            {data.eyebrow && (
              <div className="mb-1">
                <span className="text-small font-bold uppercase tracking-wider text-primary">{data.eyebrow}</span>
              </div>
            )}
            <h1 className="text-h1 font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-balance mt-4 mb-4">
              {data.title1}{ENSPACE}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {data.titleGrad}
              </span>
            </h1>
            {data.lead && (
              <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-pretty font-body font-normal mb-2">
                {data.lead}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ISO Certificates Cards */}
      <section className="py-16 border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-6">
            {data.certs.map((cert, idx) => {
              const [name, desc] = cert;
              const certNum = CERT_NUMBERS[idx];
              const validity = VALIDITY_DATES[idx];
              const displayCertNo = `${data.certNo}${COLON}${certNum}`;
              const displayValid = `${data.valid}${COLON}${validity}`;

              return (
                <Reveal key={name} delay={idx * 0.08}>
                  <Card className="h-full flex flex-col justify-between items-start text-start p-5 sm:p-8">
                    <div className="flex flex-col gap-4 items-start w-full">
                      {/* `flex-wrap`: Überschrift und Akkreditierungs-Chip standen
                          in einer Zeile, die nicht umbrechen konnte, und der Chip
                          ist `shrink-0`. Bei 320 px brauchen „ISO 9001:2015" und
                          „DAkkS-akkreditiert" zusammen rund 306 px in einer Karte,
                          die 222 px breit ist — der Chip lief heraus. Jetzt rutscht
                          er auf eine eigene Zeile, sobald der Platz fehlt; auf
                          breiteren Geräten bleibt die Zeile wie gehabt. */}
                      <div className="flex flex-wrap justify-between items-start w-full gap-2">
                        <h2 className="font-heading font-extrabold text-2xl text-foreground">
                          {name}
                        </h2>
                        <Chip className="text-tiny px-2.5 py-0.5 shrink-0 bg-primary-soft text-primary border-primary/20">
                          {data.accred}
                        </Chip>
                      </div>
                      <p className="text-body text-muted-foreground">{desc}</p>
                      <div className="flex flex-col gap-1 text-small text-faint-foreground mt-2">
                        <span>{displayCertNo}</span>
                        <span>{displayValid}</span>
                      </div>
                    </div>
                    <div className="w-full mt-6">
                      <Button
                        href={`${downloadUrl}#page=${CERT_PDF_PAGES[idx] ?? 1}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        className="w-full"
                        icon={<Download className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        {data.download}
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* GENAU Framework Section */}
      <section className="py-16 border-b border-card-border bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={data.genauEyebrow}
              title={data.genauTitle}
              lead={data.genauLead}
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12 items-stretch mt-12">
            {/* Tabs List (Golden Ratio: ~38%) */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-3">
              {GENAU_LETTERS.map((letter, idx) => {
                const isActive = activeGenauIdx === idx;
                const labelText = data.genau[idx]?.[0] || letter;

                return (
                  <button
                    key={letter}
                    onClick={() => setActiveGenauIdx(idx)}
                    className={`group relative flex items-center gap-6 text-start px-8 py-5 rounded-2xl border transition-all duration-500 overflow-hidden outline-none ${
                      isActive
                        ? "bg-card border-primary/30 shadow-2xl scale-[1.02]"
                        : "bg-transparent border-transparent text-muted-foreground hover:bg-card/50 hover:border-card-border"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-100" />
                    )}
                    <span
                      className={`text-3xl font-heading font-black transition-colors duration-500 ${
                        isActive ? "text-primary" : "text-muted-foreground/30 group-hover:text-primary/50"
                      }`}
                    >
                      {letter}
                    </span>
                    <span
                      className={`text-xl font-heading font-bold transition-colors duration-500 ${
                        isActive ? "text-foreground" : "group-hover:text-foreground"
                      }`}
                    >
                      {labelText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Details Box (Golden Ratio: ~62%) */}
            <div className="lg:col-span-7 h-full">
              <Reveal key={activeGenauIdx} className="h-full">
                <div className="relative h-full min-h-[400px] flex flex-col justify-center p-12 sm:p-16 rounded-[32px] bg-card border border-card-border overflow-hidden shadow-2xl group">
                  {/* Premium Watermark */}
                  <div className="absolute -right-8 -bottom-16 text-[280px] font-heading font-black text-primary/[0.03] leading-none pointer-events-none select-none group-hover:scale-110 transition-transform duration-1000">
                    {GENAU_LETTERS[activeGenauIdx]}
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 text-primary font-heading font-bold text-xl">
                        0{activeGenauIdx + 1}
                      </div>
                      <h3 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight">
                        {data.genau[activeGenauIdx]?.[0]}
                      </h3>
                    </div>
                    <p className="text-xl text-muted-foreground leading-relaxed font-light">
                      {data.genau[activeGenauIdx]?.[1]}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3D CAD & BIM Data Room Section */}
      <section className="py-12 border-b border-card-border bg-gradient-to-b from-card to-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="p-8 sm:p-12 rounded-3xl bg-card border border-card-border shadow-lift flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-3 text-start max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-heading font-bold w-fit">
                  <Box className="w-4 h-4" />
                  <span>{t("bimEyebrow")}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                  {t("bimTitle")}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {t("bimLead")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
                <Link
                  href="/3d"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-sm hover:bg-primary-hover transition-all shadow-diffuse inline-flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t("bimCta")}</span>
                </Link>
                <Link
                  href="/3d"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-background border border-card-border hover:bg-background-subtle text-foreground font-heading font-semibold text-sm transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4 text-muted-foreground" />
                  <span>CAD-QA</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RFP Paketbuilder Section */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <SectionHead
              eyebrow={data.rfpEyebrow}
              title={data.rfpTitle}
              lead={data.rfpLead}
            />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8 items-start mt-8">
            {/* Checklist */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {data.docs.map((doc) => {
                const isChecked = pickedDocs.includes(doc);
                return (
                  <label
                    key={doc}
                    className={`flex items-center gap-4 px-6 py-4 rounded-xl border cursor-pointer select-none transition-all duration-200 text-start ${
                      isChecked
                        ? "border-primary bg-primary-soft/40"
                        : "border-card-border bg-card hover:bg-background-subtle"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-primary rounded border-card-border shrink-0"
                      checked={isChecked}
                      onChange={() => handleToggleDoc(doc)}
                    />
                    <span className="font-semibold text-foreground text-body">
                      {doc}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Request Status Box */}
            <div className="lg:col-span-5">
              <Card tint className="p-5 sm:p-8 text-start h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {data.inPackage}
                    </h3>
                    <Chip className="bg-primary/10 border-primary/20 text-primary font-bold">
                      {docCountText}
                    </Chip>
                  </div>

                  {pickedDocs.length === 0 ? (
                    <p className="text-body text-muted-foreground italic">
                      {data.pickLeft}
                    </p>
                  ) : (
                    <ul className="flex flex-col gap-2">
                      {pickedDocs.map((doc) => (
                        <li
                          key={doc}
                          className="flex items-center gap-2 text-small text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-8">
                  {pickedDocs.length > 0 && (
                    <p className="text-small text-muted-foreground mb-4">
                      {data.requestZip}
                    </p>
                  )}
                  <LiquidMagneticButton
                    fill="droplet"
                    size="md"
                    href={pickedDocs.length > 0 ? mailtoHref : undefined}
                    disabled={pickedDocs.length === 0}
                    className="w-full"
                  >
                    {requestBtnText}
                  </LiquidMagneticButton>
                </div>
              </Card>
            </div>
          </div>

          {/* Scope 3 Disclaimer */}
          <div className="mt-12 p-6 rounded-xl border border-dashed border-card-border bg-background-subtle text-start">
            <p className="text-small text-muted-foreground leading-relaxed">
              {data.scope3}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const DOT = "•";
