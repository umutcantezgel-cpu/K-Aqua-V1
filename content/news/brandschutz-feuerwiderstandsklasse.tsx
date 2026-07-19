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
  date: 'Sicherheit',
  tag: 'Brandschutz',
  title: 'Brandschutz und Feuerwiderstandsklasse B1',
  teaser: 'Warum K Aqua in kritischen Infrastrukturen den toxikologischen Standard setzt. Kein brennendes Abtropfen, keine Halogenentwicklung, keine Brandgefahr bei der Installation.',
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
            <h1 className="text-5xl lg:text-7xl font-black font-heading tracking-tight text-foreground leading-[1.1] mb-8">
              Sicherheit, wenn die Temperatur steigt.
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl text-balance">
              Brandschutz in der TGA beschränkt sich nicht auf das Löschen. Er beginnt bei der Prävention und der Wahl der richtigen Materialien. Während bestimmte Kunststoffe im Brandfall toxische Gase absondern und das Feuer durch brennendes Abtropfen in tiefere Stockwerke tragen, setzt K Aqua PPR den absoluten Sicherheitsstandard Schwer entflammbar, raucharm und zu 100% halogenfrei.
            </p>
          </Reveal>
        </Stagger>
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
