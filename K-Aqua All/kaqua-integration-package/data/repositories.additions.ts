// ANLEITUNG: Dies ist KEIN eigenständiges Modul zum Ablegen. Diese Funktionen gehören in
// die BESTEHENDE Datei lib/data/repositories.ts (siehe deren "Product Repository"-Abschnitt)
// — dort einfügen, bestehende Funktionen (getProducts, getMarkets, ...) unverändert lassen.
// Folgt exakt dem dort etablierten Muster (eine Funktion pro Zugriffspfad, Kommentar
// "Phase 2: replace with CMS fetch").
//
// Zusätzlicher Import an den Kopf von repositories.ts:
//   import { CATALOG, resolveCatalogHead, getCatalogTotalArticleCount } from './catalog';
//   import type { CatalogCategory, CatalogCategoryId, CatalogItem, CatalogLocale } from './catalog';
//   import { tableForSdr, sdrsForDim, SOCKET_WELD_PARAMS } from './deep';
//   import type { DimRow } from './deep';

// ─── Catalog Repository (neu — ergänzt die bestehende "Product Repository") ────

/** Returns all 7 catalog categories with their real article families. */
export function getCatalogCategories(): CatalogCategory[] {
  // Phase 2: replace with CMS fetch — see docs/CMS_PLAN.md
  return CATALOG;
}

/** Returns a single catalog category by id, or `undefined` if not found. */
export function getCatalogCategory(id: CatalogCategoryId): CatalogCategory | undefined {
  return CATALOG.find((c) => c.id === id);
}

/** Returns the verified total article-family count (computed, never hardcoded). */
export function getCatalogArticleCount(): number {
  return getCatalogTotalArticleCount();
}

/** Simple search across title + article-number codes (mirrors CatalogBrowser's client-side filter). */
export function searchCatalog(query: string): CatalogItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return CATALOG.flatMap((c) => c.items);
  return CATALOG.flatMap((c) => c.items).filter(
    (it) => it.title.toLowerCase().includes(q) || it.codes.toLowerCase().includes(q)
  );
}

export { resolveCatalogHead };

// ─── Deep-Content Repository (neu) ──────────────────────────────────────────

/** Returns the dimension table (d, s, di, pn, water, weight) for a given SDR. */
export function getDeepDimensionTable(sdr: number): DimRow[] {
  return tableForSdr(sdr);
}

/** Returns the SDR values available for a given dimension (mirrors the product finder rule). */
export function getAvailableSDRsForDimension(d: number): number[] {
  return sdrsForDim(d);
}

/** Returns the DVS 2207-11 socket-welding reference table. */
export function getSocketWeldParams() {
  return SOCKET_WELD_PARAMS;
}

// ─── Re-exports for convenience (add alongside the existing re-export line) ─────
export type { CatalogCategory, CatalogCategoryId, CatalogItem, CatalogLocale };
