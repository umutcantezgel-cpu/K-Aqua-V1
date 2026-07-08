export const DEFAULT_ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KWT GmbH",
  "alternateName": "K-Aqua",
  "url": "https://k-aqua.de",
  "logo": "https://k-aqua.de/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/k-aqua"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industriestraße 1",
    "addressLocality": "Waldsolms",
    "postalCode": "35647",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-0000-000000",
    "contactType": "customer service",
    "email": "info@k-aqua.de",
    "availableLanguage": ["German", "English", "Arabic"]
  },
  "areaServed": "Worldwide"
};

export function getOrganizationSchema() {
  return DEFAULT_ORG_SCHEMA;
}

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KWT GmbH - K-Aqua",
    "image": "https://k-aqua.de/logo.png",
    "@id": "https://k-aqua.de",
    "url": "https://k-aqua.de",
    "telephone": "+49-0000-000000",
    "address": DEFAULT_ORG_SCHEMA.address,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 50.418,
      "longitude": 8.473
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };
}

export function getServiceSchema({ name, description, url }: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "K-Aqua"
    },
    "url": url
  };
}

export function getPricingSchema() {
  // B2B Pricing Schema: Prices are on request
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "K-Aqua PP-R/PP-RCT Pipe Systems",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Custom Pricing / Upon Request for B2B Projects"
      }
    }
  };
}

export function getPortfolioSchema(projects: { name: string; description: string; image?: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "K-Aqua References & Projects",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": projects.map((p, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": p.name,
          "description": p.description,
          "url": p.url,
          ...(p.image && { "image": p.image })
        }
      }))
    }
  };
}

export function getProcessSchema(name: string, description: string, steps: { name: string; text: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((s, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": s.name,
      "text": s.text,
      ...(s.url && { "url": s.url })
    }))
  };
}

export function getArticleSchema(post: { headline: string; description: string; image?: string; datePublished: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.headline,
    "description": post.description,
    "datePublished": post.datePublished,
    "author": {
      "@type": "Organization",
      "name": "K-Aqua"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KWT GmbH",
      "logo": {
        "@type": "ImageObject",
        "url": "https://k-aqua.de/logo.png"
      }
    },
    "url": post.url,
    ...(post.image && { "image": [post.image] })
  };
}

export function getFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getProductSchema(product: { name: string; description: string; category: string; image?: string; url: string; codes: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "category": product.category,
    "productID": product.codes,
    "url": product.url,
    ...(product.image && { "image": product.image }),
    "brand": {
      "@type": "Brand",
      "name": "K-Aqua"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "KWT GmbH"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "0",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "description": "Upon Request"
      }
    }
  };
}
