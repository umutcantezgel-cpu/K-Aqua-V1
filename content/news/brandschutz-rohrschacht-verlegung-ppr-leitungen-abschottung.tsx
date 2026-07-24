import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Flame, ShieldAlert, Layers, Building2 } from "@/components/ui/icon";

export const brandschutzRohrschachtVerlegung: NewsPost = {
  slug: "brandschutz-rohrschacht-verlegung-ppr-leitungen-abschottung",
  title: {
    de: "Brandschutz im Rohrschacht mit PPR",
    en: "Fire Protection in Pipe Shafts with PPR",
    ar: "الحماية من الحرائق في مناور الأنابيب باستخدام PPR"
  },
  date: "2025-01-05",
  teaser: {
    de: "Wie verhindert man die Brandausbreitung über Rohrleitungen? Leitfaden zur fachgerechten Abschottung von K Aqua PPR Rohrsystemen in Deckendurchbrüchen, Wänden und Steigeschächten nach DIN 4102.",
    en: "How do you prevent fire propagation through pipelines? A guide to the proper firestopping of K Aqua PPR pipe systems in floor penetrations, walls, and risers according to DIN 4102.",
    ar: "كيف يمكن منع انتشار الحريق عبر شبكات الأنابيب؟ دليل العزل الاحترافي لأنظمة أنابيب K Aqua PPR في اختراقات الأسقف والجدران والمناور الصاعدة وفقاً للمعيار DIN 4102."
  },
  excerpt: {
    de: "Wie verhindert man die Brandausbreitung über Rohrleitungen? Leitfaden zur fachgerechten Abschottung von K Aqua PPR Rohrsystemen in Deckendurchbrüchen, Wänden und Steigeschächten nach DIN 4102.",
    en: "How do you prevent fire propagation through pipelines? A guide to the proper firestopping of K Aqua PPR pipe systems in floor penetrations, walls, and risers according to DIN 4102.",
    ar: "كيف يمكن منع انتشار الحريق عبر شبكات الأنابيب؟ دليل العزل الاحترافي لأنظمة أنابيب K Aqua PPR في اختراقات الأسقف والجدران والمناور الصاعدة وفقاً للمعيار DIN 4102."
  },
  coverImage: "/images/news/fire-protection-shaft.jpg",
  category: "Normen & Richtlinien",
  tags: ["Brandschutz", "Brandschott", "Rohrschacht", "DIN 4102", "Sicherheit", "PPR", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Flame className="w-5 h-5" />
                  <span>Baulicher Brandschutz & Sicherheit</span>
                </div>
              }
              title="Sichere Wege durch den Brandabschnitt"
              lead="In mehrgeschossigen Gebäuden sind Rohrschächte die potenziellen Autobahnen für Feuer und Rauchgas. Wenn Leitungen feuerwiderstandsfähige Bauteile (Decken, Wände) durchdringen, muss der Durchbruch im Brandfall absolut dicht verschlossen werden. K Aqua PPR Rohre fallen als Kunststoffrohre unter die Baustoffklasse B2. Der Artikel zeigt, wie man sie mit dem Intumeszenzprinzip extrem zuverlässig und normgerecht abschottet."
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Das Prinzip der Brandabschnittsbildung</h2>
          <p>
            Der bauliche Brandschutz zielt darauf ab, ein Gebäude in definierte Brandabschnitte zu unterteilen. Diese Abschnitte (getrennt durch massive Wände und Decken) sollen verhindern, dass sich Feuer und vor allem das hochgiftige Rauchgas ungehindert im gesamten Gebäude ausbreiten können. Das Problem für die technische Gebäudeausrüstung (TGA): Rohrleitungen, Lüftungskanäle und Stromkabel müssen diese Brandabschnitte unweigerlich durchdringen (sogenannte Leitungsanlagen-Richtlinie - MLAR).
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Materialverhalten von Polypropylen im Brandfall</h3>
          <p>
            K Aqua PP-R ist ein thermoplastischer Kunststoff und fällt gemäß der Klassifizierung DIN 4102-1 in die Baustoffklasse B2 (normalentflammbar). Anders als extrem giftiges PVC verbrennt Polypropylen (da es ein reiner Kohlenwasserstoff ist) im Brandfall nahezu rückstandsfrei zu Kohlendioxid und Wasser. Es entstehen keine hochtoxischen, korrosiven Dioxingase. Brennendes PP-R tropft zudem im eingebauten Systemzustand nicht brennend ab, was eine sekundäre Brandstiftung in darunterliegenden Stockwerken verhindert.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Warum Kunststoffrohre abschotten?</h3>
          <p>
            Da PP-R bei hohen Temperaturen schmilzt, würde im Brandfall das Rohr im Bereich des Deckendurchbruchs wegschmelzen. Dadurch entstünde ein offenes Loch in der Decke, durch das Feuer und Rauchgas ungehindert wie durch einen Kamin in das nächste Stockwerk ziehen könnten. Genau hier setzt die Brandschutzmanschette an.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Das Intumeszenzprinzip: Die aktive Brandschutzmanschette</h2>
          <p>
            Um brennbare Rohre wie K Aqua PP-R abzuschotten, werden zugelassene Brandschutzmanschetten (Rohrkragen) verwendet, die nach dem Intumeszenzprinzip arbeiten.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Wie funktioniert Intumeszenz?</h3>
          <p>
            Die Stahlblechmanschette wird um das Rohr gelegt und fest an der Wand oder Decke verschraubt. In der Manschette befindet sich ein spezielles Inlay. Steigt die Temperatur im Raum im Brandfall auf ca. 150 °C an, reagiert dieses Material. Es bläht sich chemisch extrem auf (intumesziert) und vergrößert sein Volumen um ein Vielfaches, wobei ein fester Blähgrafit-Kuchen entsteht.
          </p>
          <p>
            Da das umschließende Stahlblech der Manschette die Ausdehnung nach außen verhindert, wird der gesamte Quelldruck nach innen auf das Rohr gerichtet. Zu diesem Zeitpunkt ist das PP-R Rohr durch die Hitze bereits weich und formbar geworden. Der entstehende Schaum quetscht das weiche Rohr vollständig ab und verschließt die Öffnung extrem dicht und druckfest. Flammen und Rauchgas können den Durchbruch nicht mehr passieren. Dieses System erreicht problemlos Feuerwiderstandsklassen von R 90 (90 Minuten Widerstand) und höher.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Häufige Fehler bei der Montage auf der Baustelle</h2>
          <p>
            Selbst die beste Brandschutzmanschette versagt, wenn sie falsch montiert wird. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Verschluss des Ringspaltes</h3>
          <p>
            Die Manschette drückt nur das Rohr ab. Der Spalt, der bei der Kernbohrung zwischen dem PP-R Rohr und dem Beton der Decke entstanden ist (Ringspalt), muss zwingend über die gesamte Bauteiltiefe mit formbeständigem, nicht brennbarem Baustoff (z.B. Beton, Zementmörtel oder Gips) rauchdicht verschlossen werden. Eine einfache PU-Schaum-Füllung ist hier strengstens verboten.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Die Nullabstandproblematik</h3>
          <p>
            In modernen Steigeschächten ist Platz extrem teuer, Rohre werden oft dicht an dicht verlegt. Reguläre Brandschutzmanschetten benötigen jedoch einen festgelegten Mindestabstand zueinander, damit sich die Stahlkragen nicht gegenseitig bei der Quellung behindern. Für enge Schächte müssen spezielle "Nullabstand-Manschetten" oder Brandschutz-Bandagen mit entsprechender Zulassung (aBG) verwendet werden.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Umgang mit Rohrisolierungen</h3>
          <p>
            K Aqua PP-R Kaltwasserleitungen sind oft mit Kautschuk isoliert, um Schwitzwasser zu verhindern. Bei vielen Standardmanschetten muss brennbare Isolierung vor dem Schott enden. Es gibt jedoch spezielle zugelassene Systeme (z.B. Endlosbänder), die über bestimmte Dämmstoffe hinweg montiert werden dürfen. Die Einbauanleitung und das allgemeine bauaufsichtliche Prüfzeugnis (abP) des Schott-Herstellers sind absolut bindend.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Planungssicherheit mit K Aqua</h2>
          <p>
            Für den baulichen Brandschutz gibt es keine Kompromisse. Die K Aqua Rohrleitungssysteme sind durch externe, unabhängige Prüfinstitute in Kombination mit Brandschutzprodukten führender Hersteller (wie Hilti, Würth, Walraven) umfangreich getestet worden. Dies gibt TGA-Planern die rechtliche und technische Sicherheit, selbst komplexeste Mischinstallationen in Schächten normkonform und absolut sicher realisieren zu können.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "R 90", l: "Feuerwiderstandsklasse für 90 min Schutzschottung erreichbar" },
              { n: "150", u: "°C", l: "Aktivierungstemperatur der intumeszierenden (aufschäumenden) Kragen" },
              { n: "B2", l: "Baustoffklasse (normalentflammbar) von PP-R nach DIN 4102-1" }
            ]}
          />
        </div>
      </Reveal>
    </div>
  ),
};
