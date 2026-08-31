import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBaseUrl } from "@/lib/env";
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

export { getBaseUrl };

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
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const cleanPath = path ? path.replace(/^\/+|\/+$/g, "") : "";

  const translatedLocales = ["de", "en", "ar"];

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
    'pipe-cutter-2040'
    // `pipe-cutter-50125-1` ist hier entfallen. Der Slug legt eine Variante des
    // Rohrabschneiders nahe, das Bauteil ist laut Katalog S. 114 aber ein
    // „Pipe scraper" — ein eigenes Werkzeug mit eigener Artikelnummer (AQ974).
    // Als Variante geführt bekam die Seite keine hreflang-Alternativen und
    // wurde auf den Rohrabschneider kanonisiert; damit stand im Index, sie sei
    // eine Dublette eines anderen Produkts.
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
  
  const canonicalUrl = overridePath ? `${siteUrl}/${locale}/${overridePath}` : `${siteUrl}/${locale}`;

  /* Doppelte Markennennung verhindern („Titel | K-Aqua · K-Aqua").
     Das Muster erlaubt Bindestrich, Leerzeichen oder gar nichts zwischen „K"
     und „Aqua": In messages/ steht die Marke in allen drei Schreibweisen.
     Vorher verlangte es den Bindestrich, und der Titel der Downloadseite
     („Downloads | K Aqua") rutschte durch — im Suchergebnis stand
     „Downloads | K Aqua | K-Aqua". */
  const MARKE = /K[\s-]?Aqua/i;
  let cleanTitle = title.replace(/\s*?[|·-]\s*?K[\s-]?Aqua(.*)?$/i, "").trim();
  // Marke am Anfang ebenso entfernen
  cleanTitle = cleanTitle.replace(/^K[\s-]?Aqua\s*?[|·-]\s*?/i, "").trim();
  
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
      // Dieselbe Toleranz wie oben: „K Aqua" ist die Marke, auch ohne Bindestrich.
      const hasBrand = MARKE.test(finalTitle);

      // 65 statt 58. Google zeigt im Suchergebnis rund 600 px, was für deutschen
      // Fließsatz etwa 60–65 Zeichen entspricht; Seobility beanstandet erst
      // ab 70. Bei 58 blieb nach Abzug des Suffixes (" | K-Aqua", 9 Zeichen) nur
      // ein Budget von 49 Zeichen für den eigentlichen Titel — und wer es
      // überschritt, verlor unten die Marke ganz, weil das Suffix dann nicht
      // mehr passte. Gemessen lagen dadurch 61 % der deutschen Titel unter
      // 45 Zeichen. Siehe docs/keyword-matrix.md.
      const MAX_TITLE_CHARS = 65;
      let suffix = "";
      if (!hasBrand && !finalTitle.toLowerCase().includes("k-aqua")) {
          suffix = " | K-Aqua";
      }
      
      if (finalTitle.length + suffix.length > MAX_TITLE_CHARS) {
          // An der Wortgrenze kürzen — ein Schnitt mitten im Wort ("PPR-Roh...")
          // wirkt im Suchergebnis kaputt. "…" als ein Zeichen statt "..." spart
          // zwei Zeichen für den eigentlichen Titel.
          const availableSpace = MAX_TITLE_CHARS - suffix.length - 1;
          if (availableSpace > 10) {
              const cut = finalTitle.lastIndexOf(" ", availableSpace);
              finalTitle = finalTitle
                .substring(0, cut > 20 ? cut : availableSpace)
                .replace(/[\s:,;&\-–—|]+$/, "") + "…";
          }
      }
      
      if (suffix && finalTitle.length + suffix.length <= MAX_TITLE_CHARS) {
          finalTitle += suffix;
      }
  }

  const isTranslated = translatedLocales.includes(locale);

  let finalDescription = description || "";
  
  // Kurze Descriptions auffüllen — aber nur, wenn der Zusatz vollständig
  // hineinpasst. Vorher wurde ein Satz angehängt, der den Titel wiederholte
  // („Erfahren Sie mehr über {title} und unsere zertifizierten …"), und die
  // Kürzung darunter schnitt ihn dann mitten im Wort ab. Im Suchergebnis stand
  // dann „… Erfahren Sie mehr über PP-R Rohrsysteme Verei…" — Fläche verbraucht,
  // nichts gesagt. Der Zusatz nennt jetzt, was den Klick wert macht.
  const MAX_DESCRIPTION_CHARS = 155;
  if (finalDescription.length < 120) {
    const filler =
      locale === 'de' ? ' Datenblätter, Maße und Angebot direkt bei K-Aqua.'
      : locale === 'ar' ? ' أوراق البيانات والمقاسات وعرض السعر من K-Aqua.'
      : ' Datasheets, dimensions and quotes direct from K-Aqua.';
    if (finalDescription.length + filler.length <= MAX_DESCRIPTION_CHARS) {
      finalDescription += filler;
    }
  }

  if (finalDescription.length > MAX_DESCRIPTION_CHARS) {
    // An der Wortgrenze schneiden und Satzzeichen am Ende entfernen, damit nicht
    // „… DVGW /…" stehen bleibt. „…" ist ein Zeichen statt drei.
    const cutPos = finalDescription.lastIndexOf(" ", MAX_DESCRIPTION_CHARS - 3);
    finalDescription =
      finalDescription
        .substring(0, cutPos > 110 ? cutPos : MAX_DESCRIPTION_CHARS - 3)
        .replace(/[\s.,;:/–—-]+$/, "") + "…";
  }

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
          "max-image-preview": "large" as const,
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
      alternateLocale: translatedLocales.filter((l) => l !== locale),
      // Ohne eigenes Bild fällt jede Seite auf das generierte Locale-Bild
      // zurück — vorher teilten Produkt- und News-Seiten ganz ohne Vorschaubild.
      images: [{ url: ogImage || `${siteUrl}/${locale}/opengraph-image` }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [ogImage || `${siteUrl}/${locale}/opengraph-image`],
    },
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   TOTER CODE — NICHT REAKTIVIEREN

   Die sechs folgenden Bauer (getOrganizationJsonLd, getProductCatalogJsonLd,
   getGeoCityJsonLd, getWebPageJsonLd, getArticleJsonLd, getBreadcrumbJsonLd)
   haben null Aufrufstellen im gesamten Baum — geprüft über alle .ts/.tsx
   außerhalb dieser Datei.

   Sie stammen aus der Zeit vor `lib/seo/schema.ts`. Dort liegt das aktive
   System: ein zusammenhängender @graph mit stabilen `@id` und wechselseitigen
   Referenzen. Die Bauer hier erzeugen dagegen freistehende Einzelobjekte OHNE
   `@id`.

   Wer einen davon wieder einhängt, erzeugt sofort ein ZWEITES `Organization`
   bzw. einen zweiten `BreadcrumbList` auf derselben Seite — ohne `@id` sind sie
   für Google nicht als dieselbe Entität erkennbar, und die Seite widerspricht
   sich selbst. Wird eine dieser Funktionen gebraucht, gehört die Ergänzung nach
   `lib/seo/schema.ts` und nicht hierher.

   Die physische Entfernung steht noch aus: Diese Datei erzeugt die Metadaten
   JEDER Seite; ein Sammel-Löschvorgang über 270 Zeilen wurde bewusst nicht
   riskiert, solange die Wirkung dieselbe ist. Siehe docs/keyword-matrix.md.
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Builds the Organization JSON-LD schema.
 */
