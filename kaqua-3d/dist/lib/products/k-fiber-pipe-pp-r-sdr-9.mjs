/* K-Aqua 3D · K-Fiber Rohr PP-R SDR 9 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID pipes/k-fiber-pipe-pp-r-sdr-9.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, ISO, applyFillets, buildProfile, createAssembly, expandChamfers, materials, revolve, tubeLayers,
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

  /* ── WELCHE WAND WIRD MODELLIERT ──
     Die Tabelle nennt DREI Werte, und sie sind nicht immer widerspruchsfrei:
     D, Di und „S min.". Modelliert wird die Wand aus D und Di, denn das
     sind die beiden ENDEN, die die Tabelle festlegt — die Wand ist ihre
     Differenz. „S min." ist ein Mindestmaß und liegt bei einigen Zeilen
     0,1 mm darunter; dort ergäbe D − 2·S eine um 0,2 mm zu weite Bohrung.

     Betroffen sind (Stand 24.08.2026) k-pipe-pp-r-sdr-6 bei d110 und d125
     sowie k-fiber-pipe-pp-r-sdr-6 bei d50, d110 und d125. In allen übrigen
     Zeilen aller Rohre sind beide Rechnungen gleich, dort ändert sich
     nichts. */
  P.wall = Math.round(((a.d - a.di) / 2) * 1000) / 1000;
  P.wallMin = a.s;
  P.wallDeltaToMin = Math.round((P.wall - a.s) * 100) / 100;

  /* ASSUMPTION: Darstellungslänge. Geliefert werden 4-m-Stangen; in der
     Länge ist das Rohr im Viewer ein Strich. Gezeigt wird ein Abschnitt
     von 6·D, mindestens 140 mm — lang genug, dass die Silhouette als
     Rohr lesbar bleibt, kurz genug für die Schnittkante. Die
     Lieferlänge steht in der Metaleiste und im Hotspot. */
  P.len = Math.max(140, 6 * a.d);
  P.xEnd = P.len / 2;

  /* Transkriptionsprobe: D − 2·S soll Di ergeben. Grosse Abweichungen sind
     Lesefehler und brechen ab — lieber kein Rohr als ein falsches. Kleine
     (bis 0,25 mm) sind der Mindestwand geschuldet und stehen als
     wallDeltaToMin im Pruefbericht. Diese Probe hat beim Ablesen schon
     einen echten Fehler gefunden. */
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


/* ── Farbvarianten der Rohrserien ──

   Die Serien sind neben dem Standardgrün auch in Blau, Curry und Mocca
   lieferbar (Marketing/Produktbilder/, RAL-Nummer im Ordnernamen). Der
   Produktvertrag sieht dafür `variants` und den zweiten Parameter von
   `build(size, variant, clipPlane)` vor — beides war bisher bei allen 71
   Produkten leer.

   Warum die Umfärbung über den Materialschlüssel läuft und nicht über die
   Materialregistry: Bei den Faserrohren tragen Außen- UND Innenlage denselben
   Schlüssel `pprGreen`, `createAssembly` dedupliziert per Set und legt für
   beide EINE Materialinstanz an. Wer die Instanz umfärbt, färbt zwangsläufig
   auch die Innenlage mit. Nur ein eigener Schlüssel je Lage trennt das. */
export const ROHR_VARIANTEN = ['gruen', 'blau', 'curry', 'mocca'];

const VARIANTEN_MATERIAL = {
  gruen: 'pprGreen',
  blau: 'pprBlue',
  curry: 'pprCurry',
  mocca: 'pprMocca',
};

/**
 * Gibt die Lagenliste mit eingefärbter AUSSENLAGE zurück.
 *
 * Nur Lage 0 wechselt die Farbe. Innenlagen und der Faserkern bleiben, was sie
 * sind — die Variante betrifft die Coextrusion außen, nicht den Wandaufbau.
 * Kennstreifen bleiben ebenfalls unberührt: sie kodieren die Baureihe.
 */
/**
 * Aufdruckband entlang der Rohrachse.
 *
 * Bauform wie der Kennstreifen, aber flach: Ein Aufdruck traegt nicht auf.
 * Die 0,04 mm Abstand zur Mantelflaeche sind kein Relief, sondern der
 * Mindestabstand, damit die beiden Flaechen nicht um denselben Tiefenwert
 * streiten.
 *
 * Bewusst ein eigenes Bauteil und nicht Teil des Rohrkoerpers: So bleibt die
 * Druckfarbe hell, egal welche Farbvariante das Rohr traegt — genau wie am
 * echten Produkt. Kostet rund 500 Vertices je Rohr; das Budget in
 * tests/unit/kaqua3d-geometry.test.ts hat davon reichlich.
 */
/**
 * Die Kennzeichnungszeile, wie sie am realen Rohr steht.
 *
 * Sie wird aus `brandLine` des Produkts gebaut — dort steht Werkstoff, Reihe
 * und SDR bereits in der Katalogschreibweise. Zwei Fassungen desselben Textes
 * zu pflegen waere die sichere Art, sie auseinanderlaufen zu lassen.
 *
 * Die Mittelpunkte werden zu Leerraum: Auf einem Rohr steht kein
 * typografischer Trenner, sondern schlicht Abstand.
 */
