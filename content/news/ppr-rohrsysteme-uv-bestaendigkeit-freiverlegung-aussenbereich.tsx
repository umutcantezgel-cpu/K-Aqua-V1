import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Sun, Shield, Layers, ThermometerSun } from "@/components/ui/icon";

export const uvBestaendigkeitFreiverlegung: NewsPost = {
  slug: "ppr-rohrsysteme-uv-bestaendigkeit-freiverlegung-aussenbereich",
  title: {
    de: "PPR Rohre & UV Beständigkeit",
    en: "PPR Pipes & UV Resistance",
    ar: "أنابيب PPR ومقاومة الأشعة فوق البنفسجية"
  },
  date: "2025-01-26",
  excerpt: {
    de: "PPR Rohrsysteme im Außenbereich: Erfahren Sie, warum UV Beständigkeit bei der Freiverlegung von Kühltürmen essenziell ist und wie K Aqua PPR Rohre geschützt werden.",
    en: "PPR Pipe Systems in Outdoor Areas: Learn why UV resistance is essential for exposed pipe installations of cooling towers and how K Aqua PPR pipes are protected.",
    ar: "أنظمة أنابيب PPR في الأماكن الخارجية: تعرف على سبب أهمية مقاومة الأشعة فوق البنفسجية عند التمديد المكشوف لأنابيب أبراج التبريد وكيف يتم حماية أنابيب K Aqua PPR."
  },
  coverImage: "/images/news/outdoor-pipes-sun.jpg",
  category: "Materialkunde & Einsatzgebiete",
  tags: ["UV Beständigkeit", "Freiverlegung", "Außenbereich", "Kühltürme", "Materialkunde", "Schutz"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <ParallaxHero 
        image="/images/news/outdoor-pipes-sun.jpg" 
        height="50vh"
        title="Schutz vor der Sonne"
        subtitle="Wie man PPR Rohre sicher auf dem Dach und an der Fassade verlegt."
      />

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sun className="w-5 h-5" />
                  <span>Außenbereich & Witterung</span>
                </div>
              }
              title="Der Feind aus dem All: Ultraviolette Strahlung"
              lead="Trinkwasser und Kühlwasserleitungen werden im Industrie und Gewerbebau oft im Freien verlegt – beispielsweise zur Anbindung von Kühltürmen auf dem Flachdach. Doch Standardkunststoffe wie Polypropylen (PP) haben eine natürliche Schwachstelle: UV Strahlung. Die energiereichen Strahlen der Sonne zerstören langfristig die Molekülketten des Kunststoffs, wenn das Rohr ungeschützt im Freien liegt."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* HorizontalTimeline: Der Degradationsprozess */}
      <Reveal>
        <SectionHead
          title="Was passiert bei ungeschützter UV Belastung?"
          lead="Der unsichtbare Zerstörungsprozess im Zeitraffer."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            events={[
              {
                year: "Phase 1: Photooxidation",
                title: "Molekülspaltung",
                description: "UV Strahlen dringen in die oberste Materialschicht ein und brechen durch ihre hohe Energie die C C und C H Bindungen des Polypropylens auf. Radikale entstehen."
              },
              {
                year: "Phase 2: Oberflächenveränderung",
                title: "Ausbleichen & Mikrorisse",
                description: "Das Rohr verliert seine ursprüngliche Farbe (meist grün). Die Oberfläche wird matt, rau und erste, mit dem bloßen Auge kaum sichtbare Mikrorisse bilden sich."
              },
              {
                year: "Phase 3: Materialermüdung",
                title: "Versprödung (Kreidung)",
                description: "Die obere Schicht zerfällt pulverartig (Kreidung). Das Material verliert seine Schlagzähigkeit und wird extrem spröde, bis es unter Druck nachgibt."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Schutzmaßnahmen */}
      <Reveal>
        <SectionHead
          title="Zuverlässige Schutzmaßnahmen"
          lead="So wird K Aqua PPR fit für die direkte Sonneneinstrahlung."
        />
        <BentoGrid
          items={[
            {
              title: "1. Vorisolierte Systeme mit PE Mantel",
              description: "Die absolute Premiumlösung. K Aqua Isopipe. Das PPR Mediumrohr wird mit PUR Schaum gedämmt und von einem schwarzen PE HD Mantelrohr umschlossen. Schwarzes PE HD ist durch die Zugabe von Ruß (Carbon Black) von Natur aus extrem UV beständig (bis zu 50 Jahre im Freien).",
              icon: <Layers className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "2. Aluminiumblechummantelung",
              description: "Das Standardrohr wird mit einer normalen Dämmung (z.B. Mineralwolle oder Kautschuk) versehen und anschließend mit einem dünnen Aluminiumblech verkleidet. Bietet perfekten UV und extremen mechanischen Schutz (z.B. gegen Vogelbiss).",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "3. UV Schutzanstrich / Lackierung",
              description: "Für blanke Rohre ohne Dämmung: Ein deckender, UV beständiger Lackanstrich schützt den Kunststoff. Wichtig: Der Anstrich muss intakt bleiben und bei Abblättern erneuert werden.",
              icon: <ThermometerSun className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zum Außenbereich */}
      <Reveal>
        <SectionHead
          title="FAQ: Freiverlegung"
          lead="Dach, Fassade und die Tücken der Natur."
        />
        <DeepFAQ
          items={[
            {
              q: "Sind schwarze Rohre generell UV beständig?",
              a: "Jein. Die Farbe Schwarz allein reicht nicht. Es muss spezieller Ruß (Carbon Black) molekular eingebunden sein, wie es bei PE HD (Polyethylen High Density) der Fall ist. Grünes K Aqua PPR benötigt in jedem Fall einen Außenschutz."
            },
            {
              q: "Wie lange darf K Aqua PPR ungeschützt auf der Baustelle in der Sonne lagern?",
              a: "Die Rohre sind werkseitig leicht UV stabilisiert, um Lagerung und Transport zu überstehen. Eine Lagerung im Freien in der prallen Sonne sollte jedoch 6 Monate nicht überschreiten. Abgedeckt (ohne Hitzestau!) ist eine längere Lagerung kein Problem."
            },
            {
              q: "Was muss ich bei der Längenausdehnung auf dem Dach beachten?",
              a: "Auf dem Dach (z.B. bei schwarzem Bitumen) herrschen im Sommer extrem hohe Umgebungstemperaturen (bis 70°C). Dadurch dehnt sich das Rohr massiv aus. Dies muss zwingend über Dehnungsbögen kompensiert werden."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: K Aqua Isopipe */}
      <Reveal>
        <CTABand
          title="Die All in One Lösung für Kühltürme"
          subtitle="Mit dem K Aqua Isopipe System erhalten Sie ein vorisoliertes Rohr, das gegen Hitze, Kälte und UV Strahlung gleichermaßen geschützt ist."
          buttonText="Mehr zu Isopipe erfahren"
          buttonLink="/produkte/pipes"
          icon={<Shield className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
