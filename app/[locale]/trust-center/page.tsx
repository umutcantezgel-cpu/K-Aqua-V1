import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { TrustCenter } from "@/components/tools/TrustCenter";
import { TrustDeep } from "@/components/sections/TrustDeep";
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
  const meta = t.raw("trust") as string[];
  return constructMetadata({
    title: meta[0] ?? "Trust Center: Zertifikate & Compliance | K-Aqua",
    description: meta[1] ?? "Zertifizierungen (DVGW, SKZ, KIWA, ISO) und Qualitätsnachweise für K-Aqua Rohrsysteme.",
    path: "/trust-center",
    locale,
  });
}

export default async function TrustCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "trust" });
  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("trust") as string[];
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/trust-center",
      type: "AboutPage",
      name: meta[0] || "Trust Center | K-Aqua",
      description: meta[1] || "Zertifikate, Prüfberichte und Qualitätsnachweise von K-Aqua.",
      breadcrumbId: `${siteUrl}/${locale}/trust-center#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: locale === "de" ? "Trust Center" : locale === "ar" ? "مركز الثقة" : "Trust Center", path: "/trust-center" },
    ]),
  ]);

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
      <div className="sr-only">
        {locale === 'de' ? 'Trust Center: Zertifikate & Sicherheit | K-Aqua' : locale === 'ar' ? 'مركز الثقة: الشهادات والأمان | K-Aqua' : 'Trust Center: Certificates & Security | K-Aqua'}
      </div>
      <TrustCenter data={data} />
      <TrustDeep />
      
    </>
  );
}
