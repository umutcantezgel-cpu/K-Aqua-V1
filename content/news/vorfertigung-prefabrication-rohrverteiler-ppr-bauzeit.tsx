import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Cpu, Layers, Settings2, Activity, CheckCircle2 } from "@/components/ui/icon";

export const vorfertigungPrefabrication: NewsPost = {
  slug: "vorfertigung-prefabrication-rohrverteiler-ppr-bauzeit",
  title: {
    de: "Vorfertigung von PP-R Rohrverteilern",
    en: "Prefabrication of PP-R Pipe Manifolds",
    ar: "التجهيز المسبق لمجمعات أنابيب PP-R"
  },
  date: "2024-12-20",
  teaser: {
    de: "Bauen unter Zeitdruck: Entdecken Sie, wie die Vorfertigung (Prefabrication) von K Aqua PP-R Rohrverteilern in der Werkstatt die Bauzeit und Montagezeit auf der Baustelle um bis zu 70 % reduziert.",
    en: "Building under time pressure: Discover how the prefabrication of K Aqua PP-R pipe manifolds in the workshop reduces construction and installation time on site by up to 70%.",
    ar: "البناء تحت ضغط الوقت: اكتشف كيف يقلل التجهيز المسبق لمجمعات أنابيب K Aqua PP-R في الورشة من وقت البناء والتركيب في الموقع بنسبة تصل إلى 70٪."
  },
  excerpt: {
    de: "Bauen unter Zeitdruck: Entdecken Sie, wie die Vorfertigung (Prefabrication) von K Aqua PP-R Rohrverteilern in der Werkstatt die Bauzeit und Montagezeit auf der Baustelle um bis zu 70 % reduziert.",
    en: "Building under time pressure: Discover how the prefabrication of K Aqua PP-R pipe manifolds in the workshop reduces construction and installation time on site by up to 70%.",
    ar: "البناء تحت ضغط الوقت: اكتشف كيف يقلل التجهيز المسبق لمجمعات أنابيب K Aqua PP-R في الورشة من وقت البناء والتركيب في الموقع بنسبة تصل إلى 70٪."
  },
  coverImage: "/images/news/prefabrication-workshop.jpg",
  category: "Planung & BIM",
  tags: ["Vorfertigung", "Prefabrication", "Rohrverteiler", "BIM", "PP-R", "Effizienz"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Layers className="w-5 h-5" />
                  <span>Prozessoptimierung & BIM</span>
                </div>
              }
              title="Vom CAD-Modell zum Plug & Play PP-R Verteiler"
              lead="Die Rahmenbedingungen auf modernen Großbaustellen werden immer anspruchsvoller: Knappe Bauzeitenpläne, akuter Fachkräftemangel und ungünstige Witterungsbedingungen. Wer hier komplexe Heizungs- und Trinkwasserverteiler aus dutzenden Einzelteilen direkt vor Ort zusammenschweißt, verliert wertvolle Bauzeit. Die Lösung heißt industrielle Vorfertigung (Prefabrication). K Aqua PP-R Rohrsysteme eignen sich hervorragend, um in der kontrollierten Umgebung einer Werkstatt millimetergenau vorgefertigt und als prüfbereite Baugruppe auf die Baustelle geliefert zu werden."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Baupläne und Konstruktion */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* HorizontalTimeline: Der Prefab-Workflow */}
      <Reveal>
        <SectionHead
          title="Der digitale Workflow"
          lead="Wie aus einer Idee ein fertiges Verteilersystem wird."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. 3D-Planung & BIM",
                description: "Im ersten Schritt wird der Rohrverteiler virtuell modelliert. Alle Abgänge, Ventile und Platzverhältnisse werden am PC berechnet und in exakte Stücklisten überführt."
              },
              {
                title: "2. Werkstatt-Schweißung",
                description: "Fernab von Baustellenstaub und Kälte verschweißen Spezialisten die K Aqua PP-R Rohre unter perfekten klimatischen Bedingungen – oft unterstützt von stationären Schweißmaschinen."
              },
              {
                title: "3. Plug & Play Montage",
                description: "Die fertigen Baugruppen werden just-in-time auf die Baustelle geliefert. Vor Ort müssen nur noch wenige Anbindenähte gesetzt werden, der Rest ist bereits druckgeprüft."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Vorteile der Vorfertigung */}
      <Reveal>
        <SectionHead
          title="Warum Prefabrication?"
          lead="Der Wechsel von der Baustelle in die Werkstatt bringt messbare Vorteile."
        />
        <BentoGrid
          items={[
            {
              title: "Massive Bauzeitverkürzung",
              description: "Indem die aufwendigen Schweißarbeiten in die Werkstatt verlagert werden, können die Installationszeiten auf der Baustelle um bis zu 70 % gesenkt werden. Ein enormer Gewinn für den Projektplan.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Höchste Präzision",
              description: "In der Werkstatt gibt es keine Zwangslagen (z.B. Schweißen über Kopf im engen Schacht). Winkel und Abstände können millimetergenau eingehalten werden.",
              icon: <Settings2 className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Wetterunabhängigkeit",
              description: "Das Verschweißen von Kunststoffen erfordert bestimmte Umgebungstemperaturen. In der klimatisierten Werkstatt ist dies im Winter kein Problem.",
              icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Baustelle vs. Werkstatt */}
      <Reveal>
        <SectionHead
          title="Montage im Vergleich"
          lead="Konventionelle Baustellenfertigung gegen moderne Vorfertigung."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Baustellenmontage", "Vorfertigung (Prefab)"],
            ["Montagezeit vor Ort", "Hoch (Wochen)", "Minimal (Tage/Stunden)"],
            ["Schweißqualität", "Stark abhängig von Bedingungen", "Konstant hoch (stationäre Maschinen)"],
            ["Platzbedarf auf Baustelle", "Sehr hoch (Lagerung Einzelteile)", "Gering (Modul wird sofort verbaut)"],
            ["Abfall & Verschnitt", "Oft hoch", "Nahezu Null"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zur Vorfertigung */}
      <Reveal>
        <SectionHead
          title="FAQ zur Prefabrication"
          lead="Antworten für TGA-Planer und ausführende Betriebe."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie groß können vorgefertigte K Aqua Register sein?",
              a: "Grundsätzlich wird die Größe nur durch die Transportlogistik (LKW-Ladefläche) und die Einbringungsmöglichkeiten auf der Baustelle (Türen, Schächte) begrenzt. Meist werden große Verteiler in smarte Module aufgeteilt."
            },
            {
              q: "Kann ich vorgefertigte Systeme vorher auf Dichtigkeit prüfen?",
              a: "Ja, das ist einer der größten Vorteile. Die Baugruppe kann bereits in der Werkstatt einer Druckprüfung unterzogen werden, was die Fehlersuche auf der Baustelle eliminiert."
            },
            {
              q: "Wer übernimmt die 3D-Planung?",
              a: "Entweder das planende Ingenieurbüro überlässt dem Ausführenden die Werkplanung, oder Hersteller wie K Aqua unterstützen mit BIM-Daten und CAD-Modellen bei der Konstruktion."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Effizienz-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "%", l: "Mögliche Reduktion der reinen Montagezeit auf der Baustelle." },
              { n: "0", l: "Verpackungsmüll und Rohrverschnitt, der auf der Baustelle entsorgt werden muss." },
              { n: "100", u: "%", l: "Geometrische Präzision dank Vorab-Planung in 3D-Umgebungen." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Prefab-Support */}
      <Reveal>
        <CTABand
          title="Wollen Sie Ihren Bauzeitenplan optimieren?"
          subtitle="Verlagern Sie Komplexität in die Vorplanung. Sprechen Sie mit uns über den Einsatz von K Aqua BIM-Daten für die Vorfertigung Ihrer nächsten Rohrverteiler."
          buttonText="BIM-Support anfragen"
          buttonLink="/kontakt"
          icon={<Cpu className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
