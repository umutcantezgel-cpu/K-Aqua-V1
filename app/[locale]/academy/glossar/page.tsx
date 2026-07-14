import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'academy.glossar.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/glossar",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.glossar' });
  
  // Data for StickyScrollReveal
  const scrollContent = [
    {
      title: t('scroll.items.0.title'),
      description: t('scroll.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Molekularstruktur-Scan 3D" />
    },
    {
      title: t('scroll.items.1.title'),
      description: t('scroll.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Hydrostatische Simulation" />
    },
    {
      title: t('scroll.items.2.title'),
      description: t('scroll.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Polyfusions-Prozess Visualisierung" />
    },
    {
      title: t('scroll.items.3.title'),
      description: t('scroll.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Strömungsmechanik CFD-Modell" />
    }
  ];

  const timelineItems = [
    {
      year: t('timeline.items.0.year'),
      title: t('timeline.items.0.title'),
      text: t('timeline.items.0.text')
    },
    {
      year: t('timeline.items.1.year'),
      title: t('timeline.items.1.title'),
      text: t('timeline.items.1.text')
    },
    {
      year: t('timeline.items.2.year'),
      title: t('timeline.items.2.title'),
      text: t('timeline.items.2.text')
    },
    {
      year: t('timeline.items.3.year'),
      title: t('timeline.items.3.title'),
      text: t('timeline.items.3.text')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')} <br className="hidden md:block"/>
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </>
        }
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('hero.cta1')}
        </Button>
        <Button variant="ghost" size="lg" href="#deep-dive">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* 2) Manifesto Section */}
      <section id="deep-dive" className="py-32 bg-background border-b border-card-border">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHead
            eyebrow={t('manifesto.eyebrow')}
            title={t('manifesto.title')}
            lead={t('manifesto.lead')}
            align="center"
          />
        </div>
      </section>

      {/* 3) Scroll-Telling (Sticky Scroll Reveal) */}
      <section className="py-32 bg-background kq-band kq-band--slant-b relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-16">
             <SectionHead
              eyebrow={t('scroll.eyebrow')}
              title={t('scroll.title')}
              lead={t('scroll.lead')}
              align="left"
            />
          </div>
          <StickyScrollReveal content={scrollContent} />
        </div>
      </section>

      {/* 4) Bento Grid Technical Specifications */}
      <section className="py-32 bg-card border-y border-card-border relative z-0">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-16">
             <SectionHead
              eyebrow={t('bento.eyebrow')}
              title={t('bento.title')}
              lead={t('bento.lead')}
              align="left"
            />
          </div>
          <BentoGrid>
            <BentoGridItem
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              header={<PremiumAssetPlaceholder label="Molekulargitter PP-R" className="h-full min-h-[200px] rounded-b-none" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              header={<div className="h-full w-full bg-gradient-to-br from-primary/20 to-transparent p-6 flex items-center justify-center"><ArrowRight className="w-12 h-12 text-primary" /></div>}
            />
            <BentoGridItem
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              header={<div className="h-full w-full bg-gradient-to-br from-card-border to-background p-6 flex items-center justify-center font-mono text-4xl font-bold text-muted-foreground/30">{t('bento.items.4.label')}</div>}
            />
            <BentoGridItem
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              header={<div className="h-full w-full bg-gradient-to-bl from-primary/10 to-transparent p-6 flex items-center justify-center"><ArrowRight className="w-12 h-12 text-primary rotate-45" /></div>}
            />
            <BentoGridItem
              title={t('bento.items.4.title')}
              description={t('bento.items.4.desc')}
              header={<PremiumAssetPlaceholder label="SDR Querschnitt" className="h-full min-h-[200px] rounded-b-none" />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Horizontal Timeline (Standards) */}
      <HorizontalTimeline 
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
      />

      {/* 6) Deep Technical Text / Final Argument */}
      <section className="py-32 bg-background border-t border-card-border">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl lg:text-5xl font-heading font-extrabold tracking-tight mb-12">
            {t('conclusion.title')}
          </h2>
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <p className="mb-6 text-xl" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p1') }} />
            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p2') }} />
            <p className="mb-6" dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p3') }} />
            <p dangerouslySetInnerHTML={{ __html: t.raw('conclusion.p4') }} />
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-24 bg-card border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title1')} <br />{t('cta.title2')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.button')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
