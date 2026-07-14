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
  const t = await getTranslations({ locale, namespace: 'products.transitionFittings.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/transition-fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.transitionFittings' });

  const scrollContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Thermomechanical Injection Visualization" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Torsion Stress Analysis Map" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Thermal Expansion Chamber" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Helium Vacuum Test Chamber" />
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
    },
    {
      year: t('timeline.items.4.year'),
      title: t('timeline.items.4.title'),
      text: t('timeline.items.4.text')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground selection:bg-primary/30">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')}<br/>
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </>
        }
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('hero.ctaPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="#engineering">
          {t('hero.ctaSecondary')}
        </Button>
      </ParallaxHero>

      {/* 2) Intro & Abstract */}
      <section id="engineering" className="py-32 bg-background border-b border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('intro.eyebrow')}
            title={t('intro.title')}
            lead={t('intro.lead')}
            align="center"
          />
          <div className="mt-20">
            <PremiumAssetPlaceholder label="Hybrid Fitting Cross-Section" className="min-h-[600px] md:min-h-[800px]" />
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal for Process / Features */}
      <section className="py-32 bg-background relative z-10 border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow={t('sticky.eyebrow')}
            title={t('sticky.title')}
            lead={t('sticky.lead')}
            align="left"
          />
        </div>
        <StickyScrollReveal content={scrollContent} />
      </section>

      {/* 4) Bento Grid Features */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 mb-20">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="center"
          />
        </div>
        <BentoGrid>
          <BentoGridItem
            title={t('bento.items.0.title')}
            description={t('bento.items.0.desc')}
            colSpan={2}
            header={<PremiumAssetPlaceholder label="DZR Brass Microstructure" />}
            icon={<ArrowRight className="w-6 h-6 text-primary mb-4" />}
          />
          <BentoGridItem
            title={t('bento.items.1.title')}
            description={t('bento.items.1.desc')}
            header={<PremiumAssetPlaceholder label="Torque Stress Test" />}
            icon={<ArrowRight className="w-6 h-6 text-primary mb-4" />}
          />
          <BentoGridItem
            title={t('bento.items.2.title')}
            description={t('bento.items.2.desc')}
            header={<PremiumAssetPlaceholder label="Thread Precision Scan" />}
            icon={<ArrowRight className="w-6 h-6 text-primary mb-4" />}
          />
          <BentoGridItem
            title={t('bento.items.3.title')}
            description={t('bento.items.3.desc')}
            colSpan={2}
            header={<PremiumAssetPlaceholder label="Polymer Crystallization" />}
            icon={<ArrowRight className="w-6 h-6 text-primary mb-4" />}
          />
        </BentoGrid>
      </section>

      {/* 5) Horizontal Timeline */}
      <HorizontalTimeline
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
        className="pt-24"
      />

      {/* 6) Deep Specification Matrix */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('stats.eyebrow')}
            title={t('stats.title')}
            lead={t('stats.lead')}
            align="left"
          />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: t('stats.items.0.label'), value: t('stats.items.0.value'), sub: t('stats.items.0.sub') },
              { label: t('stats.items.1.label'), value: t('stats.items.1.value'), sub: t('stats.items.1.sub') },
              { label: t('stats.items.2.label'), value: t('stats.items.2.value'), sub: t('stats.items.2.sub') },
              { label: t('stats.items.3.label'), value: t('stats.items.3.value'), sub: t('stats.items.3.sub') },
              { label: t('stats.items.4.label'), value: t('stats.items.4.value'), sub: t('stats.items.4.sub') },
              { label: t('stats.items.5.label'), value: t('stats.items.5.value'), sub: t('stats.items.5.sub') },
              { label: t('stats.items.6.label'), value: t('stats.items.6.value'), sub: t('stats.items.6.sub') },
              { label: t('stats.items.7.label'), value: t('stats.items.7.value'), sub: t('stats.items.7.sub') },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 p-8 border border-card-border rounded-2xl bg-background shadow-sm hover:shadow-md transition-shadow">
                <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">{stat.label}</span>
                <span className="text-3xl font-heading font-black text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground/70">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4 mb-8">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
              <Button variant="secondary" size="lg" href="/ressourcen/downloads">
                {t('cta.secondary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}

