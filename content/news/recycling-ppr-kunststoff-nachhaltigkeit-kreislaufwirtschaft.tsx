import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { StatBand } from "@/components/ui/StatBand";
import { DeepFAQ } from "@/components/ui/DeepFAQ";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Recycle, Leaf, Globe, ShieldCheck } from "@/components/ui/icon";

export const recyclingPpr: NewsPost = {
  slug: "recycling-ppr-kunststoff-nachhaltigkeit-kreislaufwirtschaft",
  title: {
    de: "Recycling von PPR & Nachhaltigkeit in der Gebäudeinstallation",
    en: "Recycling of PPR & Sustainability",
    ar: "إعادة تدوير PPR والاستدامة"
  },
  date: "2024-09-20",
  teaser: {
    de: "Kunststoff und Umweltschutz schließen sich nicht aus. Erfahren Sie, wie K Aqua PPR und PPRCT Rohrsysteme als sortenreiner Thermoplast zu 100 % recycelbar sind und einen wesentlichen Beitrag zur nachhaltigen Kreislaufwirtschaft leisten.",
    en: "Plastics and environmental protection are not mutually exclusive. Discover how K Aqua PPR and PPRCT pipe systems, as pure thermoplastics, are 100% recyclable.",
    ar: "البلاستيك وحماية البيئة لا يتعارضان. اكتشف كيف أن أنظمة أنابيب K Aqua PPR و PPRCT، باعتبارها لدائن حرارية نقية، قابلة لإعادة التدوير بنسبة 100٪."
  },
  excerpt: {
    de: "In einer Zeit strenger ökologischer Bauvorgaben rückt die Wiederverwertbarkeit von Baumaterialien in den Fokus. Wir zeigen detailliert, warum PPR-Vollkunststoffrohre im Gegensatz zu Verbundmaterialien echte Kreislaufwirtschaft ermöglichen.",
    en: "Plastics and environmental protection are not mutually exclusive. Discover how K Aqua PPR and PPRCT pipe systems, as pure thermoplastics, are 100% recyclable and make a significant contribution to the sustainable circular economy in building construction.",
    ar: "البلاستيك وحماية البيئة لا يتعارضان. اكتشف كيف أن أنظمة أنابيب K Aqua PPR و PPRCT، باعتبارها لدائن حرارية نقية، قابلة لإعادة التدوير بنسبة 100٪ وتساهم بشكل كبير في الاقتصاد الدائري المستدام في تشييد المباني."
  },
  coverImage: "/images/news/recycling-ppr.jpg",
  category: "Nachhaltigkeit",
  tags: ["Recycling", "Nachhaltigkeit", "Kreislaufwirtschaft", "PPR", "Umweltschutz", "Thermoplast", "Rohrsysteme", "DGNB", "LEED"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <Reveal>
        <ParallaxHero
          imageSrc="/images/news/recycling-ppr.jpg"
          title="Sortenreine Kunststoffrohrsysteme für echte Kreislaufwirtschaft"
          subtitle="In der modernen Bauwirtschaft müssen Rohrsysteme nachhaltig, langlebig und am Ende ihres Lebenszyklus kreislauffähig gestaltet sein. Während herkömmliche Mehrschichtverbundrohre (PEX/Alu) durch unlösbare Verklebungen der Materialschichten schwer bis gar nicht recycelbar sind, bestehen K-Aqua PPR und PPRCT Rohre aus einem sortenreinen Thermoplast. Dadurch lassen sie sich nach Jahrzehnten zu 100 % einschmelzen und in neue hochwertige Kunststoffprodukte überführen."
          badge="Ökologie & Recycling"
          align="left"
        />
      </Reveal>

      {/* Extended Text Section for SEO > 500 words */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-lg dark:prose-invert text-muted-foreground">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Das grüne Paradoxon: Warum der richtige Kunststoff nachhaltig ist</h2>
          <p className="mb-4">
            Der Begriff "Plastik" weckt in der öffentlichen Wahrnehmung oft sofort Assoziationen zu Umweltverschmutzung und Mikroplastik in den Ozeanen. Doch in der professionellen Gebäudeinstallation und industriellen Rohrleitungstechnik sieht die Realität grundlegend anders aus. Wenn es um Nachhaltigkeit im Bauwesen (Green Building) geht, müssen wir den gesamten Lebenszyklus eines Materials betrachten – von der ressourcenschonenden Gewinnung über jahrzehntelange, verlustfreie Nutzung bis hin zur vollständigen Wiederverwertbarkeit. Hier entpuppt sich Polypropylen Random Copolymer (PPR) als regelrechter Umwelt-Champion im direkten Vergleich zu traditionellen metallischen Werkstoffen.
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-6 mb-3">Die CO2-Bilanz in der Herstellung</h3>
          <p className="mb-4">
            Der ökologische Fußabdruck beginnt bereits bei der Produktion. Die Verhüttung von Eisenerz für Stahlrohre oder die Gewinnung und das Schmelzen von Kupfer sind extrem energieintensive Prozesse, die in der Regel auf fossilen Brennstoffen basieren und massive Mengen an CO2 emittieren. Zudem hinterlässt der Abbau von Kupfererz tiefe Narben in der Landschaft und verbraucht gewaltige Mengen an Süßwasser. Im drastischen Gegensatz dazu erfolgt die Extrusion von PPR-Kunststoff bei vergleichsweise moderaten Temperaturen (rund 200 bis 250 °C). Dieser Prozess erfordert nur einen Bruchteil der thermischen Energie. Eine detaillierte Lebenszyklusanalyse (LCA) zeigt regelmäßig, dass Rohrsysteme aus PPR einen signifikant geringeren CO2-Fußabdruck (Global Warming Potential, GWP) aufweisen als ihre metallischen Pendants.
          </p>
          <h3 className="text-2xl font-bold text-foreground mt-6 mb-3">Sortenreinheit vs. Verbundmaterialien</h3>
          <p className="mb-4">
            Das größte Problem beim Recycling von Bauabfällen sind Mischmaterialien. Ein klassisches Mehrschichtverbundrohr (MSVR) besteht aus einer inneren Schicht vernetztem Polyethylen (PEX), einer Mittelschicht aus Aluminium und einer äußeren Schutzschicht, die untrennbar mit Haftvermittlern verklebt sind. Am Ende der Lebensdauer ist es technisch extrem aufwendig und wirtschaftlich unrentabel, diese Schichten wieder voneinander zu trennen. Solche Rohre enden daher oft in der thermischen Verwertung (Müllverbrennung).
          </p>
          <p className="mb-4">
            K-Aqua PPR-Systeme hingegen basieren auf dem Prinzip der absoluten Sortenreinheit. Da sowohl die Rohre (auch die glasfaserverstärkten Varianten) als auch die Fittings aus demselben Basispolymer (Polypropylen) bestehen und durch Polyfusion (Schweißen) ohne zusätzliche Klebstoffe, Dichtungen oder metallische Presshülsen verbunden werden, entsteht ein 100% homogenes Netzwerk. Dieses sortenreine Material lässt sich nach dem Ausbau in Schredderanlagen problemlos mahlen, waschen und wieder aufschmelzen.
          </p>
          <h4 className="text-xl font-semibold text-foreground mt-6 mb-2">Die Bedeutung für Gebäudezertifizierungen (DGNB, LEED, BREEAM)</h4>
          <p>
            Für Architekten und Projektentwickler wird die Nachweisbarkeit ökologischer Baumaterialien immer erfolgskritischer. Zertifizierungssysteme wie DGNB (Deutsche Gesellschaft für Nachhaltiges Bauen) oder LEED vergeben entscheidende Punkte für Produkte, die über eine zertifizierte Umweltproduktdeklaration (EPD) verfügen und Cradle-to-Cradle-Ansätze unterstützen. Der Einsatz vollständig recycelbarer, schadstofffreier PPR-Rohre (ohne bedenkliche Weichmacher oder Halogene) trägt maßgeblich dazu bei, Gebäude in den höchsten Nachhaltigkeitsklassen zu zertifizieren, was den Marktwert der Immobilie signifikant steigert.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-12">
          <GlossaryGrid
            title="Nachhaltigkeitsglossar der Kunststofftechnik"
            items={[
              {
                term: "Thermoplast",
                definition: "Ein Hochleistungskunststoff, der sich unter Hitzeeinwirkung beliebig oft verformen und neu gießen lässt, ohne seine chemische Grundstruktur zu verlieren (im starken Gegensatz zu vernetzten Duroplasten wie PEX).",
                icon: <Recycle className="w-6 h-6" />
              },
              {
                term: "Sortenreinheit",
                definition: "Ein homogenes Produkt besteht nur aus einer einzigen Materialklasse. Dies ist die absolute physikalische Grundvoraussetzung für echtes, hochwertiges Recycling anstelle von minderwertigem Downcycling.",
                icon: <ShieldCheck className="w-6 h-6" />
              },
              {
                term: "EPD (Umweltproduktdeklaration)",
                definition: "Ein streng zertifiziertes Dokument, das die ökologischen Auswirkungen (z. B. CO2-Fußabdruck, Wasserverbrauch) eines Bauprodukts über seinen gesamten Lebenszyklus völlig transparent und nachprüfbar ausweist.",
                icon: <Globe className="w-6 h-6" />
              },
              {
                term: "Cradle to Cradle",
                definition: "Ein fortschrittliches Designprinzip für die Kreislaufwirtschaft. Produkte werden von vornherein so entwickelt, dass sie am Ende ihrer primären Nutzung als biologischer oder technischer Nährstoff für neue Produkte dienen.",
                icon: <Leaf className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      <SectionDivider />

      <Reveal>
        <div className="my-16">
          <SectionHead
            title="Der K-Aqua Materialkreislauf in der Praxis"
            lead="Von der umweltschonenden Herstellung bis zur technischen Wiederverwertung – ein lückenlos geschlossenes System."
            align="center"
          />
          <div className="mt-12">
            <HorizontalTimeline
              items={[
                {
                  year: "Phase 1",
                  title: "Ökologische Produktion",
                  description: "K-Aqua Rohre werden aus hochwertigem, reinem PPR-Granulat ohne toxische Weichmacher oder Schwermetalle bei niedrigen Temperaturen extrem ressourcenschonend extrudiert."
                },
                {
                  year: "Phase 2",
                  title: "Nutzung (50+ Jahre)",
                  description: "Im Gebäude transportieren die Rohre über Jahrzehnte hinweg hochreines Trinkwasser oder aggressives Heizungswasser, ohne zu korrodieren, Inkrustationen zu bilden oder Mikroplastik abzugeben."
                },
                {
                  year: "Phase 3",
                  title: "Rückbau & Schreddern",
                  description: "Sowohl der ungenutzte Verschnitt auf der Baustelle als auch alte Rohre beim Gebäudeabbruch werden gesammelt, in lokalen Zentren gereinigt und zu feinem Granulat mechanisch geschreddert."
                },
                {
                  year: "Phase 4",
                  title: "Neues hochwertiges Produkt",
                  description: "Das 100% sortenreine Rezyklat wird erneut eingeschmolzen und zur Herstellung neuer, nicht-trinkwasserführender Kunststoffprodukte (z.B. Gehäuseteile, Kabelkanäle) erfolgreich wiederverwendet."
                }
              ]}
            />
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "100", u: "%", l: "Garantierte Recycelbarkeit des völlig homogenen PPR-Materials am Lebensende." },
              { n: "0", l: "Toxischer Einsatz von gefährlichen Weichmachern, BPA oder umweltschädlichen Halogenen." },
              { n: "50", u: "+", l: "Jahre garantierte Lebensdauer reduzieren den ökologischen Fußabdruck des Gebäudes drastisch." }
            ]}
          />
        </div>
      </Reveal>

      <Reveal>
        <DeepFAQ
          items={[
            {
              q: "Was passiert mit den zahlreichen Rohrverschnittresten auf der Baustelle?",
              a: "Da K-Aqua Rohre absolut sortenrein sind, können saubere Verschnittreste (Rohrstücke, fehlerhafte Schweißungen) separat gesammelt und lokalen Kunststoffverwertern zugeführt werden. Sie sind ein wertvoller, gefragter Rohstoff auf dem Sekundärmarkt und definitiv kein wertloser Bauschutt, für dessen Entsorgung teuer bezahlt werden muss."
            },
            {
              q: "Darf PPR in den normalen Bauschuttcontainer?",
              a: "Nein, auf keinen Fall. Hochwertige Kunststoffe sollten grundsätzlich getrennt vom mineralischen Bauschutt (Beton, Ziegel, Gips) entsorgt werden. Nur durch eine saubere Trennung an der Quelle wird fachgerechtes stoffliches Recycling ermöglicht und hohe Deponie- oder Verbrennungskosten vermieden."
            },
            {
              q: "Wie verhält sich die CO2-Bilanz im direkten Vergleich zu metallischen Rohren?",
              a: "Hervorragend. Die Herstellung, der Transport (durch das geringe Eigengewicht) und die Verarbeitung von PPR erfordern deutlich niedrigere Temperaturen und weit weniger Energie als die Verhüttung und das schwere Handling von Stahl oder Kupfer. Dies führt zu massiven, messbaren Einsparungen an klimaschädlichen CO2-Emissionen über den gesamten Produktlebenszyklus."
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <CTABand
          title="Nachhaltigkeit im Bauprojekt messbar machen"
          subtitle="Bauen Sie nach den strengen Richtlinien von DGNB, LEED oder BREEAM? Fordern Sie unsere umfangreichen EPD-Dokumente an, um die Ökobilanz Ihres Gebäudezertifikats auf die nächste Stufe zu heben."
          buttonText="Zertifikate & EPD anfordern"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  ),
};
