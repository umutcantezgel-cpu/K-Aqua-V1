import React from "react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import HoverPreviewList from '@/components/signature/HoverPreviewList';
import KAquaMapsSuite from '@/components/sections/maps/KAquaMapsSuite';
import {
  Droplet,
  Factory,
  ShieldCheck,
  Ruler,
  Globe2,
  Flame,
  Gauge,
} from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("references") as string[];
  return constructMetadata({
    title: meta[0] ?? "Globale Referenzprojekte | K-Aqua",
    description: meta[1] ?? "Industrielle Fallstudien und Hochleistungsarchitekturen.",
    path: "/referenzen",
    locale,
  });
}

export default async function ReferenzenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "references");
  const t = await getTranslations({ locale, namespace: "referenzenPage" });
  const metricKeys = ["pressure", "isolation", "tolerance", "network", "welding"] as const;

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <JsonLd schema={jsonLd} />

      {/* Hero Section */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <span className="block text-balance">
            {t('hero.titlePlain')}<span className="text-primary">{t('hero.titleAccent')}</span>
          </span>
        }
        description={t('hero.lead')}
      >
        <div className="flex gap-4">
          <div className="px-8 py-4 rounded-full border-2 border-primary text-primary font-mono tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] cursor-pointer text-sm font-bold">
            {t('hero.cta1')}
          </div>
          <div className="px-8 py-4 rounded-full bg-card border border-card-border text-foreground font-mono tracking-widest uppercase hover:bg-muted transition-colors cursor-pointer text-sm font-bold">
            {t('hero.cta2')}
          </div>
        </div>
      </ParallaxHero>

      {/* Manifest Section */}
      <section className="py-40 bg-background border-b border-card-border relative z-10">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-16">
            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <Droplet className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-5xl md:text-6xl font-heading font-black tracking-tighter uppercase">{t('manifesto.title')}</h2>
          </div>

          <div className="space-y-12 text-xl text-muted-foreground leading-[1.8] font-sans">
            <p dangerouslySetInnerHTML={{ __html: t.raw('manifesto.p1').replace(/<strong>/g, '<strong class="text-foreground">') }} />
            <p>{t('manifesto.p2')}</p>
            <p>{t('manifesto.p3')}</p>
            <p>{t('manifesto.p4')}</p>
          </div>
        </div>
      </section>


      {/* Bento Grid Features */}
      <section className="py-40 bg-card/40 border-b border-card-border relative overflow-hidden">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,rgba(var(--primary),0.05),transparent)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
            <span className="font-mono text-primary font-bold text-sm tracking-[0.3em] uppercase mb-6 block flex items-center justify-center gap-2">
              <Gauge className="w-5 h-5" /> {t('metrics.eyebrow')}
            </span>
            <h2 className="text-6xl md:text-7xl font-heading font-black tracking-tighter mb-8 uppercase">
              {t('metrics.title1')} <br />{t('metrics.title2')}
            </h2>
            <p className="text-muted-foreground text-2xl max-w-3xl mx-auto leading-relaxed">
              {t('metrics.lead')}
            </p>
          </div>

          <BentoGrid>
            <BentoGridItem
              title={t(`metrics.items.${metricKeys[0]}.title`)}
              description={t(`metrics.items.${metricKeys[0]}.desc`)}
              icon={<Gauge className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label={t(`metrics.items.${metricKeys[0]}.placeholder`)} />}
            />
            <BentoGridItem
              title={t(`metrics.items.${metricKeys[1]}.title`)}
              description={t(`metrics.items.${metricKeys[1]}.desc`)}
              icon={<ShieldCheck className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
                  <ShieldCheck className="w-32 h-32 text-primary/30 group-hover:text-primary/60 transition-colors duration-500 group-hover:scale-110 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem
              title={t(`metrics.items.${metricKeys[2]}.title`)}
              description={t(`metrics.items.${metricKeys[2]}.desc`)}
              icon={<Ruler className="w-10 h-10 text-primary" />}
              header={
                <div className="w-full h-full bg-background/50 border-b border-card-border flex items-center justify-center p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Ruler className="w-32 h-32 text-primary/30 group-hover:text-primary transition-colors duration-500 group-hover:rotate-12 transform-gpu" />
                </div>
              }
            />
            <BentoGridItem
              title={t(`metrics.items.${metricKeys[3]}.title`)}
              description={t(`metrics.items.${metricKeys[3]}.desc`)}
              icon={<Globe2 className="w-10 h-10 text-primary" />}
              colSpan={2}
              header={<PremiumAssetPlaceholder label={t(`metrics.items.${metricKeys[3]}.placeholder`)} />}
            />
            <BentoGridItem
              title={t(`metrics.items.${metricKeys[4]}.title`)}
              description={t(`metrics.items.${metricKeys[4]}.desc`)}
              icon={<Flame className="w-10 h-10 text-primary" />}
              colSpan={3}
              rowSpan={2}
              header={<PremiumAssetPlaceholder label={t(`metrics.items.${metricKeys[4]}.placeholder`)} className="min-h-[500px]" />}
            />
          </BentoGrid>
        </div>
      </section>

      {/* Signature: Hover Preview List (real reference projects) */}
      <section className="py-32 bg-background border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <HoverPreviewList />
        </div>
      </section>

      {/* Interactive Google Maps Suite */}
      <KAquaMapsSuite />

      {/* Final Call to Action */}
      <section className="py-48 bg-background relative overflow-hidden flex items-center justify-center">
        {/* Grid and gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary),0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary),0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.15)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <Factory className="w-24 h-24 text-primary mx-auto mb-12 opacity-90 drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-10 uppercase leading-none">
            {t('cta.title1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
              {t('cta.title2')}
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            {t('cta.lead')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="px-14 py-6 bg-primary text-primary-foreground font-mono font-black tracking-[0.2em] uppercase text-lg hover:scale-105 hover:shadow-[0_0_40px_rgba(var(--primary),0.6)] transition-all duration-300">
              {t('cta.btn1')}
            </button>
            <button className="px-14 py-6 bg-transparent border-2 border-primary text-primary font-mono font-bold tracking-[0.2em] uppercase text-lg hover:bg-primary/10 transition-all duration-300">
              {t('cta.btn2')}
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
