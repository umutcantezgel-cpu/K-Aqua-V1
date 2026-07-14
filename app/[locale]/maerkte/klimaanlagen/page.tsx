import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Thermometer, Shield, Globe, Ruler, Droplet, Factory, Wrench, Layers, Award } from '@/components/ui/icon';
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
  const t = await getTranslations({ locale, namespace: 'markets.klimaanlagen' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/maerkte/klimaanlagen",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'markets.klimaanlagen' });

  const scrollContent = [
    {
      title: t('scroll1Title'),
      description: t('scroll1Desc'),
      content: <PremiumAssetPlaceholder label="Thermal Imaging Data" />
    },
    {
      title: t('scroll2Title'),
      description: t('scroll2Desc'),
      content: <PremiumAssetPlaceholder label="Corrosion Resistance Demo" />
    },
    {
      title: t('scroll3Title'),
      description: t('scroll3Desc'),
      content: <PremiumAssetPlaceholder label="Polyfusion Process Visualization" />
    },
    {
      title: t('scroll4Title'),
      description: t('scroll4Desc'),
      content: <PremiumAssetPlaceholder label="Acoustic Insulation Analytics" />
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
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/20">
      
      {/* 1) Hero Section using ParallaxHero */}
      <ParallaxHero
        eyebrow={t('heroEyebrow')}
        title={
          <>
            {t('heroTitle')}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-soft">
              {t('heroSubtitle')}
            </span>
          </>
        }
        description={t('heroDesc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage" className="px-8 font-bold tracking-wide">
          {t('heroBtnPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads" className="px-8">
          {t('heroBtnSecondary')} <ArrowRight className="ms-2 w-4 h-4" />
        </Button>
      </ParallaxHero>

      {/* 2) Introduction Copy */}
      <section className="py-32 bg-background kq-band kq-band--slant-b relative z-10 border-b border-card-border">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <SectionHead
            eyebrow={t('section1Eyebrow')}
            title={t('section1Title')}
            lead={t('section1Lead')}
            align="center"
          />
          <div className="mt-16 text-start text-lg text-muted-foreground leading-loose space-y-6">
            <p>
              {t('section1P1')}
            </p>
            <p dangerouslySetInnerHTML={{ __html: t.raw('section1P2') }} />
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal */}
      <section className="py-32 bg-background relative z-10 border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-20">
            <SectionHead
              eyebrow={t('section2Eyebrow')}
              title={t('section2Title')}
              lead={t('section2Lead')}
              align="left"
            />
          </div>
          <StickyScrollReveal content={scrollContent} />
        </div>
      </section>

      {/* 4) Bento Grid */}
      <section className="py-32 bg-card relative z-10 border-b border-card-border overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-heading font-extrabold tracking-tight mb-6">{t('bentoHeader')}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('bentoSubheader')}
            </p>
          </div>
          
          <BentoGrid>
            <BentoGridItem
              title={t('bento1Title')}
              description={t('bento1Desc')}
              icon={<Thermometer className="w-8 h-8 text-primary mb-4" />}
              colSpan={2}
              header={<div className="w-full h-full bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center border-b border-card-border/50"><PremiumAssetPlaceholder label="Thermal Gradient" className="border-none rounded-none min-h-[200px]" /></div>}
            />
            <BentoGridItem
              title={t('bento2Title')}
              description={t('bento2Desc')}
              icon={<Ruler className="w-8 h-8 text-primary mb-4" />}
              header={<div className="w-full h-full bg-background/50 flex items-center justify-center p-8"><Layers className="w-24 h-24 text-muted-foreground/20" /></div>}
            />
            <BentoGridItem
              title={t('bento3Title')}
              description={t('bento3Desc')}
              icon={<Shield className="w-8 h-8 text-primary mb-4" />}
            />
            <BentoGridItem
              title={t('bento4Title')}
              description={t('bento4Desc')}
              icon={<Droplet className="w-8 h-8 text-primary mb-4" />}
              colSpan={2}
              header={<div className="w-full h-full bg-background/50 flex items-center justify-center"><PremiumAssetPlaceholder label="Weld Integrity Data" className="border-none rounded-none min-h-[200px]" /></div>}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Horizontal Timeline */}
      <HorizontalTimeline 
        title={t('timelineEyebrow')}
        description={t('timelineLead')}
        items={timelineItems}
        className="z-20 relative"
      />

      {/* 6) Technical Specifications Deep Dive */}
      <section className="py-32 bg-background relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              <PremiumAssetPlaceholder label="Chiller Plant Installation" className="min-h-[600px]" />
            </div>
            <div className="flex flex-col gap-8 order-1 lg:order-2">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">
                {t('section3Eyebrow')}
              </span>
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
                {t('section3Title')}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-6">
                <p>
                  {t('section3P1')}
                </p>
                <p>
                  {t('section3P2')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Factory className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card1Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card1Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Wrench className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card2Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card2Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Globe className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card3Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card3Desc')}</p>
                </Card>
                <Card className="p-6 bg-card border border-card-border hover:border-primary/50 transition-colors">
                  <Award className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-heading font-bold text-xl mb-2">{t('card4Title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('card4Desc')}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Final CTA Band */}
      <section className="py-32 bg-background relative z-10 border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-6">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Button variant="inverse" size="lg" href="/projektanfrage" className="px-8 py-6 text-lg font-bold">
                {t('ctaBtn1')}
              </Button>
              <Button variant="ghost" size="lg" href="/ressourcen/downloads" className="px-8 py-6 text-lg text-inverse-foreground hover:bg-inverse-foreground/10 border border-inverse-foreground/20">
                {t('ctaBtn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
