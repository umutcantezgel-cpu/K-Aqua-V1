import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { Shield, Download, Award, Layers, Globe, Check, FileText, Factory, Ruler } from '@/components/ui/icon';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.ausschreibungstexte.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/ressourcen/ausschreibungstexte",
    locale,
  });
}

// deepDiveContent moved inside component

// timelineData moved inside component

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.ausschreibungstexte' });

  const deepDiveContent = [
    { title: t('deep.items.0.title'), description: t('deep.items.0.desc'), content: <PremiumAssetPlaceholder label="Deep Tech 1" /> },
    { title: t('deep.items.1.title'), description: t('deep.items.1.desc'), content: <PremiumAssetPlaceholder label="Deep Tech 2" /> },
    { title: t('deep.items.2.title'), description: t('deep.items.2.desc'), content: <PremiumAssetPlaceholder label="Deep Tech 3" /> },
    { title: t('deep.items.3.title'), description: t('deep.items.3.desc'), content: <PremiumAssetPlaceholder label="Deep Tech 4" /> }
  ];

  const timelineData = [
    { year: t('timeline.items.0.year'), title: t('timeline.items.0.title'), text: t('timeline.items.0.text') },
    { year: t('timeline.items.1.year'), title: t('timeline.items.1.title'), text: t('timeline.items.1.text') },
    { year: t('timeline.items.2.year'), title: t('timeline.items.2.title'), text: t('timeline.items.2.text') },
    { year: t('timeline.items.3.year'), title: t('timeline.items.3.title'), text: t('timeline.items.3.text') }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Apple-Style Parallax Hero */}
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
        <div className="flex flex-wrap gap-4 mt-12 justify-center lg:justify-start">
          <Button variant="primary" size="lg" href="/ressourcen/downloads">
            {t('hero.cta1')}
          </Button>
          <Button variant="ghost" size="lg" href="/projektanfrage">
            {t('hero.cta2')}
          </Button>
        </div>
      </ParallaxHero>

      {/* 2) Manifesto Section: Huge Typography */}
      <section className="py-32 md:py-48 bg-background border-b border-card-border overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] mb-12">
            {t('manifesto.title1')} <br className="hidden md:block"/>
            <span className="text-muted-foreground">{t('manifesto.title2')}</span>
          </h2>
          <div className="max-w-4xl mx-auto text-xl md:text-3xl text-muted-foreground leading-relaxed space-y-12 font-light">
            <p>{t('manifesto.p1')}</p>
            <p dangerouslySetInnerHTML={{ __html: t.raw('manifesto.p2') }} />
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal Deep Dive */}
      <section className="bg-card">
        <StickyScrollReveal content={deepDiveContent} />
      </section>

      {/* 4) Bento Grid Features */}
      <section className="py-32 md:py-48 bg-background kq-band kq-band--slant-b relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--primary-soft)_0%,transparent_70%)] opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="max-w-3xl mb-24">
            <SectionHead
              eyebrow={t('bento.eyebrow')}
              title={t('bento.title')}
              lead={t('bento.lead')}
              align="left"
            />
          </div>
          
          <BentoGrid>
            <BentoGridItem 
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              icon={<Shield className="w-8 h-8 text-primary" />}
              colSpan={2}
              className="bg-card/50 backdrop-blur-sm"
            />
            <BentoGridItem 
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              icon={<Download className="w-8 h-8 text-primary" />}
              className="bg-card/50 backdrop-blur-sm"
            />
            <BentoGridItem 
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              icon={<Award className="w-8 h-8 text-primary" />}
              className="bg-card/50 backdrop-blur-sm"
            />
            <BentoGridItem 
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              icon={<Layers className="w-8 h-8 text-primary" />}
              colSpan={2}
              className="bg-card/50 backdrop-blur-sm"
            />
            <BentoGridItem 
              title={t('bento.items.4.title')}
              description={t('bento.items.4.desc')}
              icon={<Globe className="w-8 h-8 text-primary" />}
              colSpan={3}
              className="bg-card/50 backdrop-blur-sm"
              header={<div className="h-64 w-full bg-primary/5 rounded-t-2xl flex items-center justify-center p-6"><PremiumAssetPlaceholder label="BIM 5D Integration Model" className="w-full h-full rounded-xl" /></div>}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 5) Horizontal Timeline */}
      <section className="py-32 md:py-48 bg-card border-y border-card-border overflow-hidden">
         <div className="mx-auto max-w-[1400px] px-6">
           <HorizontalTimeline 
             title={t('timeline.title')}
             description={t('timeline.desc')}
             items={timelineData}
           />
         </div>
      </section>

      {/* 6) Deep Technical Specs Grid */}
      <section className="py-32 md:py-48 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10 text-center">
           <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight mb-8">
            {t('grid.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-20 max-w-3xl mx-auto">
            {t('grid.desc')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-start">
            {[
              { t: t('grid.items.0.title'), d: t('grid.items.0.desc'), i: <Ruler className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.1.title'), d: t('grid.items.1.desc'), i: <Factory className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.2.title'), d: t('grid.items.2.desc'), i: <Shield className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.3.title'), d: t('grid.items.3.desc'), i: <Check className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.4.title'), d: t('grid.items.4.desc'), i: <Layers className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.5.title'), d: t('grid.items.5.desc'), i: <FileText className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.6.title'), d: t('grid.items.6.desc'), i: <Shield className="w-6 h-6 text-primary mb-4" /> },
              { t: t('grid.items.7.title'), d: t('grid.items.7.desc'), i: <Ruler className="w-6 h-6 text-primary mb-4" /> }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-card border border-card-border rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                {item.i}
                <h4 className="font-heading font-bold text-lg mb-3 group-hover:text-primary transition-colors">{item.t}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background border-t border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[700px] mt-6 mb-10">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/ressourcen/downloads">
                {t('cta.btn1')}
              </Button>
              <Button variant="secondary" size="lg" href="/projektanfrage" className="text-inverse-foreground border-inverse-foreground/20 hover:bg-inverse-foreground hover:text-foreground">
                {t('cta.btn2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
