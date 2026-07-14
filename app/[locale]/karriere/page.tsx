/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import ApplicationPortal from "@/components/tools/ApplicationPortal";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { Shield, Zap, Activity, Globe, Database, Layers, Target, ArrowUpRight } from "lucide-react";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("career") as string[];
  return constructMetadata({
    title: meta[0] ?? "Karriere bei K-Aqua | Präzision. Innovation. Dominanz.",
    description: meta[1] ?? "Werden Sie Teil der technologischen Speerspitze der industriellen Wasseraufbereitung.",
    path: "/karriere",
    locale,
  });
}

export default async function KarrierePage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "career");
  
  // -------------------------------------------------------------
  // Apple-style Scroll-Telling & German Engineering Copy
  // -------------------------------------------------------------
  
  const timelineItems = [
    {
      year: "Phase 01",
      title: "System-Integration",
      text: "Riguroses Onboarding. Eintauchen in die K-Aqua Architektur. Analyse bestehender Wasseraufbereitungsprotokolle und Aneignung der internen Qualitätsstandards. Fehler tolerieren wir nicht."
    },
    {
      year: "Phase 02",
      title: "Operative Autonomie",
      text: "Übernahme erster Teilprojekte. Kalibrierung von Anlagenparametern und Leitung von Installationsteams. Verantwortung für die nahtlose Implementierung unter extremen Bedingungen."
    },
    {
      year: "Phase 03",
      title: "Architektonische Kontrolle",
      text: "Design und Konzeption komplexer Anlagen. Leitung von interdisziplinären Teams. Optimierung der thermodynamischen und fluidmechanischen Systeme unserer internationalen Kunden."
    },
    {
      year: "Phase 04",
      title: "Technologische Speerspitze",
      text: "Innovation auf C-Level-Niveau. Entwicklung von Patenten, strategische Ausrichtung der R&D-Abteilung und Definition der nächsten Generation von Wasseraufbereitungstechnologien."
    }
  ];

  const stickyScrollContent = [
    {
      title: "Die K-Aqua Doktrin",
      description: "Wir suchen keine Mitarbeiter. Wir suchen Architekten der industriellen Effizienz. Bei K-Aqua definieren wir die physikalischen Grenzen des Möglichen neu. Unsere Wasseraufbereitungsanlagen sind Meisterwerke deutscher Ingenieurskunst – gebaut für jahrzehntelange absolute Zuverlässigkeit.",
      content: <PremiumAssetPlaceholder label="System Blueprint Model" />
    },
    {
      title: "Eiskalte Präzision",
      description: "Jede Schweißnaht, jede Zeile Code, jedes Ventil unterliegt einem gnadenlosen Qualitätskontroll-Regime. Wir operieren in Toleranzbereichen, die andere für unmöglich halten. Wer bei K-Aqua arbeitet, akzeptiert den Standard der absoluten Perfektion.",
      content: <PremiumAssetPlaceholder label="Precision Engineering Core" />
    },
    {
      title: "Zero Downtime Kultur",
      description: "Unsere Kunden vertrauen uns ihre kritischste Infrastruktur an. Stillstand ist keine Option. Wir antizipieren Fehler, bevor sie entstehen. Unsere Ingenieure denken in Redundanzen und ausfallsicheren Architekturen. Das ist kein Job, das ist ein Mandat zur Systemerhaltung.",
      content: <PremiumAssetPlaceholder label="Redundancy Network Matrix" />
    },
    {
      title: "Technologische Dominanz",
      description: "Wir folgen keinen Trends, wir setzen sie. Von KI-gesteuerter prädiktiver Wartung bis hin zu hyper-effizienten Umkehrosmose-Verfahren. K-Aqua liefert die Werkzeuge, mit denen die Industrie von morgen arbeitet. Werden Sie Teil des Fortschritts.",
      content: <PremiumAssetPlaceholder label="AI Predictive Interface" />
    }
  ];

  return (
    <main className="bg-background min-h-screen text-foreground overflow-hidden">
      <JsonLd schema={jsonLd} />
      
      {/* 1. Parallax Hero: Extreme Authority */}
      <ParallaxHero
        eyebrow="K-Aqua Karriere-Matrix"
        title="Arbeiten für den Innovationsführer."
        description="Wir bauen die Anlagen, die die Zukunft der industriellen Wasseraufbereitung definieren. Keine Kompromisse. Höchste Präzision. Werden Sie Teil der technologischen Speerspitze der KWT GmbH."
      >
        <a 
          href="#application-portal" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-full hover:bg-primary/90 transition-all hover:scale-105 uppercase tracking-widest text-sm"
        >
          Protokoll Starten <ArrowUpRight className="w-4 h-4" />
        </a>
      </ParallaxHero>

      {/* spacer */}
      <div className="h-32 md:h-48" />

      {/* 2. Core Philosophy - Apple style wide text */}
      <section className="max-w-[1000px] mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter mb-8 leading-[1.1]">
          Kompromisslose Technik.<br />
          <span className="text-muted-foreground">Exzellentes Personal.</span>
        </h2>
        <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light">
          Wir bei K-Aqua konstruieren nicht einfach Anlagen. Wir erschaffen organische Maschinen-Ökosysteme. Der Anspruch an unsere Technologie ist gigantisch. Der Anspruch an unsere Ingenieure ist höher. Wir bieten das härteste, aber lohnendste technologische Umfeld der Branche.
        </p>
      </section>

      <div className="h-32 md:h-48" />

      {/* 3. Sticky Scroll Reveal - The Doctrine */}
      <section className="px-6 max-w-[1400px] mx-auto">
        <div className="mb-16 text-center">
          <span className="text-primary font-mono font-bold tracking-widest uppercase text-sm">Kern-Philosophie</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mt-4">Die Architektur des Erfolgs</h2>
        </div>
        <StickyScrollReveal content={stickyScrollContent} />
      </section>

      <div className="h-32 md:h-48" />

      {/* 4. Horizontal Timeline - Career Path */}
      <HorizontalTimeline 
        title="Der Pfad der Exzellenz"
        description="Ihr Aufstieg bei K-Aqua ist streng leistungsbezogen. Keine Politik, nur Resultate. Zeigen Sie technische Brillanz, und wir geben Ihnen die Ressourcen, um die Industrie zu verändern."
        items={timelineItems}
      />

      <div className="h-32 md:h-48" />

      {/* 5. Bento Grid - Infrastruktur für Höchstleistung (Benefits) */}
      <section className="px-6 max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-primary font-mono font-bold tracking-widest uppercase text-sm">Operative Vorteile</span>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold mt-4">Infrastruktur für Höchstleistung</h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Wir verlangen viel. Wir bieten mehr. Unsere Kompensations- und Benefit-Struktur ist darauf ausgelegt, Reibungsverluste in Ihrem Privatleben auf null zu reduzieren.
          </p>
        </div>

        <BentoGrid>
          <BentoGridItem 
            title="Monetäre Optimierung"
            description="50€ steuerfreier Sachbezug. Ein präzise kalibrierter finanzieller Injektor zur monatlichen Leistungssteigerung."
            icon={<Database className="w-8 h-8 text-primary mb-4" />}
            colSpan={2}
            header={<PremiumAssetPlaceholder label="Compensation Protocol" className="min-h-[200px]" />}
          />
          <BentoGridItem 
            title="Ernährungs-Infrastruktur"
            description="Täglicher Lunchzuschuss. Hochwertiger Treibstoff für maximale kognitive und physische Ausbeute."
            icon={<Activity className="w-8 h-8 text-primary mb-4" />}
            colSpan={1}
            header={<div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-card-border" />}
          />
          <BentoGridItem 
            title="Konnektivitäts-Subvention"
            description="Übernahme der Internetkosten. Nahtlose Integration in das globale Datennetzwerk, auch aus dem Home-Office-Sektor."
            icon={<Globe className="w-8 h-8 text-primary mb-4" />}
            colSpan={1}
            header={<div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-card-border" />}
          />
          <BentoGridItem 
            title="Mobilitäts-Kompensation"
            description="High-End Jobrad-Leasing. Kinetische Energierückgewinnung durch optimierte Transport-Hardware für den Arbeitsweg."
            icon={<Zap className="w-8 h-8 text-primary mb-4" />}
            colSpan={2}
            header={<PremiumAssetPlaceholder label="Transport Dynamics" className="min-h-[200px]" />}
          />
          <BentoGridItem 
            title="Familien-Ressourcen-Planung"
            description="Kita-Zuschuss für die nächste Generation. Wir sichern Ihre Backups, damit Sie sich auf die primäre Mission konzentrieren können."
            icon={<Shield className="w-8 h-8 text-primary mb-4" />}
            colSpan={2}
            header={<PremiumAssetPlaceholder label="Future Generation Sandbox" className="min-h-[200px]" />}
          />
          <BentoGridItem 
            title="Vermögensbildungs-Protokoll"
            description="Vermögenswirksame Leistungen. Systematischer Vermögensaufbau durch algorithmisch berechnete Zinseszins-Effekte."
            icon={<Layers className="w-8 h-8 text-primary mb-4" />}
            colSpan={1}
            header={<div className="h-full w-full bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-card-border" />}
          />
        </BentoGrid>
      </section>

      <div className="h-32 md:h-48" />

      {/* 6. Massive Visual Break */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <PremiumAssetPlaceholder label="Global Water Purification Matrix" className="min-h-[600px] md:min-h-[800px] rounded-[3rem]" />
      </section>

      {/* 7. Detailed Application Portal with Job Listings & CV Upload */}
      <div id="application-portal" className="bg-background-subtle border-t border-card-border relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
          <Target className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">Initialisierung der Bewerbung</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Laden Sie Ihre Parameter in unsere Matrix. Unser System evaluiert Ihre Kompatibilität mit der K-Aqua-Doktrin in Echtzeit.
          </p>
        </div>
        <ApplicationPortal />
      </div>
    </main>
  );
}
