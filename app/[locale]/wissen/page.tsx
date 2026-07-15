import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import { Link } from "@/lib/i18n/navigation";
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
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "wissen.meta" });
  return constructMetadata({
    title: t('title'),
    description: t('desc'),
    path: "/wissen",
    locale,
  });
}

export default async function WissenPage({ params }: Props) {
  const { locale } = await params;
  const articles = getAllArticles(locale);
  const t = await getTranslations({ locale, namespace: "wissen" });
  
  const siteUrl = getBaseUrl();
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "K-Aqua Engineering Knowledge Base",
    "description": "Technologische Spezifikationen, Materialwissenschaften und Systemarchitektur der K-Aqua Rohrleitungssysteme.",
    "url": `${siteUrl}/${locale}/wissen`,
  };  return (
    <>
      <JsonLd schema={webPageSchema} />
      
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
            href={`/kontakt`}
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
