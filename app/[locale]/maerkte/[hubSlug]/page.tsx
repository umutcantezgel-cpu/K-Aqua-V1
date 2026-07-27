import React from "react";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { GEO_HUBS, GEO_MARKETS } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { constructMetadata, getBreadcrumbJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "@/lib/i18n/navigation";
import { Globe } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; hubSlug: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; hubSlug: string }> = [];
  for (const locale of routing.locales) {
    for (const hub of GEO_HUBS) {
      params.push({ locale, hubSlug: hub.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, hubSlug } = await params;
  setRequestLocale(locale);
  const hub = GEO_HUBS.find((h) => h.slug === hubSlug);
  if (!hub) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  
  const title = tGeo("hubMetaTitle", { country: hub.name });
  const description = tGeo.has(`hubs.${hub.slug}.metaDesc`)
    ? tGeo(`hubs.${hub.slug}.metaDesc`)
    : hub.description;

  return constructMetadata({
    title,
    description,
    path: `/maerkte/${hubSlug}`,
    locale,
  });
}

export default async function GeoHubPage({ params }: Props) {
  const { locale, hubSlug } = await params;
  
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const hub = GEO_HUBS.find((h) => h.slug === hubSlug);
  if (!hub) {
    // Legacy redirect: /maerkte/frankfurt → /maerkte/deutschland/frankfurt
    const market = GEO_MARKETS.find((m) => m.slug === hubSlug);
    if (market) {
      redirect(`/${locale}/maerkte/${market.hubSlug}/${market.slug}`);
    }
    notFound();
  }

  const hubMarkets = GEO_MARKETS.filter(m => m.hubSlug === hubSlug);
  const tGeo = await getTranslations({ locale, namespace: "geo" });

  const breadcrumb = getBreadcrumbJsonLd(locale, [
    { name: tGeo("eyebrow"), path: "/maerkte" },
    { name: hub.name, path: `/maerkte/${hub.slug}` }
  ]);

  return (
    <>
      <JsonLd schema={breadcrumb} />
      <div className="min-h-screen bg-background text-foreground pt-[var(--header-h)]">
        <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Hub Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Globe className="w-4 h-4" />
            <span>{tGeo("eyebrow")} / {hub.name}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {tGeo("hubH1", { country: hub.name })}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            <strong className="font-semibold text-foreground">{tGeo("hubH1", { country: hub.name })}</strong> &ndash;{" "}
            {tGeo.has(`hubs.${hub.slug}.description`) ? (
               <span dangerouslySetInnerHTML={{ __html: tGeo.raw(`hubs.${hub.slug}.description`) }} />
            ) : (
               tGeo("hubLead", { country: hub.name })
            )}
          </p>
          
        </div>

        {/* Cities Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">{tGeo("hubCitiesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubMarkets.map(market => (
              <Link 
                key={market.slug} 
                href={`/maerkte/${hub.slug}/${market.slug}`}
                title={market.city}
                aria-label={market.city}
                className="block p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{market.city}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {market.regulator}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic SEO Text Blocks */}
        <div className="sr-only" aria-hidden="true">
          <p>
            {locale === 'de' ? 'K-Aqua Rohrsysteme in' : locale === 'ar' ? 'أنظمة أنابيب K-Aqua في' : 'K-Aqua Piping Systems in'} {hub.name} {locale === 'de' ? 'bieten erstklassige PP-R und PP-RCT Lösungen.' : locale === 'ar' ? 'توفر حلول PP-R و PP-RCT من الدرجة الأولى.' : 'provide premium PP-R and PP-RCT solutions.'}
          </p>
          <p>
            {locale === 'de' ? 'Als internationaler Partner für den Markt' : locale === 'ar' ? 'كشريك دولي للسوق' : 'As an international partner for the market'} {hub.name}{locale === 'de' ? ' sichern wir lokale Expertise und höchste Trinkwasser-Qualitätsstandards.' : locale === 'ar' ? '، نضمن الخبرة المحلية وأعلى معايير جودة مياه الشرب.' : ', we ensure local expertise and the highest drinking water quality standards.'}
          </p>
          <p>
            {locale === 'de' ? 'Erfahren Sie mehr über unsere zertifizierten Produkte und kontaktieren Sie unsere lokalen Repräsentanten für Ihr nächstes Bauprojekt.' : locale === 'ar' ? 'اكتشف المزيد عن منتجاتنا المعتمدة واتصل بممثلينا المحليين لمشروع البناء القادم الخاص بك.' : 'Discover more about our certified products and contact our local representatives for your next construction project.'}
          </p>
        </div>

      </div>
    </div>
    </>
  );
}
