/* eslint-disable react/jsx-no-literals */
import React from "react";

export const revalidate = 86400;
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import { constructMetadata } from "@/lib/seo/metadata";
import { wrapGraph, getWebPageGraphNode, getFaqGraphNode, getBreadcrumbGraphNode } from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";
import { getProductsByCategory, getProductCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import { Link } from "@/lib/i18n/navigation";
import { Package, ArrowRight, ShieldCheck, PenTool } from "lucide-react";
import { routing, coreLocales } from "@/lib/i18n/routing";
import { setRequestLocale } from 'next-intl/server';
import { MediaSlot } from "@/components/ui/MediaSlot";
import ProductFAQ from '@/components/product/ProductFAQ';

interface Props {
  params: Promise<{ locale: string; category: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  const categories = getProductCategories();
  const params: { locale: string; category: string }[] = [];

  for (const locale of coreLocales) {
    for (const category of categories) {
      params.push({
        locale,
        category,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations({ locale, namespace: "products.seoArticle" });
  
  // Resolve category fallback
  let catKey = "fallback";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('pipes')) catKey = 'pipes';
  else if (lowerCat.includes('transition-fittings') || lowerCat.includes('transitionfittings') || lowerCat.includes('transition')) catKey = 'transitionFittings';
  else if (lowerCat.includes('fitting')) catKey = 'fittings';
  else if (lowerCat.includes('weld-in-saddles') || lowerCat.includes('saddles')) catKey = 'weldInSaddles';
  else if (lowerCat.includes('accessories')) catKey = 'accessories';
  else if (lowerCat.includes('valve')) catKey = 'valves';
  else if (lowerCat.includes('tools')) catKey = 'tools';

  let title = `${category.toUpperCase()} | K-Aqua`;
  let desc = `Entdecken Sie unsere hochwertigen ${category} Produkte.`;

  try {
    if (t.has(`${catKey}.seoTitle`)) {
      title = t(`${catKey}.seoTitle`);
      if (title.length > 55) {
        title = title.substring(0, 52) + '...';
      }
      title = `${title} | K-Aqua`;
    }
    if (t.has(`${catKey}.seoText`)) {
      desc = t(`${catKey}.seoText`).slice(0, 150) + "...";
    }
  } catch {
    // Ignore translation misses
  }

  return constructMetadata({
    title,
    description: desc,
    path: `/produkte/${category}`,
    locale,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "products.seoArticle" });
  const tNames = await getTranslations({ locale, namespace: "productNames" }).catch(() => null);

  const products = getProductsByCategory(category.toLowerCase());
  
  if (!products || products.length === 0) {
    notFound();
  }

  // Determine translation key
  let catKey = "fallback";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('pipes')) catKey = 'pipes';
  else if (lowerCat.includes('transition-fittings') || lowerCat.includes('transitionfittings') || lowerCat.includes('transition')) catKey = 'transitionFittings';
  else if (lowerCat.includes('fitting')) catKey = 'fittings';
  else if (lowerCat.includes('weld-in-saddles') || lowerCat.includes('saddles') || lowerCat.includes('einschweiss')) catKey = 'weldInSaddles';
  else if (lowerCat.includes('accessories') || lowerCat.includes('zubehoer')) catKey = 'accessories';
  else if (lowerCat.includes('valve')) catKey = 'valves';
  else if (lowerCat.includes('tools')) catKey = 'tools';

  // Extract SEO Texts safely
  let seoTitle = category.toUpperCase();
  let seoText = "";
  let advantages: string[] = [];
  
  let metaTitleExact = `${category.toUpperCase()} | K-Aqua`;

  try {
    if (t.has(`${catKey}.advTitle`)) {
      seoTitle = t(`${catKey}.advTitle`);
      if (catKey === 'fallback') {
        seoTitle = `${category.charAt(0).toUpperCase() + category.slice(1)} - ${seoTitle}`;
      }
    }
    if (t.has(`${catKey}.seoTitle`)) {
      let mt = t(`${catKey}.seoTitle`);
      if (mt.length > 55) {
        mt = mt.substring(0, 52) + '...';
      }
      metaTitleExact = `${mt} | K-Aqua`;
    }
    if (t.has(`${catKey}.seoText`)) seoText = t(`${catKey}.seoText`);
    if (t.has(`${catKey}.advList`)) {
      const list = t.raw(`${catKey}.advList`);
      if (Array.isArray(list)) advantages = list;
    }
  } catch {
    // Ignore translation misses
  }

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const categoryPageUrl = `${siteUrl}/${locale}/produkte/${category}`;

  const tc = await getTranslations({ locale, namespace: "products.category" });
  const tProd = await getTranslations({ locale, namespace: "products" });

  const messages = await getMessages();

  let rawFaqs: { q: string; a: string }[] = [];
  try {
    if (tProd.has(`seoArticle.${catKey}.faq`)) {
      rawFaqs = tProd.raw(`seoArticle.${catKey}.faq`) || [];
    }
  } catch {
    rawFaqs = [];
  }

  const faqs = Array.isArray(rawFaqs) && rawFaqs.length > 0 ? rawFaqs : [
    { q: tProd('labels.faqFallbackQ1') || "Was sind die Hauptvorteile?", a: tProd('labels.faqFallbackA1') || "Das System bietet extreme Langlebigkeit, Korrosionsbeständigkeit und hervorragende hygienische Eigenschaften für Trinkwasser." },
    { q: tProd('labels.faqFallbackQ2') || "Ist das Material umweltfreundlich?", a: tProd('labels.faqFallbackA2') || "Ja, PP-RCT ist zu 100% recycelbar und hat einen sehr geringen CO2-Fußabdruck im Vergleich zu Metallrohren." },
    { q: tProd('labels.faqFallbackQ3') || "Wie erfolgt die Installation?", a: tProd('labels.faqFallbackA3') || "Die Installation erfolgt sicher und leckagefrei durch Polyfusion-Schweißen." }
  ];

  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: `/produkte/${category}`,
      type: "CollectionPage",
      name: seoTitle,
      description: seoText || `K-Aqua ${category} Produkte`,
      breadcrumbId: `${categoryPageUrl}#breadcrumb`,
      mainEntityId: `${categoryPageUrl}#itemlist`,
    }),
    {
      "@type": "ItemList",
      "@id": `${categoryPageUrl}#itemlist`,
      name: seoTitle,
      itemListElement: products.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteUrl}/${locale}/produkte/${category}/${p.slug}`,
      })),
    },
    getFaqGraphNode(
      faqs.map((f) => ({ question: f.q, answer: f.a })),
      categoryPageUrl
    ),
    getBreadcrumbGraphNode(locale, [
      { name: locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products", path: "/produkte" },
      { name: seoTitle, path: `/produkte/${category}` },
    ]),
  ]);

  const faqTitle = tProd('labels.faqTitle') || "Häufig gestellte Fragen (FAQ)";

  return (
    <NextIntlClientProvider messages={pick(messages, 'common', 'nav')}>
      <JsonLd schema={jsonLd} />

      {/* Category Header with Breadcrumbs & Title */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-start">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase mb-6">
              <Package className="w-4 h-4" />
              <span>K-Aqua {category}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight mb-6 max-w-4xl">
              {seoTitle}
            </h1>
            {seoText && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-10">
                <span className="font-bold text-foreground mr-1">{seoTitle} –</span> {seoText}
              </p>
            )}

            {advantages.length > 0 && (
              <div className="flex flex-wrap gap-3 max-w-4xl">
                {advantages.slice(0, 4).map((adv, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-card-border shadow-sm text-sm font-medium text-foreground">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    {adv}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-full">
            <MediaSlot 
              alt={seoTitle} 
              aspectRatio="4/3" 
              label={`K-Aqua ${seoTitle}`} 
              className="shadow-md"
              priority
            />
          </div>
        </div>
      </section>

      {/* Specialized Feature Showcase for Weld-In Saddles */}
      {catKey === 'weldInSaddles' && (() => {
        const saddleContent = {
          de: {
            eyebrow: 'TECHNOLOGIE-VORTEIL',
            title: 'Einschweißsättel: Bis zu 50 % Zeit- und Kostenvorteil gegenüber T-Stücken',
            lead: 'Nachträgliche Steigstrang-Abzweige oder Verteileranschlüsse ohne Auftrennen der Hauptrohrleitung.',
            s1Title: 'Stufenbohrung',
            s1Desc: 'Hauptrohr an der gewünschten Stelle mit dem K-Aqua Spezial-Stufenbohrer gratfrei anbohren.',
            s2Title: '260 °C Konkav-Erwärmung',
            s2Desc: 'Mit dem passenden Sattel-Schweißwerkzeug Bohrungsrand und Sattelfuß zeitgleich auf Schmelztemperatur bringen.',
            s3Title: 'Homogene Verschmelzung',
            s3Desc: 'Sattel axial andrücken. Nach 30 Sekunden ist der Abzweig dauerhaft und absolut unlösbar verschweißt.',
          },
          en: {
            eyebrow: 'TECHNOLOGY ADVANTAGE',
            title: 'Weld-in Saddles: Up to 50% Time and Cost Savings vs. Standard Tees',
            lead: 'Subsequent riser branches or manifold connections without cutting into the main distribution pipe.',
            s1Title: 'Step Drilling',
            s1Desc: 'Drill a burr-free branch hole in the main pipe using the K-Aqua precision step drill.',
            s2Title: '260 °C Concave Heating',
            s2Desc: 'Heat both the drilled hole perimeter and saddle base simultaneously using the matching saddle welding tool.',
            s3Title: 'Homogeneous Fusion',
            s3Desc: 'Press the saddle axially into place. Within 30 seconds, the branch forms a permanent, leak-proof fused joint.',
          },
          ar: {
            eyebrow: 'الميزة التكنولوجية',
            title: 'سروج اللحام: توفير يصل إلى 50% في الوقت والتكلفة مقارنة بالوصلات الثلاثية T',
            lead: 'تنفيذ تفريعات صاعدة أو توصيلات توزيع لاحقة دون الحاجة لقطع خط الأنابيب الرئيسي.',
            s1Title: 'الحفر المتدرج',
            s1Desc: 'حفر ثقب التفريع في الأنبوب الرئيسي بدقة وبدون زوائد باستخدام مثقاب K-Aqua المتدرج.',
            s2Title: 'تسخين مقعر عند 260 °م',
            s2Desc: 'تسخين حواف الثقب وقاعدة السرج في نفس الوقت لدرجة حرارة الانصهار باستخدام أداة لحام السرج المخصصة.',
            s3Title: 'اندماج متجانس',
            s3Desc: 'ضغط السرج محورياً في موضعه. خلال 30 ثانية تتشكل وصلة ملحومة دائمة وغير قابلة للانفصال.',
          },
        };
        const sc = saddleContent[locale as 'de' | 'en' | 'ar'] || (locale.startsWith('ar') ? saddleContent.ar : locale === 'de' ? saddleContent.de : saddleContent.en);

        return (
          <section className="py-16 bg-background-subtle border-y border-card-border">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="max-w-3xl mb-8">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold uppercase tracking-wider mb-2">
                  {sc.eyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {sc.title}
                </h2>
                <p className="text-muted-foreground text-sm mt-2">
                  {sc.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-card border border-card-border shadow-sm">
                  <div className="text-2xl font-heading font-extrabold text-primary mb-2">01</div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-1">{sc.s1Title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sc.s1Desc}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-card-border shadow-sm">
                  <div className="text-2xl font-heading font-extrabold text-primary mb-2">02</div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-1">{sc.s2Title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sc.s2Desc}
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-card-border shadow-sm">
                  <div className="text-2xl font-heading font-extrabold text-primary mb-2">03</div>
                  <h3 className="text-base font-heading font-bold text-foreground mb-1">{sc.s3Title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {sc.s3Desc}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Products Grid */}
      <section className="py-20 bg-background-subtle border-t border-card-border/50">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              {tc("allProducts")} {"("}{products.length}{")"}
            </h2>
            <Link 
              href={`/produkte/finder?category=${encodeURIComponent(category.charAt(0).toUpperCase() + category.slice(1))}`}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-strong transition-colors"
            >
              {tc("openInFinder")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div 
                key={p.slug}
                className="group flex flex-col bg-card border border-card-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 relative"
              >
                {(() => {
                  const slugKey = `${category}_${p.slug}`.replace(/\//g, '_');
                  const localizedTitle = tNames?.has(slugKey) ? tNames(slugKey) : p.title;
                  return (
                    <>
                      <div className="aspect-[4/3] bg-background-subtle relative flex items-center justify-center border-b border-card-border/50 overflow-hidden">
                        <Package className="w-16 h-16 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="text-xs font-mono text-muted-foreground mb-2">
                          {p.article_codes ? String(p.article_codes).split(',')[0] : tc("artNA")}
                        </div>
                        <h3 className="text-lg font-heading font-bold text-foreground line-clamp-2 mb-4 group-hover:text-primary transition-colors">
                          <Link href={`/produkte/${category}/${p.slug}`} className="before:absolute before:inset-0 focus-visible:outline-none">
                            {localizedTitle}
                          </Link>
                        </h3>
                        <div className="mt-auto flex items-center text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all w-full" aria-hidden="true">
                          <span className="truncate">{tc("viewDetails")}: {localizedTitle}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background-subtle border-t border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <ProductFAQ title={faqTitle} faqs={faqs} />
        </div>
      </section>

      {/* Category Guide Section */}
      {t.has(`${catKey}.guideText`) && (
        <section id="category-guide" className="py-20 bg-background border-t border-card-border scroll-mt-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-4xl mx-auto rounded-2xl bg-card border border-card-border p-8 md:p-12 shadow-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                <span>{locale === 'de' ? 'FACHWISSEN & TECHNISCHER LEITFADEN' : locale === 'ar' ? 'الخبرة الفنية والدليل الهندسي' : 'TECHNICAL EXPERTISE & SPECIFICATION GUIDE'}</span>
              </div>
              <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground">
                <div dangerouslySetInnerHTML={{ __html: String(t.raw(`${catKey}.guideText`)).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>') }} />
              </article>
            </div>
          </div>
        </section>
      )}
      
      {/* Deep Dive Section */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <PenTool className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            {tc("learnMoreKnowledge")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {tc("learnMoreDesc")} {locale === 'de' ? `Vertiefen Sie Ihr Wissen über ${seoTitle} und deren Einsatzmöglichkeiten.` : locale === 'ar' ? `عمّق معرفتك بـ ${seoTitle} واستخداماتها.` : `Deepen your knowledge about ${seoTitle} and their applications.`}
          </p>
          <Link 
            href={`/academy`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary-strong transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            {tc("toKnowledgeBase")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </NextIntlClientProvider>
  );
}
