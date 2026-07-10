import React from "react";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Tag } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Fachwissen & Artikel | K-Aqua",
    description: "Tiefgreifendes Fachwissen, technische Artikel und Einblicke in moderne Rohrleitungssysteme, PP-RCT, Nachhaltigkeit und Zertifizierungen.",
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
    "name": "K-Aqua Wissensdatenbank",
    "description": "Technische Fachartikel und Dokumentationen zu K-Aqua Rohrsystemen.",
    "url": `${siteUrl}/${locale}/wissen`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-background border-b border-card-border/50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6">
            <BookOpen className="w-4 h-4" />
            <span>K-Aqua Knowledge Base</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-6 max-w-4xl">
            Wissensdatenbank & Fachartikel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Tauchen Sie tief in die Welt der modernen Rohrleitungssysteme ein. Hier finden Sie fundiertes Fachwissen, technische Analysen und Einblicke in Nachhaltigkeit und Hygiene.
          </p>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-20 bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link 
                href={`/${locale}/wissen/${article.slug}`}
                key={article.slug}
                className="group flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-8 flex flex-col flex-1 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors" />
                  
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="text-primary font-bold">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold text-foreground leading-snug mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                    {article.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-card-border flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-3 transition-all">
                      Artikel lesen <ArrowRight className="w-4 h-4" />
                    </div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-background-subtle px-2 py-1 rounded-md">
                        <Tag className="w-3 h-3" />
                        {article.tags[0]}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
