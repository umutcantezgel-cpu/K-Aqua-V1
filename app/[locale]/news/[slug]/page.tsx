import React from "react";
import { notFound } from "next/navigation";

export const revalidate = 86400;
import { setRequestLocale } from 'next-intl/server';
import { getNewsBySlug, getAllNews, resolveLocalized } from "@/content/news";
import { KontaktBlock } from "@/components/kontakt/KontaktBlock";
import { ArticleHero } from "@/components/ui/ArticleHero";
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
  if (newsTitle.length > 55) {
    newsTitle = newsTitle.substring(0, 52) + '...';
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
      
      {/* Redesigned Article Hero */}
      <ArticleHero post={newsItem} locale={locale} />

      {/* Article Content & Sidebar */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start">
            {/* Content Area */}
            <div className="w-full min-w-0 max-w-[800px]">
              {newsItem.content}
            </div>

            <aside className="sticky top-28 w-full flex flex-col gap-8">
              {/* Optional: We can add an Author block or TableOfContents here in the future */}
              <KontaktBlock slug="news" variant="sidebar" tone="glass" />
            </aside>
          </div>
        </div>
      </section>
      
    </div>
  );
}
