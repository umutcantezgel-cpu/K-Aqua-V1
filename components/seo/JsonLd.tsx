import React from "react";

// Inline type definitions to avoid dependencies on schema-dts and keep compilation clean
export interface OrganizationJsonLd {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string;
    availableLanguage?: string[];
  };
  sameAs?: string[];
}

export interface ProductJsonLd {
  "@context": "https://schema.org";
  "@type": "Product";
  name: string;
  image?: string;
  description?: string;
  brand?: {
    "@type": "Brand";
    name: string;
  };
  offers?: {
    "@type": "Offer";
    priceCurrency: string;
    price: string;
    availability: string;
    url?: string;
    priceSpecification?: {
      "@type": "PriceSpecification";
      valueAddedTaxIncluded: boolean;
    };
    seller?: {
      "@type": "Organization";
      name: string;
    };
  };
}

export interface ListItemJsonLd {
  "@type": "ListItem";
  position: number;
  url?: string;
  name?: string;
  item?: unknown;
}

export interface ItemListJsonLd {
  "@context": "https://schema.org";
  "@type": "ItemList";
  name?: string;
  description?: string;
  itemListElement: ListItemJsonLd[];
}

export interface AnswerJsonLd {
  "@type": "Answer";
  text: string;
}

export interface QuestionJsonLd {
  "@type": "Question";
  name: string;
  acceptedAnswer: AnswerJsonLd;
}

export interface FAQPageJsonLd {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: QuestionJsonLd[];
}

export interface ArticleJsonLd {
  "@context": "https://schema.org";
  "@type": "Article" | "NewsArticle";
  headline: string;
  description?: string;
  image?: string[];
  datePublished?: string;
  dateModified?: string;
  author?: {
    "@type": "Organization" | "Person";
    name: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
}

export interface BreadcrumbListJsonLd {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: {
    "@type": "ListItem";
    position: number;
    name: string;
    item?: string;
  }[];
}

export interface WebPageJsonLd {
  "@context": "https://schema.org";
  "@type": "WebPage" | "ContactPage" | "AboutPage" | "CollectionPage";
  name: string;
  description?: string;
  url: string;
  inLanguage?: string;
  creator?: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  publisher?: {
    "@type": "Organization";
    name: string;
    url: string;
  };
}

export type SchemaLd =
  | OrganizationJsonLd
  | ProductJsonLd
  | ItemListJsonLd
  | FAQPageJsonLd
  | ArticleJsonLd
  | BreadcrumbListJsonLd
  | WebPageJsonLd;

interface JsonLdProps {
  schema: SchemaLd | SchemaLd[] | unknown | unknown[];
}

export default function JsonLd({ schema }: JsonLdProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
