import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Layers, Shield, FileText, Factory, MapPin, Check } from '@/components/ui/icon';

export const rueckverfolgbarkeit: NewsPost = {
  slug: 'fortlaufende-kennzeichnung-rueckverfolgbarkeit',
  date: '2018',
  tag: 'Produktion',
  title: {
    de: 'Rückverfolgbarkeit ab Extruder',
    en: 'Traceability from the Extruder',
    ar: 'إمكانية التتبع بدءاً من آلة البثق'
  },
  teaser: {
    de: 'Erfahren Sie, wie die lückenlose Rückverfolgbarkeit und fortlaufende Inkjet Kennzeichnung von K Aqua PPR Rohrsystemen höchste Qualität, Sicherheit und Transparenz ab dem Extruder gewährleistet.',
    en: 'Discover how the seamless traceability and continuous inkjet marking of K Aqua PPR pipe systems ensure the highest quality, safety, and transparency right from the extruder.',
    ar: 'اكتشف كيف تضمن إمكانية التتبع الشاملة والوسم المستمر بنفث الحبر لأنظمة أنابيب K Aqua PPR أعلى مستويات الجودة والأمان والشفافية بدءاً من آلة البثق.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Glass Card Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die gläserne Produktion" className="mb-6 text-primary" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl">
                Eine absolut lückenlose Rückverfolgbarkeit ist keine Kür, sondern zwingende Pflicht im modernen Rohrleitungsbau. Bauherren, Planer und Zertifizierungsstellen verlassen sich weltweit auf die erstklassige Qualität von K Aqua PPR Rohrsystemen. Um dieses unschätzbare Vertrauen zu rechtfertigen, wird jedes einzelne PPR Rohr direkt im laufenden Extrusionsprozess fortlaufend und dauerhaft gekennzeichnet.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Band */}
      <section className="py-8">
        <StatBand 
          stats={[
            { n: "14.000", u: "m", l: "Tagesproduktion pro Anlage" },
            { n: "100", u: "%", l: "Lückenlose Datenkopplung" },
            { n: "50+", u: "Jahre", l: "Garantierte Lebensdauer" },
          ]} 
          cols={250}
        />
      </section>

      {/* The Danger of Invisible Errors */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-full min-h-[450px]">
              <PremiumAssetPlaceholder label="Industrielle Rohrinstallation Hochbau" image="/images/new-k-aqua/fertigung-pipes.jpg" />
            </div>
            <div>
              <Eyebrow text="Die Lebensversicherung des Gebäudes" />
              <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 mb-6 text-foreground leading-tight">
                Warum Rückverfolgbarkeit absolut überlebenswichtig ist
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Die Installation eines Rohrleitungssystems in einem großen gewerblichen Gebäude oder einem mehrstöckigen Wohnkomplex ist eine Entscheidung für Jahrzehnte. Sobald die Wände verputzt, die Böden gegossen und die Schächte verschlossen sind, gibt es keinen einfachen Weg mehr zurück.
                </p>
                <p>
                  Ein Materialfehler, der erst Jahre nach der Inbetriebnahme auftritt, kann zu katastrophalen Wasserschäden, Betriebsunterbrechungen und astronomischen Sanierungskosten führen. Genau aus diesem Grund muss der Hersteller zu einhundert Prozent garantieren können, unter welchen exakten Bedingungen ein bestimmtes Rohr produziert wurde.
                </p>
                <Card className="p-6 bg-accent/5 border-accent/20 mt-8">
                  <div className="flex gap-4 items-start">
                    <Shield className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <p className="text-foreground font-medium">
                      Die fortlaufende Kennzeichnung ist unsere unbestechliche Versicherung und der untrügliche Beweis, dass streng nach Norm gearbeitet wurde.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Printing Process - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="High Tech im Millisekundentakt" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Continuous Inkjet Technologie
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Die enorme Geschwindigkeit der Extrusionsanlage erfordert Markierungssysteme, die berührungslos und hitzebeständig arbeiten.
            </p>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Berührungsloser Auftrag"
              description="Sogenannte Continuous Inkjet Drucker feuern mikroskopisch kleine Tintentropfen auf das vorbeirasende Rohr, ohne die heiße Oberfläche jemals zu berühren oder zu beschädigen."
              header={<div className="w-full h-40 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Factory className="w-20 h-20 text-muted-foreground/30" /></div>}
              icon={<Factory className="h-6 w-6 text-foreground" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Molekulare Verbindung"
              description="Die extrem hitzebeständige Spezialtinte verbindet sich tief mit der obersten molekularen Schicht des Polypropylens. Der Aufdruck wird dadurch absolut abriebfest."
              header={<div className="w-full h-40 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Layers className="w-20 h-20 text-muted-foreground/30" /></div>}
              icon={<Layers className="h-6 w-6 text-foreground" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Sticky Scroll: What is printed? */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Gebündeltes Wissen auf einem Meter" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der Datensatz auf dem Rohr
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Material und Identität",
              description: "Jeder laufende Meter trägt den exakten Markennamen K Aqua sowie die präzise Werkstoffbezeichnung wie PPR oder PPRCT, um gefährliche Verwechslungen beim Verschweißen auf der Baustelle völlig auszuschließen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><FileText className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "Dimension und Belastung",
              description: "Die genaue Dimension inklusive Außendurchmesser und exakter Wandstärke ist deutlich lesbar. Ebenso die genormte Druckstufe und die zulässige Temperaturbelastbarkeit für den sicheren Anlagenbetrieb.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Produktionsstempel",
              description: "Das Herzstück der Rückverfolgbarkeit: Die eindeutige Chargennummer, das exakte Produktionsdatum auf die Minute genau sowie die Identifikationsnummer der Maschine und des verantwortlichen Schichtleiters.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Check className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Digital Archive & Big Data */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card hover:border-primary/50 transition-colors">
              <FileText className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Das digitale Archiv</h3>
              <p className="text-muted-foreground leading-relaxed">
                In exakt dem Moment, in dem die Uhrzeit auf das Rohr gedruckt wird, speichert unser Leitsystem alle physikalischen Parameter des Extruders in einer gesicherten Datenbank. Schmelzetemperatur, Werkzeugdruck, Abzugsgeschwindigkeit und Wassertemperatur im Kühlbad werden permanent und synchron mit der Chargennummer verknüpft. So sehen wir den vollständigen Herzschlag der Maschine für exakt diesen einen Meter Rohr.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-card-border bg-card hover:border-accent/50 transition-colors">
              <MapPin className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Big Data zur Optimierung</h3>
              <p className="text-muted-foreground leading-relaxed">
                Die gewonnenen Daten dienen als gigantischer Treibstoff für unsere stetige Optimierung. Ingenieure analysieren diese historischen Datenbestände mittels modernster Algorithmen auf winzige Muster. Jeder Rohrmeter liefert uns durch die Verknüpfung von physischem Aufdruck und digitalen Sensordaten das extrem wertvolle Wissen, um die Produktion iterativ immer weiter an die absolute Grenze der physikalischen Perfektion zu treiben.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Conclusion / Trust on site */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-gradient-to-br from-card to-background border border-card-border p-10 lg:p-16 rounded-3xl text-center">
            <Shield className="w-16 h-16 text-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Absolutes Vertrauen auf der Baustelle
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Auf der Baustelle herrschen raue, unbarmherzige Bedingungen. Installateure können sich felsenfest darauf verlassen, dass sie auch nach Wochen der widrigen Lagerung exakt erkennen, welches Rohr sie in der Hand halten. Bei der finalen Bauabnahme protokollieren Bauleiter diese Chargennummern in den Revisionsunterlagen. So entsteht eine lückenlose Dokumentation, die den Wert der Immobilie schützt und wahre deutsche Ingenieurskunst beweist.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
