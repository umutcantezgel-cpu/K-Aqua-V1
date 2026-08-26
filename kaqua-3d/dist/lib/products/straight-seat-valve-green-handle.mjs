/* K-Aqua 3D · Geradsitzventil-Oberteil (grünes Handrad) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID valves/straight-seat-valve-green-handle.
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


/* == straight-seat-valve-green-handle/data.js ========================== */
/* K-Aqua Geradsitzventil-Oberteil mit grünem Handrad — PROTOTYP.

   QUELLE: Druckkatalog S. 106 (Textebene 25.08.2026). Die Tabelle
   führt NUR Code, G ¾", kg 0,12, Pack 1 — keine Maßspalten, keine Maßskizze
   (LOOP-STATUS §3.22). Alle Formmaße sind ASSUMPTION aus dem
   Katalogfoto; der Maßstab hängt an zwei Ankern:
     1. Gewinde G 3/4" (Normmaß, threadSpec),
     2. kg-Spalte über die Massenprobe (meshVolume × Dichte).
   Deshalb DATA_STATUS 'prototyp' — die Zahlen sind ehrlich vorläufig. */

export const DATA_STATUS = 'prototyp';
export const SIZES_SOURCE_VERIFIED = 1;

export const ARTICLES = [
  { code: 'AQ5991', G: '3/4', kg: 0.12, pack: 1 },
];
export const SIZES = ['3/4'];
export const DIMENSION_KEY = { G: 'Gewinde', kg: 'Gewicht' };
export function article() { return ARTICLES[0]; }


/* == straight-seat-valve-green-handle/params.js ======================== */
/* Parametrik — alles ASSUMPTION (siehe data.js), Maßstab am Gewinde
   und an der Massenprobe kalibriert. */

export function params() {
  const a = article();
  const P = Object.assign({}, a);
  const th = threadSpec(a.G);
  P.threadOD = th.od;                  // 26,44 — der Maßstabsanker
  P.threadPitch = th.pitch;
  P.turns = 6;

  P.yG0 = 0;                           // Gewindeanfang
  P.yG1 = 14;                          // ASSUMPTION Gewindelänge
  P.hexAf = 32;                        // ASSUMPTION SW über dem Gewinde
  P.yHex1 = P.yG1 + 8;
  P.spindelR = 5.2;
  P.ySpindelTop = 34;
  P.yTeller = -16;                     // ASSUMPTION Hub + Tellerlage
  P.tellerR = 14;
  P.tellerH = 4;
  P.dichtH = 3;
  P.radY = P.ySpindelTop - 2;
  P.radR = 27;                         // ASSUMPTION Handrad
  P.radDicke = 7.5;
  return P;
}


/* == straight-seat-valve-green-handle/parts.js ========================= */



/* == straight-seat-valve-green-handle/index.js ========================= */
/* Geradsitzventil-Oberteil — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'valves/straight-seat-valve-green-handle',
  module: 'kaqua-straight-seat-valve-green-handle',
  titleDe: 'Geradsitzventil-Oberteil (grünes Handrad)',
  titleEn: 'Straight seat valve (only upper part)',
  category: 'valves',
  brandLine: 'K-Aqua Messing · PP',
  dataStatus: DATA_STATUS,
  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'G',
  defaultSize: '3/4',
  dimensionKey: DIMENSION_KEY,
  metaFields: ['G', 'kg'],
  dimensions: [],
  ariaFields: ['G'],
  variants: [],
  states: null,
  tile: 'Ventiloberteil mit Spindel und grünem Handrad — Maße vorläufig, ' +
        'aus Foto und Gewicht abgeleitet.',

  build(size, variant, clipPlane) {
    const P = params();
    const A = createAssembly({
      name: 'K-Aqua_Geradsitz_Oberteil',
      materials: ['brass', 'epdm', 'pprGreen'],
      seed: 191,
      clipPlane,
    });
    const ober = buildOberteil(P);
    const dicht = buildTellerDichtung(P);
    const rad = buildKleeHandrad(P);
    A.part('oberteil', { name: 'Oberteil', label: 'Ventiloberteil (Messing)', mat: 'brass',
      geo: ober.geo, cap: ober.cap, anchor: V3(P.hexAf * 0.4, P.yG1, 0) });
    A.part('dichtung', { name: 'Dichtung', label: 'Tellerdichtung (EPDM)', mat: 'epdm',
      geo: dicht.geo, cap: dicht.cap, explode: V3(0, -14, 0) });
    A.part('handrad', { name: 'Handrad', label: 'Handrad (PP, grün)', mat: 'pprGreen',
      geo: rad.geo, cap: rad.cap, explode: V3(0, 18, 0),
      anchor: V3(P.radR * 0.5, P.radY + P.radDicke + 3, 0) });
    A.light(V3(0, P.radY * 0.5, 0)); A.light(V3(0, -8, 0));
    A.hotspot({ v: V3(0, P.radY + P.radDicke / 2, P.radR * 0.8), n: V3(0, 0.3, 0.95),
      text: 'Mehrgängiges Handrad — Hubventil, keine Vierteldrehung' });

    A.measures = [
      /* Der einzige Normanker: das G-Gewinde, per Strahl auf die Kuppe. */
      /* G ist zylindrisch (kein 1:16-Kegel wie R); der Strahl fährt
         mehrere Stationen ab und nimmt das Maximum — die Kuppenlage von
         threadProfile ist nicht phasenstarr zum Fenster (der erste
         Wurf traf den GRUND und las 2·Gewindetiefe zu wenig). */
      { key: 'gewinde', label: 'G ' + P.G + '" Außengewinde (Kuppe)',
        soll: r2(P.threadOD),
        ist: () => {
          let max = 0;
          for (let k = 0; k < 8; k++) {
            const y = P.yG0 + P.threadPitch * (1.2 + k * 0.25);
            const hit = A.probeAxial('oberteil', V3(0, y, P.threadOD), V3(0, 0, -1));
            if (hit) max = Math.max(max, 2 * hit.z);
          }
          return max ? r2(max) : NaN;
        } },
      { key: 'handrad', label: 'Handrad-Ø (ASSUMPTION)', soll: 2 * P.radR,
        ist: () => { const b = A.boxOf(['handrad']); return r2(b.max.x - b.min.x); } },
      { key: 'hoehe', label: 'Bauhöhe (ASSUMPTION)', soll: r2(P.radY + P.radDicke + 2.5 - (P.yTeller - P.dichtH)),
        ist: () => { const b = A.boxOf(); return r2(b.max.y - b.min.y); } },
      { key: 'masse', label: 'Masse aus dem Volumen (Anker: kg-Spalte)', soll: P.kg,
        ist: () => {
          let g = 0;
          for (const t of A.parts) {
            const dichte = /Messing/.test(t.label) ? 8.4 : /EPDM/.test(t.label) ? 1.2 : 0.9;
            let v = 0; t.obj.traverse((o) => { if (o.isMesh) v += meshVolume(o.geometry); });
            g += (v * dichte) / 1e6;
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
