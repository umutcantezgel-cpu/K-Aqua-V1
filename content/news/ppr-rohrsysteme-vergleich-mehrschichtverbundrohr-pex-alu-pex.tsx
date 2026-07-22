import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Droplet, AlertTriangle, Scale, Activity } from "@/components/ui/icon";

export const pprMehrschichtverbundrohrVergleich: NewsPost = {
  slug: "ppr-rohrsysteme-vergleich-mehrschichtverbundrohr-pex-alu-pex",
  title: {
    de: "PPR-Rohre vs. Mehrschichtverbundrohr",
    en: "PPR Pipes vs. Multilayer Composite Pipes",
    ar: "أنابيب البولي بروبيلين العشوائي (PPR) مقابل الأنابيب المركبة متعددة الطبقات"
  },
  date: "2025-01-23",
  excerpt: {
    de: "PPR-Rohrsysteme im Systemvergleich mit Mehrschichtverbundrohr (PEX/Alu-PEX): Warum Schmelzschweißen bei Hygiene, Langlebigkeit und Durchfluss klar überlegen ist.",
    en: "A system comparison of PPR pipe systems with multilayer composite pipes (PEX/Alu-PEX): Why fusion welding is clearly superior in terms of hygiene, longevity, and flow rate.",
    ar: "مقارنة بين أنظمة أنابيب PPR والأنابيب المركبة متعددة الطبقات (PEX/Alu-PEX): لماذا يعتبر اللحام بالانصهار متفوقًا بوضوح من حيث النظافة، وطول العمر الافتراضي، ومعدل التدفق."
  },
  coverImage: "/images/news/ppr-vs-pex.jpg",
  category: "Materialkunde & Vergleiche",
  tags: ["Vergleich", "Mehrschichtverbundrohr", "PEX", "Aluverbundrohr", "Materialkunde"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <ParallaxHero 
        image="/images/news/ppr-vs-pex.jpg" 
        height="50vh"
        title="Schweißen oder Pressen?"
        subtitle="Ein Systementscheid mit jahrzehntelangen Folgen für Ihr Gebäude."
      />

      {/* Intro */}
      <Reveal>
        <SectionHead
          title="Der ewige Kampf der Installationssysteme"
          lead="In der modernen Trinkwasser- und Heizungsinstallation dominieren heute Kunststoffsysteme. Die beiden mit Abstand am häufigsten eingesetzten Varianten sind homogene PP-R Rohrsysteme (Polypropylen Random Copolymer) und Mehrschichtverbundrohre (oft PEX/Alu/PEX). Auf den ersten Blick scheinen beide ähnlich, doch technologisch trennen sie Welten – besonders bei der Verbindungstechnik."
        />
      </Reveal>

      {/* HorizontalTimeline: Evolution */}
      <Reveal>
        <SectionHead
          title="Eine kurze Historie der Rohrleitungen"
          lead="Wie wir von Blei zu High-Tech-Kunststoffen kamen."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            events={[
              {
                year: "1970er",
                title: "Vernetztes Polyethylen (PEX)",
                description: "Erste flexible Kunststoffrohre für Fußbodenheizungen. Problem: Keine Sauerstoffdichtheit, hohe Längenausdehnung."
              },
              {
                year: "1980er",
                title: "Mehrschichtverbundrohr (Aluverbund)",
                description: "Einbau einer Aluminiumschicht in PEX-Rohre (PEX-Alu-PEX). Die Rohre wurden formstabil und sauerstoffdicht. Verbindung: Pressfitting mit O-Ring."
              },
              {
                year: "1990er bis heute",
                title: "Co-extrudiertes PP-R / PP-RCT",
                description: "Entwicklung homogener Vollkunststoffsysteme. Mittelschicht mit Glasfaser reduziert die Ausdehnung. Verbindung: Homogenes Schmelzschweißen ohne Dichtung."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Technischer Systemvergleich */}
      <Reveal>
        <SectionHead
          title="Der harte Systemvergleich"
          lead="Faktenbasierte Gegenüberstellung der beiden führenden Kunststofftechnologien."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "K Aqua PP-R (Vollkunststoff)", "Mehrschichtverbundrohr (PEX/Alu)"],
            ["Verbindungstechnik", "Polyfusion (Verschmelzen, stoffschlüssig)", "Pressen (mechanisch verpresst)"],
            ["Dichtelemente", "Keine O-Ringe (100% homogen)", "Zwingend O-Ringe (EPDM o.ä.) erforderlich"],
            ["Querschnittsverengung", "Nein (Voller Innendurchmesser bleibt erhalten)", "Ja (Fitting wird in das Rohr gesteckt)"],
            ["Material Fitting", "Gleiches Material wie das Rohr (PP-R)", "Meist Messing oder PPSU (Materialmix)"],
            ["Dimensionen", "Von DN 20 bis DN 250 (Großrohre möglich)", "Meist limitiert auf kleine bis mittlere DN (bis max. 110)"],
            ["Recycling", "100% sortenrein recycelbar", "Schwer recycelbar (Alu und PEX untrennbar verklebt)"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Die Schwachstellen beim Pressen */}
      <Reveal>
        <SectionHead
          title="Warum Pressfittings Probleme machen können"
          lead="Die mechanische Verbindung birgt bauartbedingte Risiken, die beim Schweißen nicht existieren."
        />
        <BentoGrid
          items={[
            {
              title: "Druckverlust durch Querschnittsverengung",
              description: "Da der Pressfitting (Stützkörper) in das Rohr hineingesteckt wird, verengt sich der Leitungsquerschnitt an jeder Verbindung erheblich. Dies erhöht den Druckverlust, erfordert stärkere Pumpen und erhöht die Fließgeräusche.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Das Risiko der O-Ringe",
              description: "Gummidichtungen (O-Ringe) altern. Sie können durch Chlor im Trinkwasser, hohe Temperaturen oder scharfe Rohrkanten beim Einstecken beschädigt werden. Eine verschweißte PP-R Verbindung altert nicht in dieser Form.",
              icon: <AlertTriangle className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Hygiene-Risiko Totraum",
              description: "Hinter dem O-Ring und der Einsteckhülse entstehen mikroskopische Toträume, in denen Wasser steht. Hier können sich Biofilme bilden (Legionellengefahr). Die PP-R Verschmelzung ist dagegen völlig glatt und spaltenfrei.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen von Planern */}
      <Reveal>
        <SectionHead
          title="FAQ: Systementscheidung"
          lead="Typische Bedenken bei der Umstellung von Press- auf Schweißsysteme."
        />
        <DeepFAQ
          items={[
            {
              q: "Ist das Schweißen nicht viel langsamer als das Pressen?",
              a: "Bei kleinen Dimensionen (bis DN 32) ist das Pressen minimal schneller. Ab DN 40 gleicht sich die Zeit an. Ab DN 63 ist das Schweißen deutlich schneller und vor allem massiv günstiger, da große Pressfittings aus Messing extrem teuer sind."
            },
            {
              q: "Warum ist PP-R bei großen Gebäuden (Krankenhäuser, Hotels) beliebter?",
              a: "Weil K Aqua Rohre bis in Dimensionen von 250 mm (und größer) verfügbar sind. Man kann das komplette Gebäude, von der Hauptverteilung im Keller bis zur letzten Zapfstelle, im selben homogenen Material installieren. Bei Verbundrohren muss man für große Dimensionen oft auf Edelstahl ausweichen."
            },
            {
              q: "Sind PP-R Rohre diffusionsdicht?",
              a: "Standard-PP-R ist leicht sauerstoffdurchlässig (wie jedes Monokunststoffrohr). Für geschlossene Heizungssysteme bietet K Aqua jedoch spezielle, sauerstoffdichte PP-R Rohre mit einer Diffusionssperrschicht (z.B. aus EVOH) an, die die DIN 4726 erfüllen."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Wechseln Sie das System */}
      <Reveal>
        <CTABand
          title="Bereit für den Wechsel zum Vollkunststoff?"
          subtitle="Verzichten Sie auf teure Messingfittings, riskante O-Ringe und Druckverluste. Wir beraten Sie gerne zur Umstellung Ihrer nächsten Projekte auf K Aqua PP-R."
          buttonText="Projektberatung anfordern"
          buttonLink="/kontakt"
          icon={<Scale className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
