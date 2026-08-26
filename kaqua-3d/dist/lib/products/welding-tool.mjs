/* K-Aqua 3D · Schweißwerkzeug (Heizelement-Paar) — gebündeltes ES-Modul.
   Erzeugt, nicht handgepflegt. Produkt-ID tools/welding-tool.
   Maße in Millimetern; die Umrechnung auf Meter macht der Viewer. */

import * as THREE from 'three';
import {
  SEG_INT, SEG_VIS, arcPts, buildProfile, capFromProfile, createAssembly, materials, mergeGeometries, revolve,
} from '../kaqua-3d-core.mjs';

/* == _tooldie/parts.js ================================================= */
/* K-Aqua Schweißwerkzeuge — gemeinsame Drehteile. PROTOTYPEN.

   Die Werkzeugseiten 114–116 führen nur Code, Nennweite und Pack —
   kein einziges Maß, kein Gewicht. Alle Formmaße sind ASSUMPTION; der
   einzige harte Anker ist die NENNWEITE: der Dorn heizt das Rohrende
   von außen (Ø ≈ d − 2·Schweißspiel), die Buchse die Muffe von innen
   (Ø ≈ d). Die Katalogrender (Kontaktbogen s115) zeigen die Gestalt:
   flache Bunde, kurze Kegel, M-Gewindezapfen zur Platte. */


/* Heizdorn (male): Bund, kurzer Kegelstumpf auf Rohr-Innenmaß,
   Gewindezapfen nach unten. Um Y, Bundunterkante auf y = 0. */
