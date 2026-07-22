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
    de: "Klimaanlagen & Kühldecken mit PP-RCT",
    en: "Air Conditioning & Chilled Ceilings with PP-RCT",
    ar: "تكييف الهواء والأسقف المبردة باستخدام PP-RCT"
  },
  date: "2024-07-28",
  excerpt: {
    de: "Kondenswasser ist der Feind metallischer Rohrleitungen. Erfahren Sie, wie korrosionsfreie PP-RCT & PPR Rohrsysteme von K Aqua in Kaltwassersätzen Schwitzwasser verhindern und durch hohe thermische Isolation wertvolle Dämmschichtdicke in der Klimatechnik einsparen.",
    en: "Condensation is the enemy of metallic piping. Discover how corrosion-free PP-RCT & PPR pipe systems from K Aqua prevent sweating in chillers and save valuable insulation thickness in HVAC applications through high thermal isolation.",
    ar: "التكثيف هو عدو الأنابيب المعدنية. اكتشف كيف تمنع أنظمة أنابيب PP-RCT و PPR الخالية من التآكل من K Aqua التعرق في المبردات وتوفر سماكة عزل قيمة في تطبيقات التدفئة والتهوية وتكييف الهواء من خلال العزل الحراري العالي."
  },
  coverImage: "/images/news/chiller-cooling.jpg",
  category: "Gebäudetechnik",
  tags: ["Kaltwasser", "Kühldecken", "Klimaanlagen", "PP-RCT", "PPR", "Rohrsysteme", "Taupunkt", "Korrosionsschutz"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Droplet className="w-5 h-5" />
                  <span>Kälte & Klima</span>
                </div>
              }
              title="Kaltwasserleitungen ohne Schwitzwasser-Risiko"
              lead="Bei der Kühlung großer Gebäude (Chiller, Kühldecken, RLT-Anlagen) zirkuliert Kaltwasser mit extrem niedrigen Temperaturen. Die physikalische Folge: Kondensatbildung an der Rohroberfläche. Während Stahlrohre unter der Dämmung unweigerlich zu rosten beginnen, bleibt K Aqua K-Faser (PP-RCT) dauerhaft sicher."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Kaltwasser/Kondensat */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StickyScrollReveal: Storytelling Taupunkt & Korrosion */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Das Taupunkt-Problem",
                description: "Sobald die Oberflächentemperatur eines Rohres den Taupunkt der Umgebungsluft unterschreitet, kondensiert Luftfeuchtigkeit. Wasser sammelt sich auf dem Rohr. Bei metallischen Systemen führt jede noch so kleine Lücke in der Dampfsperre unweigerlich zu durchfeuchteter Dämmung.",
                icon: <Droplet className="w-8 h-8 text-primary" />
              },
              {
                title: "Keine Korrosion. Niemals.",
                description: "PP-RCT (Polypropylen-Random-Copolymer) ist ein inerter Kunststoff. Selbst wenn Schwitzwasser entsteht, kann das Rohr nicht rosten. Das gefürchtete Phänomen der Korrosion unter der Dämmung (CUI) existiert bei K Aqua schlichtweg nicht.",
                icon: <Shield className="w-8 h-8 text-primary" />
              },
              {
                title: "Dämmdicke drastisch reduzieren",
                description: "Kunststoff isoliert von Natur aus. Mit einer Wärmeleitfähigkeit von λ = 0,24 W/mK ist PP-RCT im Vergleich zu Kupfer (λ = 380 W/mK) oder Stahl extrem träge. Die Folge: Um den Taupunkt nicht zu unterschreiten, benötigen Sie bei K Aqua deutlich weniger Dämmstoffdicke.",
                icon: <Thermometer className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Harte Fakten */}
      <Reveal>
        <SectionHead
          title="Kaltwasser-Vorteile in Zahlen"
          lead="Messbare Einsparungen bei Installation und Material."
          align="center"
        />
        <div className="mt-8">
          <StatBand
            cols={280}
            stats={[
              { n: "0", l: "Korrosionsgefahr unter der Dämmung." },
              { n: "30", u: "%", l: "Geringere Dämmdicke im Vergleich zu Kupfer/Stahl möglich." },
              { n: "100", u: "%", l: "Betriebssicherheit für Kühldecken und RLT-Anlagen." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Technische Details */}
      <Reveal>
        <SectionHead
          title="Häufig gestellte Fragen zur Klimatechnik"
          lead="Wir beantworten die wichtigsten Fragen von TGA-Planern."
        />
        <DeepFAQ
          items={[
            {
              q: "Kann K-Faser direkt an Kaltwassersätze (Chiller) angeschlossen werden?",
              a: "Ja, PP-RCT K-Faser Rohre eignen sich hervorragend für den Anschluss an Chiller. Für den Übergang auf metallische Flansche oder Armaturen bietet K Aqua passende Bundkragen und Losflansche."
            },
            {
              q: "Ist Frostschutzmittel (Glykol) ein Problem?",
              a: "Nein, PP-RCT ist hochgradig chemikalienbeständig. Der Einsatz von Ethylenglykol oder Propylenglykol (bis zu bestimmten Konzentrationen, siehe Beständigkeitsliste) im Kühlwasserkreislauf ist problemlos möglich und verändert die Eigenschaften des Rohres nicht."
            },
            {
              q: "Wie verhält sich das Rohr bei starken Temperaturschwankungen?",
              a: "Die K-Faser Serie (faserverstärktes PP-RCT) hat eine stark reduzierte Längsausdehnung im Vergleich zu Standard-Kunststoffrohren. Das macht die Befestigung und Führung im Gebäude bei schwankenden Kaltwasser-Temperaturen sehr einfach."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Technische Beratung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Kaltwassernetz?"
          subtitle="Unsere Techniker berechnen für Sie die exakt benötigte Dämmschichtdicke zur Taupunktunterschreitung basierend auf Ihren Systemtemperaturen."
          buttonText="Berechnung anfragen"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
