import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Building, Settings, Ruler, Link } from "@/components/ui/icon";

export const hochhausInstallationSteigleitungen: NewsPost = {
  slug: "hochhaus-installation-steigleitungen-druckstufen-ppr-verteilung",
  title: {
    de: "Steigleitungen im Hochhaus mit PPR",
    en: "Highrise Building Risers with PPR",
    ar: "الأنابيب الصاعدة في المباني الشاهقة باستخدام PPR"
  },
  date: "2025-01-27",
  excerpt: {
    de: "Wolkenkratzer fordern die TGA Hydraulik heraus. Erfahren Sie, wie Sie mit K Aqua PPR Rohrsystemen Druckzonen in Steigleitungen optimal planen, statische Lasten im Schacht sicher abfangen und Montagekosten sparen.",
    en: "Skyscrapers challenge MEP hydraulics. Discover how to optimally plan pressure zones in risers using K Aqua PPR pipe systems, safely absorb static loads in the service shafts, and save on installation costs.",
    ar: "تشكل ناطحات السحاب تحدياً كبيراً للأنظمة الهيدروليكية. اكتشف كيف يمكنك التخطيط الأمثل لمناطق الضغط في الأنابيب الصاعدة باستخدام أنظمة أنابيب K Aqua PPR، وامتصاص الأحمال الساكنة بأمان في مسارات الأنابيب، وتوفير تكاليف التركيب."
  },
  coverImage: "/images/news/high-rise-pipes-pressure.jpg",
  category: "Planung & Berechnung",
  tags: ["Hochhaus", "Steigleitung", "PPR", "Rohrsysteme", "Druckstufe", "Befestigung", "Festpunkt", "Planung"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Building className="w-5 h-5" />
                  <span>Gebäudetechnik XXL & PPR Rohrsysteme</span>
                </div>
              }
              title="Der Kampf gegen die Wassersäule: Steigleitungen & Druckzonen"
              lead="In Hochhäusern summiert sich der statische Druck des Wassers pro 10 Meter Gebäudehöhe um exakt 1 bar. Ein 150 Meter hohes Gebäude erzeugt im Untergeschoss allein durch die Schwerkraft einen Ruhedruck von 15 bar. Um zu verhindern, dass Armaturen platzen und Fließgeräusche unerträglich werden, muss das Rohrnetz hydraulisch in Zonen unterteilt werden. Hier zeigt K Aqua PPR mit seinem Baukastensystem aus verschiedenen Wandstärken (SDRklassen) und langlebigen Rohrsystemen seine volle Stärke."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Visualisierung von Druck */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Das Zonenkonzept */}
      <Reveal>
        <SectionHead
          title="Druckzonenarchitektur"
          lead="Warum ein Hochhaus niemals hydraulisch aus einem Guss bestehen darf."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "Die Problematik",
                description: "Gemäß DIN EN 806 darf der Ruhedruck an einer Entnahmestelle (z.B. Wasserhahn) maximal 5 bar (in Ausnahmefällen 10 bar) betragen. Ist das Gebäude zu hoch, überschreitet der Druck in den unteren Etagen diesen Wert massiv."
              },
              {
                title: "Lösung 1: Druckminderer",
                description: "Der Druck wird zentral von oben nach unten geführt und in jedem Stockwerk oder jeder Nutzeinheit durch mechanische Druckminderer reduziert. Wartungsintensiv, aber oft bei mittleren Gebäudehöhen eingesetzt."
              },
              {
                title: "Lösung 2: Echte Druckzonen",
                description: "Das Gebäude wird in vertikale Zonen (z.B. je 10 Stockwerke) aufgeteilt. Jede Zone wird aus der Zentrale mit eigenen Steigleitungen angefahren, die mit exakt passendem Ausgangsdruck betrieben werden."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: SDR Klassen */}
      <Reveal>
        <SectionHead
          title="Die richtige SDRklasse pro Zone"
          lead="Materialkosten optimieren durch die Wahl der passenden Rohrwandstärke."
        />
        <DeepMatrix
          data={[
            ["Rohrtyp (SDRklasse)", "Wandstärke", "Einsatzbereich im Hochhaus", "Max. Druck (Kaltwasser, 20°C)"],
            ["SDR 6 (PN 20)", "Sehr dick", "Keller bis Erdgeschoss (höchste Druckbelastung durch statische Säule)", "20 bar"],
            ["SDR 7.4 (PN 16)", "Mittel", "Mittlere Etagen (Standardtrinkwassernetz)", "16 bar"],
            ["SDR 11 (PN 10)", "Dünn", "Oberste Etagen (geringster statischer Druck) & reine Kaltwassernetze", "10 bar"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Befestigung im Schacht */}
      <Reveal>
        <SectionHead
          title="Statik im Versorgungsschacht"
          lead="Eine 100 Meter hohe wassergefüllte PPR Leitung wiegt Tonnen. So wird sie sicher fixiert."
        />
        <BentoGrid
          items={[
            {
              title: "Festpunktschweißmuffen",
              description: "Echte Festpunkte fangen die Gewichtskraft der Rohrleitung ab. Dazu werden spezielle Elektroschweißmuffen direkt über und unter der massiven Stahlschelle auf das Rohr geschweißt. Das Rohr kann so nicht durch die Schelle rutschen.",
              icon: <Link className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Gleitschellen zur Führung",
              description: "Zwischen den Festpunkten (meist alle 3-5 Meter) wird das Rohr durch Gleitschellen geführt. Es kann sich vertikal ausdehnen, ohne auszuknicken (verhindert das Ausbeulen der Steigleitung).",
              icon: <Ruler className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Ausdehnung im Etagenabzweig",
              description: "Die thermische Längenausdehnung der Steigleitung wird oft in die Etagenabzweige geleitet. Der Abzweig fungiert als Biegeschenkel. Ein Tstück im Schacht muss daher genügend Freiraum haben, um nach oben und unten mitzuwandern.",
              icon: <Settings className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Gewichtsvorteil */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "%", l: "Gewichtsersparnis eines K Aqua PPR Rohrs gegenüber einem vergleichbaren Stahlrohr." },
              { n: "0", l: "Schweißfunken im Schacht. Die Polyfusion erfolgt rein durch Hitze, ohne offene Flamme." },
              { n: "100", u: "m", l: "Und mehr: K Aqua Systeme werden erfolgreich in Wolkenkratzern weltweit eingesetzt." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Fragen zur Montage */}
      <Reveal>
        <SectionHead
          title="FAQ: Hochhausmontage"
          lead="Praxistipps für den vertikalen Bau."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie bekomme ich dicke Rohre in den 40. Stock?",
              a: "Dies ist der größte logistische Vorteil von K Aqua. Ein 4 Meter langes PPR Rohr der Dimension DN 110 kann von zwei Monteuren mühelos über das Treppenhaus getragen werden. Ein Stahlrohr gleicher Größe erfordert zwingend einen Kran oder schweren Lastenaufzug."
            },
            {
              q: "Müssen Steigleitungen vorisoliert sein?",
              a: "Ja, Warmwasser- und Zirkulationsleitungen müssen gemäß GEG (Gebäudeenergiegesetz) isoliert werden, Kaltwasserleitungen gegen Erwärmung und Tauwasser. In Schächten bietet sich hierfür das vorisolierte K Aqua Isopipesystem an."
            },
            {
              q: "Was ist mit dem Brandschutz im Schacht?",
              a: "Wo PPR Rohre durch Brandabschnitte (z.B. Etagenböden) geführt werden, müssen zugelassene Brandschutzmanschetten (Intumeszenzmaterial) gesetzt werden, die das Kunststoffrohr im Brandfall in Sekundenbruchteilen zusammenquetschen und rauchgasdicht verschließen."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: K Aqua Engineering */}
      <Reveal>
        <CTABand
          title="Hydraulik am Limit?"
          subtitle="Unsere Ingenieure unterstützen Sie bei der Berechnung von Druckzonen, Festpunktlasten und der Dimensionierung von Steigleitungen für Ihr nächstes Hochhausprojekt."
          buttonText="Engineering anfragen"
          buttonLink="/ressourcen/support"
          icon={<Building className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
