import React from "react";
import { getTranslations, setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import { TrustCenter } from "@/components/tools/TrustCenter";
import { TrustDeep } from "@/components/sections/TrustDeep";
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode, getFaqGraphNode } from '@/lib/seo/schema';
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
  // Dieselbe Quelle, aus der TrustDeep seinen sichtbaren FAQ-Block speist.
  const tTrustDeep = await getTranslations({ locale, namespace: "trustx" });
  const deepFaq = (tTrustDeep.raw("faq") ?? []) as Array<{ q: string; a: string }>;
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/trust-center",
      type: "AboutPage",
      name: meta[0] || "Trust Center | K-Aqua",
      description: meta[1] || "Zertifikate, Prüfberichte und Qualitätsnachweise von K-Aqua.",
      breadcrumbId: `${siteUrl}/${locale}/trust-center#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
      // TrustDeep rendert weiter unten sechs Frage-Antwort-Paare sichtbar aus,
      // die bislang nicht ausgezeichnet waren.
      hasPartIds: deepFaq.length > 0 ? [`${siteUrl}/${locale}/trust-center#faq`] : undefined,
    }),
    getFaqGraphNode(
      deepFaq.map((f) => ({ question: f.q, answer: f.a })),
      `${siteUrl}/${locale}/trust-center`
    ),
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
      {/* TrustCenter zieht die vier `bim*`-Texte über `useTranslations("trust")`
          (TrustCenter.tsx:73) und nicht über die `data`-Prop. Bis das Layout den
          ganzen Katalog auslieferte, fiel das nicht auf. Jetzt liefert die Seite
          den Namensraum selbst — dort, wo er gebraucht wird. */}
      <NextIntlClientProvider messages={pick(await getMessages(), ['trust'])}>
        <TrustCenter data={data} />
      </NextIntlClientProvider>
      <TrustDeep />

    </>
  );
}
