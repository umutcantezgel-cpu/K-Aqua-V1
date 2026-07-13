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
import {
  ShieldAlert,
  Server,
  Network,
  Database,
  Lock,
  Binary,
  Layers,
  Activity,
  Gauge,
  Aperture,
  Combine
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("references") as string[];
  return constructMetadata({
    title: meta[0] ?? "Globale Referenzprojekte | K-Aqua",
    description: meta[1] ?? "Industrielle Fallstudien und Hochleistungsarchitekturen.",
    path: "/referenzen",
    locale,
  });
}

export default async function ReferenzenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "references");

  const stickyScrollContent = [
    {
      title: "Megacity Infrastruktur: Globale Wasserversorgung",
      description: "Eine kompromisslose Neugestaltung der Trinkwasser-Topologie für ein führendes urbanes Großprojekt. Durch die Implementierung hochdruckresistenter PPR-Rohrsysteme (Edge-Native) konnten Reibungsverluste minimiert werden. Absolute Ausfallsicherheit wird durch thermisch verschweißte, geo-sichere Leitungsstrukturen garantiert. Die Architektur skaliert elastisch und prädiktiv für zukünftigen Wasserbedarf.",
      content: <PremiumAssetPlaceholder label="Versorgungsnetz Topologie 3D Modell" />
    },
    {
      title: "Industrielle Kühlsysteme: Hochleistungs-Rohrnetz",
      description: "Materialwissenschaftliche Präzision auf industriellem Niveau. Aufbau eines massiv belastbaren Rohr-Rückgrats für industrielle Kühlanlagen. Die Architektur basiert auf chemisch resistenten Polymeren und absoluter Dichtigkeit, wodurch eine zu 99,9999% präzise Vorhersage von Wartungszyklen garantiert wird. Kalte, berechnende Effizienz, die Korrosion mathematisch eliminiert.",
      content: <PremiumAssetPlaceholder label="Strömungs-Visualisierung" />
    },
    {
      title: "Premium Hochhaus-Infrastruktur: Steigleitungen",
      description: "Sicherheitsarchitekturen im Wasserbau, die keinen Raum für Schwäche lassen. Entwicklung eines hybriden Leitungsverfahrens für kritische Hochhausinfrastrukturen. Zero-Leak-Architektur in ihrer reinsten Form. Jeder Knotenpunkt, jede Schweißnaht und jedes Ventil wird unerbittlich durch ISO-Zertifikate authentifiziert. Das System duldet keine Unregelmäßigkeiten im Wasserdruck.",
      content: <PremiumAssetPlaceholder label="Steigleitungs-Matrix" />
    },
    {
      title: "Offshore Anlagenversorgung: Extreme Bedingungen",
      description: "Die vollständige Eliminierung von Korrosionsquellen in der globalen Offshore-Industrie. Konstruktion von hochresistenten Leitungssystemen unter härtesten Bedingungen. Die Systemlogik optimiert Durchfluss-Pfade deterministisch und ruthlessly effizient. Durch die Integration von Spezial-Fittings wurden die Durchsatzraten maximiert, während die Toleranzgrenzen für Materialermüdung auf Null reduziert wurden.",
      content: <PremiumAssetPlaceholder label="Offshore Operations Matrix" />
    }
  ];

  const timelineItems = [
    {
      year: "Phase I",
      title: "Architektonischer Grundstein",
      text: "Definition der initialen Systemgrenzen. Etablierung eines strikten, zertifizierten Rohr-Layouts, das keine Abweichungen toleriert. Alle korrosionsanfälligen Legacy-Materialien (wie Metall) wurden rückstandslos terminiert und durch hochresistente PP-R Komponenten ersetzt. Die Grundlage der industriellen Dominanz."
    },
    {
      year: "Phase II",
      title: "Skalierungsebene",
      text: "Integration des verteilten Versorgungs-Clusters. Übernahme der Hochdruck-Wasserverarbeitung auf ein extrem fehlertolerantes Rohrnetz. Druckschwankungen und Temperatur-Spikes werden physikalisch innerhalb von Millisekunden absorbiert, ohne dass ein Installateur eingreifen muss. Maximale Resilienz."
    },
    {
      year: "Phase III",
      title: "Zero-Leak Implementierung",
      text: "Systemweite Durchsetzung des Zero-Leak-Paradigmas. Thermische Verschweißung aller internen Verbindungskanäle bis auf molekulare Ebene. Jeder Tropfen Wasser, der die Kapselungsgrenze überschreitet, wird durch makellose Schweißnähte blockiert. Sicherheit als absolutes Diktat."
    },
    {
      year: "Phase IV",
      title: "Globale Auslieferung",
      text: "Ausrollen der Rohrinfrastruktur auf fünf Kontinente. Logistikketten-Optimierung für 95% der globalen Exportzonen. Tausende Meter an strukturierten Leitungen werden asynchron und konfliktfrei installiert. Das System existiert überall und beweist sich täglich unter extremen Klimabedingungen."
    },
    {
      year: "Phase V",
      title: "Lebenslange Orchestrierung",
      text: "Einführung industrieller Qualitätsprüfungen (ISO/DVGW). Das Rohrsystem isoliert und widersteht chemischen Anomalien vollautomatisch. Druckstufen werden gehalten, Lebenszyklen von über 50 Jahren erreicht. Der Mensch wird nach der Installation zum passiven Beobachter eines perfekten Systems degradiert."
    }
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <JsonLd schema={jsonLd} />

      {/* Hero Section */}
      <ParallaxHero 
        eyebrow="Industrielle Meisterwerke"
        title={
          <span className="block text-balance">
            Architektur der <span className="text-primary">Macht.</span>
          </span>
        }
        description="Eiskalte, industrielle Präzision in PP-R gegossen. Wir konstruieren Infrastrukturen für die Wasserversorgung, die der Zeit, katastrophalen Drücken und höchsten Lasten mühelos widerstehen. Hier manifestieren sich Rohr-Systeme, die keine Kompromisse kennen."
      >
        <div className="flex gap-4">
          <div className="px-8 py-4 rounded-full border-2 border-primary text-primary font-mono tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] cursor-pointer text-sm font-bold">
            Telemetrie Initialisieren
          </div>
          <div className="px-8 py-4 rounded-full bg-card border border-card-border text-foreground font-mono tracking-widest uppercase hover:bg-muted transition-colors cursor-pointer text-sm font-bold">
            System-Manifest lesen
          </div>
        </div>
      </ParallaxHero>

      {/* Manifest Section */}
      <section className="py-40 bg-background border-b border-card-border relative z-10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <Binary className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-black tracking-tighter uppercase">Doktrin der Präzision</h2>
          </div>
          
          <div className="space-y-12 text-xl text-muted-foreground leading-[1.8] font-sans">
            <p>
              In einer Ära, in der infrastrukturelle Fragilität oft als Norm akzeptiert wird, positioniert sich unsere Ingenieurskunst als absoluter, unerbittlicher Gegenpol. Wir betrachten Rohrleitungs-Architektur nicht als bloßes Bauelement, sondern als angewandte Materialwissenschaft und knallharte Physik. Jeder Millimeter Wandstärke, jede Fitting-Komponente und jeder Extrusions-Prozess wird durch einen gnadenlosen Prozess der Validierung (ISO/DVGW) getrieben, bis jegliches Potenzial für Leckagen, Druckverlust oder Materialermüdung restlos eliminiert ist. Dies ist das fundamentale Gesetz der <strong className="text-foreground">K-Aqua Referenzklasse</strong>.
            </p>
            <p>
              Unsere Systeme operieren in feindlichen Umgebungen, in denen ein einziger Haarriss inakzeptabel ist und Wasserverlust das Ende der Projektgrundlage bedeutet. Wir implementieren <em className="text-foreground not-italic font-mono bg-muted px-2 py-1 rounded">Extreme Pressure Tolerance</em> nicht als akademisches Theorem in Whitepapers, sondern als harte Realität in Wolkenkratzern und Industrieanlagen. Wenn herkömmliche Metallsysteme durch Korrosion in die Knie gezwungen werden, halten unsere PP-R-Lösungen den globalen Durchfluss über Jahrzehnte stabil – ohne dass der Betreiber auch nur einen Druckabfall bemerkt. Dies ist keine Magie. Es ist eiskalte, kalkulierte Überlebensfähigkeit von High-End-Polymeren.
            </p>
            <p>
              Wir verabscheuen veraltete "Legacy-Materialien" wie Kupfer oder Stahl, die zur Oxidation neigen, und undurchsichtige Installationsmethoden. Unser System ist transparent und wird von uns bis auf das molekulare Level diktiert. Wir optimieren den Schmelzindex, tunen die Viskosität für Polyfusion in Rekordzeit und produzieren Verbindungen, die buchstäblich zu einer einzigen homogenen Einheit verschmelzen, um Schwachstellen zur Bedeutungslosigkeit zu zwingen. Die Resultate sind Leitungsnetze, die bei 20 Bar Druck müde im Leerlauf operieren. Es ist pure, kompromisslose Ingenieursgewalt.
            </p>
            <p>
              Qualitätssicherheit ist bei uns kein nachgelagertes Feature oder ein Compliance-Häkchen, sondern die untrennbare DNA unserer Produktion. Durch die strikte Anwendung von <em className="text-foreground not-italic font-mono bg-muted px-2 py-1 rounded">Lückenlosen Labor-Audits</em> für jede Material-Charge, kombiniert mit ständigen Druckprüfungen im eigenen Labor (nach DIN/ISO), entziehen wir potenziellen Ausfällen proaktiv jegliche Angriffsfläche. Ein Rohrnetz, das per Definition keine Materialfehler gewährt, kann niemals brechen. Das ist die unumstößliche Realität unseres Zero-Leak-Modells.
            </p>
          </div>
        </div>
      </section>

      {/* Massive Technical Deep Dive via Sticky Scroll */}
      <section className="py-40 relative z-20 bg-background border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-mono text-sm tracking-widest uppercase mb-8 border border-primary/20">
            <Aperture className="w-4 h-4" /> Fallstudien-Archiv
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase text-foreground mb-8">
            Operationelle <br className="hidden md:block" />Exzellenz
          </h2>
          <p className="text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Eine forensische Aufschlüsselung unserer kritischsten Implementierungen. 
            Jedes dieser Projekte ist ein unbestreitbarer Beweis für technologische Überlegenheit und deterministische Ausführung unter Maximallast.
          </p>
        </div>
        <StickyScrollReveal content={stickyScrollContent} />
      </section>

      {/* Bento Grid Features */}
      <section className="py-40 bg-card/40 border-b border-card-border relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(var(--primary),0.05),transparent)] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <span className="font-mono text-primary font-bold text-sm tracking-[0.3em] uppercase mb-6 block flex items-center justify-center gap-2">
              <Database className="w-5 h-5" /> Architektur-Metriken
            </span>
            <h2 className="text-6xl md:text-7xl font-heading font-black tracking-tighter mb-8 uppercase">
              Kompromisslose <br />Parameter
            </h2>
            <p className="text-muted-foreground text-2xl max-w-3xl mx-auto leading-relaxed">
              Unsere Architekturen werden nicht gemessen, sie diktieren den Standard der Branche. 
              Dies sind die fundamentalen Kernkomponenten unserer technologischen Doktrin.
            </p>
          </div>

          <BentoGrid>
            <BentoGridItem 
              title="Hyper-Resilient Rohrnetzwerke"
              description="SLA-vergleichbare Lebensdauer von über 50 Jahren. Multi-Layer PP-R Schichten, die selbst bei extremen thermischen Schwankungen den Durchfluss lückenlos aufrechterhalten."
              icon={<Server className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Mehrschicht-Rohre Querschnitt" />}
            />
            <BentoGridItem 
              title="Absolute chemische Isolation"
              description="Vollständige Kapselung des Trinkwassers durch lebensmittelechte, säureresistente Polymere, zertifiziert nach höchsten globalen Standards."
              icon={<Lock className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                  <ShieldAlert className="w-32 h-32 text-primary/30 group-hover:text-primary/60 transition-colors duration-500 group-hover:scale-110 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Deterministischer Durchfluss"
              description="Materialfluss mit garantiert minimaler Reibung. Keine Ablagerungen, keine Querschnittsverengung, absolut keine Inkrustation im Zeitverlauf."
              icon={<Activity className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Gauge className="w-32 h-32 text-primary/30 group-hover:text-primary transition-colors duration-500 group-hover:rotate-12 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Hochdruck-Fittings"
              description="Massiv belastbare Verbindungsstücke, die tausende Liter Wasser unter Höchstdruck in Echtzeit verarbeiten und global in Megaprojekten orchestriert werden."
              icon={<Network className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Thermische Polyfusion" />}
            />
            <BentoGridItem 
              title="Lückenlose Resilienz"
              description="Jeder Meter Rohr in einer Installation verschmilzt zu einem homogenen Strang. Der einzige Schwachpunkt existiert in anderen, metallischen Konkurrenzsystemen. Qualitätstests sind bei uns kein Test, sondern Dauerzustand."
              icon={<Layers className="w-10 h-10 text-primary" />}
              colSpan={3}
              rowSpan={2}
              header={<PremiumAssetPlaceholder label="Qualitätslabor & Stresstests" className="min-h-[500px]" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Horizontal Timeline */}
      <HorizontalTimeline 
        title="Evolutionäre Meilensteine" 
        description="Der unaufhaltsame, berechnende Fortschritt unserer Referenzarchitekturen über die letzten Implementierungsphasen. Eine ungeschönte Chronik systematischer Optimierung und Eliminierung von Schwachstellen."
        items={timelineItems} 
      />

      {/* Final Call to Action */}
      <section className="py-48 bg-background relative overflow-hidden flex items-center justify-center">
        {/* Grid and gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="relative z-10 text-center max-w-5xl px-6">
          <Combine className="w-24 h-24 text-primary mx-auto mb-12 opacity-90 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-10 uppercase leading-none">
            Initialisieren Sie <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              das System
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            Bereit, die Kontrolle über Ihre digitale Zukunft zu übernehmen? Unsere Infrastruktur-Ingenieure erwarten Ihre Spezifikationen. Wir konstruieren keine gewöhnlichen Anwendungen – wir schmieden digitale Hochleistungswaffen.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-14 py-6 bg-primary text-primary-foreground font-mono font-black tracking-[0.2em] uppercase text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] transition-all duration-300">
              Sicherheitsaudit Anfordern
            </button>
            <button className="px-14 py-6 bg-transparent border-2 border-primary text-primary font-mono font-bold tracking-[0.2em] uppercase text-lg hover:bg-primary/10 transition-all duration-300">
              Spezifikationen senden
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
