import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Handshake, Shield, Thermometer, Wrench, Layers, Factory } from '@/components/ui/icon';

export const messingPolypropylen: NewsPost = {
  slug: 'messing-trifft-polypropylen-uebergaenge-bestand',
  date: 'Wissen',
  tag: 'Material',
  title: {
    de: 'Messing trifft Polypropylen',
    en: 'Brass meets Polypropylene',
    ar: 'النحاس الأصفر يلتقي بالبولي بروبيلين'
  },
  teaser: {
    de: 'Sanierung heißt fast immer Systemwechsel: Spezielle Übergangsfittings und PPR Rohrsysteme mit integriertem Messinggewinde machen die Anbindung an den Bestand absolut dicht, normgerecht und dauerhaft korrosionssicher.',
    en: 'Renovation almost always means a system change: Special transition fittings and PPR pipe systems with integrated brass threads make the connection to the existing system absolutely leak-proof, compliant with standards, and permanently corrosion-resistant.',
    ar: 'التجديد يعني دائمًا تقريبًا تغيير النظام: تجهيزات الانتقال الخاصة وأنظمة أنابيب PPR ذات الخيوط النحاسية المدمجة تجعل الاتصال بالنظام الحالي مانعًا للتسرب تمامًا ومتوافقًا مع المعايير ومقاومًا للتآكل بشكل دائم.'
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-card/40 backdrop-blur-md border border-card-border p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Handshake className="w-64 h-64" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die Verbindung zweier Welten" className="mb-6 text-primary" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Kaum ein großes Bauprojekt startet heutzutage komplett auf der sprichwörtlichen grünen Wiese. Besonders bei der Modernisierung historischer Gebäude oder der Erweiterung bestehender Industrieanlagen trifft modernste Kunststofftechnik unweigerlich auf alte, historisch gewachsene Bestandsleitungen. Wie verbindet man diese Welten absolut druckdicht und korrosionssicher? Die Antwort liegt in unseren intelligenten Hybrid Fittings.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Challenge - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Das Problem der Sanierung" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Der kritische Moment des Systemwechsels
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <Shield className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die Altlast der Metalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Alte Stränge bestehen in der Regel aus korrosionsanfälligem Kupfer oder schwerem, verzinktem Stahl. Diese Materialien dehnen sich bei Hitze völlig anders aus als moderne Kunststoffe. Ohne ein extrem spezialisiertes Übergangsstück wären fatale Haarrisse, drastische Dichtungsausfälle und massive Wasserschäden nach kürzester Zeit vorprogrammiert.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-accent/20 bg-accent/5">
              <Handshake className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Das mechanische Nadelöhr</h3>
              <p className="text-muted-foreground leading-relaxed">
                Der Übergangsfitting ist somit das absolute Nadelöhr jeder umfassenden Sanierung. Er muss enorme thermische Spannungen aufnehmen, absolute Dichtheit unter vollem Leitungsdruck garantieren und gleichzeitig strikt verhindern, dass alte Korrosionsprobleme auf das neue Kunststoffsystem übergreifen. Ein echter mechanischer Kraftakt.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Hybrid Fitting - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Materialfusion" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Stoffschluss trifft Metallgewinde
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Entzinkungsbeständiges Messing"
              description="Der Kern besteht aus einer hochspezialisierten Legierung, die extrem resistent gegen aggressivste Wasserqualitäten ist und die gefürchtete Entzinkungskorrosion vollständig ausschließt."
              header={<div className="w-full h-48 bg-yellow-500/10 rounded-t-2xl flex items-center justify-center border-b border-yellow-500/20"><Factory className="w-24 h-24 text-yellow-600 opacity-40" /></div>}
              icon={<Factory className="h-6 w-6 text-yellow-600" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Hochfestes Polypropylen"
              description="Die Hülle wird im Muffenschweißverfahren komplett stoffschlüssig und dauerhaft dicht mit dem neuen Kunststoffnetz verschmolzen. Es entsteht ein fließender, absolut nahtloser Übergang."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Layers className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Layers className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Untrennbare Verschmelzung"
              description="Beide Hälften werden in einem hochkomplexen Spritzgussverfahren unter massivem Druck so ineinander verzahnt, dass sie mechanisch zu einem unzertrennlichen Bauteil verschmelzen."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><Handshake className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<Handshake className="h-6 w-6 text-foreground" />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Engineering the Interlock - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Maschinenbau in Perfektion" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Die perfekte mechanische Einbettung
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Thermische Ausdehnung bändigen",
              description: "Wenn kochend heißes Wasser durch den Fitting schießt, dehnt sich der Kunststoff zwangsläufig wesentlich stärker aus als das metallische Messing. Diese pure Physik darf jedoch unter gar keinen Umständen zu Undichtigkeiten führen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Thermometer className="w-32 h-32 text-accent opacity-20" /></div>
            },
            {
              title: "Geometrische Verankerung",
              description: "Der Metalleinsatz besitzt tief gefräste Rillen, Einkerbungen und extrem scharfkantige asymmetrische Profile. Beim Abkühlen schrumpft der heiße Kunststoff mit brachialer Kraft tief in diese Rillen und klammert sich förmlich in das Metall.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Layers className="w-32 h-32 text-primary opacity-20" /></div>
            },
            {
              title: "Torsionskraft widerstehen",
              description: "Diese formschlüssige Einbettung ist so monumental stabil, dass sie selbst extremste Torsionskräfte mühelos aufnimmt. Wenn der Installateur das Gewinde mit schweren Rohrzangen extrem fest anzieht, kann sich der Metalleinsatz im Kunststoff absolut niemals verdrehen.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Wrench className="w-32 h-32 text-blue-500 opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Stats Band - Extreme Specifications */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "100", u: "%", l: "Formschlüssige Einbettung" },
              { n: "0", u: "", l: "Risiko für Kontaktkorrosion" },
              { n: "2", u: "", l: "Perfekt vereinte Materialwelten" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Sectional Renovation */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow text="Abschnittsweise Sanierung" />
              <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 mb-6 text-foreground leading-tight">
                Sanieren bei laufendem Betrieb
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Ein voll belegtes Krankenhaus, ein Fünf Sterne Hotel oder ein geschäftiger Bürokomplex können absolut nicht für Wochen komplett vom Wassernetz getrennt werden. Stillstand kostet gigantische Summen.
                </p>
                <p>
                  Dank unserer extrem sicheren Übergangstechnik lassen sich diese enormen Netze völlig stressfrei Strang für Strang sanieren. Korrodierte Altlasten werden sukzessive durch modernes Polypropylen ersetzt, während die noch funktionierenden Abschnitte provisorisch im Vollbetrieb verbleiben. Da Polypropylen keinerlei Angriffsfläche bietet, kann der Rost aus den alten Eisenrohren das neue System zudem niemals infizieren.
                </p>
              </div>
            </div>
            <div className="h-full min-h-[450px]">
              <PremiumAssetPlaceholder label="Sanierung im laufenden Krankenhausbetrieb" image="/images/new-k-aqua/messingfittings-ppr.jpg" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Maintenance / Removable Connections */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Wrench className="w-10 h-10 text-primary" />
            </div>
            <Eyebrow text="Maximale Wartungsfreundlichkeit" className="mb-4" />
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Lösbare Verschraubungen für kritische Punkte
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Während die Rohre für die Ewigkeit sicher verschweißt werden, erfordern teure Armaturen, große Umwälzpumpen und empfindliche Wärmetauscher höchste Flexibilität. Unsere speziellen Kunststoffverschraubungen mit massivem Metalleinlegeteil schaffen extrem druckdichte, aber jederzeit völlig problemlos lösbare Verbindungen. Defekte Pumpen können binnen Minuten mit einem simplen Schraubenschlüssel getauscht werden, ohne das gesamte Rohrleitungssystem aufschneiden zu müssen.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
