import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/Reveal";
import { DataTable } from "@/components/ui/DataTable";
import { Layers, Wrench, Flame, Thermometer, Download } from "@/components/ui/icon";
import { constructMetadata, getProductCatalogJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const productsPageMeta = t.raw("products") as string[];
  const title = productsPageMeta[0] ?? "";
  const description = productsPageMeta[1] ?? "";
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
const RANGE_PDF_URL = "https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf";
const FEATURES_PDF_URL = "https://www.k-aqua.de/PDF/K-Aqua_Product_Features_en.pdf";

export default async function ProduktePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const range = t.raw("range") as RangeItem[];
  const tableHead = t.raw("tableHead") as string[];
  const tableRows = t.raw("tableRows") as string[][];
  const catalogJsonLd = await getProductCatalogJsonLd(locale);

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={catalogJsonLd} />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-card-border">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div className="text-start">
              <Reveal>
                <Eyebrow>{t("eyebrow")}</Eyebrow>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                  {t("title1")}{" "}
                  <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
                    {t("titleGrad")}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-lead text-muted-foreground leading-relaxed max-w-[56ch]">
                  {t("lead")}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button
                    href={RANGE_PDF_URL}
                    icon={<Download className="w-5 h-5" />}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("ctaCatalog")}
                  </Button>
                  <Link href="/service" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft min-h-[48px] px-6 text-body">
                      {t("ctaVideos")}
                  </Link>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <MediaSlot label={t("eyebrow")} aspectRatio="4/3.4" className="shadow-lift" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4-Component Range System */}
      <section className="py-20 bg-background-subtle border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-start">
            <SectionHead
              eyebrow={t("sysEyebrow")}
              title={t("sysTitle")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {range.map((r, i) => {
              const Icon = RANGE_ICONS[i] as React.ComponentType<{ className?: string }>;
              return (
                <Reveal key={r.t} delay={i * 0.08} className="h-full">
                  <Card className="h-full flex flex-col gap-4 text-start p-8">
                    <div className="w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground">
                      {r.t}
                    </h3>
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {r.d}
                    </p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dimensions & Pressure Ratings Table */}
      <section className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
            <Reveal className="text-start">
              <div className="flex flex-col items-start">
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
                  className="mt-4"
                >
                  {t("ctaFeatures")}
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.12} className="w-full">
              <Card className="p-6">
                <DataTable>
                  <thead>
                    <tr>
                      {tableHead.map((h) => (
                        <th key={h} className="text-start">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, idx) => (
                      <tr key={idx}>
                        {row.map((c, j) => (
                          <td key={j} className="text-start">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </DataTable>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
