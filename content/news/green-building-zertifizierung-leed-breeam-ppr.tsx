import React from "react";
import { NewsPost } from "./index";
import { SectionHead } from "@/components/ui/SectionHead";
import { GlossaryGrid } from "@/components/ui/GlossaryGrid";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { StepFlow } from "@/components/ui/StepFlow";
import { CTABand } from "@/components/ui/CTABand";
import { Reveal } from "@/components/ui/Reveal";
import { Leaf, Award, Droplet, Layers, Shield, ArrowRight, Recycle } from "@/components/ui/icon";

export const greenBuildingZertifizierung: NewsPost = {
  slug: "green-building-zertifizierung-leed-breeam-ppr",
  title: "Green Building Zertifizierung (LEED & BREEAM): Wie PP-R Rohre wertvolle Punkte sammeln",
  date: "2024-06-25",
  excerpt: "Investoren fordern nachhaltige Gebäude. Erfahren Sie, wie PP-R Rohrsysteme von K Aqua bei LEED, BREEAM und DGNB entscheidende Credits in den Kategorien Wasser, Energie und Material liefern.",
  coverImage: "/images/news/green-building.jpg",
  category: "Nachhaltigkeit",
  tags: ["Green Building", "LEED", "BREEAM", "DGNB", "ESG", "PP-R", "Nachhaltigkeit"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit SectionHead (sehr clean, Whitepaper-Stil) */}
      <Reveal>
        <SectionHead
          eyebrow={
            <div className="flex items-center gap-2 text-primary font-bold">
              <Leaf className="w-5 h-5" />
              <span>ESG & Zertifikate</span>
            </div>
          }
          title="Der Weg zum Platin-Zertifikat beginnt in der TGA"
          lead="Nachhaltige Gebäude sind längst kein Nischenthema mehr, sondern der Standard für zukunftssichere Immobilien. Gebäudezertifizierungen wie LEED, BREEAM und DGNB bewerten Bauwerke ganzheitlich. Eine oft unterschätzte Rolle spielt dabei das Rohrleitungssystem. PP-R Rohre von K Aqua können den Unterschied zwischen Silber und Platin ausmachen."
        />
        <div className="mt-8 text-muted-foreground max-w-[800px] leading-relaxed text-lg">
          <p>
            Immobilienentwickler und Investoren richten sich zunehmend nach ESG-Kriterien (Environmental, Social, Governance). Ein nachgewiesen grünes Gebäude erzielt höhere Mieten, senkt die Betriebskosten und sichert den Wert der Immobilie. Die technische Gebäudeausrüstung (TGA) bietet ein massives Potenzial, um die erforderlichen Zertifizierungspunkte (Credits) zu sammeln.
          </p>
        </div>
      </Reveal>

      {/* GlossaryGrid für die verschiedenen Zertifikate */}
      <Reveal>
        <SectionHead
          title="Die wichtigsten Zertifizierungssysteme im Überblick"
          lead="Weltweit haben sich verschiedene Standards etabliert, die alle auf ähnlichen Prinzipien der Nachhaltigkeit basieren, jedoch unterschiedliche Schwerpunkte setzen."
        />
        <GlossaryGrid 
          items={[
            [
              "LEED (USA)", 
              "Leadership in Energy and Environmental Design. Der weltweit am weitesten verbreitete Standard. Fokussiert stark auf Energieeffizienz, Wassersparen und Materialauswahl. K Aqua punktet hier besonders bei 'Water Efficiency' und 'Materials & Resources'."
            ],
            [
              "BREEAM (UK)", 
              "Building Research Establishment Environmental Assessment Methodology. Das älteste Zertifizierungssystem. Bewertet Kategorien wie Management, Gesundheit, Energie, Transport, Wasser und Materialien. Der Fokus liegt stark auf dem Lebenszyklus."
            ],
            [
              "DGNB (Deutschland)", 
              "Deutsche Gesellschaft für Nachhaltiges Bauen. Betrachtet Ökologie, Ökonomie und Soziokulturelles gleichwertig. Hier ist eine detaillierte Ökobilanz (LCA) über den gesamten Lebenszyklus des Gebäudes entscheidend (TCO)."
            ],
            [
              "WELL (Global)", 
              "Fokus auf die Gesundheit und das Wohlbefinden der Gebäudenutzer. PP-R Rohre von K Aqua unterstützen WELL durch den Erhalt der Trinkwassergüte ohne Abgabe schädlicher Substanzen (BPA-frei, schwermetallfrei)."
            ]
          ]}
        />
      </Reveal>

      {/* BentoGrid: Wo PP-R Rohre Punkte sammeln */}
      <Reveal>
        <SectionHead
          title="Wie K Aqua PP-R Systeme Credits generieren"
          lead="Die Wahl des richtigen Rohrleitungsmaterials hat direkte Auswirkungen auf mehrere Bewertungskategorien der Zertifizierungssysteme."
        />
        <BentoGrid
          items={[
            {
              title: "Materialien & Ressourcen",
              description: "PP-R ist zu 100 % recycelbar. Es enthält keine giftigen Weichmacher, Schwermetalle oder Halogene. Geringer Energieverbrauch bei der Herstellung im Vergleich zu Metallrohren.",
              icon: <Recycle className="w-6 h-6 text-primary" />,
              size: "large"
            },
            {
              title: "Energie & Atmosphäre",
              description: "Geringe Wärmeleitfähigkeit minimiert Energieverluste. Heiz- und Kühlsysteme arbeiten effizienter.",
              icon: <Award className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Wassereffizienz",
              description: "Korrosionsfreiheit und homogene Schweißverbindungen verhindern Leckagen. Dauerhafte Sicherheit für den Wasserkreislauf.",
              icon: <Droplet className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Gesundheit & Komfort",
              description: "Hervorragende akustische Dämpfung für leise Gebäude. Lebensmittelecht und hygienisch einwandfrei für die Trinkwasserversorgung.",
              icon: <Shield className="w-6 h-6 text-primary" />,
              size: "medium"
            },
            {
              title: "Ökobilanz (EPD)",
              description: "Umweltproduktdeklarationen (EPDs) für PP-R Rohre belegen transparent den geringen CO2-Fußabdruck über die gesamte Lebensdauer.",
              icon: <Layers className="w-6 h-6 text-primary" />,
              size: "medium"
            }
          ]}
        />
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
              title: "Systemauswahl & Planung",
              description: "Auswahl der passenden K Aqua PP-R und PP-RCT Systeme (z.B. K-Faser für Kühlsysteme) basierend auf den Projektanforderungen und den angestrebten Credits.",
              icon: "Ruler"
            },
            {
              title: "Dokumentenbereitstellung",
              description: "K Aqua liefert alle notwendigen Datenblätter, Umweltproduktdeklarationen (EPDs) und Hygiene-Zertifikate, die für den Auditor erforderlich sind.",
              icon: "FileText"
            },
            {
              title: "Installation & Nachweis",
              description: "Die einfache und sichere Verarbeitung (homogenes Schweißen) minimiert Ausschuss auf der Baustelle. Die Dichtheitsprüfung dient als Nachweis für das Audit.",
              icon: "Wrench"
            },
            {
              title: "Erfolgreiches Audit",
              description: "Das Gebäude erhält die Auszeichnung (z.B. LEED Platin). Das PP-R System trägt durch seine lange Lebensdauer zum Werterhalt der Immobilie bei.",
              icon: "Award"
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Consulting */}
      <Reveal>
        <CTABand
          title="Planen Sie ein Green Building?"
          subtitle="Sichern Sie sich wertvolle Zertifizierungspunkte durch die richtige Materialwahl. Unsere Experten beraten Sie gerne zu LCA, EPDs und Systemauslegung."
          buttonText="Nachhaltigkeits-Beratung anfragen"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
