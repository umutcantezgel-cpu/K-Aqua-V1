import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";
import { GeoMarket } from "@/lib/data/geo";
import {
  OrganizationJsonLd,
  ItemListJsonLd,
  ProductJsonLd,
  FAQPageJsonLd,
  WebPageJsonLd,
  ArticleJsonLd,
  BreadcrumbListJsonLd,
} from "@/components/seo/JsonLd";

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://k-aqua.de';
}

interface MetadataInput {
  title: string;
  description: string;
  path?: string; // e.g., "/produkte" or "/maerkte/frankfurt" (without locale)
  locale: string;
  ogImage?: string;
  noIndex?: boolean;
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
  noIndex,
}: MetadataInput): Metadata {
  const siteUrl = getBaseUrl();
  const cleanPath = path ? path.replace(/^\/+|\/+$/g, "") : "";

  const translatedLocales = [
    "de", "en", "ar"
  ];

  // Exclude product variants that have canonical rewrites to a primary variant
  const variantSlugs = new Set([
    'k-fiber-pipe-pp-r-sdr-74',
    'k-fiber-pipe-pp-r-sdr-9',
    'k-fiber-pipe-pp-r-sdr-17',
    'k-fiber-pipe-pp-rct-sdr-74',
    'k-fiber-uv-pipe-pp-r-sdr-74',
    'k-fiber-uv-pipe-pp-rct-sdr-74',
    'k-fiberclima-pipe-pp-rct-sdr-11',
    'k-pipe-pp-r-sdr-6',
    'k-pipe-pp-rct-sdr-74',
    'k-pipe-purple-pp-r-sdr-11',
    'reducing-tee-large-sizes',
    'elbow-45',
    'elbow-45-femalemale',
    'metal-union-female-thread',
    'metal-union-female-thread-yellow-brass',
    'flat-gasket-for-unions-pp-r',
    'adjustable-battery-female-thread',
    'concealed-valve-chrome-heavy-part',
    'hand-welding-machine-2063-complete-set',
    'hand-welding-machine-mirror-50125',
    'pipe-cutter-2040',
    'pipe-cutter-50125-1',
    'hand-welding-machine-20-63',
    'weld-in-saddle-female-thread',
    'weld-in-saddle-male-thread',
    'drilling-tool-for-weld-in-saddle',
    'welding-tool-for-weld-in-saddles',
    'battery-female-thread',
    'tee-90-female-thread',
    'metal-union-male-thread',
    'metal-union-male-thread-yellow-brass',
    'metal-union-male-thread-brass'
  ]);

  const isVariant = Array.from(variantSlugs).some(slug => cleanPath.endsWith(`/${slug}`) || cleanPath === slug);

  const languages: Record<string, string> = {};
  if (!noIndex && !isVariant) {
    for (const loc of translatedLocales) {
      languages[loc] = cleanPath ? `${siteUrl}/${loc}/${cleanPath}` : `${siteUrl}/${loc}`;
    }
    // x-default points to default locale (de)
    languages["x-default"] = cleanPath ? `${siteUrl}/de/${cleanPath}` : `${siteUrl}/de`;
  }
  
  // Resolve Keyword Cannibalization for News
  let overridePath = cleanPath;
  if (cleanPath.endsWith("bim-building-information-modeling-rohrnetz-planung-ppr")) {
    overridePath = cleanPath.replace("rohrnetz-planung-ppr", "rohrleitungsplanung-ppr");
  }
  
  let canonicalUrl = overridePath ? `${siteUrl}/${locale}/${overridePath}` : `${siteUrl}/${locale}`;

  // Clean title to prevent double branding like "Title | K-Aqua · K-Aqua"
  let cleanTitle = title.replace(/\s*?[|·-]\s*?K-Aqua(.*)?$/i, "").trim();
  // Remove leading K-Aqua if it's there
  cleanTitle = cleanTitle.replace(/^K-Aqua\s*?[|·-]\s*?/i, "").trim();
  
  // SEO optimization: Pad very short titles (Trust Center, Sitemap, Support)
  if (cleanTitle === "Sitemap" || cleanTitle === "خريطة الموقع") {
    cleanTitle = locale === 'de' ? "Sitemap: Alle Seiten im Überblick" : locale === 'ar' ? "خريطة الموقع: نظرة عامة على جميع الصفحات" : "Sitemap: Overview of all Pages";
  } else if (cleanTitle === "Trust Center" || cleanTitle === "مركز الثقة") {
    cleanTitle = locale === 'de' ? "Trust Center: Zertifikate & Sicherheit" : locale === 'ar' ? "مركز الثقة: الشهادات والأمان" : "Trust Center: Certificates & Security";
  } else if (cleanTitle === "Support" || cleanTitle === "الدعم الفني") {
    cleanTitle = locale === 'de' ? "Technischer Support & Kundenservice" : locale === 'ar' ? "الدعم الفني وخدمة العملاء" : "Technical Support & Customer Service";
  }

  let finalTitle = cleanTitle;
  
  if (cleanPath === "" || cleanTitle === "K-Aqua" || cleanTitle === "Home") {
     finalTitle = locale === 'de' ? `K-Aqua PP-R & PP-RCT Rohrsysteme` : locale === 'ar' ? `K-Aqua أنظمة أنابيب PP-R و PP-RCT` : `K-Aqua PP-R & PP-RCT Piping Systems`;
  } else {
      const lowerTitle = finalTitle.toLowerCase();
      const hasBrand = lowerTitle.includes("k-aqua") || lowerTitle.includes("kaqua");

      // Step 2: Add brand suffix last
      // Use 58 chars as max to stay safely under 580px pixel width
      const MAX_TITLE_CHARS = 58;
      let suffix = "";
      if (!hasBrand && !finalTitle.toLowerCase().includes("k-aqua")) {
          suffix = " | K-Aqua";
      }
      
      if (finalTitle.length + suffix.length > MAX_TITLE_CHARS) {
          const availableSpace = MAX_TITLE_CHARS - suffix.length - 3;
          if (availableSpace > 10) {
              finalTitle = finalTitle.substring(0, availableSpace).trim() + "...";
          }
      }
      
      if (suffix && finalTitle.length + suffix.length <= MAX_TITLE_CHARS) {
          finalTitle += suffix;
      }
  }

  const isTranslated = translatedLocales.includes(locale);

  let finalDescription = description || "";
  
  // Ensure description is unique by injecting the cleanTitle if it's too short, 
  // preventing duplicate meta descriptions across many pages.
  if (finalDescription.length < 120) {
    if (locale === 'de') {
      finalDescription += ` Erfahren Sie mehr über ${cleanTitle} und unsere zertifizierten PP-R & PP-RCT Rohrleitungssysteme.`;
    } else if (locale === 'en') {
      finalDescription += ` Learn more about ${cleanTitle} and our certified PP-R & PP-RCT piping systems.`;
    } else if (locale === 'es') {
      finalDescription += ` Obtenga más información sobre ${cleanTitle} y nuestros sistemas de tuberías certificados.`;
    } else if (locale === 'fr') {
      finalDescription += ` En savoir plus sur ${cleanTitle} et nos systèmes de tuyauterie certifiés.`;
    } else if (locale === 'ar') {
      finalDescription += ` تعرف على المزيد حول ${cleanTitle} وأنظمة الأنابيب المعتمدة لدينا.`;
    } else {
      finalDescription += ` K-Aqua PP-R / PP-RCT Piping Systems: ${cleanTitle}.`;
    }
  }

  // Strictly enforce 145 character limit for description to avoid pixel width limit (1000px)
  if (finalDescription.length > 145) {
    // Try to cut at the last space before 142 to add "..."
    const cutPos = finalDescription.lastIndexOf(" ", 142);
    finalDescription = finalDescription.substring(0, cutPos > 100 ? cutPos : 142) + "...";
  }

  // Enforce title length (optimal 45-65)
  // Handled earlier in the logic

  // Set robots based on noIndex, isVariant or translation languages
  const robotsSetting = noIndex || isVariant || !isTranslated
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      };

  return {
    metadataBase: new URL(siteUrl),
    title: finalTitle,
    description: finalDescription,
    robots: robotsSetting,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "K-Aqua",
      locale,
      // Without an explicit image, the file-convention app/[locale]/opengraph-image.tsx applies.
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/**
 * Builds the Organization JSON-LD schema.
 * Pulled from footer translation keys to ensure contact data parity.
 */
export async function getOrganizationJsonLd(locale: string): Promise<OrganizationJsonLd> {
  const t = await getTranslations({ locale, namespace: "footer" });
  const siteUrl = getBaseUrl();

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
  const range = t.has("range") ? (t.raw("range") as Array<{ t: string; d: string }>) || [] : [];
  const siteUrl = getBaseUrl();

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
  const siteUrl = getBaseUrl();
  const url = `${siteUrl}/${locale}/maerkte/${market.hubSlug}/${market.slug}`;

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

/**
 * Builds standard WebPage or ContactPage schemas.
 */
export async function getWebPageJsonLd(locale: string, pageKey: string, type: WebPageJsonLd["@type"] = "WebPage", override?: { title?: string, description?: string }): Promise<WebPageJsonLd> {
  let meta: string[] = [];
  try {
    const t = await getTranslations({ locale, namespace: "pages" });
    if (t.has(pageKey)) {
      meta = (t.raw(pageKey) as string[]) || [];
    }
  } catch (e) {
    // Ignore error if namespace or key is missing
  }
  const title = override?.title || (meta && meta[0]) || "K-Aqua";
  const desc = override?.description || (meta && meta[1]) || "";
  const siteUrl = getBaseUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description: desc,
    url: `${siteUrl}/${locale}/${pageKey === 'home' ? '' : pageKey}`,
    inLanguage: locale,
    ...(pageKey === 'home' && {
      creator: {
        "@type": "Organization",
        name: "Coday Web Agency",
        url: "https://www.codayweb.de/"
      }
    })
  };
}

/**
 * Builds Article/NewsArticle schemas for Academy and News.
 */
export async function getArticleJsonLd(locale: string, pageKey: string): Promise<ArticleJsonLd> {
  const t = await getTranslations({ locale, namespace: "pages" });
  const meta = t.has(pageKey) ? (t.raw(pageKey) as string[]) || [] : [];
  const siteUrl = getBaseUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: (meta && meta[0]) || "K-Aqua News",
    description: (meta && meta[1]) || "",
    image: [`${siteUrl}/${locale}/opengraph-image`],
    publisher: {
      "@type": "Organization",
      name: "KWT GmbH",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/logo.png`,
      }
    }
  };
}

/**
 * Builds BreadcrumbList JSON-LD to help Google understand site structure.
 */
export function getBreadcrumbJsonLd(locale: string, paths: { name: string; path: string }[]): BreadcrumbListJsonLd {
  const siteUrl = getBaseUrl();
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.name,
      item: `${siteUrl}/${locale}${p.path}`,
    })),
  };
}
