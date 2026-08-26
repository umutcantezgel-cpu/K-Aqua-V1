/* K-Aqua 3D · Rohrabschneider 50–125 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/pipe-cutter-50-125.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_FINE, SEG_INT, arcPts, buildProfile, capFromProfile, createAssembly, loft, materials, mergeGeometries, revolve, roundedPad,
} from '../kaqua-3d-core.mjs';

/* == _handtools/parts.js =============================================== */
/* K-Aqua Handwerkzeuge (S. 114) — Bausteine. PROTOTYPEN.

   Keine Rohrgeometrie: Scherenbügel, Klingen, Griffe. Grundlage sind
   roundedPad und loft, wie 20-VISUELLE-REFERENZ §4.5 es vorgibt.
   Alle Maße ASSUMPTION aus den Katalogrendern (Kontaktbogen s114). */


/* Flacher Griff, leicht keilförmig via loft. Die loft-Sektionen sind
   { x, pts: [{a, r}] } — a wird z, r wird y (der erste Wurf übergab
   Zahlenpaare und der NaN-Wächter aus Welle 1 leerte die Ansicht
   SOFORT statt still: genau wofür er gebaut wurde). */
export function buildGriff(len, breite, dicke) {
  const sek = (x, b, d) => ({ x, pts: [
    { a: -d / 2, r: -b / 2 }, { a: -d / 2, r: b / 2 },
    { a: d / 2, r: b / 2 }, { a: d / 2, r: -b / 2 },
    { a: -d / 2, r: -b / 2 },
  ] });
  return loft([
    sek(0, breite, dicke),
    sek(len * 0.55, breite * 1.12, dicke),
    sek(len, breite * 0.8, dicke * 0.85),
  ]);
}

/* Rundgriff um Y (Maschinenstiel). */
export function buildRundgriff(len, r) {
  const profile = buildProfile([
    { a: 0, r: r * 0.75, fillet: 2 },
    { a: len * 0.2, r: r, fillet: 3 },
    { a: len * 0.8, r: r, fillet: 3 },
    { a: len, r: r * 0.6, chamfer: 2 },
    { a: len, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return revolve(profile, { axis: 'y', segments: SEG_INT });
}


/* == pipe-cutter-50-125/data.js ======================================== */
/* K-Aqua Rohrabschneider 50–125 — PROTOTYP.
   QUELLE: S. 114: Code AQ975125, Pack 1. Gestalt nach Katalogrender
   (C-Bügel-Rollenschneider mit Kurbelgriff); Maße ASSUMPTION. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: '50-125', code: 'AQ975125', bereich: '50–125', pack: 1 } ];
export const SIZES = ['50-125'];
export const DIMENSION_KEY = { bereich: 'Schneidbereich' };
export function article() { return ARTICLES[0]; }


/* == pipe-cutter-50-125/params.js ====================================== */
export function params() {
  const P = Object.assign({}, article());
  P.maxRohr = 125;
  P.buegelR = 95;            // C-Bügel um das Rohr
  P.buegelB = 26; P.buegelT = 14;
  P.griffL = 120; P.griffR = 14;
  return P;
}


/* == pipe-cutter-50-125/parts.js ======================================= */
/* C-Bügel als Bogenzug aus Pads, Schneidrad, Kurbelgriff. */
export function buildSchneider(P) {
  const geos = [];
  const N = 9;
  for (let i = 0; i < N; i++) {
    const t = (i / (N - 1)) * Math.PI * 1.25 - Math.PI * 0.15;
    const seg = roundedPad(P.buegelR * 0.42, P.buegelB, P.buegelT, 5);
    seg.rotateZ(t + Math.PI / 2);
    seg.translate(P.buegelR * Math.cos(t), P.buegelR * Math.sin(t), 0);
    geos.push(seg);
  }
  /* Schneidrad unten. */
  const rad = revolve(buildProfile([
    { a: -3, r: 16, chamfer: 1 },
    { a: 3, r: 16, chamfer: 1 },
    { a: 3, r: 4, fillet: 0 },
    { a: -3, r: 4, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
  rad.rotateX(Math.PI / 2);
  rad.translate(P.buegelR * Math.cos(-Math.PI * 0.15), P.buegelR * Math.sin(-Math.PI * 0.15) - 10, 0);
  geos.push(rad);
  /* Kurbelgriff oben. */
  const griff = buildRundgriff(P.griffL, P.griffR);
  griff.rotateZ(-Math.PI / 2 - 0.5);
  griff.translate(-P.buegelR * 0.7, P.buegelR * 0.85, 0);
  geos.push(griff);
  return { geo: mergeGeometries(geos), cap: null };
}


/* == pipe-cutter-50-125/index.js ======================================= */
/* Rohrabschneider 50–125 — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-50-125',
  module: 'kaqua-pipe-cutter-50-125',
  titleDe: 'Rohrabschneider 50–125',
  titleEn: 'Pipe cutter 50-125',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: '50-125',
  dimensionKey: DIMENSION_KEY, metaFields: ['bereich'], dimensions: [],
  ariaFields: ['bereich'], variants: [], states: null,
  tile: 'Rollenschneider mit C-Bügel für Rohre bis d125 — Gestalt nach ' +
        'Katalogbild, Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrabschneider', materials: ['steel'], seed: 233, clipPlane,
    });
    const s = buildSchneider(P);
    A.part('schneider', { name: 'Schneider', label: 'Rollenschneider (Metall)', mat: 'steel',
      geo: s.geo, cap: null, anchor: V3(P.buegelR * 0.5, P.buegelR * 0.8, 0) });
    A.light(V3(0, P.buegelR, 0)); A.light(V3(0, -P.buegelR * 0.4, 0));

    A.measures = [
      /* Anker: der Bügel muss ein d125-Rohr umgreifen. */
      { key: 'buegel', label: 'Bügelöffnung ≥ d125', soll: P.maxRohr,
        ist: () => r2(Math.min(P.maxRohr, 2 * (P.buegelR - 16 - 3))) },
      { key: 'teil', label: 'Ein Werkzeugkörper', soll: 1,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
