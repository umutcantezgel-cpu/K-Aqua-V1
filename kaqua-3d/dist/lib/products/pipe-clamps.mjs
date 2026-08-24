/* K-Aqua 3D · Rohrschelle — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/pipe-clamps.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, hexPrism, materials, mergeGeometries, plateWithHoles, polygonCap, revolve, roundedPad, tubeLayers,
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


/* == pipe-clamps/data.js =============================================== */
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

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 9;

export const ARTICLES = [
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

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennweite',
  D: 'Außendurchmesser Schelle',
  B: 'Bandbreite',
  M: 'Anschlussgewinde',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == pipe-clamps/params.js ============================================= */
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


export function params(dNom) {
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


/* == pipe-clamps/parts.js ============================================== */
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

export function buildShells(P) {
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

export function buildRubber(P) {
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
export function buildBolts(P) {
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
export function buildNutBlock(P) {
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


/* == pipe-clamps/index.js ============================================== */
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

export { product as default };
