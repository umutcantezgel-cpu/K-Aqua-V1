import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Activity, Power, Ear, ArrowRightLeft } from "@/components/ui/icon";

export const vibrationsentkopplungSchallschutz: NewsPost = {
  slug: "vibrationsentkopplung-schallschutz-pumpen-rohrnetz-ppr",
  title: {
    de: "Schallschutz im Maschinenraum",
    en: "Sound Insulation in the Machine Room",
    ar: "عزل الصوت في غرفة الآلات"
  },
  date: "2025-01-25",
  teaser: {
    de: "Wenn Pumpen dröhnen und Rohre vibrieren: Wie Sie Kältemaschinen und Druckerhöhungsanlagen im Maschinenraum akustisch sicher vom K Aqua PP-R Rohrsystem entkoppeln und DIN 4109 einhalten.",
    en: "When pumps roar and pipes vibrate: How to acoustically safely decouple chillers and pressure boosting systems in the machine room from the K Aqua PP-R piping system and comply with DIN 4109.",
    ar: "عندما تدوي المضخات وتهتز الأنابيب: كيف تفصل المبردات وأنظمة تعزيز الضغط في غرفة الآلات صوتياً وبشكل آمن عن نظام أنابيب K Aqua PP-R وتتوافق مع معيار DIN 4109."
  },
  excerpt: {
    de: "Wenn Pumpen dröhnen und Rohre vibrieren: Wie Sie Kältemaschinen und Druckerhöhungsanlagen im Maschinenraum akustisch sicher vom K Aqua PP-R Rohrsystem entkoppeln und DIN 4109 einhalten.",
    en: "When pumps roar and pipes vibrate: How to acoustically safely decouple chillers and pressure boosting systems in the machine room from the K Aqua PP-R piping system and comply with DIN 4109.",
    ar: "عندما تدوي المضخات وتهتز الأنابيب: كيف تفصل المبردات وأنظمة تعزيز الضغط في غرفة الآلات صوتياً وبشكل آمن عن نظام أنابيب K Aqua PP-R وتتوافق مع معيار DIN 4109."
  },
  coverImage: "/images/news/vibration-decoupling-pumps.jpg",
  category: "Planung & Berechnung",
  tags: ["Schallschutz", "Vibration", "Pumpen", "Maschinenraum", "Kältemaschinen", "Akustik"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Pressure) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Ear className="w-5 h-5" />
                  <span>Akustik & Mechanik</span>
                </div>
              }
              title="Wenn das PP-R Rohrnetz im Maschinenraum zum Lautsprecher wird"
              lead="Im Technikraum schlägt das Herz moderner Gebäudetechnik. Kältemaschinen, Druckerhöhungsanlagen, Umwälzpumpen und Kompressoren erzeugen im Betrieb kontinuierliche mechanische Schwingungen. Werden diese Aggregate starr an ein Kunststoff- oder PP-R Rohrsystem angeschlossen, überträgt sich die Vibration direkt in die Rohrwandung. Das Leitungsnetz wirkt dann wie ein Resonanzkörper und trägt den Körperschall bis in schutzbedürftige Räume wie Hotelzimmer oder Wohnbereiche. Eine fachgerechte schalltechnische Vibrationsentkopplung ist baurechtlich nach DIN 4109 zwingend vorgeschrieben."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Visualisierung von Druck/Vibration */}
            <PipeFX variant="pressure" size={380} />
          </div>
        </div>
      </Reveal>

      {/* DeepFAQ: Grundlagen der Akustik */}
      <Reveal>
        <SectionHead
          title="FAQ: Körperschall vs. Luftschall"
          lead="Wo liegt das eigentliche Problem?"
        />
        <DeepFAQ
          items={[
            {
              q: "Was ist der Unterschied zwischen Körperschall und Luftschall?",
              a: "Luftschall (z.B. das Surren des Motors) breitet sich in der Luft aus und kann durch dicke Wände gedämmt werden. Körperschall hingegen breitet sich im festen Material (Rohre, Beton) aus und wandelt sich an Wänden oder Heizkörpern wieder in hörbaren Luftschall um. Körperschall ist wesentlich schwieriger zu stoppen."
            },
            {
              q: "Überträgt PP-R den Schall genauso stark wie Metall?",
              a: "Nein. Polypropylen hat durch seine molekulare Struktur eine hohe Eigendämpfung. Die Schallausbreitungsgeschwindigkeit in Kunststoff ist viel geringer als in Stahl oder Kupfer. K Aqua PP-R schluckt einen Teil der Schwingungen ('Flüsterrohr'-Effekt), was es für Hotelbauten extrem attraktiv macht."
            },
            {
              q: "Reicht die Eigendämpfung von PP-R aus, um auf Kompensatoren zu verzichten?",
              a: "Auf keinen Fall. Die Eigendämpfung reduziert zwar Fließgeräusche enorm, aber die harten mechanischen Stöße einer großen Pumpe würden auch ein Kunststoffnetz auf Dauer beschädigen (Materialermüdung) und akustisch übertragen. Die Maschine muss entkoppelt werden."
            }
          ]}
        />
      </Reveal>

      {/* BentoGrid: Entkopplungsmaßnahmen */}
      <Reveal>
        <SectionHead
          title="Das 3-Stufen-Konzept zur Entkopplung"
          lead="So wird die Maschine akustisch vom Gebäude getrennt."
        />
        <BentoGrid
          items={[
            {
              title: "1. Elastomerlager (Maschinenbett)",
              description: "Die Pumpe oder Kältemaschine darf nicht starr auf den Betonboden geschraubt werden. Sie wird auf ein schweres Fundament gesetzt, welches wiederum auf Gummipuffern (Elastomerlager) ruht. Dies trennt die Maschine vom Baukörper.",
              icon: <Power className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "2. Gummikompensatoren (Rohranschluss)",
              description: "Zwischen dem Anschlussflansch der vibrierenden Maschine und dem K Aqua Rohrnetz wird zwingend ein flexibler Gummikompensator eingebaut. Er fängt die Schwingungen ab, bevor sie in die Rohrwandung gelangen.",
              icon: <ArrowRightLeft className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "3. Akustik-Rohrschellen (Netz)",
              description: "Auch nach dem Kompensator sollten die ersten Rohrbefestigungen mit speziellen schallgedämmten Gummieinlagen ausgestattet sein. Dies verhindert, dass restliche Fließgeräusche in die Wand übertragen werden.",
              icon: <Activity className="w-6 h-6 text-primary" />,
              size: "large"
            }
          ]}
        />
      </Reveal>

      {/* StatBand: Akustische Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "30", u: "dB(A)", l: "Maximallautstärke für haustechnische Anlagen in schutzbedürftigen Räumen (z.B. Schlafräume) nach DIN 4109." },
              { n: "↓", u: "Schall", l: "Kunststoff besitzt eine bis zu 10-fach geringere Schallleitfähigkeit als metallische Werkstoffe." },
              { n: "0", l: "Starre Verbindungen dürfen zwischen Maschine und Gebäude bzw. Hauptrohrnetz bestehen." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: K Aqua Support */}
      <Reveal>
        <CTABand
          title="Leise Nächte im Hotel"
          subtitle="Setzen Sie auf die Eigendämpfung von K Aqua PP-R in Kombination mit professioneller Entkopplungstechnik. Wir unterstützen Sie bei der schalltechnischen Planung."
          buttonText="Planungshilfe anfragen"
          buttonLink="/ressourcen/support"
          icon={<Ear className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