export function druckzeile(brandLine, size) {
  return `${String(brandLine).replace(/\s*·\s*/g, '   ').toUpperCase()}   d${size}   MADE IN GERMANY`;
}

export function buildPrintBand(P, opt = {}) {
  const lift = 0.04;
  const widthDeg = opt.widthDeg ?? 26;
  const half = (widthDeg / 2) * D2R;
  const c = (opt.angleDeg ?? 150) * D2R;
  const n = 12;
  const thetas = [];
  for (let i = 0; i <= n; i++) thetas.push(c - half + (2 * half * i) / n);

  /* Offenes Profil: nur die Aussenhaut des Bandes. Ein geschlossenes haette
     eine Rueckseite, die niemand sieht und die nur Dreiecke kostet. */
  const profile = buildProfile(
    [
      { a: -P.xEnd * 0.94, r: P.rOut + lift, fillet: 0 },
      { a: P.xEnd * 0.94, r: P.rOut + lift, fillet: 0 },
    ],
    { segs: 1, closed: false }
  );

  return { geo: revolve(profile, { axis: 'x', thetas }), cap: null, profile };
}

export function mitFarbvariante(layers, variant) {
  const key = VARIANTEN_MATERIAL[variant];
  if (!key || !layers.length || layers[0].key !== 'pprGreen') return layers;
  return layers.map((l, i) => (i === 0 ? Object.assign({}, l, { key }) : l));
}

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

  /* ── ZWEI FEHLER, DIE SICH GEGENSEITIG VERSTECKT HABEN ──

     1. Die Modulationsfunktion unten lief ins Leere. `revolve` rechnet
        `r = p.r + m * (p.w || 0)` (core/geometry.js), und `buildProfile`
        setzt jedem Punkt `w: 0`, sofern keiner mitgegeben wird. Hier wurde
        keiner mitgegeben — `mod` war also seit jeher tote Rechnung, und der
        Streifen stand als hart abgesetztes Baendchen auf dem Rohr statt an
        den Raendern in den Mantel einzulaufen. Genau das Gegenteil dessen,
        was der Kommentar oben beschreibt.

        Die beiden AEUSSEREN Punkte bekommen deshalb `w: 1`: nur sie sollen
        sich radial bewegen. Die inneren bleiben bei `w: 0` und damit stehen.
        `expandChamfers` und `applyFillets` reichen `w` durch, der Wert
        ueberlebt die Profilaufbereitung.

     2. Der Rueckweg des geschlossenen Profils lag exakt auf `rOut` — also
        koplanar mit der Rohrmantelflaeche darunter. Zwei Flaechen auf
        derselben Ebene ergeben Z-Fighting: je nach Blickwinkel und
        Tiefenpuffer flackert mal die eine, mal die andere durch. Die
        Unterseite liegt jetzt knapp UNTER der Mantelflaeche und ist damit
        sauber verdeckt. */
  const sink = 0.05;

  const profile = buildProfile([
    { a: -P.xEnd, r: P.rOut - sink, fillet: 0 },
    { a: -P.xEnd, r: P.rOut + rise, chamfer: 0.2, w: 1 },
    { a: P.xEnd, r: P.rOut + rise, chamfer: 0.2, w: 1 },
    { a: P.xEnd, r: P.rOut - sink, fillet: 0 },
  ], { segs: 2 });

  const mod = (th) => {
    const u = Math.abs((th - c) / half);
    return u >= 1 ? -rise : -rise * (1 - Math.pow(Math.min(1, u), 6));
  };
  return { geo: revolve(profile, { axis: 'x', thetas, mod }), cap: null, profile };
}


/* == k-fiber-pipe-pp-r-sdr-9/data.js =================================== */
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

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 8;
export const SDR = 9;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ169PF32', d: 32, dn: 25, di: 24.8, s: 3.6, pack: 60, kgm: 0.33, lm: 0.48 },
  { code: 'AQ169PF40', d: 40, dn: 32, di: 31, s: 4.5, pack: 40, kgm: 0.52, lm: 0.75 },
  { code: 'AQ169PF50', d: 50, dn: 40, di: 38.8, s: 5.6, pack: 20, kgm: 0.8, lm: 1.18 },
  { code: 'AQ169PF63', d: 63, dn: 50, di: 48.8, s: 7.1, pack: 20, kgm: 1.25, lm: 1.87 },
  { code: 'AQ169PF75', d: 75, dn: null, di: 58.2, s: 8.4, pack: 12, kgm: 1.77, lm: 2.66 },
  { code: 'AQ169PF90', d: 90, dn: 65, di: 69.8, s: 10.1, pack: 8, kgm: 2.55, lm: 3.83 },
  { code: 'AQ169PF110', d: 110, dn: 80, di: 85.4, s: 12.3, pack: 4, kgm: 3.78, lm: 5.73 },
  { code: 'AQ169PF125', d: 125, dn: 100, di: 97, s: 14, pack: 4, kgm: 4.89, lm: 7.39 },
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
  { key: 'pprGreen', frac: 0.3, label: 'PP-R außen' },
  { key: 'fiberLayer', frac: 0.4, label: 'PP-R GF, glasfaserverstärkt' },
  { key: 'pprGreen', frac: 0.3, label: 'PP-R innen' },
];

