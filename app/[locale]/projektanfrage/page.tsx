import React from "react";
import { getTranslations } from "next-intl/server";
import RfqWizard from "@/components/tools/RfqWizard";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("rfq") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/projektanfrage",
    locale,
  });
}

export default async function ProjektanfragePage({ params }: Props) {
  const { locale } = await params;
  const tRfq = await getTranslations({ locale, namespace: "rfq" });

  const rfqData = {
    locale,
    eyebrow: tRfq("eyebrow"),
    title1: tRfq("title1"),
    titleGrad: tRfq("titleGrad"),
    lead: tRfq("lead"),
    steps: tRfq.raw("steps") as string[],
    types: tRfq.raw("types") as Array<{ t: string; d: string }>,
    fType: tRfq("fType"),
    fDims: tRfq("fDims"),
    fMeters: tRfq("fMeters"),
    dimsHint: tRfq("dimsHint"),
    fTime: tRfq("fTime"),
    fRegion: tRfq("fRegion"),
    timelines: tRfq.raw("timelines") as string[],
    regions: tRfq.raw("regions") as string[],
    fName: tRfq("fName"),
    fCompany: tRfq("fCompany"),
    fEmail: tRfq("fEmail"),
    fPhone: tRfq("fPhone"),
    fMsg: tRfq("fMsg"),
    privacy: tRfq("privacy"),
    back: tRfq("back"),
    next: tRfq("next"),
    send: tRfq("send"),
    mailSubject: tRfq("mailSubject"),
    promise: tRfq.raw("promise") as string[],
    doneTitle: tRfq("doneTitle"),
    doneText: tRfq("doneText"),
    doneBack: tRfq("doneBack"),
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${rfqData.title1} ${rfqData.titleGrad}`,
    "description": rfqData.lead,
    "url": `${siteUrl}/${locale}/projektanfrage`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <RfqWizard rfqData={rfqData} />
    </>
  );
}
