/* K-Aqua 3D · T-Stück 90° mit Innengewinde für Innenventil — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/tee-90-female-thread-internal-valve.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, materials, mergeGeometries, mirrorProfile, revolve, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _tee/parts.js ===================================================== */
/* K-Aqua T-Stück-Familie — Kontur.

   Belastungstest für branchJoin. Aufbau in drei Teilen, alle drei
   Rotationskörper oder Loft-Bänder — kein CSG:

     1. Durchgang: Rotationskörper um X, mit zwei Muffenbohrungen.
        Das ist geometrisch dasselbe wie die Muffe.
     2. Abzweig: Rotationskörper um Y, taucht in den Durchgang ein.
     3. Kehle: das Loft-Band aus branchJoin(), das beide tangential
        verbindet.

   BEKANNTE GRENZE, ausdrücklich: an der Durchdringung überlappen die
   Innenflächen von Durchgang und Abzweig. Von außen unsichtbar; im
   Halbschnitt sieht man an der Kehle zwei Flächen statt einer. Das ist
   der Preis dafür, ohne CSG zu arbeiten — eine boolesche Vereinigung
   wäre die einzige saubere Lösung und ist im Auftrag ausgeschlossen.
   Alle Maße sind davon unberührt. */


/* Durchgang: identischer Aufbau wie die Muffe, nur ohne mittleren
   Anschlag — im T-Stück trifft der Abzweig auf die Mitte.

   Exportiert, weil die Gewinde-T-Stücke (products/_teethread/) denselben
   Durchgang tragen. Zweimal geschrieben würde er driften (Fall 32). */
