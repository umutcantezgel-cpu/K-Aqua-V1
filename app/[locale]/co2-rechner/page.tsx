/* eslint-disable react/jsx-no-literals */
import React from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { constructMetadata, getWebPageJsonLd } from '@/lib/seo/metadata';
import JsonLd from "@/components/seo/JsonLd";
import { CO2Deep } from "@/components/sections/CO2Deep";
import type { Metadata } from "next";

// Premium UI Components
import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";
import { setRequestLocale } from 'next-intl/server';

const Co2Calculator = dynamic(() => import("@/components/tools/Co2Calculator"), {
  loading: () => <div className="w-full h-[600px] animate-pulse bg-muted/50 border border-card-border rounded-xl"></div>,
});

const MaterialComparator = dynamic(() => import("@/components/tools/MaterialComparator").then(mod => mod.MaterialComparator), {
  loading: () => <div className="w-full h-[600px] animate-pulse bg-muted/50 border border-card-border rounded-xl"></div>,
});

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
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("co2") as string[];
  const jsonLd = await getWebPageJsonLd(locale, "co2");
  
  // High-End Content Data
  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden selection:bg-primary/30">
      <div className="sr-only">
        <p>{meta[0]}</p>
        <p>{meta[1]}</p>
      </div>
      <JsonLd schema={jsonLd} />

      {/* 4. The Interactive Calculators */}
      <section className="py-32 px-6 md:px-12 bg-muted/20 border-t border-card-border relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-4">
              Das <span className="text-primary">Instrument</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Füttern Sie den Algorithmus mit Ihren Projektparametern. Das System berechnet die exakte CO2-Bilanzierung Ihrer Rohrleitungsarchitektur in Echtzeit. Keine Blackbox.
            </p>
          </div>
          
          <div className="rounded-3xl border border-card-border bg-background shadow-2xl overflow-hidden p-1 md:p-8">
            <Co2Calculator />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-12 bg-background border-t border-card-border relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tight mb-4">
              Material<span className="text-muted-foreground">vergleich</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Stahl, Kupfer, Gusseisen gegen hochvernetztes PP-R. Die Zahlen lügen nicht. Vergleichen Sie die ökologische Performance auf Basis nackter, ungeschönter Daten.
            </p>
          </div>
          
          <div className="rounded-3xl border border-card-border bg-muted/30 shadow-2xl overflow-hidden p-1 md:p-8">
            <MaterialComparator />
          </div>
        </div>
      </section>

      {/* 5. Horizontal Timeline */}

      {/* 6. Legacy CO2 Deep Component */}
      <div className="relative z-20 bg-background border-t border-card-border">
        <CO2Deep />
      </div>
    </div>
  );
}
