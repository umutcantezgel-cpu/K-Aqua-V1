import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { PipeFX } from "@/components/ui/PipeFX";
import { ShieldAlert, Activity, Shield, Factory, Wrench } from "@/components/ui/icon";

export const druckluftanlagenSicherheit: NewsPost = {
  slug: "druckluftanlagen-rohrsysteme-sicherheit-ppr",
  title: {
    de: "Druckluftanlagen & PP-R Rohrsysteme",
    en: "Compressed Air Systems & PP-R Pipe Systems",
    ar: "أنظمة الهواء المضغوط وأنظمة أنابيب PP-R"
  },
  date: "2024-08-10",
  teaser: {
    de: "Ein platzendes Stahlrohr in einer Druckluftanlage wirkt wie eine Splitterbombe. PP-R Rohrleitungssysteme von K Aqua bieten absolute Korrosionsfreiheit, reduzieren Druckverluste und gewähren im Ernstfall überlebenswichtige Arbeitssicherheit durch splitterfreies Versagen.",
    en: "A bursting steel pipe in a compressed air system acts like a fragmentation bomb. PP-R pipe systems from K Aqua offer absolute freedom from corrosion, reduce pressure drops, and in an emergency provide vital occupational safety through splinter-free failure.",
    ar: "يعمل الأنبوب الفولاذي المنفجر في نظام الهواء المضغوط مثل قنبلة متشظية. توفر أنظمة أنابيب PP-R من K Aqua خلوًا تامًا من التآكل، وتقلل من انخفاض الضغط، وتوفر في حالات الطوارئ سلامة مهنية حيوية من خلال الانهيار الخالي من الشظايا."
  },
  excerpt: {
    de: "Ein platzendes Stahlrohr in einer Druckluftanlage wirkt wie eine Splitterbombe. PP-R Rohrleitungssysteme von K Aqua bieten absolute Korrosionsfreiheit, reduzieren Druckverluste und gewähren im Ernstfall überlebenswichtige Arbeitssicherheit durch splitterfreies Versagen.",
    en: "A bursting steel pipe in a compressed air system acts like a fragmentation bomb. PP-R pipe systems from K Aqua offer absolute freedom from corrosion, reduce pressure drops, and in an emergency provide vital occupational safety through splinter-free failure.",
    ar: "يعمل الأنبوب الفولاذي المنفجر في نظام الهواء المضغوط مثل قنبلة متشظية. توفر أنظمة أنابيب PP-R من K Aqua خلوًا تامًا من التآكل، وتقلل من انخفاض الضغط، وتوفر في حالات الطوارئ سلامة مهنية حيوية من خلال الانهيار الخالي من الشظايا."
  },
  coverImage: "/images/news/compressed-air.jpg",
  category: "Industrie",
  tags: ["Druckluft", "Industrie", "Arbeitssicherheit", "Pneumatik", "PP-R", "Rohrsysteme", "Korrosion"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-destructive font-bold">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Arbeitssicherheit & Pneumatik</span>
                </div>
              }
              title="Die unsichtbare Gefahr im Druckluftnetz: Metall vs. PP-R Rohrsysteme"
              lead="Korrosion in metallischen Druckluftnetzen zerstört sensible Pneumatik. Erfahren Sie, warum K Aqua PP-R Rohrsysteme die sichere, saubere und dauerhaft dichte Lösung für industrielle Druckluftanlagen sind. Druckluft ist ein extrem energiereiches Medium. Werden verzinkte Stahlrohre über Jahre hinweg durch Kondenswasser von innen korrodiert, schwächt das die Rohrwand drastisch. Kommt es zur Überlastung, zersplittert das Metall explosionsartig. PP-R Rohrsysteme von K-Aqua verhalten sich grundlegend anders: Sie sind extrem zäh, absolut korrosionsfrei und reißen im Extremfall lediglich splitterfrei auf."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Druck & Pulsation */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* BentoGrid: Warum PP-R in der Pneumatik überlegen ist */}
      <Reveal>
        <SectionHead
          title="Vorteile für Kompressor und Endgerät"
          lead="Neben dem Sicherheitsaspekt beeinflusst das Rohrmaterial direkt die Lebensdauer Ihrer Druckluftwerkzeuge."
        />
        <BentoGrid
          items={[
            {
              title: "Splitterfreies Versagen",
              description: "Stahlrohre fungieren bei Druckluft oft als Resonanzkörper und übertragen das Kompressor-Brummen durch die gesamte Werkhalle. PP-R besitzt hervorragende schalldämpfende Eigenschaften. Die Fließgeräusche und mechanischen Vibrationen werden vom Material geschluckt – für eine deutlich verbesserte Arbeitsplatzergonomie.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Keine Rostpartikel in Ventilen",
              description: "Druckluft ist der Muskel der modernen Industrie. Ob Werkzeuge, CNC-Maschinen, Lackieranlagen oder Verpackungsroboter – wenn der Druck abfällt oder Verunreinigungen eintreten, stoppt die Produktion. Genau hier scheitern metallische Netze häufig auf Raten. Kondensat im System löst unweigerlich Korrosion aus. Rostpartikel lösen sich, wandern in die Pneumatik-Zylinder und zerstören teure Maschinen. K Aqua PP-R bietet die ultimative Alternative: Ein System, das nicht rostet, nicht leckt und dauerhaft saubere Druckluft liefert.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Weniger Druckverlust = Geringere Stromkosten",
              description: "Es dürfen ausschließlich ölfreie oder durch hochwirksame Ölabscheider und Filter gereinigte Druckluftströme durch Standard PP-R geleitet werden. Synthetische Kompressor-Öle können bei ständigem Kontakt bestimmte Kunststoffe angreifen. K Aqua bietet hierfür eine genaue Kompatibilitätsprüfung an.",
              icon: <Factory className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
      </Reveal>

      <SectionDivider />

      {/* DeepMatrix: Druckbeständigkeit */}
      <Reveal>
        <SectionHead
          title="Druckbeständigkeit im Vergleich"
          lead="Wie viel Druck hält ein PP-R Rohr bei industriellen Standardbedingungen (20 °C Umgebungstemperatur, 50 Jahre Lebensdauer) stand?"
        />
        <DeepMatrix
          data={[
            ["Rohrserie / SDR-Klasse", "Max. Betriebsdruck (bei 20 °C, 50 Jahre)", "Typischer Einsatz in der Druckluft"],
            ["K Aqua PP-R (SDR 11)", "10 bar", "Standard-Druckluftnetze, Ringleitungen"],
            ["K Aqua PP-R (SDR 7.4)", "16 bar", "Hauptverteilungsleitungen, hohe Reserve"],
            ["K Aqua PP-RCT (SDR 9)", "16 bar", "Große Nennweiten, hohe mechanische Belastung"],
            ["Verzinkter Stahl", "i.d.R. 16 bar", "Nur bei 100% trockener Druckluft sicher"]
          ]}
        />
      </Reveal>

      {/* Stagger: Umrüstung im laufenden Betrieb */}
      <Reveal>
        <SectionHead
          title="Umrüstung ohne Stillstand"
          lead="Der Austausch eines bestehenden Druckluftnetzes muss oft im laufenden Betrieb oder an Wochenenden erfolgen."
          align="center"
        />
        <Stagger
          items={[
            {
              title: "1. Flammfreies Verbinden",
              description: "K Aqua Rohre werden per Heizelementmuffenschweißung verbunden. Es gibt keine offene Flamme, keine Brandgefahr und keinen Funkenflug (Hot-Works-Permit oft nicht nötig)."
            },
            {
              title: "2. Geringes Gewicht",
              description: "Ein PP-R Rohr wiegt nur einen Bruchteil eines Stahlrohres. Die Installation unter Hallendecken geht wesentlich schneller und mit weniger Personal vonstatten."
            },
            {
              title: "3. Sofortige Inbetriebnahme",
              description: "Im Gegensatz zu verzinktem Stahl gibt es bei K Aqua PP-R keine Korrosion. Auch bei hohem Kondensatanfall im Leitungsnetz lösen sich keine Partikel. Die Druckluft bleibt von der Einspeisung bis zur Maschine in absoluter Premium-Qualität erhalten."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Industrie-Beratung */}
      <Reveal>
        <CTABand
          title="Sicherheit für Ihre Produktion"
          subtitle="Planen Sie den Neubau oder die Sanierung Ihres Druckluftnetzes? Wir berechnen Strömungsgeschwindigkeiten und Rohrquerschnitte für optimale Effizienz."
          buttonText="Druckluft-Experten kontaktieren"
          buttonLink="/kontakt"
          icon={<Wrench className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
