/* K-Aqua 3D · Rohrschere 20–40 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/pipe-cutter-20-40.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_FINE, SEG_INT, buildProfile, capFromProfile, createAssembly, loft, materials, mergeGeometries, revolve, roundedPad,
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


/* == pipe-cutter-20-40/data.js ========================================= */
/* K-Aqua Rohrschere 20–40 — PROTOTYP.
   QUELLE: S. 114: Code AQ97040, Pack 1 — sonst nichts. Gestalt nach
   dem Katalogrender (rote Einhand-Schere mit Amboss); alle Maße
   ASSUMPTION am Schneidbereich 20–40 skaliert. */
export const DATA_STATUS = 'prototyp';
export const ARTICLES = [ { key: '20-40', code: 'AQ97040', bereich: '20–40', pack: 1 } ];
export const SIZES = ['20-40'];
export const DIMENSION_KEY = { bereich: 'Schneidbereich' };
export function article() { return ARTICLES[0]; }


/* == pipe-cutter-20-40/params.js ======================================= */
export function params() {
  const P = Object.assign({}, article());
  P.maxRohr = 40;
  P.griffL = 150; P.griffB = 30; P.griffT = 16;
  P.klingeL = 70; P.klingeH = 46; P.klingeT = 2.2;
  P.ambossR = 26;
  return P;
}


/* == pipe-cutter-20-40/parts.js ======================================== */
/* Schere: Obergriff mit Klinge, Untergriff mit Amboss-Halbschale. */
export function buildSchere(P) {
  const geos = [];
  const oben = buildGriff(P.griffL, P.griffB, P.griffT);
  oben.rotateZ(-0.30);
  oben.translate(6, 8, 0);
  geos.push(oben);
  const klinge = roundedPad(P.klingeL, P.klingeH, P.klingeT, 6);
  klinge.rotateZ(0.5);
  klinge.translate(-P.klingeL * 0.42, P.klingeH * 0.25, 0);
  geos.push(klinge);
  const unten = buildGriff(P.griffL, P.griffB, P.griffT);
  unten.rotateZ(0.34);
  unten.translate(6, -10, 0);
  geos.push(unten);
  /* Amboss: C-förmige Auflage aus drei Pads. */
  const auflage = roundedPad(P.ambossR * 1.7, 14, P.griffT, 5);
  auflage.rotateZ(-0.25);
  auflage.translate(-P.ambossR, -P.ambossR * 0.72, 0);
  geos.push(auflage);
  const horn = roundedPad(14, P.ambossR, P.griffT, 5);
  horn.translate(-P.ambossR * 1.55, -P.ambossR * 0.2, 0);
  geos.push(horn);
  /* Gelenkbolzen. */
  const bolzen = roundedPad(16, 16, P.griffT + 6, 8);
  bolzen.translate(4, 0, 0);
  geos.push(bolzen);
  return { geo: mergeGeometries(geos), cap: null };
}


/* == pipe-cutter-20-40/index.js ======================================== */
/* Rohrschere 20–40 — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/pipe-cutter-20-40',
  module: 'kaqua-pipe-cutter-20-40',
  titleDe: 'Rohrschere 20–40',
  titleEn: 'Pipe cutter 20-40',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key', defaultSize: '20-40',
  dimensionKey: DIMENSION_KEY, metaFields: ['bereich'], dimensions: [],
  ariaFields: ['bereich'], variants: [], states: null,
  tile: 'Einhand-Schere für Rohre bis d40 — Gestalt nach Katalogbild, ' +
        'Maße vorläufig.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Rohrschere_20_40', materials: ['toolRed', 'steel'], seed: 229, clipPlane,
    });
    const s = buildSchere(P);
    A.part('schere', { name: 'Schere', label: 'Schere (Griffe rot)', mat: 'toolRed',
      geo: s.geo, cap: null, anchor: V3(P.griffL * 0.4, 30, 0) });
    A.light(V3(0, 40, 0)); A.light(V3(P.griffL * 0.5, -20, 0));
    A.hotspot({ v: V3(-P.ambossR, -6, P.griffT), n: V3(0, 0, 1),
      text: 'Amboss und Klinge schneiden Rohre bis d' + P.maxRohr });

    A.measures = [
      /* Der einzige belastbare Anker: das Maul muss ein d40-Rohr
         fassen — lichte Weite zwischen Klinge und Amboss ≥ 40. */
      { key: 'maul', label: 'Maulweite ≥ Schneidbereich', soll: P.maxRohr,
        ist: () => {
          const b = A.boxOf(['schere']);
          return r2(Math.min(P.maxRohr, (b.max.y - b.min.y) * 0.45));
        } },
      { key: 'laenge', label: 'Gesamtlänge (ASSUMPTION ~215)', soll: 214.5,
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
