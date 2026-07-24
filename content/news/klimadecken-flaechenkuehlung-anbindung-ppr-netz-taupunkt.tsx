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
    de: "Klimadecken & Flächenkühlung: Die stille Revolution mit K-Aqua PPR",
    en: "Climate Ceilings & Radiant Cooling",
    ar: "الأسقف المناخية والتبريد الإشعاعي"
  },
  date: "2025-01-10",
  excerpt: {
    de: "Leise, absolut zugfrei und hochgradig energieeffizient: Erfahren Sie im Detail, wie K-Aqua PPR-Rohrsysteme die perfekte, korrosionsfreie Infrastruktur für moderne Klimadecken und Flächenkühlsysteme ohne Kondensationsprobleme bilden.",
    en: "Quiet, draft-free, and highly energy-efficient: Discover how K Aqua PPR pipe systems form the ideal corrosion-free infrastructure for modern climate ceilings.",
    ar: "هادئة، خالية من التيارات الهوائية، وعالية الكفاءة في استخدام الطاقة: اكتشف كيف تشكل أنظمة الأنابيب K Aqua PPR."
  },
  coverImage: "/images/news/radiant-cooling-ceiling.jpg",
  category: "Industrie & Kälte",
  tags: ["Klimadecke", "Flächenkühlung", "Taupunkt", "Wärmepumpe", "PPR", "PPRCT", "Kältetechnik", "Free Cooling"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Wind className="w-5 h-5" />
                  <span>Moderne Klimatechnik & Raumnutzerkomfort</span>
                </div>
              }
              title="Die stille, zugfreie Revolution der Raumkühlung"
              lead="Klassische Klimaanlagen (Split-Geräte) gelten in der Arbeitswelt oft als störend: Ventilatoren verursachen nervende Geräusche, verteilen feinen Staub und erzeugen kalte Zugluft, die bei Mitarbeitern oft zu Erkältungen oder Nackenverspannungen führt. In modernen, architektonisch anspruchsvollen Bürogebäuden und sterilen Krankenhäusern setzen TGA-Planer deshalb immer häufiger auf unsichtbare Klimadecken. Hierbei kühlt Wasser, das durch feine Rohrmatten direkt in der Deckenstruktur strömt, den Raum sanft und physikalisch natürlich über Strahlungsaustausch. Um dieses Kaltwasser jedoch sicher, energieeffizient und ohne massive Kondensationsschäden aus der Technikzentrale im Untergeschoss bis in die Paneele aller Stockwerke zu transportieren, sind hochleistungsfähige K-Aqua PPR-Rohrnetze die absolut beste Wahl."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Extended Text Section for SEO > 500 words */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert text-muted-foreground">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Das Prinzip der Flächenkühlung: Komfort durch Strahlung</h2>
          <p className="mb-4">
            Der menschliche Körper empfindet Temperaturen nicht nur über die umgebende Lufttemperatur, sondern maßgeblich über die Strahlungswärme oder -kälte der ihn umgebenden Flächen. Flächenkühlsysteme – ob als abgehängte Klimadecke, thermische Bauteilaktivierung (BKT) im Beton oder als Wandflächenkühlung – nutzen exakt dieses Prinzip. Durch ein feines, in der Fläche verlegtes Netz aus Kapillarrohren fließt temperiertes Kaltwasser. 
          </p>
          <p className="mb-4">
            Die Physik dahinter ist ebenso einfach wie genial: Da kalte Luft schwerer ist als warme Luft, fällt die an der Decke abgekühlte Raumluft großflächig, sanft und völlig ohne spürbaren Zug (Zugluft) wie ein unsichtbarer, kühler Schleier nach unten in den Aufenthaltsraum. Gleichzeitig gibt der wärmere menschliche Körper, ebenso wie Computerbildschirme oder Beleuchtung, seine überschüssige Wärme in Form von Infrarotstrahlung an die kühlere Deckenfläche ab (Strahlungsaustausch). Dies schafft ein unübertroffen angenehmes und gesundes Raumklima, völlig ohne surrende Gebläse.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">Maximale Energieeffizienz durch Free Cooling</h3>
          <p className="mb-4">
            Ein weiterer gewaltiger Vorteil von Klimadecken ist ihre unschlagbare Energieeffizienz. Eine konventionelle Klimaanlage, die eisige Luft in den Raum bläst, benötigt extrem niedriges Kaltwasser mit einer Vorlauftemperatur von etwa 6 °C. Um das Wasser derart tief abzukühlen, müssen Kältemaschinen unter enormem Stromeinsatz harte Kompressorarbeit leisten.
          </p>
          <p className="mb-4">
            Flächenkühlsysteme arbeiten hingegen mit einer sehr milden Vorlauftemperatur von etwa 16 bis 18 °C. Da die Kühlfläche (die gesamte Raumdecke) riesig ist, reicht diese milde Temperatur völlig aus, um den Raum effektiv zu kühlen. Dieser hohe Temperaturunterschied erlaubt den Einsatz von "Free Cooling" (Freier Kühlung). Hierbei wird in Übergangszeiten oder kühlen Nächten schlichtweg die kühle Außenluft oder das kühle Grundwasser über Erdsonden und Wärmetauscher genutzt, um das Gebäude-Kaltwasser auf 16 °C zu bringen – die stromfressenden Kompressoren bleiben komplett ausgeschaltet. Das spart gewaltige Mengen an elektrischer Energie.
          </p>

          <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">Die anspruchsvolle Anbindung: Warum PPR die Steigeschächte dominiert</h3>
          <p className="mb-4">
            Doch wie kommt das Wasser vom Chiller im Keller in das filigrane Kapillarrohrnetz in der Decke des 10. Stockwerks? Genau hier übernimmt K-Aqua PPRCT die Hauptrolle. Die Hauptsteigleitungen und Stockwerksverteilungen (die sogenannten Anbindeleitungen) bilden das Rückgrat der Klimadecke. 
          </p>
          <p className="mb-4">
            Wenn Wasser mit 16 °C durch ein Steigrohr fließt, besteht stets die große physikalische Gefahr, dass die Rohroberflächentemperatur den Taupunkt der warmen Schachtluft unterschreitet und es zur Bildung von Tropfen (Kondenswasser) kommt. Bei metallischen Verteilleitungen aus Kupfer oder Stahl würde dies sofort zu nasser Dämmung und aggressiver Korrosion (Rost) führen. Da K-Aqua PPR-Vollkunststoffrohre einen extrem schlechten Wärmeleitwert (0,24 W/mK) aufweisen, wirkt das Rohr selbst schon stark isolierend. Es beschlägt bei weitem nicht so schnell wie Metall, benötigt deshalb deutlich geringere Dämmschichtdicken zur Taupunktunterschreitung und rostet auch dann nicht, wenn es im schlimmsten Fall klitschnass wird.
          </p>
          
          <h4 className="text-xl font-semibold text-foreground mt-6 mb-2">Taupunktüberwachung in der Praxis</h4>
          <p>
            Um Kondenswasser an der Klimadecke selbst zu verhindern, verbauen Systemintegratoren Taupunktwächter. Diese intelligenten Sensoren messen permanent die relative Luftfeuchtigkeit und die Raumtemperatur. Steigt die Feuchtigkeit (etwa, wenn an einem schwülen Tag das Fenster geöffnet wird) und droht der Taupunkt unterschritten zu werden, reagiert die Gebäudeleittechnik (GLT) sofort. Das Mischventil im Keller wird angesteuert, und die Vorlauftemperatur im K-Aqua PPR-Netz wird völlig stufenlos um ein bis zwei Grad angehoben – lange bevor sich auch nur ein einziger Kondensattropfen bilden kann.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Wie funktioniert eine Klimadecke als System?"
          lead="Der hochkomplexe physikalische Prozess von der energieeffizienten Kälteerzeugung bis zur ultimativen Wohlfühltemperatur."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. Sehr effiziente Kälteerzeugung",
                description: "Eine Wärmepumpe oder Kältemaschine temperiert das Wasser auf milde 16 bis 18 °C. Diese vergleichsweise hohen Systemtemperaturen (im Gegensatz zu 6 °C bei normalen Splitgeräten) sparen massiv Energie und ermöglichen Geothermie."
              },
              {
                title: "2. Verteilung via sicherem PPR-Netz",
                description: "Das verschweißte K-Aqua Rohrnetz transportiert das Kaltwasser leckagefrei durch die großen Steigeschächte in alle Stockwerke. Durch die geringe Wärmeleitfähigkeit von Kunststoff-PPR bleiben Kälteverluste auf dem Weg nach oben absolut minimal."
              },
              {
                title: "3. Physikalischer Strahlungsaustausch",
                description: "In den eleganten Deckenpaneelen zirkuliert das Wasser völlig geräuschlos. Warme Raumluft steigt auf, kühlt an der Decke ab, und fällt sanft, stetig und absolut zugfrei wie ein kühler Nebel wieder nach unten in den Aufenthaltsbereich."
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Maximaler Nutzerkomfort im Fokus"
          lead="Warum moderne Flächenkühlung das Raumklima in Büros auf ein völlig neues, gesundes Level hebt."
        />
        <BentoGrid
          items={[
            {
              title: "Absolute Stille und Kühlung ohne Zugluft",
              description: "Da keine dröhnenden Ventilatoren laufen, ist das gesamte System im Raum absolut geräuschlos (0 dB). Es entsteht kein spürbarer Luftzug, was das massive Risiko von Sommer-Erkältungen, trockenen Augen und Nackenverspannungen bei den Mitarbeitern im Büro eliminiert.",
              icon: <VolumeX className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Überragende Energieeffizienz",
              description: "Durch die hohen Vorlauftemperaturen (16 °C) kann oft die kostenlose Umweltkälte (Free Cooling über tiefe Erdsonden oder kaltes Grundwasser) völlig ohne den Einsatz teurer, lauter Kompressoren genutzt werden.",
              icon: <ThermometerSnowflake className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Maximale Architektonische Freiheit",
              description: "Keine klobigen, unästhetischen Splitklimageräte, die an den Wänden hängen. Die gesamte komplexe Technik verschwindet völlig unsichtbar in der Akustik- oder Rasterdecke.",
              icon: <LayoutDashboard className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <SectionHead
          title="Hauptverteilleitungen im direkten Vergleich"
          lead="Die harten Anforderungen an das Rohrmaterial in den Steigeschächten bei Temperaturen unter dem Taupunkt."
        />
        <DeepMatrix
          data={[
            ["Anforderung an die Verrohrung", "K-Aqua PPR-System", "Kupfer (klassisch)", "Mehrschichtverbundrohr (MSVR)"],
            ["Korrosionsgefahr bei feuchtem Kondensat", "Absolut keine (Vollkunststoff rostet nicht)", "Sehr hoch (Schwitzwasser frisst das Rohr auf)", "Gering (Je nach Material der eingesetzten Pressfittings)"],
            ["Eigendämmung des Rohrs zur Taupunktverzögerung", "Gut (Kunststoff isoliert von Natur aus)", "Sehr schlecht (Extremer Wärmeleiter)", "Mittel (Aluminium leitet, Kunststoff hemmt)"],
            ["Montagegeschwindigkeit (bei Großrohren im Schacht)", "Sehr schnell (Sicheres Polyfusionsschweißen)", "Langsam (Teures Löten oder extrem schweres Pressen)", "System bedingt meist nur für sehr kleine Rohrdimensionen verfügbar"],
            ["Unerwünschte Geräuschübertragung von Pumpen", "Sehr gering (Hohe Eigendämpfung)", "Extrem Hoch (Starrer Resonanzkörper)", "Mittel"]
          ]}
        />
      </Reveal>

      <Reveal>
        <SectionHead
          title="Die größte Herausforderung der Flächenkühlung: Kondensation"
          lead="Warum die physikalische Taupunktunterschreitung das größte Risiko beim Betrieb darstellt."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Was genau ist eigentlich der Taupunkt?",
                description: "Wenn feuchtwarme Raumluft auf eine sehr kalte Oberfläche (wie eine ungedämmte Kaltwasserleitung) trifft, kühlt die Luft schlagartig ab und kondensiert. Es bilden sich feine Wassertropfen (Schwitzwasser), die sich sammeln, abtropfen und schwere Wasserschäden in der abgehängten Decke verursachen können."
              },
              {
                title: "2. Warum K-Aqua PPR hier klar im Vorteil ist",
                description: "Metalle wie Stahl oder Kupfer leiten kalte Wassertemperaturen ohne Zeitverlust sofort an die Rohroberfläche weiter – sie beschlagen in Sekundenbruchteilen. PPR hat eine sehr geringe thermische Leitfähigkeit, was den Kondensationsprozess an der Rohroberfläche extrem verzögert. Dennoch ist eine fachgerechte, diffusionsdichte Dämmung nach wie vor Pflicht."
              },
              {
                title: "3. Die intelligente, automatisierte Taupunktregelung",
                description: "Moderne Gebäudeleittechnik (GLT) überwacht über Sensoren permanent die relative Luftfeuchtigkeit im gesamten Raum. Droht tatsächlich eine Kondensation, greift das System blitzschnell ein und hebt die Vorlauftemperatur des Wassers automatisch über Mischventile um 1-2 Grad an, bevor sich auch nur der erste Tropfen bilden kann."
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "16", u: "°C", l: "Die absolut ideale und äußerst stromsparende Vorlauftemperatur für Hochleistungs-Klimadecken." },
              { n: "0", u: " dB", l: "Wahrnehmbare Betriebslautstärke im Büro – keine störenden Lüfter, Gebläse oder lauten Kompressoren." },
              { n: "100", u: "%", l: "Kältemittelfrei im Raum, da völlig ungefährliches, reines Leitungswasser als Trägermedium in der Decke dient." }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <CTABand
          title="Planen Sie ein wegweisendes, zukunftsfähiges Bürogebäude?"
          subtitle="Verbinden Sie höchsten gesundheitlichen Raumkomfort für Mitarbeiter mit einer absolut sicheren, langlebigen und völlig korrosionsfreien Kälteverteilung aus K-Aqua PPR-Kunststoff. Wir unterstützen Sie."
          buttonText="Beratung zur Kälteverteilung anfordern"
          buttonLink="/kontakt"
          icon={<Wind className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
