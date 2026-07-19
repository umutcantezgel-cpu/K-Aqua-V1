import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Droplet, Shield, Thermometer, Layers, Users, MapPin } from '@/components/ui/icon';

export const trinkwasserhygieneLegionellen: NewsPost = {
  slug: 'trinkwasserhygiene-legionellenpraevention-ppr',
  date: 'Sicherheit',
  tag: 'Hygiene',
  title: 'Trinkwasserhygiene Legionellenprävention mit PPR Rohren',
  teaser: 'Sauberes Wasser am Einspeisepunkt nützt wenig, wenn die Rohre kontaminiert sind. Wie PPR die perfekte Trinkwasserhygiene sichert.',
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Droplet className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die unsichtbare Gefahr" className="mb-6 text-primary" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Trinkwasser ist unser mit Abstand wertvollstes Lebensmittel. Die Wasserwerke liefern es in nahezu perfekter Qualität bis an die Grundstücksgrenze. Doch was passiert auf den letzten Metern innerhalb des Gebäudes? Veraltete, korrodierte Leitungssysteme verwandeln sich oftmals in unbemerkt tickende Zeitbomben für die Gesundheit. Der Einsatz von modernem Polypropylen ist der entscheidende Schlüssel, um Bakterienkolonien wie Legionellen effektiv und dauerhaft zu verhindern.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Biofilm Problem - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Das Biotop im alten Rohr" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Wie gefährlicher Biofilm entsteht
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die raue Oberfläche</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rostendes Eisen und oxidierendes Kupfer bilden über die Jahre eine extrem zerklüftete Oberfläche im Inneren des Rohres. In diesen mikroskopischen Tälern und Schluchten verfängt sich Kalk. Diese porösen Kalkinkrustationen sind die absolut perfekte Brutstätte für Mikroorganismen. Sie krallen sich regelrecht in der rauen Oberfläche fest und entziehen sich so dem normalen Wasserfluss.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Gefährliche Stagnation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sobald Wasser in schlecht isolierten Leitungen steht, nimmt das Kaltwasser unweigerlich die Raumtemperatur an. Bei Temperaturen zwischen fünfundzwanzig und fünfzig Grad Celsius vermehren sich Legionellen geradezu explosionsartig. Sie nisten sich tief im Biofilm ein und werden beim nächsten Öffnen des Wasserhahns unbemerkt als feines Aerosol eingeatmet.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The PPR Solution - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Die technologische Antwort" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Warum PPR die perfekte Lösung ist
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Absolute Oberflächenglätte",
              description: "Mit einer Rauheit von lediglich null Komma null null sieben Millimetern ist das Innere eines PPR Rohres glatter als gewöhnliches Fensterglas. Kalk und Schmutz finden absolut keine Möglichkeit zur Anhaftung. Wo sich kein Kalk anlagern kann, entsteht auch kein schützender Biofilm für gefährliche Bakterien.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "Korrosionsfreiheit für die Ewigkeit",
              description: "Kunststoff reagiert chemisch überhaupt nicht mit Wasser. Es entsteht absolut kein Rost, der das Trinkwasser bräunlich verfärben oder als Nährboden für Mikroorganismen dienen könnte. Selbst hochgradig gechlortes Wasser oder extrem saure pH Werte lassen das Material über Jahrzehnte hinweg völlig unbeeindruckt.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Herausragende Thermische Isolierung",
              description: "Polypropylen ist ein natürlicher Isolator. Kaltwasserleitungen erwärmen sich im Versorgungsschacht deutlich langsamer, Warmwasser kühlt auf dem Weg zur Zapfstelle nicht unnötig aus. Dies verhindert proaktiv, dass das Wasser in den gefährlichen Temperaturbereich abrutscht, in dem Legionellen ideal gedeihen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Mikroskopischer Vergleich: Metallrohr vs K Aqua Rohr Innenfläche" />
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0,007", u: "mm", l: "Rauheit der Innenwand" },
              { n: "100", u: "%", l: "Lebensmittelecht und geschmacksneutral" },
              { n: "0", u: "", l: "Haftgrund für Bakterien" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Use Cases - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Kritische Infrastrukturen schützen" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Kompromisslos in sensiblen Bereichen
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Ein Ausbruch der Legionärskrankheit bedeutet für Betreiber ein massives rechtliches und finanzielles Risiko. Hier bietet unser System die maximale Sicherheit.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Kliniken und Krankenhäuser"
              description="Immunschwache Patienten sind durch kontaminiertes Trinkwasser akut lebensgefährlich bedroht. Die glatten Innenwände unserer Rohre sind hier ein essenzieller Baustein der Krankenhaushygiene."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Hotellerie und Gewerbe"
              description="Wechselnde Belegung bedeutet oftmals längere Stagnationszeiten des Wassers im Zimmer. Die thermische Trägheit des Kunststoffs schützt Kaltwasserstränge effektiv vor ungewollter Erwärmung."
              header={<div className="w-full h-48 bg-accent/10 rounded-t-2xl flex items-center justify-center border-b border-accent/20"><MapPin className="w-24 h-24 text-accent opacity-40" /></div>}
              icon={<MapPin className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Öffentliche Einrichtungen"
              description="In Schulen oder großen Sportstätten steht das Wasser über die Wochenenden oder Ferien oft komplett still. Das System stellt sicher, dass sich beim erneuten Anfahren keine abgelösten Rostpartikel im Wasser befinden."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Users className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Users className="h-6 w-6 text-foreground" />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-gradient-to-br from-blue-900/20 to-background border border-blue-900/30 p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
              <Droplet className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Investition in reine Gesundheit
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die Wahl des richtigen Rohrleitungssystems ist weit mehr als eine technische Detailfrage für den Installateur. Es ist eine fundamentale Entscheidung für den dauerhaften Gesundheitsschutz aller Nutzer im Gebäude. K Aqua bietet Planern und Bauherren die absolute Gewissheit, das Thema Trinkwasserhygiene kompromisslos, dauerhaft und auf dem allerhöchsten Stand der Technik gelöst zu haben.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
