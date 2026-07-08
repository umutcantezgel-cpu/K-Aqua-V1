import React from "react";
import ProductFinder from "@/components/tools/ProductFinder";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/produkte/finder",
    locale,
  });
}

export default async function FinderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta[0],
    "description": meta[1],
    "url": `${siteUrl}/${locale}/produkte/finder`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <ProductFinder />
    </>
  );
}
