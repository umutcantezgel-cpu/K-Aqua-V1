/* K-Aqua Stopfen — Parametrik.

   Die Quelle führt kein Geometriemaß. Jeder Wert hier ist aus dem
   Produktfoto abgeleitet und in data.js über das Gewicht gegengeprüft.
   Entsprechend trägt praktisch jede Zeile ASSUMPTION. */

import { D2R, threadSpec } from '../../core/index.js';
import { article } from './data.js';

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
