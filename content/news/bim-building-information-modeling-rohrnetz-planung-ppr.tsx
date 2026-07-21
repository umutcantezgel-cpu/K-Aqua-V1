import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Box, Network, MonitorSmartphone, Code } from "@/components/ui/icon";

export const bimRohrnetzPlanungPpr: NewsPost = {
  slug: "bim-building-information-modeling-rohrnetz-planung-ppr",
  title: {
    de: "BIM in der Rohrnetzplanung für PP-R",
    en: "BIM in Pipe Network Planning for PP-R",
    ar: "BIM في تخطيط شبكات أنابيب PP-R"
  },
  date: "2025-01-14",
  teaser: {
    de: "Der digitale Zwilling in der TGA: Wie K-Aqua BIM-Daten und Autodesk Revit-Familien die moderne Rohrnetzplanung von PP-R Rohrsystemen präziser, schneller und absolut fehlerfrei machen.",
    en: "The digital twin in MEP: How K-Aqua BIM data and Autodesk Revit families make modern pipe network planning of PP-R piping systems more precise, faster, and absolutely flawless.",
    ar: "التوأم الرقمي في الهندسة الميكانيكية والكهربائية والسباكة (MEP): كيف تجعل بيانات K-Aqua BIM وعائلات Autodesk Revit التخطيط الحديث لشبكات أنابيب PP-R أكثر دقة وسرعة وخالية تماماً من الأخطاء."
  },
  excerpt: {
    de: "Der digitale Zwilling in der TGA: Wie K-Aqua BIM-Daten und Autodesk Revit-Familien die moderne Rohrnetzplanung von PP-R Rohrsystemen präziser, schneller und absolut fehlerfrei machen.",
    en: "The digital twin in MEP: How K-Aqua BIM data and Autodesk Revit families make modern pipe network planning of PP-R piping systems more precise, faster, and absolutely flawless.",
    ar: "التوأم الرقمي في الهندسة الميكانيكية والكهربائية والسباكة (MEP): كيف تجعل بيانات K-Aqua BIM وعائلات Autodesk Revit التخطيط الحديث لشبكات أنابيب PP-R أكثر دقة وسرعة وخالية تماماً من الأخطاء."
  },
  coverImage: "/images/news/bim-3d-modeling.jpg",
  category: "Planung & BIM",
  tags: ["BIM", "Revit", "Digital Twin", "Planung", "Kollisionsprüfung", "PP-R"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MonitorSmartphone className="w-5 h-5" />
                  <span>Digital Twin & TGA-Planung</span>
                </div>
              }
              title="Vom 2D-Strich zum intelligenten Bauteil"
              lead="Die Technische Gebäudeausrüstung (TGA) wird immer komplexer. Rohrschächte sind chronisch überbelegt, die Abstimmung zwischen Heizung, Kälte und Lüftung ist millimetergenau. Mit Building Information Modeling (BIM) werden K Aqua PP-R Rohrsysteme nicht mehr gezeichnet, sondern virtuell gebaut. Jeder Fitting und jedes Rohr im 3D-Modell ist ein informationstragendes Objekt, das Fehler auf der Baustelle im Vorfeld eliminiert."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für digitale Drahtgittermodelle */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Säulen von BIM */}
      <Reveal>
        <SectionHead
          title="Der Mehrwert des digitalen Zwillings"
          lead="Warum digitale 3D-Modelle in der TGA-Planung von PP-R Rohrsystemen längst kein Hype mehr sind, sondern unverzichtbarer Industriestandard für Effizienz und Ausfallsicherheit."
        />
        <BentoGrid
          items={[
            {
              title: "Automatisierte Kollisionsprüfung",
              description: "Schneidet eine Kaltwasserleitung den Lüftungskanal? BIM-Software erkennt Überschneidungen der Gewerke automatisch. Kollisionen werden virtuell gelöst, nicht teuer auf der Baustelle.",
              icon: <Network className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Exakte Massenermittlung (BOM)",
              description: "Statt Stücklisten mühsam manuell auszuzählen, generiert das Modell auf Knopfdruck eine 100% präzise Materialliste (Bill of Materials) für die Bestellung bei K Aqua.",
              icon: <Code className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Lifecycle Management",
              description: "Jedes Rohr enthält Metadaten (Material, Druckstufe, Wartungszyklen). Diese Daten stehen dem Facility Management nach Fertigstellung des Gebäudes digital zur Verfügung.",
              icon: <Box className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: 2D-CAD vs. 3D-BIM */}
      <Reveal>
        <SectionHead
          title="Paradigmenwechsel in der Planung"
          lead="Der direkte Vergleich zwischen klassischem 2D-Zeichnen (CAD) und objektorientierter 3D-Modellierung (BIM) für moderne Kunststoff-Rohrsysteme."
        />
        <DeepMatrix
          data={[
            ["Merkmal", "2D-Planung (CAD)", "3D-BIM (z.B. Revit)"],
            ["Geometrische Darstellung", "Zweidimensional (Strichlinien)", "Dreidimensional (Volumenmodelle)"],
            ["Bauteil-Metadaten", "Keine (nur Text-Anmerkungen)", "Integrierte Parameter (Artikelnummer, DN, PN)"],
            ["Kollisionsprüfung", "Manuell (Fehleranfällig)", "Automatisiert (Clash Detection)"],
            ["Massenermittlung", "Manuelles Zählen", "Automatische Stücklistenerstellung"]
          ]}
        />
      </Reveal>

      {/* Stagger: Arbeiten mit K Aqua BIM-Daten */}
      <Reveal>
        <SectionHead
          title="Der Workflow mit K Aqua"
          lead="In drei praxisnahen Schritten integrieren Sie K-Aqua PP-R Rohrleitungssysteme nahtlos in Ihre Autodesk Revit Planungssoftware."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Download und Import der Familien",
                description: "K Aqua stellt Planern hochqualitative Revit-Familien (.rfa) zur Verfügung. Diese beinhalten Rohre, Formteile (Muffen, Winkel, T-Stücke) und Armaturen mit allen relevanten Abmessungen und Gewichten."
              },
              {
                title: "2. Intelligentes Auto-Routing",
                description: "Dank der hinterlegten Routing-Präferenzen wählt die BIM-Software beim Zeichnen eines Bogens oder Abzweigs automatisch das geometrisch korrekte K Aqua Fitting aus dem Katalog aus."
              },
              {
                title: "3. Übergang zur Vorfertigung (Prefab)",
                description: "Ist das Rohrnetz fehlerfrei modelliert, können direkt Isometrien und Spool-Zeichnungen exportiert werden. Diese dienen der Werkstatt als exakte Vorlage für die millimetergenaue Vorfertigung."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Häufige Fragen zu BIM-Daten */}
      <Reveal>
        <SectionHead
          title="FAQ zu K Aqua BIM-Daten"
          lead="Häufig gestellte Fragen zur Nutzung, Kompatibilität und Bereitstellung von K-Aqua BIM-Daten und Revit-Familien."
        />
        <DeepFAQ
          items={[
            {
              q: "Welcher Level of Detail (LOD) wird von K Aqua bereitgestellt?",
              a: "Unsere digitalen Zwillinge weisen in der Regel einen Detaillierungsgrad von LOD 300 bis LOD 400 auf. Das bedeutet, dass sie sich sowohl für die exakte Ausführungsplanung als auch für die Vorfertigung (Prefabrication) eignen."
            },
            {
              q: "Unterstützt K Aqua auch OpenBIM (IFC)?",
              a: "Während native Autodesk Revit-Familien (.rfa) den höchsten Funktionsumfang bieten, können Modelle selbstverständlich im standardisierten IFC-Format exportiert werden, um mit anderen Softwarelösungen (z.B. ArchiCAD, Navisworks) zu interagieren."
            },
            {
              q: "Sind die BIM-Daten kostenpflichtig?",
              a: "Nein, K-Aqua stellt sämtliche BIM-Bibliotheken, Revit-Familien (.rfa) und technischen Planungsdaten allen registrierten TGA-Planern, Ingenieuren und Architekten vollständig kostenfrei zur Verfügung."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Digital-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "LOD", u: " 400", l: "Maximal verfügbarer Detailgrad der Modelle für die exakte Ausführungsplanung." },
              { n: "0", l: "Geometrische Planungsfehler dank automatisierter Kollisionsprüfung (Clash Detection)." },
              { n: "1", u: " Klick", l: "Ausreichend, um aus dem fertigen Modell eine millimetergenaue Materialbestellliste zu generieren." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: BIM-Portal */}
      <Reveal>
        <CTABand
          title="Digitalisieren Sie Ihre Rohrnetzplanung"
          subtitle="Beschleunigen Sie Ihren Konstruktionsprozess. Fordern Sie jetzt Zugang zu unseren Revit-Familien und BIM-Datenpaketen an."
          buttonText="BIM-Daten anfragen"
          buttonLink="/kontakt"
          icon={<MonitorSmartphone className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
