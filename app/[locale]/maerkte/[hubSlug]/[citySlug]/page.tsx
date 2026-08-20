import React from "react";
import { notFound } from "next/navigation";

export const revalidate = 86400;
import type { Metadata } from "next";
import { GEO_MARKETS, GEO_HUBS, nearestMarkets } from "@/lib/data/geo";
import { routing } from "@/lib/i18n/routing";
import { getTranslations } from "next-intl/server";
import GeoCity from "@/components/sections/GeoCity";
import { constructMetadata } from "@/lib/seo/metadata";
import {
  wrapGraph,
  getWebPageGraphNode,
  getLocalMarketGraphNode,
  getFaqGraphNode,
  getBreadcrumbGraphNode,
} from "@/lib/seo/schema";
import { getBaseUrl } from "@/lib/env";
import JsonLd from "@/components/seo/JsonLd";
import { setRequestLocale } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string; hubSlug: string; citySlug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, hubSlug, citySlug } = await params;
  setRequestLocale(locale);
  const market = GEO_MARKETS.find((m) => m.slug === citySlug && m.hubSlug === hubSlug);
  if (!market) return {};

  const tGeo = await getTranslations({ locale, namespace: "geo" });
  
  const tRoot = await getTranslations({ locale });
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, { regulator: string; water?: string; focus?: string[] }>;
  const localizedRegulator = geoContentTrans[citySlug]?.regulator || market.regulator;
  const localizedWater = geoContentTrans[citySlug]?.water || market.water || "";
  const localizedFocus = geoContentTrans[citySlug]?.focus || market.focus || [];
  const cityName = tGeo.has(`cityNames.${market.slug}`) ? tGeo(`cityNames.${market.slug}`) : market.city;
  
  // SEO-optimized title with target keywords — keep concise for 580px pixel limit
  const baseTitle = tGeo("cityMetaTitle", { city: cityName });
  // Focus/use-case is preserved in description, not in title (to avoid >580px)
  const title = baseTitle;
  
  // Place the highly unique water profile string at the beginning to prevent 
  // "Duplicate Meta Description" flags from Seobility.
  const focusText = localizedFocus.length > 0 ? ` ${localizedFocus.join(", ")}.` : "";
  const description = `${cityName}: ${localizedWater} ${localizedRegulator}. ${tGeo("cityLead")}${focusText}`;

  return constructMetadata({
    title,
    description,
    path: `/maerkte/${hubSlug}/${citySlug}`,
    locale,
    noIndex: false, // Ensure these rank, since they are now unique!
  });
}

