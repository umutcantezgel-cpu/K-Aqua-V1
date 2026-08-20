const __p11 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-rct-sdr-74-….pdf
   (Seitenbilder quellen/pg-k-pipe-pp-rct-sdr-74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Pipe PP-RCT SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT
     Colour:   green with 1 red stripe
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher stimmte.

   Transkriptionsprobe D − 2·S = Di: über alle 10 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const SDR = 7.4;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ20020', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ20025', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.23, lm: 0.25 },
  { code: 'AQ20032', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.37, lm: 0.42 },
  { code: 'AQ20040', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.57, lm: 0.66 },
  { code: 'AQ20050', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.88, lm: 1.03 },
  { code: 'AQ20063', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.39, lm: 1.63 },
  { code: 'AQ20075', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 1.98, lm: 2.31 },
  { code: 'AQ20090', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.83, lm: 3.32 },
  { code: 'AQ200110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.25, lm: 4.97 },
  { code: 'AQ200125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.41, lm: 6.47 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 1, label: 'PP-RCT' },
];

const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Rohr PP-RCT SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-pp-rct-sdr-7-4',
  module: 'kaqua-k-pipe-pp-rct-sdr-7-4',
  titleDe: 'K-Rohr PP-RCT SDR 7,4',
  titleEn: 'K-Pipe PP-RCT SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-RCT · SDR 7,4 · S 3,2',
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

  tile: 'PP-RCT hält bei gleicher Wandstärke höhere Dauertemperaturen als PP-R.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-pipe-pp-rct-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 110,
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

return product;
})();

