/* eslint-disable react/jsx-no-literals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { CATALOG, resolveCatalogHead } from "@/lib/data/catalog";
import type { CatalogLocale } from "@/lib/data/catalog";
import { DeepMatrix } from "@/components/ui/DeepMatrix";
import { Button } from "@/components/ui/Button";
import { ChevronDown, ArrowRight } from "@/components/ui/icon";
import { Card } from "@/components/ui/Card";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

// 1. generateStaticParams to statically generate all 79 x 3 = 237 pages
export async function generateStaticParams() {
  const locales = ["de", "en", "ar"];
  const params: { locale: string; category: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const cat of CATALOG) {
      for (const item of cat.items) {
        params.push({
          locale,
          category: cat.id,
          slug: item.slug,
        });
      }
    }
  }
  return params;
}

// ISR Strategy: These pages are entirely data-driven from build-time constants.
// dynamicParams is disabled to strictly use SSG, improving performance and security.
export const dynamicParams = false;

interface Props {
  params: Promise<{ locale: string; category: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category, slug } = await params;
  const t = await getTranslations({ locale, namespace: "catalogx" });
  
  const cat = CATALOG.find((c) => c.id === category);
  const item = cat?.items.find((i) => i.slug === slug);
  
  if (!cat || !item) {
    return { title: "Not Found" };
  }

  const catMeta = (t.raw("cats") as Record<string, { label: string; desc?: string }>)[category];
  const catLabel = catMeta?.label || category;
  
  return {
    title: `${item.title} | ${catLabel} | K-Aqua`,
    description: `${item.title} (${item.codes}). ${catMeta?.desc || ""}`,
  };
}

export default async function CatalogDetailPage({ params }: Props) {
  const { locale, category, slug } = await params;
  const t = await getTranslations({ locale, namespace: "catalogx" });
  
  const cat = CATALOG.find((c) => c.id === category);
  const item = cat?.items.find((i) => i.slug === slug);
  
  if (!cat || !item) {
    notFound();
  }

  const catMeta = (t.raw("cats") as Record<string, { label: string; desc?: string }>)[category];
  const catLabel = catMeta?.label || category;

  // Find similar items (up to 3 items from the same category)
  const similarItems = cat.items.filter((i) => i.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    sku: item.codes.split("–")[0]?.trim() || item.codes,
    category: catLabel,
    description: `${item.title} - ${item.codes}`,
    additionalProperty: item.rows.map((r, i) => ({
      "@type": "PropertyValue",
      name: `Row ${i + 1}`,
      value: r.join(", "),
    })),
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-background">
      <JsonLd schema={jsonLd} />
      
      {/* Breadcrumb & Header */}
      <section className="pt-32 pb-12 bg-background-subtle">
        <div className="mx-auto max-w-[1200px] px-6">
          <nav className="flex items-center gap-2 text-tiny text-muted-foreground mb-8">
            <Link href="/produkte" className="hover:text-primary transition-colors">
              {t("eyebrow") || "Produkte"}
            </Link>
            <ChevronDown className="w-4 h-4 rtl:rotate-180 -rotate-90" />
            <span className="text-foreground">{catLabel}</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="font-heading text-h2 font-extrabold text-foreground mb-4">
              {item.title}
            </h1>
            <p className="text-lead text-muted-foreground font-mono">
              {item.codes}
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
            
            {/* Main Content (Table) */}
            <div>
              {(item.material || item.sdr || item.series || item.pressure || item.len) && (
                <div className="mb-8 flex flex-wrap gap-3 p-6 bg-background-subtle rounded-xl border border-card-border">
                  {item.material && (
                    <span className="flex flex-col gap-1">
                      <span className="text-tiny text-muted-foreground uppercase tracking-wider">{t("materialLabel")}</span>
                      <span className="font-semibold text-foreground">{item.material}</span>
                    </span>
                  )}
                  {item.sdr && (
                    <span className="flex flex-col gap-1 border-s border-card-border ps-4">
                      <span className="text-tiny text-muted-foreground uppercase tracking-wider">{t("sdrLabel")}</span>
                      <span className="font-semibold text-foreground">{item.sdr}</span>
                    </span>
                  )}
                  {item.series && (
                    <span className="flex flex-col gap-1 border-s border-card-border ps-4">
                      <span className="text-tiny text-muted-foreground uppercase tracking-wider">{t("seriesLabel")}</span>
                      <span className="font-semibold text-foreground">{item.series}</span>
                    </span>
                  )}
                  {item.pressure && (
                    <span className="flex flex-col gap-1 border-s border-card-border ps-4">
                      <span className="text-tiny text-muted-foreground uppercase tracking-wider">{t("pressureLabel")}</span>
                      <span className="font-semibold text-foreground">{item.pressure}</span>
                    </span>
                  )}
                  {item.len && (
                    <span className="flex flex-col gap-1 border-s border-card-border ps-4">
                      <span className="text-tiny text-muted-foreground uppercase tracking-wider">{t("lenLabel")}</span>
                      <span className="font-semibold text-foreground">{item.len}</span>
                    </span>
                  )}
                </div>
              )}

              <DeepMatrix 
                head={resolveCatalogHead(item.head, locale as CatalogLocale)} 
                rows={item.rows} 
                note={locale === "de" ? item.note : undefined}
              />
            </div>

            {/* Sidebar (RFQ + Similar) */}
            <div className="flex flex-col gap-6">
              <Card className="p-6 bg-primary text-primary-foreground border-none">
                <h3 className="font-heading text-xl font-bold mb-3">Projektanfrage</h3>
                <p className="text-small text-primary-foreground/80 mb-6">
                  Fordern Sie direkt ein Angebot für <strong>{item.title}</strong> an.
                </p>
                <Button 
                  href={`/projektanfrage?item=${item.slug}`} 
                  variant="secondary"
                  className="w-full justify-center"
                  icon={<ArrowRight className="w-4 h-4 rtl:rotate-180" />}
                >
                  Zur Anfrage
                </Button>
              </Card>

              {similarItems.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    Weitere aus {catLabel}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {similarItems.map((sim) => (
                      <Link 
                        key={sim.slug} 
                        href={`/produkte/katalog/${category}/${sim.slug}`}
                        className="group flex flex-col gap-1 p-3 rounded-lg hover:bg-background-subtle transition-colors border border-transparent hover:border-card-border"
                      >
                        <span className="font-semibold text-small text-foreground group-hover:text-primary transition-colors">
                          {sim.title}
                        </span>
                        <span className="text-tiny text-muted-foreground font-mono">
                          {sim.codes}
                        </span>
                      </Link>
                    ))}
                  </div>
                </Card>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
