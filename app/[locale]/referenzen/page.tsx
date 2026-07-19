/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { MediaSlot } from "@/components/ui/MediaSlot";
import HoverPreviewList from '@/components/signature/HoverPreviewList';
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
  setRequestLocale(locale);
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
      title: "Projekt Alpha-Centauri: Globale Netzwerkinfrastruktur",
      description: "Eine kompromisslose Neugestaltung der Backend-Topologie für einen führenden europäischen Industriekonzern. Durch die Implementierung monolithischer Microservices (Edge-Native) konnten Latenzen im Nanosekundenbereich realisiert werden. Absolute Ausfallsicherheit wird durch redundante, geo-replizierte Clusterstrukturen in zwölf Rechenzentren weltweit garantiert. Die Architektur skaliert elastisch und prädiktiv basierend auf neuronalen Lastmodellen, ohne menschliche Interaktion.",
      content: <MediaSlot alt="K-Aqua Video - Projekt Alpha-Centauri Globale Netzwerkinfrastruktur" aspectRatio="16/9" src="/images/new-k-aqua/K-Aqua Video.mp4" />
    },
    {
      title: "Operation Deep-Blue: Prädiktive Wartungssysteme",
      description: "Sensordatenfusion auf industriellem Niveau. Verarbeitung von 40 Terabyte Telemetriedaten pro Sekunde durch ein massiv paralleles Kafka-Rückgrat. Die Architektur basiert auf Event-Sourcing und Eventual Consistency, wodurch eine zu 99,9999% präzise Vorhersage von Maschinenausfällen in Fertigungsanlagen garantiert wird. Kalte, berechnende Effizienz, die Wartungszyklen revolutioniert und Stillstandzeiten mathematisch eliminiert.",
      content: <PremiumAssetPlaceholder label="Echtzeit-Datenstrom Visualisierung" />
    },
    {
      title: "Nexus Protokoll: Quantenresistente Kryptographie",
      description: "Sicherheitsarchitekturen, die keinen Raum für Schwäche lassen. Entwicklung eines hybriden Verschlüsselungsverfahrens für kritische Finanzinfrastrukturen (KRITIS). Zero-Trust-Architektur in ihrer reinsten, autoritärsten Form. Jeder Knotenpunkt, jede API-Anfrage und jeder Microservice wird unerbittlich über kurzlebige, hardware-signierte Zertifikate (mTLS) authentifiziert. Das System duldet keine Unregelmäßigkeiten.",
      content: <PremiumAssetPlaceholder label="Kryptographischer Graph" />
    },
    {
      title: "Projekt Hyperion: Autonome Supply-Chain",
      description: "Die vollständige Eliminierung menschlicher Fehlerquellen in der globalen Logistikkette. Algorithmische Steuerung von über 10.000 autonomen Einheiten und Drohnen in Echtzeit. Die Logikmaschine optimiert Routing-Pfade deterministisch und ruthlessly effizient. Durch die Integration von Satelliten-Metadaten und Edge-Computing-Knoten in den Fahrzeugen wurden die Durchsatzraten um 400% gesteigert, während die Toleranzgrenzen auf Null reduziert wurden.",
      content: <PremiumAssetPlaceholder label="Supply Chain Operations Matrix" />
    }
  ];

  const timelineItems = [
    {
      year: "Phase I",
      title: "Architektonischer Grundstein",
      text: "Definition der initialen Systemgrenzen. Etablierung eines strikten, typisierten Datenmodells, das keine Abweichungen toleriert. Alle Legacy-Systeme wurden rückstandslos terminiert und durch kompilierte Hochleistungskomponenten ersetzt. Die Grundlage der industriellen Dominanz."
    },
    {
      year: "Phase II",
      title: "Skalierungsebene",
      text: "Integration des verteilten Compute-Clusters. Übernahme der Datenverarbeitung auf ein byzantinisch-fehlertolerantes System. Netzwerktrennungen und Split-Brain-Szenarien werden algorithmisch innerhalb von Millisekunden aufgelöst, ohne dass ein Administrator eingreifen muss. Maximale Resilienz."
    },
    {
      year: "Phase III",
      title: "Zero-Trust Implementierung",
      text: "Systemweite Durchsetzung des Zero-Trust-Paradigmas. Kryptographische Absicherung aller internen Kommunikationskanäle bis auf Kernel-Ebene (eBPF). Jedes Paket, das die Kapselungsgrenze überschreitet, wird inspeziert, verifiziert oder gnadenlos verworfen. Sicherheit als absolutes Diktat."
    },
    {
      year: "Phase IV",
      title: "Globale Edge-Replikation",
      text: "Ausrollen der Infrastruktur auf fünf Kontinente. Sub-10ms Latenzen in 95% der globalen Zugriffszonen. Petabytes an strukturierten Daten werden asynchron und konfliktfrei (CRDTs) repliziert. Das System existiert überall und nirgends zugleich – unbesiegbar durch lokale Ausfälle."
    },
    {
      year: "Phase V",
      title: "Autonome Orchestrierung",
      text: "Einführung KI-gestützter Heuristiken. Das System detektiert, isoliert und behebt Infrastrukturanomalien vollautomatisch. Pods werden skaliert, Routen neu berechnet und defekte Sektoren amputiert, bevor der Alert das Dashboard erreicht. Der Mensch wird zum passiven Beobachter degradiert."
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
        description="Eiskalte, industrielle Präzision in Code gegossen. Wir konstruieren digitale Festungen und Infrastrukturen, die der Zeit, katastrophalen Ausfällen und höchsten Lasten mühelos widerstehen. Hier manifestieren sich Systeme, die keine Kompromisse kennen."
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
              In einer Ära, in der digitale Fragilität als Norm akzeptiert wird, positioniert sich unsere Ingenieurskunst als absoluter, unerbittlicher Gegenpol. Wir betrachten Software-Architektur nicht als kreativen Ausdruck, sondern als angewandte Mathematik und knallharte Physik. Jede Zeile Code, jede Netzwerkkomponente und jeder Datenbank-Index wird durch einen gnadenlosen Prozess der Validierung getrieben, bis jegliches Potenzial für Ineffizienz, Jitter oder Versagen restlos eliminiert ist. Dies ist das fundamentale Gesetz der <strong className="text-foreground">K-Aqua Referenzklasse</strong>.
            </p>
            <p>
              Unsere Systeme operieren in feindlichen Umgebungen, in denen eine einzige Millisekunde Latenz inakzeptabel ist und Datenverlust das Ende der Geschäftsgrundlage bedeutet. Wir implementieren <em className="text-foreground not-italic font-mono bg-muted px-2 py-1 rounded">Byzantine Fault Tolerance</em> nicht als akademisches Theorem in Whitepapers, sondern als harte Realität in unseren verteilten Clustern. Wenn ein primäres Rechenzentrum durch einen Stromausfall in die Knie gezwungen wird, leiten unsere BGP-Anycast-Routen den globalen Traffic innerhalb von Mikrosekunden an redundante Fallback-Knoten um – ohne dass der Endnutzer auch nur einen TCP-Retransmit bemerkt. Dies ist keine Magie. Es ist eiskalte, kalkulierte Überlebensfähigkeit.
            </p>
            <p>
              Wir verabscheuen aufgeblähte &quot;Magic Frameworks&quot; und undurchsichtige Black-Box-Abstraktionen. Unser Stack ist transparent und wird von uns bis auf den Linux-Kernel-Level diktiert. Wir tunen TCP-Window-Sizes, optimieren eBPF-Netzwerkfilter für Packet-Processing in Lichtgeschwindigkeit und schreiben Allokations-Algorithmen um, um den Garbage-Collector zur Bedeutungslosigkeit zu zwingen. Die Resultate sind monolithische Microservices, die bei 100.000 Requests pro Sekunde müde im Leerlauf operieren. Es ist pure, kompromisslose Ingenieursgewalt.
            </p>
            <p>
              Sicherheit ist bei uns kein nachgelagertes Feature oder ein Compliance-Häkchen, sondern die untrennbare DNA unserer Topologie. Durch die strikte Anwendung von <em className="text-foreground not-italic font-mono bg-muted px-2 py-1 rounded">Mutual TLS (mTLS)</em> zwischen ausnahmslos allen Services, kombiniert mit kurzlebigen Zertifikaten und hardwaregestützter Schlüsselspeicherung (HSM), entziehen wir Angreifern proaktiv jegliche Angriffsfläche. Ein System, das per Definition keine Vertrauensvorschüsse gewährt, kann niemals kompromittiert werden. Das ist die unumstößliche Realität unseres Zero-Trust-Modells.
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
              title="Hyper-Availability Cluster"
              description="SLA von 99,9999% Betriebszeit. Multi-Region Redundanzschichten, die selbst bei katastrophalen physischen Hardwareausfällen den Systembetrieb lückenlos aufrechterhalten."
              icon={<Server className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Georeplizierte Cluster Topologie" />}
            />
            <BentoGridItem 
              title="Absolute Isolation"
              description="Vollständige logische und physische Kapselung von Tenant-Daten mit AES-256-GCM und dezidierten Hardware-Sicherheitsmodulen (HSM)."
              icon={<Lock className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                  <ShieldAlert className="w-32 h-32 text-primary/30 group-hover:text-primary/60 transition-colors duration-500 group-hover:scale-110 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Deterministische Latenz"
              description="Ausführung von Kernprozessen mit mathematisch garantierter maximaler Latenz. Keine P99 Spikes, keine GC-Pausen, absolut kein Jitter."
              icon={<Activity className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Gauge className="w-32 h-32 text-primary/30 group-hover:text-primary transition-colors duration-500 group-hover:rotate-12 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem 
              title="Ereignisgesteuerte Nervensysteme"
              description="Massiv skalierbare Event-Streaming-Plattformen, die Milliarden von Telemetriesignalen in Echtzeit verarbeiten, filtern und global orchestrieren."
              icon={<Network className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Echtzeit Event Stream Graph" />}
            />
            <BentoGridItem 
              title="Zustandslose Resilienz"
              description="Jeder Knotenpunkt im Cluster ist temporär und austauschbar. Der einzige Wahrheitsgehalt existiert in der zentralen, ACID-konformen, verteilten Datenbank. Chaos Engineering ist bei uns kein Test, sondern Dauerzustand."
              icon={<Layers className="w-10 h-10 text-primary" />}
              colSpan={3}
              rowSpan={2}
              header={<PremiumAssetPlaceholder label="Stateless Architecture Blueprint" className="min-h-[500px]" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Signature: Hover Preview List */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <HoverPreviewList />
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
