import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Zap, Hammer, Flame, Settings } from "@/components/ui/icon";

export const schweissverfahrenVergleich: NewsPost = {
  slug: "schweissverfahren-vergleich-heizelementmuffenschweissung-heizwendel-ppr",
  title: {
    de: "PPR Schweißverfahren im Vergleich",
    en: "PPR Welding Methods in Comparison",
    ar: "مقارنة طرق لحام PPR",
  },
  date: "2025-01-20",
  excerpt: {
    de: "Die stoffschlüssige Verbindung ist das Geheimnis langlebiger PPR Rohrsysteme. Erfahren Sie im Vergleich, wann klassisches Heizelementmuffenschweißen und wann Elektromuffen (Heizwendel) in der Sanitär und Heizungstechnik die optimale Wahl sind.",
    en: "The cohesive joint is the secret of durable PPR pipe systems. Discover in our comparison when classic socket fusion welding and when electrofusion (heating coil) welding are the optimal choice in plumbing and heating technology.",
    ar: "الوصلة المتماسكة هي سر متانة أنظمة أنابيب PPR. اكتشف في هذه المقارنة متى يكون اللحام الكلاسيكي بالاندماج التجويفي ومتى يكون اللحام بالصهر الكهربائي (ملف التسخين) هو الخيار الأمثل في تكنولوجيا السباكة والتدفئة.",
  },
  coverImage: "/images/news/welding-methods-comparison.jpg",
  category: "Verarbeitung & Montage",
  tags: ["Schweißen", "Heizwendel", "Elektromuffe", "Muffenschweißen", "Handwerk", "Montage", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Flame className="w-5 h-5" />
                  <span>Verbindungstechnik & Handwerk für PPR Rohrsysteme</span>
                </div>
              }
              title="Zwei Bauteile, ein Werkstück: Polyfusion bei PPR Rohrsystemen"
              lead="Im Gegensatz zu metallischen Systemen, die gepresst, gelötet oder verschraubt werden, nutzt K Aqua die Polyfusion (Schmelzschweißen). Dabei verschmelzen PPR Rohr und Fitting auf molekularer Ebene miteinander. ORinge oder Dichtungen, die im Laufe der Jahre porös werden könnten, sind absolut überflüssig. Für die Herstellung dieser perfekten, stoffschlüssigen Verbindung stehen in der Praxis hauptsächlich zwei Verfahren zur Verfügung: Das Heizelementmuffenschweißen und das Heizwendelschweißen (Elektromuffenschweißen)."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Druck und Hitze */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Die Einsatzgebiete */}
      <Reveal>
        <SectionHead
          title="Welches Schweißverfahren für welchen Zweck bei PPR Rohren?"
          lead="Die Praxisanforderungen auf der Baustelle entscheiden über die Wahl des optimalen PPR Schweißgeräts."
        />
        <BentoGrid
          items={[
            {
              title: "Heizelementmuffenschweißen (Standard)",
              description: "Der Allrounder für die Dimensionen DN 20 bis DN 125. PPR Rohr und Fitting werden gleichzeitig auf einem beheizten Dorn auf 260°C erwärmt und anschließend ineinandergefügt. Ideal für die freie Vorfertigung an der Werkbank.",
              icon: <Hammer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Heizwendelschweißen (Zwangslagen)",
              description: "Die Elektromuffe für PPR Rohre. Ein in den Fitting eingegossener Heizdraht übernimmt das Schmelzen. Unverzichtbar bei Reparaturen im engen Schacht oder bei finalen Verbindungsnähten im Bestand.",
              icon: <Zap className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Stumpfschweißen (Großrohre)",
              description: "Meist ab DN 160 bei PPR Großrohrsystemen eingesetzt. Hierbei werden die Rohrenden ohne zusätzliche Muffe plan aneinandergedrückt und mithilfe automatisierter Maschinen verschweißt.",
              icon: <Settings className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Heizwendel vs. Muffenschweißen */}
      <Reveal>
        <SectionHead
          title="Vergleich der PPR Schweißverfahren: Heizelementmuffe vs. Elektromuffe"
          lead="Kosten, Verlegegeschwindigkeit, Werkzeugeinsatz und Platzbedarf in der Gegenüberstellung."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Heizelementmuffenschweißen", "Heizwendelschweißen (Elektromuffe)"],
            ["Benötigtes Werkzeug", "Schweißgerät mit Heizdornen", "Heizwendelschweißautomat, Schälgerät"],
            ["Flexibilität im Schacht", "Gering (Werkzeug braucht viel Platz)", "Sehr hoch (nur Muffe und Kabel nötig)"],
            ["Kosten des Fittings", "Sehr günstig", "Höher (eingegossene Elektronik)"],
            ["Rohrvorbereitung", "Zuschneiden, Reinigen", "Zuschneiden, Zwingend Schälen, Reinigen"]
          ]}
        />
      </Reveal>

      {/* Stagger: Der Ablauf beim Heizwendelschweißen */}
      <Reveal>
        <SectionHead
          title="Schritt für Schritt Ablauf einer PPR Heizwendelschweißung"
          lead="Drei essenzielle Schritte für eine dauerhaft normgerechte und leckagesichere Verbindung."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Oxidationsschicht abschälen",
                description: "Kunststoff oxidiert an der Oberfläche durch UV Licht und Sauerstoff. Diese mikroskopische Schicht verhindert das Verschmelzen. Das Rohrende muss daher zwingend mit einem Rotationsschälgerät bearbeitet (geschält) werden."
              },
              {
                title: "2. Stecktiefe markieren & spannungsfrei fixieren",
                description: "Die Einstecktiefe wird auf dem Rohr markiert. Das Rohr wird in die kalte Elektromuffe geschoben. Wichtig: Die Rohre müssen mit Halteklemmen fixiert werden, da sich die Schmelze während des Vorgangs ausdehnt und das Rohr herausdrücken könnte."
              },
              {
                title: "3. Automatisierter Schweißprozess",
                description: "Das Schweißgerät liest den Barcode auf der Elektromuffe ein. Der Automat regelt nun die Stromstärke, die Schweißzeit und die Temperaturkurve völlig selbstständig – abgestimmt auf Umgebungstemperatur und Dimension."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Expertenfragen zur Schweißtechnik */}
      <Reveal>
        <SectionHead
          title="FAQ: Schweißtechnik & Verarbeitung von PPR Rohrsystemen"
          lead="Häufige Fragen unserer Kunden und Handwerker zur Verarbeitung von PPR Rohren auf der Baustelle."
        />
        <DeepFAQ
          items={[
            {
              q: "Was passiert, wenn die Aufwärmzeit beim Muffenschweißen zu kurz war?",
              a: "Wenn das Material nicht tief genug durchgeschmolzen ist, kann es nicht homogen verfließen. Es entsteht eine 'kalte Schweißnaht', die bei Druckprüfung oder im Betrieb reißen kann."
            },
            {
              q: "Darf man K Aqua PPR bei Minustemperaturen schweißen?",
              a: "Gemäß DVS Richtlinien sollte bei Temperaturen unter +5 °C besondere Vorsicht gelten (Gefahr von Reifbildung, sprödes Material). Bei Frost muss der Schweißbereich oft mit einem Zelt geschützt und erwärmt werden."
            },
            {
              q: "Darf ich die Verbindung nach dem Schweißen mit Wasser kühlen?",
              a: "Nein, auf keinen Fall! Das plötzliche Abschrecken führt zu Mikrorissen im Kunststoff. Die Verbindung muss zwingend an der ruhenden Umgebungsluft (ggf. unter Spannung im Haltegestell) natürlich abkühlen."
            },
            {
              q: "Welche Sicherheits und Vorbereitungsmaßnahmen sind beim Schweißen von PPR Rohren zu beachten?",
              a: "Vor jedem Schweißvorgang müssen Rohre und Fittings gründlich gereinigt, entfettet und rechtwinklig zugeschnitten werden. Bei Heizwendelschweißungen ist das mechanische Abschälen der Oxidschicht unerlässlich, um Schweißfehler zu vermeiden."
            },
            {
              q: "Wie unterscheidet sich die Schweißzeit bei unterschiedlichen PPR Rohrdimensionen?",
              a: "Mit zunehmendem Rohrdurchmesser steigen die Anwärm und Umschaltzeiten proportional an. Während DN 20 Rohre nur wenige Sekunden Anwärmzeit benötigen, erfordern Großrohre ab DN 110 präzise kontrollierte Halte und Abkühlzeiten nach DVS Standard."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Verbindungsfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "260", u: "°C", l: "Die optimale Schweißtemperatur am Heizdorn für das Heizelementmuffenschweißen von PPR Rohren." },
              { n: "100", u: "%", l: "Homogenität. Aus zwei Werkstücken entsteht ein stoffschlüssig verbundenes Monoblock System." },
              { n: "0", l: "Gummiringe, Hanf oder Teflon – all diese anfälligen Dichtungsmaterialien entfallen komplett." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Schulungen */}
      <Reveal>
        <CTABand
          title="Eine Schweißnaht ist nur so gut wie der Installateur"
          subtitle="Sichern Sie die Qualität Ihrer TGA Projekte. Buchen Sie jetzt eine K Aqua DVS konforme Schweißerschulung für PPR Rohrsysteme für Ihr Montageteam vor Ort."
          buttonText="Schulung anfragen"
          buttonLink="/kontakt"
          icon={<Hammer className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
