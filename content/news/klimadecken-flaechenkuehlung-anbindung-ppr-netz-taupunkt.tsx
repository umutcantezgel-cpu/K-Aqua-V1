import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Wind, ThermometerSnowflake, LayoutDashboard, VolumeX } from "@/components/ui/icon";

export const klimadeckenFlaechenkuehlung: NewsPost = {
  slug: "klimadecken-flaechenkuehlung-anbindung-ppr-netz-taupunkt",
  title: {
    de: "Klimadecken & Flächenkühlung",
    en: "Climate Ceilings & Radiant Cooling",
    ar: "الأسقف المناخية والتبريد الإشعاعي"
  },
  date: "2025-01-10",
  excerpt: {
    de: "Leise, zugfrei und hochgradig energieeffizient: Erfahren Sie, wie K Aqua PPR Rohrsysteme und PP-R Rohrnetze die ideale korrosionsfreie Infrastruktur für moderne Klimadecken, Flächenkühlsysteme und Kaltwassernetze ohne Taupunktprobleme bilden.",
    en: "Quiet, draft-free, and highly energy-efficient: Discover how K Aqua PPR pipe systems and PP-R networks form the ideal corrosion-free infrastructure for modern climate ceilings, radiant cooling systems, and chilled water networks without dew point problems.",
    ar: "هادئة، خالية من التيارات الهوائية، وعالية الكفاءة في استخدام الطاقة: اكتشف كيف تشكل أنظمة الأنابيب K Aqua PPR وشبكات PP-R البنية التحتية المثالية الخالية من التآكل للأسقف المناخية الحديثة، وأنظمة التبريد الإشعاعي، وشبكات المياه المبردة دون مشاكل نقطة الندى."
  },
  coverImage: "/images/news/radiant-cooling-ceiling.jpg",
  category: "Industrie & Kälte",
  tags: ["Klimadecke", "Flächenkühlung", "Taupunkt", "Wärmepumpe", "PP-R", "PPR", "Rohrsysteme", "Kältetechnik"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Wind className="w-5 h-5" />
                  <span>Klimatechnik & Komfort</span>
                </div>
              }
              title="Die stille Revolution der Raumkühlung"
              lead="Klimaanlagen gelten oft als störend: Sie verursachen Zugluft, verteilen Staub und verursachen Strömungsgeräusche. In modernen Bürogebäuden und Krankenhäusern setzen Planer deshalb auf Klimadecken. Hierbei kühlt Wasser, das durch feine Rohrmatten in der Decke strömt, den Raum sanft über Strahlungsaustausch. Um das kalte Wasser sicher und effizient aus der Technikzentrale in alle Stockwerke zu transportieren, sind K Aqua PP-R Rohrnetze die erste Wahl."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Kaltwasser und Tropfen */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* HorizontalTimeline: So funktioniert das System */}
      <Reveal>
        <SectionHead
          title="Wie funktioniert eine Klimadecke?"
          lead="Der physikalische Prozess von der Kälteerzeugung bis zur Wohlfühltemperatur."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. Effiziente Kälteerzeugung",
                description: "Eine Wärmepumpe oder Kältemaschine temperiert das Wasser auf milde 16 bis 18 °C. Diese vergleichsweise hohen Temperaturen (im Gegensatz zu 6 °C bei Split-Geräten) sparen massiv Energie."
              },
              {
                title: "2. Verteilung via PP-R",
                description: "Das K Aqua Rohrnetz transportiert das Kaltwasser durch die Steigeschächte in die Stockwerke. Durch die geringe Wärmeleitfähigkeit von PP-R bleiben Kälteverluste auf dem Weg minimal."
              },
              {
                title: "3. Strahlungsaustausch",
                description: "In den Deckenpaneelen zirkuliert das Wasser geräuschlos durch Kapillarrohre. Warme Raumluft steigt auf, kühlt an der Decke ab und fällt sanft und zugfrei wieder nach unten."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Komfort-Vorteile */}
      <Reveal>
        <SectionHead
          title="Maximaler Nutzerkomfort"
          lead="Warum Flächenkühlung das Raumklima auf ein neues Level hebt."
        />
        <BentoGrid
          items={[
            {
              title: "Stille Kühlung ohne Zugluft",
              description: "Da keine Ventilatoren laufen, ist das System absolut geräuschlos (0 dB). Es entsteht kein spürbarer Luftzug, was das Risiko von Erkältungen und Nackenverspannungen im Büro eliminiert.",
              icon: <VolumeX className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Hohe Energieeffizienz",
              description: "Durch die hohen Vorlauftemperaturen (16 °C) kann oft Umweltkälte (Free-Cooling über Erdsonden oder Grundwasser) ohne den Betrieb teurer Kompressoren genutzt werden.",
              icon: <ThermometerSnowflake className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Architektonische Freiheit",
              description: "Keine klobigen Split-Klimageräte an den Wänden. Die gesamte Technik verschwindet unsichtbar in der Akustik- oder Rasterdecke.",
              icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Materialwahl für die Verrohrung */}
      <Reveal>
        <SectionHead
          title="Verteilleitungen im Vergleich"
          lead="Anforderungen an das Rohrmaterial bei Temperaturen unter dem Taupunkt."
        />
        <DeepMatrix
          data={[
            ["Anforderung", "K Aqua PP-R", "Kupfer", "Mehrschichtverbundrohr (MSVR)"],
            ["Korrosionsgefahr bei Kondensat", "Keine (Rostet nicht)", "Sehr hoch (Schwitzwasser)", "Gering (Je nach Fitting)"],
            ["Eigendämmung des Rohrs", "Gut (Kunststoff isoliert)", "Schlecht (Wärmeleiter)", "Mittel"],
            ["Montagegeschwindigkeit (Großrohre)", "Sehr schnell (Schweißen)", "Langsam (Löten/Pressen)", "Meist nur kleine Dimensionen verfügbar"],
            ["Geräuschübertragung", "Sehr gering", "Hoch", "Mittel"]
          ]}
        />
      </Reveal>

      {/* Stagger: Die Taupunkt-Herausforderung */}
      <Reveal>
        <SectionHead
          title="Die Herausforderung: Kondensation"
          lead="Warum der Taupunkt das größte Risiko bei der Flächenkühlung ist."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Was ist der Taupunkt?",
                description: "Wenn warme, feuchte Raumluft auf eine kalte Oberfläche (wie eine Kaltwasserleitung) trifft, kondensiert die Feuchtigkeit. Es bilden sich Wassertropfen (Schwitzwasser), die in die abgehängte Decke tropfen können."
              },
              {
                title: "2. Warum PP-R im Vorteil ist",
                description: "Metalle wie Stahl oder Kupfer leiten Temperaturen sofort an die Oberfläche – sie beschlagen sofort. PP-R hat eine geringe thermische Leitfähigkeit, was den Kondensationsprozess an der Rohroberfläche verzögert. Dennoch ist eine diffusionsdichte Dämmung Pflicht."
              },
              {
                title: "3. Intelligente Taupunktregelung",
                description: "Moderne Gebäudeleittechnik (GLT) überwacht permanent die relative Luftfeuchtigkeit im Raum. Droht Kondensation, hebt das System die Vorlauftemperatur des Wassers automatisch um 1-2 Grad an, bevor sich der erste Tropfen bildet."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Komfort-Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "16", u: "°C", l: "Ideale und äußerst energieeffiziente Vorlauftemperatur für Klimadecken." },
              { n: "0", u: " dB", l: "Betriebslautstärke im Raum – keine störenden Lüfter oder Kompressoren." },
              { n: "100", u: "%", l: "Kältemittelfrei im Raum, da reines Wasser als Trägermedium in der Decke dient." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Kälte-Infrastruktur */}
      <Reveal>
        <CTABand
          title="Planen Sie ein zukunftsfähiges Bürogebäude?"
          subtitle="Verbinden Sie höchsten Raumkomfort mit einer absolut sicheren und korrosionsfreien Kälteverteilung aus PP-R."
          buttonText="Beratung zur Kälteverteilung"
          buttonLink="/kontakt"
          icon={<Wind className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
