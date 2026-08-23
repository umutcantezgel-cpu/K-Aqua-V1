import { getBaseUrl } from "@/lib/env";

export interface GraphNode {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
}

export interface KnowledgeGraph {
  "@context": "https://schema.org";
  "@graph": GraphNode[];
}

/**
 * Returns the global root Knowledge Graph containing Organization, WebSite,
 * LocalBusiness (Headquarters), and Key Leadership.
 */
export function getRootKnowledgeGraph(locale: string = "de"): KnowledgeGraph {
  const domain = getBaseUrl();
  const siteUrl = domain.replace(/\/+$/, "");

  const organizationNode: GraphNode = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "KWT GmbH",
    alternateName: ["K-Aqua", "K-Aqua Rohrsysteme", "K-Aqua Piping Systems", "KWT German Engineering"],
    legalName: "KWT GmbH",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/images/logo.png`,
      contentUrl: `${siteUrl}/images/logo.png`,
      caption: "K-Aqua Piping Systems - German Engineering",
    },
    image: { "@id": `${siteUrl}/#logo` },
    sameAs: [
      "https://www.linkedin.com/company/k-aqua",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Auweg 3",
      addressLocality: "Waldsolms-Brandoberndorf",
      postalCode: "35647",
      addressRegion: "Hessen",
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+49 6085 9868-410",
      contactType: "customer service",
      email: "info@k-aqua.de",
      areaServed: "Worldwide",
      availableLanguage: ["German", "English", "Arabic"],
    },
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "KWT Engineering & Executive Leadership",
      jobTitle: "Managing Director",
      worksFor: { "@id": `${siteUrl}/#organization` },
    },
    knowsAbout: [
      "PP-R Piping Systems",
      "PP-RCT Pipes",
      "Socket Fusion Welding",
      "Building Services Engineering",
      "Potable Water Hygiene",
      "District Heating Networks",
      "HVAC Cooling Cycles",
      "DIN 8077",
      "DIN 8078",
      "EN ISO 15874",
      "DVGW Certification",
    ],
  };

  const websiteNode: GraphNode = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "K-Aqua",
    description: "Premium PP-R & PP-RCT Piping Systems Made in Germany",
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: ["de", "en", "ar"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/${locale}/suche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessNode: GraphNode = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${siteUrl}/#local-business`,
    name: "KWT GmbH - K-Aqua Werk & Zentrale",
    url: siteUrl,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    image: `${siteUrl}/images/logo.png`,
    telephone: "+49 6085 9868-410",
    email: "info@k-aqua.de",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Auweg 3",
      addressLocality: "Waldsolms-Brandoberndorf",
      postalCode: "35647",
      addressRegion: "Hessen",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.418,
      longitude: 8.473,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, localBusinessNode],
  };
}

/**
 * Helper to wrap GraphNodes into a unified @graph container.
 */
export function wrapGraph(nodes: (GraphNode | null | undefined)[]): KnowledgeGraph {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is GraphNode => Boolean(n)),
  };
}

/**
 * Builds a deterministic WebPage / CollectionPage / AboutPage / ContactPage graph node.
 */
