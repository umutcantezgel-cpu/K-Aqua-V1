import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Sun, CloudRain, Snowflake, Droplet } from "@/components/ui/icon";

export const kuehltuermeAusseneinsatz: NewsPost = {
  slug: "kuehltuerme-verdunstungskuehler-pprct-ausseneinsatz",
  title: {
    de: "Kühltürme & Verdunstungskühler: PP-RCT",
    en: "Cooling Towers & Evaporative Coolers: PP-RCT",
    ar: "أبراج التبريد والمبردات التبخيرية: PP-RCT"
  },
  date: "2024-10-14",
  excerpt: {
    de: "Rohrleitungen auf dem Dach sind extremen Wetterschwankungen und UV-Strahlung ausgesetzt. K Aqua PP-RCT Rohrsysteme mit UV-Schutz bieten Frostsicherheit, absolute Korrosionsbeständigkeit und eine jahrzehntelange Lebensdauer für offene Kühltürme und Freiland-Kühlanlagen.",
    en: "Rooftop pipelines are exposed to extreme weather fluctuations and UV radiation. K Aqua PP-RCT piping systems with UV protection offer frost resistance, absolute corrosion resistance, and a decades-long service life for open cooling towers and outdoor cooling systems.",
    ar: "تتعرض خطوط الأنابيب على الأسطح لتقلبات الطقس القاسية والأشعة فوق البنفسجية. توفر أنظمة أنابيب K Aqua PP-RCT المزودة بحماية من الأشعة فوق البنفسجية مقاومة للصقيع، ومقاومة مطلقة للتآكل، وعمرًا تشغيليًا يمتد لعقود لأبراج التبريد المفتوحة وأنظمة التبريد الخارجية."
  },
  coverImage: "/images/news/cooling-tower.jpg",
  category: "Klimatechnik",
  tags: ["Kühlturm", "Außeneinsatz", "UV-Beständigkeit", "Frostschutz", "PP-RCT", "Klimatechnik"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sun className="w-5 h-5" />
                  <span>Dachinstallation & Wetterfestigkeit</span>
                </div>
              }
              title="Rohre für den härtesten Härtetest"
              lead="Verdunstungskühler und Kühltürme werden fast immer im Freien, meist auf Flachdächern, installiert. Hier sind Rohrleitungen der prallen Sonne, saurem Regen und Frost schutzlos ausgeliefert. Während Standard-Kunststoffe verspröden und Stahlleitungen von außen wie innen durchrosten, bleiben UV-geschützte K Aqua PP-RCT Rohrsysteme dauerhaft korrosionsfrei und witterungsbeständig."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Verdunstung/Regen */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Die 3 Feinde der Freiverlegung */}
      <Reveal>
        <SectionHead
          title="Schutz vor den Elementen"
          lead="Wie K Aqua die drei größten Herausforderungen der Freiverlegung löst."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. UV-Strahlung (Photooxidation)",
                description: "UV-Licht zerstört langfristig die Molekülketten ungeschützter Kunststoffe. K Aqua Rohre für den Außeneinsatz sind entweder in der Masse UV-stabilisiert (schwarzer Rußanteil) oder werden mit einem speziellen, hochfesten UV-Schutzlack werkseitig versiegelt. Das verhindert jegliche Versprödung."
              },
              {
                title: "2. Frost & Eisbildung",
                description: "Stehendes Wasser, das gefriert, dehnt sich aus und lässt Metallrohre platzen. PP-RCT besitzt eine gewisse Elastizität. Selbst wenn Kühlwasser in einer nicht abgelassenen Leitung gefriert, fängt das Rohr die Volumenausdehnung des Eises ab, ohne zu reißen."
              },
              {
                title: "3. Äußere & Innere Korrosion",
                description: "Stahlrohre rosten auf dem Dach durch Regen. Innen führt das sauerstoffreiche Wasser aus offenen Kühltürmen zu massiver Oxidation. K Aqua Kunststoffrohre rosten weder von innen noch von außen. Niemals."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* GlossaryGrid: Chemische Kühlwasserbehandlung */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Sicher gegen Kühlwasser-Chemie"
            items={[
              {
                term: "Biozide (Legionellenschutz)",
                definition: "Offene Kühltürme müssen regelmäßig mit Bioziden (z. B. Chlor oder Ozon) schockbehandelt werden. PP-RCT ist hochresistent gegen diese Chemikalien.",
                icon: <Droplet className="w-6 h-6" />
              },
              {
                term: "Salzeindickung",
                definition: "Durch Verdunstung steigt der Salzgehalt im Restwasser massiv an. Bei Metall führt das schnell zu Lochfraß, PP-RCT ist völlig immun gegen chloridhaltiges Wasser.",
                icon: <CloudRain className="w-6 h-6" />
              },
              {
                term: "Inhibitoren",
                definition: "Oft werden Inhibitoren zugesetzt, um metallische Einbauteile vor Rost zu schützen. Diese teure Chemie kann im PP-RCT Netz drastisch reduziert werden.",
                icon: <Snowflake className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Materialvergleich im Außeneinsatz */}
      <Reveal>
        <SectionHead
          title="Materialvergleich: Roof-Top"
          lead="Die Leistung verschiedener Werkstoffe bei extremen Witterungsbedingungen."
        />
        <DeepMatrix
          data={[
            ["Material", "UV-Beständigkeit", "Frosttoleranz", "Gewicht (Dachlast)"],
            ["K Aqua PP-RCT (UV-Schutz)", "Hervorragend", "Sehr hoch (elastisch)", "Sehr gering"],
            ["Stahl verzinkt", "Gut", "Keine (platzt auf)", "Sehr hoch (Statik kritisch)"],
            ["Kupfer", "Gut", "Keine (platzt auf)", "Sehr hoch"],
            ["PVC-U (Standard)", "Schlecht (versprödet)", "Schlecht (wird bei Kälte spröde)", "Gering"]
          ]}
        />
      </Reveal>

      {/* StatBand: Roof-Top Facts */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Gefahr von Durchrostung durch Regenwasser oder sauerstoffreiches Kühlwasser." },
              { n: "100", u: "%", l: "Frostsicherheit: Das Rohr überlebt das Gefrieren von Wasser im Inneren." },
              { n: "60", u: "+", l: "Jahre zu erwartende Lebensdauer im Freien mit korrektem UV-Schutz." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Technische Planung */}
      <Reveal>
        <CTABand
          title="Planen Sie einen Kühlturm auf dem Flachdach?"
          subtitle="Reduzieren Sie die statische Dachlast und vergessen Sie Korrosionsprobleme. Wir unterstützen Sie bei der Dimensionierung und Befestigungsplanung bei Windlasten."
          buttonText="Planungs-Support anfragen"
          buttonLink="/kontakt"
          icon={<Sun className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
