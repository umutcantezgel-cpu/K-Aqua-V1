import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Factory, Droplets, Leaf, TestTube } from "@/components/ui/icon";

export const umweltfreundlicheKuehlwasserleitungen: NewsPost = {
  slug: "umweltfreundliche-kuehlwasserleitungen-prozessindustrie-ppr-chemie",
  title: {
    de: "PPR-Kühlwasserleitungen für die Industrie",
    en: "PPR Cooling Water Pipes for the Industry",
    ar: "أنابيب مياه التبريد PPR للصناعة"
  },
  date: "2024-12-28",
  teaser: {
    de: "Verzichten Sie auf toxische Korrosionsinhibitoren: K Aqua PPR-Rohrsysteme ermöglichen ökologisch saubere, nachhaltige und wirtschaftliche Kühlkreisläufe für die Prozessindustrie.",
    en: "Eliminate toxic corrosion inhibitors: K Aqua PPR pipe systems enable ecologically clean, sustainable, and economical cooling circuits for the process industry.",
    ar: "تخلص من مثبطات التآكل السامة: أنظمة أنابيب K Aqua PPR تتيح دوائر تبريد نظيفة بيئيًا ومستدامة واقتصادية لصناعة المعالجة."
  },
  excerpt: {
    de: "Verzichten Sie auf toxische Korrosionsinhibitoren: K Aqua PPR-Rohrsysteme ermöglichen ökologisch saubere, nachhaltige und wirtschaftliche Kühlkreisläufe für die Prozessindustrie.",
    en: "Eliminate toxic corrosion inhibitors: K Aqua PPR pipe systems enable ecologically clean, sustainable, and economical cooling circuits for the process industry.",
    ar: "تخلص من مثبطات التآكل السامة: أنظمة أنابيب K Aqua PPR تتيح دوائر تبريد نظيفة بيئيًا ومستدامة واقتصادية لصناعة المعالجة."
  },
  coverImage: "/images/news/industrial-cooling-eco.jpg",
  category: "Industrie & Kälte",
  tags: ["Kühlwasser", "Prozessindustrie", "Umweltschutz", "Korrosion", "PP-R", "Green Tech"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Factory className="w-5 h-5" />
                  <span>Industriekühlung & Green Tech</span>
                </div>
              }
              title="Kühlen ohne chemische Keule"
              lead="In der Prozessindustrie, von der Chemie bis zur Lebensmittelfertigung, werden gigantische Mengen an Kühlwasser umgewälzt. Wenn diese Netze aus C-Stahl bestehen, muss das Wasser zwingend mit chemischen Inhibitoren behandelt werden, um das Rosten der Rohre von innen zu stoppen. Diese Zusätze sind teuer, wartungsintensiv und belasten die Umwelt. K Aqua PP-R bietet eine radikal einfache Lösung: Ein Material, das von Natur aus nicht rostet und chemikalienfrei betrieben werden kann."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Wasserfluss und Kühlung */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Vorteile für industrielle Kühlnetze */}
      <Reveal>
        <SectionHead
          title="Warum PP-R die Industriekühlung revolutioniert"
          lead="Ökologische und physikalische Vorteile für offene und geschlossene Kühlkreisläufe."
        />
        <BentoGrid
          items={[
            {
              title: "Keine toxischen Inhibitoren",
              description: "Da Kunststoffrohre immun gegen elektrochemische Korrosion sind, benötigt das Kühlwasser keine schützenden, umweltschädlichen Chemikalien-Cocktails mehr.",
              icon: <Leaf className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Extreme Chemikalienbeständigkeit",
              description: "Selbst wenn das Kühlwasser durch industrielle Prozesse leicht sauer oder alkalisch wird, bleibt K Aqua PP-R chemisch stabil und zersetzt sich nicht.",
              icon: <TestTube className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Weniger Schwitzwasser",
              description: "Der natürliche Isolationswert (geringe Wärmeleitfähigkeit) von PP-R reduziert die Kondensatbildung an der Rohraußenseite deutlich im Vergleich zu ungedämmtem Metall.",
              icon: <Droplets className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Kühlwasser-Kreisläufe im Vergleich */}
      <Reveal>
        <SectionHead
          title="Kühlrohr-Materialien im Stresstest"
          lead="Ein direkter Vergleich der Anforderungen im industriellen Dauerbetrieb."
        />
        <DeepMatrix
          data={[
            ["Anforderung", "K Aqua PP-R", "C-Stahl", "Edelstahl"],
            ["Bedarf an Inhibitoren", "Null (Chemikalienfrei)", "Zwingend erforderlich", "Gering (Chloride kritisch)"],
            ["Kondensat-Risiko (ungedämmt)", "Geringer (Eigenisolation)", "Sehr hoch", "Sehr hoch"],
            ["Anfälligkeit für Biofouling", "Gering (glatte Oberfläche)", "Hoch (raue Korrosionsstellen)", "Gering"],
            ["Gewicht bei Montage", "Sehr leicht", "Sehr schwer", "Schwer"]
          ]}
        />
      </Reveal>

      {/* Stagger: Ökologische und ökonomische Gewinne */}
      <Reveal>
        <SectionHead
          title="Gewinne für Budget und Umwelt"
          lead="Der Verzicht auf Metallrohre vereinfacht das gesamte Wassermanagement."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Einfacheres Abwassermanagement",
                description: "Kühlwasser, das frei von toxischen Rostschutzmitteln ist, kann am Ende seiner Nutzungsdauer wesentlich einfacher und kostengünstiger geklärt oder in den natürlichen Wasserkreislauf (unter Einhaltung lokaler Vorschriften) zurückgeführt werden."
              },
              {
                title: "2. Verringerte Wartungskosten",
                description: "Die aufwendige Zudosierung und ständige laboranalytische Überwachung der Inhibitoren-Konzentration im Wasser entfällt. Die Anlage läuft störungsfreier und autarker."
              },
              {
                title: "3. Vermeidung von Biofouling",
                description: "In offenen Kühlturmsystemen können sich Algen und Bakterien bilden. Diese setzen sich besonders gern an rauen, korrodierten Metallflächen fest. Die dauerhaft glatte PP-R Innenwand erschwert das Festsetzen von Biofilmen maßgeblich."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Umwelt-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Benötigte Menge an umweltbelastenden Korrosionsinhibitoren im Kühlwasser." },
              { n: "100", u: "%", l: "Recycelbarkeit des reinen PP-R Materials am Ende seines Lebenszyklus." },
              { n: "pH", u: " 1-14", l: "Hohe Toleranzgrenze gegenüber schwankenden Wasserqualitäten in der Industrie." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Green Industry Support */}
      <Reveal>
        <CTABand
          title="Machen Sie Ihre Prozesskühlung umweltfreundlich"
          subtitle="Senken Sie Betriebskosten und schonen Sie die Umwelt. Sprechen Sie mit unseren Industrie-Experten über den Umstieg auf K Aqua PP-R."
          buttonText="Industrieberatung anfordern"
          buttonLink="/kontakt"
          icon={<Factory className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