export async function getOrganizationJsonLd(locale: string): Promise<OrganizationJsonLd> {
  const t = await getTranslations({ locale, namespace: "footer" });
  const siteUrl = getBaseUrl().replace(/\/+$/, "");

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
 */
export async function getProductCatalogJsonLd(locale: string): Promise<ItemListJsonLd> {
  const t = await getTranslations({ locale, namespace: "products" });
  const range = t.has("range") ? (t.raw("range") as Array<{ t: string; d: string }>) || [] : [];
  const siteUrl = getBaseUrl().replace(/\/+$/, "");

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
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  const url = `${siteUrl}/${locale}/maerkte/${market.hubSlug}/${market.slug}`;

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
export async function getWebPageJsonLd(
  locale: string,
  pageKey: string,
  type: WebPageJsonLd["@type"] = "WebPage",
  override?: { title?: string; description?: string }
): Promise<WebPageJsonLd> {
  let meta: string[] = [];
  try {
    const t = await getTranslations({ locale, namespace: "pages" });
    if (t.has(pageKey)) {
      meta = (t.raw(pageKey) as string[]) || [];
    }
  } catch {
    // Ignore error if namespace or key is missing
  }
  const title = override?.title || (meta && meta[0]) || "K-Aqua";
  const desc = override?.description || (meta && meta[1]) || "";
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  
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
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  
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
  const siteUrl = getBaseUrl().replace(/\/+$/, "");
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: p.name,
      item: `${siteUrl}/${locale}${p.path.startsWith('/') ? p.path : `/${p.path}`}`,
    })),
  };
}

