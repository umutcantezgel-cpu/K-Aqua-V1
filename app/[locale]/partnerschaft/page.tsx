import React from "react";
import { getTranslations } from "next-intl/server";
import { Partner } from "@/components/sections/Partner";
import { PartnerDeep } from "@/components/sections/PartnerDeep";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("partner") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/partnerschaft",
    locale,
  });
}

export default async function PartnerschaftPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "partner");
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <Partner data={data} />
      <PartnerDeep />
    </>
  );
}
