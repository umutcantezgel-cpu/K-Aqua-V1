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
    de: 'ISO 9001, 14001 & 50001 Zertifizierung',
    en: 'ISO 9001, 14001 & 50001 Certification',
    ar: 'شهادات ISO 9001 و 14001 و 50001',
  },
  teaser: {
    de: 'Das integrierte ISO Managementsystem der KWT GmbH umfasst ISO 9001, 14001 und 50001 für PPRrohrsysteme – DAkkS-akkreditiert, nach höchsten Industriestandards geprüft und zertifiziert.',
    en: 'The integrated ISO management system of KWT GmbH encompasses ISO 9001, 14001, and 50001 for PPR piping systems – DAkkS-accredited, tested and certified according to the highest industry standards.',
    ar: 'يشتمل نظام إدارة ISO المتكامل لشركة KWT GmbH على معايير ISO 9001 و14001 و50001 لأنظمة أنابيب PPR – وهو معتمد من DAkkS، ومختبر ومصادق عليه وفقاً لأعلى المعايير الصناعية.',
  },
  content: (
    <div className="flex flex-col gap-16 lg:gap-24 w-full">
      {/* Intro Section */}
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

      {/* The Necessity Section */}
      <section>
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mb-6 text-foreground leading-tight">
                Die absolute Notwendigkeit kompromissloser Standards
              </h2>
              <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                Die Produktion von Rohrleitungssystemen für Trinkwasser und industrielle Anwendungen verzeiht absolut keine Fehler. Ein Rohr, das tief in der Wand eines Hochhauses oder unter der Bodenplatte einer Industrieanlage verbaut wird, muss Jahrzehnte überdauern. Jeglicher Defekt führt nicht nur zu massiven finanziellen Schäden durch Wasseraustritt, sondern gefährdet im schlimmsten Fall auch die Gesundheit der Nutzer durch Kontamination.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Daher reicht es nicht aus, sich lediglich auf die gute Qualität der verwendeten Rohstoffe zu verlassen. Es bedarf eines tiefgreifenden, systematischen und vollumfänglichen Ansatzes, der jeden einzelnen Schritt im Unternehmen durchdringt. Genau hier setzen die internationalen ISO Normen an.
              </p>
            </div>
            <div className="h-full min-h-[400px]">
              <PremiumAssetPlaceholder label="Extrusionsanlage KWT GmbH" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* The Magic Triangle - Bento Grid */}
      <section>
        <Reveal>
          <div className="text-center mb-12">
            <Eyebrow text="Das magische Dreieck" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Drei Säulen der Perfektion
            </h2>
          </div>
          <BentoGrid className="max-w-full mx-auto">
            <BentoGridItem
              title="ISO 9001"
              description="Qualitätsmanagement auf dem allerhöchsten industriellen Niveau. Null Fehler Toleranz in der Produktion."
              header={<div className="w-full h-32 bg-primary/10 rounded-t-2xl flex items-center justify-center"><Shield className="w-16 h-16 text-primary opacity-50" /></div>}
              icon={<Shield className="h-6 w-6 text-primary" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="ISO 14001"
              description="Konsequenter Umweltschutz, geschlossene Wasserkreisläufe und absolute Vermeidung von Produktionsabfällen."
              header={<div className="w-full h-32 bg-accent/10 rounded-t-2xl flex items-center justify-center"><Leaf className="w-16 h-16 text-accent opacity-50" /></div>}
              icon={<Leaf className="h-6 w-6 text-accent" />}
              className="md:col-span-1"
            />
            <BentoGridItem
              title="ISO 50001"
              description="Maximale Energieeffizienz durch modernste Antriebstechnik und intelligente Wärmerückgewinnung."
              header={<div className="w-full h-32 bg-blue-500/10 rounded-t-2xl flex items-center justify-center"><Factory className="w-16 h-16 text-blue-500 opacity-50" /></div>}
              icon={<Factory className="h-6 w-6 text-blue-500" />}
              className="md:col-span-1"
            />
          </BentoGrid>
        </Reveal>
      </section>

      {/* Deep Dive Quality (Sticky Scroll) */}
      <section className="mt-12">
        <Reveal>
          <div className="mb-8">
            <Eyebrow text="Deep Dive ISO 9001" />
            <h2 className="text-3xl lg:text-4xl font-extrabold font-heading mt-4 text-foreground">
              Das Fundament unserer Qualitätssicherung
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Die ISO 9001 ist die weltweit bekannteste Norm für Qualitätsmanagementsysteme. Für uns ist sie der schriftliche Beweis für unsere gelebte Null Fehler Toleranz.
            </p>
          </div>
        </Reveal>
        <StickyScrollReveal
          content={[
            {
              title: "Eingangskontrolle der Rohmaterialien",
              description: "Qualität beginnt lange bevor das Granulat den Extruder erreicht. Jeder einzelne angelieferte Big Bag mit Polypropylen Granulat durchläuft eine rigorose Eingangskontrolle in unserem hauseigenen Labor. Wir messen den Schmelzindex, prüfen die thermische Stabilität und verifizieren die absolute Reinheit des Materials. Nur Chargen, die unsere internen Vorgaben zu hundert Prozent erfüllen, werden für die Produktion freigegeben.",
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

      {/* Stats Band */}
      <section className="py-12">
        <StatBand 
          stats={[
            { n: "100", u: "%", l: "Recycling der Produktionsabfälle" },
            { n: "0", u: "", l: "Toleranz bei Qualitätsabweichungen" },
            { n: "3", u: "x", l: "Zertifizierte Managementsysteme" },
          ]} 
          cols={250}
        />
      </section>

      {/* Deep Dive Environment */}
      <section>
        <Reveal>
          <Card className="p-8 lg:p-12 border-accent/20 bg-accent/5">
            <Eyebrow text="Deep Dive ISO 14001" className="text-accent" />
            <h2 className="text-3xl font-extrabold font-heading mt-4 mb-8 text-foreground">
              Verantwortung für unsere Umwelt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold font-heading mb-3">Geschlossene Wasserkreisläufe</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Die Extrusion von Rohren erfordert große Mengen an Wasser, um den heißen Kunststoffstrang schonend abzukühlen. Wir haben massiv in geschlossene Kühlwassersysteme investiert. Das Wasser wird aufgefangen, gefiltert, abgekühlt und sofort wieder eingespeist.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading mb-3">Vermeidung von Produktionsabfällen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Ausschuss, der nicht den optischen Ansprüchen genügt, wird nicht weggeworfen. Es wird sortenrein geschreddert und direkt wieder als wertvoller Rohstoff in den Produktionskreislauf zurückgeführt. Dies entspricht der perfekten Kreislaufwirtschaft.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>

      {/* Deep Dive Energy */}
      <section>
        <Reveal>
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <PremiumAssetPlaceholder label="Wärmerückgewinnungsanlage" />
            </div>
            <div className="w-full lg:w-1/2">
              <Eyebrow text="Deep Dive ISO 50001" />
              <h2 className="text-3xl font-extrabold font-heading mt-4 mb-6 text-foreground">
                Maximale Energieeffizienz
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">Moderne Antriebstechnik</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unsere Extrusionslinien sind mit den energieeffizientesten Motoren der höchsten Effizienzklasse ausgestattet. Frequenzumrichter sorgen dafür, dass die Motoren exakt nur so viel Strom aufnehmen, wie zwingend erforderlich ist.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">Intelligente Wärmerückgewinnung</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Die Abwärme der Rohre verpufft nicht nutzlos. Wir nutzen intelligente Wärmetauschersysteme, um diese thermische Energie zurückzugewinnen und damit unsere Hallen im Winter zu heizen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Compliance & Conclusion */}
      <section className="bg-card border border-card-border rounded-3xl p-8 lg:p-12 mb-12">
        <Reveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold font-heading text-foreground">
                Die harte Arbeit hinter dem DAkkS Zertifikat
              </h2>
              <p className="text-muted-foreground mt-1">Was das für Einkauf und Compliance bedeutet</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg text-muted-foreground leading-relaxed">
            <p>
              Eine Zertifizierung durch eine DAkkS akkreditierte Stelle bekommt man nicht geschenkt. Die Deutsche Akkreditierungsstelle bürgt für absolute Unabhängigkeit und höchste Prüfstandards. Monatelang haben wir jede einzelne Arbeitsanweisung, jede Checkliste und jedes Formular hinterfragt und digitalisiert. Die externen Auditoren haben mehrere Tage lang unser komplettes Unternehmen auf den Kopf gestellt.
            </p>
            <p>
              Für den strategischen Einkauf großer Baukonzerne und für interne Compliance Abteilungen bedeutet diese Zertifizierung ein absolutes Höchstmaß an Sicherheit. Besonders bei öffentlichen Ausschreibungen sind nachgewiesene Umwelt und Energiestandards heute ein hartes Ausschlusskriterium. Mit K Aqua als Partner erfüllen Sie diese Anforderungen automatisch und sichern sich wertvolle Wettbewerbsvorteile.
            </p>
          </div>
        </Reveal>
      </section>

    </div>
  ),
};