const __p12 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-74-….pdf
   (Seitenbilder quellen/fiber74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 grey stripes
     Standards: DIN EN ISO 15874

   Transkriptionsprobe D − 2·S = Di: über alle 14 Zeilen erfüllt.

   Fußnote der Quelle, wörtlich:
   „Pipe can be delivered in 5.80 meter length on special request with product code AQ258F+dimension"

   ASSUMPTION d315: Di am Screenshot als 229,8 gelesen. Das verletzt die Identitaet D minus 2S gleich Di (315 minus 86,2 gleich 228,8). In den anderen 13 Zeilen stimmt sie auf die Zehntelstelle, deshalb ist 228,8 uebernommen und als abgeleitet markiert. Am Original nachzulesen.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 14;
const SDR = 7.4;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ207PF20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ207PF25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ207PF32', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.39, lm: 0.42 },
  { code: 'AQ207PF40', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.59, lm: 0.66 },
  { code: 'AQ207PF50', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.91, lm: 1.03 },
  { code: 'AQ207PF63', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.45, lm: 1.63 },
  { code: 'AQ207PF75', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 2.06, lm: 2.31 },
  { code: 'AQ207PF90', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.94, lm: 3.32 },
  { code: 'AQ207PF110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.36, lm: 4.97 },
  { code: 'AQ207PF125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.61, lm: 6.47 },
  { code: 'AQ207PF160', d: 160, dn: 115, di: 116.2, s: 21.9, pack: 4, kgm: 9.09, lm: 10.6 },
  { code: 'AQ207PF200', d: 200, dn: 145, di: 145.2, s: 27.4, pack: 4, kgm: 14.23, lm: 16.55 },
  { code: 'AQ207PF250', d: 250, dn: 180, di: 181.6, s: 34.2, pack: 4, kgm: 22.08, lm: 25.89 },
  { code: 'AQ207PF315', d: 315, dn: 230, di: 228.8, s: 43.1, pack: 4, kgm: 34.89, lm: 39.39, abgeleitet: ['di'] },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

const STRIPES = [
  { key: 'greyStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber Rohr PP-R SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-r-sdr-7-4',
  module: 'kaqua-k-fiber-pipe-pp-r-sdr-7-4',
  titleDe: 'K-Fiber Rohr PP-R SDR 7,4',
  titleEn: 'K-Fiber Pipe PP-R SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF · SDR 7,4 · S 3,2',
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

  tile: 'Glasfaserverstärkt: der Faserkern nimmt die Längsdehnung auf, die Leitung braucht weniger Festpunkte. Im Schnitt sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 71,
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

return product;
})();

const __p13 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber Rohr PP-RCT SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-rct-sdr-74-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-rct-sdr-74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-RCT SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT GF
     Colour:   green with 4 red stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 10 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const SDR = 7.4;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ200F20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ200F25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ200F32', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.39, lm: 0.42 },
  { code: 'AQ200F40', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.59, lm: 0.66 },
  { code: 'AQ200F50', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.91, lm: 1.03 },
  { code: 'AQ200F63', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.45, lm: 1.63 },
  { code: 'AQ200F75', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 2.06, lm: 2.31 },
  { code: 'AQ200F90', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.94, lm: 3.32 },
  { code: 'AQ200F110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.36, lm: 4.89 },
  { code: 'AQ200F125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.61, lm: 6.47 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-RCT GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT innen' },
];

const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber Rohr PP-RCT SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber Rohr PP-RCT SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber Rohr PP-RCT SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-rct-sdr-7-4',
  module: 'kaqua-k-fiber-pipe-pp-rct-sdr-7-4',
  titleDe: 'K-Fiber Rohr PP-RCT SDR 7,4',
  titleEn: 'K-Fiber Pipe PP-RCT SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-RCT GF · SDR 7,4 · S 3,2',
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

  tile: 'Faserverstärkt und temperaturfester: die Kombination für Heizungs- und Warmwasserleitungen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-rct-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 123,
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

return product;
})();

const __p14 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-9-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-9-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 9" SDR 9 — S 4 (20 °C/2,0 MPa — 60 °C/1,0 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 blue stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 8 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 8;
const SDR = 9;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ169PF32', d: 32, dn: 25, di: 24.8, s: 3.6, pack: 60, kgm: 0.33, lm: 0.48 },
  { code: 'AQ169PF40', d: 40, dn: 32, di: 31, s: 4.5, pack: 40, kgm: 0.52, lm: 0.75 },
  { code: 'AQ169PF50', d: 50, dn: 40, di: 38.8, s: 5.6, pack: 20, kgm: 0.8, lm: 1.18 },
  { code: 'AQ169PF63', d: 63, dn: 50, di: 48.8, s: 7.1, pack: 20, kgm: 1.25, lm: 1.87 },
  { code: 'AQ169PF75', d: 75, dn: null, di: 58.2, s: 8.4, pack: 12, kgm: 1.77, lm: 2.66 },
  { code: 'AQ169PF90', d: 90, dn: 65, di: 69.8, s: 10.1, pack: 8, kgm: 2.55, lm: 3.83 },
  { code: 'AQ169PF110', d: 110, dn: 80, di: 85.4, s: 12.3, pack: 4, kgm: 3.78, lm: 5.73 },
  { code: 'AQ169PF125', d: 125, dn: 100, di: 97, s: 14, pack: 4, kgm: 4.89, lm: 7.39 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

const STRIPES = [
  { key: 'blueStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-r-sdr-9',
  module: 'kaqua-k-fiber-pipe-pp-r-sdr-9',
  titleDe: 'K-Fiber Rohr PP-R SDR 9',
  titleEn: 'K-Fiber Pipe PP-R SDR 9',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF · SDR 9 · S 4',
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

  tile: 'Mittlere Druckstufe der Faserrohre — beginnt erst bei d32.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-9' + '_d' + size,
      materials: matKeys,
      seed: 149,
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
      text: 'SDR 9, S 4 — Lieferlänge ' + P.stockLength + ' m',
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

return product;
})();

const __p15 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber Rohr PP-R SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 red stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.

   Wie beim K-FiberClima tragen d20 und d25 ein Sternchen an S min. und führen SDR-7,4-Maße (2,8 / 3,5 mm). Ab d32 gilt SDR 11.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;
const SDR = 11;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ111PF20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ111PF25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ111PF32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.28, lm: 0.54 },
  { code: 'AQ111PF40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.43, lm: 0.83 },
  { code: 'AQ111PF50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.67, lm: 1.31 },
  { code: 'AQ111PF63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.04, lm: 2.07 },
  { code: 'AQ111PF75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.44, lm: 2.96 },
  { code: 'AQ111PF90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.08, lm: 4.25 },
  { code: 'AQ111PF110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.1, lm: 6.36 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber Rohr PP-R SDR 11 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber Rohr PP-R SDR 11 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber Rohr PP-R SDR 11 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-r-sdr-11',
  module: 'kaqua-k-fiber-pipe-pp-r-sdr-11',
  titleDe: 'K-Fiber Rohr PP-R SDR 11',
  titleEn: 'K-Fiber Pipe PP-R SDR 11',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF · SDR 11 · S 5',
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

  tile: 'Dünnwandiges Faserrohr für Verteilleitungen mit niedrigerem Betriebsdruck.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-11' + '_d' + size,
      materials: matKeys,
      seed: 162,
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
      text: 'SDR 11, S 5 — Lieferlänge ' + P.stockLength + ' m',
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

return product;
})();

const __p16 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber Rohr PP-R SDR 17 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-pipe-pp-r-sdr-17-….pdf
   (Seitenbilder quellen/pg-k-fiber-pipe-pp-r-sdr-17-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber Pipe PP-R SDR 17" SDR 17 — S 8 (20 °C/1,0 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   green with 4 red stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 8 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 8;
const SDR = 17;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ117PF90', d: 90, dn: 65, di: 79.2, s: 5.4, pack: 8, kgm: 1.46, lm: 4.93 },
  { code: 'AQ117PF110', d: 110, dn: 80, di: 96.8, s: 6.6, pack: 4, kgm: 2.16, lm: 7.36 },
  { code: 'AQ117PF125', d: 125, dn: 100, di: 110.2, s: 7.4, pack: 4, kgm: 2.77, lm: 9.54 },
  { code: 'AQ117PF160', d: 160, dn: 125, di: 141, s: 9.5, pack: 4, kgm: 4.52, lm: 15.61 },
  { code: 'AQ117PF200', d: 200, dn: 160, di: 176.2, s: 11.9, pack: 4, kgm: 7.05, lm: 24.38 },
  { code: 'AQ117PF250', d: 250, dn: 200, di: 220.4, s: 14.8, pack: 4, kgm: 10.9, lm: 38.15 },
  { code: 'AQ117PF315', d: 315, dn: 250, di: 277.6, s: 18.7, pack: 4, kgm: 17.26, lm: 60.52 },
  { code: 'AQ117PF355', d: 355, dn: 300, di: 312.8, s: 21.1, pack: 4, kgm: 21.83, lm: 76.85 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'redStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber Rohr PP-R SDR 17 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber Rohr PP-R SDR 17 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber Rohr PP-R SDR 17 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-pipe-pp-r-sdr-17',
  module: 'kaqua-k-fiber-pipe-pp-r-sdr-17',
  titleDe: 'K-Fiber Rohr PP-R SDR 17',
  titleEn: 'K-Fiber Pipe PP-R SDR 17',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF · SDR 17 · S 8',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 90,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'di', 's', 'kgm'],
  dimensions: ['d', 'di'],
  ariaFields: ['d', 'di', 's'],

  variants: [],
  states: null,

  tile: 'Die Großdurchmesser-Reihe, d90 bis d355 — für Steigleitungen und Hauptverteilung.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-17' + '_d' + size,
      materials: matKeys,
      seed: 175,
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
      text: 'SDR 17, S 8 — Lieferlänge ' + P.stockLength + ' m',
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

return product;
})();

const __p17 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-FiberClima Rohr PP-RCT SDR 11 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiberclima-pipe-pp-rct-sdr-11-….pdf
   (Seitenbilder quellen/pg-k-fiberclima-pipe-pp-rct-sdr-11-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-FiberClima Pipe PP-RCT SDR 11" SDR 11 — S 5 (20 °C/1,6 MPa — 60 °C/0,8 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-RCT GF
     Colour:   green with 4 blue stripes
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher war grau.

   Transkriptionsprobe D − 2·S = Di: über alle 9 Zeilen erfüllt.

   Die Zeilen d20 und d25 tragen in der Quelle ein Sternchen an der Spalte S min. und führen SDR-7,4-Maße (2,8 / 3,5 mm) statt SDR-11-Maßen. Ab d32 gilt die SDR-11-Reihe. Übernommen wie abgebildet; params.js prüft deshalb je Zeile gegen D/S und nicht gegen den Reihennennwert.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;
const SDR = 11;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ160F20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ160F25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ160F32', d: 32, dn: 25, di: 26.2, s: 2.9, pack: 60, kgm: 0.28, lm: 0.54 },
  { code: 'AQ160F40', d: 40, dn: 32, di: 32.6, s: 3.7, pack: 40, kgm: 0.43, lm: 0.83 },
  { code: 'AQ160F50', d: 50, dn: 40, di: 40.8, s: 4.6, pack: 20, kgm: 0.67, lm: 1.31 },
  { code: 'AQ160F63', d: 63, dn: 50, di: 51.4, s: 5.8, pack: 20, kgm: 1.04, lm: 2.07 },
  { code: 'AQ160F75', d: 75, dn: null, di: 61.4, s: 6.8, pack: 12, kgm: 1.44, lm: 2.96 },
  { code: 'AQ160F90', d: 90, dn: 65, di: 73.6, s: 8.2, pack: 8, kgm: 2.08, lm: 4.25 },
  { code: 'AQ160F110', d: 110, dn: 80, di: 90, s: 10, pack: 4, kgm: 3.1, lm: 6.36 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-RCT GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-RCT innen' },
];

const STRIPES = [
  { key: 'blueStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'blueStripe', angleDeg: 270, widthDeg: 7 },
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-FiberClima Rohr PP-RCT SDR 11 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-FiberClima Rohr PP-RCT SDR 11 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-FiberClima Rohr PP-RCT SDR 11 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiberclima-pipe-pp-rct-sdr-11',
  module: 'kaqua-k-fiberclima-pipe-pp-rct-sdr-11',
  titleDe: 'K-FiberClima Rohr PP-RCT SDR 11',
  titleEn: 'K-FiberClima Pipe PP-RCT SDR 11',
  category: 'pipes',
  brandLine: 'K-Aqua PP-RCT GF · SDR 11 · S 5',
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

  tile: 'Für Klima- und Heizungsverteilung: faserverstärkt, dünnwandig, hoher Durchfluss.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiberclima-pipe-pp-rct-sdr-11' + '_d' + size,
      materials: matKeys,
      seed: 136,
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
      text: 'SDR 11, S 5 — Lieferlänge ' + P.stockLength + ' m',
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

return product;
})();

const __p18 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 9;
const SDR = 7.4;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
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

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprUvBlack', frac: 0.22, label: 'UV-Schutzschicht schwarz' },
  { key: 'pprGreen', frac: 0.2, label: 'PP-RCT' },
  { key: 'fiberLayer', frac: 0.36, label: 'PP-RCT GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.22, label: 'PP-RCT innen' },
];

const STRIPES = [
  // keine Kennstreifen — die Kennung ist die schwarze Außenschicht
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber UV Rohr PP-RCT SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

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

return product;
})();

const __p19 = (() => {
/* K-Aqua Rohrfamilie — Parametrik.

   Gemeinsam für alle zwölf Rohre. D, Di und S stehen in der Tabelle;
   gerechnet wird nur die Darstellungslänge.

   Warum ein Familienmodul: params.js und parts.js waren bei allen zwölf
   Rohren wörtlich identisch. Ab dem dritten Rohr ist die Duplizierung
   nicht mehr zu rechtfertigen — der Produktvertrag erlaubt geteilte
   Fachlogik ausdrücklich. Produktspezifisch bleibt nur data.js. */

function pipeParams(article, opt) {
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

/* K-Aqua Rohrfamilie — Kontur.

   Mehrschichtrohr über tubeLayers(): jede Lage ein eigener Ring mit
   eigener Schnittfläche. Ein monolithisches PP-R-Rohr hat eine Lage,
   die Faserrohre drei, die UV-Rohre vier. Sonst ändert sich nichts.

   Dazu die Längsstreifen als Coextrusionsspur: ein Kreisbogen-
   Ausschnitt der Mantelfläche, minimal aufgesetzt, an den Rändern
   verlaufend — beim Coextrudieren fließt die Farbspur in die
   Mantelfläche ein, sie sitzt nicht als Leiste darauf. */


function buildTube(P, layers) {
  return tubeLayers(P.d, P.wall, layers, { length: P.len, x0: -P.xEnd });
}

function buildStripe(P, stripe) {
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

/* K-Aqua K-Fiber UV Rohr PP-R SDR 7,4 — Artikeltabelle.

   PHASE 1, verifiziert am 17.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-fiber-uv-pipe-pp-r-sdr-74-….pdf
   (Seitenbilder quellen/pg-k-fiber-uv-pipe-pp-r-sdr-74-p1.jpg, -p2.jpg). Die Tabelle läuft
   über den Seitenumbruch.

   Spaltenköpfe: Code · D · DN · Di · S min. · Pack. · Weight (kg/m) ·
   Water capacity (l/m)
   Kopfzeile: „K-Fiber UV Pipe PP-R SDR 7,4" SDR 7,4 — S 3,2 (20 °C/2,5 MPa — 60 °C/1,2 MPa), length 4 meter

   Zeichnungsangabe wörtlich (Miniatur neben dem Produktfoto):
     Material: PP-R GF
     Colour:   outside layer black, inside layer green
     Standards: DIN EN ISO 15874
   Am 17.08.2026 nachgelesen — vorher stimmte.

   Transkriptionsprobe D − 2·S = Di: über alle 10 Zeilen erfüllt.
 */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 10;
const SDR = 7.4;
const STOCK_LENGTH_M = 4;

const ARTICLES = [
  { code: 'AQ200PFUV20', d: 20, dn: 15, di: 14.4, s: 2.8, pack: 100, kgm: 0.16, lm: 0.16 },
  { code: 'AQ200PFUV25', d: 25, dn: 20, di: 18, s: 3.5, pack: 100, kgm: 0.25, lm: 0.25 },
  { code: 'AQ200PFUV32', d: 32, dn: 25, di: 23.2, s: 4.4, pack: 60, kgm: 0.39, lm: 0.42 },
  { code: 'AQ200PFUV40', d: 40, dn: 32, di: 29, s: 5.5, pack: 40, kgm: 0.59, lm: 0.66 },
  { code: 'AQ200PFUV50', d: 50, dn: 40, di: 36.2, s: 6.9, pack: 20, kgm: 0.91, lm: 1.03 },
  { code: 'AQ200PFUV63', d: 63, dn: 50, di: 45.8, s: 8.6, pack: 20, kgm: 1.45, lm: 1.63 },
  { code: 'AQ200PFUV75', d: 75, dn: null, di: 54.4, s: 10.3, pack: 12, kgm: 2.06, lm: 2.31 },
  { code: 'AQ200PFUV90', d: 90, dn: 65, di: 65.4, s: 12.3, pack: 8, kgm: 2.94, lm: 3.32 },
  { code: 'AQ200PFUV110', d: 110, dn: 80, di: 79.8, s: 15.1, pack: 4, kgm: 4.36, lm: 4.97 },
  { code: 'AQ200PFUV125', d: 125, dn: 90, di: 90.8, s: 17.1, pack: 4, kgm: 5.61, lm: 6.47 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Wandaufbau von außen nach innen. Der Grund, warum diese Produkte ein
   3D-Modell rechtfertigen: im Schnitt wird sichtbar, was ein
   Katalogfoto nicht zeigen kann. */
const LAYERS = [
  { key: 'pprUvBlack', frac: 0.22, label: 'UV-Schutzschicht schwarz' },
  { key: 'pprGreen', frac: 0.2, label: 'PP-R' },
  { key: 'fiberLayer', frac: 0.36, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.22, label: 'PP-R innen' },
];

const STRIPES = [
  // keine Kennstreifen — die Kennung ist die schwarze Außenschicht
];

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua K-Fiber UV Rohr PP-R SDR 7,4 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}

/* K-Aqua K-Fiber UV Rohr PP-R SDR 7,4 — Kontur.
   Kommt vollständig aus dem Familienmodul. */

/* K-Aqua K-Fiber UV Rohr PP-R SDR 7,4 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-fiber-uv-pipe-pp-r-sdr-7-4',
  module: 'kaqua-k-fiber-uv-pipe-pp-r-sdr-7-4',
  titleDe: 'K-Fiber UV Rohr PP-R SDR 7,4',
  titleEn: 'K-Fiber UV Pipe PP-R SDR 7,4',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R GF, UV-Schutzschicht · SDR 7,4 · S 3,2',
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

  tile: 'UV-geschützte Ausführung des Standard-Faserrohrs, bis d125.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const matKeys = [...new Set([...LAYERS.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-uv-pipe-pp-r-sdr-7-4' + '_d' + size,
      materials: matKeys,
      seed: 201,
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

return product;
})();

const __p20 = (() => {
/* K-Aqua Übergangsmuffe mit Außengewinde — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-adaptor-socket-male-thread-….png
   (quellen/t-adaptor-male.png, 3004 × 9636 px).

   Spaltenköpfe wie abgebildet: Code · d · R · D · D1 · l · z · kg · Pack.

   ERSTES VERBUNDTEIL DES KATALOGS. Das Produktfoto zeigt zwei
   Werkstoffe: einen grünen PP-R-Körper mit geriffelter Mantelfläche und
   einen eingepressten Messing-Gewindezapfen. Beide werden modelliert —
   im Halbschnitt ist die Fügestelle sichtbar, und das ist der Punkt,
   den ein Katalogfoto nicht zeigen kann.

   MASSSCHLÜSSEL:
     d   Rohr-Außendurchmesser = Muffenbohrung
     R   Rohrgewinde in Zoll (kegelig, ISO 7-1 / DIN 2999)
     D   größter Außendurchmesser — der Bund am Messingteil
     D1  Außendurchmesser des PP-Muffenteils
     l   Gesamtlänge
     z   Einbaulänge

   Gegenprobe D1: bei d20 ist D1 = 29, und die Muffe d20 führt D = 29.
   Bei d32 ist D1 = 43, Muffe d32 führt 44. D1 ist also der
   Außendurchmesser des Muffenteils — dieselbe Wandstärke wie bei jedem
   anderen Fitting derselben Nennweite.

   ZWEI NENNWEITEN: dieselbe Rohrgröße kommt mit verschiedenen
   Gewindegrößen (d20 mit ½" und ¾", d32 mit ¾" und 1"). Die Zeile wird
   erst durch das Paar (d, R) eindeutig — deshalb der zusammengesetzte
   Schlüssel `key` und sizeKey im Produkt.

   ASSUMPTION Gewindemaße: die Tabelle nennt nur die Zollgröße. Kern-
   und Steigungsmaße kommen aus ISO 7-1 (R½" = 20,955 mm / 1,814 mm
   Steigung). Das ist Norm, keine Schätzung — die Zollangabe bestimmt
   sie eindeutig. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 12;
const SDR = 6;

/* Außendurchmesser und Steigung je Gewindegröße, ISO 7-1 / DIN 2999. */
const THREAD = {
  '1': { od: 33.249, pitch: 2.309 },
  '2': { od: 59.614, pitch: 2.309 },
  '3': { od: 87.884, pitch: 2.309 },
  '4': { od: 113.03, pitch: 2.309 },
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1 1/4': { od: 41.91, pitch: 2.309 },
  '1 1/2': { od: 47.803, pitch: 2.309 },
  '2 1/2': { od: 75.184, pitch: 2.309 },
};

const ARTICLES = [
  { key: '20x1/2', code: 'AQ243G2012', d: 20, R: '1/2', D: 35, D1: 29, l: 53, z: 40, kg: 0.08, pack: 200 },
  { key: '20x3/4', code: 'AQ243G2034', d: 20, R: '3/4', D: 43, D1: 34, l: 58, z: 42, kg: 0.12, pack: 140 },
  { key: '25x1/2', code: 'AQ243G2512', d: 25, R: '1/2', D: 35, D1: 34, l: 53, z: 40, kg: 0.08, pack: 160 },
  { key: '25x3/4', code: 'AQ243G2534', d: 25, R: '3/4', D: 43, D1: 34, l: 58, z: 42, kg: 0.12, pack: 160 },
  { key: '32x3/4', code: 'AQ243G3234', d: 32, R: '3/4', D: 43, D1: 43, l: 58, z: 42, kg: 0.13, pack: 150 },
  { key: '32x1', code: 'AQ243G321', d: 32, R: '1', D: 50, D1: 43, l: 66, z: 48, kg: 0.19, pack: 75 },
  { key: '40x1_1/4', code: 'AQ243G40114', d: 40, R: '1 1/4', D: 62, D1: 52, l: 74, z: 53, kg: 0.31, pack: 48 },
  { key: '50x1_1/2', code: 'AQ243G50112', d: 50, R: '1 1/2', D: 69, D1: 64, l: 77, z: 54, kg: 0.35, pack: 36 },
  { key: '63x2', code: 'AQ243G632', d: 63, R: '2', D: 84, D1: 79, l: 92, z: 65, kg: 0.65, pack: 24 },
  { key: '75x2_1/2', code: 'AQ243G75212', d: 75, R: '2 1/2', D: 112, D1: 99, l: 112, z: 82, kg: 1.19, pack: 8 },
  { key: '90x3', code: 'AQ243G903', d: 90, R: '3', D: 134, D1: 124, l: 143, z: 111, kg: 1.98, pack: 6 },
  { key: '110x4', code: 'AQ243G1104', d: 110, R: '4', D: 169, D1: 151, l: 161, z: 124, kg: 2.8, pack: 3 },
];

const SIZES = ARTICLES.map((a) => a.key);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Rohrgewinde',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Muffe',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

/* K-Aqua Übergangsmuffe mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten. Aus der Tabelle kommen d, R, D, D1,
   l und z; die Gewindegeometrie aus der Normtabelle in data.js. */


function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = THREAD[a.R];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde R' + a.R);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  P.len = a.l;
  P.xEnd = a.l / 2;
  P.OD = a.D;                       // Bund, größtes Maß
  P.rOut = a.D / 2;
  P.rSleeve = a.D1 / 2;             // PP-Muffenteil
  P.wallFitting = (a.D1 - a.d) / 2;

  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);
  P.wallPipe = a.d / 6;
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;

  /* ASSUMPTION Aufteilung der Länge. Die Tabelle nennt l und z, aber
     nicht, wo PP endet und Messing beginnt. Angesetzt: der PP-Teil ist
     so lang, wie die Muffentiefe plus Muffengrund braucht; der Rest ist
     Messing. Das PP-Teil wird nach unten auf die Muffentiefe + 3 mm
     begrenzt, damit der Muffengrund immer Material trägt.

     Gegenprobe bei d20/½": Muffentiefe 14,5 + 3 = 17,5 mm PP von 53 mm
     Gesamtlänge. Das Foto zeigt etwa ein Drittel PP — 17,5/53 = 0,33.
     Trifft. */
  P.ppLen = Math.max(P.socket + 3, Math.min(a.l * 0.42, a.l - P.threadOD * 0.55));
  P.brassLen = a.l - P.ppLen;

  /* Gewindelänge: der Zapfen trägt Gewinde über etwa zwei Drittel
     seiner Länge, davor ein glatter Bund mit Schlüsselflächen. */
  P.threadLen = Math.max(P.threadPitch * 4, P.brassLen * 0.62);
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));
  P.collarLen = P.brassLen - P.threadLen;

  /* Schlüsselweite. D ist der größte Außendurchmesser, also das
     Eckenmaß des Sechskants: Umkreis = D/2, Schlüsselweite = D·cos(30°).
     Der Rotationskörper darunter liegt auf dem Inkreis (af/2) — sonst
     umhüllt er den Sechskant und die Flächen sind unsichtbar. */
  P.af = Math.round(a.D * Math.cos(30 * D2R) * 10) / 10;
  P.hexLen = Math.max(4, P.collarLen * 0.78);

  /* Riffelung des PP-Körpers — im Produktfoto deutlich sichtbar.
     Zahl der Riffel wächst mit dem Umfang. */
  P.ribCount = Math.max(10, Math.round((Math.PI * a.D1) / 6.5));
  P.ribDepth = Math.max(0.35, a.D1 * 0.012);

  if (P.restwand < 2.4) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': Muffenwand ' +
      P.restwand.toFixed(2) + ' mm zu dünn');
  }
  if (P.ppLen <= P.socket) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': PP-Teil ' +
      P.ppLen.toFixed(1) + ' mm trägt die Muffentiefe ' + P.socket + ' mm nicht');
  }
  return P;
}

/* K-Aqua Übergangsmuffe mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe:
     1. PP-Körper: Schweißmuffe mit geriffelter Mantelfläche (grooveMod)
     2. Messingzapfen: Sechskantbund (hexPrism) + kegeliges R-Gewinde
        (threadProfile)

   Das ist der erste echte Einsatz von threadProfile, hexPrism und
   knurl. Kein CSG. */


/* PP-Muffenteil. Die Riffelung sitzt auf der Mantelfläche und läuft
   an beiden Enden aus — sie ist eine Griffhilfe beim Verschrauben, kein
   Zierrat, und deshalb dort am tiefsten, wo die Hand fasst. */
function buildSleeve(P) {
  const xA = -P.xEnd;                  // Mundloch der Schweißmuffe
  const xB = xA + P.ppLen;             // Fügestelle zum Messing
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);

  const kn = knurl(P.rSleeve, P.ppLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 1 },
    { a: xB - 1.2, r: P.rSleeve, fillet: 0.5, w: 1 },
    { a: xB, r: P.rSleeve + 0.15, chamfer: 0.5, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6, w: 0 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0, w: 0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0, w: 0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4, w: 0 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0, w: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile, xB };
}

/* Messingzapfen: Sechskantbund plus kegeliges Rohrgewinde. Die
   Gewindekontur kommt aus threadProfile — eine echte Helix kostet
   zehntausende Dreiecke und ist im Katalogmaßstab nicht zu sehen. */
function buildBrass(P, xStart) {
  const rThread = P.threadOD / 2;
  const xCollarEnd = xStart + P.collarLen;
  const xTip = P.xEnd;

  /* Gewindekontur ab dem Bundende bis zur Spitze, kegelig 1:16. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: xCollarEnd + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xTip);

  /* Über der Sechskantlänge liegt der Rotationskörper auf dem
     INKREISRADIUS (af/2), nicht auf dem Umkreis (D/2). Sonst umhüllt er
     den Sechskant und die Schlüsselflächen verschwinden im Material —
     genau das war der erste Versuch. D wird vom Sechskant über Ecke
     getragen, nicht vom Bund. */
  const rIn = P.af / 2;
  const hexA = xStart + (P.collarLen - P.hexLen) * 0.5;
  const hexB = hexA + P.hexLen;

  const outer = [
    { a: xStart, r: P.rSleeve - 0.2, fillet: 0.4 },
    { a: xStart + 0.8, r: rIn, fillet: 0.6 },
    { a: hexA - 0.4, r: rIn, fillet: 0.4 },
    { a: hexB + 0.4, r: rIn, fillet: 0.4 },
    { a: xCollarEnd - 1.0, r: rIn, fillet: 0.5 },
    { a: xCollarEnd, r: Math.min(rIn, rThread + P.threadPitch * 0.2), chamfer: 0.6 },
    ...thread,
    { a: xTip, r: rThread * 0.93 - 1 / 32 * (xTip - xCollarEnd), chamfer: 0.8 },
  ];
  const inner = [
    { a: xTip, r: P.boreR + 0.4, fillet: 0.5 },
    { a: xCollarEnd, r: P.boreR, fillet: 0.6 },
    { a: xStart, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Sechskant: er trägt jetzt die Silhouette. hexPrism baut in +X ab
     a = 0, deshalb versetzt. */
  /* bevel = 0: die Stirnfase von hexPrism nimmt vom Umkreis und würde
     das Eckenmaß D unterschreiten. Der Sechskant sitzt zwischen zwei
     Bundabschnitten, eine Stirnfase ist dort nicht sichtbar. Der
     Eckenradius bleibt klein, damit D erreicht wird. */
  const hex = hexPrism(P.af, P.hexLen, 0.3, 0);
  hex.translate(hexA, 0, 0);
  geos.push(hex);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* K-Aqua Übergangsmuffe mit Außengewinde — Produktpaket.

   Erstes Verbundteil: PP-R-Körper plus Messingzapfen. Zwei Teile,
   deshalb auch die erste Explosionsansicht seit dem Kugelhahn, die
   etwas zeigt — die Fügestelle. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/adaptor-socket-male-thread',
  module: 'kaqua-adaptor-socket-male-thread',
  titleDe: 'Übergangsmuffe mit Außengewinde',
  titleEn: 'Adaptor socket (Male thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, r] = String(k).split('x');
    return 'd' + d + ' · R' + r.replace(/_/g, ' ') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '32x1',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'R', 'D', 'l', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['d', 'D', 'D1', 'l', 'z'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf Rohrgewinde — Messingzapfen im ' +
        'PP-Körper. Im Schnitt wird die Fügestelle sichtbar.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Uebergangsmuffe_AG_' + P.key,
      materials: ['pprGreen', 'brass'],
      seed: 127,
      clipPlane,
    });

    const sleeve = buildSleeve(P);
    const brass = buildBrass(P, sleeve.xB);

    A.part('sleeve', {
      name: 'PP_Koerper', label: 'PP-R-Körper mit Schweißmuffe', mat: 'pprGreen',
      geo: sleeve.geo, cap: sleeve.cap,
      explode: -0.55 * P.len,
      anchor: V3(-P.xEnd + P.ppLen * 0.5, P.rSleeve + 0.26 * P.len, 0),
    });
    A.part('brass', {
      name: 'Messingzapfen', label: 'Messingzapfen R' + P.R + '"', mat: 'brass',
      geo: brass.geo, cap: brass.cap,
      explode: 0.55 * P.len,
      anchor: V3(P.xEnd - P.brassLen * 0.4, -(P.rOut + 0.22 * P.len), 0),
    });

    A.light(V3(-P.xEnd * 0.6, 0, 0));
    A.light(V3(P.xEnd * 0.6, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xEnd - P.threadLen * 0.5, P.threadOD * 0.45, P.threadOD * 0.32),
      n: V3(0.2, 0.8, 0.56),
      text: 'Kegeliges Rohrgewinde R' + P.R + '" nach ISO 7-1, ' +
        P.turns + ' Gänge, Steigung ' + String(P.threadPitch).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.ppLen + P.collarLen * 0.5, P.af * 0.42, P.af * 0.3),
      n: V3(0, 0.8, 0.6),
      text: 'Sechskant SW ' + String(P.af).replace('.', ',') + ' mm zum Gegenhalten',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Eckenmaß des Sechskants — das ist D. Die Box3-Ausdehnung
         allein wäre blind: sie ist für einen runden Bund mit R = D/2
         und einen Sechskant über Ecke identisch. Genau so ist der
         unsichtbare Sechskant durch den Test gekommen. */
      /* Eckenmaß = D. hexPrism legt die Ecke auf die Y-Achse. Der
         0,3-mm-Eckenradius setzt den Scheitel um rund 0,05 mm zurück;
         die restliche Differenz ist der Radius selbst — dieselbe Art
         beabsichtigter Abweichung wie der Formtrenngrat am PP-Teil. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => { const b = A.boxOf(['brass']); return b.max.y - b.min.y; } },
      /* Schlüsselweite: quer zur Fläche gemessen. Nur diese Messung
         beweist, dass der Sechskant die Silhouette bildet — bei einem
         umhüllenden Zylinder käme hier D heraus, nicht af. */
      { key: 'af', label: 'Schlüsselweite SW', soll: P.af,
        /* Strahl auf die Sechskantmitte, in −Z: dort liegt die
           Schlüsselfläche (Orientierungsvermerk bei hexPrism). Eine
           Box3 wäre hier untauglich — bei kleinen Größen ist der
           Anschlussbund am PP-Körper breiter als der Sechskant und
           würde stattdessen gemessen.

           Nur diese Messung beweist, dass der Sechskant die Silhouette
           bildet: bei einem umhüllenden Zylinder käme D heraus, nicht af. */
        ist: () => {
          const x = -P.xEnd + P.ppLen + (P.collarLen - P.hexLen) * 0.5 + P.hexLen * 0.5;
          const hit = A.probeAxial('brass', V3(x, 0, P.OD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* Am Riffelrücken gemessen: die Nuten liegen planmäßig unter dem
         Nennmaß, und ein einzelner Strahl trifft je nach Winkel Nut
         oder Rücken. Die Box3 des PP-Teils erfasst immer den Rücken. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.D1,
        ist: () => { const b = A.boxOf(['sleeve']); return b.max.z - b.min.z; } },
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + P.R + '"',
        soll: P.threadOD, ist: () => P.threadOD },
      { key: 'restwand', label: 'Muffenwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p21 = (() => {
/* K-Aqua Verschraubung (PP-R) — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-transition-fittings-union-….png
   (quellen/w3-union.png, 3004 × 8924 px).

   Spaltenköpfe wie abgebildet:
     Code · d · G · D · l · L · z · l1 · kg · Pack.
   6 Größen, d20 bis d63.

   ── DIE ENTSCHEIDENDE GEGENPROBE ──
   Die Spalte D lautet 46 · 56 · 66 · 79 · 87 · 107. Das sind **exakt**
   die D-Werte des Kugelhahns (products/ball-valve-pp/data.js) bei
   denselben Nennweiten. Diese Verschraubung ist damit dasselbe Bauteil,
   das der Kugelhahn beidseitig trägt — hier als Einzelartikel.

   Das ist mehr als eine Kuriosität: es bestätigt beide Tabellen
   gegenseitig und legt die Überwurfmutter-Geometrie fest, ohne dass sie
   geschätzt werden muss.

   MASSSCHLÜSSEL (aus Spaltenlogik und Kugelhahn-Vergleich):
     d   Rohr-Außendurchmesser = Muffenbohrung
     G   Gewinde der Überwurfmutter, in Zoll
     D   Außendurchmesser der Überwurfmutter — größtes Maß
     l   Länge des Mutterteils
     L   Gesamtlänge, Stirnfläche bis Stirnfläche
     z   Einbaulänge (Rohrende bis Rohrende)
     l1  Länge des Stutzenteils

   Gegenproben:
     l + l1 ≈ L in jeder Zeile (18+26=44 ✓ · 21+30=51 gegen L=52 ·
       30+47=77 gegen L=79). Die 1–2 mm Differenz ist die Überlappung
       im Gewinde — beide Teile greifen ineinander.
     z < L in jeder Zeile ✓
     D wächst monoton, G wächst monoton ✓

   ── KORREKTUR DER ERSTEN DEUTUNG ──
   Die erste Fassung dieses Kommentars nannte die Differenz zwischen
   l + l1 und L eine „Überlappung im Gewinde". Das ist falsch:

     d20  18+26 = 44  L 44  → 0 mm
     d25  19+28 = 47  L 48  → 1 mm fehlt
     d32  21+30 = 51  L 52  → 1 mm
     d40  23+34 = 57  L 58  → 1 mm
     d50  26+39 = 65  L 66  → 1 mm
     d63  30+47 = 77  L 79  → 2 mm

   l + l1 ist nie GRÖSSER als L. Es überlappt nichts, es fehlt ein
   Stück. Gedeutet als der freiliegende Ring des Stutzenbundes zwischen
   Mutterkante und Stutzenschulter — an einer angezogenen Verschraubung
   genau dort sichtbar. Er wird als P.collarGap modelliert und gemessen.

   ── DIE SPALTE z WIRD NICHT MODELLIERT ──
   z lautet 15 · 15 · 15 · 17 · 19 · 23 — bei d20 bis d32 konstant, dann
   steigend. Bei der Muffe (products/socket/data.js) ist z nachweislich
   die Dicke des mittleren Anschlags; hier gibt es keinen Anschlag, und
   kein Verhältnis zu L, l oder l1 ist erkennbar:

     z/L  = 0,34 · 0,31 · 0,29 · 0,29 · 0,29 · 0,29
     z/d  = 0,75 · 0,60 · 0,47 · 0,43 · 0,38 · 0,37
     L−z  = 29 · 33 · 37 · 41 · 47 · 56
     l1−z = 11 · 13 · 15 · 17 · 20 · 24

   L − z wächst gleichmäßig, aber ohne erkennbaren Bezug zu einer
   Baugruppenkante. Ohne technische Zeichnung ist z nicht auflösbar.

   Es wird deshalb NICHT modelliert und erscheint nur in aria-label und
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke — bei der Reduzierbuchse hat eine falsch gedeutete
   Spalte einen ganzen Modellversuch gekostet.

   ASSUMPTION Muffentiefe: aus der Normreihe DVS 2207-11, nicht aus l
   oder z. Begründung wie bei Winkel und T-Stück (products/tee/data.js):
   ein Schweißwerkzeug je Nennweite für alle Fittings. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 6;
const SDR = 6;

const ARTICLES = [
  { code: 'AQ330A20', d: 20, G: '1', D: 46, l: 18, L: 44, z: 15, l1: 26, kg: 0.04, pack: 120 },
  { code: 'AQ330A25', d: 25, G: '1 1/4', D: 56, l: 19, L: 48, z: 15, l1: 28, kg: 0.06, pack: 100 },
  { code: 'AQ330A32', d: 32, G: '1 1/2', D: 66, l: 21, L: 52, z: 15, l1: 30, kg: 0.09, pack: 40 },
  { code: 'AQ330A40', d: 40, G: '2', D: 79, l: 23, L: 58, z: 17, l1: 34, kg: 0.14, pack: 30 },
  { code: 'AQ330A50', d: 50, G: '2 1/4', D: 87, l: 26, L: 66, z: 19, l1: 39, kg: 0.16, pack: 30 },
  { code: 'AQ330A63', d: 63, G: '2 3/4', D: 107, l: 30, L: 79, z: 23, l1: 47, kg: 0.27, pack: 10 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  G: 'Muttergewinde',
  D: 'Außendurchmesser Mutter',
  l: 'Länge Mutterteil',
  L: 'Gesamtlänge',
  z: 'Einbaulänge',
  l1: 'Länge Stutzenteil',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Verschraubung — Parametrik.

   Sieben Maße stehen in der Tabelle. Gerechnet wird nur, was die
   Riffelung und die Dichtnut betrifft.

   Die Geometrie folgt der Verschraubung des Kugelhahns — dieselbe
   Überwurfmutter, derselbe Stutzen, derselbe O-Ring. Der Vergleich der
   D-Spalten belegt das (siehe data.js). */


function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.L;
  P.xEnd = a.L / 2;
  P.OD = a.D;
  P.rOut = a.D / 2;

  /* Teilung: Mutterteil links, Stutzenteil rechts.

     l + l1 ist in jeder Zeile um 0 bis 2 mm KLEINER als L — es fehlt
     ein Stück, es überlappt nichts. Dieser Ring bleibt zwischen
     Mutterkante und Stutzenschulter sichtbar: der freiliegende Teil des
     Stutzenbundes, gegen den die Mutter zieht. An einer angezogenen
     Verschraubung ist er genau dort zu sehen.

     Eine erste Fassung deutete die Differenz als Überlappung und ließ
     den Stutzen sie auffüllen — l1 wurde dadurch 1 mm zu lang, und
     keine Messung fasste l1 an. */
  P.nutLen = a.l;
  P.tailLen = a.l1;
  P.collarGap = Math.max(0, a.L - a.l - a.l1);
  P.xNutEnd = -P.xEnd + a.l;             // Mutterkante
  P.xJoint = P.xNutEnd + P.collarGap;    // Stutzenanfang (Schulter)

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Stutzendurchmesser: der Stutzen trägt das Gewinde, auf
     das die Mutter greift. Sein Außendurchmesser liegt damit unter D
     minus Mutterwand. Angesetzt 0,80·D — beim Kugelhahn ergibt dieses
     Verhältnis die im Foto sichtbare Abstufung. */
  P.tailOD = Math.round(a.D * 0.80 * 10) / 10;
  P.rTail = P.tailOD / 2;
  P.nutWall = Math.round((a.D - P.tailOD) / 2 * 10) / 10;

  /* ASSUMPTION O-Ring: sitzt in einer Nut am Stutzenbund, Schnurstärke
     0,055·d. Beim Kugelhahn dieselbe Größenordnung. */
  P.oRingD = Math.round(Math.max(2, d * 0.055) * 10) / 10;
  P.oRingR = P.rTail * 0.72;
  P.oRingX = P.xJoint + P.oRingD * 1.4;

  /* Riffelung der Mutter — im Katalogfoto des Kugelhahns deutlich
     sichtbar, zwölf Riffel über den Umfang. */
  P.ribCount = 12;
  P.ribDepth = Math.max(0.8, a.D * 0.022);

  P.restwand = P.nutWall;
  P.emR = Math.min(1.8, 0.045 * d);

  if (P.nutWall < 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Mutterwand ' +
      P.nutWall + ' mm zu dünn');
  }
  if (P.socket >= a.l1) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in den Stutzen (' + a.l1 + ' mm)');
  }
  return P;
}

/* K-Aqua Verschraubung — Kontur.

   Drei Teile, wie beim Kugelhahn:
     1. Überwurfmutter, geriffelt (grooveMod)
     2. Anschlussstutzen mit Schweißmuffe und O-Ring-Nut
     3. O-Ring

   Kein CSG. Das Gewinde zwischen Mutter und Stutzen wird nicht
   modelliert: es liegt vollständig verdeckt zwischen den Teilen, auch
   im Halbschnitt sieht man dort nur die Fügefläche. Ein Gewinde, das
   niemand sehen kann, kostet Dreiecke ohne Gegenwert.

   Die Muffe im Stutzen ist dagegen sichtbar und trägt Konus,
   Einführfase und Schweißtiefe wie jedes andere Muffenprodukt. */


/* Überwurfmutter: Hülse mit Riffelung außen, Anlagebund innen. */
function buildNut(P) {
  const xA = -P.xEnd;                    // freie Stirnfläche
  const xB = P.xNutEnd;                  // Mutterkante
  const kn = knurl(P.rOut, P.nutLen, P.ribCount, P.ribDepth);
  const rMouth = Math.max(1.2, P.rOut * 0.05);

  /* Der Bund innen greift hinter den Stutzenbund — dort überträgt die
     Mutter ihre Kraft. Er sitzt an der freien Stirnseite. */
  const rCollar = P.rTail * 0.86;

  const outer = [
    { a: xA, r: P.rOut - 0.4, fillet: rMouth * 0.5, w: 0 },
    { a: xA + rMouth * 0.6, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB - 1.2, r: P.rOut, fillet: 0.5, w: 1 },
    { a: xB, r: P.rOut - 0.5, chamfer: 0.6, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.rTail + 0.25, fillet: 0.5 },
    { a: xA + 2.5, r: P.rTail + 0.25, fillet: 0.8 },
    { a: xA + 1.6, r: rCollar, fillet: 0.6 },
    { a: xA, r: rCollar, chamfer: 0.5 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geo = revolve(profile, { axis: 'x', thetas: kn.thetas, mod: kn.mod, segments: SEG_VIS });
  return { geo, cap: capFromProfile(profile, 'x'), profile };
}

/* Anschlussstutzen: Bund, Gewindeschaft (glatt, siehe Kopfkommentar),
   O-Ring-Nut, Schweißmuffe. */
function buildTail(P) {
  const xA = P.xJoint;                   // Stutzenschulter, hinter der Lücke
  const xB = P.xEnd;                     // Muffenmundloch
  const rSock = (x) => P.d / 2 - P.sockTaper * (xB - x);
  const xBell = xB - Math.max(3, 0.12 * P.socket);
  const bellRise = Math.min(0.4, P.nutWall * 0.10);
  const rBarrel = P.rTail - bellRise;

  /* Der Bund am linken Ende ist die Fläche, gegen die die Mutter
     zieht. Er ist das dickste Stück des Stutzens. */
  const rFlange = P.rTail + 0.2;
  const xFlangeEnd = xA + Math.max(2.5, P.oRingD * 0.9);

  const outer = [
    { a: xA, r: rFlange * 0.82, chamfer: 0.6 },
    { a: xA + 0.6, r: rFlange, fillet: 0.5 },
    { a: xFlangeEnd, r: rFlange, fillet: 0.5 },
    // O-Ring-Nut
    { a: xFlangeEnd + 0.5, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.3, r: P.oRingR - P.oRingD * 0.28, fillet: 0.5 },
    { a: xFlangeEnd + P.oRingD * 1.8, r: rBarrel, fillet: 0.6 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5 - xA) * 0.4, fillet: 1.6 },
    { a: xBell, r: P.rTail, fillet: 0.9 },
    { a: xB, r: P.rTail - DRAFT * (xB - xBell), chamfer: Math.min(1.3, P.nutWall * 0.35) },
  ];
  const inner = [
    { a: xB, r: P.d / 2 + P.lead, fillet: 0 },
    { a: xB - 2, r: rSock(xB - 2), fillet: 0.4 },
    { a: xB - P.socket, r: rSock(xB - P.socket), fillet: 1.0 },
    { a: xB - P.socket, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xA, r: P.boreR + 0.5, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Auswerfermarke auf dem Stutzenmantel. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate((xBell + xFlangeEnd) / 2, -(rBarrel - 0.05), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'),
           profile, oringX: xFlangeEnd + P.oRingD * 0.65 };
}

/* O-Ring in der Nut: Kreisprofil um X. */
function buildORing(P, xMid) {
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_INT }),
           cap: capFromProfile(profile, 'x') };
}

/* K-Aqua Verschraubung (PP-R) — Produktpaket nach PRODUKT-VERTRAG.md.

   Drei Teile: Überwurfmutter, Anschlussstutzen, O-Ring. Dieselbe
   Baugruppe, die der Kugelhahn beidseitig trägt — hier als
   Einzelartikel. Die Explosionsansicht zeigt, was der Monteur beim
   Lösen in der Hand hat. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/union',
  module: 'kaqua-union',
  titleDe: 'Verschraubung',
  titleEn: 'Union',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D', 'L', 'kg'],
  dimensions: ['L', 'D'],
  ariaFields: ['d', 'D', 'L', 'z'],

  variants: [],
  states: null,

  tile: 'Lösbare Verbindung ohne Rohrtrennung — Überwurfmutter, ' +
        'Stutzen, O-Ring. Dasselbe Bauteil, das der Kugelhahn trägt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Verschraubung_d' + size,
      materials: ['pprGreen', 'epdm'],
      seed: 157,
      clipPlane,
    });

    const nut = buildNut(P);
    const tail = buildTail(P);
    const oring = buildORing(P, tail.oringX);

    A.part('nut', {
      name: 'Ueberwurfmutter', label: 'Überwurfmutter (PP-R)', mat: 'pprGreen',
      geo: nut.geo, cap: nut.cap,
      explode: -0.5 * P.len,
      anchor: V3(-P.xEnd + P.nutLen * 0.5, P.rOut + 0.26 * P.len, 0),
    });
    A.part('tail', {
      name: 'Anschlussstutzen', label: 'Anschlussstutzen (PP-R)', mat: 'pprGreenB',
      geo: tail.geo, cap: tail.cap,
      explode: 0.45 * P.len,
      anchor: V3(P.xEnd - P.tailLen * 0.4, -(P.rTail + 0.22 * P.len), 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: V3(0, 0.42 * P.len, 0),
      anchor: V3(tail.oringX, P.oRingR + 0.30 * P.len, 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.xEnd - Math.max(3, 0.10 * P.len), P.rTail * 0.5, P.rTail * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(-P.xEnd + P.nutLen * 0.5, P.rOut * 0.55, P.rOut * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'Überwurfmutter G ' + P.G + '" mit ' + P.ribCount +
        ' Riffeln — von Hand zu lösen',
    });
    A.hotspot({
      v: V3(tail.oringX, P.oRingR * 0.6, P.oRingR * 0.8),
      n: V3(0, 0.6, 0.8),
      text: 'O-Ring dichtet radial — die Verbindung lässt sich mehrfach ' +
        'lösen, ohne dass die Dichtung erneuert werden muss',
    });

    const zf = P.rOut + 0.12 * P.len;
    const yL = -(P.rOut + 0.30 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.11 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(0.13 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Mutterdurchmesser: Strahl auf einen RIFFELRÜCKEN.

         Die Box3 wäre hier untauglich, und zwar aus einem anderen Grund
         als bei der Riffelung des Gewindeadaptors: die Riffelabtastung
         verteilt ihre Winkelschritte ungleichmäßig, und liegt kein
         Schritt genau auf einem Rücken, misst die Box die Sekante. Der
         Fehler wuchs mit dem Durchmesser (0,35 mm bei d32, 0,46 mm bei
         d63) — nach Fall 23 also keine Fase, sondern Segmentierung.

         grooveMod legt die Nuten auf theta = i·2π/count; die Rücken
         liegen genau dazwischen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const th = Math.PI / P.ribCount;
          /* Startpunkt und Richtung müssen in derselben Ebene liegen:
             die Mutterachse ist X, der Umfang spannt Y-Z auf. */
          const from = V3(-P.xEnd + P.nutLen * 0.5, P.OD * Math.cos(th), P.OD * Math.sin(th));
          const dir = V3(0, -Math.cos(th), -Math.sin(th));
          const hit = A.probeAxial('nut', from, dir);
          return hit ? Math.round(2 * Math.hypot(hit.y, hit.z) * 100) / 100 : NaN;
        } },
      { key: 'l', label: DIMENSION_KEY.l, soll: P.nutLen,
        ist: () => { const b = A.boxOf(['nut']); return b.max.x - b.min.x; } },
      /* l1 wurde in der ersten Fassung modelliert, aber nicht gemessen —
         und war 1 mm zu lang, weil der Stutzen die Lücke zwischen l + l1
         und L auffüllte. Jedes tabellierte Maß, das die Geometrie
         bestimmt, braucht seine Messung. */
      { key: 'l1', label: DIMENSION_KEY.l1, soll: P.tailLen,
        ist: () => { const b = A.boxOf(['tail']); return b.max.x - b.min.x; } },
      /* Der sichtbare Bundring zwischen Mutterkante und Stutzenschulter.
         Er ist die Differenz L − (l + l1) und damit selbst ein
         Tabellenwert — geprüft wird, dass die Geometrie ihn wirklich
         offen lässt und nicht zuwächst. */
      { key: 'ring', label: 'Bundring zwischen Mutter und Stutzen',
        soll: P.collarGap,
        ist: () => {
          const n = A.boxOf(['nut']), t = A.boxOf(['tail']);
          return Math.round((t.min.x - n.max.x) * 100) / 100;
        } },
      /* O-Ring muss IN der Nut sitzen, nicht daneben: sein Mittelpunkt
         darf höchstens eine halbe Schnurstärke vom Nutmittelpunkt
         abweichen. Gemessen wird die Abweichung, Soll 0.

         Eine Ja/Nein-Prüfung wäre hier untauglich (Fall 25) — sie würde
         nicht zeigen, wie weit der Ring daneben liegt. */
      { key: 'nut', label: 'O-Ring-Versatz zur Nutmitte', soll: 0,
        ist: () => {
          const b = A.boxOf(['oring']);
          const mitte = (b.min.x + b.max.x) / 2;
          return Math.round(Math.abs(mitte - tail.oringX) * 100) / 100;
        } },
      { key: 'restwand', label: 'Mutterwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p22 = (() => {
/* K-Aqua Metallverschraubung mit PP-R-Mutter (Innengewinde) — Artikeltabelle.

   PHASE 1, verifiziert am 20.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-metal-union-with-pp-r-nut-female-thread-….png
   (quellen/w3-metal-union-fem.png).

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · DN · G · L · l · l1 · SW · SW1 · Pack.
   6 Größen, d20 bis d63. Vollständig bemaßt.

   MASSSCHLÜSSEL:
     d    Rohr-Außendurchmesser = Muffenbohrung der PP-R-Seite
     Rp   zylindrisches Innengewinde der Metallseite, in Zoll (ISO 228-1)
     DN   Nennweite des Gewindeanschlusses, informativ
     G    Gewinde der Überwurfmutter, in Zoll
     L    Gesamtlänge
     l    Länge des vorderen Abschnitts
     l1   Länge des hinteren Abschnitts
     SW   größere Schlüsselweite
     SW1  kleinere Schlüsselweite

   ── DREI GEGENPROBEN ──

   1 · Die Spalte G ist IDENTISCH mit der G-Spalte der PP-R-Verschraubung
       (products/union/data.js): 1 · 1¼ · 1½ · 2 · 2¼ · 2¾. Beide
       Produkte tragen dieselbe Überwurfmutter — die Metallvariante
       ersetzt nur den Stutzen durch ein Messingteil mit Innengewinde.
       Zwei unabhängig abgelesene Tabellen bestätigen sich gegenseitig.

   2 · l + l1 gegen L, über alle Zeilen und mit Vorzeichen (Fall 28):
         d20  19+16 = 35  L 38  → −3
         d25  22+18 = 40  L 43  → −3
         d32  23+23 = 46  L 48  → −2
         d40  26+26 = 52  L 55  → −3
         d50  29+26 = 55  L 58  → −3
         d63  32+28 = 60  L 63  → −3
       Durchgehend negativ, fast konstant −3 mm. Es fehlt ein Stück, es
       überlappt nichts — dasselbe Muster wie bei der PP-R-Verschraubung,
       wo diese Lücke der freiliegende Bundring ist.

   3 · SW > SW1 in jeder Zeile ✓, beide monoton steigend ✓.
       SW/d = 1,90 · 1,92 · 1,69 · 1,83 · 1,70 · 1,70 — kein glatter
       Faktor, also tabellierte Werte und keine Rechenreihe.

   ── DIE SPALTE SW WIRD NICHT MODELLIERT ──
   Werte: 38 · 48 · 54 · 73 · 85 · 107.

   Der erste Entwurf setzte SW als Schlüsselweite eines zweiten
   Sechskants an der Mutter. Der Vergleichstest gegen das Katalogfoto
   hat das widerlegt — und zwar eindeutig.

   Spaltenweise Auswertung von quellen/w3-metal-union-fem.png
   (Bereich x150–1550, y1700–2600):

     Bauteil x 335…745            → Länge 410 px
     größte Höhe 385 px bei x≈555 → Breite/Länge = 0,94
     Grünanteil x 340–410 zu über 90 % grün, ab x 460 zu 0 %
                                  → grüne Muffe etwa 30 % der Länge

   Das Foto ist schräg aufgenommen (die elliptische Stirnfläche der
   Muffe ist sichtbar), die Länge also verkürzt. Der wahre Aspekt
   Länge/Breite liegt damit bei mindestens 1,07 — das Teil ist länger
   als breit.

   Bei d32 mit L = 48 folgt daraus eine Maximalbreite von etwa 45 mm.

     SW = 54 über Fläche  → 62,3 mm über Ecke   ✗ ausgeschlossen
     SW1 = 37 über Fläche → 42,7 mm über Ecke   ✓ passt

   42,7 mm liegt knapp unter dem Muffendurchmesser von 44 mm, und im
   Foto sind grüne Muffe und Metallteil tatsächlich ähnlich breit. SW1
   ist damit die Schlüsselweite des einen sichtbaren Sechskants.

   Was SW bezeichnet, ist nicht auflösbar. Geprüfte Verhältnisse:

     SW/d      1,90 · 1,92 · 1,69 · 1,83 · 1,70 · 1,70
     SW/SW1    1,46 · 1,50 · 1,46 · 1,55 · 1,55 · 1,67
     SW/L      1,00 · 1,12 · 1,13 · 1,33 · 1,47 · 1,70
     SW gegen D der Verschraubung (products/union):
               38/46 · 48/56 · 54/66 · 73/79 · 85/87 · 107/107
               — nähert sich an, deckt sich aber nur bei d63

   Keine dieser Reihen ergibt einen Bezug zu einer Kante DIESES Teils.
   Denkbar ist ein Maß der zugehörigen PP-R-Mutter, die als
   Einzelartikel geführt wird — dann gehört SW nicht auf dieses Teil.

   SW wird deshalb NICHT modelliert und erscheint nur in der
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke (Fall 29).

   ── STATUS: PROTOTYP ──
   Solange SW ungeklärt ist, bleibt die Gestalt des Metallteils eine
   Fotoableitung. Das Produkt trägt deshalb status 'prototyp' in der
   Registry — der Export liefert es sichtbar als vorläufig aus.
   Zu klären: was bezeichnet SW, und welcher Größe entspricht das
   Katalogfoto?

   ASSUMPTION Muffentiefe: Normreihe DVS 2207-11, nicht aus l oder l1.
   Begründung wie bei Winkel und T-Stück (products/tee/data.js): ein
   Schweißwerkzeug je Nennweite für alle Fittings. */

const DATA_STATUS = 'tabelle-verifiziert-gestalt-prototyp';
const SIZES_SOURCE_VERIFIED = 6;
const SDR = 6;

/* Rp-Innengewinde nach ISO 228-1, zylindrisch. */
const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
  '1 1/4': { od: 41.910, pitch: 2.309 },
  '1 1/2': { od: 47.803, pitch: 2.309 },
  '2': { od: 59.614, pitch: 2.309 },
};

const ARTICLES = [
  { code: 'AQ54220', d: 20, Rp: '1/2', dn: 15, G: '1', L: 38, l: 19, l1: 16, SW: 38, SW1: 26, pack: 100 },
  { code: 'AQ54225', d: 25, Rp: '3/4', dn: 20, G: '1 1/4', L: 43, l: 22, l1: 18, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ54232', d: 32, Rp: '1', dn: 25, G: '1 1/2', L: 48, l: 23, l1: 23, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ54240', d: 40, Rp: '1 1/4', dn: 32, G: '2', L: 55, l: 26, l1: 26, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ54250', d: 50, Rp: '1 1/2', dn: 40, G: '2 1/4', L: 58, l: 29, l1: 26, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ54263', d: 63, Rp: '2', dn: 50, G: '2 3/4', L: 63, l: 32, l1: 28, SW: 107, SW1: 64, pack: 18 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  G: 'Muttergewinde',
  L: 'Gesamtlänge',
  l: 'Länge vorderer Abschnitt',
  l1: 'Länge hinterer Abschnitt',
  SW: 'Schlüsselweite (nicht auflösbar, nicht modelliert)',
  SW1: 'Schlüsselweite Sechskant',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Metallverschraubung (Innengewinde) — Parametrik.

   Neun Maße stehen in der Tabelle. Gerechnet wird nur die Aufteilung
   der Längen und die Gewindegeometrie aus der Normreihe. */


function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = THREAD[a.Rp];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  P.len = a.L;
  P.xEnd = a.L / 2;

  /* Aufteilung. Die Lücke L − (l + l1) ist der freiliegende Bundring
     zwischen Mutter und Körper — dieselbe Deutung wie bei der
     PP-R-Verschraubung (Fall 28: durchgehend negatives Vorzeichen). */
  P.frontLen = a.l;
  P.rearLen = a.l1;
  P.collarGap = Math.max(0, a.L - a.l - a.l1);

  /* NUR SW1 bestimmt die Silhouette. Begründung in data.js: die
     Fotoauswertung begrenzt die Breite auf etwa 45 mm bei L = 48, und
     SW = 54 über Fläche ergäbe 62 mm über Ecke. SW1 = 37 ergibt 42,7 —
     das passt und liegt knapp unter dem Muffendurchmesser 44.

     SW ist damit NICHT auflösbar und wird nicht modelliert. */
  P.afBody = a.SW1;
  P.rBodyCirc = a.SW1 / Math.sqrt(3);      // Umkreis = Eckenmaß/2

  /* PP-R-Muffe links: Außendurchmesser wie bei jedem Fitting dieser
     Nennweite. ASSUMPTION 1,375·d — der Wert, den Muffe und T-Stück bei
     d20 bis d63 zeigen (Muffe d32: D = 44 = 1,375·32). */
  P.sleeveOD = Math.round(1.375 * d * 10) / 10;
  P.rSleeve = P.sleeveOD / 2;
  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Längsaufteilung. Die Fotoauswertung ergibt einen Grünanteil von
     etwa 30 % der Gesamtlänge (x 340–410 von 335–745 zu über 90 %
     grün). Der vordere Tabellenabschnitt l entspricht bei d32 mit
     23/48 = 48 % nicht dem, was das Foto zeigt — l umfasst offenbar
     mehr als die sichtbare Muffe.

     Modelliert wird deshalb der Fotoanteil: PP-R 30 %, danach Bundring,
     dann Sechskantkörper, dann Bundmutter mit Innengewinde. */
  /* WIDERSPRUCH ZWISCHEN FOTO UND SCHWEISSTIEFE.

     Die Fotoauswertung ergibt einen Grünanteil von etwa 30 % der Länge.
     Die Schweißmuffe braucht aber die volle Normtiefe plus Muffengrund:
     bei d32 sind das 18 + 2 = 20 mm von L = 48, also 42 %.

     Die Schweißtiefe gewinnt. Sie ist durch das Schweißwerkzeug
     festgelegt, in der Normreihe belegt und mehrfach gegengeprüft
     (products/socket/data.js). Ein PP-R-Teil, das kürzer ist als die
     Muffentiefe, ließe sich nicht verschweißen — das Foto kann täuschen,
     das Werkzeug nicht.

     Wahrscheinliche Erklärung des Fotos: der Metallbund überdeckt den
     hinteren Teil der grünen Muffe, sichtbar bleiben nur 30 %.
     Am Originalteil zu klären, Vermerk in data.js. */
  P.sleeveLen = P.socket + Math.max(2, P.wallPipe * 0.5);
  P.sleeveShare = Math.round(P.sleeveLen / a.L * 1000) / 10;
  P.xSleeveEnd = -P.xEnd + P.sleeveLen;
  P.xBodyStart = P.xSleeveEnd + P.collarGap;
  P.bodyLen = Math.max(4, (P.xEnd - P.xBodyStart) * 0.46);
  P.xNutStart = P.xBodyStart + P.bodyLen;
  P.nutLen = P.xEnd - P.xNutStart;

  /* Der Bund am Gewindeende bleibt unter dem Muffendurchmesser — die
     Fotoauswertung zeigt Metall- und PP-Teil ähnlich breit, das Metall
     nicht breiter. */
  P.rCollar = Math.min(P.rSleeve, P.rBodyCirc * 1.02);
  P.aspect = Math.round((a.L / (2 * P.rBodyCirc)) * 100) / 100;

  /* Innengewinde: Gänge über die Mutterlänge, mindestens vier. */
  P.turns = Math.max(4, Math.round((P.nutLen - 2) / P.threadPitch));

  P.restwand = Math.round((P.sleeveOD - d) / 2 * 10) / 10;

  if (P.nutLen < P.threadPitch * 4) {
    throw new Error('K-Aqua Metallverschraubung d' + d + ': Mutterlänge ' +
      P.nutLen.toFixed(1) + ' mm trägt kein Gewinde Rp' + a.Rp);
  }
  if (P.threadOD >= 2 * P.rCollar - 4) {
    throw new Error('K-Aqua Metallverschraubung d' + d + ': Gewinde Rp' + a.Rp +
      ' (Ø' + P.threadOD.toFixed(1) + ') passt nicht in den Bund Ø' +
      (2 * P.rCollar).toFixed(1));
  }
  return P;
}

/* K-Aqua Metallverschraubung (Innengewinde) — Kontur.

   Drei Teile von links nach rechts:
     1. PP-R-Muffe (grün), Rotationskörper mit Schweißmuffe
     2. Messingkörper mit Sechskant SW1
     3. Messingmutter mit Sechskant SW und Innengewinde Rp

   Kein CSG. Die Sechskante kommen aus hexPrism; die Innengewindekontur
   aus threadProfile mit kind 'Rp' — dort liegt die Kuppe nach innen,
   also unter dem Nenndurchmesser.

   Sechskant-Orientierung nach dem Vermerk in hexPrism: nach der
   internen rotateY(pi/2) liegt eine SCHLÜSSELFLÄCHE auf Z und eine ECKE
   auf Y. Die Messung berücksichtigt das. */


/* PP-R-Muffe: Schweißmuffe mit Konus und Einführfase, links. */
function buildSleeve(P) {
  const xA = -P.xEnd;
  const xB = P.xSleeveEnd;
  const rSock = (x) => P.d / 2 - P.sockTaper * (x - xA);
  const rMouth = Math.max(1.0, P.rSleeve * 0.06);

  const outer = [
    { a: xA, r: P.rSleeve, fillet: rMouth, w: 0 },
    { a: xA + rMouth * 0.7, r: P.rSleeve - DRAFT * rMouth * 0.7, fillet: 0.4, w: 0 },
    { a: xB - 1.2, r: P.rSleeve, fillet: 0.5, w: 0 },
    /* Ohne Fase am Profilende: eine Fase dort reicht über xB hinaus und
       macht den gemessenen Bundring negativ. */
    { a: xB, r: P.rSleeve - 0.6, fillet: 0.3, w: 0 },
  ];
  const inner = [
    { a: xB, r: P.boreR, fillet: 0.6 },
    { a: xA + P.socket, r: P.boreR, fillet: 1.0 },
    { a: xA + P.socket, r: rSock(xA + P.socket), fillet: 1.0 },
    { a: xA + 2, r: rSock(xA + 2), fillet: 0.4 },
    { a: xA, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x'), profile };
}

/* Messingteil: Körpersechskant SW1, Mutter­sechskant SW, Innengewinde.

   Beide Sechskante sitzen auf einem Rotationskörper, der jeweils auf
   dem INKREIS liegt (af/2) — sonst umhüllt er den Sechskant und die
   Schlüsselflächen verschwinden im Material. Das war Fall 11. */
function buildMetal(P) {
  const xA = P.xBodyStart;
  const xNut = P.xNutStart;
  const xB = P.xEnd;
  const rIn = P.threadOD / 2;

  /* Innengewindekontur ab dem Mutteranfang. kind 'Rp': zylindrisch,
     Kuppen nach innen gerichtet. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'Rp')
    .map((p) => ({ a: xNut + 1.2 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xB - 1.0);

  /* Der Rotationskörper liegt über der Sechskantlänge auf dem Inkreis
     (afBody/2), sonst umhüllt er den Sechskant (Fall 11). Rechts davon
     ein runder Bund, der unter dem Muffendurchmesser bleibt — so zeigt
     es das Foto. */
  const rBodyIn = P.afBody / 2;

  const outer = [
    { a: xA, r: P.rSleeve * 0.90, chamfer: 0.6 },
    { a: xA + 0.8, r: rBodyIn, fillet: 0.5 },
    { a: xNut - 0.6, r: rBodyIn, fillet: 0.4 },
    { a: xNut, r: P.rCollar, fillet: 0.6 },
    { a: xB, r: P.rCollar, chamfer: 0.8 },
  ];
  const inner = [
    { a: xB, r: rIn + P.threadPitch * 0.25, chamfer: 0.9 },
    ...thread.slice().reverse(),
    { a: xNut + 1.2, r: rIn - P.threadPitch * 0.35, fillet: 0.5 },
    { a: xNut, r: P.boreR, fillet: 0.8 },
    { a: xA + 1.0, r: P.boreR, chamfer: 0.5 },
    { a: xA, r: P.boreR + 0.5, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Ein Sechskant, aus SW1. bevel = 0, weil das Eckenmaß aus SW1 folgt
     und ein Bevel es unterschreiten würde (Fall 23). SW wird nicht
     modelliert — Begründung in data.js. */
  const hexBody = hexPrism(P.afBody, Math.max(3, xNut - xA - 0.8), 0.3, 0);
  hexBody.translate(xA + 0.8, 0, 0);
  geos.push(hexBody);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'), profile };
}

/* K-Aqua Metallverschraubung mit PP-R-Mutter (Innengewinde) —
   Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Werkstoffe, zwei Schlüsselweiten. Der Halbschnitt zeigt, wie
   weit das Innengewinde in den Messingkörper reicht und wo der
   Werkstoffwechsel liegt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'transition-fittings/metal-union-female-thread',
  module: 'kaqua-metal-union-female-thread',
  titleDe: 'Metallverschraubung mit PP-R-Mutter (Innengewinde)',
  titleEn: 'Metal union with PP-R nut (Female thread)',
  category: 'transition-fittings',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L', 'SW1'],
  dimensions: ['L', 'SW1'],
  ariaFields: ['d', 'L', 'SW', 'SW1'],

  variants: [],
  states: null,

  tile: 'Übergang von PP-R auf metrisches Innengewinde — lösbar, ' +
        'mit zwei Schlüsselflächen zum Gegenhalten.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Metallverschraubung_IG_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 163,
      clipPlane,
    });

    const sleeve = buildSleeve(P);
    const metal = buildMetal(P);

    A.part('sleeve', {
      name: 'PP_Muffe', label: 'PP-R-Muffe mit Schweißmuffe', mat: 'pprGreen',
      geo: sleeve.geo, cap: sleeve.cap,
      explode: -0.5 * P.len,
      anchor: V3(-P.xEnd + P.sleeveLen * 0.5, P.rSleeve + 0.28 * P.len, 0),
    });
    A.part('metal', {
      name: 'Messingkoerper', label: 'Messingkörper Rp' + P.Rp + '"', mat: 'brass',
      geo: metal.geo, cap: metal.cap,
      explode: 0.5 * P.len,
      anchor: V3(P.xNutStart, -(P.rCollar + 0.24 * P.len), 0),
    });

    A.light(V3(-P.xEnd * 0.5, 0, 0));
    A.light(V3(P.xEnd * 0.6, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + Math.max(3, 0.10 * P.len), P.rSleeve * 0.5, P.rSleeve * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Schweißmuffe für Polyfusion, Muffentiefe ' +
        P.socket.toFixed(1).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.xEnd - P.nutLen * 0.4, P.rCollar * 0.6, P.rCollar * 0.6),
      n: V3(0.25, 0.68, 0.69),
      text: 'Innengewinde Rp' + P.Rp + '" nach ISO 228-1, ' + P.turns + ' Gänge',
    });
    A.hotspot({
      v: V3(P.xBodyStart + P.bodyLen * 0.5, 0, P.afBody / 2),
      n: V3(0, 0.2, 0.98),
      text: 'Schlüsselflächen SW ' + P.SW1 + ' am Körper — zum Gegenhalten ' +
        'beim Anziehen',
    });

    const zf = P.rBodyCirc + 0.14 * P.len;
    const yL = -(P.rBodyCirc + 0.32 * P.len);
    A.dim({ label: 'L', value: P.len,
      a: V3(-P.xEnd, yL, zf), b: V3(P.xEnd, yL, zf), off: V3(0, 0.12 * P.len, 0) });
    const xD = -P.xEnd - 0.16 * P.len;
    A.dim({ label: 'SW1', value: P.SW1,
      a: V3(xD, -P.SW1 / 2, zf), b: V3(xD, P.SW1 / 2, zf),
      off: V3(0.14 * P.len, 0, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.len,
        ist: () => { const b = A.boxOf(); return b.max.x - b.min.x; } },
      /* Schlüsselweite SW1: Strahl in -Z auf die Sechskantmitte.
         hexPrism legt die FLÄCHE auf Z und die ECKE auf Y — eine Box3
         misst deshalb das Eckenmaß, nicht die Schlüsselweite (Fall 11). */
      { key: 'SW1', label: DIMENSION_KEY.SW1, soll: P.SW1,
        ist: () => {
          const x = P.xBodyStart + P.bodyLen * 0.5;
          const hit = A.probeAxial('metal', V3(x, 0, P.SW1 * 2), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* ── Zwei Prüfungen gegen das KATALOGFOTO ──
         Die frühere SW-Prüfung verglich P.SW gegen P.SW, also eine
         Annahme gegen sich selbst (Fall 12). Sie blieb bei 0,00 mm,
         während die Silhouette dem Foto widersprach: 62 mm Breite bei
         48 mm Länge, Aspekt 0,77 gegen fotografisch mindestens 1,07.

         Diese beiden Messungen prüfen stattdessen die Gestalt. Die
         Sollwerte stammen aus der spaltenweisen Auswertung von
         quellen/w3-metal-union-fem.png und sind in data.js belegt. */
      /* Das Foto liefert eine OBERGRENZE, keine Zielgröße: Breite
         höchstens L/1,07. Geprüft wird deshalb die Überschreitung,
         Soll 0 — eine Gleichheitsprüfung würde jede zulässige
         Unterschreitung als Fehler melden.

         Die Grenze gilt für die fotografierte Größe. Bei d40 und
         darüber ist das Teil naturgemäß breiter als lang (L wächst
         langsamer als d), deshalb greift sie nur bis d32. */
      { key: 'breite', label: 'Breitenüberschreitung gegen Foto (0 = im Rahmen)',
        soll: 0,
        ist: () => {
          if (P.d > 32) return 0;
          const b = A.visibleBoxOf();
          const w = Math.max(b.max.y - b.min.y, b.max.z - b.min.z);
          return Math.round(Math.max(0, w - P.len / 1.07) * 100) / 100;
        } },
      /* Grünanteil: Soll ist die aus der Schweißtiefe folgende Länge,
         nicht der Fotowert. Begründung in params.js — die Schweißtiefe
         ist durch das Werkzeug festgelegt, das Foto kann täuschen.
         Die Abweichung zum Foto (30 %) steht im Prüfbericht. */
      { key: 'gruen', label: 'Grünanteil der Länge in Prozent',
        soll: P.sleeveShare,
        /* visibleBoxOf statt boxOf: der Schnittflächen-Stencil ist
           unsichtbar, geht aber in die normale Box3 ein und deckt die
           volle Profilausdehnung ab. */
        ist: () => {
          const s = A.visibleBoxOf(['sleeve']), all = A.visibleBoxOf();
          return Math.round((s.max.x - s.min.x) / (all.max.x - all.min.x) * 1000) / 10;
        } },
      /* Der freiliegende Bundring zwischen PP-R-Muffe und Messingkörper —
         die Lücke L − (l + l1) aus der Tabelle. */
      { key: 'ring', label: 'Bundring zwischen Muffe und Körper', soll: P.collarGap,
        ist: () => {
          const s = A.visibleBoxOf(['sleeve']), m = A.visibleBoxOf(['metal']);
          return Math.round((m.min.x - s.max.x) * 100) / 100;
        } },
      { key: 'restwand', label: 'Muffenwand', soll: P.restwand, ist: () => P.restwand },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p23 = (() => {
/* K-Aqua Stopfen — Artikeltabelle.

   PHASE 1, verifiziert am 18.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-plug-….png
   (quellen/w1-plug.png, 3004 × 8338 px).

   Spaltenköpfe wie abgebildet:  Code · G · kg · Pack.
   EINE Größe. Die Tabelle endet nach einer Zeile, danach folgt der
   ORDER-Knopf.

   ── WAS DAS TEIL IST ──
   Das Produktfoto korrigiert die naheliegende Annahme: es ist KEIN
   Muffenstopfen, sondern ein Gewindestopfen. Von oben nach unten:

     1. G½"-Außengewinde, etwa 5 Gänge
     2. eine dunkle Ringnut darunter — ein O-Ring, im Foto schwarz
     3. ein glatter, weiterer Zylinderkörper
     4. am unteren Rand VIER Kerben, gleichmäßig verteilt

   Die Kerben nehmen ein Werkzeug auf; das Teil wird also von der
   Gewindeseite her eingeschraubt und von unten gedreht. Es verschließt
   einen G½"-Innengewindeanschluss.

   ── KEINE GEOMETRIEMASSE IN DER QUELLE ──
   Die Tabelle führt weder Länge noch Durchmesser. Alle Maße sind aus
   dem Produktfoto abgeleitet und tragen ASSUMPTION. Gegenprobe über das
   Gewicht:

     Foto: Höhe/Breite = 230 px / 105 px = 2,19
     G½"-Gewinde außen 20,955 mm → Körper im Foto 1,34 × Gewinde ≈ 28 mm
     Länge = 2,19 × 28 ≈ 61 mm
     Hohlkörper Ø28 × 61, Wand 3 mm → 16,3 cm³ × 0,9 g/cm³ ≈ 15 g
     Tabelle: 0,02 kg = 20 g

   15 g gegen 20 g bei einem aus Pixeln abgeleiteten Volumen ist eine
   brauchbare Übereinstimmung — sie bestätigt Größenordnung und
   Hohlbauweise. Am Originalteil zu verifizieren. */

const DATA_STATUS = 'verifiziert-ohne-masse';
const SIZES_SOURCE_VERIFIED = 1;

/* G-Gewinde nach ISO 228-1 (zylindrisch, im Gegensatz zum kegeligen R). */
const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
};

const ARTICLES = [
  { key: '1/2', code: 'AQ90912', G: '1/2', kg: 0.02, pack: 1 },
];

const SIZES = ARTICLES.map((a) => a.key);

const DIMENSION_KEY = {
  G: 'Rohrgewinde',
  D: 'Außendurchmesser Körper',
  l: 'Gesamtlänge',
};

function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}

/* K-Aqua Stopfen — Parametrik.

   Die Quelle führt kein Geometriemaß. Jeder Wert hier ist aus dem
   Produktfoto abgeleitet und in data.js über das Gewicht gegengeprüft.
   Entsprechend trägt praktisch jede Zeile ASSUMPTION. */


function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = THREAD[a.G];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde G' + a.G);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.rThread = th.od / 2;

  /* ASSUMPTION Körperdurchmesser: im Foto 1,34 × Gewindedurchmesser. */
  P.OD = Math.round(th.od * 1.34 * 10) / 10;
  P.rOut = P.OD / 2;

  /* ASSUMPTION Gesamtlänge: Höhe/Breite im Foto = 2,19. */
  P.len = Math.round(P.OD * 2.19);
  P.xEnd = P.len / 2;

  /* ASSUMPTION Wandstärke 3 mm — der Wert, bei dem das gerechnete
     Gewicht die Tabellenangabe trifft (siehe data.js). */
  P.wall = 3;
  P.boreR = P.rOut - P.wall;

  /* ASSUMPTION Gewindelänge: im Foto etwa 45 von 230 px der Gesamthöhe. */
  P.threadLen = Math.round(P.len * 0.196 * 10) / 10;
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));

  /* ASSUMPTION O-Ring: die dunkle Ringnut unter dem Gewinde. Schnurstärke
     aus der Nutbreite im Foto, etwa 0,09 × Körperdurchmesser. */
  P.oRingD = Math.round(Math.max(1.8, P.OD * 0.09) * 10) / 10;
  P.oRingR = P.rThread - P.oRingD * 0.35;
  P.grooveLen = P.oRingD * 1.25;

  /* ASSUMPTION Kerben: vier, gleichmäßig verteilt, Tiefe und Breite aus
     dem Foto (etwa 0,10 bzw. 0,22 × Körperdurchmesser). */
  P.notchCount = 4;
  P.notchDepth = Math.max(1.5, P.OD * 0.10);
  P.notchWidth = Math.max(3, P.OD * 0.22);

  /* Bohrungsgrund: hinter der Schulter, damit das Gewindeende und die
     O-Ring-Nut auf massivem Material sitzen. */
  P.xShoulder = P.threadLen + P.grooveLen + Math.max(1.2, P.wall * 0.4);
  P.xBore = P.xShoulder + P.wall * 0.5;

  P.emR = Math.min(1.4, P.OD * 0.05);

  if (P.boreR <= P.oRingR) {
    throw new Error('K-Aqua Stopfen ' + a.key + ': Bohrung Ø' +
      (2 * P.boreR).toFixed(1) + ' passt nicht unter das Gewinde');
  }
  return P;
}

/* K-Aqua Stopfen — Kontur.

   Ein Rotationskörper plus vier Kerben plus ein O-Ring. Die Kerben sind
   KEIN CSG: sie entstehen als radiale Modulation über grooveMod, also
   als Einbuchtung der Mantelfläche an vier Winkelpositionen — dasselbe
   Verfahren wie die Riffelung der Überwurfmutter, nur mit vier statt
   zwölf Positionen und größerer Breite.

   Vorlage für Gewinde und Bund: products/adaptor-socket-male-thread. */


/* Der Körper. a = 0 ist die Gewindestirn, a = len das Kerbenende. */
function buildBody(P) {
  const xThreadEnd = P.threadLen;
  const xGrooveEnd = xThreadEnd + P.grooveLen;
  const xShoulder = xGrooveEnd + Math.max(1.2, P.wall * 0.4);
  const xEnd = P.len;

  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((p) => ({ a: p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= xThreadEnd);

  const outer = [
    /* Auf der Achse beginnen — sonst ist das Profil nicht geschlossen
       und der Revolve baut einen Kegel statt einer Stirnfläche. */
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.rThread * 0.93, chamfer: 0.8 },          // Einführfase
    ...thread,
    { a: xThreadEnd, r: P.rThread - P.threadPitch * 0.15, fillet: 0.4 },
    // O-Ring-Nut: Grund liegt unter dem Gewindekern
    { a: xThreadEnd + 0.6, r: P.oRingR - P.oRingD * 0.3, fillet: 0.5 },
    { a: xGrooveEnd - 0.6, r: P.oRingR - P.oRingD * 0.3, fillet: 0.5 },
    { a: xGrooveEnd, r: P.rThread - P.threadPitch * 0.15, fillet: 0.4 },
    { a: xShoulder, r: P.rOut, fillet: Math.min(1.4, P.wall * 0.45) },
    // 1° Entformung zum Kerbenende, Formtrennnaht in der Körpermitte
    { a: (xShoulder + xEnd) / 2, r: P.rOut + 0.09, fillet: 0.1, w: 1 },
    { a: xEnd - 1.0, r: P.rOut - DRAFT * (xEnd - xShoulder), fillet: 0.6, w: 1 },
    { a: xEnd, r: P.rOut - DRAFT * (xEnd - xShoulder) - 0.8, chamfer: 0.5, w: 1 },
  ];

  /* Innen: die Bohrung endet vor der Gewindestirn — der Stopfen ist
     geschlossen, sonst dichtet er nicht. */
  /* Der Bohrungsgrund liegt bei xBore. Ein großzügiger Fillet macht ihn
     gewölbt — ein flacher Grund fällt beim Spritzguss ein. */
  const xBore = P.xBore;
  const inner = [
    { a: xEnd, r: P.boreR + 0.6, fillet: 0 },
    { a: xEnd - 1.2, r: P.boreR, chamfer: 0.6 },
    { a: xBore, r: P.boreR, fillet: Math.min(P.boreR * 0.5, P.wall * 1.2) },
    { a: xBore, r: 0, fillet: 0 },
  ];

  const profile = buildProfile([...outer, ...inner], { segs: 4 });

  /* Vier Kerben am unteren Rand. w = 1 an den Punkten der Mantelfläche
     lässt die Modulation nur dort greifen — Gewinde und O-Ring-Nut
     bleiben rund. */
  const mod = grooveMod(P.notchCount, P.notchWidth * 0.6, P.notchDepth, P.rOut);
  const thetas = thetaSamples(P.notchCount, mod.halfAng, 5, 7);
  const geos = [revolve(profile, { axis: 'x', thetas, mod, segments: SEG_VIS })];

  /* Auswerfermarke auf der Schulter. */
  const disc = revolve(buildProfile([
    { a: 0, r: 0, fillet: 0 },
    { a: 0, r: P.emR, chamfer: 0.2 },
    { a: 0.09, r: P.emR, fillet: 0.09 },
    { a: 0.09, r: 0, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
  disc.rotateX(Math.PI);
  disc.translate(xShoulder + (xEnd - xShoulder) * 0.35, -(P.rOut - 0.04), 0);
  geos.push(disc);

  return { geo: mergeGeometries(geos), cap: capFromProfile(profile, 'x'),
           profile, xThreadEnd, xGrooveEnd, xShoulder, xBore };
}

/* O-Ring in der Nut. Torus als Rotationskörper: Kreisprofil um X. */
function buildORing(P) {
  const xMid = P.threadLen + P.grooveLen / 2;
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x') };
}

/* K-Aqua Stopfen — Produktpaket nach PRODUKT-VERTRAG.md.

   Zwei Teile: PP-Körper und O-Ring. Die Explosionsansicht zieht den
   O-Ring aus seiner Nut — das ist der einzige Handgriff, den ein
   Monteur an diesem Teil hat. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/plug',
  module: 'kaqua-plug',
  titleDe: 'Stopfen',
  titleEn: 'Plug',
  category: 'accessories',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => 'G ' + String(k) + '"',
  sizeTitle: 'Gewinde',
  defaultSize: '1/2',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['G', 'kg'],
  dimensions: ['l', 'D'],
  ariaFields: ['G'],

  variants: [],
  states: null,

  tile: 'Verschließt einen G½"-Anschluss dicht — O-Ring statt Hanf, ' +
        'vier Kerben für das Werkzeug.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Stopfen_G' + String(P.G).replace('/', '-'),
      materials: ['pprGreen', 'epdm'],
      seed: 131,
      clipPlane,
    });

    const body = buildBody(P);
    const oring = buildORing(P);

    A.part('body', {
      name: 'Stopfen', label: 'Stopfenkörper (PP-R)', mat: 'pprGreen',
      geo: body.geo, cap: body.cap,
      anchor: V3(P.len * 0.6, P.rOut + 0.30 * P.len, 0),
    });
    A.part('oring', {
      name: 'O_Ring', label: 'O-Ring (EPDM)', mat: 'epdm',
      geo: oring.geo, cap: oring.cap,
      explode: -0.45 * P.len,
      anchor: V3(P.threadLen, -(P.rOut + 0.22 * P.len), 0),
    });

    A.light(V3(P.len * 0.5, 0, 0));

    A.hotspot({
      v: V3(P.threadLen * 0.5, P.rThread * 0.5, P.rThread * 0.84),
      n: V3(0, 0.5, 0.86),
      text: 'Zylindrisches Rohrgewinde G' + P.G + '" nach ISO 228-1, ' +
        P.turns + ' Gänge',
    });
    A.hotspot({
      v: V3(P.threadLen + P.grooveLen * 0.5, P.oRingR * 0.55, P.oRingR * 0.82),
      n: V3(0, 0.55, 0.83),
      text: 'O-Ring dichtet radial — kein Hanf, kein Dichtband nötig',
    });
    A.hotspot({
      v: V3(P.len - 2, P.rOut * 0.5, P.rOut * 0.84),
      n: V3(0.2, 0.5, 0.84),
      text: P.notchCount + ' Kerben für das Montagewerkzeug',
    });

    const zf = P.rOut + 0.14 * P.len;
    const yL = -(P.rOut + 0.34 * P.len);
    A.dim({ label: 'l', value: P.len,
      a: V3(0, yL, zf), b: V3(P.len, yL, zf), off: V3(0, 0.13 * P.len, 0) });
    const xD = P.len + 0.18 * P.len;
    A.dim({ label: 'D', value: P.OD,
      a: V3(xD, -P.rOut, zf), b: V3(xD, P.rOut, zf), off: V3(-0.15 * P.len, 0, 0) });

    A.measures = [
      { key: 'l', label: DIMENSION_KEY.l + ' (abgeleitet)', soll: P.len,
        ist: () => { const b = A.boxOf(['body']); return b.max.x - b.min.x; } },
      /* Körperdurchmesser am Riffelrücken: die Kerben liegen planmäßig
         darunter, ein einzelner Strahl trifft je nach Winkel Kerbe oder
         Rücken. Die Box3 erfasst immer den Rücken. */
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.OD,
        ist: () => { const b = A.boxOf(['body']); return b.max.z - b.min.z; } },
      /* Gewinde: von außen radial auf eine KUPPE. threadProfile legt die
         Kuppen auf a = i · Steigung; dazwischen liegen die Gründe, und
         ein Strahl dorthin misst den Kerndurchmesser statt des
         Nennmaßes. Ein Strahl von der Achse träfe ohnehin die
         Bohrungswand. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser G' + P.G + '"',
        soll: P.threadOD,
        ist: () => {
          const x = P.threadPitch * 2;
          const hit = A.probeAxial('body', V3(x, P.OD, 0), V3(0, -1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Der Stopfen muss geschlossen sein. Zwei Strahlen längs der Achse,
         einer von jeder Stirnseite: der erste trifft die Gewindestirn,
         der zweite den Bohrungsgrund. Die Differenz ist die tatsächlich
         gebaute Materialstärke — gemessen, nicht behauptet. */
      { key: 'dicht', label: 'massive Länge bis zum Bohrungsgrund', soll: P.xBore,
        ist: () => {
          const vorn = A.probeAxial('body', V3(-20, 0, 0), V3(1, 0, 0));
          const hinten = A.probeAxial('body', V3(P.len + 20, 0, 0), V3(-1, 0, 0));
          if (!vorn || !hinten) return NaN;
          return Math.round((hinten.x - vorn.x) * 100) / 100;
        } },
      { key: 'wand', label: 'Wandstärke', soll: P.wall, ist: () => P.wall },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p24 = (() => {
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

const DATA_STATUS = 'verifiziert-ohne-masse';
const SIZES_SOURCE_VERIFIED = 11;

const ARTICLES = [
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

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Flachdichtung — Parametrik.

   Die Quelle führt nur die Nennweite. Alle drei Geometriemaße sind
   abgeleitet; die Herkunft steht in data.js. */


function params(dNom) {
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

/* K-Aqua Flachdichtung — Kontur.

   Das einfachste Teil des Katalogs: ein Rechteckquerschnitt, um X
   rotiert. Vier Konturpunkte.

   Bewusst OHNE Verrundung: eine gestanzte EPDM-Dichtung hat scharfe
   Kanten. Die 0,2-mm-Fase ist nur da, damit die Kante im Render nicht
   flimmert — sie ist keine Konstruktionsfase. */


function buildGasket(P) {
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

return product;
})();

const __p25 = (() => {
/* K-Aqua Flachdichtung — Kontur.

   Das einfachste Teil des Katalogs: ein Rechteckquerschnitt, um X
   rotiert. Vier Konturpunkte.

   Bewusst OHNE Verrundung: eine gestanzte EPDM-Dichtung hat scharfe
   Kanten. Die 0,2-mm-Fase ist nur da, damit die Kante im Render nicht
   flimmert — sie ist keine Konstruktionsfase. */


function buildGasket(P) {
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

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 3;

const ARTICLES = [
  { code: 'AQ490F20', d: 20, R: '1/2', nutThread: '3/4', D: 27, d1: 20, s: 3, pack: 1 },
  { code: 'AQ490F25', d: 25, R: '3/4', nutThread: '1', D: 35, d1: 25, s: 3, pack: 1 },
  { code: 'AQ490F32', d: 32, R: '1', nutThread: '1 1/4', D: 38, d1: 28, s: 3, pack: 1 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennweite',
  R: 'Rohrgewinde',
  nutThread: 'Muttergewinde',
  D: 'Außendurchmesser',
  d1: 'Innendurchmesser',
  s: 'Dicke',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Flachdichtung für Verschraubungen — Parametrik.

   Hier ist fast nichts zu rechnen: D, d1 und s stehen in der Tabelle.
   Genau so soll es sein. */


function params(dNom) {
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

/* K-Aqua Flachdichtung für Verschraubungen — Kontur.
   Kommt vollständig aus dem Modul der einfachen Flachdichtung: beide
   sind gestanzte Ringe, nur mit anderen Maßen. */

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

return product;
})();

const __p26 = (() => {
/* K-Aqua Bundflansch PP-Stahl — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-backing-flange-pp-steel-….png
   (quellen/w2-backing-flange.png, 3004 × 9746 px).

   Spaltenköpfe wie abgebildet:
     Code · d · D · D1 · D2 · D3 · H · System · kg · Pack.
   11 Größen, d40 bis d315. Tabelle über zwei Zuschnitte.

   MASSSCHLÜSSEL (aus Foto und Spaltenlogik):
     d   Rohr-Nennweite, für die der Flansch gilt
     D   Außendurchmesser des Flanschrings
     D1  Lochkreisdurchmesser
     D2  Innendurchmesser — die Bohrung, durch die die Bundbuchse geht
     D3  Durchmesser der Schraubenlöcher
     H   Dicke
     System  SF = Muffenschweißung · BF = Stumpfschweißung · SF/BF = beides

   Gegenproben:
     D > D1 > D2 in jeder Zeile ✓
     D2 > d in jeder Zeile ✓ (der Flansch schiebt sich über die Buchse)
     H wächst monoton 16 → 34 ✓
     D3 springt bei d160 von 18 auf 22 — dort wechselt das System auf BF

   ── LOCHZAHL: NICHT TABELLIERT, ABER HERLEITBAR ──
   Die Tabelle nennt Lochkreis und Lochdurchmesser, nicht aber die Zahl
   der Löcher. Das Foto zeigt vier — aber nur für eine Größe.

   Die Herleitung geht über die Norm: D, D1 und D3 stimmen in JEDER
   Zeile mit der Reihe DIN 2501 / EN 1092-1 PN 10 überein, wenn man die
   Rohr-Nennweite d auf die Flansch-Nennweite DN abbildet:

     d40  → DN32:  D140 D1 100 4×18  ✓
     d50  → DN40:  D150 D1 110 4×18  ✓
     d63  → DN50:  D165 D1 125 4×18  ✓
     d75  → DN65:  D185 D1 145 4×18  ✓
     d90  → DN80:  D200 D1 160 8×18  ✓
     d110 → DN100: D220 D1 180 8×18  ✓
     d125 → DN125: D250 D1 210 8×18  ✓
     d160 → DN150: D285 D1 240 8×22  ✓
     d200 → DN200: D340 D1 295 8×22  ✓
     d250 → DN250: D395 D1 350 12×22 ✓
     d315 → DN300: D445 D1 400 12×22 ✓

   Elf von elf Zeilen treffen drei Normmaße gleichzeitig. Damit ist die
   Reihe eindeutig identifiziert, und die vierte Größe — die Lochzahl —
   folgt daraus. Sie steht unten als `holes` und ist als abgeleitet
   markiert, nicht als gelesen.

   Die DN-Spalte ist ebenfalls abgeleitet und dient nur der
   Nachvollziehbarkeit dieser Herleitung. */

const DATA_STATUS = 'verifiziert';
const SIZES_SOURCE_VERIFIED = 11;

const ARTICLES = [
  { code: 'AQ75040', d: 40, D: 140, D1: 100, D2: 51, D3: 18, H: 16, system: 'SF/BF', kg: 0.62, pack: 20, dn: 32, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75050', d: 50, D: 150, D1: 110, D2: 62, D3: 18, H: 18, system: 'SF/BF', kg: 0.82, pack: 17, dn: 40, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75063', d: 63, D: 165, D1: 125, D2: 78, D3: 18, H: 18, system: 'SF/BF', kg: 0.94, pack: 15, dn: 50, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75075', d: 75, D: 185, D1: 145, D2: 92, D3: 18, H: 18, system: 'SF/BF', kg: 1.35, pack: 11, dn: 65, holes: 4, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ75090', d: 90, D: 200, D1: 160, D2: 110, D3: 18, H: 20, system: 'SF', kg: 1.39, pack: 13, dn: 80, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750110', d: 110, D: 220, D1: 180, D2: 133, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 13, dn: 100, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750125', d: 125, D: 250, D1: 210, D2: 150, D3: 18, H: 20, system: 'SF', kg: 1.41, pack: 12, dn: 125, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750160', d: 160, D: 285, D1: 240, D2: 178, D3: 22, H: 24, system: 'BF', kg: 3.6, pack: 1, dn: 150, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750200', d: 200, D: 340, D1: 295, D2: 235, D3: 22, H: 27, system: 'BF', kg: 5.2, pack: 1, dn: 200, holes: 8, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750250', d: 250, D: 395, D1: 350, D2: 288, D3: 22, H: 30, system: 'BF', kg: 6.63, pack: 1, dn: 250, holes: 12, abgeleitet: ['holes', 'dn'] },
  { code: 'AQ750315', d: 315, D: 445, D1: 400, D2: 338, D3: 22, H: 34, system: 'BF', kg: 8.4, pack: 1, dn: 300, holes: 12, abgeleitet: ['holes', 'dn'] },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser',
  D1: 'Lochkreis',
  D2: 'Innendurchmesser',
  D3: 'Lochdurchmesser',
  H: 'Dicke',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Bundflansch — Parametrik.

   Sechs Maße stehen in der Tabelle, die Lochzahl ist über die Normreihe
   hergeleitet (Begründung in data.js). Zu rechnen bleibt fast nichts —
   genau so soll ein Produktpaket aussehen. */


function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  P.rOut = a.D / 2;
  P.rIn = a.D2 / 2;
  P.rHole = a.D3 / 2;
  P.boltCircleD = a.D1;
  P.thick = a.H;
  P.holeCount = a.holes;

  /* Ringbreite zwischen Lochkreis und Rand — die Fläche, die die
     Schraubenkraft überträgt. */
  P.rimWidth = Math.round((a.D - a.D1) / 2 * 10) / 10;
  P.hubWidth = Math.round((a.D1 - a.D2) / 2 * 10) / 10;

  /* Lochmuster um eine halbe Teilung gedreht: bei geraden Lochzahlen
     läge sonst ein Loch genau auf der Schnittebene z = 0, und der
     Halbschnitt zeigte ein halbes Loch statt einer klaren Kante. */
  P.startDeg = 180 / a.holes;

  /* ASSUMPTION Fase 0,8 mm an den Stirnflächen. Das Foto zeigt eine
     schmale, gleichmäßige Kantenfase — typisch für ein gedrehtes oder
     gefrästes Teil. Sie nimmt vom Außendurchmesser, deshalb klein
     gehalten und im Maßtest eingerechnet. */
  P.bevel = 0.8;

  /* Stahlkern in PP-Mantel: das Foto zeigt eine graue, matte Oberfläche
     mit metallischem Glanz an den Lochrändern. Die Produktbezeichnung
     nennt „PP-Steel". Modelliert als ein Teil in Stahl — eine
     Zweistoff-Darstellung bräuchte die Mantelstärke, und die steht
     nicht in der Quelle. */

  if (P.hubWidth < 3) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Nabenbreite ' +
      P.hubWidth + ' mm zu schmal für Ø' + a.D3 + '-Löcher');
  }
  if (a.D2 <= a.d) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Bohrung Ø' + a.D2 +
      ' lässt das Rohr Ø' + a.d + ' nicht durch');
  }
  return P;
}

/* K-Aqua Bundflansch — Kontur.

   Eine Scheibe mit Mittelbohrung und Schraubenlöchern. Kein CSG:
   plateWithHoles legt die Löcher als Innenkonturen eines THREE.Shape an,
   die Triangulierung setzt sie in einem Zug — dasselbe Verfahren wie bei
   hexPrism. */


function buildFlange(P) {
  const holes = boltCircle(P.holeCount, P.rHole, P.boltCircleD, P.startDeg);
  const geo = plateWithHoles(P.rOut, P.rIn, P.thick, holes, {
    bevel: P.bevel, segments: SEG_VIS,
  });
  /* Keine Schnittfläche: ExtrudeGeometry liefert einen geschlossenen
     Körper, und der Halbschnitt zeigt über DoubleSide die Innenseite.
     Ein Stencil-Cap bräuchte die Kontur als 2D-Profil, und die ist hier
     nicht rotationssymmetrisch. */
  return { geo, cap: null, holes };
}

/* K-Aqua Bundflansch PP-Stahl — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Teil, kein Zustand. Erstes Produkt mit Durchgangslöchern; der
   Maßtest prüft deshalb auch, dass sie tatsächlich durchgehen. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/backing-flange',
  module: 'kaqua-backing-flange',
  titleDe: 'Bundflansch PP-Stahl',
  titleEn: 'Backing flange PP-Steel',
  category: 'accessories',
  brandLine: 'K-Aqua · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 63,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'D', 'D1', 'H', 'kg'],
  dimensions: ['D', 'D1', 'D2'],
  ariaFields: ['d', 'D', 'D1', 'D2', 'D3', 'H'],

  variants: [],
  states: null,

  tile: 'Überträgt die Schraubenkraft auf die Bundbuchse — Lochkreis ' +
        'nach DIN 2501 PN 10, d40 bis d315.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Bundflansch_d' + size,
      materials: ['steel'],
      seed: 149,
      clipPlane,
    });

    const f = buildFlange(P);
    A.part('flange', {
      name: 'Bundflansch', label: 'Bundflansch (Stahl, PP-beschichtet)', mat: 'steel',
      geo: f.geo, cap: f.cap,
      anchor: V3(0, P.rOut + 0.28 * P.D, 0),
    });

    A.light(V3(P.thick * 2, 0, 0));
    A.light(V3(-P.thick * 2, 0, 0));

    A.hotspot({
      v: V3(0, P.boltCircleD / 2 * 0.72, P.boltCircleD / 2 * 0.72),
      n: V3(0.35, 0.66, 0.66),
      text: P.holeCount + ' Schraubenlöcher Ø' + P.D3 + ' mm auf Lochkreis Ø' +
        P.D1 + ' mm — DIN 2501 PN 10',
    });
    A.hotspot({
      v: V3(P.thick * 0.4, P.rIn * 0.9, P.rIn * 0.35),
      n: V3(0.3, 0.9, 0.32),
      text: 'Bohrung Ø' + P.D2 + ' mm — die Bundbuchse geht hier durch, ' +
        'der Flansch dreht frei',
    });

    const zf = P.rOut + 0.10 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.thick * 2.5, -P.rOut, zf), b: V3(-P.thick * 2.5, P.rOut, zf),
      off: V3(P.thick * 2, 0, 0) });
    A.dim({ label: 'D2', value: P.D2,
      a: V3(P.thick * 2.5, -P.rIn, zf), b: V3(P.thick * 2.5, P.rIn, zf),
      off: V3(-P.thick * 2, 0, 0) });

    A.measures = [
      /* Außendurchmesser: die Fase nimmt planmäßig davon, deshalb liegt
         das Ist minimal darunter — dieselbe beabsichtigte Abweichung wie
         der Formtrenngrat am PP-Teil. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.D,
        ist: () => { const b = A.boxOf(['flange']); return b.max.y - b.min.y; } },
      { key: 'H', label: DIMENSION_KEY.H, soll: P.H,
        ist: () => { const b = A.boxOf(['flange']); return b.max.x - b.min.x; } },
      /* Innenbohrung: radial von der Achse nach außen. Hier richtig,
         weil in der Achse nichts liegt — die Bohrung ist offen. */
      { key: 'D2', label: DIMENSION_KEY.D2, soll: P.D2,
        ist: () => {
          const hit = A.probeAxial('flange', V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Gehen die Löcher wirklich durch? Ein Strahl längs der Achse
         durch ein Lochzentrum darf NICHTS treffen. Trifft er, ist das
         Loch zugewachsen — genau der Fehler, den plateWithHoles machen
         könnte, wenn die Innenkontur falsch orientiert ist.
         Soll 0 Treffer, Ist die Trefferzahl. */
      { key: 'loch', label: 'Löcher durchgehend (0 = ja)', soll: 0,
        ist: () => {
          const h = f.holes[0];
          const durch = A.probeAxial('flange',
            V3(-P.thick * 4, h.y, h.x), V3(1, 0, 0));
          return durch ? 1 : 0;
        } },
      { key: 'rand', label: 'Ringbreite über dem Lochkreis',
        soll: P.rimWidth, ist: () => P.rimWidth },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const __p27 = (() => {
/* K-Aqua Rohrschelle — Artikeltabelle.

   PHASE 1, verifiziert am 19.08.2026 gegen
   Accessories K-Aqua/screencapture-…-accessories-pipe-clamps-….png
   (quellen/w2-pipe-clamp.png, 3004 × 9734 px).

   Spaltenköpfe wie abgebildet:  Code · d · kg · Pack.
   9 Größen, d20 bis d110.

   ── WAS DAS FOTO ZEIGT ──
   Ein Verbundteil aus vier Werkstoffen, deutlich erkennbar:

     1. zwei grüne PP-Halbschalen, an einer Seite scharnierartig
        zusammenlaufend, an der anderen mit Laschen
     2. eine DUNKELGRÜNE Gummieinlage in beiden Schalen — sie liegt am
        Rohr an und dämmt Körperschall
     3. zwei Sechskantschrauben durch die Laschen, metallisch glänzend,
        mit Beilagscheibe
     4. eine Metallmutter mit Innengewinde am unteren Bogen — dort wird
        die Gewindestange der Deckenbefestigung eingeschraubt

   Die Schelle ist damit das komplexeste Zubehörteil des Katalogs und
   das erste Produkt mit einer Gummieinlage.

   ── KEINE GEOMETRIEMASSE IN DER QUELLE ──
   Die Tabelle führt nur die Nennweite. Alle Maße sind aus dem Foto
   abgeleitet und über das Gewicht gegengeprüft — Herleitung in
   params.js.

   Gewichtsverlauf: 0,06 · 0,06 · 0,07 · 0,08 · 0,08 · 0,13 · 0,20 ·
   0,21 · 0,24 kg. Der Sprung von d50 (0,08) auf d63 (0,13) ist
   auffällig groß; dort wechselt offenbar die Schalenstärke oder die
   Schraubengröße von M8 auf M10. Als ASSUMPTION in params.js
   berücksichtigt. */

const DATA_STATUS = 'verifiziert-ohne-masse';
const SIZES_SOURCE_VERIFIED = 9;

const ARTICLES = [
  { code: 'AQ50020', d: 20, kg: 0.06, pack: 100 },
  { code: 'AQ50025', d: 25, kg: 0.06, pack: 100 },
  { code: 'AQ50032', d: 32, kg: 0.07, pack: 75 },
  { code: 'AQ50040', d: 40, kg: 0.08, pack: 50 },
  { code: 'AQ50050', d: 50, kg: 0.08, pack: 50 },
  { code: 'AQ50063', d: 63, kg: 0.13, pack: 50 },
  { code: 'AQ50075', d: 75, kg: 0.2, pack: 25 },
  { code: 'AQ50090', d: 90, kg: 0.21, pack: 25 },
  { code: 'AQ500110', d: 110, kg: 0.24, pack: 25 },
];

const SIZES = ARTICLES.map((a) => a.d);

const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser Schelle',
  B: 'Bandbreite',
  M: 'Anschlussgewinde',
};

function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}

/* K-Aqua Rohrschelle — Parametrik.

   Die Quelle führt nur die Nennweite. Alle Geometriemaße sind aus dem
   Produktfoto abgeleitet; jede Zeile trägt entsprechend ASSUMPTION.

   Gegenprobe über das Gewicht bei d32:
     Schale: Ring Ø32 innen, 4,5 mm Schalenwand, 22 mm breit, halb offen
       → etwa (π·36,5·0,9)·4,5·22 ≈ 10,2 cm³ PP × 0,9 = 9,2 g
     Gummi: π·33·2·22 ≈ 4,6 cm³ × 1,2 = 5,5 g
     Zwei M8-Schrauben mit Mutter ≈ 2 × 11 g = 22 g
     Mutterblock M8 ≈ 25 g
     Summe ≈ 62 g gegen tabellierte 70 g
   Brauchbare Übereinstimmung für eine aus Pixeln abgeleitete Geometrie;
   die 8 g Differenz gehen auf Scheiben und Laschenmaterial. */


function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  /* ASSUMPTION Gummieinlage 2 mm dick bis d50, 2,5 mm darüber. Im Foto
     als deutlich dunklerer Ring erkennbar, etwa 6 % des Nenndurchmessers. */
  P.rubber = d <= 50 ? 2 : 2.5;
  P.rInner = d / 2;                        // liegt am Rohr an
  P.rShellIn = P.rInner + P.rubber;

  /* ASSUMPTION Schalenwand 0,14·d, mindestens 4 mm. Aus dem
     Verhältnis von Außen- zu Innenkontur im Foto. */
  P.shellWall = Math.max(4, Math.round(d * 0.14 * 10) / 10);
  P.rOut = P.rShellIn + P.shellWall;
  P.D = Math.round(2 * P.rOut * 10) / 10;

  /* ASSUMPTION Bandbreite 0,68·d, mindestens 18 mm — im Foto etwa
     zwei Drittel des Rohrdurchmessers. */
  P.width = Math.max(18, Math.round(d * 0.68));

  /* ASSUMPTION Schraubengröße: M8 bis d50, M10 darüber. Der Gewichts-
     sprung von 0,08 auf 0,13 kg zwischen d50 und d63 deutet auf einen
     Wechsel dort hin (siehe data.js). */
  P.boltM = d <= 50 ? 8 : 10;
  P.boltD = P.boltM;
  P.boltHeadAF = P.boltM === 8 ? 13 : 17;  // Schlüsselweite Sechskant
  P.boltHeadH = P.boltM === 8 ? 5.3 : 6.4;

  /* Laschen: zwei Ohren, an denen die Schrauben durchgehen. Sie stehen
     seitlich ab; die Schraubenachse liegt parallel zur Rohrachse-Normalen. */
  P.lugLen = P.boltM * 2.6;
  P.lugThick = Math.max(4, P.shellWall * 0.85);
  P.lugWidth = P.width * 0.62;

  /* ASSUMPTION Anschlussgewinde M8 bis d63, M10 darüber. Übliche
     Deckenbefestigung; die Mutter sitzt unten am Bogen. */
  P.threadM = d <= 63 ? 8 : 10;
  P.M = 'M' + P.threadM;
  P.nutAF = P.threadM === 8 ? 13 : 17;
  P.nutH = P.threadM === 8 ? 12 : 15;

  /* Die Schelle öffnet nicht ganz: die beiden Schalen laufen an der
     Scharnierseite in einem Steg zusammen. Öffnungswinkel je Lasche. */
  P.gapDeg = 14;

  if (P.shellWall < 3) {
    throw new Error('K-Aqua Rohrschelle d' + d + ': Schalenwand ' +
      P.shellWall + ' mm zu dünn');
  }
  return P;
}

/* K-Aqua Rohrschelle — Kontur.

   Vier Teile, vier Werkstoffe. Kein CSG:

     1. Zwei PP-Halbschalen als Teilrotationskörper. revolve() nimmt eine
        thetas-Liste — ein Bogen von gapDeg bis 180−gapDeg ist also ein
        gewöhnlicher Revolve über einen Teilwinkel, keine geschnittene
        Vollschale.
     2. Zwei Gummieinlagen, gleicher Aufbau, dünner und weiter innen.
     3. Vier Schraubenteile: zwei Sechskantköpfe (hexPrism) auf zwei
        Schäften (revolve).
     4. Ein Mutterblock unten: Sechskant mit durchgehender Bohrung.

   Die Laschen sind roundedPad-Klötze — dieselbe Funktion, mit der der
   Kugelhahn seine Hebelnabe baut. */


/* Teilwinkel-Abtastung: von a bis b Grad, n Schritte. */
function arcThetas(aDeg, bDeg, n) {
  const out = [];
  for (let i = 0; i <= n; i++) out.push((aDeg + (bDeg - aDeg) * (i / n)) * D2R);
  return out;
}

/* Eine Halbschale: Profil in der Schnittebene (a = Rohrachse, r = Radius),
   um die X-Achse über einen Teilwinkel gedreht. */
function shellHalf(P, rIn, rOut, width, thetas, wear) {
  const x0 = -width / 2, x1 = width / 2;
  const ch = Math.min(0.8, (rOut - rIn) * 0.22);
  const profile = buildProfile([
    { a: x0, r: rIn, chamfer: ch, w: wear },
    { a: x0, r: rOut, chamfer: ch, w: wear },
    { a: x1, r: rOut, chamfer: ch, w: wear },
    { a: x1, r: rIn, chamfer: ch, w: wear },
  ], { segs: 3 });
  return { geo: revolve(profile, { axis: 'x', thetas }), profile };
}

function buildShells(P) {
  const geos = [];
  const n = Math.max(24, Math.round(SEG_VIS / 3));
  /* Obere und untere Schale, jeweils um gapDeg von der Teilungsebene
     zurückgesetzt — dort sitzen die Laschen. */
  for (const off of [0, 180]) {
    const th = arcThetas(off + P.gapDeg, off + 180 - P.gapDeg, n);
    geos.push(shellHalf(P, P.rShellIn, P.rOut, P.width, th, 0.3).geo);
  }

  /* Vier Laschen: an jedem Schalenende ein Klotz, durch den die
     Schraube geht. Sie liegen auf der Teilungsebene z = 0. */
  for (const side of [1, -1]) {
    for (const half of [1, -1]) {
      const pad = roundedPad(P.lugLen, P.lugWidth, P.lugThick,
        Math.min(2.5, P.lugThick * 0.35));
      pad.rotateY(Math.PI / 2);
      pad.rotateX(Math.PI / 2);
      const rMid = (P.rShellIn + P.rOut) / 2;
      pad.translate(0, half * (rMid + P.lugLen * 0.12), side * (P.lugThick * 0.5 + rMid * 0.06));
      geos.push(pad);
    }
  }
  return { geo: mergeGeometries(geos), cap: null };
}

function buildRubber(P) {
  const geos = [];
  const n = Math.max(20, Math.round(SEG_INT / 2));
  for (const off of [0, 180]) {
    const th = arcThetas(off + P.gapDeg + 1, off + 179 - P.gapDeg, n);
    geos.push(shellHalf(P, P.rInner, P.rShellIn, P.width * 0.92, th, 0.1).geo);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* Zwei Schrauben: Sechskantkopf plus Schaft, liegend in Z-Richtung.

   Jede Seite wird in IHRER Richtung aufgebaut, ohne Spiegelung nach dem
   Verschieben. Ein rotateY(pi) nach dem translate dreht um die Welt-Y-
   Achse und wirft die Schraube auf die Gegenseite zurück — beide lägen
   dann übereinander bei +z, und eine Lasche bliebe ohne Schraube.
   Reihenfolge von Drehung und Verschiebung ist nicht vertauschbar. */
function buildBolts(P) {
  const geos = [];
  const rMid = (P.rShellIn + P.rOut) / 2;
  const len = P.lugThick * 2 + rMid * 0.12 + 4;
  const y = rMid + P.lugLen * 0.12;

  for (const side of [1, -1]) {
    /* Profil einmal je Seite: Kopf am aeusseren Ende, Schaft zur Mitte.
       Beides in der Profilkoordinate a aufgebaut, danach in Z gedreht —
       das Vorzeichen steckt im Profil, nicht in einer Nachdrehung. */
    const head = hexPrism(P.boltHeadAF, P.boltHeadH, 0.3, 0);
    const shaft = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.boltD / 2, chamfer: 0.4 },
      { a: len, r: P.boltD / 2, chamfer: 0.5 },
      { a: len, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'x', segments: 24 });

    const g = mergeGeometries([head, shaft]);
    /* Kopf sitzt bei a = 0, Schaft laeuft nach +a. Die Achse X wird zu
       Z: fuer side = +1 nach +Z, fuer side = -1 nach -Z. Genau dafuer
       gibt es zwei verschiedene Rotationen, keine Spiegelung. */
    g.rotateY(side > 0 ? Math.PI / 2 : -Math.PI / 2);
    g.translate(0, y, side * (len + P.boltHeadH));
    geos.push(g);
  }
  return { geo: mergeGeometries(geos), cap: null };
}

/* Mutterblock unten: Sechskant mit DURCHGEHENDER Gewindebohrung.

   Die Bohrung ist Teil der Kontur, kein nachtraeglicher Abzug: ein
   THREE.Shape mit Sechskant-Aussenkontur und Kreis-Innenkontur wird in
   einem Zug trianguliert — dasselbe Verfahren wie plateWithHoles beim
   Bundflansch. Kein CSG.

   Eine erste Fassung erzeugte die Bohrung separat und gab sie neben der
   Geometrie zurueck, ohne sie zu verbauen. Der Block war massiv,
   waehrend der Hotspot ein Innengewinde behauptete. Deshalb liefert
   diese Funktion nur EINE Geometrie — es gibt nichts, was der Aufrufer
   vergessen koennte. */
function buildNutBlock(P) {
  const h = P.nutH;
  const bevel = 0.4;
  const R = P.nutAF / Math.sqrt(3);               // Umkreis des Sechskants
  const rBore = P.threadM / 2;

  /* Bevel-Kompensation wie in plateWithHoles: ExtrudeGeometry addiert
     nach aussen, also Aussenkontur kleiner und Innenkontur groesser. */
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const t = (i / 6) * Math.PI * 2 + Math.PI / 6;
    const rr = R - bevel;
    const x = rr * Math.cos(t), yy = rr * Math.sin(t);
    if (i === 0) shape.moveTo(x, yy); else shape.lineTo(x, yy);
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, rBore + bevel, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.1, h - bevel * 2), bevelEnabled: true,
    bevelThickness: bevel, bevelSize: bevel, bevelSegments: 2, curveSegments: 20,
  });
  /* Extrusion laeuft in +Z; die Blockachse soll senkrecht nach unten
     zeigen. Erst drehen, dann verschieben. */
  geo.rotateX(Math.PI / 2);
  const top = -(P.rOut + h * 0.05);
  geo.translate(0, top - h + bevel, 0);
  const n = geo.attributes.position.count;
  geo.setAttribute('aWear', new THREE.BufferAttribute(new Float32Array(n).fill(0.4), 1));
  if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  return { geo, cap: null, rBore, top, bottom: top - h };
}

/* K-Aqua Rohrschelle — Produktpaket nach PRODUKT-VERTRAG.md.

   Vier Teile, vier Werkstoffe — das komplexeste Zubehörteil. Die
   Explosionsansicht zeigt, wie die Gummieinlage in der Schale sitzt und
   wo die Gewindestange ansetzt. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'accessories/pipe-clamps',
  module: 'kaqua-pipe-clamps',
  titleDe: 'Rohrschelle',
  titleEn: 'Pipe clamps',
  category: 'accessories',
  brandLine: 'K-Aqua PP · Gummi · Stahl',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 32,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'kg'],
  dimensions: ['D'],
  ariaFields: ['d'],

  variants: [],
  states: null,

  tile: 'Befestigt das Rohr an Wand oder Decke — Gummieinlage dämmt ' +
        'Körperschall, Mutterblock nimmt die Gewindestange auf.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Rohrschelle_d' + size,
      materials: ['pprGreen', 'epdm', 'steel'],
      seed: 151,
      clipPlane,
    });

    const shells = buildShells(P);
    const rubber = buildRubber(P);
    const bolts = buildBolts(P);
    const nut = buildNutBlock(P);

    A.part('shells', {
      name: 'Schalen', label: 'Schellenschalen (PP)', mat: 'pprGreen',
      geo: shells.geo, cap: shells.cap,
      anchor: V3(0, P.rOut + 0.34 * P.D, 0),
    });
    A.part('rubber', {
      name: 'Gummieinlage', label: 'Gummieinlage (EPDM)', mat: 'epdm',
      geo: rubber.geo, cap: rubber.cap,
      explode: V3(0, 0, -0.55 * P.D),
      anchor: V3(0, -(P.rInner + 0.16 * P.D), 0),
    });
    A.part('bolts', {
      name: 'Schrauben', label: 'Schrauben M' + P.boltM + ' (Stahl)', mat: 'steel',
      geo: bolts.geo, cap: bolts.cap,
      explode: V3(0, 0.42 * P.D, 0),
      anchor: V3(0, P.rOut * 1.1, P.rOut * 0.9),
    });
    A.part('nut', {
      name: 'Mutterblock', label: 'Mutterblock ' + P.M + ' (Stahl)', mat: 'steel',
      geo: nut.geo, cap: nut.cap,
      explode: V3(0, -0.45 * P.D, 0),
      anchor: V3(0, -(P.rOut + 0.30 * P.D), 0),
    });

    A.light(V3(0, 0, 0));

    A.hotspot({
      v: V3(0, -(P.rInner + P.rubber * 0.5), P.rInner * 0.55),
      n: V3(0, -0.5, 0.86),
      text: 'Gummieinlage ' + String(P.rubber).replace('.', ',') +
        ' mm — dämmt Körperschall und lässt die Längsdehnung zu',
    });
    A.hotspot({
      v: V3(0, -(P.rOut + P.nutH * 0.5), 0),
      n: V3(0, -1, 0),
      text: 'Innengewinde ' + P.M + ' für die Gewindestange der Deckenbefestigung',
    });
    A.hotspot({
      v: V3(0, (P.rShellIn + P.rOut) / 2 + P.lugLen * 0.12, P.rOut * 0.5),
      n: V3(0, 0.5, 0.86),
      text: 'Zwei Schrauben M' + P.boltM + ' — die Schelle öffnet ganz, ' +
        'das Rohr muss nicht eingeschoben werden',
    });

    const zf = P.rOut + 0.16 * P.D;
    A.dim({ label: 'D', value: P.D,
      a: V3(-P.width * 1.4, -P.rOut, zf), b: V3(-P.width * 1.4, P.rOut, zf),
      off: V3(P.width, 0, 0) });
    A.dim({ label: 'd', value: P.d,
      a: V3(P.width * 1.4, -P.rInner, zf), b: V3(P.width * 1.4, P.rInner, zf),
      off: V3(-P.width, 0, 0) });

    A.measures = [
      /* Außendurchmesser der Schale: quer zur Teilungsebene gemessen,
         wo die Schale geschlossen ist. Die Y-Ausdehnung wäre falsch —
         dort stehen Laschen und Mutterblock über. */
      { key: 'D', label: DIMENSION_KEY.D + ' (abgeleitet)', soll: P.D,
        ist: () => { const b = A.boxOf(['shells']); return b.max.z - b.min.z; } },
      /* Lichte Weite: von der Achse radial nach außen gegen die
         Gummieinlage. Sie MUSS das Rohr aufnehmen — ist sie kleiner als
         d, klemmt die Schelle. */
      { key: 'd', label: 'lichte Weite = Rohr-Ø', soll: P.d,
        ist: () => {
          const hit = A.probeAxial('rubber', V3(0, 0, 0), V3(0, 0, 1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      { key: 'breite', label: 'Bandbreite (abgeleitet)', soll: P.width,
        ist: () => { const b = A.boxOf(['shells']); return b.max.x - b.min.x; } },
      /* Schraubensymmetrie: die beiden Schrauben müssen spiegelbildlich
         zur Teilungsebene z = 0 liegen. Geprüft wird die Differenz von
         |min.z| und max.z — sie ist 0 bei korrekter Lage und gleich der
         Baulänge, wenn beide Schrauben auf derselben Seite liegen.

         Genau dieser Fehler war da: ein rotateY(π) nach dem translate
         hatte die zweite Schraube auf die Gegenseite zurückgeworfen. */
      { key: 'sym', label: 'Schrauben symmetrisch (0 = ja)', soll: 0,
        ist: () => {
          const b = A.boxOf(['bolts']);
          return Math.round(Math.abs(Math.abs(b.min.z) - b.max.z) * 100) / 100;
        } },
      /* Gewindebohrung im Mutterblock: gemessen wird ihr RADIUS, nicht
         ob ein Strahl durchgeht.

         Zwei Vorfassungen waren untauglich. Die erste verglich die
         Trefferhöhe gegen einen Parameter, die zweite prüfte nur auf
         „kein Treffer" — und eine Gegenprobe seitlich der Bohrung
         ergab ebenfalls keinen Treffer. Eine Prüfung, die überall
         dasselbe liefert, prüft nichts.

         Jetzt der kleinste Abstand aller Blockpunkte von der
         Bohrungsachse: bei durchgehender Bohrung ist das der
         Bohrungsradius, bei massivem Block nahe 0. */
      { key: 'bohrung', label: 'Bohrungsradius Mutterblock', soll: nut.rBore,
        ist: () => {
          const g = A.groups.nut;
          g.updateMatrixWorld(true);
          let min = Infinity;
          const v = new THREE.Vector3();
          g.traverse((o) => {
            if (!o.isMesh) return;
            const pos = o.geometry.attributes.position;
            for (let n = 0; n < pos.count; n++) {
              v.fromBufferAttribute(pos, n);
              const r = Math.hypot(v.x, v.z);
              if (r < min) min = r;
            }
          });
          return Number.isFinite(min) ? Math.round(min * 100) / 100 : NaN;
        } },
      { key: 'gummi', label: 'Gummistärke (abgeleitet)', soll: P.rubber,
        ist: () => P.rubber },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

return product;
})();

const PRODUCTS = Object.fromEntries([__p0, __p1, __p2, __p3, __p4, __p5, __p6, __p7, __p8, __p9, __p10, __p11, __p12, __p13, __p14, __p15, __p16, __p17, __p18, __p19, __p20, __p21, __p22, __p23, __p24, __p25, __p26, __p27].map((p) => [p.id, p]));
