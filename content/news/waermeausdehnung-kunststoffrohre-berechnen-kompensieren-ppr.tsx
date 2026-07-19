import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { MoveHorizontal, Ruler, Info, ArrowRightLeft } from "@/components/ui/icon";

export const waermeausdehnungKunststoffrohre: NewsPost = {
  slug: "waermeausdehnung-kunststoffrohre-berechnen-kompensieren-ppr",
  title: "Wärmeausdehnung von Kunststoffrohren berechnen und kompensieren",
  date: "2025-01-22",
  excerpt: "Temperaturschwankungen lassen Rohre wachsen und schrumpfen. Wie Sie die Längenausdehnung bei PP-R richtig berechnen und durch Dehnungsbögen kompensieren.",
  coverImage: "/images/news/thermal-expansion-pipes.jpg",
  category: "Planung & Berechnung",
  tags: ["Wärmeausdehnung", "Längenausdehnung", "Festpunkt", "Kompensator", "Planung"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Flow) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <MoveHorizontal className="w-5 h-5" />
                  <span>Physik in der TGA</span>
                </div>
              }
              title="Wenn das Rohr lebendig wird"
              lead="Jedes Material dehnt sich bei Erwärmung aus und zieht sich bei Abkühlung zusammen. Bei Kunststoffen wie Polypropylen (PP) ist dieser physikalische Effekt deutlich ausgeprägter als bei Metallen. Fließt 70°C heißes Wasser durch eine Rohrleitung, die bei 20°C montiert wurde, wächst das Rohr. Wird diese Längenausdehnung in der Planung ignoriert, entstehen enorme Spannungen, die Halterungen abreißen oder Verbindungen zerstören können."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Bewegung/Fluss */}
            <PipeFX variant="flow" size={380} />
          </div>
        </div>
      </Reveal>

      {/* DeepMatrix: Ausdehnungskoeffizienten */}
      <Reveal>
        <SectionHead
          title="Materialien im Vergleich"
          lead="Der Längenausdehnungskoeffizient (Alpha-Wert) bestimmt das Maß der Ausdehnung."
        />
        <DeepMatrix
          data={[
            ["Material", "Linearer Ausdehnungskoeffizient (α)", "Ausdehnung bei 10m und ΔT=50K"],
            ["PP-R (Standard-Kunststoffrohr)", "0,150 mm/(m·K)", "75,0 mm"],
            ["K Aqua Faserverbundrohr (PP-R/GF)", "0,035 mm/(m·K)", "17,5 mm"],
            ["Kupfer", "0,017 mm/(m·K)", "8,5 mm"],
            ["Stahl (verzinkt)", "0,012 mm/(m·K)", "6,0 mm"]
          ]}
        />
        <div className="mt-4 flex items-start gap-3 text-sm text-muted-foreground bg-accent/30 p-4 rounded-xl">
          <Info className="w-5 h-5 text-primary shrink-0" />
          <p>
            <strong>Wichtig:</strong> Durch die Co-Extrusion mit einer Glasfaser-Mittelschicht (K Aqua Faserverbundrohr) wird die Ausdehnung des Kunststoffs um fast 75 % reduziert. Das Verhalten nähert sich dem von metallischen Rohren an.
          </p>
        </div>
      </Reveal>

      {/* StatBand: Die Berechnungsformel */}
      <Reveal>
        <SectionHead
          title="Die Formel für die Praxis"
          lead="Drei Variablen bestimmen das Längenwachstum (ΔL)."
          align="center"
        />
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "ΔT", u: "in Kelvin", l: "Temperaturdifferenz zwischen Montage- und maximaler Betriebstemperatur." },
              { n: "L", u: "in Metern", l: "Die absolute Länge des geraden Rohrabschnitts zwischen zwei Richtungsänderungen." },
              { n: "α", u: "Materialwert", l: "Der materialabhängige Längenausdehnungskoeffizient." }
            ]}
          />
        </div>
      </Reveal>

      {/* Stagger: Kompensationsmethoden */}
      <Reveal>
        <SectionHead
          title="Methoden der Kompensation"
          lead="Wie man der Ausdehnung den nötigen Raum gibt, um Spannungen zu vermeiden."
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. Natürliche Richtungsänderung (Biegeschenkel)",
                description: "Die eleganteste Lösung. Die Ausdehnung des Rohres L1 wird in den ohnehin vorhandenen 90°-Winkel (Schenkel L2) geleitet. Der Schenkel L2 muss lang genug sein (Biegeschenkellänge BS), um die Biegung elastisch aufzunehmen, ohne zu brechen."
              },
              {
                title: "2. U-Dehnungsbogen (U-Kompensator)",
                description: "Auf langen, geraden Strecken ohne Richtungsänderungen (z.B. in Fluren oder Schächten) wird gezielt ein U-Bogen aus 4x 90°-Winkeln geschweißt. Dieser Bogen nimmt die Ausdehnung aus beiden Richtungen wie eine Feder auf."
              },
              {
                title: "3. Mechanische Axialkompensatoren",
                description: "Wellrohr-Kompensatoren aus Metall, die in die Rohrleitung integriert werden. Bei K Aqua PP-R Systemen raten wir hiervon meist ab, da natürliche Dehnungsbögen aus dem eigenen Rohrstoff sicherer, langlebiger und kostengünstiger sind."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Festpunkte und Loslager */}
      <Reveal>
        <SectionHead
          title="FAQ: Befestigungstechnik"
          lead="Das Geheimnis liegt in den Schellen."
        />
        <DeepFAQ
          items={[
            {
              q: "Was ist der Unterschied zwischen Festpunkt (FP) und Loslager (Gleitschelle / GL)?",
              a: "Ein Festpunkt blockiert das Rohr komplett und lenkt die Ausdehnung in eine bestimmte Richtung. Eine Gleitschelle hält das Rohr, lässt ihm aber den Spielraum, um in Längsrichtung durch die Schelle zu gleiten."
            },
            {
              q: "Wie erzeuge ich einen Festpunkt bei PP-R Rohren?",
              a: "Da Kunststoffrohre eine sehr glatte Oberfläche haben, kann das Rohr bei großen Kräften durch eine festgezogene Gummischelle rutschen. Echte Festpunkte werden erzeugt, indem man spezielle Festpunkt-Schweißmuffen vor und hinter die Schelle schweißt, die sich formschlüssig gegen die Schelle abstützen."
            },
            {
              q: "Muss bei Kaltwasserleitungen auch eine Dehnung berücksichtigt werden?",
              a: "Meistens nicht, da die Differenz zwischen Montagetemperatur (z.B. 20°C) und Betriebstemperatur (z.B. 10°C) gering ist. Das Rohr schrumpft leicht. Nur bei extremen Längen oder Freiverlegung (Sonneneinstrahlung) ist es relevant."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: K Aqua Support */}
      <Reveal>
        <CTABand
          title="Sicher planen, sicher bauen"
          subtitle="Überlassen Sie die Dehnungsberechnung nicht dem Zufall. Nutzen Sie unsere technischen Richtlinien oder kontaktieren Sie die K Aqua Planungsabteilung für eine individuelle Netzberechnung."
          buttonText="Technisches Handbuch laden"
          buttonLink="/ressourcen/support"
          icon={<Ruler className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
