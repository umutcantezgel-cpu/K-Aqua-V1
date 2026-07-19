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
  title: "Schweißverfahren im Vergleich: Heizelementmuffe vs. Heizwendel",
  date: "2025-01-20",
  excerpt: "Die stoffschlüssige Verbindung ist das Geheimnis von PP-R Rohrnetzen. Erfahren Sie, wann klassisches Muffenschweißen und wann Elektromuffen (Heizwendel) die bessere Wahl sind.",
  coverImage: "/images/news/welding-methods-comparison.jpg",
  category: "Verarbeitung & Montage",
  tags: ["Schweißen", "Heizwendel", "Elektromuffe", "Muffenschweißen", "Handwerk", "Montage"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Flame className="w-5 h-5" />
                  <span>Verbindungstechnik & Handwerk</span>
                </div>
              }
              title="Zwei Bauteile, ein Werkstück"
              lead="Im Gegensatz zu metallischen Systemen, die gepresst, gelötet oder verschraubt werden, nutzt K Aqua die Polyfusion (Schmelzschweißen). Dabei verschmelzen Rohr und Fitting auf molekularer Ebene miteinander. O-Ringe oder Dichtungen, die im Laufe der Jahre porös werden könnten, sind überflüssig. Für die Herstellung dieser perfekten, stoffschlüssigen Verbindung stehen in der Praxis hauptsächlich zwei Verfahren zur Verfügung: Das Heizelementmuffenschweißen und das Heizwendelschweißen."
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
          title="Welches Verfahren für welchen Zweck?"
          lead="Die Praxis entscheidet über die Wahl des richtigen Schweißgeräts."
        />
        <BentoGrid
          items={[
            {
              title: "Heizelementmuffenschweißen (Standard)",
              description: "Der Allrounder für die Dimensionen DN 20 bis DN 125. Rohr und Fitting werden gleichzeitig auf einem beheizten Dorn auf 260°C erwärmt und anschließend ineinandergefügt. Ideal für die freie Vorfertigung an der Werkbank.",
              icon: <Hammer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Heizwendelschweißen (Zwangslagen)",
              description: "Die Elektromuffe. Ein in den Fitting eingegossener Heizdraht übernimmt das Schmelzen. Unverzichtbar bei Reparaturen im engen Schacht oder bei finalen Verbindungsnähten im Bestand.",
              icon: <Zap className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Stumpfschweißen (Großrohre)",
              description: "Meist ab DN 160 eingesetzt. Hierbei werden die Rohrenden ohne zusätzliche Muffe plan aneinandergedrückt und mithilfe großer Maschinen verschweißt.",
              icon: <Settings className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Heizwendel vs. Muffenschweißen */}
      <Reveal>
        <SectionHead
          title="Vergleich der Methoden"
          lead="Kosten, Geschwindigkeit und Platzbedarf gegenübergestellt."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Heizelementmuffenschweißen", "Heizwendelschweißen (Elektromuffe)"],
            ["Benötigtes Werkzeug", "Schweißgerät mit Heizdornen", "Heizwendel-Schweißautomat, Schälgerät"],
            ["Flexibilität im Schacht", "Gering (Werkzeug braucht viel Platz)", "Sehr hoch (nur Muffe und Kabel nötig)"],
            ["Kosten des Fittings", "Sehr günstig", "Höher (eingegossene Elektronik)"],
            ["Rohrvorbereitung", "Zuschneiden, Reinigen", "Zuschneiden, Zwingend Schälen, Reinigen"]
          ]}
        />
      </Reveal>

      {/* Stagger: Der Ablauf beim Heizwendelschweißen */}
      <Reveal>
        <SectionHead
          title="Ablauf einer Heizwendelschweißung"
          lead="Drei essenzielle Schritte für eine normgerechte Verbindung."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Oxidationsschicht abschälen",
                description: "Kunststoff oxidiert an der Oberfläche durch UV-Licht und Sauerstoff. Diese mikroskopische Schicht verhindert das Verschmelzen. Das Rohrende muss daher zwingend mit einem Rotationsschälgerät bearbeitet (geschält) werden."
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

      {/* DeepFAQ: Experten-Fragen zur Schweißtechnik */}
      <Reveal>
        <SectionHead
          title="FAQ: Schweißtechnik"
          lead="Häufige Fragen unserer Kunden auf der Baustelle."
        />
        <DeepFAQ
          items={[
            {
              q: "Was passiert, wenn die Aufwärmzeit beim Muffenschweißen zu kurz war?",
              a: "Wenn das Material nicht tief genug durchgeschmolzen ist, kann es nicht homogen verfließen. Es entsteht eine 'kalte Schweißnaht', die bei Druckprüfung oder im Betrieb reißen kann."
            },
            {
              q: "Darf man K Aqua PP-R bei Minustemperaturen schweißen?",
              a: "Gemäß DVS-Richtlinien sollte bei Temperaturen unter +5 °C besondere Vorsicht gelten (Gefahr von Reifbildung, sprödes Material). Bei Frost muss der Schweißbereich oft mit einem Zelt geschützt und erwärmt werden."
            },
            {
              q: "Darf ich die Verbindung nach dem Schweißen mit Wasser kühlen?",
              a: "Nein, auf keinen Fall! Das plötzliche Abschrecken führt zu Mikrorissen im Kunststoff. Die Verbindung muss zwingend an der ruhenden Umgebungsluft (ggf. unter Spannung im Haltegestell) natürlich abkühlen."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Verbindungs-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "260", u: "°C", l: "Die optimale Schweißtemperatur am Heizdorn für das Heizelementmuffenschweißen." },
              { n: "100", u: "%", l: "Homogenität. Aus zwei Werkstücken entsteht ein stoffschlüssig verbundenes Monoblock-System." },
              { n: "0", l: "Gummiringe, Hanf oder Teflon – all diese anfälligen Dichtungsmaterialien entfallen komplett." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Schulungen */}
      <Reveal>
        <CTABand
          title="Eine Schweißnaht ist nur so gut wie der Installateur"
          subtitle="Sichern Sie die Qualität Ihrer TGA-Projekte. Buchen Sie jetzt eine K Aqua DVS-konforme Schweißerschulung für Ihr Montageteam vor Ort."
          buttonText="Schulung anfragen"
          buttonLink="/kontakt"
          icon={<Hammer className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
