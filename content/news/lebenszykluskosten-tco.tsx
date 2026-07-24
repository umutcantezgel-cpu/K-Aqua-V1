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
    de: 'Lebenszykluskosten (TCO): Die wahre Wirtschaftlichkeit von PP-R',
    en: 'Lifecycle Costs (TCO)',
    ar: 'تكاليف دورة الحياة (TCO)',
  },
  teaser: {
    de: 'Lebenszykluskosten (TCO) von PPR-Rohrsystemen: Warum sich die Investition in hochwertige K-Aqua Kunststoffrohre durch geringe OPEX, absolute Wartungsfreiheit und über 50 Jahre zertifizierte Lebensdauer langfristig für Investoren auszahlt.',
    en: 'Lifecycle costs (TCO) of PPR pipe systems: Why investing in high-quality K Aqua plastic pipes pays off in the long term through low OPEX, zero maintenance, and a 50-year service life.',
    ar: 'تكاليف دورة الحياة (TCO) لأنظمة أنابيب PPR: لماذا يؤتي الاستثمار في أنابيب K Aqua البلاستيكية عالية الجودة ثماره على المدى الطويل بفضل انخفاض النفقات التشغيلية وانعدام الصيانة وعمر افتراضي يمتد لـ 50 عامًا.',
  },
  excerpt: {
    de: 'Lebenszykluskosten (TCO) von PPR-Rohrsystemen: Warum sich die Investition in hochwertige K-Aqua Kunststoffrohre durch geringe OPEX, absolute Wartungsfreiheit und über 50 Jahre zertifizierte Lebensdauer langfristig für Investoren auszahlt.',
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
              <p className="text-xl lg:text-3xl font-semibold text-foreground leading-snug max-w-4xl text-balance mb-6">
                Investoren, Projektentwickler und Bauherren fokussieren sich in der Planungsphase oft extrem auf den initialen CAPEX – die reinen Beschaffungs- und Installationskosten der Materialien. Doch bei der grundlegenden Gebäudeinfrastruktur wie dem Wasserleitungsnetz definiert der OPEX die wahren und oftmals schmerzhaften Kosten. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                Reparaturen, unerwartete Leckagen, notwendiger Korrosionsschutz, Wasseraufbereitung und ein durch Inkrustation kontinuierlich steigender Pumpenstrom treiben die Total Cost of Ownership (TCO) bei konventionellen, metallischen Systemen nach wenigen Jahren exponentiell nach oben. K-Aqua PP-R Rohrleitungssysteme hingegen durchbrechen diesen Teufelskreis und bieten Facility Managern eine nahezu flache Kostenkurve über ein halbes Jahrhundert hinweg.
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
              CAPEX-Illusion vs OPEX-Realität
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 lg:p-12 border-card-border bg-card">
              <ArrowRight className="w-12 h-12 text-muted-foreground mb-6 opacity-50" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die konventionelle Kostenfalle (Metalle)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Billige, minderwertige Rohrmaterialien oder traditioneller verzinkter Stahl mögen das anfängliche Baubudget schönen, aber sie rächen sich im laufenden Betrieb unerbittlich. Durch unvermeidbare Korrosion rauen die Innenwände auf, was den Druckverlust erhöht und deutlich stärkere Pumpen erfordert (drastisch erhöhte Energiekosten). Chemische Inhibitoren gegen Rost und Biofilme müssen regelmäßig ins Wasser dosiert werden (hohe laufende Wartungskosten). Nach 15 bis 20 Jahren drohen erste versteckte Leckagen durch Lochfraß, die Wasserschäden verursachen und im schlimmsten Fall eine vorzeitige, extrem teure Komplettsanierung des Strangs erfordern.
              </p>
            </Card>
            
            <Card className="p-8 lg:p-12 border-emerald-500/20 bg-emerald-500/5">
              <Coins className="w-12 h-12 text-emerald-500 mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4 text-foreground">Die einmalige Investition (K-Aqua PP-R)</h3>
              <p className="text-muted-foreground leading-relaxed">
                Die Verlegung von hochmolekularem K-Aqua PP-R ist ein klassisches "Fit and Forget"-Investment. Die spiegelglatte, porenfreie Rohrinnenwand verhindert Ablagerungen jeglicher Art (Kalk, Schlamm, Biofilm) und hält den notwendigen Pumpenstrom über beeindruckende 50 Jahre konstant niedrig. Es gibt absolut keine laufenden Ausgaben für Korrosionsschutz oder mechanische Rohrreinigung. Da die Verbindungen homogen verschweißt sind (keine O-Ringe, die ermüden können), sinken die Wartungskosten für das physische Rohrnetz faktisch auf null.
              </p>
            </Card>
          </div>
        </Reveal>
      </section>

      {/* Deep Technical Analysis */}
      <section className="mt-12">
        <Reveal>
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground">
            <h2 className="text-2xl font-bold text-foreground mb-4">Stromfresser Druckverlust: Die unerkannte Kostenstelle</h2>
            <p>
              In großen gewerblichen Komplexen wie Hotels, Krankenhäusern oder Rechenzentren laufen Umwälzpumpen für Kühl- und Warmwasser 24/7, 365 Tage im Jahr. Der Stromverbrauch dieser Pumpen ist direkt proportional zum Druckverlust im Rohrnetz. 
            </p>
            <p>
              Metallrohre haben von Beginn an eine höhere absolute Oberflächenrauheit als Kunststoffrohre. Viel fataler ist jedoch die Zeitkomponente: Durch Korrosion und Kalkablagerungen (Inkrustation) verringert sich der freie Querschnitt des Rohres im Laufe der Jahre drastisch, während die Rauheit extrem ansteigt. Die Strömung wird turbulent. Um die gleiche Wassermenge zu fördern, muss die Pumpe exponentiell mehr elektrische Leistung aufbringen. 
            </p>
            <p>
              K-Aqua PP-R Rohre weisen eine Oberflächenrauheit von nur 0,007 mm auf. Und das Wichtigste: Diese Rauheit verändert sich auch nach Jahrzehnten nicht. Das Strömungsprofil bleibt laminar. In Großanlagen können durch diese konstant niedrige Rohrreibung im Lebenszyklus hunderttausende Kilowattstunden Strom (und damit verbundene CO2-Emissionen) eingespart werden.
            </p>
          </div>
        </Reveal>
      </section>

      {/* The Economic Lifecycle - Sticky Scroll */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Phasen der Wirtschaftlichkeit" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Rendite über Jahrzehnte kalkulieren
            </h2>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Phase 1: Beschaffung & Installation",
              description: "Bereits bei der Verlegung punktet PP-R enorm. Das extrem geringe Eigengewicht spart Krankosten und beschleunigt das Handling auf der Baustelle massiv. Die thermische Polyfusion (Schweißen) erfordert keine teuren metallischen Fittings mit fehleranfälligen O-Ringen oder zentnerschwere Presswerkzeuge. Die Montage geht schneller, sicherer und ergonomischer vonstatten. Die Bauzeit verkürzt sich erheblich.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><BarChart className="w-32 h-32 text-emerald-500 opacity-20" /></div>
            },
            {
              title: "Phase 2: Die Betriebsjahre",
              description: "Während bei metallischen Systemen die teuren Wartungsverträge für Wasseraufbereitung und Filterwechsel anlaufen, bleibt das PP-R-System komplett wartungsfrei. Die herausragende thermische Isolation des Kunststoffs selbst (geringe Wärmeleitfähigkeit) reduziert zudem den Wärmeverlust bei Warmwasserleitungen drastisch, was die Heiz- bzw. Kühlkosten des Gebäudes täglich reduziert.",
              content: <div className="h-full w-full bg-card flex items-center justify-center"><Zap className="w-32 h-32 text-muted-foreground opacity-20" /></div>
            },
            {
              title: "Phase 3: Der End-of-Life Zyklus",
              description: "Wenn herkömmliche Systeme nach 20 bis 25 Jahren das Ende ihrer Lebensdauer erreichen und für Millionenbeträge unter schwerer Betriebsunterbrechung mühsam ausgetauscht werden müssen, arbeitet das K-Aqua System völlig unbeeindruckt weiter. Die auf mindestens 50 Jahre zertifizierte Lebensdauer (bei Einhaltung der Druck-Temperatur-Kurven) halbiert die langfristigen Abschreibungskosten de facto.",
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
              Risiko- und Kostenfaktoren eliminieren
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="Energieeffizienz der Pumpen"
              description="Verkrustete Rohre erfordern extrem hohen Pumpendruck. Die dauerhaft reibungsarme Laminarströmung in glatten PP-R Rohren spart über die Jahre massive Mengen an elektrischer Energie."
              header={<div className="w-full h-48 bg-emerald-500/10 rounded-t-2xl flex items-center justify-center border-b border-emerald-500/20"><Zap className="w-24 h-24 text-emerald-500 opacity-40" /></div>}
              icon={<Zap className="h-6 w-6 text-emerald-500" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title="Gesenkte Versicherungsprämien"
              description="Die homogene thermische Verschweißung eliminiert das Risiko von nachgebenden Dichtungen. Oftmals honorieren Versicherer dieses Minimierungsrisiko mit deutlich niedrigeren Prämien für Leitungswasserschäden."
              header={<div className="w-full h-48 bg-primary/10 rounded-t-2xl flex items-center justify-center border-b border-primary/20"><Shield className="w-24 h-24 text-primary opacity-40" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="Keine Anlagenstillstände (Downtime)"
              description="In der Industrie bedeutet ein Rohrbruch oder eine Leckage sofortigen Produktionsausfall. Die absolute Dichtheit, Korrosions- und Chemikalienbeständigkeit von K-Aqua schützt Sie zu 100% vor teuren, unvorhergesehenen Betriebsunterbrechungen."
              header={<div className="w-full h-48 bg-card rounded-t-2xl flex items-center justify-center border-b border-card-border"><TrendingDown className="w-24 h-24 text-foreground opacity-20" /></div>}
              icon={<TrendingDown className="h-6 w-6 text-foreground" />}
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
              FAQ: Wirtschaftlichkeit von PP-R
            </h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Ist PP-R in der Anschaffung teurer als herkömmliche Materialien?</h4>
                <p className="text-muted-foreground">
                  Im direkten Materialvergleich sind PP-R Rohre oft hochgradig kompetitiv zu Kupfer oder Edelstahl, insbesondere bei großen Nennweiten. Wenn man die Einsparungen bei der schnellen Installation (keine schweren Maschinen, schnelles Schweißen) hinzurechnet, ist der initiale CAPEX meist sogar geringer oder gleichwertig.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Wie verhält es sich mit den Recyclingkosten am Ende der Lebensdauer?</h4>
                <p className="text-muted-foreground">
                  Polypropylen ist ein thermoplastischer Kunststoff, der sich zu 100% recyceln lässt. Im Gegensatz zu Verbundrohren (wie PEX-Al-PEX), die sich nur schwer trennen lassen, kann homogenes PP-R geschreddert und als Rezyklat für sekundäre Anwendungen (z.B. Paletten, Kabeltrommeln) wiederverwendet werden, was Entsorgungskosten minimiert.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-foreground mb-2">Warum amortisiert sich die Investition besonders in Hotels?</h4>
                <p className="text-muted-foreground">
                  Hotels haben einen enormen Warmwasserbedarf (Zirkulationsleitungen). Die exzellente Eigendämmung von PP-R (Wärmeleitfähigkeit nur ca. 0,24 W/mK) reduziert den Wärmeverlust dramatisch im Vergleich zu ungedämmten Metallrohren. Das entlastet die Heizanlage jeden einzelnen Tag.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Band - Financial Metrics */}
      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0", u: "€", l: "Ausgaben für Korrosionsschutz im Betrieb" },
              { n: "50", u: "+", l: "Jahre zertifizierte Lebensdauer" },
              { n: "100", u: "%", l: "Planungssicherheit für Ihr Investitionsbudget" },
            ]} 
            cols={250}
          />
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
              Die wahre bauliche Qualität einer Gebäudeinfrastruktur misst sich nicht am Tag der glänzenden Schlüsselübergabe, sondern an den fehlenden Wartungs- und Reparaturrechnungen in den darauffolgenden Jahrzehnten. K-Aqua bietet Bauherren, Planern und Investoren die maximale Sicherheit, dass ihr Gebäude hydraulisch auf einem Fundament absoluter technischer Zuverlässigkeit und höchster finanzieller Wirtschaftlichkeit operiert.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
