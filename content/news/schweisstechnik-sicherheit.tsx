import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Flame, Shield, Layers, Wrench, Zap } from '@/components/ui/icon';

export const schweisstechnikSicherheit: NewsPost = {
  slug: 'schweisstechnik-sicherheit-homogene-materialverbindung-ppr',
  date: '2024-08-20',
  category: 'Sicherheit',
  tag: 'Installation',
  tags: ['Schweißtechnik', 'PPR', 'Rohrsysteme', 'Sicherheit', 'Muffenschweißen', 'Installation'],
  title: {
    de: 'Schweißtechnik Sicherheit',
    en: 'Welding Technology Safety',
    ar: 'سلامة تقنية اللحام'
  },
  teaser: {
    de: 'Jede mechanische Dichtung ist eine potenzielle Schwachstelle in der Gebäudeinstallation. Erfahren Sie, wie die homogene PPR Verschmelzung von K Aqua dauerhafte Sicherheit und leckagefreie Rohrsysteme garantiert.',
    en: 'Every mechanical seal is a potential weak point in building installations. Discover how K Aqua\'s homogeneous PPR fusion guarantees lasting safety and leak free pipe systems.',
    ar: 'كل سداد ميكانيكي هو نقطة ضعف محتملة في تمديدات المباني. اكتشف كيف يضمن الدمج المتجانس لأنابيب PPR من K Aqua أماناً دائماً وأنظمة أنابيب خالية من التسرب.'
  },
  excerpt: {
    de: 'Jede mechanische Dichtung ist eine potenzielle Schwachstelle in der Gebäudeinstallation. Erfahren Sie, wie die homogene PPR Verschmelzung von K Aqua dauerhafte Sicherheit und leckagefreie Rohrsysteme garantiert.',
    en: 'Every mechanical seal is a potential weak point in building installations. Discover how K Aqua\'s homogeneous PPR fusion guarantees lasting safety and leak free pipe systems.',
    ar: 'كل سداد ميكانيكي هو نقطة ضعف محتملة في تمديدات المباني. اكتشف كيف يضمن الدمج المتجانس لأنابيب PPR من K Aqua أماناً دائماً وأنظمة أنابيب خالية من التسرب.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Flame className="w-64 h-64 text-red-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die thermische Fusion" className="mb-6 text-red-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                In der klassischen Gebäudeinstallation ist der Übergang zwischen zwei Rohren immer der kritischste Punkt. Wo Gewinde geschnitten, Gummidichtungen eingepresst oder Kleber aufgetragen werden, entstehen zwangsläufig Schwachstellen, die mit den Jahren nachgeben. K Aqua PPR Rohrsysteme gehen einen fundamental anderen Weg: Durch kontrollierte thermische Verschmelzung verbinden sich die Kunststoffmoleküle untrennbar miteinander. Aus zwei Bauteilen entsteht eine einzige, homogene und dauerhaft leckagesichere Rohrverbindung.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mechanical vs Molecular - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Der Paradigmenwechsel" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Mechanik vs Molekularbindung
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Wrench className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Das mechanische Risiko</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pressfittings und Schraubverbindungen basieren alle auf demselben Prinzip. Ein Fremdmaterial zumeist ein Gummidichtring soll verhindern, dass Wasser austritt. Diese Elastomere altern jedoch. Sie werden spröde, verlieren durch Temperaturschwankungen ihre Elastizität und geben dem Wasserdruck irgendwann nach. Das Resultat ist der gefürchtete und enorm kostspielige Wasserschaden im Mauerwerk.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-red-500/20 bg-red-500/5">
              <Shield className="w-12 h-12 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die homogene Nahtlosigkeit</h3>
              <p className="text-muted-foreground leading-relaxed">
                Polypropylen benötigt weder Klebstoff noch Dichtungsringe. Beim Schweißvorgang verschmelzen das Rohr und das Fitting auf molekularer Ebene vollständig miteinander. Sobald das Material wieder abgekühlt ist, existiert keine Fügestelle mehr. Es gibt keinen physischen Spalt, durch den auch nur ein einziger Wassertropfen entweichen könnte.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Welding Process - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Präzision in drei Schritten" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der Prozess der thermischen Verschmelzung
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Phase Eins Erhitzen",
              description: "Mithilfe eines exakt auf zweihundertsechzig Grad Celsius kalibrierten Schweißgeräts werden die äußere Schicht des Rohrs und die innere Schicht des Fittings zeitgleich angewärmt. Die langen Molekülketten des Polypropylens beginnen sich zu lockern und gehen in einen plastischen Zustand über.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Flame className="w-32 h-32 text-red-500 opacity-20" /></div>
            },
            {
              title: "Phase Zwei Fügen",
              description: "Die beiden erhitzten Komponenten werden zügig und passgenau ineinandergeschoben. Durch den exakt berechneten Pressdruck verweben sich die freigelegten Molekülketten beider Bauteile sofort miteinander. Die Grenzen zwischen Rohr und Fitting verschwinden augenblicklich.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Phase Drei Aushärten",
              description: "Nach einer kurzen Abkühlphase kristallisiert das Material wieder vollständig aus. Die neu entstandene Verbindungsebene ist nun exakt so stark, belastbar und dicht wie die unberührte Rohrwand selbst. Die Leitung kann sofort mit vollem Prüfdruck belastet werden.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Shield className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Welding Types - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Flexibilität auf der Baustelle" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Schweißtechnologien im Überblick
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Muffenschweißen"
              description="Das Standardverfahren für Dimensionen bis einhundertfünfundzwanzig Millimeter. Extrem schnell, fehlerverzeihend und mit leichtem, handlichem Werkzeug direkt auf der Baustelle oder über Kopf durchführbar."
              header={<div className="w-full h-48 bg-red-500/10 rounded-t-2xl flex items-center justify-center border-b border-red-500/20"><Flame className="w-24 h-24 text-red-500 opacity-40" /></div>}
              icon={<Flame className="h-6 w-6 text-red-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Heizwendelschweißen"
              description="Die Hightech Lösung für schwer zugängliche Schächte. Integrierte Heizdrähte im Fitting schmelzen das Material computergesteuert per Knopfdruck auf absolute Sicherheit auf engstem Raum."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Zap className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Stumpfschweißen"
              description="Für großkalibrige Industrierohre ab einhundertsechzig Millimetern. Die massiven Rohrenden werden direkt ohne zusätzliches Fitting vollflächig miteinander verschmolzen, was den Materialeinsatz und das Gewicht der Anlage drastisch optimiert."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Layers className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Layers className="h-6 w-6 text-foreground" />}
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
              { n: "100", u: "%", l: "Homogene Materialverbindung" },
              { n: "0", u: "", l: "Verschleißanfällige Dichtungsringe" },
              { n: "260", u: "°C", l: "Präzise kalibrierte Schweißtemperatur" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Makroaufnahme: Die nahtlose Verbindung zwischen Rohr und Fitting im Querschnitt" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Die endgültige Eliminierung des Leckagerisikos
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Jeder Bauherr fürchtet den Anruf, dass im fertigen Gebäude Wasser aus der Wand tropft. Mit der Entscheidung für die homogene Polypropylen Verschweißung von K Aqua verschwindet diese Angst vollständig. Das Resultat ist kein Konstrukt aus hunderten gesteckten Einzelteilen, sondern ein einziges, durchgehendes, perfekt in sich ruhendes Rohrsystem.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
