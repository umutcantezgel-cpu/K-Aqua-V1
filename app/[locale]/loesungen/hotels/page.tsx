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
  const t = await getTranslations({ locale, namespace: 'solutions.hotels' });
  return constructMetadata({
    title: `${t('intro.title1')} ${t('intro.title2')} | K-Aqua`,
    description: t('hero.desc'),
    path: "/loesungen/hotels",
    locale,
  });
}

export default async function HotelsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'solutions.hotels' });

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      
      {/* 1) HERO: ParallaxHero */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <span className="block">
            {t('hero.title1')} <br />
            <span className="text-muted-foreground">{t('hero.title2')}</span>
          </span>
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

      {/* 2) APPLE-STYLE SCROLL TYPOGRAPHY */}
      <section className="py-32 lg:py-48 px-6 bg-background relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight leading-[1.1] text-foreground">
            {t('intro.title1')} <br className="hidden md:block" />{t('intro.title2')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/50">
              {t('intro.titleGrad')}
            </span>
          </h2>
          <p className="mt-12 text-xl md:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-medium">
            {t('intro.desc')}
          </p>
        </div>
      </section>

      {/* 3) BENTO GRID: Anatomy of Perfection */}
      <section className="py-24 bg-card border-y border-card-border relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bentoSection.eyebrow')}
            title={t('bentoSection.title')}
            lead={t('bentoSection.lead')}
            align="center"
          />
          <div className="mt-20">
            <BentoGrid>
              <BentoGridItem
                colSpan={2}
                title={t('bento.items.0.title')}
                description={t('bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label="Schallabsorptions-Modell 3D" />}
              />
              <BentoGridItem
                colSpan={1}
                title={t('bento.items.1.title')}
                description={t('bento.items.1.desc')}
                header={<PremiumAssetPlaceholder label="Thermografie Scan" />}
              />
              <BentoGridItem
                colSpan={1}
                title={t('bento.items.2.title')}
                description={t('bento.items.2.desc')}
                header={<PremiumAssetPlaceholder label="Molekulargitter" />}
              />
              <BentoGridItem
                colSpan={2}
                title={t('bento.items.3.title')}
                description={t('bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label="Strömungsdynamik Simulation" />}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 4) MASSIVE TECHNICAL TEXT BLOCK */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="mx-auto max-w-[1000px] px-6">
          <div className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
            <h2 className="text-4xl lg:text-5xl mb-12">{t('textSection.title')}</h2>
            <p className="text-2xl font-medium text-foreground mb-8">
              {t('textSection.p1')}
            </p>
            <p>
              {t('textSection.p2')}
            </p>
            <p>
              <strong>{t('textSection.p3')}</strong>
            </p>
            <p>
              {t('textSection.p4')}
            </p>
            <h3 className="text-3xl mt-16 mb-6">{t('textSection.h3')}</h3>
            <p>
              {t('textSection.p5')}
            </p>
            <p>
              {t('textSection.p6')}
            </p>
          </div>
        </div>
      </section>

      {/* 5) STICKY SCROLL REVEAL: Deep Dive Pillars */}
      <section className="py-24 bg-card border-y border-card-border overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('stickySection.eyebrow')}
            title={t('stickySection.title')}
            lead={t('stickySection.lead')}
            align="center"
            className="mb-20"
          />
          <StickyScrollReveal 
            content={[
              {
                title: t('sticky.items.0.title'),
                description: (
                  <div className="space-y-4">
                    <p>{t('sticky.items.0.p1')}</p>
                    <p>{t('sticky.items.0.p2')}</p>
                  </div>
                ),
                content: <PremiumAssetPlaceholder label="Biofilm Resistenz Analyse" />
              },
              {
                title: t('sticky.items.1.title'),
                description: (
                  <div className="space-y-4">
                    <p>{t('sticky.items.1.p1')}</p>
                    <p>{t('sticky.items.1.p2')}</p>
                  </div>
                ),
                content: <PremiumAssetPlaceholder label="Akustik-Messlabor" />
              },
              {
                title: t('sticky.items.2.title'),
                description: (
                  <div className="space-y-4">
                    <p>{t('sticky.items.2.p1')}</p>
                    <p>{t('sticky.items.2.p2')}</p>
                  </div>
                ),
                content: <PremiumAssetPlaceholder label="Druckprüfung 50 Bar" />
              },
              {
                title: t('sticky.items.3.title'),
                description: (
                  <div className="space-y-4">
                    <p>{t('sticky.items.3.p1')}</p>
                    <p>{t('sticky.items.3.p2')}</p>
                  </div>
                ),
                content: <PremiumAssetPlaceholder label="Thermal Mapping" />
              }
            ]}
          />
        </div>
      </section>

      {/* 6) DATA & PERFORMANCE SECTION (Apple Style Numbers) */}
      <section className="py-32 bg-background relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-card-border to-transparent -translate-y-1/2" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-2xl border border-card-border shadow-diffuse">
            <span className="text-6xl lg:text-7xl font-heading font-black text-primary">{t('perf.items.0.val')}<span className="text-3xl text-muted-foreground ms-1">{t('perf.items.0.unit')}</span></span>
            <span className="text-lg font-medium text-foreground tracking-tight">{t('perf.items.0.title')}</span>
            <p className="text-sm text-muted-foreground">{t('perf.items.0.desc')}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-2xl border border-card-border shadow-diffuse">
            <span className="text-6xl lg:text-7xl font-heading font-black text-primary">{t('perf.items.1.val')}<span className="text-3xl text-muted-foreground ms-1">{t('perf.items.1.unit')}</span></span>
            <span className="text-lg font-medium text-foreground tracking-tight">{t('perf.items.1.title')}</span>
            <p className="text-sm text-muted-foreground">{t('perf.items.1.desc')}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-2xl border border-card-border shadow-diffuse">
            <span className="text-6xl lg:text-7xl font-heading font-black text-primary">{t('perf.items.2.val')}<span className="text-3xl text-muted-foreground ms-1">{t('perf.items.2.unit')}</span></span>
            <span className="text-lg font-medium text-foreground tracking-tight">{t('perf.items.2.title')}</span>
            <p className="text-sm text-muted-foreground">{t('perf.items.2.desc')}</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-2xl border border-card-border shadow-diffuse">
            <span className="text-6xl lg:text-7xl font-heading font-black text-primary">{t('perf.items.3.val')}<span className="text-3xl text-muted-foreground ms-1">{t('perf.items.3.unit')}</span></span>
            <span className="text-lg font-medium text-foreground tracking-tight">{t('perf.items.3.title')}</span>
            <p className="text-sm text-muted-foreground">{t('perf.items.3.desc')}</p>
          </div>
        </div>
      </section>

      {/* 7) HORIZONTAL TIMELINE: A Legacy of Megaprojects */}
      <HorizontalTimeline 
        title={t('timelineSection.title')}
        description={t('timelineSection.desc')}
        items={[
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
        ]}
      />

      {/* 8) ARCHITECTURAL DEEP DIVE: The Material Science */}
      <section className="py-32 bg-background border-t border-card-border relative">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_right,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="font-heading font-bold tracking-widest text-sm text-primary uppercase">{t('research.eyebrow')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('research.title') }} />
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('research.desc')}
              </p>
              <ul className="flex flex-col gap-4 mt-8">
                {[
                  t('research.items.0'),
                  t('research.items.1'),
                  t('research.items.2'),
                  t('research.items.3')
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-card border border-card-border hover:border-primary/50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <PremiumAssetPlaceholder label="Molekulare Struktur Analyse" className="h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 9) GLOBAL STANDARDS & CERTIFICATIONS */}
      <section className="py-24 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6 text-center">
          <SectionHead
            eyebrow={t('certs.eyebrow')}
            title={t('certs.title')}
            lead={t('certs.lead')}
            align="center"
          />
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
            {/* We mock some trust badges */}
            {['SKZ Würzburg', 'DVGW', 'AENOR', 'WRAS', 'KIWA', 'TÜV SÜD'].map((cert) => (
              <div key={cert} className="px-8 py-4 rounded-2xl bg-background border border-card-border font-heading font-bold text-xl tracking-widest uppercase flex items-center justify-center min-w-[200px] shadow-sm">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10) FINAL CTA BAND */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand className="py-20 px-10 md:px-20 text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight max-w-4xl mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mb-10">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button variant="inverse" size="lg" href="/projektanfrage" className="text-lg px-8 h-16">
                {t('cta.button1')}
              </Button>
              <Button variant="secondary" size="lg" href="/kontakt" className="text-lg px-8 h-16 bg-transparent text-inverse-foreground border-inverse-foreground/30 hover:bg-inverse-foreground/10">
                {t('cta.button2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