export default async function GeoCityPage({ params }: Props) {
  const { locale, hubSlug, citySlug } = await params;
  setRequestLocale(locale);
  
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

  // GEO_HUBS/GEO_MARKETS führen deutsche Eigennamen ("Österreich", "München").
  // Für EN/AR werden sie über geo.hubNames / geo.cityNames aufgelöst; fehlt ein
  // Eintrag, bleibt der Name aus den Daten stehen.
  const cityName = tGeo.has(`cityNames.${market.slug}`)
    ? tGeo(`cityNames.${market.slug}`)
    : market.city;
  const hubName = hub
    ? tGeo.has(`hubNames.${hub.slug}`)
      ? tGeo(`hubNames.${hub.slug}`)
      : hub.name
    : market.hubSlug;

  // Get raw geoContent translations
  const geoContentTrans = tRoot.raw("geoContent") as Record<string, {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
    extendedMarketText?: string;
  }>;

  const localizedData = {
    regulator: geoContentTrans[citySlug]?.regulator || market.regulator,
    water: geoContentTrans[citySlug]?.water || market.water,
    focus: geoContentTrans[citySlug]?.focus || market.focus,
    note: geoContentTrans[citySlug]?.note || market.note,
    focusHeading: geoContentTrans[citySlug]?.focusHeading || tGeo("typical", { city: cityName }),
    extendedMarketText: geoContentTrans[citySlug]?.extendedMarketText || ""
  };

  const geoTrans = {
    eyebrow: tGeo("eyebrow"),
    cityTitle: tGeo("cityTitle", { city: cityName }),
    cityLead: tGeo("cityLead"),
    allMarkets: tGeo("allMarkets"),
    request: tGeo("request"),
    finder: tGeo("finder"),
    fromPlant: tGeo("fromPlant"),
    regFrame: tGeo("regFrame"),
    water: tGeo("water"),
    typical: tGeo("typical", { city: cityName }),
    onSite: tGeo("onSite"),
    onSiteText: tGeo("onSiteText"),
    toAcademy: tGeo("toAcademy"),
    nearbyEyebrow: tGeo("nearbyEyebrow"),
    nearby: tGeo("nearby"),
    prodNote: tGeo("prodNote"),
    km: tGeo("km"),
    seoExpansion: tGeo.has("seoExpansionDynamic") ? tGeo("seoExpansionDynamic", {
      city: cityName,
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
  // Auch bei den Nachbarmärkten stehen Land und Stadt auf Deutsch in den Daten.
  const nearestLocalized = nearest.map((nm) => ({
    ...nm,
    city: tGeo.has(`cityNames.${nm.slug}`) ? tGeo(`cityNames.${nm.slug}`) : nm.city,
    country: tGeo.has(`hubNames.${nm.hubSlug}`) ? tGeo(`hubNames.${nm.hubSlug}`) : nm.country,
    regulator: geoContentTrans[nm.slug]?.regulator || nm.regulator
  }));

  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const baseTitle = tGeo("cityMetaTitle", { city: cityName });
  const cityPageUrl = `${siteUrl}/${locale}/maerkte/${market.hubSlug}/${market.slug}`;

  const faqItems = [
    {
      question: locale === "de" ? `Welche Wasserbehörde regelt Trinkwassersysteme in ${cityName}?` : `Which water authority regulates drinking water systems in ${cityName}?`,
      answer: `${tGeo("cityLead")} ${localizedData.regulator}.`,
    },
    {
      question: locale === "de" ? `Wie verhält sich das K-Aqua Rohrsystem bei dem Wasserprofil in ${cityName}?` : `How does K-Aqua piping respond to the water profile in ${cityName}?`,
      answer: localizedData.water,
    },
  ];

  if (localizedData.focus && localizedData.focus.length > 0) {
    faqItems.push({
      question: locale === "de" ? `Was sind typische Projektanwendungen für K-Aqua in ${cityName}?` : `What are typical project applications for K-Aqua in ${cityName}?`,
      answer: `${localizedData.focusHeading}: ${localizedData.focus.join(", ")}.`,
    });
  }

  const jsonLd = wrapGraph([
    getWebPageGraphNode({
      locale,
      path: `/maerkte/${market.hubSlug}/${market.slug}`,
      type: "ItemPage",
      name: baseTitle,
      description: `${cityName}: ${localizedData.water} ${localizedData.regulator}.`,
      breadcrumbId: `${cityPageUrl}#breadcrumb`,
      mainEntityId: `${cityPageUrl}#local-business`,
    }),
    getLocalMarketGraphNode({
      locale,
      hubSlug: market.hubSlug,
      citySlug: market.slug,
      city: cityName,
      country: hubName,
      regulator: localizedData.regulator,
      waterDescription: localizedData.water,
    }),
    getFaqGraphNode(faqItems, cityPageUrl),
    getBreadcrumbGraphNode(locale, [
      { name: tGeo("eyebrow"), path: "/maerkte" },
      { name: hubName, path: `/maerkte/${market.hubSlug}` },
      { name: cityName, path: `/maerkte/${market.hubSlug}/${market.slug}` },
    ]),
  ]);

  return (
    <>
      <JsonLd schema={jsonLd} />
      <div className="sr-only">{baseTitle} | K-Aqua</div>

      <GeoCity
        locale={locale}
        market={{
          ...market,
          city: cityName,
          country: tGeo.has(`hubNames.${market.hubSlug}`)
            ? tGeo(`hubNames.${market.hubSlug}`)
            : market.country,
        }}
        localizedData={localizedData}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        nearestMarkets={nearestLocalized}
      />

      {/* Hub Breadcrumb or Crisis Context specific SEO text */}
      {hub && (
        <div className="max-w-3xl mx-auto text-sm text-muted-foreground/60 leading-relaxed px-4 pt-4 text-center">
          {tGeo("hubInfraLine", {
            hub: hubName,
            scenario: tGeo.has(`crisis.${hub.crisisContext}`)
              ? tGeo(`crisis.${hub.crisisContext}`)
              : hub.crisisContext,
          })}
        </div>
      )}

      {tGeo.has(`markets.${market.slug}.description`) && (
        <div className="max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4 px-4 pb-16 seo-market-content">
          <div dangerouslySetInnerHTML={{ __html: tGeo.raw(`markets.${market.slug}.description`).replace(/<h1/g, '<h2').replace(/<\/h1>/g, '</h2>') }} />
        </div>
      )}

      {/* Dynamic SEO Text Blocks */}
      
    </>
  );
}
