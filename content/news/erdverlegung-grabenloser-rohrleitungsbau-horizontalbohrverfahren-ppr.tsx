import React from "react";
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
    de: "Erdverlegung: Rohrleitungsbau",
    en: "Underground Installation: Pipeline Construction",
    ar: "التمديد تحت الأرض: إنشاء خطوط الأنابيب"
  },
  date: "2025-02-04",
  teaser: {
    de: "Grabenlose Verlegung reduziert Tiefbaukosten und Emissionen drastisch.",
    en: "Trenchless installation drastically reduces civil engineering costs and emissions.",
    ar: "التركيب بدون خنادق يقلل بشكل كبير من تكاليف الهندسة المدنية والانبعاثات."
  },
  excerpt: {
    de: "Straßen aufzureißen ist teuer und stört die Infrastruktur. Erfahren Sie, wie K-Aqua PP-R Rohrsysteme durch das HDD-Verfahren Tiefbaukosten drastisch reduzieren und CO2-Emissionen nachhaltig einsparen.",
    en: "Tearing up roads is expensive and disrupts infrastructure. Learn how K-Aqua PP-R pipe systems drastically reduce civil engineering costs and sustainably lower CO2 emissions through the HDD method.",
    ar: "إن حفر الطرق مكلف ويعطل البنية التحتية. تعرف على كيف تعمل أنظمة أنابيب PP-R من K-Aqua على تقليل تكاليف الهندسة المدنية بشكل كبير وخفض انبعاثات ثاني أكسيد الكربون بشكل مستدام من خلال تقنية الحفر الموجه الأفقي (HDD)."
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
              title="Unterirdisch zum Ziel"
              lead="Die offene Bauweise – das Aufreißen von Straßen, Gehwegen und Gärten – verschlingt beim Bau von Nahwärmenetzen oder Industrieleitungen den Großteil des Budgets. Das grabenlose Horizontalspülbohrverfahren (HDD - Horizontal Directional Drilling) ist die elegante Alternative. K Aqua PP-R Systeme sind durch ihre enorme Zähigkeit, Flexibilität und verschweißte Längskraftschlüssigkeit die ideale Wahl für diese anspruchsvolle Verlegetechnik."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Der HDD Prozess */}
      <Reveal>
        <SectionHead
          title="Wie funktioniert HDD?"
          lead="Drei Schritte zur unsichtbaren Rohrleitung."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Die Pilotbohrung",
                description: "Ein steuerbarer Bohrkopf bohrt sich von der Start- zur Zielgrube. Dank Ortungstechnik kann der Bohrkopf Hindernissen (wie bestehenden Leitungen oder Felsen) unterirdisch ausweichen."
              },
              {
                title: "2. Das Räumen (Aufweiten)",
                description: "Der Bohrkopf wird in der Zielgrube gegen einen Räumer (Reamer) ausgetauscht. Dieser wird rotierend zurückgezogen, um das Bohrloch auf den benötigten Rohrdurchmesser (meist 1,3 bis 1,5-fach größer als das Rohr) aufzuweiten."
              },
              {
                title: "3. Der Rohreinzug",
                description: "Der komplett vorgeschweißte K Aqua PP-R Rohrstrang wird an den Reamer gekoppelt und unter ständiger Zugabe von Bentonit (Bohrspülung zur Stützung und Schmierung) in einem Stück in den Boden eingezogen."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Warum PP-R für HDD? */}
      <Reveal>
        <SectionHead
          title="Materialvorteile unter Tage"
          lead="Die extremen Kräfte beim Einzug erfordern ein kompromissloses Rohr."
        />
        <BentoGrid
          items={[
            {
              title: "Längskraftschlüssige Verbindungen",
              description: "Die Heizelement-Stumpfschweißung verbindet die PP-R Rohre zu einem homogenen Strang. Die Schweißnaht ist genauso zugfest wie das Rohr selbst, weshalb das Rohr beim Einzug nicht abreißen kann.",
              icon: <TrendingUp className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Flexibilität & Biegeradius",
              description: "Der Bohrkanal verläuft in Kurven. PP-R Rohre lassen sich kalt biegen (abhängig von Durchmesser und Temperatur), wodurch sie dem unterirdischen Bohrverlauf problemlos folgen.",
              icon: <Route className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Kratz- & Riefenunempfindlichkeit",
              description: "Steine im Bohrkanal kratzen über die Rohroberfläche. PP-R ist extrem kerbunempfindlich, wodurch Kratzer (bis zu 10% der Wandstärke) die Druckfestigkeit des Rohres nicht beeinträchtigen.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "medium"
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
              { n: "500", u: "m", l: "Und mehr: Mögliche Einzugslängen in einem einzigen Arbeitsgang (abhängig von Bodenklasse)." },
              { n: "90", u: "%", l: "Geringerer Aushub im Vergleich zur offenen Bauweise. Reduziert Deponiekosten massiv." },
              { n: "1,5", u: "x", l: "Das Bohrloch muss ca. 1,5-mal so groß sein wie der Rohraußendurchmesser." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Offen vs Grabenlos */}
      <Reveal>
        <SectionHead
          title="Kosten- & Umwelt-Vergleich"
          lead="Warum Tiefbauämter zunehmend die grabenlose Verlegung fordern."
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Offene Bauweise (Graben)", "Grabenlose Bauweise (HDD)"],
            ["Baukosten (Asphalt/Stadt)", "Sehr hoch (Oberflächenwiederherstellung)", "Niedrig bis Mittel"],
            ["Bauzeit", "Lang (Wochen)", "Sehr kurz (oft in Tagen abgeschlossen)"],
            ["CO2-Emissionen (Baumaschinen)", "Hoch (Bagger, LKW für Erdaushub)", "Sehr gering"],
            ["Verkehrsbehinderung", "Total (Straßensperrungen nötig)", "Minimal (nur Start-/Zielgrube)"],
            ["Bodenklassen", "Nahezu alle", "Kritisch bei extrem weichem Sand oder massivstem Fels"]
          ]}
        />
      </Reveal>

      {/* CTABand: Tiefbau-Projekte */}
      <Reveal>
        <CTABand
          title="Nahwärme- oder Industrienetz geplant?"
          subtitle="Wir beraten Sie bei der Wahl der richtigen SDR-Klasse für die enormen Zugkräfte beim HDD-Verfahren und liefern vorisolierte K Aqua Systeme für unterirdische Trassen."
          buttonText="Projekt besprechen"
          buttonLink="/ressourcen/support"
          icon={<Pickaxe className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
