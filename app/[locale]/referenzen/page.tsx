import React from "react";
import { getTranslations } from "next-intl/server";
import References from "@/components/sections/References";
import { RefsDeep } from "@/components/sections/RefsDeep";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("references") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/referenzen",
    locale,
  });
}

export default async function ReferenzenPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "references");
  const t = await getTranslations({ locale, namespace: "refs" });

  const referencesData = {
    locale,
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    canvasAria: t("canvasAria"),
    note: t("note"),
    projects: t.raw("projects") as Array<{
      id: string;
      lat: number;
      lon: number;
      title: string;
      d: string;
    }>,
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <References referencesData={referencesData} />
      <RefsDeep />
    </>
  );
}
