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
  title: {
    de: "Trinkwasserhygiene in Krankenhäusern",
    en: "Drinking Water Hygiene in Hospitals",
    ar: "نظافة مياه الشرب في المستشفيات"
  },
  date: "2024-11-12",
  teaser: {
    de: "Kliniken und Krankenhäuser erfordern höchste Trinkwasserqualität. Erfahren Sie, wie K-Aqua PP-R Rohrsysteme durch extrem glatte Innenwände Biofilmbildung verhindern und thermische Legionellenspülungen über 70 °C dauerhaft standhalten.",
    en: "Clinics and hospitals require the highest drinking water quality. Learn how K-Aqua PP-R piping systems prevent biofilm formation thanks to extremely smooth inner walls and permanently withstand thermal legionella flushing above 70 °C.",
    ar: "تتطلب العيادات والمستشفيات أعلى جودة لمياه الشرب. تعرف على كيف تمنع أنظمة الأنابيب K-Aqua PP-R تكوين الغشاء الحيوي بفضل جدرانها الداخلية شديدة النعومة، وكيف تتحمل التنظيف الحراري لبكتيريا الليجيونيلا بدرجة حرارة تتجاوز 70 درجة مئوية بشكل دائم."
  },
  excerpt: {
    de: "Kliniken und Krankenhäuser erfordern höchste Trinkwasserqualität. Erfahren Sie, wie K-Aqua PP-R Rohrsysteme durch extrem glatte Innenwände Biofilmbildung verhindern und thermische Legionellenspülungen über 70 °C dauerhaft standhalten.",
    en: "Clinics and hospitals require the highest drinking water quality. Learn how K-Aqua PP-R piping systems prevent biofilm formation thanks to extremely smooth inner walls and permanently withstand thermal legionella flushing above 70 °C.",
    ar: "تتطلب العيادات والمستشفيات أعلى جودة لمياه الشرب. تعرف على كيف تمنع أنظمة الأنابيب K-Aqua PP-R تكوين الغشاء الحيوي بفضل جدرانها الداخلية شديدة النعومة، وكيف تتحمل التنظيف الحراري لبكتيريا الليجيونيلا بدرجة حرارة تتجاوز 70 درجة مئوية بشكل دائم."
  },
  coverImage: "/images/news/hospital-water.jpg",
  category: "Sanitärtechnik",
  tags: ["Trinkwasserhygiene", "Krankenhaus", "Legionellen", "Thermische Desinfektion", "PP-R", "Biofilm", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <HeartPulse className="w-5 h-5" />
                  <span>Klinische Sanitärtechnik &amp; TGA-Planung</span>
                </div>
              }
              title="Höchste Reinheit, wenn es um Leben geht"
              lead="In Krankenhäusern, Pflegeheimen und Reha-Kliniken ist das Immunsystem der Patienten oft stark geschwächt. Trinkwasser muss hier absolut steril und frei von Krankheitserregern wie Legionella pneumophila oder Pseudomonas aeruginosa sein. K-Aqua PP-R Kunststoff-Rohrleitungssysteme bieten durch ihre porenfreie Oberfläche, absolute Korrosionsfreiheit und dauerhafte thermische Belastbarkeit die sicherste Infrastruktur für anspruchsvolle medizinische Einrichtungen."
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
          title="Prävention auf Molekularebene mit PPR Rohren"
          lead="Wie das Hochleistungsmaterial PP-R aktiv die Trinkwassergüte in sensiblen Krankenhausnetzen schützt."
        />
        <BentoGrid
          items={[
            {
              title: "Kein Nährboden für Biofilme",
              description: "Raue Oberflächen in Metallrohren (z.B. durch Kalkablagerungen oder beginnende Lochfraßkorrosion) bieten Bakterien perfekten Halt. Die mikroskopisch glatte Innenwand von K-Aqua PP-R (Rauheit k ≤ 0,007 mm) verhindert das Anhaften von Matrizen und Biofilm extrem effektiv.",
              icon: <ShieldCheck className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Dauerhafte thermische Desinfektion",
              description: "Zur normgerechten Legionellenbekämpfung nach DVGW W 551 wird das Leitungsnetz regelmäßig mit über 70 °C heißem Wasser gespült. PP-R ist für diese extremen Temperaturschwankungen und Druckstufen zertifiziert, ohne zu verspröden.",
              icon: <Thermometer className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Chemische Beständigkeit & Stoßchlorung",
              description: "Sollte eine akute chemische Desinfektion (z.B. mit Chlordioxid oder Hypochlorit) erforderlich sein, bleibt K-Aqua PP-R strukturell intakt. Es werden keinerlei Schwermetalle, Blei oder Schadstoffe an das Trinkwasser abgegeben.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* HorizontalTimeline: Der Weg des Wassers im Klinikum */}
      <Reveal>
        <SectionHead
          title="Der Weg des Wassers im Klinikgebäude"
          lead="Hygiene-Konzepte in der TGA-Planung erfordern eine ganzheitliche Betrachtung nach DIN 1988-200 und VDI 6023."
          align="center"
        />
        <div className="mt-8">
          <HorizontalTimeline
            items={[
              {
                title: "1. Einspeisung & Übergabe",
                description: "Am Hausanschluss wird die Wasserqualität aus dem öffentlichen Netz übernommen. Hier beginnt der lückenlose Schutz durch bleifreie Komponenten und hygienisch einwandfreie Verteiler aus PP-R."
              },
              {
                title: "2. Zirkulationsleitungen & Strömung",
                description: "Das A und O im Krankenhaus: Stagnation muss konsequent vermieden werden. Das Warmwasser muss im gesamten Netz permanent zirkulieren, um Temperaturabfälle unter 55 °C (die Brutzone für Legionellen) zu verhindern."
              },
              {
                title: "3. Entnahmestelle (Patientenzimmer / OP)",
                description: "Die Anbindung der Armaturen erfolgt über totraumfreie Stichleitungen oder Durchschleif-Ringinstallationen. K-Aqua bietet hierfür strömungsoptimierte Wandwinkel und Verteilerkomponenten."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Expertenwissen */}
      <Reveal>
        <SectionHead
          title="Expertenwissen für Hygieneplaner & TGA-Ingenieure"
          lead="Antworten auf die wichtigsten Fragen der klinischen Trinkwasserhygiene und Werkstoffauswahl."
        />
        <DeepFAQ
          items={[
            {
              q: "Warum ist Kupfer in Krankenhäusern und Pflegeheimen problematisch?",
              a: "Kupferrohre reagieren empfindlich auf schwankende pH-Werte und können Kupferionen an das Trinkwasser abgeben. Zudem neigen sie bei ungünstigen Wasserverhältnissen zu Lochfraßkorrosion, was zu nischenreichen Stagnationszonen führt."
            },
            {
              q: "Gibt K-Aqua PP-R Mikroplastik oder chemische Stoffe an das Trinkwasser ab?",
              a: "Nein. K-Aqua PP-R ist ein hochmolekularer, homogen verschweißter Polypropylen-Werkstoff. Er ist vollumfänglich lebensmittelecht zertifiziert und gibt weder Mikroplastik noch Geruchs- oder Geschmacksstoffe ab."
            },
            {
              q: "Welche Normen und Zertifikate erfüllt K-Aqua für klinische Trinkwassernetze?",
              a: "Unsere Rohrsysteme verfügen über alle relevanten internationalen Hygiene-Zertifikate, unter anderem nach den strengen Richtlinien der UBA KTW-BWGL, DVGW W 270, KIWA sowie WRAS."
            },
            {
              q: "Wie unterstützt K-Aqua die Vermeidung von Stagnationszonen?",
              a: "Durch ein lückenloses Sortiment an Spezial-Verteilern, Strömungsteilern und Muffenschweißverbindungen lassen sich Reihen- und Ringinstallationen realisieren, die bei jeder Wasserentnahme das gesamte Leitungsvolumen austauschen."
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
              { n: "0", l: "Abgabe von Blei, Schwermetallen oder organischen Geschmacksstoffen." },
              { n: "70", u: "°C+", l: "Sichere Durchführung der thermischen Legionellenspülung ohne Materialschädigung." },
              { n: "100", u: "%", l: "Dauerhaft korrosionsfrei – keine rauen Lochfraß-Stellen für Bakterienwachstum." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Planungs-Support Hygiene */}
      <Reveal>
        <CTABand
          title="Planen Sie die Sanitärtechnik für ein Krankenhaus oder Pflegeheim?"
          subtitle="Lassen Sie uns gemeinsam Ihr Rohrsystem auf maximale Trinkwasserhygiene und Ausfallsicherheit prüfen. Wir unterstützen TGA-Fachplaner bei der Auslegung von Ring- und Reiheninstallationen zur Stagnationsvermeidung."
          buttonText="Hygiene-Beratung anfragen"
          buttonLink="/kontakt"
          icon={<HeartPulse className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
