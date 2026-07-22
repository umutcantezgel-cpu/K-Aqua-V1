import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Waves, Activity, Thermometer, Shield } from "@/components/ui/icon";

export const sportstaettenSchwimmbaeder: NewsPost = {
  slug: "sportstaetten-schwimmbaeder-chlorwasser-heizung-ppr",
  title: {
    de: "PPR Rohre in Sportstätten & Schwimmbädern",
    en: "PPR Pipes in Sports Facilities & Swimming Pools",
    ar: "أنابيب PPR في المرافق الرياضية وحمامات السباحة"
  },
  date: "2024-10-28",
  excerpt: {
    de: "Hallenbäder, Schwimmbäder und Stadien stellen extrem korrosive Umgebungen dar. Erfahren Sie, warum PPR Rohrsysteme von K Aqua absolut resistent gegen Chlorwasser, Ozon und feuchte Luft sind und sich optimal für Bädertechnik sowie Rasenheizung eignen.",
    en: "Indoor pools, swimming pools, and stadiums present extremely corrosive environments. Discover why K Aqua PPR pipe systems are completely resistant to chlorinated water, ozone, and humid air, making them ideal for pool technology and pitch heating.",
    ar: "تمثل المسابح الداخلية وحمامات السباحة والملاعب بيئات شديدة التآكل. اكتشف لماذا تعتبر أنظمة أنابيب PPR من K Aqua مقاومة تمامًا للمياه المكلورة والأوزون والهواء الرطب، مما يجعلها مثالية لتقنيات حمامات السباحة وتدفئة الملاعب."
  },
  coverImage: "/images/news/swimming-pool.jpg",
  category: "Freizeitanlagen",
  tags: ["Schwimmbad", "Sportstätte", "Chlorwasser", "Rasenheizung", "PPR", "Korrosion", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Waves className="w-5 h-5" />
                  <span>Bädertechnik & Sportanlagen mit PPR Rohrsystemen</span>
                </div>
              }
              title="Absoluter Schutz vor Chlor und Korrosion: PPR Rohrsysteme in der Bädertechnik"
              lead="Die Luft in einem Hallenbad ist warm, extrem feucht und voller ChloridIonen. Unter diesen Bedingungen beginnen ungeschützte Metalle bereits nach kurzer Zeit von außen zu rosten. Im Inneren der Rohre greifen aggressive Desinfektionsmittel wie Chlor oder Ozon das Material an. K Aqua PPR ist die chemisch inerte Lösung für eine lebenslange, wartungsfreie Infrastruktur in Sportstätten und Freizeitanlagen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Wasserhydraulik */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* StickyScrollReveal: Anwendungsbereiche */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Schwimmbadtechnik (Beckenwasser)",
                description: "Die Umwälzung und Aufbereitung des Beckenwassers erfordert riesige Rohrquerschnitte. K Aqua liefert PPRCT und PPR Rohre bis zu großen Dimensionen, die dem ständigen Kontakt mit Chlor, Brom oder Ozon mühelos standhalten.",
                icon: <Waves className="w-8 h-8 text-primary" />
              },
              {
                title: "Rasenheizung & Geothermie",
                description: "In professionellen Fußballstadien sorgt die Rasenheizung für einen eisfreien Untergrund. Die Verteilerleitungen aus PPR werden im Erdreich verlegt – sie verrotten nicht und sind absolut leckagesicher.",
                icon: <Thermometer className="w-8 h-8 text-primary" />
              },
              {
                title: "Trinkwasser & Duschanlagen",
                description: "Hunderte Sportler nutzen täglich die Duschen. Die thermische Desinfektion (Legionellenspülung) mit heißem Wasser ist Pflicht. K Aqua PPR Systeme sind thermisch hoch belastbar und hygienisch einwandfrei.",
                icon: <Shield className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Die Chemie von Chlorwasser */}
      <Reveal>
        <SectionHead
          title="Warum Metalle in Schwimmbädern versagen und PPR Rohre überlegen sind"
          lead="Chloridinduzierte Korrosion ist das größte Risiko für metallische Werkstoffe in Bädern."
        />
        <BentoGrid
          items={[
            {
              title: "Keine äußere Korrosion",
              description: "Selbst bei Kondenswasserbildung an Kaltwasserleitungen in der feuchtwarmen Schwimmbadluft kann PPR Kunststoff nicht oxidieren. Es benötigt keinen teuren Korrosionsschutzanstrich.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Absolute ChlorBeständigkeit",
              description: "Die Desinfektion des Badewassers greift viele Materialien an. K Aqua PPR bleibt strukturell intakt und gibt keine Schadstoffe an das Trink und Beckenwasser ab.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Geringer Druckverlust",
              description: "Schwimmbadpumpen laufen 24 Stunden am Tag, 7 Tage die Woche. Die extrem glatte Rohrinnenwand von PPR Rohren reduziert die Reibung und senkt die Energiekosten erheblich.",
              icon: <Waves className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Pumpen & Betriebskosten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "24", u: "/7", l: "Dauerbetrieb der Filter und Umwälzpumpen erfordert glatte PPR Rohrinnenflächen." },
              { n: "0", l: "Risiko von Lochfraßkorrosion durch ChloridIonen im Wasser." },
              { n: "50", u: "+", l: "Jahre kalkulierte Nutzungsdauer für kommunale Betreiber und Sportstätten." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Fragen zur Bädertechnik */}
      <Reveal>
        <SectionHead
          title="Häufige Fragen zu PPR Rohrsystemen in der Bädertechnik"
          lead="Wichtige technische Details für Fachplaner, Betreiber und Kommunen."
        />
        <DeepFAQ
          items={[
            {
              q: "Ist das Material resistent gegen SchockChlorung?",
              a: "Ja. Bei akutem Legionellenbefall oder starken Verunreinigungen wird oft eine SchockChlorung durchgeführt. PPR hält diesen kurzfristig sehr hohen Konzentrationen problemlos stand."
            },
            {
              q: "Eignet sich K Aqua auch für SoleBecken (Salzwasser)?",
              a: "Absolut. Thermen und SoleBäder arbeiten mit salzhaltigem Wasser, das Metalle extrem schnell zerstört. PPR Kunststoff ist zu 100 % resistent gegen Salzwasser."
            },
            {
              q: "Wie verhält sich PPR bei der thermischen Desinfektion von Duschen?",
              a: "PPR und PPRCT sind für hohe Temperaturen ausgelegt (Klasse 2/Klasse 5). Thermische Spülungen bei 70 °C zur Abtötung von Legionellen sind in der Lebensdauer des Systems bereits einkalkuliert."
            },
            {
              q: "Welche Vorteile bieten PPR Rohre bei der Verlegung im Erdbereich von Sportstätten (z.B. Rasenheizung)?",
              a: "PPR Rohre verrotten im Erdreich nicht und verhalten sich unempfindlich gegenüber Bodenfeuchte, Setzungen und Temperaturwechseln. Sie bieten daher maximale Leckagesicherheit für jahrzehntelangen unterirdischen Betrieb."
            },
            {
              q: "Können PPR Rohrsysteme auch für Ozonierungsanlagen in modernen Hallenbädern genutzt werden?",
              a: "Ja, K Aqua PPRCT und PPR Rohre weisen eine hervorragende Chemikalienbeständigkeit gegenüber Ozon und chlorhaltigen Oxidationsmitteln auf, die in modernsten Wasseraufbereitungsanlagen von Sportstätten eingesetzt werden."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Projektsupport Kommunen */}
      <Reveal>
        <CTABand
          title="Planen Sie ein neues Schwimmbad oder Stadion?"
          subtitle="Unsere Ingenieure beraten Sie bei der Rohrnetzberechnung, Hydraulik und der Auswahl der richtigen PPR Rohrserie für aggressive Medien."
          buttonText="Projektberatung anfordern"
          buttonLink="/kontakt"
          icon={<Waves className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
