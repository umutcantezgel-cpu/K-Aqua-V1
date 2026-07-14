/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { Button } from "@/components/ui/Button";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { setRequestLocale } from 'next-intl/server';
import {
  Globe,
  Droplets,
  Building2,
  Factory,
  ShieldCheck,
  CheckCircle2,
  HardHat,
  Ship,
  MapPin,
  Waves
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("references") as string[];
  return constructMetadata({
    title: meta[0] ?? "Globale Referenzprojekte | K-Aqua",
    description: meta[1] ?? "Weltweite Projekte mit K-Aqua PP-R Kunststoff-Rohrsystemen.",
    path: "/referenzen",
    locale,
  });
}

export default async function ReferenzenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "references");

  const stickyScrollContent = [
    {
      title: "Luxushotel & Resort in Dubai",
      description: "Installation einer kompletten Trinkwasserversorgung für ein 5-Sterne-Resort. Die Anforderungen an Wasserhygiene und Korrosionsbeständigkeit bei dauerhaft hohen Temperaturen waren extrem. Zum Einsatz kamen über 15.000 Meter K-Aqua PP-R Multilayer-Rohre in den Dimensionen d20 bis d110. Das Ergebnis: Eine absolut wartungsfreie Installation ohne Inkrustationsrisiko.",
      content: <PremiumAssetPlaceholder label="Luxus-Resort Dubai" />
    },
    {
      title: "Industrie-Kühlanlage in Südostasien",
      description: "Für eine großflächige Produktionsanlage wurden Rohrleitungen mit hoher thermischer Stabilität benötigt. Durch K-Aqua PP-RCT Faserkunststoffrohre konnte die Längsausdehnung drastisch minimiert werden. Die thermische Verschweißung der Dimensionen d160 bis d315 garantiert eine 100%ige Dichtigkeit auch bei massiven Druckschwankungen der Industriepumpen.",
      content: <PremiumAssetPlaceholder label="Industrie-Kühlanlage" />
    },
    {
      title: "Krankenhausneubau in Mitteleuropa",
      description: "Höchste Ansprüche an die Trinkwasserhygiene nach DVGW-Vorgaben. Vermeidung von Stagnationszonen durch strömungsoptimierte K-Aqua Fittings und bleifreie Übergangsverschraubungen. Die Installation umfasste Kalt- und Warmwasserverteilung über 8 Stockwerke, wodurch K-Aqua seine Überlegenheit gegenüber klassischen Metallsystemen bewies.",
      content: <PremiumAssetPlaceholder label="Krankenhaus Infrastruktur" />
    },
    {
      title: "Wohnkomplex in der DACH-Region",
      description: "Ein nachhaltiges Bauprojekt, das den CO2-Fußabdruck minimieren sollte. K-Aqua lieferte das komplette Verteilersystem (d20–d63). Neben der schnellen und sicheren Polyfusion-Installation profitierten die Bauherren von der überragenden Schalldämmung der PP-R Rohre, wodurch Fließgeräusche in den Wohnungen nahezu eliminiert wurden.",
      content: <PremiumAssetPlaceholder label="Wohnkomplex Bauphase" />
    }
  ];

  const timelineItems = [
    {
      year: "1. Beratung & Auslegung",
      title: "Die Projektierung",
      text: "Zusammen mit Fachplanern definieren wir die optimalen Dimensionen und Druckstufen (SDR). Eine korrekte Rohrnetzberechnung stellt sicher, dass Fließgeschwindigkeiten und Druckverluste ideal auf das Gebäude abgestimmt sind."
    },
    {
      year: "2. Produktion in Waldsolms",
      title: "Gefertigt in Deutschland",
      text: "Nach Auftragsfreigabe erfolgt die Extrusion der PP-R/PP-RCT Rohre sowie der Spritzguss der Formteile unter strengsten Qualitätskontrollen (ISO 9001, 14001, 50001). Das Labor überwacht jede Materialcharge."
    },
    {
      year: "3. Logistik & Lieferung",
      title: "Pünktlich auf der Baustelle",
      text: "Unsere Logistik koordiniert globale Lieferketten. Die leichten Kunststoffrohre ermöglichen einen effizienteren und CO2-reduzierten Transport im Vergleich zu massiven Stahl- oder Kupferleitungen."
    },
    {
      year: "4. Installation vor Ort",
      title: "Homogene Verschweißung",
      text: "Installateure auf der Baustelle verbinden Rohre und Fittings durch thermische Polyfusion. Innerhalb von Sekunden entsteht eine untrennbare, lückenlose Materialeinheit – ohne Dichtungen oder O-Ringe."
    },
    {
      year: "5. Inbetriebnahme",
      title: "Über 50 Jahre wartungsfrei",
      text: "Nach der Druckprüfung geht das System ans Netz. Ab diesem Moment liefert das K-Aqua System dauerhaft sauberes Trinkwasser. Keine Korrosion, keine Lochfraß-Gefahr, keine teuren Wartungsintervalle."
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <JsonLd schema={jsonLd} />

      {/* Hero Section */}
      <ParallaxHero 
        eyebrow="Weltweite Referenzen"
        title={
          <span className="block text-balance">
            Bewährt in <span className="text-primary">Megaprojekten.</span>
          </span>
        }
        description="Von Trinkwassersystemen in Luxushotels bis hin zu industriellen Kühlanlagen: K-Aqua PP-R Rohrsysteme sind weltweit im Einsatz. Entdecken Sie Projekte, die auf höchste Qualität „Made in Germany“ vertrauen."
      >
        <div className="flex gap-4">
          <ButtonPrimary href="/produkte" className="px-8 py-4 !rounded-full text-base font-bold tracking-wider">
            Unsere Systeme
          </ButtonPrimary>
          <Button variant="ghost" href="/kontakt" className="px-8 py-4 !rounded-full border-card-border bg-card hover:bg-muted text-base font-bold tracking-wider">
            Projekt anfragen
          </Button>
        </div>
      </ParallaxHero>

      {/* Manifest Section */}
      <section className="py-32 bg-background border-b border-card-border relative z-10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <Globe className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight">Qualität kennt keine Grenzen</h2>
          </div>
          
          <div className="space-y-8 text-lg text-muted-foreground leading-relaxed font-sans">
            <p>
              In einer Branche, in der Zuverlässigkeit und Langlebigkeit die wichtigsten Währungen sind, hat sich K-Aqua als feste Größe etabliert. Unsere Rohrleitungssysteme aus Polypropylen (PP-R und PP-RCT) werden nicht nur in der DACH-Region geschätzt, sondern sind das Rückgrat der Wasserversorgung in über 40 Ländern weltweit.
            </p>
            <p>
              Ob in klimatisch extremen Regionen des Nahen Ostens, wo anhaltende Hitze das Material fordert, oder in europäischen Krankenhäusern, wo Hygienevorschriften keinen Raum für Fehler lassen: Die Materialvorteile von Polypropylen – absolute Korrosionsfreiheit, glatte Innenwände gegen Inkrustation und hohe thermische Stabilität – spielen überall ihre Stärken aus.
            </p>
            <p>
              Qualitätssicherheit ist bei uns kein leeres Versprechen. Wir fertigen am Standort Waldsolms unter einem strengen, nach ISO 9001 zertifizierten Managementsystem. Jede Charge wird in unserem eigenen Labor geprüft, bevor sie die Reise auf internationale Baustellen antritt. Das ist der Grund, warum Planer und Generalunternehmer weltweit K-Aqua für ihre kritischen Infrastrukturen spezifizieren.
            </p>
          </div>
        </div>
      </section>

      {/* Fallstudien via Sticky Scroll */}
      <section className="py-32 relative z-20 bg-background border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 border border-primary/20">
            <Building2 className="w-4 h-4" /> Ausgewählte Projekte
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground mb-6">
            Fallstudien & <br className="hidden md:block" />Anwendungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Ein Blick auf unsere erfolgreich abgeschlossenen Installationen aus den Bereichen Wohnungsbau, Hotellerie und Industrie.
          </p>
        </div>
        <StickyScrollReveal content={stickyScrollContent} />
      </section>

      {/* Bento Grid Features */}
      <section className="py-32 bg-card/40 border-b border-card-border relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">
              Vorteile im Projekt
            </h2>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
              Warum sich Projektentwickler und Planer für unsere Systeme entscheiden.
            </p>
          </div>

          <BentoGrid>
            <BentoGridItem 
              title="Korrosionsfreiheit"
              description="Polypropylen rostet nicht. Die Rohre widerstehen aggressiven Wässern und chemischen Einflüssen dauerhaft."
              icon={<ShieldCheck className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Material Querschnitt" />}
            />
            <BentoGridItem 
              title="Strömungsoptimiert"
              description="Dank minimaler Innenrauheit treten keine Kalkablagerungen auf. Der Leitungsdruck bleibt über Jahrzehnte stabil."
              icon={<Waves className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <Droplets className="w-32 h-32 text-primary/30 group-hover:text-primary/60 transition-colors duration-500 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Einfache Installation"
              description="Die thermische Schweißtechnik ist schneller und sicherer als Schraub- oder Presssysteme bei Metallrohren."
              icon={<HardHat className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <CheckCircle2 className="w-32 h-32 text-primary/30 group-hover:text-primary transition-colors duration-500 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Große Nennweiten"
              description="Mit Dimensionen von 20 mm bis 630 mm (Fittings bis 315 mm) decken wir selbst gigantische Hauptleitungsnetze ab."
              icon={<Factory className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Industrielle Dimensionen" />}
            />
            <BentoGridItem 
              title="Sichere Verschweißung"
              description="Beim Verschweißen entsteht eine stoffschlüssige Verbindung, die so fest ist wie das Rohr selbst. Es gibt keine Schwachstellen durch alternde Dichtungsringe."
              icon={<MapPin className="w-10 h-10 text-primary" />}
              colSpan={3}
              rowSpan={2}
              header={<PremiumAssetPlaceholder label="Schweißprozess auf der Baustelle" className="min-h-[500px]" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <HorizontalTimeline 
        title="Der Projekt-Ablauf" 
        description="Von der Planung bis zur Inbetriebnahme: Wir begleiten Ihr Bauvorhaben mit Expertise und zuverlässiger Lieferkette."
        items={timelineItems} 
      />

      {/* Final Call to Action */}
      <section className="py-40 bg-background relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center max-w-5xl px-6">
          <Ship className="w-20 h-20 text-primary mx-auto mb-8 opacity-90" />
          <h2 className="text-5xl md:text-6xl font-heading font-black tracking-tight mb-8">
            Planen Sie Ihr <span className="text-primary">nächstes Projekt?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Kontaktieren Sie unser Vertriebsteam in Waldsolms. Wir beraten Sie zu den passenden Dimensionen, Druckstufen und logistischen Lösungen für Ihre Baustelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ButtonPrimary href="/projektanfrage" className="px-10 py-5 !rounded-full text-lg tracking-wide shadow-lg">
              Projekt anfragen
            </ButtonPrimary>
            <Button variant="ghost" href="/produkte/finder" className="px-10 py-5 !rounded-full text-lg tracking-wide border-2 border-primary text-primary hover:bg-primary/10">
              Zum Produktfinder
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}
