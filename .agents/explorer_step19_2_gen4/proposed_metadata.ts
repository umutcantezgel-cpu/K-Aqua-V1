import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { GeoMarket } from "@/lib/data/geo";
import {
  OrganizationJsonLd,
  ItemListJsonLd,
  ProductJsonLd,
  FAQPageJsonLd,
} from "../../components/seo/JsonLd"; // Adjust path if needed

interface MetadataInput {
  title: string;
  description: string;
  path: string; // e.g., "/produkte" or "/maerkte/frankfurt" (without locale)
  locale: string;
  ogImage?: string;
}

/**
 * Standardizes metadata configuration across all routes.
 * Ensures consistent canonical, hreflang alternates, and OpenGraph/Twitter definitions.
 */
export function constructMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
}: MetadataInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const cleanPath = path.replace(/^\/+|\/+$/g, "");

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `${siteUrl}/${loc}/${cleanPath}`;
  }
  // x-default points to default locale (de)
  languages["x-default"] = `${siteUrl}/de/${cleanPath}`;

  const canonicalUrl = `${siteUrl}/${locale}/${cleanPath}`;

  return {
    title: `${title} · K-Aqua`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: `${title} · K-Aqua`,
      description,
      url: canonicalUrl,
      siteName: "K-Aqua",
      locale,
      images: ogImage ? [{ url: ogImage }] : [{ url: `${siteUrl}/images/og-default.jpg` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · K-Aqua`,
      description,
      images: ogImage ? [ogImage] : [`${siteUrl}/images/og-default.jpg`],
    },
  };
}

/**
 * Builds the Organization JSON-LD schema.
 * Pulled from footer translation keys to ensure contact data parity.
 */
export async function getOrganizationJsonLd(locale: string): Promise<OrganizationJsonLd> {
  const t = await getTranslations({ locale, namespace: "footer" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KWT GmbH",
    "alternateName": "K-Aqua",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": t("phone"),
      "contactType": "customer service",
      "email": t("email"),
      "areaServed": "Global",
      "availableLanguage": ["de", "en", "ar"],
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Auweg 3",
      "addressLocality": "Waldsolms-Brandoberndorf",
      "postalCode": "35647",
      "addressCountry": "DE",
    },
  };
}

/**
 * Builds the Product ItemList JSON-LD schema for the products overview page.
 * Uses translations to remain dynamic and avoid hardcoded strings.
 */
export async function getProductCatalogJsonLd(locale: string): Promise<ItemListJsonLd> {
  const t = await getTranslations({ locale, namespace: "products" });
  const range = t.raw("range") as Array<{ t: string; d: string }>;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";

  const itemListElement = range.map((item, index) => ({
    "@type": "ListItem" as const,
    "position": index + 1,
    "item": {
      "@type": "Product" as const,
      "name": item.t,
      "description": item.d,
      "brand": {
        "@type": "Brand" as const,
        "name": "K-Aqua",
      },
      "url": `${siteUrl}/${locale}/produkte`,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t("techTitle"),
    "description": t("lead"),
    "itemListElement": itemListElement,
  };
}

/**
 * Builds the Product and FAQPage JSON-LD schemas for programmatic city geo-pages.
 * Localizes FAQs to avoid English fallbacks or hardcoded values.
 */
export async function getGeoCityJsonLd(
  locale: string,
  market: GeoMarket,
  localizedData: {
    regulator: string;
    water: string;
    focus: string[];
    note: string;
    focusHeading: string;
  }
): Promise<[ProductJsonLd, FAQPageJsonLd]> {
  const tGeo = await getTranslations({ locale, namespace: "geo" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://k-aqua.de";
  const url = `${siteUrl}/${locale}/maerkte/${market.slug}`;

  // 1. Product representation for the specific market/city
  const productSchema: ProductJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `K-Aqua Piping System - ${market.city}`,
    "description": `${tGeo("cityLead")} ${localizedData.regulator}. ${localizedData.water}`,
    "brand": {
      "@type": "Brand",
      "name": "K-Aqua",
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "0.00",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "valueAddedTaxIncluded": true,
      },
      "availability": "https://schema.org/InStock",
      "url": url,
      "seller": {
        "@type": "Organization",
        "name": "KWT GmbH",
      },
    },
  };

  // 2. Dynamic Q&A FAQPage based on local water/regulatory variables
  const getFaqQuestions = (loc: string, city: string) => {
    switch (loc) {
      case "de":
        return {
          regulator: `Welche Wasserbehörde regelt Trinkwassersysteme in ${city}?`,
          water: `Wie verhält sich das K-Aqua Rohrsystem bei dem Wasserprofil in ${city}?`,
          focus: `Was sind typische Projektanwendungen für K-Aqua in ${city}?`,
          note: `Wie erfolgt die Logistik und Lieferung für ${city}?`,
        };
      case "ar":
        return {
          regulator: `ما هي الهيئة التنظيمية لشبكات مياه الشرب في ${city}؟`,
          water: `كيف يستجيب نظام أنابيب K-Aqua لخصائص المياه في ${city}؟`,
          focus: `ما هي التطبيقات النموذجية لمشاريع K-Aqua في ${city}؟`,
          note: `كيف يتم ترتيب الخدمات اللوجستية والشحن إلى ${city}؟`,
        };
      case "en":
      default:
        return {
          regulator: `Which water authority regulates drinking water systems in ${city}?`,
          water: `How does the K-Aqua piping system respond to the water profile in ${city}?`,
          focus: `What are typical project applications for K-Aqua in ${city}?`,
          note: `How are logistics and delivery handled for ${city}?`,
        };
    }
  };

  const faqQuestions = getFaqQuestions(locale, market.city);

  const mainEntity = [
    {
      "@type": "Question" as const,
      "name": faqQuestions.regulator,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": `${tGeo("cityLead")} ${localizedData.regulator}.`,
      },
    },
    {
      "@type": "Question" as const,
      "name": faqQuestions.water,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": localizedData.water,
      },
    },
  ];

  if (localizedData.focus && localizedData.focus.length > 0) {
    mainEntity.push({
      "@type": "Question" as const,
      "name": faqQuestions.focus,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": `${localizedData.focusHeading}: ${localizedData.focus.join(", ")}.`,
      },
    });
  }

  if (localizedData.note) {
    mainEntity.push({
      "@type": "Question" as const,
      "name": faqQuestions.note,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": localizedData.note,
      },
    });
  }

  const faqSchema: FAQPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity,
  };

  return [productSchema, faqSchema];
}
export type { MetadataInput };