export function runProfile(P) {
  const ro = P.rOut;
  const rSock = (x) => P.d / 2 - P.sockTaper * (P.half - x);
  /* Der Aufrufer kann die Lage des Mundlochbunds vorgeben. Die
     Gewinde-T-Stücke tun das, weil ihr Maßtest genau dort D abtastet —
     die Formel zweimal zu schreiben hieße, sie driften zu lassen
     (Fall 32). */
  const xBell = P.xBell ?? (P.half - Math.max(3, 0.10 * P.socket));
  const bellRise = Math.min(0.35, P.wallFitting * 0.08);
  const rBarrel = ro - bellRise;

  const outer = [
    { a: 0, r: rBarrel + 0.09, fillet: 0.1 },
    { a: 0.5, r: rBarrel, fillet: 0.35 },
    { a: xBell - 1.5, r: rBarrel - DRAFT * (xBell - 1.5), fillet: 2.2 },
    { a: xBell, r: ro, fillet: 1.0 },
    { a: P.half, r: ro - DRAFT * (P.half - xBell), chamfer: Math.min(1.4, P.wallFitting * 0.4) },
  ];
  const inner = [
    { a: 0, r: P.boreR, fillet: 0.5 },
    { a: P.half - P.socket, r: P.boreR, fillet: 1.2 },
    { a: P.half - P.socket, r: rSock(P.half - P.socket), fillet: 1.2 },
    { a: P.half - 2, r: rSock(P.half - 2), fillet: 0.4 },
    { a: P.half, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  return { profile: buildProfile(mirrorProfile(outer, inner), { segs: 4 }), rBarrel };
}

export function buildTee(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Kehle zuerst: sie liefert insertDepth, also wie weit der
     Abzweigstutzen in den Durchgang eintauchen muss.

     Der Abzweig kann kleiner sein als der Durchgang (Reduzier-T). Ohne
     d1 in der Tabelle sind rOutB, socketB und boreRB identisch mit den
     Werten des Durchgangs — für das gleichschenklige T-Stück ändert
     sich damit nichts. */
  const rOutB = P.rOutB ?? P.rOut;
  const socketB = P.socketB ?? P.socket;
  const boreRB = P.boreRB ?? P.boreR;
  const dB = P.dB ?? P.d;
  const wallB = P.wallFittingB ?? P.wallFitting;

  const kehle = branchJoin({
    mainR: rBarrel, branchR: rOutB, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  // branchJoin baut um +X als Hauptachse und legt den Abzweig in die
  // XY-Ebene. Der Durchgang liegt hier auf X, der Abzweig soll auf +Y —
  // das ist genau die Vorgabe angle = 90.
  geos.push(kehle.geo);

  /* Abzweigstutzen: Rotationskörper um Y, von der Eintauchtiefe bis zur
     Stirnfläche bei y = branch. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.branch;
  const rSockB = (y) => dB / 2 - P.sockTaper * (yEnd - y);
  const yBell = yEnd - Math.max(3, 0.10 * socketB);
  const bellRise = Math.min(0.35, wallB * 0.08);
  const rB = rOutB - bellRise;

  const bOuter = [
    { a: yStart, r: rB, fillet: 0 },
    { a: yBell - 1.5, r: rB - DRAFT * (yBell - 1.5 - yStart) * 0.35, fillet: 2.0 },
    { a: yBell, r: rOutB, fillet: 1.0 },
    { a: yEnd, r: rOutB - DRAFT * (yEnd - yBell), chamfer: Math.min(1.4, wallB * 0.4) },
  ];
  const bInner = [
    { a: yEnd, r: dB / 2 + P.lead, fillet: 0 },
    { a: yEnd - 2, r: rSockB(yEnd - 2), fillet: 0.4 },
    { a: yEnd - socketB, r: rSockB(yEnd - socketB), fillet: 1.2 },
    { a: yEnd - socketB, r: boreRB, fillet: 1.2 },
    { a: yStart, r: boreRB, fillet: 0 },
  ];
  const bProfile = buildProfile([...bOuter, ...bInner], { segs: 4 });
  geos.push(revolve(bProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerferstift-Marken auf der Unterseite des Durchgangs. */
  for (const x of [-P.half * 0.55, P.half * 0.55]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.25 },
      { a: 0.1, r: P.emR, fillet: 0.1 },
      { a: 0.1, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    disc.translate(x, -(rBarrel - 0.05), 0);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([capFromProfile(profile, 'x')].concat(kehle.cap ? [kehle.cap] : [])),
    insertDepth: kehle.insertDepth,
  };
}


/* == tee-90-female-thread-internal-valve/data.js ======================= */
/* K-Aqua T-Stück 90° mit Innengewinde für Innenventil — Artikeltabelle.

   QUELLE: Druckkatalog KA-Katalog_GB_06-2025_NEU.pdf, Seite 108, obere
   Tabelle. Vier Größen.

   DAS IST KEIN ÜBERGANGSSTÜCK, SONDERN EIN VENTILKÖRPER. Der Katalog
   führt es unter „K-Aqua-Valves", nicht unter den Übergangsfittings, und
   zwei Spalten sagen warum:

     D1 = 45  in ALLEN vier Zeilen
     h  = 33  in ALLEN vier Zeilen

   Beide sind konstant, während d von 20 auf 32 und G von ¾" auf 1"
   wächst. Ein Abzweig, dessen Außendurchmesser und Höhe sich über die
   Baureihe nicht ändern, ist keine Muffe und kein Gewindeanschluss — er
   ist die Aufnahme für ein GENORMTES Ventiloberteil, das auf jede
   Nennweite passen muss.

   G STATT Rp. Die Spalte heißt G, nicht Rp. Beide bezeichnen
   zylindrische Rohrgewinde mit denselben Nennmaßen, aber Rp (ISO 7-1)
   dichtet IM Gewinde, G (ISO 228-1) nicht — es dichtet an einer
   Planfläche. Genau das braucht ein eingeschraubtes Ventiloberteil, das
   auf seiner Schulter abdichtet. Der Katalog benutzt den Unterschied
   also bewusst; das gewöhnliche T-Stück mit Innengewinde auf S. 99
   führt Rp.

   MASSSCHLÜSSEL (Maßskizze S. 108 oben):
     d   Nennmaß Durchgang
     G   Gewinde der Ventilaufnahme
     D   Außendurchmesser der Durchgangsmuffe
     L   Baulänge Durchgang, Stirnfläche zu Stirnfläche
     D1  Außendurchmesser des Ventildoms — konstant 45
     z   Einbaulänge Durchgang
     h   Achse Durchgang bis Stirnfläche des Doms — konstant 33

   OFFENER PUNKT — der Bezugspunkt von z.
   L − z beträgt 34 · 37 · 36 · 36, ist also nahezu, aber nicht ganz
   konstant. Wäre z die übliche Einbaulänge (L minus zweimal
   Muffentiefe), müsste die Differenz 29 · 32 · 36 · 36 lauten, also mit
   der Nennweite wachsen. Bei d20 und d25 weicht sie um 5 mm ab. Vier
   Zeilen reichen nicht, um den Bezugspunkt festzunageln. Für die
   Geometrie wird z nicht gebraucht — L, D, D1 und h bestimmen den Körper
   vollständig; z steht als Gegenprobe daneben (Fall 29). */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 4;

export const ARTICLES = [
  { code: 'AQ599A2034', d: 20, G: '3/4', D: 33, L: 80, D1: 45, z: 46, h: 33, kg: 0.11, pack: 100 },
  { code: 'AQ599A2534', d: 25, G: '3/4', D: 36, L: 80, D1: 45, z: 43, h: 33, kg: 0.12, pack: 80 },
  { code: 'AQ599A3234', d: 32, G: '3/4', D: 43, L: 75, D1: 45, z: 39, h: 33, kg: 0.14, pack: 80 },
  { code: 'AQ599A321',  d: 32, G: '1',   D: 44, L: 94, D1: 45, z: 58, h: 33, kg: 0.19, pack: 80 },
].map((a) => ({ ...a, key: a.d + 'x' + a.G.replace('/', '_') }));

/* Selbstprüfung der Transkription: D1 und h MÜSSEN konstant sein — das
   ist die Aussage, auf der die ganze Deutung ruht. */
ARTICLES.forEach((a) => {
  if (a.D1 !== 45 || a.h !== 33) {
    throw new Error('K-Aqua Innenventil-T ' + a.code +
      ': D1/h sind nicht 45/33 — die Deutung als genormte Ventilaufnahme fällt');
  }
});

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß Durchgang',
  G: 'Gewinde der Ventilaufnahme',
  D: 'Außendurchmesser Durchgangsmuffe',
  L: 'Baulänge',
  D1: 'Außendurchmesser Ventildom',
  h: 'Achse bis Domstirnfläche',
  z: 'z (Bezugspunkt offen)',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == tee-90-female-thread-internal-valve/params.js ===================== */
/* K-Aqua T-Stück für Innenventil — Parametrik.

   Der Durchgang ist ein gewöhnlicher T-Stück-Durchgang und kommt aus
   ../_tee/parts.js (runProfile). Was dieses Produkt ausmacht, sitzt
   oben: eine Aufnahme mit konstantem Außendurchmesser D1 = 45 und
   konstanter Höhe h = 33, in die ein genormtes Ventiloberteil
   eingeschraubt wird.

   DASS BEIDE KONSTANT SIND, IST DIE AUSSAGE DES PRODUKTS. Deshalb
   werden sie nicht aus d gerechnet, sondern aus der Tabelle genommen —
   und data.js bricht ab, wenn eine Zeile davon abweicht. */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);
  const d = a.d;

  const th = threadSpec(a.G);
  if (!th) throw new Error('K-Aqua Innenventil-T ' + a.code + ': kein Normmaß für G' + a.G);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRd = Math.max(0.3, 0.137 * th.pitch);
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  /* Durchgang — dieselben Felder, die runProfile erwartet. */
  P.half = a.L / 2;
  P.run = a.L;
  P.OD = a.D;
  P.rOut = a.D / 2;
  P.wallFitting = (a.D - d) / 2;
  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Innenventil-T ' + a.code + ': keine Schweißtiefe für d' + d);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);
  P.xBell = P.half - Math.max(3, 0.10 * P.socket);
  P.filletR = Math.max(1.5, 0.18 * d);

  /* Ventildom. */
  P.domOD = a.D1;
  P.rDom = a.D1 / 2;
  P.yTop = a.h;

  /* ASSUMPTION Gewindetiefe im Dom. Nicht bemaßt. Die Aufnahme muss das
     Oberteil so tief fassen, wie es einschraubt; die Einschraubtiefe
     eines G-Gewindes entspricht der eines R-Gewindes gleicher Größe, und
     die steht im Katalog auf S. 94 als l − z der AG-Übergangsmuffe:
     16 mm bei ¾", 18 mm bei 1". Nach oben begrenzt durch die Höhe, die
     der Dom über dem Durchgang überhaupt hat. */
  const einschraub = { '3/4': 16, '1': 18 }[a.G];
  if (!einschraub) throw new Error('K-Aqua Innenventil-T ' + a.code + ': keine Einschraubtiefe für G' + a.G);
  P.ringLen = Math.min(einschraub + 2, a.h - P.rOut * 0.55);
  P.turns = Math.max(3, Math.floor((P.ringLen - 1.6) / P.threadPitch));

  /* Der Messingring sitzt im PP-Dom; außen bleibt Kunststoff stehen. */
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.13 * P.threadOD), P.rDom - 3.0);
  P.ringWand = P.rRing - P.threadOD / 2;

  /* Messhöhe am Dom. Sie muss über der Kehle liegen (sonst misst man den
     Verrundungsübergang) und unter der Stirnfase. Dass sie hier steht und
     nicht in index.js, hat einen Grund: parts.js setzt an genau dieser
     Höhe einen Profilpunkt. Ohne ihn hat der zylindrische Dom zwischen
     Kehle und Stirnfläche ÜBERHAUPT KEINEN Netzpunkt, und die Messung
     fände ein leeres Fenster vor — heute der sechste Fall dieser Art. */
  P.yMess = Math.min(P.rOut + P.filletR + 1.5, P.yTop - 4);

  /* Gegenprobe der Spalte z, nicht zum Bauen. */
  P.socketFromTable = Math.round(((a.L - a.z) / 2) * 10) / 10;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  if (P.rDom <= P.rOut) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Dom D1 = ' + a.D1 +
      ' ist nicht dicker als der Durchgang D = ' + a.D);
  }
  if (P.ringWand < 1.5) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Ringwand ' +
      P.ringWand.toFixed(2) + ' mm — G' + a.G + ' passt nicht in den Dom D1 = ' + a.D1);
  }
  if (P.yTop - P.ringLen <= P.boreR + 2) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': das Gewinde reicht bis in die Durchgangsbohrung');
  }
  if (P.socket >= P.half - 2) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Muffentiefe ' + P.socket +
      ' passt nicht in die halbe Baulänge ' + P.half);
  }
  if (P.threadCore <= P.bore) {
    throw new Error('K-Aqua Innenventil-T ' + a.code + ': Gewindekern ' + P.threadCore +
      ' liegt nicht über der Durchgangsbohrung ' + P.bore.toFixed(1));
  }
  return P;
}


