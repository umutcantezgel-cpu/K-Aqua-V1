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
  title: "Druckluftanlagen in der Industrie: Warum PP-R sicherer als Metall ist",
  date: "2024-08-10",
  excerpt: "Ein platzendes Stahlrohr in einer Druckluftanlage wirkt wie eine Splitterbombe. PP-R Rohrleitungssysteme von K Aqua bieten nicht nur absolute Korrosionsfreiheit, sondern im Ernstfall auch überlebenswichtige Arbeitssicherheit durch splitterfreies Versagen.",
  coverImage: "/images/news/compressed-air.jpg",
  category: "Industrie",
  tags: ["Druckluft", "Industrie", "Arbeitssicherheit", "Pneumatik", "PP-R", "Korrosion"],
  
  content: () => (
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
              title="Die unsichtbare Gefahr im Druckluftnetz"
              lead="Druckluft ist ein extrem energiereiches Medium. Werden verzinkte Stahlrohre über Jahre hinweg durch Kondenswasser von innen korrodiert, schwächt das die Rohrwand. Kommt es zur Überlastung, zersplittert das Metall explosionsartig. PP-R Rohre verhalten sich grundlegend anders: Sie sind zäh, rosten nicht und reißen im Extremfall lediglich auf."
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
              description: "Sollte ein K Aqua PP-R Rohr (z.B. durch massive äußere Gewalteinwirkung) bersten, entstehen keine gefährlichen Splitter. Das Material reißt zäh auf, der Druck entweicht kontrolliert.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Keine Rostpartikel in Ventilen",
              description: "Kondensat im Kompressornetz führt bei Stahlrohren zu Innenkorrosion. Rostpartikel lösen sich und zerstören empfindliche Pneumatikventile und Zylinder am Ende der Leitung. PP-R bleibt dauerhaft glatt und sauber.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Weniger Druckverlust = Geringere Stromkosten",
              description: "Die spiegelglatte Innenwand (Rauigkeit 0,007 mm) von PP-R Rohren minimiert den Strömungswiderstand. Der Kompressor muss weniger Leistung aufbringen, um den Betriebsdruck aufrechtzuerhalten.",
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
              description: "K Aqua Rohre werden per Heizelementmuffenschweißung verbunden. Es gibt keine offene Flamme, keine Brandgefahr und keine Funkenflug (Hot Works Permit oft nicht nötig)."
            },
            {
              title: "2. Geringes Gewicht",
              description: "Ein PP-R Rohr wiegt nur einen Bruchteil eines Stahlrohres. Die Installation unter Hallendecken geht wesentlich schneller und mit weniger Personal vonstatten."
            },
            {
              title: "3. Sofortige Inbetriebnahme",
              description: "Sobald die Schweißverbindung abgekühlt ist (wenige Minuten), ist sie voll belastbar. Das Druckluftnetz kann umgehend wieder unter Druck gesetzt werden."
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
  )
};
