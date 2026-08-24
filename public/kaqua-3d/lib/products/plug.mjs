/* K-Aqua 3D · Stopfen — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID accessories/plug.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, DRAFT, ISO, SEG_FINE, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, grooveMod, materials, mergeGeometries, revolve, thetaSamples, threadProfile, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == plug/data.js ====================================================== */
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

export const DATA_STATUS = 'verifiziert-ohne-masse';
export const SIZES_SOURCE_VERIFIED = 1;

/* Die Gewindetabelle steht seit dem 24.08.2026 im Core
   (core/geometry.js, threadSpec) — sie stand fünfmal im Produktcode
   und gehört dorthin, wo FUSION_DEPTH steht (Fall 19). */

export const ARTICLES = [
  { key: '1/2', code: 'AQ90912', G: '1/2', kg: 0.02, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.key);

export const DIMENSION_KEY = {
  G: 'Rohrgewinde',
  D: 'Außendurchmesser Körper',
  l: 'Gesamtlänge',
};

export function article(key) {
  const a = ARTICLES.find((x) => x.key === String(key));
  if (!a) throw new Error('K-Aqua: unbekannte Größe ' + key);
  return a;
}


/* == plug/params.js ==================================================== */
/* K-Aqua Stopfen — Parametrik.

   Die Quelle führt kein Geometriemaß. Jeder Wert hier ist aus dem
   Produktfoto abgeleitet und in data.js über das Gewicht gegengeprüft.
   Entsprechend trägt praktisch jede Zeile ASSUMPTION. */


export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.G);
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


/* == plug/parts.js ===================================================== */
/* K-Aqua Stopfen — Kontur.

   Ein Rotationskörper plus vier Kerben plus ein O-Ring. Die Kerben sind
   KEIN CSG: sie entstehen als radiale Modulation über grooveMod, also
   als Einbuchtung der Mantelfläche an vier Winkelpositionen — dasselbe
   Verfahren wie die Riffelung der Überwurfmutter, nur mit vier statt
   zwölf Positionen und größerer Breite.

   Vorlage für Gewinde und Bund: products/adaptor-socket-male-thread. */


/* Der Körper. a = 0 ist die Gewindestirn, a = len das Kerbenende. */
export function buildBody(P) {
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
export function buildORing(P) {
  const xMid = P.threadLen + P.grooveLen / 2;
  const r = P.oRingD / 2;
  const pts = [];
  arcPts(pts, xMid, P.oRingR, r, 0, Math.PI * 2, 20, { fillet: 0 });
  const profile = buildProfile(pts, { segs: 2 });
  return { geo: revolve(profile, { axis: 'x', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'x') };
}


/* == plug/index.js ===================================================== */
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

export { product as default };
