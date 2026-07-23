import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GEO_HUBS, GEO_MARKETS } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { constructMetadata, getBreadcrumbJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import Link from "next/link";
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
  
  const title = `K-Aqua in ${hub.name} | ${tGeo("eyebrow")}`;
  const description = hub.description;

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
            Infrastruktur-Lösungen für {hub.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {hub.description}
          </p>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border max-w-3xl">
            <h3 className="font-semibold mb-2">Regionaler Kontext: {hub.crisisContext}</h3>
            <p className="text-sm text-muted-foreground">
              Unsere K-Aqua PP-R/PP-RCT Rohrsysteme aus deutscher Produktion sind speziell dafür ausgelegt, 
              den infrastrukturellen Herausforderungen in {hub.name} gerecht zu werden.
            </p>
          </div>
        </div>

        {/* Cities Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">Lokale Standorte & Referenzstädte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubMarkets.map(market => (
              <Link 
                key={market.slug} 
                href={`/${locale}/maerkte/${hub.slug}/${market.slug}`}
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

      </div>
    </div>
    </>
  );
}
