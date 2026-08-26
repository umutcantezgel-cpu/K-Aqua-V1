/* K-Aqua 3D · Verstellbarer Batterieanschluss mit Innengewinde — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/adjustable-battery-female-thread.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  D2R, SEG_INT, SEG_VIS, branchJoin, buildProfile, capFromProfile, createAssembly, fusionDepth, hexPrism, materials, mergeGeometries, revolve, roundedPad, socketOD, threadRing, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == adjustable-battery-female-thread/data.js ========================== */
/* K-Aqua Verstellbarer Batterieanschluss IG — Artikeltabelle.

   QUELLE: Druckkatalog S. 108, untere Tabelle „Adjustable battery
   (Female thread)". Zwei Größen. Spaltenköpfe:
     Code · d · Rp · L adjustable · L1 · kg · Pack.

   MASSSCHLÜSSEL:
     d             Nennmaß der Schweißmuffen
     Rp            Innengewinde der beiden Anschlussböcke
     L adjustable  Achsabstand der Anschlüsse, verstellbar —
                   „100-135-150": von 100 bis 150 mm, 135 als
                   Zwischenwert genannt
     L1            Gesamtlänge in der WEITESTEN Stellung (L = 150).
                   Beim Zusammenschieben ragt die durchlaufende Schiene
                   an der gegenüberliegenden Muffe VORBEI (die Schienen
                   liegen versetzt) — die Gesamtlänge schrumpft deshalb
                   nicht voll mit dem Verstellweg. Nur die
                   150er-Stellung hat einen Tabellenanker.

   Das Produktfoto AQ492G zeigt den Aufbau: ZWEI antiparallele
   Rohrschienen, auf jeder ein Anschlussbock mit SECHSKANT-Griffzone
   und Rp-Messingring; die Schienen enden außen in Schweißmuffen und
   tragen kleine Montagefüße mit Löchern. Die Verstellung ist das
   Verschieben der Schienen gegeneinander. */

export const DATA_STATUS = 'verifiziert';
export const SIZES_SOURCE_VERIFIED = 2;

export const ARTICLES = [
  { code: 'AQ492G2012', d: 20, Rp: '1/2', Lmin: 100, Lmid: 135, Lmax: 150, L1: 230, kg: 0.21, pack: 1 },
  { code: 'AQ492G2512', d: 25, Rp: '1/2', Lmin: 100, Lmid: 135, Lmax: 150, L1: 230, kg: 0.23, pack: 1 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  L: 'Achsabstand (verstellbar)',
  L1: 'Gesamtlänge',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}


/* == adjustable-battery-female-thread/params.js ======================== */
/* K-Aqua Verstellbarer Batterieanschluss — Parametrik.

   Die Verstellung L = 100…150 ist als Variantenachse gebaut (drei
   Stellungen aus der Tabelle). Der Bockdurchmesser folgt derselben
   Gegenprobe wie beim festen Batterieanschluss: die ½"-Griffzone der
   Gewindereihe (D = 35). */


export function params(dNom, L) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Batterie (verstellbar): kein Normmaß für Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadCore = Math.round((th.od - 2 * 0.640327 * th.pitch) * 100) / 100;

  P.L = L ?? a.Lmax;
  /* Mundabstand folgt der Stellung; die GESAMTLÄNGE rechnet der Index
     aus Mundabstand und Schienenüberstand (data.js). */
  P.mundAbstand = a.L1 - (a.Lmax - P.L);
  P.len = P.mundAbstand;
  P.xEnd = P.mundAbstand / 2;
  P.xAchse = P.L / 2;

  P.blockOD = 35;                          // ½"-Griffzone, wie AQ490G belegt
  P.rBlock = P.blockOD / 2;
  /* Sechskant der Griffzone (Foto): Schlüsselweite = blockOD·cos30°. */
  P.afBlock = Math.round(P.blockOD * Math.cos(30 * D2R) * 10) / 10;

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.sockOD = socketOD(d) ?? Math.round(d * 1.45);
  P.rSock = P.sockOD / 2;
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Schienenaufbau, aus dem Foto: Rohr-Außen = d (die
     Schiene IST ein Rohrstück), die beiden Schienen liegen mit
     Achsabstand ~1,15·d übereinander; Muffenkörper an den Außenenden;
     Bockhöhe über der Schienenachse = 24 mm. */
  P.rohrOD = d;
  /* Schienenwand d/4 statt Druckrohr-d/6: die Schiene ist ein
     Führungsteil, das Foto zeigt dickwandige Enden — und die
     Massenprobe verlangt es (erster Wurf −29 %). */
  P.schienenWand = d / 4;
  P.schienenBore = d - 2 * P.schienenWand;
  P.schienenAbstand = Math.round(1.15 * d * 10) / 10;
  P.muffH = P.socket + 14;
  P.bockH = 24;
  P.bockLen = Math.round(P.blockOD * 0.9);
  P.ringLen = Math.round(P.bockLen * 0.55);
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD), P.rBlock - 2.5);
  P.turns = Math.max(4, Math.floor((P.ringLen - 2) / P.threadPitch));

  P.fussH = 9; P.fussB = 14; P.fussT = 4;

  if (P.L < a.Lmin || P.L > a.Lmax) {
    throw new Error('K-Aqua Batterie (verstellbar) d' + d + ': Stellung L=' + P.L +
      ' liegt außerhalb ' + a.Lmin + '…' + a.Lmax);
  }
  return P;
}


