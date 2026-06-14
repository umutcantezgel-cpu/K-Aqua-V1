# Daten-Verträge (TypeScript-Interfaces für `lib/data/`)

Alle Daten liegen im Prototyp als JS-Objekte vor. In Next.js werden sie zu
**typisierten TS-Modulen** unter `lib/data/`. Quelle der Wahrheit = die Prototyp-Dateien.
Inhalte NICHT neu erfinden — 1:1 übernehmen, markierte Platzhalter als `// TODO(content)` belassen.

---

## `lib/data/geo.ts` — Märkte (Quelle: `prototype/kaqua-geo.jsx`, `K_GEO` + `K_REGIONS`)

```ts
export type RegionId = 'dach' | 'europa' | 'nahost' | 'global';

export interface Region {
  id: RegionId;
  /** UI-Label kommt aus i18n (regions-Namespace), NICHT aus diesem Feld. */
  labelKey: RegionId;
}

export interface GeoMarket {
  slug: string;            // URL-Segment, kanonisch deutsch (z. B. "dubai")
  city: string;            // Eigenname — bleibt unübersetzt im Datensatz
  country: string;         // Eigenname
  region: RegionId;
  lat: number;             // für Globus-flyTo + Haversine
  lon: number;
  regulator: string;       // lokale Aufsicht/Norm-Regime — // TODO(content): fachlich prüfen
  norms: string[];         // einschlägige Normen — // TODO(content): fachlich prüfen
  water: string;           // Wasserprofil + Materialantwort
  focus: string[];         // typische Projekttypen vor Ort
  note: string;            // Logistik-/Lieferhinweis ab Waldsolms
}

export const WALDSOLMS = { lat: 50.37, lon: 8.51 } as const;
export const REGIONS: Region[];   // 4 Einträge
export const GEO_MARKETS: GeoMarket[];  // 27 Einträge
```

> **i18n-Hinweis:** Die Fließtexte (`regulator`, `water`, `focus`, `note`) sind im Prototyp deutsch.
> Für `en`/`ar` gehören sie in `messages/{locale}.json` unter `geoContent.<slug>`. `lat/lon/slug/region`
> bleiben sprachneutral im TS-Modul. Siehe `agents/18_geo_city_pages_pSEO.md`.

**Helfer (aus Prototyp portieren):**
- `haversineKm(a, b)` — Entfernung Stadt ↔ Waldsolms (Tooltip + „In der Nähe").
- `nearestMarkets(slug, n = 3)` — die n geografisch nächsten Märkte (interne Verlinkung).

---

## `lib/data/products.ts` — Produkt-Matrix (Quelle: `prototype/kaqua-views-3.jsx`, Finder)

```ts
export type PipeType = 'mono' | 'multilayer' | 'fitting' | 'valve' | 'tool';
export type SDR = 6 | 7.4 | 9 | 11 | 17;

export interface ProductRow {
  type: PipeType;          // Label via i18n
  dimMin: number;          // mm (z. B. 20)
  dimMax: number;          // mm (z. B. 630)
  sdr: SDR[];              // verfügbare Druckstufen
  // weitere generierte Spalten siehe FinderView
}
export const PRODUCTS: ProductRow[];
```

---

## `messages/{locale}.json` — i18n (Quelle: 3 i18n-Prototyp-Dateien)

```
{
  "nav": { … }, "groups": { … }, "pages": { <route>: [title, subtitle] },
  "home": { … }, "footer": { … }, "regions": { dach, europa, nahost, global },
  // pro View ein Namespace:
  "homex","products","solutions","service","about","news","career","contact",
  "imprint","finder","co2","trust","partner","academy","refs","buyers","rfq",
  "geo": { … gemeinsame Geo-UI … },
  "geoContent": { "<slug>": { regulator, water, focus[], note, focusHeading … } }
}
```

**Regeln:** identische Schlüsselmengen über alle Locales (CI-Schema-Test);
Marken-Eigennamen bleiben in allen Sprachen englisch; `de` ist Quellsprache.

---

## Statische Daten ohne externe Quelle (bewusste Platzhalter)

| Datensatz | Status | Kennzeichnung |
|---|---|---|
| CO₂-Faktoren (Material-Vergleich) | Richtwerte | `// TODO(content): echte EPD/Ökobilanz` |
| Zertifikatsnummern (ISO 9001/14001/50001) | Platzhalter | `// TODO(content): echte Zertifikat-IDs + PDF` |
| Referenzprojekte (Globus-Marker) | Beispielprojekte | `// TODO(content): echte Referenzen + Fotos` |
| Normen je Markt | recherchiert-plausibel | `// TODO(content): rechtlich/fachlich validieren` |
| Benefits-Beträge (Karriere) | typische Richtwerte | `// TODO(content): mit Lohnbuchhaltung abstimmen` |