export function getWebPageGraphNode({
  locale,
  path = "",
  type = "WebPage",
  name,
  description,
  breadcrumbId,
  mainEntityId,
  hasPartIds,
}: {
  locale: string;
  path?: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ItemPage" | "SearchResultsPage";
  name: string;
  description: string;
  breadcrumbId?: string;
  mainEntityId?: string;
  /**
   * `@id`s weiterer Knoten, die Bestandteil dieser Seite sind — typischerweise
   * ein FAQPage-Block. Ohne diese Referenz stünde so ein Knoten als Waise im
   * Graphen: vorhanden, aber von keiner Seite als Bestandteil ausgewiesen.
   * `mainEntity` ist dafür der falsche Platz, wenn die Seite bereits eine
   * Hauptentität hat (auf Produktseiten das Produkt).
   */
  hasPartIds?: string[];
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const pageUrl = cleanPath ? `${domain}/${locale}/${cleanPath}` : `${domain}/${locale}`;

  const node: GraphNode = {
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name,
    description,
    isPartOf: { "@id": `${domain}/#website` },
    about: { "@id": `${domain}/#organization` },
    inLanguage: locale,
  };

  if (breadcrumbId) {
    node.breadcrumb = { "@id": breadcrumbId };
  }
  if (mainEntityId) {
    node.mainEntity = { "@id": mainEntityId };
  }
  if (hasPartIds && hasPartIds.length > 0) {
    node.hasPart = hasPartIds.map((id) => ({ "@id": id }));
  }

  return node;
}

/**
 * Builds a deterministic BreadcrumbList graph node.
 */
export function getBreadcrumbGraphNode(
  locale: string,
  paths: { name: string; path: string }[]
): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const currentPath = paths.length > 0 ? paths[paths.length - 1]?.path || "" : "";
  const cleanCurrentPath = currentPath.replace(/^\/+|\/+$/g, "");
  const pageUrl = cleanCurrentPath ? `${domain}/${locale}/${cleanCurrentPath}` : `${domain}/${locale}`;

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: paths.map((p, idx) => {
      const cleanP = p.path.replace(/^\/+|\/+$/g, "");
      const itemUrl = cleanP ? `${domain}/${locale}/${cleanP}` : `${domain}/${locale}`;
      return {
        "@type": "ListItem",
        position: idx + 1,
        name: p.name,
        item: itemUrl,
      };
    }),
  };
}

/**
 * Builds a Service / ProfessionalService graph node linked to #organization.
 */
export function getServiceGraphNode({
  locale,
  path,
  name,
  description,
  serviceType,
  areaServed = "Worldwide",
  hasOfferCatalog,
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  serviceType?: string;
  areaServed?: string;
  hasOfferCatalog?: { name: string; itemListElement: { name: string; description: string }[] };
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const serviceUrl = `${domain}/${locale}/${cleanPath}`;

  const node: GraphNode = {
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name,
    description,
    url: serviceUrl,
    provider: { "@id": `${domain}/#organization` },
    areaServed,
    ...(serviceType ? { serviceType } : {}),
  };

  if (hasOfferCatalog) {
    node.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: hasOfferCatalog.name,
      itemListElement: hasOfferCatalog.itemListElement.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
        },
      })),
    };
  }

  return node;
}

/**
 * Builds a Product graph node linked to #organization.
 */
