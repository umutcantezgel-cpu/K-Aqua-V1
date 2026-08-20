import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Partner } from "@/components/sections/Partner";
import { PartnerDeep } from "@/components/sections/PartnerDeep";
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("partner") as string[];
  return constructMetadata({
    title: meta[0] ?? "Partnerschaft & Vertrieb | K-Aqua",
    description: meta[1] ?? "Werden Sie Vertriebspartner für K-Aqua PP-R & PP-RCT Rohrleitungssysteme.",
    path: "/partnerschaft",
    locale,
  });
}

export default async function PartnerschaftPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("partner") as string[];
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/partnerschaft",
      type: "WebPage",
      name: meta[0] || "Partnerschaft | K-Aqua",
      description: meta[1] || "K-Aqua B2B Partnerschaftsprogramm für Großhändler und Fachplaner.",
      breadcrumbId: `${siteUrl}/${locale}/partnerschaft#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: tNav("partner") || (locale === "de" ? "Partnerschaft" : locale === "ar" ? "الشراكة" : "Partnership"), path: "/partnerschaft" },
    ]),
  ]);
  const t = await getTranslations({ locale, namespace: "partner" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    onionAria: t("onionAria"),
    rings: t.raw("rings") as { l: string; t: string; d: string }[],
    whyEyebrow: t("whyEyebrow"),
    whyTitle: t("whyTitle"),
    cards: t.raw("cards") as { t: string; d: string }[],
  };


  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <Partner data={data} />
      <PartnerDeep />
    </>
  );
}
