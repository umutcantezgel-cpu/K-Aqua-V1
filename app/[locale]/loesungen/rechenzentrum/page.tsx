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

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.rechenzentrum" });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen/rechenzentrum",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.rechenzentrum" });

  const scrollContent = [
    {
      title: t('scroll.items.0.title'),
      description: t('scroll.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Thermal Dynamics Simulation" />
    },
    {
      title: t('scroll.items.1.title'),
      description: t('scroll.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Material Resistance Test" />
    },
    {
      title: t('scroll.items.2.title'),
      description: t('scroll.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Fusion Welding Process" />
    },
    {
      title: t('scroll.items.3.title'),
      description: t('scroll.items.3.desc'),
      content: <PremiumAssetPlaceholder label="PUE Optimization Metrics" />
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

  return (
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
      
      {/* Hero Section */}
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
          {t('hero.cta1')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* Storytelling Section */}
      <section className="py-32 lg:py-48 bg-background relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03)_0%,transparent_100%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 mb-16 lg:mb-24 relative z-10">
          <SectionHead 
            eyebrow={t('section1.eyebrow')}
            title={t('section1.title')}
            lead={t('section1.lead')}
            align="center"
          />
        </div>
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <StickyScrollReveal content={scrollContent} />
        </div>
      </section>

      {/* Grid Features */}
      <section className="py-32 lg:py-48 bg-card border-y border-card-border relative">
        <div className="mx-auto max-w-[1400px] px-6 mb-16 lg:mb-24">
          <SectionHead 
            eyebrow={t('section2.eyebrow')}
            title={t('section2.title')}
            lead={t('section2.lead')}
            align="left"
          />
        </div>
        <BentoGrid>
          <BentoGridItem 
            colSpan={2} 
            title={t('bento.items.0.title')}
            description={t('bento.items.0.desc')}
            header={<PremiumAssetPlaceholder label="Chemical Lab Analysis" className="min-h-[300px]" />} 
            icon={<ArrowRight className="w-5 h-5 text-primary" />}
          />
          <BentoGridItem 
            colSpan={1} 
            title={t('bento.items.1.title')}
            description={t('bento.items.1.desc')}
            header={<PremiumAssetPlaceholder label="Pressure Test 200bar" className="min-h-[300px]" />} 
            icon={<ArrowRight className="w-5 h-5 text-primary" />}
          />
          <BentoGridItem 
            colSpan={1} 
            title={t('bento.items.2.title')}
            description={t('bento.items.2.desc')}
            header={<PremiumAssetPlaceholder label="Prefabrication Plant" className="min-h-[300px]" />} 
            icon={<ArrowRight className="w-5 h-5 text-primary" />}
          />
          <BentoGridItem 
            colSpan={2} 
            title={t('bento.items.3.title')}
            description={t('bento.items.3.desc')}
            header={<PremiumAssetPlaceholder label="Seismic Shock Test" className="min-h-[300px]" />} 
            icon={<ArrowRight className="w-5 h-5 text-primary" />}
          />
        </BentoGrid>
      </section>

      {/* Horizontal Timeline */}
      <HorizontalTimeline 
        items={timelineItems} 
        title={t('timeline.title')} 
        description={t('timeline.desc')} 
      />

      {/* Bottom CTA */}
      <section className="py-32 lg:py-40 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--primary-soft)_0%,transparent_100%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
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