export function getProductGraphNode({
  locale,
  category,
  slug,
  name,
  description,
  image,
  articleCodes,
  categoryName,
}: {
  locale: string;
  category: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  articleCodes?: string[] | string;
  categoryName?: string;
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const productUrl = `${domain}/${locale}/produkte/${category}/${slug}`;
  const codes = Array.isArray(articleCodes) ? articleCodes : articleCodes ? [articleCodes] : [];

  return {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name,
    description,
    url: productUrl,
    image: image || `${domain}/images/logo.png`,
    category: categoryName || category,
    brand: { "@id": `${domain}/#organization` },
    manufacturer: { "@id": `${domain}/#organization` },
    ...(codes.length > 0 ? { sku: codes[0], mpn: codes[0] } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      price: "0.00",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${domain}/#organization` },
      priceSpecification: {
        "@type": "PriceSpecification",
        description: "B2B Project Pricing / Upon Request",
        valueAddedTaxIncluded: true,
      },
    },
  };
}

/**
 * Builds an Article / TechArticle graph node linked to #organization.
 */
export function getArticleGraphNode({
  locale,
  slug,
  headline,
  description,
  datePublished,
  dateModified,
  image,
  type = "TechArticle",
  path,
}: {
  locale: string;
  slug?: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  type?: "TechArticle" | "Article" | "NewsArticle";
  path?: string;
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const articleUrl = path
    ? `${domain}/${locale}/${path.replace(/^\/+/, "")}`
    : `${domain}/${locale}/news/${slug || ""}`;

  return {
    "@type": type,
    "@id": `${articleUrl}#article`,
    headline,
    description,
    url: articleUrl,
    mainEntityOfPage: { "@id": `${articleUrl}#webpage` },
    datePublished: datePublished || "2025-01-01",
    dateModified: dateModified || datePublished || "2025-01-01",
    inLanguage: locale,
    image: image ? [image] : [`${domain}/images/logo.png`],
    author: { "@id": `${domain}/#organization` },
    publisher: { "@id": `${domain}/#organization` },
  };
}

/**
 * Builds a WebApplication graph node for interactive calculators/tools.
 */
export function getWebApplicationGraphNode({
  locale,
  path,
  name,
  description,
  applicationCategory = "EngineeringTool",
}: {
  locale: string;
  path: string;
  name: string;
  description: string;
  applicationCategory?: string;
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const appUrl = `${domain}/${locale}/${cleanPath}`;

  return {
    "@type": "WebApplication",
    "@id": `${appUrl}#app`,
    name,
    description,
    url: appUrl,
    applicationCategory,
    operatingSystem: "All modern web browsers",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    author: { "@id": `${domain}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${domain}/#organization` },
    },
  };
}

/**
 * Builds an FAQPage graph node.
 */
/**
 * ItemList einer Produktkategorie.
 *
 * Hintergrund: Die statischen Segmente `produkte/pipes|fittings|valves|tools|
 * transition-fittings` überschatten in Next.js die dynamische Route
 * `produkte/[category]`. Nur letztere erzeugte bisher ItemList und FAQPage — sie
 * bedient aber nur noch `accessories` und `weld-in-saddles`. Die fünf größten
 * Kategorien bekamen dadurch das dünnere Schema. Dieser Baustein gleicht das an.
 *
 * `name` und `url` je Eintrag statt nur `url`: Google darf die Liste dann als
 * benannte Sammlung lesen, nicht nur als Linkliste.
 */
export function getItemListGraphNode({
  locale,
  category,
  name,
  items,
}: {
  locale: string;
  category: string;
  name: string;
  items: { slug: string; title: string }[];
}): GraphNode | null {
  if (!items || items.length === 0) return null;
  const domain = getBaseUrl().replace(/\/+$/, "");
  const categoryUrl = `${domain}/${locale}/produkte/${category}`;

  return {
    "@type": "ItemList",
    "@id": `${categoryUrl}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.title,
      url: `${categoryUrl}/${item.slug}`,
    })),
  };
}

export function getFaqGraphNode(
  faqs: { question: string; answer: string }[],
  pageUrl?: string
): GraphNode | null {
  if (!faqs || faqs.length === 0) return null;

  const node: GraphNode = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  if (pageUrl) {
    node["@id"] = `${pageUrl}#faq`;
  }

  return node;
}

/**
 * Builds a LocalBusiness graph node for city/market landing pages.
 */
export function getLocalMarketGraphNode({
  locale,
  hubSlug,
  citySlug,
  city,
  country,
  regulator,
  waterDescription,
}: {
  locale: string;
  hubSlug: string;
  citySlug: string;
  city: string;
  country: string;
  regulator: string;
  waterDescription?: string;
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const marketUrl = `${domain}/${locale}/maerkte/${hubSlug}/${citySlug}`;

  return {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${marketUrl}#local-business`,
    name: `K-Aqua ${city} - PP-R & PP-RCT Rohrleitungssysteme`,
    description: `K-Aqua Niederlassung und Projektunterstützung für ${city}, ${country}. Konform mit ${regulator}.${waterDescription ? ` ${waterDescription}` : ""}`,
    url: marketUrl,
    parentOrganization: { "@id": `${domain}/#organization` },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "Country",
        name: country,
      },
    },
    telephone: "+49 6085 9868-410",
    email: "info@k-aqua.de",
    priceRange: "$$$$",
  };
}

