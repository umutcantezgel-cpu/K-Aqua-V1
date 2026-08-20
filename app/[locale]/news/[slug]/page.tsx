import React from "react";
import { notFound, redirect } from "next/navigation";

export const revalidate = 86400;
import { setRequestLocale } from 'next-intl/server';
import { getNewsBySlug, getAllNews, resolveLocalized } from "@/content/news";
import { KontaktBlock } from "@/components/kontakt/KontaktBlock";
import { ArticleHero } from "@/components/ui/ArticleHero";
import { constructMetadata } from "@/lib/seo/metadata";
import { wrapGraph, getWebPageGraphNode, getArticleGraphNode, getBreadcrumbGraphNode } from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
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
    path: `/news/${newsItem.slug}`,
    locale,
    noIndex: locale !== 'de',
  });
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const { locale, slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  setRequestLocale(locale);
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  // If accessed via an old alias slug, redirect to the canonical slug preserving search params
  if (slug !== newsItem.slug) {
    const searchParamsObj = new URLSearchParams();
    for (const [key, value] of Object.entries(resolvedSearchParams)) {
      if (typeof value === "string") {
        searchParamsObj.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => searchParamsObj.append(key, v));
      }
    }
    const queryStr = searchParamsObj.toString();
    redirect(`/${locale}/news/${newsItem.slug}${queryStr ? `?${queryStr}` : ''}`);
  }

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const title = resolveLocalized(newsItem.title, locale);
  const description = resolveLocalized(newsItem.teaser || newsItem.excerpt, locale);

  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: `/news/${newsItem.slug}`,
      type: "ItemPage",
      name: title,
      description,
      breadcrumbId: `${siteUrl}/${locale}/news/${newsItem.slug}#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/news/${newsItem.slug}#article`,
    }),
    getArticleGraphNode({
      locale,
      slug: newsItem.slug,
      headline: title,
      description,
      datePublished: newsItem.date,
      image: newsItem.coverImage ? `${siteUrl}${newsItem.coverImage}` : undefined,
      type: "TechArticle",
    }),
    getBreadcrumbGraphNode(locale, [
      { name: locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "de" ? "News" : locale === "ar" ? "الأخبار" : "News", path: "/news" },
      { name: title, path: `/news/${newsItem.slug}` },
    ]),
  ]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={jsonLd} />
      
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
