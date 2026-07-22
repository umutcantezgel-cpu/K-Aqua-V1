import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { ArrowRight, Zap, Droplet, Layers, Thermometer, ChevronDown } from '@/components/ui/icon';

export const druckverlustStroemungsdynamik: NewsPost = {
  slug: 'druckverlust-stroemungsdynamik-effizienz-ppr',
  date: 'Technik',
  tag: 'Effizienz',
  title: {
    de: 'Druckverlust & Strömung',
    en: 'Pressure Loss & Flow Dynamics',
    ar: 'فقدان الضغط وديناميكا التدفق',
  },
  teaser: {
    de: 'Jeder Millimeter Rohrreibungsverlust kostet massiv Pumpenstrom. Erfahren Sie, wie die Oberflächenglätte von PPR Rohrsystemen den Druckverlust minimiert und die Betriebskosten in Gebäuden und Industrieanlagen nachhaltig reduziert.',
    en: 'Every millimeter of pipe friction loss massively increases pump energy consumption. Learn how the surface smoothness of PPR piping systems minimizes pressure loss and sustainably reduces operating costs in buildings and industrial facilities.',
    ar: 'كل مليمتر من فقدان الاحتكاك في الأنابيب يزيد بشكل هائل من استهلاك طاقة المضخات. اكتشف كيف تقلل نعومة السطح في أنظمة أنابيب PPR من فقدان الضغط وتخفض تكاليف التشغيل بشكل مستدام في المباني والمنشآت الصناعية.',
  },
  excerpt: {
    de: 'Jeder Millimeter Rohrreibungsverlust kostet massiv Pumpenstrom. Erfahren Sie, wie die Oberflächenglätte von PPR Rohrsystemen den Druckverlust minimiert und die Betriebskosten in Gebäuden und Industrieanlagen nachhaltig reduziert.',
    en: 'Every millimeter of pipe friction loss massively increases pump energy consumption. Learn how the surface smoothness of PPR piping systems minimizes pressure loss and sustainably reduces operating costs in buildings and industrial facilities.',
    ar: 'كل مليمتر من فقدان الاحتكاك في الأنابيب يزيد بشكل هائل من استهلاك طاقة المضخات. اكتشف كيف تقلل نعومة السطح في أنظمة أنابيب PPR من فقدان الضغط وتخفض تكاليف التشغيل بشكل مستدام في المباني والمنشآت الصناعية.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ArrowRight className="w-64 h-64 text-cyan-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die Physik des Fließens" className="mb-6 text-cyan-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                In großen Gebäudekomplexen und industriellen Anlagen werden täglich tausende Tonnen Wasser bewegt. Um diese gewaltigen Massen gegen Schwerkraft und Leitungswiderstand zu fördern, leisten Pumpen kontinuierlich Schwerstarbeit. Genau hier entscheidet die Wahl moderner PPR Rohrsysteme über die langfristige Wirtschaftlichkeit. Ein entscheidendes Detail – die minimale Oberflächenrauheit von K Aqua PPR – definiert, ob Ihr Gebäude zum Energiefresser oder zum Effizienzwunder wird.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Turbulence vs Laminar - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Der unsichtbare Widerstand" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Turbulenz vs Laminarität
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Bremse der Metalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Klassische Stahlrohre besitzen ab Werk eine mikroskopisch raue Oberfläche. Über die Jahre der Nutzung lagern sich Mineralien, Rost und Biofilme an dieser rauen Wandung ab. Der nutzbare Rohrquerschnitt verjüngt sich, die Strömung wird zunehmend turbulent. Die Folge: Der Reibungswiderstand steigt exponentiell an. Die Pumpen müssen mit immer höherer Leistung (und drastisch steigendem Stromverbrauch) dagegen ankämpfen.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-cyan-500/20 bg-cyan-500/5">
              <ArrowRight className="w-12 h-12 text-cyan-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Der Beschleuniger PPR</h3>
              <p className="text-muted-foreground leading-relaxed">
                K Aqua PPR wird durch Extrusion hergestellt. Das Ergebnis ist eine spiegelglatte Innenwand mit einer absoluten Oberflächenrauheit von nur 0,007 mm. An dieser Wand können sich keine Inkrustationen festsetzen. Die Strömung bleibt laminar und gleitet nahezu widerstandslos durch das Netz. Selbst nach Jahrzehnten intensiver Nutzung bleibt der Druckverlust auf dem initialen Minimum – eine physikalische Garantie für niedrige Energiekosten.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Physics of Flow - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Ingenieurskunst in Zahlen" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Die absolute Minimierung des Druckverlusts
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Der Reibungskoeffizient",
              description: "Der entscheidende Wert in der Strömungstechnik ist die Oberflächenrauheit. Mit unübertroffenen null Komma null null sieben Millimetern reduziert K Aqua den Reibungskoeffizienten auf ein physikalisches Minimum. Das Wasser erfährt praktisch keinen Widerstand an der Rohrinnenwand.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><ChevronDown className="w-32 h-32 text-cyan-500 opacity-20" /></div>
            },
            {
              title: "Druckverlust neutralisieren",
              description: "Jedes Winkelstück und jeder Meter Rohrleitung erzeugt in klassischen Systemen Druckverluste. Durch die optimierte Geometrie unserer Formteile und die extrem glatten Rohrwände kommt am Ende der Leitung exakt der Druck an, der am Anfang investiert wurde.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Intelligente Dimensionierung",
              description: "Da die Strömungsgeschwindigkeit in Polypropylenrohren deutlich höher sein darf, ohne störende Fließgeräusche zu verursachen, können Planer die Leitungsdurchmesser oftmals kleiner dimensionieren. Das spart wertvollen Platz in den Installationsschächten und reduziert die Materialkosten erheblich.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><ArrowRight className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Economic Efficiency - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Der wirtschaftliche Hebel" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Operationale Effizienz im Gebäude
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Drastische Stromkostenreduktion"
              description="Hocheffizienzpumpen entfalten ihr volles Sparpotenzial erst, wenn sie nicht gegen rostige Rohrleitungen ankämpfen müssen. Der laminare Fluss senkt die Stromrechnung für den Wasser und Heizungstransport massiv ab."
              header={<div className="w-full h-48 bg-cyan-500/10 rounded-t-2xl flex items-center justify-center border-b border-cyan-500/20"><Zap className="w-24 h-24 text-cyan-500 opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-cyan-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Pumpenauslegung reduzieren"
              description="Die extrem glatte Oberfläche von PPR (0,007 mm vs. 0,15 mm bei Stahl) erlaubt es Ingenieuren oft, die Förderleistung der Umwälzpumpen von Beginn an kleiner zu dimensionieren. Das senkt die initialen Baukosten spürbar."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Thermometer className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Thermometer className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Konstante Leistung für Jahrzehnte"
              description="Während bei klassischen Installationen der Querschnitt durch Kalk und Rost über die Jahre immer kleiner wird, behält das Polypropylensystem seinen originalen Innendurchmesser und die volle Durchflussmenge ab dem ersten Tag bis ans Ende seiner Lebensdauer."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Layers className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Layers className="h-6 w-6 text-foreground" />}
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
              { n: "0,007", u: "mm", l: "Unübertroffene Oberflächenglätte" },
              { n: "100", u: "%", l: "Querschnittserhalt nach fünfzig Jahren" },
              { n: "0", u: "", l: "Zunehmender Reibungsverlust über die Zeit" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Strömungssimulation: Turbulenz im Metall vs Laminarströmung in PPR" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6">
              <Zap className="w-10 h-10 text-cyan-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Die Adern des energieeffizienten Bauens
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Jedes Watt Pumpenstrom, das durch Reibung im Rohrnetz verloren geht, ist eine vermeidbare wirtschaftliche und ökologische Belastung. Mit K Aqua PPR investieren Sie in die perfekte Strömungsmechanik. Die spiegelglatten Innenwände garantieren einen laminaren, verlustarmen Transport Ihrer Medien von der ersten Minute an und über die gesamte Lebensdauer des Gebäudes. Reduzieren Sie Ihre Energiekosten an der Quelle.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
