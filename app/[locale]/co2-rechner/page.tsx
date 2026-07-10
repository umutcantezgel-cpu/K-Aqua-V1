import React from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import { CO2Deep } from "@/components/sections/CO2Deep";
import type { Metadata } from "next";

// Premium UI Components
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";

const Co2Calculator = dynamic(() => import("@/components/tools/Co2Calculator"), {
  loading: () => <div className="w-full h-[600px] animate-pulse bg-muted/50 border border-card-border rounded-xl"></div>,
});

const MaterialComparator = dynamic(() => import("@/components/tools/MaterialComparator").then(mod => mod.MaterialComparator), {
  loading: () => <div className="w-full h-[600px] animate-pulse bg-muted/50 border border-card-border rounded-xl"></div>,
});

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];
  return constructMetadata({
    title: meta[0] ?? "CO2-Rechner & Emissionsanalyse",
    description: meta[1] ?? "Präzise Berechnung der CO2-Emissionen für industrielle Rohrsysteme.",
    path: "/co2-rechner",
    locale,
  });
}

export default async function Co2RechnerPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "co2");
  
  // High-End Content Data
  const scrollContent = [
    {
      title: "Phase 01: Granulat-Synthese",
      description: "Die Polymerisation von Polypropylen-Random-Copolymer (PP-R). Ein endothermer Prozess, dessen energetischer Fußabdruck in unseren Modellen auf das Milligramm genau erfasst wird. Keine Toleranz für empirische Schätzungen.",
      content: <PremiumAssetPlaceholder label="Molekulare Struktur (PP-R)" />
    },
    {
      title: "Phase 02: Hochdruck-Extrusion",
      description: "Thermomechanische Formgebung unter extremen Drücken. Unser Rechner analysiert den Energieverbrauch der Extruder-Heizzonen, Kalibrierwerkzeuge und Vakuum-Kühlbäder in Echtzeit. Jedes Kilowatt wird bilanziert.",
      content: <PremiumAssetPlaceholder label="Extrusions-Thermodynamik" />
    },
    {
      title: "Phase 03: Systematische Logistik",
      description: "Die globale Supply Chain ist kein abstraktes Konzept, sondern eine vektorielle Summe aus Distanz, Tonnage und Treibstoff-Emissionsfaktoren. Wir kartografieren den exakten Frachtweg von der Produktion bis zum Installationsort.",
      content: <PremiumAssetPlaceholder label="Logistik-Vektorraum" />
    },
    {
      title: "Phase 04: Installation & Tiefbau",
      description: "Thermische Polyfusionsschweißverfahren gegenüber konventioneller Verbindungstechnik. Der energetische Aufwand auf der Baustelle wird als entscheidender, unumstößlicher Parameter in die finale CO2-Bilanz integriert.",
      content: <PremiumAssetPlaceholder label="Schweißprozess-Energetik" />
    },
    {
      title: "Phase 05: Zirkuläre Dekonstruktion",
      description: "PP-R ist zu 100% recyclingfähig. Das End-of-Life-Szenario schließt den materiellen Kreislauf, transformiert Abfall in Sekundärrohstoffe und generiert negative Emissionswerte in der Langzeitbilanz.",
      content: <PremiumAssetPlaceholder label="Material-Kreislauf (Closed Loop)" />
    }
  ];

  const timelineItems = [
    { year: "2024", title: "Parametrische Erfassung", text: "Implementierung hochauflösender LCA-Datensätze für alle PP-R Formteile gemäß EN 15804+A2." },
    { year: "2030", title: "Klimaneutrale Extrusion", text: "Geplante Transformation der Produktionslinien auf 100% erneuerbare Energien. Null-Toleranz für fossile Brennstoffe." },
    { year: "2050", title: "Net-Zero Supply Chain", text: "Vollständige Dekarbonisierung der globalen Transport- und Distributionswege. Logistische Perfektion." },
    { year: "2124", title: "End-of-Life", text: "Nach >100 Jahren garantierter Betriebszeit: Thermomechanisches Recycling der Leitungssysteme." }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      <JsonLd schema={jsonLd} />
      
      {/* 1. Epic Parallax Hero */}
      <ParallaxHero 
        eyebrow="DATENGESTÜTZTE KLIMABILANZIERUNG"
        title={
          <span className="block max-w-5xl mx-auto uppercase tracking-tighter">
            Präzision <br />
            <span className="text-muted-foreground">Ohne</span> <br />
            Kompromisse.
          </span>
        }
        description="Nachhaltigkeit ist kein Marketing-Konzept. Es ist eine mathematische Gleichung. Der K-Aqua CO2-Rechner quantifiziert die graue Energie und den ökologischen Fußabdruck unserer Leitungssysteme mit eiskalter, industrieller Genauigkeit. Berechnen, Analysieren, Optimieren."
      >
        <div className="mt-12 flex justify-center w-full px-6 md:px-0">
          <PremiumAssetPlaceholder className="max-w-4xl h-[400px] w-full" label="Klima-Algorithmik Visualisierung" />
        </div>
      </ParallaxHero>

      {/* 2. Engineering Bento Grid */}
      <section className="py-32 px-6 md:px-12 bg-muted/10 relative">
        <div className="max-w-[1400px] mx-auto mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-6">
            Die Architektur <br/><span className="text-muted-foreground">Der Emissionen</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vier Säulen der datengesteuerten Lebenszyklusanalyse. Jedes Gramm CO2 wird erfasst, kategorisiert und in der Gesamtarchitektur des Projekts abgebildet.
          </p>
        </div>
        
        <BentoGrid>
          <BentoGridItem
            colSpan={2}
            title="Lebenszyklusanalyse (LCA)"
            description="Präzisionsdatensätze gemäß EN 15804. Keine Schätzungen. Keine Varianzen. Wir liefern belastbare Fakten für die Gebäudezertifizierung (DGNB, LEED, BREEAM)."
            header={<PremiumAssetPlaceholder className="h-full min-h-[200px]" label="LCA Metriken" />}
          />
          <BentoGridItem
            colSpan={1}
            title="Graue Energie"
            description="Quantifizierung der systemischen Energieflüsse von der Rohstoff-Synthese bis zur Extrusion."
            header={<PremiumAssetPlaceholder className="h-full min-h-[200px]" label="Embodied Carbon" />}
          />
          <BentoGridItem
            colSpan={1}
            title="Lebensdauer-Multiplikator"
            description="PP-R Systeme garantieren >100 Jahre absolute Integrität. Eine Konstante im Nachhaltigkeitskalkül, die Ersatzinvestitionen obsolet macht."
            header={<PremiumAssetPlaceholder className="h-full min-h-[200px]" label="T=100a" />}
          />
          <BentoGridItem
            colSpan={2}
            title="Transport & Logistik-Mapping"
            description="Algorithmische Erfassung von Routenprofilen, Flottenspezifikationen und Frachtgewichten. Vom Werkstore bis in den Rohrgraben der Baustelle."
            header={<PremiumAssetPlaceholder className="h-full min-h-[200px]" label="Supply Chain Vektoren" />}
          />
        </BentoGrid>
      </section>

      {/* 3. Sticky Scroll Reveal (The Process) */}
      <section className="py-32 bg-background border-t border-card-border relative z-10">
        <div className="max-w-[1400px] mx-auto mb-20 px-6 md:px-12">
          <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight">
            Der <span className="text-muted-foreground">Kalkulationsprozess</span>
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
            Ein tiefer Einblick in die thermodynamischen und logistischen Variablen, die unseren Algorithmus speisen.
          </p>
        </div>
        <StickyScrollReveal content={scrollContent} />
      </section>

      {/* 4. The Interactive Calculators */}
      <section className="py-32 px-6 md:px-12 bg-muted/20 border-t border-card-border relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-4">
              Das <span className="text-primary">Instrument</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Füttern Sie den Algorithmus mit Ihren Projektparametern. Das System berechnet die exakte CO2-Bilanzierung Ihrer Rohrleitungsarchitektur in Echtzeit. Keine Blackbox.
            </p>
          </div>
          
          <div className="rounded-3xl border border-card-border bg-background shadow-2xl overflow-hidden p-1 md:p-8">
            <Co2Calculator />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-background border-t border-card-border relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-4">
              Material<span className="text-muted-foreground">vergleich</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Stahl, Kupfer, Gusseisen gegen hochvernetztes PP-R. Die Zahlen lügen nicht. Vergleichen Sie die ökologische Performance auf Basis nackter, ungeschönter Daten.
            </p>
          </div>
          
          <div className="rounded-3xl border border-card-border bg-muted/30 shadow-2xl overflow-hidden p-1 md:p-8">
            <MaterialComparator />
          </div>
        </div>
      </section>

      {/* 5. Horizontal Timeline */}
      <section className="py-32 bg-muted/10 border-t border-card-border overflow-hidden relative z-20">
        <HorizontalTimeline 
          title="Der Zirkuläre Horizont"
          description="Nachhaltigkeit ist kein Zustand, sondern ein Vektor. Unsere technologische Roadmap bis zum Jahr 2124."
          items={timelineItems}
        />
      </section>

      {/* 6. Legacy CO2 Deep Component */}
      <div className="relative z-20 bg-background border-t border-card-border">
        <CO2Deep />
      </div>
    </div>
  );
}
