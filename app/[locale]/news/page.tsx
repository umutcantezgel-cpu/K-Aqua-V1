import React from "react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getAllNews } from "@/content/news";
import { BlogGrid } from "@/components/sections/BlogGrid";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("news") as string[];
  return constructMetadata({
    title: meta[0] ?? "K-Aqua News & Fachbeiträge",
    description: meta[1] ?? "Aktuelle Branchenberichte, Normen-Updates und Innovationen der Rohrleitungswelt.",
    path: "/news",
    locale,
  });
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "news" });
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("news") as string[];
  const tNav = await getTranslations({ locale, namespace: "nav" });
  
  const allPosts = getAllNews();
  const siteUrl = getBaseUrl().replace(/\/+$/, "");

  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/news",
      type: "CollectionPage",
      name: meta[0] || "News & Fachberichte | K-Aqua",
      description: meta[1] || "Aktuelle technische Berichte, Fallstudien und Branchenneuigkeiten.",
      breadcrumbId: `${siteUrl}/${locale}/news#breadcrumb`,
    }),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/${locale}/news#itemlist`,
      name: meta[0] || "K-Aqua Fachartikel",
      itemListElement: allPosts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteUrl}/${locale}/news/${post.slug}`,
        name: post.title,
      })),
    },
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav("news") || (locale === "de" ? "News" : locale === "ar" ? "الأخبار" : "News"), path: "/news" },
    ]),
  ]);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="flex flex-col w-full min-h-screen bg-background">
        {/* Redesigned Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24 border-b border-card-border bg-background-subtle">
          <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none opacity-60" />
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            <Reveal>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="text-h1 lg:text-[4rem] font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mt-6 mb-6">
                {t("title1")}{" "}
                <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                  {t("titleGrad")}
                </span>
              </h1>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] mx-auto font-normal">
                {t("lead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Dynamic Blog Grid */}
        <section aria-labelledby="blog-grid-heading">
          <h2 id="blog-grid-heading" className="sr-only">
            {locale === 'de' ? 'Alle Fachartikel' : locale === 'ar' ? 'جميع المقالات' : 'All Articles'}
          </h2>
          <BlogGrid posts={allPosts} locale={locale} />
        </section>

        {/* Dynamic SEO Text Blocks */}
        
        {/* Hidden SEO navigation to ensure all news pages are easily crawlable */}
        <nav aria-label="News Directory" className="sr-only">
          <ul>
            {allPosts.map((post) => (
              <li key={post.slug}>
                <a href={`/${locale}/news/${post.slug}`}>
                  {post.slug}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
