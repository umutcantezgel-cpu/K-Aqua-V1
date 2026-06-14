/**
 * Repository abstraction layer — Step 24 (Content-Layer / CMS prep).
 *
 * All data access goes through these functions so the source
 * (TS module ↔ CMS) can be swapped without touching consumers.
 *
 * Phase 1 (now):  Data comes from typed TS modules in `lib/data/`.
 * Phase 2 (later): Swap implementation to fetch from headless CMS
 *                   (Sanity / Storyblok / Payload) — the interface stays the same.
 *
 * @module lib/data/repositories
 */

import {
  type GeoMarket,
  type Region,
  type RegionId,
  GEO_MARKETS,
  REGIONS,
  WALDSOLMS,
  haversineKm,
  nearestMarkets,
} from './geo';
import {
  type ProductRow,
  type PipeType,
  K_CATALOG,
  K_DIMS,
  K_SDRS,
  K_TYPES,
} from './products';

// ─── Geo Repository ─────────────────────────────────────────────

/** Returns all geo markets. */
export function getMarkets(): GeoMarket[] {
  // Phase 2: replace with CMS fetch + ISR revalidation
  return GEO_MARKETS;
}

/** Returns a single geo market by slug, or `undefined` if not found. */
export function getMarket(slug: string): GeoMarket | undefined {
  // Phase 2: replace with CMS fetch by slug
  return GEO_MARKETS.find((m) => m.slug === slug);
}

/** Returns all available regions. */
export function getRegions(): Region[] {
  return REGIONS;
}

/** Returns markets filtered by region. */
export function getMarketsByRegion(region: RegionId): GeoMarket[] {
  return GEO_MARKETS.filter((m) => m.region === region);
}

/** Returns the n nearest markets to the given slug. */
export function getNearestMarkets(slug: string, n = 3): GeoMarket[] {
  return nearestMarkets(slug, n);
}

/** Returns all market slugs (useful for generateStaticParams). */
export function getMarketSlugs(): string[] {
  return GEO_MARKETS.map((m) => m.slug);
}

/** Computes distance from Waldsolms HQ to a market in km. */
export function getDistanceFromHQ(market: GeoMarket): number {
  return haversineKm(WALDSOLMS, market);
}

// ─── Product Repository ─────────────────────────────────────────

/** Returns the full product catalog. */
export function getProducts(): ProductRow[] {
  // Phase 2: replace with CMS fetch
  return K_CATALOG;
}

/** Returns products filtered by pipe type. */
export function getProductsByType(type: PipeType): ProductRow[] {
  return K_CATALOG.filter((p) => p.type === type);
}

/** Returns products filtered by dimension (d in mm). */
export function getProductsByDimension(d: number): ProductRow[] {
  return K_CATALOG.filter((p) => p.d === d);
}

/** Returns all available pipe types with labels. */
export function getProductTypes() {
  return K_TYPES;
}

/** Returns all available dimensions. */
export function getAvailableDimensions() {
  return K_DIMS;
}

/** Returns all available SDR values. */
export function getAvailableSDRs() {
  return K_SDRS;
}

// ─── Re-exports for convenience ─────────────────────────────────
export type { GeoMarket, Region, RegionId, ProductRow, PipeType };
