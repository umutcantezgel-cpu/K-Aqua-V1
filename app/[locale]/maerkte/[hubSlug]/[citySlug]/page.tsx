import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GEO_MARKETS, GEO_HUBS, nearestMarkets } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import GeoCity from "@/components/sections/GeoCity";
import { constructMetadata, getGeoCityJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/metadata";
import JsonLd from "@/components/seo/JsonLd";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string; hubSlug: string; citySlug: string }>;
}

export async function generateStaticParams() {
  const params: Array<{ locale: string; hubSlug: string; citySlug: string }> = [];
  for (const locale of routing.locales) {
    for (const market of GEO_MARKETS) {
      params.push({ locale, hubSlug: market.hubSlug, citySlug: market.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, hubSlug, citySlug } = await params;
  setRequestLocale(locale);
  const market = GEO_MARKETS.find((m) => m.slug === citySlug && m.hubSlug === hubSlug);
  if (!market) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  
  // Clean localized title
  const title = `${market.city} | ${tGeo("eyebrow")}`;
  
  // Localized description using the regulator info
  const tRoot = await getTranslations({ locale });
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, { regulator: string }>;
  const localizedRegulator = geoContentTrans[citySlug]?.regulator || market.regulator;
  const description = `${tGeo("cityLead")} ${localizedRegulator}`;

  return constructMetadata({
    title,
    description,
    path: `/maerkte/${hubSlug}/${citySlug}`,
    locale,
  });
}

export default async function GeoCityPage({ params }: Props) {
  const { locale, hubSlug, citySlug } = await params;
  
  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const market = GEO_MARKETS.find((m) => m.slug === citySlug && m.hubSlug === hubSlug);
  if (!market) {
    notFound();
  }

  const hub = GEO_HUBS.find((h) => h.slug === hubSlug);

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const tRegions = await getTranslations({ locale, namespace: "regions" });
  const tRoot = await getTranslations({ locale });
  const tSeo = await getTranslations({ locale, namespace: "seo" });

  // Get raw geoContent translations
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }>;

  const localizedData = {
    regulator: geoContentTrans[citySlug]?.regulator || market.regulator,
    water: geoContentTrans[citySlug]?.water || market.water,
    focus: geoContentTrans[citySlug]?.focus || market.focus,
    note: geoContentTrans[citySlug]?.note || market.note,
    focusHeading: geoContentTrans[citySlug]?.focusHeading || tGeo("typical", { city: market.city })
  };

  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    cityTitle: tGeo("cityTitle", { city: market.city }),
    cityLead: tGeo("cityLead"),
    allMarkets: tGeo("allMarkets"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical", { city: market.city }),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
    prodNote: tGeo("prodNote"),
    km: tGeo("km"),
    seoExpansion: tGeo.has("seoExpansionDynamic") ? tGeo("seoExpansionDynamic", {
      city: market.city,
      regulator: localizedData.regulator,
      water: localizedData.water,
      note: localizedData.note,
    }) : "",
  };

  const regionsTrans = {
    dach: tRegions("dach"),
    europa: tRegions("europa"),
    nahost: tRegions("nahost"),
    global: tRegions("global"),
  };

  // Get 3 nearest markets and pre-localize their regulator text for listings
  const nearest = nearestMarkets(citySlug, 3);
  const nearestLocalized = nearest.map((nm) => ({
    ...nm,
    regulator: geoContentTrans[nm.slug]?.regulator || nm.regulator
  }));

  const schemas = await getGeoCityJsonLd(locale, market, localizedData);
  
  const breadcrumb = getBreadcrumbJsonLd(locale, [
    { name: tGeo("eyebrow"), path: "/maerkte" },
    { name: hub ? hub.name : market.hubSlug, path: `/maerkte/${market.hubSlug}` },
    { name: market.city, path: `/maerkte/${market.hubSlug}/${market.slug}` }
  ]);
  
  const allSchemas = [...schemas, breadcrumb];

  return (
    <>
      <JsonLd schema={allSchemas} />

      <GeoCity
        locale={locale}
        market={market}
        localizedData={localizedData}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        nearestMarkets={nearestLocalized}
      />

      {/* Hub Breadcrumb or Crisis Context specific SEO text */}
      {hub && (
        <div className="max-w-3xl mx-auto text-sm text-muted-foreground/60 leading-relaxed px-4 pt-4 text-center">
          K-Aqua Infrastruktur für {hub.name} — Entwickelt für Szenario: {hub.crisisContext}.
        </div>
      )}

      {tSeo.has('extendedMarketText.p1') && (
        <div className="mt-16 max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4 px-4 pb-16">
          <p>{tSeo('extendedMarketText.p1')}</p>
          <p>{tSeo('extendedMarketText.p2')}</p>
          <p>{tSeo('extendedMarketText.p3')}</p>
        </div>
      )}
    </>
  );
}
