import React from "react";
import { getTranslations } from "next-intl/server";
import { Academy } from "@/components/tools/Academy";
import { AcademyDeep } from "@/components/sections/AcademyDeep";
import { constructMetadata, getArticleJsonLd } from '@/lib/seo/metadata';
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
    title: meta[0] ?? "K-Aqua Academy",
    description: meta[1] ?? "Zertifizierte Systemkompetenz für industrielle Rohrleitungssysteme.",
    path: "/academy",
    locale,
  });
}

export default async function AcademyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = await getArticleJsonLd(locale, "academy");
  const t = await getTranslations({ locale, namespace: "academy" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
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

  return (
    <>
      <JsonLd schema={jsonLd} />
      <Academy data={data} />
      <AcademyDeep />
    </>
  );
}
