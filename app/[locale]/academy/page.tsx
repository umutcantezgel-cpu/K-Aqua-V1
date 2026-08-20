import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { Academy } from "@/components/tools/Academy";
import { AcademyDeep } from "@/components/sections/AcademyDeep";
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getArticleGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("academy") as string[];
  return constructMetadata({
    title: meta[0] ?? "K-Aqua Academy | Schulung & Zertifizierung",
    description: meta[1] ?? "Zertifizierte Systemkompetenz für industrielle Rohrleitungssysteme und Schweißtechnik.",
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "academy" });
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("academy") as string[];
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/academy",
      type: "CollectionPage",
      name: meta[0] || "K-Aqua Academy | Fachwissen & Schulungen",
      description: meta[1] || "Fachwissen, Lehrvideos und Schweißzertifikate für PP-R/PP-RCT Rohrleitungssysteme.",
      breadcrumbId: `${siteUrl}/${locale}/academy#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/academy#article`,
    }),
    getArticleGraphNode({
      locale,
      path: "academy",
      headline: meta[0] || "K-Aqua Academy: Zertifizierte Schweiß- und Rohrleitungskompetenz",
      description: meta[1] || "Praxiswissen und Schulungsmodule für PP-R & PP-RCT Verbindungstechniken.",
      type: "TechArticle",
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: locale === "de" ? "Academy" : locale === "ar" ? "الأكاديمية" : "Academy", path: "/academy" },
    ]),
  ]);

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    videosHeading: t("videosHeading"),
    lead: t("lead"),
    videos: t.raw("videos") as { t: string; s: string }[],
    quizEyebrow: t("quizEyebrow"),
    quizTitle: t("quizTitle"),
    intro: t("intro"),
    start: t("start"),
    qLabel: t("qLabel"),
    quiz: t.raw("quiz") as { q: string; o: string[] }[],
    resPerfect: t("resPerfect"),
    resGood: t("resGood"),
    resLow: t("resLow"),
    retry: t("retry"),
    titlePerfect: t("titlePerfect"),
    titleGood: t("titleGood"),
  };

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ['academy', 'academyx', 'kontaktBlocks', 'kontaktForm'])}>
      <JsonLd schema={jsonLd} />
      <Academy data={data} />
      <AcademyDeep />
      
    </NextIntlClientProvider>
  );
}
