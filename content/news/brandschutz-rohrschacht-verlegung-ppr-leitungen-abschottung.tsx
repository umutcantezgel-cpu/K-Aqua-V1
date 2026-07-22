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

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
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
              lead="In mehrgeschossigen Gebäuden sind Rohrschächte die potenziellen Autobahnen für Feuer und Rauchgas. Wenn Leitungen feuerwiderstandsfähige Bauteile (Decken, Wände) durchdringen, muss der Durchbruch im Brandfall absolut dicht verschlossen werden. K Aqua PPR Rohre fallen als Kunststoffrohre unter die Baustoffklasse B2. Der Artikel zeigt, wie man sie mit dem Intumeszenzprinzip zuverlässig abschottet."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-80 pointer-events-none mix-blend-screen">
            {/* Technisches Canvas Element für Baupläne und Durchbrüche */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: PPR und Feuerwiderstand */}
      <Reveal>
        <SectionHead
          title="Materialverhalten im Brandfall"
          lead="Was passiert mit PPR bei hohen Temperaturen und wie funktioniert die Abschottung?"
        />
        <BentoGrid
          items={[
            {
              title: "Das Intumeszenzprinzip",
              description: "Zugelassene Brandschutzmanschetten enthalten ein Material, das bei Hitzeeinwirkung (ca. 150 °C) extrem aufschäumt. Da das PPR Rohr im Feuer weich wird, drückt die Manschette das Rohr komplett ab und verschließt die Öffnung feuer- und rauchdicht.",
              icon: <Layers className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Baustoffklasse B2",
              description: "K Aqua PPR ist nach DIN 4102 als normalentflammbar eingestuft. Es brennt zwar, aber die Verbrennung erfolgt ohne brennendes Abtropfen, wenn das System fachgerecht installiert und abgeschottet ist.",
              icon: <ShieldAlert className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Geringe Toxizität",
              description: "Polypropylen ist ein reiner Kohlenwasserstoff. Im Brandfall verbrennt es vornehmlich zu Kohlendioxid und Wasser. Es entstehen keine hochtoxischen Dioxine wie bei PVCrohren.",
              icon: <Flame className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* Stagger: 3 Regeln für die Schottmontage */}
      <Reveal>
        <SectionHead
          title="Regeln für die Schottmontage"
          lead="Häufige Fehlerquellen bei der Ausführung auf der Baustelle."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Ringspalt rauchdicht verschließen",
                description: "Die Brandschutzmanschette allein reicht nicht. Der Spalt zwischen dem PPR Rohr und der Wand oder Decke muss zwingend über die gesamte Bauteilstärke mit formbeständigem, nicht brennbarem Material (z.B. Beton, Zementmörtel) verschlossen werden."
              },
              {
                title: "2. Die Nullabstandproblematik",
                description: "In engen Schächten liegen Rohre oft dicht an dicht. Brandschutzmanschetten benötigen in der Regel einen definierten Mindestabstand zueinander, um richtig aufschäumen zu können. Spezielle Nullabstandzulassungen (aBG) müssen vorab geprüft werden."
              },
              {
                title: "3. Mischinstallationen genau planen",
                description: "Oft kreuzen sich Gussrohre, Lüftungskanäle und PPR Kaltwasserleitungen. Die Zulassungen der Brandschotts gelten meist nur für definierte Rohrmaterialien. Die gemeinsame Abschottung verschiedener Gewerke erfordert spezielle Kombischotts."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Häufige Brandschutzfragen */}
      <Reveal>
        <SectionHead
          title="FAQ: TGA Brandschutz"
          lead="Antworten auf die wichtigsten Planungsfragen."
        />
        <DeepFAQ
          items={[
            {
              q: "Darf das K Aqua PPR Rohr innerhalb der Brandschutzmanschette isoliert sein?",
              a: "In den meisten Standardzulassungen für Manschetten bei brennbaren Rohren muss die Isolierung (z.B. Kautschuk) vor dem Durchbruch enden oder unterbrochen werden. Es gibt jedoch spezielle Manschetten, die über bestimmte Dämmstoffe gesetzt werden dürfen. Das abP (allgemeines bauaufsichtliches Prüfzeugnis) der Manschette ist hier entscheidend."
            },
            {
              q: "Muss bei Wanddurchführungen auf beiden Seiten eine Manschette montiert werden?",
              a: "Ja, bei Wänden (vertikaler Brandschnitt) ist die Brandrichtung oft nicht vorhersehbar, daher müssen Manschetten in der Regel beidseitig angebracht werden. Bei Decken reicht meist die Montage an der Unterseite."
            },
            {
              q: "Sind PPR Rohre für Sprinklerleitungen zugelassen?",
              a: "K Aqua hat spezielle, schwerentflammbare Verbundrohre entwickelt, die weltweit in zahlreichen Nasssprinklersystemen eingesetzt werden und Zertifizierungen wie FM Global oder VdS besitzen."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Brandschutzfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "R 90", l: "Erreichbare Feuerwiderstandsklasse bei normgerechter Abschottung des K Aqua Rohrs." },
              { n: "150", u: "°C", l: "Ungefähre Aktivierungstemperatur der intumeszierenden (aufschäumenden) Manschetten." },
              { n: "B2", l: "Baustoffklasse (normalentflammbar) von reinem PPR nach der Klassifizierung DIN 4102-1." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Planungssupport */}
      <Reveal>
        <CTABand
          title="Planen Sie einen komplexen Steigeschacht?"
          subtitle="Verlassen Sie sich nicht auf Halbwissen. Wir stellen Ihnen die passenden Systemzulassungen für Brandschottungen in Kombination mit K Aqua PPR zur Verfügung."
          buttonText="Brandschutzdokumente anfragen"
          buttonLink="/kontakt"
          icon={<Building2 className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
