import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';
import { getNewsBySlug, getAllNews, resolveLocalized } from "@/content/news";
import { KontaktBlock } from "@/components/kontakt/KontaktBlock";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { constructMetadata, getBreadcrumbJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const allNews = getAllNews();
  return allNews.map((news) => ({
    slug: news.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    return constructMetadata({ title: "Not Found", description: "", path: "/news", locale });
  }

  let newsTitle = resolveLocalized(newsItem.title, locale);
  if (newsTitle.length > 45) {
    newsTitle = newsTitle.substring(0, 42) + '...';
  }

  return constructMetadata({
    title: newsTitle,
    description: resolveLocalized(newsItem.teaser || newsItem.excerpt, locale),
    path: `/news/${slug}`,
    locale,
    noIndex: locale !== 'de',
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://k-aqua.de");

  const breadcrumb = getBreadcrumbJsonLd(locale, [
    { name: "News", path: '/news' },
    { name: resolveLocalized(newsItem.title, locale), path: `/news/${slug}` }
  ]);
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resolveLocalized(newsItem.title, locale),
    description: resolveLocalized(newsItem.teaser || newsItem.excerpt, locale),
    datePublished: newsItem.date,
    url: `${siteUrl}/${locale}/news/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "KWT GmbH",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={[breadcrumb, articleSchema]} />
      {/* Article Hero */}
      <section className="relative overflow-hidden pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-card-border bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <div className="flex items-center gap-3 text-small font-semibold text-faint-foreground mb-4">
              <span>{newsItem.date}</span>
              <span className="rounded-full bg-primary-soft px-3 py-1 font-bold text-primary">{newsItem.tag || newsItem.category || "News"}</span>
            </div>
          </Reveal>
          <h1 className="flex flex-col gap-4 mt-2 mb-6 animate-reveal">
            <span className="text-h2 font-heading font-extrabold tracking-tight text-foreground leading-[1.15]">
              {resolveLocalized(newsItem.title, locale)}
            </span>
            <span className="text-body lg:text-lead text-muted-foreground max-w-[800px] leading-relaxed font-body font-normal">
              <strong>{resolveLocalized(newsItem.title, locale)}</strong> &ndash; {resolveLocalized(newsItem.teaser || newsItem.excerpt, locale)}
            </span>
          </h1>
        </div>
      </section>

      {/* Article Content & Sidebar */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            {/* Content Area (kein globaler prose wrapper mehr, Artikel steuern Design selbst) */}
            <div className="w-full min-w-0">
              {newsItem.content}
            </div>

            {/* Sticky Sidebar */}
            <aside className="sticky top-24 w-full">
              <KontaktBlock slug="news" variant="sidebar" tone="glass" />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
