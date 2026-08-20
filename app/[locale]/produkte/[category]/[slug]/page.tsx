/* eslint-disable react/jsx-no-literals */
import { notFound, redirect } from 'next/navigation';

export const revalidate = 86400;
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowRight } from '@/components/ui/icon';
import { Link } from '@/lib/i18n/navigation';
import { Shield, Package, CheckCircle, Activity, ThermometerSun } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { constructMetadata } from "@/lib/seo/metadata";
import { wrapGraph, getWebPageGraphNode, getProductGraphNode, getBreadcrumbGraphNode } from '@/lib/seo/schema';
import { getBaseUrl } from '@/lib/env';
import JsonLd from '@/components/seo/JsonLd';
import React from 'react';

import ProductGallery from '@/components/product/ProductGallery';

import ProductDownloads from '@/components/product/ProductDownloads';
import ProductVideo from '@/components/product/ProductVideo';
import LocalAvailability from '@/components/product/LocalAvailability';
import { NextIntlClientProvider } from 'next-intl';
import pick from 'lodash/pick';
import { getMessages, setRequestLocale } from 'next-intl/server';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug, locale } = await params;
  setRequestLocale(locale);
  const product = await getProductBySlug(category, slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  const seoCat = getDynamicSeoCategory(category);
  
  const tProd = await getTranslations({ locale, namespace: 'products' });
  const tNames = await getTranslations({ locale, namespace: 'productNames' }).catch(() => null);
  const slugKey = `${category}_${slug}`.replace(/\//g, '_');
  const localizedTitle = tNames?.has(slugKey) ? tNames(slugKey) : (product ? product.title : 'Product');
  const uniqueDesc = tNames?.has(`${slugKey}_desc`) ? tNames(`${slugKey}_desc`) : null;
  const codesArray: string[] = Array.isArray(product?.article_codes)
    ? product.article_codes
    : [String(product?.article_codes ?? 'N/A')];
  const codesStr = codesArray.slice(0, 3).join(", ") + (codesArray.length > 3 ? ", ..." : "");
  
  let metaDesc = uniqueDesc || "";
  if (!metaDesc) {
    metaDesc = tProd('narrative.intro', { title: localizedTitle, codes: codesStr });
  }
  if (metaDesc.length > 155) {
    metaDesc = metaDesc.substring(0, 155).trim() + '...';
  }
  
  // SEO optimization: Keep title under 65 characters to avoid truncation warning
  let displayTitle = localizedTitle;
  if (displayTitle.length > 60) {
    displayTitle = displayTitle.substring(0, 57).trim() + '...';
  }

  const articleCode = Array.isArray(product?.article_codes) ? product.article_codes[0] : product?.article_codes;
  const suffix = articleCode ? ` | Art. ${articleCode}` : '';
  const finalTitle = displayTitle; // Keep title short, remove suffix
  const finalDesc = metaDesc.endsWith(suffix) ? metaDesc : `${metaDesc}${suffix}`;

  // Handle SEO duplicate content for product variants by mapping them to a canonical variant
  let canonicalSlug = slug;
  if (
    slug === 'k-fiber-pipe-pp-r-sdr-74' || 
    slug === 'k-fiber-pipe-pp-r-sdr-9' || 
    slug === 'k-fiber-pipe-pp-r-sdr-17' ||
    slug === 'k-fiber-pipe-pp-rct-sdr-74' ||
    slug === 'k-fiber-uv-pipe-pp-r-sdr-74' ||
    slug === 'k-fiber-uv-pipe-pp-rct-sdr-74' ||
    slug === 'k-fiberclima-pipe-pp-rct-sdr-11'
  ) {
    canonicalSlug = 'k-fiber-pipe-pp-r-sdr-11';
  } else if (
    slug === 'k-pipe-pp-r-sdr-6' ||
    slug === 'k-pipe-pp-rct-sdr-74' ||
    slug === 'k-pipe-purple-pp-r-sdr-11'
  ) {
    canonicalSlug = 'k-pipe-pp-r-sdr-11';
  } else if (slug === 'reducing-tee-large-sizes') {
    canonicalSlug = 'reducing-tee';
  } else if (slug === 'elbow-45') {
    canonicalSlug = 'elbow-90';
  } else if (slug === 'elbow-45-femalemale') {
    canonicalSlug = 'elbow-90-femalemale';
  } else if (slug === 'metal-union-female-thread') {
    canonicalSlug = 'metal-union-male-thread';
  } else if (slug === 'metal-union-female-thread-yellow-brass') {
    canonicalSlug = 'metal-union-male-thread-yellow-brass';
  } else if (slug === 'flat-gasket-for-unions-pp-r') {
    canonicalSlug = 'flat-gasket';
  } else if (slug === 'adjustable-battery-female-thread') {
    canonicalSlug = 'battery-female-thread';
  } else if (slug === 'concealed-valve-chrome-heavy-part') {
    canonicalSlug = 'concealed-valve-chrome-light-part';
  } else if (
    slug === 'hand-welding-machine-2063-complete-set' || 
    slug === 'hand-welding-machine-mirror-50125'
  ) {
    canonicalSlug = 'hand-welding-machine-2032-complete-set';
  } else if (
    slug === 'pipe-cutter-2040' ||
    slug === 'pipe-cutter-50125-1'
  ) {
    canonicalSlug = 'pipe-cutter-50125';
  }

  const isVariant = canonicalSlug !== slug;

  return constructMetadata({
    title: finalTitle,
    description: finalDesc,
    path: `/produkte/${category}/${canonicalSlug}`,
    locale,
    noIndex: isVariant,
  });
}

function getDynamicSeoCategory(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("pipes")) return 'pipes';
  if (cat.includes("fittings") || cat.includes("transition") || cat.includes("weld-in-saddles")) return 'fittings';
  if (cat.includes("valves")) return 'valves';
  if (cat.includes("accessories")) return 'accessories';
  if (cat.includes("tools")) return 'tools';
  return 'fallback';
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { category, slug, locale } = await params;

  // Redirect legacy camelCase category URLs to kebab-case
  const CATEGORY_REDIRECTS: Record<string, string> = {
    transitionFittings: 'transition-fittings',
    weldInSaddles: 'weld-in-saddles',
  };
  if (CATEGORY_REDIRECTS[category]) {
    redirect(`/${locale}/produkte/${CATEGORY_REDIRECTS[category]}/${slug}`);
  }

  const product = await getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  const tProd = await getTranslations({ locale, namespace: 'products' });
  const tNames = await getTranslations({ locale, namespace: 'productNames' }).catch(() => null);
  const messages = await getMessages();
  
  const slugKey = `${category}_${slug}`.replace(/\//g, '_');
  const localizedTitle = tNames?.has(slugKey) ? tNames(slugKey) : (product ? product.title : 'Product');
  const codesArray: string[] = Array.isArray(product?.article_codes)
    ? product.article_codes
    : [String(product?.article_codes ?? 'N/A')];

  const seoCat = getDynamicSeoCategory(category);
  const seoBlocks = tSeo.has(seoCat) ? tSeo.raw(seoCat) : [];
  const codes = Array.isArray(product.article_codes) ? product.article_codes.join(", ") : (product.article_codes || 'N/A');

  // Dynamic Content Generation based on category
  const hasSeoContent = tProd.has(`seoArticle.${seoCat}.advTitle`);
  const dynamicSeoText = hasSeoContent ? (tProd.raw(`seoArticle.${seoCat}.seoText`) as string) : '';

  const uniqueDesc = tNames?.has(`${slugKey}_desc`) ? tNames(`${slugKey}_desc`) : null;
  const finalSeoText = uniqueDesc || dynamicSeoText || localizedTitle;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const productUrl = `${siteUrl}/${locale}/produkte/${category}/${slug}`;

  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const categoryNameMap: Record<string, string> = {
    pipes: tNav('pipes'),
    fittings: tNav('fittings'),
    valves: tNav('valves'),
    accessories: tNav('accessories'),
    tools: tNav('tools'),
    'weld-in-saddles': 'Weld-in Saddles',
    'transition-fittings': 'Transition Fittings',
  };

  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: `/produkte/${category}/${slug}`,
      type: "ItemPage",
      name: `${localizedTitle} | K-Aqua`,
      description: finalSeoText,
      breadcrumbId: `${productUrl}#breadcrumb`,
      mainEntityId: `${productUrl}#product`,
    }),
    getProductGraphNode({
      locale,
      category,
      slug,
      name: localizedTitle,
      description: finalSeoText,
      image: product.image ? `${siteUrl}${product.image}` : `${siteUrl}/images/logo.png`,
      articleCodes: codesArray,
      categoryName: categoryNameMap[category] || category,
    }),
    getBreadcrumbGraphNode(locale, [
      { name: tNav('products') || (locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products"), path: '/produkte' },
      { name: categoryNameMap[category] || category, path: `/produkte/${category}` },
      { name: localizedTitle, path: `/produkte/${category}/${slug}` },
    ]),
  ]);

  // Extract dimensions for dynamic SEO text generation to fix "low word count" and "duplicate content"
  const seoTextHtml = locale === 'de' ? product.seoTextDe 
                    : locale === 'ar' ? product.seoTextAr 
                    : product.seoTextEn;

  // Dynamic SEO H1 string based on locale to resolve "H1 too short" issues
  let dynamicSeoH1 = localizedTitle;
  if (locale === 'de') {
    dynamicSeoH1 = `Hochwertige PP-R/PP-RCT ${localizedTitle} für industrielle Rohrleitungssysteme`;
  } else if (locale === 'en') {
    dynamicSeoH1 = `Premium PP-R/PP-RCT ${localizedTitle} for industrial piping systems`;
  } else if (locale === 'ar') {
    dynamicSeoH1 = `عالية الجودة PP-R/PP-RCT ${localizedTitle} لأنظمة الأنابيب الصناعية`;
  }

  const hasPPR = product.title.includes("PP-R");
  let finalTitle = localizedTitle;
  if (finalTitle.length < 25 && hasPPR) {
      const catPad = locale === 'de' ? ": Fitting für Rohrsysteme" : locale === 'ar' ? ": تركيب لأنظمة الأنابيب" : ": Fitting for Piping Systems";
      finalTitle += catPad;
  }
  const exactSeoTitle = `${finalTitle} | K-Aqua`;

  return (
    <NextIntlClientProvider messages={pick(messages, ['common', 'nav'])}>
      <main className="flex flex-col w-full min-h-screen bg-background">

      <JsonLd schema={jsonLd} />
      {/* 1. HERO SECTION (PREMIUM) */}
      <section className="relative overflow-hidden py-24 lg:py-32 border-b border-card-border bg-gradient-to-b from-background to-background-subtle">
        <div className="absolute inset-0 bg-[var(--hero-wash)] pointer-events-none opacity-50" />
        {/* Abstract Geometry Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 rtl:left-0 rtl:right-auto pointer-events-none">
           <div className="absolute right-10 top-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
           <div className="absolute right-40 bottom-10 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]" />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-center">
            <div className="text-start">
              <Reveal>
                <span className="inline-flex items-center px-4 py-1.5 text-[13px] font-bold tracking-[0.1em] text-primary bg-primary-soft rounded-full uppercase mb-6 shadow-sm">
                  {product.category}
                </span>
              </Reveal>
              <h1 className="text-h1 font-heading font-extrabold tracking-tight text-foreground leading-[1.1] text-wrap-balance mt-4 mb-2 animate-reveal">
                {localizedTitle}

              </h1>
              <p className="text-lead text-muted-foreground leading-relaxed max-w-[64ch] font-normal mb-6 animate-reveal">
                {dynamicSeoH1}
              </p>
              <p className="sr-only">
                {localizedTitle} {locale === 'de' ? ' für PP-R/PP-RCT Rohrsysteme & Fittings' : locale === 'ar' ? ' لأنظمة أنابيب وتجهيزات PP-R/PP-RCT' : ' for PP-R/PP-RCT Piping Systems & Fittings'}
              </p>
              <Reveal delay={0.12}>
                {uniqueDesc ? (
                  <p className="text-lead text-muted-foreground leading-relaxed max-w-[56ch]">
                    {uniqueDesc}
                  </p>
                ) : null}
              </Reveal>
              <Reveal delay={0.18}>
                <div className="flex flex-wrap gap-4 mt-10">
                  <div className="inline-flex items-center gap-3 font-mono text-sm bg-card border border-card-border px-5 py-3 rounded-xl shadow-sm text-foreground" data-nosnippet="true">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{tProd('articleNumbers')}:</span> 
                    <span className="font-bold text-foreground">
                      {codes.length > 50 ? `${codes.substring(0, 50)}...` : codes}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Right Column: Interactive 3D CAD Preview Card */}
            <Reveal delay={0.2} className="w-full">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-card-border shadow-lift bg-card group">
                <iframe
                  src={`/api/3d-view/${product.slug}`}
                  title={`${localizedTitle} ${locale === 'de' ? '3D Vorschau' : locale === 'ar' ? 'معاينة ثلاثية الأبعاد' : '3D Preview'}`}
                  className="w-full h-full border-0 bg-card"
                  loading="eager"
                  allow="fullscreen"
                />
                <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-background/85 backdrop-blur-md border border-card-border pointer-events-none">
                  <span className="text-[11px] font-heading font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    {locale === 'de' ? '3D CAD Live-Vorschau' : locale === 'ar' ? 'معاينة ثلاثية الأبعاد مباشرة' : '3D CAD Live Preview'}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {locale === 'de' ? '360° drehbar' : locale === 'ar' ? 'دوران 360°' : '360° rotatable'}
                  </span>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>


      {/* 3. TECHNICAL DATA TABLE & SIDEBAR */}
      <section className="py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_0.25fr] gap-16 items-start">
            
            {/* Main Content Area (Table) */}
            <Reveal className="w-full overflow-hidden">
              <div className="flex flex-col gap-8">
                <SectionHead 
                  eyebrow={tProd('technicalSpecs')} 
                  title={tProd('specAndDim')} 
                />
                
                {/* Image & 3D CAD Gallery */}
                <div className="my-8">
                  <ProductGallery category={product.category} slug={product.slug} title={localizedTitle} />
                </div>
                
                {/* YouTube Video Section */}
                <div className="mb-8">
                  <ProductVideo category={seoCat} />
                </div>
                
                {/* 
                  Custom Markdown Table Styling 
                  We override standard prose to ensure tables are beautiful, scrollable, and perfectly legible.
                */}
                <div 
                  className="
                    prose dark:prose-invert max-w-none w-full
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-headings:mb-6
                    prose-h1:text-h2 prose-h2:text-h3 prose-h3:text-h4
                    prose-p:text-body prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                    prose-a:text-primary hover:prose-a:text-primary-strong
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:text-muted-foreground prose-li:marker:text-primary
                    /* Table Overrides */
                    prose-table:w-full prose-table:text-sm prose-table:text-start prose-table:border-collapse prose-table:my-8
                    prose-th:bg-card prose-th:p-4 prose-th:font-heading prose-th:font-bold prose-th:text-foreground prose-th:border-b-2 prose-th:border-primary prose-th:whitespace-nowrap
                    prose-td:p-4 prose-td:border-b prose-td:border-card-border prose-td:text-muted-foreground prose-td:whitespace-nowrap
                    prose-tr:transition-colors hover:prose-tr:bg-primary-soft/30
                    overflow-x-auto rounded-xl border border-card-border bg-card shadow-sm p-4 sm:p-8
                  "
                  dangerouslySetInnerHTML={{ __html: product.content.replace(/<h1/g, '<h2').replace(/<[/]h1>/g, '</h2>') }}
                />

                {/* 4. Individual SEO Technical Specs */}
                {seoTextHtml && (
                  <div className="mt-8 p-8 bg-background-subtle border border-card-border rounded-xl shadow-sm">
                    <h2 className="font-heading font-bold text-xl text-foreground mb-6">
                      {locale === 'de' ? 'Technische Spezifikationen & Detailwissen' : locale === 'ar' ? 'المواصفات الفنية والتفاصيل الهندسية' : 'Technical Specifications & In-Depth Details'}
                    </h2>
                    <div 
                      className="prose dark:prose-invert max-w-none w-full text-body text-muted-foreground leading-relaxed
                                 prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                                 prose-h1:text-h4 prose-h2:text-h4 prose-h3:text-lg prose-h4:text-base
                                 prose-p:mb-4
                                 prose-ul:my-4 prose-li:my-1"
                      dangerouslySetInnerHTML={{ __html: seoTextHtml }}
                    />
                  </div>
                )}
                
                {/* generic extendedProductText removed to prevent duplicate content */}
              </div>
            </Reveal>

            {/* Sidebar / Quick Links */}
            <Reveal delay={0.12} className="sticky top-24">
              <Card className="p-6 flex flex-col gap-6 shadow-md border-card-border/60" data-nosnippet="true">
                <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3">
                  {tProd('certsAndNorms')}
                </h3>
                <div data-nosnippet="true">
                  <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> DVGW {tProd('approved')}</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> SKZ {tProd('monitoring')}</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> KIWA {tProd('certified')}</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> DIN 8077 / 8078</li>
                    <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> EN ISO 15874</li>
                  </ul>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3 mt-4">
                  {tProd('quickLinks')}
                </h3>
                <div className="flex flex-col gap-3">
                  <Link href="/co2-rechner" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between group p-3 rounded-lg hover:bg-background-subtle border border-transparent hover:border-card-border">
                    {tProd('calcCo2')}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform rtl:-translate-x-0 -translate-x-2 group-hover:translate-x-0 rtl:group-hover:-translate-x-0 rtl:translate-x-2" />
                  </Link>
                  <Link href="/produkte/finder" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center justify-between group p-3 rounded-lg hover:bg-background-subtle border border-transparent hover:border-card-border">
                    {tProd('backToFinder')}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform rtl:-translate-x-0 -translate-x-2 group-hover:translate-x-0 rtl:group-hover:-translate-x-0 rtl:translate-x-2" />
                  </Link>
                </div>

                <div className="mt-2">
                  <LocalAvailability locale={locale} translations={{
                    localAvailability: tProd('localAvailability') || 'Local Availability',
                    localDesc: tProd('localDesc') || 'Find local distributors, projects, and specific water quality info in your region.',
                    allMarkets: tProd('allMarkets') || 'View all 50+ Markets'
                  }} />
                </div>

                <ProductDownloads translations={{
                  downloads: tProd('labels.downloads'),
                  range: tProd('labels.range'),
                  rangeDesc: tProd('labels.rangeDesc'),
                  cert: tProd('labels.cert'),
                  certDesc: tProd('labels.certDesc'),
                  features: tProd('labels.features'),
                  featuresDesc: tProd('labels.featuresDesc'),
                }} />
                

              </Card>
            </Reveal>

          </div>
        </div>
      </section>
    </main>
    </NextIntlClientProvider>
  );
}
