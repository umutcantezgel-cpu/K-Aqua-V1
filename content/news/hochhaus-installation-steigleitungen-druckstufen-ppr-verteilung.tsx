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
    de: "Steigleitungen im Hochhaus mit K-Aqua PP-R",
    en: "Highrise Building Risers with PPR",
    ar: "الأنابيب الصاعدة في المباني الشاهقة باستخدام PPR"
  },
  date: "2025-01-27",
  excerpt: {
    de: "Wolkenkratzer fordern die TGA-Hydraulik extrem heraus. Erfahren Sie, wie Sie mit K-Aqua PP-R Rohrsystemen intelligente Druckzonen in Steigleitungen planen, thermische und statische Lasten im Schacht abfangen und massiv Montagezeit sparen.",
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
                  <span>Gebäudetechnik XXL & PP-R</span>
                </div>
              }
              title="Der Kampf gegen die Wassersäule: Steigleitungen & Druckzonen"
              lead="In Hochhäusern und Wolkenkratzern summiert sich der statische Druck des Wassers pro 10 Meter Gebäudehöhe um exakt 1 bar. Ein 150 Meter hohes Gebäude erzeugt im Untergeschoss allein durch die hydrostatische Schwerkraft einen unweigerlichen Ruhedruck von 15 bar. Um zu verhindern, dass Armaturen in den unteren Etagen platzen und Fließgeräusche unerträglich werden, muss das gesamte Rohrnetz hydraulisch hochpräzise in verschiedene Druckzonen unterteilt werden. Hier zeigt K-Aqua PP-R mit seinem cleveren Baukastensystem aus verschiedenen Wandstärken (SDR-Klassen) und extrem langlebigen Rohrsystemen seine volle Stärke."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Visualisierung von Druck */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Content */}
      <Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground mt-8 px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Das hydrostatische Paradoxon im Wolkenkratzer</h2>
          <p>
            Gemäß DIN EN 806-2 darf der Ruhedruck an einer regulären Entnahmestelle (z. B. einem Waschbecken) maximal 5 bar betragen. In Ausnahmefällen, bei speziellen Armaturen, sind 10 bar zulässig. Ein zu hoher Druck führt nicht nur zum Defekt sensibler Bauteile, sondern auch zu extremem Wasserverbrauch und störenden Kavitationsgeräuschen in den Leitungen. 
          </p>
          <p>
            Die klassische Methode, dieses Problem zu lösen, bestand lange Zeit darin, den vollen Druck von der Zentrale auf dem Dach (oder aus dem Keller) durch eine einzige massive Steigleitung zu jagen und in jedem Stockwerk mechanische Druckminderer (PRV - Pressure Reducing Valves) zu installieren. Diese Ventile sind jedoch mechanische Bauteile, die extrem anfällig für Verkalkung und Verschleiß sind, enorm viel Wartung erfordern und somit den OPEX (Betriebskosten) in die Höhe treiben.
          </p>
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Die K-Aqua Lösung: Intelligente Zonenarchitektur</h3>
          <p>
            Die moderne, energieeffiziente Hochhausplanung setzt auf "echte" Druckzonen. Das Gebäude wird in vertikale Zonen (beispielsweise alle 8 bis 10 Stockwerke) aufgeteilt. Jede Zone wird aus der Zentrale mit völlig separaten Steigleitungen angefahren. Der Geniestreich bei der Verwendung von K-Aqua PP-R liegt in der Materialanpassung: Anstatt für die gesamte Gebäudehöhe extrem dickwandige (und damit teure) Rohre zu verwenden, wird die SDR-Klasse (Standard Dimension Ratio) exakt an den real anliegenden Druck der jeweiligen Zone angepasst.
          </p>
        </div>
      </Reveal>

      {/* Stagger: Das Zonenkonzept */}
      <Reveal>
        <SectionHead
          title="Druckzonenarchitektur im Detail"
          lead="Warum ein Hochhaus niemals hydraulisch aus einem Guss bestehen darf."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "Zone 1: Das Fundament (Keller bis Etage 10)",
                description: "Hier lastet die volle Wassersäule von oben. Es wird K-Aqua PP-R der Klasse SDR 6 (PN 20) mit maximaler Wandstärke eingesetzt, das Drücken von bis zu 20 bar bei Kaltwasser dauerhaft standhält."
              },
              {
                title: "Zone 2: Die Mitte (Etage 11 bis 20)",
                description: "Der statische Druck ist bereits um mehrere Bar reduziert. Hier reicht das wirtschaftlichere SDR 7.4 (PN 16). Materialkosten und Rohrgewicht werden signifikant reduziert."
              },
              {
                title: "Zone 3: Die Spitze (Etage 21 bis 30)",
                description: "Die obersten Etagen weisen den geringsten Druck auf. Es kann kosteneffizientes, dünnwandigeres K-Aqua SDR 11 (PN 10) verwendet werden. Dies erhöht zudem den nutzbaren Innenquerschnitt und optimiert die Strömung."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: SDR Klassen */}
      <Reveal>
        <SectionHead
          title="Die richtige SDR-Klasse pro Zone"
          lead="Materialkosten optimieren durch die ingenieurstechnische Wahl der passenden Rohrwandstärke."
        />
        <DeepMatrix
          data={[
            ["Rohrtyp (SDR-Klasse)", "Wandstärke", "Einsatzbereich im Hochhaus", "Max. Druck (Kaltwasser, 20°C)"],
            ["SDR 6 (PN 20)", "Sehr dick", "Untere Etagen (höchste Druckbelastung durch statische Säule)", "20 bar"],
            ["SDR 7.4 (PN 16)", "Mittel", "Mittlere Etagen (Standardtrinkwassernetz & Warmwasser)", "16 bar"],
            ["SDR 11 (PN 10)", "Dünn", "Oberste Etagen (geringster statischer Druck) & Kaltwasser", "10 bar"]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Befestigung im Schacht */}
      <Reveal>
        <SectionHead
          title="Statik im Versorgungsschacht beherrschen"
          lead="Eine 100 Meter hohe, wassergefüllte PP-R Leitung wiegt mehrere Tonnen. So wird sie absolut sicher fixiert."
        />
        <BentoGrid
          items={[
            {
              title: "Elektroschweißmuffen als Festpunkte",
              description: "Echte Festpunkte müssen die gesamte Gewichtskraft der Rohrleitung abfangen. Bei K-Aqua werden hierzu spezielle Elektroschweißmuffen direkt über und unter der massiven Stahlschelle formschlüssig auf das Steigrohr geschweißt. Das Rohr ist physisch blockiert und kann unter keinen Umständen mehr durch die Schelle rutschen.",
              icon: <Link className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Gleitschellen zur sauberen Führung",
              description: "Zwischen den starken Festpunkten (meist alle 3 bis 5 Meter platziert) wird das Rohr durch Gleitschellen geführt. Es kann sich thermisch bedingt ungehindert vertikal ausdehnen, ohne auszuknicken, was das gefährliche Ausbeulen der Steigleitung verhindert.",
              icon: <Ruler className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Ausdehnung im Etagenabzweig",
              description: "Die thermische Längenausdehnung der Steigleitung wird elegant in die horizontalen Etagenabzweige abgeleitet. Der Abzweig fungiert als elastischer Biegeschenkel. Ein T-Stück im Schacht muss daher zwingend mit ausreichend Freiraum montiert werden, um spannungsfrei nach oben und unten mitzuwandern.",
              icon: <Settings className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zur Montage */}
      <Reveal>
        <SectionHead
          title="FAQ: Hochhausmontage mit PP-R"
          lead="Tiefgreifende Antworten für den vertikalen Rohrleitungsbau."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie transportiere ich Großrohre in den 40. Stock?",
              a: "Dies ist der vermutlich größte logistische und finanzielle Vorteil von K-Aqua PP-R gegenüber metallischen Systemen. Ein 4 Meter langes PP-R Rohr der Dimension DN 110 wiegt einen Bruchteil eines Stahlrohrs und kann von zwei Monteuren völlig mühelos über das Treppenhaus oder im Bauaufzug transportiert werden. Schwerlastkräne werden nicht benötigt."
            },
            {
              q: "Müssen Steigleitungen im Schacht vorisoliert sein?",
              a: "Ja, zwingend. Warmwasser- und Zirkulationsleitungen müssen gemäß GEG (Gebäudeenergiegesetz) gegen Wärmeverluste isoliert werden, Kaltwasserleitungen gegen schädliche Erwärmung (Legionellengefahr) und Tauwasserbildung. Im engen Versorgungsschacht bietet sich hierfür das extrem platzsparende, werkseitig vorisolierte K-Aqua Isopipe-System an."
            },
            {
              q: "Wie löse ich den Brandschutz bei Deckendurchbrüchen?",
              a: "Da Kunststoff im Brandfall brennbar ist (Brandklasse B2), müssen dort, wo PP-R Rohre durch Brandabschnitte (z. B. Beton-Etagenböden) geführt werden, bauaufsichtlich zugelassene Brandschutzmanschetten installiert werden. Diese enthalten ein Intumeszenzmaterial, das bei Hitzeeinwirkung massiv aufschäumt, das weich werdende Kunststoffrohr in Sekundenbruchteilen komplett zusammenquetscht und den Deckendurchbruch absolut feuer- und rauchgasdicht verschließt."
            },
            {
              q: "Gibt es Lärmbelästigung durch Fließgeräusche in den Schächten?",
              a: "Im Gegenteil. Polypropylen besitzt exzellente schallabsorbierende Eigenschaften. Durch die spiegelglatte Innenwand (laminare Strömung) entstehen kaum Verwirbelungen, die Körperschall anregen könnten. K-Aqua Systeme erfüllen problemlos die strengen Anforderungen der DIN 4109 zum Schallschutz im Hochbau."
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
              { n: "70", u: "%", l: "Gewichtsersparnis eines K-Aqua Rohrs gegenüber Stahl" },
              { n: "0", l: "Schweißfunken im Schacht. Die Polyfusion erfolgt rein durch Heizelemente, ohne offene Flamme." },
              { n: "100", u: "m", l: "Und weit mehr: K-Aqua Systeme versorgen Wolkenkratzer weltweit absolut zuverlässig." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Engineering */}
      <Reveal>
        <CTABand
          title="TGA-Hydraulik am Limit?"
          subtitle="Unsere spezialisierten Projektingenieure unterstützen Sie proaktiv bei der Berechnung von Druckzonen, der Kalkulation von Festpunktlasten und der exakten Dimensionierung von Steigleitungen für Ihr nächstes Hochhausprojekt."
          buttonText="Engineering anfragen"
          buttonLink="/ressourcen/support"
          icon={<Building className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
