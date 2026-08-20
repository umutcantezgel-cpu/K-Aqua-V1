/* K-Aqua 3D · Flachdichtung — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/flat-gasket.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_VIS, buildProfile, capFromProfile, createAssembly, materials, revolve,
} from '../kaqua-3d-core.mjs';

/* == flat-gasket/data.js =============================================== */
/* K-Aqua Flachdichtung — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-flat-gasket-….png
   (quellen/w1-gasket.png, 3004 × 9506 px).

   Spaltenköpfe wie abgebildet:  Code · d · Pack.
   11 Größen, d40 bis d315. Die Tabelle läuft über die ganze Seite;
   die letzten Zeilen standen unterhalb des ersten Zuschnitts — deshalb
   ein zweiter Blick auf dieselbe Quelle (Fehlerkatalog Fall 2).

   ── DIE QUELLE FÜHRT NUR EINE ZAHL ──
   Weder Außendurchmesser noch Innendurchmesser noch Dicke. `d` ist die
   Nennweite, für die die Dichtung passt.

   Der Nachbarartikel „Flachdichtung für Verschraubungen" ist dagegen
   vollständig bemaßt (Code · d · R/Rp · Nut thread · D · d1 · s) und
   liefert die fehlenden Verhältnisse:

     d20 → D 27, d1 20, s 3
     d25 → D 35, d1 25, s 3
     d32 → D 38, d1 28, s 3

   Daraus: s = 3 mm konstant, d1 ≈ d (bei d32 leicht darunter),
   D/d ≈ 1,35 bis 1,19 — fallend mit der Größe.

   Diese Dichtung sitzt aber zwischen zwei Flanschen, nicht in einer
   Verschraubung. Für sie gilt: der Innendurchmesser muss den
   Rohrdurchgang freilassen, der Außendurchmesser die Dichtfläche des
   Bundes abdecken. Beides ist in params.js als ASSUMPTION gerechnet und
   gegen die Bundbuchse (fittings/flange-adaptor) zu verifizieren,
   sobald die gebaut ist. */

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 11;

export const ARTICLES = [
  { code: 'AQ71440', d: 40, pack: 1 },
  { code: 'AQ71450', d: 50, pack: 1 },
  { code: 'AQ71463', d: 63, pack: 1 },
  { code: 'AQ71475', d: 75, pack: 1 },
  { code: 'AQ71490', d: 90, pack: 1 },
  { code: 'AQ714110', d: 110, pack: 1 },
  { code: 'AQ714125', d: 125, pack: 1 },
  { code: 'AQ714160', d: 160, pack: 1 },
  { code: 'AQ714200', d: 200, pack: 1 },
  { code: 'AQ714250', d: 250, pack: 1 },
  { code: 'AQ714315', d: 315, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == flat-gasket/params.js ============================================= */
/* K-Aqua Flachdichtung — Parametrik.

   Die Quelle führt nur die Nennweite. Alle drei Geometriemaße sind
   abgeleitet; die Herkunft steht in data.js. */


export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  /* ASSUMPTION Dicke 3 mm. Der Nachbarartikel „Flachdichtung für
     Verschraubungen" führt s = 3 über alle drei seiner Größen — bei
     d20, d25 und d32 gleichbleibend. Eine Flanschdichtung derselben
     Produktreihe wird kaum dünner sein. */
  P.s = 3;

  /* ASSUMPTION Innendurchmesser = Rohrbohrung bei SDR 6. Die Dichtung
     darf den Durchgang nicht verengen; jede engere Bohrung wäre eine
     Drosselstelle. */
  P.wallPipe = a.d / 6;
  P.d1 = Math.round((a.d - 2 * P.wallPipe) * 10) / 10;

  /* ASSUMPTION Außendurchmesser 1,55 × d. Hergeleitet aus der
     Bundbuchse: ihr Bunddurchmesser liegt bei etwa 2 × d, und die
     Dichtfläche endet vor dem Lochkreis. 1,55 × d deckt die Dichtfläche
     ab, ohne in die Schraubenlöcher zu reichen.
     Gegen fittings/flange-adaptor zu verifizieren. */
  P.D = Math.round(a.d * 1.55 * 10) / 10;

  P.rOut = P.D / 2;
  P.rIn = P.d1 / 2;

  /* Die Kanten sind NICHT verrundet — es ist ein Stanzteil. Nur eine
     minimale Fase gegen harte Aliasing-Kanten im Render. */
  P.edge = 0.2;

  if (P.rIn >= P.rOut - 2) {
    throw new Error('K-Aqua Flachdichtung d' + a.d + ': Dichtbreite ' +
      (P.rOut - P.rIn).toFixed(1) + ' mm zu schmal');
  }
  return P;
}


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


/* == flat-gasket/index.js ============================================== */
/* K-Aqua Flachdichtung — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, ein Werkstoff, kein Zustand. Der Maßtest prüft hier vor
   allem, dass die abgeleiteten Maße untereinander stimmen — gegen die
   Quelle sind sie nicht prüfbar, weil sie dort nicht stehen. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/flat-gasket',
  module: 'kaqua-flat-gasket',
  titleDe: 'Flachdichtung',
  titleEn: 'Flat gasket',
  category: 'accessories',
  brandLine: 'K-Aqua · EPDM',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d'],
  dimensions: ['D', 'd1'],
  ariaFields: ['d'],

  variants: [],
  states: null,

  tile: 'Dichtet die Flanschverbindung — gestanztes EPDM, ' +
        '3 mm, d40 bis d315.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Flachdichtung_d' + size,
      materials: ['epdm'],
      seed: 137,
      clipPlane,
    });

    const g = buildGasket(P);
    A.part('gasket', {
      name: 'Flachdichtung', label: 'Flachdichtung (EPDM)', mat: 'epdm',
      geo: g.geo, cap: g.cap,
      anchor: V3(0, P.rOut + 0.20 * P.D, 0),
    });

    A.light(V3(P.s * 2, 0, 0));

    A.hotspot({
      v: V3(0, (P.rOut + P.rIn) / 2 * 0.7, (P.rOut + P.rIn) / 2 * 0.7),
      n: V3(0.4, 0.65, 0.65),
      text: 'Dichtfläche ' + ((P.D - P.d1) / 2).toFixed(1).replace('.', ',') +
        ' mm breit, Dicke ' + P.s + ' mm',
    });

    const zf = P.rOut + 0.10 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.s * 3, -P.rOut, zf), b: V3(-P.s * 3, P.rOut, zf),
      off: V3(P.s * 2.5, 0, 0) });
    A.dim({ label: 'd1', value: P.d1,
      a: V3(P.s * 3, -P.rIn, zf), b: V3(P.s * 3, P.rIn, zf),
      off: V3(-P.s * 2.5, 0, 0) });

    A.measures = [
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.D,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.z - b.min.z; } },
      /* Innendurchmesser: von der Achse radial nach außen — hier ist das
         richtig, weil das Teil keine Bohrungswand vor dem Innenrand hat. */
      { key: 'd1', label: DIMENSION_KEY.d1 + ' (abgeleitet)', soll: P.d1,
        ist: () => {
          const hit = A.probeAxial('gasket', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s + ' (abgeleitet)', soll: P.s,
        ist: () => { const b = A.boxOf(['gasket']); return b.max.x - b.min.x; } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
