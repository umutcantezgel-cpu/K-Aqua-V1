import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import { 
  ArrowRight, 
  Clock, 
  Database, 
  ShieldAlert, 
  Cpu, 
  Network, 
  Activity, 
  FileDigit,
  Fingerprint
} from "lucide-react";

// Premium Components
import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "wissen.meta" });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/wissen",
    locale,
  });
}: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Fachwissen & Engineering Data | K-Aqua",
    description: "Tiefgreifendes technisches Fachwissen, systemarchitektonische Analysen und kompromisslose Ingenieursdaten zu K-Aqua Rohrsystemen.",
    path: "/wissen",
    locale,
  });
}

export default async function WissenPage({ params }: Props) {
  const { locale } = await params;
  const articles = getAllArticles();
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "K-Aqua Engineering Knowledge Base",
    "description": "Technologische Spezifikationen, Materialwissenschaften und Systemarchitektur der K-Aqua Rohrleitungssysteme.",
    "url": `${siteUrl}/${locale}/wissen`,
  };

  const scrollContent = [
    {
      title: t('scroll.items.0.title'),
      description: t('scroll.items.0.desc'),
      content: <PremiumAssetPlaceholder className="h-full w-full" label="Mikroskopische Gitterstruktur" />
    },
    {
      title: t('scroll.items.1.title'),
      description: t('scroll.items.1.desc'),
      content: <PremiumAssetPlaceholder className="h-full w-full" label="Thermisches Flussdiagramm" />
    },
    {
      title: t('scroll.items.2.title'),
      description: t('scroll.items.2.desc'),
      content: <PremiumAssetPlaceholder className="h-full w-full" label="Biofilm Resistenz Analyse" />
    },
    {
      title: t('scroll.items.3.title'),
      description: t('scroll.items.3.desc'),
      content: <PremiumAssetPlaceholder className="h-full w-full" label="NDT Ultraschall-Scan" />
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
    }
  ];

  return (
    <>
      <JsonLd schema={webPageSchema} />
      
      {/* 1. Hero Section with Parallax */}
      <ParallaxHero 
        eyebrow={t('hero.eyebrow')}
        title={
          <span className="flex flex-col gap-2">
            <span>{t('hero.title1')}</span>
            <span className="text-primary font-mono tracking-tighter">{t('hero.title2')}</span>
          </span>
        }
        description={t('hero.desc')}
        className="border-b border-card-border"
      >
        <div className="flex gap-4 items-center">
          <div className="px-6 py-3 bg-primary text-primary-foreground font-mono font-bold tracking-widest text-sm rounded-full uppercase flex items-center gap-2">
            <Activity className="w-4 h-4" />
            {t('hero.status')}
          </div>
          <div className="px-6 py-3 bg-background border border-card-border text-foreground font-mono font-bold tracking-widest text-sm rounded-full uppercase flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-muted-foreground" />
            {t('hero.clearance')}
          </div>
        </div>
      </ParallaxHero>

      {/* 2. Deep Dive: Sticky Scroll Reveal */}
      <section className="py-32 bg-background relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 mb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-6">
            <Database className="w-4 h-4" />
            <span>{t('deep.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight max-w-4xl">
            {t('deep.title1')} <br/><span className="text-muted-foreground">{t('deep.title2')}</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl font-sans leading-relaxed">
            {t('deep.desc')}
          </p>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6">
          <StickyScrollReveal content={scrollContent} />
        </div>
      </section>

      {/* 3. Horizontal Timeline: The Manufacturing Process */}
      <HorizontalTimeline 
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
        className="border-y border-card-border"
      />

      {/* 4. The Article Grid using BentoGrid */}
      <section className="py-32 bg-background-subtle relative z-10 border-t border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-card-border pb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-6">
                <FileDigit className="w-4 h-4" />
                <span>{t('grid.badge')}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold tracking-tight">
                {t('grid.title1')} <span className="text-primary">{t('grid.title2')}</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-md font-sans leading-relaxed text-balance">
              {t('grid.desc')}
            </p>
          </div>
        </div>

        <BentoGrid className="px-6">
          {articles.map((article, index) => {
            const isLarge = index === 0 || index === 3;
            
            return (
              <Link href={`/${locale}/wissen/${article.slug}`} key={article.slug} className="contents group/link">
                <BentoGridItem
                  colSpan={isLarge ? 2 : 1}
                  title={article.title}
                  description={
                    <div className="mt-4 flex flex-col gap-4">
                      <p className="line-clamp-2">{article.description}</p>
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/80 pt-4 border-t border-card-border/50">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        <span className="text-primary font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        <div className="ms-auto flex items-center gap-1 text-primary group-hover/link:translate-x-1 transition-transform">
                          <span className="font-bold uppercase tracking-widest">{t('grid.read')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  }
                  header={
                    <PremiumAssetPlaceholder 
                      className="h-64 w-full" 
                      label={`Data Node: ${article.slug.toUpperCase()}`} 
                    />
                  }
                  icon={
                    <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4 border border-primary/20 text-primary">
                      {isLarge ? <Network className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                    </div>
                  }
                  className="hover:border-primary/50"
                />
              </Link>
            );
          })}
        </BentoGrid>
      </section>
      
      {/* 5. Final CTA / Footer-like section to close the "Apple-style Scroll-Telling" */}
      <section className="py-40 bg-foreground text-background relative overflow-hidden flex items-center justify-center border-t border-card-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary),0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-8 opacity-80" />
          <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
            {t('cta.title1')} <br/><span className="text-muted">{t('cta.title2')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted/80 max-w-2xl mx-auto leading-relaxed font-sans font-light mb-12">
            {t('cta.desc')}
          </p>
          <Link 
            href={`/${locale}/kontakt`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-mono font-bold tracking-widest uppercase text-sm rounded-full hover:scale-105 transition-transform duration-300"
          >
            {t('cta.btn')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
