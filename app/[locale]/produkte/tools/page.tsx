import React from 'react';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { constructMetadata } from '@/lib/seo/metadata';
import { SectionHead } from '@/components/ui/SectionHead';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { 
  Wrench, 
  Thermometer, 
  Shield, 
  Factory, 
  Ruler, 
  Flame,
  Layers
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.tools' });
  return constructMetadata({
    title: t('metaTitle'),
    description: t('metaDesc'),
    path: "/produkte/tools",
    locale,
  });
}

export default function Page() {
  const t = useTranslations('products.tools');

  const stickyScrollContent = [
    {
      title: t('scroll1Title'),
      description: t('scroll1Desc'),
      content: <PremiumAssetPlaceholder label="Thermodynamics Visualization" />
    },
    {
      title: t('scroll2Title'),
      description: t('scroll2Desc'),
      content: <PremiumAssetPlaceholder label="CNC Machine Simulation" />
    },
    {
      title: t('scroll3Title'),
      description: t('scroll3Desc'),
      content: <PremiumAssetPlaceholder label="Pipe Peeling Tool 3D" />
    },
    {
      title: t('scroll4Title'),
      description: t('scroll4Desc'),
      content: <PremiumAssetPlaceholder label="Cold Circular Saw Cut" />
    }
  ];

  const timelineItems = [
    {
      year: t('timeline1Year'),
      title: t('timeline1Title'),
      text: t('timeline1Text')
    },
    {
      year: t('timeline2Year'),
      title: t('timeline2Title'),
      text: t('timeline2Text')
    },
    {
      year: t('timeline3Year'),
      title: t('timeline3Title'),
      text: t('timeline3Text')
    },
    {
      year: t('timeline4Year'),
      title: t('timeline4Title'),
      text: t('timeline4Text')
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
      {/* 1) Hero Section with Parallax */}
      <ParallaxHero
        eyebrow={t('heroEyebrow')}
        title={
          <>
            {t('heroTitle')} <br />
            <span className="text-muted-foreground">{t('heroSubtitle')}</span>
          </>
        }
        description={t('heroDesc')}
      >
        <Button variant="primary" size="lg" href="/projektanfrage">
          {t('heroBtnPrimary')}
        </Button>
        <Button variant="ghost" size="lg" href="/ressourcen/downloads">
          {t('heroBtnSecondary')}
        </Button>
      </ParallaxHero>

      {/* 2) Bento Grid Ecosystem */}
      <section className="py-32 bg-card relative z-10 border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bentoEyebrow')}
            title={t('bentoTitle')}
            lead={t('bentoLead')}
            align="center"
            className="mb-20"
          />
          
          <BentoGrid>
            <BentoGridItem
              title={t('bento1Title')}
              description={t('bento1Desc')}
              icon={<Flame className="w-8 h-8 text-primary" />}
              header={<PremiumAssetPlaceholder label="Muffenschweißgerät" className="min-h-[200px]" />}
              className="md:col-span-2"
            />
            <BentoGridItem
              title={t('bento2Title')}
              description={t('bento2Desc')}
              icon={<Ruler className="w-8 h-8 text-primary" />}
              header={<div className="h-full w-full bg-primary/5 border-b border-card-border" />}
            />
            <BentoGridItem
              title={t('bento3Title')}
              description={t('bento3Desc')}
              icon={<Factory className="w-8 h-8 text-primary" />}
              header={<div className="h-full w-full bg-primary/5 border-b border-card-border" />}
            />
            <BentoGridItem
              title={t('bento4Title')}
              description={t('bento4Desc')}
              icon={<Wrench className="w-8 h-8 text-primary" />}
              header={<PremiumAssetPlaceholder label="Zubehör Set" className="min-h-[200px]" />}
              className="md:col-span-2"
            />
          </BentoGrid>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal */}
      <section className="py-32 bg-background border-b border-card-border relative z-10">
        <div className="mx-auto max-w-[1400px] px-6">
           <SectionHead
            eyebrow={t('scrollEyebrow')}
            title={t('scrollTitle')}
            lead={t('scrollLead')}
            align="left"
            className="mb-16"
          />
          <StickyScrollReveal content={stickyScrollContent} />
        </div>
      </section>

      {/* 4) Horizontal Timeline for the Process */}
      <HorizontalTimeline 
        title={t('timelineTitle')}
        description={t('timelineDesc')}
        items={timelineItems}
      />

      {/* 5) Deep Dive Specs Grid */}
      <section className="py-32 bg-background border-b border-card-border">
         <div className="mx-auto max-w-[1400px] px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="flex flex-col gap-6">
                <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight" dangerouslySetInnerHTML={{ __html: t.raw('specsTitle') }}></h2>
                <div className="flex flex-col gap-4 text-muted-foreground text-lg leading-relaxed mt-4">
                  <p>
                    {t('specsP1')}
                  </p>
                  <p>
                    {t('specsP2')}
                  </p>
                </div>
                <ul className="flex flex-col gap-4 mt-8">
                  {[
                    { title: t('specsList1'), icon: <Shield className="text-primary w-6 h-6" /> },
                    { title: t('specsList2'), icon: <Layers className="text-primary w-6 h-6" /> },
                    { title: t('specsList3'), icon: <Thermometer className="text-primary w-6 h-6" /> }
                  ].map((li, i) => (
                    <li key={i} className="flex items-center gap-4 font-medium text-lg border border-card-border p-4 rounded-xl bg-card">
                      {li.icon}
                      <span>{li.title}</span>
                    </li>
                  ))}
                </ul>
             </div>
             <div className="h-[600px] w-full">
               <PremiumAssetPlaceholder label="K-Aqua Toolkit Pro" />
             </div>
           </div>
         </div>
      </section>

      {/* 6) CTA Band */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-inverse-foreground/80 leading-relaxed max-w-[600px] mt-4 mb-8">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('ctaBtn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
