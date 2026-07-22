/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { Button } from "@/components/ui/Button";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { StatNumber } from "@/components/ui/StatNumber";
import { CTABand } from "@/components/ui/CTABand";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { SolutionsDeep } from "@/components/sections/SolutionsDeep";
import { Droplet, Thermometer, Factory, Layers, Flame, Wrench } from "@/components/ui/icon";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "solutions.index" });
  return constructMetadata({
    title: t('meta.title'),
    description: t('meta.desc'),
    path: "/loesungen",
    locale,
  });
}

const bentoIcons = [Droplet, Thermometer, Wrench, Factory, Flame];
const bentoAssets: { image?: string; video?: string }[] = [
  { image: '/images/new-k-aqua/was-ist-ppr.jpg' },
  { image: '/images/new-k-aqua/valves-profil.png' },
  { image: '/images/new-k-aqua/pipes-profil.png' },
  { image: '/images/new-k-aqua/big5-messe-saudi-arabien.webp' },
  { video: '/videos/factory.mp4' },
];

export default async function LoesungenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "solutions");
  const t = await getTranslations({ locale, namespace: "solutions.index" });

  const stickyItems = t.raw('sticky.items') as Array<{ title: string; p1: string; p2: string }>;

  const stickyAssets: { image?: string; video?: string }[] = [
    { image: '/images/new-k-aqua/was-ist-ppr.jpg' },
    { image: '/images/new-k-aqua/fertigung-pipes.jpg' },
    { image: '/images/new-k-aqua/pipes-profil.png' },
    { image: '/images/new-k-aqua/ppr-rohre-vorteile.jpg' },
  ];

  const stickyContent = stickyItems.map((item, index) => ({
    title: item.title,
    description: (
      <div className="space-y-4">
        <p>{item.p1}</p>
        <p>{item.p2}</p>
      </div>
    ),
    content: <PremiumAssetPlaceholder label={item.title} {...stickyAssets[index]} />
  }));

  const timelineItems = t.raw('timeline.items') as Array<{ year: string; title: string; text: string }>;
  const bentoItems = t.raw('bento.items') as Array<{ title: string; desc: string }>;

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">

        {/* 1) Hero */}
        <ParallaxHero
          eyebrow={t('hero.eyebrow')}
          title={
            <>
              {t('hero.title1')} <br /> <span className="text-primary">{t('hero.title2')}</span>
            </>
          }
          description={t('hero.desc')}
        >
          <Button variant="primary" size="lg" href="/kontakt">{t('hero.cta')}</Button>
        </ParallaxHero>

        {/* 2) Intro */}
        <section className="py-32 md:py-48 bg-background border-b border-card-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />
          <div className="mx-auto max-w-[1000px] px-6 relative z-10 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tighter mb-10 leading-[1.1]">
              {t('intro.title')}
            </h2>
            <div className="flex flex-col gap-8 text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
              <p>{t('intro.p1')}</p>
              <p>{t('intro.p2')}</p>
            </div>
          </div>
        </section>

        {/* 3) Timeline */}
        <HorizontalTimeline
          title={t('timeline.title')}
          description={t('timeline.desc')}
          items={timelineItems}
        />

        {/* 4) Sticky material-science scrollytelling */}
        <section className="py-32 bg-background border-b border-card-border">
          <div className="mx-auto max-w-[1400px] px-6">
            <StickyScrollReveal content={stickyContent} />
          </div>
        </section>

        {/* 5) Bento: application vectors */}
        <section className="py-32 md:py-48 bg-card/40 border-b border-card-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <SectionHead
              title={t('bento.header.title')}
              lead={t('bento.header.desc')}
              align="center"
            />
            <div className="mt-16">
              <BentoGrid>
                {bentoItems.map((item, index) => {
                  const Icon = bentoIcons[index] ?? Layers;
                  return (
                    <BentoGridItem
                      key={item.title}
                      title={item.title}
                      description={item.desc}
                      icon={<Icon className="w-8 h-8 text-primary" />}
                      colSpan={index === bentoItems.length - 1 ? 3 : index < 2 ? 2 : 1}
                      header={<PremiumAssetPlaceholder label={item.title} {...bentoAssets[index]} />}
                    />
                  );
                })}
              </BentoGrid>
            </div>
          </div>
        </section>

        {/* 6) Stats */}
        <section className="py-32 md:py-48 bg-background">
          <div className="mx-auto max-w-[1400px] px-6">
            <h2 className="text-4xl sm:text-5xl font-heading font-black tracking-tighter text-center mb-16">
              {t('stats.title')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex flex-col gap-4 p-8 rounded-2xl bg-card border border-card-border">
                  <StatNumber value={i === 0 ? '50+' : i === 1 ? '0.24' : '100%'} label={t(`stats.${i}.label`)} />
                  <p className="text-muted-foreground leading-relaxed">{t(`stats.${i}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7) Deep Content am Ende der Lösungsseite */}
        <SolutionsDeep />

        {/* 8) Final CTA */}
        <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-card-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <CTABand className="py-20 md:py-32">
              <div className="max-w-4xl flex flex-col items-start gap-8">
                <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary-foreground/70">
                  {t('cta.eyebrow')}
                </span>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-inverse-foreground tracking-tighter leading-[1.05]">
                  {t('cta.title1')} <br/> <span className="text-primary-foreground opacity-90">{t('cta.title2')}</span>
                </h2>
                <p className="text-2xl text-inverse-foreground/80 leading-relaxed font-light max-w-2xl">
                  {t('cta.desc')}
                </p>
                <div className="flex flex-wrap gap-6 mt-8">
                  <Button variant="inverse" size="lg" href="/kontakt">{t('cta.button1')}</Button>
                  <Button variant="ghost" size="lg" href="/produkte" className="border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-surface/10 hover:border-inverse-foreground/50">{t('cta.button2')}</Button>
                </div>
              </div>
            </CTABand>
          </div>
        </section>

      </div>
    </>
  );
}
