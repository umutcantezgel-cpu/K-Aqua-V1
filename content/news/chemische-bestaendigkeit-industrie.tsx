import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Factory, Shield, Droplet, Wrench, Layers, Zap } from '@/components/ui/icon';

export const chemischeBestaendigkeitIndustrie: NewsPost = {
  slug: 'chemische-bestaendigkeit-ppr-im-industriellen-anlagenbau',
  date: '2025-01-10',
  category: 'Technik',
  tags: ['PPR', 'Chemische Beständigkeit', 'Anlagenbau', 'Industrie', 'Rohrsysteme'],
  title: {
    de: 'Chemische Beständigkeit PPR',
    en: 'Chemical Resistance PPR',
    ar: 'المقاومة الكيميائية لأنابيب PPR'
  },
  teaser: {
    de: 'Druckluft, aggressive Kühlmedien und chemische Transporte fordern metallische Leitungen heraus. Entdecken Sie die chemische Beständigkeit von K Aqua PPR Rohrsystemen für den dauerhaften Einsatz im industriellen Anlagenbau.',
    en: 'Compressed air, aggressive cooling media, and chemical transport challenge metal pipes. Discover the chemical resistance of K Aqua PPR pipe systems for long-term use in industrial plant engineering.',
    ar: 'الهواء المضغوط، ووسائط التبريد شديدة التفاعل، ونقل المواد الكيميائية تشكل تحدياً للأنابيب المعدنية. اكتشف المقاومة الكيميائية الفائقة لأنظمة أنابيب K Aqua PPR للاستخدام طويل الأمد في المنشآت الصناعية.'
  },
  excerpt: {
    de: 'Druckluft, aggressive Kühlmedien und chemische Transporte fordern metallische Leitungen heraus. Entdecken Sie die chemische Beständigkeit von K Aqua PPR Rohrsystemen für den dauerhaften Einsatz im industriellen Anlagenbau.',
    en: 'Compressed air, aggressive cooling media, and chemical transport challenge metal pipes. Discover the chemical resistance of K Aqua PPR pipe systems for long-term use in industrial plant engineering.',
    ar: 'الهواء المضغوط، ووسائط التبريد شديدة التفاعل، ونقل المواد الكيميائية تشكل تحدياً للأنابيب المعدنية. اكتشف المقاومة الكيميائية الفائقة لأنظمة أنابيب K Aqua PPR للاستخدام طويل الأمد في المنشآت الصناعية.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Factory className="w-64 h-64 text-orange-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Das chemische Schutzschild" className="mb-6 text-orange-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Industrieanlagen sind die absoluten Härtetests für jedes Rohrleitungssystem. Hier fließen nicht nur harmlose Wässer, sondern hochaggressive Laugen, saure Kühlmedien und extrem komprimierte Druckluft. Wo gewöhnliche metallische Rohre unweigerlich durch Lochfraß und Korrosion kapitulieren, entfaltet Polypropylen seine ganze molekulare Überlegenheit. K Aqua bietet der Schwerindustrie eine dauerhaft sichere, inerte und unzerstörbare Infrastruktur.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Acid vs Material - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Der industrielle Kampf" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Aggressive Medien vs Rohrleitung
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Layers className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Zerstörungskraft auf Metalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Stahl und Kupfer besitzen freie Elektronen, die permanent mit ihrer Umgebung reagieren wollen. Sobald der pH Wert des transportierten Mediums sinkt oder chemische Zusätze ins Spiel kommen, startet der galvanische Zersetzungsprozess. Die Rohrwände werden dünner, es entsteht gefürchteter Lochfraß und letztendlich der katastrophale Anlagenstillstand durch Leckagen.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-orange-500/20 bg-orange-500/5">
              <Shield className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die molekulare Immunität</h3>
              <p className="text-muted-foreground leading-relaxed">
                Polypropylen ist chemisch absolut inert. Seine langkettigen Molekülstrukturen bieten aggressiven Säuren oder Basen schlichtweg keinen Reaktionspartner an. Selbst bei hohen Konzentrationen von Chloriden, Sulfaten oder Nitraten bleibt die Rohrwand zu einhundert Prozent stabil. Die Industrie profitiert von einer Lebensdauer, die für Metalle unter diesen Bedingungen völlig utopisch wäre.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Molecular Shield - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Maschinenbau trifft Chemie" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Das Polypropylen Geheimnis
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Enorme pH Toleranz",
              description: "Egal ob extrem saure Medien mit einem pH Wert von Eins oder hochgradig basische Laugen mit einem pH Wert von Vierzehn transportiert werden müssen, K Aqua Systeme überstehen diese Belastungen mühelos. Diese unglaubliche Bandbreite macht sie zum perfekten Standard für Prozesswasser in der Chemieindustrie.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Droplet className="w-32 h-32 text-orange-500 opacity-20" /></div>
            },
            {
              title: "Abrasiver Widerstand",
              description: "In vielen industriellen Kühlkreisläufen werden Schwebstoffe, Sandpartikel oder winzige Späne mittransportiert. Diese wirken auf Metallrohre wie flüssiges Schmirgelpapier. Die dämpfende und extrem glatte molekulare Oberfläche von Polypropylen absorbiert diese Stöße elastisch und verhindert den mechanischen Abrieb fast vollständig.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Schweißen statt Schrauben",
              description: "Jedes geschnittene Gewinde ist eine massive Schwachstelle, da das Material hier am dünnsten ist. Gerade bei hochgiftigen Chemikalien ist dies ein unkalkulierbares Risiko. K Aqua verzichtet auf Gewinde und setzt auf die absolute Sicherheit der homogenen Muffenschweißung. Rohr und Fitting verschmelzen zu einem durchgehenden, untrennbaren Strang.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Wrench className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Industrial Use Cases - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="In der Praxis erprobt" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Einsatzgebiete der Schwerindustrie
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Chemischer Transport"
              description="Die sichere Beförderung von starken Reinigungsmitteln, Desinfektionslösungen und Prozesschemikalien ohne jegliche Kontamination des Mediums durch abgelöste Rohrbestandteile."
              header={<div className="w-full h-48 bg-orange-500/10 rounded-t-2xl flex items-center justify-center border-b border-orange-500/20"><Droplet className="w-24 h-24 text-orange-500 opacity-40" /></div>}
              icon={<Droplet className="h-6 w-6 text-orange-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Druckluftnetzwerke"
              description="Rostpartikel in der Druckluft zerstören teure pneumatische Zylinder. PPR Rohre bleiben innen perfekt sauber und sichern so die Funktionalität angeschlossener Hightech Maschinen."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Zap className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Industrielle Kühlkreisläufe"
              description="Egal ob Glykolmischungen oder salzhaltiges Meerwasser zur Kühlung verwendet wird, die Rohre widerstehen der Kälte, den Zusätzen und dem permanenten Druck absolut kompromisslos."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Factory className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Factory className="h-6 w-6 text-foreground" />}
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
              { n: "1 bis 14", u: "", l: "Extremes pH Toleranzfenster" },
              { n: "0", u: "", l: "Risiko für mikrobiologisch induzierte Korrosion" },
              { n: "100", u: "%", l: "Homogene Sicherheit durch Verschweißung" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Querschnitt durch eine industrielle Anlage mit K Aqua Verrohrung" video="/videos/factory.mp4" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
              <Shield className="w-10 h-10 text-orange-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Die Garantie für Anlagenverfügbarkeit
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Jede Stunde, die eine Produktionsanlage aufgrund einer defekten Leitung stillsteht, kostet das Unternehmen massiv Geld. Die Umstellung von fehleranfälligen Metallnetzen auf chemisch vollkommen inerte K Aqua PPR Systeme ist die effektivste Versicherung gegen ungeplante Ausfälle. Es ist der definitive Schritt hin zu maximaler Betriebssicherheit in der modernen Industrie.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
