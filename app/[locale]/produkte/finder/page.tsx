import React from "react";
import ProductFinder from "@/components/tools/ProductFinder";
import { FinderDeep } from "@/components/sections/FinderDeep";
import { getTranslations } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getAllProducts, getProductsIndex } from "@/lib/products";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];
  return constructMetadata({
    title: meta[0] ?? "",
    description: meta[1] ?? "",
    path: "/produkte/finder",
    locale,
  });
}

export default async function FinderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("finder") as string[];
  const products = getAllProducts().map(p => ({
    slug: p.slug,
    category: p.category,
    title: p.title,
    article_codes: p.article_codes || "",
  }));
  const indexContent = await getProductsIndex();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta[0],
    "description": meta[1],
    "url": `${siteUrl}/${locale}/produkte/finder`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <ProductFinder initialProducts={products} />
      
      {/* Dynamic SEO Catalog Index Injection */}
      {indexContent && (
        <section className="py-20 bg-background border-t border-card-border">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-h3 font-heading font-bold text-foreground mb-8 text-start">
              {t('catalogOverview') || "Katalogübersicht"}
            </h2>
            <div 
              className="
                prose dark:prose-invert max-w-none w-full
                prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-headings:mb-6
                prose-h1:text-h2 prose-h2:text-h3 prose-h3:text-h4
                prose-p:text-body prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary hover:prose-a:text-primary-strong
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:text-muted-foreground prose-li:marker:text-primary
                prose-table:w-full prose-table:text-sm prose-table:text-start prose-table:border-collapse prose-table:my-8
                prose-th:bg-card prose-th:p-4 prose-th:font-heading prose-th:font-bold prose-th:text-foreground prose-th:border-b-2 prose-th:border-primary prose-th:whitespace-nowrap
                prose-td:p-4 prose-td:border-b prose-td:border-card-border prose-td:text-muted-foreground prose-td:whitespace-nowrap
                prose-tr:transition-colors hover:prose-tr:bg-primary-soft/30
                overflow-x-auto rounded-xl border border-card-border bg-card shadow-sm p-4 sm:p-8
              "
              dangerouslySetInnerHTML={{ 
                __html: indexContent.replace(/href="\.\/([^"]+)\.md"/g, `href="/${locale}/produkte/$1"`)
              }}
            />
          </div>
        </section>
      )}

      <FinderDeep />
    </>
  );
}
