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
    de: 'Druckverlust & Strömungsdynamik: Pumpstrom radikal sparen',
    en: 'Pressure Loss & Flow Dynamics',
    ar: 'فقدان الضغط وديناميكا التدفق',
  },
  teaser: {
    de: 'Jeder Millimeter Rohrreibungsverlust kostet massiv Pumpenstrom. Erfahren Sie, wie die überlegene Oberflächenglätte von PP-R Rohrsystemen den Druckverlust minimiert, laminare Strömungen ermöglicht und die Betriebskosten in Gebäuden drastisch reduziert.',
    en: 'Every millimeter of pipe friction loss massively increases pump energy consumption. Learn how the surface smoothness of PPR piping systems minimizes pressure loss and sustainably reduces operating costs in buildings and industrial facilities.',
    ar: 'كل مليمتر من فقدان الاحتكاك في الأنابيب يزيد بشكل هائل من استهلاك طاقة المضخات. اكتشف كيف تقلل نعومة السطح في أنظمة أنابيب PPR من فقدان الضغط وتخفض تكاليف التشغيل بشكل مستدام في المباني والمنشآت الصناعية.',
  },
  excerpt: {
    de: 'Jeder Millimeter Rohrreibungsverlust kostet massiv Pumpenstrom. Erfahren Sie, wie die überlegene Oberflächenglätte von PP-R Rohrsystemen den Druckverlust minimiert, laminare Strömungen ermöglicht und die Betriebskosten in Gebäuden drastisch reduziert.',
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
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance mb-6">
                In großen Gebäudekomplexen, Krankenhäusern und industriellen Anlagen werden täglich tausende Tonnen Wasser bewegt. Um diese gewaltigen Massen gegen die Schwerkraft und den Leitungswiderstand (Rohrreibung) zu fördern, leisten elektrische Umwälzpumpen kontinuierlich Schwerstarbeit. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                Genau hier an dieser unsichtbaren Schnittstelle zwischen Strömungsmechanik und Energietechnik entscheidet die Wahl des Rohrleitungsmaterials über die langfristige Wirtschaftlichkeit einer gesamten Anlage. Ein scheinbar kleines Detail – die minimale Oberflächenrauheit von K-Aqua PP-R – definiert, ob Ihr Gebäude in den kommenden Jahrzehnten zum stromfressenden Albtraum oder zum hocheffizienten Energiewunder wird.
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
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Bremse der Metalle (Turbulenz)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Klassische Stahlrohre besitzen bereits ab Werk eine mikroskopisch raue Oberfläche. Über die Jahre der Nutzung lagern sich unweigerlich Mineralien, Kalk, Rost und Biofilme an dieser rauen Wandung ab. Der effektiv nutzbare innere Rohrquerschnitt verjüngt sich. Das fließende Wasser wird an der Wandung gebremst, es entstehen Wirbel. Die Strömung kippt von laminar zu turbulent (hohe Reynolds-Zahl). Die Folge: Der Reibungswiderstand steigt im Moody-Diagramm exponentiell an. Die Pumpen müssen mit immer höherer elektrischer Leistung dagegen ankämpfen, um das Volumen aufrechtzuerhalten.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-cyan-500/20 bg-cyan-500/5">
              <ArrowRight className="w-12 h-12 text-cyan-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Der Beschleuniger PP-R (Laminarität)</h3>
              <p className="text-muted-foreground leading-relaxed">
                K-Aqua PP-R wird im hochpräzisen Extrusionsverfahren hergestellt. Das Ergebnis ist eine spiegelglatte, porenfreie Innenwand mit einer absoluten Oberflächenrauheit von nur 0,007 mm. An dieser extremen Glätte können sich keine Inkrustationen festsetzen. Die Wasserströmung gleitet in parallelen Schichten übereinander (Laminarströmung) nahezu widerstandslos durch das Netz. Selbst nach Jahrzehnten intensiver Nutzung bleibt der Druckverlust auf dem initialen Minimum – eine bauphysikalische Garantie für dauerhaft niedrige Energiekosten.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Deep Technical Analysis */}
      <section className="mt-12">
        <Reveal>
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ingenieurskunst: Die Reynolds-Zahl und Darcy-Weisbach</h2>
            <p>
              Der Druckverlust in Rohrleitungen wird klassischerweise mit der Darcy-Weisbach-Gleichung berechnet. Darin ist die Rohrreibungszahl (λ) direkt abhängig von der relativen Rauheit (k/d). Ein neues verzinktes Stahlrohr startet typischerweise mit einem k-Wert von 0,15 mm. Im Laufe weniger Jahre kann dieser durch Korrosion auf 1,5 mm oder sogar 3,0 mm anwachsen. Dies verzehnfacht den Reibungswiderstand.
            </p>
            <p>
              Polypropylen-Random (PP-R) Rohre weisen einen k-Wert von konstant 0,007 mm auf. Da PP-R weder korrodiert noch Kalk ansetzt, bleibt dieser exzellente Wert über die gesamte Lebensdauer von 50 Jahren exakt gleich. Die Hocheffizienzpumpen im Gebäude können dadurch dauerhaft in ihrem optimalen, niedrigsten Leistungsbereich arbeiten. Über den gesamten Lebenszyklus einer Industrieanlage lassen sich so zehntausende Euro an Stromkosten und etliche Tonnen CO2-Emissionen einsparen.
            </p>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Einsparungen bei der Querschnittsdimensionierung</h3>
            <p>
              Ein weiterer gewaltiger Vorteil: Weil der Druckverlust so gering ist, können TGA-Planer die Leitungsquerschnitte häufig eine Dimension kleiner auslegen als es bei Metallrohren der Fall wäre. Eine höhere Strömungsgeschwindigkeit ist im PP-R Rohr (bis zu einem gewissen Grad) völlig unproblematisch, da keine schützende Oxidschicht (wie bei Kupfer) weggespült werden kann (Erosionskorrosion existiert bei Kunststoff nicht). Das spart nicht nur erheblich Materialkosten, sondern auch wertvollen Platz in den vertikalen Installationsschächten.
            </p>
          </div>
        </Reveal>
      </section>

      {/* The Physics of Flow - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Physik in Zahlen" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Die absolute Minimierung des Druckverlusts
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Der Reibungskoeffizient",
              description: "Mit unübertroffenen null Komma null null sieben Millimetern (0,007 mm) reduziert K-Aqua PP-R den Reibungskoeffizienten auf ein strömungsmechanisches Minimum. Das vorbeiströmende Wasser erfährt praktisch keinen nennenswerten Widerstand an der Rohrinnenwand.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><ChevronDown className="w-32 h-32 text-cyan-500 opacity-20" /></div>
            },
            {
              title: "Druckverlust in Fittings neutralisieren",
              description: "Jedes Winkelstück, jedes T-Stück und jede Verengung erzeugt Druckverluste (Zeta-Werte). Durch die strömungstechnisch optimierte, gerundete Geometrie unserer Spritzguss-Formteile kommt am Ende der Leitung exakt der dynamische Druck an, der am Anfang von der Pumpe investiert wurde.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Hervorragende Akustik (Schallschutz)",
              description: "Turbulente Strömungen sind laut. Sie verursachen Kavitation und Rauschen, das sich als Körperschall durch das gesamte Mauerwerk überträgt. Die laminare Strömung in PP-R verläuft extrem geräuscharm. Zudem besitzt der Kunststoff hervorragende schalldämmende Eigenschaften. Perfekt für Luxushotels und Wohnanlagen.",
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
              Operationale Effizienz steigern
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Drastische Stromkostenreduktion"
              description="Hocheffizienzpumpen entfalten ihr volles Sparpotenzial erst, wenn sie nicht gegen zugefrorene, rostige Rohrleitungen ankämpfen müssen. Der laminare Fluss senkt die Stromrechnung für Zirkulations- und Kühlwassertransport massiv ab."
              header={<div className="w-full h-48 bg-cyan-500/10 rounded-t-2xl flex items-center justify-center border-b border-cyan-500/20"><Zap className="w-24 h-24 text-cyan-500 opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-cyan-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Pumpenauslegung reduzieren"
              description="Die extrem glatte Oberfläche erlaubt es Planern, die initiale elektrische Förderleistung der Pumpen von Beginn an kleiner zu dimensionieren. Das senkt den CAPEX (Anschaffungskosten der Pumpstation) spürbar."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Thermometer className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Thermometer className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Konstante Durchflussleistung für Jahrzehnte"
              description="Während bei Installationen aus Stahl der Querschnitt durch Kalk und Rost im Laufe der Jahre immer kleiner wird, behält das K-Aqua System seinen originalen Innendurchmesser und die volle Literleistung ab dem ersten Tag bis ans Ende der Lebensdauer."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Layers className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Layers className="h-6 w-6 text-foreground" />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section className="mt-12">
        <Reveal>
          <div className="bg-card border border-card-border p-8 lg:p-12 rounded-3xl">
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-8">
              FAQ: Strömung und Auslegung
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Gibt es Fließgeschwindigkeitsbegrenzungen bei PP-R?</h4>
                <p className="text-muted-foreground">
                  Im Gegensatz zu Kupfer, wo hohe Strömungsgeschwindigkeiten (oft begrenzt auf max. 1,0 - 1,5 m/s) die schützende Oxidschicht abtragen und zu Kavitationskorrosion führen, ist PP-R gegen Erosionskorrosion völlig immun. Die Fließgeschwindigkeiten in Kunststoffrohren werden de facto nur durch die akustischen Komfortgrenzen (Schallschutz nach DIN 4109) limitiert, weshalb in bestimmten Bereichen höhere Strömungsgeschwindigkeiten (bis 2,0 m/s und mehr) zulässig sind.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Wie verhält sich der Druckverlust bei den Schweißmuffen?</h4>
                <p className="text-muted-foreground">
                  Die Muffenschweißung bei PP-R ist so konzipiert, dass bei korrekter Ausführung (Einhaltung der Aufwärm- und Einstecktiefe) kein Wulst im Inneren des Rohres entsteht, der den Querschnitt signifikant verjüngt. Der Strömungswiderstand eines perfekt geschweißten K-Aqua Fittings ist minimal und in den Zeta-Werten der Planungssoftware exakt hinterlegt.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Muss ich die Pumpengröße bei PP-R anders berechnen als bei Stahl?</h4>
                <p className="text-muted-foreground">
                  Unbedingt. Werden einfach die alten Berechnungen für Stahlrohre übernommen, ist die Pumpe im PP-R System gnadenlos überdimensioniert, was Energie verschwendet. Die hydraulische Berechnung nach DIN 1988-300 muss zwingend mit der materialspezifischen Rauheit (0,007 mm) des Kunststoffrohres erfolgen.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0,007", u: "mm", l: "Unübertroffene Oberflächenglätte" },
              { n: "100", u: "%", l: "Querschnittserhalt nach fünfzig Jahren Betriebszeit" },
              { n: "0", u: "", l: "Zunehmender Reibungsverlust über die Zeit" },
            ]} 
            cols={250}
          />
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
              Jedes elektrische Watt Pumpenstrom, das durch unnötige Rohrreibung im Leitungssystem verloren geht, ist eine auf Dauer unerträgliche wirtschaftliche und ökologische Belastung. Mit K-Aqua PP-R investieren Sie in die buchstäblich perfekte Strömungsmechanik. Die spiegelglatten Innenwände garantieren einen verlustarmen Transport Ihrer Medien von der ersten Minute an – und das beständig über die gesamte Lebensdauer des Gebäudes. Reduzieren Sie Ihre Energiekosten direkt an der Quelle.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
