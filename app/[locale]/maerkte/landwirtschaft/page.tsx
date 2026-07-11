import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { getTranslations } from 'next-intl/server';

import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.landwirtschaft' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/landwirtschaft",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.landwirtschaft' });

  const stickyScrollContent = [
    {
      title: t('scroll1Title'),
      description: t('scroll1Desc'),
      content: <PremiumAssetPlaceholder label="UV-Resistenz Molekularmodell" />
    },
    {
      title: t('scroll2Title'),
      description: t('scroll2Desc'),
      content: <PremiumAssetPlaceholder label="Drucksimulation 3D-Strömung" />
    },
    {
      title: t('scroll3Title'),
      description: t('scroll3Desc'),
      content: <PremiumAssetPlaceholder label="Chemische Analyse Matrix" />
    },
    {
      title: t('scroll4Title'),
      description: t('scroll4Desc'),
      content: <PremiumAssetPlaceholder label="Mikrobiologie Scan View" />
    }
  ];

  const timelineItems = [
    {
      year: t('timeline1Year'),
      title: t('timeline1Title'),
      text: t('timeline1Text')
    },
    {
      year: t('timeline2Year'),
      title: t('timeline2Title'),
      text: t('timeline2Text')
    },
    {
      year: t('timeline3Year'),
      title: t('timeline3Title'),
      text: t('timeline3Text')
    },
    {
      year: t('timeline4Year'),
      title: t('timeline4Title'),
      text: t('timeline4Text')
    },
    {
      year: t('timeline5Year'),
      title: t('timeline5Title'),
      text: t('timeline5Text')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow={t('heroEyebrow')}
        title={
          <>
            {t('heroTitle')} <br />
            <span className="text-muted-foreground">{t('heroSubtitle')}</span>
          </>
        }
        description={t('heroDesc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('heroBtnPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('heroBtnSecondary')}
        </Button>
      </ParallaxHero>

      {/* 2) Text / Deep Dive */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section1Eyebrow')}
            title={t('section1Title')}
            lead={t('section1Lead')}
            align="center"
          />
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal */}
      <section className="py-24 bg-card border-y border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section2Eyebrow')}
            title={t('section2Title')}
            lead={t('section2Lead')}
            align="left"
          />
          <div className="mt-16">
            <StickyScrollReveal content={stickyScrollContent} />
          </div>
        </div>
      </section>

      {/* 4) Bento Grid Features */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section3Eyebrow')}
            title={t('section3Title')}
            lead={t('section3Lead')}
            align="center"
          />
          <BentoGrid className="mt-16">
            <BentoGridItem
              title={t('bento1Title')}
              description={t('bento1Desc')}
              header={<PremiumAssetPlaceholder label="Schweißnaht-Mikroskopie" className="min-h-[200px]" />}
              colSpan={2}
            />
            <BentoGridItem
              title={t('bento2Title')}
              description={t('bento2Desc')}
              header={<div className="h-full w-full bg-card-border/20 rounded-xl" />}
            />
            <BentoGridItem
              title={t('bento3Title')}
              description={t('bento3Desc')}
              header={<div className="h-full w-full bg-card-border/20 rounded-xl" />}
            />
            <BentoGridItem
              title={t('bento4Title')}
              description={t('bento4Desc')}
              header={<PremiumAssetPlaceholder label="Hydraulik Strömungsmodell" className="min-h-[200px]" />}
              colSpan={2}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Full Width Visual Data */}
      <section className="py-32 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                {t('section4Title')} <br/><span className="text-primary">{t('section4Highlight')}</span>
              </h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t('section4P1')}
                </p>
                <p>
                  {t('section4P2')}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-card-border">
                <div>
                  <div className="text-4xl font-heading font-black text-foreground">{t('section4Stat1Val')}</div>
                  <div className="text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">{t('section4Stat1Lbl')}</div>
                </div>
                <div>
                  <div className="text-4xl font-heading font-black text-foreground">{t('section4Stat2Val')}</div>
                  <div className="text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">{t('section4Stat2Lbl')}</div>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[600px] w-full rounded-3xl overflow-hidden relative shadow-2xl">
              <PremiumAssetPlaceholder label="Megaprojekt Render View" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Horizontal Timeline */}
      <HorizontalTimeline 
        title={t('timelineTitle')}
        description={t('timelineDesc')}
        items={timelineItems}
        className="mt-16"
      />

      {/* 7) Final Deep Technical Details section */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
           <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="lg:w-1/3">
                <h3 className="text-3xl font-heading font-bold mb-4">{t('section5Title')}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {t('section5Desc')}
                </p>
                <ul className="flex flex-col gap-4">
                  {[
                    t('section5List1'), 
                    t('section5List2'), 
                    t('section5List3'),
                    t('section5List4'),
                    t('section5List5')
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-4 text-lg font-medium">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {li}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="lg:w-2/3 w-full min-h-[500px]">
                <PremiumAssetPlaceholder label="Zertifizierungs- & Testlabor" />
             </div>
           </div>
        </div>
      </section>

      {/* 8) CTA Band */}
      <section className="py-24 bg-card border-t border-card-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(var(--primary),0.1)_0%,transparent_50%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn1')}
              </Button>
              <Button variant="secondary" size="lg" href="/projektanfrage" className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground">
                {t('ctaBtn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
