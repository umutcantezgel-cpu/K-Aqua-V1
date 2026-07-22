import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Leaf, ShieldCheck, Droplet, Thermometer } from "@/components/ui/icon";

export const geothermieErdwaerme: NewsPost = {
  slug: "geothermie-erdwaerme-waermepumpen-rohre-ppr",
  title: {
    de: "Geothermie & Erdwärme: PPR Rohrsysteme",
    en: "Geothermal & Ground Source Heat: PPR Pipe Systems",
    ar: "الطاقة الحرارية الأرضية: أنظمة أنابيب PPR"
  },
  date: "2024-09-05",
  teaser: {
    de: "Erdwärmesonden müssen Jahrzehnte im Boden überdauern. K-Aqua PP-R und PP-RCT Rohrsysteme sind verrottungsfrei, chemisch beständig gegen Frostschutzmittel und absolut leckagesicher durch vollflächiges Verschweißen.",
    en: "Geothermal probes must endure in the ground for decades. K-Aqua PP-R and PP-RCT pipe systems are rot-proof, chemically resistant to antifreeze, and absolutely leak-proof thanks to full-surface welding.",
    ar: "يجب أن تتحمل مجسات الطاقة الحرارية الأرضية البقاء في الأرض لعقود. تتميز أنظمة أنابيب K-Aqua PP-R و PP-RCT بأنها غير قابلة للتعفن، ومقاومة كيميائياً لمضادات التجمد، ومانعة للتسرب تماماً بفضل اللحام كامل السطح."
  },
  excerpt: {
    de: "Erdwärmesonden müssen Jahrzehnte im Boden überdauern. K-Aqua PP-R und PP-RCT Rohrsysteme sind verrottungsfrei, chemisch beständig gegen Frostschutzmittel und absolut leckagesicher durch vollflächiges Verschweißen.",
    en: "Geothermal probes must endure in the ground for decades. K-Aqua PP-R and PP-RCT pipe systems are rot-proof, chemically resistant to antifreeze, and absolutely leak-proof thanks to full-surface welding.",
    ar: "يجب أن تتحمل مجسات الطاقة الحرارية الأرضية البقاء في الأرض لعقود. تتميز أنظمة أنابيب K-Aqua PP-R و PP-RCT بأنها غير قابلة للتعفن، ومقاومة كيميائياً لمضادات التجمد، ومانعة للتسرب تماماً بفضل اللحام كامل السطح."
  },
  coverImage: "/images/news/geothermal-heatpump.jpg",
  category: "Erneuerbare Energien",
  tags: ["Geothermie", "Erdwärme", "Wärmepumpe", "Sole", "PP-R", "Tiefbau"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Leaf className="w-5 h-5" />
                  <span>Erneuerbare Energien & Tiefbau</span>
                </div>
              }
              title="Sichere Energie aus der Tiefe"
              lead="Sole-Wasser-Wärmepumpen beziehen ihre Energie aus dem Erdreich. Die Rohre, die als Erdwärmesonden bis zu 100 Meter tief verlegt werden, müssen unzerstörbar sein. K Aqua PP-R und PP-RCT Systeme bieten genau das: Sie verrotten nicht, widerstehen aggressiven Bodenmineralien und sind dank Schweißtechnik absolut dicht."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Sole-Fluss */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Warum Kunststoff in der Erde unverzichtbar ist */}
      <Reveal>
        <SectionHead
          title="Gemacht für den Untergrund"
          lead="Was einmal vergraben wird, kann nicht einfach repariert werden. Darum ist die Materialwahl entscheidend."
        />
        <BentoGrid
          items={[
            {
              title: "Wurzelfest & Verrottungsfrei",
              description: "PP-R ist ein Kunststoff, der von Mikroorganismen im Boden nicht angegriffen wird. Zudem widersteht das zähe Material dem Druck von Baumwurzeln und Erdbewegungen.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "100 % Leckagesicher",
              description: "Es gibt im Erdreich keine O-Ringe oder mechanische Schraubverbindungen. Die K Aqua Rohre werden zu einer homogenen Einheit verschweißt. Das Grundwasser bleibt absolut sicher vor Kontamination.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Resistent gegen Sole",
              description: "Das Wärmeträgermedium (Sole) besteht meist aus einem Wasser-Glykol-Gemisch als Frostschutz. PP-R ist hochgradig chemikalienbeständig und wird von diesen Zusätzen nicht angegriffen.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* HorizontalTimeline: Installationsablauf */}
      <Reveal>
        <div className="my-16">
          <SectionHead
            title="Der Weg zur Erdwärme"
            lead="So wird ein Geothermie-Netzwerk mit Kunststoffrohren installiert."
            align="center"
          />
          <div className="mt-12">
            <HorizontalTimeline
              items={[
                {
                  year: "Schritt 1",
                  title: "Tiefenbohrung",
                  description: "Je nach Wärmebedarf und Geologie wird ein Bohrloch (oft 50 bis 100 Meter tief) für die Erdwärmesonde gebohrt."
                },
                {
                  year: "Schritt 2",
                  title: "Sonde einbringen",
                  description: "Der vorgefertigte PP-R / PP-RCT Sondenfuß mit dem Doppel-U-Rohr wird hinabgelassen und mit einem Gewicht beschwert."
                },
                {
                  year: "Schritt 3",
                  title: "Verpressen",
                  description: "Das Bohrloch wird mit einer speziellen Suspension (Bentonit-Zement) verpresst, um eine perfekte thermische Anbindung ans Gestein zu gewährleisten."
                },
                {
                  year: "Schritt 4",
                  title: "Anschluss",
                  description: "Die Sonden werden in einem Verteilerschacht zusammengeführt, vollflächig verschweißt und an die Wärmepumpe im Haus angeschlossen."
                }
              ]}
            />
          </div>
        </div>
      </Reveal>

      {/* StatBand: Lebensdauer & Nachhaltigkeit */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "50", u: "+", l: "Jahre garantierte Lebensdauer für Erdwärmesonden im Boden." },
              { n: "0", l: "Grundwassergefährdung durch leckagefreie, geschweißte Verbindungen." },
              { n: "100", u: "%", l: "Recycelbares Polypropylen für einen nachhaltigen ökologischen Fußabdruck." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Technische Fragen zur Planung */}
      <Reveal>
        <SectionHead
          title="Technische Planungsfragen"
          lead="Wichtige Details für Fachplaner und Bohrunternehmen."
        />
        <DeepFAQ
          items={[
            {
              q: "Welche Wandstärke (SDR) wird für tiefe Erdwärmesonden empfohlen?",
              a: "Aufgrund des Außendrucks in großen Tiefen und beim Verpressen des Bohrlochs empfehlen wir für tiefe Sonden die robusteren Rohrserien (z. B. SDR 7.4 oder SDR 9 aus PP-RCT), um ein Kollabieren des Rohres zu verhindern."
            },
            {
              q: "Ist das Material grundwasserneutral?",
              a: "Ja, K Aqua PP-R und PP-RCT Rohre geben keinerlei Schadstoffe, Weichmacher oder Schwermetalle an die Umwelt ab. Sie sind hygienisch einwandfrei und stellen keine Gefahr für das Grundwasser dar."
            },
            {
              q: "Können K Aqua Rohre auch für Eisspeicher-Systeme genutzt werden?",
              a: "Absolut. Eisspeicher nutzen die Kristallisationsenergie von Wasser beim Gefrieren. Die Rohre in der Zisterne müssen extrem zäh sein und ständige Phasenwechsel aushalten. PP-R ist für diese Tieftemperaturanwendungen hervorragend geeignet."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Tiefbau-Beratung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Geothermie-Feld?"
          subtitle="Ob Einfamilienhaus oder gewerbliches Sondenfeld: Unsere Experten unterstützen Sie bei der Auslegung der Verteilertechnik und Rohrdimensionierung."
          buttonText="Projektberatung anfordern"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