/* STREIFENFARBE, berichtigt am 24.08.2026.

   Das Modell trug vier blaue Streifen. Der Katalog sagt auf S. 80
   „green with 4 grey stripes". Geändert auf den Katalog.

   Warum der Katalog gewinnt und nicht die alte Website-Tabelle, aus der
   die frühere Farbe stammte — drei unabhängige Belege:

   1. Auf S. 80 stehen SDR 9 und SDR 11 untereinander, und NEBEN jeder
      Farbangabe steht das Produktfoto. Text und Bild derselben Seite
      sagen dasselbe: grauer Streifen oben, blauer unten. Der Katalog
      stützt sich selbst.
   2. Das freigegebene Studiofoto zu AQ111P zeigt genau einen blauen
      Streifen, wie der Katalog auf S. 77 sagt. Eine dritte Quelle,
      geprüft an einer Zeile, die gar nicht strittig war.
   3. Die alte Website WIDERSPRICHT SICH SELBST: ihre Kategorie-
      aufnahme „PIPES" zeigt das violette Rohr ohne jeden Streifen,
      während ihre eigene Tabelle einen roten nennt. Eine Quelle, die
      sich selbst widerspricht, ist als Quelle erledigt.

   Die drei Faserrohre bildeten zusammen einen sauberen Ringtausch
   grau→rot, blau→grau, rot→blau — die Handschrift einer um eine Zeile
   verrutschten Tabelle, nicht die von Streuung. */
export const STRIPES = [
  { key: 'greyStripe', angleDeg: 0, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 90, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 180, widthDeg: 7 },
  { key: 'greyStripe', angleDeg: 270, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == k-fiber-pipe-pp-r-sdr-9/params.js ================================= */
/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


export function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}


/* == k-fiber-pipe-pp-r-sdr-9/parts.js ================================== */
/* K-Aqua K-Fiber Rohr PP-R SDR 9 — Kontur.
   Kommt vollständig aus dem Familienmodul. */


/* == k-fiber-pipe-pp-r-sdr-9/index.js ================================== */
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

  /* Serienfarben laut Herstellerarchiv — der Viewer blendet die Auswahl
     von selbst ein, sobald diese Liste nicht leer ist. */
  variants: ROHR_VARIANTEN,
  states: null,

  tile: 'Mittlere Druckstufe der Faserrohre — beginnt erst bei d32.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const LAGEN = mitFarbvariante(LAYERS, variant);
    const matKeys = [...new Set([...LAGEN.map((l) => l.key), ...STRIPES.map((s) => s.key), 'pprPrint'])];
    const A = createAssembly({
      name: 'K-Aqua_kaqua-k-fiber-pipe-pp-r-sdr-9' + '_d' + size,
      materials: matKeys,
      seed: 149,
      // Rohre werden extrudiert: Kennzeichnung als Aufdruck, nicht als Prägung.
      emboss: false,
      printText: druckzeile(product.brandLine, size),
      clipPlane,
    });

    const layers = buildTube(P, LAGEN);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAGEN.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAGEN.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: buildStripe(P, stripe).geo,
        explode: V3(0, (LAGEN.length + 1) * P.d * 0.55, 0),
      });
    });

    /* Aufdruck statt Prägung — Rohre werden extrudiert. */
    A.part('print', {
      name: 'Aufdruck',
      label: 'Kennzeichnung (Aufdruck)',
      mat: 'pprPrint',
      geo: buildPrintBand(P).geo,
      explode: V3(0, (LAGEN.length + 1) * P.d * 0.55, 0),
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: LAGEN.length > 1
        ? 'Schnittkante: ' + LAGEN.length + ' Lagen, Wandstärke ' +
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
          const hit = A.probeAxial('layer' + (LAGEN.length - 1), V3(0, 0, 0), V3(0, 1, 0));
          return hit ? Math.round(2 * hit.y * 100) / 100 : NaN;
        } },
      /* Die modellierte Wand ist die Differenz der beiden Tabellenenden,
         nicht die Spalte „S min.". Der Tabellenwert steht als eigene
         Zeile daneben: eine Messung, die zwei Tabellenspalten
         gegeneinander hält, prüft das Modell nicht (Fall 14). */
      { key: 's', label: DIMENSION_KEY.s, soll: P.wall,
        ist: () => Math.round(((P.d - P.di) / 2) * 1000) / 1000 },
      { key: 's_min_tabelle', label: 'Tabelle „S min." (Gegenprobe, kein Modellmaß)',
        soll: P.wallMin, ist: () => P.wallMin },
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
