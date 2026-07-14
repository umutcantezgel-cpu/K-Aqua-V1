import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';

// Premium Components
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

// Icons
import { Droplet, Shield, Layers, Thermometer, Globe, Award, Ruler } from '@/components/ui/icon';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'markets.trinkwasser' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/trinkwasser",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('markets.trinkwasser');

  const stickyScrollContent = [
    {
      title: t('scroll1Title'),
      description: t('scroll1Desc'),
      content: <PremiumAssetPlaceholder label="Molekulare PP-R Struktur" />
    },
    {
      title: t('scroll2Title'),
      description: t('scroll2Desc'),
      content: <PremiumAssetPlaceholder label="Polyfusion Fusionsprozess" />
    },
    {
      title: t('scroll3Title'),
      description: t('scroll3Desc'),
      content: <PremiumAssetPlaceholder label="Oberflächenanalyse" />
    },
    {
      title: t('scroll4Title'),
      description: t('scroll4Desc'),
      content: <PremiumAssetPlaceholder label="Hydraulik Simulation" />
    }
  ];

  const timelineItems = [
    {
      year: t('timeline1Year'),
      title: t('timeline1Title'),
      text: t('timeline1Desc')
    },
    {
      year: t('timeline2Year'),
      title: t('timeline2Title'),
      text: t('timeline2Desc')
    },
    {
      year: t('timeline3Year'),
      title: t('timeline3Title'),
      text: t('timeline3Desc')
    },
    {
      year: t('timeline4Year'),
      title: t('timeline4Title'),
      text: t('timeline4Desc')
    },
    {
      year: t('timeline5Year'),
      title: t('timeline5Title'),
      text: t('timeline5Desc')
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

      {/* 2) Intro & Philosophical Grounding */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section1Eyebrow')}
            title={t('section1Title')}
            lead={t('section1Lead')}
            align="center"
          />
          <div className="mt-16 max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed flex flex-col gap-6">
            <p dangerouslySetInnerHTML={{ __html: t.raw('section1P1') }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw('section1P2') }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw('section1P3') }} />
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal - Deep Technical Dive */}
      <section className="py-12 bg-card border-y border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <SectionHead
            eyebrow={t('section2Eyebrow')}
            title={t('section2Title')}
            lead={t('section2Lead')}
            align="left"
            className="mb-12"
          />
          <StickyScrollReveal content={stickyScrollContent} />
        </div>
      </section>

      {/* 4) Bento Grid - The Performance Matrix */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('section3Eyebrow')}
            title={t('section3Title')}
            lead={t('section3Lead')}
            align="center"
            className="mb-16"
          />
          
          <BentoGrid>
            <BentoGridItem
              title={t('bento1Title')}
              description={t('bento1Desc')}
              icon={<Shield className="w-10 h-10 text-primary" strokeWidth={1.5} />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Korrosions-Analyse" />}
            />
            <BentoGridItem
              title={t('bento2Title')}
              description={t('bento2Desc')}
              icon={<Award className="w-10 h-10 text-primary" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title={t('bento3Title')}
              description={t('bento3Desc')}
              icon={<Layers className="w-10 h-10 text-primary" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title={t('bento4Title')}
              description={t('bento4Desc')}
              icon={<Thermometer className="w-10 h-10 text-primary" strokeWidth={1.5} />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label="Thermische Analyse" />}
            />
            <BentoGridItem
              title={t('bento5Title')}
              description={t('bento5Desc')}
              icon={<Ruler className="w-10 h-10 text-primary" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title={t('bento6Title')}
              description={t('bento6Desc')}
              icon={<Droplet className="w-10 h-10 text-primary" strokeWidth={1.5} />}
            />
            <BentoGridItem
              title={t('bento7Title')}
              description={t('bento7Desc')}
              icon={<Globe className="w-10 h-10 text-primary" strokeWidth={1.5} />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Horizontal Timeline - Production to Operation */}
      <HorizontalTimeline 
        title={t('timelineEyebrow')}
        description={t('timelineLead')}
        items={timelineItems}
        className="mt-12"
      />

      {/* 6) Technical Specifications Summary */}
      <section className="py-24 bg-card border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                {t('section4Title')}
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>{t('section4P1')}</p>
                <p>{t('section4P2')}</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat1Value')}<span className="text-2xl text-muted-foreground">{t('stat1Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat1Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat2Value')}<span className="text-2xl text-muted-foreground">{t('stat2Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat2Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat3Value')}<span className="text-2xl text-muted-foreground">{t('stat3Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat3Label')}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-heading font-black text-primary">{t('stat4Value')}<span className="text-2xl text-muted-foreground">{t('stat4Unit')}</span></span>
                  <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{t('stat4Label')}</span>
                </div>
              </div>
            </div>
            <div className="h-[600px] w-full">
               <PremiumAssetPlaceholder label="Systemschnittstelle & Fitting-Geometrie" />
            </div>
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-6">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
