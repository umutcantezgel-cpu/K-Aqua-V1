import React from 'react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getTranslations } from 'next-intl/server';
import { SectionHead } from '@/components/ui/SectionHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CTABand } from '@/components/ui/CTABand';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { BentoGrid, BentoGridItem } from '@/components/ui/BentoGrid';
import { StickyScrollReveal } from '@/components/ui/StickyScrollReveal';
import { HorizontalTimeline } from '@/components/ui/HorizontalTimeline';
import { PremiumAssetPlaceholder } from '@/components/ui/PremiumAssetPlaceholder';
import { setRequestLocale } from 'next-intl/server';
import { 
  Download, 
  FileText, 
  Shield, 
  Layers, 
  Globe, 
  Ruler, 
  Award,
  ArrowRight
} from '@/components/ui/icon';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'resources.downloads.meta' });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/ressourcen/downloads",
    locale,
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'resources.downloads' });

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
    }
  ];

  const stickyContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="Belastungstests & Toleranzen" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Molekulare Struktur" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Hydraulik & Strömung" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Globale Zertifikate" />
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      
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
          {t('hero.cta1')} <ArrowRight className="ms-2 w-5 h-5" />
        </Button>
        <Button variant="ghost" size="lg" href="#dokumente">
          {t('hero.cta2')}
        </Button>
      </ParallaxHero>

      {/* 2) Value Proposition Grid (Bento Grid) */}
      <section id="dokumente" className="py-32 bg-card border-b border-card-border">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('bento.eyebrow')}
            title={t('bento.title')}
            lead={t('bento.lead')}
            align="center"
          />
          <div className="mt-20">
            <BentoGrid>
              <BentoGridItem
                title={t('bento.items.0.title')}
                description={t('bento.items.0.desc')}
                header={<PremiumAssetPlaceholder label="Tech-Sheets 3D" />}
                icon={<Ruler className="w-8 h-8 text-primary" />}
                colSpan={2}
              />
              <BentoGridItem
                title={t('bento.items.1.title')}
                description={t('bento.items.1.desc')}
                header={<div className="w-full h-full bg-background flex items-center justify-center p-6 rounded-t-2xl"><Shield className="w-24 h-24 text-primary/10" /></div>}
                icon={<Shield className="w-8 h-8 text-primary" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('bento.items.2.title')}
                description={t('bento.items.2.desc')}
                header={<div className="w-full h-full bg-background flex items-center justify-center p-6 rounded-t-2xl"><Globe className="w-24 h-24 text-primary/10" /></div>}
                icon={<Globe className="w-8 h-8 text-primary" />}
                colSpan={1}
              />
              <BentoGridItem
                title={t('bento.items.3.title')}
                description={t('bento.items.3.desc')}
                header={<PremiumAssetPlaceholder label="Katalog 2026" />}
                icon={<Layers className="w-8 h-8 text-primary" />}
                colSpan={2}
              />
            </BentoGrid>
          </div>
        </div>
      </section>

      {/* 3) Sticky Scroll Reveal (Apple-style scroll-telling) */}
      <section className="py-32 bg-background kq-band kq-band--slant-b border-b border-card-border relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('sticky.eyebrow')}
            title={t('sticky.title')}
            lead={t('sticky.lead')}
            align="left"
          />
          <div className="mt-20">
            <StickyScrollReveal content={stickyContent} />
          </div>
        </div>
      </section>

      {/* 4) Horizontal Timeline */}
      <HorizontalTimeline 
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
        className="py-0 relative z-10" 
      />

      {/* 5) Deep Dive Content & Methodology */}
      <section className="py-32 bg-card border-y border-card-border relative overflow-hidden z-20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="mx-auto max-w-[1400px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-8">
              <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary">{t('methodology.subtitle')}</span>
              <h2 className="text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight">
                {t('methodology.title')}
              </h2>
              <div className="flex flex-col gap-6 text-lg text-muted-foreground leading-relaxed">
                <p>{t('methodology.p1')}</p>
                <p>{t('methodology.p2')}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <Card className="p-6 bg-background/50 backdrop-blur border-primary/20">
                  <h4 className="font-heading font-bold text-2xl text-foreground mb-2">{t('methodology.card1.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('methodology.card1.desc')}</p>
                </Card>
                <Card className="p-6 bg-background/50 backdrop-blur border-primary/20">
                  <h4 className="font-heading font-bold text-2xl text-foreground mb-2">{t('methodology.card2.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('methodology.card2.desc')}</p>
                </Card>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-card-border">
              <PremiumAssetPlaceholder label="Testlabor & Qualitätssicherung" className="rounded-none border-none h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 6) Final File List Section */}
      <section className="py-32 bg-background relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <SectionHead
            eyebrow={t('files.eyebrow')}
            title={t('files.title')}
            lead={t('files.lead')}
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {[
              { title: t('files.items.0.title'), type: t('files.items.0.type'), icon: <Layers /> },
              { title: t('files.items.1.title'), type: t('files.items.1.type'), icon: <FileText /> },
              { title: t('files.items.2.title'), type: t('files.items.2.type'), icon: <Ruler /> },
              { title: t('files.items.3.title'), type: t('files.items.3.type'), icon: <Globe /> },
              { title: t('files.items.4.title'), type: t('files.items.4.type'), icon: <Award /> },
              { title: t('files.items.5.title'), type: t('files.items.5.type'), icon: <Shield /> },
            ].map((file, idx) => (
              <Card key={idx} className="flex items-center gap-6 p-6 group hover:border-primary transition-colors cursor-pointer">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {file.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-bold text-lg">{file.title}</h4>
                  <p className="text-sm text-muted-foreground">{file.type}</p>
                </div>
                <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CTA Band */}
      <section className="py-32 bg-background border-t border-card-border relative z-20">
        <div className="mx-auto max-w-[1400px] px-6">
          <CTABand>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-inverse-foreground tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-inverse-foreground/80 leading-relaxed max-w-2xl mt-4">
              {t('cta.desc')}
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button variant="inverse" size="lg" href="/projektanfrage">
                {t('cta.btn')}
              </Button>
            </div>
          </CTABand>
        </div>
      </section>

    </div>
  );
}
