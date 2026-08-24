import React from "react";
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { Link } from '@/lib/i18n/navigation';

import {
  Droplet,
  Factory,
  Gauge,
  ShieldCheck,
  Ruler,
  Globe2,
  Flame,
} from "lucide-react";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import HoverPreviewList from "@/components/signature/HoverPreviewList";
import KAquaMapsSuite from "@/components/sections/maps/KAquaMapsSuite";
import CatalogReferences from "@/components/signature/CatalogReferences";

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
  setRequestLocale(locale);
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("references") as string[];
  const t = await getTranslations({ locale, namespace: "referenzenPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/referenzen",
      type: "CollectionPage",
      name: meta[0] || "Referenzen | K-Aqua",
      description: meta[1] || "Globale Referenzen und Case Studies von K-Aqua Projekten.",
      breadcrumbId: `${siteUrl}/${locale}/referenzen#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav("references") || (locale === "de" ? "Referenzen" : locale === "ar" ? "المشاريع" : "References"), path: "/referenzen" },
    ]),
  ]);
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
                <div className="border-s-2 border-primary ps-6 py-2 mt-4">
                  <p className="text-foreground font-semibold">{t('manifesto.p4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Metrics Section */}
      <section className="py-24 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-start max-w-3xl mb-16">
            <span className="text-tiny uppercase tracking-[0.2em] font-mono text-primary font-bold block mb-3">
              {t('metrics.eyebrow')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground uppercase">
              {t('metrics.title1')} <span className="text-primary">{t('metrics.title2')}</span>
            </h2>
            <p className="text-lead text-muted-foreground mt-4 leading-relaxed">
              {t('metrics.lead')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metricKeys.map((key) => {
              const iconsMap: Record<string, React.ReactNode> = {
                pressure: <Gauge className="w-6 h-6 text-primary" />,
                isolation: <ShieldCheck className="w-6 h-6 text-primary" />,
                tolerance: <Ruler className="w-6 h-6 text-primary" />,
                network: <Globe2 className="w-6 h-6 text-primary" />,
                welding: <Flame className="w-6 h-6 text-primary" />,
              };
              return (
                <div key={key} className="bg-card border border-card-border rounded-2xl p-8 flex flex-col justify-between hover:border-primary/40 transition-colors">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center mb-6">
                      {iconsMap[key]}
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {t(`metrics.items.${key}.title`)}
                    </h3>
                    <p className="text-small text-muted-foreground leading-relaxed">
                      {t(`metrics.items.${key}.desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Belegte Referenzen aus dem Herstellerkatalog (S. 7) — mit Fundstelle. */}
      <CatalogReferences locale={locale} />

      {/* Signature: Hover Preview List (real reference projects) */}
      <section id="projekte" className="py-32 bg-background border-b border-card-border scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <HoverPreviewList />
        </div>
      </section>

      {/* Interactive Google Maps Suite */}
      <div id="karten" className="scroll-mt-24">
        <KAquaMapsSuite />
      </div>

      {/* Final Call to Action */}
      <section className="py-48 bg-background relative overflow-hidden flex items-center justify-center">
        {/* Grid and gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--card-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--card-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--primary-soft)_0%,transparent_60%)] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl px-6">
          <Factory className="w-24 h-24 text-primary mx-auto mb-12 opacity-90 drop-shadow-[0_0_15px_var(--primary)]" />
          <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-10 uppercase leading-none">
            {t('cta.title1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-strong">
              {t('cta.title2')}
            </span>
          </h2>
          <p className="text-2xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed">
            {t('cta.lead')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/trust-center" className="px-14 py-6 bg-primary text-primary-foreground font-mono font-black tracking-[0.2em] uppercase text-lg hover:scale-105 transition-all duration-300 rounded-full">
              {t('cta.btn1')}
            </Link>
            <Link href="/projektanfrage" className="px-14 py-6 bg-transparent border-2 border-primary text-primary font-mono font-bold tracking-[0.2em] uppercase text-lg hover:bg-primary/10 transition-all duration-300 rounded-full">
              {t('cta.btn2')}
            </Link>
          </div>
        </div>
      </section>

      
    </main>
    </NextIntlClientProvider>
  );
}
