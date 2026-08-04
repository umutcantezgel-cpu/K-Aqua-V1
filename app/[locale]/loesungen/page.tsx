/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { Button } from "@/components/ui/Button";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { SectionHead } from "@/components/ui/SectionHead";
import { StatNumber } from "@/components/ui/StatNumber";
import { CTABand } from "@/components/ui/CTABand";
import { KontaktForm } from "@/components/kontakt/KontaktForm";
import { SolutionsDeep } from "@/components/sections/SolutionsDeep";
import { setRequestLocale } from 'next-intl/server';
import { Droplet, Thermometer, Factory, Flame, Wrench } from "@/components/ui/icon";

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

export default async function LoesungenPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "solutions.index" });
  const messages = await getMessages();
  const jsonLd = await getWebPageJsonLd(locale, "solutions", "WebPage", { title: t('meta.title'), description: t('meta.desc') });
  
  const stickyItemsRaw = t.raw('sticky.items');
  const stickyItems = Array.isArray(stickyItemsRaw) ? stickyItemsRaw as Array<{ title: string; p1: string; p2: string }> : [];

  const timelineItemsRaw = t.raw('timeline.items');
  const timelineItems = Array.isArray(timelineItemsRaw) ? timelineItemsRaw as Array<{ year: string; title: string; text: string }> : [];
  
  const bentoItemsRaw = t.raw('bento.items');
  const bentoItems = Array.isArray(bentoItemsRaw) ? bentoItemsRaw as Array<{ title: string; desc: string }> : [];

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">{t('meta.title')}</div>
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
          <LiquidMagneticButton fill="flood" size="md" variant="primary" href="/kontakt">{t('hero.cta')}</LiquidMagneticButton>
        </ParallaxHero>

        {/* 2) Intro */}
        <section className="py-32 md:py-48 bg-background border-b border-card-border relative overflow-hidden">
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

        {/* 4) Material Science */}
        <section className="py-32 bg-background border-b border-card-border">
          <div className="mx-auto max-w-[1000px] px-6">
            <div className="flex flex-col gap-16">
              {stickyItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-6">
                  <div className="text-3xl font-heading font-bold">{item.title}</div>
                  <div className="flex flex-col gap-4 text-lg text-muted-foreground leading-relaxed">
                    <p>{item.p1}</p>
                    <p>{item.p2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5) Application Vectors */}
        <section className="py-32 md:py-48 bg-card/40 border-b border-card-border relative overflow-hidden">
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <SectionHead
              title={t('bento.header.title')}
              lead={t('bento.header.desc')}
              align="center"
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bentoItems.map((item, index) => {
                const Icon = bentoIcons[index] || Factory;
                return (
                  <div key={item.title} className="flex flex-col gap-6 p-8 rounded-2xl bg-card border border-card-border">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xl font-heading font-bold">{item.title}</div>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
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

        {/* 7) Enterprise / Tech Deep Dive */}
        <NextIntlClientProvider messages={pick(messages, 'enterprise')}>
          <SolutionsDeep />
        </NextIntlClientProvider>

        {/* 8) Final CTA */}
        <section className="py-32 md:py-48 bg-background relative overflow-hidden border-t border-card-border">
          <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <CTABand className="py-20 md:py-32" fullWidth>
              <div className="flex flex-col lg:flex-row gap-16 lg:items-center justify-between w-full">
                <div className="max-w-xl flex flex-col items-start gap-8">
                  <span className="font-heading font-bold text-sm tracking-widest uppercase text-primary-foreground/70">
                    {t('cta.eyebrow')}
                  </span>
                  <h2 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black text-inverse-foreground tracking-tighter leading-[1.05]">
                    {t('cta.title1')} <br/> <span className="text-primary-foreground opacity-90">{t('cta.title2')}</span>
                  </h2>
                  <p className="text-2xl text-inverse-foreground/80 leading-relaxed font-light">
                    {t('cta.desc')}
                  </p>
                  <div className="flex flex-wrap gap-6 mt-8">
                    <Button variant="inverse" size="lg" href="/kontakt">{t('cta.button1')}</Button>
                    <Button variant="ghost" size="lg" href="/produkte" className="border-inverse-foreground/20 text-inverse-foreground hover:bg-inverse-surface/10 hover:border-inverse-foreground/50">{t('cta.button2')}</Button>
                  </div>
                </div>
                
                <div className="w-full lg:w-[450px] shrink-0 bg-background/5 p-8 rounded-2xl border border-inverse-foreground/10 text-inverse-foreground">
                   <KontaktForm 
                     slug="loesungen" 
                     interest="Projekt-Initiierung" 
                     done="Vielen Dank! Unsere Ingenieure werden Ihre Spezifikationen prüfen und sich in Kürze bei Ihnen melden." 
                     layout="stack" 
                   />
                </div>
              </div>
            </CTABand>
          </div>
        </section>

      </div>
    </>
  );
}
