import React from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';
import { getNewsBySlug, getAllNews } from "@/content/news";
import { KontaktBlock } from "@/components/kontakt/KontaktBlock";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { constructMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
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
    return constructMetadata({ title: "Not Found", description: "", path: "/news" });
  }

  return constructMetadata({
    title: newsItem.title,
    description: newsItem.teaser,
    path: `/news/${slug}`,
    locale,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      {/* Article Hero */}
      <section className="relative overflow-hidden pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-card-border bg-background-subtle">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-start">
          <Reveal>
            <div className="flex items-center gap-3 text-small font-semibold text-faint-foreground mb-4">
              <span>{newsItem.date}</span>
              <span className="rounded-full bg-primary-soft px-3 py-1 font-bold text-primary">{newsItem.tag}</span>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="text-h2 font-heading font-extrabold tracking-tight mt-2 mb-6 text-foreground leading-[1.15]">
              {newsItem.title}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-body lg:text-lead text-muted-foreground max-w-[800px] leading-relaxed">
              {newsItem.teaser}
            </p>
          </Reveal>
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
              <KontaktBlock slug="news-detail" variant="sidebar" tone="glass" />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
