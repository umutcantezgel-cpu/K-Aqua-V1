/* eslint-disable react/jsx-no-literals */
import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getProductsByCategory, getProductCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Package, ArrowRight, ShieldCheck, PenTool } from "lucide-react";
import { routing } from "@/lib/i18n/routing";
import { setRequestLocale } from 'next-intl/server';


interface Props {
  params: Promise<{ locale: string; category: string }>;
}

// Generate static params for categories
export function generateStaticParams() {
  const categories = getProductCategories();
  const params: { locale: string; category: string }[] = [];
  
  for (const locale of routing.locales) {
    for (const category of categories) {
      params.push({ locale, category });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: "products.seoArticle" });
  
  // Resolve category fallback
  let catKey = "fallback";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('pipes')) catKey = 'pipes';
  else if (lowerCat.includes('fitting') || lowerCat.includes('transition')) catKey = 'fittings';
  else if (lowerCat.includes('valve')) catKey = 'valves';
  else if (lowerCat.includes('tools')) catKey = 'tools';

  let title = `${category.toUpperCase()} | K-Aqua`;
  let desc = `Entdecken Sie unsere hochwertigen ${category} Produkte.`;

  try {
    if (t.has(`${catKey}.seoTitle`)) {
      title = `${t(`${catKey}.seoTitle`)} | K-Aqua`;
    }
    if (t.has(`${catKey}.seoText`)) {
      desc = t(`${catKey}.seoText`).slice(0, 150) + "...";
    }
  } catch {
    // Ignore translation misses
  }

  return constructMetadata({
    title,
    description: desc,
    path: `/produkte/${category}`,
    locale,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  const t = await getTranslations({ locale, namespace: "products.seoArticle" });
  const tNames = await getTranslations({ locale, namespace: "productNames" }).catch(() => null);

  const products = getProductsByCategory(category.toLowerCase());
  
  if (!products || products.length === 0) {
    notFound();
  }

  // Determine translation key
  let catKey = "fallback";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('pipes')) catKey = 'pipes';
  else if (lowerCat.includes('fitting') || lowerCat.includes('transition') || lowerCat.includes('weld-in-saddles')) catKey = 'fittings';
  else if (lowerCat.includes('valve')) catKey = 'valves';
  else if (lowerCat.includes('tools')) catKey = 'tools';

  // Extract SEO Texts safely
  let seoTitle = category.toUpperCase();
  let seoText = "";
  let advantages: string[] = [];

  try {
    if (t.has(`${catKey}.advTitle`)) seoTitle = t(`${catKey}.advTitle`);
    if (t.has(`${catKey}.seoText`)) seoText = t(`${catKey}.seoText`);
    if (t.has(`${catKey}.advList`)) {
      const list = t.raw(`${catKey}.advList`);
      if (Array.isArray(list)) advantages = list;
    }
  } catch {
    // Ignore translation misses
  }

  const siteUrl = getBaseUrl();
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": seoTitle,
    "description": seoText || `K-Aqua ${category} Produkte`,
    "url": `${siteUrl}/${locale}/produkte/${category}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "url": `${siteUrl}/${locale}/produkte/${category}/${p.slug}`
      }))
    }
  };

  const tc = await getTranslations({ locale, namespace: "products.category" });

  return (
    <>
      <JsonLd schema={webPageSchema} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6">
            <Package className="w-4 h-4" />
            <span>K-Aqua {category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-6 max-w-4xl">
            {seoTitle}
          </h1>
          {seoText && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
              {seoText}
            </p>
          )}

          {advantages.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
              {advantages.slice(0, 4).map((adv, idx) => (
                <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-card-border shadow-sm text-sm font-medium text-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  {adv}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-background-subtle border-t border-card-border/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              {tc("allProducts")} {"("}{products.length}{")"}
            </h2>
            <Link 
              href={`/produkte/finder?category=${encodeURIComponent(category.charAt(0).toUpperCase() + category.slice(1))}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-strong transition-colors"
            >
              {tc("openInFinder")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <Link 
                href={`/produkte/${category}/${p.slug}`}
                key={p.slug}
                className="group flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                {(() => {
                  const slugKey = `${category}_${p.slug}`.replace(/\//g, '_');
                  const localizedTitle = tNames?.has(slugKey) ? tNames(slugKey) : p.title;
                  return (
                    <>
                      <div className="aspect-[4/3] bg-background-subtle relative flex items-center justify-center p-6 border-b border-card-border/50">
                         {/* Fallback Icon if no image */}
                         <Package className="w-16 h-16 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs font-mono text-muted-foreground mb-2">
                          {p.article_codes ? String(p.article_codes).split(',')[0] : tc("artNA")}
                        </div>
                        <h3 className="text-lg font-heading font-bold text-foreground line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                          {localizedTitle}
                        </h3>
                        <div className="mt-auto flex items-center text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
                          {tc("viewDetails")} <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Deep Dive Section */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <PenTool className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            {tc("learnMoreKnowledge")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {tc("learnMoreDesc")}
          </p>
          <Link 
            href={`/wissen`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-strong transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            {tc("toKnowledgeBase")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
