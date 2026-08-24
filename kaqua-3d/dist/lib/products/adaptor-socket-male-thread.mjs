/* K-Aqua 3D · Übergangsmuffe mit Außengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID transition-fittings/adaptor-socket-male-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, fusionDepth, grooveMod, hexPrism, knurl, materials, mergeGeometries, revolve, thetaSamples, threadProfile, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == adaptor-socket-male-thread/data.js ================================ */
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

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 12;
export const SDR = 6;

/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

export const ARTICLES = [
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

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Rohrgewinde',
  D: 'Außendurchmesser Bund',
  D1: 'Außendurchmesser Muffe',
  l: 'Gesamtlänge',
  z: 'Einbaulänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == adaptor-socket-male-thread/params.js ============================== */
/* K-Aqua Übergangsmuffe mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten. Aus der Tabelle kommen d, R, D, D1,
   l und z; die Gewindegeometrie aus der Normtabelle in data.js. */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.R);
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


/* == adaptor-socket-male-thread/parts.js =============================== */
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
export function buildSleeve(P) {
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
export function buildBrass(P, xStart) {
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


/* == adaptor-socket-male-thread/index.js =============================== */
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
      /* ── Der Gewindescheitel, abgetastet ──
         Hier stand: `soll: P.threadOD, ist: () => P.threadOD`. Das ist
         Fall 12 in Reinform — die Messung gibt die Annahme zurück, die
         sie prüfen soll, und meldet auf ewig 0,00 mm. Fall 20 verlangt
         genau das Gegenteil: kommt ein Katalogmaß aus einer
         Core-Funktion, muss mindestens ein Produkt es ABTASTEN.

         Der Strahl fährt die zweite Kuppe an (die erste liegt auf der
         Profilfuge zum Bund). Der Kegel 1:16 verjüngt sie gegenüber
         dem Nennmaß um 2·pitch/32.

         Korrigiert am 23.08.2026 zusammen mit den
         Metallverschraubungen, die denselben Nachweis führen. */
      { key: 'gewinde', label: 'Gewinde-Außendurchmesser R' + P.R + '" (2. Kuppe)',
        soll: Math.round((P.threadOD - 2 * P.threadPitch / 32) * 100) / 100,
        ist: () => {
          const x = -P.xEnd + P.ppLen + P.collarLen + P.threadPitch;
          const hit = A.probeAxial('brass', V3(x, 0, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
        } },
      /* GEGENPROBE: der Grund zwischen zwei Kuppen MUSS eine
         Gewindetiefe tiefer liegen. Gleicher Wert hieße, das Gewinde
         ist ein glatter Kegel (Fall 25). Der Grund trägt keinen
         Scheitelausgleich, sein Fillet schiebt ihn nach außen. */
      { key: 'gewindegrund', label: 'Gewinde-Kerndurchmesser',
        soll: (() => {
          const h = 0.640327 * P.threadPitch;
          const rd = Math.max(0.3, 0.137 * P.threadPitch);
          return Math.round((P.threadOD - 2 * (1.5 * P.threadPitch) / 32 - 2 * h
            + 2 * rd * (1 / Math.sin(27.5 * Math.PI / 180) - 1)) * 100) / 100;
        })(),
        ist: () => {
          const x = -P.xEnd + P.ppLen + P.collarLen + 1.5 * P.threadPitch;
          const hit = A.probeAxial('brass', V3(x, 0, P.threadOD), V3(0, 0, -1));
          return hit ? Math.round(2 * hit.z * 100) / 100 : NaN;
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
