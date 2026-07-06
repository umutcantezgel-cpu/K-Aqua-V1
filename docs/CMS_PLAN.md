# CMS Integration Plan (Phase 2)

> **Status:** Planned — no CMS is configured for Phase 1 launch.
> All data comes from typed TypeScript modules in `lib/data/`.

---

## 1. Recommended CMS Options

| CMS | i18n Support | Self-hosted? | Notes |
|---|---|---|---|
| **Sanity** (recommended) | Built-in field-level i18n | Cloud | Excellent DX, real-time preview, GROQ queries |
| **Storyblok** | Field-level i18n | Cloud | Visual editor, folder-based i18n |
| **Payload CMS** | Plugin-based i18n | Self-hosted | Full control, PostgreSQL/MongoDB backend |

**Recommendation:** Sanity with `@sanity/client` — best i18n DX and real-time preview capabilities.

---

## 2. CMS Content Schemas

### GeoMarket
```ts
{
  name: 'geoMarket',
  fields: [
    { name: 'slug', type: 'slug' },              // URL segment
    { name: 'city', type: 'string' },             // Eigenname
    { name: 'country', type: 'string' },          // Eigenname
    { name: 'region', type: 'string', options: { list: ['dach', 'europa', 'nahost', 'global'] } },
    { name: 'lat', type: 'number' },
    { name: 'lon', type: 'number' },
    { name: 'regulator', type: 'localeString' },  // i18n
    { name: 'norms', type: 'array', of: [{ type: 'string' }] },
    { name: 'water', type: 'localeText' },        // i18n
    { name: 'focus', type: 'array', of: [{ type: 'localeString' }] },
    { name: 'note', type: 'localeText' },         // i18n
    { name: 'heroImage', type: 'image' },         // replaces MediaSlot
  ]
}
```

### ProductRow
```ts
{
  name: 'product',
  fields: [
    { name: 'type', type: 'string', options: { list: ['mono', 'fiber', 'fitting', 'valve', 'tool'] } },
    { name: 'typeLabel', type: 'localeString' },
    { name: 'short', type: 'string' },
    { name: 'd', type: 'number' },
    { name: 'sdr', type: 'number' },
    { name: 'wall', type: 'number' },
    { name: 'di', type: 'number' },
    { name: 'pn', type: 'string' },
  ]
}
```

### NewsPost
```ts
{
  name: 'newsPost',
  fields: [
    { name: 'slug', type: 'slug' },
    { name: 'title', type: 'localeString' },
    { name: 'excerpt', type: 'localeText' },
    { name: 'body', type: 'localeBlockContent' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'coverImage', type: 'image' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
  ]
}
```

### ReferenceProject
```ts
{
  name: 'referenceProject',
  fields: [
    { name: 'slug', type: 'slug' },
    { name: 'title', type: 'localeString' },
    { name: 'description', type: 'localeText' },
    { name: 'market', type: 'reference', to: [{ type: 'geoMarket' }] },
    { name: 'lat', type: 'number' },
    { name: 'lon', type: 'number' },
    { name: 'images', type: 'array', of: [{ type: 'image' }] },
    { name: 'products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
  ]
}
```

### Certificate
```ts
{
  name: 'certificate',
  fields: [
    { name: 'standard', type: 'string' },         // e.g. "ISO 9001"
    { name: 'number', type: 'string' },            // e.g. "Q-2025-6732"
    { name: 'validFrom', type: 'date' },
    { name: 'validTo', type: 'date' },
    { name: 'pdf', type: 'file' },                 // PDF upload
    { name: 'issuer', type: 'string' },
  ]
}
```

### Media
```ts
{
  name: 'mediaAsset',
  fields: [
    { name: 'title', type: 'localeString' },
    { name: 'alt', type: 'localeString' },
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'usage', type: 'string' },            // where this is used (hero, card, etc.)
  ]
}
```

---

## 3. Migration Path

1. **Set up CMS project** and create schemas (above)
2. **Update `lib/data/repositories.ts`** — swap static arrays for CMS fetch calls
3. **Configure `next.config.ts`** — add `remotePatterns` for CMS image CDN
4. **Replace `<MediaSlot>`** with `next/image` using CMS-provided asset URLs
5. **Add ISR** — set `revalidate` per data source route
6. **Add Webhook** — on-demand revalidation via `POST /api/revalidate` on CMS publish
7. **Populate content** — fill in all `// TODO(content)` items (see `docs/CONTENT_TODO.md`)

---

## 4. Environment Variables (Phase 2)

```env
CMS_API_URL=https://your-project.api.sanity.io/v2024-01-01
CMS_API_TOKEN=sk...
```

These are already documented in `.env.example` but not used in Phase 1.

---

## 5. ISR Strategy

| Content Type | `revalidate` | Trigger |
|---|---|---|
| GeoMarket | `3600` (1h) | Webhook on publish |
| Products | `86400` (24h) | Webhook on publish |
| News | `600` (10min) | Webhook on publish |
| References | `3600` (1h) | Webhook on publish |
| Certificates | `86400` (24h) | Webhook on publish |

---

## 6. Static Fallback

The static TS modules in `lib/data/geo.ts` and `lib/data/products.ts` remain functional.
If the CMS is unreachable, the repository functions can fall back to static data:

```ts
export async function getMarkets(): Promise<GeoMarket[]> {
  try {
    return await cmsClient.fetch('*[_type == "geoMarket"]');
  } catch {
    return GEO_MARKETS; // static fallback
  }
}
```
