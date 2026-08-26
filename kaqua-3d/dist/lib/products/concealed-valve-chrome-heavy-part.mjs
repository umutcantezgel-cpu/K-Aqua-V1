/* K-Aqua 3D · Unterputzventil-Oberteil (schwere Ausführung) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/concealed-valve-chrome-heavy-part.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_FINE, SEG_INT, SEG_VIS, buildProfile, capFromProfile, createAssembly, hexPrism, materials, mergeGeometries, meshVolume, revolve, threadProfile, threadSpec,
} from '../kaqua-3d-core.mjs';

/* == _valveparts/parts.js ============================================== */
/* K-Aqua Ventiloberteile (S. 106) — gemeinsame Bausteine.

   PROTOTYPEN: die Seite 106 bemaßt außer G (Gewinde), L = 30 beim
   Verlängerungsstück und den kg-Angaben NICHTS (LOOP-STATUS §3.22).
   Jede Zahl hier ist ASSUMPTION; der Maßstab kommt aus zwei Ankern:
     1. dem Gewinde G ¾" (Normmaß, OD 26,44) — es setzt den Foto-Maßstab,
     2. der kg-Spalte über die Massenprobe (meshVolume × Dichte).

   Bausteine: Kleeblatt-Handrad (grün, fünf Lappen), Chromknauf auf
   Rosette, Messing-Oberteil mit Sechskant, Spindel und Ventilteller. */


/* Fünflappiges Handrad um Y: Grundscheibe, deren Radius über θ
   zwischen Kern und Lappenspitze pendelt. */
export function buildKleeHandrad(P) {
  const R = P.radR, rKern = R * 0.52, dicke = P.radDicke;
  const mod = (th) => {
    const lappen = Math.cos(5 * th);           // 5 Lappen
    return (R - rKern) * 0.5 * (lappen - 1);   // 0 am Lappen, −(R−rKern) in der Kerbe
  };
  const thetas = [];
  { const K = 5 * 24; for (let j = 0; j <= K; j++) thetas.push((j / K) * Math.PI * 2); }
  const y0 = P.radY;
  const profile = buildProfile([
    { a: y0, r: R * 0.14, fillet: 0 },
    { a: y0, r: R, fillet: dicke * 0.45, w: 1 },
    { a: y0 + dicke, r: R, fillet: dicke * 0.45, w: 1 },
    { a: y0 + dicke, r: R * 0.14, fillet: 0 },
  ], { segs: 3 });
  const geo = revolve(profile, { axis: 'y', thetas, mod });
  /* Nabe in der Mitte. */
  const nabe = revolve(buildProfile([
    { a: y0 - 1, r: P.spindelR + 0.4, fillet: 0 },
    { a: y0 - 1, r: R * 0.16, fillet: 0.8 },
    { a: y0 + dicke + 2.5, r: R * 0.16, chamfer: 1.0 },
    { a: y0 + dicke + 2.5, r: P.spindelR + 0.4, fillet: 0 },
  ], { segs: 3 }), { axis: 'y', segments: SEG_INT });
  return { geo: mergeGeometries([geo, nabe]), cap: capFromProfile(profile, 'y') };
}

/* Messing-Oberteil um Y: Ventilteller unten (mit EPDM-Ring als
   eigenem Teil), Spindelschaft, Sechskant-Sockel mit G-Außengewinde. */
