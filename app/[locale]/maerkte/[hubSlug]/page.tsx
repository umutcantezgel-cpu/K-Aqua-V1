import React from "react";
import { notFound, redirect } from "next/navigation";

export const revalidate = 86400;
import type { Metadata } from "next";
import { GEO_HUBS, GEO_MARKETS, HUB_APPROVAL } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  wrapGraph,
  getWebPageGraphNode,
  getBreadcrumbGraphNode,
  getHubServiceGraphNode,
  getPlaceChainGraphNodes,
  getPlaceId,
} from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import { Link } from "@/lib/i18n/navigation";
import { MarketSeoBlock } from "@/components/seo/MarketSeoBlock";
import { Globe } from "lucide-react";

interface Props {
  params: Promise<{ locale: string; hubSlug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, hubSlug } = await params;
  setRequestLocale(locale);
  const hub = GEO_HUBS.find((h) => h.slug === hubSlug);
  if (!hub) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const hubName = tGeo.has(`hubNames.${hub.slug}`) ? tGeo(`hubNames.${hub.slug}`) : hub.name;
  
  // Das nationale Zulassungsregime im Titel ist das, was die Länderseite von der
  // Städteseite trennt: Das Land beantwortet „Darf ich dort verkaufen?", die Stadt
  // „Wer liefert mir hier?". Beide zielten vorher auf „PP-R Rohrsysteme + Ort"
  // und nahmen sich damit gegenseitig die Signale weg.
  // Siehe docs/keyword-matrix.md, Abschnitt 4.
  const approval = HUB_APPROVAL[hub.slug] ?? "ISO 15874";
  const longTitle = tGeo("hubMetaTitle", { country: hubName, hub: hubName, approval });
  // 56 Zeichen + " | K-Aqua" (9) = 65, die Obergrenze in constructMetadata. Wird
  // sie überschritten, greift die Kurzform, statt den Titel abschneiden zu lassen.
  const title = longTitle.length <= 56
    ? longTitle
    : tGeo("hubMetaTitleShort", { country: hubName, hub: hubName, approval });
  const description = tGeo.has(`hubs.${hub.slug}.metaDesc`)
    ? tGeo(`hubs.${hub.slug}.metaDesc`, { country: hubName, hub: hubName })
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
  setRequestLocale(locale);
  
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
  const hubName = tGeo.has(`hubNames.${hub.slug}`) ? tGeo(`hubNames.${hub.slug}`) : hub.name;
  const tRoot = await getTranslations({ locale });
  const geoContentTrans = tRoot.raw('geoContent') as Record<string, { regulator?: string }>;

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const pageTitle = tGeo("hubH1", { country: hubName, hub: hubName });
  const pageDesc = tGeo.has(`hubs.${hub.slug}.metaDesc`)
    ? tGeo(`hubs.${hub.slug}.metaDesc`, { country: hubName, hub: hubName })
    : hub.description;

  /* Mittlere Stufe der Ortspyramide. Bisher sprang der Graph hier direkt von
     der Länderseite auf `#organization` — die Ebene Land und die darunter
     liegenden Städte kamen darin gar nicht vor. Jetzt hängt das Land an
     seiner Region, die Region an der Welt, und die Städte des Landes stehen
     als `serviceArea` unter der Leistung. */
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: `/maerkte/${hub.slug}`,
      type: "CollectionPage",
      name: pageTitle,
      description: pageDesc,
      breadcrumbId: `${siteUrl}/${locale}/maerkte/${hub.slug}#breadcrumb`,
      mainEntityId: `${siteUrl}/${locale}/maerkte/${hub.slug}#service`,
    }),
    ...getPlaceChainGraphNodes({
      region: hub.region,
      hubSlug: hub.slug,
      country: hubName,
    }),
    getHubServiceGraphNode({
      locale,
      hubSlug: hub.slug,
      country: hubName,
      region: hub.region,
      description: pageDesc,
      citySlugs: hubMarkets.map((m) => m.slug),
    }),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/${locale}/maerkte/${hub.slug}#itemlist`,
      name: `K-Aqua Märkte in ${hubName}`,
      itemListElement: hubMarkets.map((market, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteUrl}/${locale}/maerkte/${hub.slug}/${market.slug}`,
        name: `${market.city}, ${hubName}`,
        item: { "@id": getPlaceId("city", market.slug) },
      })),
    },
    getBreadcrumbGraphNode(locale, [
      { name: locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "de" ? "Märkte" : locale === "ar" ? "الأسواق" : "Markets", path: "/maerkte" },
      { name: hubName, path: `/maerkte/${hub.slug}` },
    ]),
  ]);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="min-h-screen bg-background text-foreground pt-[var(--header-h)]">
        <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Hub Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Globe className="w-4 h-4" />
            <span>{tGeo("eyebrow", { country: hubName, hub: hubName })} / {hubName}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {tGeo("hubH1", { country: hubName, hub: hubName })}
          </h1>
          <div className="text-xl text-muted-foreground max-w-3xl space-y-4">
            <p>
              <span className="font-semibold text-foreground">{tGeo("hubH1", { country: hubName, hub: hubName })}</span> &ndash;
            </p>
            {tGeo.has(`hubs.${hub.slug}.description`) ? (
               <div dangerouslySetInnerHTML={{ 
                 __html: `<p>${String(tGeo.raw(`hubs.${hub.slug}.description`)).replace(/\\. /g, '.</p><p>')}</p>` 
               }} />
            ) : (
               <p>{tGeo("hubLead", { country: hubName, hub: hubName })}</p>
            )}
          </div>
          
        </div>

        {/* Cities Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-8">{tGeo("hubCitiesTitle", { country: hubName, hub: hubName })}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hubMarkets.map(market => (
              <Link 
                key={market.slug} 
                href={`/maerkte/${hub.slug}/${market.slug}`}
                title={tGeo.has(`cityNames.${market.slug}`) ? tGeo(`cityNames.${market.slug}`) : market.city}
                aria-label={tGeo.has(`cityNames.${market.slug}`) ? tGeo(`cityNames.${market.slug}`) : market.city}
                className="block p-6 rounded-xl border bg-card hover:bg-accent/50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium group-hover:text-primary transition-colors">{tGeo.has(`cityNames.${market.slug}`) ? tGeo(`cityNames.${market.slug}`) : market.city}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {geoContentTrans[market.slug]?.regulator || market.regulator}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Dynamic SEO Text Blocks */}
        <MarketSeoBlock locale={locale} locationName={hubName} />

      </div>
    </div>
    </>
  );
}
