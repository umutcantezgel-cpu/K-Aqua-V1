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
    de: "Fernwärme & Nahwärme mit PP-R Rohren",
    en: "District & Local Heating with PP-R Pipes",
    ar: "تدفئة المناطق والتدفئة المحلية بأنابيب PP-R"
  },
  date: "2024-07-15",
  excerpt: {
    de: "Urbane Wärmenetze erfordern Rohrsysteme mit minimalen Wärmeverlusten und maximaler Korrosionsbeständigkeit. Vorisolierte PP-RCT Rohrsysteme von K-Aqua ersetzen zunehmend schweren Stahl im unterirdischen Erdbereich.",
    en: "Urban heating networks require pipe systems with minimal heat loss and maximum corrosion resistance. Pre-insulated PP-RCT pipe systems from K-Aqua are increasingly replacing heavy steel in underground installations.",
    ar: "تتطلب شبكات التدفئة الحضرية أنظمة أنابيب بأقل قدر من فقدان الحرارة وأقصى مقاومة للتآكل. تحل أنظمة أنابيب PP-RCT المعزولة مسبقًا من K-Aqua بشكل متزايد محل الفولاذ الثقيل في التركيبات تحت الأرض."
  },
  coverImage: "/images/news/district-heating.jpg",
  category: "Infrastruktur",
  tags: ["Fernwärme", "Nahwärme", "Infrastruktur", "Vorisoliert", "PP-RCT", "Wärmeverlust", "Rohrsysteme", "PPR"],
  
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
              lead="Die Wärmewende findet im Untergrund statt. Um Quartiere und Städte effizient mit Fern- und Nahwärme zu versorgen, müssen Kilometer an Rohrleitungen im Erdreich verlegt werden. Die Herausforderung: Hitze drinnen halten, Feuchtigkeit draußen halten. Vorisolierte Kunststoffrohre sind die Lösung."
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
          lead="Unsere vorisolierten PP-RCT Systeme wurden speziell für extreme Anforderungen im direkten Erdreich entwickelt."
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

      {/* BentoGrid: Warum PP-RCT Stahl ablöst */}
      <Reveal>
        <SectionHead
          title="Der Systemvorteil im Tiefbau"
          lead="Neben den thermodynamischen Eigenschaften punktet Kunststoff vor allem in der Bauausführung und Langlebigkeit."
        />
        <BentoGrid
          items={[
            {
              title: "Absolut korrosionsfrei",
              description: "Im Gegensatz zu Stahlrohren benötigen PP-RCT Systeme keinen kathodischen Korrosionsschutz. Bodenfeuchte und Streuströme verursachen keine Schäden.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Schneller Grabenfortschritt",
              description: "Durch das geringe Gewicht können lange Trassen oft ohne schweres Hebezeug verlegt werden. Das spart teure Bagger- und Kranstunden.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Minimale Wärmeverluste",
              description: "Der Verbund aus PP-RCT Mediumrohr und hochwertigem PUR-Hartschaum isoliert effizienter als viele Standardsysteme.",
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
              description: "K Aqua K-Faser PP-RCT Rohr. Garantiert optimalen Durchfluss, ist inkrustationsfrei und hält hohen Temperaturen sowie Drücken stand."
            },
            {
              title: "2. Isolierung (Mitte)",
              description: "FCKW-freier Polyurethan-Hartschaum (PUR). Sorgt für eine exzellente Wärmedämmung und einen festen Verbund zwischen Innen- und Außenrohr."
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
          buttonText="Infrastruktur-Beratung anfragen"
          buttonLink="/kontakt"
          icon={<Layers className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
