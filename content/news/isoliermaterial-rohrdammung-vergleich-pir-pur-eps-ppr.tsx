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
    de: "Rohrdämmung im Vergleich: PIR, PUR und EPS bei PPR-Rohren",
    en: "Pipe Insulation Comparison: PIR, PUR and EPS",
    ar: "مقارنة عزل الأنابيب: PIR، وPUR، وEPS"
  },
  date: "2025-01-21",
  excerpt: {
    de: "Wer Energieverluste minimieren und Kondensation verhindern will, kommt an der richtigen Rohrdämmung nicht vorbei. Ein technischer Vergleich von PIR, PUR und EPS Dämmstoffen für PPR-Rohrsysteme in der modernen Gebäudetechnik.",
    en: "To minimize energy loss and prevent condensation, choosing the right pipe insulation is essential. A technical comparison of PIR, PUR, and EPS insulation materials for PPR pipe systems.",
    ar: "لتقليل فقدان الطاقة ومنع التكثف، يعد اختيار عزل الأنابيب المناسب أمراً ضرورياً. مقارنة فنية لمواد العزل PIR وPUR وEPS لأنظمة أنابيب PPR."
  },
  coverImage: "/images/news/insulation-materials-comparison.jpg",
  category: "Verarbeitung & Montage",
  tags: ["Isolierung", "PIR", "PUR", "EPS", "Wärmeschutz", "Fernwärme", "Kältetechnik", "Gebäudeenergiegesetz"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

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
              title="Der unsichtbare Schutzmantel für Rohrleitungen"
              lead="PPR Rohre besitzen von Natur aus eine hervorragende eigene Isolationswirkung (niedrige Wärmeleitfähigkeit von 0,24 W/mK). Dennoch ist bei extremen Temperaturdifferenzen – sei es beim Transport von Fernwärme (+90°C) oder von Kaltwasser für Klimakühldecken (+6°C) – eine zusätzliche äußere Dämmung unerlässlich, um Energieverluste zu minimieren und gefährliches Tauwasser (Kondensat) an der Rohroberfläche zu verhindern."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Extended Text Section for SEO > 500 words */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground mb-4">Warum ist die Rohrdämmung bei PPR-Systemen so kritisch?</h2>
          <p className="mb-4">
            Die Wahl des richtigen Isolationsmaterials für Rohrleitungssysteme ist eine der wichtigsten Entscheidungen in der modernen Technischen Gebäudeausrüstung (TGA). Obwohl Polypropylen (PPR) aufgrund seiner molekularen Struktur bereits hervorragende thermodynamische Eigenschaften und eine weitaus geringere Wärmeleitfähigkeit als metallische Rohre (wie Kupfer oder Stahl) aufweist, unterliegen auch Kunststoffrohrnetze strengen gesetzlichen Vorgaben, wie dem Gebäudeenergiegesetz (GEG) in Deutschland. 
          </p>
          <p className="mb-4">
            Diese Vorschriften zielen darauf ab, den Energieverbrauch von Gebäuden drastisch zu senken. Die Dämmung hat hierbei zwei primäre Aufgaben: Bei warmgehenden Leitungen (Heizung, Trinkwasser warm) verhindert sie den Wärmeverlust an die Umgebung. Jeder ungenutzte Wärmeverlust auf dem Weg vom Wärmeerzeuger zum Verbraucher stellt pure Energieverschwendung dar und erhöht die Betriebskosten der Anlage. Bei kaltgehenden Leitungen (Trinkwasser kalt, Kühlwasser für Klimaanlagen) schützt die Dämmung das System vor Erwärmung durch die Umgebungstemperatur und, noch viel wichtiger, vor der Bildung von Kondenswasser.
          </p>
          <h3 className="text-xl font-semibold text-foreground mb-3">Die physikalische Gefahr der Kondensatbildung</h3>
          <p className="mb-4">
            Kondensat, also Schwitzwasser, entsteht immer dann, wenn die Oberflächentemperatur eines Rohres den Taupunkt der umgebenden Raumluft unterschreitet. In der Folge schlägt sich die Luftfeuchtigkeit am kalten Rohr nieder. Tropft dieses Wasser ab, kann es massive Schäden an abgehängten Decken, Trockenbauwänden oder empfindlichen Bodenbelägen verursachen. Bei Systemen, die nicht fachgerecht diffusionsdicht gedämmt sind, durchfeuchtet das Isolationsmaterial im Laufe der Zeit vollständig.
          </p>
          <p className="mb-4">
            Ein durchfeuchteter Dämmstoff verliert seine isolierende Wirkung nahezu komplett, da Wasser ein exzellenter Wärmeleiter ist. Um dies zu verhindern, kommen im Kaltwasserbereich geschlossenzellige Materialien zum Einsatz, die zusätzlich mit einer äußeren Dampfbremse oder Dampfsperre ausgestattet sind.
          </p>
          <h3 className="text-xl font-semibold text-foreground mb-3">PIR, PUR und EPS im chemischen Detail</h3>
          <p className="mb-4">
            Auf dem Markt haben sich drei wesentliche Kunststoffschaum-Arten etabliert: EPS (expandiertes Polystyrol), PUR (Polyurethan) und PIR (Polyisocyanurat).
            <strong>EPS (Styropor)</strong> ist eine günstige und leichte Lösung, die oft im erdverlegten Bereich unterhalb der Frostgrenze verwendet wird. Seine dämmenden Eigenschaften sind solide (Wärmeleitfähigkeit ca. 0,035 W/mK), jedoch ist es anfällig für mechanische Beschädigungen und relativ leicht entflammbar, was den Einsatz in Brandschutzzonen stark einschränkt. Zudem ist die Zellstruktur nicht vollständig geschlossen, wodurch es über Jahre hinweg langsam Wasser aufnehmen kann.
          </p>
          <p className="mb-4">
            <strong>PUR (Polyurethanschaum)</strong> war lange Zeit der absolute Branchenstandard. Es bietet hervorragende Dämmwerte (λ = 0,025 W/mK) und ist stark vernetzt. Diese geschlossenzellige Struktur macht PUR extrem resistent gegen das Eindringen von Feuchtigkeit. Es wird daher häufig in der industriellen Kältetechnik eingesetzt. Die Temperaturbeständigkeit liegt bei etwa +120 °C, was für gewöhnliche Heizungssysteme und Trinkwassernetze völlig ausreicht.
          </p>
          <p className="mb-4">
            <strong>PIR (Polyisocyanurat)</strong> stellt die technologische Weiterentwicklung von PUR dar. Durch ein geändertes Mischungsverhältnis und spezielle Katalysatoren entstehen bei der Herstellung Ringstrukturen (Isocyanurat-Ringe), die dem Material eine enorm hohe thermische und chemische Stabilität verleihen. PIR hält Dauerbelastungen von bis zu +150 °C stand und ist damit prädestiniert für Hochtemperatur-Fernwärmenetze. Noch entscheidender ist jedoch das stark verbesserte Brandverhalten: Im Brandfall schmilzt PIR nicht ab, sondern verkohlt an der Oberfläche. Diese schützende Kohleschicht verzögert ein weiteres Durchbrennen erheblich.
          </p>
          <h4 className="text-lg font-medium text-foreground mb-2">Wirtschaftliche Aspekte der Dämmstoffwahl</h4>
          <p>
            Da PIR einen noch niedrigeren Lambdawert (bis zu 0,022 W/mK) als PUR und EPS aufweist, kann die vorgeschriebene Isolierwirkung mit einer deutlich geringeren Dämmstoffdicke erreicht werden. Dies ist insbesondere in engen Installationsschächten, abgehängten Decken und bei der Verlegung im Fußbodenaufbau ein unschätzbarer Vorteil. Der Platzgewinn ermöglicht schlankere Architektur und reduziert den baulichen Aufwand bei Kernbohrungen und Durchbrüchen. So amortisieren sich die leicht höheren Materialkosten für Hochleistungs-PIR-Schäume in der Regel sehr schnell durch die Einsparungen bei der Bauzeit und dem gewonnenen Nutzraum.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Evolution der Rohrdämmung"
          lead="Von offenen Fasern zu geschlossenzelligen Hochleistungsschäumen in der Bauindustrie."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            events={[
              {
                year: "Vergangenheit",
                title: "Mineralwolle",
                description: "Günstig und brandbeständig, jedoch extrem anfällig für Feuchtigkeit. Einmal nass, verliert sie sofort ihre Dämmwirkung und fördert Schimmelbildung."
              },
              {
                year: "Standard",
                title: "PUR (Polyurethan)",
                description: "Geschlossenzelliger Schaum mit sehr guten Dämmwerten. Lange Zeit der Branchenstandard für werksseitig isolierte Rohre und Kältetechnik."
              },
              {
                year: "Modern",
                title: "PIR (Polyisocyanurat)",
                description: "Die Weiterentwicklung von PUR. Höhere Temperaturbeständigkeit, stark verbessertes Brandverhalten und noch niedrigere Wärmeleitfähigkeit für minimale Dämmdicken."
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Technische Gegenüberstellung"
          lead="Die harten Fakten: Lambdawert, Dichte, Hitzebeständigkeit und Brandverhalten."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "PIR (Polyisocyanurat)", "PUR (Polyurethan)", "EPS (Styropor)"],
            ["Wärmeleitfähigkeit (λ)", "0,022 – 0,026 W/mK", "0,025 – 0,030 W/mK", "0,035 – 0,040 W/mK"],
            ["Max. Dauertemperatur", "Bis zu +150 °C", "Bis zu +120 °C", "Bis zu +80 °C"],
            ["Brandverhalten", "Schwer entflammbar (verkohlt)", "Normal entflammbar (schmilzt)", "Normal bis leicht entflammbar"],
            ["Zellstruktur", "Geschlossen (>90%)", "Geschlossen (>90%)", "Teiloffen (nimmt leicht Wasser auf)"],
            ["Druckfestigkeit", "Sehr hoch", "Hoch", "Gering bis mittel"],
            ["Feuchtigkeitsresistenz", "Exzellent (diffusionsdicht)", "Sehr gut", "Befriedigend"]
          ]}
        />
      </Reveal>

      <Reveal>
        <SectionHead
          title="Welcher Dämmstoff für welchen Einsatz?"
          lead="Die Wahl des Materials hängt maßgeblich vom transportierten Medium, der geforderten Brandklasse und dem Verlegeort ab."
        />
        <BentoGrid
          items={[
            {
              title: "Fernwärme & Heißwasser (PIR)",
              description: "Durch die extrem hohe thermische Stabilität bis 150°C ist PIR der unangefochtene Sieger für Fernwärmenetze. Selbst bei temporären Temperaturspitzen zersetzt sich der Schaum nicht und bietet maximalen Brandschutz.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Kältemaschinen & Klimawasser (PUR)",
              description: "Hier kommt es primär auf eine geschlossenzellige Struktur an, um das Eindringen von Luftfeuchtigkeit (und damit unweigerliche Eisbildung) zu verhindern. PUR bietet hierfür den perfekten Kostennutzenfaktor bei hervorragender Leistung.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Frostschutz im Erdreich (EPS)",
              description: "EPS (Styropor) wird oft als günstige Variante für Abwasser- oder Kaltwasserleitungen im Erdreich genutzt, wo die Temperaturen moderat sind, keine Brandgefahr besteht und keine aggressive Kondensatbildung droht.",
              icon: <Box className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <SectionHead
          title="FAQ: Häufige Fragen zur Isolierung von PPR"
          lead="Expertenantworten zu Diffusionssperren, Kondensation und Normen."
        />
        <DeepFAQ
          items={[
            {
              q: "Warum reicht die billige Isolierung aus dem Baumarkt für professionelles Kaltwasser nicht aus?",
              a: "Einfache Dämmschläuche (z.B. aus offenem PE-Schaum) sind oft nicht vollständig diffusionsdicht. Luftfeuchtigkeit diffundiert unweigerlich durch den Schaum, kondensiert am kalten Rohr und der Schaum saugt sich voll Wasser. Die Dämmwirkung ist dahin, massive Schimmelbildung droht. Hier sind Kautschuk- oder PUR/PIR-Systeme mit intakter Dampfsperre nötig."
            },
            {
              q: "Was ist der K Aqua Isopipe Standard?",
              a: "K Aqua bietet werksseitig vorisolierte PPR-Rohre an. Das Mediumrohr wird mit einem hocheffizienten PUR/PIR-Schaum umschlossen, der wiederum durch ein massives PE HD-Mantelrohr vor mechanischen Schäden, Bodenfeuchte und UV-Strahlung geschützt wird. Ideal für Nah- und Fernwärme."
            },
            {
              q: "Spielt die Dämmdicke eine so große Rolle?",
              a: "Ja, massiv. Sie wird meist in der Gebäudeenergiegesetzgebung (GEG) oder lokalen Normen vorgeschrieben (z.B. 100% Dämmung). Ein exzellenter Lambdawert des Dämmstoffs (wie bei PIR mit 0,022) ermöglicht signifikant geringere Dämmdicken bei absolut gleicher Isolierwirkung. Das spart Platz in Schächten."
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <CTABand
          title="Sparen Sie sich das nachträgliche Isolieren auf der Baustelle"
          subtitle="Mit dem K Aqua Isopipe System erhalten Sie werksseitig vorisolierte Rohre für den direkten, sicheren Einbau im Erdreich oder Freien. Schnell, sicher, hocheffizient und normgerecht."
          buttonText="Zum Isopipe System"
          buttonLink="/produkte/pipes"
          icon={<Layers className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
