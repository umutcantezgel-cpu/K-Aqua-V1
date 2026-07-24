import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { StatBand } from "@/components/ui/StatBand";
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
    de: "Kliniken und Krankenhäuser erfordern höchste Trinkwasserqualität. Erfahren Sie, wie K Aqua PPR Rohrsysteme durch extrem glatte Innenwände Biofilmbildung verhindern und thermische Legionellenspülungen über 70 °C dauerhaft standhalten.",
    en: "Clinics and hospitals require the highest drinking water quality. Learn how K Aqua PPR piping systems prevent biofilm formation thanks to extremely smooth inner walls and permanently withstand thermal legionella flushing above 70 °C.",
    ar: "تتطلب العيادات والمستشفيات أعلى جودة لمياه الشرب. تعرف على كيف تمنع أنظمة الأنابيب K Aqua PPR تكوين الغشاء الحيوي بفضل جدرانها الداخلية شديدة النعومة، وكيف تتحمل التنظيف الحراري لبكتيريا الليجيونيلا بدرجة حرارة تتجاوز 70 درجة مئوية بشكل دائم."
  },
  excerpt: {
    de: "Kliniken und Krankenhäuser erfordern höchste Trinkwasserqualität. Erfahren Sie, wie K Aqua PPR Rohrsysteme durch extrem glatte Innenwände Biofilmbildung verhindern und thermische Legionellenspülungen über 70 °C dauerhaft standhalten.",
    en: "Clinics and hospitals require the highest drinking water quality. Learn how K Aqua PPR piping systems prevent biofilm formation thanks to extremely smooth inner walls and permanently withstand thermal legionella flushing above 70 °C.",
    ar: "تتطلب العيادات والمستشفيات أعلى جودة لمياه الشرب. تعرف على كيف تمنع أنظمة الأنابيب K Aqua PPR تكوين الغشاء الحيوي بفضل جدرانها الداخلية شديدة النعومة، وكيف تتحمل التنظيف الحراري لبكتيريا الليجيونيلا بدرجة حرارة تتجاوز 70 درجة مئوية بشكل دائم."
  },
  coverImage: "/images/news/hospital-water.jpg",
  category: "Sanitärtechnik",
  tags: ["Trinkwasserhygiene", "Krankenhaus", "Legionellen", "Thermische Desinfektion", "PPR", "Biofilm", "Rohrsysteme"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-card p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative z-10">
            <SectionHead
              eyebrow={
                <div className="flex items-center gap-2 text-primary font-bold">
                  <HeartPulse className="w-5 h-5" />
                  <span>Klinische Sanitärtechnik &amp; TGA Planung</span>
                </div>
              }
              title="Höchste Reinheit, wenn es um Leben geht"
              lead="In Krankenhäusern, Pflegeheimen und Rehakliniken ist das Immunsystem der Patienten oft stark geschwächt. Trinkwasser muss hier absolut steril und frei von Krankheitserregern wie Legionella pneumophila oder Pseudomonas aeruginosa sein. K Aqua PPR Kunststoffrohrleitungssysteme bieten durch ihre porenfreie Oberfläche, absolute Korrosionsfreiheit und dauerhafte thermische Belastbarkeit die sicherste Infrastruktur für anspruchsvolle medizinische Einrichtungen."
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-[800px] mx-auto text-muted-foreground leading-relaxed text-lg space-y-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Kritische Infrastruktur: Wasserhygiene im Krankenhaus</h2>
          <p>
            Trinkwasser ist in Deutschland das am strengsten kontrollierte Lebensmittel. Doch die Wasserversorger garantieren die Güte nur bis zum Hausanschluss. Ab der Wasseruhr trägt der Betreiber des Gebäudes die volle Verantwortung für die Erhaltung der Trinkwasserhygiene. In Gesundheitseinrichtungen wie Kliniken, in denen immunsupprimierte Patienten versorgt werden, sind nosokomiale Infektionen, die über das Leitungswasser übertragen werden, eine tödliche Gefahr. 
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Die Gefahr von Legionella und Pseudomonas</h3>
          <p>
            Die berüchtigtsten Erreger sind Legionellen, die schwere Lungenentzündungen hervorrufen, wenn erregerhaltige Aerosole (z.B. beim Duschen) eingeatmet werden. Auch Pseudomonas aeruginosa (Krankenhauskeim) breitet sich gerne in wasserführenden Systemen aus. Bakterien benötigen zum Überleben zwei Dinge: ideale Temperaturen (zwischen 25 °C und 50 °C) und einen Nährboden in Form eines Biofilms. Die Wahl des richtigen Rohrleitungsmaterials ist entscheidend, um die Bildung dieses Biofilms zu unterbinden.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Die Entstehung von Biofilmen verhindern</h2>
          <p>
            Bakterien haften sich bevorzugt an rauen Oberflächen an. In Metallrohren, die durch beginnende Korrosion, Lochfraß oder Kalkablagerungen angeraut sind, finden Mikroorganismen perfekte Nischen. Dort bilden sie eine schützende Schleimschicht (Biofilm), in der sie sich ungehindert vermehren und vor Desinfektionsmaßnahmen abgeschirmt sind.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Die porenfreie Struktur von PP-R</h3>
          <p>
            K Aqua PP-R (Polypropylen Random Copolymer) Rohre besitzen eine mikroskopisch glatte, porenfreie Innenwand mit einer Rauigkeit von nur 0,007 mm. Diese spiegelglatte Oberfläche entzieht den Bakterien buchstäblich die Haftgrundlage. Ein Biofilm kann sich nur extrem schwer ausbilden. Da PP-R zudem 100 % korrosionsfrei ist, entstehen auch nach Jahrzehnten im Betrieb keine rauen Stellen oder Rostnarben, in denen sich Keime verstecken könnten.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Thermische und chemische Desinfektionsverfahren</h2>
          <p>
            Sollte es in einem großen Kliniknetzwerk dennoch zu einer mikrobiellen Kontamination kommen, müssen sofortige Desinfektionsmaßnahmen eingeleitet werden, die das Rohrmaterial extrem beanspruchen.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Thermische Legionellenspülung nach DVGW W 551</h3>
          <p>
            Die wirksamste Methode zur Abtötung von Legionellen ist die thermische Desinfektion. Dabei wird das gesamte Leitungssystem inklusive aller Entnahmestellen für mindestens 3 Minuten mit über 70 °C heißem Wasser durchspült. K Aqua PP-R und PP-RCT Rohrsysteme sind speziell für diese hohen Temperaturbelastungen ausgelegt. Sie verkraften diese thermischen Schocks dauerhaft, ohne zu verspröden, zu reißen oder an Lebenserwartung zu verlieren.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Beständigkeit gegen Stoßchlorung und Chlordioxid</h3>
          <p>
            Manchmal ist eine thermische Desinfektion nicht ausreichend, und es muss auf chemische Mittel wie freies Chlor oder Chlordioxid (Stoßchlorung) zurückgegriffen werden. Diese hochgradig oxidierenden Chemikalien greifen Kupfer- und Stahlrohre massiv an und verursachen Lochfraß. PP-R hingegen besitzt eine hervorragende chemische Widerstandsfähigkeit und bleibt selbst unter der Einwirkung von aggressiven Desinfektionsmitteln strukturell vollkommen intakt. Es werden keine Schadstoffe oder Schwermetalle freigesetzt.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Vermeidung von Stagnation durch clevere Rohrnetzplanung</h2>
          <p>
            Neben dem Material ist die Wasserströmung der wichtigste Faktor. Stehendes Wasser (Stagnation) muss in Krankenhäusern zwingend vermieden werden, da es sich schnell in kritische Temperaturbereiche erwärmt.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-6">Ring- und Reiheninstallationen</h3>
          <p>
            Mit dem umfangreichen Fitting-Sortiment von K Aqua lassen sich moderne Ring- und Reiheninstallationen problemlos umsetzen. Durch spezielle Strömungsteiler und totraumfreie Wandwinkel wird sichergestellt, dass bei jeder Wasserentnahme an einem Waschbecken auch das Wasser in den davorliegenden Leitungsabschnitten automatisch mit ausgetauscht wird. Es gibt keine &quot;toten Äste&quot;, in denen das Wasser verkeimen könnte.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Erfüllung internationaler Hygiene-Zertifikate</h2>
          <p>
            K Aqua PP-R Systeme sind weltweit für den Kontakt mit Trinkwasser zugelassen. Sie erfüllen die strengsten Hygienevorschriften und Normen, darunter die deutsche KTW-BWGL (Empfehlung des Umweltbundesamtes), DVGW W 270 (Vermehrung von Mikroorganismen auf Werkstoffen), das britische WRAS-Zertifikat und viele weitere. Das Material gibt keinerlei Geruchs- oder Geschmacksstoffe, geschweige denn Mikroplastik oder Weichmacher ab. Es ist die reinste Form des Wassertransports für sensible medizinische Einrichtungen.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "0", l: "Abgabe von Blei, Schwermetallen oder toxischen Stoffen" },
              { n: "70", u: "°C+", l: "Sichere Durchführung der thermischen Desinfektion" },
              { n: "100", u: "%", l: "Dauerhaft korrosionsfrei zur Biofilmprävention" }
            ]}
          />
        </div>
      </Reveal>
    </div>
  ),
};
