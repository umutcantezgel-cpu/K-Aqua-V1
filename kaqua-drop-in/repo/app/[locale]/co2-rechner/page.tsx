import React from "react";
import Co2Calculator from "@/components/tools/Co2Calculator";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { CO2Deep } from "@/components/sections/CO2Deep";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/co2-rechner",
    locale,
  });
}

export default async function Co2RechnerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta[0],
    "description": meta[1],
    "url": `${siteUrl}/${locale}/co2-rechner`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Co2Calculator />
      <CO2Deep />
    </>
  );
}

