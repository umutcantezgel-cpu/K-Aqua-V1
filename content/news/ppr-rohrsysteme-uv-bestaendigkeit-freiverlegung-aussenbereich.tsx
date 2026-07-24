import React from "react";
import { NewsPost } from "./index";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Sun, Shield, Layers, ThermometerSun } from "@/components/ui/icon";

export const uvBestaendigkeitFreiverlegung: NewsPost = {
  slug: "ppr-rohrsysteme-uv-bestaendigkeit-freiverlegung-aussenbereich",
  title: {
    de: "PPR Rohre & UV Beständigkeit: Schutz im Außenbereich",
    en: "PPR Pipes & UV Resistance",
    ar: "أنابيب PPR ومقاومة الأشعة فوق البنفسجية"
  },
  date: "2025-01-26",
  excerpt: {
    de: "PPR Rohrsysteme im Außenbereich: Erfahren Sie, warum UV-Beständigkeit bei der Freiverlegung von Kühltürmen essenziell ist und wie K-Aqua PPR-Rohre durch Carbon Black, PE-Ummantelungen und spezielle Beschichtungen langfristig vor Photooxidation geschützt werden.",
    en: "PPR Pipe Systems in Outdoor Areas: Learn why UV resistance is essential for exposed pipe installations of cooling towers and how K Aqua PPR pipes are protected.",
    ar: "أنظمة أنابيب PPR في الأماكن الخارجية: تعرف على سبب أهمية مقاومة الأشعة فوق البنفسجية عند التمديد المكشوف لأنابيب أبراج التبريد وكيف يتم حماية أنابيب K Aqua PPR."
  },
  coverImage: "/images/news/outdoor-pipes-sun.jpg",
  category: "Materialkunde & Einsatzgebiete",
  tags: ["UV Beständigkeit", "Freiverlegung", "Außenbereich", "Kühltürme", "Materialkunde", "Schutz"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <ParallaxHero 
        image="/images/news/outdoor-pipes-sun.jpg" 
        height="50vh"
        title="Schutz vor der Sonne"
        subtitle="Wie man PPR Rohre sicher auf dem Dach und an der Fassade verlegt."
      />

      {/* Intro mit SectionHead & PipeFX (Blueprint) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sun className="w-5 h-5" />
                  <span>Außenbereich & Witterung</span>
                </div>
              }
              title="Der Feind aus dem All: Ultraviolette Strahlung"
              lead="Trinkwasser- und Kühlwasserleitungen werden im Industrie- und Gewerbebau oft im Freien verlegt – beispielsweise zur Anbindung von Kühltürmen auf dem Flachdach, bei industriellen Freianlagen oder im landwirtschaftlichen Bereich. Doch Standardkunststoffe wie Polypropylen (PP-R) haben eine natürliche chemische Schwachstelle: UV-Strahlung. Die energiereichen Strahlen der Sonne (insbesondere im UV-B und UV-A Bereich) zerstören langfristig die Molekülketten des Kunststoffs, wenn das Rohr ungeschützt im Freien liegt. Ein tiefgehendes Verständnis dieses Photooxidationsprozesses ist entscheidend, um die richtige Schutzmaßnahme für langlebige Systeme auszuwählen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element */}
            <PipeFX variant="blueprint" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Deep Technical Content */}
      <Reveal>
        <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto text-muted-foreground mt-8 px-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Chemie der Photooxidation in Polyolefinen</h2>
          <p>
            Polypropylen gehört zur Gruppe der Polyolefine. Auf molekularer Ebene besteht PP-R aus langen Kohlenwasserstoffketten (C-H und C-C Bindungen). Diese Bindungen sind unter normalen Bedingungen extrem stabil, was PP-R seine exzellente chemische Beständigkeit und Druckfestigkeit verleiht. 
          </p>
          <p>
            Trifft jedoch ultraviolettes Licht (Wellenlängen zwischen 290 und 400 nm) auf das ungeschützte Rohr, reicht die Energie der Photonen aus, um diese kovalenten Bindungen aufzubrechen. Es entstehen freie Radikale. In Anwesenheit von Luftsauerstoff (O2) reagieren diese Radikale sofort weiter und es kommt zu einer autokatalytischen Kettenreaktion, der sogenannten Photooxidation. 
          </p>
          <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Mechanische Folgen für das Rohrleitungssystem</h3>
          <p>
            Das Aufbrechen der Polymerketten führt zu einer drastischen Verringerung des Molekulargewichts in der obersten Materialschicht. Dies äußert sich zunächst optisch durch Ausbleichen und Kreidung (eine mehlige Schicht auf der Oberfläche). Im fortgeschrittenen Stadium verliert das PP-R seine Duktilität (Verformbarkeit) und Schlagzähigkeit. Die Oberfläche wird spröde und es entstehen Mikrorisse, die unter den hohen Innendrücken wasserführender Systeme katastrophal versagen können. Um dieses Risiko auf null zu reduzieren, bietet K-Aqua hochspezialisierte Lösungen an, die den UV-Angriff komplett abblocken.
          </p>
        </div>
      </Reveal>

      {/* HorizontalTimeline: Der Degradationsprozess */}
      <Reveal>
        <SectionHead
          title="Was passiert bei ungeschützter UV-Belastung?"
          lead="Der unsichtbare Zerstörungsprozess im Zeitraffer erklärt."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            events={[
              {
                year: "Phase 1: Photooxidation",
                title: "Molekülspaltung",
                description: "UV-Strahlen dringen in die oberste Materialschicht ein und brechen durch ihre hohe Energie die C-C und C-H Bindungen des Polypropylens auf. Reaktive Radikale entstehen."
              },
              {
                year: "Phase 2: Oberflächenveränderung",
                title: "Ausbleichen & Mikrorisse",
                description: "Das Rohr verliert seine ursprüngliche Farbe. Die Oberfläche wird matt, rau und erste, mit dem bloßen Auge kaum sichtbare Mikrorisse bilden sich durch den Abbau der amorphen Zonen."
              },
              {
                year: "Phase 3: Materialermüdung",
                title: "Versprödung (Kreidung)",
                description: "Die obere Schicht zerfällt pulverartig (Kreidung). Das Material verliert seine Schlagzähigkeit und wird extrem spröde, bis es unter Leitungsdruck reißt."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* BentoGrid: Schutzmaßnahmen */}
      <Reveal>
        <SectionHead
          title="Zuverlässige Schutzmaßnahmen für die Praxis"
          lead="So wird K-Aqua PP-R fit für die direkte Sonneneinstrahlung auf dem Dach."
        />
        <BentoGrid
          items={[
            {
              title: "1. Vorisolierte Systeme (K-Aqua Isopipe)",
              description: "Die absolute Premiumlösung. Das PP-R Mediumrohr wird mit PUR-Schaum gedämmt und von einem schwarzen PE-HD Mantelrohr umschlossen. Schwarzes PE-HD ist durch die Zugabe von 2-3% hochdispersem Ruß (Carbon Black) von Natur aus extrem UV-beständig und hält der Sonneneinstrahlung jahrzehntelang stand.",
              icon: <Layers className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "2. Aluminiumblechummantelung",
              description: "Das Standardrohr wird mit einer regulären Dämmung (z.B. Mineralwolle oder Kautschuk) versehen und anschließend mit einem dünnen Aluminiumblech verkleidet. Dies bietet perfekten UV-Schutz und extremen mechanischen Schutz (z.B. gegen Vogelbiss und Hagel).",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "3. UV-Schutzlackierung",
              description: "Für blanke Rohre ohne Dämmung: Ein spezieller, hochdeckender UV-Schutzlack auf Acryl- oder Polyurethanbasis schirmt die Strahlen ab. Wichtig: Der Anstrich erfordert Wartung und muss bei Abblättern zwingend erneuert werden.",
              icon: <ThermometerSun className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepFAQ: Fragen zum Außenbereich */}
      <Reveal>
        <SectionHead
          title="FAQ: Freiverlegung und Außenmontage"
          lead="Dach, Fassade und die Tücken der Thermodynamik in der Natur."
        />
        <DeepFAQ
          items={[
            {
              q: "Sind schwarze Rohre generell UV-beständig?",
              a: "Nein, die Farbe Schwarz allein reicht nicht aus. Es muss spezieller Industrieruß (Carbon Black) in der korrekten Partikelgröße homogen im Kunststoff eingebunden sein, wie es bei PE-HD (Polyethylen High Density) Mantelrohren der Fall ist. Herkömmliches grünes K-Aqua PP-R benötigt in jedem Fall einen Außenschutz."
            },
            {
              q: "Wie lange darf ungeschütztes PP-R auf der Baustelle im Freien lagern?",
              a: "Die Rohre sind werkseitig leicht mit UV-Stabilisatoren (z.B. HALS - Hindered Amine Light Stabilizers) ausgestattet, um Lagerung und Transport zu überstehen. Eine Lagerung im Freien in der prallen Sonne sollte jedoch maximal 3 bis 6 Monate nicht überschreiten. Abgedeckt (mit blickdichten, aber atmungsaktiven Planen zur Vermeidung von Hitzestau) ist eine längere Lagerung kein Problem."
            },
            {
              q: "Was muss ich bei der thermischen Längenausdehnung auf dem Dach beachten?",
              a: "Auf Flachdächern (besonders bei schwarzem Bitumen) herrschen im Hochsommer extrem hohe Umgebungstemperaturen von bis zu 70°C oder mehr. Im Winter können es -20°C sein. Dieses massive Delta T führt zu erheblichen Längenänderungen des Rohrs (ΔL). Diese müssen zwingend rechnerisch erfasst und über ausreichend dimensionierte Dehnungsbögen (U-Bögen) oder Kompensatoren spannungsfrei aufgenommen werden. Fest- und Gleitpunkte müssen entsprechend berechnet werden."
            },
            {
              q: "Sind PP-R Rohre frostsicher?",
              a: "PP-R Rohre sind elastischer als Metallrohre und platzen nicht sofort, wenn das Wasser darin gefriert. Dennoch ist das Einfrieren unbedingt zu vermeiden, da das System mechanisch überlastet wird. Im Außenbereich müssen die Rohre daher zwingend gedämmt und gegebenenfalls mit einer elektrischen Begleitheizung versehen werden."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: K Aqua Isopipe */}
      <Reveal>
        <CTABand
          title="Die All-in-One Lösung für Kühltürme"
          subtitle="Mit dem K-Aqua Isopipe System erhalten Sie ein werkseitig vorisoliertes Rohr, das gegen Hitze, Kälte, mechanische Einflüsse und UV-Strahlung gleichermaßen perfekt geschützt ist."
          buttonText="Mehr zu Isopipe erfahren"
          buttonLink="/produkte/pipes"
          icon={<Shield className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
