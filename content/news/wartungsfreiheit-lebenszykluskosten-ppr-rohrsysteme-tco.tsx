import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { TrendingDown, Clock, Zap, ShieldCheck } from "@/components/ui/icon";

export const wartungsfreiheitLebenszykluskosten: NewsPost = {
  slug: "wartungsfreiheit-lebenszykluskosten-ppr-rohrsysteme-tco",
  title: "Wartungsfreiheit: Lebenszykluskosten (TCO) von PP-R Systemen",
  date: "2024-12-25",
  excerpt: "Die wahren Kosten einer Rohrleitung zeigen sich erst nach 10 Jahren im Betrieb. Erfahren Sie, warum K Aqua PP-R Systeme die Total Cost of Ownership (TCO) in der TGA massiv senken.",
  coverImage: "/images/news/tco-maintenance-free.jpg",
  category: "Wirtschaftlichkeit",
  tags: ["TCO", "Lebenszykluskosten", "Wartungsfreiheit", "OPEX", "PP-R", "Wirtschaftlichkeit"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* ParallaxHero: Die finanzielle Perspektive */}
      <ParallaxHero
        image="/images/news/tco-maintenance-free.jpg"
        title="Die wahren Kosten zeigen sich später"
        subtitle="Warum Investitionskosten (CAPEX) nur die Spitze des Eisbergs sind."
        height="60vh"
      />

      <Reveal>
        <div className="max-w-4xl mx-auto px-6">
          <SectionHead
            eyebrow={
              <div className="flex items-center gap-2 text-primary font-bold justify-center">
                <TrendingDown className="w-5 h-5" />
                <span>Total Cost of Ownership (TCO)</span>
              </div>
            }
            title="Der Blick über den Bauabschluss hinaus"
            lead="Bei der Ausschreibung von TGA-Projekten wird oft hart um den Materialpreis gerungen. Doch die tatsächlichen Kosten eines Rohrnetzes (Total Cost of Ownership) summieren sich über die 50 Jahre Betriebszeit. Wartungsarbeiten, Energieverluste durch raue Rohrinnenwände, Leckagen und teure Sanierungen (OPEX) übersteigen die initialen Anschaffungskosten oft um ein Vielfaches. K Aqua PP-R ist darauf ausgelegt, genau diese laufenden Kosten auf ein Minimum zu reduzieren."
            align="center"
          />
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 OPEX-Killer */}
      <Reveal>
        <SectionHead
          title="Die 3 OPEX-Killer von K Aqua"
          lead="Wie das Material PP-R die Betriebskosten drückt."
        />
        <BentoGrid
          items={[
            {
              title: "Konstanter Pumpenstrom (Keine Inkrustation)",
              description: "Metallrohre verkalken und rosten mit der Zeit. Der Rohrquerschnitt verengt sich, die Oberfläche wird rau. Um die gleiche Wassermenge zu fördern, müssen Umwälzpumpen Jahr für Jahr mehr Strom verbrauchen. PP-R bleibt dauerhaft glatt – der Energiebedarf der Pumpen bleibt 50 Jahre lang auf dem niedrigen Niveau des ersten Tages.",
              icon: <Zap className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Null Wartung der Verbindungen",
              description: "Flansche müssen kontrolliert, Gewinde bei Vibrationen beobachtet und O-Ringe nach Jahrzehnten getauscht werden. Die stoffschlüssige PP-R Schweißverbindung von K Aqua ist zu 100 % wartungsfrei.",
              icon: <Clock className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Keine Korrosionsschutz-Anstriche",
              description: "Stahlrohre in feuchten Kellern oder Technikzentralen erfordern regelmäßige Korrosionsschutz-Pflege. Kunststoff rostet nicht und muss niemals gestrichen werden.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: TCO-Vergleich */}
      <Reveal>
        <SectionHead
          title="TCO-Szenario über 50 Jahre"
          lead="Kostenentwicklung verschiedener Materialien im direkten Vergleich."
        />
        <DeepMatrix
          data={[
            ["Kostenfaktor", "K Aqua PP-R", "Verzinkter Stahl", "Kupfer"],
            ["Material (CAPEX)", "Mittel", "Gering", "Sehr Hoch"],
            ["Installation", "Schnell (Schweißen)", "Langsam (Gewinde)", "Mittel (Pressen/Löten)"],
            ["Wartung (Jahr 10-30)", "Keine", "Hoch (Korrosionsprüfung, Pumpenstrom steigt)", "Mittel (Fließgeräusche, Dichtungen)"],
            ["Sanierungsrisiko (Jahr 30-50)", "Sehr gering", "Sehr hoch (Lochfraß, Zusetzung)", "Mittel (Je nach Wasserqualität)"]
          ]}
        />
      </Reveal>

      {/* Stagger: Warum PP-R die TCO senkt */}
      <Reveal>
        <SectionHead
          title="Versteckte Einsparpotenziale"
          lead="Faktoren, die in der Lebenszyklus-Kalkulation den Ausschlag geben."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Ersparnis bei der Isolierung",
                description: "PP-R hat eine extrem geringe Wärmeleitfähigkeit. Das bedeutet, das Rohr selbst isoliert bereits. Oftmals können im Vergleich zu metallischen Rohren dünnere Dämmstärken verwendet werden, um die Vorgaben (z.B. GEG) zu erfüllen. Das spart Material und Platz im Schacht."
              },
              {
                title: "2. Verlängerte Lebenszyklen",
                description: "Während herkömmliche Stahlnetze nach 25 bis 30 Jahren aufgrund von Rost und Inkrustation oft teilsaniert werden müssen, ist K Aqua PP-R für eine Lebensdauer von 50 Jahren und mehr ausgelegt."
              },
              {
                title: "3. Absolute Ausfallsicherheit",
                description: "Die Kosten eines Rohrbruchs bestehen nicht aus dem Rohrstück. Sie bestehen aus Produktionsstillstand in der Industrie, gesperrten Zimmern im Hotel oder Ausfallzeiten im Rechenzentrum. Die Sicherheit der PP-R Schweißtechnik ist der beste Versicherungsschutz."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Wirtschaftlichkeits-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "50", u: "+", l: "Jahre erwartete Mindestlebensdauer (bei Einhaltung der Druck-/Temperaturparameter)." },
              { n: "0", u: "€", l: "Laufende Wartungskosten für Korrosionsschutz oder chemische Spülungen." },
              { n: "20", u: "%", l: "Mögliche Einsparung beim Pumpenstrom durch dauerhaft glatte Rohrinnenwände." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: TCO-Beratung */}
      <Reveal>
        <CTABand
          title="Rechnen Sie mit uns"
          subtitle="Wir zeigen Ihnen gerne in einer Modellrechnung, wie K Aqua die Lebenszykluskosten (TCO) Ihres nächsten Bauprojekts senkt."
          buttonText="Wirtschaftlichkeitsprüfung anfragen"
          buttonLink="/kontakt"
          icon={<TrendingDown className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
