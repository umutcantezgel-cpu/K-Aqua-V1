/* K-Aqua Winkel 90° mit Außengewinde — Kontur.

   Zwei Teile, zwei Werkstoffe:
     1. PP-R-Körper: Winkel mit Schweißmuffe am einen Schenkel und
        Aufnahme für den Messingeinsatz am anderen
     2. Messingeinsatz: verzahnter Schaft im PP, davor das kegelige
        R-Gewinde (threadProfile)

   Keine neue Geometriefunktion. Der Winkel ist EIN Loft über eine
   Gerade-Bogen-Gerade-Bahn wie in products/_bend/parts.js; neu ist nur,
   dass die beiden Schenkel verschieden lang sind und verschiedene Enden
   haben. Kein CSG, kein Sechskant, keine Riffelung — Zeichnung und Foto
   zeigen einen glatten Körper und einen runden Zapfen.

   Die Funktionsnamen weichen bewusst von _bend/parts.js ab: der Bau
   verkettet Familien- und Produktdateien zu EINEM flachen Skript, und
   `boreAt` gibt es dort schon. */

import {
  SEG_VIS, buildProfile, capFromProfile, revolve, threadProfile,
} from '../../core/index.js';

/* Der Winkelkörper steht seit dem 24.08.2026 im Familienmodul
   ../_bendthread/parts.js — dieselbe Kontur tragen die beiden Laschen
   (Anschlussbogen und Wandscheibe). Dreimal geschrieben würde sie
   driften (Fall 32). Verschoben, nicht umgeschrieben; der Maßtest
   dieses Produkts ist danach Zahl für Zahl derselbe geblieben. */
export { buildElbowBody } from '../_bendthread/parts.js';

/* Messingeinsatz. Achse ist +Y — das ist der Gewindeschenkel der Bahn.
   Der Schaft trägt drei Ringzähne; die Zeichnung zeigt sie im Schnitt
   als Verankerung im PP. Sichtbar ist außen nur das Gewinde. */
export function buildStud(P) {
  const rThread = P.threadOD / 2;
  const yRoot = P.L1 - P.insertDepth;
  const step = P.insertDepth / 3;

  const teeth = [];
  for (let k = 0; k < 3; k++) {
    teeth.push({ a: yRoot + step * (k + 0.35), r: P.rInsertOut, fillet: 0.2 });
    teeth.push({ a: yRoot + step * (k + 0.75), r: P.rInsertOut - 0.9, fillet: 0.2 });
  }

  /* Gewindekontur ab dem PP-Ende bis zur Spitze, kegelig 1:16. */
  const thread = threadProfile(P.threadOD, P.threadPitch, P.turns, 'R')
    .map((p) => ({ a: P.L1 + p.a, r: p.r, fillet: p.fillet }))
    .filter((p) => p.a <= P.z1);

  const outer = [
    { a: yRoot, r: P.rInsertOut - 0.9, chamfer: 0.4 },
    ...teeth,
    { a: P.L1 - 0.8, r: P.rInsertOut, fillet: 0.3 },
    { a: P.L1, r: Math.min(P.rInsertOut, rThread + P.threadPitch * 0.2), chamfer: 0.5 },
    ...thread,
    { a: P.z1, r: rThread * 0.93 - P.threadLen / 32, chamfer: 0.8 },
  ];
  const inner = [
    { a: P.z1, r: P.boreR + 0.4, fillet: 0.5 },
    { a: P.L1, r: P.boreR, fillet: 0.6 },
    { a: yRoot, r: P.boreR, fillet: 0 },
  ];
  const profile = buildProfile([...outer, ...inner], { segs: 4 });
  return {
    geo: revolve(profile, { axis: 'y', segments: SEG_VIS }),
    cap: capFromProfile(profile, 'y'),
    profile, yRoot,
  };
}
