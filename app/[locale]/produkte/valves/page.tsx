import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.valves' });
  return constructMetadata({
    title: t("metaTitle"),
    description: t("metaDesc"),
    path: "/produkte/valves",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('products.valves');

  const scrollRevealContent = [
    {
      title: t("scroll1Title"),
      description: t("scroll1Desc"),
      content: <PremiumAssetPlaceholder label="Mikrostruktur Analyse" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll2Title"),
      description: t("scroll2Desc"),
      content: <PremiumAssetPlaceholder label="5-Achs CNC Fräsung" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll3Title"),
      description: t("scroll3Desc"),
      content: <PremiumAssetPlaceholder label="CFD Strömungsprofil" className="w-full h-full bg-card" />
    },
    {
      title: t("scroll4Title"),
      description: t("scroll4Desc"),
      content: <PremiumAssetPlaceholder label="Automatisierte Druckprüfung" className="w-full h-full bg-card" />
    }
  ];

  const timelineItems = [
    {
      year: t("timeline1Year"),
      title: t("timeline1Title"),
      text: t("timeline1Text")
    },
    {
      year: t("timeline2Year"),
      title: t("timeline2Title"),
      text: t("timeline2Text")
    },
    {
      year: t("timeline3Year"),
      title: t("timeline3Title"),
      text: t("timeline3Text")
    },
    {
      year: t("timeline4Year"),
      title: t("timeline4Title"),
      text: t("timeline4Text")
    },
    {
      year: t("timeline5Year"),
      title: t("timeline5Title"),
      text: t("timeline5Text")
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Massive Parallax Hero */}
      <ParallaxHero
        eyebrow={t("heroEyebrow")}
        title={
          <>
            {t("heroTitle")} <br />
            <span className="text-muted-foreground">{t("heroSubtitle")}</span>
          </>
        }
        description={t("heroDesc")}
      >
        <Button variant="primary" size="lg" href="/projektanfrage" className="h-14 px-8 text-lg">
          {t("heroBtnPrimary")}
        </Button>
        <Button variant="ghost" size="lg" href="#deep-dive" className="h-14 px-8 text-lg">
          {t("heroBtnSecondary")}
        </Button>
      </ParallaxHero>

      {/* 2) Manifesto / Huge Text Section */}
      <section id="deep-dive" className="py-32 lg:py-48 bg-background relative border-b border-card-border overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <div className="max-w-4xl">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tight leading-[1.1] mb-12" dangerouslySetInnerHTML={{__html: t.raw('manifestoTitle')}}>
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-light mb-8">
              {t("manifestoP1")}
            </p>
            <p className="text-2xl text-muted-foreground leading-relaxed font-light" dangerouslySetInnerHTML={{__html: t.raw('manifestoP2')}}>
            </p>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal Storytelling */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t("scrollEyebrow")}
            title={t("scrollTitle")}
            lead={t("scrollLead")}
            align="center"
            className="mb-24"
          />
          <StickyScrollReveal content={scrollRevealContent} />
        </div>
      </section>

      {/* 4) Massive Showcase / Premium Asset */}
      <section className="py-32 lg:py-48 bg-background border-b border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 flex flex-col gap-8 relative z-10">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">
                {t("showcaseEyebrow")}
              </span>
              <h2 className="text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight" dangerouslySetInnerHTML={{__html: t.raw('showcaseTitle')}}>
              </h2>
              <div className="text-xl text-muted-foreground leading-relaxed font-light flex flex-col gap-6">
                <p dangerouslySetInnerHTML={{__html: t.raw('showcaseP1')}}>
                </p>
                <p>
                  {t("showcaseP2")}
                </p>
              </div>
              <ul className="flex flex-col gap-4 mt-4">
                {[
                  t("showcaseList1"), 
                  t("showcaseList2"), 
                  t("showcaseList3")
                ].map((li, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg font-medium text-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full h-[600px]">
              <PremiumAssetPlaceholder label="3D Explosionszeichnung des Ventils" className="w-full h-full rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 5) Bento Grid Features */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t("bentoEyebrow")}
            title={t("bentoTitle")}
            lead={t("bentoLead")}
            align="center"
            className="mb-24"
          />
          <BentoGrid>
            <BentoGridItem 
              colSpan={2}
              title={t("bento1Title")} 
              description={t("bento1Desc")}
              header={<PremiumAssetPlaceholder label="Druck-Stress-Diagramm" className="h-full w-full min-h-[250px] rounded-t-xl" />}
            />
            <BentoGridItem 
              colSpan={1}
              title={t("bento2Title")} 
              description={t("bento2Desc")}
              header={<PremiumAssetPlaceholder label="Wärmebild-Analyse" className="h-full w-full min-h-[250px] rounded-t-xl" />}
            />
            <BentoGridItem 
              colSpan={1}
              title={t("bento3Title")} 
              description={t("bento3Desc")}
              header={<PremiumAssetPlaceholder label="Säure-Belastungstest" className="h-full w-full min-h-[250px] rounded-t-xl" />}
            />
            <BentoGridItem 
              colSpan={2}
              title={t("bento4Title")} 
              description={t("bento4Desc")}
              header={<PremiumAssetPlaceholder label="Ergonomisches CAD-Modell" className="h-full w-full min-h-[250px] rounded-t-xl" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 6) Horizontal Timeline */}
      <HorizontalTimeline 
        title={t("timelineEyebrow")}
        description={t("timelineLead")}
        items={timelineItems}
      />

      {/* 7) Final Text Section before CTA */}
      <section className="py-32 lg:py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,var(--primary-soft)_0%,transparent_50%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1000px] px-6 relative z-10 text-center">
          <h2 className="text-4xl sm:text-6xl font-heading font-black tracking-tight mb-8" dangerouslySetInnerHTML={{__html: t.raw('finalTitle')}}>
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed font-light">
            {t("finalDesc")}
          </p>
        </div>
      </section>

      {/* 8) Final Massive CTA Band */}
      <section className="pb-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand className="py-20 px-10 md:px-20 bg-primary rounded-[3rem] text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="relative z-10 max-w-3xl flex flex-col gap-8">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
                {t("ctaTitle")}
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed font-light">
                {t("ctaDesc")}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="h-14 px-8 text-lg text-primary font-bold">
                  {t("ctaBtnPrimary")}
                </Button>
                <Button variant="ghost" size="lg" href="/ressourcen/downloads" className="h-14 px-8 text-lg border-white text-white hover:bg-white hover:text-primary">
                  {t("ctaBtnSecondary")}
                </Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
