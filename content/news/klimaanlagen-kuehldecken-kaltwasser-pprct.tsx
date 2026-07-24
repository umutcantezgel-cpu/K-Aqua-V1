import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Droplet, Thermometer, Shield, Leaf } from "@/components/ui/icon";

export const klimaanlagenKuehldecken: NewsPost = {
  slug: "klimaanlagen-kuehldecken-kaltwasser-pprct",
  title: {
    de: "Klimaanlagen, Chiller & Kaltwassersätze mit K-Aqua PPRCT",
    en: "Air Conditioning & Chilled Ceilings with PPRCT",
    ar: "تكييف الهواء والأسقف المبردة باستخدام PPRCT"
  },
  date: "2024-07-28",
  excerpt: {
    de: "Kondenswasser ist der heimliche Feind jeder Gebäudetechnik. Erfahren Sie im Detail, wie korrosionsfreie PPRCT-Rohrsysteme von K-Aqua in Kaltwassersätzen gefährliches Schwitzwasser kontrollieren und durch hohe Eigendämmung wertvolle Bauhöhe einsparen.",
    en: "Condensation is the enemy of metallic piping. Discover how corrosion-free PPRCT & PPR pipe systems from K Aqua prevent sweating.",
    ar: "التكثيف هو عدو الأنابيب المعدنية. اكتشف كيف تمنع أنظمة أنابيب PPRCT و PPR الخالية من التآكل من K Aqua التعرق."
  },
  coverImage: "/images/news/chiller-cooling.jpg",
  category: "Gebäudetechnik",
  tags: ["Kaltwasser", "Kühldecken", "Klimaanlagen", "PPRCT", "PPR", "Rohrsysteme", "Taupunkt", "Korrosionsschutz", "CUI", "Chiller"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Droplet className="w-5 h-5" />
                  <span>Kälte & Klimatechnik</span>
                </div>
              }
              title="Kaltwasserleitungen ohne das gefürchtete Schwitzwasserrisiko"
              lead="Bei der Kühlung riesiger Bürokomplexe, Rechenzentren oder Krankenhäuser (über Chiller, Kühldecken und RLT-Anlagen) zirkuliert Kaltwasser mit extrem niedrigen Temperaturen oft quer durch das ganze Gebäude. Die physikalische Folge dieser Kälte: Die permanente Gefahr der Kondensatbildung (Schwitzwasser) an der Rohroberfläche. Während dicke Stahlrohre unter der nassen Dämmung unweigerlich und oft unbemerkt zu rosten beginnen, bleibt K-Aqua K-Faser (PPRCT) aufgrund seiner makromolekularen Struktur dauerhaft sicher, dicht und zu 100 % korrosionsfrei."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Extended Text Section for SEO > 500 words */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert text-muted-foreground">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Das physikalische Dilemma der Gebäudekühlung: Der Taupunkt</h2>
          <p className="mb-4">
            Die Klimatechnik steht stets vor einem grundlegenden physikalischen Problem. Die Luft in einem Gebäude, insbesondere an schwülen Sommertagen oder in stark belegten Konferenzräumen, enthält hohe Mengen an unsichtbarem Wasserdampf. Sobald diese feuchtwarme Raumluft auf eine kühle Oberfläche trifft – beispielsweise auf das ungedämmte Verteilrohr einer Kältemaschine (Chiller), durch das 6 °C kaltes Wasser fließt – kühlt sich die Luft schlagartig ab. Da kalte Luft wesentlich weniger Wasserdampf speichern kann als warme, überschreitet die Luft ihren Sättigungsgrad. Die überschüssige Feuchtigkeit schlägt sich unmittelbar als flüssiges Kondensat (Schwitzwasser) auf der kalten Rohroberfläche nieder.
          </p>
          <p className="mb-4">
            Genau diesen Moment bezeichnet man als <strong>Unterschreitung des Taupunkts</strong>. Um dies zu verhindern, müssen Kaltwasserleitungen mit einer extrem diffusionsdichten Isolierung (z. B. aus Kautschuk) ummantelt werden, die das Rohr vollständig von der Raumluft abschirmt.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">Die fatale Gefahr der Korrosion unter der Dämmung (CUI)</h3>
          <p className="mb-4">
            In der Theorie ist ein metallisches Rohrnetz (z. B. aus C-Stahl) durch die Isolierung vor dem Raumklima geschützt. In der baupraktischen Realität auf der Baustelle jedoch ist kaum eine Dämmung über Hunderte Meter absolut lückenlos. Kleine Risse, unsauber verklebte Stöße an T-Stücken, beschädigte Stellen durch andere Gewerke oder Alterung der Verklebung sorgen dafür, dass Raumluft in die Dämmung eindringt. Das Kondensat fällt aus und durchfeuchtet den Isolierschaum wie einen Schwamm von innen heraus.
          </p>
          <p className="mb-4">
            Für ein Stahlrohr ist dies das Todesurteil. Das dauerhaft stehende, sauerstoffreiche Wasser unter der Dämmung leitet einen aggressiven Rostprozess ein – die gefürchtete <em>Corrosion Under Insulation (CUI)</em>. Da der Rostprozess unter der schwarzen Isolierung im Verborgenen stattfindet, wird das Problem oft erst Jahre später entdeckt, wenn das Rohr bei hohem Anlagendruck schlagartig platzt und das Gebäude flutet.
          </p>
          <p className="mb-4">
            Mit <strong>K-Aqua PPRCT-Rohren</strong> (wie der K-Faser Serie) gehört dieses Risiko endgültig der Vergangenheit an. Polypropylen ist ein inerter, nicht-metallischer Werkstoff. Er reagiert nicht mit Wasser oder Sauerstoff. Selbst wenn die Isolierung beschädigt ist und sich Schwitzwasser auf dem PPRCT-Rohr bildet, kann das Material nicht oxidieren. Das Rohr rostet nicht, es behält seine volle Wandstärke und die Integrität des Kühlsystems bleibt über Jahrzehnte unangetastet.
          </p>

          <h4 className="text-xl font-semibold text-foreground mt-6 mb-2">Die natürliche Eigendämmung spart wertvollen Bauplatz</h4>
          <p>
            Zusätzlich zum absoluten Korrosionsschutz bieten Kunststoffrohre einen gewaltigen thermodynamischen Vorteil. Metall ist ein exzellenter Wärmeleiter (Kupfer hat eine Wärmeleitfähigkeit von ca. 380 W/mK, Stahl ca. 50 W/mK). Ein Metallrohr gibt die Kälte des Wassers sofort ungebremst an die Rohraußenwand weiter, weshalb es extrem schnell kondensiert. Polypropylen hingegen ist ein Isolator (λ = 0,24 W/mK). Die äußere Rohroberfläche eines PPRCT-Rohres ist deutlich wärmer als das eiskalte Wasser im Inneren. 
          </p>
          <p>
            Dieser physikalische Umstand verzögert die Taupunktunterschreitung massiv. In der TGA-Planung bedeutet das: Um Kondensation zu vermeiden, erfordert ein PPRCT-Rohrnetz eine signifikant geringere Dämmschichtdicke als ein vergleichbares Stahl- oder Kupferrohr. In engen Installationsschächten, vollgepackten Technikzentralen und abgehängten Rasterdecken ist jeder eingesparte Zentimeter Bauvolumen bares Geld wert und erleichtert die architektonische Planung enorm.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Das Taupunktproblem im Kern",
                description: "Sobald die Oberflächentemperatur eines ungedämmten Rohres den Taupunkt der Umgebungsluft unterschreitet, kondensiert zwangsläufig Luftfeuchtigkeit. Wasser sammelt sich auf dem Rohr und tropft unkontrolliert ab. Bei metallischen Systemen führt jede noch so kleine Lücke in der Dampfsperre unweigerlich zu irreparabel durchfeuchteter Dämmung.",
                icon: <Droplet className="w-8 h-8 text-primary" />
              },
              {
                title: "Keine Korrosion (CUI). Niemals.",
                description: "PPRCT (Polypropylen-Random-Copolymer mit erhöhter Temperaturbeständigkeit) ist ein chemisch absolut inerter Kunststoff. Selbst wenn zentimeterdick Schwitzwasser entsteht, kann das Rohr nicht rosten. Das extrem gefürchtete und kostspielige Phänomen der Korrosion unter der Dämmung existiert bei K-Aqua schlichtweg nicht.",
                icon: <Shield className="w-8 h-8 text-primary" />
              },
              {
                title: "Dämmdicke drastisch reduzieren",
                description: "Kunststoff isoliert von Natur aus hervorragend. Mit einer Wärmeleitfähigkeit von nur 0,24 W/mK ist PPRCT extrem thermisch träge. Die Folge: Um den Taupunkt in der Decke nicht zu unterschreiten, benötigen Sie bei K-Aqua Rohrnetzen deutlich weniger Dämmstoffdicke, was enge Schachtbelegungen rettet.",
                icon: <Thermometer className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Messbare Kaltwasservorteile in harten Zahlen"
          lead="Kalkulierbare Einsparungen bei Installation, Material und langfristiger Wartung."
          align="center"
        />
        <div className="mt-8">
          <StatBand
            cols={280}
            stats={[
              { n: "0", l: "Gegebenes Risiko von Lochfraß oder Korrosion unter der Dämmung." },
              { n: "30", u: "%", l: "Geringere Dämmdicke im Vergleich zu Kupfer/Stahl bei gleichem Klima möglich." },
              { n: "100", u: "%", l: "Betriebssicherheit für hochsensible Serverkühlungen und RLT-Anlagen." }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="FAQ: Technische Details für TGA-Fachplaner"
          lead="Wir beantworten die wichtigsten und drängendsten Fragen von Klima- und Kältetechnikern."
        />
        <DeepFAQ
          items={[
            {
              q: "Kann das K-Faser Rohr direkt an schwere Kaltwassersätze (Chiller) angeschlossen werden?",
              a: "Ja, PPRCT K-Faser Rohre eignen sich hervorragend für den Hauptanschluss an große Chiller-Anlagen. Für den materialgerechten Übergang auf metallische Flansche, Absperrklappen oder Pumpengehäuse bietet K-Aqua passgenaue Vorschweißbunde (Bundkragen) und kunststoffbeschichtete Stahl-Losflansche an, die eine sichere und dichte Verbindung gewährleisten."
            },
            {
              q: "Ist chemischer Frostschutz (Glykol) im Wasserkreislauf ein Problem für das Rohr?",
              a: "Nein, PPRCT ist hochgradig chemikalienbeständig. Der Einsatz von Ethylenglykol oder Propylenglykol (bis zu bestimmten, sehr hohen Konzentrationen) im Kühlwasserkreislauf ist problemlos möglich, um das Einfrieren in Außenbereichen zu verhindern, und greift das Kunststoffrohr in keiner Weise an."
            },
            {
              q: "Wie verhält sich das Rohr bei starken Temperaturschwankungen zwischen Sommer- und Winterbetrieb?",
              a: "Die K-Faser Serie (faserverstärktes PPRCT) weist durch die co-extrudierte Glasfasermittelschicht eine drastisch reduzierte Längenausdehnung im Vergleich zu Standardkunststoffrohren auf. Das macht die Befestigung, die Setzung von Fixpunkten und die Führung im Gebäude bei schwankenden Medientemperaturen extrem berechenbar und einfach."
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <CTABand
          title="Planen Sie ein komplexes Kaltwassernetz für Großprojekte?"
          subtitle="Überlassen Sie nichts dem Zufall. Unsere Techniker berechnen für Sie die exakt benötigte Dämmschichtdicke zur Taupunktunterschreitung basierend auf Ihren Systemtemperaturen und Raumklimadaten."
          buttonText="Taupunkt-Berechnung anfragen"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
