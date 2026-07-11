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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.krankenhaus' });
  return constructMetadata({
    title: `${t('hero.title1')} ${t('hero.title2')} | K-Aqua`,
    description: t('hero.desc'),
    path: "/loesungen/krankenhaus",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.krankenhaus' });

  // Data for StickyScrollReveal
  const stickyContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Molekularstruktur-Simulation" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Thermografie-Analyse" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Homogene Schweißnaht Makro-Aufnahme" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Akustische Dämpfungssimulation" />
    }
  ];

  // Data for HorizontalTimeline
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
      
      {/* 1) Hero Section with Parallax */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              {t('hero.title2')}
            </span>
          </>
        }
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage" className="min-w-[200px]">
          {t('hero.cta1')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* 2) Introduction & Problem Statement - Large Typography */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1]"
              dangerouslySetInnerHTML={{ __html: t.raw('intro.title') }}
            />
            <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light">
              {t('intro.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal - Deep Technical Dive */}
      <section className="py-24 md:py-32 bg-card border-y border-card-border relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('stickySection.eyebrow')}
            title={t('stickySection.title')}
            lead={t('stickySection.lead')}
            align="center"
            className="mb-24"
          />
          <StickyScrollReveal content={stickyContent} />
        </div>
      </section>

      {/* 4) Bento Grid - Value Propositions */}
      <section className="py-32 md:py-48 bg-background relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bentoSection.eyebrow')}
            title={t('bentoSection.title')}
            lead={t('bentoSection.lead')}
            align="left"
            className="mb-20"
          />
          
          <BentoGrid className="mx-auto">
            <BentoGridItem
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              header={<PremiumAssetPlaceholder label="Materialvergleich" className="min-h-[300px] rounded-xl" />}
              colSpan={2}
            />
            <BentoGridItem
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              header={<div className="h-full w-full bg-card-border/20 rounded-xl flex items-center justify-center font-mono text-muted-foreground text-2xl">{t('bento.items.1.badge')}</div>}
              colSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              header={<div className="h-full w-full bg-card-border/20 rounded-xl flex items-center justify-center font-mono text-muted-foreground text-2xl">{t('bento.items.2.badge')}</div>}
              colSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              header={<PremiumAssetPlaceholder label="Zertifikate & Normen" className="min-h-[300px] rounded-xl" />}
              colSpan={2}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Horizontal Timeline - The Engineering Process */}
      <div className="relative z-30 bg-background">
        <HorizontalTimeline
          title={t('timelineSection.title')}
          description={t('timelineSection.desc')}
          items={timelineItems}
        />
      </div>

      {/* 6) Technical Specifications Data Table (Text-based, large) */}
      <section className="py-32 md:py-48 bg-card border-y border-card-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05)_0%,transparent_80%)] pointer-events-none" />
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <SectionHead
            eyebrow={t('specs.eyebrow')}
            title={t('specs.title')}
            lead={t('specs.lead')}
            align="center"
            className="mb-24"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-12">
              <div>
                <h4 className="text-2xl font-heading font-bold mb-6 border-b border-card-border pb-4">{t('specs.therm.title')}</h4>
                <ul className="space-y-6 text-muted-foreground text-lg">
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.therm.items.0.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.therm.items.0.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.therm.items.1.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.therm.items.1.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.therm.items.2.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.therm.items.2.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.therm.items.3.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.therm.items.3.value')}</span></li>
                </ul>
              </div>
              <div>
                <h4 className="text-2xl font-heading font-bold mb-6 border-b border-card-border pb-4">{t('specs.mech.title')}</h4>
                <ul className="space-y-6 text-muted-foreground text-lg">
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.mech.items.0.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.mech.items.0.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.mech.items.1.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.mech.items.1.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.mech.items.2.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.mech.items.2.value')}</span></li>
                  <li className="flex justify-between items-center"><span className="font-medium">{t('specs.mech.items.3.label')}</span> <span className="font-mono text-foreground bg-background px-3 py-1 rounded-md border border-card-border">{t('specs.mech.items.3.value')}</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-background border border-card-border rounded-3xl p-10 flex flex-col justify-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <h3 className="text-4xl font-heading font-bold mb-8 relative z-10">{t('bim.title')}</h3>
               <p className="text-muted-foreground text-lg mb-12 relative z-10 leading-relaxed">
                 {t('bim.desc')}
               </p>
               <Button variant="secondary" size="lg" href="/ressourcen/downloads" className="w-full justify-between group relative z-10 h-16 text-lg">
                 <span>{t('bim.cta')}</span>
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Final CTA */}
      <section className="py-32 md:py-48 bg-background relative">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand className="py-24 px-10 md:px-24 rounded-[3rem] bg-card border border-card-border shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
              <span className="font-heading font-bold text-primary tracking-widest uppercase mb-6 text-sm">{t('cta.eyebrow')}</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-8">
                {t('cta.title')}
              </h2>
              <p className="text-2xl text-muted-foreground leading-relaxed mb-12 font-light">
                {t('cta.desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                <Button variant="primary" size="lg" href="/projektanfrage" className="h-16 px-10 text-xl rounded-2xl shadow-[0_0_40px_rgba(var(--primary),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary),0.5)] transition-shadow">
                  {t('cta.button')}
                </Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
