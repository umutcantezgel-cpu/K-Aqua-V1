import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { Stagger } from "@/components/ui/Stagger";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Flame, Thermometer, Shield, ShieldAlert, Layers, Activity } from "@/components/ui/icon";

export const fernwaermeNahwaerme: NewsPost = {
  slug: "fernwaerme-nahwaerme-ppr-rohrsysteme-isoliert",
  title: {
    de: "Fernwärme & Nahwärme mit PPR Rohren",
    de: "Fernwärme & Nahwärme mit PPR-Rohren",
    en: "District & Local Heating with PPR Pipes",
    ar: "تدفئة المناطق والتدفئة المحلية بأنابيب PPR"
  },
  date: "2024-07-15",
  excerpt: {
    de: "Urbane Wärmenetze erfordern Rohrsysteme mit minimalen Wärmeverlusten und maximaler Korrosionsbeständigkeit. Vorisolierte PPRCT-Rohrsysteme von K Aqua ersetzen zunehmend schweren Stahl im unterirdischen Erdbereich.",
    en: "Learn why pre-insulated K Aqua PPR pipes with polyurethane insulation and robust HDPE casing are the most energy-efficient and durable solution for modern district heating and cooling networks.",
    ar: "تعرف على سبب كون أنابيب K Aqua PPR المعزولة مسبقًا مع عزل البولي يوريثان وغلاف HDPE القوي هي الحل الأكثر كفاءة في استهلاك الطاقة والأطول عمرًا لشبكات التدفئة والتبريد المركزية الحديثة."
  },
  coverImage: "/images/news/district-heating.jpg",
  category: "Infrastruktur",
  tags: ["Fernwärme", "Nahwärme", "Infrastruktur", "Vorisoliert", "PPRCT", "Wärmeverlust", "Rohrsysteme", "PPR"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Flame className="w-5 h-5" />
                  <span>Urbane Wärmewende</span>
                </div>
              }
              title="Klimaneutrale Wärme unter der Stadt"
              lead="Erfahren Sie, warum vorgedämmte K Aqua PPR-Rohre mit Polyurethan-Isolierung und robustem HDPE-Mantel die energieeffizienteste und langlebigste Lösung für moderne Nahwärme- und Fernkältenetze darstellen. Um Quartiere effizient zu versorgen, müssen Kilometer an Rohrleitungen im Erdreich verlegt werden. Die Herausforderung: Hitze drinnen halten, Feuchtigkeit draußen halten. Vorisolierte Kunststoffrohre sind die Lösung."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Heißwasser-Flow */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* DeepMatrix: Technische Parameter */}
      <Reveal>
        <SectionHead
          title="Technische Spezifikationen (Underground)"
          lead="Wie werden die vorisolierten K Aqua Rohre auf der Baustelle verbunden? Unsere PPRCT-Systeme wurden speziell für extreme Anforderungen im direkten Erdreich entwickelt."
        />
        <DeepMatrix
          data={[
            ["Parameter", "K Aqua Isoliertes System", "Stahl (isoliert)"],
            ["Wärmeleitfähigkeit (Isolierung)", "λ = 0,024 W/mK (PUR)", "λ = 0,026 W/mK (PUR)"],
            ["Max. Betriebstemperatur", "Bis zu 95 °C (kurzz. 110 °C)", "Bis zu 140 °C"],
            ["Außenkorrosion im Erdreich", "Unmöglich (PE-HD Mantel)", "Kathodischer Schutz nötig"],
            ["Gewicht (z.B. DN 100)", "ca. 5,2 kg/m", "ca. 18,5 kg/m"],
            ["Verbindungstechnik", "Homogenes Schweißen", "Aufwändiges Stahlschweißen"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Warum PPRCT Stahl ablöst */}
      <Reveal>
        <SectionHead
          title="Der Systemvorteil im Tiefbau"
          lead="Neben den thermodynamischen Eigenschaften punktet Kunststoff vor allem in der Bauausführung und Langlebigkeit."
        />
        <BentoGrid
          items={[
            {
              title: "Absolut korrosionsfrei",
              description: "Stahl-Verbundrohre benötigen oft aufwendige Leckageüberwachungssysteme (Drähte im PUR-Schaum), da ein winziges Loch unbemerkt das gesamte Rohr wegrosten lässt. Das PPR-Mediumrohr korrodiert nicht – teure und störanfällige elektronische Überwachungen können oft eingespart werden.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Schneller Grabenfortschritt",
              description: "Stahl-Fernwärmerohre sind bei Beschädigungen des Mantels sofort korrosionsgefährdet. Dringt Grundwasser ein, rostet das Rohr von außen durch. Das PPR-Mediumrohr von K Aqua ist 100% korrosionsbeständig, selbst bei beschädigter Dämmung. Das spart teure Bagger- und Kranstunden.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Minimale Wärmeverluste",
              description: "Der Verbund aus PPRCT-Mediumrohr und hochwertigem PUR-Hartschaum isoliert effizienter als viele Standardsysteme.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* Stagger: Der Aufbau des vorisolierten Rohrs */}
      <Reveal>
        <SectionHead
          title="Der 3-Schicht-Verbundaufbau"
          lead="Ein geschlossenes System für maximale Effizienz."
          align="center"
        />
        <Stagger
          items={[
            {
              title: "1. Mediumrohr (Innen)",
              description: "K Aqua K-Faser PPRCT-Rohr. Garantiert optimalen Durchfluss, ist inkrustationsfrei und hält hohen Temperaturen sowie Drücken stand."
            },
            {
              title: "2. Isolierung (Mitte)",
              description: "Unser eingespritzter PUR-Schaum besitzt eine exzellente Wärmeleitfähigkeit (Lambdawert) und umschließt das Mediumrohr lückenlos. Kältebrücken, wie sie bei nachträglich angebrachten Isolierschalen entstehen, sind ausgeschlossen."
            },
            {
              title: "3. Mantelrohr (Außen)",
              description: "Extrudiertes Polyethylen (PE-HD). Bietet ultimativen mechanischen Schutz gegen Steine, Wurzeln und Feuchtigkeit im Erdreich."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Projektanfrage */}
      <Reveal>
        <CTABand
          title="Planen Sie ein lokales Wärmenetz?"
          subtitle="Sprechen Sie mit unseren Infrastruktur-Experten. Wir unterstützen Sie bei der Auslegung der Rohrnennweiten und der Grabenplanung."
          buttonText="Infrastrukturberatung anfragen"
          buttonLink="/kontakt"
          icon={<Layers className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
