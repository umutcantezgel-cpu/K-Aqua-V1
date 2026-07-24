import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Moon, Shield, Layers, Droplet, Globe, Thermometer } from '@/components/ui/icon';

export const schallschutzAkustik: NewsPost = {
  slug: 'schallschutz-akustik-ppr-rohre-hotel-krankenhaus',
  date: 'Komfort',
  tag: 'Akustik',
  title: {
    de: 'Schallschutz Akustik',
    en: 'Sound Insulation & Acoustics',
    ar: 'العزل الصوتي والصوتيات'
  },
  teaser: {
    de: 'Fließgeräusche und Druckschläge stören die Raumakustik. Erfahren Sie, wie K Aqua PPR Rohrsysteme durch hervorragende Schalldämpfung für Ruhe in Hotels, Krankenhäusern und Wohnbauten sorgen.',
    en: 'Flow noise and pressure shocks disrupt room acoustics. Discover how K Aqua PPR pipe systems ensure tranquility in hotels, hospitals, and residential buildings through outstanding sound absorption.',
    ar: 'تؤدي ضوضاء التدفق والصدمات الناتجة عن الضغط إلى الإخلال بالصوتيات في الغرفة. اكتشف كيف تضمن أنظمة أنابيب PPR من K Aqua الهدوء في الفنادق والمستشفيات والمباني السكنية من خلال الامتصاص الممتاز للصوت.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Moon className="w-64 h-64 text-indigo-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die Architektur der Stille" className="mb-6 text-indigo-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                In Premiumimmobilien, Luxushotels und Krankenhäusern ist ungestörte Ruhe kein Luxus, sondern eine absolute Grundanforderung. Wenn mitten in der Nacht das Wasser in der Nachbarwohnung rauscht oder die Leitung beim Aufheizen metallisch knackt, ist die akustische Integrität des Gebäudes zerstört. Polypropylen (K Aqua PPR Rohrsysteme) besitzt einzigartige schallabsorbierende Eigenschaften, die den Lärmpegel der Hausinstallation auf ein kaum noch wahrnehmbares Minimum reduzieren.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Deep Technical Prose Area */}
      <section>
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
            <h2>Akustik im Rohrleitungsbau: Die Stille der Kunststoffe vs. den Lärm der Metalle</h2>
            <p>
              Wer jemals in einem hellhörigen Gebäude gelebt hat, weiß, wie zerstörerisch Installationsgeräusche für die Wohnqualität sein können. Das laute Rauschen beim Füllen der Badewanne über einem, das harte Schlagen der Leitung, wenn der Nachbar den Einhebelmischer schließt, oder das unheimliche Knacken der Heizungsrohre im Winter. In der modernen Architektur, wo offene Grundrisse und Trockenbauwände dominieren, ist der Schallschutz von Rohrleitungssystemen (gemäß DIN 4109 oder VDI 4100) zu einer der kritischsten Disziplinen der TGA-Planung avanciert. K Aqua PP-R (Polypropylen Random-Copolymer) Rohrsysteme sind nicht einfach nur Wasserrohre – sie sind physikalische Schalldämpfer.
            </p>
            
            <h3>Die zwei Feinde der Ruhe: Strömungsgeräusche und Druckschläge</h3>
            <p>
              In einem Wasserversorgungsnetz entstehen hauptsächlich zwei Arten von Lärm. Die erste Kategorie sind Fließ- oder Strömungsgeräusche. Sie entstehen durch Kavitation oder Verwirbelungen, wenn das Wasser unter hohem Druck durch Ventile, Querschnittsverengungen oder raue Rohrbögen gepresst wird.
            </p>
            <p>
              Metallrohre wie Kupfer oder Edelstahl haben relativ dünne Wände, sind extrem starr und besitzen eine hohe Dichte. Sie wirken physikalisch wie ein perfekter Resonanzkörper (ähnlich einer Stimmgabel). Die Strömungsenergie wird im Metall sofort in Körperschall umgewandelt, breitet sich rasend schnell über das Rohrnetz aus und wird über die Befestigungsschellen an die Wände (Luftschall) übertragen.
            </p>
            <p>
              PP-R verhält sich völlig anders. K Aqua Rohre besitzen eine wesentlich höhere Wandstärke (z.B. SDR 6) und vor allem eine einzigartige, molekulare Elastizität. Die dicke Kunststoffschicht absorbiert die kinetische Energie des Schalls, noch bevor sie aus dem Rohr austreten kann. Die Energie wird im Material durch Mikrodämpfung absorbiert. Zudem sorgt die extrem glatte Innenfläche der K Aqua Fittings dafür, dass das Wasser laminar (wirbelfrei) fließt – Lärm entsteht so erst gar nicht.
            </p>

            <h3>Das Phänomen des Wasserschlags (Water Hammer)</h3>
            <p>
              Die zweite massive Lärmquelle ist der Druckstoß, auch Wasserschlag genannt. Wenn eine Waschmaschine, ein Geschirrspüler oder ein Nutzer einen modernen Einhebelmischer ruckartig schließt, prallt die strömende Wassersäule aprupt gegen das geschlossene Ventil. Die kinetische Energie des Wassers entlädt sich in einer massiven Schockwelle, die durch das Rohr zurückrast.
            </p>
            <p>
              Bei starren Kupferrohren erzeugt diese Schockwelle einen ohrenbetäubenden Knall, der oft das gesamte Gebäude erzittern lässt. Langfristig können diese harten Druckschläge die Lötverbindungen zerstören. PP-R Rohre hingegen dämpfen diese hydraulische Schockwelle sofort ab. Das leicht elastische Material weitet sich für den Bruchteil einer Sekunde mikroskopisch aus, absorbiert die Schockwelle wie ein Airbag und baut den Spitzendruck geräuschlos ab.
            </p>

            <h3>Knacken durch thermische Längenausdehnung</h3>
            <p>
              Ein oft übersehenes Problem in Warmwasser- und Heizungsnetzen ist die thermische Längenausdehnung. Wenn heißes Wasser durch ein kaltes Rohr strömt, dehnt sich das Material aus. Bei Metallrohren geschieht dies oft ruckartig (Stick-Slip-Effekt). Das Rohr rutscht ruckartig ein paar Millimeter in der Rohrschelle weiter, was das typische, laute "Knacken" in den Wänden verursacht.
            </p>
            <p>
              K Aqua PP-R Systeme dehnen sich zwar thermisch ebenfalls aus, jedoch geschieht dies absolut geräuschlos, da das gleitfähige Kunststoffmaterial in Verbindung mit entsprechenden Gleitschellen keine harten Reibungsgeräusche erzeugt. In den kritischen Steigsträngen reduzieren K Aqua Faserverbundrohre (PP-RCT) zudem die Längenausdehnung um 75 %, was das Problem bereits an der Wurzel packt.
            </p>

            <h3>Häufig gestellte Fragen (FAQ) zur Rohr-Akustik</h3>
            <h4>Erfüllt PP-R die Anforderungen an den erhöhten Schallschutz?</h4>
            <p>
              Ja. In Verbindung mit fachgerecht installierten, schallentkoppelten Rohrschellen (mit Gummieinlage) unterschreiten K Aqua Systeme die strengen Vorgaben der DIN 4109 (Schallschutz im Hochbau) sowie die erhöhten Anforderungen der VDI 4100 (Schallschutzstufe III) oft mühelos.
            </p>
            <h4>Warum sind Abflussrohre oft so viel lauter als Druckrohre?</h4>
            <p>
              In Abflussrohren (Fallrohren) fällt Wasser mit Luft vermischt in die Tiefe und prallt an Abzweigen hart gegen die Rohrwand. In Druckrohren (Trinkwasser) fließt das Wasser komplett gefüllt. Dennoch überträgt ein Druckrohr aus Metall Körperschall wesentlich besser als ein schalldämmendes Kunststoffabflussrohr. Deshalb ist die Wahl von K Aqua PP-R für das Drucknetz der entscheidende Schritt zur Gesamtruhe im Bad.
            </p>
            <h4>Reicht es nicht, Metallrohre einfach in Dämmung einzupacken?</h4>
            <p>
              Rohrisolierung (meist zur Wärmedämmung) hilft zwar marginal, reduziert aber den Körperschall im starren Metall kaum. Die Übertragung geschieht hauptsächlich über die Kontaktpunkte der Befestigungsschellen an die Wand. PP-R löst das Problem materialimmanent, anstatt es nur zu umhüllen.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Resonance vs Absorption - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Die physikalische Gegenüberstellung" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Resonanzkörper vs Absorber
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Thermometer className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Lärmquelle Metall</h3>
              <p className="text-muted-foreground leading-relaxed">
                Metallrohre sind hervorragende Schallleiter. Jeder Wasserschlag beim Schließen eines Ventils und jedes Strömungsgeräusch wird ungedämpft durch das gesamte Leitungsnetz transportiert. Zudem dehnt sich Metall bei Hitze ruckartig aus, was in den Befestigungsschellen zu hörbarem Knacken und Reibungsgeräuschen führt. Die Wand wird zum Verstärker.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-indigo-500/20 bg-indigo-500/5">
              <Shield className="w-12 h-12 text-indigo-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die molekulare Dämpfung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Polypropylen verfügt über eine enorme molekulare Elastizität und eine hohe Materialdichte. Anstatt Vibrationen weiterzuleiten, absorbiert der Kunststoffschichtenaufbau die Schwingungen direkt an der Quelle. Druckschläge werden abgefedert, und Fließgeräusche dringen gar nicht erst durch die dicke Rohrwand nach außen.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Physics of sound absorption - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Die Mechanik der Ruhe" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Wie PPR den Schall schluckt
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Materialdichte",
              description: "Die spezifische Wandstärke unserer K Aqua Rohre bildet eine massive physikalische Barriere. Umso dicker und dichter die Kunststoffschicht, desto mehr kinetische Energie des Schalls wird in harmlose Mikrowärme umgewandelt, bevor sie die Raumluft erreicht.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-indigo-500 opacity-20" /></div>
            },
            {
              title: "Vibrationselastizität",
              description: "Wenn ein Einhebelmischer ruckartig geschlossen wird, entsteht ein massiver Druckschlag im System. Metalle geben diesen Schlag ungefiltert als lauten Knall weiter. Die leicht flexible Molekularstruktur von PPR dämpft diesen Impuls sanft ab, wie ein Stoßdämpfer beim Auto.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Laminare Strömung",
              description: "Die glatte Oberfläche von PPR verhindert, dass sich laute Wasserwirbel bilden. Wenn das Wasser gleichmäßig und widerstandsfrei fließt, entsteht von vornherein wesentlich weniger Geräuschentwicklung im Rohrinneren.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Premium applications - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Sensible Einsatzorte" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Wo absolute Ruhe gefordert ist
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Luxushotellerie"
              description="Die Schlafqualität der Gäste ist das wichtigste Qualitätsmerkmal eines Fünf Sterne Hotels. Akustische Entkopplung durch PPR garantiert ungestörte Erholung, auch wenn das Nachbarzimmer duscht."
              header={<div className="w-full h-48 bg-indigo-500/10 rounded-t-2xl flex items-center justify-center border-b border-indigo-500/20"><Moon className="w-24 h-24 text-indigo-500 opacity-40" /></div>}
              icon={<Moon className="h-6 w-6 text-indigo-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Krankenhäuser"
              description="Für die Genesung von Patienten ist eine stressfreie und extrem ruhige Umgebung essenziell. K Aqua Systeme erfüllen die strengsten akustischen Normen für Gesundheitsbauten."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Gehobener Wohnungsbau"
              description="In dichten Wohnkomplexen sind Installationsgeräusche der häufigste Grund für Nachbarschaftsstreitigkeiten und Mietminderungen. Exzellenter Schallschutz steigert den Wert der Immobilie nachhaltig."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Globe className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Globe className="h-6 w-6 text-foreground" />}
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
              { n: "100", u: "%", l: "Erfüllung modernster Schallschutznormen" },
              { n: "0", u: "", l: "Hörbares Knacken durch Temperaturausdehnung" },
              { n: "1", u: "", l: "System für komplette akustische Isolation" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Schallwellen Visualisierung: Die Dämpfung von Strömungsgeräuschen durch die PPR Rohrwand" image="/images/new-k-aqua/pipes-profil.png" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
              <Moon className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Investition in den akustischen Komfort
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nachträglicher Schallschutz ist bei verbauten Rohrleitungen nahezu unmöglich. Die Entscheidung für das richtige Material muss in der Planungsphase getroffen werden. Mit den hochgradig schallabsorbierenden Eigenschaften von Polypropylen setzen Bauherren auf ein unsichtbares, aber täglich spürbares Qualitätsmerkmal für höchste Lebensqualität.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
