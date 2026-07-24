import React from 'react';
import { NewsPost } from './index';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { StatBand } from '@/components/ui/StatBand';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Card } from '@/components/ui/Card';
import { Shield, Leaf, Factory, Award } from '@/components/ui/icon';

export const isoZertifizierung: NewsPost = {
  slug: 'iso-zertifizierung-qualitaet-umwelt-energie',
  date: 'Oktober 2025',
  tag: 'Unternehmen',
  title: {
    de: 'ISO 9001, 14001 & 50001 Zertifizierung: Exzellenz in Qualität, Umwelt und Energie',
    en: 'ISO 9001, 14001 & 50001 Certification',
    ar: 'شهادات ISO 9001 و 14001 و 50001',
  },
  teaser: {
    de: 'Das integrierte ISO Managementsystem der KWT GmbH umfasst ISO 9001, 14001 und 50001 für PPR-Rohrsysteme – DAkkS-akkreditiert, nach höchsten Industriestandards geprüft und zertifiziert.',
    en: 'The integrated ISO management system of KWT GmbH encompasses ISO 9001, 14001, and 50001 for PPR piping systems – DAkkS-accredited, tested and certified according to the highest industry standards.',
    ar: 'يشتمل نظام إدارة ISO المتكامل لشركة KWT GmbH على معايير ISO 9001 و14001 و50001 لأنظمة أنابيب PPR – وهو معتمد من DAkkS، ومختبر ومصادق عليه وفقاً لأعلى المعايير الصناعية.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      
      <section className="relative">
        <Reveal>
          <div className="bg-card/50 backdrop-blur-sm border border-card-border p-8 lg:p-12 rounded-3xl shadow-soft">
            <Eyebrow text="Der Standard der Industrie" className="mb-6" />
            <p className="text-xl lg:text-2xl font-medium text-foreground leading-relaxed text-balance">
              Seit Oktober 2025 ist das integrierte Managementsystem der KWT GmbH offiziell dreifach geprüft und nach den allerhöchsten internationalen Maßstäben zertifiziert. Die umfassenden Zertifizierungen beinhalten ISO 9001 für ein exzellentes Qualitätsmanagement, ISO 14001 für ein zukunftsorientiertes Umweltmanagement und ISO 50001 für ein hocheffizientes Energiemanagement. Die ausgestellten Zertifikate stammen von einer höchst renommierten und DAkkS akkreditierten Zertifizierungsgesellschaft und besitzen volle Gültigkeit bis Oktober 2028.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Extended Text Section for SEO > 500 words */}
      <section>
        <Reveal>
          <div className="max-w-4xl mx-auto px-4 lg:px-0 prose prose-lg dark:prose-invert text-muted-foreground">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">Warum wir uns den strengsten Normen der Welt unterwerfen</h2>
            <p className="mb-4">
              Die Produktion von hochbelastbaren Rohrleitungssystemen für den globalen Markt ist kein Geschäft für Kompromisse. Ein Kunststoffrohr, das tief in den Versorgungsschächten eines fünfzigstöckigen Wolkenkratzers, unter den massiven Betonplatten einer Industrieanlage oder in hygienisch hochsensiblen Bereichen eines Krankenhauses verbaut wird, muss nicht nur Jahre, sondern viele Jahrzehnte fehlerfrei funktionieren.
            </p>
            <p className="mb-4">
              Jeder noch so winzige Materialfehler, jede Nachlässigkeit in der Extrusion oder Toleranzabweichung beim Schmelzindex kann katastrophale Folgen haben. Ein Rohrbruch oder eine Leckage führt nicht nur zu massiven finanziellen Schäden und potenziellen Betriebsunterbrechungen, sondern gefährdet im schlimmsten Fall auch die Trinkwasserhygiene und damit die menschliche Gesundheit. Um solch existenzielle Risiken zu eliminieren, reicht Vertrauen allein nicht aus – es bedarf belegbarer, streng kontrollierter und kontinuierlich auditierter Prozesse. Hier bilden die Normen der International Organization for Standardization (ISO) das Fundament unseres Handelns.
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">ISO 9001: Das unerbittliche Qualitätsmanagement</h3>
            <p className="mb-4">
              Die ISO 9001 ist weit mehr als nur ein Handbuch in einem Regal; sie ist die DNA unserer täglichen Produktionsabläufe. Sie schreibt ein prozessorientiertes Managementsystem vor, das alle Schritte von der Lieferantenqualifizierung über die Eingangskontrolle der Rohstoffe bis hin zur Endprüfung der fertigen Rohre lückenlos dokumentiert. Wir haben unsere Produktionslinien mit hochpräziser Ultraschall-Messtechnik ausgestattet, die den Rohrquerschnitt in Echtzeit 360-Grad überwacht. Weicht die Wandstärke auch nur im Mikrometerbereich ab, stoppt der Prozess. Die Zertifizierung garantiert, dass dieses Level an Präzision kein Zufall ist, sondern systematischer Standard.
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">ISO 14001: Aktiver Umweltschutz im industriellen Maßstab</h3>
            <p className="mb-4">
              Industrielle Fertigung und ökologische Verantwortung dürfen keine Gegensätze sein. Mit der Implementierung der ISO 14001 verpflichten wir uns zu einem systematischen Umweltmanagement. Das bedeutet konkret: Die Reduzierung des Wasserverbrauchs durch komplett geschlossene Kühlkreisläufe, die strikte Vermeidung von Emissionen in der Produktion sowie die Einhaltung höchster Standards beim Recycling. Jeder Polypropylen-Überschuss wird sortenrein geschreddert und wieder dem Kreislauf für nicht-trinkwasserführende Anwendungen zugeführt. So minimieren wir unseren ökologischen Fußabdruck erheblich und leisten einen aktiven Beitrag zum Erhalt unseres Planeten.
            </p>
            <h3 className="text-2xl font-bold text-foreground mt-8 mb-3">ISO 50001: Energiemanagement für die Zukunft</h3>
            <p className="mb-4">
              Kunststoffextrusion ist ein energieintensiver Prozess. Granulat muss geschmolzen und anschließend kontrolliert wieder abgekühlt werden. Die ISO 50001 Norm fordert von uns die kontinuierliche Analyse und Verbesserung unserer energiebezogenen Leistung. Das Resultat: Wir setzen ausschließlich modernste Extrudermotoren der höchsten Effizienzklasse ein, gesteuert durch intelligente Frequenzumrichter. Zudem nutzen wir hochkomplexe Wärmerückgewinnungssysteme, die die Abwärme der Maschinenanlagen aufnehmen und in das Heizsystem unserer Produktionshallen einspeisen. Jeder eingesparte Kilowatt Strom senkt nicht nur unsere Produktionskosten, sondern reduziert aktiv den globalen CO2-Ausstoß.
            </p>
            <h4 className="text-xl font-semibold text-foreground mt-6 mb-2">Die Bedeutung der DAkkS-Akkreditierung für unsere Partner</h4>
            <p>
              Nicht jedes Zertifikat ist gleich viel wert. Unsere Zertifizierungen sind durch die Deutsche Akkreditierungsstelle (DAkkS) überwacht. Für unsere Kunden – Baukonzerne, TGA-Planer und Architekten – ist das entscheidend. Bei öffentlichen Ausschreibungen und Großprojekten im internationalen Rahmen (wie LEED- oder DGNB-zertifizierten Green Buildings) ist ein gültiger, akkreditierter Nachweis dieser Normen eine Grundvoraussetzung für die Auftragsvergabe. Mit K-Aqua als Partner sind Sie hier rechtlich und qualitativ immer auf der sicheren Seite.
            </p>
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mb-6 text-foreground leading-tight">
                Die absolute Notwendigkeit kompromissloser Standards in der Extrusion
              </h2>
              <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                Wie bereits im Detail erläutert, verzeiht die Herstellung hochwertiger Rohrleitungssysteme absolut keine Schwankungen. Ein tief im Fundament integriertes Rohr muss über 50 Jahre lang Druck und Temperatur standhalten.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Der systematische Ansatz, der jeden Schritt von der Materialanlieferung bis zum Versand durchdringt, wird durch unsere externen Auditoren jährlich gnadenlos geprüft. Ein kontinuierlicher Verbesserungsprozess (KVP) sichert dabei, dass wir uns niemals auf Erreichtem ausruhen.
              </p>
            </div>
            <div className="h-full min-h-[400px]">
              <PremiumAssetPlaceholder label="Extrusionsanlage KWT GmbH" video="/videos/factory.mp4" />
            </div>
          </div>
        </Reveal>
      </section>

      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Das magische Dreieck" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Drei Säulen der industriellen Perfektion
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="ISO 9001"
              description="Qualitätsmanagement auf dem allerhöchsten industriellen Niveau. Null Fehler Toleranz in der Produktion. Rückverfolgbarkeit jeder einzelnen Charge."
              header={<div className="w-full h-32 bg-primary/10 rounded-t-2xl flex items-center justify-center"><Shield className="w-16 h-16 text-primary opacity-50" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="ISO 14001"
              description="Konsequenter Umweltschutz, geschlossene Wasserkreisläufe zur Kühlung und absolute Minimierung von Produktionsabfällen durch smarte Logistik."
              header={<div className="w-full h-32 bg-accent/10 rounded-t-2xl flex items-center justify-center"><Leaf className="w-16 h-16 text-accent opacity-50" /></div>}
              icon={<Leaf className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="ISO 50001"
              description="Maximale Energieeffizienz durch modernste Antriebstechnik, Spitzenlastkappung und intelligente, automatisierte Wärmerückgewinnungssysteme."
              header={<div className="w-full h-32 bg-blue-500/10 rounded-t-2xl flex items-center justify-center"><Factory className="w-16 h-16 text-blue-500 opacity-50" /></div>}
              icon={<Factory className="h-6 w-6 text-blue-500" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </Reveal>
      </section>

      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Deep Dive ISO 9001" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Das Fundament unserer Qualitätssicherung
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Die ISO 9001 ist die weltweit bekannteste Norm für Qualitätsmanagementsysteme. Für uns ist sie der schriftliche Beweis für unsere gelebte Null-Fehler-Toleranz bei K-Aqua Produkten.
            </p>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Eingangskontrolle der Rohmaterialien",
              description: "Qualität beginnt lange bevor das Granulat den Extruder erreicht. Jeder einzelne angelieferte Big Bag mit Polypropylen-Granulat durchläuft eine rigorose Eingangskontrolle in unserem hauseigenen Labor. Wir messen den Schmelzindex, prüfen die thermische Stabilität und verifizieren die absolute Reinheit des Materials. Nur Chargen, die unsere internen Vorgaben zu hundert Prozent erfüllen, werden für die Produktion freigegeben.",
              content: <div className="h-full w-full bg-card flex items-center justify-center text-primary"><Shield className="w-32 h-32 opacity-20" /></div>
            },
            {
              title: "Prozessüberwachung in Echtzeit",
              description: "Während der Extrusion überlassen wir absolut nichts dem Zufall. Modernste Ultraschallsensoren scannen das Rohr im Bruchteil einer Sekunde. Sie messen kontinuierlich die Wandstärke, den Außendurchmesser und die exakte Rundheit. Sollte ein Parameter auch nur um Zehntelmillimeter von der Vorgabe abweichen, greift die vollautomatisierte Steuerung sofort ein und korrigiert die Einstellungen des Extruders.",
              content: <div className="h-full w-full bg-card flex items-center justify-center text-primary"><Factory className="w-32 h-32 opacity-20" /></div>
            },
            {
              title: "Zerstörende Werkstoffprüfung",
              description: "Neben der zerstörungsfreien Ultraschallprüfung entnehmen unsere Qualitätstechniker regelmäßig physische Proben aus der laufenden Produktion. Diese Proben werden im Labor extremen Belastungen ausgesetzt. Wir simulieren jahrzehntelange Nutzung unter maximalem Druck und höchsten Temperaturen im Zeitrafferverfahren. Erst wenn ein Rohr diese brutalen Stresstests unbeschadet übersteht, erhält die Charge das finale grüne Licht.",
              content: <div className="h-full w-full bg-card flex items-center justify-center text-primary"><Shield className="w-32 h-32 opacity-20" /></div>
            }
          ]}
        />
      </section>

      <section className="py-12">
        <StatBand 
          stats={[
            { n: "100", u: "%", l: "Recycling der Produktionsabfälle in Nebenkreisläufen" },
            { n: "0", u: "", l: "Toleranz bei Qualitätsabweichungen der Wandstärke" },
            { n: "3", u: "x", l: "Zertifizierte ISO Managementsysteme" },
          ]} 
          cols={250}
        />
      </section>

      <section>
        <Reveal>
          <Card className="p-8 lg:p-12 border-accent/20 bg-accent/5">
            <Eyebrow text="Deep Dive ISO 14001 & 50001" className="text-accent" />
            <h2 className="text-3xl font-extrabold font-heading mt-4 mb-8 text-foreground">
              Verantwortung für Umwelt und Energieressourcen
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold font-heading mb-3">Geschlossene Wasserkreisläufe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Die Extrusion von Rohren erfordert große Mengen an Wasser, um den heißen Kunststoffstrang schonend abzukühlen. Wir haben massiv in geschlossene Kühlwassersysteme investiert. Das Wasser wird aufgefangen, gefiltert, abgekühlt und sofort wieder eingespeist, was den Frischwasserbedarf auf ein absolutes Minimum reduziert.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading mb-3">Intelligente Wärmerückgewinnung</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Die Abwärme der Rohre und Maschinen verpufft nicht nutzlos. Wir nutzen moderne Wärmetauschersysteme, um diese thermische Energie zurückzugewinnen. Im Winter decken wir damit einen signifikanten Teil des Heizbedarfs unserer Produktions- und Bürogebäude. Ein Kernaspekt der ISO 50001 Umsetzung.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      <section className="bg-card border border-card-border rounded-3xl p-8 lg:p-12 mb-12 mt-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-foreground">
                Die harte Arbeit hinter dem DAkkS Zertifikat
              </h2>
              <p className="text-muted-foreground mt-1">Was das für Ihren strategischen Einkauf bedeutet</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg text-muted-foreground leading-relaxed">
            <p>
              Eine Zertifizierung durch eine DAkkS akkreditierte Stelle bekommt man nicht geschenkt. Die Deutsche Akkreditierungsstelle bürgt für absolute Unabhängigkeit und höchste Prüfstandards. Monatelang haben wir jede einzelne Arbeitsanweisung, jede Checkliste und jedes Formular hinterfragt, auditiert und digitalisiert. Die externen Auditoren haben mehrere Tage lang unser komplettes Unternehmen auf Herz und Nieren geprüft.
            </p>
            <p>
              Für den strategischen Einkauf großer Baukonzerne und für interne Compliance-Abteilungen bedeutet diese Zertifizierung ein absolutes Höchstmaß an Sicherheit. Besonders bei öffentlichen Ausschreibungen sind nachgewiesene Umwelt- und Energiestandards heute ein hartes Ausschlusskriterium. Mit K-Aqua als zuverlässigem Partner erfüllen Sie diese strengen Anforderungen automatisch und sichern sich so wertvolle Wettbewerbsvorteile im Markt.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
