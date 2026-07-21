import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Anchor, Waves, Shield, Globe } from "@/components/ui/icon";

export const schiffbauOffshore: NewsPost = {
  slug: "schiffbau-offshore-rohrleitungen-salzwasser-ppr",
  title: {
    de: "Schiffbau & Offshore: PP-R Rohrsysteme",
    en: "Shipbuilding & Offshore: PP-R Pipe Systems",
    ar: "بناء السفن والمنصات البحرية: أنظمة أنابيب PP-R"
  },
  date: "2024-08-25",
  teaser: {
    de: "Salzwasser ist der ultimative Härtetest für jedes Material: Entdecken Sie, warum K-Aqua PP-R Rohrsysteme im Schiffbau und Offshore-Bereich schwere CuNiFe-Leitungen ersetzen, Gewicht einsparen und absolute Wartungsfreiheit garantieren.",
    en: "Saltwater is the ultimate endurance test for any material: Discover why K-Aqua PP-R piping systems are replacing heavy CuNiFe pipes in the shipbuilding and offshore sectors, saving weight and guaranteeing absolute maintenance-free operation.",
    ar: "المياه المالحة هي اختبار التحمل النهائي لأي مادة: اكتشف لماذا تحل أنظمة أنابيب K-Aqua PP-R محل أنابيب CuNiFe الثقيلة في قطاعات بناء السفن والمنصات البحرية، مما يوفر الوزن ويضمن تشغيلاً خالياً تماماً من الصيانة."
  },
  excerpt: {
    de: "Salzwasser ist der ultimative Härtetest für jedes Material: Entdecken Sie, warum K-Aqua PP-R Rohrsysteme im Schiffbau und Offshore-Bereich schwere CuNiFe-Leitungen ersetzen, Gewicht einsparen und absolute Wartungsfreiheit garantieren.",
    en: "Saltwater is the ultimate endurance test for any material: Discover why K-Aqua PP-R piping systems are replacing heavy CuNiFe pipes in the shipbuilding and offshore sectors, saving weight and guaranteeing absolute maintenance-free operation.",
    ar: "المياه المالحة هي اختبار التحمل النهائي لأي مادة: اكتشف لماذا تحل أنظمة أنابيب K-Aqua PP-R محل أنابيب CuNiFe الثقيلة في قطاعات بناء السفن والمنصات البحرية، مما يوفر الوزن ويضمن تشغيلاً خالياً تماماً من الصيانة."
  },
  coverImage: "/images/news/ship-offshore.jpg",
  category: "Industrie",
  tags: ["Schiffbau", "Offshore", "Salzwasser", "Marine", "PP-R", "DNV"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit ParallaxHero */}
      <Reveal>
        <ParallaxHero
          imageSrc="/images/news/ship-offshore.jpg"
          title="Der ultimative Korrosionsschutz auf hoher See"
          subtitle="Maritime Einsatzbedingungen verzeihen keine Schwächen. Aggressives Salzwasser zersetzt unbehandelte Metalle innerhalb kürzester Zeit. K Aqua PP-R und PP-RCT Rohrsysteme sind zu 100 % seewasserresistent und bieten eine revolutionäre Alternative zu schweren CuNiFe-Leitungen."
          badge="Marine & Offshore"
          align="left"
        />
      </Reveal>

      {/* GlossaryGrid: Maritime Einsatzbereiche */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Einsatzbereiche an Bord"
            items={[
              {
                term: "Ballastwassersysteme",
                definition: "Ballastwasser wird oft chemisch oder mit UV-Licht behandelt, um Mikroorganismen abzutöten. PP-R ist resistent gegen Seewasser und die zur Reinigung eingesetzten Chemikalien.",
                icon: <Waves className="w-6 h-6" />
              },
              {
                term: "Kühlwassersysteme",
                definition: "Viele Schiffe nutzen Seewasser zur Motorkühlung. Während Stahlrohre von innen durch Pitting korrodieren, bleibt das Kunststoffrohr dauerhaft intakt und glatt.",
                icon: <Anchor className="w-6 h-6" />
              },
              {
                term: "Grau- & Schwarzwasser",
                definition: "Abwassersysteme auf Kreuzfahrtschiffen und Yachten erfordern absolute Dichtheit und Geruchsneutralität. Die vollflächig verschweißten Verbindungen von K Aqua garantieren dies.",
                icon: <Shield className="w-6 h-6" />
              },
              {
                term: "Frischwasser",
                definition: "Die Versorgung der Crew und Passagiere mit sauberem Trinkwasser. PP-R gibt weder Geschmack noch Geruch ab und erfüllt strengste hygienische Standards.",
                icon: <Globe className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      <SectionDivider />

      {/* StatBand: Gewicht und Wartung */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "75", u: "%", l: "Leichter als Stahlrohre – erhöht die Zuladungskapazität." },
              { n: "0", l: "Aufwand für nachträglichen Korrosionsschutz oder Innenbeschichtung." },
              { n: "50", u: "+", l: "Jahre erwartete Lebensdauer im maritimen Dauerbetrieb." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Maritime Zulassungen */}
      <Reveal>
        <DeepFAQ
          items={[
            {
              q: "Verfügt K Aqua über maritime Klassifizierungen?",
              a: "Rohrsysteme im Schiffbau müssen strengsten Normen genügen. Produkte aus PP-R und PP-RCT können für spezifische Anwendungen nach den Regularien von DNV, RINA, ABS oder Lloyd's Register qualifiziert werden."
            },
            {
              q: "Wie verhält sich Kunststoff bei Schiffsvibrationen?",
              a: "Im Gegensatz zu starren metallischen Leitungen verfügt Kunststoff über eine hohe Eigendämpfung. Maschinenvibrationen werden absorbiert und nicht in Form von Körperschall auf die Schiffsstruktur übertragen."
            },
            {
              q: "Ist Kunststoff bei Feuer an Bord nicht gefährlich?",
              a: "Für Bereiche mit erhöhten Brandschutzanforderungen (z.B. Maschinenräume) existieren strenge Vorgaben. Hier kommen spezielle Brandschutzmanschetten zum Einsatz oder das Rohr wird durch wassergefüllte Systeme geschützt, gemäß den IMO-Richtlinien."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Marine-Beratung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Werft-Projekt?"
          subtitle="Reduzieren Sie das Gewicht Ihres Schiffes und eliminieren Sie Korrosionsprobleme dauerhaft."
          buttonText="Marine-Spezialisten kontaktieren"
          buttonLink="/kontakt"
          icon={<Anchor className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
