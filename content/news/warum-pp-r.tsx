import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Thermometer, Shield, Leaf, Droplet, Layers, Recycle } from '@/components/ui/icon';

export const warumPpr: NewsPost = {
  slug: 'warum-eigentlich-ppr-materialkunde',
  date: 'Wissen',
  tag: 'Material',
  title: 'Warum eigentlich PPR Materialkunde für Rohrleitungssysteme',
  teaser: 'Vom Abfackelgas zum extrem belastbaren Trinkwasserrohr die faszinierende Materialgeschichte des Polypropylens.',
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Thermometer className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die Wissenschaft der Langlebigkeit" className="mb-6 text-primary" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Wenn man heute eine moderne Großbaustelle betritt, fallen sofort die markanten Rohrleitungen ins Auge. Der Werkstoff, aus dem diese technologischen Meisterwerke gefertigt sind, nennt sich Polypropylen Random Copolymer. Doch wie wurde aus einem einstigen Nebenprodukt der Erdölförderung der wohl wichtigste Kunststoff für die globale Wasserinstallation? Eine faszinierende Reise durch die moderne Chemie und den unbedingten Willen zur Perfektion.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-8">
        <Reveal>
          <div className="text-center mb-8">
            <Eyebrow text="Die physikalischen Grenzen verschoben" />
          </div>
          <StatBand 
            stats={[
              { n: "0,007", u: "mm", l: "Absolute Oberflächenrauheit" },
              { n: "0,24", u: "W/mK", l: "Minimale Wärmeleitfähigkeit" },
              { n: "7,4", u: "SDR", l: "Maximale Druckbelastbarkeit" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Evolution - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Molekulare Architektur" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Vom nutzlosen Gas zum Hightech Kunststoff
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Ressourcen effizient nutzen",
              description: "Vor wenigen Jahrzehnten wurden Gase wie Propylen bei der Raffination von Erdöl als völlig nutzloses Abfallprodukt betrachtet und einfach auf den Ölfeldern abgefackelt. Diese Praxis verschwendete wertvolle Ressourcen. Erst die bahnbrechende Entdeckung spezieller Katalysatoren machte es möglich, diese ungenutzten Gase zu extrem langen und widerstandsfähigen Molekülketten zu polymerisieren.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "Das Geheimnis der Ethylen Moleküle",
              description: "Polypropylen ist nicht gleich Polypropylen. Für Rohre, die jahrzehntelang extremen Drücken ausgesetzt sind, bedarf es einer besonderen Architektur. Bei der Herstellung von Random Copolymer werden gezielt kleine Mengen Ethylen eingebaut. Und zwar völlig zufällig verteilt. Diese winzigen molekularen Störer verhindern, dass das Material zu stark kristallisiert und spröde wird. Die perfekte Kombination aus Festigkeit und Flexibilität.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Die Evolution zu PPRCT",
              description: "Die Entwicklungsabteilungen ruhen sich nicht aus. Mit PPRCT, einem Polypropylen mit noch feinerer Kristallstruktur, wurden die physikalischen Grenzen abermals verschoben. Diese Modifikation bringt spürbar mehr Temperaturreserve und eine deutlich erhöhte Druckresistenz bei wesentlich dünneren Wandstärken. Die ultimative Wahl für Hochtemperatur Heizanlagen und gewaltige industrielle Fernwärmenetze.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Physical Superiority over metals - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Ein neues Zeitalter der Installation" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Physikalische Überlegenheit gegenüber Metall
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Jahrzehntelang dominierten Kupfer und Stahl. Doch die einzigartigen physikalischen Eigenschaften dieses Kunststoffs bieten unschlagbare Vorteile.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Korrosionsfreiheit als Standard"
              description="Das gravierendste Problem metallischer Rohre ist die Korrosion. Stahl rostet, Kupfer neigt zu gefährlichem Lochfraß. Unser Copolymer geht keinerlei chemische Reaktion mit Wasser ein. Es verrottet nicht und korrodiert niemals, selbst bei aggressivsten Bedingungen."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Maximaler Durchfluss"
              description="Die extrem glatte Innenfläche verringert die Reibung auf ein absolutes Minimum. Gefährlicher Biofilm und Bakterien wie Legionellen finden schlichtweg keinen Halt."
              header={<div className="w-full h-48 bg-accent/10 rounded-t-2xl flex items-center justify-center"><Droplet className="w-24 h-24 text-accent opacity-40" /></div>}
              icon={<Droplet className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Insulation and Acoustics - Split Cards */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Natürliche Wärmedämmung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mit einer Wärmeleitfähigkeit von nur null Komma vierundzwanzig Watt pro Meter und Kelvin ist das Material ein exzellenter thermischer Isolator. Kupfer hingegen leitet Wärme fast zweitausendmal schneller ab. Die Rohrleitung dämmt sich hierbei quasi selbst. Das reduziert den Bedarf an extrem dicken Dämmmaterialien maßgeblich und senkt den Platzbedarf im Schacht.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Flüsterleise Akustik</h3>
              <p className="text-muted-foreground leading-relaxed">
                Der Werkstoff schluckt den Schall ganz hervorragend. Das lästige Rauschen fließenden Wassers oder laute Fließgeräusche bei extremen Druckstößen werden von der weichen molekularen Struktur direkt absorbiert. Das sorgt für flüsterleise und komfortable Installationen in exklusiven Hotels, sterilen Krankenhäusern und extrem hochwertigen Wohnkomplexen.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Premium Visualization (e.g. Molecular Structure or Heat Map) */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Infrarot Thermografie Rohrvergleich Metall vs PPR" />
        </Reveal>
      </section>

      {/* Sustainability Banner */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-gradient-to-br from-green-900/20 to-background border border-green-900/30 p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
              <Recycle className="w-10 h-10 text-green-500" />
            </div>
            <Eyebrow text="Gelebte Kreislaufwirtschaft" className="text-green-500 mb-4" />
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Grüne Industrie ohne Kompromisse
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Von der ressourcenschonenden Gewinnung über die lange Lebensdauer bis hin zur vollständigen Recyclingfähigkeit am Ende der Nutzung. Der Werkstoff enthält absolut keine giftigen Weichmacher und keinerlei Schwermetalle. Verschnittreste von der Baustelle landen nicht auf der Mülldeponie, sondern können vollständig eingeschmolzen und wiederverwendet werden. So bauen wir zukunftssicher.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
