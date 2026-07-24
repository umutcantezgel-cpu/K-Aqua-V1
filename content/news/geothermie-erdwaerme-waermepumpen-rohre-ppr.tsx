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
    de: "Erdwärmesonden müssen Jahrzehnte im Boden überdauern. K Aqua PPR und PPRCT Rohrsysteme sind verrottungsfrei, chemisch beständig gegen Frostschutzmittel und absolut leckagesicher durch vollflächiges Verschweißen.",
    en: "Geothermal probes must endure in the ground for decades. K Aqua PPR and PPRCT pipe systems are rot-proof, chemically resistant to antifreeze, and absolutely leak-proof thanks to full-surface welding.",
    ar: "يجب أن تتحمل مجسات الطاقة الحرارية الأرضية البقاء في الأرض لعقود. تتميز أنظمة أنابيب K Aqua PPR و PPRCT بأنها غير قابلة للتعفن، ومقاومة كيميائياً لمضادات التجمد، ومانعة للتسرب تماماً بفضل اللحام كامل السطح."
  },
  excerpt: {
    de: "Erdwärmesonden müssen Jahrzehnte im Boden überdauern. K Aqua PPR und PPRCT Rohrsysteme sind verrottungsfrei, chemisch beständig gegen Frostschutzmittel und absolut leckagesicher durch vollflächiges Verschweißen.",
    en: "Geothermal probes must endure in the ground for decades. K Aqua PPR and PPRCT pipe systems are rot-proof, chemically resistant to antifreeze, and absolutely leak-proof thanks to full-surface welding.",
    ar: "يجب أن تتحمل مجسات الطاقة الحرارية الأرضية البقاء في الأرض لعقود. تتميز أنظمة أنابيب K Aqua PPR و PPRCT بأنها غير قابلة للتعفن، ومقاومة كيميائياً لمضادات التجمد، ومانعة للتسرب تماماً بفضل اللحام كامل السطح."
  },
  coverImage: "/images/news/geothermal-heatpump.jpg",
  category: "Erneuerbare Energien",
  tags: ["Geothermie", "Erdwärme", "Wärmepumpe", "Sole", "PPR", "Tiefbau"],
  
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
              lead="Solewasser Wärmepumpen beziehen ihre Energie aus dem Erdreich. Die Rohre, die als Erdwärmesonden bis zu 100 Meter tief verlegt werden, müssen unzerstörbar sein. K Aqua PPR und PPRCT Systeme bieten genau das: Sie verrotten nicht, widerstehen aggressiven Bodenmineralien und sind dank Schweißtechnik absolut dicht."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Prose Area */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
          <h2>Tiefengeothermie und Erdwärmepumpen: Warum K Aqua PP-R Rohre den Untergrund beherrschen</h2>
          <p>
            Im Kampf gegen den Klimawandel und für die Unabhängigkeit von fossilen Brennstoffen spielen Wärmepumpen die zentrale Rolle. Die effizienteste Form der Wärmepumpentechnik ist die Sole/Wasser-Wärmepumpe, die ihre Energie aus dem Erdreich (Geothermie) bezieht. Anders als die Außenluft, die im Winter eiskalt ist, bietet das Erdreich ab einer gewissen Tiefe eine konstante, verlässliche Wärmequelle von ca. 10 °C bis 12 °C. Das Bindeglied zwischen der Erde und der Heizungsanlage im Haus sind Erdwärmesonden oder Erdwärmekollektoren. Da diese Rohrleitungen tief in der Erde vergraben oder einbetoniert werden und eine Reparatur faktisch unmöglich ist, sind die Anforderungen an das Material extrem. K Aqua PP-R (Polypropylen) Rohrsysteme bieten hier die ultimative Sicherheit.
          </p>
          
          <h3>Die Feinde im Erdreich: Verrottung und Außendruck</h3>
          <p>
            Ein Rohr, das 100 Meter tief in die Erde gebohrt wird, ist gewaltigen Belastungen ausgesetzt. Metalle würden im feuchten Milieu des Grundwassers innerhalb kürzester Zeit wegrosten. Selbst manche Kunststoffe können über die Jahrzehnte durch Mikroorganismen im Boden oder durch aggressive mineralische Salze angegriffen werden.
          </p>
          <p>
            PP-R ist ein absolut unverrottbarer, biostabiler Kunststoff. Weder Bakterien noch Pilze oder feuchte Erdsäuren können die hochmolekulare Kette des Polypropylens zerstören. Ein weiterer massiver Faktor ist der physikalische Druck: In 100 Metern Tiefe herrscht durch die Erdmassen und die Grundwassersäule ein enormer hydrostatischer Außendruck auf das Rohr. Wählt man das Rohr zu dünnwandig, kollabiert (implodiert) es beim Einbringen oder Verpressen des Bohrlochs. K Aqua bietet hier hochdruckfeste SDR-Klassen (z. B. SDR 7.4 oder SDR 6), die diesem radialen Außendruck problemlos standhalten und eine jahrzehntelange strukturelle Integrität garantieren.
          </p>

          <h3>Absolute Dichtheit schützt das Grundwasser</h3>
          <p>
            In den Rohren der Erdwärmesonde zirkuliert kein reines Wasser, sondern eine "Sole" (meist ein Wasser-Glykol-Gemisch). Dieses Frostschutzmittel verhindert, dass die Anlage einfriert, wenn die Wärmepumpe der Erde sehr viel Energie entzieht.
          </p>
          <p>
            Glykol ist grundwassergefährdend. Ein Leck in 50 Metern Tiefe wäre eine ökologische Katastrophe und würde massive Strafen für den Bauherren nach sich ziehen. Genau deshalb sind mechanische Verbindungen (wie Schraub- oder Pressfittings mit Gummi-Dichtringen), die im Laufe der Jahre porös werden können, im Erdreich tabu. K Aqua Rohre und Fittings (z.B. der Sondenfuß) werden durch Heizelement-Muffenschweißung oder Elektroschweißmuffen thermisch verschmolzen. Das Rohrnetz wird zu einem einzigen, endlosen, homogenen Strang. Es gibt keine Schwachstellen. Das System ist 100 % leckagesicher.
          </p>

          <h3>Installation: Von der Tiefenbohrung bis zum Verteilerschacht</h3>
          <p>
            Die Installation einer klassischen Erdwärmesonde (Doppel-U-Sonde) erfordert Präzision. Nach der Tiefenbohrung (oft durch Fels und Gestein) wird die vorgefertigte K Aqua Sonde – beschwert durch spezielle Sondenfußgewichte – in das Bohrloch abgelassen. 
          </p>
          <p>
            Danach folgt der wichtigste thermodynamische Schritt: Das Verpressen (Verfüllen). Das Bohrloch wird von unten nach oben mit einer wärmeleitfähigen Bentonit-Zement-Suspension hohlraumfrei verfüllt. Dies sorgt dafür, dass die K Aqua Rohre perfekten Kontakt zum umliegenden Gestein haben und die Erdwärme optimal auf die im Rohr zirkulierende Sole übertragen werden kann. Alle Sonden des Grundstücks (oft 3 oder 4 Stück) werden dann in einem frostsicheren Verteilerschacht zusammengeführt. Hier erfolgt der Abgleich der Durchflussmengen, bevor die dicke Sammelleitung in den Heizungskeller zur Wärmepumpe führt.
          </p>

          <h3>Häufig gestellte Fragen (FAQ) zur Geothermie</h3>
          <h4>Was ist der Unterschied zwischen Sonden und Kollektoren?</h4>
          <p>
            Erdwärmesonden werden vertikal (meist 50 bis 100 Meter) in die Tiefe gebohrt. Sie benötigen extrem wenig Platz auf dem Grundstück und profitieren von konstanten Temperaturen. Erdwärmekollektoren werden horizontal (wie eine Fußbodenheizung) in ca. 1,5 Metern Tiefe im Garten vergraben. Hierfür wird viel Fläche benötigt, und die Wärmequelle reagiert stärker auf die Jahreszeiten. K Aqua Rohre sind für beide Systeme perfekt geeignet.
          </p>
          <h4>Was passiert bei einem Phasenwechsel (Gefrieren) im Rohr?</h4>
          <p>
            Wenn die Sole ausfällt und reines Wasser im Rohr gefriert (z.B. in Eisspeichersystemen), dehnt sich das Eis aus und würde Metalle sofort sprengen. PP-R ist zäh und elastisch. Es toleriert das Gefrieren des Mediums in gewissem Maße, ohne sofort zu platzen, was eine zusätzliche Sicherheitsreserve für die Anlage darstellt.
          </p>
          <h4>Ist PP-R beständig gegen Ethylen- oder Propylenglykol?</h4>
          <p>
            Ja, vollkommen. Die molekulare Struktur von K Aqua PP-R ist hochgradig resistent gegen die branchenüblichen Frostschutzmittel (Glykole), Inhibitoren und Korrosionsschutzzusätze. Es findet keine chemische Zersetzung statt.
          </p>
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
              description: "PPR ist ein Kunststoff, der von Mikroorganismen im Boden nicht angegriffen wird. Zudem widersteht das zähe Material dem Druck von Baumwurzeln und Erdbewegungen.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "100 % Leckagesicher",
              description: "Es gibt im Erdreich keine O Ringe oder mechanische Schraubverbindungen. Die K Aqua Rohre werden zu einer homogenen Einheit verschweißt. Das Grundwasser bleibt absolut sicher vor Kontamination.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Resistent gegen Sole",
              description: "Das Wärmeträgermedium (Sole) besteht meist aus einem Wasserglykol Gemisch als Frostschutz. PPR ist hochgradig chemikalienbeständig und wird von diesen Zusätzen nicht angegriffen.",
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
            lead="So wird ein Geothermienetzwerk mit Kunststoffrohren installiert."
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
                  description: "Der vorgefertigte PPR / PPRCT Sondenfuß mit dem Doppel U Rohr wird hinabgelassen und mit einem Gewicht beschwert."
                },
                {
                  year: "Schritt 3",
                  title: "Verpressen",
                  description: "Das Bohrloch wird mit einer speziellen Suspension (Bentonitzement) verpresst, um eine perfekte thermische Anbindung ans Gestein zu gewährleisten."
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
              a: "Aufgrund des Außendrucks in großen Tiefen und beim Verpressen des Bohrlochs empfehlen wir für tiefe Sonden die robusteren Rohrserien (z. B. SDR 7.4 oder SDR 9 aus PPRCT), um ein Kollabieren des Rohres zu verhindern."
            },
            {
              q: "Ist das Material grundwasserneutral?",
              a: "Ja, K Aqua PPR und PPRCT Rohre geben keinerlei Schadstoffe, Weichmacher oder Schwermetalle an die Umwelt ab. Sie sind hygienisch einwandfrei und stellen keine Gefahr für das Grundwasser dar."
            },
            {
              q: "Können K Aqua Rohre auch für Eisspeichersysteme genutzt werden?",
              a: "Absolut. Eisspeicher nutzen die Kristallisationsenergie von Wasser beim Gefrieren. Die Rohre in der Zisterne müssen extrem zäh sein und ständige Phasenwechsel aushalten. PPR ist für diese Tieftemperaturanwendungen hervorragend geeignet."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Tiefbauberatung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Geothermiefeld?"
          subtitle="Ob Einfamilienhaus oder gewerbliches Sondenfeld: Unsere Experten unterstützen Sie bei der Auslegung der Verteilertechnik und Rohrdimensionierung."
          buttonText="Projektberatung anfordern"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
