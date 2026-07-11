/* eslint-disable react/jsx-no-literals */
import React from "react";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, User, Tag, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const articles = getAllArticles();
  const locales = ['de', 'en', 'ar', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'pt-BR', 'ru', 'tr', 'zh'];
  
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const article of articles) {
      params.push({ locale, slug: article.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return constructMetadata({
      title: "Artikel nicht gefunden | K-Aqua",
      description: "Der gesuchte Fachartikel konnte nicht gefunden werden.",
      path: `/wissen/${slug}`,
      locale,
    });
  }

  return constructMetadata({
    title: `${article.title} | K-Aqua Fachwissen`,
    description: article.description,
    path: `/wissen/${slug}`,
    locale,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const relatedArticles = allArticles.filter(a => a.slug !== slug).slice(0, 2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  // BlogPosting Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/${locale}/wissen/${slug}`
    },
    "headline": article.title,
    "description": article.description,
    "datePublished": article.date,
    "author": {
      "@type": "Organization",
      "name": article.author || "K-Aqua"
    },
    "publisher": {
      "@type": "Organization",
      "name": "K-Aqua",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    }
  };

  return (
    <>
      <JsonLd schema={schema} />
      
      {/* Article Header */}
      <section className="pt-32 pb-12 bg-background border-b border-card-border/50">
        <div className="max-w-[800px] mx-auto px-6">
          <Link 
            href={`/${locale}/wissen`}
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zur Übersicht
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5 bg-background-subtle px-3 py-1.5 rounded-full border border-card-border">
              <Clock className="w-4 h-4 text-primary" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 bg-background-subtle px-3 py-1.5 rounded-full border border-card-border">
              <User className="w-4 h-4 text-primary" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5 bg-primary/10 text-primary font-bold px-3 py-1.5 rounded-full border border-primary/20">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            {article.description}
          </p>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-16 bg-background">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row gap-16">
          
          {/* Markdown Content */}
          <article 
            className="
              flex-1 prose dark:prose-invert max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary hover:prose-a:text-primary-strong
              prose-strong:text-foreground prose-strong:font-bold
              prose-ul:text-lg prose-ul:text-muted-foreground prose-li:marker:text-primary
              prose-blockquote:border-s-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-e-xl prose-blockquote:text-foreground prose-blockquote:font-medium prose-blockquote:italic
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          
          {/* Sidebar / Related Context */}
          <aside className="w-full lg:w-[350px] shrink-0 flex flex-col gap-8">
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" /> Themenfelder
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-background-subtle border border-card-border px-3 py-1.5 rounded-lg text-sm text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Products Hook */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col items-start">
              <h3 className="font-heading font-bold text-foreground mb-3 text-lg">
                Die passenden Produkte
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Profitieren Sie von unseren hochmodernen PP-RCT Systemen, die exakt auf die Anforderungen der modernen Haustechnik abgestimmt sind.
              </p>
              <Link 
                href={`/${locale}/produkte/finder`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-strong transition-all"
              >
                Zum Produktfinder
              </Link>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="bg-card border border-card-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-foreground mb-4 text-lg">
                  Weitere Fachartikel
                </h3>
                <div className="flex flex-col gap-4">
                  {relatedArticles.map(rel => (
                    <Link 
                      key={rel.slug} 
                      href={`/${locale}/wissen/${rel.slug}`}
                      className="group block"
                    >
                      <h4 className="font-heading font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-snug mb-1">
                        {rel.title}
                      </h4>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 group-hover:text-foreground transition-colors">
                        Lesen <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
          </aside>
        </div>
      </section>
    </>
  );
}
