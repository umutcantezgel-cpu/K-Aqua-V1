import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Waves, Activity, Thermometer, Shield } from "@/components/ui/icon";

export const sportstaettenSchwimmbaeder: NewsPost = {
  slug: "sportstaetten-schwimmbaeder-chlorwasser-heizung-ppr",
  title: {
    de: "PPR Rohre in Sportstätten & Schwimmbädern",
    en: "PPR Pipes in Sports Facilities & Swimming Pools",
    ar: "أنابيب PPR في المرافق الرياضية وحمامات السباحة"
  },
  date: "2024-10-28",
  excerpt: {
    de: "Hallenbäder, Schwimmbäder und Stadien stellen extrem korrosive Umgebungen dar. Erfahren Sie, warum PPR Rohrsysteme von K Aqua absolut resistent gegen Chlorwasser, Ozon und feuchte Luft sind und sich optimal für Bädertechnik sowie Rasenheizung eignen.",
    en: "Indoor pools, swimming pools, and stadiums present extremely corrosive environments. Discover why K Aqua PPR pipe systems are completely resistant to chlorinated water, ozone, and humid air, making them ideal for pool technology and pitch heating.",
    ar: "تمثل المسابح الداخلية وحمامات السباحة والملاعب بيئات شديدة التآكل. اكتشف لماذا تعتبر أنظمة أنابيب PPR من K Aqua مقاومة تمامًا للمياه المكلورة والأوزون والهواء الرطب، مما يجعلها مثالية لتقنيات حمامات السباحة وتدفئة الملاعب."
  },
  coverImage: "/images/news/swimming-pool.jpg",
  category: "Freizeitanlagen",
  tags: ["Schwimmbad", "Sportstätte", "Chlorwasser", "Rasenheizung", "PPR", "Korrosion", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Waves className="w-5 h-5" />
                  <span>Bädertechnik & Sportanlagen mit PPR Rohrsystemen</span>
                </div>
              }
              title="Absoluter Schutz vor Chlor und Korrosion: PPR Rohrsysteme in der Bädertechnik"
              lead="Die Luft in einem Hallenbad ist warm, extrem feucht und voller Chlorid-Ionen. Unter diesen Bedingungen beginnen ungeschützte Metalle bereits nach kurzer Zeit von außen zu rosten. Im Inneren der Rohre greifen aggressive Desinfektionsmittel wie Chlor oder Ozon das Material an. K Aqua PPR ist die chemisch inerte Lösung für eine lebenslange, wartungsfreie Infrastruktur in Sportstätten und Freizeitanlagen."
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Die Herausforderung durch korrosive Medien in der Bädertechnik</h2>
          <p>
            Öffentliche Schwimmbäder, Thermen und professionelle Sportanlagen stellen die wohl anspruchsvollsten Umgebungen für die technische Gebäudeausrüstung (TGA) dar. Die Wasseraufbereitung erfordert den ständigen Einsatz von stark oxidierenden Chemikalien, um Bakterien, Viren und Pilze zuverlässig abzutöten. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Chlor, Ozon und Brom im Beckenwasser</h3>
          <p>
            Standardmäßig wird Schwimmbadwasser mit Chlorverbindungen desinfiziert. In modernen Anlagen kommen zunehmend auch Ozonierungsanlagen oder Brom zum Einsatz, da sie eine noch stärkere Oxidationskraft besitzen und den typischen &quot;Hallenbadgeruch&quot; reduzieren. Diese aggressiven Medien sind jedoch der Feind Nummer eins für metallische Rohrleitungen. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Lochfraßkorrosion bei Metallen</h3>
          <p>
            Kupferrohre und selbst hochwertige Edelstahlsysteme stoßen in chloridhaltigen Umgebungen an ihre physikalischen Grenzen. Die Chlorid-Ionen durchdringen die schützende Passivschicht der Metalle und verursachen punktuelle, schwer erkennbare Lochfraßkorrosion (Pitting). Die Folge sind schleichende Leckagen, extrem teure Sanierungen und der unfreiwillige Stillstand des Badebetriebs. Auch von außen sind die Rohre bedroht: Die feucht-warme, chlorhaltige Raumluft in Technikzentralen führt zu rascher Außenkorrosion.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">PP-R als chemisch inerter Werkstoff</h2>
          <p>
            Polypropylen Random Copolymer (PP-R) verhält sich gegenüber diesen Herausforderungen völlig unbeeindruckt. Als Kunststoff ist es von Natur aus zu 100 % korrosionsfrei. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Molekulare Beständigkeit gegen Oxidationsmittel</h3>
          <p>
            K Aqua PP-R Systeme widerstehen den in der Schwimmbadtechnik üblichen Konzentrationen von Chlor, Ozon und Sole (Salzwasser) dauerhaft. Das Material versprödet nicht, rostet nicht und baut sich chemisch nicht ab. Weder im Inneren der wasserführenden Rohre noch an der Oberfläche im Technikraum. Die Investition in PP-R bedeutet eine garantierte Betriebslebensdauer ohne materialbedingte Rohrbrüche.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Einsatzgebiete in Sportstätten</h2>
          <p>
            Die Vielseitigkeit von PP-R macht es zum idealen Werkstoff für nahezu alle Gewerke innerhalb einer Sportstätte.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Schwimmbadtechnik und große Nennweiten</h3>
          <p>
            Für die Umwälzung großer Wassermengen zwischen Becken und Filteranlagen werden gewaltige Rohrquerschnitte benötigt. K Aqua bietet Rohre und Fittings in Dimensionen bis zu 355 mm und mehr. Dank des relativ geringen Gewichts lassen sich diese Großrohre wesentlich einfacher im engen Technikraum installieren als schwere Guss- oder Stahlrohre.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Rasenheizungen und Geothermie in Stadien</h3>
          <p>
            In professionellen Fußballstadien sorgt die Rasenheizung für einen eisfreien Untergrund im Winter. Die Verteilerleitungen verlaufen im Erdreich. PP-R ist die perfekte Wahl: Es verrottet nicht im feuchten Boden, ist extrem widerstandsfähig gegen Druck und die homogen geschweißten Verbindungen garantieren absolute Dichtheit unter der Spielfläche.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Sanitäranlagen und Legionellenprävention</h3>
          <p>
            Die Duschräume in Sporthallen werden intensiv genutzt. Um Legionellenbildung vorzubeugen, muss das Warmwassernetz regelmäßig thermisch desinfiziert (über 70 °C gespült) werden. PP-R hält diesen hohen Temperaturen problemlos stand und bietet durch seine mikroskopisch glatte Innenwand Bakterien keine Chance, Biofilme zu bilden.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Hydraulische Effizienz und Pumpenstrom</h2>
          <p>
            Die Betriebskosten (OPEX) eines Hallenbades werden maßgeblich von den permanent laufenden Umwälzpumpen bestimmt. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Strömungsoptimierung durch geringe Rohrreibung</h3>
          <p>
            Metallrohre neigen zur Inkrustation – Kalk und Rost verengen den Querschnitt und erhöhen die Oberflächenreibung (Rauigkeit). Die Pumpen müssen immer mehr Strom verbrauchen, um die gleiche Wassermenge zu fördern. PP-R hat eine extrem glatte Rohrinnenwand (k = 0,007 mm), die über 50 Jahre Betriebszeit unverändert glatt bleibt. Druckverluste werden minimiert, und die Energiekosten der Umwälzpumpen bleiben konstant auf dem niedrigsten Niveau. Ein massiver wirtschaftlicher Vorteil für Kommunen und private Betreiber.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "24", u: "/7", l: "Dauerbetrieb der Filter und Umwälzpumpen effizient realisiert" },
              { n: "0", l: "Risiko von Lochfraßkorrosion durch Chlorid-Ionen" },
              { n: "50", u: "+", l: "Jahre kalkulierte Nutzungsdauer für kommunale Sportstätten" }
            ]}
          />
        </div>
      </Reveal>
    </div>
  ),
};
