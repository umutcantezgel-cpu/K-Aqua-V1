import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatBand } from "@/components/ui/StatBand";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Layers, Ruler, Activity, Coins, Download } from "@/components/ui/icon";

export const bimBuildingInformationModeling: NewsPost = {
  slug: "bim-building-information-modeling-rohrleitungsplanung-ppr",
  title: {
    de: "BIM in der PP-R Rohrleitungsplanung",
    en: "BIM in PP-R Piping Design",
    ar: "نمذجة معلومات البناء (BIM) في تصميم شبكات أنابيب PP-R",
  },
  date: "2024-07-02",
  excerpt: {
    de: "Entdecken Sie, wie Building Information Modeling (BIM) die Planung von TGA-Systemen und PP-R Rohrsystemen revolutioniert. Mit den K Aqua Revit- und IFC-Daten planen Sie kollisionsfrei, zeiteffizient und kostenoptimiert.",
    en: "Discover how Building Information Modeling (BIM) is revolutionizing the planning of MEP systems and PP-R piping networks. With K Aqua Revit and IFC data, you can plan collision-free, time-efficiently, and cost-effectively.",
    ar: "اكتشف كيف تُحدث نمذجة معلومات البناء (BIM) ثورة في تخطيط أنظمة الهندسة الميكانيكية والكهربائية والسباكة (MEP) وشبكات أنابيب PP-R. باستخدام بيانات K Aqua Revit و IFC، يمكنك التخطيط بدون تعارضات، وبكفاءة في الوقت، وبتكلفة محسنة.",
  },
  coverImage: "/images/news/bim-planning.jpg",
  category: "Digitalisierung",
  tags: ["BIM", "Digitaler Zwilling", "Revit", "IFC", "Planung", "TGA", "PP-R", "Rohrsysteme", "K Aqua"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Layers className="w-5 h-5" />
                  <span>Digital Engineering</span>
                </div>
              }
              title="Der digitale Zwilling Ihres Rohrleitungssystems"
              lead="Die Komplexität moderner Großbauprojekte erfordert eine Planungsebene, die weit über den klassischen 2D-Grundriss hinausgeht. Building Information Modeling (BIM) ist der Schlüssel zur fehlerfreien, transparenten und effizienten Projektabwicklung. K Aqua stellt dafür alle Produktdaten als intelligente 3D-Objekte zur Verfügung."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 mix-blend-screen pointer-events-none">
            {/* Technisches Canvas Element für Blueprint-Look */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StatBand: Harte Fakten */}
      <Reveal>
        <SectionHead
          title="Warum BIM den Unterschied macht"
          lead="Die Integration von BIM-Daten in die TGA-Planung bringt messbare Vorteile auf der Baustelle."
          align="center"
        />
        <div className="mt-8">
          <StatBand
            cols={280}
            stats={[
              { n: "30", u: "%", l: "Schnellere Planungsphase durch automatisierte Routings." },
              { n: "99", u: "%", l: "Weniger Kollisionen (Clash Detection) vor Baubeginn." },
              { n: "100", u: "%", l: "K Aqua Sortiment als native Revit- und IFC-Daten verfügbar." }
            ]}
          />
        </div>
      </Reveal>

      {/* HorizontalTimeline: Evolution der Planung */}
      <Reveal>
        <SectionHead
          title="Die Evolution der Planungsebene"
          lead="BIM ist nicht nur 3D. Die wahren Vorteile entfalten sich durch die Anreicherung des Modells mit Zeit- und Kostenparametern (4D & 5D)."
        />
        <HorizontalTimeline
          items={[
            {
              title: "2D CAD",
              description: "Klassische Strichzeichnungen. Fehleranfällig bei komplexen Schachtbelegungen und Kreuzungen von Gewerken.",
              icon: <Ruler className="w-6 h-6" />
            },
            {
              title: "3D BIM",
              description: "Räumliches Modell mit intelligenten K Aqua Bauteilen. Ermöglicht sofortige Kollisionsprüfung (Clash Detection) zwischen Heizung, Sanitär und Lüftung.",
              icon: <Layers className="w-6 h-6" />
            },
            {
              title: "4D BIM",
              description: "Das 3D-Modell wird mit dem Bauzeitenplan verknüpft. Logistik und Materiallieferungen (Just-in-Time) für Rohre und Fittings werden optimiert.",
              icon: <Activity className="w-6 h-6" />
            },
            {
              title: "5D BIM",
              description: "Echtzeit-Kostenkontrolle. Automatische Generierung von Stücklisten (BOM - Bill of Materials) auf Knopfdruck aus dem Modell.",
              icon: <Coins className="w-6 h-6" />
            }
          ]}
        />
      </Reveal>

      {/* PipeFX Isonet: Visuelle Trennung */}
      <Reveal>
        <div className="w-full flex justify-center py-12">
          <div className="relative w-full max-w-4xl h-[400px] bg-background-subtle rounded-3xl border border-card-border overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 z-10 pointer-events-none" />
            <PipeFX variant="isonet" size={600} />
            <div className="absolute z-20 bottom-8 left-8 right-8 text-center text-muted-foreground font-mono text-sm">
              [SYSTEM_ROUTING_ACTIVE] Automatisches Routing und Clash-Detection mit K Aqua Revit-Families.
            </div>
          </div>
        </div>
      </Reveal>

      {/* CTABand: BIM-Datenbank */}
      <Reveal>
        <CTABand
          title="Starten Sie Ihre BIM-Planung"
          subtitle="Greifen Sie auf unsere vollständige, herstellergeprüfte BIM-Bibliothek zu (Revit, AutoCAD MEP, IFC)."
          buttonText="BIM-Daten herunterladen"
          buttonLink="/ressourcen/support"
          icon={<Download className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
