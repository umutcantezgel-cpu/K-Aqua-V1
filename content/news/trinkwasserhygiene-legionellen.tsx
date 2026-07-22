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
  date: '2024-11-10',
  tag: 'Hygiene',
  category: 'Sanitärtechnik',
  title: {
    de: 'Trinkwasserhygiene & Legionellen',
    en: 'Drinking Water Hygiene & Legionella',
    ar: 'نظافة مياه الشرب والبكتيريا الفيلقية',
  },
  teaser: {
    de: 'Sauberes Trinkwasser am Einspeisepunkt nützt wenig, wenn veraltete Rohrsysteme kontaminiert sind. Erfahren Sie, wie K Aqua PPR Kunststoffrohre durch extrem glatte Innenwände Legionellenwachstum und Biofilme effektiv verhindern.',
    en: 'Clean drinking water at the entry point is of little use if outdated pipe systems are contaminated. Discover how K Aqua PPR plastic pipes effectively prevent legionella growth and biofilms thanks to their extremely smooth inner walls.',
    ar: 'المياه النظيفة عند نقطة الدخول لا فائدة منها إذا كانت أنظمة الأنابيب القديمة ملوثة. اكتشف كيف تمنع أنابيب K Aqua PPR البلاستيكية بشكل فعال نمو البكتيريا الفيلقية والأغشية الحيوية بفضل جدرانها الداخلية شديدة النعومة.',
  },
  excerpt: {
    de: 'Sauberes Trinkwasser am Einspeisepunkt nützt wenig, wenn veraltete Rohrsysteme kontaminiert sind. Erfahren Sie, wie K Aqua PPR Kunststoffrohre durch extrem glatte Innenwände Legionellenwachstum und Biofilme effektiv verhindern.',
    en: 'Clean drinking water at the entry point is of little use if outdated pipe systems are contaminated. Discover how K Aqua PPR plastic pipes effectively prevent legionella growth and biofilms thanks to their extremely smooth inner walls.',
    ar: 'المياه النظيفة عند نقطة الدخول لا فائدة منها إذا كانت أنظمة الأنابيب القديمة ملوثة. اكتشف كيف تمنع أنابيب K Aqua PPR البلاستيكية بشكل فعال نمو البكتيريا الفيلقية والأغشية الحيوية بفضل جدرانها الداخلية شديدة النعومة.',
  },
  tags: ['Trinkwasserhygiene', 'Legionellenprävention', 'PPR Rohre', 'Gebäudetechnik', 'Biofilm', 'DVGW'],
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
              <Eyebrow text="Die unsichtbare Gefahr im Leitungsnetz" className="mb-6 text-primary" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Trinkwasser ist unser mit Abstand wertvollstes Lebensmittel. Die Wasserwerke liefern es in nahezu perfekter Qualität bis an die Grundstücksgrenze. Doch was passiert auf den letzten Metern innerhalb des Gebäudes? Veraltete, korrodierte Leitungssysteme verwandeln sich oftmals in unbemerkt tickende Zeitbomben für die Gesundheit. Der Einsatz von modernem Polypropylen (PPR) ist der entscheidende Schlüssel, um Bakterienkolonien wie Legionella pneumophila und Biofilmbildung im Rohrsystem effektiv und dauerhaft zu verhindern.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Biofilm Problem - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Das Biotop im alten Metallrohr" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Wie gefährlicher Biofilm in Rohrleitungen entsteht
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
              Nach VDI 6023 und DVGW W 551 führen mikrostrukturelle Unebenheiten und Stagnation zur rasanten Vermehrung von Pathogenen im Trinkwassersystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die raue Oberfläche metallischer Rohre</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rostendes Eisen und oxidierendes Kupfer bilden über die Jahre eine extrem zerklüftete Oberfläche im Inneren des Rohres. In diesen mikroskopischen Tälern und Schluchten verfängt sich Kalk. Diese porösen Kalkinkrustationen sind die absolut perfekte Brutstätte für Mikroorganismen. Sie krallen sich regelrecht in der rauen Oberfläche fest und entziehen sich so dem normalen Wasserfluss und Spülvorgängen.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Gefährliche Stagnation &amp; Bruttemperaturen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sobald Wasser in schlecht isolierten Leitungen steht, nimmt das Kaltwasser unweigerlich die Raumtemperatur an. Bei Temperaturen zwischen 25 °C und 50 °C vermehren sich Legionellen geradezu explosionsartig. Sie nisten sich tief im Biofilm ein und werden beim nächsten Öffnen des Wasserhahns oder der Dusche unbemerkt als feines, lungengängiges Aerosol eingeatmet.
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
              Warum PPR Rohrsysteme die perfekte Lösung für Trinkwasserhygiene sind
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Absolute Oberflächenglätte (k ≤ 0,007 mm)",
              description: "Mit einer hydraulischen Rauheit von lediglich 0,007 mm ist das Innere eines K Aqua PPR Rohres glatter als gewöhnliches Fensterglas. Kalk und Schmutz finden absolut keine Möglichkeit zur Anhaftung. Wo sich kein Kalk anlagern kann, entsteht auch kein schützender Biofilm für gefährliche Legionellen und Bakterien.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "100% Korrosionsfreiheit für die Ewigkeit",
              description: "Kunststoff reagiert chemisch überhaupt nicht mit Wasser. Es entsteht absolut kein Rost oder Lochfraß, der das Trinkwasser verfärben oder als Nährboden dienen könnte. Selbst hochgradig gechlortes Wasser oder desinfizierende Chemikalienspülungen lassen den Werkstoff PPR über Jahrzehnte hinweg völlig unbeeindruckt.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Herausragende thermische Isolierung & Belastbarkeit",
              description: "Polypropylen weist eine sehr geringe Wärmeleitfähigkeit auf. Kaltwasserleitungen erwärmen sich im Versorgungsschacht deutlich langsamer, Warmwasser kühlt auf dem Weg zur Zapfstelle kaum aus. Zudem überstehen K Aqua PPR Rohre regelmäßige thermische Desinfektionen bei über 70 °C mühelos.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Mikroskopischer Vergleich: Metallrohr vs K Aqua PPR Rohr Innenfläche" />
        </Reveal>
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0,007", u: "mm", l: "Rauheit der Innenwand – verhindert BiofilmAnhaftung" },
              { n: "100", u: "%", l: "Lebensmittelecht, UBAKTWBWGL zertifiziert und geschmacksneutral" },
              { n: "0", u: "", l: "Haftgrund für Bakterien & Korrosion" },
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
              Kompromisslose Legionellenprävention in sensiblen Gebäuden
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Ein Ausbruch der Legionärskrankheit bedeutet für Betreiber ein massives haftungsrechtliches und gesundheitliches Risiko. Hier bietet unser K Aqua PPR Rohrsystem die maximale Sicherheit.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Kliniken und Krankenhäuser"
              description="Immungeschwächte Patienten sind durch kontaminiertes Trinkwasser akut lebensgefährlich bedroht. Die glatten Innenwände unserer PPR Rohre sind hier ein essenzieller Baustein der medizinischen Krankenhaushygiene."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Hotellerie und Gewerbeobjekte"
              description="Saisonale Belegung bedeutet oft längere Stagnationszeiten in Zimmersträngen. Die thermische Trägheit von PPR schützt Kaltwasserleitungen effektiv vor kritischer Erwärmung."
              header={<div className="w-full h-48 bg-accent/10 rounded-t-2xl flex items-center justify-center border-b border-accent/20"><MapPin className="w-24 h-24 text-accent opacity-40" /></div>}
              icon={<MapPin className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Öffentliche Einrichtungen & Sportstätten"
              description="In Schulen oder Großsporthallen steht das Wasser über Ferienzeiten oft wochenlang still. K Aqua PPR stellt sicher, dass sich auch bei erneuter Inbetriebnahme keine Rostpartikel oder Keimherde ablösen."
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
              Investition in reine Gesundheit &amp; Normkonformität
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die Wahl des richtigen Rohrleitungssystems ist weit mehr als eine technische Detailfrage für den Installateur. Es ist eine fundamentale Entscheidung für den dauerhaften Gesundheitsschutz aller Gebäudeinsassen. K Aqua bietet Planern, Fachhandwerkern und Bauherren die Gewissheit, Trinkwasserhygiene und Legionellenprävention kompromisslos, dauerhaft und normgerecht nach DIN 1988 und VDI 6023 zu lösen.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
