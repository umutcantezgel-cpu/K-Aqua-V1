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
    de: "BIM in der PPR Rohrleitungsplanung: Maximale Effizienz",
    en: "BIM in PPR Piping Design",
    ar: "نمذجة معلومات البناء (BIM) في تصميم شبكات أنابيب PPR",
  },
  date: "2024-07-02",
  excerpt: {
    de: "Entdecken Sie, wie Building Information Modeling (BIM) die Planung von TGA Systemen und PPR Rohrsystemen revolutioniert. Die präzise Modellierung von PP-R Rohrleitungssystemen im digitalen Raum ermöglicht es, komplexe Trinkwasser- und Heizungsnetze kollisionsfrei zu entwerfen. Mit den hochdetaillierten K Aqua Revit- und IFC-Daten planen Sie nicht nur zeiteffizient und kostenoptimiert, sondern sichern auch die Einhaltung aller bautechnischen Vorgaben und Normen bereits vor dem ersten Spatenstich.",
    en: "Discover how Building Information Modeling (BIM) is revolutionizing the planning of MEP systems and PPR piping networks. With K Aqua Revit and IFC data, you can plan collision-free, time-efficiently, and cost-effectively.",
    ar: "اكتشف كيف تُحدث نمذجة معلومات البناء (BIM) ثورة في تخطيط أنظمة الهندسة الميكانيكية والكهربائية والسباكة (MEP) وشبكات أنابيب PPR. باستخدام بيانات K Aqua Revit و IFC، يمكنك التخطيط بدون تعارضات، وبكفاءة في الوقت، وبتكلفة محسنة.",
  },
  coverImage: "/images/news/bim-planning.jpg",
  category: "Digitalisierung",
  tags: ["BIM", "Digitaler Zwilling", "Revit", "IFC", "Planung", "TGA", "PPR", "Rohrsysteme", "K Aqua"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
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
              title="Der digitale Zwilling Ihres Rohrleitungssystems mit K Aqua PP-R"
              lead="Die Komplexität moderner Großbauprojekte, insbesondere im Bereich der Technischen Gebäudeausrüstung (TGA), erfordert eine Planungsebene, die weit über den klassischen 2D-Grundriss hinausgeht. Building Information Modeling (BIM) ist der absolute Schlüssel zur fehlerfreien, transparenten und hocheffizienten Projektabwicklung. K Aqua stellt dafür alle Produktdaten als intelligente 3D-Objekte zur Verfügung. Dabei geht es nicht nur um die geometrische Darstellung, sondern um die Integration tiefgehender technischer Metadaten."
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Warum BIM bei PP-R Installationen den entscheidenden Unterschied macht</h2>
          <p>
            Im konventionellen Rohrleitungsbau treten häufig Diskrepanzen zwischen der Planung und der tatsächlichen Ausführung auf. Leitungen kollidieren mit Lüftungskanälen oder Kabeltrassen, was auf der Baustelle zu teuren Verzögerungen, Umplanungen und Materialverschwendung führt. Durch den Einsatz von Building Information Modeling (BIM) werden solche Konflikte durch die sogenannte Clash Detection (Kollisionsprüfung) vollständig eliminiert, lange bevor der erste Spatenstich erfolgt.
          </p>
          
          <h3 className="text-xl font-semibold text-foreground mt-6">Intelligente Revit-Familien und IFC-Daten</h3>
          <p>
            Die von K Aqua bereitgestellten BIM-Daten (verfügbar als native Revit-Familien und im offenen IFC-Format) sind keine leeren Hüllen. Sie enthalten alle spezifischen Eigenschaften des Polypropylen Random-Copolymers (PP-R). Dazu gehören Druckstufen (SDR), Materialdichte, Außendurchmesser, Wandstärken und vor allem die genauen Einstecktiefen der Fittings.
          </p>
          <p>
            Dies ist für den Schweißprozess essenziell: Beim Heizelement-Muffenschweißen wird das Rohr einige Millimeter in den Fitting geschoben. Eine rein grafische 3D-Software ohne diese Metadaten würde falsche Rohrlängen berechnen. Die intelligenten BIM-Modelle von K Aqua berechnen das automatisierte Routing exakt nach der tatsächlichen Fitting-Geometrie, wodurch der Materialauszug (Bill of Materials - BOM) auf den Millimeter genau stimmt.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6">Hydraulische Berechnungen im Modell</h3>
          <p>
            Ein weiterer enormer Vorteil ist die exakte hydraulische Berechnung direkt im Modell. Da PP-R durch seine extrem glatte Innenoberfläche (Rauigkeit von 0,007 mm) deutlich geringere Druckverluste aufweist als herkömmliche Metallrohre, können Pumpen, Ventile und Rohrquerschnitte durch die BIM-Simulation optimal dimensioniert werden. Dies verhindert eine kostspielige Überdimensionierung der Anlage und senkt den Energieverbrauch (Lebenszykluskosten) des Gebäudes massiv.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-6">Simulation der thermischen Längenausdehnung</h3>
          <p>
            Kuststoffrohre dehnen sich bei Erwärmung aus. Besonders bei Warmwasser- oder Heizungsleitungen muss diese thermische Längenausdehnung durch Dehnungsbögen oder Kompensatoren abgefangen werden. Im BIM-Modell können Planer die Temperaturdifferenzen simulieren. Die Software berechnet automatisch die erforderliche Schenkellänge der Dehnungsbögen und positioniert Fest- und Loslager exakt dort, wo sie statisch notwendig sind. Dies garantiert eine dauerhaft spannungsfreie und sichere Installation.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Die Evolution der Planungsebene: Von 2D zu 5D</h2>
          <p>
            BIM ist weit mehr als nur 3D. Die wahren Vorteile für Bauherren und Facility Manager entfalten sich durch die Anreicherung des Modells mit detaillierten Zeit- und Kostenparametern (4D & 5D).
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>3D BIM:</strong> Räumliches Modell zur Kollisionsprüfung und hydraulischen Auslegung.</li>
            <li><strong>4D BIM:</strong> Verknüpfung mit dem Bauzeitenplan. Die Baustellenlogistik und Materiallieferungen (Just-in-Time) für PP-R Rohre werden exakt getaktet. Dies minimiert Lagerkosten auf der Baustelle.</li>
            <li><strong>5D BIM:</strong> Echtzeitkostenkontrolle. Jede Änderung im 3D-Modell (z.B. eine andere Rohrführung) aktualisiert sofort die Materialliste und die Projektkosten.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Der digitale Zwilling für das Facility Management</h2>
          <p>
            Nach Abschluss der Bauarbeiten dient das As-Built-Modell (der exakte digitale Zwilling) als Datenbank für den künftigen Gebäudebetrieb (6D BIM). Der Facility Manager weiß auf Knopfdruck, welche Rohre und Fittings von K Aqua wo in der Wand liegen, welche Druckstufen verbaut wurden und wann Wartungsintervalle für Pumpen anstehen. Diese Transparenz erleichtert spätere Umbauten drastisch und sichert den Werterhalt der Immobilie.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={280}
            stats={[
              { n: "40", u: "%", l: "Schnellere Planungsphase durch automatisierte Routings und Massenauszüge (BOM)." },
              { n: "100", u: "%", l: "Kollisionsfreiheit vor Baubeginn dank intelligenter Clash Detection der Gewerke." },
              { n: "100", u: "%", l: "K Aqua Sortiment als native Revit- und IFC-Daten mit vollständigen Metadaten verfügbar." }
            ]}
          />
        </div>
      </Reveal>
    </div>
  ),
};