/* == tee-90-female-thread-internal-valve/parts.js ====================== */
/* K-Aqua T-Stück für Innenventil — Kontur.

   Der Durchgang kommt aus ../_tee/parts.js (runProfile) — es ist
   derselbe Durchgang wie beim T-Stück und beim Gewinde-T-Stück, und
   dreimal geschrieben würde er driften (Fall 32).

   Der Ventildom ist eigen: ein Zylinder mit konstantem Außendurchmesser
   D1 = 45 über allen Nennweiten, in dem ein Messingring mit
   G-Innengewinde sitzt. Kein CSG — die Kehle zum Durchgang baut
   branchJoin, wie beim T-Stück. */


export function buildVentilKoerper(P) {
  const { profile, rBarrel } = runProfile(P);
  const geos = [revolve(profile, { axis: 'x', segments: SEG_VIS })];

  /* Kehle zwischen Durchgang und Dom. Sie liefert insertDepth — wie weit
     der Dom in den Durchgang eintauchen muss, damit kein Spalt bleibt. */
  const kehle = branchJoin({
    mainR: rBarrel, branchR: P.rDom, filletR: P.filletR,
    angle: 90, segments: SEG_VIS, uSegs: 6,
  });
  geos.push(kehle.geo);

  /* Der Dom. Außen ein Zylinder auf D1 mit leichter Stirnfase, innen der
     Ringsitz und darunter der Übergang auf die Durchgangsbohrung. */
  const yStart = -kehle.insertDepth;
  const yEnd = P.yTop;
  const yRing = yEnd - P.ringLen;

  const dOuter = [
    { a: yStart, r: P.rDom, fillet: 0 },
    /* Messpunkt: siehe P.yMess in params.js. Er ändert die zylindrische
       Mantelfläche nicht, gibt der Messung aber etwas zu treffen. */
    { a: P.yMess, r: P.rDom, fillet: 0 },
    { a: yEnd - 1.5, r: P.rDom, fillet: 0.6 },
    { a: yEnd, r: P.rDom, chamfer: 0.9 },
  ];
  const dInner = [
    { a: yEnd, r: P.rRing, chamfer: 0.5 },
    { a: yRing, r: P.rRing, fillet: 0.6 },
    { a: yRing, r: P.boreR, fillet: 1.0 },
    /* Ein Netzpunkt auf halbem Weg zwischen Ringsitz und Durchgang.
       buildProfile unterteilt gerade Strecken nicht, und ohne ihn hat
       die Ventilbohrung zwischen ihren Enden keinen Punkt — jede
       Messung dort fände nur die Außenkontur vor. */
    { a: (yRing + yStart) / 2, r: P.boreR, fillet: 0 },
    { a: yStart, r: P.boreR, fillet: 0 },
  ];
  const dProfile = buildProfile([...dOuter, ...dInner], { segs: 4 });
  geos.push(revolve(dProfile, { axis: 'y', segments: SEG_VIS }));

  /* Auswerfermarken wie beim T-Stück — dasselbe Werkzeugprinzip. */
  for (const x of [-P.half * 0.55, P.half * 0.55]) {
    const disc = revolve(buildProfile([
      { a: 0, r: 0, fillet: 0 },
      { a: 0, r: P.emR, chamfer: 0.25 },
      { a: 0.1, r: P.emR, fillet: 0.1 },
      { a: 0.1, r: 0, fillet: 0 },
    ], { segs: 3 }), { axis: 'y', segments: SEG_FINE });
    disc.rotateX(Math.PI);
    disc.translate(x, -(rBarrel - 0.05), 0);
    geos.push(disc);
  }

  return {
    geo: mergeGeometries(geos),
    cap: mergeGeometries([
      capFromProfile(profile, 'x'),
      capFromProfile(dProfile, 'y'),
    ].concat(kehle.cap ? [kehle.cap] : [])),
  };
}