/* == adjustable-battery-female-thread/parts.js ========================= */
/* K-Aqua Verstellbarer Batterieanschluss — Kontur.

   Zwei gleiche SCHLITTEN, antiparallel: je ein Rohrstück mit
   Schweißmuffe am Außenende, darauf ein Anschlussbock mit
   Sechskant-Griffzone und Rp-Messingring (nach vorn, +Z), darunter ein
   Montagefuß. Verschieben der Schlitten gegeneinander verstellt den
   Anschlussabstand L — die Variantenachse des Produkts.

   Der Sechskant ist hier BELEGT: das Produktfoto AQ492G zeigt klar
   gefaste Griffköpfe (die Sechskant-Ausführung der Gewindefamilie). */


/* Ein Schlitten entlang X, Muffenmund bei x = 0 (nach −X offen), Rohr
   nach +X, Gesamtlänge len. Der Bock sitzt bei xBock, Rp nach +Z. */
export function buildSchlitten(P, len, xBock) {
  const geos = [];

  /* Muffenkörper + Rohrschiene als ein Rotationsprofil um X. */
  const rS = (x) => P.d / 2 - P.sockTaper * (0 - x) * -1;
  const outer = [
    { a: 0, r: P.rSock - 0.4, chamfer: 0.5 },
    { a: 1.0, r: P.rSock, fillet: 0.4 },
    { a: P.muffH - 1.5, r: P.rSock, fillet: 1.2 },
    { a: P.muffH + 2.5, r: P.rohrOD / 2, fillet: 1.0 },
    { a: len - 0.8, r: P.rohrOD / 2, chamfer: 0.6 },
  ];
  const inner = [
    { a: len - 0.8, r: P.schienenBore / 2, fillet: 0 },
    { a: (len + P.socket) / 2, r: P.schienenBore / 2, fillet: 0 },
    { a: P.socket, r: P.schienenBore / 2, fillet: 0.8 },
    { a: P.socket, r: P.d / 2 - P.sockTaper * P.socket, fillet: 1.0 },
    { a: 2, r: P.d / 2 - P.sockTaper * 2, fillet: 0.4 },
    { a: 0, r: P.d / 2 + P.lead, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  geos.push(revolve(profile, { axis: 'x', segments: SEG_VIS }));

  /* Anschlussbock: senkrechter Stutzen vom Rohr nach +Z mit
     Sechskantkopf. Die Fuge macht branchJoin (Hauptachse = Rohr). */
  const kehle = branchJoin({
    mainR: P.rohrOD / 2, branchR: P.rBlock * 0.55, filletR: 1.6,
    angle: 90, segments: SEG_INT, uSegs: 5,
  });
  kehle.geo.rotateX(-Math.PI / 2);          // Abzweig zeigt nach +Z
  kehle.geo.translate(xBock, 0, 0);
  geos.push(kehle.geo);

  const zBock0 = P.rohrOD / 2 - 1;
  const zKopf0 = zBock0 + P.bockH - P.bockLen * 0.55;
  const zTop = zBock0 + P.bockH;
  /* Hals unterm Kopf. */
  const hals = buildProfile([
    { a: zBock0 - 2, r: P.rBlock * 0.70, fillet: 0 },
    { a: zKopf0 + 1, r: P.rBlock * 0.70, fillet: 0.5 },
    { a: zKopf0 + 1, r: P.boreR * 0.9, fillet: 0 },
    { a: zBock0 - 2, r: P.boreR * 0.9, fillet: 0 },
  ], { segs: 3 });
  const halsGeo = revolve(hals, { axis: 'y', segments: SEG_INT });
  halsGeo.rotateX(Math.PI / 2);
  halsGeo.translate(xBock, 0, 0);
  geos.push(halsGeo);

  /* Sechskantkopf um die Z-Achse: hexPrism baut in +X, also drehen. */
  const kopfLen = zTop - zKopf0;
  /* bevel = 0: das Eckenmaß IST das Katalogmaß D = 35 der ½"-Reihe,
     und der Extrusions-bevel bläht den Querschnitt (erster Wurf: beide
     Strahlmaße +1,2 = 2·bevel). Die hexPrism-Doku sagt es ausdrücklich. */
  const kopf = hexPrism(P.afBlock, kopfLen, 0.4, 0);
  kopf.rotateY(-Math.PI / 2);               // +X → +Z
  kopf.translate(xBock, 0, zKopf0);
  geos.push(kopf);
  /* Ringsitz-Hülse im Kopf (innen), damit der Messingring gefasst ist. */
  const sitz = buildProfile([
    { a: zTop, r: P.rRing + 0.6, fillet: 0 },
    { a: zTop - P.ringLen - 1, r: P.rRing + 0.6, fillet: 0.4 },
    { a: zTop - P.ringLen - 1, r: P.boreR * 0.9, fillet: 0 },
    { a: zTop, r: P.boreR * 0.9, fillet: 0 },
  ], { segs: 3 });
  const sitzGeo = revolve(sitz, { axis: 'y', segments: SEG_INT });
  sitzGeo.rotateX(Math.PI / 2);
  sitzGeo.translate(xBock, 0, 0);
  geos.push(sitzGeo);

  /* Montagefüße: das Foto zeigt mehrere über die Länge — je Schlitten
     zwei, unter dem Bock und auf halber Schiene. */
  for (const fx of [xBock, xBock + (len - xBock) * 0.55]) {
    const fuss = roundedPad(P.fussB, P.fussH, P.fussT, 1.2);
    fuss.rotateX(Math.PI / 2);
    fuss.translate(fx, -(P.rohrOD / 2 + P.fussH * 0.1), -P.rohrOD / 2 + P.fussT / 2);
    geos.push(fuss);
  }

  return {
    geo: mergeGeometries(geos),
    cap: capFromProfile(profile, 'x'),
    zTop,
  };
}

/* Der Rp-Ring im Kopf, um Z (gebaut um Y, gedreht — threadRing kennt
   nur X und Y, siehe _battery/parts.js). */
export function buildBockRing(P, zTop) {
  const ring = threadRing({
    a0: zTop - P.ringLen,
    a1: zTop,
    rOuter: P.rRing,
    od: P.threadOD,
    pitch: P.threadPitch,
    turns: P.turns,
    axis: 'y',
  });
  ring.geo.rotateX(Math.PI / 2);
  if (ring.cap) ring.cap.rotateX(Math.PI / 2);
  return ring;
}


/* == adjustable-battery-female-thread/index.js ========================= */
/* K-Aqua Verstellbarer Batterieanschluss IG — Produktpaket.

   Zwei antiparallele Schlitten; die Stellung des Anschlussabstands L
   (100 · 135 · 150 aus der Tabelle) ist die Variantenachse. Beim
   Zusammenschieben schrumpft die Gesamtlänge mit — L1 = 230 gilt bei
   der weitesten Stellung (ASSUMPTION, in data.js begründet). */


const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

function netzVolumen(geo) {
  const p = geo.attributes.position.array;
  const idx = geo.index ? geo.index.array : null;
  const n = idx ? idx.length : p.length / 3;
  let v = 0;
  for (let i = 0; i < n; i += 3) {
    const a = (idx ? idx[i] : i) * 3;
    const b = (idx ? idx[i + 1] : i + 1) * 3;
    const c = (idx ? idx[i + 2] : i + 2) * 3;
    v += (
      p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
      - p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c])
      + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])
    ) / 6;
  }
  return Math.abs(v);
}

