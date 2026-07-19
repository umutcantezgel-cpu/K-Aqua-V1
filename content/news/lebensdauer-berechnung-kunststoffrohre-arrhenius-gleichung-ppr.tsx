import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { BarChart, Thermometer, Database, CheckCircle } from "@/components/ui/icon";

export const lebensdauerBerechnungPpr: NewsPost = {
  slug: "lebensdauer-berechnung-kunststoffrohre-arrhenius-gleichung-ppr",
  title: "Lebensdauer-Berechnung von PP-R Rohren",
  date: "2025-02-08",
  excerpt: "50 Jahre Lebensdauer sind kein Werbeslogan, sondern angewandte Physik. Wie die Zeitstandinnendruck-Prüfung und die Arrhenius-Gleichung die Rohr-Alterung vorhersagbar machen.",
  coverImage: "/images/news/arrhenius-equation-pipe-lifespan.jpg",
  category: "Technologie & Material",
  tags: ["Lebensdauer", "Arrhenius", "Zeitstandinnendruck", "Berechnung", "Materialprüfung", "PP-R"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Database className="w-5 h-5" />
                  <span>Materialwissenschaft</span>
                </div>
              }
              title="Mathematik statt Versprechungen"
              lead="Wenn K Aqua eine Lebensdauer von über 50 Jahren für seine PP-R Rohrleitungssysteme angibt, basiert dies nicht auf Schätzungen, sondern auf strengen normativen Prüfverfahren gemäß ISO 9080. Thermoplastische Kunststoffe altern unter dem kombinierten Einfluss von Temperatur und mechanischer Spannung. Durch die Anwendung der Arrhenius-Beziehung aus der physikalischen Chemie lässt sich dieses Langzeitverhalten im Labor beschleunigen und präzise auf Jahrzehnte hochrechnen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StatBand: ISO 9080 Parameters */}
      <Reveal>
        <StatBand
          cols={3}
          stats={[
            { n: "50", u: " Jahre", l: "Normative Basis-Auslegungslebensdauer (bei Dauerbetriebstemperaturen)." },
            { n: "1,25", l: "Sicherheitsbeiwert (C) für Trinkwasseranwendungen (Kalt/Warm) nach DIN 8077." },
            { n: "110", u: "°C", l: "Testtemperatur im Labor zur künstlichen Alterung (Zeitstandbruch-Erzwingung)." }
          ]}
        />
      </Reveal>

      {/* Stagger: Methodik der Prüfung */}
      <Reveal>
        <SectionHead
          title="Der Zeitstandinnendruck-Versuch"
          lead="Wie altert man ein Rohr in Monaten statt in Jahrzehnten?"
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Beschleunigte Alterung (Test)",
                description: "Rohrmuster werden in Wasserbädern bei extremen Temperaturen (z.B. 95°C und 110°C) und hohem Innendruck gelagert. Ziel ist es, das Rohr gezielt und kontrolliert zum Bersten zu bringen (Standzeit)."
              },
              {
                title: "2. Datenerfassung & Isothermen",
                description: "Aus den gemessenen Berstdrücken und Standzeiten bei verschiedenen Temperaturen werden sogenannte Isothermen (Spannungs-Zeit-Kurven in einem doppellogarithmischen Diagramm) erstellt."
              },
              {
                title: "3. Die Arrhenius-Extrapolation",
                description: "Die Arrhenius-Gleichung beschreibt die Temperaturabhängigkeit chemischer und physikalischer Alterungsprozesse. Mit ihr lassen sich die Hochtemperatur-Ergebnisse mathematisch auf Betriebstemperaturen (z.B. 20°C oder 70°C) extrapolieren."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Einflussfaktoren */}
      <Reveal>
        <SectionHead
          title="Faktoren der Rohr-Alterung"
          lead="Drei Parameter bestimmen das Langzeitverhalten von PP-R."
        />
        <BentoGrid
          items={[
            {
              title: "Betriebstemperatur",
              description: "Der dominanteste Faktor. Eine Temperaturerhöhung um 10°C halbiert (vereinfacht gesagt nach der RGT-Regel) die chemische Lebensdauer des Polymers. Daher halten Kaltwasserrohre theoretisch Jahrhunderte.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Vergleichsspannung (Innendruck)",
              description: "Der Wasserdruck erzeugt eine ringförmige mechanische Zugspannung (Hoop Stress) in der Rohrwand. Dickwandige Rohre (SDR 6) reduzieren diese Spannung drastisch.",
              icon: <BarChart className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Medium & Oxidation",
              description: "Chemikalien oder freies Chlor (im Heißwasser) können den Kunststoff oxidativ angreifen und die molekularen Ketten schneller spalten. K Aqua PP-R ist speziell wärmestabilisiert.",
              icon: <CheckCircle className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Lebensdauer-Tabelle */}
      <Reveal>
        <SectionHead
          title="Betriebsbedingungen vs. Lebensdauer"
          lead="Auszug aus der normativen Berechnung (Beispiel SDR 7.4 / PN16 Rohr)."
        />
        <DeepMatrix
          data={[
            ["Betriebstemperatur", "Betriebsdruck", "Sicherheitsbeiwert", "Theoretische Lebensdauer"],
            ["20 °C (Kaltwasser)", "10,0 bar", "1,25", "> 100 Jahre (Rechnerisch weit höher)"],
            ["60 °C (Warmwasser)", "10,0 bar", "1,25", "ca. 50 Jahre"],
            ["70 °C (Heißwasser)", "10,0 bar", "1,25", "ca. 25 Jahre"],
            ["70 °C (Heißwasser)", "6,0 bar", "1,25", "ca. 50 Jahre"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Miner'sche Regel */}
      <Reveal>
        <SectionHead
          title="Experten-Wissen: Die Miner'sche Regel"
          lead="Für schwankende Betriebsbedingungen."
        />
        <DeepFAQ
          items={[
            {
              q: "Was tun, wenn die Temperatur im System schwankt?",
              a: "In der Praxis läuft ein Rohr nicht 50 Jahre konstant bei 70°C. Um die Lebensdauer bei zyklischen Belastungen (z.B. Tag/Nacht-Absenkung, Legionellenschaltung) zu berechnen, wird die Miner'sche Regel (Palmgren-Miner-Hypothese) angewendet. Hierbei wird der prozentuale Lebensdauer-Verbrauch für jedes Temperaturkollektiv aufaddiert."
            },
            {
              q: "Warum kann ein Rohr nicht unendlich extrapolieren?",
              a: "Die ISO 9080 begrenzt den Extrapolationsfaktor auf maximal 100 für die Zeit bzw. 50 Jahre. Auch wenn die Berechnungsgleichung 300 Jahre ausgibt, darf das Material aus Sicherheitsgründen normativ nur für einen begrenzten Zeitraum ausgewiesen werden, da Langzeit-Oxidationseffekte nicht perfekt linear verlaufen."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Zertifikate */}
      <Reveal>
        <CTABand
          title="Verlässlichkeit auf dem Papier"
          subtitle="Benötigen Sie für Ihre Gebäudezertifizierung oder Ausschreibung die offiziellen Zeitstand-Regressionskurven und Prüfberichte unserer K Aqua PP-R Rohre?"
          buttonText="Zertifikate anfragen"
          buttonLink="/ressourcen/support"
          icon={<Database className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
