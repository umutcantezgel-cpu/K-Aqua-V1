import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { CTABand } from '@/components/ui/CTABand';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  Droplet, 
  Award, 
  Factory, 
  FileText, 
  Thermometer, 
  Globe, 
  Layers,
  Check,
  Flame,
  Recycle,
  Microscope
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'academy.zertifizierung.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/academy/zertifizierung",
    locale,
  });
}: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return constructMetadata({
    title: "Zertifikate & Normen | K-Aqua",
    description: "DVGW, SKZ, ISO und mehr. Entdecken Sie die kompromisslose Sicherheit und German Engineering-Qualität der K-Aqua Rohrleitungssysteme.",
    path: "/academy/zertifizierung",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const certifications = [
    {
      title: t('certifications.items.0.title'),
      description: (
        <div className="flex flex-col gap-4">
          <p>{t('certifications.items.0.p1')}</p>
          <p>{t('certifications.items.0.p2')}</p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="DVGW Prüfverfahren 3D" />
    },
    {
      title: t('certifications.items.1.title'),
      description: (
        <div className="flex flex-col gap-4">
          <p>{t('certifications.items.1.p1')}</p>
          <p>{t('certifications.items.1.p2')}</p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="SKZ Stresstest Simulation" />
    },
    {
      title: t('certifications.items.2.title'),
      description: (
        <div className="flex flex-col gap-4">
          <p>{t('certifications.items.2.p1')}</p>
          <p>{t('certifications.items.2.p2')}</p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Molekulare Reinheit Visualisierung" />
    },
    {
      title: t('certifications.items.3.title'),
      description: (
        <div className="flex flex-col gap-4">
          <p>{t('certifications.items.3.p1')}</p>
          <p>{t('certifications.items.3.p2')}</p>
        </div>
      ),
      content: <PremiumAssetPlaceholder label="Automatisierte QM-Infrastruktur" />
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
    <div className="flex flex-col w-full min-h-screen bg-background selection:bg-primary/30">
      
      {/* 1) Hero Section */}
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
          {t('hero.cta1')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* 2) Manifesto / Narrative */}
      <section className="py-32 lg:py-48 bg-background relative overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-10">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] mb-10">
            {t('manifesto.title1')}<br/>
            <span className="text-muted-foreground">{t('manifesto.title2')}</span>
          </h2>
          <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-light max-w-4xl">
            {t('manifesto.p1')}
          </p>
        </div>
      </section>

      {/* 3) Bento Grid Value Proposition */}
      <section className="py-24 bg-card border-y border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="center"
            className="mb-20"
          />
          <BentoGrid>
            <BentoGridItem
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              icon={<Layers className="w-8 h-8 text-primary" />}
              header={<PremiumAssetPlaceholder label="Berstdruck Testkammer" className="min-h-[250px] rounded-b-none" />}
              colSpan={2}
              rowSpan={2}
            />
            <BentoGridItem
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              icon={<Thermometer className="w-8 h-8 text-primary" />}
              colSpan={1}
              rowSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              icon={<Droplet className="w-8 h-8 text-primary" />}
              colSpan={1}
              rowSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              icon={<Flame className="w-8 h-8 text-primary" />}
              colSpan={1}
              rowSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.4.title')}
              description={t('bento.items.4.desc')}
              icon={<Award className="w-8 h-8 text-primary" />}
              colSpan={2}
              rowSpan={1}
              header={<div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent border-b border-card-border" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 4) Scroll Telling Deep Dive */}
      <section className="py-32 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 mb-16">
          <SectionHead
            eyebrow={t('certifications.eyebrow')}
            title={t('certifications.title')}
            lead={t('certifications.lead')}
            align="left"
          />
        </div>
        <StickyScrollReveal content={certifications} />
      </section>

      {/* 5) Technical Lab Narrative */}
      <section className="py-32 lg:py-48 bg-card border-y border-card-border relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary),0.05)_0%,transparent_70%)]" />
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8 relative z-10">
              <span className="font-mono text-primary font-bold tracking-widest uppercase">{t('lab.eyebrow')}</span>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-[1.1]">
                {t('lab.title1')} <br/> {t('lab.title2')}
              </h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground font-light leading-relaxed">
                <p>{t('lab.desc')}</p>
                <ul className="flex flex-col gap-4 mt-2">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">{t('lab.items.0.title')}</strong>
                      {t('lab.items.0.desc')}
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">{t('lab.items.1.title')}</strong>
                      {t('lab.items.1.desc')}
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 bg-primary/20 p-1 rounded">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <strong className="text-foreground block mb-1">{t('lab.items.2.title')}</strong>
                      {t('lab.items.2.desc')}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative z-10">
               <PremiumAssetPlaceholder label="Quality Control Labor Analytics" className="min-h-[600px] shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Timeline */}
      <HorizontalTimeline 
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
        className="py-0"
      />

      {/* 7) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-h2 font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lead text-inverse-foreground/80 leading-relaxed max-w-[560px]">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/ressourcen/downloads">
                {t('cta.button1')}
              </Button>
              <Button variant="inverse-ghost" size="lg" href="/projektanfrage">
                {t('cta.button2')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
