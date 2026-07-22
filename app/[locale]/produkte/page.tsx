import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { DataTable } from "@/components/ui/DataTable";

import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";

import { Layers, Wrench, Flame, Thermometer, Download } from "@/components/ui/icon";
import { Shield, Activity } from "lucide-react";

import { ProductsDeep } from "@/components/sections/ProductsDeep";
import { CatalogBrowser } from "@/components/tools/CatalogBrowser";
import { constructMetadata, getProductCatalogJsonLd } from "@/lib/seo/metadata";
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
  const productsPageMeta = t.raw("products") as string[];
  const title = productsPageMeta[0] ?? "Produkte - K-Aqua";
  const description = productsPageMeta[1] ?? "K-Aqua Premium Rohrleitungssysteme";
  return constructMetadata({
    title,
    description,
    path: "/produkte",
    locale,
  });
}

interface RangeItem {
  t: string;
  d: string;
}

const RANGE_ICONS = [Layers, Wrench, Flame, Thermometer];
const RANGE_PDF_URL = "/pdf/k-aqua-product-range-en.pdf";
const FEATURES_PDF_URL = "/pdf/k-aqua-product-features-en.pdf";

export default async function ProduktePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const range = t.raw("range") as RangeItem[];
  const tableHead = t.raw("tableHead") as string[];
  const tableRows = t.raw("tableRows") as string[][];
  const catalogJsonLd = await getProductCatalogJsonLd(locale);  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("products") as string[];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="sr-only">
        <p>{meta[0]}</p>
        <p>{meta[1]}</p>
      </div>
      <JsonLd schema={catalogJsonLd} />

      {/* 5. Legacy Range System & Data Tables (Original Requirement) */}
      <section className="py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center mx-auto max-w-[760px] mb-16 gap-3">
              <div className="mb-1">
                <span className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground">{t("sysEyebrow")}</span>
              </div>
              <h1 className="text-h1 font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-wrap-balance">
                {t("sysTitle")}
              </h1>
              <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-wrap-pretty">
                {t("sysLead")}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {range.map((r, i) => {
              return (
                <Reveal key={r.t} delay={i * 0.08} className="h-full">
                  <div className="ka-speccard h-full w-full">
                    <svg className="ka-speccard-ring" width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
                      <circle cx="42" cy="42" r="38" fill="none" stroke="var(--primary, #5B2D8C)" strokeWidth="7"></circle>
                      <circle cx="42" cy="42" r="28" fill="none" stroke="var(--accent, #3AA6C0)" strokeWidth="4"></circle>
                      <circle cx="42" cy="42" r="20" fill="var(--primary-soft, #F1E9F8)"></circle>
                      <text x="42" y="46" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="12" fill="var(--primary, #5B2D8C)">{"PPR"}</text>
                    </svg>
                    <div className="ka-speccard-body">
                      <h3>{r.t}</h3>
                      <p>{r.d}</p>
                      <div className="ka-speccard-chips">
                        <span>{"SDR 7,4"}</span><span>{"PN 20"}</span><span>{"d20–d630"}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dimensions & Pressure Ratings Table */}
      <section className="py-20 bg-background-subtle border-y border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <Reveal className="text-start">
              <div className="flex flex-col items-start sticky top-32">
                <SectionHead
                  eyebrow={t("techEyebrow")}
                  title={t("techTitle")}
                  lead={t("techLead")}
                />
                <Button
                  variant="ghost"
                  href={FEATURES_PDF_URL}
                  icon={<Download className="w-5 h-5" />}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 border border-card-border hover:border-primary bg-background"
                >
                  {t("ctaFeatures")}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="w-full">
              <Card className="p-2 sm:p-6 shadow-2xl border-primary/10">
                <div className="overflow-x-auto">
                  <DataTable>
                    <thead>
                      <tr>
                        {tableHead.map((h) => (
                          <th key={h} className="text-start font-heading uppercase tracking-wider text-xs text-muted-foreground">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted/50 transition-colors">
                          {row.map((c, j) => (
                            <td key={j} className="text-start font-mono text-sm py-4">{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </DataTable>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deep Content und Catalog Browser am Ende der Produktseite */}
      <ProductsDeep />
      <CatalogBrowser />
    </div>
  );
}
