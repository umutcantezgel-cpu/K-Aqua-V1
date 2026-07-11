import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { SectionHead } from '@/components/ui/SectionHead';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.schulungen.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/schulungen",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.schulungen' });

  const stickyContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="CFD-KAVITATIONS-ANALYSE" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="BIM-TOPOLOGIE MATRIX" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="BIOFILM-INHIBITIONS-SCAN" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="ZERTIFIZIERUNGS-PROTOKOLL" />
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
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* 1) Hero Section */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')} <br />
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </>
        }
        description={t('hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('hero.cta1')}
        </Button>
        <Button variant="ghost" size="lg" href="#curriculum">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* 2) Manifesto / Philosophy */}
      <section className="py-32 bg-background border-b border-card-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
                {t('manifesto.title1')} <br />
                <span dangerouslySetInnerHTML={{ __html: t.raw('manifesto.title2') }} /> <br />
                {t('manifesto.title3')}
              </h2>
            </div>
            <div className="flex flex-col gap-8 text-xl text-muted-foreground leading-relaxed">
              <p>{t('manifesto.p1')}</p>
              <p>{t('manifesto.p2')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Bento Grid: Technical Modules */}
      <section className="py-32 bg-card border-b border-card-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03)_0%,transparent_100%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="center"
          />
          <div className="mt-20">
            <BentoGrid>
              <BentoGridItem
                colSpan={2}
                header={<PremiumAssetPlaceholder label="THERMOBILD-KAMERA FEED" className="h-[240px] rounded-none border-b border-card-border" />}
                title={t('bento.items.0.title')}
                description={t('bento.items.0.desc')}
              />
              <BentoGridItem
                colSpan={1}
                header={<PremiumAssetPlaceholder label="DRUCKPRÜFSTAND" className="h-[240px] rounded-none border-b border-card-border" />}
                title={t('bento.items.1.title')}
                description={t('bento.items.1.desc')}
              />
              <BentoGridItem
                colSpan={1}
                header={<PremiumAssetPlaceholder label="DEHNUNGS-MATRIX" className="h-[240px] rounded-none border-b border-card-border" />}
                title={t('bento.items.2.title')}
                description={t('bento.items.2.desc')}
              />
              <BentoGridItem
                colSpan={2}
                header={<PremiumAssetPlaceholder label="CHEMIE-RESISTENZ" className="h-[240px] rounded-none border-b border-card-border" />}
                title={t('bento.items.3.title')}
                description={t('bento.items.3.desc')}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 4) Massive Typography Break */}
      <section className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-heading font-black tracking-tighter uppercase leading-none mix-blend-overlay opacity-90">
            {t('typography.t1')}
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-[7rem] font-heading font-black tracking-tighter uppercase leading-none mt-2">
            {t('typography.t2')}
          </h2>
        </div>
      </section>

      {/* 5) Sticky Scroll Reveal Section */}
      <section id="curriculum" className="py-32 bg-background border-b border-card-border relative">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('curriculum.eyebrow')}
            title={t('curriculum.title')}
            lead={t('curriculum.lead')}
            align="left"
          />
          <div className="mt-16">
            <StickyScrollReveal content={stickyContent} />
          </div>
        </div>
      </section>

      {/* 6) Horizontal Timeline */}
      <HorizontalTimeline
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
      />

      {/* 7) Deep Tech Spec Section */}
      <section className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <PremiumAssetPlaceholder label="ZERTIFIZIERUNGS-HOLOGRAMM" className="min-h-[600px]" />
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">
                {t('spec.eyebrow')}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-[1.1]">
                {t('spec.title')}
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('spec.desc')}
              </p>
              <ul className="flex flex-col gap-6 mt-4">
                {[
                  { title: t('spec.items.0.title'), text: t('spec.items.0.text') },
                  { title: t('spec.items.1.title'), text: t('spec.items.1.text') },
                  { title: t('spec.items.2.title'), text: t('spec.items.2.text') }
                ].map((li, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-lg">{li.title}</h4>
                      <p className="text-muted-foreground leading-relaxed mt-1">{li.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8) Final CTA Band */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(var(--primary),0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-inverse-foreground tracking-tighter leading-tight uppercase">
              {t('cta.title1')} <br /> {t('cta.title2')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-6">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
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