const product = {
  id: 'valves/adjustable-battery-female-thread',
  module: 'kaqua-adjustable-battery-female-thread',
  titleDe: 'Verstellbarer Batterieanschluss mit Innengewinde',
  titleEn: 'Adjustable battery (Female thread)',
  category: 'valves',
  brandLine: 'K-Aqua PP-R · Messing',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  defaultSize: 20,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'Rp', 'L1', 'kg'],
  dimensions: ['L', 'L1'],
  ariaFields: ['d', 'Rp', 'L1'],

  variants: [],
  /* Die Verstellung ist ein ZUSTAND, kein Größenwechsel: der Viewer
     schiebt die Schlitten kontinuierlich zwischen L = 150 (Tabellen-
     stellung, in der gemessen wird) und L = 100. Erster Nutzer der
     states-Mechanik außerhalb des Kugelhahns. */
  states: {
    open:   { short: 'L = 150', note: 'weiteste Stellung — das Tabellenmaß', action: 'Ausziehen' },
    closed: { short: 'L = 100', note: 'engste Stellung', action: 'Zusammenschieben' },
    pickPart: 'schlittenA',
    pickHint: 'Klick auf einen Schlitten verstellt',
  },

  tile: 'Zwei Schlitten, gegeneinander verschiebbar — der ' +
        'Anschlussabstand stellt sich von 100 bis 150 mm.',

  build(size, variant, clipPlane) {
    const P = params(size, 150);
    const A = createAssembly({
      name: 'K-Aqua_Batterie_verstellbar_d' + size,
      materials: ['pprGreen', 'brass'],
      seed: 187,
      clipPlane,
    });

    /* Der Bock sitzt FIX auf seinem Schlitten: sein Abstand vom
       Muffenmund ist (L1 − Lmax)/2 = 40 mm, unabhängig von der
       Stellung — nur die Überlappung der Schienen wandert. Die
       Schlittenlänge trägt bei Lmax eine Überlappreserve von 30 mm
       (ASSUMPTION; ohne Reserve fiele das Teleskop bei 150 auseinander). */
    const xBock = (P.L1 - P.Lmax) / 2;
    /* Schlittenlänge: das Foto zeigt die Rohre fast durchlaufend — die
       Schiene endet kurz vor der GEGENÜBERLIEGENDEN Muffe (ASSUMPTION
       aus dem Foto; die erste Annahme „halbe Länge plus Reserve" wog
       −29 % gegen die kg-Spalte). */
    const schlittenLen = P.L1 - P.muffH - 6;
    const ab = P.schienenAbstand / 2;

    const s1 = buildSchlitten(P, schlittenLen, xBock);
    const ring1 = buildBockRing(P, s1.zTop);
    ring1.geo.translate(xBock, 0, 0);
    if (ring1.cap) ring1.cap.translate(xBock, 0, 0);
    /* Schlitten A: Mund links. */
    for (const g of [s1.geo, s1.cap, ring1.geo, ring1.cap]) {
      if (g) { g.translate(-P.xEnd, ab, 0); }
    }

    const s2 = buildSchlitten(P, schlittenLen, xBock);
    const ring2 = buildBockRing(P, s2.zTop);
    ring2.geo.translate(xBock, 0, 0);
    if (ring2.cap) ring2.cap.translate(xBock, 0, 0);
    /* Schlitten B: um Y gespiegelt (Mund rechts), Bock bleibt vorn. */
    for (const g of [s2.geo, s2.cap, ring2.geo, ring2.cap]) {
      if (g) { g.rotateZ(Math.PI); g.translate(P.xEnd, -ab, 0); }
    }

    A.part('schlittenA', {
      name: 'SchlittenA', label: 'Schlitten mit Anschlussbock (PP-R)', mat: 'pprGreen',
      geo: s1.geo, cap: s1.cap,
      explode: V3(-0.22 * P.len, 0, 0),
      anchor: V3(-P.xEnd + 8, ab + P.rSock + 14, 0),
    });
    A.part('schlittenB', {
      name: 'SchlittenB', label: 'Schlitten mit Anschlussbock (PP-R)', mat: 'pprGreenB',
      geo: s2.geo, cap: s2.cap,
      explode: V3(0.22 * P.len, 0, 0),
    });
    A.part('ringA', {
      name: 'MessingringA', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring1.geo, cap: ring1.cap,
      explode: V3(0, 0, 0.35 * P.len),
      anchor: V3(-P.xAchse, ab - P.rBlock - 10, s1.zTop),
    });
    A.part('ringB', {
      name: 'MessingringB', label: 'Messingring Rp' + P.Rp + '"', mat: 'brass',
      geo: ring2.geo, cap: ring2.cap,
      explode: V3(0, 0, 0.5 * P.len),
    });

    A.light(V3(-P.xAchse, ab, 0));
    A.light(V3(P.xAchse, -ab, 0));

    A.hotspot({
      v: V3(0, 0, P.rohrOD * 0.5),
      n: V3(0, 0, 1),
      text: 'Die Schienen überlappen in der Mitte — Verschieben stellt L ' +
        'zwischen ' + P.Lmin + ' und ' + P.Lmax + ' mm',
    });
    A.hotspot({
      v: V3(P.xAchse, -ab, s2.zTop),
      n: V3(0, 0, 1),
      text: 'Rp ' + P.Rp + '" im Sechskantkopf — die Griffzone zum Kontern ' +
        'beim Anschluss der Armatur',
    });

    const yD = -(ab + P.rSock + 12);
    A.dim({ label: 'L', value: P.L,
      a: V3(-P.xAchse, yD, P.rBlock), b: V3(P.xAchse, yD, P.rBlock),
      off: V3(0, -8, 0) });
    A.dim({ label: 'L1', value: P.len,
      a: V3(-P.xEnd, yD - 14, P.rBlock), b: V3(P.xEnd, yD - 14, P.rBlock),
      off: V3(0, -8, 0) });

    A.measures = [
      { key: 'L', label: DIMENSION_KEY.L + ' (Stellung L = 150)', soll: P.L,
        ist: () => {
          const a = A.boxOf(['ringA']), b = A.boxOf(['ringB']);
          return r2(((b.min.x + b.max.x) / 2) - ((a.min.x + a.max.x) / 2));
        } },
      /* L1 hat nur bei L = 150 einen Tabellenanker; in den anderen
         Stellungen ist das Soll die konstruktive Gesamtlänge aus
         Mundabstand und Schienenüberstand (data.js). */
      { key: 'L1', label: DIMENSION_KEY.L1 + ' (Tabellenmaß bei L = 150)',
        /* Das Schienenende liegt im Profil 0,8 mm vor der Nennlänge
           (Stirnfase) — der Überstand rechnet damit. */
        soll: r2(Math.max(2 * P.xEnd, 2 * (schlittenLen - 0.8 - P.xEnd))),
        ist: () => { const b = A.boxOf(); return r2(b.max.x - b.min.x); } },
      /* Sechskant-Gegenprobe per STRAHL — die Mantelflächen von
         hexPrism sind punktlose Quads, eine Punktabtastung sieht nur
         die Eckenzonen (so kam im ersten Wurf 1,0 heraus). Nach der
         Drehung liegt die Schlüsselfläche auf ±X, die Ecke auf ±Y. */
      { key: 'sw', label: 'Schlüsselweite der Griffzone', soll: P.afBlock,
        ist: () => {
          const xW = -P.xEnd + xBock, zM = (s1.zTop - 3);
          const hit = A.probeAxial('schlittenA', V3(xW - P.blockOD, ab, zM), V3(1, 0, 0));
          return hit ? r2(2 * Math.abs(hit.x - xW)) : NaN;
        } },
      /* …und der Eckenstrahl MUSS das größere Eckenmaß liefern
         (Fall 25): käme wieder SW heraus, wäre der Kopf ein Zylinder. */
      { key: 'sw_ecke', label: 'Eckenmaß der Griffzone', soll: r2(2 * (P.afBlock / Math.sqrt(3))),
        ist: () => {
          const xW = -P.xEnd + xBock, zM = (s1.zTop - 3);
          const hit = A.probeAxial('schlittenA', V3(xW, ab + P.blockOD, zM), V3(0, -1, 0));
          return hit ? r2(2 * Math.abs(hit.y - ab)) : NaN;
        } },
      { key: 'kern', label: 'Rp-Kerndurchmesser', soll: P.threadCore,
        ist: () => {
          const arr = ring1.geo.attributes.position.array;
          const z0 = s1.zTop - P.ringLen + 1.0 + P.threadPitch * 0.6;
          const z1 = z0 + P.threadPitch * 1.8;
          let min = Infinity;
          for (let i = 0; i < arr.length; i += 3) {
            const z = arr[i + 2];
            if (z < z0 || z > z1) continue;
            const r = Math.hypot(arr[i] + P.xEnd - xBock, arr[i + 1] - ab);
            if (r < min) min = r;
          }
          return isFinite(min) ? r2(2 * min) : NaN;
        } },
      { key: 'masse', label: 'Masse aus dem Volumen (PP 0,9 · CuZn 8,4)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/i.test(t.label || '') ? 8.4 : 0.9;
            let v = 0;
            t.obj.traverse((o) => { if (o.isMesh) v += netzVolumen(o.geometry); });
            g += (v * dichte) / 1e6;
          }
          return r2(g);
        } },
    ];

    /* ── Zustand: Teleskopweg 150 → 100 ── */
    const pA = A.parts.find((t) => t.id === 'schlittenA').obj;
    const pB = A.parts.find((t) => t.id === 'schlittenB').obj;
    const rA = A.parts.find((t) => t.id === 'ringA').obj;
    const rB = A.parts.find((t) => t.id === 'ringB').obj;
    A.setOpen = (t) => {
      const dx = (P.Lmax - (P.Lmin + (P.Lmax - P.Lmin) * t)) / 2;
      pA.position.x = dx;  rA.position.x = dx;
      pB.position.x = -dx; rB.position.x = -dx;
    };
    A.setOpen(1);

    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};

export { product as default };
