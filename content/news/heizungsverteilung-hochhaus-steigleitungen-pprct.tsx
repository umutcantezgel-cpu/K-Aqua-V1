import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Building2, ArrowUpRight, Activity, ShieldCheck } from "@/components/ui/icon";

export const heizungsverteilungHochhaus: NewsPost = {
  slug: "heizungsverteilung-hochhaus-steigleitungen-pprct",
  title: {
    de: "Heizungsverteilung im Hochhaus: PP-RCT",
    en: "Heating Distribution in High-Rise Buildings: PP-RCT",
    ar: "توزيع التدفئة في المباني الشاهقة: PP-RCT"
  },
  date: "2024-11-04",
  excerpt: {
    de: "Hochhäuser stellen TGA-Planer vor statische und hydraulische Herausforderungen. K Aqua PPR & PP-RCT Rohrsysteme reduzieren das Gewicht im Steigschacht dramatisch, bieten exzellenten Schallschutz und widerstehen extremen Drücken in der Heizungsverteilung.",
    en: "High-rise buildings present structural and hydraulic challenges for MEP planners. K Aqua PPR & PP-RCT pipe systems dramatically reduce weight in the riser shaft, offer excellent sound insulation, and withstand extreme pressures in heating distribution.",
    ar: "تمثل المباني الشاهقة تحديات إنشائية وهيدروليكية لمخططي الهندسة الميكانيكية والكهربائية والسباكة (MEP). تقلل أنظمة أنابيب K Aqua PPR و PP-RCT بشكل كبير من الوزن في عمود الصاعد، وتوفر عزلًا صوتيًا ممتازًا، وتتحمل الضغوط الشديدة في توزيع التدفئة."
  },
  coverImage: "/images/news/highrise-building.jpg",
  category: "Heizungstechnik",
  tags: ["Hochhaus", "Steigleitung", "TGA", "PP-RCT", "PPR", "Rohrsysteme", "Schallschutz", "Heizungsverteilung"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Building2 className="w-5 h-5" />
                  <span>High-Rise & TGA-Planung</span>
                </div>
              }
              title="Vertikale Ingenieurskunst ohne Rost: Effiziente Heizungsverteilung im Hochhaus"
              lead="In Hochhäusern (High-Rise Buildings) summieren sich die Probleme klassischer Metallrohre: Sie belasten die Gebäudestatik durch ihr enormes Eigengewicht, erfordern schweres Hebezeug im Steigschacht und übertragen Fließ- sowie Knackgeräusche direkt in angrenzende Wohnräume. K Aqua PP-RCT und PPR Rohrsysteme lösen diese Herausforderungen bei vertikalen Steigleitungen elegant und dauerhaft sicher – selbst bei Drücken jenseits der 20 Bar in den unteren Technikzonen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Druckaufbau in Steigleitungen */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Argumente für PP-RCT in Hochhäusern */}
      <Reveal>
        <SectionHead
          title="Vorteile im Steigschacht"
          lead="Warum PP-RCT die klassische C-Stahl Steigleitung ablöst."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Massive Gewichtsreduktion",
                description: "Ein 100 Meter langer Strang aus DN 100 C-Stahlrohren wiegt mit Wasser gefüllt mehrere Tonnen. K Aqua PP-RCT ist bis zu 70 % leichter. Das erleichtert nicht nur die Montage ohne Schwerlastkräne im Schacht, sondern entlastet auch die Statik des Gebäudes erheblich."
              },
              {
                title: "2. Überragender Schallschutz",
                description: "Thermische Längenänderungen führen bei Metallrohren oft zu lauten Knackgeräuschen in den Rohrschellen. Kunststoff besitzt hervorragende schallabsorbierende Eigenschaften. Fließgeräusche und Ausdehnungsgeräusche werden massiv gedämpft – ideal für Luxus-Apartments."
              },
              {
                title: "3. Absolute Korrosionssicherheit",
                description: "Eine Leckage durch Durchrostung im 40. Stockwerk verursacht katastrophale Wasserschäden in den darunterliegenden Etagen. K Aqua PP-RCT ist absolut korrosionsfrei und garantiert jahrzehntelange Betriebssicherheit."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Materialvergleich Steigleitung */}
      <Reveal>
        <SectionHead
          title="Materialvergleich (DN 100)"
          lead="Faktenbasierter Vergleich für vertikale Heizungsstränge."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "K Aqua PP-RCT", "C-Stahl", "Kupfer"],
            ["Gewicht (leer, pro Meter)", "Sehr leicht (~2,5 kg)", "Sehr schwer (~10 kg)", "Schwer (~5 kg)"],
            ["Verbindungstechnik", "Muffenschweißen (ohne Flamme)", "Pressen / Schweißen (Flamme)", "Pressen / Löten (Flamme)"],
            ["Schallübertragung", "Sehr gering", "Sehr hoch", "Hoch"],
            ["Korrosionsrisiko (Sauerstoff)", "Keines (mit EVOH-Schicht)", "Sehr hoch (Rostgefahr)", "Mittel"]
          ]}
        />
      </Reveal>

      {/* StickyScrollReveal: Der Weg nach oben */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Die Technikzentrale (Keller)",
                description: "Hier herrscht der höchste statische Druck der gesamten Wassersäule. K Aqua Rohre mit hohem SDR (z.B. SDR 7.4) und Glasfaserverstärkung halten selbst enormen Systemdrücken in High-Rise-Gebäuden mühelos stand.",
                icon: <Activity className="w-8 h-8 text-primary" />
              },
              {
                title: "Der Steigschacht (Vertikal)",
                description: "Auf dem Weg nach oben muss die thermische Längenänderung (Ausdehnung bei Heizwasser) kontrolliert werden. Durch fachgerecht berechnete Dehnungsbögen (U-Bögen) und Festpunkte nimmt das Rohr die Dehnung geräuschlos auf.",
                icon: <ArrowUpRight className="w-8 h-8 text-primary" />
              },
              {
                title: "Die Etagenverteilung (Horizontal)",
                description: "In den einzelnen Stockwerken erfolgt der Abzweig vom Steigstrang zu den Heizkreisverteilern der Wohnungen. Die einfache und sichere Verschweißung per Heizwendelmuffe oder Stumpfschweißung ermöglicht einen schnellen Baufortschritt.",
                icon: <Building2 className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* GlossaryGrid: Technische Planung */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Wichtige Planungsbegriffe"
            items={[
              {
                term: "Längenausdehnung",
                definition: "Faserverstärktes PP-RCT reduziert die thermische Ausdehnung um ca. 75 % im Vergleich zu reinem PP-R und verhält sich ähnlich wie Metallrohre.",
                icon: <ArrowUpRight className="w-6 h-6" />
              },
              {
                term: "Statischer Druck (Wassersäule)",
                definition: "Pro 10 Meter Gebäudehöhe steigt der Druck um 1 Bar. Bei 150 Metern Höhe müssen Rohre im Keller dauerhaft 15 Bar plus Pumpendruck aushalten.",
                icon: <Activity className="w-6 h-6" />
              },
              {
                term: "Festpunkt / Loslager",
                definition: "Spezielle Rohrschellen, die die Ausdehnungskräfte gezielt in den Dehnungsbogen leiten (Festpunkt) oder das Rohr gleiten lassen (Loslager).",
                icon: <ShieldCheck className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Hochhaus Profil */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "%", l: "Geringeres Eigengewicht im Vergleich zu metallischen Steigleitungen." },
              { n: "0", l: "Brandgefahr bei der Installation (Schweißen erfolgt elektrisch, keine offene Flamme)." },
              { n: "20", u: "+", l: "Bar Betriebsdruck können durch die richtige SDR-Klasse abgesichert werden." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: TGA Support */}
      <Reveal>
        <CTABand
          title="Planen Sie ein High-Rise-Projekt?"
          subtitle="Überlassen Sie uns die statische Berechnung. Unsere Ingenieure dimensionieren Ihre Steigleitungen, planen Dehnungsbögen und definieren die exakten Positionen für Festpunkte."
          buttonText="Berechnungsservice anfragen"
          buttonLink="/kontakt"
          icon={<Building2 className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
