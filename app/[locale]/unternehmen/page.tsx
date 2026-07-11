import React from "react";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Users, Handshake, Leaf, Award, Check, Factory, Globe, Shield, Layers, Droplet } from "@/components/ui/icon";
import { AboutDeep } from "@/components/sections/AboutDeep";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

// Premium Components for Apple-style Scroll-Telling
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const meta = await getTranslations({ locale, namespace: "about.meta" });
  return constructMetadata({
    title: meta("title"),
    description: meta("desc"),
    path: "/unternehmen",
    locale,
  });
}

// TIMELINE_ITEMS moved into component

// STICKY_SCROLL_ITEMS moved into component

export default async function UnternehmenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "about");
  const t = await getTranslations({ locale, namespace: "pages" });

  const TIMELINE_ITEMS = [
    { year: t('timeline.items.0.year'), title: t('timeline.items.0.title'), text: t('timeline.items.0.text') },
    { year: t('timeline.items.1.year'), title: t('timeline.items.1.title'), text: t('timeline.items.1.text') },
    { year: t('timeline.items.2.year'), title: t('timeline.items.2.title'), text: t('timeline.items.2.text') },
    { year: t('timeline.items.3.year'), title: t('timeline.items.3.title'), text: t('timeline.items.3.text') }
  ];

  const STICKY_SCROLL_ITEMS = [
    { title: t('sticky.items.0.title'), description: t('sticky.items.0.desc'), content: <PremiumAssetPlaceholder label="Quality Control" /> },
    { title: t('sticky.items.1.title'), description: t('sticky.items.1.desc'), content: <PremiumAssetPlaceholder label="Global Reach" /> },
    { title: t('sticky.items.2.title'), description: t('sticky.items.2.desc'), content: <PremiumAssetPlaceholder label="Sustainability" /> },
    { title: t('sticky.items.3.title'), description: t('sticky.items.3.desc'), content: <PremiumAssetPlaceholder label="Innovation" /> }
  ];

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        
        {/* PARALLAX HERO */}
        <ParallaxHero 
          eyebrow={t('hero.eyebrow')}
          title={<>{t('hero.title1')}<br/><span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">{t('hero.title2')}</span></>}
          description={t('hero.desc')}
          className="h-[100vh]"
        />

        {/* INTRODUCTION - MASSIVE TYPOGRAPHY */}
        <section className="py-32 lg:py-48 bg-background relative z-10 kq-band kq-band--slant-b overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-heading font-black tracking-tight text-foreground leading-[1.1] max-w-5xl mx-auto">
                {t('intro.title1')} <br />
                <span className="text-muted-foreground">{t('intro.title2')}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-10 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
                {t('intro.desc')}
              </p>
            </Reveal>
          </div>
        </section>

        {/* MATERIAL SCIENCE - DEEP TECHNICAL DIVE */}
        <section className="py-32 bg-background relative z-10 border-b border-card-border overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div className="text-start flex flex-col gap-6">
                  <Eyebrow>{t('material.eyebrow')}</Eyebrow>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-snug">
                    {t('material.title1')} <br/>
                    <span className="text-primary">{t('material.title2')}</span>
                  </h2>
                  <div className="w-20 h-1 bg-primary rounded-full mt-2 mb-4" />
                  <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                    {t('material.p1')}
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('material.p2')}
                  </p>
                  <ul className="flex flex-col gap-6 mt-8">
                    <li className="flex gap-5 items-start">
                      <span className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </span>
                      <div>
                        <h4 className="text-foreground text-xl font-bold font-heading">{t('material.items.0.title')}</h4>
                        <p className="text-muted-foreground text-base leading-relaxed mt-1">{t('material.items.0.desc')}</p>
                      </div>
                    </li>
                    <li className="flex gap-5 items-start">
                      <span className="mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </span>
                      <div>
                        <h4 className="text-foreground text-xl font-bold font-heading">{t('material.items.1.title')}</h4>
                        <p className="text-muted-foreground text-base leading-relaxed mt-1">{t('material.items.1.desc')}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(var(--primary),0.1)]">
                   <PremiumAssetPlaceholder label="Polymer Chain Visualizer" className="h-full w-full" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* HORIZONTAL TIMELINE */}
        <HorizontalTimeline 
          title={t('timeline.title')}
          description={t('timeline.desc')}
          items={TIMELINE_ITEMS}
          className="z-20"
        />

        {/* STICKY SCROLL REVEAL - THE FOUR PILLARS */}
        <section className="py-32 bg-background relative z-10 border-b border-card-border">
          <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
            <SectionHead
              eyebrow={t('sticky.eyebrow')}
              title={t('sticky.title')}
              lead={t('sticky.lead')}
            />
          </div>
          <div className="max-w-[1400px] mx-auto px-6">
            <StickyScrollReveal content={STICKY_SCROLL_ITEMS} />
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="py-32 bg-card relative z-10 border-b border-card-border overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.05)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center relative z-20">
            <SectionHead
              eyebrow={t('bento.eyebrow')}
              title={t('bento.title')}
              lead={t('bento.lead')}
            />
          </div>
          <BentoGrid className="relative z-20">
            <BentoGridItem 
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              header={<div className="h-full w-full bg-background flex items-center justify-center border-b border-card-border"><Factory className="w-24 h-24 text-primary/30" /></div>}
              icon={<Layers className="w-8 h-8 text-primary" />}
              colSpan={2}
            />
            <BentoGridItem 
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              header={<div className="h-full w-full bg-background flex items-center justify-center border-b border-card-border"><Award className="w-24 h-24 text-primary/30" /></div>}
              icon={<Shield className="w-8 h-8 text-primary" />}
            />
            <BentoGridItem 
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              header={<div className="h-full w-full bg-background flex items-center justify-center border-b border-card-border"><Droplet className="w-24 h-24 text-primary/30" /></div>}
              icon={<Droplet className="w-8 h-8 text-primary" />}
            />
            <BentoGridItem 
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              header={<div className="h-full w-full bg-background flex items-center justify-center border-b border-card-border"><Globe className="w-24 h-24 text-primary/30" /></div>}
              icon={<Leaf className="w-8 h-8 text-primary" />}
              colSpan={2}
            />
          </BentoGrid>
        </section>

        {/* VALUES / POLICIES SECTION */}
        <section className="py-32 bg-background border-b border-card-border relative z-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Reveal>
                <Eyebrow>{t('values.eyebrow')}</Eyebrow>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mt-4 mb-6">
                  {t('values.title')}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('values.desc')}
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Reveal delay={0.1}>
                <Card className="h-full flex flex-col gap-6 text-start p-10 hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/50 group">
                  <div className="w-16 h-16 rounded-2xl grid place-items-center bg-primary/10 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {t('values.items.0.title')}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('values.items.0.desc')}
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={0.2}>
                <Card className="h-full flex flex-col gap-6 text-start p-10 hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/50 group">
                  <div className="w-16 h-16 rounded-2xl grid place-items-center bg-primary/10 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Handshake className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {t('values.items.1.title')}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('values.items.1.desc')}
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={0.3}>
                <Card className="h-full flex flex-col gap-6 text-start p-10 hover:shadow-2xl transition-all duration-500 border-primary/20 hover:border-primary/50 group">
                  <div className="w-16 h-16 rounded-2xl grid place-items-center bg-primary/10 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Leaf className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground">
                    {t('values.items.2.title')}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('values.items.2.desc')}
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Deep Content am Ende der Unternehmens-Seite */}
        <div className="relative z-10">
          <AboutDeep />
        </div>
      </div>
    </>
  );
}
