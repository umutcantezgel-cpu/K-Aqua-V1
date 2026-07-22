import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { TrendingDown, Coins, Zap, Shield, ArrowRight, BarChart } from '@/components/ui/icon';

export const lebenszykluskostenTco: NewsPost = {
  slug: 'lebenszykluskosten-tco-investition-ppr-rohre',
  date: 'Wirtschaftlichkeit',
  tag: 'TCO',
  title: {
    de: 'Lebenszykluskosten TCO',
    en: 'Lifecycle Costs (TCO)',
    ar: 'تكاليف دورة الحياة (TCO)',
  },
  teaser: {
    de: 'Lebenszykluskosten (TCO) von PPR Rohrsystemen: Warum sich die Investition in hochwertige K Aqua Kunststoffrohre durch geringe OPEX, Wartungsfreiheit und 50 Jahre Lebensdauer langfristig auszahlt.',
    en: 'Lifecycle costs (TCO) of PPR pipe systems: Why investing in high-quality K Aqua plastic pipes pays off in the long term through low OPEX, zero maintenance, and a 50-year service life.',
    ar: 'تكاليف دورة الحياة (TCO) لأنظمة أنابيب PPR: لماذا يؤتي الاستثمار في أنابيب K Aqua البلاستيكية عالية الجودة ثماره على المدى الطويل بفضل انخفاض النفقات التشغيلية وانعدام الصيانة وعمر افتراضي يمتد لـ 50 عامًا.',
  },
  excerpt: {
    de: 'Lebenszykluskosten (TCO) von PPR Rohrsystemen: Warum sich die Investition in hochwertige K Aqua Kunststoffrohre durch geringe OPEX, Wartungsfreiheit und 50 Jahre Lebensdauer langfristig auszahlt.',
    en: 'Lifecycle costs (TCO) of PPR pipe systems: Why investing in high-quality K Aqua plastic pipes pays off in the long term through low OPEX, zero maintenance, and a 50-year service life.',
    ar: 'تكاليف دورة الحياة (TCO) لأنظمة أنابيب PPR: لماذا يؤتي الاستثمار في أنابيب K Aqua البلاستيكية عالية الجودة ثماره على المدى الطويل بفضل انخفاض النفقات التشغيلية وانعدام الصيانة وعمر افتراضي يمتد لـ 50 عامًا.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section - Hero */}
      <section className="relative">
        <Reveal>
          <div className="bg-emerald-950/20 backdrop-blur-md border border-emerald-500/20 p-8 lg:p-14 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingDown className="w-64 h-64 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <Eyebrow text="Die Flatline der Kosten" className="mb-6 text-emerald-500" />
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance">
                Investoren und Bauherren fokussieren sich oft auf den initialen CAPEX die reinen Beschaffungskosten der Materialien. Doch bei der Gebäudeinfrastruktur definiert der OPEX die wahren Kosten. Reparaturen, Leckagen, Korrosionsschutz und steigender Pumpenstrom treiben die Total Cost of Ownership bei konventionellen Systemen exponentiell nach oben. PPR Rohrleitungssysteme bieten eine nahezu flache Kostenkurve über ein halbes Jahrhundert.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Capex vs Opex - Split Cards */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Die TCO Matrix" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              CAPEX Illusion vs OPEX Realität
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <ArrowRight className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die konventionelle Kostenfalle</h3>
              <p className="text-muted-foreground leading-relaxed">
                Billige Materialien mögen das anfängliche Baubudget schönen, aber sie rächen sich im Betrieb. Durch Korrosion rauen die Innenwände auf, was stärkere Pumpen erfordert (erhöhte Energiekosten). Chemische Inhibitoren gegen Rost müssen dosiert werden (Wartungskosten). Nach 15 bis 20 Jahren drohen erste Leckagen durch Lochfraß, die im schlimmsten Fall eine Komplettsanierung des Strangs erfordern.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-emerald-500/20 bg-emerald-500/5">
              <Coins className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die einmalige Investition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Die Verlegung von K Aqua Rohren ist ein klassisches "Fit and Forget" Investment. Die spiegelglatte Rohrinnenwand verhindert Ablagerungen und hält den Pumpenstrom über 50 Jahre konstant niedrig. Es gibt absolut keine Ausgaben für Korrosionsschutz oder Rohrreinigung. Die Wartungskosten für das Rohrnetz sinken faktisch auf null.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* The Economic Lifecycle - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Phasen der Wirtschaftlichkeit" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Rendite über Jahrzehnte
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Phase 1 Beschaffung & Installation",
              description: "Bereits bei der Verlegung punktet PPR. Das extrem geringe Eigengewicht spart Krankosten und beschleunigt das Handling auf der Baustelle. Die thermische Polyfusion (Schweißen) erfordert keine teuren Fittings mit O Ringen oder schwere Presswerkzeuge. Die Bauzeit verkürzt sich erheblich.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><BarChart className="w-32 h-32 text-emerald-500 opacity-20" /></div>
            },
            {
              title: "Phase 2 Die Betriebsjahre",
              description: "Während bei metallischen Systemen die Wartungsverträge für Wasseraufbereitung und Filterwechsel anlaufen, bleibt das PPR System wartungsfrei. Die herausragende thermische Isolation reduziert zudem den Wärmeverlust bei Warmwasserleitungen, was die Heizkosten des Gebäudes drückt.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Zap className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Phase 3 Der Lebenszyklus",
              description: "Wenn andere Systeme nach 20 bis 30 Jahren das Ende ihrer Lebensdauer erreichen und für Millionenbeträge unter Betriebsunterbrechung ausgetauscht werden müssen, arbeitet das K Aqua System unverändert weiter. Die auf 50 Jahre zertifizierte Lebensdauer halbiert die langfristigen Abschreibungskosten.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><TrendingDown className="w-32 h-32 text-primary opacity-20" /></div>
            }
          ]}
        />
      </section>

      {/* Hidden Cost Drivers - Bento Grid */}
      <section className="mt-12">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Verborgene Einsparpotenziale" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Kostenfaktoren eliminieren
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Energieeffizienz der Pumpen"
              description="Rostige Rohre erfordern hohen Pumpendruck. Die Laminarströmung in glatten PPR Rohren spart über die Jahre tausende Euro an Strom."
              header={<div className="w-full h-48 bg-emerald-500/10 rounded-t-2xl flex items-center justify-center border-b border-emerald-500/20"><Zap className="w-24 h-24 text-emerald-500 opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-emerald-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Versicherungsprämien"
              description="Die homogene Verschweißung eliminiert das Risiko von Dichtungsschäden. Oftmals honorieren Versicherer dies mit niedrigeren Prämien für Leitungswasserschäden."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Keine Anlagenstillstände"
              description="In der Industrie bedeutet ein Rohrbruch Produktionsausfall. Die absolute Dichtheit und Chemikalienbeständigkeit von K Aqua schützt vor teuren Betriebsunterbrechungen."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><TrendingDown className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<TrendingDown className="h-6 w-6 text-foreground" />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Stats Band - Financial Metrics */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0", u: "€", l: "Ausgaben für Korrosionsschutz im Betrieb" },
              { n: "50", u: "+", l: "Jahre garantierte Abschreibungsdauer" },
              { n: "100", u: "%", l: "Planungssicherheit für Facility Management" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="TCO Analyse: Vergleich der kumulierten Betriebskosten von PPR gegenüber metallischen Systemen über 50 Jahre" />
        </Reveal>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <Coins className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Das wirtschaftlichste Rohr ist das, welches man nie wieder sieht
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die wahre Qualität einer Gebäudeinfrastruktur misst sich nicht am Tag der Abnahme, sondern an den fehlenden Rechnungen in den darauffolgenden Jahrzehnten. K Aqua bietet Bauherren und Investoren die maximale Sicherheit, dass ihr Gebäude hydraulisch auf einem Fundament absoluter Wirtschaftlichkeit operiert.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
