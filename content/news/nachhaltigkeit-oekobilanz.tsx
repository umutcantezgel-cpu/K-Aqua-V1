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

      {/* Deep Technical Prose Area */}
      <section>
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
            <h2>Ökobilanz im Rohrleitungsbau: Warum Kunststoff nachhaltiger als Metall ist</h2>
            <p>
              In der Debatte um nachhaltiges Bauen und Gebäudezertifizierungen (wie LEED, BREEAM oder DGNB) liegt der Fokus oft auf Dämmstoffen oder erneuerbaren Energien. Die Technische Gebäudeausrüstung (TGA) – insbesondere das Rohrleitungsnetz – wird dabei häufig unterschätzt. Doch genau hier liegen gewaltige Potenziale zur CO2-Reduktion. Wenn man den gesamten Lebenszyklus (Life Cycle Assessment, LCA) betrachtet, schneiden K Aqua PP-R (Polypropylen Random-Copolymer) Systeme signifikant besser ab als herkömmliche Metallsysteme wie Kupfer oder Stahl. Nachhaltigkeit beginnt bei der Rohstoffgewinnung und endet erst beim sortenreinen Recycling.
            </p>
            
            <h3>Energieintensität der Herstellung (Embodied Energy)</h3>
            <p>
              Der erste große ökologische Vorteil von PP-R offenbart sich bereits bei der Herstellung. Die sogenannte "graue Energie" (Embodied Energy) – also die Energiemenge, die benötigt wird, um den Rohstoff abzubauen, zu raffinieren und das Endprodukt herzustellen – ist bei Polypropylen extrem gering. 
            </p>
            <p>
              Um Kupfer zu gewinnen, müssen gigantische Mengen Erz im Tagebau abgebaut und anschließend bei über 1.200 °C unter massivem Energieaufwand verhüttet werden. Ähnlich verhält es sich bei Stahl. PP-R hingegen ist ein Nebenprodukt der Erdölraffination. Die anschließende Polymerisation und Extrusion der Rohre bei moderaten 200 °C bis 250 °C benötigt nur einen Bruchteil der Energie. Studien zeigen, dass die Herstellung eines Kilogramms PP-R bis zu 70 % weniger CO2-Emissionen verursacht als die Herstellung der volumengleichen Menge Kupfer.
            </p>

            <h3>Die ökologische Rendite im Betrieb</h3>
            <p>
              Die wahre Nachhaltigkeit eines Gebäudes entscheidet sich jedoch während der jahrzehntelangen Nutzungsphase. Hier spielen thermische Verluste eine zentrale Rolle. Kupfer und Stahl sind hervorragende Wärmeleiter. Transportieren sie heißes Heizungs- oder Trinkwasser, geben sie die Energie ungebremst an die Umgebung ab, sofern sie nicht zentimeterdick isoliert werden.
            </p>
            <p>
              K Aqua PP-R Rohre besitzen von Natur aus eine sehr geringe Wärmeleitfähigkeit (λ = 0,24 W/mK). Sie wirken wie eine natürliche Isolierung. Dieser physikalische Vorteil führt dazu, dass das heiße Wasser mit viel weniger Temperaturverlust an der Zapfstelle oder am Heizkörper ankommt. Über eine Lebensdauer von 50 Jahren summiert sich diese passive Energieeinsparung zu massiven Reduktionen bei den Heizkosten und den damit verbundenen CO2-Emissionen des gesamten Gebäudes.
            </p>

            <h3>Hydraulische Effizienz und Pumpenstrom</h3>
            <p>
              Ein weiterer, oft übersehener Faktor der Ökobilanz ist der Stromverbrauch von Zirkulations- und Umwälzpumpen. Metallrohre neigen mit der Zeit zu Inkrustationen (Kalkablagerungen) und Korrosion. Der Rohrquerschnitt verengt sich, die Innenwand wird rau. Die Pumpen müssen folglich mit wesentlich mehr elektrischer Leistung arbeiten, um das Wasser durch das System zu drücken.
            </p>
            <p>
              PP-R Rohre sind korrosionsfrei und besitzen eine spiegelglatte Innenoberfläche (Rauheit &lt; 0,007 mm). Sie verkalken nicht. Der Reibungswiderstand bleibt über ein halbes Jahrhundert konstant niedrig. Die Pumpen können dauerhaft in einem niedrigen, energieeffizienten Drehzahlbereich laufen, was den Stromverbrauch der Immobilie nachhaltig senkt.
            </p>

            <h3>Kreislaufwirtschaft: 100 % Recyclingfähigkeit</h3>
            <p>
              Das Prinzip "Cradle to Grave" reicht uns nicht – wir denken "Cradle to Cradle". Am Ende der extrem langen Nutzungsdauer von über 50 Jahren stehen wir nicht vor einem Haufen Sondermüll. K Aqua Rohre bestehen aus reinem Kohlenstoff und Wasserstoff, ganz ohne giftige Weichmacher (Phthalate), Schwermetalle oder Halogene. 
            </p>
            <p>
              Wird das Gebäude irgendwann abgerissen, können die Rohre sortenrein gesammelt, gehäckselt, geschmolzen und zu neuen, hochwertigen Kunststoffprodukten spritzgegossen werden. Die Homogenität des Systems (Rohr und Fitting bestehen aus exakt demselben Material) macht das Recycling extrem einfach, im Gegensatz zu Verbundrohren (Mehrschichtverbund), bei denen Aluminium und verschiedene Kunststoffe aufwendig getrennt werden müssen.
            </p>

            <h3>Häufig gestellte Fragen (FAQ) zur Ökobilanz</h3>
            <h4>Ist PP-R umweltfreundlich, obwohl es aus Erdöl hergestellt wird?</h4>
            <p>
              Ja, wenn man die Gesamtlebensdauer betrachtet. Der Einsatz von Erdöl für langlebige Infrastruktur (wie Rohre, die 50 Jahre Energie sparen) ist weitaus ökologischer, als es als Treibstoff in wenigen Minuten zu verbrennen. Die massive Einsparung an grauer Energie gegenüber Metallen macht PP-R zur nachhaltigeren Wahl.
            </p>
            <h4>Können PPR-Systeme helfen, LEED- oder DGNB-Punkte zu sammeln?</h4>
            <p>
              Absolut. Da K Aqua Rohre frei von toxischen Emissionen, VOCs (Flüchtige organische Verbindungen) und Halogenen sind, tragen sie positiv zur Bewertung der Raumluftqualität und der ökologischen Materialwahl in allen gängigen Zertifizierungssystemen (Green Building) bei.
            </p>
            <h4>Wie wirkt sich das geringe Gewicht auf die Umwelt aus?</h4>
            <p>
              PP-R ist fast 9-mal leichter als Kupfer. Das bedeutet: Für den Transport der Rohre von der Fabrik zur Baustelle wird massiv weniger LKW-Treibstoff benötigt, was den Carbon Footprint in der Logistikkette drastisch senkt.
            </p>
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
