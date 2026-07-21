import React from "react";
import { NewsPost } from "./index";
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
    de: "Recycling von PP-R & Nachhaltigkeit",
    en: "Recycling of PP-R & Sustainability",
    ar: "إعادة تدوير PP-R والاستدامة"
  },
  date: "2024-09-20",
  teaser: {
    de: "Kunststoff und Umweltschutz schließen sich nicht aus. Erfahren Sie, wie K Aqua PP-R und PP-RCT Rohrsysteme als sortenreiner Thermoplast zu 100 % recycelbar sind und einen wesentlichen Beitrag zur nachhaltigen Kreislaufwirtschaft im Gebäudebau leisten.",
    en: "Plastics and environmental protection are not mutually exclusive. Discover how K Aqua PP-R and PP-RCT pipe systems, as pure thermoplastics, are 100% recyclable and make a significant contribution to the sustainable circular economy in building construction.",
    ar: "البلاستيك وحماية البيئة لا يتعارضان. اكتشف كيف أن أنظمة أنابيب K Aqua PP-R و PP-RCT، باعتبارها لدائن حرارية نقية، قابلة لإعادة التدوير بنسبة 100٪ وتساهم بشكل كبير في الاقتصاد الدائري المستدام في تشييد المباني."
  },
  excerpt: {
    de: "Kunststoff und Umweltschutz schließen sich nicht aus. Erfahren Sie, wie K Aqua PP-R und PP-RCT Rohrsysteme als sortenreiner Thermoplast zu 100 % recycelbar sind und einen wesentlichen Beitrag zur nachhaltigen Kreislaufwirtschaft im Gebäudebau leisten.",
    en: "Plastics and environmental protection are not mutually exclusive. Discover how K Aqua PP-R and PP-RCT pipe systems, as pure thermoplastics, are 100% recyclable and make a significant contribution to the sustainable circular economy in building construction.",
    ar: "البلاستيك وحماية البيئة لا يتعارضان. اكتشف كيف أن أنظمة أنابيب K Aqua PP-R و PP-RCT، باعتبارها لدائن حرارية نقية، قابلة لإعادة التدوير بنسبة 100٪ وتساهم بشكل كبير في الاقتصاد الدائري المستدام في تشييد المباني."
  },
  coverImage: "/images/news/recycling-ppr.jpg",
  category: "Nachhaltigkeit",
  tags: ["Recycling", "Nachhaltigkeit", "Kreislaufwirtschaft", "PP-R", "Umweltschutz", "Thermoplast", "Rohrsysteme"],
  
  content: () => (
    <div className="flex flex-col gap-24 py-12">

      {/* Intro mit ParallaxHero */}
      <Reveal>
        <ParallaxHero
          imageSrc="/images/news/recycling-ppr.jpg"
          title="Sortenreine Kunststoff-Rohrsysteme für die Kreislaufwirtschaft"
          subtitle="In einer modernen Bauwirtschaft müssen Rohrsysteme nachhaltig und kreislauffähig gestaltet sein. Während herkömmliche Mehrschichtverbundrohre (PEX/Alu) durch unlösbare Verklebungen schwer recycelbar sind, bestehen K Aqua PP-R und PP-RCT Rohre aus einem sortenreinen Thermoplast. Dadurch lassen sie sich am Ende des Lebenszyklus zu 100 % einschmelzen und in neue hochwertige Kunststoffprodukte überführen."
          badge="Ökologie & Recycling"
          align="left"
        />
      </Reveal>

      {/* GlossaryGrid: Das ABC der Nachhaltigkeit */}
      <Reveal>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <GlossaryGrid
            title="Nachhaltigkeits-Glossar"
            items={[
              {
                term: "Thermoplast",
                definition: "Ein Kunststoff, der sich unter Hitzeeinwirkung beliebig oft verformen und neu gießen lässt, ohne seine chemische Grundstruktur zu verlieren (im Gegensatz zu Duroplasten).",
                icon: <Recycle className="w-6 h-6" />
              },
              {
                term: "Sortenreinheit",
                definition: "Ein Produkt besteht nur aus einer einzigen Materialklasse. Dies ist die absolute Grundvoraussetzung für echtes, hochwertiges Recycling anstelle von Downcycling.",
                icon: <ShieldCheck className="w-6 h-6" />
              },
              {
                term: "EPD (Umweltproduktdeklaration)",
                definition: "Ein zertifiziertes Dokument, das die ökologischen Auswirkungen (z. B. CO2-Fußabdruck) eines Bauprodukts über seinen gesamten Lebenszyklus transparent ausweist.",
                icon: <Globe className="w-6 h-6" />
              },
              {
                term: "Cradle-to-Cradle",
                definition: "Ein Designprinzip für die Kreislaufwirtschaft. Produkte werden so entwickelt, dass sie am Ende ihrer Nutzung als biologischer oder technischer Nährstoff dienen.",
                icon: <Leaf className="w-6 h-6" />
              }
            ]}
          />
        </div>
      </Reveal>

      <SectionDivider />

      {/* HorizontalTimeline: Der Lebenszyklus */}
      <Reveal>
        <div className="my-16">
          <SectionHead
            title="Der K Aqua Materialkreislauf"
            lead="Von der Herstellung bis zur Wiederverwertung – ein geschlossenes System."
            align="center"
          />
          <div className="mt-12">
            <HorizontalTimeline
              items={[
                {
                  year: "Phase 1",
                  title: "Produktion",
                  description: "K Aqua Rohre werden aus hochwertigem, reinem PP-R Granulat ohne toxische Weichmacher ressourcenschonend extrudiert."
                },
                {
                  year: "Phase 2",
                  title: "Nutzung (50+ Jahre)",
                  description: "Im Gebäude transportieren die Rohre jahrzehntelang Trinkwasser oder Heizungswasser, ohne zu korrodieren oder Mikroplastik abzugeben."
                },
                {
                  year: "Phase 3",
                  title: "Rückbau & Schreddern",
                  description: "Verschnitt auf der Baustelle oder alte Rohre beim Gebäudeabbruch werden gesammelt, gereinigt und zu feinem Granulat geschreddert."
                },
                {
                  year: "Phase 4",
                  title: "Neues Produkt",
                  description: "Das sortenreine Rezyklat wird eingeschmolzen und zur Herstellung neuer, nicht-trinkwasserführender Kunststoffprodukte wiederverwendet."
                }
              ]}
            />
          </div>
        </div>
      </Reveal>

      {/* StatBand: Ökologische Fakten */}
      <Reveal>
        <div className="mt-8">
          <StatBand
            cols={3}
            stats={[
              { n: "100", u: "%", l: "Recycelbarkeit des homogenen PP-R Materials." },
              { n: "0", l: "Einsatz von gefährlichen Weichmachern oder Halogenen." },
              { n: "50", u: "+", l: "Jahre Lebensdauer reduzieren den ökologischen Fußabdruck drastisch." }
            ]}
          />
        </div>
      </Reveal>

      {/* DeepFAQ: Recycling in der Praxis */}
      <Reveal>
        <DeepFAQ
          items={[
            {
              q: "Was passiert mit den Rohr-Verschnittresten auf der Baustelle?",
              a: "Da K Aqua Rohre sortenrein sind, können saubere Verschnittreste gesammelt und lokalen Kunststoffverwertern zugeführt werden. Sie sind ein wertvoller Rohstoff und kein wertloser Bauschutt."
            },
            {
              q: "Darf PP-R in den normalen Bauschutt?",
              a: "Nein, Kunststoffe sollten grundsätzlich getrennt vom mineralischen Bauschutt (Beton, Ziegel) entsorgt werden, um das fachgerechte Recycling zu ermöglichen und Deponiekosten zu sparen."
            },
            {
              q: "Wie ist die CO2-Bilanz im Vergleich zu Metallrohren?",
              a: "Die Herstellung und Verarbeitung von PP-R erfordert deutlich niedrigere Temperaturen als die Verhüttung von Stahl oder Kupfer. Dies führt zu massiven Einsparungen an Energie und CO2-Emissionen bei der Produktion."
            }
          ]}
        />
      </Reveal>

      {/* CTABand: Nachhaltig Planen */}
      <Reveal>
        <CTABand
          title="Nachhaltigkeit zertifizieren"
          subtitle="Bauen Sie nach DGNB, LEED oder BREEAM? Fordern Sie unsere EPD-Dokumente an, um die Ökobilanz Ihres Gebäudezertifikats zu maximieren."
          buttonText="EPD anfordern"
          buttonLink="/kontakt"
          icon={<Leaf className="w-6 h-6" />}
        />
      </Reveal>

    </div>
  )
};
