import React from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { DataTable } from "@/components/ui/DataTable";

import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { StickyScrollReveal } from "@/components/ui/StickyScrollReveal";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import { HorizontalTimeline } from "@/components/ui/HorizontalTimeline";
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
const RANGE_PDF_URL = "https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf";
const FEATURES_PDF_URL = "https://www.k-aqua.de/PDF/K-Aqua_Product_Features_en.pdf";

export default async function ProduktePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });

  const range = t.raw("range") as RangeItem[];
  const tableHead = t.raw("tableHead") as string[];
  const tableRows = t.raw("tableRows") as string[][];
  const catalogJsonLd = await getProductCatalogJsonLd(locale);

  const scrollContent = [
    {
      title: t('sticky.items.0.title'),
      description: t('sticky.items.0.desc'),
      content: <PremiumAssetPlaceholder label="PPR Pipe Cross-Section 3D" />
    },
    {
      title: t('sticky.items.1.title'),
      description: t('sticky.items.1.desc'),
      content: <PremiumAssetPlaceholder label="Flow Dynamics Simulation" />
    },
    {
      title: t('sticky.items.2.title'),
      description: t('sticky.items.2.desc'),
      content: <PremiumAssetPlaceholder label="Valve Mechanism Exploded View" />
    },
    {
      title: t('sticky.items.3.title'),
      description: t('sticky.items.3.desc'),
      content: <PremiumAssetPlaceholder label="Multilayer Pipe Structure" />
    }
  ];

  const timelineItems = [
    { year: t('timeline.items.0.year'), title: t('timeline.items.0.title'), text: t('timeline.items.0.text') },
    { year: t('timeline.items.1.year'), title: t('timeline.items.1.title'), text: t('timeline.items.1.text') },
    { year: t('timeline.items.2.year'), title: t('timeline.items.2.title'), text: t('timeline.items.2.text') },
    { year: t('timeline.items.3.year'), title: t('timeline.items.3.title'), text: t('timeline.items.3.text') },
    { year: t('timeline.items.4.year'), title: t('timeline.items.4.title'), text: t('timeline.items.4.text') },
  ];

  const tPages = await getTranslations({ locale, namespace: "pages" });
  const meta = tPages.raw("products") as string[];

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="sr-only">
        <p>{meta[0]}</p>
        <p>{meta[1]}</p>
      </div>
      <JsonLd schema={catalogJsonLd} />
      
      {/* 1. Cinematic Parallax Hero */}
      <ParallaxHero
        eyebrow={t('hero.eyebrow')}
        title={
          <>
            {t('hero.title1')} <br />
            <span className="bg-gradient-to-r from-primary to-accent-strong bg-clip-text text-transparent">
              {t('hero.title2')}
            </span>
          </>
        }
        description={t('hero.desc')}
        className="kq-band kq-band--dune"
      >
        <Button
          href={RANGE_PDF_URL}
          icon={<Download className="w-5 h-5" />}
          target="_blank"
          rel="noreferrer"
          className="min-h-[56px] px-8 text-lg"
        >
          {t("ctaCatalog") || "Gesamtkatalog Download"}
        </Button>
        <Link href="/service" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft min-h-[56px] px-8 text-lg">
          {t("ctaVideos") || "Installationsvideos ansehen"}
        </Link>
      </ParallaxHero>

      {/* 2. Apple-Style Sticky Scroll Reveal */}
      <section className="py-24 bg-background border-b border-card-border">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
          <SectionHead
            eyebrow={t('sticky.eyebrow')}
            title={t('sticky.title')}
            lead={t('sticky.lead')}
          />
        </div>
        <StickyScrollReveal content={scrollContent} />
      </section>

      {/* 3. Tech-Heavy Bento Grid */}
      <section className="py-24 bg-background-subtle kq-band kq-band--slant-b">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-16 text-center">
            <Reveal>
              <SectionHead
                eyebrow={t('bento.eyebrow')}
                title={t('bento.title')}
                lead={t('bento.lead')}
              />
            </Reveal>
          </div>
          <BentoGrid>
            <BentoGridItem
              title={t('bento.items.0.title')}
              description={t('bento.items.0.desc')}
              header={<PremiumAssetPlaceholder label="Thermal Fusion Process" className="min-h-[200px]" />}
              icon={<Flame className="w-8 h-8 text-primary mb-4" />}
              colSpan={2}
            />
            <BentoGridItem
              title={t('bento.items.1.title')}
              description={t('bento.items.1.desc')}
              header={<div className="w-full h-full min-h-[150px] bg-gradient-to-br from-card to-background flex items-center justify-center border-b border-card-border"><Shield className="w-16 h-16 text-primary/20" /></div>}
              icon={<Shield className="w-8 h-8 text-primary mb-4" />}
              colSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.2.title')}
              description={t('bento.items.2.desc')}
              header={<div className="w-full h-full min-h-[150px] bg-gradient-to-br from-card to-background flex items-center justify-center border-b border-card-border"><Activity className="w-16 h-16 text-primary/20" /></div>}
              icon={<Activity className="w-8 h-8 text-primary mb-4" />}
              colSpan={1}
            />
            <BentoGridItem
              title={t('bento.items.3.title')}
              description={t('bento.items.3.desc')}
              header={<PremiumAssetPlaceholder label="Pressure Stress Test Graph" className="min-h-[200px]" />}
              icon={<Layers className="w-8 h-8 text-primary mb-4" />}
              colSpan={2}
            />
          </BentoGrid>
        </div>
      </section>

      {/* 4. Horizontal Timeline */}
      <HorizontalTimeline
        title={t('timeline.title')}
        description={t('timeline.desc')}
        items={timelineItems}
        className="mt-12"
      />

      {/* 5. Legacy Range System & Data Tables (Original Requirement) */}
      <section className="py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center mb-16">
              <SectionHead
                eyebrow={t("sysEyebrow")}
                title={t("sysTitle")}
                lead={t("sysLead")}
              />
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
