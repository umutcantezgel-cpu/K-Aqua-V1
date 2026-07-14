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
import { setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products.pipes.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/produkte/pipes",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.pipes' });

  const stickyContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="PP-RCT Microstructure Analysis" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Polyfusion Welding Process" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Corrosion Resistance Test" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Thermal Imaging Data" />
    }
  ];

  const timelineItems = [
    { year: t('timeline.items.0.year'), title: t('timeline.items.0.title'), text: t('timeline.items.0.text') },
    { year: t('timeline.items.1.year'), title: t('timeline.items.1.title'), text: t('timeline.items.1.text') },
    { year: t('timeline.items.2.year'), title: t('timeline.items.2.title'), text: t('timeline.items.2.text') },
    { year: t('timeline.items.3.year'), title: t('timeline.items.3.title'), text: t('timeline.items.3.text') },
    { year: t('timeline.items.4.year'), title: t('timeline.items.4.title'), text: t('timeline.items.4.text') }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      <ParallaxHero 
        eyebrow={t('hero.eyebrow')}
        title={<>{t('hero.title1')} <br/><span className="text-muted-foreground">{t('hero.title2')}</span></>}
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('hero.ctaPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('hero.ctaSecondary')}
        </Button>
      </ParallaxHero>

      {/* Sticky Scroll Reveal for Technical Deep Dives */}
      <section className="py-32 bg-background border-b border-card-border relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow={t('sticky.eyebrow')}
            title={t('sticky.title')}
            lead={t('sticky.lead')}
            align="center"
          />
        </div>
        <div className="mx-auto max-w-[1400px] px-6">
          <StickyScrollReveal content={stickyContent} />
        </div>
      </section>

      {/* Horizontal Timeline for Production / History / Process */}
      <HorizontalTimeline 
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
      />

      {/* Bento Grid for Specifications */}
      <section className="py-32 bg-card border-y border-card-border relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="center"
          />
        </div>
        <BentoGrid>
          <BentoGridItem 
            colSpan={2}
            title={t('bento.items.0.title')}
            description={t('bento.items.0.desc')}
            header={<PremiumAssetPlaceholder label="d500 Pipe Dimension" />}
          />
          <BentoGridItem 
            colSpan={1}
            title={t('bento.items.1.title')}
            description={t('bento.items.1.desc')}
            header={<PremiumAssetPlaceholder label="SDR Cross Section" />}
          />
          <BentoGridItem 
            colSpan={1}
            rowSpan={2}
            title={t('bento.items.2.title')}
            description={t('bento.items.2.desc')}
            header={<PremiumAssetPlaceholder className="h-[400px]" label="Hygiene Certification" />}
          />
          <BentoGridItem 
            colSpan={2}
            title={t('bento.items.3.title')}
            description={t('bento.items.3.desc')}
            header={<PremiumAssetPlaceholder label="UV Protection Layers" />}
          />
        </BentoGrid>
      </section>

      {/* CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[600px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" href="/projektanfrage">
                {t('cta.primary')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
