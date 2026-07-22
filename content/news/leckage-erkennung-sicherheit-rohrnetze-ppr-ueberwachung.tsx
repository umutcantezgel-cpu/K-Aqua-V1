import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { ShieldAlert, Search, Activity, Wrench } from "@/components/ui/icon";

export const leckageErkennungSicherheit: NewsPost = {
  slug: "leckage-erkennung-sicherheit-rohrnetze-ppr-ueberwachung",
  title: {
    de: "Leckageerkennung in PPR Rohrsystemen",
    en: "Leak Detection in PPR Pipe Systems",
    ar: "كشف التسرب في أنظمة أنابيب PPR"
  },
  date: "2024-12-14",
  excerpt: {
    de: "Wasserschäden in Großgebäuden verursachen immense Kosten. Erfahren Sie, wie K Aqua PPR Rohrsysteme durch stoffschlüssige Schweißverbindungen ohne O Ringe maximale Sicherheit bei Leckageerkennung und Netzüberwachung garantieren.",
    en: "Water damage in large buildings causes immense costs. Learn how K Aqua PPR pipe systems guarantee maximum safety in leak detection and network monitoring through cohesive welded joints without O rings.",
    ar: "تتسبب أضرار المياه في المباني الكبيرة في تكاليف هائلة. تعرف على كيف تضمن أنظمة أنابيب K Aqua PPR أقصى درجات الأمان في كشف التسرب ومراقبة الشبكات من خلال وصلات ملحومة متماسكة بدون حلقات منع التسرب (O rings)."
  },
  coverImage: "/images/news/leak-detection.jpg",
  category: "Gebäudesicherheit",
  tags: ["Leckage", "Sicherheit", "Druckprüfung", "Überwachung", "PPR", "Schweißtechnik", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Gebäudesicherheit & Rohrnetzüberwachung</span>
                </div>
              }
              title="Risikominimierung durch homogene PPR Schweißverbindungen"
              lead="In weitläufigen Rohrnetzen von Kliniken, Hotels oder Industrieanlagen ist eine unbemerkte Leckage ein Albtraum. Meist sind nicht die Rohre selbst das Problem, sondern die Verbindungsstellen. Gepresste oder geschraubte Systeme setzen auf Gummidichtungen (O Ringe), die mit den Jahren altern, oder Gewinde, die unter Vibrationen leiden. K Aqua PPR Rohrsysteme eliminieren mechanische Schwachstellen durch dauerhaft stoffschlüssige Verschweißung auf molekularer Ebene."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Druckstabilität und Dichtigkeit */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Das 3-Stufensicherheitskonzept */}
      <Reveal>
        <SectionHead
          title="Das 3 Stufen Sicherheitskonzept"
          lead="Wie K Aqua Systeme von der Montage bis zum Betrieb maximale Sicherheit garantieren."
        />
        <BentoGrid
          items={[
            {
              title: "Homogene Schweißverbindung",
              description: "Beim Muffenschweißen verschmelzen Rohr und Fitting auf molekularer Ebene zu einem einzigen Bauteil. Wo keine Dichtung ist, kann auch keine Dichtung versagen.",
              icon: <Wrench className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Normgerechte Druckprüfung",
              description: "Vor der Inbetriebnahme wird jedes K Aqua Netz (z.B. nach DIN EN 806) einem harten Stufendrucktest unterzogen, um selbst kleinste Verarbeitungsfehler aufzudecken.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Integration von Sensorik",
              description: "In Smart Buildings lassen sich Feuchtigkeits und Volumenstromsensoren mühelos an K Aqua Verteiler anbinden, um kleinste Anomalien sofort an die GLT zu melden.",
              icon: <Search className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      {/* DeepMatrix: Leckagerisiko im Vergleich */}
      <Reveal>
        <SectionHead
          title="Leckagerisiko im Systemvergleich"
          lead="Wo liegen die Schwachstellen der verschiedenen Rohrwerkstoffe?"
        />
        <DeepMatrix
          data={[
            ["Risikofaktor", "K Aqua PPR (Geschweißt)", "Kupfer (Gepresst)", "C Stahl (Verschraubt)"],
            ["Alterung der Dichtung", "Nicht existent (Kein O Ring)", "Hoch (O Ring kann spröde werden)", "Mittel (Hanf/Teflon)"],
            ["Lockerung durch Vibration", "Nicht möglich", "Möglich (bei Setzungen)", "Hoch (Gewinde lockern sich)"],
            ["Fehler bei der Montage", "Gering (Sichtkontrolle am Schweißwulst)", "Hoch (Pressung vergessen)", "Mittel (Undichtes Gewinde)"],
            ["Lochfraß durch Korrosion", "Ausgeschlossen", "Möglich (bei falschen pH Werten)", "Sehr hoch (Sauerstoffeintrag)"]
          ]}
        />
      </Reveal>

      {/* Stagger: Typische Leckageursachen */}
      <Reveal>
        <SectionHead
          title="Die häufigsten Ausfallursachen"
          lead="Warum herkömmliche Rohre undicht werden – und wie PPR sie löst."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Ermüdung von Elastomerdichtungen",
                description: "In der TGA werden unzählige Pressfittings mit O Ringen verbaut. Nach 15 bis 20 Jahren, besonders bei hohen Wassertemperaturen, verlieren diese Gummis ihre Elastizität und werden undicht. Bei K Aqua PPR entfällt dieses Risiko zu 100 %."
              },
              {
                title: "2. Vibrationen und Druckschläge",
                description: "Starke Pumpen und schnell schließende Ventile verursachen Mikrovibrationen. Schraubverbindungen aus Metall können sich dadurch über Jahre hinweg lockern. Ein stoffschlüssig verschweißtes PPR System fängt Vibrationen elastisch ab."
              },
              {
                title: "3. Lochfraß (Pitting Corrosion)",
                description: "Lokale elektrochemische Prozesse fressen winzige Löcher in Metallrohre. Dies geschieht oft schleichend unter der Isolierung. Da Kunststoff ein Nichtleiter ist, gibt es bei K Aqua keinerlei elektrochemische Korrosion."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Sicherheitsfakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Anzahl der benötigten O Ringe oder Gummidichtungen in einer PPR Schweißverbindung." },
              { n: "3", u: "x", l: "Prüfdruck bei der gestuften Druckprobe zur absoluten Qualitätssicherung vor Inbetriebnahme." },
              { n: "100", u: "%", l: "Homogenität. Rohr und Fitting bestehen exakt aus demselben Werkstoff und verschmelzen." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Sicherheitstechnik */}
      <Reveal>
        <CTABand
          title="Wollen Sie Wasserschäden in Großprojekten ausschließen?"
          subtitle="Schützen Sie Ihre Investition durch eine kompromisslos sichere Rohrinfrastruktur. Wir schulen Ihre Installateure vor Ort in der perfekten PPR Schweißtechnik."
          buttonText="Beratung anfordern"
          buttonLink="/kontakt"
          icon={<ShieldAlert className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
