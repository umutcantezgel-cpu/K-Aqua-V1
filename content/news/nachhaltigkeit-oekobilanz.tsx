import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Leaf, Globe, Recycle, Zap, Thermometer, Factory, Droplet } from '@/components/ui/icon';

export const nachhaltigkeitOekobilanz: NewsPost = {
  slug: 'nachhaltigkeit-oekobilanz-gruener-fussabdruck-ppr',
  date: 'Umwelt',
  tag: 'Nachhaltigkeit',
  title: {
    de: 'Nachhaltigkeit & Ökobilanz',
    en: 'Sustainability & Lifecycle Assessment',
    ar: 'الاستدامة وتقييم دورة الحياة',
  },
  teaser: {
    de: 'Nachhaltigkeit ist in der modernen Bauindustrie zum entscheidenden Kriterium geworden: Erfahren Sie, warum ökologische PPR Rohrsysteme von K Aqua durch lange Lebensdauer und 100% Recyclingfähigkeit überzeugen.',
    en: 'Sustainability has become the decisive criterion in the modern construction industry: Discover why ecological PPR piping systems from K Aqua stand out with their long lifespan and 100% recyclability.',
    ar: 'أصبحت الاستدامة المعيار الحاسم في صناعة البناء الحديثة: اكتشف لماذا تتميز أنظمة أنابيب PPR البيئية من K Aqua بعمرها الافتراضي الطويل وقابليتها لإعادة التدوير بنسبة 100٪.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Globe className="w-64 h-64 text-green-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Der grüne Rohstoff" className="mb-6 text-green-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Die Bauindustrie befindet sich in einem radikalen Umbruch. Gebäudezertifikate nach internationalen Standards fordern kompromisslose Nachhaltigkeit in jedem Gewerk. Wenn es um die lebenswichtigen Adern eines Bauwerks geht, schlägt Polypropylen herkömmliche Metalle um Längen. Wir betrachten den gesamten Lebenszyklus unserer Systeme und beweisen, dass High Tech und Umweltschutz bei K Aqua Hand in Hand gehen.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Lifecycle - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Cradle to Grave" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der ökologische Lebenszyklus
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Von der ersten Granulatperle bis zum sortenreinen Recycling betrachten wir jeden einzelnen Schritt auf seinen ökologischen Fußabdruck.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Ressourcenschonende Rohstoffgewinnung"
              description="Die Gewinnung und Raffination von Polypropylen erfordert nur einen Bruchteil der gigantischen Energiemengen, die für den Abbau und die Verhüttung von Kupfer oder Eisenerz benötigt werden. Der CO2 Rucksack unserer Rohstoffe ist von Beginn an minimal."
              header={<div className="w-full h-48 bg-green-500/10 rounded-t-2xl flex items-center justify-center border-b border-green-500/20"><Leaf className="w-24 h-24 text-green-500 opacity-40" /></div>}
              icon={<Leaf className="h-6 w-6 text-green-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Emissionsarme Produktion"
              description="Unsere modernen Extrusionsanlagen und Spritzgussmaschinen arbeiten mit optimierter Energieeffizienz. Es entstehen weder toxische Abwässer noch schädliche Rauchgase."
              header={<div className="w-full h-48 bg-accent/10 rounded-t-2xl flex items-center justify-center border-b border-accent/20"><Factory className="w-24 h-24 text-accent opacity-40" /></div>}
              icon={<Factory className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Aktive Energieeinsparung im Betrieb"
              description="Durch die hervorragende thermische Isolation des Kunststoffs geht während des Transports von Heizungswasser oder Warmwasser kaum wertvolle Wärme verloren. Das senkt den Energiebedarf des gesamten Gebäudes über Jahrzehnte hinweg signifikant ab."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Zap className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Zap className="h-6 w-6 text-foreground" />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Energy Efficiency - Split Cards */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Energieeffizienz im Fokus" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Thermische Isolation als Standard
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Der Wärmeverlust bei Metall</h3>
              <p className="text-muted-foreground leading-relaxed">
                Kupfer und Stahl sind extrem gute Wärmeleiter. Ohne zentimeterdicke und aufwendig installierte Isolation geben metallische Rohre die Energie des Heizungswassers sofort an die Umgebung ab. Dieser permanente Wärmeverlust kostet den Betreiber enorme Summen und treibt die CO2 Emissionen des Gebäudes unnötig in die Höhe.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-green-500/20 bg-green-500/5">
              <Zap className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die isolierende Natur von PPR</h3>
              <p className="text-muted-foreground leading-relaxed">
                K Aqua Rohre wirken durch ihre geringe Wärmeleitfähigkeit als natürlicher Isolator. Die Energie bleibt genau dort, wo sie gebraucht wird. Selbst bei minimaler zusätzlicher Dämmung übertreffen unsere Kunststoffsysteme die Energieeffizienz klassischer Installationen bei Weitem und senken die Betriebskosten drastisch.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* 100% Recycling - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Die ultimative Kreislaufwirtschaft" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Ein Material ohne toxische Altlasten
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Saubere Installationstechnik",
              description: "Bereits bei der Installation zeigt sich die ökologische Überlegenheit. Beim Muffenschweißen der Rohre entstehen absolut keinerlei toxische Dämpfe, keine Lösungsmittel und keine schädlichen Abgase. Die Baustelle bleibt eine reine und sichere Umgebung für alle Handwerker.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Leaf className="w-32 h-32 text-green-500 opacity-20" /></div>
            },
            {
              title: "Ein halbes Jahrhundert ohne Schadstoffe",
              description: "Während der gesamten extrem langen Nutzungsdauer von über fünfzig Jahren geben K Aqua Rohre absolut keine Mikroplastikpartikel oder bedenkliche Chemikalien an das kostbare Trinkwasser ab. Sie verhalten sich vollkommen inert und schützen die Gesundheit der Verbraucher.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-blue-500 opacity-20" /></div>
            },
            {
              title: "Sortenreines Recycling",
              description: "Sollte das Gebäude irgendwann abgerissen oder grundlegend saniert werden, lassen sich unsere sortenreinen Polypropylenrohre problemlos häckseln, einschmelzen und zu neuen, extrem hochwertigen Kunststoffprodukten verarbeiten. Der Kreislauf schließt sich perfekt.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Recycle className="w-32 h-32 text-accent opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Grafische Darstellung der geschlossenen Kreislaufwirtschaft von K Aqua" image="/images/new-k-aqua/about-us.webp" />
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "100", u: "%", l: "Sortenrein recycelbar am Lebensende" },
              { n: "50+", u: "Jahre", l: "Garantierte Lebensdauer im Dauerbetrieb" },
              { n: "0", u: "", l: "Toxische Emissionen bei der Verschweißung" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-gradient-to-br from-green-900/20 to-background border border-green-900/30 p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <Globe className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Bauen für die kommende Generation
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Ökologische Verantwortung ist bei K Aqua kein reines Lippenbekenntnis, sondern tief in der molekularen Struktur unserer Produkte verankert. Wer sich heute für unsere High Tech Rohrsysteme entscheidet, investiert nicht nur in maximale Sicherheit, sondern leistet einen aktiven, messbaren Beitrag zur Entlastung unserer Umwelt.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
