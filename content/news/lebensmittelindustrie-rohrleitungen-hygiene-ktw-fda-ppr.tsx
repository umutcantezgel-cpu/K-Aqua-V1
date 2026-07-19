import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Stagger } from "@/components/ui/Stagger";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Droplet, ShieldCheck, Coffee, Microscope } from "@/components/ui/icon";

export const lebensmittelindustrieHygiene: NewsPost = {
  slug: "lebensmittelindustrie-rohrleitungen-hygiene-ktw-fda-ppr",
  title: "Lebensmittelindustrie: Hygienische Rohrleitungen für Trinkwasser & Medien",
  date: "2024-11-20",
  excerpt: "In der Food & Beverage Industrie gelten höchste Reinheitsgebote. K Aqua PP-R ist lebensmittelecht, geschmacksneutral und widersteht aggressiven CIP-Reinigungsverfahren besser als viele Metalle.",
  coverImage: "/images/news/food-industry.jpg",
  category: "Industrie & Anlagenbau",
  tags: ["Lebensmittelindustrie", "Trinkwasser", "FDA", "CIP-Reinigung", "PP-R", "Hygiene"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Coffee className="w-5 h-5" />
                  <span>Food & Beverage Anlagenbau</span>
                </div>
              }
              title="Kompromisslose Reinheit für Lebensmittel"
              lead="Ob in Molkereien, Brauereien oder der industriellen Trinkwasserabfüllung: Rohrleitungen haben direkten Einfluss auf die Produktqualität. Der Branchenstandard ist oft kostenintensiver Edelstahl (316L). K Aqua PP-R bietet eine hochgradig zertifizierte, absolut korrosionsfreie und chemisch resistente Alternative, die weder den Geschmack verfälscht noch Mikroplastik an die Medien abgibt."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für absolute Flüssigkeitsreinheit */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Warum PP-R in der Lebensmittelproduktion? */}
      <Reveal>
        <SectionHead
          title="Materialvorteile in der Produktion"
          lead="Warum PP-R für sensible flüssige Medien ideal ist."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. 100 % Lebensmittelecht",
                description: "K Aqua PP-R enthält keinerlei Weichmacher, Schwermetalle oder toxische Additive. Das hochmolekulare Material ist absolut sicher für den direkten Kontakt mit Lebensmitteln und Trinkwasser."
              },
              {
                title: "2. Geschmacks- & Geruchsneutral",
                description: "Im Gegensatz zu einigen anderen Kunststoffen oder oxidierenden Metallen verfälscht PP-R den Geschmack sensibler Endprodukte (wie Säfte, Bier oder destilliertes Wasser) in keiner Weise."
              },
              {
                title: "3. Resistent gegen CIP-Chemie",
                description: "In der Lebensmittelproduktion müssen Rohre durch 'Cleaning in Place' (CIP) mit aggressiven Säuren (z.B. Salpetersäure) und Laugen gereinigt werden. PP-R ist hochgradig chemikalienbeständig und übersteht diese Zyklen problemlos."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Materialvergleich Food Grade */}
      <Reveal>
        <SectionHead
          title="Branchenvergleich: Food Grade Pipes"
          lead="PP-R im direkten Vergleich mit Edelstahl und Standard-Kunststoff."
        />
        <DeepMatrix
          data={[
            ["Eigenschaft", "K Aqua PP-R", "Edelstahl (316L)", "PVC-U"],
            ["Zertifizierung (Trinkwasser)", "Exzellent (KTW, DVGW)", "Sehr gut", "Abhängig von Additiven"],
            ["Beständigkeit CIP-Laugen", "Hervorragend", "Gut (chloridempfindlich)", "Mittel"],
            ["Oberflächenrauheit", "< 0.007 mm (extrem glatt)", "~ 0.015 mm (poliert)", "< 0.01 mm"],
            ["Kosten (Material & Montage)", "Sehr wirtschaftlich", "Sehr teuer", "Günstig"]
          ]}
        />
      </Reveal>

      {/* GlossaryGrid: Die Sprache der Prüfer */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Wichtige Zertifizierungen & Prozesse"
            items={[
              {
                term: "KTW-BWGL / UBA",
                definition: "Die strenge deutsche Leitlinie (Umweltbundesamt) zur hygienischen Beurteilung von Kunststoffen und organischen Materialien im Kontakt mit Trinkwasser.",
                icon: <ShieldCheck className="w-6 h-6" />
              },
              {
                term: "CIP (Cleaning in Place)",
                definition: "Ein Verfahren zur Reinigung von Produktionsanlagen ohne Demontage. Es erfordert Rohre, die schnellen Temperaturwechseln und scharfer Chemie standhalten.",
                icon: <Droplet className="w-6 h-6" />
              },
              {
                term: "Biofilm-Inhibition",
                definition: "Dank der extrem glatten Innenwand von PP-R finden Mikroorganismen keinen Halt. Dies verzögert die Bildung von Biofilmen signifikant.",
                icon: <Microscope className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* StatBand: Food Safety Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Gefahr durch Weichmacher, Halogene oder Schwermetalle." },
              { n: "100", u: "%", l: "Geruchs- und geschmacksneutral für sensible Flüssigkeiten." },
              { n: "<0.007", u: "mm", l: "Rauheit der Rohrinnenwand – minimiert Anhaftungen und Bakterien." }
            ]}
          />
        </div>
      </Reveal>

      {/* CTABand: Anlagenbau Food & Beverage */}
      <Reveal>
        <CTABand
          title="Planen Sie eine Produktionserweiterung?"
          subtitle="Ob Kaltwasser, VE-Wasser oder Druckluft in der Lebensmittelindustrie: Wir prüfen die chemische Beständigkeit unseres Systems für Ihre spezifischen Produktionsmedien."
          buttonText="Beratung für Anlagenbau"
          buttonLink="/kontakt"
          icon={<Coffee className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
