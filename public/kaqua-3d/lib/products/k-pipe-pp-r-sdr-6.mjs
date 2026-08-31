/* K-Aqua 3D · K-Rohr PP-R SDR 6 — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID pipes/k-pipe-pp-r-sdr-6.
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


/* == k-pipe-pp-r-sdr-6/data.js ========================================= */
/* K-Aqua K-Rohr PP-R SDR 6 — Artikeltabelle.

   PHASE 1, verifiziert am 16.08.2026 gegen
   Piepes K-Aqua/screencapture-…-pipes-k-pipe-pp-r-sdr-6-2026-06-20-05_46_21.pdf
   (Seitenbilder quellen/pipe6-p1.jpg … p3.jpg). Die Tabelle läuft über
   den Seitenumbruch: Seite 1 endet bei d50, Seite 2 führt d63–d125.

   Spaltenköpfe exakt wie abgebildet:
     Code · D · DN · Di · S min. · Pack. · Weight (kg/m) · Water Capacity (l/m)

   Kopfzeile der Seite: „K Pipe PP-R" SDR 6 — S 2,5 (20° C/2,0 MPa —
   70° C/1,0 MPa), length 4 meter

   MASSSCHLÜSSEL (technische Zeichnung neben dem Produktfoto):
     D    Außendurchmesser
     DN   Nennweite (Zoll-Äquivalent), rein informativ
     Di   Innendurchmesser
     S    Mindestwandstärke
   Gegenprobe: D − 2·S = 20 − 6,8 = 13,2 = Di ✓ · D/S = 5,88 ≈ SDR 6 ✓

   Werkstoffangabe der Zeichnung: PP-R, „green with 1 red stripe",
   Normen DIN EN ISO 15874 / DIN 8077 / 8078.

   Fußnote der Quelle, wörtlich (auf Seite 2 unterhalb der Tabelle, auf
   dem ersten Zuschnitt nicht mit abgebildet):
   „Pipe can be delivered in 5.80 meter length on special request with
   product code AQ258F+dimension"

   ── ABWEICHUNGEN gegen docs Unterseiten/pipes/k-pipe-pp-r-sdr-6.md ──
   1. Markdown führt 5 von 10 Größen (d20–d50). Es fehlen d63, d75,
      d90, d110, d125.
   2. Markdown führt keine Spalten Di und S — also genau die Werte, die
      ein maßhaltiges Rohrmodell braucht.
   Korrigierte Fassung: produkt-markdown/pipes/k-pipe-pp-r-sdr-6.md   */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 10;
export const SDR = 6;
export const STOCK_LENGTH_M = 4;

