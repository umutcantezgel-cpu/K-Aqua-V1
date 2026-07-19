import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Server, Activity, ShieldAlert, Cpu } from "@/components/ui/icon";

export const rechenzentrumKuehlung: NewsPost = {
  slug: "rechenzentrum-kuehlung-datacenter-ausfallsicherheit-pprct",
  title: "Industrielle Kühlung im Rechenzentrum: Ausfallsicherheit mit PP-RCT",
  date: "2024-11-28",
  excerpt: "Data Center erfordern 99,999% Uptime. K Aqua PP-RCT Rohre für Kühlsysteme bieten 100%ige Leckagesicherheit durch stoffschlüssige Verschweißung und verhindern Rostablagerungen in empfindlichen In-Row-Coolern.",
  coverImage: "/images/news/data-center.jpg",
  category: "Industrie & Anlagenbau",
  tags: ["Rechenzentrum", "Data Center", "Kühlung", "Liquid Cooling", "PP-RCT", "Ausfallsicherheit"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Server className="w-5 h-5" />
                  <span>IT-Infrastruktur & Kühlung</span>
                </div>
              }
              title="Keine Toleranz für Leckagen"
              lead="Hyperscale-Rechenzentren verbrauchen gewaltige Mengen an Energie – ein großer Teil davon fließt in Kaltwassersätze zur Kühlung der Server-Racks. Ein Rohrbruch oder auch nur eine kleine Leckage über dem Doppelboden kann Schäden in Millionenhöhe verursachen. K Aqua PP-RCT Rohrleitungssysteme bieten durch ihre homogene, stoffschlüssige Schweißverbindung die maximale Sicherheit, die Data-Center-Betreiber fordern."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für kontinuierlichen Kühlfluss */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Die 3 Säulen der IT-Kühlung */}
      <Reveal>
        <SectionHead
          title="Mission Critical Cooling"
          lead="Warum PP-RCT für die Kühlung von Servern unverzichtbar ist."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. 100 % Leckagesicherheit",
                description: "Im Gegensatz zu gesteckten, gepressten oder verschraubten Metallrohren wird PP-RCT thermisch verschweißt (Heizelementstumpfschweißen oder Muffenschweißen). Rohr und Fitting verschmelzen zu einer einzigen Einheit ohne O-Ringe oder mechanische Schwachstellen."
              },
              {
                title: "2. Kein Rost, keine Partikel",
                description: "In-Row-Cooler und Liquid-Cooling-Systeme besitzen sehr feine Ventile und Wärmetauscher. Rostpartikel aus C-Stahlrohren können diese verstopfen und zum Ausfall führen. PP-RCT oxidiert nicht und das Kühlwasser bleibt absolut partikelfrei."
              },
              {
                title: "3. Kondenswasser-Kontrolle",
                description: "Kaltwasserleitungen im Data Center neigen zur Kondenswasserbildung (Schwitzwasser). Da PP-RCT eine deutlich geringere Wärmeleitfähigkeit als Metall aufweist, reduziert sich die Gefahr der Kondensation drastisch. Die benötigte Dämmdicke ist oft geringer."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* GlossaryGrid: Data Center Terminologie */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Wichtige Begriffe im Data Center"
            items={[
              {
                term: "PUE-Wert (Power Usage Effectiveness)",
                definition: "Maßstab für die Energieeffizienz. Je glatter die Kühlwasserrohre, desto weniger Strom verbrauchen die Umwälzpumpen, was den PUE-Wert direkt verbessert.",
                icon: <Activity className="w-6 h-6" />
              },
              {
                term: "Liquid Cooling / In-Row",
                definition: "Kühlung direkt am Rack statt im Raum. Erfordert ein engmaschiges Rohrnetz mit höchster Zuverlässigkeit direkt über den Servern.",
                icon: <Cpu className="w-6 h-6" />
              },
              {
                term: "Tier III / IV Redundanz",
                definition: "Höchste Ausfallsicherheit. Meist werden redundante A/B-Kühlkreisläufe installiert. Die schnelle Verlegung von PP-RCT hilft, diese doppelten Trassen wirtschaftlich zu realisieren.",
                icon: <ShieldAlert className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: TCO Vergleich (Total Cost of Ownership) */}
      <Reveal>
        <SectionHead
          title="TCO-Vergleich (Total Cost of Ownership)"
          lead="Kosten und Risiken von Kühlsystemen im Rechenzentrum."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "K Aqua PP-RCT", "C-Stahl", "Edelstahl"],
            ["Installationszeit (Prefab)", "Sehr schnell (Leichtgewicht)", "Langsam (Schwer)", "Mittel"],
            ["Verbindungsrisiko", "Null (Stoffschlüssig)", "Hoch (O-Ringe / Rost am Gewinde)", "Gering (O-Ringe beim Pressen)"],
            ["Wärmeleitfähigkeit (Isolationsbedarf)", "0,24 W/mK (Isolierend)", "50 W/mK (Hoch)", "15 W/mK (Mittel)"],
            ["Partikelabgabe (Filterverstopfung)", "Keine", "Sehr hoch (Rost)", "Keine"]
          ]}
        />
      </Reveal>

      {/* StatBand: Hyperscale Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "99.9", u: "%", l: "Uptime-Anforderungen in Tier-IV-Zentren erlauben keine Wartungspausen wegen Rohrbrüchen." },
              { n: "0", l: "Gefahr von abplatzenden Rostpartikeln, die sensible Server-Kühlblöcke verstopfen könnten." },
              { n: "3", u: "x", l: "Schnellere Verlegung durch Vorfertigung großer Rohrregister in der Werkstatt." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Data Center Engineering */}
      <Reveal>
        <CTABand
          title="Bauen Sie ein neues Data Center?"
          subtitle="Sichern Sie Ihre Mission Critical Infrastructure. Sprechen Sie mit unseren Spezialisten für industrielle Kühlsysteme und Vorfertigung."
          buttonText="Beratung anfragen"
          buttonLink="/kontakt"
          icon={<Server className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
