import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { getTranslations } from 'next-intl/server';

// Premium Scroll-Telling Components
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.support' });
  
  return constructMetadata({
    title: `${t('title')} | K-Aqua`,
    description: t('metaDesc'),
    path: "/ressourcen/support",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources' });

  const supportProtocols = [
    {
      title: t('support.sticky.items.0.title'),
      description: t('support.sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Predictive Diagnostics Engine" />
    },
    {
      title: t('support.sticky.items.1.title'),
      description: t('support.sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Global Command Center" />
    },
    {
      title: t('support.sticky.items.2.title'),
      description: t('support.sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Architecture Stress Test" />
    },
    {
      title: t('support.sticky.items.3.title'),
      description: t('support.sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Direct Developer Interface" />
    }
  ];

  const timelineItems = [
    { year: t('support.timeline.items.0.year'), title: t('support.timeline.items.0.title'), text: t('support.timeline.items.0.text') },
    { year: t('support.timeline.items.1.year'), title: t('support.timeline.items.1.title'), text: t('support.timeline.items.1.text') },
    { year: t('support.timeline.items.2.year'), title: t('support.timeline.items.2.title'), text: t('support.timeline.items.2.text') },
    { year: t('support.timeline.items.3.year'), title: t('support.timeline.items.3.title'), text: t('support.timeline.items.3.text') },
    { year: t('support.timeline.items.4.year'), title: t('support.timeline.items.4.title'), text: t('support.timeline.items.4.text') }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      
      {/* 1) Epic Parallax Hero */}
      <ParallaxHero
        eyebrow={t('support.hero.eyebrow')}
        title={
          <>
            {t('support.hero.title1')} <br /> <span className="text-muted-foreground">{t('support.hero.title2')}</span>
          </>
        }
        description={t('support.hero.desc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">{t('support.hero.btnPrimary')}</Button>
        <Button variant="ghost" size="lg" href="#protocols">{t('support.hero.btnGhost')}</Button>
      </ParallaxHero>

      {/* 2) Core Philosophy / Intro */}
      <section className="py-32 md:py-48 bg-background border-b border-card-border overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-black tracking-tighter mb-10 leading-[1.05]">
              {t('support.intro.title1')} <br/>
              <span className="text-primary">{t('support.intro.title2')}</span>
            </h2>
            <div className="flex flex-col gap-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              <p>
                {t('support.intro.p1')}
              </p>
              <p>
                {t('support.intro.p2')}
              </p>
              <p className="font-medium text-foreground text-2xl sm:text-3xl mt-4">
                {t('support.intro.p3')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal for Protocols */}
      <section id="protocols" className="py-32 bg-card border-b border-card-border relative z-20">
        <div className="mx-auto max-w-[1400px] px-6 mb-24">
          <SectionHead
            eyebrow={t('support.sticky.eyebrow')}
            title={t('support.sticky.title')}
            lead={t('support.sticky.lead')}
            align="center"
          />
        </div>
        <StickyScrollReveal content={supportProtocols} />
      </section>

      {/* 4) Bento Grid: Engineering Services */}
      <section className="py-32 md:py-48 bg-background kq-band kq-band--slant-t relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('support.bento.eyebrow')}
            title={t('support.bento.title')}
            lead={t('support.bento.lead')}
            align="center"
          />
          <div className="mt-24">
            <BentoGrid>
              <BentoGridItem
                title={t('support.bento.items.0.title')}
                description={t('support.bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label="Migration Matrix" className="min-h-[240px]" />}
                colSpan={2}
              />
              <BentoGridItem
                title={t('support.bento.items.1.title')}
                description={t('support.bento.items.1.desc')}
                header={<PremiumAssetPlaceholder label="Kernel Tuning" className="min-h-[240px]" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('support.bento.items.2.title')}
                description={t('support.bento.items.2.desc')}
                header={<PremiumAssetPlaceholder label="Secure Enclave" className="min-h-[240px]" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('support.bento.items.3.title')}
                description={t('support.bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label="API Gateway" className="min-h-[240px]" />}
                colSpan={2}
              />
              <BentoGridItem
                title={t('support.bento.items.4.title')}
                description={t('support.bento.items.4.desc')}
                header={<PremiumAssetPlaceholder label="Geo-Redundancy" className="min-h-[300px]" />}
                colSpan={3}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 5) Horizontal Timeline: Incident Response */}
      <HorizontalTimeline
        title={t('support.timeline.title')}
        description={t('support.timeline.desc')}
        items={timelineItems}
        className="z-20"
      />

      {/* 6) Deep Technical Metrics / Philosophy */}
      <section className="py-32 md:py-48 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">{t('support.metrics.badge')}</span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-[1.05]">
                {t('support.metrics.title1')} <br/> <span className="text-muted-foreground">{t('support.metrics.title2')}</span>
              </h2>
              <div className="flex flex-col gap-6 text-muted-foreground leading-relaxed text-xl font-light">
                <p>
                  {t('support.metrics.p1')}
                </p>
                <p>
                  {t('support.metrics.p2')}
                </p>
              </div>
              <ul className="flex flex-col gap-6 mt-8">
                {[
                  t('support.metrics.items.0'),
                  t('support.metrics.items.1'),
                  t('support.metrics.items.2'),
                  t('support.metrics.items.3')
                ].map((li, i) => (
                  <li key={i} className="flex items-start gap-4 font-medium text-lg">
                    <span className="text-primary font-bold mt-1 shrink-0"><ArrowRight className="w-6 h-6" /></span> 
                    <span className="text-foreground">{li}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-full min-h-[700px] rounded-[2rem] overflow-hidden border border-card-border relative shadow-2xl">
              <PremiumAssetPlaceholder label="Compliance Architecture Framework" />
            </div>
          </div>
        </div>
      </section>

      {/* 7) Massive CTA */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-card-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <CTABand className="py-20 md:py-32">
            <div className="max-w-4xl flex flex-col items-start gap-8">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-inverse-foreground tracking-tighter leading-[1.05]">
                {t('support.cta.title1')} <br/> {t('support.cta.title2')} <br/> <span className="text-primary-foreground opacity-90">{t('support.cta.title3')}</span>
              </h2>
              <p className="text-2xl text-inverse-foreground/80 leading-relaxed font-light max-w-2xl">
                {t('support.cta.desc')}
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <Button variant="inverse" size="lg" href="/projektanfrage" className="text-xl px-10 py-7 font-bold">{t('support.cta.btnPrimary')}</Button>
                <Button variant="ghost" size="lg" href="/kontakt" className="text-xl px-10 py-7 border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-surface/10 hover:border-inverse-foreground/50">{t('support.cta.btnGhost')}</Button>
              </div>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
