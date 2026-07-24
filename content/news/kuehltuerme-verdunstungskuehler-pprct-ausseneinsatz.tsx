import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Stagger } from "@/components/ui/Stagger";
import { StatBand } from "@/components/ui/StatBand";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { PipeFX } from "@/components/ui/PipeFX";
import { Sun, CloudRain, Snowflake, Droplet } from "@/components/ui/icon";

export const kuehltuermeAusseneinsatz: NewsPost = {
  slug: "kuehltuerme-verdunstungskuehler-pprct-ausseneinsatz",
  title: {
    de: "Kühltürme & Verdunstungskühler: PPRCT",
    en: "Cooling Towers & Evaporative Coolers: PPRCT",
    ar: "أبراج التبريد والمبردات التبخيرية: PPRCT"
  },
  date: "2024-10-14",
  excerpt: {
    de: "Rohrleitungen auf dem Dach sind extremen Wetterschwankungen und UV Strahlung ausgesetzt. K Aqua PPRCT Rohrsysteme mit UV Schutz bieten Frostsicherheit, absolute Korrosionsbeständigkeit und eine jahrzehntelange Lebensdauer für offene Kühltürme und Freilandkühlanlagen.",
    en: "Rooftop pipelines are exposed to extreme weather fluctuations and UV radiation. K Aqua PPRCT piping systems with UV protection offer frost resistance, absolute corrosion resistance, and a decades-long service life for open cooling towers and outdoor cooling systems.",
    ar: "تتعرض خطوط الأنابيب على الأسطح لتقلبات الطقس القاسية والأشعة فوق البنفسجية. توفر أنظمة أنابيب K Aqua PPRCT المزودة بحماية من الأشعة فوق البنفسجية مقاومة للصقيع، ومقاومة مطلقة للتآكل، وعمرًا تشغيليًا يمتد لعقود لأبراج التبريد المفتوحة وأنظمة التبريد الخارجية."
  },
  coverImage: "/images/news/cooling-tower.jpg",
  category: "Klimatechnik",
  tags: ["Kühlturm", "Außeneinsatz", "UV Beständigkeit", "Frostschutz", "PPRCT", "Klimatechnik"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead & PipeFX (Droplet) */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <Sun className="w-5 h-5" />
                  <span>Dachinstallation & Wetterfestigkeit</span>
                </div>
              }
              title="Rohre für den härtesten Härtetest"
              lead="Verdunstungskühler und Kühltürme werden fast immer im Freien, meist auf Flachdächern, installiert. Hier sind Rohrleitungen der prallen Sonne, saurem Regen und Frost schutzlos ausgeliefert. Während Standardkunststoffe verspröden und Stahlleitungen von außen wie innen durchrosten, bleiben UV geschützte K Aqua PPRCT Rohrsysteme dauerhaft korrosionsfrei und witterungsbeständig."
            />
          </div>
          <div className="flex-1 flex justify-center items-center opacity-90 pointer-events-none">
            {/* Technisches Canvas Element für Verdunstung/Regen */}
            <PipeFX variant="droplet" size={380} />
          </div>
        </div>
      </Reveal>

      {/* Stagger: Die 3 Feinde der Freiverlegung */}
      <Reveal>
        <SectionHead
          title="Schutz vor den Elementen"
          lead="Wie K Aqua die drei größten Herausforderungen der Freiverlegung löst."
          align="center"
        />
        <div className="mt-8">
          <Stagger
            items={[
              {
                title: "1. UV Strahlung (Photooxidation)",
                description: "UV Licht zerstört langfristig die Molekülketten ungeschützter Kunststoffe. K Aqua Rohre für den Außeneinsatz sind entweder in der Masse UV stabilisiert (schwarzer Rußanteil) oder werden mit einem speziellen, hochfesten UV Schutzlack werkseitig versiegelt. Das verhindert jegliche Versprödung."
              },
              {
                title: "2. Frost & Eisbildung",
                description: "Stehendes Wasser, das gefriert, dehnt sich aus und lässt Metallrohre platzen. PPRCT besitzt eine gewisse Elastizität. Selbst wenn Kühlwasser in einer nicht abgelassenen Leitung gefriert, fängt das Rohr die Volumenausdehnung des Eises ab, ohne zu reißen."
              },
              {
                title: "3. Äußere & Innere Korrosion",
                description: "Stahlrohre rosten auf dem Dach durch Regen. Innen führt das sauerstoffreiche Wasser aus offenen Kühltürmen zu massiver Oxidation. K Aqua Kunststoffrohre rosten weder von innen noch von außen. Niemals."
              }
            ]}
          />
        </div>
      </Reveal>

      {/* GlossaryGrid: Chemische Kühlwasserbehandlung */}
      <Reveal>
        <div className="my-16 max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Sicher gegen Kühlwasserchemie"
            items={[
              {
                term: "Biozide (Legionellenschutz)",
                definition: "Offene Kühltürme müssen regelmäßig mit Bioziden (z. B. Chlor oder Ozon) schockbehandelt werden. PPRCT ist hochresistent gegen diese Chemikalien.",
                icon: <Droplet className="w-6 h-6" />
              },
              {
                term: "Salzeindickung",
                definition: "Durch Verdunstung steigt der Salzgehalt im Restwasser massiv an. Bei Metall führt das schnell zu Lochfraß, PPRCT ist völlig immun gegen chloridhaltiges Wasser.",
                icon: <CloudRain className="w-6 h-6" />
              },
              {
                term: "Inhibitoren",
                definition: "Oft werden Inhibitoren zugesetzt, um metallische Einbauteile vor Rost zu schützen. Diese teure Chemie kann im PPRCT Netz drastisch reduziert werden.",
                icon: <Snowflake className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepMatrix: Materialvergleich im Außeneinsatz */}
      <Reveal>
        <SectionHead
          title="Materialvergleich: Roof Top"
          lead="Die Leistung verschiedener Werkstoffe bei extremen Witterungsbedingungen."
        />
        <DeepMatrix
          data={[
            ["Material", "UV Beständigkeit", "Frosttoleranz", "Gewicht (Dachlast)"],
            ["K Aqua PPRCT (UV Schutz)", "Hervorragend", "Sehr hoch (elastisch)", "Sehr gering"],
            ["Stahl verzinkt", "Gut", "Keine (platzt auf)", "Sehr hoch (Statik kritisch)"],
            ["Kupfer", "Gut", "Keine (platzt auf)", "Sehr hoch"],
            ["PVC U (Standard)", "Schlecht (versprödet)", "Schlecht (wird bei Kälte spröde)", "Gering"]
          ]}
        />
      </Reveal>

      {/* StatBand: Roof Top Facts */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Gefahr von Durchrostung durch Regenwasser oder sauerstoffreiches Kühlwasser." },
              { n: "100", u: "%", l: "Frostsicherheit: Das Rohr überlebt das Gefrieren von Wasser im Inneren." },
              { n: "60", u: "+", l: "Jahre zu erwartende Lebensdauer im Freien mit korrektem UV Schutz." }
            ]}
          />
        </div>
      </Reveal>

      {/* Deep Technical Analysis */}
      <section className="py-12 prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Die extremen Herausforderungen der Freiverlegung auf Dächern</h2>
        <p>
          Die Installation von Kühltürmen, Rückkühlwerken und Verdunstungskühlern erfolgt in den meisten gewerblichen und industriellen Projekten auf den Flachdächern der Gebäude. Diese räumliche Anordnung spart wertvollen Raum im Gebäudeinneren, setzt die angeschlossene Rohrleitungsinfrastruktur jedoch den wohl widrigsten Umweltbedingungen aus, die in der Technischen Gebäudeausrüstung (TGA) existieren. Rohre auf einem Dach müssen jahrelanger, intensiver ultravioletter (UV) Sonneneinstrahlung, saurem Regen, Hagelschlag, extremen thermischen Schwankungen zwischen Hochsommer und Eiswinter sowie ständigen Windlasten trotzen. Herkömmliche Materialien scheitern hier oftmals kolossal. C-Stahlrohre rosten von außen und erfordern regelmäßige, teure Korrosionsschutzanstriche. Standard-Kunststoffe verspröden unter der Sonne und zersplittern bei der geringsten mechanischen Belastung. K-Aqua PP-RCT (Polypropylen-Random-Copolymer mit modifizierter Kristallinität und erhöhter Temperaturresistenz), ausgestattet mit spezieller UV-Schutztechnologie, bietet für diese Extrembelastungen die ultimative architektonische und physikalische Lösung.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Der Kampf gegen UV-Degradation (Photooxidation)</h3>
        <p>
          Das größte Risiko für Kunststoffe im Außeneinsatz ist die Photooxidation. Die energiereiche UV-Strahlung der Sonne ist in der Lage, die kovalenten Kohlenstoffbindungen in ungeschützten Polymerketten aufzubrechen. Das Material kreidet aus, verliert seine Elastizität und wird mikroskopisch rissig – ein Prozess, der letztendlich zum Bersten der unter Druck stehenden Leitung führt. 
        </p>
        <p>
          K-Aqua adressiert dieses physikalische Problem auf zwei verschiedenen Wegen, je nach Projektspezifikation. Entweder durch homogene Massefärbung mit hochwirksamem Ruß (Carbon Black), der die UV-Strahlung absorbiert und unschädlich macht, oder durch die Applikation einer industriellen, dauerelastischen UV-Schutz-Coextrusion bzw. Speziallackierung ab Werk. Diese hochtechnologischen Barrieren reflektieren und absorbieren das schädliche Spektrum des Sonnenlichts vollständig. Das darunterliegende, drucktragende PP-RCT Kernrohr bleibt für Jahrzehnte in seinem molekularen Urzustand geschützt, behält seine volle Zeitstandfestigkeit und garantiert die absolute Betriebssicherheit des Kühlsystems.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Frosttoleranz: Die elastische Reserve von PP-RCT</h2>
        <p>
          Im mitteleuropäischen Winter oder in alpinen Lagen sinken die Temperaturen auf Dächern häufig tief in den Minusbereich. Wenn durch einen Stromausfall, einen Pumpendefekt oder einen Fehler in der Gebäudeleittechnik (GLT) das Kühlwasser im Freileitungsnetz stagniert und zu Eis gefriert, entfaltet Wasser eine gewaltige zerstörerische Kraft (Volumenzunahme um ca. 9%). Ein starres Stahl- oder Kupferrohr hat dieser Ausdehnung nichts entgegenzusetzen; es platzt zwangsläufig entlang der Längsnaht oder sprengt die Fittings.
        </p>
        <p>
          K-Aqua PP-RCT zeichnet sich durch eine bemerkenswerte Viskoelastizität aus. Die molekulare Architektur des Random-Copolymers ist zwar extrem druckfest, behält aber ein genau definiertes Maß an Flexibilität. Friert das Wasser im K-Aqua System ein, weitet sich das Rohr minimal, um den enormen Druck des Eises aufzunehmen, ohne dass die molekularen Bindungen reißen. Sobald das Eis wieder auftaut, zieht sich das Rohr in seine Ursprungsform zurück. Dieses „Memory-Verhalten“ (Rückstellvermögen) schützt das Rohrnetz vor katastrophalen Frostschäden und rettet den Anlagenbetreiber vor teuren Betriebsunterbrechungen.
        </p>

        <h3 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">Statische Entlastung durch extremes Leichtgewicht</h3>
        <p>
          Bei der statischen Berechnung von Leichtbau-Flachdächern (wie z. B. Trapezblechdächern bei Logistikhallen) zählt jedes Kilogramm. Gefüllte Kühlwasserleitungen aus Stahlrohren (DN 150 bis DN 300) bringen gigantische Punkt- und Linienlasten auf die Dachkonstruktion. Dies erfordert oft massive, teure Stahlunterkonstruktionen zur Lastabtragung.
        </p>
        <p>
          K-Aqua PP-RCT wiegt im Leerzustand nur einen Bruchteil eines vergleichbaren Stahlrohrs (Dichte von ca. 0,9 g/cm³ gegenüber 7,8 g/cm³ bei Stahl). Das Handling der Rohre auf dem Dach ist selbst bei großen Dimensionen oft ohne schwere Autokräne möglich, was die Montagekosten drastisch reduziert. Die Halterungsabstände können durch die hervorragende Längssteifigkeit der glasfaserverstärkten PP-RCT Varianten optimiert werden. Diese statische Entlastung bietet Architekten und Tragwerksplanern wertvolle Reserven für andere Dachaufbauten wie Photovoltaik-Anlagen.
        </p>

        <h2 className="text-3xl font-heading font-extrabold text-foreground mt-8 mb-4">Unempfindlichkeit gegenüber harschen Wasserbehandlungen (Biozide)</h2>
        <p>
          Offene Verdunstungskühlanlagen sind berüchtigt dafür, ideale Brutstätten für Legionellen zu sein. Um tödliche Ausbrüche der Legionärskrankheit (wie den VDI 2047-2 Richtlinien entsprechend) zu verhindern, wird das Kühlwasser extrem aggressiv mit Bioziden (Ozon, Chlor, Chlordioxid) schockdesinfiziert. Diese hoch oxidativen Substanzen fressen metallische Leitungen buchstäblich von innen auf, insbesondere im Bereich der Phasengrenzen, wenn das System zeitweise leerläuft. K-Aqua PP-RCT ist gegen diese massiven chemischen Angriffe nahezu immun. Die Kunststoffmatrix wird von den in Kühltürmen üblichen Biozidkonzentrationen nicht angegriffen, oxidiert nicht und bildet keine rauen Oberflächen, an denen sich neue Biofilme festsetzen könnten. Mit der Wahl von K-Aqua PP-RCT transformieren Sie die anfälligste Komponente des Kühlsystems – die Rohrleitung auf dem Dach – in die langlebigste und sicherste.
        </p>
      </section>

      {/* CTABand: Technische Planung */}
      <Reveal>
        <CTABand
          title="Planen Sie einen Kühlturm auf dem Flachdach?"
          subtitle="Reduzieren Sie die statische Dachlast und vergessen Sie Korrosionsprobleme. Wir unterstützen Sie bei der Dimensionierung und Befestigungsplanung bei Windlasten."
          buttonText="Planungssupport anfragen"
          buttonLink="/kontakt"
          icon={<Sun className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
