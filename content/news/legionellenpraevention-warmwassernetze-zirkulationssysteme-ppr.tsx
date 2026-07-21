import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { StatBand } from "@/components/ui/StatBand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Droplet, Thermometer, ShieldCheck, Repeat } from "@/components/ui/icon";

export const legionellenpraeventionZirkulation: NewsPost = {
  slug: "legionellenpraevention-warmwassernetze-zirkulationssysteme-ppr",
  title: {
    de: "Legionellenprävention mit PP-R Rohren",
    en: "Legionella Prevention with PP-R Pipes",
    ar: "الوقاية من الفيلقية باستخدام أنابيب PP-R"
  },
  date: "2025-02-01",
  excerpt: {
    de: "Lauwarmes Stagnationswasser ist das größte Risiko in der Trinkwasserhygiene. Erfahren Sie, wie durchdachte Zirkulationssysteme und K Aqua PP-R Rohrsysteme zuverlässig vor Legionellen schützen und die Trinkwasserverordnung erfüllen.",
    en: "Lukewarm stagnant water is the greatest risk in drinking water hygiene. Discover how well-designed circulation systems and K Aqua PP-R pipe systems provide reliable protection against Legionella and ensure compliance with drinking water regulations.",
    ar: "المياه الراكدة الفاترة هي الخطر الأكبر في نظافة مياه الشرب. اكتشف كيف توفر أنظمة التدوير المصممة بعناية وأنظمة أنابيب K Aqua PP-R حماية موثوقة ضد الفيلقية وتلبي لوائح مياه الشرب."
  },
  coverImage: "/images/news/legionella-prevention-circulation.jpg",
  category: "Trinkwasser & Hygiene",
  tags: ["Legionellen", "Trinkwasser", "Hygiene", "Zirkulation", "Thermische Desinfektion", "PP-R", "Rohrsysteme"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Trinkwasserhygiene & Legionellenprävention</span>
                </div>
              }
              title="Keine Chance für Biofilme in PP-R Zirkulationssystemen"
              lead="Legionellen vermehren sich explosionsartig bei Temperaturen zwischen 25°C und 50°C, insbesondere wenn Wasser in den Leitungen stagniert. Für Planer und Betreiber von Großgebäuden (Hotels, Krankenhäuser, Wohnanlagen) bedeutet das: Das Warmwassernetz muss kontinuierlich zirkulieren und auf Temperatur gehalten werden. K Aqua PP-R Rohrsysteme unterstützen dieses Ziel durch extrem glatte Innenoberflächen, welche die Biofilmbildung wirksam erschweren, sowie absolute Beständigkeit bei regelmäßigen thermischen Desinfektionen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: 3 Säulen */}
      <Reveal>
        <SectionHead
          title="Die 3 Säulen der Hygiene"
          lead="Wie K Aqua bei der Einhaltung der Trinkwasserverordnung hilft."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Temperaturhaltung",
                description: "Warmwasser (PWH) muss das System mit 60°C verlassen und darf im Zirkulationsrücklauf (PWH-C) nicht unter 55°C fallen. PP-R Rohre bieten hierbei einen natürlichen Isolationsvorteil gegenüber Metallen."
              },
              {
                title: "2. Stagnationsvermeidung",
                description: "Das Wasser muss fließen. Zirkulationssysteme sorgen dafür, dass das heiße Wasser bis kurz vor die Zapfstellen gepumpt und wieder zurückgeführt wird. Totleitungen sind absolut verboten."
              },
              {
                title: "3. Biofilm-Management",
                description: "Biofilme dienen Legionellen als Nahrung und Schutzschild. Die extrem geringe Oberflächenrauheit von K Aqua Rohren (0,007 mm) bietet Bakterien im Vergleich zu rauen Metallrohren kaum Ansiedlungsfläche."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Thermische Desinfektion */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "70", u: "°C", l: "Geforderte Mindesttemperatur für eine effektive thermische Desinfektion (für mind. 3 Minuten an jeder Zapfstelle)." },
              { n: "0,007", u: "mm", l: "Oberflächenrauheit des K Aqua Rohrs. Verhindert Inkrustationen und Biofilme effektiv." },
              { n: "55", u: "°C", l: "Mindesttemperatur im Rücklauf des Zirkulationssystems (gemäß DVGW W 551)." }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Installationskonzepte */}
      <Reveal>
        <SectionHead
          title="Leitungsführung im Vergleich"
          lead="Das Rohrnetz-Design bestimmt die Hygiene maßgeblich."
        />
        <BentoGrid
          items={[
            {
              title: "T-Stück Installation",
              description: "Der Klassiker, aber hygienisch am anfälligsten. Abzweige zu selten genutzten Zapfstellen (Gäste-WC) werden zu Stagnationszonen, die das gesamte System verkeimen können.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Reiheninstallation",
              description: "Die Hauptleitung schleift durch alle Wandscheiben. Der am häufigsten genutzte Verbraucher (z.B. WC) muss am Ende sitzen, um die davor liegenden Strecken bei jeder Nutzung mitzuspülen.",
              icon: <Repeat className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Ringinstallation (K Aqua Favorit)",
              description: "Alle Zapfstellen sind ringförmig verbunden. Egal welche Armatur geöffnet wird, das Wasser fließt von zwei Seiten heran. Das gesamte Rohrvolumen der Etage wird umgewälzt. Perfekt für K Aqua Rohrsysteme durch einfache Schweißtechnik.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "large"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Zirkulation Planer */}
      <Reveal>
        <SectionHead
          title="Planer-FAQ: Zirkulationsnetze"
          lead="Kritische Parameter bei der Auslegung."
        />
        <DeepFAQ
          items={[
            {
              q: "Wie dimensioniere ich die Zirkulationsleitung?",
              a: "So klein wie möglich, aber groß genug für den nötigen Volumenstrom. Zu groß dimensionierte Rohre verlängern die Fließzeit und erhöhen die Auskühlung. K Aqua bietet feine Abstufungen (z.B. DN 20, DN 25) für die exakte Anpassung."
            },
            {
              q: "Verkraftet PP-R ständige thermische Desinfektionen?",
              a: "Ja. Das K Aqua System ist für einen Dauerbetrieb bei hohen Temperaturen ausgelegt. Thermische Desinfektionen (z.B. wöchentlich 70°C) haben bei korrekter Druckeinstellung keinen negativen Einfluss auf die Lebensdauer von 50 Jahren."
            },
            {
              q: "Was ist der hydraulische Abgleich im Zirkulationsnetz?",
              a: "Damit das heiße Wasser nicht nur den Kürzesten Weg (durch den ersten Steigstrang) nimmt, müssen Zirkulations-Regulierventile in jedem Strang installiert werden. Sie drosseln kurze Stränge und zwingen das Wasser auch in weit entfernte Gebäudeteile."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Hygiene-Beratung */}
      <Reveal>
        <CTABand
          title="Sicheres Trinkwasser planen"
          subtitle="Unsere Experten prüfen Ihr Rohrnetz-Design auf Totleitungen, Stagnationsrisiken und die korrekte Dimensionierung von Zirkulationskreisen."
          buttonText="Hygiene-Review anfordern"
          buttonLink="/ressourcen/support"
          icon={<ShieldCheck className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
