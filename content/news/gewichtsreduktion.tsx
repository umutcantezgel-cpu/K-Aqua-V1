import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Truck, Package, Shield, ArrowRight, Users, Factory } from '@/components/ui/icon';

export const gewichtsreduktionLogistik: NewsPost = {
  slug: 'gewichtsreduktion-logistik-handling-ppr',
  date: 'Effizienz',
  tag: 'Logistik',
  title: {
    de: 'Gewichtsreduktion Logistik',
    en: 'Weight Reduction in Logistics',
    ar: 'لوجستيات تقليل الوزن',
  },
  teaser: {
    de: 'Bis zu 80 % leichter als herkömmliche Metall- und Stahlrohre: Erfahren Sie, wie das geringe Eigengewicht von K Aqua PPR Rohrsystemen das Handling, die Logistik und den gesamten Bauablauf revolutioniert.',
    en: 'Up to 80% lighter than conventional metal and steel pipes: Discover how the low weight of K Aqua PPR pipe systems revolutionizes handling, logistics, and the entire construction process.',
    ar: 'أخف وزناً بنسبة تصل إلى 80% مقارنة بالأنابيب المعدنية والفولاذية التقليدية: اكتشف كيف يُحدث الوزن الخفيف لأنظمة أنابيب PPR من K Aqua ثورة في عمليات المناولة واللوجستيات وسير أعمال البناء بالكامل.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Truck className="w-64 h-64 text-yellow-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow className="mb-6 text-yellow-500">Die Entlastung auf der Baustelle</Eyebrow>
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                In der modernen Bauwirtschaft zählt nicht nur die Materialqualität, sondern auch die Verarbeitungsgeschwindigkeit und die Transporteffizienz. Jeder Millimeter Wandstärke bei klassischen Stahl- und Metallrohren bedeutet massives Zusatzgewicht, das aufwendig transportiert, gehoben und fixiert werden muss. K Aqua PPR Rohrsysteme brechen mit diesem ineffizienten Baukonzept: Die drastische Gewichtsreduktion von Polypropylen revolutioniert das Handling auf der Baustelle, entlastet Montageteams und optimiert die gesamte Baustellenlogistik.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Heavy Metal vs Lightweight - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow>Das Duell der Massen</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Schwerlast vs Handlichkeit
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Factory className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Schwerlast der Metalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stahlrohre und schwere Gussleitungen erfordern einen enormen logistischen Aufwand. LKWs erreichen ihre zulässigen Gewichtsgrenzen, bevor sie räumlich ausgelastet sind. Auf der Baustelle angekommen, werden teure Kräne oder schweres Hebezeug benötigt, um das Material in die oberen Stockwerke zu befördern. Für die Installateure bedeutet das Handling eine massive und oft ungesunde körperliche Dauerbelastung.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-yellow-500/20 bg-yellow-500/5">
              <Package className="w-12 h-12 text-yellow-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Das Leichtgewicht PPR</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mit einem Bruchteil des Gewichts von Metall ermöglicht Polypropylen ein völlig neues Arbeitstempo. Die Rohrstränge können von einem einzigen Installateur mühelos getragen und in Position gehalten werden. Selbst bei großen Dimensionen in der industriellen Anwendung entfällt oft der Bedarf für schweres Hebegerät. Das Material lässt sich schnell, sicher und ergonomisch verarbeiten.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Construction Site Reality - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow>Logistik bis ins Detail</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Die Realität der Beschaffungskette
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Globaler und lokaler Transport",
              description: "Dank des extrem geringen Volumengewichts können LKWs und Schiffscontainer vollständig bis unter das Dach beladen werden, ohne die gesetzlichen Achslasten zu überschreiten. Dies halbiert in vielen Projekten die Anzahl der benötigten Fahrten, senkt die Transportkosten signifikant und reduziert den CO2 Ausstoß.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Truck className="w-32 h-32 text-yellow-500 opacity-20" /></div>
            },
            {
              title: "Schnelligkeit in der Vertikalen",
              description: "In Hochhäusern ist die vertikale Logistik ein kritischer Flaschenhals. Leichte PPR Rohre können schnell und ohne Blockade großer Lastenaufzüge über das Treppenhaus oder kleinere Beförderungssysteme im Gebäude verteilt werden. Das spart wertvolle Zeit auf der Großbaustelle.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><ArrowRight className="w-32 h-32 text-muted-foreground opacity-20 -rotate-90" /></div>
            },
            {
              title: "Reduzierte statische Last",
              description: "Für Tragwerksplaner und Architekten bedeutet das geringe Eigengewicht der K Aqua Systeme einen enormen Vorteil. Die Decken und Hängekonstruktionen müssen deutlich weniger statische Dauerlast aufnehmen. Dies erlaubt leichtere und kostengünstigere Befestigungssysteme.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Economic Metrics - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow>Kalkulierbare Vorteile</Eyebrow>
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der ökonomische Hebel des Leichtbaus
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Beschleunigte Montage"
              description="Zeit ist das teuerste Gut auf jeder Baustelle. Da ein Installateur die Rohre alleine anheben, ausrichten und verschweißen kann, wird die Installationsgeschwindigkeit drastisch erhöht. Projekte werden pünktlicher fertiggestellt."
              header={<div className="w-full h-48 bg-yellow-500/10 rounded-t-2xl flex items-center justify-center border-b border-yellow-500/20"><Package className="w-24 h-24 text-yellow-500 opacity-40" /></div>}
              icon={<Package className="h-6 w-6 text-yellow-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Arbeitsschutz und Gesundheit"
              description="Das Heben schwerer Lasten ist die Hauptursache für krankheitsbedingte Ausfälle im Handwerk. Das leichte Material schont Gelenke und Rücken der Mitarbeiter maßgeblich."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Users className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Users className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Wegfall von Spezialgerät"
              description="Die Kosten für die Miete von Spezialkränen, Flaschenzügen oder verstärkten Transportfahrzeugen auf der Baustelle entfallen bei den meisten Standardinstallationen komplett."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Factory className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Factory className="h-6 w-6 text-foreground" />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "80", u: "%", l: "Geringeres Gewicht im Vergleich zu Stahlrohren" },
              { n: "1", u: "", l: "Installateur reicht für die Ausrichtung meistens aus" },
              { n: "50", u: "%", l: "Schnellere Verlegezeit in der Baupraxis" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Installation im Deckenbereich: Ein Handwerker montiert einen K Aqua Rohrstrang" image="/images/new-k-aqua/weld-in-saddles.png" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6">
              <Truck className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Logistische Intelligenz entscheidet
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die Profitabilität moderner Bau- und Großprojekte entscheidet sich längst nicht mehr nur über den reinen Materialpreis, sondern maßgeblich über Nebenkosten für Transportlogistik, Hebezeuge, Montagezeiten und gesundheitliche Belastungen des Personals. Die Investition in leichte K Aqua PPR Rohrsysteme ist eine strategische Entscheidung für effiziente Baustellenabläufe, nachhaltige Arbeitssicherheit und spürbar reduzierte Gesamtkosten (TCO).
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
