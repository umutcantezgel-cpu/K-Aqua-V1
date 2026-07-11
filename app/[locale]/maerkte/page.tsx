/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import MarketsHub from "@/components/sections/MarketsHub";
import { GEO_MARKETS } from "@/lib/data/geo";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { Shield, Droplet, Activity, FlaskConical, Thermometer, Waves } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("markets") as string[];
  return constructMetadata({
    title: meta[0] ?? "Zielmärkte & Industrielle Anwendungen | K-Aqua",
    description: meta[1] ?? "Industrielle Rohrsysteme für globale Infrastrukturprojekte. Kompromisslose deutsche Ingenieurskunst.",
    path: "/maerkte",
    locale,
  });
}

export default async function MaerktePage({ params }: Props) {
  const { locale } = await params;
  
  // Fetch translation objects
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });

  const totalMarkets = GEO_MARKETS.length;
  const totalCountries = new Set(GEO_MARKETS.map((g) => g.country)).size;

  // Extract translation dictionaries
  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    title1: tGeo("title1"),
    title2: tGeo("title2"),
    lead: tGeo("lead", { n: totalMarkets, c: totalCountries }),
    all: tGeo("all"),
    fromPlant: tGeo("fromPlant"),
    canvasAria: tRoot("home.globeAria"),
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get raw geoContent translations for all markets
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${geoTrans.title1} ${geoTrans.title2}`,
    "description": geoTrans.lead,
    "url": `${siteUrl}/${locale}/maerkte`,
  };

  const stickyContent = [
    {
      title: "Kommunale Trinkwasserversorgung",
      description: "Das Rückgrat urbaner Infrastruktur. K-Aqua Systemlösungen garantieren eine absolute, lebenslange Dichtheit und höchste Trinkwasserhygiene (DVGW/KTW zertifiziert). Keine Inkrustation, keine Korrosion – selbst bei extremen Druckverhältnissen bis zu 16 bar. Eine investitionssichere Lösung für Stadtwerke, die den Generationenvertrag der Wasserversorgung kompromisslos durchsetzen.",
      content: <PremiumAssetPlaceholder label="Municipal Pipeline Scan 3D" />
    },
    {
      title: "Industrielle Prozesskühlung",
      description: "Wenn thermische Belastbarkeit über Systemausfälle entscheidet. Unsere PP-R Faserverbundrohre widerstehen extremen Temperaturschwankungen und minimieren lineare Ausdehnung. Die chemische Inertheit prädestiniert sie für hochaggressive Kühlmedien in Rechenzentren, der Schwerindustrie und chemischen Anlagen, wo eine 100%ige Anlagenverfügbarkeit zwingend erforderlich ist.",
      content: <PremiumAssetPlaceholder label="Thermal Gradient Analysis" />
    },
    {
      title: "Marine & Offshore-Sektor",
      description: "Isolierende Salzwasserresistenz unter den gnadenlosesten Bedingungen der Welt. DNV-GL zugelassen, hochgradig vibrationsdämpfend und mit einem massiv reduzierten Gewicht im direkten Vergleich zu konventionellen Stahlsystemen. K-Aqua Rohre eliminieren die ständige Gefahr von galvanischer Korrosion und trotzen den massiven mechanischen Beanspruchungen im maritimen Schwersteinsatz.",
      content: <PremiumAssetPlaceholder label="Offshore Platform Topology" />
    },
    {
      title: "Agrikultur & Mega-Bewässerung",
      description: "Maximale hydraulische Skalierbarkeit für die aridesten Zonen der Erde. Großkalibrige Verteilersysteme (bis zu 1000 mm Durchmesser) mit extremer UV-Resistenz, die monumentale Wassermengen verlustfrei und druckkonstant über gewaltige Distanzen transportieren. Die makellose Strömungsmechanik der Innenwände senkt dabei den Energiebedarf für Pumpstationen signifikant.",
      content: <PremiumAssetPlaceholder label="Hydraulic Flow Simulation" />
    }
  ];

  const timelineItems = [
    { year: "DACH", title: "Das Ingenieurs-Herz", text: "Höchste Dichte an DVGW und SKZ zertifizierten Großprojekten in Mitteleuropa. Deutsche Präzision als Maßstab für den globalen Rollout." },
    { year: "NAHOST", title: "GCC Staaten", text: "Kompromisslose Bewährung unter extremen klimatischen Bedingungen. K-Aqua kühlt Mega-Cities und industriell genutzte Wüstenregionen." },
    { year: "ASIEN", title: "APAC Region", text: "Skalierbare Infrastrukturlösungen für rapide wachsende asiatische Metropolen und hypermoderne industrielle Produktionsstätten." },
    { year: "AMERIKA", title: "Nord- & Südamerika", text: "Flächendeckender Einsatz in der ressourcenintensiven Schwerindustrie und bei groß angelegten landwirtschaftlichen Bewässerungsprojekten." },
    { year: "AFRIKA", title: "Wasser-Infrastruktur", text: "Robuste, langlebige und korrosionsfreie Systeme für lebenswichtige Wasseraufbereitungs- und Verteilungsanlagen auf dem gesamten Kontinent." }
  ];

  return (
    <>
      <JsonLd schema={webPageSchema} />
      
      <ParallaxHero
        eyebrow="GLOBALE INFRASTRUKTUR"
        title={
          <span className="block">
            Zielmärkte &amp; <br />
            <span className="text-primary">Industrielle Anwendungen</span>
          </span>
        }
        description="Präzisions-Rohrsysteme für die kritischsten Infrastrukturen der Welt. Von der kommunalen Trinkwasserversorgung bis hin zu hochkomplexen industriellen Hochdruckanlagen – K-Aqua liefert kompromisslose deutsche Ingenieurskunst für jede Dimension."
      />

      <section className="py-32 bg-background relative z-10 border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center">
          <span className="text-primary font-heading tracking-widest uppercase font-bold text-sm mb-4 block">Eiskalte Autorität</span>
          <h2 className="text-5xl font-heading font-black mb-6">Technologische Überlegenheit im Feld</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Wir produzieren keine rudimentären Plastikrohre. Wir schmieden makromolekulare Infrastruktur. Jedes K-Aqua Produkt durchläuft barbarische physikalische Stresstests, bevor es den Stempel der strengsten deutschen Zulassungsbehörden erhält.
          </p>
        </div>

        <BentoGrid className="px-6">
          <BentoGridItem
            colSpan={2}
            title="Thermische Souveränität"
            description="Einsatzbereich von -20°C bis +95°C unter massiver Volllast. Unsere modifizierte PP-R Struktur verhindert Mikrorisse und garantiert eine Lebensdauer, die konventionelle Materialien deklassiert."
            icon={<Thermometer className="w-8 h-8 text-primary mb-4" />}
            header={<PremiumAssetPlaceholder label="Thermal Heatmap" className="min-h-[200px]" />}
          />
          <BentoGridItem
            title="Perfekte Strömungsmechanik"
            description="Spektralglatte Innenoberflächen (Rauigkeit 0,007 mm) minimieren den Reibungsverlust radikal. Das Resultat: Keine Inkrustation, drastisch geringerer Pumpenenergiebedarf."
            icon={<Waves className="w-8 h-8 text-primary mb-4" />}
            header={<div className="w-full h-full bg-card flex items-center justify-center border-b border-card-border"><Droplet className="w-24 h-24 text-muted-foreground/10" /></div>}
          />
          <BentoGridItem
            title="Homogene Verschweißung"
            description="Die molekulare Verbindung durch Heizelementmuffenschweißung macht das System monolithisch. Absolute Leckagesicherheit auf Lebenszeit. Verschraubungen gehören in die Vergangenheit."
            icon={<Activity className="w-8 h-8 text-primary mb-4" />}
            header={<div className="w-full h-full bg-card flex items-center justify-center border-b border-card-border"><Shield className="w-24 h-24 text-muted-foreground/10" /></div>}
          />
          <BentoGridItem
            colSpan={2}
            title="Aggressive Chemische Resistenz"
            description="Beständig gegen hochaggressive Medien, durchgehend im extremen pH-Bereich 1 bis 14. Prädestiniert für die petrochemische Industrie, Galvanik-Betriebe und Reinstwasser-Applikationen."
            icon={<FlaskConical className="w-8 h-8 text-primary mb-4" />}
            header={<PremiumAssetPlaceholder label="Molecular Scan" className="min-h-[200px]" />}
          />
        </BentoGrid>
      </section>

      <section className="py-32 bg-card relative z-10 border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center">
          <span className="text-primary font-heading tracking-widest uppercase font-bold text-sm mb-4 block">Vertikale Integration</span>
          <h2 className="text-5xl font-heading font-black mb-6">Die Kernmärkte der K-Aqua</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Die physikalischen Anforderungen variieren, der elitäre Anspruch an absolute Perfektion bleibt identisch. Wir segmentieren unsere Lösungen exakt auf die Härten der jeweiligen Industrie.
          </p>
        </div>
        
        <div className="px-6 max-w-[1400px] mx-auto">
          <StickyScrollReveal content={stickyContent} />
        </div>
      </section>

      <HorizontalTimeline 
        title="Der Globale Fußabdruck"
        description="Von den erbarmungslos tiefsten Wintern Skandinaviens bis in die sengende, gnadenlose Hitze der Wüsten auf der arabischen Halbinsel: K-Aqua ist die architektonische Schlagader, auf die Regierungen und Generalunternehmer weltweit vertrauen."
        items={timelineItems}
        className="border-b border-card-border"
      />

      {/* Global Interactive Map Section (Existing) */}
      <section className="relative z-10 bg-background pt-32 pb-0">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <span className="text-primary font-heading tracking-widest uppercase font-bold text-sm mb-4 block">Interaktive Topologie</span>
          <h2 className="text-5xl font-heading font-black mb-6">Projektübersicht & Lokationen</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Navigieren Sie durch das globale Netzwerk von K-Aqua. Eine interaktive Visualisierung unserer zertifizierten Anlagen, Industriekomplexe und kommunalen Versorgungssysteme.
          </p>
        </div>
        <div className="mt-20">
          <MarketsHub
            locale={locale}
            geoTrans={geoTrans}
            regionsTrans={regionsTrans}
            geoContentTrans={geoContentTrans}
          />
        </div>
      </section>
    </>
  );
}
