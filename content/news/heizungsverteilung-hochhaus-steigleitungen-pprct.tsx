import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Building2, ArrowUpRight, Activity, ShieldCheck } from "@/components/ui/icon";

export const heizungsverteilungHochhaus: NewsPost = {
  slug: "heizungsverteilung-hochhaus-steigleitungen-pprct",
  title: {
    de: "Heizungsverteilung im Hochhaus: PPRCT",
    en: "Heating Distribution in Highrise Buildings: PPRCT",
    ar: "توزيع التدفئة في المباني الشاهقة: PPRCT"
  },
  date: "2024-11-04",
  excerpt: {
    de: "Hochhäuser stellen TGA Planer vor statische und hydraulische Herausforderungen. K Aqua PPR & PPRCT Rohrsysteme reduzieren das Gewicht im Steigschacht dramatisch, bieten exzellenten Schallschutz und widerstehen extremen Drücken in der Heizungsverteilung.",
    en: "High-rise buildings present structural and hydraulic challenges for MEP planners. K Aqua PPR & PPRCT pipe systems dramatically reduce weight in the riser shaft, offer excellent sound insulation, and withstand extreme pressures in heating distribution.",
    ar: "تمثل المباني الشاهقة تحديات إنشائية وهيدروليكية لمخططي الهندسة الميكانيكية والكهربائية والسباكة (MEP). تقلل أنظمة أنابيب K Aqua PPR و PPRCT بشكل كبير من الوزن في عمود الصاعد، وتوفر عزلًا صوتيًا ممتازًا، وتتحمل الضغوط الشديدة في توزيع التدفئة."
  },
  coverImage: "/images/news/highrise-building.jpg",
  category: "Heizungstechnik",
  tags: ["Hochhaus", "Steigleitung", "TGA", "PPRCT", "PPR", "Rohrsysteme", "Schallschutz", "Heizungsverteilung"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Building2 className="w-5 h-5" />
                  <span>Highrise & TGA Planung</span>
                </div>
              }
              title="Vertikale Ingenieurskunst ohne Rost: Effiziente Heizungsverteilung im Hochhaus"
              lead="In Hochhäusern (Highrise Buildings) summieren sich die Probleme klassischer Metallrohre: Sie belasten die Gebäudestatik durch ihr enormes Eigengewicht, erfordern schweres Hebezeug im Steigschacht und übertragen Fließ- sowie Knackgeräusche direkt in angrenzende Wohnräume. K Aqua PPRCT und PPR Rohrsysteme lösen diese Herausforderungen bei vertikalen Steigleitungen elegant und dauerhaft sicher – selbst bei Drücken jenseits der 20 Bar in den unteren Technikzonen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Druckaufbau in Steigleitungen */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Argumente für PPRCT in Hochhäusern */}
      <Reveal>
        <SectionHead
          title="Vorteile im Steigschacht"
          lead="Warum PPRCT die klassische Cstahl Steigleitung ablöst."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Massive Gewichtsreduktion",
                description: "Ein 100 Meter langer Strang aus DN 100 Cstahlrohren wiegt mit Wasser gefüllt mehrere Tonnen. K Aqua PPRCT ist bis zu 70 % leichter. Das erleichtert nicht nur die Montage ohne Schwerlastkräne im Schacht, sondern entlastet auch die Statik des Gebäudes erheblich."
              },
              {
                title: "2. Überragender Schallschutz",
                description: "Thermische Längenänderungen führen bei Metallrohren oft zu lauten Knackgeräuschen in den Rohrschellen. Kunststoff besitzt hervorragende schallabsorbierende Eigenschaften. Fließgeräusche und Ausdehnungsgeräusche werden massiv gedämpft – ideal für Luxusapartments."
              },
              {
                title: "3. Absolute Korrosionssicherheit",
                description: "Eine Leckage durch Durchrostung im 40. Stockwerk verursacht katastrophale Wasserschäden in den darunterliegenden Etagen. K Aqua PPRCT ist absolut korrosionsfrei und garantiert jahrzehntelange Betriebssicherheit."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Materialvergleich Steigleitung */}
      <Reveal>
        <SectionHead
          title="Materialvergleich (DN 100)"
          lead="Faktenbasierter Vergleich für vertikale Heizungsstränge."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "K Aqua PPRCT", "Cstahl", "Kupfer"],
            ["Gewicht (leer, pro Meter)", "Sehr leicht (~2,5 kg)", "Sehr schwer (~10 kg)", "Schwer (~5 kg)"],
            ["Verbindungstechnik", "Muffenschweißen (ohne Flamme)", "Pressen / Schweißen (Flamme)", "Pressen / Löten (Flamme)"],
            ["Schallübertragung", "Sehr gering", "Sehr hoch", "Hoch"],
            ["Korrosionsrisiko (Sauerstoff)", "Keines (mit EVOHschicht)", "Sehr hoch (Rostgefahr)", "Mittel"]
          ]}
        />
      </Reveal>

      {/* StickyScrollReveal: Der Weg nach oben */}
      <Reveal>
        <div className="my-12">
          <StickyScrollReveal
            items={[
              {
                title: "Die Technikzentrale (Keller)",
                description: "Hier herrscht der höchste statische Druck der gesamten Wassersäule. K Aqua Rohre mit hohem SDR (z.B. SDR 7.4) und Glasfaserverstärkung halten selbst enormen Systemdrücken in Highrisegebäuden mühelos stand.",
                icon: <Activity className="w-8 h-8 text-primary" />
              },
              {
                title: "Der Steigschacht (Vertikal)",
                description: "Auf dem Weg nach oben muss die thermische Längenänderung (Ausdehnung bei Heizwasser) kontrolliert werden. Durch fachgerecht berechnete Dehnungsbögen (Ubögen) und Festpunkte nimmt das Rohr die Dehnung geräuschlos auf.",
                icon: <ArrowUpRight className="w-8 h-8 text-primary" />
              },
              {
                title: "Die Etagenverteilung (Horizontal)",
                description: "In den einzelnen Stockwerken erfolgt der Abzweig vom Steigstrang zu den Heizkreisverteilern der Wohnungen. Die einfache und sichere Verschweißung per Heizwendelmuffe oder Stumpfschweißung ermöglicht einen schnellen Baufortschritt.",
                icon: <Building2 className="w-8 h-8 text-primary" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* GlossaryGrid: Technische Planung */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Wichtige Planungsbegriffe"
            items={[
              {
                term: "Längenausdehnung",
                definition: "Faserverstärktes PPRCT reduziert die thermische Ausdehnung um ca. 75 % im Vergleich zu reinem PPR und verhält sich ähnlich wie Metallrohre.",
                icon: <ArrowUpRight className="w-6 h-6" />
              },
              {
                term: "Statischer Druck (Wassersäule)",
                definition: "Pro 10 Meter Gebäudehöhe steigt der Druck um 1 Bar. Bei 150 Metern Höhe müssen Rohre im Keller dauerhaft 15 Bar plus Pumpendruck aushalten.",
                icon: <Activity className="w-6 h-6" />
              },
              {
                term: "Festpunkt / Loslager",
                definition: "Spezielle Rohrschellen, die die Ausdehnungskräfte gezielt in den Dehnungsbogen leiten (Festpunkt) oder das Rohr gleiten lassen (Loslager).",
                icon: <ShieldCheck className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Hochhaus Profil */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "%", l: "Geringeres Eigengewicht im Vergleich zu metallischen Steigleitungen." },
              { n: "0", l: "Brandgefahr bei der Installation (Schweißen erfolgt elektrisch, keine offene Flamme)." },
              { n: "20", u: "+", l: "Bar Betriebsdruck können durch die richtige SDRklasse abgesichert werden." }
            ]}
          />
        </div>
      </Reveal>

      {/* Deep Technical Analysis */}
      <section className="py-12 prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Hochhausarchitektur: Die physikalischen Grenzen der TGA</h2>
        <p>
          Die technische Gebäudeausrüstung (TGA) in Hochhäusern (Highrise-Buildings ab 40 Metern bis hin zu Supertalls über 300 Metern) gehört zu den anspruchsvollsten Disziplinen der Ingenieurskunst. Während Heizungswasser in klassischen Wohngebäuden nur geringe Höhen überwinden muss, baut sich in den vertikalen Steigschächten von Wolkenkratzern eine gewaltige hydrostatische Wassersäule auf. Pro 10 Meter Gebäudehöhe steigt der statische Druck im Leitungssystem um exakt 1 Bar. Bei einem 150 Meter hohen Turm lasten im Kellergeschoss bereits 15 Bar Ruhedruck auf den Rohren – zuzüglich des dynamischen Drucks der massiven Umwälzpumpen und der notwendigen Sicherheitsreserven.
        </p>
        <p>
          Traditionell wurden für diese extremen Steigstränge dickwandige Stahlrohre eingesetzt. Doch diese bringen gravierende Nachteile mit sich, die den Baufortschritt, die Statik und den Langzeitbetrieb massiv belasten. K-Aqua bietet mit seinen faserverstärkten PP-RCT (Polypropylen-Random-Copolymer mit modifizierter Kristallinität) Rohrsystemen eine bahnbrechende Alternative, die Leichtigkeit, Schalldämmung und extreme Druckbeständigkeit zu einer überlegenen Sicherheitsarchitektur vereint.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Die Druckbeherrschung durch PP-RCT und Faserverbund</h3>
        <p>
          Standard-Kunststoffe kapitulieren vor den Drücken und Temperaturen (oft 70°C bis 90°C) im Heizungsnetz eines Hochhauses. K-Aqua nutzt hierfür PP-RCT, dessen modifizierte (β-kristalline) Molekularstruktur dem Material eine enorm gesteigerte Zeitstandfestigkeit verleiht. Durch die richtige Wahl der Wandstärkenreihe (z. B. SDR 7.4 oder SDR 9) können Betriebsdrücke weit jenseits der 20-Bar-Marke sicher und dauerhaft (für über 50 Jahre) bewältigt werden. 
        </p>
        <p>
          Darüber hinaus verfügen die Hochleistungs-Steigrohre von K-Aqua über eine coextrudierte mittlere Schicht, die mit mikroskopisch kleinen Glasfasern verstärkt ist (Faserverbundrohr). Diese Faserverstärkung übernimmt eine kritische Funktion in der thermischen Längenausdehnung. Wenn heißes Heizungswasser durch ein Kunststoffrohr fließt, dehnt sich dieses naturgemäß in der Länge aus. Die integrierte Glasfaserschicht reduziert diese Längenausdehnung um fast 75 % im Vergleich zu reinem PP-R und bringt das Verhalten des Rohrs annähernd auf das Niveau von Metall. Dies reduziert die benötigte Anzahl von Dehnungsbögen (U-Bögen) und Festpunkten im Steigschacht dramatisch und spart wertvollen Installationsplatz.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Statische Entlastung und schweißtechnische Sicherheit</h2>
        <p>
          Ein DN 100 Stahlrohr wiegt im befüllten Zustand gewaltige Lasten. In einem 200 Meter hohen Turm summieren sich diese Lasten zu mehreren Tonnen, die von der Tragstruktur des Steigschachts und der Fundamentplatte aufgenommen werden müssen. K-Aqua PP-RCT wiegt nur einen Bruchteil davon. Diese enorme Gewichtsreduktion hat nicht nur statische Vorteile, sondern beschleunigt auch die Bauzeit enorm. Schwere Lastenaufzüge, Winden und stählerne Schwerlastkonsolen können oft kleiner dimensioniert werden oder komplett entfallen. Die Rohre lassen sich von den Installateuren händisch im Schacht manövrieren.
        </p>
        <p>
          Zusätzlich eliminiert PP-RCT das Risiko der Brandgefahr (Hot Works). Das Schweißen von Stahlrohren im Rohbau erfordert offene Flammen, Funkenflug und aufwendige Brandsicherheitswachen. Das K-Aqua System wird vollkommen brandsicher über elektrische Heizwendelmuffen oder Heizelementstumpfschweißung montiert. Die so entstandenen Verbindungen sind auf molekularer Ebene stoffschlüssig verschmolzen – es gibt keine Dichtringe, die unter dem extremen Wasserdruck herausgepresst werden könnten.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Akustischer Komfort in der Luxusklasse</h3>
        <p>
          Wohnhochhäuser im Premium-Segment verlangen perfekte Schallisolation. Bei Stahlrohren übertragen sich die Fließgeräusche des Wassers, die Kavitation an Armaturen und insbesondere die sogenannten „Knackgeräusche“ bei der thermischen Ausdehnung des Rohrs in den Schellen als Körperschall ungehindert in das Mauerwerk und die angrenzenden Schlafzimmer.
        </p>
        <p>
          PP-RCT ist ein Polymer mit ausgezeichneten viskoelastischen Eigenschaften. Das Material wirkt wie ein gigantischer Schalldämpfer. Strömungsgeräusche und Vibrationen der Heizungsumwälzpumpen werden von der molekularen Struktur des Rohrs absorbiert und nicht in die Bauwerkstruktur abgeleitet. Diese akustische Entkopplung steigert den Wohnkomfort drastisch und macht K-Aqua zur ersten Wahl für Luxus-Appartements und 5-Sterne-Hotels.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Sauerstoffdichtheit und Systemintegrität</h2>
        <p>
          In geschlossenen Heizungskreisläufen ist Sauerstoff der größte Feind der metallischen Komponenten (Kessel, Pumpen, Wärmetauscher). Diffundiert Sauerstoff durch die Rohrwandung, entsteht Magnetit und Korrosion. Um dies bei Kunststoffrohren zu verhindern, bietet K-Aqua Steigleitungen mit einer hochdichten EVOH-Sperrschicht (Ethylen-Vinylalkohol-Copolymer). Diese feine Schicht blockiert das Eindringen von Sauerstoffmolekülen gemäß DIN 4726 zu 100 %.
        </p>
        <p>
          Somit kombiniert K-Aqua PP-RCT die Vorteile beider Welten: Das System ist durch die EVOH-Schicht so sauerstoffdicht wie ein Metallrohr, aber gleichzeitig absolut korrosionsfrei, extrem leicht, schalldämmend und dauerhaft dicht. Für die TGA-Planung von Hochhäusern bedeutet dies maximale Risikominimierung, reduzierte Betriebskosten (durch konstante hydraulische Glätte ohne Rohrreibung durch Rost) und den Schutz des Bauwerks über Generationen.
        </p>
      </section>

      {/* CTABand: TGA Support */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Highriseprojekt?"
          subtitle="Überlassen Sie uns die statische Berechnung. Unsere Ingenieure dimensionieren Ihre Steigleitungen, planen Dehnungsbögen und definieren die exakten Positionen für Festpunkte."
          buttonText="Berechnungsservice anfragen"
          buttonLink="/kontakt"
          icon={<Building2 className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
