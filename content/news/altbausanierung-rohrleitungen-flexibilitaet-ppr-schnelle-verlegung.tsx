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
    de: "Altbausanierung mit PPR Rohrsystemen: Flexibilität und schnelle Verlegung",
    en: "Old Building Renovation with PPR Pipe Systems",
    ar: "تجديد المباني القديمة باستخدام أنظمة أنابيب PPR"
  },
  date: "2024-12-05",
  excerpt: {
    de: "Die Sanierung von Altbauten stellt Bauherren und Handwerker vor massive Herausforderungen. Enge Schächte, schiefe Wände und strenge Brandschutzvorgaben machen die herkömmliche Strangsanierung anspruchsvoll. PPR Rohrsysteme von K Aqua bieten durch ihr geringes Gewicht, herausragende Flexibilität und die flammenlose Verschweißung entscheidende Vorteile. Erfahren Sie hier tiefgehende technische Einblicke, warum PP-R (Polypropylen Random-Copolymer) bei der Modernisierung von Leitungssystemen im Gebäudebestand die erste Wahl ist und wie sich Bauzeiten sowie Kosten deutlich reduzieren lassen.",
    en: "Narrow shafts, crooked walls, and strict fire protection regulations make riser renovation in old buildings demanding. Thanks to their low weight and flameless welding, K Aqua PPR pipe systems offer decisive advantages for trades and building planning.",
    ar: "تُعد عمليات تجديد الأنابيب الصاعدة في المباني القديمة مهمة شاقة بسبب الآبار الضيقة والجدران المائلة ولوائح الحماية من الحرائق الصارمة. توفر أنظمة أنابيب PPR من K Aqua مزايا حاسمة للحرفيين ومخططي المباني بفضل وزنها الخفيف ولحامها بدون لهب."
  },
  coverImage: "/images/news/old-building-renovation.jpg",
  category: "Sanierung",
  tags: ["Altbausanierung", "Strangsanierung", "Brandschutz", "Mischinstallation", "PPR", "Rohrsysteme", "Flexibilität"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
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
              title="Die intelligente Lösung für den Gebäudebestand: PP-R Rohrleitungssysteme"
              lead="Die Sanierung historischer Gebäude oder alter Mehrfamilienhäuser ist oft ein logistischer und technischer Albtraum. Enge, verwinkelte Versorgungsschächte, asymmetrische Grundrisse und der laufende Betrieb fordern Installateuren alles ab. Wer hier schwere C-Stahlrohre oder Kupferleitungen über Treppenhäuser schleppt und im engen Schacht mit offenem Feuer lötet oder schweißt, verliert wertvolle Zeit und riskiert folgenschwere Brände. PP-R (Polypropylen Random-Copolymer) von K Aqua bietet die leichte, hochgradig flexible und absolut brandsichere Alternative für die moderne Strangsanierung. Mit einer Dichte von nur 0,9 g/cm³ sind PP-R Rohre extrem leicht. Zudem verhindert die glatte Innenoberfläche (Rauigkeit von nur 0,007 mm) Inkrustationen und Kalkablagerungen, was gerade bei älteren, kalkhaltigen Wasserversorgungen die Langlebigkeit garantiert."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Technologische Problemlöser auf der Baustelle"
          lead="Warum Fachhandwerker bei der komplexen Altbausanierung auf Polypropylen (PP-R) setzen und welche technischen Eigenschaften den Ausschlag geben."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Keine offene Flamme und maximale Brandsicherheit",
                description: "Der Brandschutz ist bei Sanierungen, besonders in denkmalgeschützten Gebäuden mit trockenen Holzständerwerken oder alten, stark staubigen Schächten, extrem kritisch. Das Heizelement-Muffenschweißen von K Aqua erfordert lediglich ein elektrisches Heizwerkzeug, das bei 260 °C arbeitet – es gibt keine offene Gasflamme, keinen Funkenflug und somit absolut kein Brandrisiko während der Installation. Im Vergleich zu herkömmlichen Löt- oder Schweißarbeiten an Metallrohren entfällt die Notwendigkeit von Brandwachen."
              },
              {
                title: "2. Geringes Gewicht und Ergonomie",
                description: "Ein 4 Meter langes Stahlrohr (z.B. DN 50) im vierten Stock ohne Aufzug durch enge Flure zu manövrieren, ist ein massiver Kraftakt und erhöht das Unfallrisiko. PP-R Rohre von K Aqua wiegen nur etwa ein Achtel vergleichbarer Stahlrohre. Diese enorme Gewichtsreduktion senkt die körperliche Belastung der Installateure drastisch, beschleunigt den Transport auf der Baustelle und ermöglicht oft eine Ein-Mann-Montage, wo sonst zwei oder mehr Fachkräfte nötig wären."
              },
              {
                title: "3. Hohe Flexibilität und Toleranzausgleich",
                description: "Altbauten haben sich über Jahrzehnte gesetzt, Wände sind selten exakt lotrecht und Schächte variieren im Querschnitt. PP-R Rohre besitzen eine natürliche materialspezifische Flexibilität (Elastizitätsmodul von ca. 800-900 MPa). Sie verzeihen leichte Spannungen, können in engen Nischen deutlich leichter gebogen und geführt werden als starre Metallrohre und kompensieren Bauungenauigkeiten hervorragend. Dadurch werden zusätzliche Fittings und komplexe Umlenkungen eingespart."
              },
              {
                title: "4. Exzellente thermische und akustische Isolation",
                description: "Im Altbau ist der Schallschutz oft mangelhaft. K Aqua PP-R besitzt eine hohe innere Schalldämpfung. Fließgeräusche und Druckschläge werden vom Material geschluckt, was den Wohnkomfort in hellhörigen Gebäuden deutlich steigert. Zudem hat PP-R eine sehr geringe Wärmeleitfähigkeit (0,24 W/mK), was Energieverluste bei Warmwasserleitungen minimiert und die Anforderungen an die Rohrisolierung im Vergleich zu Kupfer (380 W/mK) drastisch reduziert."
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Phase 1: Demontage & Bestandsaufnahme",
                description: "Nachdem alte Bleirohre oder stark korrodierte, inkrustierte verzinkte Stahlrohre entfernt wurden, offenbaren die geöffneten Schächte oft unregelmäßige Maße und unvorhergesehene Hindernisse. Hier spielt Polypropylen (PP-R) seine strukturelle Flexibilität bei der Neuplanung der Rohrtrassen voll aus. Installateure können Leitungspfade anpassen, ohne auf starre Winkelstücke angewiesen zu sein.",
                icon: <Wrench className="w-8 h-8 text-primary" />
              },
              {
                title: "Phase 2: Die Steigleitungserneuerung",
                description: "Das geringe Eigengewicht ermöglicht es, auch längere Rohrsegmente problemlos vertikal in den engen Schacht einzuführen. Ein massiver technologischer Vorteil ist die Vorfertigung (Prefabrication): Komplette Steigstrang-Verteiler können außerhalb des Schachts in einer sauberen Umgebung vorgeschweißt und dann als komplette Baugruppe eingesetzt werden. Das spart extrem viel Zeit in der kritischen Bauphase.",
                icon: <Link className="w-8 h-8 text-primary" />
              },
              {
                title: "Phase 3: Etagenanbindung & homogene Verschweißung",
                description: "Auf der Etage, im Bereich der Wohnungsstationen oder Unterverteilungen, ist der Platz meist am knappsten. Die kompakten K Aqua Schweißwerkzeuge erlauben auch Verbindungen in sehr engen Vorwandinstallationen oder abgehängten Decken. Da Rohr und Fitting durch das Heizelement-Muffenschweißen zu einer untrennbaren, homogenen Einheit verschmelzen, gibt es keine Dichtringe, die altern, aushärten oder undicht werden können. Die Verbindung ist molekular absolut sicher.",
                icon: <Hammer className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Technische Integration: Mischinstallationen im Bestand"
          lead="Wie K Aqua PP-R Rohrsysteme nahtlos und sicher an bestehende alte Rohrnetze anbinden."
        />
        <DeepFAQ
          items={[
            {
              q: "Darf ich PP-R mit alten Kupferleitungen oder verzinktem Stahl mischen?",
              a: "Ja, uneingeschränkt. Bei metallischen Rohren muss zwingend die Fließregel beachtet werden (Kupfer darf in Fließrichtung nicht vor verzinktem Stahl liegen, da es sonst zu Bimetallkorrosion kommt). PP-R ist als Vollkunststoffsystem elektrolytisch völlig inert. Es gibt keine galvanische Korrosion. Mit den K Aqua Übergangsfittings aus hochwertigem, entzinkungsfreiem Messing oder Rotguss ist die direkte Anbindung an jedes beliebige Metallsystem normgerecht und dauerhaft sicher möglich."
            },
            {
              q: "Was passiert mit extremen Druckstößen im alten Rohrnetz?",
              a: "In alten, weitläufigen Netzen kommt es häufig zu Wasserschlägen, beispielsweise durch schnell schließende Magnetventile oder alte Einhebelmischer. Die Druckwelle breitet sich im System aus und kann starre Verbindungen schädigen. PP-R absorbiert und dämpft diese Druckstöße dank seiner molekularen Struktur deutlich besser als Metallrohre. Dies schont nicht nur die neuen Leitungen, sondern auch alte, empfindliche Armaturen und Boiler im restlichen Bestandsnetz, da Lastspitzen abgefangen werden."
            },
            {
              q: "Wie überbrücke ich alte, großdimensionierte Stahlrohre und Flansche?",
              a: "K Aqua bietet ein vollumfängliches Sortiment an Gewindeübergängen, Verschraubungen und vor allem Flanschverbindungen (Bundbuchsen mit Losflanschen). So können Sie von großen, historischen Stahlverteilern in Kellern oder Heizzentralen direkt auf das moderne PP-R System reduzieren. Die Flanschverbindungen gewährleisten eine kraftschlüssige, dichte Anbindung auch bei hohen Systemdrücken und ermöglichen eine problemlose Demontage zu Wartungszwecken."
            },
            {
              q: "Ist PP-R resistent gegen chemische Rohrreinigungen, die im Altbau oft nötig sind?",
              a: "Altbauten weisen oft stark verschmutzte Systeme auf, die mit aggressiven Chemikalien gespült werden müssen (z.B. zur Legionellenbekämpfung oder Entkalkung). PP-R besitzt eine herausragende chemische Beständigkeit gegenüber fast allen gängigen Säuren, Laugen und Desinfektionsmitteln (gemäß DIN 8078). Chlordioxid oder thermische Desinfektion (bei 70°C) stellen für die K Aqua Systeme im Rahmen der normativen Vorgaben kein Problem dar."
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Brandgefahr bei der Montage durch den völligen Verzicht auf offene Gasbrenner." },
              { n: "60", u: "%", l: "Potenzielle Zeitersparnis bei der Montage im Vergleich zu geschraubten, gelöteten oder gepressten Metallrohren." },
              { n: "100", u: "%", l: "Kompatibel mit allen gängigen Bestands-Metallsystemen über unsere Spezialfittings ohne Korrosionsrisiko." }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <CTABand
          title="Planen Sie die komplexe Strangsanierung eines historischen Mehrfamilienhauses?"
          subtitle="Überlassen Sie unseren Ingenieuren die detaillierte Materialplanung. Wir helfen Ihnen, die optimalen Rohrdimensionen für den Bestand hydraulisch zu berechnen, Druckverluste zu minimieren und die passenden Übergangsfittings für eine sichere Mischinstallation auszuwählen."
          buttonText="Technische Beratung zur Sanierung anfordern"
          buttonLink="/kontakt"
          icon={<Flame className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
