import React from "react";
import { StatBand } from "@/components/ui/StatBand";
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
    de: "Druckluftanlagen & PPR Rohrsysteme",
    en: "Compressed Air Systems & PPR Pipe Systems",
    ar: "أنظمة الهواء المضغوط وأنظمة أنابيب PPR"
  },
  date: "2024-08-10",
  teaser: {
    de: "Ein platzendes Stahlrohr in einer Druckluftanlage wirkt wie eine Splitterbombe. PPR Rohrleitungssysteme von K Aqua bieten absolute Korrosionsfreiheit, reduzieren Druckverluste und gewähren im Ernstfall überlebenswichtige Arbeitssicherheit durch splitterfreies Versagen.",
    en: "A bursting steel pipe in a compressed air system acts like a fragmentation bomb. PPR pipe systems from K Aqua offer absolute freedom from corrosion, reduce pressure drops, and in an emergency provide vital occupational safety through splinter-free failure.",
    ar: "يعمل الأنبوب الفولاذي المنفجر في نظام الهواء المضغوط مثل قنبلة متشظية. توفر أنظمة أنابيب PPR من K Aqua خلوًا تامًا من التآكل، وتقلل من انخفاض الضغط، وتوفر في حالات الطوارئ سلامة مهنية حيوية من خلال الانهيار الخالي من الشظايا."
  },
  excerpt: {
    de: "Ein platzendes Stahlrohr in einer Druckluftanlage wirkt wie eine Splitterbombe. PPR Rohrleitungssysteme von K Aqua bieten absolute Korrosionsfreiheit, reduzieren Druckverluste und gewähren im Ernstfall überlebenswichtige Arbeitssicherheit durch splitterfreies Versagen.",
    en: "A bursting steel pipe in a compressed air system acts like a fragmentation bomb. PPR pipe systems from K Aqua offer absolute freedom from corrosion, reduce pressure drops, and in an emergency provide vital occupational safety through splinter-free failure.",
    ar: "يعمل الأنبوب الفولاذي المنفجر في نظام الهواء المضغوط مثل قنبلة متشظية. توفر أنظمة أنابيب PPR من K Aqua خلوًا تامًا من التآكل، وتقلل من انخفاض الضغط، وتوفر في حالات الطوارئ سلامة مهنية حيوية من خلال الانهيار الخالي من الشظايا."
  },
  coverImage: "/images/news/compressed-air.jpg",
  category: "Industrie",
  tags: ["Druckluft", "Industrie", "Arbeitssicherheit", "Pneumatik", "PPR", "Rohrsysteme", "Korrosion"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
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
              title="Die unsichtbare Gefahr im Druckluftnetz: Metall vs. PPR Rohrsysteme"
              lead="Druckluft in industriellen Druckluftanlagen ist ein extrem energiereiches Medium. Werden verzinkte Stahlrohre über Jahre hinweg durch Kondenswasser von innen korrodiert, schwächt das die Rohrwand drastisch. Kommt es zur Überlastung, zersplittert das Metall explosionsartig. PPR Rohrsysteme von K Aqua verhalten sich grundlegend anders: Sie sind extrem zäh, absolut korrosionsfrei und reißen im Extremfall lediglich splitterfrei auf."
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Das Explosionsrisiko von korrodierten Stahlnetzen</h2>
          <p>
            Druckluft ist in modernen Produktionsanlagen unverzichtbar, birgt jedoch erhebliche Gefahren. Im Gegensatz zu Wasser (das sich nicht komprimieren lässt), speichert Luft unter Druck eine enorme Menge an potenzieller Energie. Tritt ein Leck oder ein Rohrbruch auf, entlädt sich diese Energie schlagartig. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Der Feind im Rohr: Kondenswasser</h3>
          <p>
            Die meisten industriellen Druckluftnetze wurden in der Vergangenheit aus verzinktem Stahl errichtet. Doch bei der Kompression von Luft entsteht unvermeidbar Kondensat (Wasser). Selbst mit modernen Lufttrocknern lässt sich Restfeuchte im Rohrnetz nie komplett ausschließen. Diese Feuchtigkeit greift das verzinkte Stahlrohr von innen an – es rostet unbemerkt. Die Rohrwandstärke nimmt im Laufe der Jahre ab, bis das Material dem Betriebsdruck von oft 10 bis 16 bar nicht mehr standhalten kann.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Die Splitterbombe unter der Hallendecke</h3>
          <p>
            Wenn ein sprödes, korrodiertes Stahl- oder PVC-U-Rohr unter hohem Druck versagt, verhält es sich wie eine Splitterbombe. Metallteile oder harte Kunststoffsplitter werden mit enormer Wucht in die Produktionshalle geschleudert. Dies stellt ein massives und oft tödliches Risiko für die Mitarbeiter dar. 
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Sicherheit durch zähes Material: PP-R</h2>
          <p>
            K Aqua PP-R (Polypropylen Random Copolymer) Rohrsysteme bieten hier eine fundamentale Verbesserung der Arbeitssicherheit.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Splitterfreies Versagen (Ductile Failure)</h3>
          <p>
            PP-R ist ein extrem zäher Werkstoff. Sollte ein PP-R Rohr tatsächlich einmal durch massive äußere mechanische Einwirkung (z.B. einen anfahrenden Gabelstapler) oder absichtliche massive Überdruckbeaufschlagung bersten, splittert das Material nicht. Es reißt lediglich längs auf (ductile failure). Der Überdruck entweicht laut zischend, aber kontrolliert, ohne dass gefährliche Projektile entstehen. Dies ist ein unverzichtbares Sicherheitsmerkmal für den modernen Arbeitsschutz in Industrieanlagen.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Keine Rostpartikel in Ventilen und Zylindern</h3>
          <p>
            Neben der Sicherheit löst PP-R das größte Wartungsproblem von Druckluftnetzen. Da Polypropylen nicht korrodiert, entsteht im Inneren des Rohres kein Rost. Bei Stahlrohren lösen sich ständig kleine Rostpartikel und Zunder, die mit der Druckluft mitgerissen werden. Diese Partikel wirken wie Schmirgelpapier und zerstören empfindliche Pneumatikventile, Druckluftwerkzeuge und Zylinder am Ende der Leitung. Mit K Aqua PP-R bleibt die Druckluft vom Kompressor bis zum Endgerät 100 % sauber.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Wirtschaftlichkeit durch reduzierte Druckverluste</h2>
          <p>
            Druckluft ist einer der teuersten Energieträger in der Industrie. Rund 10 % des industriellen Stromverbrauchs entfallen auf die Drucklufterzeugung.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Geringerer Strömungswiderstand senkt Stromkosten</h3>
          <p>
            Durch raue und verrostete Innenwände bei alten Metallrohren entstehen hohe Reibungsverluste. Der Kompressor muss ständig mehr Druck erzeugen (und somit mehr Strom verbrauchen), um den Druckabfall im Netz auszugleichen. K Aqua PP-R Rohre besitzen eine extrem glatte Innenfläche (k = 0,007 mm), die über die gesamte Lebensdauer unverändert bleibt. Der Druckluftfluss ist laminar und nahezu verlustfrei. Häufig kann durch die Umstellung auf PP-R der Betriebsdruck des Kompressors um 1 bis 2 bar abgesenkt werden – was tausende Euro Stromkosten pro Jahr einspart.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Umrüstung im laufenden Betrieb (Hot Works Permit)</h2>
          <p>
            Der Austausch eines bestehenden Druckluftnetzes in der Industrie muss meist bei laufender Produktion oder an knappen Wochenenden erfolgen. Das Schweißen von Stahlrohren erfordert offene Flammen, Funkenflug und aufwendige Brandschutzmaßnahmen (Hot Works Permit). K Aqua PP-R Systeme werden durch Heizelementmuffenschweißung (thermische Fusion ohne offene Flamme) verbunden. Die Installation ist sauber, schnell und extrem sicher. Zudem sind die Kunststoffrohre nur einen Bruchteil so schwer wie Stahl, was die Überkopf-Montage unter hohen Hallendecken extrem erleichtert und beschleunigt.
          </p>
        </div>
      </Reveal>
      
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "100", u: "%", l: "Korrosionsfreiheit garantiert partikelfreie, saubere Druckluft für Werkzeuge" },
              { n: "0", l: "Splitterbildung im Berstfall für maximale Arbeitssicherheit in der Produktionshalle" },
              { n: "50", u: "+", l: "Jahre kalkulierte Nutzungsdauer bei Standard-Industriedrücken" }
            ]}
          />
        </div>
      </Reveal>
    </div>
  ),
};
