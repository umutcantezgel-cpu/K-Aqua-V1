import React from "react";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { setRequestLocale } from "next-intl/server";
import MarketsHub from "@/components/sections/MarketsHub";
import { GEO_MARKETS } from "@/lib/data/geo";
import { constructMetadata } from "@/lib/seo/metadata";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${geoTrans.title1} ${geoTrans.title2}`,
    "description": geoTrans.lead,
    "url": `${siteUrl}/${locale}/maerkte`,
  };

  return (
    <>
      <JsonLd schema={webPageSchema} />
      <MarketsHub
        locale={locale}
        geoTrans={geoTrans}
        regionsTrans={regionsTrans}
        geoContentTrans={geoContentTrans}
      />
    </>
  );
}

