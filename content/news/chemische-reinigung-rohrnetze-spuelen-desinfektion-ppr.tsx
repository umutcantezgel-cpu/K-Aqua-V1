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
  title: {
    de: "Chemische Reinigung von PPR-Rohren",
    en: "Chemical Cleaning of PPR Pipes",
    ar: "التنظيف الكيميائي لأنابيب PPR"
  },
  date: "2025-01-24",
  excerpt: {
    de: "Hygiene nach der Installation: Wie PPR-Rohrsysteme und Netze normgerecht gespült und bei Bedarf chemisch desinfiziert werden, ohne das hochwertige Material zu schädigen.",
    en: "Hygiene after installation: How PPR pipe systems and networks are flushed according to standards and chemically disinfected when necessary, without damaging the high-quality material.",
    ar: "النظافة بعد التركيب: كيفية شطف أنظمة وشبكات أنابيب PPR وفقاً للمعايير وتطهيرها كيميائياً عند الضرورة، دون الإضرار بالمواد عالية الجودة."
  },
  coverImage: "/images/news/cleaning-disinfection.jpg",
  category: "Wartung & Betrieb",
  tags: ["Desinfektion", "Spülen", "Hygiene", "Legionellen", "Wartung", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Activity className="w-5 h-5" />
                  <span>Trinkwasserhygiene & PPR-Rohrsysteme</span>
                </div>
              }
              title="Der saubere Start ins Gebäudeleben für PPR-Rohrnetze"
              lead="Nach der Druckprüfung ist vor der Inbetriebnahme. Jede Trinkwasserinstallation muss vor der Nutzung gründlich gespült werden, um mikrobiologische Risiken und Bauverschmutzungen zu minimieren. In kritischen Fällen, wie bei Legionellenbefall im Bestand, wird eine chemische Desinfektion zwingend. Erfahren Sie, warum K Aqua PPR-Leitungen auch harten chemischen Keulen widerstehen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Wasser-/Tropfenanimation */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Der Spülprozess */}
      <Reveal>
        <SectionHead
          title="Der normgerechte Spülprozess in PPR-Rohrsystemen"
          lead="Eine fachgerechte Desinfektion setzt eine gründliche mechanische und hygienische Vorreinigung aller Rohrnetze voraus."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "Stufe 1: Spülen mit Trinkwasser",
                description: "Der Erstschritt im Rohrsystem. Das Netz wird abschnittsweise mit klarem, filtriertem Trinkwasser gespült. Die Fließgeschwindigkeit sollte mindestens 2,0 m/s an der am weitesten entfernten Zapfstelle betragen, um lose Partikel und Bauabrieb vollständig auszutragen."
              },
              {
                title: "Stufe 2: Spülen mit Wasserluft-Gemisch",
                description: "Bei hartnäckigen Biofilmen oder Ablagerungen wird dem Spülwasser stoßweise ölfreie Druckluft beigemischt (Impulsspülung). Die entstehenden Turbulenzen und Kavitationsbläschen lösen Beläge von den glatten PPR-Innenwänden."
              },
              {
                title: "Stufe 3: Dosierte chemische Desinfektion",
                description: "Wird angewendet, wenn mikrobielle Belastungen festgestellt wurden. Der Einsatz zertifizierter Desinfektionsmittel (z.B. Natriumhypochlorit oder Wasserstoffperoxid) muss exakt auf die Verträglichkeit von PPR-Rohrsystemen abgestimmt sein."
              },
              {
                title: "Stufe 4: Wiederholte Beprobung & Freigabe",
                description: "Nach vollständigem Ausspülen der Chemikalien werden mikrobiologische Wasserproben an definierten Entnahmestellen gezogen. Erst nach negativem Befund wird das Trinkwassernetz offiziell für den Betrieb freigegeben."
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

      {/* DeepMatrix: Chemikaliencheck */}
      <Reveal>
        <SectionHead
          title="Welche Chemie verträgt PPR?"
          lead="Ein Auszug aus der K Aqua Beständigkeitsliste für typische Desinfektionsmittel."
        />
        <DeepMatrix
          data={[
            ["Wirkstoff", "Typische Anwendung", "Verträglichkeit mit K Aqua PPR"],
            ["Chlor / Natriumhypochlorit", "Stoßdesinfektion (50 mg/l, 24h)", "Gut (bei Einhaltung von Konzentration und Zeit)"],
            ["Chlordioxid", "Kontinuierliche Dosierung (max 0,2 mg/l)", "Gut (sehr materialschonend im Trinkwasser)"],
            ["Wasserstoffperoxid (H2O2)", "Stoßdesinfektion (150 mg/l, 24h)", "Gut"],
            ["Ozon", "Aufbereitung im Wasserwerk", "Bedingt (hohe Konzentrationen können PPR oxidieren)"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Häufige Fragen zur Reinigung */}
      <Reveal>
        <SectionHead
          title="FAQ: Hygiene & Wartung"
          lead="Fragen von Facility Managern und Betreibern."
        />
        <DeepFAQ
          items={[
            {
              q: "Ist thermische Desinfektion besser als chemische?",
              a: "Ja, in den meisten Fällen. Bei der thermischen Desinfektion wird das gesamte Warmwassernetz für mindestens 3 Minuten auf über 70°C aufgeheizt. Das tötet Legionellen zuverlässig ab und schont K Aqua PPR Rohre, da keine oxidierenden Chemikalien eingesetzt werden."
            },
            {
              q: "Gibt es Biofilmbildung in PPR Rohren?",
              a: "Die Oberfläche von PPR ist mikroskopisch glatter als z.B. verzinkter Stahl. Dadurch fällt es Bakterien deutlich schwerer, anzuhaften und einen Biofilm aufzubauen. Völlig immun ist jedoch kein Material bei stagnierendem, lauwarmem Wasser."
            },
            {
              q: "Was passiert, wenn Dauerchlorung zu hoch eingestellt ist?",
              a: "Chlor ist ein starkes Oxidationsmittel. Ein dauerhaft zu hoher Chlorgehalt (weit über der Trinkwasserverordnung) entzieht dem Polypropylenrohr über die Jahre seine Stabilisatoren. Das Rohr kann vorzeitig altern und verspröden."
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
  ),
};
