import React from "react";
import { getTranslations, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import pick from "lodash/pick";
import { Link } from "@/lib/i18n/navigation";
import LiquidMagneticButton from "@/components/ui/LiquidMagneticButton";
import { Card } from "@/components/ui/Card";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { DataTable } from "@/components/ui/DataTable";

import { PremiumAssetPlaceholder } from "@/components/ui/PremiumAssetPlaceholder";

import { Layers, Wrench, Flame, Thermometer, Download } from "@/components/ui/icon";
import { Shield, Activity, ArrowRight } from "lucide-react";

import { ProductsDeep } from "@/components/sections/ProductsDeep";
import type { ProductsDeepTranslations } from "@/components/sections/ProductsDeep";
import { CatalogBrowser } from '@/components/tools/CatalogBrowser';
import type { CatalogBrowserTranslations } from '@/components/tools/CatalogBrowser';
import { constructMetadata } from "@/lib/seo/metadata";
import { wrapGraph, getWebPageGraphNode, getBreadcrumbGraphNode } from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
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
  setRequestLocale(locale);
  const [t, tNames, tPages, messages] = await Promise.all([
    getTranslations("products"),
    getTranslations("productNames"),
    getTranslations({ locale, namespace: "pages" }),
    getMessages()
  ]);

  const meta = tPages.raw("products") as string[];

  // Der productsx-Namespace liefert die strukturierten Daten für ProductsDeep.
  const productsx = (messages as Record<string, unknown>).productsx as
    Partial<ProductsDeepTranslations> | undefined;
  const catalogx = (messages as Record<string, unknown>).catalogx as
    Partial<CatalogBrowserTranslations> | undefined;

  const rawRange = t.raw("range");
  const range = Array.isArray(rawRange) ? rawRange as RangeItem[] : [];
  const rawTableHead = t.raw("tableHead");
  const tableHead = Array.isArray(rawTableHead) ? rawTableHead as string[] : [];
  const rawTableRows = t.raw("tableRows");
  const tableRows = Array.isArray(rawTableRows) ? rawTableRows as string[][] : [];
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/produkte",
      type: "CollectionPage",
      name: meta[0] || "K-Aqua Produkte | Premium PP-R & PP-RCT Rohrsysteme",
      description: meta[1] || "K-Aqua Produktkatalog: Rohre, Fittings, Ventile und Schweißwerkzeuge.",
      breadcrumbId: `${siteUrl}/${locale}/produkte#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/produkte#itemlist`,
    }),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/${locale}/produkte#itemlist`,
      name: t("techTitle") || "K-Aqua Produktsortiment",
      itemListElement: range.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "Product",
          name: item.t,
          description: item.d,
          brand: { "@id": `${siteUrl}/#organization` },
          url: `${siteUrl}/${locale}/produkte`,
        },
      })),
    },
    getBreadcrumbGraphNode(locale, [
      { name: locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "de" ? "Produkte" : locale === "ar" ? "المنتجات" : "Products", path: "/produkte" },
    ]),
  ]);

  return (
    <NextIntlClientProvider messages={pick(messages, ['catalog', 'catalogNotes', 'catalogExtra'])}>
    <div className="flex flex-col w-full min-h-screen bg-background">
      <JsonLd schema={jsonLd} />


      {/* Visual 7-Category Directory Navigation */}
      {(() => {
        const dirData = {
          de: {
            kicker: 'K-Aqua Gesamtsortiment',
            title: 'Premium Rohrleitungssysteme & Zubehör',
            lead: 'Wählen Sie Ihre Produktkategorie für detaillierte technische Spezifikationen, Maßtabellen, Schweißparameter und CAD-/BIM-Ausschreibungstexte.',
            categories: [
              {
                id: 'pipes',
                title: 'Rohre & Mehrschichtsysteme',
                desc: 'K-Fiber, K-Stabi, K-Aqua UV und Vollkunststoff PP-R / PP-RCT (d20–d630 mm).',
                href: '/produkte/pipes',
                badge: 'd20–d630 mm',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'fittings',
                title: 'Formteile & Fittings',
                desc: 'Muffen, 45°/90° Bögen, T-Stücke, Reduzierungen, Flansche und E-Muffen.',
                href: '/produkte/fittings',
                badge: 'PN 25 Belastbar',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'transition-fittings',
                title: 'Übergangsformteile',
                desc: 'DZR-Messing (CW617N) & Edelstahl V4A Einsätze mit Anti-Torsions-Hexagon.',
                href: '/produkte/transition-fittings',
                badge: '> 300 Nm Festigkeit',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'valves',
                title: 'Ventile & Absperrorgane',
                desc: 'Direkt verschweißbare Kugelhähne, Unterputz-, Schrägsitz- und Rückschlagventile.',
                href: '/produkte/valves',
                badge: 'Full Bore / 100% Dicht',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'tools',
                title: 'Werkzeuge & Schweißmaschinen',
                desc: '260 °C Muffenschweißgeräte, PTFE-Aufsätze, Rohrscheren und Schälwerkzeuge.',
                href: '/produkte/tools',
                badge: 'DVS 2207 Konform',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'weld-in-saddles',
                title: 'Einschweißsättel',
                desc: 'Nachträgliche Abzweige für Steigstränge ohne Leitungsauftrennung.',
                href: '/produkte/weld-in-saddles',
                badge: '50% Zeitersparnis',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'accessories',
                title: 'Zubehör & Systemkomponenten',
                desc: 'Rohrhalterungen, Flanschdichtungen, Bohrer und Reparatursets.',
                href: '/produkte/accessories',
                badge: 'Systemzubehör',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
            ]
          },
          en: {
            kicker: 'K-Aqua Full Product Range',
            title: 'Premium Piping Systems & Accessories',
            lead: 'Select your product category for detailed technical specifications, dimension tables, welding parameters, and CAD/BIM tender specifications.',
            categories: [
              {
                id: 'pipes',
                title: 'Pipes & Multilayer Systems',
                desc: 'K-Fiber, K-Stabi, K-Aqua UV, and monolithic PP-R / PP-RCT (d20–d630 mm).',
                href: '/produkte/pipes',
                badge: 'd20–d630 mm',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'fittings',
                title: 'Fittings & Socket Components',
                desc: 'Sockets, 45°/90° elbows, tees, reducers, flanges, and electrofusion fittings.',
                href: '/produkte/fittings',
                badge: 'PN 25 Rated',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'transition-fittings',
                title: 'Transition Fittings',
                desc: 'DZR brass (CW617N) & V4A stainless steel inserts with anti-torsion hexagon.',
                href: '/produkte/transition-fittings',
                badge: '> 300 Nm Torque Strength',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'valves',
                title: 'Valves & Flow Controls',
                desc: 'Directly weldable ball valves, concealed, globe, and check valves.',
                href: '/produkte/valves',
                badge: 'Full Bore / 100% Tight',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'tools',
                title: 'Tools & Fusion Machinery',
                desc: '260 °C socket fusion kits, PTFE dies, pipe shears, and peeling tools.',
                href: '/produkte/tools',
                badge: 'DVS 2207 Compliant',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'weld-in-saddles',
                title: 'Weld-in Saddles',
                desc: 'Retrofit branch saddles for risers without cutting into main distribution pipes.',
                href: '/produkte/weld-in-saddles',
                badge: '50% Time Savings',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'accessories',
                title: 'Accessories & Components',
                desc: 'Pipe brackets, flange gaskets, precision drill bits, and repair plugs.',
                href: '/produkte/accessories',
                badge: 'System Accessories',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
            ]
          },
          ar: {
            kicker: 'مجموعة منتجات K-Aqua الكاملة',
            title: 'أنظمة الأنابيب الممتازة وملحقاتها',
            lead: 'اختر فئة المنتج للاطلاع على المواصفات الفنية التفصيلية وجداول المقاسات ومعايير اللحام ونصوص مواصفات CAD/BIM.',
            categories: [
              {
                id: 'pipes',
                title: 'الأنابيب والأنظمة متعددة الطبقات',
                desc: 'أنابيب K-Fiber و K-Stabi و K-Aqua UV وأنابيب PP-R / PP-RCT الصلبة (d20–d630 مم).',
                href: '/produkte/pipes',
                badge: 'd20–d630 مم',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'fittings',
                title: 'الوصلات وقطع الربط',
                desc: 'جلب، أكواع 45°/90°، وصلات T، مخفضات، فلنجات، ووصلات اللحام الكهربائي.',
                href: '/produkte/fittings',
                badge: 'تحمل ضغط PN 25',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'transition-fittings',
                title: 'وصلات التحويل المعدنية',
                desc: 'نحاس DZR عالي المقاومة (CW617N) واستانلس ستيل V4A بهيكل سداسي لمنع الالتواء.',
                href: '/produkte/transition-fittings',
                badge: 'عزم دوران > 300 نيوتن.متر',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'valves',
                title: 'الصمامات وأجهزة التحكم في التدفق',
                desc: 'صمامات كروية للحام المباشر، صمامات مدفونة، صمامات مائلة، وصمامات عدم رجوع.',
                href: '/produkte/valves',
                badge: 'قطر تدفق كامل / إحكام 100%',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'tools',
                title: 'أدوات ومكائن اللحام',
                desc: 'مكائن لحام جلب عند 260 °م، قوالب PTFE، مقصات أنابيب وأدوات تقشير.',
                href: '/produkte/tools',
                badge: 'مطابق لمعيار DVS 2207',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
              {
                id: 'weld-in-saddles',
                title: 'سروج اللحام',
                desc: 'تفريعات لاحقة للأعمدة الصاعدة دون الحاجة لقطع خط الأنابيب الرئيسي.',
                href: '/produkte/weld-in-saddles',
                badge: 'توفير 50% من الوقت',
                accent: 'bg-accent/10 text-accent border-accent/20',
              },
              {
                id: 'accessories',
                title: 'الإكسسوارات ومكونات النظام',
                desc: 'مرابط تثبيت الأنابيب، حشيات الفلنجات، رؤوس الثقب وأطقم الإصلاح.',
                href: '/produkte/accessories',
                badge: 'إكسسوارات النظام',
                accent: 'bg-primary/10 text-primary border-primary/20',
              },
            ]
          }
        };
        const currentDir = dirData[locale as 'de' | 'en' | 'ar'] || (locale.startsWith('ar') ? dirData.ar : locale === 'de' ? dirData.de : dirData.en);

        return (
          <section className="pt-28 pb-16 bg-background border-b border-card-border">
            <div className="max-w-[1200px] mx-auto px-6">
              <div className="flex flex-col items-center text-center mx-auto max-w-[760px] mb-12">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                  <Shield className="w-3.5 h-3.5" />
                  {currentDir.kicker}
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-foreground tracking-tight">
                  {currentDir.title}
                </h1>
                <p className="text-lead text-muted-foreground mt-4 leading-relaxed max-w-[62ch]">
                  {currentDir.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentDir.categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.href}
                    className="group flex flex-col justify-between p-6 rounded-2xl bg-card border border-card-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${cat.accent}`}>
                          {cat.badge}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl-flip transition-all" />
                      </div>
                      <h2 className="text-lg font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* 5. Legacy Range System & Data Tables */}
      <section className="py-24 bg-background">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="flex flex-col items-center text-center mx-auto max-w-[760px] mb-16 gap-3">
              <div className="mb-1">
                <span className="font-heading text-sm font-bold tracking-widest uppercase text-muted-foreground">{t("sysEyebrow")}</span>
              </div>
              <h2 className="text-h1 font-heading font-extrabold text-foreground tracking-tight leading-[1.08] text-balance mt-1 mb-4">
                {t("sysTitle")}
              </h2>
              <p className="text-lead text-muted-foreground max-w-[62ch] text-pretty font-normal mb-2">
                {t.has("seoH1") ? t("seoH1") : "K-Aqua Produkte: Premium PP-R Rohrsysteme, Formteile und Armaturen"}
              </p>
              <p className="text-lead text-muted-foreground max-w-[62ch] mt-1 text-pretty">
                {t("sysLead")}
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pb-8 md:pb-0">
            {range.map((r, i) => {
              return (
                <Card key={i} className="flex flex-col p-8 w-full hover:shadow-diffuse transition-shadow">
                  <div className="ka-speccard h-full w-full">
                    <svg className="ka-speccard-ring" width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
                      <circle cx="42" cy="42" r="38" fill="none" stroke="var(--primary, #5B2D8C)" strokeWidth="7"></circle>
                      <circle cx="42" cy="42" r="28" fill="none" stroke="var(--accent, #3AA6C0)" strokeWidth="4"></circle>
                      <circle cx="42" cy="42" r="20" fill="var(--primary-soft, #F1E9F8)"></circle>
                      <text x="42" y="46" textAnchor="middle" fontFamily="Outfit, sans-serif" fontWeight="800" fontSize="12" fill="var(--primary, #5B2D8C)">{"PPR"}</text>
                    </svg>
                    <div className="ka-speccard-body">
                      <div className="font-heading font-bold text-lg text-foreground mb-2">{r.t}</div>
                      <p>{r.d}</p>
                      <div className="ka-speccard-chips">
                        <span>{"SDR 7,4"}</span><span>{"PN 20"}</span><span>{"d20–d630"}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dimensions & Pressure Ratings Table */}
      <section className="py-20 bg-background-subtle border-y border-card-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-y-10 lg:gap-12 items-start">
            <Reveal className="text-start">
              <div className="flex flex-col items-start sticky top-32">
                <SectionHead
                  eyebrow={t("techEyebrow")}
                  title={t("techTitle")}
                  lead={t("techLead")}
                />
                <LiquidMagneticButton
                  fill="flood"
                  variant="ghost"
                  href={FEATURES_PDF_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 border border-card-border hover:border-primary bg-background"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {t("ctaFeatures")}
                </LiquidMagneticButton>
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
      <ProductsDeep translations={{
        pipes: productsx?.pipes || [],
        anchors: productsx?.anchors || [],
        matHead: productsx?.matHead || [],
        matRows: productsx?.matRows || [],
        normHead: productsx?.normHead || [],
        norms: productsx?.norms || [],
        faq: productsx?.faq || [],
        dimHead: productsx?.dimHead || [],
        pipesEyebrow: productsx?.pipesEyebrow || '',
        pipesTitle: productsx?.pipesTitle || '',
        pipesLead: productsx?.pipesLead || '',
        pipesCta: productsx?.pipesCta || '',
        dimEyebrow: productsx?.dimEyebrow || '',
        dimTitle: productsx?.dimTitle || '',
        dimLead: productsx?.dimLead || '',
        dimTabAria: productsx?.dimTabAria || '',
        dimNote: productsx?.dimNote || '',
        anchorsTitle: productsx?.anchorsTitle || '',
        matEyebrow: productsx?.matEyebrow || '',
        matTitle: productsx?.matTitle || '',
        matLead: productsx?.matLead || '',
        normEyebrow: productsx?.normEyebrow || '',
        normTitle: productsx?.normTitle || '',
        normLead: productsx?.normLead || '',
        faqEyebrow: productsx?.faqEyebrow || '',
        faqTitle: productsx?.faqTitle || '',
      }} />
      <CatalogBrowser translations={{
        cats: catalogx?.cats || {},
        eyebrow: catalogx?.eyebrow || '',
        title: catalogx?.title || '',
        lead: catalogx?.lead || '',
        searchPlaceholder: catalogx?.searchPlaceholder || '',
        noResults: catalogx?.noResults || '',
        materialLabel: catalogx?.materialLabel || '',
        sdrLabel: catalogx?.sdrLabel || '',
        seriesLabel: catalogx?.seriesLabel || '',
        pressureLabel: catalogx?.pressureLabel || '',
        lenLabel: catalogx?.lenLabel || '',
        viewDetails: catalogx?.viewDetails || '',
      }} />
      
    </div>
    </NextIntlClientProvider>
  );
}
