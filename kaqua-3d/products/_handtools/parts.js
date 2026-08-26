/* K-Aqua Handwerkzeuge (S. 114) — Bausteine. PROTOTYPEN.

   Keine Rohrgeometrie: Scherenbügel, Klingen, Griffe. Grundlage sind
   roundedPad und loft, wie 20-VISUELLE-REFERENZ §4.5 es vorgibt.
   Alle Maße ASSUMPTION aus den Katalogrendern (Kontaktbogen s114). */

import * as THREE from 'three';
import {
  buildProfile, revolve, mergeGeometries, capFromProfile, roundedPad,
  loft, SEG_INT, SEG_FINE,
} from '../../core/index.js';

/* Flacher Griff, leicht keilförmig via loft. Die loft-Sektionen sind
   { x, pts: [{a, r}] } — a wird z, r wird y (der erste Wurf übergab
   Zahlenpaare und der NaN-Wächter aus Welle 1 leerte die Ansicht
   SOFORT statt still: genau wofür er gebaut wurde). */
export function buildGriff(len, breite, dicke) {
  const sek = (x, b, d) => ({ x, pts: [
    { a: -d / 2, r: -b / 2 }, { a: -d / 2, r: b / 2 },
    { a: d / 2, r: b / 2 }, { a: d / 2, r: -b / 2 },
    { a: -d / 2, r: -b / 2 },
  ] });
  return loft([
    sek(0, breite, dicke),
    sek(len * 0.55, breite * 1.12, dicke),
    sek(len, breite * 0.8, dicke * 0.85),
  ]);
}

/* Rundgriff um Y (Maschinenstiel). */
export function buildRundgriff(len, r) {
  const profile = buildProfile([
    { a: 0, r: r * 0.75, fillet: 2 },
    { a: len * 0.2, r: r, fillet: 3 },
    { a: len * 0.8, r: r, fillet: 3 },
    { a: len, r: r * 0.6, chamfer: 2 },
    { a: len, r: 0.02, fillet: 0 },
    { a: 0, r: 0.02, fillet: 0 },
  ], { segs: 4 });
  return revolve(profile, { axis: 'y', segments: SEG_INT });
}
