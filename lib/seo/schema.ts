import { getBaseUrl } from "@/lib/env";
import { STANDORT } from '@/lib/data/standort';

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
      telephone: STANDORT.telefonAnzeige,
      contactType: "customer service",
      email: "info@k-aqua.de",
      areaServed: "Worldwide",
      availableLanguage: ["German", "English", "Arabic"],
    },
    /* Die Spitze der Ortspyramide. Jede Markt-, Länder- und Stadtseite
       hängt über `containedInPlace` letztlich hier — und `#organization`
       liegt im Layout, also auf jeder Seite. Damit läuft jede der Pyramiden
       oben auf denselben Punkt zu, statt als eigene Insel zu enden. */
    areaServed: { "@id": `${siteUrl}/#place-world` },
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
    telephone: STANDORT.telefonAnzeige,
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
      latitude: STANDORT.geo.lat,
      longitude: STANDORT.geo.lon,
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

  /* Welt- und Regionsstufe einmal global. Sie liegen bewusst hier und nicht
     nur auf den Marktseiten: So kennt jede Seite die oberen zwei Stufen der
     Pyramide, und die Marktseiten hängen ihre Länder und Städte nur noch
     darunter. Ein Ort ist damit domainweit EIN Knoten, nicht 28 Kopien. */
  const worldNode: GraphNode = {
    "@type": "Place",
    "@id": `${siteUrl}/#place-world`,
    name: "Weltweite Liefermärkte",
    description:
      "Alle Märkte, die KWT GmbH mit K-Aqua PP-R und PP-RCT Rohrleitungssystemen ab Werk Waldsolms beliefert.",
  };

  const regionNodes: GraphNode[] = Object.entries(REGION_NAMES).map(([id, name]) => ({
    "@type": "AdministrativeArea",
    "@id": `${siteUrl}/#place-region-${id}`,
    name,
    containedInPlace: { "@id": `${siteUrl}/#place-world` },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, localBusinessNode, worldNode, ...regionNodes],
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
  dimensionRange,
}: {
  locale: string;
  category: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  articleCodes?: string[] | string;
  categoryName?: string;
  /** Nennweitenbereich aus der Artikeltabelle, z. B. "d20-d75". */
  dimensionRange?: string;
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const productUrl = `${domain}/${locale}/produkte/${category}/${slug}`;
  const codes = Array.isArray(articleCodes) ? articleCodes : articleCodes ? [articleCodes] : [];

  // Nur die Artikelnummern und Maße, die tatsächlich vorliegen. `sku` kann laut
  // Schema.org nur einen Wert tragen; die übrigen vier bis sieben Nummern gingen
  // bisher verloren, obwohl im B2B-Einkauf genau nach ihnen gesucht wird.
  const additionalProperty: Record<string, unknown>[] = [];
  if (codes.length > 1) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Artikelnummern",
      value: codes.join(", "),
    });
  }
  if (dimensionRange) {
    additionalProperty.push({
      "@type": "PropertyValue",
      name: "Nennweite",
      value: dimensionRange,
      unitCode: "MMT", // UN/CEFACT: Millimeter
    });
  }

  return {
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name,
    description,
    url: productUrl,
    // KEIN Rückfall auf das Firmenlogo. Zuvor stand dort
    // `image || `${domain}/images/logo.png``, und da in keiner einzigen
    // Produkt-Frontmatter ein `image` gepflegt ist, hat jede der 74
    // Produktseiten in jeder der drei Sprachen das Firmenlogo als
    // Produktabbildung gemeldet — 222 sachlich falsche Angaben in
    // strukturierten Daten. Ohne echtes Produktfoto wird das Feld weggelassen.
    // Folge: Kein Product-Rich-Result mit Bild. Das ist der ehrliche Zustand;
    // Produktfotografie ist der fehlende Baustein, nicht die Auszeichnung.
    ...(image ? { image } : {}),
    category: categoryName || category,
    brand: { "@id": `${domain}/#organization` },
    manufacturer: { "@id": `${domain}/#organization` },
    ...(codes.length > 0 ? { sku: codes[0], mpn: codes[0] } : {}),
    ...(additionalProperty.length > 0 ? { additionalProperty } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      // KEIN `price: "0.00"`. K-Aqua verkauft im Projektgeschäft gegen Angebot;
      // ein ausgewiesener Preis von null ist schlicht falsch und riskiert eine
      // Beanstandung des Rich Results. Schema.org erlaubt ein Angebot ohne
      // Preisangabe — die `priceSpecification` benennt stattdessen die
      // Preisfindung. Google zeigt dann keinen Preis, was dem Sachverhalt
      // entspricht.
      availability: "https://schema.org/InStock",
      seller: { "@id": `${domain}/#organization` },
      /* Das Angebot gilt weltweit — und zwar für denselben Ortsknoten, an dem
         auch die Marktpyramide hängt. Damit steht die Produktseite nicht mehr
         beziehungslos neben den 28 Marktseiten: Wer über „PP-R Rohr Dubai"
         sucht, findet eine Kette Produkt → Angebot → #place-world ←
         #place-region-nahost ← #place-country-uae ← #place-city-dubai. */
      areaServed: { "@id": `${domain}/#place-world` },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        description: "B2B Project Pricing / Upon Request",
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

/* ────────────────────────────────────────────────────────────────────────
   GESTAFFELTE ORTSHIERARCHIE — die Pyramide unter dem lokalen SEO
   ────────────────────────────────────────────────────────────────────────

   Bisher stand auf jeder der 28 Stadtseiten ein eigener, isolierter
   `LocalBusiness`-Knoten mit dem Text „K-Aqua Niederlassung … für Dubai".
   Das hatte zwei Probleme, und das erste ist das schwerere:

   1. Es behauptete eine Niederlassung, die es nicht gibt. K-Aqua beliefert
      und betreut diese Märkte von Waldsolms aus. `LocalBusiness` ist der
      Typ für einen Betrieb MIT Adresse vor Ort — für einen Markt, den man
      bedient, ist es `Service` mit `areaServed`.

   2. Die 28 Knoten standen nebeneinander, ohne Beziehung. Für eine
      Suchmaschine waren das 28 unverbundene Inseln.

   Stattdessen jetzt eine echte Staffelung mit dauerhaften `@id`s:

       #place-city-dubai   (City)
              ↓ containedInPlace
       #place-country-uae  (Country)
              ↓ containedInPlace
       #place-region-nahost (AdministrativeArea „Naher Osten & Golfstaaten")
              ↓ containedInPlace
       #place-world        (Place)
              ↑ areaServed
       #organization       (Startseite)

   Entscheidend sind die dauerhaften `@id`s auf der Domainwurzel statt
   seitenlokaler Knoten: Die Stadtseite Dubai, die Länderseite VAE und die
   Marktübersicht verweisen damit auf DENSELBEN Dubai-Knoten, nicht auf drei
   gleichnamige Kopien. Erst dadurch entsteht ein Graph statt einer Liste —
   und jede dieser Pyramiden endet oben bei `#organization`.

   Märkte der Region `global` (Chile, Japan, Singapur, Indien, Südafrika,
   Kenia) hängen direkt unter `#place-world`: eine Verwaltungsregion
   „international" gibt es nicht, und einen Knoten zu erfinden, den es
   geografisch nicht gibt, wäre derselbe Fehler wie die Niederlassung. */

/** Anzeigename der vier Regionsstufen. `global` bekommt bewusst keinen. */
const REGION_NAMES: Record<string, string> = {
  dach: "DACH-Region",
  europa: "Europa",
  nahost: "Naher Osten & Golfstaaten",
};

/** Kanonische `@id` einer Ortsstufe. Domainweit stabil, nicht seitenlokal. */
export function getPlaceId(
  kind: "world" | "region" | "country" | "city",
  slug?: string
): string {
  const domain = getBaseUrl().replace(/\/+$/, "");
  return kind === "world"
    ? `${domain}/#place-world`
    : `${domain}/#place-${kind}-${slug}`;
}

/**
 * Erzeugt die Ortskette von der Stadt bis zur Welt.
 *
 * Wird `city`/`citySlug` weggelassen, beginnt die Kette beim Land — so
 * benutzt sie die Länderseite, ohne eine Stadt zu erfinden.
 *
 * Die Knoten sind bewusst wiederholbar: Erscheint derselbe Ort auf mehreren
 * Seiten, beschreibt jede Seite ihn identisch unter derselben `@id`. Das ist
 * in JSON-LD kein Duplikat, sondern die Zusammenführung eines Knotens.
 */
export function getPlaceChainGraphNodes({
  region,
  hubSlug,
  country,
  citySlug,
  city,
  lat,
  lon,
}: {
  region: string;
  hubSlug: string;
  country: string;
  citySlug?: string;
  city?: string;
  lat?: number;
  lon?: number;
}): GraphNode[] {
  const regionName = REGION_NAMES[region];
  const nodes: GraphNode[] = [];

  /* Welt- und Regionsstufe werden hier NICHT wiederholt: `getRootKnowledgeGraph`
     liefert sie im Layout, also auf jeder Seite. Die Kette hängt sich per @id
     daran — genau dafür sind die @ids domainweit stabil. Sie hier ein zweites
     Mal auszugeben, wäre für den Graphen folgenlos (Knoten mit gleicher @id
     verschmelzen), aber jede Seite trüge zwei überflüssige Knoten. */
  nodes.push({
    "@type": "Country",
    "@id": getPlaceId("country", hubSlug),
    name: country,
    containedInPlace: {
      "@id": regionName ? getPlaceId("region", region) : getPlaceId("world"),
    },
  });

  if (citySlug && city) {
    const cityNode: GraphNode = {
      "@type": "City",
      "@id": getPlaceId("city", citySlug),
      name: city,
      containedInPlace: { "@id": getPlaceId("country", hubSlug) },
    };
    /* Koordinaten liegen je Markt in lib/data/geo.ts vor und fehlten in der
       Auszeichnung bisher vollständig — ohne sie bleibt ein Ortsknoten für
       eine Suchmaschine nur ein Name. */
    if (typeof lat === "number" && typeof lon === "number") {
      cityNode.geo = { "@type": "GeoCoordinates", latitude: lat, longitude: lon };
    }
    nodes.push(cityNode);
  }

  return nodes;
}

/**
 * Leistung für einen Markt — KEIN `LocalBusiness`.
 *
 * Der Unterschied ist inhaltlich, nicht kosmetisch: `provider` ist die
 * Organisation in Waldsolms, `areaServed` der Ort. Damit steht in den Daten,
 * was zutrifft — geliefert und betreut wird ab Werk, eine Niederlassung vor
 * Ort gibt es nicht.
 */
export function getMarketServiceGraphNode({
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
    "@type": "Service",
    "@id": `${marketUrl}#service`,
    name: `PP-R & PP-RCT Rohrleitungssysteme für ${city}`,
    serviceType: "Lieferung und technische Projektbegleitung für Rohrleitungssysteme",
    description:
      `Lieferung, Auslegung und technische Projektbegleitung für PP-R und PP-RCT ` +
      `Rohrleitungssysteme in ${city}, ${country} — ab Werk Waldsolms. ` +
      `Ausgelegt nach ${regulator}.${waterDescription ? ` ${waterDescription}` : ""}`,
    url: marketUrl,
    provider: { "@id": `${domain}/#organization` },
    areaServed: { "@id": getPlaceId("city", citySlug) },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${domain}/${locale}/projektanfrage`,
      servicePhone: STANDORT.telefonAnzeige,
    },
  };
}

/**
 * Leistung für einen Ländermarkt — die mittlere Stufe der Pyramide.
 *
 * Ohne sie steht zwischen Stadtseite und Startseite nichts: Die Länderseite
 * bündelt ihre Städte und reicht sie nach oben an die Organisation weiter.
 */
export function getHubServiceGraphNode({
  locale,
  hubSlug,
  country,
  region,
  description,
  citySlugs = [],
}: {
  locale: string;
  hubSlug: string;
  country: string;
  region: string;
  description?: string;
  citySlugs?: string[];
}): GraphNode {
  const domain = getBaseUrl().replace(/\/+$/, "");
  const hubUrl = `${domain}/${locale}/maerkte/${hubSlug}`;
  const regionName = REGION_NAMES[region];

  const node: GraphNode = {
    "@type": "Service",
    "@id": `${hubUrl}#service`,
    name: `PP-R & PP-RCT Rohrleitungssysteme für ${country}`,
    serviceType: "Lieferung und technische Projektbegleitung für Rohrleitungssysteme",
    description:
      description ??
      `Lieferung und technische Projektbegleitung für PP-R und PP-RCT Rohrleitungssysteme in ${country} — ab Werk Waldsolms.`,
    url: hubUrl,
    provider: { "@id": `${domain}/#organization` },
    areaServed: { "@id": getPlaceId("country", hubSlug) },
  };

  /* Die Städte des Landes als Teilbereiche. Damit liest eine Suchmaschine die
     Stufe unter dieser Seite, ohne sie erst crawlen zu müssen. */
  if (citySlugs.length > 0) {
    node.serviceArea = citySlugs.map((s) => ({ "@id": getPlaceId("city", s) }));
  }
  if (regionName) {
    node.areaServed = [
      { "@id": getPlaceId("country", hubSlug) },
      { "@id": getPlaceId("region", region) },
    ];
  }

  return node;
}

