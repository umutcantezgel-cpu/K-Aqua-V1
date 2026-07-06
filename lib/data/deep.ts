// K-Aqua Deep-Content — sprachneutrale Rechendatenbasis.
//
// QUELLE: kaqua-deep-data.js (Design-Projekt "K-Aqua", Stand 2026-07-04).
// PORTIERT: 1:1 — Formeln, Konstanten (DIMS/SDRS/PN) und die DVS-2207-11-Richtwerttabelle
//           (WELD) unverändert übernommen.
// ANGEPASST: JS-IIFE (window.K_DEEP) -> typisiertes TS-Modul, gleiche Funktionsnamen.
// WICHTIG (aus dem Quellkommentar übernommen — nicht abschwächen): Rechenwerte aus der
//           SDR-Geometrie (SDR = d/s, DIN-8077-Reihen) und Richtwerte nach DVS 2207-11.
//           Verbindlich bleiben Katalog (siehe catalog.ts) & Gerätehersteller-Anleitung.

export const DIMS = [20,25,32,40,50,63,75,90,110,125,160,200,250,315,400,500,630] as const;
export type Dim = (typeof DIMS)[number];

export const SDRS = [6,7.4,9,11,17] as const;
export type Sdr = (typeof SDRS)[number];

export const PN_BY_SDR: Record<number, number> = {"6":20,"9":12.5,"11":10,"17":6,"7.4":16};

/** Availability rule identical to the product finder (lib/data/products.ts generation logic). */
export function sdrsForDim(d: number): number[] {
  if (d <= 63) return [...SDRS];
  if (d <= 160) return [7.4, 9, 11, 17];
  if (d <= 315) return [9, 11, 17];
  return [11, 17];
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export interface DimRow {
  d: number;
  sdr: number;
  /** wall thickness s = d/SDR (min. 1.9mm), mm */
  s: number;
  /** inner diameter di = d - 2s, mm */
  di: number;
  pn: number;
  /** water content, l/m */
  water: number;
  /** weight, kg/m (PP density 0.905 g/cm3) */
  weight: number;
}

/** Geometry: s = d/SDR (min 1.9mm), di = d - 2s. water[l/m] = pi*(di/2)^2/1000. weight[kg/m] = pi*(d-s)*s*0.905/1000. */
export function row(d: number, sdr: number): DimRow {
  const s = Math.max(1.9, round1(d / sdr));
  const di = round1(d - 2 * s);
  const water = round2((Math.PI * Math.pow(di / 2, 2)) / 1000);
  const weight = round2((Math.PI * (d - s) * s * 0.905) / 1000);
  return { d, sdr, s, di, pn: PN_BY_SDR[sdr] ?? 0, water, weight };
}

export function tableForSdr(sdr: number): DimRow[] {
  return DIMS.filter((d) => sdrsForDim(d).includes(sdr)).map((d) => row(d, sdr));
}

/** Socket-fusion (Muffenschweißen) reference values per DVS 2207-11, heating element 250-270C.
 *  Tuple: [d mm, weld depth mm, heating time s, max changeover time s, cooling time min] */
export const SOCKET_WELD_PARAMS: Array<[number, number, number, number, number]> = [[20,14,5,4,2],[25,15,7,4,2],[32,16.5,8,6,4],[40,18,12,6,4],[50,20,18,6,4],[63,24,24,8,6],[75,26,30,8,6],[90,29,40,8,6],[110,32.5,50,10,8],[125,36,60,10,8]];

export type DeepLocale = "de" | "en" | "ar";

export function formatNumber(n: number, locale: DeepLocale): string {
  if (typeof n !== "number") return String(n);
  return n.toLocaleString(locale === "de" ? "de-DE" : "en-US");
}

export function formatPN(pn: number, locale: DeepLocale): string {
  return "PN " + formatNumber(pn, locale);
}
