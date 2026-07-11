/* eslint-disable react/jsx-no-literals */
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
import { ArrowRight } from '@/components/ui/icon';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.vorfertigung' });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen/vorfertigung",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.vorfertigung' });

  const STICKY_SCROLL_ITEMS = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      asset: <PremiumAssetPlaceholder label="Extreme Environments"  />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      asset: <PremiumAssetPlaceholder label="BIM & Digital Twin"  />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      asset: <PremiumAssetPlaceholder label="Thermal Polyfusion"  />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      asset: <PremiumAssetPlaceholder label="Quality Assurance"  />
    }
  ];

  const TIMELINE_EVENTS = [
    {
      title: t('timeline.events.0.title'),
      description: t('timeline.events.0.desc'),
      date: t('timeline.events.0.date')
    },
    {
      title: t('timeline.events.1.title'),
      description: t('timeline.events.1.desc'),
      date: t('timeline.events.1.date')
    },
    {
      title: t('timeline.events.2.title'),
      description: t('timeline.events.2.desc'),
      date: t('timeline.events.2.date')
    },
    {
      title: t('timeline.events.3.title'),
      description: t('timeline.events.3.desc'),
      date: t('timeline.events.3.date')
    },
    {
      title: t('timeline.events.4.title'),
      description: t('timeline.events.4.desc'),
      date: t('timeline.events.4.date')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      
      {/* 1) Hero Section */}
      <ParallaxHero 
        eyebrow={t('hero.badge')}
        title={
          <>
            {t('hero.title1')}<br />
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </>
        }
        description={t('hero.desc')}
        primaryCta={{ label: t('hero.cta1'), href: "/projektanfrage" }}
        secondaryCta={{ label: t('hero.cta2'), href: "/ressourcen/downloads" }}
        backgroundImage="/images/hero-vorfertigung.jpg"
        fallbackAsset={<PremiumAssetPlaceholder label="Hero Vorfertigung"  />}
      />

      {/* 2) Introduction Copy */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="mx-auto max-w-[1000px] px-6 relative z-10 text-center">
          <SectionHead
            eyebrow={t('intro.eyebrow')}
            title={t('intro.title')}
            lead={t('intro.lead')}
            align="center"
          />
          <div className="mt-16 text-lg sm:text-xl text-muted-foreground leading-relaxed font-light flex flex-col gap-8 text-start">
            <p>
              {t('intro.p1')}
            </p>
            <p>
              {t('intro.p2')}
            </p>
            <p className="font-medium text-foreground text-2xl border-s-4 border-primary ps-6 py-2 mt-8 mb-8">
              {t('intro.quote')}
            </p>
            <p>
              {t('intro.p3')}
            </p>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal Storytelling */}
      <section className="bg-card">
        <StickyScrollReveal items={STICKY_SCROLL_ITEMS} />
      </section>

      {/* 4) Bento Grid Specs */}
      <section className="py-32 bg-background kq-band kq-band--slant-t">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="left"
          />
          
          <div className="mt-20">
            <BentoGrid className="max-w-full">
              <BentoGridItem 
                title={t('bento.items.0.title')}
                description={t('bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label="PPR-C Structure"  />}
                className="md:col-span-2"
              />
              <BentoGridItem 
                title={t('bento.items.1.title')}
                description={t('bento.items.1.desc')}
                header={<PremiumAssetPlaceholder label="Corrosion Resistance"  />}
                className="md:col-span-1"
              />
              <BentoGridItem 
                title={t('bento.items.2.title')}
                description={t('bento.items.2.desc')}
                header={<PremiumAssetPlaceholder label="Acoustic Tests"  />}
                className="md:col-span-1"
              />
              <BentoGridItem 
                title={t('bento.items.3.title')}
                description={t('bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label="Fluid Dynamics"  />}
                className="md:col-span-2"
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 5) Huge Visual Break */}
      <section className="py-24 bg-card border-y border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 w-full relative">
               <PremiumAssetPlaceholder label="Macro Detail: Welded Seam"  />
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
                {t('visual.title1')} <br/>
                <span className="text-primary">{t('visual.title2')}</span>
              </h2>
              <div className="prose prose-invert prose-lg text-muted-foreground font-light">
                <p>
                  {t('visual.p1')}
                </p>
                <p>
                  {t('visual.p2')}
                </p>
                <p>
                  {t('visual.p3')}
                </p>
              </div>
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  <span className="text-lg font-medium">{t('visual.items.0')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  <span className="text-lg font-medium">{t('visual.items.1')}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  <span className="text-lg font-medium">{t('visual.items.2')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6) Timeline Section */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 mb-20 text-center">
          <SectionHead
            eyebrow={t('timeline.eyebrow')}
            title={t('timeline.title')}
            lead={t('timeline.lead')}
            align="center"
          />
        </div>
        <HorizontalTimeline events={TIMELINE_EVENTS} />
      </section>

      {/* 7) Deep Tech Specifications Copy (The "German Engineering" manifesto) */}
      <section className="py-32 bg-card kq-band kq-band--slant-b relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <h2 className="text-sm font-heading tracking-[0.3em] text-primary uppercase font-bold mb-8">{t('manifesto.eyebrow')}</h2>
          <h3 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight mb-12">
            {t('manifesto.title')}
          </h3>
          <div className="text-start text-lg text-muted-foreground leading-relaxed flex flex-col gap-6 font-light">
            <p>
              {t('manifesto.p1')}
            </p>
            <p>
              {t('manifesto.p2')}
            </p>
            <p>
              {t('manifesto.p3')}
            </p>
            <p>
              {t('manifesto.p4')}
            </p>
          </div>
        </div>
      </section>

      {/* 8) Final CTA */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight mb-6">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-inverse-foreground/80 leading-relaxed mb-10 font-light">
                {t('cta.desc')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="group">
                  {t('cta.button1')}
                  <ArrowRight className="ms-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="secondary" size="lg" href="/projektanfrage" className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground">
                  {t('cta.button2')}
                </Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
