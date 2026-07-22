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
          <PremiumAssetPlaceholder label="Zertifizierungsdokumente und Prüfsiegel: Ein visuelles Array aller internationalen Zulassungen (DVGW, KIWA, ISO)" />
        </Reveal>
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
