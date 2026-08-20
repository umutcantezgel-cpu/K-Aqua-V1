/* K-Aqua 3D · K-Fiber UV Rohr PP-RCT SDR 7,4 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, ISO, buildProfile, createAssembly, materials, revolve, tubeLayers,
} from '../kaqua-3d-core.mjs';

/* == _pipe/params.js =================================================== */
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

export function pipeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);

  P.sdr = opt.sdr;
  P.stockLength = opt.stockLength ?? 4;
  P.rOut = a.d / 2;
  P.rIn = a.di / 2;
  P.wall = a.s;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S muss Di ergeben. Weicht es ab, stimmt
     eine abgelesene Zahl nicht — dann lieber abbrechen als ein falsches
     Rohr modellieren. Genau diese Probe hat beim Ablesen einen Fehler
     gefunden. */
  const check = a.d - 2 * a.s;
  if (Math.abs(check - a.di) > 0.25) {
    throw new Error('K-Aqua Rohr d' + a.d + ': D − 2·S = ' + check.toFixed(1) +
      ' passt nicht zu Di = ' + a.di + ' — Tabellenwert prüfen');
  }

  /* Wandstärke: die 3-mm-Restwandregel gilt für Fittings (Wand über
     einer Bohrung), nicht für Rohre — dort bestimmt die SDR-Reihe die
     Wand, und d20 bei SDR 7,4 hat legitim 2,8 mm.

     Geprüft wird deshalb zeilenweise gegen D/S, nicht gegen den
     Reihennennwert des Produkts: K-FiberClima SDR 11 und K-Fiber PP-R
     SDR 11 führen bei d20 und d25 SDR-7,4-Maße (in der Quelle mit
     Sternchen markiert). Eine Prüfung gegen den Nennwert würde diese
     beiden Rohre zu Recht abweisen. */
  P.sdrIst = Math.round((a.d / a.s) * 100) / 100;
  P.sdrAbweichend = P.sdrIst < opt.sdr - 0.5;
  if (a.s < 1.5) {
    throw new Error('K-Aqua Rohr d' + a.d + ': Wand ' + a.s + ' mm unplausibel');
  }
  return P;
}


/* == _pipe/parts.js ==================================================== */
/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


export function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

export function buildStripe(P, stripe) {
  const rise = 0.25;
  const half = (stripe.widthDeg / 2) * D2R;
  const c = (stripe.angleDeg || 0) * D2R;
  const n = 16;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2 },
    { a: P.xEnd, r: P.rOut, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}


/* == k-fiber-uv-pipe-pp-rct-sdr-74/data.js ============================= */
/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-uv-pipe-pp-rct-sdr-74-….pdf
   (Seitenbilder quellen/pg-k-fiber-uv-pipe-pp-rct-sdr-74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber UV Pipe PP-RCT SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT GF
     Colour:   outside layer black, inside layer green
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher stimmte.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.
 */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 9;
export const SDR = 7.4;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ200FUV20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ200FUV25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ200FUV32', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.39, lm: 0.42 },
  { code: 'AQ200FUV40', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.59, lm: 0.66 },
  { code: 'AQ200FUV50', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.91, lm: 1.03 },
  { code: 'AQ200FUV63', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.45, lm: 1.63 },
  { code: 'AQ200FUV75', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 2.06, lm: 2.31 },
  { code: 'AQ200FUV90', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.94, lm: 3.32 },
  { code: 'AQ200FUV110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.36, lm: 4.97 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
export const LAYERS = [
  { key: 'pprUvBlack', frac: 0.22, label: 'UV-Schutzschicht schwarz' },
  { key: 'pprGreen', frac: 0.2, label: 'PP-RCT' },
  { key: 'fiberLayer', frac: 0.36, label: 'PP-RCT GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.22, label: 'PP-RCT innen' },
];

export const STRIPES = [
  // keine Kennstreifen — die Kennung ist die schwarze Außenschicht
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == k-fiber-uv-pipe-pp-rct-sdr-74/params.js =========================== */
/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


export function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}


/* == k-fiber-uv-pipe-pp-rct-sdr-74/parts.js ============================ */
/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */


/* == k-fiber-uv-pipe-pp-rct-sdr-74/index.js ============================ */
/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-uv-pipe-pp-rct-sdr-7-4',
  module: 'kaqua-k-fiber-uv-pipe-pp-rct-sdr-7-4',
  titleDe: 'K-Fiber UV Rohr PP-RCT SDR 7,4',
  titleEn: 'K-Fiber UV Pipe PP-RCT SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-RCT GF, UV-Schutzschicht · SDR 7,4 · S 3,2',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  variants: [],
  states: null,

  tile: 'Schwarze UV-Schutzschicht für die Freiverlegung im Außenbereich — im Schnitt als vierte Lage sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-uv-pipe-pp-rct-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 188,
      clipPlane,
    });

    const layers = buildTube(P, LAYERS);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAYERS.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAYERS.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: buildStripe(P, stripe).geo,
        explode: V3(0, (LAYERS.length + 1) * P.d * 0.55, 0),
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: LAYERS.length > 1
        ? 'Schnittkante: ' + LAYERS.length + ' Lagen, Wandstärke ' +
          String(P.wall).replace('.', ',') + ' mm'
        : 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
          ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'SDR 7,4, S 3,2 — Lieferlänge ' + P.stockLength + ' m',
    });

    const zf = P.rOut + 0.10 * P.len;
    const xD = P.xEnd + 0.10 * P.len;
    A.dim({ label: 'd', value: P.d, a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf),
      off: V3(-0.09 * P.len, 0, 0) });
    A.dim({ label: 'di', value: P.di,
      a: V3(-P.xEnd - 0.06 * P.len, -P.rIn, zf), b: V3(-P.xEnd - 0.06 * P.len, P.rIn, zf),
      off: V3(0.06 * P.len, 0, 0) });

    A.measures = [
      { key: 'd', label: DIMENSION_KEY.d, soll: P.d,
        ist: () => { const b = A.boxOf(['layer0']); return b.max.y - b.min.y; } },
      /* Innendurchmesser: von der Achse radial nach außen gegen die
         INNERSTE Lage. Ein axialer Strahl trifft die Anschnittfase und
         gibt nur seinen eigenen Startradius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const hit = A.probeAxial('layer' + (LAYERS.length - 1), V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      { key: 's', label: DIMENSION_KEY.s, soll: P.s, ist: () => (P.d - P.di) / 2 },
      { key: 'lagen', label: 'Summe der Lagendicken', soll: P.wall,
        ist: () => Math.round(layers.reduce((t, l) => t + l.thickness, 0) * 100) / 100 },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
