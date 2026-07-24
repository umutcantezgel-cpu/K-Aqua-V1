import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { ExportGlobe } from '@/components/ui/ExportGlobe';
import { DataTable } from '@/components/ui/DataTable';
import { DeepFAQ } from '@/components/ui/DeepFAQ';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Chip } from '@/components/ui/Chip';
import { Shield, Globe, FileText, Check } from '@/components/ui/icon';

export const trinkwasserverordnungNormenZertifikate: NewsPost = {
  slug: 'trinkwasserverordnung-normen-zertifikate',
  date: 'Zertifizierung',
  tag: 'Hygiene',
  title: {
    de: 'Trinkwasserverordnung & Zertifikate',
    en: 'Drinking Water Ordinance & Certificates',
    ar: 'لائحة مياه الشرب والشهادات',
  },
  teaser: {
    de: 'Trinkwasser ist das wichtigste Lebensmittel: Entdecken Sie die strengen Grenzwerte der Trinkwasserverordnung sowie Prüfstandards & DVGWzertifikate für PPRrohrsysteme.',
    en: 'Drinking water is the most important foodstuff: Discover the strict limits of the Drinking Water Ordinance as well as testing standards & DVGW certificates for PPR pipe systems.',
    ar: 'مياه الشرب هي أهم مادة غذائية: اكتشف الحدود الصارمة للائحة مياه الشرب بالإضافة إلى معايير الاختبار وشهادات DVGW لأنظمة أنابيب PPR.',
  },
  excerpt: {
    de: 'Trinkwasser ist das wichtigste Lebensmittel: Entdecken Sie die strengen Grenzwerte der Trinkwasserverordnung sowie Prüfstandards & DVGWzertifikate für PPRrohrsysteme.',
    en: 'Drinking water is the most important foodstuff: Discover the strict limits of the Drinking Water Ordinance as well as testing standards & DVGW certificates for PPR pipe systems.',
    ar: 'مياه الشرب هي أهم مادة غذائية: اكتشف الحدود الصارمة للائحة مياه الشرب بالإضافة إلى معايير الاختبار وشهادات DVGW لأنظمة أنابيب PPR.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full overflow-hidden">
      
      {/* 1. Parallax Hero */}
      <section className="-mx-4 md:-mx-8 lg:-mx-16 -mt-8 mb-8">
        <ParallaxHero 
          eyebrow="Lebensmittelechte Qualität"
          title={<>Der Standard für das <br className="hidden md:block"/>wichtigste Lebensmittel</>}
          description="In der technischen Gebäudeausrüstung (TGA) entscheidet das Rohrleitungssystem über die Reinheit des Trinkwassers. K Aqua übertrifft die gesetzlichen Anforderungen der DVGW und internationaler Prüfinstitute um ein Vielfaches."
        >
          <Chip icon={Shield} text="DVGW Zertifiziert" variant="primary" />
          <Chip icon={Globe} text="KIWA / WRAS Zulassungen" variant="primary" />
          <Chip icon={Check} text="Halogenfrei" variant="primary" />
        </ParallaxHero>
      </section>

      {/* 2. Global Certifications & Globe */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow text="Weltweite Anerkennung" />
              <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground mb-6">
                Grenzenlose Sicherheit
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Wasserqualität wird regional unterschiedlich streng reguliert. Die Strategie von K Aqua basiert jedoch nicht auf dem Erfüllen lokaler Mindeststandards, sondern auf der Entwicklung eines Materials, das selbst die extremsten internationalen Restriktionen problemlos unterbietet.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground font-heading">DVGW (Deutschland)</strong>
                    <span className="text-muted-foreground text-sm">Die weltweit strengsten Richtlinien für Trinkwasserhygiene in Gebäuden.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground font-heading">KIWA (Europa)</strong>
                    <span className="text-muted-foreground text-sm">Umfassende Zertifizierung für wasserführende Bauteile und Sanitärsysteme.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <strong className="block text-foreground font-heading">WRAS (Großbritannien)</strong>
                    <span className="text-muted-foreground text-sm">Bestätigt, dass das Material die Wasserqualität in Geschmack und Geruch nicht beeinträchtigt.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative w-full aspect-square bg-card rounded-3xl border border-card-border flex items-center justify-center overflow-hidden">
              <ExportGlobe className="scale-125 opacity-80" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 3. The Data Table: Limits vs Reality */}
      <section className="mt-8">
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Die ungeschönte Wahrheit" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Gesetzliche Grenzwerte im Vergleich
            </h2>
          </div>
          <DataTable>
            <thead>
              <tr>
                <th>Kontaminationsrisiko</th>
                <th>Gesetzlicher Grenzwert (Toleranz)</th>
                <th>Metallrohre (ohne Schutz)</th>
                <th>K Aqua PPR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold text-foreground">Schwermetallmigration (Blei/Kupfer)</td>
                <td>0,01 mg/l (Blei) / 2,0 mg/l (Kupfer)</td>
                <td className="text-destructive">Oft nahe dem Grenzwert bei Stagnation</td>
                <td className="text-primary font-bold">0,00 mg/l (Absolut null)</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Migration von Weichmachern (Phthalate)</td>
                <td>Streng reguliert</td>
                <td>Nicht relevant</td>
                <td className="text-primary font-bold">0% (Material enthält keine Weichmacher)</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">TOC (Total Organic Carbon) Abgabe</td>
                <td>Entwicklungsabhängig, extrem niedrig gefordert</td>
                <td>Keine Abgabe, aber Biofilm Risiko</td>
                <td className="text-primary font-bold">Weit unterhalb der Detektionsgrenze</td>
              </tr>
              <tr>
                <td className="font-semibold text-foreground">Geschmacks- & Geruchsneutralität</td>
                <td>Vollkommene Neutralität vorgeschrieben</td>
                <td>Metallischer Beigeschmack möglich</td>
                <td className="text-primary font-bold">100% geschmacks- und geruchsneutral</td>
              </tr>
            </tbody>
          </DataTable>
        </Reveal>
      </section>

      {/* 4. DeepFAQ for Planners */}
      <section className="mt-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-extrabold font-heading text-foreground mb-4">
                  Expertenbriefing für Fachplaner
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Zertifikate sind das Fundament der Ausschreibung. Hier beantworten wir die kritischsten Detailfragen zur rechtlichen Absicherung Ihrer Trinkwasserinstallation.
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <DeepFAQ 
                items={[
                  {
                    q: "Wie lange sind die HygieneZertifikate gültig?",
                    a: "Hygiene und Materialzertifikate wie die des DVGW unterliegen strengen, periodischen ÜberwachungsAudits (meist alle 3 bis 5 Jahre). K Aqua produziert unter permanenter Fremdüberwachung, was eine lückenlose Verlängerung aller Zulassungen garantiert."
                  },
                  {
                    q: "Besteht bei PPR die Gefahr von MikroplastikAbrieb?",
                    a: "Nein. Polypropylen Random Copolymer (PPR) ist extrem abriebfest. Unter den in der Trinkwasserinstallation üblichen Fließgeschwindigkeiten und Drücken findet keinerlei mechanische Abrasion der Rohrinnenwand statt."
                  },
                  {
                    q: "Muss das System nach der Installation speziell gespült werden?",
                    a: "Es gelten die standardmäßigen Spülprotokolle gemäß DIN EN 806 4 / VDI/DVGW 6023. Da keine chemischen Flussmittel oder Lötpasten verwendet werden (die bei Kupfer aufwendig ausgespült werden müssen), ist der Prozess deutlich schneller und sicherer."
                  },
                  {
                    q: "Kann das Material mit Desinfektionsmitteln behandelt werden?",
                    a: "Ja. Das System ist hochgradig beständig gegen die in der TGA üblichen thermischen und chemischen Desinfektionsverfahren (z.B. zur Bekämpfung von Legionellen), ohne dass das Material versprödet."
                  }
                ]}
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Visual Placeholder */}
      <section>
        <Reveal>
          <PremiumAssetPlaceholder label="Zertifizierungsdokumente und Prüfsiegel: Ein visuelles Array aller internationalen Zulassungen (DVGW, KIWA, ISO)" image="/images/new-k-aqua/about-us.webp" />
        </Reveal>
      </section>

      {/* Deep Technical Analysis */}
      <section className="py-12 prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Die verschärften Anforderungen der Trinkwasserverordnung</h2>
        <p>
          Die aktuelle deutsche Trinkwasserverordnung (TrinkwV) und europäische Richtlinien setzen den Goldstandard für die Trinkwasserhygiene in der technischen Gebäudeausrüstung (TGA). Als zentrales Element der Gebäudeinfrastruktur trägt das Rohrleitungsnetz die ultimative Verantwortung für die Aufrechterhaltung der Wasserqualität vom Hausanschluss bis zur letzten Entnahmestelle. In diesem Kontext haben sich K-Aqua PP-R (Polypropylen-Random-Copolymer) Rohrsysteme als überlegene Lösung etabliert, die die normativen Anforderungen nicht nur erfüllt, sondern systematisch übertrifft.
        </p>
        <p>
          Mit den jüngsten Novellierungen der TrinkwV wurden die Parameter für chemische und mikrobiologische Kontaminationen nochmals verschärft. Dies betrifft insbesondere die strengeren Grenzwerte für Schwermetalle wie Blei, Kupfer und Nickel, die aus traditionellen metallischen Rohrleitungen in das Stagnationswasser migrieren können. K-Aqua PP-R Rohre bieten hierbei einen entscheidenden systemimmanenten Vorteil: Als vollkommen biokompatibler und lebensmittelechter Kunststoff ist PP-R von Natur aus frei von jeglichen Schwermetallen. Eine Migration toxischer Ionen ist physikalisch und chemisch absolut ausgeschlossen. Dies garantiert, dass die Wasserqualität auch nach langen Stagnationsphasen exakt der Qualität entspricht, die vom Wasserversorger eingespeist wurde.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">DVGW-Zertifizierung und internationale Prüfstandards</h3>
        <p>
          Ein Rohrleitungssystem ist nur so gut wie die Zertifikate, die seine Sicherheit nachweisen. Die DVGW-Zertifizierung (Deutscher Verein des Gas- und Wasserfaches) gilt global als eine der härtesten Prüfungen für wasserführende Systeme. K-Aqua durchläuft hierbei nicht nur initiale Baumusterprüfungen, sondern unterliegt einer kontinuierlichen, strengen Fremdüberwachung. Zu den geprüften Parametern gehören unter anderem die Zeitstandfestigkeit, die hygienische Unbedenklichkeit gemäß den KTW-Leitlinien (Kunststoffe im Trinkwasser) sowie das mikrobiologische Verhalten nach dem DVGW-Arbeitsblatt W 270.
        </p>
        <p>
          Die W 270-Prüfung ist besonders kritisch, da sie das Potenzial eines Werkstoffs zur Förderung des mikrobiellen Wachstums (Biofilmbildung) bewertet. Dank der extrem glatten inneren Oberflächenstruktur der K-Aqua PP-R Rohre wird mikrobiologischen Kulturen wie Legionellen oder Pseudomonas aeruginosa der Nährboden und die Anhaftungsmöglichkeit entzogen. Die mikroskopisch glatte Rohrwandung verhindert Inkrustationen und Kalkablagerungen, die in metallischen Rohren typischerweise als Brutstätten für Bakterien dienen.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Halogenfreiheit und chemische Neutralität</h2>
        <p>
          Ein weiterer essenzieller Aspekt moderner TGA-Planung ist die Vermeidung schädlicher Weichmacher, Phthalate oder Halogene. K-Aqua PP-R ist zu 100 % halogenfrei und enthält keinerlei flüchtige organische Verbindungen (VOCs). Im Gegensatz zu bestimmten PVC-Derivaten oder behandelten Kunststoffen, die im Laufe der Zeit potenziell endokrine Disruptoren an das Trinkwasser abgeben könnten, bleibt die polymere Matrix von K-Aqua absolut inert. Diese Inaktivität bedeutet auch, dass das Rohrleitungssystem den Geschmack und Geruch des Wassers in keiner Weise beeinflusst – eine Eigenschaft, die durch die britische WRAS-Zulassung (Water Regulations Advisory Scheme) streng kontrolliert und bescheinigt wird.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Legionellenprävention durch thermische Desinfektion</h3>
        <p>
          Im Falle eines mikrobiologischen Befalls in Bestandsgebäuden ist oft eine thermische Desinfektion erforderlich. Die Normenreihe DIN EN 806 und die VDI/DVGW 6023 beschreiben exakt die Verfahrensweisen. K-Aqua PP-R Systeme sind für hohe Dauertemperaturen ausgelegt und tolerieren die zur thermischen Desinfektion notwendigen Temperaturspitzen (z. B. 70°C bis 80°C) problemlos, ohne dass es zu einer beschleunigten Alterung oder Versprödung des Materials kommt. Die molekulare Struktur des Random-Copolymers sorgt für eine außerordentliche thermische Stabilität.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Planungs- und Rechtssicherheit für TGA-Ingenieure</h2>
        <p>
          Für Fachplaner und ausführende Installateure bedeutet die Wahl des Rohrwerkstoffs eine weitreichende Haftungsfrage. Gemäß der VOB/B und dem BGB haften Planer und Errichter für versteckte Mängel und hygienische Unzulänglichkeiten der Installation. Durch die konsequente Spezifikation von DVGW-, KIWA- und WRAS-zertifizierten K-Aqua PP-R Systemen transferieren Planer dieses Risiko auf eine belegbar sichere Plattform. Die lückenlose Dokumentation und Chargenrückverfolgbarkeit jedes einzelnen Rohr- und Formteils bieten im Streitfall oder bei Hygieneaudits den notwendigen juristischen Rückhalt. 
        </p>
        <p>
          Die Integration von K-Aqua PP-R in die Planungswerkzeuge (wie BIM) ermöglicht zudem eine präzise hydraulische Berechnung. Die dauerhaft glatte Innenoberfläche garantiert einen konstant niedrigen Druckverlust über die gesamte Lebensdauer des Gebäudes, was eine Überdimensionierung der Pumpen überflüssig macht und die Strömungsgeschwindigkeiten im optimalen hygienischen Bereich hält. So verschmelzen gesetzliche Konformität, höchste Wasserhygiene und nachhaltige Anlagenplanung zu einem perfekten Gesamtsystem.
        </p>
        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Der Einfluss von Stagnation und Spülprotokollen</h3>
        <p>
          Die DIN 1988-200 und weitere einschlägige Normwerke legen detailliert fest, wie Stagnationswasser zu handhaben ist. Da sich Stagnation im realen Gebäudebetrieb – etwa in Hotels, Krankenhäusern oder Schulen während der Ferienzeiten – nie vollständig vermeiden lässt, muss die Wechselwirkung zwischen stehendem Wasser und der Rohrwandung auf ein absolutes Minimum reduziert werden. Genau hier entfaltet PP-R seine größte Stärke. Während bei Kupferleitungen Stagnationsphasen zu einer signifikanten Anreicherung von Kupferionen führen können, die insbesondere für Säuglinge toxisch wirken, bleibt die Wasserbeschaffenheit in K-Aqua Leitungen unangetastet. Auch die Integration automatischer Spülstationen, die von den Normen zunehmend gefordert werden, funktioniert in Verbindung mit PP-R Systemen hervorragend. Die hydraulischen Eigenschaften bleiben konstant, da es im Gegensatz zu verzinkten Stahlrohren weder zu Korrosionsknollen noch zu lokaler Lochfraßkorrosion kommen kann. Ein Rohrleitungsausfall durch Sauerstoffkorrosion ist bei K-Aqua PP-R naturgemäß ausgeschlossen.
        </p>
        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Nachhaltigkeit und ökologische Zertifizierungen im Kontext der TGA</h2>
        <p>
          Neben der reinen Trinkwasserhygiene rücken auch die Lebenszyklusanalysen (LCA) von Bauprodukten zunehmend in den Fokus von Gebäudezertifizierungen wie DGNB, LEED oder BREEAM. K-Aqua PP-R punktet hier durch eine außergewöhnlich energieeffiziente Herstellung im Vergleich zu Metallrohren. Die Einschmelzung und Extrusion von Polypropylen erfordert nur einen Bruchteil der Energie, die für die Verhüttung von Kupfer- oder Eisenerz notwendig ist. Überdies ist PP-R am Ende seiner extrem langen Lebensdauer (von 50 bis über 100 Jahren unter Standardbedingungen) vollständig werkstofflich recycelbar. Diese ganzheitliche Betrachtung macht das System nicht nur zu einem Champion der Wasserhygiene, sondern auch der ökologischen Bauweise. Zusammenfassend lässt sich sagen, dass die Entscheidung für K-Aqua PP-R nicht nur eine Frage der Einhaltung aktueller Trinkwasserverordnungen ist, sondern eine proaktive Investition in die Gesundheit der Gebäudenutzer, die juristische Sicherheit der Planer und die ökologische Nachhaltigkeit moderner Architektur.
        </p>
      </section>

      {/* Conclusion */}
      <section className="pb-12">
        <Reveal>
          <div className="bg-card border border-card-border p-10 lg:p-16 rounded-3xl flex flex-col items-center text-center">
            <h2 className="text-3xl font-extrabold font-heading text-foreground mb-6">
              Verantwortung endet nicht am Wasserzähler
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Die Reinheit des Wassers zu bewahren, ist die oberste Pflicht jedes TGA Planers und Installateurs. Mit einem zertifizierten PPRsystem von K Aqua übergeben Sie dem Bauherrn nicht nur ein dichtes Rohrnetz, sondern die rechtliche und moralische Sicherheit, dass die Trinkwasserqualität unangetastet bleibt.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
