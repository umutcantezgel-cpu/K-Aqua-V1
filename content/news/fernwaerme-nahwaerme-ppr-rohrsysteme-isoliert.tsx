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
    en: "District & Local Heating with PPR Pipes",
    ar: "تدفئة المناطق والتدفئة المحلية بأنابيب PPR"
  },
  date: "2024-07-15",
  teaser: {
    de: "Urbane Wärmenetze erfordern Rohrsysteme mit minimalen Wärmeverlusten und maximaler Korrosionsbeständigkeit. Vorisolierte PPRCT Rohrsysteme von K Aqua ersetzen zunehmend schweren Stahl im unterirdischen Erdbereich.",
    en: "Urban heating networks require pipe systems with minimal heat loss and maximum corrosion resistance. Pre-insulated PPRCT pipe systems from K Aqua are increasingly replacing heavy steel in underground installations.",
    ar: "تتطلب شبكات التدفئة الحضرية أنظمة أنابيب بأقل قدر من فقدان الحرارة وأقصى مقاومة للتآكل. تحل أنظمة أنابيب PPRCT المعزولة مسبقًا من K Aqua بشكل متزايد محل الفولاذ الثقيل في التركيبات تحت الأرض."
  },
  excerpt: {
    de: "Urbane Wärmenetze erfordern Rohrsysteme mit minimalen Wärmeverlusten und maximaler Korrosionsbeständigkeit. Vorisolierte PPRCT Rohrsysteme von K Aqua ersetzen zunehmend schweren Stahl im unterirdischen Erdbereich.",
    en: "Urban heating networks require pipe systems with minimal heat loss and maximum corrosion resistance. Pre-insulated PPRCT pipe systems from K Aqua are increasingly replacing heavy steel in underground installations.",
    ar: "تتطلب شبكات التدفئة الحضرية أنظمة أنابيب بأقل قدر من فقدان الحرارة وأقصى مقاومة للتآكل. تحل أنظمة أنابيب PPRCT المعزولة مسبقًا من K Aqua بشكل متزايد محل الفولاذ الثقيل في التركيبات تحت الأرض."
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
              lead="Die Wärmewende findet im Untergrund statt. Um Quartiere und Städte effizient mit Fern- und Nahwärme zu versorgen, müssen Kilometer an Rohrleitungen im Erdreich verlegt werden. Die Herausforderung: Hitze drinnen halten, Feuchtigkeit draußen halten. Vorisolierte Kunststoffrohre sind die Lösung."
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
          <h2>Fern- und Nahwärmenetze der Zukunft: Der Paradigmenwechsel von Stahl zu PP-RCT</h2>
          <p>
            Im Zuge der globalen Energiewende rückt die Dekarbonisierung des Wärmesektors massiv in den Fokus von Stadtplanern und Versorgern. Urbane Wärmenetze (Fernwärme) und dezentrale Quartierslösungen (Nahwärme) sind die Schlüsselinfrastrukturen, um Abwärme aus der Industrie, Geothermie oder Biomasse effizient an die Verbraucher zu verteilen. Das traditionelle Rohrleitungsmaterial für diese unterirdischen Trassen war jahrzehntelang das Kunststoffmantelrohr (KMR) mit einem Mediumrohr aus Stahl. K Aqua treibt hier mit vorisolierten PP-RCT (Polypropylen Random-Copolymer mit modifizierter kristalliner Struktur) Rohrsystemen einen massiven technologischen Paradigmenwechsel voran.
          </p>
          
          <h3>Die Schwachstelle von Stahl im Erdreich</h3>
          <p>
            Stahlrohre haben einen entscheidenden, systemimmanenten Nachteil: Sie korrodieren. Im feuchten Erdreich sind metallische Leitungen ständigen galvanischen Prozessen und der Gefahr durch Streuströme ausgesetzt. Um diese Zersetzung zu verhindern, müssen Stahl-KMR-Systeme mit teuren und wartungsintensiven Leckageüberwachungssystemen (Meldestromkreisen) ausgestattet und oft kathodisch geschützt werden. Schon eine kleine Verletzung des PE-Außenmantels durch einen spitzen Stein im Erdreich führt über kurz oder lang zur Durchrostung des inneren Stahlrohrs.
          </p>
          <p>
            PP-RCT hingegen ist ein Kunststoff, der elektrochemisch vollkommen inert ist. Er kann physikalisch nicht rosten. Weder Feuchtigkeit von außen noch der Sauerstoffgehalt des Heizungswassers im Inneren können das K Aqua Rohr angreifen. Diese absolute Korrosionsfreiheit macht die Trassen über Jahrzehnte hinweg komplett wartungsfrei. Teure Überwachungselektronik wird obsolet.
          </p>

          <h3>Minimierung der Wärmeverluste</h3>
          <p>
            Die Wirtschaftlichkeit eines Nahwärmenetzes steht und fällt mit der Wärmeverlustrate. Wenn das 80 °C heiße Vorlaufwasser auf dem Weg vom Heizkraftwerk zum Verbraucher wertvolle Energie an das umgebende Erdreich abgibt, sinkt die Gesamteffizienz des Netzes drastisch.
          </p>
          <p>
            K Aqua verwendet einen hochgradig isolierenden, FCKW-freien Polyurethan-Hartschaum (PUR) zwischen dem Mediumrohr und dem Außenmantel. Während Stahl ein exzellenter Wärmeleiter ist und die Hitze förmlich in den Schaum zieht, wirkt PP-RCT bereits als natürlicher thermischer Isolator. Diese Kombination aus schlecht leitendem Kunststoff und hochdichtem PUR-Schaum sorgt für Lambda-Werte (λ), die die Wärmeverluste auf das physikalische Minimum reduzieren.
          </p>

          <h3>Gewicht und Verlegegeschwindigkeit</h3>
          <p>
            Zeit ist auf städtischen Baustellen der teuerste Faktor. Straßensperrungen verursachen Staus und Anwohnerbeschwerden. Vorisolierte PP-RCT Rohre sind bis zu 70 % leichter als vergleichbare Stahlsysteme. In den Dimensionen bis DN 100 können K Aqua Rohre oft ohne schwere Autokrane oder Kettenbagger von Hand in den Rohrgraben abgelassen werden. 
          </p>
          <p>
            Die Verbindungstechnik durch Elektroschweißmuffen oder Heizelementstumpfschweißung ist zudem wesentlich schneller, witterungsunabhängiger und weniger fehleranfällig als das aufwendige Röntgenschweißen von dicken Stahlrohren. Der Graben kann deutlich zügiger wieder verfüllt und die Straße für den Verkehr freigegeben werden.
          </p>

          <h3>Der PE-HD Außenmantel</h3>
          <p>
            Den äußeren Abschluss des K Aqua Verbundsystems bildet ein dickwandiger Mantel aus hochverdichtetem Polyethylen (PE-HD). Dieser schützt die empfindliche PUR-Schaumschicht vor mechanischen Beschädigungen beim Einbau, vor spitzen Steinen im Grabenbett, vor aggressiven Wurzeln und vor drückendem Grundwasser. 
          </p>

          <h3>Häufig gestellte Fragen (FAQ) zur Nahwärme mit PP-RCT</h3>
          <h4>Welche Vorlauftemperaturen hält das PP-RCT System aus?</h4>
          <p>
            K Aqua PP-RCT ist für typische moderne Nahwärmenetze (Low-Ex-Netze) ideal geeignet. Es ist für Dauerbetriebstemperaturen von bis zu 80 °C (Spitzen bis 90 °C) bei entsprechenden Drücken ausgelegt. Für klassische Hochtemperatur-Fernwärme (über 120 °C) ist es jedoch nicht geeignet.
          </p>
          <h4>Braucht das System Kompensatoren für die Längenausdehnung?</h4>
          <p>
            Nein. Bei unterirdischer Verlegung im Erdreich reibt sich der PE-HD Mantel fest im Sandbett ein (Reibschluss). Die durch Temperaturänderungen entstehenden Ausdehnungskräfte werden in axiale Druckspannungen im Material umgewandelt. Das Rohr ist im Erdreich eingespannt und bewegt sich nicht.
          </p>
          <h4>Wie erfolgt die Anbindung an die Gebäude?</h4>
          <p>
            Über flexible oder starre Hauseinführungen. Im Keller des Endverbrauchers (Übergabestation) kann problemlos mit herkömmlichen K Aqua Fittings und Flanschen auf die Hausinstallation übergegangen werden.
          </p>
        </div>
      </Reveal>

      {/* DeepMatrix: Technische Parameter */}
      <Reveal>
        <SectionHead
          title="Stahl vs Kunststoff im Erdreich"
          lead="Unsere vorisolierten PPRCT Systeme wurden speziell für extreme Anforderungen im direkten Erdreich entwickelt."
        />
        <DeepMatrix
          data={[
            ["Parameter", "K Aqua Isoliertes System", "Stahl (isoliert)"],
            ["Eigenschaft", "Vorisoliertes PPRCT (K Aqua)", "Vorisoliertes Stahlrohr (KMR)"],
            ["Wärmeverlust", "Sehr gering (λ = 0,024 W/mK)", "Gering bis mittel"],
            ["Außenkorrosion im Erdreich", "Unmöglich (PE HD Mantel)", "Kathodischer Schutz nötig"],
            ["Gewicht (DN 100)", "ca. 8 kg/m", "ca. 25 kg/m"],
            ["Verbindungstechnik", "Homogenes Schweißen", "Aufwändiges Stahlschweißen"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Warum PPRCT Stahl ablöst */}
      <Reveal>
        <SectionHead
          title="Vorteile des PPRCT Systems"
          lead="Neben den thermodynamischen Eigenschaften punktet Kunststoff vor allem in der Bauausführung und Langlebigkeit."
        />
        <BentoGrid
          items={[
            {
              title: "Absolut korrosionsfrei",
              description: "Im Gegensatz zu Stahlrohren benötigen PPRCT Systeme keinen kathodischen Korrosionsschutz. Bodenfeuchte und Streuströme verursachen keine Schäden.",
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
              description: "Der Verbund aus PPRCT Mediumrohr und hochwertigem PUR Hartschaum isoliert effizienter als viele Standardsysteme.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* Stagger: Der Aufbau des vorisolierten Rohrs */}
      <Reveal>
        <SectionHead
          title="Der 3 Schicht Verbundaufbau"
          lead="Ein geschlossenes System für maximale Effizienz."
          align="center"
        />
        <Stagger
          items={[
            {
              title: "1. Das Mediumrohr",
              description: "K Aqua K Faser PPRCT Rohr. Garantiert optimalen Durchfluss, ist inkrustationsfrei und hält hohen Temperaturen sowie Drücken stand."
            },
            {
              title: "2. Die Dämmschicht",
              description: "FCKW freier Polyurethan Hartschaum (PUR). Sorgt für eine exzellente Wärmedämmung und einen festen Verbund zwischen Innen- und Außenrohr."
            },
            {
              title: "3. Der Mantel",
              description: "Extrudiertes Polyethylen (PE HD). Bietet ultimativen mechanischen Schutz gegen Steine, Wurzeln und Feuchtigkeit im Erdreich."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Projektanfrage */}
      <Reveal>
        <CTABand
          title="Tiefbauprojekte effizient umsetzen"
          subtitle="Sprechen Sie mit unseren Infrastruktur Experten. Wir unterstützen Sie bei der Auslegung der Rohrnennweiten und der Grabenplanung."
          buttonText="Infrastruktur Beratung anfragen"
          buttonLink="/kontakt"
          icon={<Layers className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
