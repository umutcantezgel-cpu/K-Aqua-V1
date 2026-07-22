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
    de: "Offene Rohrgräben blockieren Städte und zerstören Landschaften. Entdecken Sie, wie hochflexible K Aqua PP-R Rohre grabenlose Verlegeverfahren wie Horizontalspülbohren ermöglichen, Tiefbaukosten reduzieren und CO2-Emissionen nachhaltig einsparen.",
    en: "Open pipe trenches block cities and destroy landscapes. Discover how highly flexible K Aqua PP-R pipes enable trenchless installation methods such as horizontal directional drilling, reduce civil engineering costs and sustainably lower CO2 emissions through the HDD method.",
    ar: "خنادق الأنابيب المفتوحة تسد المدن وتدمر المناظر الطبيعية. اكتشف كيف تمكن أنابيب K Aqua PP-R عالية المرونة من طرق التركيب بدون حفر مثل الحفر الأفقي الموجه، مما يقلل تكاليف الهندسة المدنية بشكل كبير ويخفض انبعاثات ثاني أكسيد الكربون بشكل مستدام من خلال تقنية الحفر الموجه الأفقي (HDD)."
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
              lead="Die Modernisierung urbaner Infrastruktur steht oft im direkten Konflikt mit dem alltäglichen Leben. Offene Baugruben legen den Straßenverkehr lahm, rufen Anwohnerproteste hervor und ziehen enorme Tiefbaukosten nach sich. K Aqua PP-R Systeme bieten hier eine hochmoderne Lösung: Grabenloser Leitungsbau (Trenchless Technology). Durch das Horizontalspülbohrverfahren (HDD – Horizontal Directional Drilling) können Versorgungsleitungen punktgenau unter Flüssen, Autobahnen, Naturschutzgebieten und denkmalgeschützten Innenstädten hindurchgezogen werden. Ihre enorme Zähigkeit, Flexibilität und verschweißte Längskraftschlüssigkeit machen sie zur idealen Wahl für diese anspruchsvolle Verlegetechnik."
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
                description: "Im Gegensatz zu starren Stahlrohren oder Gussrohren verfügt PP-R über eine enorme Eigenflexibilität. Endlos geschweißte Rohrstränge können der gebogenen Bohrtrasse des HDD-Verfahrens mühelos durch den Untergrund folgen und Hindernissen (wie bestehenden Leitungen oder Felsen) unterirdisch ausweichen."
              },
              {
                title: "2. Das Räumen (Aufweiten)",
                description: "Stumpfschweißungen von K Aqua Rohren verbinden die Elemente absolut formschlüssig. Es entstehen keine Wulste oder Muffen, die beim Einzug in das Bohrloch verkanten oder abreißen könnten. Ein Räumer (Reamer) wird rotierend zurückgezogen, um das Bohrloch auf den benötigten Rohrdurchmesser (meist 1,3 bis 1,5-fach größer als das Rohr) aufzuweiten."
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
          lead="Können K Aqua Rohre beim Einzug zerkratzen und so an Druckfestigkeit verlieren?"
        />
        <BentoGrid
          items={[
            {
              title: "Längskraftschlüssige Verbindungen",
              description: "K Aqua Rohre benötigen keine korrosionsanfälligen Zugköpfe aus Metall. Die Zugkraft wird durch speziell verschweißte PP-R Zugköpfe übertragen. Das Rohr hält selbst immensen Zugkräften stand, während es in das gebohrte Profil eingezogen wird – vollkommen ohne Streckgrenzüberschreitung.",
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
              description: "Oberflächliche Riefen, die beim HDD-Verfahren entstehen, sind einkalkuliert. Die außerordentliche Wandstärke und Zähigkeit des PP-R Materials sichert den Betriebsdruck dennoch für über 50 Jahre ab.",
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
