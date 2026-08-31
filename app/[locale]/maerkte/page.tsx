import React from "react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import MarketsHub from "@/components/sections/MarketsHub";
import { GEO_MARKETS, GEO_HUBS } from "@/lib/data/geo";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  wrapGraph,
  getWebPageGraphNode,
  getBreadcrumbGraphNode,
  getPlaceChainGraphNodes,
  getPlaceId,
} from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.raw("markets") as string[];
  return constructMetadata({
    title: meta[0] ?? "Zielmärkte & Industrielle Anwendungen | K-Aqua",
    description: meta[1] ?? "Industrielle Rohrsysteme für globale Infrastrukturprojekte. Kompromisslose deutsche Ingenieurskunst.",
    path: "/maerkte",
    locale,
  });
}

export default async function MaerktePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Fetch translation objects
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });

  const totalMarkets = GEO_MARKETS.length;
  const totalCountries = new Set(GEO_MARKETS.map((g) => g.country)).size;

  // Extract translation dictionaries
  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    title1: tGeo("title1"),
    title2: tGeo("title2"),
    lead: tGeo("lead", { n: totalMarkets, c: totalCountries }),
    all: tGeo("all"),
    fromPlant: tGeo("fromPlant"),
    canvasAria: tRoot("home.globeAria"),
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get raw geoContent translations for all markets
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

  const tGx = await getTranslations({ locale, namespace: "geoExtra" });
  const cityNames: Record<string, string> = {};
  for (const m of GEO_MARKETS) {
    if (tGeo.has(`cityNames.${m.slug}`)) cityNames[m.slug] = tGeo(`cityNames.${m.slug}`);
  }
  const uiTrans = {
    cityBadge: tGx("cityBadge"),
    regionBadge: tGx("regionBadge"),
    marketFallbackLead: tGx("marketFallbackLead", { city: "{city}" }),
    openMarketPage: tGx("openMarketPage", { city: "{city}" }),
  };

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: "/maerkte",
      type: "CollectionPage",
      name: `${geoTrans.title1} ${geoTrans.title2}` || "Globale Märkte & Standorte | K-Aqua",
      description: geoTrans.lead || "Weltweite Märkte und regionale Zertifizierungen für K-Aqua PP-R Rohrsysteme.",
      breadcrumbId: `${siteUrl}/${locale}/maerkte#breadcrumb`,
      mainEntityId: `${siteUrl}/#organization`,
    }),
    /* Die Länderstufe aller 24 Hubs. Diese Seite ist die Wurzel der
       Marktpyramide: Von hier hängen die Länder an ihren Regionen, und die
       Regionen liegen bereits im Root-Graph an `#place-world`. Ohne diese
       Knoten wären Länderseite und Stadtseite die einzigen Stellen, an
       denen die Staffelung überhaupt auftaucht. */
    ...GEO_HUBS.flatMap((hub) =>
      getPlaceChainGraphNodes({
        region: hub.region,
        hubSlug: hub.slug,
        country: hub.name,
      }).filter((n) => String(n["@id"]).includes("#place-country-"))
    ),
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/${locale}/maerkte#itemlist`,
      name: "K-Aqua Regionale Märkte",
      itemListElement: GEO_MARKETS.map((market, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${siteUrl}/${locale}/maerkte/${market.hubSlug}/${market.slug}`,
        name: `${cityNames[market.slug] || market.city}, ${market.country}`,
        /* Verweis statt Wiederholung: derselbe Stadtknoten wie auf der
           Stadtseite selbst. */
        item: { "@id": getPlaceId("city", market.slug) },
      })),
    },
    getBreadcrumbGraphNode(locale, [
      { name: locale === "de" ? "Startseite" : locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "de" ? "Märkte" : locale === "ar" ? "الأسواق" : "Markets", path: "/maerkte" },
    ]),
  ]);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <MarketsHub
        locale={locale}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        geoContentTrans={geoContentTrans}
        cityNames={cityNames}
        uiTrans={uiTrans}
      />
      {/* Hidden SEO navigation to ensure all market pages are easily crawlable */}
      <nav aria-label="Markets Directory" className="sr-only">
        <ul>
          {GEO_MARKETS.map((market) => (
            <li key={market.slug}>
              <a href={`/${locale}/maerkte/${market.hubSlug}/${market.slug}`}>
                {cityNames[market.slug] || market.city}, {market.country}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

