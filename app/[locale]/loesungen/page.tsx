/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { Reveal } from "@/components/ui/Reveal";
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { SolutionsDeep } from "@/components/sections/SolutionsDeep";
import { ArrowRight, Droplet, Shield, Thermometer, Factory, Layers, Flame, Wrench } from "@/components/ui/icon";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.index" });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen",
    locale,
  });
}

export default async function LoesungenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "solutions");
  const t = await getTranslations({ locale, namespace: "solutions.index" });

  const stickyItems = t.raw('sticky.items') as Array<{ title: string; p1: string; p2: string }>;
  
  const stickyContent = stickyItems.map((item, index) => ({
    title: item.title,
    description: (
      <div className="space-y-4">
        <p>{item.p1}</p>
        <p>{item.p2}</p>
      </div>
    ),
    content: <PremiumAssetPlaceholder label={item.title} />
  }));

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

  return (
    <>
      <div className="sr-only">
        <p>{t('meta.title')}</p>
        <p>{t('meta.desc')}</p>
      </div>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
      
        {/* Apple-style Parallax Hero */}
        <ParallaxHero 
          eyebrow={t('hero.eyebrow')}
          title={
            <>
              {t('hero.title1')} <br /> 
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">{t('hero.title2')}</span>
            </>
          }
          description={t('hero.desc')}
        >
          <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-300 min-h-[56px] px-8 text-lg">
            {t('hero.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </ParallaxHero>

        {/* Deep Text Introduction */}
        <section className="py-32 bg-background border-b border-card-border relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-[900px] mx-auto px-6 relative z-10 text-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-8">
                {t('intro.title')}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-6 text-xl text-muted-foreground leading-relaxed text-justify md:text-center">
                <p>
                  {t('intro.p1')}
                </p>
                <p>
                  {t('intro.p2')}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sticky Scroll Reveal Apple-style */}
        <section className="py-32 bg-card/30 border-b border-card-border relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <Reveal>
              <div className="mb-16 md:text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">{t('sticky.header.title')}</h2>
                <p className="text-xl text-muted-foreground">{t('sticky.header.desc')}</p>
              </div>
            </Reveal>
            <StickyScrollReveal content={stickyContent} />
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-32 bg-background border-b border-card-border">
          <div className="max-w-[1400px] mx-auto px-6">
            <Reveal>
              <div className="mb-20 md:text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-6">{t('bento.header.title')}</h2>
                <p className="text-xl text-muted-foreground">{t('bento.header.desc')}</p>
              </div>
            </Reveal>
            
            <BentoGrid>
              <BentoGridItem
                title={t('bento.items.0.title')}
                description={t('bento.items.0.desc')}
                icon={<Droplet className="w-8 h-8 text-primary" />}
                header={<PremiumAssetPlaceholder label="Sanitär-Infrastruktur" className="min-h-[200px]" />}
                className="md:col-span-2"
                colSpan={2}
              />
              <BentoGridItem
                title={t('bento.items.1.title')}
                description={t('bento.items.1.desc')}
                icon={<Thermometer className="w-8 h-8 text-primary" />}
                header={<div className="w-full h-full min-h-[200px] bg-card flex items-center justify-center rounded-xl"><Flame className="w-16 h-16 text-primary/20" /></div>}
                colSpan={1}
              />
              <BentoGridItem
                title={t('bento.items.2.title')}
                description={t('bento.items.2.desc')}
                icon={<Shield className="w-8 h-8 text-primary" />}
                header={<div className="w-full h-full min-h-[200px] bg-card flex items-center justify-center rounded-xl"><Layers className="w-16 h-16 text-primary/20" /></div>}
                colSpan={1}
              />
              <BentoGridItem
                title={t('bento.items.3.title')}
                description={t('bento.items.3.desc')}
                icon={<Wrench className="w-8 h-8 text-primary" />}
                header={<PremiumAssetPlaceholder label="Offshore-Integration" className="min-h-[200px]" />}
                className="md:col-span-2"
                colSpan={2}
              />
              <BentoGridItem
                title={t('bento.items.4.title')}
                description={t('bento.items.4.desc')}
                icon={<Factory className="w-8 h-8 text-primary" />}
                header={<PremiumAssetPlaceholder label="Prozessanlagen-Matrix" className="min-h-[300px]" />}
                className="md:col-span-3"
                colSpan={3}
              />
            </BentoGrid>
          </div>
        </section>

        {/* Apple Style Full Width Technical Specs */}
        <section className="py-32 bg-foreground text-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_0%,transparent_80%)] pointer-events-none" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div>
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight mb-12 text-white">{t('stats.title')}</h2>
                </Reveal>
                <div className="space-y-12">
                  <Reveal delay={0.1}>
                    <div>
                      <div className="text-7xl font-mono font-bold text-primary mb-3">50+</div>
                      <div className="text-2xl font-bold mb-3 text-white">{t('stats.0.label')}</div>
                      <p className="text-muted-foreground/80 leading-relaxed text-lg">{t('stats.0.desc')}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <div>
                      <div className="text-7xl font-mono font-bold text-primary mb-3">0,24</div>
                      <div className="text-2xl font-bold mb-3 text-white">{t('stats.1.label')}</div>
                      <p className="text-muted-foreground/80 leading-relaxed text-lg">{t('stats.1.desc')}</p>
                    </div>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <div>
                      <div className="text-7xl font-mono font-bold text-primary mb-3">100%</div>
                      <div className="text-2xl font-bold mb-3 text-white">{t('stats.2.label')}</div>
                      <p className="text-muted-foreground/80 leading-relaxed text-lg">{t('stats.2.desc')}</p>
                    </div>
                  </Reveal>
                </div>
              </div>
              <Reveal delay={0.4} className="h-full">
                <div className="h-full min-h-[600px] flex items-stretch">
                  <PremiumAssetPlaceholder label="Materialwissenschaftliches Datenmodell" className="bg-background/5 border-white/10" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Horizontal Timeline Section */}
        <HorizontalTimeline 
          title={t('timeline.title')} 
          description={t('timeline.desc')}
          items={timelineItems}
        />

        {/* Final CTA / Hero */}
        <ParallaxHero 
          eyebrow={t('cta.eyebrow')}
          title={
            <>
              {t('cta.title1')} <br /> 
              <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">{t('cta.title2')}</span>
            </>
          }
          description={t('cta.desc')}
          className="min-h-[70vh] border-t border-card-border bg-card/30"
        >
          <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg bg-primary text-primary-foreground shadow-diffuse hover:bg-primary-hover hover:-translate-y-0.5 transition-all duration-300 min-h-[64px] px-10 text-xl">
            {t('cta.button1')}
            <ArrowRight className="w-6 h-6" />
          </Link>
          <Link href="/produkte" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg bg-card border border-card-border text-foreground hover:bg-background hover:-translate-y-0.5 transition-all duration-300 min-h-[64px] px-10 text-xl">
            {t('cta.button2')}
          </Link>
        </ParallaxHero>

        {/* Deep Content am Ende der Lösungsseite */}
        <SolutionsDeep />
      </div>
    </>
  );
}
