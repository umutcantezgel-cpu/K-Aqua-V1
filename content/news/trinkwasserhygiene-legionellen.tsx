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
    de: 'Trinkwasserhygiene & Legionellenprävention',
    en: 'Drinking Water Hygiene & Legionella',
    ar: 'نظافة مياه الشرب والبكتيريا الفيلقية',
  },
  teaser: {
    de: 'Sauberes Trinkwasser am Einspeisepunkt nützt absolut wenig, wenn veraltete Rohrsysteme im Gebäude kontaminiert sind. Erfahren Sie, wie K-Aqua PP-R Rohre durch extrem glatte Innenwände Legionellenwachstum und gefährliche Biofilme effektiv und dauerhaft verhindern.',
    en: 'Clean drinking water at the entry point is of little use if outdated pipe systems are contaminated. Discover how K Aqua PPR plastic pipes effectively prevent legionella growth and biofilms thanks to their extremely smooth inner walls.',
    ar: 'المياه النظيفة عند نقطة الدخول لا فائدة منها إذا كانت أنظمة الأنابيب القديمة ملوثة. اكتشف كيف تمنع أنابيب K Aqua PPR البلاستيكية بشكل فعال نمو البكتيريا الفيلقية والأغشية الحيوية بفضل جدرانها الداخلية شديدة النعومة.',
  },
  excerpt: {
    de: 'Sauberes Trinkwasser am Einspeisepunkt nützt absolut wenig, wenn veraltete Rohrsysteme im Gebäude kontaminiert sind. Erfahren Sie, wie K-Aqua PP-R Rohre durch extrem glatte Innenwände Legionellenwachstum und gefährliche Biofilme effektiv und dauerhaft verhindern.',
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
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance mb-6">
                Trinkwasser ist unser mit Abstand wertvollstes Lebensmittel. Die Wasserwerke liefern es in Deutschland und den meisten Teilen Europas in nahezu perfekter, keimfreier Qualität bis exakt an die Grundstücksgrenze (Wasserzähler). 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                Doch was passiert auf den entscheidenden letzten Metern innerhalb der Gebäudeinstallation? Veraltete, korrodierte Leitungssysteme aus unedlen Metallen verwandeln sich oftmals in unbemerkt tickende Zeitbomben für die Gesundheit der Bewohner. Der Einsatz von modernem, hochreinem Polypropylen (PP-R) ist der technologisch entscheidende Schlüssel, um Bakterienkolonien wie Legionella pneumophila und systematische Biofilmbildung im Rohrsystem effektiv, nachhaltig und dauerhaft zu verhindern.
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
              Nach den strengen Vorgaben der VDI 6023 und DVGW W 551 führen mikrostrukturelle Unebenheiten, Stagnation und falsche Temperaturen zur rasanten Vermehrung von Pathogenen im Trinkwassersystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die raue Oberfläche metallischer Rohre</h3>
              <p className="text-muted-foreground leading-relaxed">
                Rostendes Eisen, verzinkter Stahl und oxidierendes Kupfer bilden über die Jahre der Nutzung eine extrem zerklüftete Oberfläche im Inneren des Rohres. In diesen mikroskopischen Tälern und Schluchten verfängt sich unvermeidbar Kalk. Diese porösen, unebenen Kalkinkrustationen sind die absolut perfekte Brutstätte für Mikroorganismen. Die Bakterien sondern eine schleimige Matrix (EPS - extrazelluläre polymere Substanzen) ab, um sich vor dem Wasserstrom zu schützen. Sie krallen sich regelrecht in der rauen Oberfläche fest und entziehen sich so dem normalen Wasserfluss, thermischen Spülvorgängen und selbst aggressiven chemischen Desinfektionen.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Gefährliche Stagnation & Bruttemperaturen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sobald Wasser in schlecht isolierten oder überdimensionierten Leitungen steht (Stagnation), verschärft sich das Problem dramatisch. Kaltwasser nimmt unweigerlich die warme Raumtemperatur an, Warmwasser kühlt in den Leitungswegen gefährlich ab. Genau im kritischen Temperaturfenster zwischen 25 °C und 50 °C vermehren sich Legionellen geradezu explosionsartig. Sie nisten sich tief im schützenden Biofilm ein, vermehren sich in Amöben und werden beim nächsten Öffnen des Wasserhahns oder der Dusche unbemerkt als feines, lungengängiges Aerosol eingeatmet.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Deep Technical Analysis */}
      <section className="mt-12">
        <Reveal>
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground mb-4">Warum K-Aqua PP-R den Biofilm aushungert</h2>
            <p>
              Kunststoffe wie Polypropylen Random Copolymer (PP-R) haben gegenüber Metallen den entscheidenden physikalischen Vorteil der fehlenden elektrochemischen Reaktivität. PP-R korrodiert nicht. Es gibt keine Oxidation, es entsteht kein Eisenoxid (Rost), das vielen Mikroorganismen als willkommene Nährstoffquelle dient. Der Kunststoff ist inert und entzieht den Keimen schlichtweg die Lebensgrundlage.
            </p>
            <p>
              Zudem ist die Oberflächenbeschaffenheit von entscheidender Bedeutung. K-Aqua Rohre weisen aufgrund des hochwertigen Extrusionsverfahrens eine absolute Oberflächenrauheit (k-Wert) von lediglich 0,007 mm auf. Das ist glatter als gewöhnliches Fensterglas. Ohne die mikroskopischen "Täler", die man bei Metallrohren findet, fehlt dem Kalk der Haftgrund. Wo kein Kalk anhaftet, finden auch Biofilme keinen Halt. Etwaige vereinzelte Bakterien, die in das Netz gelangen, können keine stabilen Kolonien aufbauen und werden beim normalen Zapfvorgang durch die hohen Scherkräfte des fließenden Wassers sofort und vollständig ausgespült.
            </p>
            <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Thermische Beherrschbarkeit</h3>
            <p>
              Die VDI 6023 fordert ganz klar: Kaltwasser muss kalt bleiben (unter 25°C, besser unter 20°C) und Warmwasser muss heiß bleiben (über 55°C). Metallrohre leiten Wärme extrem schnell. PP-R hingegen ist ein hervorragender thermischer Isolator (Wärmeleitfähigkeit λ = 0,24 W/mK). Ein K-Aqua Rohr schützt das darin stehende Kaltwasser deutlich länger vor der Erwärmung durch den umgebenden Installationsschacht als ein ungedämmtes Kupferrohr. Kommt es doch zu einem Legionellenbefall im Netz (z.B. durch lange Nichtnutzung von Zimmern in Hotels), hält das K-Aqua System thermischen Desinfektionen (Spülung mit 70°C heißem Wasser für mindestens 3 Minuten an jeder Zapfstelle) problemlos stand.
            </p>
          </div>
        </Reveal>
      </section>

      {/* The PPR Solution - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Die technologische Antwort" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Die drei Säulen der PP-R Hygiene
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Absolute Oberflächenglätte (k ≤ 0,007 mm)",
              description: "Mit einer hydraulischen Rauheit von lediglich 0,007 mm ist das Innere eines K-Aqua PP-R Rohres glatter als Glas. Kalk und Schmutz finden absolut keine Möglichkeit zur mechanischen Anhaftung. Wo sich kein Kalk anlagern kann, entsteht auch kein schützender Biofilm für gefährliche Legionellen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "100% Korrosionsfreiheit",
              description: "PP-R reagiert chemisch überhaupt nicht mit Wasser. Es entsteht absolut kein Rost oder Lochfraß, der das Trinkwasser rötlich verfärben oder als Nährboden dienen könnte. Auch aggressives Wasser mit niedrigem pH-Wert oder hohem Chloridgehalt hinterlässt keine Schäden.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Herausragende thermische Eigenschaften",
              description: "Polypropylen weist eine sehr geringe Wärmeleitfähigkeit auf. Kaltwasserleitungen erwärmen sich im engen Versorgungsschacht deutlich langsamer. Zudem überstehen K-Aqua PP-R Rohre thermische Desinfektionsläufe bei über 70 °C völlig mühelos und ohne strukturellen Schaden zu nehmen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Use Cases - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Kritische Infrastrukturen schützen" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Kompromisslose Hygiene in sensiblen Gebäuden
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Ein Ausbruch der Legionärskrankheit bedeutet für Betreiber ein massives haftungsrechtliches und strafrechtliches Risiko. K-Aqua bietet hier maximale Sicherheit.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Kliniken und Krankenhäuser"
              description="Immungeschwächte Patienten (Immunsupprimierte) sind durch kontaminiertes Trinkwasser akut lebensgefährlich bedroht. Die glatten Innenwände unserer PP-R Rohre sind hier ein unverzichtbarer, grundlegender Baustein der modernen Krankenhaushygiene."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Hotellerie und Gewerbeobjekte"
              description="Saisonale Belegung bedeutet oft längere, unvorhergesehene Stagnationszeiten in einzelnen Zimmersträngen. Die thermische Trägheit von PP-R schützt diese Leitungen effektiv vor kritischer Erwärmung."
              header={<div className="w-full h-48 bg-accent/10 rounded-t-2xl flex items-center justify-center border-b border-accent/20"><MapPin className="w-24 h-24 text-accent opacity-40" /></div>}
              icon={<MapPin className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Öffentliche Einrichtungen & Sportstätten"
              description="In Schulen, Turnhallen oder Großsporthallen steht das Wasser über die Schulferien hinweg oft wochenlang völlig still. K-Aqua PP-R stellt sicher, dass sich auch bei erneuter Inbetriebnahme nach sechs Wochen keine gefährlichen Rostpartikel oder Keimherde ablösen."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Users className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Users className="h-6 w-6 text-foreground" />}
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
              FAQ: Hygiene, Legionellen und DVGW
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Hält K-Aqua PP-R chemischen Desinfektionen stand?</h4>
                <p className="text-muted-foreground">
                  Sollte eine Anlage extrem kontaminiert sein, fordert das Gesundheitsamt oft eine Stoßdesinfektion (z. B. mit Chlorbleichlauge oder Wasserstoffperoxid). PP-R Systeme halten diesen temporären, hochkonzentrierten chemischen Belastungen gemäß DVGW-Richtlinien (bei Einhaltung der maximalen Dosierungen und Einwirkzeiten) hervorragend stand, ohne im Gegensatz zu Kupferrohren Lochfraß zu erleiden.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Sind die Kunststoffrohre trinkwasserzertifiziert?</h4>
                <p className="text-muted-foreground">
                  Absolut. Die K-Aqua PP-R Systeme unterliegen den strengsten KTW-BWGL (Bewertungsgrundlage für Kunststoffe im Kontakt mit Trinkwasser) des Umweltbundesamtes (UBA). Sie geben keinerlei Weichmacher, Schwermetalle oder Mikroplastik an das Wasser ab und verändern weder Geschmack noch Geruch (sensorisch absolut neutral).
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Wie verhindere ich Totleitungen bei der Montage?</h4>
                <p className="text-muted-foreground">
                  Hygiene beginnt bei der Planung. Sogenannte "Totstrecken" (ungenutzte Leitungsabschnitte) müssen strikt vermieden oder unmittelbar abgetrennt werden. Durch die enorme Flexibilität von PP-R bei der Vorfertigung lassen sich Ring- und Reihenleitungssysteme sehr einfach installieren. Diese zwingen das Wasser bei jeder Betätigung einer Armatur zum Fließen, wodurch Stagnation im gesamten Strangsystem effektiv verhindert wird.
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
              { n: "0,007", u: "mm", l: "Rauheit der Innenwand verhindert jede Biofilm-Anhaftung" },
              { n: "100", u: "%", l: "Lebensmittelecht, UBA-KTW-BWGL zertifiziert" },
              { n: "0", u: "", l: "Haftgrund für Bakterien & Korrosion vorhanden" },
            ]} 
            cols={250}
          />
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
              Investition in reine Gesundheit & Normkonformität
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die Wahl des richtigen Rohrleitungssystems ist weit mehr als eine technische Detailfrage für den ausführenden Installateur. Es ist eine fundamentale, weitreichende Entscheidung für den dauerhaften Gesundheitsschutz aller Gebäudeinsassen. K-Aqua bietet Planern, Fachhandwerkern und Bauherren die beruhigende Gewissheit, Trinkwasserhygiene und Legionellenprävention kompromisslos, dauerhaft und normgerecht nach DIN 1988 und VDI 6023 zu lösen.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