export function buildDorn(P) {
  const rTip = P.d / 2 - P.spiel;
  const rRoot = rTip + P.konus;
  const profile = buildProfile([
    { a: -P.zapfenL, r: P.zapfenR, chamfer: 0.6 },
    { a: 0, r: P.zapfenR, fillet: 0.4 },
    { a: 0, r: P.bundR, chamfer: 0.8 },
    { a: P.bundH, r: P.bundR, fillet: 0.8 },
    { a: P.bundH, r: rRoot, fillet: 0.6 },
    { a: P.bundH + P.kopfH, r: rTip, chamfer: 1.0 },
    { a: P.bundH + P.kopfH, r: 0.02, fillet: 0 },
    { a: -P.zapfenL, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

/* Heizbuchse (female): Topf mit konischer Bohrung auf Rohr-Außenmaß.
   opt.sattel wölbt die Stirn konkav (Werkzeug für Anbohrsättel). */
export function buildBuchse(P, opt = {}) {
  const rBohr = P.d / 2 + P.spiel;
  const rAussen = rBohr + P.wand;
  const yTop = P.bundH + P.kopfH;
  const stirn = [];
  if (opt.sattel) {
    /* Konkave Sattelkuppe: Kreisbogen über die Stirn. */
    arcPts(stirn, yTop + P.kopfH * 0.35, 0, P.kopfH * 0.55,
      Math.PI * 0.5, Math.PI * 1.0, 7, {});
  }
  const profile = buildProfile([
    { a: -P.zapfenL, r: P.zapfenR, chamfer: 0.6 },
    { a: 0, r: P.zapfenR, fillet: 0.4 },
    { a: 0, r: P.bundR, chamfer: 0.8 },
    { a: P.bundH, r: P.bundR, fillet: 0.8 },
    { a: P.bundH, r: rAussen, fillet: 0.6 },
    { a: yTop, r: rAussen, chamfer: 0.8 },
    { a: yTop, r: rBohr, chamfer: 0.5 },
    { a: P.bundH + 2, r: rBohr - P.konus, fillet: 0.8 },
    { a: P.bundH + 2, r: 0.02, fillet: 0 },
    { a: -P.zapfenL, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return { geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
           cap: capFromProfile(profile, 'y') };
}

/* Grundparameter aus der Nennweite — eine Formel für die ganze Reihe,
   damit die Reihe über alle Größen konsistent bleibt. */
export function toolParams(d) {
  return {
    d,
    spiel: 0.35,
    konus: Math.max(0.8, d * 0.03),
    wand: Math.max(3.5, d * 0.12),
    bundR: d / 2 + Math.max(6, d * 0.22),
    bundH: Math.max(5, d * 0.16),
    kopfH: Math.max(11, d * 0.55),
    zapfenR: 5,                        // M10-Zapfen, ASSUMPTION
    zapfenL: 12,
  };
}


/* == welding-tool/data.js ============================================== */
/* K-Aqua Schweißwerkzeug (Heizelement-Paar) — PROTOTYP.

   QUELLE: Druckkatalog S. 115 (Textebene 25.08.2026): nur Code,
   Nennweite, Pack — kein Maß, kein Gewicht. Zehn Größen d20 bis d125.
   Alle Formmaße sind ASSUMPTION (toolParams in _tooldie/parts.js);
   der einzige Anker ist die Nennweite selbst. */

export const DATA_STATUS = 'prototyp';
export const ARTICLES = [
  { key: '20', code: 'AQ98220', d: 20, pack: 1 },
  { key: '25', code: 'AQ98225', d: 25, pack: 1 },
  { key: '32', code: 'AQ98232', d: 32, pack: 1 },
  { key: '40', code: 'AQ98240', d: 40, pack: 1 },
  { key: '50', code: 'AQ98250', d: 50, pack: 1 },
  { key: '63', code: 'AQ98263', d: 63, pack: 1 },
  { key: '75', code: 'AQ98275', d: 75, pack: 1 },
  { key: '90', code: 'AQ98290', d: 90, pack: 1 },
  { key: '110', code: 'AQ982110', d: 110, pack: 1 },
  { key: '125', code: 'AQ982125', d: 125, pack: 1 },
];
export const SIZES = ARTICLES.map((a) => a.key);
export const DIMENSION_KEY = { d: 'Nennweite' };
export function article(key) {
  const a = ARTICLES.find((x) => String(x.key) === String(key));
  if (!a) throw new Error('K-Aqua Werkzeug: unbekannte Größe ' + key);
  return a;
}


/* == welding-tool/params.js ============================================ */
export function params(key) {
  const a = article(key);
  return Object.assign({}, a, toolParams(a.d));
}


/* == welding-tool/parts.js ============================================= */



/* == welding-tool/index.js ============================================= */
/* Schweißwerkzeug (Heizelement-Paar) — Produktpaket. PROTOTYP (data.js). */

const V3 = (x, y, z) => new THREE.Vector3(x, y, z);
const r2 = (v) => Math.round(v * 100) / 100;

const product = {
  id: 'tools/welding-tool',
  module: 'kaqua-welding-tool',
  titleDe: 'Schweißwerkzeug (Heizelement-Paar)',
  titleEn: 'Welding tool',
  category: 'tools',
  brandLine: 'K-Aqua Werkzeug',
  dataStatus: DATA_STATUS,
  articles: ARTICLES, sizes: SIZES, sizeKey: 'key',
  sizeLabel: (k) => 'd' + k,
  defaultSize: SIZES[0],
  dimensionKey: DIMENSION_KEY, metaFields: ['d'], dimensions: [],
  ariaFields: ['d'], variants: [], states: null,
  tile: 'Heizdorn und Heizbuchse als Paar — Maße vorläufig, nur die ' +
        'Nennweite ist Katalogangabe.',

  build(size, variant, clipPlane) {
    const P = params(size);
    const A = createAssembly({
      name: 'K-Aqua_welding-tool'.replace(/-/g, '_'), materials: ['steel'], seed: 199, clipPlane,
    });
    const dorn = buildDorn(P);
    const buchse = buildBuchse(P, { sattel: false });
    const abstand = P.bundR * 2.4;
    buchse.geo.translate(abstand, 0, 0);
    if (buchse.cap) buchse.cap.translate(abstand, 0, 0);
    A.part('dorn', { name: 'Dorn', label: 'Heizdorn (PTFE-beschichtet)', mat: 'steel',
      geo: dorn.geo, cap: dorn.cap, explode: V3(-P.bundR * 0.7, 0, 0),
      anchor: V3(0, P.bundH + P.kopfH + 4, 0) });
    A.part('buchse', { name: 'Buchse', label: 'Heizbuchse (PTFE-beschichtet)', mat: 'steel',
      geo: buchse.geo, cap: buchse.cap, explode: V3(P.bundR * 0.7, 0, 0) });
    A.light(V3(0, P.kopfH, 0)); A.light(V3(abstand, P.kopfH, 0));
    A.hotspot({ v: V3(0, P.bundH + P.kopfH * 0.6, P.d * 0.45), n: V3(0, 0.2, 0.98),
      text: 'Dorn heizt das Rohrende, Buchse die Muffe — ein Paar je Nennweite' });

    A.measures = [
      /* Der Nennweiten-Anker: Buchsenbohrung ≈ d (die Reihe MUSS über
         alle Größen mit d wachsen — das prüft die Formel, nicht das
         einzelne Maß). */
      { key: 'bohrung', label: 'Buchsenbohrung (≈ d + Spiel)', soll: r2(P.d + 2 * P.spiel),
        ist: () => {
          const hit = A.probeAxial('buchse', V3(abstand, P.bundH + P.kopfH - 0.4, 0), V3(0, 0, 1));
          return hit ? r2(2 * Math.abs(hit.z)) : NaN;
        } },
      /* Auf halber Kopfhöhe — die Spitzenmessung schnitt die Fase und
         las konstant −0,73 über alle Größen (die Konstanz benannte den
         Fehler). Soll linear auf dem Kegel interpoliert. */
      { key: 'dorn', label: 'Dorn-Ø auf halber Kopfhöhe', soll: r2(P.d - 2 * P.spiel + P.konus),
        ist: () => {
          const hit = A.probeAxial('dorn', V3(0, P.bundH + P.kopfH * 0.5, P.d), V3(0, 0, -1));
          return hit ? r2(2 * hit.z) : NaN;
        } },
      { key: 'paar', label: 'Werkzeuge im Paar', soll: 2,
        ist: () => A.parts.length },
    ];
    A.setExplode(0);
    A.setSection(false, clipPlane);
    A.P = P;
    return A;
  },
};
export { product as default };
