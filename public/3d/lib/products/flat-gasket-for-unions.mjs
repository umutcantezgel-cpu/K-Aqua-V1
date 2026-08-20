/* K-Aqua 3D · Flachdichtung für Verschraubungen — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/flat-gasket-for-unions.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_VIS, buildProfile, capFromProfile, createAssembly, materials, revolve,
} from '../kaqua-3d-core.mjs';

/* == flat-gasket/parts.js ============================================== */
/* K-Aqua Flachdichtung — Kontur.

   Das einfachste Teil des Katalogs: ein Rechteckquerschnitt, um X
   rotiert. Vier Konturpunkte.

   Bewusst OHNE Verrundung: eine gestanzte EPDM-Dichtung hat scharfe
   Kanten. Die 0,2-mm-Fase ist nur da, damit die Kante im Render nicht
   flimmert — sie ist keine Konstruktionsfase. */


export function buildGasket(P) {
  const x0 = -P.s / 2, x1 = P.s / 2;
  const profile = buildProfile([
    { a: x0, r: P.rIn, chamfer: P.edge },
    { a: x0, r: P.rOut, chamfer: P.edge },
    { a: x1, r: P.rOut, chamfer: P.edge },
    { a: x1, r: P.rIn, chamfer: P.edge },
  ], { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x'), profile };
}


/* == flat-gasket-for-unions/data.js ==================================== */
/* K-Aqua Flachdichtung für Verschraubungen — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-flat-gasket-for-unions-pp-r-….png
   (quellen/w1-gasket-unions.png, 3004 × 8594 px).

   Spaltenköpfe wie abgebildet:
     Code · d · R/Rp · Nut thread · D · d1 · s · Pack.
   3 Größen. Danach folgt unmittelbar der ORDER-Knopf.

   VOLLSTÄNDIG BEMASST — im Gegensatz zur einfachen Flachdichtung, die
   nur die Nennweite führt. Diese Tabelle ist deshalb die Quelle für
   deren abgeleitete Verhältnisse (siehe products/flat-gasket/data.js).

   MASSSCHLÜSSEL:
     d          Nennweite der Verschraubung
     R/Rp       Rohrgewinde der Verschraubung, in Zoll
     Nut thread Gewinde der Überwurfmutter, G-Gewinde in Zoll
     D          Außendurchmesser der Dichtung
     d1         Innendurchmesser der Dichtung
     s          Dicke

   Gegenproben:
     D > d1 in jeder Zeile ✓  (27>20 · 35>25 · 38>28)
     Dichtbreite (D−d1)/2 = 3,5 · 5,0 · 5,0 mm — plausibel für eine
       Flachdichtung dieser Größe
     d1 gegen d: 20/20 = 1,00 · 25/25 = 1,00 · 28/32 = 0,875
       Bei d20 und d25 ist d1 = d, bei d32 liegt d1 darunter. Das ist
       kein Ablesefehler: die Dichtung sitzt im Grund der Verschraubung,
       und deren Durchgang ist bei d32 enger als das Rohr-Außenmaß.
     s = 3 konstant über alle Größen

   Die Spalten R/Rp und Nut thread beschreiben die VERSCHRAUBUNG, nicht
   die Dichtung. Sie sind übernommen, weil sie die Zuordnung eindeutig
   machen — zwei Dichtungen könnten sonst dasselbe D bei verschiedenem
   Gewinde haben. Modelliert werden sie nicht. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 3;

export const ARTICLES = [
  { code: 'AQ490F20', d: 20, R: '1/2', nutThread: '3/4', D: 27, d1: 20, s: 3, pack: 1 },
  { code: 'AQ490F25', d: 25, R: '3/4', nutThread: '1', D: 35, d1: 25, s: 3, pack: 1 },
  { code: 'AQ490F32', d: 32, R: '1', nutThread: '1 1/4', D: 38, d1: 28, s: 3, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  R: 'Rohrgewinde',
  nutThread: 'Muttergewinde',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == flat-gasket-for-unions/params.js ================================== */
/* K-Aqua Flachdichtung für Verschraubungen — Parametrik.

   Hier ist fast nichts zu rechnen: D, d1 und s stehen in der Tabelle.
   Genau so soll es sein. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  P.D = a.D;
  P.d1 = a.d1;
  P.s = a.s;
  P.rOut = a.D / 2;
  P.rIn = a.d1 / 2;
  P.width = Math.round((a.D - a.d1) / 2 * 10) / 10;

  /* Stanzteil: scharfe Kanten. Die 0,2-mm-Fase ist nur gegen
     Aliasing im Render, keine Konstruktionsfase. */
  P.edge = 0.2;

  if (P.width < 2) {
    throw new Error('K-Aqua Flachdichtung d' + a.d + ': Dichtbreite ' +
      P.width + ' mm zu schmal');
  }
  return P;
}


/* == flat-gasket-for-unions/parts.js =================================== */
/* K-Aqua Flachdichtung für Verschraubungen — Kontur.
   Kommt vollständig aus dem Modul der einfachen Flachdichtung: beide
   sind gestanzte Ringe, nur mit anderen Maßen. */


/* == flat-gasket-for-unions/index.js =================================== */
/* K-Aqua Flachdichtung für Verschraubungen — Produktpaket.

   Der Maßtest ist hier aussagekräftiger als bei der einfachen
   Flachdichtung: alle drei Maße stehen in der Quelle. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/flat-gasket-for-unions',
  module: 'kaqua-flat-gasket-for-unions',
  titleDe: 'Flachdichtung für Verschraubungen',
  titleEn: 'Flat gasket for unions PP-R',
  category: 'accessories',
  brandLine: 'K-Aqua · EPDM',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 25,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'd1', 's'],
  dimensions: ['D', 'd1'],
  ariaFields: ['d', 'D', 'd1', 's'],

  variants: [],
  states: null,

  tile: 'Dichtet die lösbare Verschraubung — gestanztes EPDM, 3 mm, ' +
        'passend zu d20, d25 und d32.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Flachdichtung_Verschraubung_d' + size,
      materials: ['epdm'],
      seed: 139,
      clipPlane,
    });

    const g = buildGasket(P);
    A.part('gasket', {
      name: 'Flachdichtung', label: 'Flachdichtung (EPDM)', mat: 'epdm',
      geo: g.geo, cap: g.cap,
      anchor: V3(0, P.rOut + 0.55 * P.D, 0),
    });

    A.light(V3(P.s * 2, 0, 0));

    A.hotspot({
      v: V3(0, (P.rOut + P.rIn) / 2 * 0.7, (P.rOut + P.rIn) / 2 * 0.7),
      n: V3(0.4, 0.65, 0.65),
      text: 'Dichtbreite ' + String(P.width).replace('.', ',') +
        ' mm — liegt im Grund der Verschraubung R' + P.R + '"',
    });

    const zf = P.rOut + 0.24 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.s * 4, -P.rOut, zf), b: V3(-P.s * 4, P.rOut, zf),
      off: V3(P.s * 3.5, 0, 0) });
    A.dim({ label: 'd1', value: P.d1,
      a: V3(P.s * 4, -P.rIn, zf), b: V3(P.s * 4, P.rIn, zf),
      off: V3(-P.s * 3.5, 0, 0) });

    A.measures = [
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.z - b.min.z; } },
      { key: 'd1', label: DIMENSION_KEY.d1, soll: P.d1,
        ist: () => {
          const hit = A.probeAxial('gasket', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.x - b.min.x; } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
