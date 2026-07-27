import React from "react";
import { Link as NavLink } from "@/lib/i18n/navigation";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Zap, Hammer, Flame, Settings } from "@/components/ui/icon";

export const schweissverfahrenVergleich: NewsPost = {
  slug: "schweissverfahren-vergleich-heizelementmuffenschweissung-heizwendel-ppr",
  title: {
    de: "PP-R Schweißverfahren: Muffe vs. Heizwendel",
    en: "PPR Welding Methods in Comparison",
    ar: "مقارنة طرق لحام PPR",
  },
  date: "2025-01-20",
  excerpt: {
    de: "Die stoffschlüssige Polyfusion ist das Geheimnis langlebiger Rohrnetze. Erfahren Sie tiefgreifend, wann klassisches Heizelementmuffenschweißen und wann hochtechnologisches Heizwendelschweißen (Elektromuffen) die optimale Wahl auf der Baustelle sind.",
    en: "The cohesive joint is the secret of durable PPR pipe systems. Discover in our comparison when classic socket fusion welding and when electrofusion (heating coil) welding are the optimal choice in plumbing and heating technology.",
    ar: "الوصلة المتماسكة هي سر متانة أنظمة أنابيب PPR. اكتشف في هذه المقارنة متى يكون اللحام الكلاسيكي بالاندماج التجويفي ومتى يكون اللحام بالصهر الكهربائي (ملف التسخين) هو الخيار الأمثل في تكنولوجيا السباكة والتدفئة.",
  },
  coverImage: "/images/news/welding-methods-comparison.jpg",
  category: "Verarbeitung & Montage",
  tags: ["Schweißen", "Heizwendel", "Elektromuffe", "Muffenschweißen", "Handwerk", "Montage", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Flame className="w-5 h-5" />
                  <span>Verbindungstechnik & Handwerk</span>
                </div>
              }
              title="Zwei Bauteile, ein Werkstück: Die Magie der Polyfusion"
              lead="Im Gegensatz zu klassischen metallischen Systemen, die oftmals verpresst, gelötet oder verschraubt werden, nutzt K-Aqua die thermische Polyfusion (Schmelzschweißen). Dabei verschmelzen PP-R Rohr und Fitting auf molekularer Ebene untrennbar miteinander. Ermüdende O-Ringe, Dichtungspasten oder anfällige Pressindikatoren, die im Laufe der Jahre porös werden und zu fatalen Wasserschäden führen könnten, sind absolut überflüssig. Für die Herstellung dieser perfekten, 100% stoffschlüssigen Verbindung stehen in der Praxis hauptsächlich zwei zertifizierte Verfahren zur Verfügung: Das Heizelementmuffenschweißen (der Standard) und das Heizwendelschweißen per Elektromuffe (der Problemlöser)."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Content */}
      <Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground mt-8 px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Die Physik des Verschmelzens (Makromolekulare Verhakung)</h2>
          <p>
            Polypropylen ist ein Thermoplast. Wird es auf ca. 260 °C erhitzt, geht das Material vom festen in einen viskosen (plastischen) Schmelzzustand über. In diesem Moment lösen sich die geordneten Kristallstrukturen auf und die langen Polymerketten werden beweglich. 
          </p>
          <p>
            Werden nun das geschmolzene Rohrende und die geschmolzene Muffeninnenseite unter leichtem Druck (Fügedruck) ineinandergeschoben, dringen die Polymerketten beider Bauteile tief ineinander ein und verhaken sich (Interdiffusion). Kühlt die Verbindung anschließend an der ruhenden Luft ab, kristallisiert das Material neu aus. Es entsteht ein neues, völlig homogenes Kristallgitter. Die Grenzfläche zwischen Rohr und Fitting verschwindet vollständig, die Bauteile sind fortan ein einziger, monolithischer Block.
          </p>
          
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Chemische und mechanische Integrität der Schweißnaht</h3>
          <p>
            Ein entscheidender Vorteil dieser Fügetechnik ist der Erhalt der vollen chemischen Widerstandsfähigkeit. Bei geklebten oder mechanisch gefügten Systemen (wie etwa bei PVC oder metallischen Pressfittings) stellt das Verbindungselement oftmals die schwächste Stelle im gesamten Rohrnetz dar, insbesondere beim Transport aggressiver Medien oder bei hohen Temperaturschwankungen. Die Schweißnaht eines K-Aqua PP-R Systems hingegen besteht zu 100 % aus dem identischen Basispolymer. Dadurch ist das gesamte Netz absolut dicht, langlebig und widersteht denselben statischen, thermischen und chemischen Belastungen wie das extrudierte Vollrohr selbst. Es gibt keine Kapillarwirkung, durch die Feuchtigkeit eindringen könnte, und keine elektrochemische Spannungsreihe, die Korrosion auslösen würde.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Qualitätssicherung bei der Montage</h3>
          <p>
            Die Qualität der Schweißverbindung steht und fällt mit der Einhaltung der korrekten Verarbeitungsrichtlinien (nach DVS 2207-11). Sauberkeit ist hierbei das oberste Gebot. Jede Verunreinigung durch Staub, Öl, Feuchtigkeit oder auch nur Handschweiß auf der Fügefläche wirkt wie eine Trennschicht und verhindert die molekulare Verhakung. Dies kann später zu Rissen unter Druckbelastung führen. Daher müssen Rohrenden und Muffen unmittelbar vor dem Schweißvorgang mit einem geeigneten, rückstandsfrei verdunstenden Kunststoffreiniger (z.B. Isopropanol) gereinigt werden. Zudem ist bei der Heizwendelschweißung das rückstandsfreie Abschälen der oxidierten Oberfläche zwingend vorgeschrieben, um die plastische Kernschmelze zu erreichen.
          </p>
        </div>
      </Reveal>

      {/* BentoGrid: Die Einsatzgebiete */}
      <Reveal>
        <SectionHead
          title="Welches Schweißverfahren für welchen Baustellen-Zweck?"
          lead="Die baulichen Gegebenheiten und Platzverhältnisse entscheiden über die Wahl der Technik."
        />
        <BentoGrid
          items={[
            {
              title: "Heizelementmuffenschweißen (Der Standard)",
              description: "Der absolute Allrounder für die Dimensionen DN 16 bis DN 125. PP-R Rohr und Fitting werden gleichzeitig manuell auf einem teflonbeschichteten Heizdorn auf 260°C erwärmt und ineinandergefügt. Extrem kostengünstig und pfeilschnell bei der freien Vorfertigung an der Werkbank.",
              icon: <Hammer className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Heizwendelschweißen (Der Problemlöser)",
              description: "Die Elektromuffe für schwer zugängliche Bereiche. Ein im Fitting eingegossener Widerstandsdraht übernimmt das Aufschmelzen von innen. Unverzichtbar bei Reparaturen im engen Schacht, unter der Decke oder bei den finalen Verbindungsnähten starrer Rohrstränge.",
              icon: <Zap className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Stumpfschweißen (Die Großrohr-Lösung)",
              description: "Eingesetzt ab Dimension DN 160. Es werden keine Fittings benötigt. Die massiven Rohrenden werden plangefräst, an einem Heizspiegel erwärmt und mithilfe vollautomatisierter Hydraulikmaschinen exakt aneinandergedrückt.",
              icon: <Settings className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Heizwendel vs. Muffenschweißen */}
      <Reveal>
        <SectionHead
          title="Vergleich der Systeme in der Praxis"
          lead="Wo liegen die Stärken und Herausforderungen für den Installateur?"
        />
        <DeepMatrix
          data={[
            ["Kriterium", "Heizelementmuffenschweißen", "Heizwendelschweißen (Elektromuffe)"],
            ["Benötigtes Werkzeug", "Schweißgerät (Schwert) mit Heizdornen", "Heizwendelschweißautomat, Schälgerät"],
            ["Platzbedarf & Flexibilität", "Gering (Das Schwert braucht viel Platz zum Ausziehen)", "Sehr hoch (Nur Fitting und zwei Kabel nötig)"],
            ["Materialkosten (Fittings)", "Sehr günstig (reiner Spritzguss)", "Höher (eingegossene Kupferdrähte & Barcode)"],
            ["Montagegeschwindigkeit", "Sehr schnell (Wenige Sekunden Anwärmzeit)", "Länger (Automatisierter Schweiß- und Abkühlprozess)"],
            ["Rohrvorbereitung", "Zuschneiden, Reinigen, Anzeichnen", "Zuschneiden, Zwingendes Abschälen, Reinigen"]
          ]}
        />
      </Reveal>

      {/* Stagger: Der Ablauf beim Heizwendelschweißen */}
      <Reveal>
        <SectionHead
          title="Präzision entscheidet: Ablauf einer Heizwendelschweißung"
          lead="Die Vorbereitung ist bei Elektromuffen der kritischste Erfolgsfaktor für eine DVS-gerechte Verbindung."
          align="center"
        />
        <div className="mt-8">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal key="1">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold mb-2">1. Oxidschicht zwingend abschälen</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Kunststoff oxidiert an der äußersten Oberfläche natürlich durch UV-Licht und Luftsauerstoff. Diese Oxidschicht schmilzt zwar, verbindet sich aber nicht. Das Rohrende muss daher vor dem Heizwendelschweißen zwingend mit einem Rotationsschälgerät bearbeitet (ca. 0,2 mm Materialabtrag) werden.
                </p>
              </div>
            </Reveal>
            <Reveal key="2">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold mb-2">2. Spannungsfrei fixieren</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Das geschälte Rohr wird gereinigt und in die kalte Elektromuffe geschoben. Da sich die Schmelze beim Erhitzen stark ausdehnt, entstehen enorme Rückstellkräfte. Die Rohre müssen mit Halteklemmen mechanisch fixiert werden, damit sie während des Schweißens nicht aus der Muffe gedrückt werden.
                </p>
              </div>
            </Reveal>
            <Reveal key="3">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold mb-2">3. Automatisierter Schweißprozess</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Das Schweißgerät liest den Barcode auf der Elektromuffe mittels Scanner ein. Der Automat regelt nun die Stromstärke, die Schweißzeit und den Energieeintrag völlig autark und fehlerfrei, exakt abgestimmt auf die aktuelle Umgebungstemperatur und die Dimension.
                </p>
              </div>
            </Reveal>
          </Stagger>
        </div>
      </Reveal>

      {/* DeepFAQ: Expertenfragen zur Schweißtechnik */}
      <Reveal>
        <SectionHead
          title="FAQ: DVS-Konforme Schweißtechnik"
          lead="Wichtiges Praxiswissen zur Fehlervermeidung auf der Baustelle."
        />
        <DeepFAQ
          items={[
            {
              q: "Was ist eine 'Kalte Schweißnaht' und wie entsteht sie?",
              a: "Eine kalte Naht sieht von außen intakt aus, hält aber Druckstößen nicht stand. Ursachen sind meist: Zu kurze Anwärmzeit (Material nicht durchgeschmolzen), zu kalte Umgebung ohne Windschutz, Verunreinigungen (Fett/Wasser) oder das Vergessen des Schälen vor der Heizwendelschweißung."
            },
            {
              q: "Darf man K-Aqua PP-R bei Minustemperaturen im Winter schweißen?",
              a: "Gemäß DVS-Richtlinien ist das Schweißen unter +5 °C kritisch. Durch die extreme Kälte kühlt die Schmelze beim Umsetzen von Heizdorn zu Fitting zu schnell aus. Bei Frost muss der Arbeitsbereich zwingend eingehaust (Zelt) und mittels Heizlüftern temperiert werden."
            },
            {
              q: "Darf ich die Verbindung nach dem Schweißen mit kaltem Wasser kühlen?",
              a: "Nein, auf gar keinen Fall! Das plötzliche, schockartige Abschrecken der weichen Schmelze führt zu enormen inneren Spannungen und Mikrorissen im Kristallgitter des Kunststoffs. Die Verbindung muss zwingend an der ruhenden Umgebungsluft natürlich abkühlen."
            },
            {
              q: "Warum ist die Einstecktiefe beim Heizelementmuffenschweißen so wichtig?",
              a: "Wird das Rohr zu tief in den Fitting oder auf den Dorn gepresst (Gewaltmontage), staucht sich die heiße Schmelze an der inneren Anschlagkante auf. Es bildet sich ein massiver Wulst im Inneren, der den Rohrquerschnitt stark verengt, Turbulenzen erzeugt und den Druckverlust drastisch erhöht."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Verbindungsfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "260", u: "°C", l: "Die exakte, normierte Schweißtemperatur am teflonbeschichteten Heizdorn." },
              { n: "100", u: "%", l: "Stoffschlüssigkeit. Aus zwei Werkstücken entsteht ein untrennbares Monoblock-System." },
              { n: "0", l: "O-Ringe, Pressindikatoren oder Teflonband. Anfällige Dichtungsmaterialien entfallen." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Schulungen */}
      <Reveal>
        <CTABand>
          <h3 className="text-2xl md:text-3xl font-bold">Eine Schweißnaht ist nur so gut wie das Handwerk</h3>
          <p className="text-inverse-foreground/80 leading-relaxed">
            Minimieren Sie Fehlerquellen und sichern Sie die Dichtheit Ihrer Großprojekte. Buchen Sie jetzt eine DVS-konforme, zertifizierte Schweißerschulung für K-Aqua PP-R Rohrsysteme für Ihr Montageteam.
          </p>
          <NavLink href="/kontakt" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors mt-2">
            Zertifizierungsschulung anfragen
          </NavLink>
        </CTABand>
      </Reveal>

    </div>
  ),
};
