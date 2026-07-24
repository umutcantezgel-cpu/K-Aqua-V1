import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Cpu, Layers, Settings2, Activity, CheckCircle2 } from "@/components/ui/icon";

export const vorfertigungPrefabrication: NewsPost = {
  slug: "vorfertigung-prefabrication-rohrverteiler-ppr-bauzeit",
  title: {
    de: "Vorfertigung von PPR Rohrverteilern",
    en: "Prefabrication of PPR Pipe Manifolds",
    ar: "التجهيز المسبق لمجمعات أنابيب PPR"
  },
  date: "2024-12-20",
  teaser: {
    de: "Bauen unter Zeitdruck: Entdecken Sie, wie die Vorfertigung (Prefabrication) von K Aqua PPR Rohrverteilern in der Werkstatt die Bauzeit und Montagezeit auf der Baustelle um bis zu 70 % reduziert.",
    en: "Building under time pressure: Discover how the prefabrication of K Aqua PPR pipe manifolds in the workshop reduces construction and installation time on site by up to 70%.",
    ar: "البناء تحت ضغط الوقت: اكتشف كيف يقلل التجهيز المسبق لمجمعات أنابيب K Aqua PPR في الورشة من وقت البناء والتركيب في الموقع بنسبة تصل إلى 70٪."
  },
  excerpt: {
    de: "Bauen unter Zeitdruck: Entdecken Sie, wie die Vorfertigung (Prefabrication) von K Aqua PPR Rohrverteilern in der Werkstatt die Bauzeit und Montagezeit auf der Baustelle um bis zu 70 % reduziert.",
    en: "Building under time pressure: Discover how the prefabrication of K Aqua PPR pipe manifolds in the workshop reduces construction and installation time on site by up to 70%.",
    ar: "البناء تحت ضغط الوقت: اكتشف كيف يقلل التجهيز المسبق لمجمعات أنابيب K Aqua PPR في الورشة من وقت البناء والتركيب في الموقع بنسبة تصل إلى 70٪."
  },
  coverImage: "/images/news/prefabrication-workshop.jpg",
  category: "Planung & BIM",
  tags: ["Vorfertigung", "Prefabrication", "Rohrverteiler", "BIM", "PPR", "Effizienz"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Layers className="w-5 h-5" />
                  <span>Prozessoptimierung & BIM</span>
                </div>
              }
              title="Vom CADModell zum Plug & Play PPR Verteiler"
              lead="Die Rahmenbedingungen auf modernen Großbaustellen werden immer anspruchsvoller: Knappe Bauzeitenpläne, akuter Fachkräftemangel und ungünstige Witterungsbedingungen. Wer hier komplexe Heizungs und Trinkwasserverteiler aus dutzenden Einzelteilen direkt vor Ort zusammenschweißt, verliert wertvolle Bauzeit. Die Lösung heißt industrielle Vorfertigung (Prefabrication). K Aqua PPR Rohrsysteme eignen sich hervorragend, um in der kontrollierten Umgebung einer Werkstatt millimetergenau vorgefertigt und als prüfbereite Baugruppe auf die Baustelle geliefert zu werden."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Prose Area */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert">
          <h2>Industrielle Vorfertigung (Prefabrication): Der Turbobolzen für Ihren Bauzeitenplan</h2>
          <p>
            Die Baubranche durchlebt einen fundamentalen Wandel. Die Zeiten, in denen Hunderte von Handwerkern über Monate hinweg komplexe Heizungsverteiler, Steigstränge und Sanitärregister mühsam Stück für Stück auf der Baustelle zusammenbauten, neigen sich dem Ende zu. Termin- und Kostendruck, gepaart mit einem eklatanten Mangel an qualifizierten Fachkräften, erzwingen neue, industriellere Arbeitsmethoden. Die Antwort der Technischen Gebäudeausrüstung (TGA) darauf ist die Vorfertigung (engl. Prefabrication). K Aqua PP-R Rohrsysteme sind aufgrund ihrer Schweißbarkeit, ihres geringen Gewichts und ihrer Formstabilität das ideale Medium für diesen revolutionären Workflow.
          </p>
          
          <h3>Der Bruch mit der traditionellen Baustelle</h3>
          <p>
            Eine konventionelle Baustelle ist ein chaotischer Ort. Dreck, Kälte, Nässe und der ständige Kampf um Platz mit anderen Gewerken prägen den Alltag. Schweiß- und Lötarbeiten an Rohren müssen oft in Zwangslagen (über Kopf, kniend, in engen Schächten) durchgeführt werden. Dies kostet nicht nur enorm viel Zeit, sondern birgt auch ein hohes Risiko für Qualitätseinbußen. 
          </p>
          <p>
            Bei der Vorfertigung hingegen verlagert sich die Wertschöpfung in die saubere, klimatisierte und ergonomisch optimierte Umgebung einer Werkstatt. Hier stehen stationäre Schweißmaschinen zur Verfügung, mit denen große Nennweiten (z. B. DN 100 bis DN 400) vollautomatisch und mit perfektem Fügedruck per Heizelementstumpfschweißung verbunden werden können.
          </p>

          <h3>Building Information Modeling (BIM) als Katalysator</h3>
          <p>
            Die Vorfertigung funktioniert nicht ohne exakte Planung. Der Prozess beginnt lange bevor der erste Schweißspiegel erhitzt wird – nämlich im digitalen Zwilling des Gebäudes. Über Building Information Modeling (BIM) werden die Verteiler, Pumpengruppen und Schachtinstallationen millimetergenau in 3D (CAD) modelliert. 
          </p>
          <p>
            K Aqua stellt Planern und Installateuren exakte BIM-Bibliotheken zur Verfügung. Aus diesem 3D-Modell generiert die Software auf Knopfdruck automatische Stücklisten (Bill of Materials) und exakte Zuschnittpläne für die Rohre. Es gibt keine bösen Überraschungen oder Kollisionen mit Lüftungskanälen mehr, da alles virtuell bereits gebaut wurde, bevor es physisch existiert.
          </p>

          <h3>Der Logistik-Vorteil: Plug & Play auf der Baustelle</h3>
          <p>
            Ist das Register in der Werkstatt fertig verschweißt, wird es dort einer strengen Druckprüfung unterzogen. Erst wenn 100%ige Dichtigkeit attestiert ist, wird das Modul auf die Baustelle transportiert. 
          </p>
          <p>
            Der größte Hebel für den Bauzeitenplan entsteht beim Einbau: Statt tagelang Einzelteile zusammenzufügen, wird die fertige Baugruppe per Kran oder Flaschenzug an ihren Bestimmungsort gehoben, fixiert und mit wenigen, vorgeplanten Anbindenähten (z.B. mittels Elektroschweißmuffen oder Flanschverbindungen) an das Hauptnetz angeschlossen. Der Arbeitsaufwand vor Ort reduziert sich von Wochen auf wenige Stunden. Ein Zeitvorteil von bis zu 70 % ist realistisch.
          </p>

          <h3>Warum PP-R besser für Prefabrication geeignet ist als Stahl</h3>
          <p>
            Der Transport von großen, vorgefertigten Registern aus Stahlrohr ist extrem schwerfällig. Die enormen Gewichte erfordern spezielle Hebewerkzeuge und Schwerlastkrane. Zudem birgt jede Bewegung die Gefahr, die Korrosionsschutzbeschichtung des Stahls zu beschädigen. K Aqua PP-R ist rund 70 % leichter als Stahl. Große Baugruppen lassen sich wesentlich leichter manövrieren. Durch die homogene molekulare Verschmelzung beim Schweißen besitzt ein fertiges PP-R Register eine enorme Torsionssteifigkeit und strukturelle Integrität, ohne bei Erschütterungen während des Transports Risse in den Schweißnähten zu riskieren.
          </p>

          <h3>Häufig gestellte Fragen (FAQ) zur Vorfertigung</h3>
          <h4>Wie groß dürfen die vorgefertigten Module sein?</h4>
          <p>
            Die Grenzen setzt allein die Logistik. Die Dimensionen der Module müssen auf Standard-LKW passen (meist max. 2,40 m Breite und 12 m Länge) und durch die vorhandenen Gebäudeöffnungen (Türen, Fenster, Schächte) passen. Intelligente Planung teilt riesige Verteiler in handliche Sektionen.
          </p>
          <h4>Lohnt sich Prefabrication auch für kleinere Projekte?</h4>
          <p>
            Ja, definitiv. Bereits die Vorfertigung von standardisierten Steigsträngen für den Wohnungsbau (z.B. Vor- und Rücklauf Heizung plus Kalt- und Warmwasser nebeneinander) auf einem Montagerahmen spart immens Zeit, wenn sich der Aufbau in jedem Stockwerk wiederholt (Serieneffekt).
          </p>
          <h4>Wer haftet für die Dichtigkeit?</h4>
          <p>
            Dies ist ein weiterer massiver Vorteil: Wenn die Baugruppe bereits im Werk unter Prüfdruck getestet und abgenommen wurde, verlagert sich das Haftungsrisiko von der chaotischen Baustelle in den streng dokumentierten Qualitätszyklus der Werkstatt.
          </p>
        </div>
      </Reveal>

      {/* HorizontalTimeline: Der Prefabworkflow */}
      <Reveal>
        <SectionHead
          title="Der digitale Workflow"
          lead="Wie aus einer Idee ein fertiges Verteilersystem wird."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. 3DPlanung & BIM",
                description: "Im ersten Schritt wird der Rohrverteiler virtuell modelliert. Alle Abgänge, Ventile und Platzverhältnisse werden am PC berechnet und in exakte Stücklisten überführt."
              },
              {
                title: "2. WerkstattSchweißung",
                description: "Fernab von Baustellenstaub und Kälte verschweißen Spezialisten die K Aqua PPR Rohre unter perfekten klimatischen Bedingungen – oft unterstützt von stationären Schweißmaschinen."
              },
              {
                title: "3. Plug & Play Montage",
                description: "Die fertigen Baugruppen werden justintime auf die Baustelle geliefert. Vor Ort müssen nur noch wenige Anbindenähte gesetzt werden, der Rest ist bereits druckgeprüft."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Vorteile der Vorfertigung */}
      <Reveal>
        <SectionHead
          title="Warum Prefabrication?"
          lead="Der Wechsel von der Baustelle in die Werkstatt bringt messbare Vorteile."
        />
        <BentoGrid
          items={[
            {
              title: "Massive Bauzeitverkürzung",
              description: "Indem die aufwendigen Schweißarbeiten in die Werkstatt verlagert werden, können die Installationszeiten auf der Baustelle um bis zu 70 % gesenkt werden. Ein enormer Gewinn für den Projektplan.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Höchste Präzision",
              description: "In der Werkstatt gibt es keine Zwangslagen (z.B. Schweißen über Kopf im engen Schacht). Winkel und Abstände können millimetergenau eingehalten werden.",
              icon: <Settings2 className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Wetterunabhängigkeit",
              description: "Das Verschweißen von Kunststoffen erfordert bestimmte Umgebungstemperaturen. In der klimatisierten Werkstatt ist dies im Winter kein Problem.",
              icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Baustelle vs. Werkstatt */}
      <Reveal>
        <SectionHead
          title="Montage im Vergleich"
          lead="Konventionelle Baustellenfertigung gegen moderne Vorfertigung."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Baustellenmontage", "Vorfertigung (Prefab)"],
            ["Montagezeit vor Ort", "Hoch (Wochen)", "Minimal (Tage/Stunden)"],
            ["Schweißqualität", "Stark abhängig von Bedingungen", "Konstant hoch (stationäre Maschinen)"],
            ["Platzbedarf auf Baustelle", "Sehr hoch (Lagerung Einzelteile)", "Gering (Modul wird sofort verbaut)"],
            ["Abfall & Verschnitt", "Oft hoch", "Nahezu Null"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zur Vorfertigung */}
      <Reveal>
        <SectionHead
          title="FAQ zur Prefabrication"
          lead="Antworten für TGAPlaner und ausführende Betriebe."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie groß können vorgefertigte K Aqua Register sein?",
              a: "Grundsätzlich wird die Größe nur durch die Transportlogistik (LKWLadefläche) und die Einbringungsmöglichkeiten auf der Baustelle (Türen, Schächte) begrenzt. Meist werden große Verteiler in smarte Module aufgeteilt."
            },
            {
              q: "Kann ich vorgefertigte Systeme vorher auf Dichtigkeit prüfen?",
              a: "Ja, das ist einer der größten Vorteile. Die Baugruppe kann bereits in der Werkstatt einer Druckprüfung unterzogen werden, was die Fehlersuche auf der Baustelle eliminiert."
            },
            {
              q: "Wer übernimmt die 3DPlanung?",
              a: "Entweder das planende Ingenieurbüro überlässt dem Ausführenden die Werkplanung, oder Hersteller wie K Aqua unterstützen mit BIMDaten und CADModellen bei der Konstruktion."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Effizienzfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "%", l: "Mögliche Reduktion der reinen Montagezeit auf der Baustelle." },
              { n: "0", l: "Verpackungsmüll und Rohrverschnitt, der auf der Baustelle entsorgt werden muss." },
              { n: "100", u: "%", l: "Geometrische Präzision dank VorabPlanung in 3DUmgebungen." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Prefabsupport */}
      <Reveal>
        <CTABand
          title="Wollen Sie Ihren Bauzeitenplan optimieren?"
          subtitle="Verlagern Sie Komplexität in die Vorplanung. Sprechen Sie mit uns über den Einsatz von K Aqua BIMDaten für die Vorfertigung Ihrer nächsten Rohrverteiler."
          buttonText="BIMsupport anfragen"
          buttonLink="/kontakt"
          icon={<Cpu className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
