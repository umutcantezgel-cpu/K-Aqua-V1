import React from "react";
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { Link } from '@/lib/i18n/navigation';

import {
  Droplet,
  Factory,
} from "lucide-react";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import HoverPreviewList from "@/components/signature/HoverPreviewList";
import KAquaMapsSuite from "@/components/sections/maps/KAquaMapsSuite";

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
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("references") as string[];
  const metricKeys = ["pressure", "isolation", "tolerance", "network", "welding"] as const;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['referenzenPage', 'refs', 'nav', 'common', 'mapsSuite'])}>
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
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6 relative z-50">
          <Link href="#projekte" className="px-8 py-4 rounded-full border-2 border-primary text-primary font-mono tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.2)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] cursor-pointer text-sm font-bold text-center block">
            {t('hero.cta1')}
          </Link>
          <Link href="#karten" className="px-8 py-4 rounded-full bg-card border border-card-border text-foreground font-mono tracking-widest uppercase hover:bg-muted transition-colors cursor-pointer text-sm font-bold text-center block">
            {t('hero.cta2')}
          </Link>
        </div>
      </ParallaxHero>

      {/* Manifest Section */}
      <section className="py-24 lg:py-32 bg-background border-b border-card-border relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-card-border/50 pb-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase max-w-[700px] leading-tight">
                {t('manifesto.title')}
              </h2>
              <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shrink-0 w-max mb-2">
                <Droplet className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 text-lg text-muted-foreground leading-relaxed font-sans mt-4">
              <div className="space-y-8">
                <p dangerouslySetInnerHTML={{ __html: t.raw('manifesto.p1').replace(/<strong>/g, '<span class="text-foreground font-bold">').replace(/<\/strong>/g, '</span>') }} />
                <p>{t('manifesto.p2')}</p>
              </div>
              <div className="space-y-8">
                <p>{t('manifesto.p3')}</p>
                <div className="border-l-2 border-primary pl-6 py-2 mt-4">
                  <p className="text-foreground font-semibold">{t('manifesto.p4')}</p>
                </div>
              </div>
            </div>
          </div>
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
    </NextIntlClientProvider>
  );
}
