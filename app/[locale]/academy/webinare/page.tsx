/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Globe, Award, Shield, Layers, Factory, Wrench, ArrowRight } from '@/components/ui/icon';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return constructMetadata({
    title: "Webinare & Technical Training | K-Aqua",
    description: "K-Aqua Webinare – Kompromisslose Sicherheit durch German Engineering für globale Megaprojekte.",
    path: "/academy/webinare", locale,
  });
}

export default async function WebinarePage() {

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow="K-Aqua Academy"
        title={
          <>
            Wissen als <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Wettbewerbsvorteil.
            </span>
          </>
        }
        description="Die industrielle Autorität für die Planung und Ausführung von thermoplastischen Rohrleitungssystemen in globalen Megaprojekten. Kompromissloser Wissenstransfer direkt aus dem deutschen K-Aqua Entwicklungszentrum."
      >
        <Button variant="primary" size="lg" href="/kontakt" className="group">
          Anstehende Webinare
          <ArrowRight className="ms-2 group-hover:translate-x-1 transition-transform" />
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          Curriculum herunterladen
        </Button>
      </ParallaxHero>

      {/* Intro Text Section for scroll padding */}
      <section className="py-32 bg-background relative z-10 border-b border-card-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-heading font-extrabold tracking-tight mb-8 leading-tight">
              German Engineering.<br/>
              <span className="text-muted-foreground">Digital vermittelt.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Wenn internationale Generalunternehmer Milliarden-Projekte planen, vertrauen sie nicht auf Vermutungen. Sie fordern harte Daten, nachweisbare Fakten und tiefes Materialverständnis. 
              Unsere Webinare destillieren jahrzehntelange Erfahrung in der Polymerverarbeitung in hochkonzentrierte, interaktive Lerneinheiten für Ingenieure und Planer.
            </p>
          </div>
          <div className="h-full w-full min-h-[400px]">
            <PremiumAssetPlaceholder label="Globales Netzwerk" className="rounded-[3rem] shadow-2xl" />
          </div>
        </div>
      </section>

      {/* BentoGrid Section */}
      <section className="py-32 bg-card relative z-10 border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <SectionHead
            eyebrow="Das Ökosystem"
            title="Die fortschrittlichste Wissensplattform der Branche."
            lead="Wir haben das Konzept des technischen Webinars komplett neu gedacht. Keine statischen Präsentationen, sondern dynamische Systemanalysen und Live-Demonstrationen aus unserem Labor."
            align="center"
          />

          <div className="mt-20">
            <BentoGrid className="max-w-6xl mx-auto">
              <BentoGridItem
                title="Live VR Inspektionen"
                description="Beobachten Sie Echtzeit-Strömungssimulationen und thermodynamische Belastungstests unserer PPR-Systeme in immersiven virtuellen Umgebungen."
                header={<PremiumAssetPlaceholder label="VR Flow Simulation" className="rounded-t-2xl border-b-0 min-h-[200px]" />}
                icon={<Layers className="text-primary w-8 h-8" />}
                colSpan={2}
              />
              <BentoGridItem
                title="Globale Normen"
                description="Tiefe Einblicke in DIN EN ISO 15874, SKZ, WRAS und DVGW. Wie wir Standards nicht nur erfüllen, sondern definieren."
                header={<div className="bg-background/50 h-full w-full flex items-center justify-center p-8"><Globe className="w-24 h-24 text-primary/10" /></div>}
                icon={<Shield className="text-primary w-8 h-8" />}
                colSpan={1}
              />
              <BentoGridItem
                title="Engineering Support"
                description="Diskutieren Sie Ihre CAD/BIM-Projektpläne live mit unseren leitenden Systemingenieuren während dedizierter Q&A Sessions."
                header={<div className="bg-background/50 h-full w-full flex items-center justify-center p-8"><Wrench className="w-24 h-24 text-primary/10" /></div>}
                icon={<Factory className="text-primary w-8 h-8" />}
                colSpan={1}
              />
              <BentoGridItem
                title="On-Demand Archiv"
                description="Zugriff auf hunderte Stunden an technischen Schulungen, Datenblättern, 3D-BIM-Modellen und CFD-Analysen (Computational Fluid Dynamics)."
                header={<PremiumAssetPlaceholder label="Data Vault" className="rounded-t-2xl border-b-0 min-h-[200px]" />}
                icon={<Award className="text-primary w-8 h-8" />}
                colSpan={2}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* StickyScrollReveal Section */}
      <section className="py-32 bg-background relative z-10 border-b border-card-border overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-16">
          <SectionHead
            eyebrow="Die Curricula"
            title="Tiefgang statt Oberfläche."
            lead="Jedes Modul ist darauf ausgelegt, Ihnen einen unfairen technischen Vorteil zu verschaffen. Von molekularer Struktur bis zu Makro-Infrastrukturen."
            align="left"
          />
        </div>
        
        <StickyScrollReveal 
          content={[
            {
              title: "Modul 01: Thermoplastische Schweißtechnologien",
              description: "Vom klassischen Heizelementmuffenschweißen bis zur hochkomplexen Heizwendelschweißung großer Dimensionen. Wir analysieren Temperaturkurven, Fügedruckparameter und molekulare Verbindungsstrukturen auf mikroskopischer Ebene, um 100% leckagefreie, homogene Systeme zu garantieren, die ein Leben lang halten.",
              content: <PremiumAssetPlaceholder label="Schweißtechnik Simulation" className="h-full w-full rounded-none" />
            },
            {
              title: "Modul 02: Hydrodynamische Systemplanung",
              description: "Druckverlustberechnungen bei extremen Durchflussraten. Vermeidung von zerstörerischer Kavitation in Hochhaus-Steigleitungen. Wir demonstrieren mathematisch fundiert, wie K-Aqua Rohrleitungen durch minimale Wandrauheit die Pumpenleistung signifikant optimieren und den energetischen Fußabdruck globaler Infrastrukturprojekte massiv senken.",
              content: <PremiumAssetPlaceholder label="Hydrodynamik VR Data" className="h-full w-full rounded-none" />
            },
            {
              title: "Modul 03: Extremumgebungen & Materialermüdung",
              description: "Wie reagiert PPR-C bei 95°C konstanter Dauerbelastung über Jahrzehnte? Wie verhält sich das Rohrsystem bei seismischer Aktivität oder schweren Erschütterungen? Wir simulieren extreme physikalische Umweltbedingungen und beweisen die überlegene Duktilität, Zähigkeit und Langlebigkeit unseres German Engineerings unter maximalem Stress.",
              content: <PremiumAssetPlaceholder label="Stress & Belastungsmatrix" className="h-full w-full rounded-none" />
            },
            {
              title: "Modul 04: BIM & Digitale Zwillingsintegration",
              description: "Die Zukunft ist modellbasiert. Vollständige Integration von K-Aqua Systemen in Autodesk Revit und andere führende BIM-Plattformen. Wir lehren die automatisierte Kollisionsprüfung in der TGA-Planung (Clash Detection), präzise Stücklistenerstellung auf Knopfdruck und Lifecycle-Management für das Smart Building von morgen.",
              content: <PremiumAssetPlaceholder label="Revit BIM Integration" className="h-full w-full rounded-none" />
            }
          ]}
        />
      </section>

      {/* HorizontalTimeline Section */}
      <HorizontalTimeline 
        title="Der K-Aqua Zertifizierungspfad."
        description="Ein mehrstufiger, rigoroser Lehrplan für die Elite der internationalen Anlagenplaner und Bauingenieure."
        items={[
          { year: "Phase 1", title: "Fundamentale Polymerwissenschaft", text: "Verständnis der molekularen Struktur von Polypropylen Random-Copolymer (PPR-C). Unterschiede im Alterungsverhalten zu metallischen Werkstoffen und Grundlagen der Korrosionsfreiheit." },
          { year: "Phase 2", title: "Angewandte Systemauslegung", text: "Exakte Dimensionierung komplexer Rohrnetzwerke, Berechnung thermischer Längenänderungen und Konstruktion der optimalen Platzierung von Festpunkt- und Loslagergeometrien." },
          { year: "Phase 3", title: "Spezialisierte Anwendungsgebiete", text: "Fokus auf missionskritische Anlagen: Auslegung von Kühlwasserkreisläufen für Hyperscale-Rechenzentren, aggressive chemische Industrieanlagen und hochreine Trinkwasserinfrastruktur unter Hygiene-Aspekten." },
          { year: "Phase 4", title: "Die Master Certification", text: "Die finale, kompromisslose Prüfung. Der dokumentierte Nachweis Ihrer Befähigung zur fehlerfreien Planung und Bauüberwachung von Milliarden-Dollar-Megaprojekten mit K-Aqua Systemen." }
        ]}
      />

      {/* Deep Dive Text Section */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
            Nicht einfach nur Rohre. <br/>
            <span className="text-primary">Lebensadern für Megastrukturen.</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            Ein Webinar bei K-Aqua ist keine Verkaufsveranstaltung. Es ist ein tiefer technischer Diskurs unter Ingenieuren. Wir sprechen über Zeta-Werte, Längenausdehnungskoeffizienten, Kristallinitätsgrade und Zeitstandinnendruckfestigkeit. Wer an unseren Sessions teilnimmt, verlässt sie mit anwendbarem, hochspezialisiertem Wissen, das Gebäude sicherer, effizienter und langlebiger macht.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-start">
            <Card className="p-8 border-primary/20 bg-primary/5">
              <div className="font-heading font-bold text-4xl text-primary mb-4">10k+</div>
              <div className="font-bold text-lg mb-2">Geschulte Ingenieure</div>
              <p className="text-muted-foreground text-sm">Weltweit haben Experten unser Zertifizierungsprogramm durchlaufen und wenden K-Aqua Standards an.</p>
            </Card>
            <Card className="p-8">
              <div className="font-heading font-bold text-4xl text-foreground mb-4">50+</div>
              <div className="font-bold text-lg mb-2">Länderspezifische Normen</div>
              <p className="text-muted-foreground text-sm">Unsere Webinare berücksichtigen lokale Bauvorschriften von den VAE bis nach Südostasien.</p>
            </Card>
            <Card className="p-8">
              <div className="font-heading font-bold text-4xl text-foreground mb-4">100%</div>
              <div className="font-bold text-lg mb-2">Praxisrelevanz</div>
              <p className="text-muted-foreground text-sm">Keine theoretischen Konstrukte. Reale Projekt-Case-Studies und bewährte Best-Practices aus dem Feld.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* 4) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              Sichern Sie Ihren Wettbewerbsvorteil.
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              Melden Sie sich für das nächste Experten-Webinar an und erweitern Sie Ihre Planungskompetenz mit German Engineering.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/kontakt">
                Zum Webinarplan
              </Button>
              <Button variant="secondary" size="lg" className="bg-transparent text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10" href="/kontakt">
                Individuelle Schulung anfragen
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
