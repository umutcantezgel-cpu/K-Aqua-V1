import React from "react";
import dynamic from "next/dynamic";
import { getTranslations, getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { constructMetadata } from '@/lib/seo/metadata';
import { wrapGraph, getWebPageGraphNode, getWebApplicationGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import "@/components/tools/co2-dashboard/co2-dashboard.css";

import Co2DashboardWrapper from "@/components/tools/co2-dashboard/Co2DashboardWrapper";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];
  return constructMetadata({
    title: meta[0] ?? "CO2-Rechner für Rohrleitungssysteme | K-Aqua",
    description: meta[1] ?? "Berechnen und vergleichen Sie CO2-Emissionen von PP-R/PP-RCT gegenüber metallischen Rohrleitungen.",
    path: "/co2-rechner",
    locale,
  });
}

export default async function Co2RechnerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const tCo2 = await getTranslations({ locale, namespace: "co2" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const meta = t.raw("co2") as string[];

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/co2-rechner",
      type: "WebPage",
      name: meta[0] || "CO2-Rechner | K-Aqua",
      description: meta[1] || "Berechnung der CO2-Emissionen und Umweltbilanz für industrielle Rohrsysteme.",
      breadcrumbId: `${siteUrl}/${locale}/co2-rechner#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/co2-rechner#app`,
    }),
    getWebApplicationGraphNode({
      locale,
      path: "/co2-rechner",
      name: "K-Aqua CO2 & Lifecycle Footprint Calculator",
      description: "Interaktives Tool zur Berechnung von Treibhausgasemissionen und Materialvergleichen bei Rohrleitungsinstallationen.",
      applicationCategory: "EngineeringApplication",
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav("home") || (locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home"), path: "/" },
      { name: locale === "de" ? "CO2-Rechner" : locale === "ar" ? "حاسبة الكربون" : "CO2 Calculator", path: "/co2-rechner" },
    ]),
  ]);
  
  const guideText = tCo2.has("guideText") ? tCo2.raw("guideText") as string : "";
  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={pick(messages, ['co2'])}>
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 relative z-20">

      <JsonLd schema={jsonLd} />
      <h1 className="text-h3 md:text-h2 font-heading font-extrabold text-foreground leading-[1.1] container mx-auto px-4 mt-8 mb-2">
        {meta[0] ?? "CO2-Rechner & Emissionsanalyse"}
      </h1>
      <h2 className="sr-only">{meta[1] ?? "PP-R Rohrsysteme Emissionsvergleich berechnen"}</h2>
      <Co2DashboardWrapper />
      {guideText && (
        <section className="container mx-auto px-4 py-12 border-t border-border mt-8">
          <div 
            className="prose prose-slate dark:prose-invert max-w-none text-foreground-muted text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: guideText }}
          />
        </section>
      )}
    </div>
    </NextIntlClientProvider>
  );
}
