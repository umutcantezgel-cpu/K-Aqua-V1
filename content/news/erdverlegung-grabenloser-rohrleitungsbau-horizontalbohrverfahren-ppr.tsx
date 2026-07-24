import React from "react";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Pickaxe, TrendingUp, ShieldCheck, Route } from "@/components/ui/icon";

export const erdverlegungGrabenlos: NewsPost = {
  slug: "erdverlegung-grabenloser-rohrleitungsbau-horizontalbohrverfahren-ppr",
  title: {
    de: "Erdverlegung: Grabenloser Rohrleitungsbau & HDD",
    en: "Underground Installation: Pipeline Construction",
    ar: "التمديد تحت الأرض: إنشاء خطوط الأنابيب"
  },
  date: "2025-02-04",
  teaser: {
    de: "Straßen aufzureißen ist extrem teuer und stört die Infrastruktur. Erfahren Sie, wie K-Aqua PP-R Rohrsysteme durch das grabenlose HDD-Verfahren (Horizontal Directional Drilling) Tiefbaukosten drastisch reduzieren, CO2 einsparen und höchste Längskraftschlüssigkeit garantieren.",
    en: "Trenchless installation drastically reduces civil engineering costs and emissions.",
    ar: "التركيب بدون خنادق يقلل بشكل كبير من تكاليف الهندسة المدنية والانبعاثات."
  },
  excerpt: {
    de: "Straßen aufzureißen ist extrem teuer und stört die Infrastruktur. Erfahren Sie, wie K-Aqua PP-R Rohrsysteme durch das grabenlose HDD-Verfahren (Horizontal Directional Drilling) Tiefbaukosten drastisch reduzieren, CO2 einsparen und höchste Längskraftschlüssigkeit garantieren.",
    en: "Tearing up roads is expensive and disrupts infrastructure. Learn how K Aqua PPR pipe systems drastically reduce civil engineering costs and sustainably lower CO2 emissions through the HDD method.",
    ar: "إن حفر الطرق مكلف ويعطل البنية التحتية. تعرف على كيف تعمل أنظمة أنابيب PPR من K Aqua على تقليل تكاليف الهندسة المدنية بشكل كبير وخفض انبعاثات ثاني أكسيد الكربون بشكل مستدام من خلال تقنية الحفر الموجه الأفقي (HDD)."
  },
  coverImage: "/images/news/trenchless-hdd-pipe-installation.jpg",
  category: "Installation & Praxis",
  tags: ["Erdverlegung", "HDD", "Grabenlos", "Infrastruktur", "Tiefbau", "PP-R", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Pickaxe className="w-5 h-5" />
                  <span>Tiefbau & Infrastruktur</span>
                </div>
              }
              title="Unterirdisch zum Ziel: Die HDD-Revolution"
              lead="Die offene Bauweise – also das massive Aufreißen von Straßenkreuzungen, Gehwegen und asphaltierten Industrieflächen – verschlingt beim Bau von Nahwärmenetzen, Kühlwasserleitungen oder industriellen Medientrassen oftmals weit über 70% des gesamten Projektbudgets. Das grabenlose Horizontalspülbohrverfahren (HDD - Horizontal Directional Drilling) stellt hier die weitaus elegantere, wirtschaftlichere und umweltschonendere Alternative dar. K-Aqua PP-R Systeme sind durch ihre enorme Zähigkeit, materialspezifische Flexibilität und absolute Längskraftschlüssigkeit (Zugfestigkeit durch Polyfusion) die prädestinierte Wahl für diese anspruchsvolle, unterirdische Verlegetechnik."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Content */}
      <Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground mt-8 px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Warum das Rohrmaterial beim HDD über Sieg oder Niederlage entscheidet</h2>
          <p>
            Beim HDD-Verfahren wird der komplette Rohrstrang (oft hunderte Meter lang) oberirdisch verschweißt und anschließend mit immenser hydraulischer Zugkraft durch einen vorbereiteten Bohrkanal unter der Erde hindurchgezogen. Dieser Einzugsprozess (Pullback) ist der kritischste Moment des gesamten Bauprojekts.
          </p>
          <p>
            Steckmuffensysteme oder Rohre mit mechanischen Verbindern würden bei diesen tonnenschweren Zuglasten sofort auseinanderreißen. Auch spröde Materialien (wie PVC-U oder Guss) bergen das extreme Risiko, an Steinen im Bohrkanal zu brechen oder tiefe Riefen davonzutragen. K-Aqua PP-R (Polypropylen-Random) wird hingegen thermisch stumpf- oder heizwendelgeschweißt. Diese Schweißnähte weisen exakt die gleiche Zugfestigkeit auf wie das Rohr selbst (100% Längskraftschlüssigkeit). Der Strang verhält sich beim Einzug wie ein einziges, unendlich langes, monolithisches Stück Kunststoff.
          </p>
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Kerbunempfindlichkeit und Rissfortschritt</h3>
          <p>
            Der unterirdische Bohrkanal ist rau. Scharfkantige Kiesel, Felsbrocken oder alte Bauwerksreste schaben während des Einzugs unvermeidlich an der Rohraußenwand. PP-R verfügt über eine exzellente Kerbunempfindlichkeit und einen extrem hohen Widerstand gegen langsamen Rissfortschritt (Slow Crack Growth, SCG). Selbst wenn Kratzer entstehen, die bis zu 10 % der Rohrwandstärke tief sind, wird die langfristige Innendruckfestigkeit und die zertifizierte Lebensdauer von 50 Jahren dadurch physikalisch nicht beeinträchtigt.
          </p>
        </div>
      </Reveal>

      {/* Stagger: Der HDD Prozess */}
      <Reveal>
        <SectionHead
          title="Der Ablauf der Horizontalspülbohrung"
          lead="Drei hochtechnologische Schritte zur unsichtbaren Rohrleitung."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Die gesteuerte Pilotbohrung",
                description: "Ein asymmetrischer, steuerbarer Bohrkopf bohrt sich punktgenau von der Start- zur Zielgrube. Dank elektromagnetischer Ortungstechnik an der Oberfläche kann der Bohrkopf bestehenden Hindernissen (Gasleitungen, Stromkabel, Findlinge) unterirdisch dreidimensional ausweichen."
              },
              {
                title: "2. Das Räumen (Aufweiten / Reaming)",
                description: "In der Zielgrube wird der Bohrkopf demontiert und gegen einen Räumer (Reamer) ausgetauscht. Dieser wird unter ständiger Rotation zurückgezogen, um das Bohrloch aufzuweiten. Es muss stets etwa 1,3- bis 1,5-mal größer sein als der Außendurchmesser des einzuziehenden PP-R Rohrs."
              },
              {
                title: "3. Der Rohreinzug (Pullback)",
                description: "Der oberirdisch komplett vorgeschweißte K-Aqua Rohrstrang wird an den Reamer gekoppelt und unter permanenter Zugabe von Bentonit (einer speziellen Ton-Mineral-Bohrspülung zur Stützung des Kanals und Schmierung) in einem einzigen kontinuierlichen Arbeitsgang eingezogen."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Warum PPR für HDD? */}
      <Reveal>
        <SectionHead
          title="Die entscheidenden Materialvorteile von PP-R"
          lead="Nicht jedes Rohr übersteht die mechanischen Extrembelastungen tief unter der Erde."
        />
        <BentoGrid
          items={[
            {
              title: "Totale Längskraftschlüssigkeit",
              description: "Die Heizelement-Stumpfschweißung oder Heizwendelschweißung verbindet die Rohre auf molekularer Ebene. Es gibt keine mechanischen Schwachstellen. Der Strang hält den gigantischen Zugkräften der HDD-Maschine mühelos stand.",
              icon: <TrendingUp className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Kaltbiegeflexibilität im Erdreich",
              description: "Bohrkanäle verlaufen niemals exakt gerade. PP-R Rohre lassen sich aufgrund ihrer Materialstruktur kalt biegen (Biegeradien abhängig von Außendurchmesser und Temperatur) und folgen den Kurven des Bohrkanals ohne übermäßige Spannungen.",
              icon: <Route className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Immunität gegen Punktlasten",
              description: "Wenn sich nach der Installation Steine im Erdreich gegen das Rohr drücken, führen diese Punktlasten bei starren Rohren oft zum Bruch. PP-R kann solche Belastungen durch viskoelastische Verformung (Kriechen) spannungsfrei abbauen.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Offen vs Grabenlos */}
      <Reveal>
        <SectionHead
          title="Wirtschaftlichkeitsanalyse: Offen vs. Grabenlos"
          lead="Der direkte Projektvergleich zeigt das Einsparpotenzial."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Offene Bauweise (Graben)", "HDD Verfahren mit PP-R"],
            ["Tiefbaukosten & Asphaltierung", "Sehr hoch (Aufbruch & teure Wiederherstellung)", "Minimal (nur Start- und Zielgrube nötig)"],
            ["Bauzeit / Projektlaufzeit", "Wochen bis Monate", "Oft in wenigen Tagen abgeschlossen"],
            ["CO2-Emissionen & Baumaschinen", "Enorm (Bagger, LKW-Flotte für Erdaushub)", "Sehr gering (kleiner Maschinenpark, kein Erdaushub)"],
            ["Infrastruktur & Verkehr", "Straßensperrungen, Umleitungen, Stau", "Verkehr fließt völlig ungestört weiter"],
            ["Rohranforderungen", "Standard", "Zwingend längskraftschlüssig (PP-R)"]
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zum Tiefbau */}
      <Reveal>
        <SectionHead
          title="FAQ: Tiefbau und Erdverlegung"
          lead="Technische Antworten für Planer und Bohrunternehmen."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie berechne ich die maximal zulässige Zugkraft für das PP-R Rohr?",
              a: "Die maximale Zugkraft ist abhängig vom Außendurchmesser, der Rohrwandstärke (SDR-Klasse) und der Rohrwandtemperatur beim Einzug. K-Aqua liefert hierfür präzise Tabellen. Generell gilt: Je dicker die Wand (z.B. SDR 7.4 statt SDR 11), desto höhere Zugkräfte sind sicher möglich."
            },
            {
              q: "Können vorisolierte PP-R Rohre (Isopipes) per HDD eingezogen werden?",
              a: "Ja. Das K-Aqua Isopipe System besitzt einen extrem robusten Außenmantel aus schwarzem PE-HD (High-Density Polyethylen), der sich hervorragend für den HDD-Einzug eignet und das isolierte PP-R Mediumrohr sowie den PUR-Schaum sicher schützt."
            },
            {
              q: "Muss bei der Erdverlegung die thermische Längenausdehnung beachtet werden?",
              a: "Im Erdreich bewirkt die Reibung zwischen der Rohroberfläche (bzw. dem Mantelrohr) und dem verdichteten Erdreich (bzw. Bentonit nach dem Aushärten) eine durchgehende radiale Einspannung. Die Längenausdehnung des PP-R Rohres wird dadurch weitgehend blockiert und in unkritische, materialspezifische Druckspannungen umgewandelt. Festpunkte sind meist nur beim Eintritt ins Gebäude nötig."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: HDD Limits */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "500", u: "m+", l: "Mögliche Einzugslängen in einem Arbeitsgang (abhängig von Geologie und Maschine)." },
              { n: "90", u: "%", l: "Geringerer Bodenaushub im Vergleich zur offenen Bauweise. Eliminiert Deponiekosten." },
              { n: "100", u: "%", l: "Zerstörungsfreie Querung von Autobahnen, Flüssen und Naturschutzgebieten." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Tiefbau-Projekte */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Nahwärme- oder Industrienetz?"
          subtitle="Unsere Projektingenieure beraten Sie umfassend bei der Wahl der richtigen SDR-Klasse für die Zugkräfte beim HDD-Verfahren und liefern maßgeschneiderte, vorisolierte K-Aqua Systeme."
          buttonText="Tiefbau-Projekt besprechen"
          buttonLink="/ressourcen/support"
          icon={<Pickaxe className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
