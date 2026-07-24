import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DeepMatrix } from '@/components/ui/DeepMatrix';
import { StepFlow } from '@/components/ui/StepFlow';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Stagger } from '@/components/ui/Stagger';
import { Flame, ShieldAlert, Activity } from '@/components/ui/icon';

export const brandschutzFeuerwiderstandsklasse: NewsPost = {
  slug: 'brandschutz-feuerwiderstandsklasse-b1-ppr-rohre',
  date: '2025-01-14',
  tag: 'Brandschutz',
  category: 'Brandschutz & Sicherheit',
  title: {
    de: 'Brandschutz & Feuerwiderstandsklasse B1',
    en: 'Fire Protection & Fire Resistance Class B1',
    ar: 'الحماية من الحرائق وفئة مقاومة الحريق B1'
  },
  teaser: {
    de: 'Warum K Aqua PPR Rohrsysteme in kritischen Infrastrukturen den toxikologischen Standard setzen: Schwer entflammbar (B1), kein brennendes Abtropfen, halogenfrei und ohne Brandgefahr bei der Installation.',
    en: 'Why K Aqua PPR pipe systems set the toxicological standard in critical infrastructure: Flame-retardant (B1), no flaming droplets, halogen-free, and no fire hazard during installation.',
    ar: 'لماذا تضع أنظمة أنابيب K Aqua PPR المعيار السمي في البنى التحتية الحيوية: مقاومة للاشتعال (B1)، لا توجد قطرات مشتعلة، خالية من الهالوجين، ولا يوجد خطر حريق أثناء التركيب.'
  },
  excerpt: {
    de: 'Warum K Aqua PPR Rohrsysteme in kritischen Infrastrukturen den toxikologischen Standard setzen: Schwer entflammbar (B1), kein brennendes Abtropfen, halogenfrei und ohne Brandgefahr bei der Installation.',
    en: 'Why K Aqua PPR pipe systems set the toxicological standard in critical infrastructure: Flame-retardant (B1), no flaming droplets, halogen-free, and no fire hazard during installation.',
    ar: 'لماذا تضع أنظمة أنابيب K Aqua PPR المعيار السمي في البنى التحتية الحيوية: مقاومة للاشتعال (B1)، لا توجد قطرات مشتعلة، خالية من الهالوجين، ولا يوجد خطر حريق أثناء التركيب.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full overflow-hidden">
      
      {/* 1. Asymmetric Stagger Hero (No Glass Card) */}
      <section className="relative pt-12 pb-24">
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-[0.03] pointer-events-none">
          <Flame className="w-[800px] h-[800px] text-destructive" />
        </div>
        
        <Stagger staggerDelay={0.15} className="relative z-10 max-w-5xl">
          <Reveal delay={0}>
            <Eyebrow text="Die B1 Zertifizierung" className="mb-6 text-destructive" />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-5xl lg:text-7xl font-black font-heading tracking-tight text-foreground leading-[1.1] mb-8">
              Sicherheit, wenn die Temperatur steigt.
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl text-balance">
              Brandschutz in der TGA beschränkt sich nicht auf das Löschen. Er beginnt bei der Prävention und der Wahl der richtigen Materialien. Während bestimmte Kunststoffe im Brandfall toxische Gase absondern und das Feuer durch brennendes Abtropfen in tiefere Stockwerke tragen, setzt K Aqua PPR den absoluten Sicherheitsstandard: Schwer entflammbar (Feuerwiderstandsklasse B1 nach DIN 4102-1), raucharm und zu 100% halogenfrei.
            </p>
          </Reveal>
        </Stagger>
      </section>

      {/* Deep Technical Prose Area */}
      <section>
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
            <h2>Die Wissenschaft hinter dem Brandschutz: Feuerwiderstandsklasse B1 und Halogenfreiheit</h2>
            <p>
              In der modernen Gebäudeplanung und der Technischen Gebäudeausrüstung (TGA) spielt der Brandschutz eine absolut kritische Rolle. Besonders in öffentlichen Gebäuden, Krankenhäusern, Hochhäusern und Industrieanlagen werden höchste Anforderungen an die verwendeten Baumaterialien gestellt. Rohrleitungssysteme verlaufen oft über mehrere Stockwerke und durchqueren verschiedene Brandabschnitte. Hier ist die Wahl des richtigen Materials entscheidend, um im Brandfall Menschenleben zu retten und strukturelle Schäden zu minimieren. K Aqua PP-R (Polypropylen Random-Copolymer) Rohrsysteme sind speziell auf diese extremen Sicherheitsanforderungen ausgelegt und erfüllen die strenge Feuerwiderstandsklasse B1 (schwer entflammbar) nach DIN 4102-1.
            </p>
            
            <h3>Warum schwer entflammbar (B1) so wichtig ist</h3>
            <p>
              Ein Brand in einem Gebäude durchläuft verschiedene Phasen, vom Entstehungsbrand über den Vollbrand bis hin zum Abkühlen. Materialien der Klasse B2 (normal entflammbar) oder schlechter können in der Entstehungsphase als Brandbeschleuniger wirken. Sie fangen leicht Feuer, brennen eigenständig weiter und tragen die Flammen durch das gesamte Gebäude. 
            </p>
            <p>
              Die Klassifizierung B1 für K Aqua PP-R Rohre bedeutet hingegen: Das Material ist schwer entflammbar. Es entzündet sich nur bei massiver, direkter Flammeneinwirkung. Noch wichtiger: Sobald die externe Zündquelle entfernt wird, ist das Material selbstverlöschend. Es entzieht dem Feuer quasi die Nahrung. Dadurch wird effektiv verhindert, dass sich ein Brandherd über die Installationsschächte unkontrolliert in andere Stockwerke oder Brandabschnitte ausbreiten kann (Kamineffekt).
            </p>

            <h3>Die Gefahr des brennenden Abtropfens</h3>
            <p>
              Viele konventionelle Kunststoffe weisen im Brandfall eine fatale Eigenschaft auf: Sie schmelzen und tropfen brennend ab. Diese flammenden Tropfen können sekundäre Brände in tiefer liegenden Geschossen auslösen oder Flüchtende schwer verletzen. K Aqua PP-R ist so modifiziert, dass es im Brandfall zwar erweicht und schmilzt, jedoch ausdrücklich <strong>nicht brennend abtropft</strong>. Die molekulare Integrität bleibt so lange wie physikalisch möglich erhalten, und das Material verkohlt, anstatt flüssiges Feuer zu regnen.
            </p>

            <h3>Halogenfreiheit: Die unsichtbare, aber tödliche Gefahr</h3>
            <p>
              Statistiken belegen erschreckend deutlich: Bei Gebäudebränden sterben die meisten Menschen nicht durch die Flammen selbst, sondern durch toxische Rauchgase. Kunststoffe wie PVC (Polyvinylchlorid) enthalten Halogene (wie Chlor). Wenn PVC verbrennt, reagiert das Chlor mit dem Wasser in der Luft (oder dem Löschwasser) zu hochgiftigem Chlorwasserstoffgas (Salzsäuregas). Dieses Gas verätzt sofort die Atemwege der Opfer. Darüber hinaus greift die korrosive Salzsäure die Gebäudestruktur, Betonarmierungen und empfindliche elektronische Geräte massiv an, was zu enormen Folgeschäden führt.
            </p>
            <p>
              K Aqua PP-R Rohrsysteme bestehen ausschließlich aus Kohlenstoff und Wasserstoff. Sie sind zu <strong>100 % halogenfrei</strong>. Im Brandfall entstehen bei der Verbrennung von PP-R lediglich Kohlendioxid und Wasserdampf – genau wie bei der Verbrennung von Holz oder Wachs. Es werden keine toxischen Dioxine oder korrosiven Säuregase freigesetzt. Dies bietet den Evakuierenden wertvolle zusätzliche Minuten und schützt die Gesundheit der Rettungskräfte. Zudem wird die Rauchentwicklung auf ein absolutes Minimum reduziert, was die Sicht auf Fluchtwegen drastisch verbessert.
            </p>

            <h3>Sicherheit schon bei der Installation: Keine "Hot Works"</h3>
            <p>
              Ein enormer Prozentsatz von Bauwerkbränden wird paradoxerweise während der Bau- oder Sanierungsphase ausgelöst – durch sogenannte "Hot Works" (Heißarbeiten) wie Löten, Schweißen oder Trennschleifen. Beim Verlöten von Kupferrohren kommen offene Gasflammen mit Temperaturen von über 2000 °C zum Einsatz. Funkenflug kann leicht unsichtbare Schwelbrände in trockenen Zwischendecken, Isolationsmaterialien oder Holzkonstruktionen auslösen.
            </p>
            <p>
              Die Installation von K Aqua PP-R Systemen erfolgt durch elektrische Thermofusion (Muffenschweißung). Das Schweißwerkzeug wird auf exakt 260 °C erwärmt – ganz ohne offene Flamme, ohne Funkenflug und ohne Brandgefahr. Dies macht PP-R zur sichersten Wahl für Sanierungen in Altbauten, historischen Gebäuden oder bei laufendem Betrieb in sensiblen Bereichen wie Krankenhäusern.
            </p>

            <h3>Häufig gestellte Fragen (FAQ) zum Brandschutz</h3>
            <h4>Was bedeutet B1 nach DIN 4102-1 genau?</h4>
            <p>
              B1 steht für "schwer entflammbar". Das Material kann zwar brennen, wenn es einer permanenten starken Zündquelle ausgesetzt ist, es brennt aber nicht von alleine weiter, sobald die Zündquelle entfernt wird. Es trägt nicht zur Brandausbreitung bei.
            </p>
            <h4>Ist PP-R für Fluchtwege zugelassen?</h4>
            <p>
              In Verbindung mit den entsprechenden, zertifizierten Brandschutzmanschetten (Brandschottungen) können PP-R Rohre sicher durch Brandabschnitte und Fluchtwege geführt werden. Die Manschetten schäumen im Brandfall auf und verschließen die Rohröffnung hermetisch gegen Feuer und Rauch.
            </p>
            <h4>Welche Gase entstehen, wenn PP-R doch verbrennt?</h4>
            <p>
              Da PP-R (Polypropylen) ein reiner Kohlenwasserstoff ist, entstehen bei der vollständigen Verbrennung lediglich CO2 (Kohlendioxid) und H2O (Wasserdampf). Es werden keine toxischen Halogene wie bei PVC freigesetzt.
            </p>
          </div>
        </Reveal>
      </section>

      {/* 2. DeepMatrix: Toxicological Comparison */}
      <section>
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Materialverhalten im Brandfall" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der toxikologische Vergleich
            </h2>
          </div>
          <DeepMatrix
            head={["Parameter", "K Aqua (PPR)", "Standard PVC", "Metalle"]}
            heroCol={1}
            rows={[
              [
                "Halogenentwicklung", 
                "0% (Halogenfrei)", 
                "Hoch (Chlorwasserstoff)", 
                "Keine"
              ],
              [
                "Brandverhalten", 
                "Schwer entflammbar (B1)", 
                "Normal entflammbar", 
                "Nicht brennbar"
              ],
              [
                "Abtropfverhalten", 
                "Tropft nicht brennend ab", 
                "Brennendes Abtropfen möglich", 
                "Schmilzt bei Extremhitze"
              ],
              [
                "Toxizität der Gase", 
                "Sehr gering (nur CO2 und H2O)", 
                "Lebensgefährlich (Salzsäuregas)", 
                "Keine"
              ],
              [
                "Selbstverlöschend", 
                "Ja (bei Entfernen der Zündquelle)", 
                "Nein / Bedingt", 
                "Nicht anwendbar"
              ]
            ]}
            note="Die Klassifizierung in B1 (schwer entflammbar) bestätigt, dass das Material den Brandherd nicht eigenständig am Leben erhält."
          />
        </Reveal>
      </section>

      {/* 3. HorizontalTimeline: The Chronology of Heat */}
      <section className="-mx-4 md:-mx-8 lg:-mx-16 my-8">
        <HorizontalTimeline
          title="Chronologie der Hitze"
          description="Wie reagiert das K Aqua Rohrsystem, wenn die Temperaturen den kritischen Bereich überschreiten? Eine Phasenanalyse."
          items={[
            {
              year: "Phase 1: 150°C",
              title: "Strukturelle Integrität",
              text: "Das Material beginnt aufzuweichen, verliert aber nicht schlagartig seine molekulare Verbindung. Es tropft nicht und entzündet sich nicht."
            },
            {
              year: "Phase 2: 300°C",
              title: "Zersetzung ohne Toxine",
              text: "Der Schmelzpunkt wird überschritten. Die Zersetzung beginnt. Da PPR aus reinem Kohlenstoff und Wasserstoff besteht, entstehen hierbei jedoch keine giftigen Dioxine."
            },
            {
              year: "Phase 3: >400°C",
              title: "Die Selbstverlöschung",
              text: "Entfernt man die externe Zündquelle, erlischt das Material von selbst. Es entzieht dem Feuer die Grundlage und verhindert eine Brandausbreitung im Schacht."
            }
          ]}
        />
      </section>

      {/* 4. Animated Counters / Massive Numbers */}
      <section className="py-16">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-y border-card-border py-16">
            <div className="flex flex-col items-start justify-center">
              <span className="text-6xl lg:text-8xl font-black font-mono text-foreground mb-4">
                <AnimatedCounter value={0} formatFn={(v) => `${v}%`} />
              </span>
              <h3 className="text-2xl font-bold font-heading mb-2">Toxische Halogene</h3>
              <p className="text-muted-foreground">
                Bei der Verbrennung von K Aqua PPR entsteht exakt null Prozent Dioxin, Chlor oder Salzsäuregas. Die absolute Sicherheit für Rettungskräfte und Evakuierungswege.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-6xl lg:text-8xl font-black font-mono text-destructive mb-4">
                <AnimatedCounter value={260} formatFn={(v) => `${v}°C`} />
              </span>
              <h3 className="text-2xl font-bold font-heading mb-2">Elektrische Fügetemperatur</h3>
              <p className="text-muted-foreground">
                Im Vergleich zum Löten mit offener Gasflamme (2000 Grad Celsius) wird PPR lediglich auf 260 Grad Celsius elektrisch erhitzt. Keine Brandgefahr auf der Baustelle.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 5. StepFlow: Installation Safety */}
      <section className="pb-12">
        <Reveal>
          <div className="mb-12">
            <Eyebrow text="Prävention beim Bau" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Hot Works eliminieren
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Ein erheblicher Prozentsatz aller Gebäudebrände entsteht bereits während der Bauphase durch sogenannte Hot Works (Schweißen, Trennschleifen, Löten).
            </p>
          </div>
          <div className="max-w-3xl bg-card border border-card-border p-8 lg:p-12 rounded-3xl">
            <StepFlow 
              steps={[
                {
                  t: "Keine offene Flamme",
                  d: "Kupferrohre werden mit einem Acetylenbrenner bei über 2000 Grad Celsius verlötet. Funkenflug und entzündetes Dämmmaterial sind permanente Risiken. K Aqua benötigt kein Feuer."
                },
                {
                  t: "Elektrische Thermofusion",
                  d: "Das Schweißwerkzeug wird kontrolliert elektrisch auf exakt 260 Grad Celsius erwärmt. Der Vorgang ist vollkommen emissionsfrei, rauchfrei und feuersicher."
                },
                {
                  t: "Sicherheit in historischen Gebäuden",
                  d: "Gerade bei der Sanierung von Altbauten mit Holzständerwerk oder trockenen Zwischendecken ist der Verzicht auf offenes Feuer ein massiver Versicherungs- und Sicherheitsvorteil."
                }
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-destructive/10 border border-destructive/20 p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
              <ShieldAlert className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Sicherheit ist kein Zufall
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Die Feuerwiderstandsklasse B1 macht K Aqua nicht unzerstörbar, aber sie garantiert, dass die Wasserinfrastruktur in den entscheidenden Minuten nicht zur tödlichen Falle wird. Keine Brandbeschleunigung. Keine toxischen Gase. Maximale Zeit für Evakuierung.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
