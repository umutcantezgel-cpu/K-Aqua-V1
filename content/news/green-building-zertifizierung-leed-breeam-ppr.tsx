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

      {/* Intro mit SectionHead (sehr clean, Whitepaperstil) */}
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
        <div className="mt-8 text-muted-foreground max-w-[800px] leading-relaxed text-lg">
          <p>
            Immobilienentwickler, Fachplaner und Investoren richten sich zunehmend nach globalen ESGkriterien (Environmental, Social, Governance). Ein nachgewiesen grünes Gebäude erzielt höhere Mieteinnahmen, senkt die laufenden Betriebskosten nachhaltig und sichert den langfristigen Werterhalt der Immobilie. Die technische Gebäudeausrüstung (TGA) bietet ein massives Potenzial, um die erforderlichen Zertifizierungspunkte (Credits) im Audit gezielt zu sammeln.
          </p>
        </div>
      </Reveal>

      {/* GlossaryGrid für die verschiedenen Zertifikate */}
      <Reveal>
        <SectionHead
          title="Die wichtigsten Zertifizierungssysteme im Überblick"
          lead="Weltweit haben sich verschiedene Qualitäts- und Umweltstandards etabliert, die alle auf nachhaltige Bauweisen setzen, jedoch spezifische Schwerpunkte in der Bewertung aufweisen."
        />
        <GlossaryGrid 
          items={[
            [
              "LEED (USA)", 
              "Leadership in Energy and Environmental Design. Der weltweit am weitesten verbreitete Standard. Fokussiert stark auf Energieeffizienz, Wassersparen und nachhaltige Materialauswahl. K Aqua PPR Rohrsysteme punkten hier besonders in den Kategorien 'Water Efficiency' und 'Materials & Resources'."
            ],
            [
              "BREEAM (UK)", 
              "Building Research Establishment Environmental Assessment Methodology. Das traditionsreichste Zertifizierungssystem in Europa. Bewertet Kategorien wie Management, Gesundheit, Energie, Wasser und Materialkreisläufe mit starkem Fokus auf den gesamten Lebenszyklus."
            ],
            [
              "DGNB (Deutschland)", 
              "Deutsche Gesellschaft für Nachhaltiges Bauen. Betrachtet Ökologie, Ökonomie und soziokulturelle Faktoren gleichwertig. Hier ist eine detaillierte Ökobilanzierung (LCA) über den gesamten Lebenszyklus der verbauten Rohrsysteme entscheidend."
            ],
            [
              "WELL (Global)", 
              "Der weltweite Standard mit Fokus auf die Gesundheit, Ergonomie und das Wohlbefinden der Gebäudenutzer. K Aqua PPR Rohre unterstützen WELL optimal durch garantierten Erhalt der Trinkwassergüte ohne Abgabe schädlicher Substanzen (100 % BPA-frei und schwermetallfrei)."
            ]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Wo PPR Rohre Punkte sammeln */}
      <Reveal>
        <SectionHead
          title="Wie K Aqua PPR Systeme Credits generieren"
          lead="Die Wahl des richtigen Rohrleitungsmaterials hat direkte positive Auswirkungen auf mehrere Bewertungskategorien führender Zertifizierungssysteme."
        />
        <BentoGrid>
          <BentoGridItem
            title="Materialien & Ressourcen"
            description="PPR ist zu 100 % recycelbar. Es enthält keine giftigen Weichmacher, Schwermetalle oder Halogene. Der im Vergleich zu Metallrohren deutlich geringere Energieverbrauch bei der Herstellung reduziert den grauen CO2 Fußabdruck nachhaltig."
            icon={<Recycle className="w-6 h-6 text-primary" />}
            colSpan={2}
          />
          <BentoGridItem
            title="Energie & Atmosphäre"
            description="Die geringe Wärmeleitfähigkeit von Polypropylen minimiert Energieverluste in Heiz- und Kältekreisläufen signifikant. Kälte- und Wärmeversorgungsanlagen arbeiten dadurch dauerhaft energieeffizienter."
            icon={<Award className="w-6 h-6 text-primary" />}
          />
          <BentoGridItem
            title="Wassereffizienz"
            description="Komplette Korrosionsfreiheit und dauerhaft homogene Schweißverbindungen verhindern Leckagen sowie Mikrorisse. Dies gewährleistet die langfristige Integrität des Wasserkreislaufs."
            icon={<Droplet className="w-6 h-6 text-primary" />}
          />
          <BentoGridItem
            title="Gesundheit & Komfort"
            description="Hervorragende akustische Dämpfungseigenschaften reduzieren Strömungsgeräusche für ein leises Gebäudeumfeld. Die lebensmittelechte Materialstruktur garantiert höchsten Hygienestandard."
            icon={<Shield className="w-6 h-6 text-primary" />}
          />
          <BentoGridItem
            title="Ökobilanz (EPD)"
            description="Zertifizierte Umweltproduktdeklarationen (EPDs) für K Aqua PPR Rohrsysteme belegen transparent und objektiv den niedrigen CO2 Fußabdruck über die gesamte Lebensdauer."
            icon={<Layers className="w-6 h-6 text-primary" />}
          />
        </BentoGrid>
      </Reveal>

      {/* StepFlow: Der Weg zur Zertifizierung */}
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

      {/* CTABand: Consulting */}
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
