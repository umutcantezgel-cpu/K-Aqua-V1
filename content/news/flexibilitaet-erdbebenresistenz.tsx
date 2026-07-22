import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Activity, Shield, Layers, Globe, Thermometer, ArrowRight } from '@/components/ui/icon';

export const flexibilitaetErdbebenresistenz: NewsPost = {
  slug: 'flexibilitaet-erdbebenresistenz-ppr-rohre',
  date: 'Sicherheit',
  tag: 'Extreme',
  title: {
    de: 'Flexibilität & Erdbeben',
    en: 'Flexibility & Earthquakes',
    ar: 'المرونة والزلازل',
  },
  teaser: {
    de: 'In seismisch aktiven Zonen oder bei schleichenden Bausenkungen brechen starre Rohrnetze schnell. K Aqua PPR Rohrsysteme fangen kinetische Energie elastisch ab, ohne zu bersten.',
    en: 'In seismically active zones or during gradual building settlement, rigid pipe networks break quickly. K Aqua PPR piping systems absorb kinetic energy elastically without bursting.',
    ar: 'في المناطق ذات النشاط الزلزالي أو عند حدوث هبوط تدريجي في المباني، تتعرض شبكات الأنابيب الصلبة للكسر بسرعة. بينما تمتص أنظمة أنابيب K Aqua PPR الطاقة الحركية بمرونة دون أن تنفجر.',
  },
  excerpt: {
    de: 'In seismisch aktiven Zonen oder bei schleichenden Bausenkungen brechen starre Rohrnetze schnell. K Aqua PPR Rohrsysteme fangen kinetische Energie elastisch ab, ohne zu bersten.',
    en: 'In seismically active zones or during gradual building settlement, rigid pipe networks break quickly. K Aqua PPR piping systems absorb kinetic energy elastically without bursting.',
    ar: 'في المناطق ذات النشاط الزلزالي أو عند حدوث هبوط تدريجي في المباني، تتعرض شبكات الأنابيب الصلبة للكسر بسرعة. بينما تمتص أنظمة أنابيب K Aqua PPR الطاقة الحركية بمرونة دون أن تنفجر.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Activity className="w-64 h-64 text-amber-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die kinetische Antwort" className="mb-6 text-amber-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Architektur in Erdbebengebieten basiert auf einem fundamentalen Prinzip: Ein Gebäude darf niemals starr gegen Naturgewalten ankämpfen, sondern muss die kinetische Energie durch Flexibilität aufnehmen und ableiten. Was für Wolkenkratzer gilt, gilt exakt so für die lebenswichtige Wasserinfrastruktur in ihrem Inneren. Während herkömmliche Metalle unter tektonischem Stress sofort reißen, agieren K Aqua PPR Rohrleitungssysteme als elastische Stoßdämpfer der Gebäudehydraulik.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Brittle Metals vs Elastic PPR - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Die Materialgrenze" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Bruchgefahr vs Elastizität
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <ArrowRight className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Starrheit der Metalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stahl und Kupfer sind extrem rigide Materialien. Wenn tektonische Wellen das Gebäude erfassen oder sich das Fundament über die Jahre leicht absenkt, können starre Rohre diesen Zugspannungen nicht nachgeben. Bereits mikroskopisch kleine Risse an den Gewinden oder Lötstellen führen zum sofortigen Druckabfall und zum strukturellen Versagen der gesamten Leitung.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-amber-500/20 bg-amber-500/5">
              <Shield className="w-12 h-12 text-amber-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Der molekulare Puffer</h3>
              <p className="text-muted-foreground leading-relaxed">
                PPR besitzt einen spezifischen Elastizitätsmodul, der es dem Rohr erlaubt, sich unter extremer Krafteinwirkung temporär zu verformen, ohne seine molekulare Integrität zu verlieren. Das Material federt Erschütterungen ab und gleicht Bausenkungen geschmeidig aus. Die homogene Materialverbindung der Schweißnähte reißt nicht, da sie genauso flexibel ist wie das Rohr selbst.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Seismic Response - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Die Wissenschaft der Bewegung" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Reaktion auf extreme Krafteinwirkung
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Seismische Wellen",
              description: "Bei einem Erdbeben durchlaufen extrem hochfrequente Vibrationen die gesamte Tragstruktur des Gebäudes. Die K Aqua Rohrsysteme absorbieren diese Schwingungen durch ihre inhärente Dämpfung, anstatt wie eine Stimmgabel in Resonanz zu geraten und am Befestigungspunkt zu brechen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Activity className="w-32 h-32 text-amber-500 opacity-20" /></div>
            },
            {
              title: "Langsame Bausenkungen",
              description: "Jedes Gebäude setzt sich im Laufe der ersten Jahre millimeterweise in das Erdreich ab. Diese statischen Verschiebungen erzeugen massive Scherkräfte in den Installationsschächten. PPR verformt sich adaptiv mit dem Gebäude und verhindert so schleichende Rohrbrüche in der Wand.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Thermische Spannung",
              description: "Nicht nur die Erde bewegt sich, auch das Rohr selbst dehnt sich bei wechselnden Wassertemperaturen aus. Die Flexibilität von Polypropylen sorgt dafür, dass diese internen Spannungen über die Dehnungsbögen sanft abgebaut werden, ohne dass die Installation abreißt.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Extreme Environments - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Globale Einsatzszenarien" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Sicherheit für kritische Infrastruktur
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Internationale Erdbebengebiete"
              description="Von Japan bis Kalifornien K Aqua PPR ist die präferierte Wahl für Regionen, in denen die Bauvorschriften extreme Resilienz gegen Naturgewalten einfordern."
              header={<div className="w-full h-48 bg-amber-500/10 rounded-t-2xl flex items-center justify-center border-b border-amber-500/20"><Globe className="w-24 h-24 text-amber-500 opacity-40" /></div>}
              icon={<Globe className="h-6 w-6 text-amber-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Notfallkrankenhäuser"
              description="Nach einer Katastrophe ist sauberes Trinkwasser überlebenswichtig. Das System stellt sicher, dass die Wasserversorgung in Kliniken selbst nach massiven Erschütterungen absolut intakt bleibt."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Unterirdische Schwerlasttrassen"
              description="Rohre unter Straßen oder Fabrikhöfen sind permanent dem Druck schwerer LKWs ausgesetzt. Die elastischen Eigenschaften von PPR kompensieren diesen konstanten Erddruck mühelos über Jahrzehnte."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Activity className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Activity className="h-6 w-6 text-foreground" />}
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
              { n: "0", u: "", l: "Mikrorisse unter massiver Vibrationseinwirkung" },
              { n: "100", u: "%", l: "Sicherheit durch homogene Dehnungsfähigkeit" },
              { n: "1", u: "", l: "Entscheidung für maximale Gebäudelebensdauer" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Strukturtest im Labor: PPR Rohrleitungssystem unter simulierter seismischer Belastung" image="/images/new-k-aqua/flexibilitaet-ppr-rohre.jpg" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Resilienz durch intelligente Materialien
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Wahre Stärke definiert sich in der Bauphysik nicht durch Starrheit, sondern durch die Fähigkeit, Belastungen auszuweichen und kinetische Energie zu absorbieren. K Aqua liefert Planern und Statikern weltweit ein Rohrsystem, das nicht gegen das Gebäude arbeitet, sondern sich nahtlos an dessen Bewegungen anpasst eine Garantie für absolute Versorgungssicherheit.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
