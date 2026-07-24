import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Anchor, Waves, Shield, Globe } from "@/components/ui/icon";

export const schiffbauOffshore: NewsPost = {
  slug: "schiffbau-offshore-rohrleitungen-salzwasser-ppr",
  title: {
    de: "Schiffbau & Offshore: PPR Rohrsysteme",
    en: "Shipbuilding & Offshore: PPR Pipe Systems",
    ar: "بناء السفن والمنصات البحرية: أنظمة أنابيب PPR"
  },
  date: "2024-08-25",
  teaser: {
    de: "Salzwasser ist der ultimative Härtetest für jedes Material: Entdecken Sie, warum K Aqua PPR Rohrsysteme im Schiffbau und Offshore Bereich schwere CuNiFe Leitungen ersetzen, Gewicht einsparen und absolute Wartungsfreiheit garantieren.",
    en: "Saltwater is the ultimate endurance test for any material: Discover why K Aqua PPR piping systems are replacing heavy CuNiFe pipes in the shipbuilding and offshore sectors, saving weight and guaranteeing absolute maintenance free operation.",
    ar: "المياه المالحة هي اختبار التحمل النهائي لأي مادة: اكتشف لماذا تحل أنظمة أنابيب K Aqua PPR محل أنابيب CuNiFe الثقيلة في قطاعات بناء السفن والمنصات البحرية، مما يوفر الوزن ويضمن تشغيلاً خالياً تماماً من الصيانة."
  },
  excerpt: {
    de: "Salzwasser ist der ultimative Härtetest für jedes Material: Entdecken Sie, warum K Aqua PPR Rohrsysteme im Schiffbau und Offshore Bereich schwere CuNiFe Leitungen ersetzen, Gewicht einsparen und absolute Wartungsfreiheit garantieren.",
    en: "Saltwater is the ultimate endurance test for any material: Discover why K Aqua PPR piping systems are replacing heavy CuNiFe pipes in the shipbuilding and offshore sectors, saving weight and guaranteeing absolute maintenance free operation.",
    ar: "المياه المالحة هي اختبار التحمل النهائي لأي مادة: اكتشف لماذا تحل أنظمة أنابيب K Aqua PPR محل أنابيب CuNiFe الثقيلة في قطاعات بناء السفن والمنصات البحرية، مما يوفر الوزن ويضمن تشغيلاً خالياً تماماً من الصيانة."
  },
  coverImage: "/images/news/ship-offshore.jpg",
  category: "Industrie",
  tags: ["Schiffbau", "Offshore", "Salzwasser", "Marine", "PPR", "DNV"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit ParallaxHero */}
      <Reveal>
        <ParallaxHero
          imageSrc="/images/news/ship-offshore.jpg"
          title="Der ultimative Korrosionsschutz auf hoher See"
          subtitle="Maritime Einsatzbedingungen verzeihen keine Schwächen. Aggressives Salzwasser zersetzt unbehandelte Metalle innerhalb kürzester Zeit. K Aqua PPR und PPRCT Rohrsysteme sind zu 100 % seewasserresistent und bieten eine revolutionäre Alternative zu schweren CuNiFe Leitungen."
          badge="Marine & Offshore"
          align="left"
        />
      </Reveal>

      {/* GlossaryGrid: Maritime Einsatzbereiche */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Einsatzbereiche an Bord"
            items={[
              {
                term: "Ballastwassersysteme",
                definition: "Ballastwasser wird oft chemisch oder mit UV Licht behandelt, um Mikroorganismen abzutöten. PPR ist resistent gegen Seewasser und die zur Reinigung eingesetzten Chemikalien.",
                icon: <Waves className="w-6 h-6" />
              },
              {
                term: "Kühlwassersysteme",
                definition: "Viele Schiffe nutzen Seewasser zur Motorkühlung. Während Stahlrohre von innen durch Pitting korrodieren, bleibt das Kunststoffrohr dauerhaft intakt und glatt.",
                icon: <Anchor className="w-6 h-6" />
              },
              {
                term: "Grau & Schwarzwasser",
                definition: "Abwassersysteme auf Kreuzfahrtschiffen und Yachten erfordern absolute Dichtheit und Geruchsneutralität. Die vollflächig verschweißten Verbindungen von K Aqua garantieren dies.",
                icon: <Shield className="w-6 h-6" />
              },
              {
                term: "Frischwasser",
                definition: "Die Versorgung der Crew und Passagiere mit sauberem Trinkwasser. PPR gibt weder Geschmack noch Geruch ab und erfüllt strengste hygienische Standards.",
                icon: <Globe className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      <SectionDivider />

      {/* StatBand: Gewicht und Wartung */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "75", u: "%", l: "Leichter als Stahlrohre – erhöht die Zuladungskapazität." },
              { n: "0", l: "Aufwand für nachträglichen Korrosionsschutz oder Innenbeschichtung." },
              { n: "50", u: "+", l: "Jahre erwartete Lebensdauer im maritimen Dauerbetrieb." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Maritime Zulassungen */}
      <Reveal>
        <DeepFAQ
          items={[
            {
              q: "Verfügt K Aqua über maritime Klassifizierungen?",
              a: "Rohrsysteme im Schiffbau müssen strengsten Normen genügen. Produkte aus PPR und PPRCT können für spezifische Anwendungen nach den Regularien von DNV, RINA, ABS oder Lloyd's Register qualifiziert werden."
            },
            {
              q: "Wie verhält sich Kunststoff bei Schiffsvibrationen?",
              a: "Im Gegensatz zu starren metallischen Leitungen verfügt Kunststoff über eine hohe Eigendämpfung. Maschinenvibrationen werden absorbiert und nicht in Form von Körperschall auf die Schiffsstruktur übertragen."
            },
            {
              q: "Ist Kunststoff bei Feuer an Bord nicht gefährlich?",
              a: "Für Bereiche mit erhöhten Brandschutzanforderungen (z.B. Maschinenräume) existieren strenge Vorgaben. Hier kommen spezielle Brandschutzmanschetten zum Einsatz oder das Rohr wird durch wassergefüllte Systeme geschützt, gemäß den IMO Richtlinien."
            }
          ]}
        />
      </Reveal>

      {/* Deep Technical Analysis */}
      <section className="py-12 prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Korrosionsresistenz in der härtesten Umgebung der Welt</h2>
        <p>
          Die marine Umgebung verzeiht keine Kompromisse. Auf hoher See, in Werften und auf Offshore-Ölplattformen ist die technische Infrastruktur rund um die Uhr einem extrem aggressiven Klima ausgesetzt. Die ständige Präsenz von hochkonzentriertem Salzwasser, maritimen Aerosolen, massiven Temperaturschwankungen und ständigen Vibrationen der Hauptmaschinen zersetzt traditionelle Metalle gnadenlos.
        </p>
        <p>
          Im klassischen Schiffbau (Naval Architecture) wurden und werden für Meerwassersysteme (wie Ballastwasser, Seekühlwasser oder Feuerlöschleitungen) häufig schwere, hochlegierte Werkstoffe wie CuNiFe (Kupfer-Nickel-Eisen-Legierungen), galvanisierter Stahl oder teures Titan verwendet. Diese Metalle sind jedoch extrem schwer, kostenintensiv und erfordern bei der Installation auf der Werft hochspezialisierte Schweißer (Hot Works). Das K-Aqua PP-R (Polypropylen-Random-Copolymer) Rohrsystem stellt hierfür einen technologischen Quantensprung dar, der Leichtigkeit, völlige Immunität gegen Salzkorrosion und überlegene Installationsgeschwindigkeit in einem System vereint.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Das Ende der Pitting-Korrosion</h3>
        <p>
          Bei der Förderung von Meerwasser durch metallische Leitungen kommt es durch Chloridionen häufig zur sogenannten Lochfraßkorrosion (Pitting) und Spaltkorrosion. Selbst hochlegierte Stähle sind davor nicht vollständig geschützt, insbesondere in Stillstandsphasen (Stagnationswasser), wenn Sauerstoff im Wasser zur Reaktion führt. 
        </p>
        <p>
          Polypropylen von K-Aqua ist als makromolekularer Kunststoff vollkommen elektrisch isolierend und chemisch inert gegenüber Chloriden, Sulfaten und dem gesamten Spektrum an Mineralien im Salzwasser. Es gibt keine elektrochemische Spannungsreihe, die eine galvanische Korrosion auslösen könnte. Egal wie hoch der Salzgehalt des geförderten Wassers ist, das Material zersetzt sich nicht. Dies eliminiert die Notwendigkeit für den ständigen Austausch von Opferanoden in den Rohrleitungen und reduziert den Wartungsaufwand (OPEX) für den Reeder im laufenden Schiffsbetrieb dramatisch.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Gewichtsreduktion: Der Schlüssel zur maritimen Effizienz</h2>
        <p>
          Im modernen Schiffbau – sei es bei Kreuzfahrtschiffen, Frachtern, Yachten oder militärischen Fregatten – ist die Gewichtsreduzierung (Weight Saving) eines der wichtigsten Designkriterien. Jede Tonne Eigengewicht, die im Schiffsrumpf verbaut wird, reduziert die nutzbare Zuladung (Payload) oder erhöht den Treibstoffverbrauch und damit den CO2-Ausstoß (CII - Carbon Intensity Indicator).
        </p>
        <p>
          K-Aqua Rohrsysteme sind ca. 75 % leichter als vergleichbare Stahlrohre und bis zu 60 % leichter als CuNiFe. In einem großen Kreuzfahrtschiff mit hunderten Kilometern an Rohrleitungen bedeutet der Wechsel auf Kunststoff eine Gewichtsersparnis von mehreren hundert Tonnen. Dieses eingesparte Gewicht erhöht die Stabilität (Metazentrum) des Schiffs, senkt den Tiefgang und führt zu signifikanten Einsparungen im Treibstoffverbrauch während der gesamten Lebensdauer des Schiffes.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Schockfestigkeit und Vibrationsabsorption</h3>
        <p>
          Ein Schiff ist kein statisches Gebäude, sondern eine dynamische Stahlkonstruktion, die sich im schweren Seegang verwindet (Torsion und Biegung). Zudem erzeugen die massiven Zweitakt-Dieselmotoren und Propellerwellen im Maschinenraum ständige, niederfrequente Vibrationen. Metallrohre können durch diese permanente Wechselbelastung an den Flanschen oder Schweißnähten reißen (Materialermüdung).
        </p>
        <p>
          PP-R besitzt herausragende viskoelastische Eigenschaften. Das Kunststoffrohr kann einen gewissen Grad an Biegung aufnehmen, ohne zu brechen oder plastisch zu verformen. Vibrationen aus dem Maschinenraum werden vom Rohr absorbiert und gedämpft, anstatt sie als Körperschall in den Schiffsrumpf oder die Passagierkabinen zu übertragen. Die thermische Verschmelzung (Muffen- oder Stumpfschweißen) macht die Rohrverbindung zudem genau so stark wie das Rohr selbst. Die stoffschlüssige Verbindung trotzt extremen Druckstößen (Wasserschlag), die beim schnellen Schließen von Ventilen im Ballastwassersystem entstehen können.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Klassifikationsgesellschaften und Brandschutz (IMO)</h2>
        <p>
          Der Einsatz von Kunststoffen im maritimen Bereich ist streng reglementiert durch die International Maritime Organization (IMO) und wird von Klassifikationsgesellschaften wie DNV (Det Norske Veritas), Lloyd’s Register oder RINA überwacht. K-Aqua liefert hierfür Rohrsysteme, die exakt auf die Vorgaben der maritimen Zertifizierungen abgestimmt sind. 
        </p>
        <p>
          Ein kritischer Punkt bei Kunststoffen ist der Brandschutz (Fire Endurance). Durch den strategischen Einsatz von zugelassenen Brandschutzmanschetten (Fire Collars) an den Schottdurchführungen (Bulkhead Penetrations) und spezifischen Verlegevorschriften erfüllt K-Aqua die IMO-Richtlinien für bestimmte Applikationen, wie Kalt- und Warmwasserverteilung, Klimakaltwasser oder Schwarzwasser. Im Brandfall schäumt die Manschette auf und verschließt das Rohr hermetisch, sodass Feuer und Rauch nicht in angrenzende Brandabschnitte (Fire Zones) übergreifen können. So kombiniert K-Aqua ultimative Korrosionsfreiheit mit maritimer Sicherheit auf höchstem Niveau.
        </p>
      </section>

      {/* CTABand: Marineberatung */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Werftprojekt?"
          subtitle="Reduzieren Sie das Gewicht Ihres Schiffes und eliminieren Sie Korrosionsprobleme dauerhaft."
          buttonText="Marine Spezialisten kontaktieren"
          buttonLink="/kontakt"
          icon={<Anchor className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
