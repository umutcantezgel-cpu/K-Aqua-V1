import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { TestTube, Factory, Beaker, Leaf } from "@/components/ui/icon";

export const chemischeResistenzIndustrie: NewsPost = {
  slug: "chemische-resistenz-ppr-industrieanwendungen-galvanik-saeuren",
  title: {
    de: "Chemische Resistenz von PP-R Rohrsystemen",
    en: "Chemical Resistance of PP-R Pipe Systems",
    ar: "المقاومة الكيميائية لأنظمة أنابيب PP-R"
  },
  date: "2025-01-29",
  excerpt: {
    de: "Wo Edelstahl korrodiert, spielt PP-R Polypropylen seine Stärken voll aus. Ein praxisnaher Leitfaden für den Einsatz von K Aqua Rohrsystemen in Galvanik, Pharma und Prozessindustrie.",
    en: "Where stainless steel corrodes, PP-R polypropylene fully demonstrates its strengths. A practical guide for the application of K Aqua pipe systems in electroplating, pharmaceuticals, and the process industry.",
    ar: "حيثما يتآكل الفولاذ المقاوم للصدأ، يُظهر البولي بروبيلين PP-R نقاط قوته بالكامل. دليل عملي لاستخدام أنظمة أنابيب K Aqua في الطلاء الكهربائي والأدوية وصناعة العمليات الكيميائية."
  },
  coverImage: "/images/news/industry-chemical-pipes.jpg",
  category: "Technologie & Material",
  tags: ["Chemie", "Industrie", "Galvanik", "Säure", "Lauge", "PP-R", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <TestTube className="w-5 h-5" />
                  <span>Materialkunde & PP-R Chemiebeständigkeit</span>
                </div>
              }
              title="Aggressive Medien in PP-R Rohrsystemen sicher leiten"
              lead="In industriellen Prozessen sind Rohrleitungen extremen Belastungen ausgesetzt. Säuren, Laugen und Lösungsmittel greifen metallische Werkstoffe an und führen zu Lochfraß oder Flächenkorrosion. K Aqua PP-R (Polypropylen Random Copolymer) bietet aufgrund seiner unpolaren Struktur eine herausragende chemische Beständigkeit und ersetzt in vielen Bereichen kostenintensiven Edelstahl oder Speziallegierungen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StatBand: pH Range */}
      <Reveal>
        <StatBand
          cols={3}
          stats={[
            { n: "1", u: " bis 14", l: "pH-Wert Resistenz (abhängig von Medium und Temperatur)" },
            { n: "0", l: "Lochfraß. Korrosion ist bei PP-R physikalisch ausgeschlossen." },
            { n: "100", u: "%", l: "Vollflächige Verschmelzung durch Polyfusion – keine schwachen Klebenähte." }
          ]}
        />
      </Reveal>

      {/* BentoGrid: Anwendungsbereiche */}
      <Reveal>
        <SectionHead
          title="Industrielle Einsatzgebiete von PP-R Rohrsystemen"
          lead="Von der Galvanik und Oberflächentechnik bis zur hochreinen Wasserversorgung in der Prozessindustrie."
          align="center"
        />
        <div className="mt-8">
          <BentoGrid
            items={[
              {
                title: "Galvanik & Oberflächentechnik",
                description: "Transport von Beizbädern, galvanischen Elektrolyten und aggressiven Spülwässern. PP-R Rohrsysteme widerstehen anorganischen Säuren wie Schwefel- oder Salzsäure auch bei erhöhten Prozesstemperaturen dauerhaft.",
                icon: <Factory className="w-6 h-6 text-primary" />,
                size: "large"
              },
              {
                title: "Wasseraufbereitung (VE-Wasser)",
                description: "Vollentsalztes (VE) oder demineralisiertes Wasser entzieht Metallrohren Ionen, was zu beschleunigter Korrosion führt. PP-R verhält sich absolut inert und hält das Prozesswasser dauerhaft rein.",
                icon: <Beaker className="w-6 h-6 text-primary" />,
                size: "medium"
              },
              {
                title: "Agrar & Düngemittelindustrie",
                description: "Hohe Beständigkeit gegen stickstoffhaltige Verbindungen, Phosphorsäure und agrochemische Lösungen. Die optimale Wahl für Bewässerungssysteme und chemische Dosieranlagen.",
                icon: <Leaf className="w-6 h-6 text-primary" />,
                size: "medium"
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Chemikalien-Resistenz */}
      <Reveal>
        <SectionHead
          title="Orientierungsmatrix: Beständigkeit"
          lead="Auszug aus der chemischen Beständigkeitsliste für PP-R bei 20°C."
        />
        <DeepMatrix
          data={[
            ["Medium", "Konzentration", "Beständigkeit (20°C)", "Anmerkung"],
            ["Schwefelsäure", "bis 50%", "Sehr gut (+)", "Bei höheren Konzentrationen / Temp. eingeschränkt"],
            ["Salzsäure", "bis 30%", "Sehr gut (+)", "Hervorragende Säureresistenz"],
            ["Natronlauge", "bis 50%", "Sehr gut (+)", "Beständig gegen starke Basen"],
            ["Ammoniak (wässrig)", "Alle", "Sehr gut (+)", "Ideal für Kälte- und Agrarindustrie"],
            ["Aceton", "100%", "Bedingt (/)", "Neigung zur Quellung bei Dauerkontakt"],
            ["Benzol / Toluol", "100%", "Nicht beständig (-)", "Aromatische Kohlenwasserstoffe greifen PP an"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen von Anlagenbauern */}
      <Reveal>
        <SectionHead
          title="FAQ: Industrierohrleitungsbau"
          lead="Wichtige Planungsaspekte für Chemieanlagen."
        />
        <DeepFAQ
          items={[
            {
              q: "Was muss ich bei Armaturen und Dichtungen beachten?",
              a: "Das Rohr selbst ist oft beständiger als die Elastomere (Dichtungen). Bei der Planung von Flanschverbindungen oder Kugelhähnen muss das Dichtungsmaterial (EPDM, FKM/Viton, PTFE) zwingend auf das chemische Medium abgestimmt werden."
            },
            {
              q: "Darf PP-R im ATEX-Bereich (Explosionsschutz) eingesetzt werden?",
              a: "Standard-PPR ist ein elektrischer Isolator und kann statische Ladungen aufbauen. Für ATEX-Zonen müssen spezielle, elektrisch leitfähige Kunststoffe verwendet oder entsprechende Erdungsmaßnahmen nach TRBS 2153 getroffen werden."
            },
            {
              q: "Warum schweißen statt kleben?",
              a: "Im Gegensatz zu PVC-U, das oft geklebt wird, wird PP-R thermisch verschweißt. Es gibt keinen Klebstoff, der von Lösungsmitteln ausgewaschen werden könnte. Die Schweißnaht besteht zu 100% aus dem Grundmaterial."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Technische Anfrage */}
      <Reveal>
        <CTABand
          title="Projekt-Check für Ihr Medium"
          subtitle="Die chemische Beständigkeit ist ein komplexes Zusammenspiel aus Medium, Konzentration, Temperatur und Betriebsdruck. Kontaktieren Sie unsere Anwendungstechnik für eine detaillierte Prüfung."
          buttonText="Labor & Technik kontaktieren"
          buttonLink="/ressourcen/support"
          icon={<TestTube className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
