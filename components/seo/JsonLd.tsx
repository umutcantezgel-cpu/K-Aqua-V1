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

export type SchemaLd =
  | OrganizationJsonLd
  | ProductJsonLd
  | ItemListJsonLd
  | FAQPageJsonLd;

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
