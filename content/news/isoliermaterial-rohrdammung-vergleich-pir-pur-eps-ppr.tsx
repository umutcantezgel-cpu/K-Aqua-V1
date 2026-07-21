import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Layers, ShieldCheck, Thermometer, Box } from "@/components/ui/icon";

export const isoliermaterialRohrdammungVergleich: NewsPost = {
  slug: "isoliermaterial-rohrdammung-vergleich-pir-pur-eps-ppr",
  title: {
    de: "Rohrdämmung im Vergleich: PIR, PUR und EPS",
    en: "Pipe Insulation Comparison: PIR, PUR and EPS",
    ar: "مقارنة عزل الأنابيب: PIR، وPUR، وEPS"
  },
  date: "2025-01-21",
  excerpt: {
    de: "Wer Energieverluste minimieren und Kondensation verhindern will, kommt an der richtigen Rohrdämmung nicht vorbei. Ein technischer Vergleich von PIR, PUR und EPS Dämmstoffen für PPR-Rohrsysteme.",
    en: "To minimize energy loss and prevent condensation, choosing the right pipe insulation is essential. A technical comparison of PIR, PUR, and EPS insulation materials for PPR pipe systems.",
    ar: "لتقليل فقدان الطاقة ومنع التكثف، يعد اختيار عزل الأنابيب المناسب أمراً ضرورياً. مقارنة فنية لمواد العزل PIR وPUR وEPS لأنظمة أنابيب PPR."
  },
  coverImage: "/images/news/insulation-materials-comparison.jpg",
  category: "Verarbeitung & Montage",
  tags: ["Isolierung", "PIR", "PUR", "EPS", "Wärmeschutz", "Fernwärme"],
  
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
                  <span>Dämmtechnik</span>
                </div>
              }
              title="Der unsichtbare Schutzmantel"
              lead="PP-R Rohre besitzen von Natur aus eine hervorragende eigene Isolationswirkung (niedrige Wärmeleitfähigkeit von 0,24 W/mK). Dennoch ist bei extremen Temperaturdifferenzen – sei es beim Transport von Fernwärme (+90°C) oder von Kaltwasser für Klimakühldecken (+6°C) – eine zusätzliche äußere Dämmung unerlässlich, um Energieverluste zu minimieren und gefährliches Tauwasser (Kondensat) an der Rohroberfläche zu verhindern."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Konstruktion */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* HorizontalTimeline: Evolution der Isolierung */}
      <Reveal>
        <SectionHead
          title="Evolution der Rohrdämmung"
          lead="Von offenen Fasern zu geschlossenzelligen Hochleistungs-Schäumen."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            events={[
              {
                year: "Vergangenheit",
                title: "Mineralwolle",
                description: "Günstig und brandbeständig, jedoch extrem anfällig für Feuchtigkeit. Einmal nass, verliert sie sofort ihre Dämmwirkung."
              },
              {
                year: "Standard",
                title: "PUR (Polyurethan)",
                description: "Geschlossenzelliger Schaum mit sehr guten Dämmwerten. Lange Zeit der Branchenstandard für werksseitig isolierte Rohre."
              },
              {
                year: "Modern",
                title: "PIR (Polyisocyanurat)",
                description: "Die Weiterentwicklung von PUR. Höhere Temperaturbeständigkeit, besseres Brandverhalten und noch niedrigere Wärmeleitfähigkeit."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Vergleich PIR, PUR, EPS */}
      <Reveal>
        <SectionHead
          title="Technische Gegenüberstellung"
          lead="Die harten Fakten: Lambda-Wert, Dichte und Hitzebeständigkeit."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "PIR (Polyisocyanurat)", "PUR (Polyurethan)", "EPS (Styropor)"],
            ["Wärmeleitfähigkeit (λ)", "0,022 – 0,026 W/mK", "0,025 – 0,030 W/mK", "0,035 – 0,040 W/mK"],
            ["Max. Dauertemperatur", "Bis zu +150 °C", "Bis zu +120 °C", "Bis zu +80 °C"],
            ["Brandverhalten", "Schwer entflammbar (verkohlt)", "Normal entflammbar (schmilzt)", "Normal bis leicht entflammbar"],
            ["Zellstruktur", "Geschlossen (>90%)", "Geschlossen (>90%)", "Teiloffen (nimmt leicht Wasser auf)"],
            ["Druckfestigkeit", "Sehr hoch", "Hoch", "Gering bis mittel"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Einsatzgebiete der Isolierungen */}
      <Reveal>
        <SectionHead
          title="Welcher Dämmstoff für welchen Einsatz?"
          lead="Die Wahl des Materials hängt maßgeblich vom transportierten Medium und dem Verlegeort ab."
        />
        <BentoGrid
          items={[
            {
              title: "Fernwärme & Heißwasser (PIR)",
              description: "Durch die extrem hohe thermische Stabilität bis 150°C ist PIR der unangefochtene Sieger für Fernwärmenetze. Selbst bei temporären Temperaturspitzen zersetzt sich der Schaum nicht.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Kältemaschinen & Klimawasser (PUR)",
              description: "Hier kommt es auf eine geschlossenzellige Struktur an, um das Eindringen von Luftfeuchtigkeit (und damit Eisbildung) zu verhindern. PUR bietet hier den perfekten Kosten-Nutzen-Faktor.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Frostschutz im Erdreich (EPS)",
              description: "EPS (Styropor) wird oft als günstige Variante für Abwasser- oder Kaltwasserleitungen im Erdreich genutzt, wo die Temperaturen moderat sind und keine Brandgefahr besteht.",
              icon: <Box className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zur Dämmung */}
      <Reveal>
        <SectionHead
          title="FAQ: Häufige Fragen zur Isolierung"
          lead="Expertenantworten zu Diffusionssperren und Kondensation."
        />
        <DeepFAQ
          items={[
            {
              q: "Warum reicht die Isolierung aus dem Baumarkt für Kaltwasser nicht aus?",
              a: "Einfache Dämmschläuche (z.B. aus PE-Schaum) sind oft nicht diffusionsdicht. Luftfeuchtigkeit diffundiert durch den Schaum, kondensiert am kalten Rohr und der Schaum saugt sich voll Wasser. Die Dämmwirkung ist dahin, Schimmel droht. Hier sind Kautschuk- oder PUR/PIR-Systeme mit Dampfsperre nötig."
            },
            {
              q: "Was ist der K Aqua Isopipe Standard?",
              a: "K Aqua bietet werksseitig vorisolierte PP-R Rohre an. Das Mediumrohr wird mit einem hocheffizienten PUR/PIR-Schaum umschlossen, der wiederum durch ein robustes PE-HD Mantelrohr vor mechanischen Schäden und UV-Strahlung geschützt wird."
            },
            {
              q: "Spielt die Dämmdicke eine Rolle?",
              a: "Ja, massiv. Sie wird meist in der Gebäudeenergiegesetzgebung (GEG) vorgeschrieben (z.B. 100% Dämmung nach EnEV). Ein besserer Lambda-Wert des Dämmstoffs (wie bei PIR) ermöglicht geringere Dämmdicken bei gleicher Isolierwirkung."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: K Aqua Isopipe */}
      <Reveal>
        <CTABand
          title="Sparen Sie sich das nachträgliche Isolieren auf der Baustelle"
          subtitle="Mit dem K Aqua Isopipe System erhalten Sie werksseitig vorisolierte Rohre für den direkten Einbau im Erdreich oder Freien. Schnell, sicher, hocheffizient."
          buttonText="Zum Isopipe System"
          buttonLink="/produkte/pipes"
          icon={<Layers className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
