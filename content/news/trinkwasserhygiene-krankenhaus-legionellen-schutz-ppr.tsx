import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { HeartPulse, ShieldCheck, Droplet, Thermometer } from "@/components/ui/icon";

export const trinkwasserhygieneKrankenhaus: NewsPost = {
  slug: "trinkwasserhygiene-krankenhaus-legionellen-schutz-ppr",
  title: "Trinkwasserhygiene in Krankenhäusern: Der Legionellen-Schutz",
  date: "2024-11-12",
  excerpt: "Kliniken erfordern höchste Trinkwasserqualität. Erfahren Sie, warum PP-R Rohre durch ihre extrem glatte Innenwand Biofilmbildung verhindern und sichere Legionellenspülungen bei über 70°C ermöglichen.",
  coverImage: "/images/news/hospital-water.jpg",
  category: "Sanitärtechnik",
  tags: ["Trinkwasserhygiene", "Krankenhaus", "Legionellen", "Thermische Desinfektion", "PP-R", "Biofilm"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <HeartPulse className="w-5 h-5" />
                  <span>Klinische Sanitärtechnik</span>
                </div>
              }
              title="Höchste Reinheit, wenn es um Leben geht"
              lead="In Krankenhäusern, Pflegeheimen und Reha-Kliniken ist das Immunsystem der Patienten oft stark geschwächt. Trinkwasser muss hier absolut steril und frei von Erregern wie Legionellen oder Pseudomonaden sein. K Aqua PP-R Rohrleitungssysteme bieten durch ihre porenfreie Oberfläche, absolute Korrosionsfreiheit und thermische Belastbarkeit die sicherste Infrastruktur für medizinische Einrichtungen."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Wasserreinheit */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Die 3 Säulen der Wasserhygiene */}
      <Reveal>
        <SectionHead
          title="Prävention auf Molekularebene"
          lead="Wie das Material PP-R aktiv die Trinkwassergüte schützt."
        />
        <BentoGrid
          items={[
            {
              title: "Kein Nährboden für Biofilme",
              description: "Raue Oberflächen in Metallrohren (z.B. durch Kalkablagerungen oder beginnende Korrosion) bieten Bakterien perfekten Halt. Die mikroskopisch glatte Innenwand von K Aqua PP-R verhindert das Anhaften von Biofilm extrem effektiv.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Thermische Desinfektion",
              description: "Zur Abtötung von Legionellen wird das Rohrnetz regelmäßig mit über 70 °C heißem Wasser gespült. PP-R ist für diese extreme Wechselbelastung zertifiziert, ohne zu verspröden.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Chemische Beständigkeit",
              description: "Sollte eine chemische Keulung (z.B. mit Chlordioxid) notwendig sein, bleibt K Aqua strukturell intakt. Es gibt keine Schwermetalle oder Schadstoffe an das Wasser ab.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* HorizontalTimeline: Der Weg des Wassers im Klinikum */}
      <Reveal>
        <SectionHead
          title="Der Weg des Wassers"
          lead="Hygiene-Konzepte in der TGA-Planung erfordern eine ganzheitliche Betrachtung."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. Einspeisung & Übergabe",
                description: "Am Hausanschluss wird die Wasserqualität aus dem öffentlichen Netz übernommen. Hier beginnt der Schutz durch bleifreie Komponenten und hygienisch einwandfreie Verteiler aus PP-R."
              },
              {
                title: "2. Zirkulationsleitungen",
                description: "Das A und O im Krankenhaus: Stagnation muss vermieden werden. Das Warmwasser muss im gesamten Netz permanent zirkulieren, um Temperaturabfälle (die Brutzone für Legionellen) zu verhindern."
              },
              {
                title: "3. Entnahmestelle (Patient/OP)",
                description: "Die Anbindung der Armaturen erfolgt über totraumfreie Stichleitungen oder Ringinstallationen. K Aqua bietet hierfür strömungsoptimierte Wandwinkel und Verteiler."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Expertenwissen */}
      <Reveal>
        <SectionHead
          title="Expertenwissen für Hygieneplaner"
          lead="Antworten auf die wichtigsten Fragen der klinischen TGA."
        />
        <DeepFAQ
          items={[
            {
              q: "Warum ist Kupfer in Krankenhäusern problematisch?",
              a: "Kupferrohre reagieren empfindlich auf schwankende pH-Werte und können Kupferionen an das Wasser abgeben. Zudem neigen sie bei ungünstigen Wasserverhältnissen zu Lochfraßkorrosion, was zu Stagnationszonen führt."
            },
            {
              q: "Gibt PP-R Mikroplastik an das Wasser ab?",
              a: "Nein. K Aqua PP-R ist ein hochmolekularer, extrem stabiler Werkstoff. Er ist lebensmittelecht zertifiziert und gibt weder Mikroplastik, noch Geruchs- oder Geschmacksstoffe an das Trinkwasser ab."
            },
            {
              q: "Welche Zertifikate hat K Aqua für Trinkwasser?",
              a: "Unsere Systeme verfügen über alle relevanten internationalen Hygiene-Zertifikate, unter anderem nach den strengen Richtlinien der KTW-BWGL (UBA), DVGW, KIWA und WRAS."
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Klinische Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Abgabe von Blei, Schwermetallen oder Geschmacksstoffen." },
              { n: "70", u: "°C+", l: "Sichere Durchführung der thermischen Legionellenspülung." },
              { n: "100", u: "%", l: "Korrosionsfrei, wodurch raue Stellen für Bakterienwachstum verhindert werden." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Planungs-Support Hygiene */}
      <Reveal>
        <CTABand
          title="Planen Sie die Sanitärtechnik für ein Krankenhaus?"
          subtitle="Lassen Sie uns gemeinsam Ihr Leitungsnetz auf maximale Hygiene prüfen. Wir unterstützen Sie bei der Auslegung von Ring- und Reiheninstallationen zur Vermeidung von Stagnation."
          buttonText="Hygiene-Beratung anfragen"
          buttonLink="/kontakt"
          icon={<HeartPulse className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
