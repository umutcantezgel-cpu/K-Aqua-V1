import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getArticleJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { Button } from "@/components/ui/Button";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("academy") as string[];
  return constructMetadata({
    title: meta[0] ?? "K-Aqua Academy",
    description: meta[1] ?? "Zertifizierte Systemkompetenz für industrielle Rohrleitungssysteme.",
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getArticleJsonLd(locale, "academy");

  const timelineItems = [
    {
      year: "PHASE 01",
      title: "Theoretische Fundierung",
      text: "Systematische Erfassung der Materialeigenschaften von PP-RCT und normativer Anforderungen (DIN 8077/8078). Berechnung von Druckverlusten, Längenänderungen und Ausdehnungskoeffizienten unter extremen thermodynamischen Lasten."
    },
    {
      year: "PHASE 02",
      title: "Werkstoff- & Systemkunde",
      text: "Detaillierte Analyse der K-Aqua Werkzeugsysteme. Kalibrierung von Schweißgeräten, Inspektion von Heizelementen und exakte Erfassung der kritischen Temperaturfenster für absolut homogene Molekularverbindungen."
    },
    {
      year: "PHASE 03",
      title: "Praktische Applikation",
      text: "Durchführung von Polyfusions- und Heizwendelschweißungen unter kontrollierten Bedingungen. Fokus auf exakte Einstecktiefen, Anwärmzeiten und Abkühlphasen zur Sicherstellung der totalen Systemintegrität."
    },
    {
      year: "PHASE 04",
      title: "Zertifizierungsaudit",
      text: "Strenge Evaluierung der theoretischen Kenntnisse und praktischen Schweißverbindungen. Erfolgreiche Absolventen erhalten die offizielle K-Aqua Autorisierung für den industriellen Einsatz."
    }
  ];

  const stickyModules = [
    {
      title: "K-Aqua Systemarchitektur",
      description: "Tiefgreifende Analyse der dreischichtigen Rohrstruktur. Verständnis der Glasfaser-Compound-Technologie und deren Auswirkung auf die lineare Längsausdehnung. Ein zwingendes Fundament für den industriellen Einsatz.",
      content: <PremiumAssetPlaceholder label="Struktur-Analyse" />
    },
    {
      title: "Thermodynamisches Verhalten",
      description: "Präzise Berechnung des Systemverhaltens bei extremen Temperaturdifferenzen. Taupunktanalyse für Kaltwasseranlagen und Druckbelastungsgrenzen bei 95°C Heißwassersystemen. Kompromisslose Sicherheit durch exakte Mathematik.",
      content: <PremiumAssetPlaceholder label="Thermodynamik-Simulation" />
    },
    {
      title: "Fügetechnik & Polyfusion",
      description: "Die absolute Homogenität der Verbindung. Vermittlung der molekularen Verschmelzungsprozesse bei exakt 260°C. Vermeidung von Mikrorissen, Reduktion von Spannungskerben und die Garantie einer 50-jährigen Lebensdauer unter Nenndruck.",
      content: <PremiumAssetPlaceholder label="Schweißprozess-Visualisierung" />
    },
    {
      title: "Normative Konformität",
      description: "Rechtliche und normative Absicherung. Einhaltung der Trinkwasserverordnung (TrinkwV), DVGW-Richtlinien und internationaler Standards (SKZ, WRAS). Fehlerfreie Dokumentation und Übergabeprotokolle für kritische Großprojekte.",
      content: <PremiumAssetPlaceholder label="Compliance-Matrix" />
    }
  ];

  return (
    <>
      <JsonLd schema={jsonLd} />
      
      {/* Hero Section */}
      <ParallaxHero 
        eyebrow="AKADEMIE & ZERTIFIZIERUNG"
        title={
          <span className="block">
            SYSTEMKOMPETENZ<br />
            <span className="text-primary">DURCH PRÄZISION.</span>
          </span>
        }
        description="Die K-Aqua Academy formt Experten für die Planung, Verarbeitung und Wartung von PP-RCT Hochleistungs-Rohrleitungssystemen. Eiskalte, fundierte Ingenieurskunst gepaart mit kompromisslosen Qualitätsstandards."
      >
        <Button variant="primary" size="lg" className="tracking-widest uppercase font-bold">
          Zertifizierung Starten
        </Button>
        <Button variant="ghost" size="lg" className="tracking-widest uppercase font-bold">
          Modulübersicht
        </Button>
      </ParallaxHero>

      {/* Intro Grid */}
      <section className="py-32 px-6 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-6">
              INGENIEURSKUNST ERFORDERT <span className="text-primary">DISZIPLIN.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Unsere Schulungen basieren auf harten physikalischen Fakten. Wir vermitteln kein Halbwissen, sondern tiefgreifende Materialwissenschaft und exakte Prozessparameter für die Installation von industriellen K-Aqua Systemen.
            </p>
          </div>

          <BentoGrid>
            <BentoGridItem 
              colSpan={2}
              title="Materialwissenschaft PP-RCT"
              description="Verstehen Sie die molekulare Struktur von Polypropylen Random Copolymer mit modifizierter Kristallinität. Warum unsere Systeme extremen Drücken und Temperaturen widerstehen."
              header={<PremiumAssetPlaceholder className="h-full min-h-0 border-none rounded-none" label="Molekularstruktur PP-RCT" />}
            />
            <BentoGridItem 
              colSpan={1}
              title="Hydraulik & Dimensionierung"
              description="Exakte Auslegung von Leitungsnetzen. Berechnung von Fließgeschwindigkeiten und Druckverlusten zur Optimierung der Anlageneffizienz."
              header={<PremiumAssetPlaceholder className="h-full min-h-0 border-none rounded-none" label="Strömungsmechanik" />}
            />
            <BentoGridItem 
              colSpan={1}
              title="Schweißtechnik"
              description="Praktische Beherrschung der Polyfusions- und Elektromuffenschweißung. Absolute Prozesssicherheit durch kontrollierte Parameter."
              header={<PremiumAssetPlaceholder className="h-full min-h-0 border-none rounded-none" label="Fügeprozess 260°C" />}
            />
            <BentoGridItem 
              colSpan={2}
              title="Globale Zertifizierung"
              description="Das K-Aqua Zertifikat ist der Beleg für höchste Installationskompetenz. Es autorisiert zur Ausführung kritischer Infrastrukturprojekte und aktiviert unsere erweiterte Systemgarantie."
              header={<PremiumAssetPlaceholder className="h-full min-h-0 border-none rounded-none" label="Audit-Zertifikat" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Sticky Scroll Modules */}
      <section className="py-32 bg-card border-y border-card-border relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-6">
            DAS SCHULUNGS<span className="text-primary">CURRICULUM</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vier Säulen der technologischen Kompetenz. Von der theoretischen Planung bis zur fehlerfreien praktischen Ausführung unter härtesten Baustellenbedingungen.
          </p>
        </div>
        <StickyScrollReveal content={stickyModules} />
      </section>

      {/* Horizontal Timeline */}
      <HorizontalTimeline 
        title="ZERTIFIZIERUNGS-PROZESS"
        description="Der standardisierte Weg zur K-Aqua Autorisierung. Ein unerbittlicher, sequenzieller Prozess zur Sicherstellung maximaler Installationsqualität."
        items={timelineItems}
        className="relative z-20"
      />

      {/* Outro CTA */}
      <section className="py-32 px-6 bg-background relative overflow-hidden flex items-center justify-center border-t border-card-border z-30">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_top,var(--primary-soft)_0%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
            BEREIT FÜR DIE <span className="text-primary">AUTORISIERUNG?</span>
          </h2>
          <p className="text-2xl text-muted-foreground mb-12">
            Registrieren Sie Ihr Unternehmen für das nächste Zertifizierungsaudit. Sichern Sie sich den entscheidenden Wettbewerbsvorteil durch nachgewiesene Systemkompetenz in der Rohrleitungstechnik.
          </p>
          <Button variant="primary" size="lg" className="text-lg tracking-widest uppercase font-bold px-12 py-6">
            Audit Anfragen
          </Button>
        </div>
      </section>
    </>
  );
}
