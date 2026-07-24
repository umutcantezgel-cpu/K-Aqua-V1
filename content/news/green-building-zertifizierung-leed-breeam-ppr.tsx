import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { StepFlow } from "@/components/ui/StepFlow";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Leaf, Award, Droplet, Layers, Shield, ArrowRight, Recycle } from "@/components/ui/icon";

export const greenBuildingZertifizierung: NewsPost = {
  slug: "green-building-zertifizierung-leed-breeam-ppr",
  title: {
    de: "Green Building Zertifizierung: LEED & BREEAM",
    en: "Green Building Certification: LEED & BREEAM",
    ar: "شهادة المباني الخضراء: LEED و BREEAM"
  },
  date: "2024-06-25",
  teaser: {
    de: "Investoren und Bauherren fordern nachhaltige Gebäude. Erfahren Sie, wie moderne PPR Rohrsysteme von K Aqua bei LEED, BREEAM und DGNB entscheidende Credits in den Kategorien Wasser, Energie und Material liefern.",
    en: "Investors and developers are demanding sustainable buildings. Discover how modern PPR piping systems from K Aqua deliver crucial credits in the Water, Energy, and Material categories for LEED, BREEAM, and DGNB.",
    ar: "يطالب المستثمرون والمطورون بمبانٍ مستدامة. اكتشف كيف توفر أنظمة أنابيب PPR الحديثة من K Aqua نقاطاً حاسمة في فئات المياه والطاقة والمواد لشهادات LEED و BREEAM و DGNB."
  },
  excerpt: {
    de: "Investoren und Bauherren fordern nachhaltige Gebäude. Erfahren Sie, wie moderne PPR Rohrsysteme von K Aqua bei LEED, BREEAM und DGNB entscheidende Credits in den Kategorien Wasser, Energie und Material liefern.",
    en: "Investors and developers are demanding sustainable buildings. Discover how modern PPR piping systems from K Aqua deliver crucial credits in the Water, Energy, and Material categories for LEED, BREEAM, and DGNB.",
    ar: "يطالب المستثمرون والمطورون بمبانٍ مستدامة. اكتشف كيف توفر أنظمة أنابيب PPR الحديثة من K Aqua نقاطاً حاسمة في فئات المياه والطاقة والمواد لشهادات LEED و BREEAM و DGNB."
  },
  coverImage: "/images/news/green-building.jpg",
  category: "Nachhaltigkeit",
  tags: ["Green Building", "LEED", "BREEAM", "DGNB", "ESG", "PPR", "Rohrsysteme", "Nachhaltigkeit"],
  
  content: (
    <div className="flex flex-col gap-24 py-12">

      <Reveal>
        <SectionHead
          eyebrow={
            <div className="flex items-center gap-2 text-primary font-bold">
              <Leaf className="w-5 h-5" />
              <span>ESG & Zertifikate</span>
            </div>
          }
          title="Der Weg zum Platinzertifikat beginnt in der TGA"
          lead="Nachhaltige Gebäude sind längst kein Nischenthema mehr, sondern der Standard für zukunftssichere Gewerbe- und Wohnimmobilien. Gebäudezertifizierungen wie LEED, BREEAM und DGNB bewerten Bauwerke ganzheitlich nach strengen ESGkriterien. Eine oft unterschätzte Rolle spielt dabei das technische Rohrleitungssystem. Hochwertige PPR Rohrsysteme von K Aqua können hierbei den ausschlaggebenden Unterschied zwischen einer Silber- und einer Platinzertifizierung ausmachen."
        />
        <div className="mt-8 text-muted-foreground max-w-[800px] mx-auto leading-relaxed text-lg space-y-6">
          <p>
            Immobilienentwickler, Fachplaner und Investoren richten sich zunehmend nach globalen ESG-Kriterien (Environmental, Social, Governance). Ein nachgewiesen grünes Gebäude erzielt höhere Mieteinnahmen, senkt die laufenden Betriebskosten nachhaltig und sichert den langfristigen Werterhalt der Immobilie. Die technische Gebäudeausrüstung (TGA) bietet ein massives Potenzial, um die erforderlichen Zertifizierungspunkte (Credits) im Audit gezielt zu sammeln.
          </p>
          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Warum Rohrleitungssysteme für Green Buildings so wichtig sind</h2>
          <p>
            Oftmals liegt der Fokus der Gebäudezertifizierung auf der Gebäudehülle, der Isolierung und der Nutzung erneuerbarer Energien. Doch die Rohrleitungssysteme – die eigentlichen Adern jedes Gebäudes – tragen in erheblichem Maße zur Gesamtökobilanz bei. Herkömmliche metallische Rohrleitungssysteme verursachen bei der Förderung der Rohstoffe, der energieintensiven Herstellung, dem Transport und der oft aufwendigen Verarbeitung auf der Baustelle hohe CO2-Emissionen. K Aqua PP-R (Polypropylen Random Copolymer) Rohrsysteme bieten hier eine zukunftsweisende Alternative. Sie zeichnen sich durch einen signifikant geringeren Primärenergiebedarf bei der Herstellung aus und sind zu 100 % recycelbar. Diese Eigenschaften spiegeln sich direkt in der Lebenszyklusanalyse (Life Cycle Assessment, LCA) des Gebäudes wider, die für alle führenden Zertifikate von entscheidender Bedeutung ist.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Die wichtigsten Zertifizierungssysteme im Detail"
          lead="Weltweit haben sich verschiedene Qualitäts- und Umweltstandards etabliert, die alle auf nachhaltige Bauweisen setzen, jedoch spezifische Schwerpunkte in der Bewertung aufweisen. Hier erfahren Sie, wie K Aqua PP-R in den einzelnen Systemen punktet."
        />
        <div className="mt-8 text-muted-foreground max-w-[800px] mx-auto leading-relaxed text-lg space-y-6">
          <h3 className="text-xl font-semibold text-foreground">LEED (Leadership in Energy and Environmental Design)</h3>
          <p>
            LEED ist das weltweit am häufigsten verwendete Zertifizierungssystem für umweltfreundliches Bauen. Entwickelt vom U.S. Green Building Council (USGBC), bewertet es Gebäude in verschiedenen Kategorien. K Aqua PP-R Rohrsysteme tragen maßgeblich in folgenden Kategorien bei:
          </p>
          <ul className="list-disc pl-6 mt-4 mb-4">
            <li><strong>Materials and Resources (MR):</strong> Hier werden Punkte für die Verwendung von Materialien mit transparenten Umweltproduktdeklarationen (EPDs) vergeben. Die Bereitstellung von produktspezifischen EPDs durch K Aqua erleichtert Planern den Nachweis der Umweltwirkungen.</li>
            <li><strong>Water Efficiency (WE):</strong> Die absolute Leckagesicherheit durch homogene Schweißverbindungen und die Verhinderung von Rohrbrüchen minimieren Wasserverluste und sichern dauerhaft den effizienten Umgang mit der Ressource Wasser.</li>
            <li><strong>Energy and Atmosphere (EA):</strong> Die geringe Wärmeleitfähigkeit von PP-R (0,24 W/mK) reduziert Wärmeverluste in Warmwassersystemen und trägt somit zur Steigerung der Gesamtenergieeffizienz des Gebäudes bei.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8">BREEAM (Building Research Establishment Environmental Assessment Methodology)</h3>
          <p>
            BREEAM, ursprünglich in Großbritannien entwickelt, ist das älteste System zur Bewertung der Nachhaltigkeit von Gebäuden und in Europa weit verbreitet. Der Fokus liegt stark auf dem gesamten Lebenszyklus und der wissenschaftlichen Bewertung der Umweltauswirkungen. 
            Für BREEAM-Zertifizierungen bietet K Aqua PP-R Vorteile in den Bereichen Gesundheit und Wohlbefinden (Health and Wellbeing), da die Rohre absolut korrosionsbeständig sind und keine toxischen Stoffe an das Trinkwasser abgeben (Erfüllung höchster Hygienestandards). Zudem wird in der Kategorie Materialien die Verwendung langlebiger, robuster und recycelbarer Werkstoffe wie PP-R positiv bewertet.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8">DGNB (Deutsche Gesellschaft für Nachhaltiges Bauen)</h3>
          <p>
            Das DGNB-System zeichnet sich durch seine ganzheitliche Betrachtungsweise aus, die ökologische, ökonomische und soziokulturelle Qualitäten gleichwertig bewertet. Eine zentrale Rolle spielt hier die Ökobilanzierung (LCA) über den gesamten Lebenszyklus des Gebäudes – von der Rohstoffgewinnung über den Betrieb bis zum Rückbau. K Aqua PP-R Rohrsysteme überzeugen hier nicht nur durch ihre exzellente Umweltbilanz in der Herstellungsphase, sondern vor allem durch ihre extrem lange Lebensdauer von 50 Jahren und mehr, die wartungsfreie Betriebsphase und die Vermeidung teurer Sanierungsmaßnahmen aufgrund von Korrosion oder Inkrustation (wirtschaftliche Qualität).
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Technische Eigenschaften von K Aqua PP-R für das Green Building"
          lead="Die chemischen und physikalischen Eigenschaften von Polypropylen Random Copolymer (PP-R) prädestinieren es für den Einsatz in nachhaltigen Bauprojekten."
        />
        <div className="mt-8 text-muted-foreground max-w-[800px] mx-auto leading-relaxed text-lg space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Ökobilanz und EPD (Environmental Product Declaration)</h3>
          <p>
            Eine verifizierte EPD liefert transparente und vergleichbare Daten über die Umweltauswirkungen eines Produkts über seinen gesamten Lebenszyklus. Im Vergleich zu Kupfer- oder Stahlrohren benötigt die Herstellung von PP-R deutlich weniger Energie und verursacht weniger Treibhausgasemissionen. Diese Daten fließen direkt in die Lebenszyklusanalyse des Bauprojekts ein und sind oft die Voraussetzung für das Erreichen hoher Zertifizierungsstufen.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-8">Energieeffizienz durch geringe Wärmeleitfähigkeit</h3>
          <p>
            Metallrohre leiten Wärme sehr gut, was in der Gebäudeinstallation zu unerwünschten Energieverlusten führt und aufwendige Isolierungen erfordert. PP-R hingegen ist ein natürlicher Isolator. Die geringe Wärmeleitfähigkeit sorgt dafür, dass das Medium im Rohr seine Temperatur länger behält. Dies entlastet das Heiz- und Kühlsystem des Gebäudes und senkt den Energiebedarf im laufenden Betrieb erheblich.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-8">Recyclingfähigkeit und Kreislaufwirtschaft</h3>
          <p>
            Der Gedanke der Kreislaufwirtschaft (Circular Economy) ist ein zentraler Pfeiler nachhaltigen Bauens. K Aqua PP-R Rohre und Fittings sind zu 100 % recycelbar. Am Ende der Lebensdauer des Gebäudes können die Rohrsysteme dematerialisiert, eingeschmolzen und für andere Kunststoffprodukte wiederverwendet werden. Es entstehen keine gefährlichen Abfallstoffe, und der Materialkreislauf bleibt geschlossen.
          </p>
          <h3 className="text-xl font-semibold text-foreground mt-8">Trinkwasserhygiene und Gesundheit</h3>
          <p>
            Zertifikate wie WELL und LEED bewerten auch die Innenraumqualität und die Gesundheit der Nutzer. K Aqua PP-R ist absolut korrosionsbeständig und chemisch inert. Es gibt weder Schwermetalle noch Bisphenol A (BPA) oder andere endokrine Disruptoren an das Trinkwasser ab. Die glatte Innenoberfläche verhindert zudem die Anhaftung von Biofilmen und minimiert das Risiko von Legionellenwachstum, was für den sicheren Betrieb von Gebäuden unerlässlich ist.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <SectionHead
          title="Der Ablauf der Zertifizierung mit K Aqua"
          lead="Wir unterstützen Fachplaner und Auditoren aktiv im Zertifizierungsprozess."
        />
        <StepFlow
          steps={[
            {
              t: "Systemauswahl & Planung",
              d: "Auswahl der passenden K Aqua PPR und PPRCT Systeme (z.B. Kfaser für Kühlsysteme) basierend auf den Projektanforderungen und den angestrebten Credits."
            },
            {
              t: "Dokumentenbereitstellung",
              d: "K Aqua liefert alle notwendigen Datenblätter, Umweltproduktdeklarationen (EPDs) und Hygienezertifikate, die für den Auditor erforderlich sind."
            },
            {
              t: "Installation & Nachweis",
              d: "Die einfache und sichere Verarbeitung (homogenes Schweißen) minimiert Ausschuss auf der Baustelle. Die Dichtheitsprüfung dient als Nachweis für das Audit."
            },
            {
              t: "Erfolgreiches Audit",
              d: "Das Gebäude erhält die Auszeichnung (z.B. LEED Platin). Das PPR System trägt durch seine lange Lebensdauer zum Werterhalt der Immobilie bei."
            }
          ]}
        />
      </Reveal>

      <Reveal>
        <CTABand>
          <div className="flex items-center gap-3 text-accent font-bold mb-2">
            <Leaf className="w-6 h-6" />
            <span>Nachhaltigkeitsberatung</span>
          </div>
          <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight">
            Planen Sie ein Green Building?
          </h2>
          <p className="text-lead text-inverse-foreground/80 leading-relaxed">
            Sichern Sie sich wertvolle Zertifizierungspunkte durch die richtige Materialwahl. Unsere Experten beraten Sie gerne zu LCA, EPDs und Systemauslegung.
          </p>
          <div className="mt-4">
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity"
            >
              <span>Nachhaltigkeitsberatung anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </CTABand>
      </Reveal>

    </div>
  )
};
