import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Zap, Shield, Activity, Wrench } from "@/components/ui/icon";

export const wasserstoffH2Ready: NewsPost = {
  slug: "wasserstoff-h2-ready-kunststoffrohre-ppr",
  title: {
    de: "Wasserstoff (H2) & PPR: H2 Ready?",
    en: "Hydrogen (H2) & PPR: H2 Ready?",
    ar: "الهيدروجين (H2) و PPR: هل هو جاهز للهيدروجين؟"
  },
  date: "2024-10-02",
  teaser: {
    de: "Wasserstoff stellt extreme physikalische Anforderungen an moderne Rohrleitungssysteme. Erfahren Sie, warum hochwertige PPR Kunststoffrohre immun gegen Wasserstoffversprödung sind und sich ideal für H2 Niederdrucknetze eignen.",
    en: "Hydrogen imposes extreme physical demands on modern piping systems. Discover why high quality PPR plastic pipes are immune to hydrogen embrittlement and are ideal for low pressure H2 networks.",
    ar: "يفرض الهيدروجين متطلبات فيزيائية قصوى على أنظمة الأنابيب الحديثة. اكتشف لماذا تعتبر أنابيب البلاستيك PPR عالية الجودة محصنة ضد التقصف الهيدروجيني ومثالية لشبكات الهيدروجين منخفضة الضغط."
  },
  excerpt: {
    de: "Wasserstoff stellt extreme physikalische Anforderungen an moderne Rohrleitungssysteme. Erfahren Sie, warum hochwertige PPR Kunststoffrohre immun gegen Wasserstoffversprödung sind und sich ideal für H2 Niederdrucknetze eignen.",
    en: "Hydrogen imposes extreme physical demands on modern piping systems. Discover why high quality PPR plastic pipes are immune to hydrogen embrittlement and are ideal for low pressure H2 networks.",
    ar: "يفرض الهيدروجين متطلبات فيزيائية قصوى على أنظمة الأنابيب الحديثة. اكتشف لماذا تعتبر أنابيب البلاستيك PPR عالية الجودة محصنة ضد التقصف الهيدروجيني ومثالية لشبكات الهيدروجين منخفضة الضغط."
  },
  coverImage: "/images/news/hydrogen-future.jpg",
  category: "Future Energy",
  tags: ["Wasserstoff", "H2 Ready", "Future Energy", "PPR", "Versprödung", "Permeation"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Zap className="w-5 h-5" />
                  <span>Future Energy</span>
                </div>
              }
              title="Die H2 Herausforderung im Rohrleitungsbau"
              lead="Der Umstieg auf Wasserstoff (H2) ist der Schlüssel zur Energiewende. Doch H2 ist das kleinste aller Moleküle. Es diffundiert durch Dichtungen, entweicht durch kleinste Lecks und zerstört die molekulare Struktur von hochfestem Stahl. Sind PPR und PPRCT Rohre von K Aqua die Lösung für H2 Niederdruckanwendungen?"
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Future Tech */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StickyScrollReveal: Physikalische Herausforderungen */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Das kleinste Molekül",
                description: "Wasserstoff hat eine extrem geringe molekulare Größe. Die Permeation (das langsame Hindurchdiffundieren durch die Rohrwand) ist bei Gasen ein physikalischer Fakt. Kunststoffrohre müssen für H2 Netze exakt auf zulässige Permeationsraten geprüft werden.",
                icon: <Activity className="w-8 h-8 text-primary" />
              },
              {
                title: "Gefahr der Versprödung",
                description: "Bei Stahlrohren dringt Wasserstoff in das Metallgitter ein, rekombiniert zu Molekülen und erzeugt Mikrorisse (Wasserstoffversprödung). PPR Kunststoff ist chemisch völlig anders aufgebaut und gegen diesen Effekt zu 100 % immun.",
                icon: <Shield className="w-8 h-8 text-primary" />
              },
              {
                title: "Homogene Verbindungen",
                description: "Mechanische Fittings mit Elastomer O Ringen (wie bei Presssystemen) sind die größte Schwachstelle für H2 Leckagen. Die vollflächige Verschweißung von K Aqua PPR Rohren eliminiert diese Gefahr komplett.",
                icon: <Wrench className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: PPR im H2-Test */}
      <Reveal>
        <SectionHead
          title="Warum PPR Kunststoffrohre für H2 Niederdrucknetze ideal sind"
          lead="Forschung, Materialprüfungen und innovative Rohrsysteme für die nachhaltige H2 Energieinfrastruktur von morgen."
        />
        <BentoGrid
          items={[
            {
              title: "Keine Wasserstoffversprödung",
              description: "Die stabile Polymermatrix von hochwertigen PPR Kunststoffrohren wird von gasförmigem Wasserstoff chemisch nicht angegriffen und verhindert Gefügeversprödungen vollständig.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Dichtheit durch Homogenes Schweißen",
              description: "Die stoffschlüssige Heizelementmuffenschweißung schafft ein vollkommen homogenes, unlösbares PPR Rohrsystem ohne anfällige mechanische Dichtungen oder O Ringe.",
              icon: <Zap className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Flexible Verlegung & Hohe Lebensdauer",
              description: "PPR Rohre zeichnen sich durch ein geringes Gewicht sowie flexible Verlegemöglichkeiten aus und eignen sich hervorragend für dezentrale H2 Elektrolyseur Peripherien.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Materialvergleich für Wasserstoff */}
      <Reveal>
        <div className="my-12">
          <SectionHead
            title="Materialvergleich für WasserstoffRohrleitungen"
            lead="Ein technologischer Vergleich verschiedener Werkstoffe und Rohrsysteme im direkten Kontakt mit gasförmigem Wasserstoff."
          />
          <DeepMatrix
            data={[
              ["Material", "Anfälligkeit für H2 Versprödung", "Schwächster Punkt (Leckagegefahr)", "H2 Niederdruck Eignung"],
              ["K Aqua PPR", "Keine", "Extrem gering (Voll verschweißt)", "Sehr gut"],
              ["Stahl (hochfest)", "Sehr hoch", "Schweißnähte, Mikrorisse", "Kritisch"],
              ["Kupfer", "Gering", "Lötstellen, Press O Ringe", "Bedingt (O Ringe problematisch)"],
              ["Mehrschichtverbund (PEX/Alu)", "Keine", "Pressfittings mit O Ringen", "Bedingt (O Ringe problematisch)"]
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Future Energy Facts */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Risiko einer strukturellen Wasserstoffversprödung bei Polypropylen." },
              { n: "100", u: "%", l: "Stoffschlüssige Verbindungen ohne anfällige ElastomerDichtungen." },
              { n: "H2", l: "Ready für Pilotprojekte in der dezentralen Energieverteilung." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Technische Evaluierung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Pilotprojekt mit Wasserstoff?"
          subtitle="Die Beimischung von H2 ins Gasnetz oder dezentrale Elektrolyseure erfordern präzise Planung. Kontaktieren Sie unsere Ingenieure für eine technische Evaluierung."
          buttonText="Engineering Support kontaktieren"
          buttonLink="/kontakt"
          icon={<Zap className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
