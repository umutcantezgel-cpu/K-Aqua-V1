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
  date: '2024-11-20',
  category: 'Sicherheit',
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

      <section>
        <Reveal>
          <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Das Versagen starrer Materialien unter Krafteinwirkung</h2>
            <p>
              Stahl- und Kupferrohre dominieren oft noch die historische Bauweise, doch sie besitzen einen fatalen physikalischen Nachteil: Ihre extreme Rigidität. Wenn tektonische Wellen ein Gebäude erschüttern oder sich ein Fundament über Jahrzehnte ungleichmäßig absenkt, entstehen in den Installationsschächten enorme Scherkräfte. 
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Sollbruchstellen in Metallnetzen</h3>
            <p>
              Starre Metallrohre können sich nicht verbiegen, um Zugspannungen abzubauen. Die gesamte kinetische Energie wird an die schwächsten Punkte des Systems weitergeleitet: die Verbindungsstellen. Gewinde, Lötstellen oder verpresste Fitting-Verbindungen reißen unter dieser Belastung auf. Der sofortige Druckabfall und massive Wasserschäden sind die Folge. Nach einem Erdbeben fällt so oft die komplette Trinkwasser- und Löschwasserversorgung eines Gebäudes aus.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Der molekulare Puffer: Polypropylen (PP-R)</h2>
            <p>
              Die Architektur moderner Rohrleitungssysteme in seismischen Zonen erfordert deshalb viskoelastische Eigenschaften. K Aqua PP-R (Polypropylen Random Copolymer) ist ein thermoplastischer Kunststoff, der genau für diese Anforderungen entwickelt wurde.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Elastizitätsmodul und Verformbarkeit</h3>
            <p>
              PP-R besitzt einen spezifischen Elastizitätsmodul, der es dem Rohr erlaubt, sich unter extremer Krafteinwirkung bis zu einem gewissen Grad temporär zu verformen, ohne zu bersten. Die Rohrleitung wirkt wie eine riesige Feder. Schwingungen und Vibrationen werden vom Material absorbiert (inhärente Dämpfung), anstatt sie ungedämpft an die nächste Halterung weiterzugeben.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Homogene Schweißverbindungen</h3>
            <p>
              Der entscheidende Faktor ist jedoch die Verbindungstechnik. Da K Aqua Rohre und Fittings durch thermische Fusion homogen miteinander verschmolzen werden, entsteht ein Rohrnetz aus &quot;einem Guss&quot;. Es gibt keine mechanischen Schwachstellen. Die Schweißnaht besitzt exakt dieselbe Dehnungsfähigkeit und Belastbarkeit wie das Rohr selbst. Selbst wenn das Rohrnetz durch massive statische Verschiebungen stark durchgebogen wird, reißt die Verbindung nicht ab.
            </p>
            
            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Einsatzszenarien für hochflexible Rohrsysteme</h2>
            <p>
              Die elastischen Eigenschaften von PP-R schützen Gebäude nicht nur in klassischen Erdbebengebieten, sondern bieten auch im regulären Baualltag massive Vorteile.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Langsame Bausenkungen und Setzungen</h3>
            <p>
              Jedes neue Bauwerk setzt sich im Laufe der ersten Jahre millimeterweise in das Erdreich ab. Wenn Gebäude auf weichen Böden stehen oder nachträglich unterkellert werden, entstehen Setzungsrisse. Starr verlegte Guss- oder Stahlrohre in den Wänden brechen dabei oft unsichtbar. PP-R-Leitungen hingegen passen sich diesen Setzungen flexibel an, ohne ihre Integrität zu verlieren.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Unterirdische Schwerlasttrassen</h3>
            <p>
              Rohrleitungen, die unter stark befahrenen Straßen, Fabrikhöfen oder in geologisch instabilen Gebieten im Erdreich verlegt sind, stehen unter permanentem Druck durch Verkehrslasten und Erdbewegungen. Die Zähigkeit von K Aqua PP-R hält diesen dynamischen Lasten mühelos stand. Es kompensiert den Erddruck, wo spröde Materialien wie PVC-U oder Keramik längst brechen würden.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Kompensation thermischer Längenänderungen</h3>
            <p>
              Jedes Rohr, durch das heißes Wasser fließt, dehnt sich aus. Bei Metallrohren entstehen dabei gewaltige Kräfte, die massive Fixpunkte aus Stahl erfordern, um ein Abreißen der Rohrleitung zu verhindern. PP-R nimmt diese thermischen Ausdehnungen durch Dehnungsbögen elegant auf. Die Flexibilität des Materials ermöglicht es, Längenänderungen durch gewollte Verbiegungen im Rohrleitungsnetz spannungsfrei zu kompensieren.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Sicherheit für kritische Infrastrukturen</h2>
            <p>
              Von Krankenhäusern in kalifornischen Erdbebenzonen bis hin zu hochsensiblen Rechenzentren weltweit – die Investition in viskoelastische PP-R-Rohrsysteme von K Aqua ist eine Investition in die absolute Ausfallsicherheit. Im Katastrophenfall ist die Erhaltung der Infrastruktur (Löschwasser, Trinkwasser) überlebenswichtig. Ein Rohrnetz, das nachgibt, aber nicht bricht, ist der ultimative Lebensretter für jedes Gebäude.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="py-12">
        <Reveal>
          <StatBand 
            stats={[
              { n: "0", u: "", l: "Mikrorisse unter massiver Vibrationseinwirkung und Stresstests" },
              { n: "100", u: "%", l: "Sicherheit durch homogene, elastische Dehnungsfähigkeit" },
              { n: "1", u: "", l: "Entscheidung für maximale strukturelle Gebäudelebensdauer" },
            ]} 
            cols={250}
          />
        </Reveal>
      </section>
    </div>
  ),
};
