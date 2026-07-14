/* eslint-disable react/jsx-no-literals, @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/products';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { ArrowRight } from '@/components/ui/icon';
import { Link } from '@/lib/i18n/navigation';
import { Shield, Package, CheckCircle, Activity, ThermometerSun } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { constructMetadata } from "@/lib/seo/metadata";
import { getProductSchema } from '@/lib/seo/schema';
import React from 'react';
import Product3DViewerWrapper from '@/components/product/Product3DViewerWrapper';
import ProductGallery from '@/components/product/ProductGallery';
import ProductFAQ from '@/components/product/ProductFAQ';
import ProductDownloads from '@/components/product/ProductDownloads';
import ProductVideo from '@/components/product/ProductVideo';
import LocalAvailability from '@/components/product/LocalAvailability';
import { setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
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
  const codes = Array.isArray(product?.article_codes) ? product.article_codes.join(", ") : (product?.article_codes || 'N/A');
  const metaDesc = uniqueDesc || `${localizedTitle} (${codes}): ${tProd('heroDesc')}`.substring(0, 160);
  
  // SEO optimization: Keep title under 55 characters to avoid truncation warning
  let displayTitle = localizedTitle;
  if (displayTitle.length > 45) {
    displayTitle = displayTitle.substring(0, 42) + '...';
  }

  return constructMetadata({
    title: `${displayTitle} | K-Aqua`,
    description: metaDesc,
    path: `/produkte/${category}/${slug}`,
    locale,
  });
}

function getDynamicSeoCategory(category: string) {
  const cat = category.toLowerCase();
  if (cat.includes("pipes")) return 'pipes';
  if (cat.includes("fittings") || cat.includes("transition") || cat.includes("weld-in-saddles")) return 'fittings';
  if (cat.includes("valves")) return 'valves';
  return 'fallback';
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { category, slug, locale } = await params;
  const product = await getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  const tSeo = await getTranslations({ locale, namespace: 'seo' });
  const tProd = await getTranslations({ locale, namespace: 'products' });
  
  const seoCat = getDynamicSeoCategory(category);
  const seoBlocks = tSeo.raw(seoCat);
  const codes = Array.isArray(product.article_codes) ? product.article_codes.join(", ") : (product.article_codes || 'N/A');

  // Dynamic Content Generation based on category
  const hasSeoContent = tProd.has(`seoArticle.${seoCat}.advTitle`);
  const dynamicAreas = hasSeoContent ? tProd(`seoArticle.${seoCat}.areas`).split(',').map((s: string) => s.trim()) : [];
  const dynamicAdvTitle = hasSeoContent ? tProd(`seoArticle.${seoCat}.advTitle`) : '';
  const dynamicAdvList = hasSeoContent ? tProd.raw(`seoArticle.${seoCat}.advList`) as string[] : [];
  const dynamicSeoText = hasSeoContent ? tProd(`seoArticle.${seoCat}.seoText`) : '';

  const slugKey = `${category}_${slug}`.replace(/\//g, '_');
  const tNames = await getTranslations({ locale, namespace: 'productNames' }).catch(() => null);
  const localizedTitle = tNames?.has(slugKey) ? tNames(slugKey) : product.title;
  const uniqueDesc = tNames?.has(`${slugKey}_desc`) ? tNames(`${slugKey}_desc`) : null;
  const finalSeoText = uniqueDesc || dynamicSeoText || localizedTitle;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://k-aqua.de");

  const schema = getProductSchema({
    name: localizedTitle,
    description: finalSeoText,
    category: product.category,
    url: `${siteUrl}/${locale}/produkte/${category}/${slug}`,
    codes: Array.isArray(product.article_codes) ? product.article_codes : [product.article_codes || 'N/A']
  });

  // Extract dimensions for dynamic SEO text generation to fix "low word count"
  let sizeText = "";
  let packText = "";
  let rowCountText = "";
  let weightText = "";
  try {
    const tableLines = product.content.split('\\n').filter(line => line.trim().startsWith('|'));
    if (tableLines.length >= 3) {
      const headers = tableLines[0].split('|').map(h => h.trim().toLowerCase()).filter(Boolean);
      const dataRows = tableLines.slice(2).map(row => row.split('|').map(c => c.trim()).filter(Boolean));
      
      const dIndex = headers.findIndex(h => h.includes('d (mm)') || h === 'd' || h.includes('size'));
      const wIndex = headers.findIndex(h => h.includes('weight') || h.includes('gewicht'));
      const pIndex = headers.findIndex(h => h.includes('pack') || h.includes('ve'));
      
      if (dIndex >= 0 && dataRows.length > 0) {
         const sizes = dataRows.map(r => parseFloat(r[dIndex].replace(',', '.'))).filter(n => !isNaN(n));
         if (sizes.length > 0) {
            const minSize = Math.min(...sizes);
            const maxSize = Math.max(...sizes);
            if (minSize !== maxSize) {
               sizeText = tProd('narrative.sizeRange', { minSize, maxSize });
            } else {
               sizeText = tProd('narrative.sizeSpecific', { minSize });
            }
         }
      }
      if (wIndex >= 0 && dataRows.length > 0) {
         const weights = dataRows.map(r => parseFloat(r[wIndex].replace(',', '.'))).filter(n => !isNaN(n));
         if (weights.length > 0) {
            weightText = tProd('narrative.weights', { minWeight: Math.min(...weights), maxWeight: Math.max(...weights) });
         }
      }
      if (pIndex >= 0 && dataRows.length > 0) {
         packText = tProd('narrative.packaging');
      }
      rowCountText = tProd('narrative.rowCount', { count: dataRows.length });
    }
  } catch (e) {
    // Ignore parse errors
  }
  
  const generatedSeoNarrative = sizeText ? `
    ${tProd('narrative.intro', { title: localizedTitle, codes: codes })}
    ${rowCountText}
    ${sizeText}
    ${weightText}
    ${packText}
    ${tProd('narrative.outro', { title: localizedTitle })}
  ` : '';

  // Enhance schema with Local SEO properties
  Object.assign(schema, {
    offers: {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": [
        { "@type": "Country", "name": "Germany" },
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Singapore" }
      ]
    }
  });

  return (
    <main className="flex flex-col w-full min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
              <Reveal delay={0.06}>
                <h1 className="text-h1 font-heading font-extrabold tracking-tight mt-4 mb-6 text-foreground leading-[1.1] text-wrap-balance">
                  {localizedTitle}
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-lead text-muted-foreground leading-relaxed max-w-[56ch]">
                  {uniqueDesc || tProd('heroDesc')}
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="flex flex-wrap gap-4 mt-10">
                  <div className="inline-flex items-center gap-3 font-mono text-sm bg-card border border-card-border px-5 py-3 rounded-xl shadow-sm text-foreground">
                    <Package className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{tProd('articleNumbers')}:</span> 
                    <span className="font-bold text-foreground">
                      {codes.length > 50 ? `${codes.substring(0, 50)}...` : codes}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
            
            {/* Interactive 3D Model or Gallery */}
            <Reveal delay={0.2} className="hidden lg:flex justify-end w-full">
              <Product3DViewerWrapper category={seoCat} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC APPLICATION AREAS & ADVANTAGES */}
      {hasSeoContent && (
      <section className="py-24 bg-background border-b border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Application Areas */}
            <Reveal>
              <h2 className="text-h3 font-heading font-bold text-foreground mb-8 text-start flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" />
                {tProd('labels.applicationAreas')}
              </h2>
              <div className="flex flex-wrap gap-3">
                {dynamicAreas.map((area: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 rounded-lg bg-card border border-card-border text-sm font-medium text-foreground shadow-sm hover:border-primary/50 hover:bg-primary-soft/10 transition-colors">
                    {area}
                  </span>
                ))}
              </div>
              
              <div className="mt-12">
                <h2 className="text-h3 font-heading font-bold text-foreground mb-6 text-start flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  {dynamicAdvTitle}
                </h2>
                <ul className="flex flex-col gap-4">
                  {dynamicAdvList.map((adv: string, idx: number) => {
                    const [boldPart, ...rest] = adv.split(':');
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-soft text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <p className="text-body text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">{boldPart}:</strong>
                          {rest.length > 0 ? rest.join(':') : ''}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Right: SEO Text & Trust */}
            <Reveal delay={0.1}>
              <Card className="p-8 h-full bg-background-subtle border-card-border flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                    {tProd('labels.technicalDescription')}
                  </h3>
                  <div className="prose dark:prose-invert text-muted-foreground leading-relaxed text-body">
                    <div className="mb-6 p-5 bg-card border border-card-border rounded-xl">
                      <p className="font-heading font-bold text-foreground mb-2 text-lg">{localizedTitle}</p>
                      <ul className="text-sm text-muted-foreground space-y-2 m-0 p-0 list-none">
                        <li className="m-0"><strong>Category:</strong> <span className="uppercase tracking-wider">{product.category}</span></li>
                        <li className="m-0"><strong>{tProd('articleNumbers')}:</strong> <span className="font-mono">{codes}</span></li>
                      </ul>
                    </div>
                    <p>{finalSeoText}</p>
                    <div className="mt-6 pt-6 border-t border-card-border">
                      <p className="text-sm">
                        {tProd('uniqueProductContext', {
                          title: localizedTitle,
                          category: product.category.toUpperCase(),
                          codes: codes || '-'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-card-border grid grid-cols-2 gap-4">
                  {Array.isArray(seoBlocks) && seoBlocks.slice(0, 2).map((block: any, idx: number) => {
                    const icons: any[] = [Shield, ThermometerSun];
                    const Icon = icons[idx % icons.length];
                    return (
                      <div key={idx} className="flex flex-col gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm text-foreground">{block.title}</h4>
                        <p className="text-xs text-muted-foreground leading-snug">{block.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>
      )}

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
                
                {/* Image Gallery */}
                <div className="my-8">
                  <ProductGallery category={product.category} />
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
                  dangerouslySetInnerHTML={{ __html: product.content }} 
                />

                {/* 4. Generated Technical SEO Narrative */}
                {generatedSeoNarrative && (
                  <div className="mt-4 p-8 bg-background-subtle border border-card-border rounded-xl">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                      {tProd('labels.technicalDescription')} - {localizedTitle}
                    </h3>
                    <div className="text-body text-muted-foreground leading-relaxed space-y-4">
                      {generatedSeoNarrative.split('\\n').map((paragraph, i) => paragraph.trim() ? <p key={i}>{paragraph}</p> : null)}
                    </div>
                  </div>
                )}
                
                {/* 5. FAQ Section */}
                <div className="mt-8">
                  <ProductFAQ category={seoCat} />
                </div>
              </div>
            </Reveal>

            {/* Sidebar / Quick Links */}
            <Reveal delay={0.12} className="sticky top-24">
              <Card className="p-6 flex flex-col gap-6 shadow-md border-card-border/60">
                <h3 className="font-heading font-bold text-lg text-foreground border-b border-card-border pb-3">
                  {tProd('certsAndNorms')}
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> DVGW {tProd('approved')}</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> SKZ {tProd('monitoring')}</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> KIWA {tProd('certified')}</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> DIN 8077 / 8078</li>
                  <li className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-primary shrink-0"/> EN ISO 15874</li>
                </ul>

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
                  <LocalAvailability locale={locale} />
                </div>

                <ProductDownloads />
              </Card>
            </Reveal>

          </div>
        </div>
      </section>
    </main>
  );
}
