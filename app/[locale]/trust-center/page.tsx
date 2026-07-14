import React from "react";
import { getTranslations } from "next-intl/server";
import { TrustCenter } from "@/components/tools/TrustCenter";
import { TrustDeep } from "@/components/sections/TrustDeep";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
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
  const meta = t.raw("trust") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/trust-center",
    locale,
  });
}

export default async function TrustCenterPage({ params }: Props) {
  const { locale } = await params;
  const jsonLd = await getWebPageJsonLd(locale, "trust");
  const t = await getTranslations({ locale, namespace: "trust" });

  const data = {
    eyebrow: t("eyebrow"),
    title1: t("title1"),
    titleGrad: t("titleGrad"),
    lead: t("lead"),
    certs: t.raw("certs") as [string, string][],
    accred: t("accred"),
    certNo: t("certNo"),
    valid: t("valid"),
    download: t("download"),
    genauEyebrow: t("genauEyebrow"),
    genauTitle: t("genauTitle"),
    genauLead: t("genauLead"),
    genau: t.raw("genau") as [string, string][],
    rfpEyebrow: t("rfpEyebrow"),
    rfpTitle: t("rfpTitle"),
    rfpLead: t("rfpLead"),
    docs: t.raw("docs") as string[],
    inPackage: t("inPackage"),
    pickLeft: t("pickLeft"),
    requestZip: t("requestZip"),
    requestBtn: t("requestBtn"),
    mailSubject: t("mailSubject"),
    mailBody: t("mailBody"),
    scope3: t("scope3"),
  };

  
  return (
    <>
      <JsonLd schema={jsonLd} />
      <TrustCenter data={data} />
      <TrustDeep />
    </>
  );
}