export function buildOberteil(P) {
  const geos = [];
  /* Gewindesockel: AG G von yG0 bis yG1, darüber Sechskant. */
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: P.yG0 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.yG1);
  const sockel = buildProfile([
    { a: P.yG0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.yG1, r: P.threadOD / 2 - 0.3, fillet: 0.3 },
    { a: P.yG1, r: P.spindelR + 0.6, fillet: 0.4 },
    { a: P.yHex1 + 2, r: P.spindelR + 0.6, fillet: 0.3 },
    { a: P.yHex1 + 2, r: P.spindelR, fillet: 0 },
    { a: P.yG0, r: P.spindelR, fillet: 0 },
  ], { segs: 4 });
  geos.push(revolve(sockel, { axis: 'y', segments: SEG_VIS }));
  const hex = hexPrism(P.hexAf, P.yHex1 - P.yG1, 0.4, 0);
  hex.rotateZ(Math.PI / 2);
  hex.translate(0, P.yG1, 0);
  geos.push(hex);
  /* Spindel bis zur Handrad-Nabe. */
  const spindel = buildProfile([
    { a: P.yHex1, r: P.spindelR, fillet: 0 },
    { a: P.ySpindelTop, r: P.spindelR, chamfer: 0.6 },
    { a: P.ySpindelTop, r: 0.02, fillet: 0 },
    { a: P.yHex1, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  geos.push(revolve(spindel, { axis: 'y', segments: SEG_INT }));
  /* Ventilteller unten. */
  const teller = buildProfile([
    { a: P.yG0, r: P.spindelR, fillet: 0 },
    { a: P.yTeller + P.tellerH, r: P.spindelR + 0.6, fillet: 0.4 },
    { a: P.yTeller + P.tellerH, r: P.tellerR, fillet: 0.6 },
    { a: P.yTeller, r: P.tellerR, chamfer: 0.8 },
    { a: P.yTeller, r: 0.02, fillet: 0 },
    { a: P.yG0, r: 0.02, fillet: 0 },
  ], { segs: 3 });
  geos.push(revolve(teller, { axis: 'y', segments: SEG_INT }));
  return { geo: mergeGeometries(geos), cap: capFromProfile(sockel, 'y') };
}

/* EPDM-Dichtscheibe unter dem Teller. */
export function buildTellerDichtung(P) {
  const profile = buildProfile([
    { a: P.yTeller - P.dichtH, r: 0.02, fillet: 0 },
    { a: P.yTeller - P.dichtH, r: P.tellerR - 0.4, fillet: 0.4 },
    { a: P.yTeller, r: P.tellerR - 0.4, fillet: 0.2 },
    { a: P.yTeller, r: 0.02, fillet: 0 },
  ], { segs: 2 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_INT }),
           cap: capFromProfile(profile, 'y') };
}

/* Chromknauf auf Rosette, um Y. profilArt 'zylinder' (light) oder
   'konus' (heavy). */
export function buildChromKnauf(P) {
  const R = P.rosR, h = P.knaufH, r0 = P.knaufR;
  const kn = P.art === 'konus'
    ? [
        { a: P.yRos + P.rosH, r: r0 * 0.72, fillet: 0.8 },
        { a: P.yRos + P.rosH + h * 0.72, r: r0, fillet: 2.2 },
        { a: P.yRos + P.rosH + h, r: r0 * 0.86, fillet: 2.0 },
      ]
    : [
        { a: P.yRos + P.rosH, r: r0, fillet: 0.8 },
        { a: P.yRos + P.rosH + h - 1.5, r: r0 * 0.97, fillet: 1.6 },
        { a: P.yRos + P.rosH + h, r: r0 * 0.88, fillet: 1.4 },
      ];
  /* HOHLKÖRPER: der erste Wurf rechnete den Knauf massiv und wog
     +86 % gegen die kg-Spalte — reale Chromknäufe sind dünnwandige
     Drehteile. Wand 2,8 mm (kalibriert: 2,0 wog −24 %, massiv +86 %). */
  const w = 2.8;
  const innen = kn.slice().reverse().map((q) => ({ a: q.a - w * 0.7, r: Math.max(0.4, q.r - w), fillet: q.fillet }));
  const profile = buildProfile([
    { a: P.yRos, r: R, fillet: P.rosH * 0.4 },
    { a: P.yRos + P.rosH, r: R, fillet: P.rosH * 0.45 },
    ...kn,
    { a: P.yRos + P.rosH + h - w, r: 0.02, fillet: 0 },
    ...innen.slice(1).map((q) => ({ ...q, a: q.a - 0 })),
    { a: P.yRos + P.rosH - w, r: Math.max(1, P.knaufR - w), fillet: 0.4 },
    { a: P.yRos + P.rosH - w, r: R - w, fillet: 0.4 },
    { a: P.yRos, r: R - w, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

/* Gewinde-Unterteil der UP-Ventile: kurzes AG-Rohr mit O-Ring-Nut. */
export function buildUPUnterteil(P) {
  const gew = threadProfile(P.threadOD, P.threadPitch, P.turns, 'G')
    .map((q) => ({ a: P.yU0 + q.a, r: q.r, fillet: q.fillet }))
    .filter((q) => q.a <= P.yRos - 1);
  const profile = buildProfile([
    { a: P.yU0, r: P.threadOD / 2 - 0.8, chamfer: 0.5 },
    ...gew,
    { a: P.yRos - 1, r: P.threadOD / 2 - 0.3, fillet: 0.3 },
    { a: P.yRos - 1, r: P.boreR, fillet: 0 },
    { a: P.yU0, r: P.boreR, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}


/* == concealed-valve-chrome-heavy-part/data.js ========================= */
/* K-Aqua Unterputzventil-Oberteil (schwere Ausführung) — PROTOTYP.

   QUELLE: Druckkatalog S. 106. Die Tabelle führt NUR Code, G ¾",
   kg 0.31, Pack 1 — keine Maßspalten, keine Maßskizze (LOOP-STATUS
   §3.22). Alle Formmaße sind ASSUMPTION aus dem Katalogfoto; Anker:
   G-Gewinde (Norm) und kg-Spalte (Massenprobe). Der Knauf ist
   verchromtes Messing — Dichte 8,4. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;
export const ARTICLES = [ { code: 'AQ5993', G: '3/4', kg: 0.31, pack: 1 } ];
export const SIZES = ['3/4'];
export const DIMENSION_KEY = { G: 'Gewinde', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }


/* == concealed-valve-chrome-heavy-part/params.js ======================= */
export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec(a.G);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.turns = 6;
  /* Alles ASSUMPTION (data.js), an Foto und Waage kalibriert. */
  P.art = 'konus';
  P.yRos = 0; P.rosR = 33; P.rosH = 6;
  P.knaufR = 21; P.knaufH = 38;
  P.yU0 = -24; P.boreR = 8;
  return P;
}


/* == concealed-valve-chrome-heavy-part/parts.js ======================== */



/* == concealed-valve-chrome-heavy-part/index.js ======================== */
/* Unterputzventil-Oberteil (schwere Ausführung) — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/concealed-valve-chrome-heavy-part',
  module: 'kaqua-concealed-valve-chrome-heavy-part',
  titleDe: 'Unterputzventil-Oberteil (schwere Ausführung)',
  titleEn: 'Concealed valve (only upper part) chrome heavy part',
  category: 'valves',
  brandLine: 'K-Aqua Messing verchromt',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'G', defaultSize: '3/4',
  dimensionKey: DIMENSION_KEY, metaFields: ['G', 'kg'], dimensions: [],
  ariaFields: ['G'], variants: [], states: null,
  tile: 'Sichtbares Oberteil des Unterputzventils — Maße vorläufig, aus ' +
        'Foto und Gewicht abgeleitet.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_UP_AQ5993', materials: ['chrome', 'brass'], seed: 193, clipPlane,
    });
    const knauf = buildChromKnauf(P);
    const unten = buildUPUnterteil(P);
    A.part('knauf', { name: 'Knauf', label: 'Knauf mit Rosette (Messing verchromt)', mat: 'chrome',
      geo: knauf.geo, cap: knauf.cap, anchor: V3(P.knaufR * 0.6, P.rosH + P.knaufH * 0.7, 0) });
    A.part('unterteil', { name: 'Unterteil', label: 'Gewindeansatz (Messing)', mat: 'brass',
      geo: unten.geo, cap: unten.cap, explode: V3(0, -16, 0) });
    A.light(V3(0, P.knaufH * 0.5, 0)); A.light(V3(0, P.yU0 * 0.5, 0));
    A.hotspot({ v: V3(0, P.rosH + P.knaufH * 0.6, P.knaufR * 0.9), n: V3(0, 0.2, 0.98),
      text: 'Verchromtes Sichtteil — der Einbaukörper sitzt in der Wand' });

    A.measures = [
      { key: 'gewinde', label: 'G ' + P.G + '\" Außengewinde (Kuppe)', soll: r2(P.threadOD),
        ist: () => {
          let max = 0;
          for (let k = 0; k < 8; k++) {
            const y = P.yU0 + P.threadPitch * (1.2 + k * 0.25);
            const hit = A.probeAxial('unterteil', V3(0, y, P.threadOD), V3(0, 0, -1));
            if (hit) max = Math.max(max, 2 * hit.z);
          }
          return max ? r2(max) : NaN;
        } },
      { key: 'rosette', label: 'Rosetten-Ø (ASSUMPTION)', soll: 2 * P.rosR,
        ist: () => { const b = A.boxOf(['knauf']); return r2(b.max.x - b.min.x); } },
      { key: 'hoehe', label: 'Bauhöhe (ASSUMPTION)', soll: r2(P.rosH + P.knaufH - P.yU0),
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
      { key: 'masse', label: 'Masse aus dem Volumen (Anker: kg-Spalte)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            let v = 0; t.obj.traverse((o) => { if (o.isMesh) v += meshVolume(o.geometry); });
            g += (v * 8.4) / 1e6;
          }
          return r2(g);
        } },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
