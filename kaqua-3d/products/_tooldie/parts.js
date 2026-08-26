/* K-Aqua Schweißwerkzeuge — gemeinsame Drehteile. PROTOTYPEN.

   Die Werkzeugseiten 114–116 führen nur Code, Nennweite und Pack —
   kein einziges Maß, kein Gewicht. Alle Formmaße sind ASSUMPTION; der
   einzige harte Anker ist die NENNWEITE: der Dorn heizt das Rohrende
   von außen (Ø ≈ d − 2·Schweißspiel), die Buchse die Muffe von innen
   (Ø ≈ d). Die Katalogrender (Kontaktbogen s115) zeigen die Gestalt:
   flache Bunde, kurze Kegel, M-Gewindezapfen zur Platte. */

import {
  buildProfile, revolve, mergeGeometries, capFromProfile, arcPts,
  SEG_VIS, SEG_INT,
} from '../../core/index.js';

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
