import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Hammer, Flame, Link, Wrench } from "@/components/ui/icon";

export const altbausanierungFlexibilitaet: NewsPost = {
  slug: "altbausanierung-rohrleitungen-flexibilitaet-ppr-schnelle-verlegung",
  title: {
    de: "Altbausanierung mit PPR Rohrsystemen",
    en: "Old Building Renovation with PPR Pipe Systems",
    ar: "تجديد المباني القديمة باستخدام أنظمة أنابيب PPR"
  },
  date: "2024-12-05",
  excerpt: {
    de: "Enge Schächte, schiefe Wände und strenge Brandschutzvorgaben machen die Strangsanierung im Altbau anspruchsvoll. PPR Rohrsysteme von K Aqua bieten durch ihr geringes Gewicht und die flammenlose Verschweißung entscheidende Vorteile für Handwerk und Gebäudeplanung.",
    en: "Narrow shafts, crooked walls, and strict fire protection regulations make riser renovation in old buildings demanding. Thanks to their low weight and flameless welding, K Aqua PPR pipe systems offer decisive advantages for trades and building planning.",
    ar: "تُعد عمليات تجديد الأنابيب الصاعدة في المباني القديمة مهمة شاقة بسبب الآبار الضيقة والجدران المائلة ولوائح الحماية من الحرائق الصارمة. توفر أنظمة أنابيب PPR من K Aqua مزايا حاسمة للحرفيين ومخططي المباني بفضل وزنها الخفيف ولحامها بدون لهب."
  },
  coverImage: "/images/news/old-building-renovation.jpg",
  category: "Sanierung",
  tags: ["Altbausanierung", "Strangsanierung", "Brandschutz", "Mischinstallation", "PPR", "Rohrsysteme", "Flexibilität"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Hammer className="w-5 h-5" />
                  <span>Sanierung & Modernisierung</span>
                </div>
              }
              title="Die intelligente Lösung für den Bestand"
              lead="Die Sanierung historischer Gebäude oder alter Mehrfamilienhäuser ist oft ein logistischer Albtraum. Enge, verwinkelte Versorgungsschächte und der laufende Betrieb fordern Installateuren alles ab. Wer hier schwere Cstahlrohre über Treppenhäuser schleppt und im Schacht mit offenem Feuer lötet, verliert Zeit und riskiert Brände. K Aqua PPR bietet die leichte, flexible und absolut brandsichere Alternative für die moderne Strangsanierung."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Baupläne und neue Rohrtrassen */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Argumente für PPR im Altbau */}
      <Reveal>
        <SectionHead
          title="Problemlöser auf der Baustelle"
          lead="Warum Handwerker bei der Altbausanierung auf Kunststoff setzen."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Keine offene Flamme",
                description: "Der Brandschutz ist bei Sanierungen extrem kritisch, besonders in trockenen Holzständerwerken oder alten Schächten. Das Muffenschweißen von K Aqua erfordert nur ein elektrisches Heizwerkzeug – keine Gasflamme, keine Funken, kein Brandrisiko."
              },
              {
                title: "2. Leichtes Handling",
                description: "Ein 4 Meter Stahlrohr im vierten Stock ohne Aufzug zu manövrieren, ist ein Kraftakt. PPR Rohre wiegen nur einen Bruchteil davon, was die körperliche Belastung der Installateure drastisch senkt und den Baufortschritt beschleunigt."
              },
              {
                title: "3. Flexibilität bei Setzungen",
                description: "Altbauten haben sich oft gesetzt, Wände sind selten exakt gerade. Kunststoffrohre verzeihen leichte Spannungen und lassen sich in engen Nischen deutlich leichter führen als starre Metallrohre."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StickyScrollReveal: Der Sanierungsablauf */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "1. Demontage & Bestandsaufnahme",
                description: "Nachdem alte Bleirohre oder stark korrodierte verzinkte Stahlrohre entfernt wurden, offenbaren Schächte oft unregelmäßige Maße. Hier spielt PPR seine Flexibilität bei der Neuplanung der Trassen voll aus.",
                icon: <Wrench className="w-8 h-8 text-primary" />
              },
              {
                title: "2. Die Steigleitungserneuerung",
                description: "Das geringe Eigengewicht ermöglicht es, auch längere Rohrsegmente problemlos vertikal in den Schacht einzuführen. Die Schweißverbindungen können vorab als Baugruppe (Prefabrication) erstellt werden.",
                icon: <Link className="w-8 h-8 text-primary" />
              },
              {
                title: "3. Etagenanbindung & Wohnungsstationen",
                description: "Auf der Etage ist der Platz meist am knappsten. Die kompakten K Aqua Schweißwerkzeuge erlauben auch Verbindungen in sehr engen Vorwandinstallationen oder abgehängten Decken.",
                icon: <Hammer className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Mischinstallationen */}
      <Reveal>
        <SectionHead
          title="Mischinstallationen im Bestand"
          lead="Wie K Aqua nahtlos an alte Rohrsysteme anbindet."
        />
        <DeepFAQ
          items={[
            {
              q: "Darf ich PPR mit alten Kupferleitungen mischen?",
              a: "Ja, absolut. Im Gegensatz zur Fließregel bei unterschiedlichen Metallen (Kupfer darf in Fließrichtung nicht vor verzinktem Stahl liegen) ist PPR völlig inert. Mit K Aqua Übergangsfittings aus entzinkungsfreiem Messing ist die Anbindung problemlos möglich."
            },
            {
              q: "Was passiert mit Druckstößen im alten Netz?",
              a: "Alte Netze neigen oft zu Wasserschlägen, z.B. durch schnell schließende Armaturen. PPR absorbiert und dämpft diese Druckstöße besser als Metall, was alte, empfindliche Armaturen im Bestandsnetz schont."
            },
            {
              q: "Wie überbrücke ich alte, dicke Stahlrohre?",
              a: "K Aqua bietet ein umfangreiches Sortiment an Gewindeübergängen und Flanschverbindungen. So können Sie von großen Stahlverteilern direkt auf das moderne PPR System reduzieren und sicher weiterbauen."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Sanierungsfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Brandgefahr bei der Montage durch den völligen Verzicht auf offene Gasbrenner." },
              { n: "50", u: "%", l: "Potenzielle Zeitersparnis bei der Montage im Vergleich zu geschraubten und gedichteten Stahlrohren." },
              { n: "100", u: "%", l: "Kompatibel mit allen gängigen Metallsystemen über unsere Spezialfittings." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Sanierungssupport */}
      <Reveal>
        <CTABand
          title="Planen Sie die Strangsanierung eines Mehrfamilienhauses?"
          subtitle="Überlassen Sie uns die Materialplanung. Wir helfen Ihnen, die optimalen Rohrdimensionen für den Bestand zu berechnen und die passenden Übergangsfittings auszuwählen."
          buttonText="Beratung zur Sanierung"
          buttonLink="/kontakt"
          icon={<Flame className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
