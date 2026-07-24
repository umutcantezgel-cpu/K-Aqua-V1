/* eslint-disable react/jsx-no-literals */
import React from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
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
    title: meta[0] ?? "CO2-Rechner & Emissionsanalyse",
    description: meta[1] ?? "Präzise Berechnung der CO2-Emissionen für industrielle Rohrsysteme.",
    path: "/co2-rechner",
    locale,
  });
}

export default async function Co2RechnerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const tCo2 = await getTranslations({ locale, namespace: "co2" });
  const meta = t.raw("co2") as string[];
  const jsonLd = await getWebPageJsonLd(locale, "co2");
  
  const guideText = tCo2.has("guideText") ? tCo2.raw("guideText") as string : "";
  
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/30 relative z-20">

      <JsonLd schema={jsonLd} />
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
  );
}