export const ARTICLES = [
  { code: 'AQ200P20',  d: 20,  dn: 12, di: 13.2, s: 3.4,  pack: 100, kgm: 0.18, lm: 0.14 },
  { code: 'AQ200P25',  d: 25,  dn: 15, di: 16.6, s: 4.2,  pack: 100, kgm: 0.28, lm: 0.22 },
  { code: 'AQ200P32',  d: 32,  dn: 20, di: 21.2, s: 5.4,  pack: 60,  kgm: 0.46, lm: 0.35 },
  { code: 'AQ200P40',  d: 40,  dn: 25, di: 26.6, s: 6.7,  pack: 40,  kgm: 0.68, lm: 0.56 },
  { code: 'AQ200P50',  d: 50,  dn: 32, di: 33.2, s: 8.3,  pack: 20,  kgm: 1.09, lm: 0.87 },
  { code: 'AQ200P63',  d: 63,  dn: 40, di: 42.0, s: 10.5, pack: 20,  kgm: 1.60, lm: 1.39 },
  { code: 'AQ200P75',  d: 75,  dn: 50, di: 50.0, s: 12.5, pack: 12,  kgm: 2.50, lm: 1.96 },
  { code: 'AQ200P90',  d: 90,  dn: null, di: 60.0, s: 15.0, pack: 8, kgm: 3.30, lm: 2.83 },
  { code: 'AQ200P110', d: 110, dn: 65, di: 73.2, s: 18.3, pack: 4,   kgm: 5.00, lm: 4.21 },
  { code: 'AQ200P125', d: 125, dn: 80, di: 83.2, s: 20.8, pack: 4,   kgm: 6.50, lm: 5.46 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Außendurchmesser',
  dn: 'Nennweite DN',
  di: 'Innendurchmesser',
  s: 'Wandstärke',
};

/* Schichtaufbau von außen nach innen. Beim monolithischen PP-R-Rohr
   eine Lage; die Faserrohre setzen hier drei ein, sonst identisch. */
export const LAYERS = [{ key: 'pprGreen', frac: 1, label: 'PP-R' }];

/* Längsstreifen auf der Mantelfläche — Zeichnung: „green with 1 red
   stripe". Kein Schichtaufbau, sondern eine Coextrusionsspur. */
export const STRIPES = [
  { key: 'redStripe', angleDeg: 0, widthDeg: 7 },
];

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == k-pipe-pp-r-sdr-6/params.js ======================================= */
/* K-Aqua K-Rohr PP-R SDR 6 — Parametrik.
   Dünne Hülle um das Familienmodul; produktspezifisch ist nur data.js. */


export function params(dNom) {
  return pipeParams(article(dNom), { sdr: SDR, stockLength: STOCK_LENGTH_M });
}


/* == k-pipe-pp-r-sdr-6/parts.js ======================================== */
/* K-Aqua K-Rohr PP-R SDR 6 — Kontur.
   Kommt vollständig aus dem Familienmodul. */


/* == k-pipe-pp-r-sdr-6/index.js ======================================== */
/* K-Aqua K-Rohr PP-R SDR 6 — Produktpaket nach PRODUKT-VERTRAG.md.

   Ein Rohrabschnitt, kein Zustand. Der Nutzen steckt in der
   Schnittansicht: dort wird der Wandaufbau sichtbar, und genau das
   lässt sich in 2D nicht zeigen.

   Die elf weiteren Rohre unterscheiden sich von diesem hier
   ausschließlich in data.js — Tabelle, LAYERS und STRIPES. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);

const product = {
  id: 'pipes/k-pipe-pp-r-sdr-6',
  module: 'kaqua-k-pipe-pp-r-sdr-6',
  titleDe: 'K-Rohr PP-R SDR 6',
  titleEn: 'K-Pipe PP-R SDR 6',
  category: 'pipes',
  brandLine: 'K-Aqua PP-R · SDR 6 · S 2,5',
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

  tile: 'Druckrohr für Trinkwasser, 20 °C bei 2,0 MPa — die Basis des ' +
        'Systems, geliefert in 4-m-Stangen.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const LAGEN = mitFarbvariante(LAYERS, variant);
    const matKeys = [...new Set([...LAGEN.map((l) => l.key), ...STRIPES.map((s) => s.key)])];
    const A = createAssembly({
      name: 'K-Aqua_Rohr_d' + size,
      materials: matKeys,
      seed: 71,
      // Rohre werden extrudiert: Kennzeichnung als Aufdruck, nicht als Prägung.
      emboss: false,
      clipPlane,
    });

    const layers = buildTube(P, LAGEN);
    layers.forEach((layer, i) => {
      A.part('layer' + i, {
        name: 'Rohrwand_' + layer.label,
        label: LAGEN.length > 1
          ? layer.label + ' (' + layer.thickness.toFixed(1).replace('.', ',') + ' mm)'
          : 'Rohrwand PP-R (' + P.wall.toFixed(1).replace('.', ',') + ' mm)',
        mat: layer.key,
        geo: layer.geo,
        cap: layer.cap,
        // Lagen fahren radial auseinander — so liest sich der Wandaufbau
        explode: V3(0, (LAGEN.length - i) * P.d * 0.55, 0),
        anchor: i === 0 ? V3(0, P.rOut + 0.16 * P.len, 0) : V3(0, P.rOut + 0.10 * P.len, 0),
      });
    });

    STRIPES.forEach((stripe, i) => {
      const s = buildStripe(P, stripe);
      A.part('stripe' + i, {
        name: 'Kennstreifen',
        label: 'Kennstreifen (Coextrusion)',
        mat: stripe.key,
        geo: s.geo,
        explode: V3(0, (LAGEN.length + 1) * P.d * 0.55, 0),
        noExplodeEntry: false,
      });
    });

    A.light(V3(-P.xEnd * 0.7, 0, 0));
    A.light(V3(P.xEnd * 0.7, 0, 0));

    A.hotspot({
      v: V3(-P.xEnd + P.d * 0.28, P.rOut * 0.42, P.rOut * 0.88),
      n: V3(0, 0.42, 0.9),
      text: 'Schnittkante: Wandstärke ' + String(P.wall).replace('.', ',') +
            ' mm, Innendurchmesser ' + String(P.di).replace('.', ',') + ' mm',
    });
    A.hotspot({
      v: V3(P.len * 0.12, P.rOut * 0.95, P.rOut * 0.28),
      n: V3(0, 0.95, 0.3),
      text: 'Kennstreifen rot — SDR 6, Lieferlänge ' + P.stockLength + ' m',
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
      /* Innendurchmesser: von der Achse aus radial nach außen schießen,
         auf halber Länge. Ein axialer Strahl trifft die Anschnittfase
         und liefert nur seinen eigenen Radius zurück. */
      { key: 'di', label: DIMENSION_KEY.di, soll: P.di,
        ist: () => {
          const inner = 'layer' + (LAGEN.length - 1);
          const hit = A.probeAxial(inner, V3(0, 0, 0), V3(0, 1, 0));
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
      /* Wandsumme der Lagen muss die Gesamtwand ergeben — die Prüfung,
         die beim Mehrschichtrohr etwas aussagt. Die SDR-Reihe selbst
         prüft params.js, weil S eine MINDESTwandstärke ist und das
         Verhältnis deshalb planmäßig unter dem Nennwert liegt. */
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
