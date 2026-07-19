import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Droplet, Activity, FlaskConical, AlertOctagon } from "@/components/ui/icon";

export const chemischeReinigungDesinfektion: NewsPost = {
  slug: "chemische-reinigung-rohrnetze-spuelen-desinfektion-ppr",
  title: "Reinigung und Desinfektion von Rohrnetzen",
  date: "2025-01-24",
  excerpt: "Hygiene nach der Montage: Wie PP-R Rohrnetze normgerecht gespült und bei Bedarf chemisch desinfiziert werden, ohne das Material zu schädigen.",
  coverImage: "/images/news/cleaning-disinfection.jpg",
  category: "Wartung & Betrieb",
  tags: ["Reinigung", "Desinfektion", "Spülen", "Hygiene", "Chlor", "Wartung"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Activity className="w-5 h-5" />
                  <span>Trinkwasserhygiene</span>
                </div>
              }
              title="Der saubere Start ins Gebäudeleben"
              lead="Nach der Montage und Druckprüfung eines Trinkwassernetzes muss dieses gründlich gespült werden (z.B. nach DIN EN 806-4 / VDI 6023). Ziel ist es, Bauverschmutzungen auszuspülen und das Netz hygienisch einwandfrei an den Betreiber zu übergeben. Sollte eine Kontamination (z.B. mit Legionellen oder Pseudomonaden) vorliegen, ist eine Desinfektion unumgänglich. Doch wie reagiert das Polypropylen-Rohr auf aggressive Chemie?"
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Wasser-/Tropfen-Animation */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Der Spülprozess */}
      <Reveal>
        <SectionHead
          title="Der normgerechte Spülprozess"
          lead="Desinfektion ist nicht der Standard, sondern das letzte Mittel."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "Stufe 1: Spülen mit Trinkwasser",
                description: "Der Standardfall. Das Netz wird abschnittsweise mit klarem, filtriertem Trinkwasser gespült. Die Fließgeschwindigkeit sollte hoch genug sein, um lose Partikel auszutragen (mindestens 2,0 m/s an der am weitesten entfernten Zapfstelle)."
              },
              {
                title: "Stufe 2: Spülen mit Wasser-Luft-Gemisch",
                description: "Bei hartnäckigen Verschmutzungen oder zur Entfernung von Biofilmen wird dem Spülwasser stoßweise ölfreie Druckluft beigemischt (Impulsspülung). Die entstehenden Kavitationsbläschen reißen Ablagerungen von der Rohrwand ab."
              },
              {
                title: "Stufe 3: Chemische Desinfektion",
                description: "Wird nur angewendet, wenn Wasserproben eine mikrobielle Belastung aufweisen, die durch reines Spülen nicht behoben werden konnte. Der Einsatz von Desinfektionsmitteln (z.B. Chlor) muss streng nach Herstellervorgaben dosiert werden."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Best Practices für die Chemie */}
      <Reveal>
        <SectionHead
          title="Goldene Regeln der chemischen Desinfektion"
          lead="Wer diese drei Regeln missachtet, riskiert die Lebensdauer des Rohrsystems."
        />
        <BentoGrid
          items={[
            {
              title: "Grenzwertige Dosierung",
              description: "Die Konzentration des Wirkstoffs muss exakt eingehalten werden (z.B. max. 50 mg/l freies Chlor). 'Viel hilft viel' ist ein fataler Irrtum, der den Kunststoff angreift und spröde macht.",
              icon: <FlaskConical className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Strikte Einwirkzeit",
              description: "Die chemische Lösung darf nur für einen begrenzten Zeitraum (meist max. 12 bis 24 Stunden) im Rohrsystem verbleiben. Danach muss zwingend gespült werden.",
              icon: <AlertOctagon className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Gründliches Nachspülen",
              description: "Das System muss nach der Einwirkzeit so lange mit Frischwasser gespült werden, bis die Konzentration des Desinfektionsmittels am Auslauf der Konzentration des Einspeisewassers entspricht.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Chemikalien-Check */}
      <Reveal>
        <SectionHead
          title="Welche Chemie verträgt PP-R?"
          lead="Ein Auszug aus der K Aqua Beständigkeitsliste für typische Desinfektionsmittel."
        />
        <DeepMatrix
          data={[
            ["Wirkstoff", "Typische Anwendung", "Verträglichkeit mit K Aqua PP-R"],
            ["Chlor / Natriumhypochlorit", "Stoßdesinfektion (50 mg/l, 24h)", "Gut (bei Einhaltung von Konzentration und Zeit)"],
            ["Chlordioxid", "Kontinuierliche Dosierung (max 0,2 mg/l)", "Gut (sehr materialschonend im Trinkwasser)"],
            ["Wasserstoffperoxid (H2O2)", "Stoßdesinfektion (150 mg/l, 24h)", "Gut"],
            ["Ozon", "Aufbereitung im Wasserwerk", "Bedingt (hohe Konzentrationen können PP-R oxidieren)"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Expertenwissen */}
      <Reveal>
        <SectionHead
          title="FAQ: Hygiene & Wartung"
          lead="Fragen von Facility Managern und Betreibern."
        />
        <DeepFAQ
          items={[
            {
              q: "Ist thermische Desinfektion besser als chemische?",
              a: "Ja, in den meisten Fällen. Bei der thermischen Desinfektion wird das gesamte Warmwassernetz für mindestens 3 Minuten auf über 70°C aufgeheizt. Das tötet Legionellen zuverlässig ab und schont K Aqua PP-R Rohre, da keine oxidierenden Chemikalien eingesetzt werden."
            },
            {
              q: "Gibt es Biofilmbildung in PP-R Rohren?",
              a: "Die Oberfläche von PP-R ist mikroskopisch glatter als z.B. verzinkter Stahl. Dadurch fällt es Bakterien deutlich schwerer, anzuhaften und einen Biofilm aufzubauen. Völlig immun ist jedoch kein Material bei stagnierendem, lauwarmem Wasser."
            },
            {
              q: "Was passiert, wenn Dauer-Chlorung zu hoch eingestellt ist?",
              a: "Chlor ist ein starkes Oxidationsmittel. Ein dauerhaft zu hoher Chlorgehalt (weit über der Trinkwasserverordnung) entzieht dem Polypropylen über die Jahre seine Stabilisatoren. Das Rohr kann vorzeitig altern und verspröden."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Technischer Support */}
      <Reveal>
        <CTABand
          title="Unterschiedliche Länder, unterschiedliche Chemie"
          subtitle="Sie planen ein Projekt im Ausland und müssen lokale Desinfektionsmittel verwenden? Senden Sie uns das Sicherheitsdatenblatt – wir prüfen die chemische Beständigkeit für Sie."
          buttonText="Technischen Support kontaktieren"
          buttonLink="/kontakt"
          icon={<FlaskConical className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
