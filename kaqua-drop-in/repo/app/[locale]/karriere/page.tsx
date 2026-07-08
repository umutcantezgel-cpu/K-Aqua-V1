import React from "react";
import { getTranslations } from "next-intl/server";
import Career from "@/components/tools/Career";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { CareerDeep } from "@/components/sections/CareerDeep";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("career") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/karriere",
    locale,
  });
}

export default async function KarrierePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "career" });


  const careerData = {
    locale,
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    benEyebrow: t("benEyebrow"),
    benTitle: t("benTitle"),
    benLead: t("benLead"),
    benefits: {
      sachbezug: t.raw("benefits.sachbezug") as [string, string],
      lunch: t.raw("benefits.lunch") as [string, string],
      internet: t.raw("benefits.internet") as [string, string],
      jobrad: t.raw("benefits.jobrad") as [string, string],
      kita: t.raw("benefits.kita") as [string, string],
      vwl: t.raw("benefits.vwl") as [string, string],
    },
    resultLabel: t("resultLabel"),
    resultNote1: t("resultNote1"),
    resultNote2: t.raw("resultNote2") as string,
    resultNote3: t("resultNote3"),
    resultNote4: t("resultNote4"),
    apply: t("apply"),
    call: t("call"),
    cmEyebrow: t("cmEyebrow"),
    cmTitle: t("cmTitle"),
    cmIntro: t("cmIntro"),
    cmStart: t("cmStart"),
    qLabel: t("qLabel"),
    cmQ: t.raw("cmQ") as Array<{ q: string; o: [string, string] }>,
    resHigh: t("resHigh"),
    resMid: t("resMid"),
    resLow: t("resLow"),
    again: t("again"),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${careerData.title1} ${careerData.titleGrad}`,
    "description": careerData.lead,
    "url": `${siteUrl}/${locale}/karriere`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <Career careerData={careerData} />
      <CareerDeep />
    </>
  );
}