/* Der Messingring mit G-Innengewinde. threadRing im Core baut die
   Rp-Kontur; G und Rp haben dieselben Nennmaße nach ISO 228-1 bzw.
   ISO 7-1 — der Unterschied liegt in der Dichtstelle, nicht in der
   Geometrie. Deshalb dieselbe Funktion. */
export function buildVentilRing(P) {
  return threadRing({
    a0: P.yTop - P.ringLen,
    a1: P.yTop,
    rOuter: P.rRing,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'y',
  });
}


/* == tee-90-female-thread-internal-valve/index.js ====================== */
/* K-Aqua T-Stück 90° mit Innengewinde für Innenventil — Produktpaket.

   Der Katalog führt es unter „Valves", nicht unter den Übergangsfittings,
   und die Tabelle sagt warum: D1 = 45 und h = 33 sind über ALLE vier
   Größen konstant, während d von 20 auf 32 wächst. Das ist keine
   Gewindemuffe, sondern die Aufnahme für ein genormtes Ventiloberteil.

   Nachweisen lässt sich das ohne eigene Messung: der Selbsttest führt
   alle vier Größen einzeln auf, und die Zeilen D1 und h müssen in allen
   vieren dieselbe Zahl tragen, während d und G wechseln. Genau das ist
   die Aussage. */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/tee-90-female-thread-internal-valve',
  module: 'kaqua-tee-90-female-thread-internal-valve',
  titleDe: 'T-Stück 90° mit Innengewinde für Innenventil',
  titleEn: 'Tee 90° (Female thread) for internal valve',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'key',
  sizeLabel: (k) => {
    const [d, g] = String(k).split('x');
    return 'd' + d + ' · G' + g.replace('_', '/') + '"';
  },
  sizeTitle: 'Nennweite · Gewinde',
  defaultSize: '25x3_4',

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'G', 'D1', 'h', 'kg'],
  dimensions: ['L', 'h'],
  ariaFields: ['d', 'G', 'D', 'D1', 'L', 'h'],

  variants: [],
  states: null,

  tile: 'Ventilkörper in T-Form — die Aufnahme oben ist über alle ' +
        'Nennweiten gleich, damit dasselbe Oberteil überall passt.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_Innenventil_T_' + P.key.replace('x', '_'),
      materials: ['pprGreen', 'brass'],
      seed: 173,
      clipPlane,
    });

    const koerper = buildVentilKoerper(P);
    const ring = buildVentilRing(P);

    A.part('koerper', {
      name: 'Ventilkoerper', label: 'Ventilkörper (PP-R)', mat: 'pprGreen',
      geo: koerper.geo, cap: koerper.cap,
      anchor: V3(-P.half * 0.6, P.rOut + 0.20 * P.yTop, 0),
    });
    A.part('ring', {
      name: 'Messingring', label: 'Messingring G' + P.G + '" für das Ventiloberteil',
      mat: 'brass', geo: ring.geo, cap: ring.cap,
      explode: V3(0, 0.9 * P.yTop, 0),
      anchor: V3(0.12 * P.half, P.yTop + 0.35 * P.yTop, 0),
    });

    A.light(V3(-P.half * 0.7, 0, 0));
    A.light(V3(P.half * 0.7, 0, 0));

    A.hotspot({
      v: V3(0, P.yTop - P.ringLen * 0.45, P.rDom * 0.72),
      n: V3(0, 0.35, 0.94),
      text: 'Aufnahme G' + P.G + '" für das Ventiloberteil — Dom Ø ' + P.domOD +
        ' mm und Höhe ' + P.h + ' mm sind über ALLE Nennweiten gleich',
    });
    A.hotspot({
      v: V3(-P.half + Math.max(3, 0.10 * P.socket), P.rOut * 0.45, P.rOut * 0.85),
      n: V3(0, 0.45, 0.89),
      text: 'Schweißmuffe d' + P.d + ' für Polyfusion, Muffentiefe ' +
        String(P.socket).replace('.', ',') + ' mm',
    });

    const zf = P.rDom + 0.30 * P.yTop;
    A.dim({ label: 'L', value: P.run,
      a: V3(-P.half, -P.rOut - 0.55 * P.yTop, zf), b: V3(P.half, -P.rOut - 0.55 * P.yTop, zf),
      off: V3(0, -0.16 * P.yTop, 0) });
    A.dim({ label: 'h', value: P.yTop,
      a: V3(-P.half - 0.30 * P.yTop, 0, zf), b: V3(-P.half - 0.30 * P.yTop, P.yTop, zf),
      off: V3(-0.16 * P.yTop, 0, 0) });

    const pos = koerper.geo.attributes.position.array;
    const inY = (y0, y1) => {
      let max = 0, min = Infinity, n = 0;
      for (let i = 0; i < pos.length; i += 3) {
        const y = pos[i + 1];
        if (y < y0 || y > y1) continue;
        const r = Math.hypot(pos[i], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
        n++;
      }
      return { max, min, n };
    };
    const inX = (x0, x1) => {
      let max = 0, min = Infinity, n = 0;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        if (x < x0 || x > x1) continue;
        const r = Math.hypot(pos[i + 1], pos[i + 2]);
        if (r > max) max = r;
        if (r < min) min = r;
        n++;
      }
      return { max, min, n };
    };

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L, soll: P.run,
        ist: () => { const b = A.boxOf(['koerper']); return r2(b.max.x - b.min.x); } },
      /* h zählt ab der DURCHGANGSACHSE, nicht ab der Unterkante — die
         Achse liegt auf y = 0, also ist es schlicht max.y. */
      { key: 'h', label: DIMENSION_KEY.h, soll: P.yTop,
        ist: () => r2(A.boxOf(['koerper']).max.y) },
      /* D am Mundlochbund. Eine Box3 wäre untauglich: der Dom ist mit
         D1 = 45 in jeder Zeile dicker als der Durchgang und würde
         stattdessen gemessen. */
      { key: 'D', label: DIMENSION_KEY.D, soll: P.OD,
        ist: () => {
          const g = inX(P.xBell - 0.2, P.xBell + 0.2);
          return g.n ? r2(2 * g.max) : NaN;
        } },
      /* D1 am Dom, oberhalb des Durchgangs — dort kann nur der Dom
         liegen. */
      { key: 'D1', label: DIMENSION_KEY.D1, soll: P.domOD,
        ist: () => {
          const g = inY(P.yMess - 0.2, P.yMess + 0.2);
          return g.n ? r2(2 * g.max) : NaN;
        } },
      /* DASS D1 UND h KONSTANT SIND, zeigt die Messtabelle selbst: der
         Selbsttest führt alle vier Größen einzeln auf, und beide Zeilen
         müssen in allen vieren dieselbe Zahl tragen. Eine eigene
         Konstanz-Messung wäre nur eine Summe zweier Maße, die schon
         dastehen — sie sähe nach mehr Prüfung aus, als sie ist. */
      /* Gewindekern im Messingring, radial von der Achse. */
      { key: 'kern', label: 'Innengewinde-Kerndurchmesser G' + P.G + '"',
        soll: P.threadCore,
        ist: () => {
          const rp = ring.geo.attributes.position.array;
          const y0 = P.yTop - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const y1 = y0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < rp.length; i += 3) {
            const y = rp[i + 1];
            if (y < y0 || y > y1) continue;
            const r = Math.hypot(rp[i], rp[i + 2]);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      /* GEGENPROBE: die Durchgangsbohrung. Sie MUSS enger sein als der
         Gewindekern — sonst wäre der Dom keine Ventilaufnahme, sondern
         ein zweiter Durchgang. */
      { key: 'bohrung', label: 'Durchgangsbohrung (Gegenprobe)', soll: r2(P.bore),
        /* An der Kreuzung gemessen: dort liegt ein Profilpunkt der
           Durchgangsbohrung, und nichts im Modell ist enger. */
        ist: () => {
          const g = inX(-0.3, 0.3);
          return g.n ? r2(2 * g.min) : NaN;
        } },
    ];

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
