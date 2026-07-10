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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.fittings.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/fittings",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.fittings' });

  const stickyContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Molekulare Struktur 3D Scan" />,
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Thermoplastik CFD Simulation" />,
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Echtzeit Qualitätskontrolle UI" />,
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Strömungsdynamik Visualisierung" />,
    }
  ];

  const timelineItems = [
    { year: t('timeline.items.0.year'), title: t('timeline.items.0.title'), text: t('timeline.items.0.text') },
    { year: t('timeline.items.1.year'), title: t('timeline.items.1.title'), text: t('timeline.items.1.text') },
    { year: t('timeline.items.2.year'), title: t('timeline.items.2.title'), text: t('timeline.items.2.text') },
    { year: t('timeline.items.3.year'), title: t('timeline.items.3.title'), text: t('timeline.items.3.text') },
    { year: t('timeline.items.4.year'), title: t('timeline.items.4.title'), text: t('timeline.items.4.text') },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Parallax Hero */}
      <ParallaxHero 
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')}<br />
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </>
        }
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('hero.ctaPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('hero.ctaSecondary')}
        </Button>
      </ParallaxHero>

      {/* Intro Text / Deep Dive */}
      <section className="py-32 bg-background border-b border-card-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <SectionHead
            eyebrow={t('intro.eyebrow')}
            title={t('intro.title')}
            lead={t('intro.lead')}
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            <div className="text-xl text-muted-foreground leading-relaxed font-light">
              {t('intro.text1')}
            </div>
            <div className="text-xl text-muted-foreground leading-relaxed font-light">
              {t('intro.text2')}
            </div>
          </div>
        </div>
      </section>

      {/* 2) Sticky Scroll Reveal */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 mb-20">
           <SectionHead
            eyebrow={t('sticky.eyebrow')}
            title={t('sticky.title')}
            lead={t('sticky.lead')}
            align="center"
          />
        </div>
        <StickyScrollReveal content={stickyContent} />
      </section>

      {/* 3) Bento Grid for Features */}
      <section className="py-32 bg-background border-b border-card-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03)_0%,transparent_80%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="left"
          />
          
          <BentoGrid className="mt-20">
            <BentoGridItem 
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              header={<PremiumAssetPlaceholder label="ISO Zertifikat Visual" className="min-h-[200px]" />}
              colSpan={2}
            />
            <BentoGridItem 
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              header={<PremiumAssetPlaceholder label="Druckprüfung Graph" className="min-h-[200px]" />}
              colSpan={1}
            />
            <BentoGridItem 
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              header={<PremiumAssetPlaceholder label="Molekülstruktur" className="min-h-[200px]" />}
              colSpan={1}
            />
            <BentoGridItem 
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              header={<PremiumAssetPlaceholder label="Schallwellen Analyse" className="min-h-[200px]" />}
              colSpan={2}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 4) Horizontal Timeline */}
      <HorizontalTimeline 
        items={timelineItems} 
        title={t('timeline.title')} 
        description={t('timeline.desc')}
      />

      {/* Text Section for Depth */}
      <section className="py-32 bg-card border-b border-card-border relative overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
              {t('depth.title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed font-light mb-12">
              {t('depth.text')}
            </p>
            <div className="inline-flex items-center justify-center gap-3 bg-background border border-card-border px-8 py-4 rounded-full shadow-lg">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-heading font-bold text-sm tracking-widest uppercase">{t('depth.badge')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5) CTA Band */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
              <Button variant="outline" size="lg" className="border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-foreground/10" href="/produkte">
                {t('cta.secondary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
