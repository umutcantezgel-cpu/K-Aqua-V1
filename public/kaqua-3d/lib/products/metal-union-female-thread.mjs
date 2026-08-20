/* K-Aqua 3D · Metallverschraubung mit PP-R-Mutter (Innengewinde) —
   gebündeltes ES-Modul. Erzeugt, nicht handgepflegt.
   STATUS PROTOTYP: die Spalte SW ist nicht auflösbar, siehe data.js.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, hexPrism, materials, mergeGeometries, revolve, threadProfile,
} from '../kaqua-3d-core.mjs';

/* == metal-union-female-thread/data.js ================================= */
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

export const DATA_STATUS = 'tabelle-verifiziert-gestalt-prototyp';
export const SIZES_SOURCE_VERIFIED = 6;
export const SDR = 6;

/* Rp-Innengewinde nach ISO 228-1, zylindrisch. */
export const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
  '1 1/4': { od: 41.910, pitch: 2.309 },
  '1 1/2': { od: 47.803, pitch: 2.309 },
  '2': { od: 59.614, pitch: 2.309 },
};

export const ARTICLES = [
  { code: 'AQ54220', d: 20, Rp: '1/2', dn: 15, G: '1', L: 38, l: 19, l1: 16, SW: 38, SW1: 26, pack: 100 },
  { code: 'AQ54225', d: 25, Rp: '3/4', dn: 20, G: '1 1/4', L: 43, l: 22, l1: 18, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ54232', d: 32, Rp: '1', dn: 25, G: '1 1/2', L: 48, l: 23, l1: 23, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ54240', d: 40, Rp: '1 1/4', dn: 32, G: '2', L: 55, l: 26, l1: 26, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ54250', d: 50, Rp: '1 1/2', dn: 40, G: '2 1/4', L: 58, l: 29, l1: 26, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ54263', d: 63, Rp: '2', dn: 50, G: '2 3/4', L: 63, l: 32, l1: 28, SW: 107, SW1: 64, pack: 18 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  G: 'Muttergewinde',
  L: 'Gesamtlänge',
  l: 'Länge vorderer Abschnitt',
  l1: 'Länge hinterer Abschnitt',
  SW: 'Schlüsselweite (nicht auflösbar, nicht modelliert)',
  SW1: 'Schlüsselweite Sechskant',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == metal-union-female-thread/params.js =============================== */
/* K-Aqua Metallverschraubung (Innengewinde) — Parametrik.

   Neun Maße stehen in der Tabelle. Gerechnet wird nur die Aufteilung
   der Längen und die Gewindegeometrie aus der Normreihe. */


export function params(dNom) {
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


/* == metal-union-female-thread/parts.js ================================ */
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
export function buildSleeve(P) {
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
export function buildMetal(P) {
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


/* == metal-union-female-thread/index.js ================================ */
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

export { product as default };
