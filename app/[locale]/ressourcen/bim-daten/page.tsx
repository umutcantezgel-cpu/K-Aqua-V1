/* eslint-disable react/jsx-no-literals */
import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { Card } from '@/components/ui/Card';
import { getTranslations } from 'next-intl/server';


// Premium Components
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.bim' });
  
  return constructMetadata({
    title: `${t('title')} | K-Aqua`,
    description: t('metaDesc'),
    path: "/ressourcen/bim-daten",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  // Content for Sticky Scroll Reveal
  const stickyScrollContent = [
    {
      title: t('bim.sticky.items.0.title'),
      description: t('bim.sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="LOI 500 Data Model" />
    },
    {
      title: t('bim.sticky.items.1.title'),
      description: t('bim.sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Clash Detection Matrix" />
    },
    {
      title: t('bim.sticky.items.2.title'),
      description: t('bim.sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Parametric Auto-Routing" />
    },
    {
      title: t('bim.sticky.items.3.title'),
      description: t('bim.sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="COBie Digital Twin" />
    }
  ];

  // Content for Horizontal Timeline
  const timelineItems = [
    {
      year: t('bim.timeline.items.0.year'),
      title: t('bim.timeline.items.0.title'),
      text: t('bim.timeline.items.0.text')
    },
    {
      year: t('bim.timeline.items.1.year'),
      title: t('bim.timeline.items.1.title'),
      text: t('bim.timeline.items.1.text')
    },
    {
      year: t('bim.timeline.items.2.year'),
      title: t('bim.timeline.items.2.title'),
      text: t('bim.timeline.items.2.text')
    },
    {
      year: t('bim.timeline.items.3.year'),
      title: t('bim.timeline.items.3.title'),
      text: t('bim.timeline.items.3.text')
    },
    {
      year: t('bim.timeline.items.4.year'),
      title: t('bim.timeline.items.4.title'),
      text: t('bim.timeline.items.4.text')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section with Parallax */}
      <ParallaxHero
        eyebrow="K-Aqua Digital Engineering"
        title={
          <>
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-primary">
              {t('common.eyebrow')}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.08]">
              {t('bim.title')}. <br/><span className="text-muted-foreground">{t('common.subtitle')}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              {t('common.lead')}
            </p>
            <div className="flex gap-4 mt-4">
              <Button variant="primary" size="lg" href="/projektanfrage">
                {t('common.btnProject')}
              </Button>
              <Button variant="ghost" size="lg" href="/ressourcen/downloads">
                {t('common.btnData')}
              </Button>
            </div>
          </>
        }
        description={t('bim.hero.desc')}
      >
        <Button variant="primary" size="lg" href="/ressourcen/downloads">{t('bim.hero.btnPrimary')}</Button>
        <Button variant="ghost" size="lg" href="/projektanfrage">{t('bim.hero.btnGhost')}</Button>
      </ParallaxHero>

      {/* 2) Text Intro / Deep Engineering Philosophy */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1000px] px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
            {t('bim.intro.title1')} <br className="hidden md:block"/> {t('bim.intro.title2')}
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {t('bim.intro.p1')}
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t('bim.intro.p2')}
          </p>
        </div>
      </section>

      {/* 3) Bento Grid for Features */}
      <section className="py-24 bg-card border-y border-card-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-soft)_0%,transparent_70%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <SectionHead
            eyebrow={t('common.valEyebrow')}
            title={t('common.valTitle')}
            lead={t('common.valLead')}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="flex flex-col gap-4">
                <h3 className="font-heading font-bold text-xl">{t('common.valCardTitle', { item })}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t('common.valCardDesc')}
                </p>
              </Card>
            ))}
          </div>
          
          <div className="mt-16">
            <BentoGrid>
              <BentoGridItem
                title={t('bim.bento.items.0.title')}
                description={t('bim.bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label="Revit Family" />}
                colSpan={2}
                rowSpan={1}
              />
              <BentoGridItem
                title={t('bim.bento.items.1.title')}
                description={t('bim.bento.items.1.desc')}
                header={<div className="h-full bg-background flex items-center justify-center border-b border-card-border"><span className="text-primary font-mono text-3xl font-bold">VDI<br/>3805</span></div>}
                colSpan={1}
                rowSpan={1}
              />
              <BentoGridItem
                title={t('bim.bento.items.2.title')}
                description={t('bim.bento.items.2.desc')}
                header={<div className="h-full bg-background flex items-center justify-center border-b border-card-border"><span className="text-primary font-mono text-3xl font-bold">IFC4</span></div>}
                colSpan={1}
                rowSpan={1}
              />
              <BentoGridItem
                title={t('bim.bento.items.3.title')}
                description={t('bim.bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label="Thermal Simulation" />}
                colSpan={2}
                rowSpan={1}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 4) Sticky Scroll Reveal */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bim.sticky.eyebrow')}
            title={t('bim.sticky.title')}
            lead={t('bim.sticky.lead')}
            align="left"
          />
          <div className="mt-16">
            <StickyScrollReveal content={stickyScrollContent} />
          </div>
        </div>
      </section>

      {/* 5) Full Width Deep Technical Banner */}
      <section className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="mx-auto max-w-[1200px] px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold tracking-tight">
                {t('common.authTitle', { module: t('bim.title') })}
              </h2>
              <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
                <p>{t('common.authP1')}</p>
                <p>{t('common.authP2')}</p>
              </div>
              <ul className="flex flex-col gap-3 mt-4">
                {[t('common.list1'), t('common.list2'), t('common.list3')].map((li, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <span className="text-primary">+</span> {li}
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-square bg-background border border-card-border rounded-xl shadow-diffuse relative overflow-hidden flex items-center justify-center">
               <span className="text-muted-foreground/50 font-heading tracking-widest uppercase">{t('common.placeholder')}</span>
            </div> 
        </div>
      </section>

      {/* 6) Horizontal Timeline */}
      <div className="mt-0">
        <HorizontalTimeline 
          title={t('bim.timeline.title')}
          description={t('bim.timeline.desc')}
          items={timelineItems}
        />
      </div>

      {/* 7) CTA Band */}
      <section className="py-24 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('bim.cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('bim.cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/ressourcen/downloads">{t('bim.cta.btnPrimary')}</Button>
              <Button variant="secondary" className="text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10" size="lg" href="/projektanfrage">{t('bim.cta.btnOutline')}</Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
