import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.schiffbau' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/schiffbau",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.schiffbau' });

  const stickyScrollContent = [
    {
      title: t('scroll1Title'),
      description: t('scroll1Desc'),
      content: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <PremiumAssetPlaceholder 
            label="Korrosions-Matrix" 
             
            className="rounded-xl shadow-2xl w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: t('scroll2Title'),
      description: t('scroll2Desc'),
      content: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <PremiumAssetPlaceholder 
            label="Gewichts-Analyse" 
             
            className="rounded-xl shadow-2xl w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: t('scroll3Title'),
      description: t('scroll3Desc'),
      content: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <PremiumAssetPlaceholder 
            label="Vibrations-Dämpfung" 
             
            className="rounded-xl shadow-2xl w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: t('scroll4Title'),
      description: t('scroll4Desc'),
      content: (
        <div className="w-full h-full flex items-center justify-center p-4">
          <PremiumAssetPlaceholder 
            label="Polyfusion" 
             
            className="rounded-xl shadow-2xl w-full h-full object-cover"
          />
        </div>
      )
    }
  ];

  const timelineEvents = [
    {
      year: 'Phase 1',
      title: t('timeline1Title'),
      text: t('timeline1Desc')
    },
    {
      year: 'Phase 2',
      title: t('timeline2Title'),
      text: t('timeline2Desc')
    },
    {
      year: 'Phase 3',
      title: t('timeline3Title'),
      text: t('timeline3Desc')
    },
    {
      year: 'Phase 4',
      title: t('timeline4Title'),
      text: t('timeline4Desc')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow={t('heroBadge')}
        title={
          <>
            {t('heroTitle')} <br />
            <span className="text-muted-foreground">{t('heroSubtitle')}</span>
          </>
        }
        description={t('heroDesc')}
      >
        <Button variant="default" size="lg" href="/projektanfrage" className="text-lg px-8 py-6 rounded-full">
          {t('heroBtnPrimary')}
        </Button>
        <Button variant="secondary" size="lg" href="/ressourcen/downloads" className="text-lg px-8 py-6 rounded-full">
          {t('heroBtnSecondary')}
        </Button>
      </ParallaxHero>

      {/* 2) Manifesto / Deep Dive Intro */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <SectionHead
            eyebrow={t('section1Eyebrow')}
            title={t('section1Title')}
            lead={t('section1Lead')}
            align="center"
          />
          <div className="mt-16 text-start">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
              {t('section1P1')}
            </p>
            <br />
            <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground">
              {t('section1P2')}
            </p>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal - Feature Deep Dive */}
      <section className="bg-card">
        <StickyScrollReveal content={stickyScrollContent} />
      </section>

      {/* 4) Bento Grid - Technical Specs */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section2Eyebrow')}
            title={t('section2Title')}
            lead={t('section2Lead')}
            align="left"
          />
          
          <div className="mt-16">
            <BentoGrid className="md:auto-rows-[25rem]">
              <BentoGridItem
                title={t('bento1Title')}
                description={t('bento1Desc')}
                header={
                  <div className="w-full h-full min-h-[10rem] flex items-center justify-center bg-card-border/30 rounded-xl overflow-hidden">
                    <PremiumAssetPlaceholder label="Langzeit-Analyse"  className="w-full h-full object-cover" />
                  </div>
                }
                className="md:col-span-2"
              />
              <BentoGridItem
                title={t('bento2Title')}
                description={t('bento2Desc')}
                header={
                  <div className="w-full h-full min-h-[10rem] flex items-center justify-center bg-card-border/30 rounded-xl overflow-hidden">
                    <PremiumAssetPlaceholder label="Zertifikat-Stack"  className="w-full h-full object-cover" />
                  </div>
                }
                className="md:col-span-1"
              />
              <BentoGridItem
                title={t('bento3Title')}
                description={t('bento3Desc')}
                header={
                  <div className="w-full h-full min-h-[10rem] flex items-center justify-center bg-card-border/30 rounded-xl overflow-hidden">
                    <PremiumAssetPlaceholder label="Strömungsdynamik"  className="w-full h-full object-cover" />
                  </div>
                }
                className="md:col-span-1"
              />
              <BentoGridItem
                title={t('bento4Title')}
                description={t('bento4Desc')}
                header={
                  <div className="w-full h-full min-h-[10rem] flex items-center justify-center bg-card-border/30 rounded-xl overflow-hidden">
                    <PremiumAssetPlaceholder label="Thermo-Mapping"  className="w-full h-full object-cover" />
                  </div>
                }
                className="md:col-span-2"
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 5) Additional Long-Form Engineering Copy */}
      <section className="py-32 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
                {t('section3Title')}
              </h2>
              <div className="flex flex-col gap-6 text-xl text-muted-foreground leading-relaxed font-light">
                <p>
                  {t('section3P1')}
                </p>
                <p>
                  {t('section3P2')}
                </p>
                <p>
                  {t('section3P3')}
                </p>
              </div>
              <ul className="flex flex-col gap-5 mt-6">
                {[
                  t('section3List1'),
                  t('section3List2'),
                  t('section3List3'),
                  t('section3List4')
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-4 font-medium text-lg">
                    <span className="text-primary mt-1"><ArrowRight className="w-5 h-5" /></span> 
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full min-h-[600px] bg-background border border-card-border rounded-2xl shadow-2xl relative overflow-hidden flex items-center justify-center">
               <PremiumAssetPlaceholder label="Fabrikations-Zentrum Deutschland"  className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Horizontal Timeline */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow={t('section4Eyebrow')}
            title={t('section4Title')}
            lead={t('section4Lead')}
            align="center"
          />
        </div>
        <HorizontalTimeline items={timelineEvents} />
      </section>

      {/* 7) Final Text Section - The German Engineering Promise */}
      <section className="py-32 bg-card border-t border-card-border">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight mb-8">
            {t('section5Title')}
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light mb-16">
            {t('section5Desc')}
          </p>
          <div className="flex justify-center">
            <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl">
              <PremiumAssetPlaceholder label="Siegel: German Engineering"  className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 8) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[700px] mt-4 mb-8">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/projektanfrage" className="text-lg px-8 py-6">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
