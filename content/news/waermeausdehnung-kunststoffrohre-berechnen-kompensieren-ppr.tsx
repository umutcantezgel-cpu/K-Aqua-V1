import React from "react";
import { NewsPost } from "./index";
import { Link } from "@/lib/i18n/navigation";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { MoveHorizontal, Ruler, Info } from "@/components/ui/icon";

export const waermeausdehnungKunststoffrohre: NewsPost = {
  slug: "waermeausdehnung-kunststoffrohre-berechnen-kompensieren-ppr",
  title: {
    de: "PP-R Wärmeausdehnung berechnen",
    en: "Thermal Expansion in PPR Pipes",
    ar: "التمدد الحراري في أنابيب PPR",
  },
  date: "2025-01-22",
  teaser: {
    de: "Thermische Längenausdehnung ist die größte Herausforderung bei Kunststoffrohren. Erfahren Sie, wie Sie diese präzise berechnen und Längenausdehnungen in K-Aqua Rohrsystemen durch Dehnungsbögen, Biegeschenkel und Festpunkte absolut sicher kompensieren.",
    en: "Learn how to precisely calculate thermal expansion in PPR plastic pipes and safely compensate for linear expansion in piping systems using expansion loops, bending legs, and fixed points.",
    ar: "تعرف على كيفية حساب التمدد الحراري بدقة في الأنابيب البلاستيكية PPR وتعويض التمدد الطولي بأمان في أنظمة الأنابيب باستخدام حلقات التمدد، وأذرع الانحناء، والنقاط الثابتة.",
  },
  excerpt: {
    de: "Thermische Längenausdehnung ist die größte Herausforderung bei Kunststoffrohren. Erfahren Sie, wie Sie diese präzise berechnen und Längenausdehnungen in K-Aqua Rohrsystemen durch Dehnungsbögen, Biegeschenkel und Festpunkte absolut sicher kompensieren.",
    en: "Learn how to precisely calculate thermal expansion in PPR plastic pipes and safely compensate for linear expansion in piping systems using expansion loops, bending legs, and fixed points.",
    ar: "تعرف على كيفية حساب التمدد الحراري بدقة في الأنابيب البلاستيكية PPR وتعويض التمدد الطولي بأمان في أنظمة الأنابيب باستخدام حلقات التمدد، وأذرع الانحناء، والنقاط الثابتة.",
  },
  coverImage: "/images/news/thermal-expansion-pipes.jpg",
  category: "Planung & Berechnung",
  tags: ["Wärmeausdehnung", "Längenausdehnung", "Festpunkt", "Kompensator", "Planung", "PPR Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MoveHorizontal className="w-5 h-5" />
                  <span>Physik & TGA-Planung</span>
                </div>
              }
              title="Wenn das Rohrsystem lebendig wird: Thermische Ausdehnung"
              lead="Die Physik lässt sich nicht umgehen: Jedes Material dehnt sich bei Erwärmung aus (Zunahme der Gittervibration) und zieht sich bei Abkühlung zusammen. Bei thermoplastischen Kunststoffrohren wie Polypropylen (PP-R) ist dieser Effekt der Längenausdehnung bei Temperaturschwankungen signifikant ausgeprägter als bei metallischen Systemen. Fließt 70°C heißes Vorlaufwasser durch eine Rohrleitung, die im Winterrohbau bei 10°C montiert wurde, dehnt sich das PP-R System auf einer Strecke von 20 Metern um etliche Zentimeter aus. Wird diese thermische Längenausdehnung (ΔL) in der Anlagenplanung ignoriert, entstehen enorme mechanische Zwangspannungen, die Halterungen verbiegen, Wände beschädigen oder das Rohrsystem zum Reißen bringen."
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Glasfasertechnologie als Gamechanger</h2>
          <p>
            Standard PP-R Rohre weisen einen Längenausdehnungskoeffizienten (α) von 0,15 mm/(m·K) auf. Das bedeutet, dass sich ein 10 Meter langes Rohr bei einer Temperaturerhöhung um 50 Kelvin um stolze 75 Millimeter ausdehnt. In industriellen Hallen oder langen Versorgungsschächten von Hochhäusern müssten riesige Dehnungsbögen eingeplant werden (oft international recherchiert als "Thermal Expansion in PPR Pipes" oder "التمدد الحراري في أنابيب PPR"), die wertvollen Platz beanspruchen. Ohne diese Vorkehrungen würde das System enormen Druck auf die Gebäudeinfrastruktur ausüben, was letztendlich zum Versagen der Schweißnähte oder zum Abreißen von Halterungen führt.
          </p>
          <p>
            Die revolutionäre Lösung hierfür ist die Coextrusion von Glasfaser. Bei den hochmodernen K-Aqua Faserverbundrohren (PP-R/GF) wird eine spezielle Schicht aus glasfaserverstärktem Polypropylen in die Rohrwand integriert. Diese Schicht fungiert als ein mechanisches Korsett. Sie reduziert die Längenausdehnung des Kunststoffs dramatisch auf nur noch 0,035 mm/(m·K), eine Reduktion um fast 75 %! Das Expansionsverhalten nähert sich damit dem von metallischen Rohren an. Der Montageaufwand für Halterungen sinkt, die Abstände der Befestigungsschellen können drastisch vergrößert werden, und die benötigten Dehnungsbögen schrumpfen auf ein Minimum zusammen.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Die exakte Berechnung des Biegeschenkels (LBS)</h3>
          <p>
            Wenn Sie die PP-R Wärmeausdehnung berechnen, ist neben der reinen Bestimmung der Längenänderung (ΔL) auch die korrekte Dimensionierung des Biegeschenkels (LBS) entscheidend. Moderne PP-R und PP-RCT Rohrsysteme sind speziell für anspruchsvolle thermische Bedingungen ausgelegt, erfordern jedoch eine präzise Planung, um Zwängungsspannungen zu vermeiden. Der Biegeschenkel ist die Rohrstrecke ab der Richtungsänderung bis zum nächsten Festpunkt, die frei federn muss, um die Ausdehnung der Hauptstrecke aufzunehmen. Die Berechnung erfolgt nach der branchenüblichen Formel: LBS = k × √(d × ΔL). Hierbei ist "k" eine materialspezifische Konstante (für PP-R meist 15), "d" der Rohraußendurchmesser in Millimetern und "ΔL" die zuvor berechnete Längenänderung. Wenn der so berechnete Biegeschenkel in der Baupraxis aufgrund von Platzmangel nicht realisierbar ist, muss zwingend ein U-Bogen (Dehnungsbogen) aus vier 90°-Winkeln konstruiert werden, der die thermischen Kräfte in sich selbst aufnimmt und neutralisiert.
          </p>
        </div>
      </Reveal>

      {/* DeepMatrix: Ausdehnungskoeffizienten */}
      <Reveal>
        <SectionHead
          title="Materialien im gnadenlosen Vergleich"
          lead="Der Längenausdehnungskoeffizient (Alphawert) bestimmt direkt das erforderliche Platzangebot im Installationsschacht."
        />
        <DeepMatrix
          data={[
            ["Material", "Ausdehnungskoeffizient α", "Ausdehnung bei ΔT = 50K und 10m Rohrlänge", "Schellenabstand (Vergleich)"],
            ["PP-R (Standard-Kunststoffrohr)", "0,150 mm/(m·K)", "75,0 mm", "Gering (Viele Halterungen nötig)"],
            ["K-Aqua Faserverbundrohr (PP-R/GF)", "0,035 mm/(m·K)", "17,5 mm", "Hoch (Weniger Halterungen)"],
            ["Kupferrohr", "0,017 mm/(m·K)", "8,5 mm", "Sehr Hoch"],
            ["Stahl (verzinkt)", "0,012 mm/(m·K)", "6,0 mm", "Sehr Hoch"]
          ]}
        />
        <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground bg-accent/30 p-4 rounded-xl">
          <Info className="w-5 h-5 text-primary shrink-0" />
          <p>
            <span className="font-semibold">Ingenieurs-Tipp:</span> Die Glasfaserschicht stoppt die Längenausdehnung nicht komplett, sondern reduziert sie. Die resultierenden, deutlich verringerten Ausdehnungskräfte müssen in der Montage dennoch durch korrekte Festpunkte gelenkt werden.
          </p>
        </div>
      </Reveal>

      {/* Praxistipp für die technische Auslegung */}
      <Reveal>
        <div className="rounded-2xl border border-card-border bg-card p-6 md:p-8 flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground">
            Die absolute Berechnungsgrundlage: ΔL = α × L × ΔT
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Die mathematische Bestimmung der Ausdehnung in Rohrnetzen ist elementar. <br/><br/>
            <span className="font-semibold">ΔL (Längenänderung in mm):</span> Das Ergebnis, wie viel Länger das Rohr wird.<br/>
            <span className="font-semibold">α (Längenausdehnungskoeffizient):</span> Materialkonstante (z.B. 0,035 für PP-R/GF).<br/>
            <span className="font-semibold">L (Rohrlänge in Metern):</span> Die ungesicherte gerade Strecke zwischen Festpunkt und Richtungsänderung.<br/>
            <span className="font-semibold">ΔT (Temperaturdifferenz in Kelvin):</span> Differenz zwischen Montageumgebung (z.B. 15°C) und höchster (oder niedrigster) Wassertemperatur im Betrieb (z.B. 75°C). Ergibt ΔT = 60 K.
          </p>
        </div>
      </Reveal>

      {/* Stagger: Kompensationsmethoden */}
      <Reveal>
        <SectionHead
          title="Methoden der physikalischen Kompensation"
          lead="Wie der Planer der thermischen Expansion den Raum gibt, den sie unweigerlich fordert."
        />
        <div className="mt-8">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal key="1">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold text-foreground mb-2">1. Richtungsänderung als Biegeschenkel (L-Bogen)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Die eleganteste und häufigste Lösung in Gebäuden. Das ausdehnende Rohr stößt auf einen ohnehin geplanten 90°-Winkel (Schenkel). Dieser abzweigende Schenkel muss lang genug berechnet werden (Biegeschenkellänge BS), um die schiebende Kraft elastisch wie ein Ast im Wind aufzunehmen, ohne dass die Schweißnaht reißt.
                </p>
              </div>
            </Reveal>
            <Reveal key="2">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold text-foreground mb-2">2. Der U-Dehnungsbogen (U-Kompensator)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Auf extrem langen, geraden Leitungstrassen (z.B. in Fabrikhallen, Tiefgaragen oder vertikalen Steigschächten) ohne natürliche Richtungsänderungen wird gezielt ein U-Bogen aus vier 90°-Winkeln geschweißt. Dieser Bogen wirkt wie eine gigantische Feder und nimmt die thermische Ausdehnung aus beiden Richtungen materialschonend auf.
                </p>
              </div>
            </Reveal>
            <Reveal key="3">
              <div className="p-6 rounded-2xl bg-card border border-card-border">
                <h3 className="text-xl font-bold text-foreground mb-2">3. Mechanische Axialkompensatoren</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Wellrohr-Kompensatoren aus Metall. Bei K-Aqua PP-R Systemen raten wir hiervon strengstens ab! Mechanische Kompensatoren können verklemmen, werden undicht und benötigen Wartung. Natürliche Dehnungsbögen aus dem eigenen Rohrwerkstoff sind absolut sicher, wartungsfrei und kostengünstig.
                </p>
              </div>
            </Reveal>
          </Stagger>
        </div>
      </Reveal>

      {/* DeepFAQ: Festpunkte und Loslager */}
      <Reveal>
        <SectionHead
          title="FAQ: Befestigungstechnik & Schellen"
          lead="Das Geheimnis eines sicheren Rohrnetzes liegt in den korrekten Haltepunkten."
        />
        <DeepFAQ
          items={[
            {
              q: "Was ist der exakte Unterschied zwischen Festpunkt (FP) und Loslager/Gleitschelle (GL)?",
              a: "Ein Festpunkt (FP) umklammert das Rohr starr und blockiert jede Bewegung. Er lenkt die Ausdehnung gezielt in die Richtung der Dehnungsbögen. Ein Loslager (GL) stützt das Rohr nur gegen die Schwerkraft (Durchhängen), lässt das Kunststoffrohr aber reibungsarm hindurchgleiten, damit es sich frei ausdehnen kann."
            },
            {
              q: "Wie erzeuge ich einen rutschfesten Festpunkt bei PP-R Rohren?",
              a: "Da Kunststoffrohre eine extrem glatte Oberfläche haben, rutscht das Rohr bei starken Dehnungskräften oft unbemerkt durch festgezogene Rohrschellen. Echte Festpunkte werden zwingend erzeugt, indem man PP-R Elektroschweißmuffen exakt vor und hinter die massive Stahlschelle schweißt. Das Rohr ist physisch verankert."
            },
            {
              q: "Muss bei reinen Kaltwasserleitungen (Trinkwasser kalt) eine Ausdehnung berücksichtigt werden?",
              a: "Oft wird Kaltwasser ignoriert, was ein Fehler sein kann. Die Differenz zwischen Montagetemperatur im Hochsommer (z.B. 35°C im Rohbau) und dem kalten Betriebswasser (10°C) bewirkt eine Schrumpfung (negative Ausdehnung). Bei sehr langen Strecken muss auch dieses Zusammenziehen kompensiert werden, damit Verbindungen nicht abreißen."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Die Berechnungsformel */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "75", u: "%", l: "Geringere Längenausdehnung durch Faserverbundtechnologie (K-Aqua PP-R/GF)." },
              { n: "100", u: "%", l: "Wartungsfrei. Natürliche Biegeschenkel benötigen keine Instandhaltung." },
              { n: "0", l: "Leckagen. Durch korrekte Platzierung von Fest- und Gleitpunkten." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Support */}
      <Reveal>
        <CTABand>
          <h3 className="text-2xl md:text-3xl font-bold">TGA-Planung erfordert absolute Präzision</h3>
          <p className="text-inverse-foreground/80 leading-relaxed">
            Überlassen Sie die komplexe Dehnungsberechnung nicht dem Zufall oder groben Schätzwerten. Nutzen Sie unsere Software-Tools oder kontaktieren Sie die K-Aqua Planungsabteilung für eine zertifizierte Festpunkt- und Dehnungsberechnung.
          </p>
          <Link href="/ressourcen/support" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors mt-2">
            <Ruler className="w-5 h-5" />
            Technischen Support anfragen
          </Link>
        </CTABand>
      </Reveal>

    </div>
  ),
};
