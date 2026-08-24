/* K-Aqua Winkel 90° mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten (d und R), UNGLEICHE SCHENKEL.

   Die Fachlogik des Winkels kommt aus products/_bend/params.js — dieselbe
   Muffentiefenregel, dieselbe Restwandprüfung, dieselbe Gegenprobe gegen
   die Normreihe. Hier kommt nur dazu, was der Gewindeschenkel braucht.

   ── Warum bendPath geändert werden musste ──
   Bis zum 23.08.2026 nahm bendPath EIN Schenkelmaß für beide Seiten. Das
   trägt jeden Winkel mit gleichen Enden, aber nicht diesen: der
   Muffenschenkel misst l, der Gewindeschenkel L1, und die beiden sind
   verschieden (28 gegen 34 bei d20). bendPath hat jetzt ein sechstes
   Argument LB; ohne Angabe bleibt das Verhalten das alte. */

import { D2R } from '../../core/index.js';
import { bendParams } from '../_bend/params.js';
import { ANGLE, SDR, THREAD, article } from './data.js';

export function params(key) {
  const a = article(key);

  /* Der Winkelteil: _bend rechnet mit `leg` und `z`. Für diesen Winkel
     ist `leg` der MUFFENSCHENKEL l — der kürzere der beiden und damit
     der, an dem der Bogenradius sich messen lassen muss. */
  const P = bendParams({ d: a.d, D: a.D, leg: a.l, z: a.z }, { angle: ANGLE, sdr: SDR });
  Object.assign(P, a);
  P.l = a.l;
  P.leg = a.l;

  const th = THREAD[a.R];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde R' + a.R);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  /* Gewindelänge aus der Tabelle, nicht geschätzt: z1 − L1. Die Deutung
     ist über alle vier Zeilen gerechnet (data.js, Gegenprobe 2). */
  P.threadLen = a.z1 - a.L1;
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));
  if (P.threadLen <= 0) {
    throw new Error('K-Aqua ' + a.key + ': z1 − L1 = ' + P.threadLen +
      ' mm — die Gewindelänge kann nicht null oder negativ sein');
  }

  /* ASSUMPTION Messingeinsatz. Die Tabelle nennt nur, wo das PP endet
     (L1) und wo das Gewinde aufhört (z1). Wie tief der Einsatz im PP
     steckt und wie dick er ist, steht nirgends.

     Angesetzt:
       Außendurchmesser = Gewinde-Ø + 1,2 mm Verankerungsschulter. Die
       Zeichnung zeigt im Schnitt eine gezahnte Verankerung, die über dem
       Gewindedurchmesser liegt; 0,6 mm je Seite ist das kleinste Maß,
       das die Zähne trägt und in jeder Zeile unter D bleibt (geprüft:
       14,08 · 14,08 · 16,82 · 20,74 gegen D/2 14,5 · 17 · 17 · 21,5).
       Einbautiefe = 0,55 · Gewinde-Ø, mindestens 6 mm. Das ist die
       Länge, über die die Zeichnung die Zähne zeigt. */
  P.rInsertOut = P.threadOD / 2 + 0.6;
  P.insertDepth = Math.max(6, P.threadOD * 0.55);

  /* Wand des PP über dem Einsatz. Restwandregel für Fittings: ≥ 3 mm.
     0,11 · d liegt bei d32 darüber und bildet den etwas kräftigeren
     Körper ab, den das Foto dort zeigt. */
  P.wallB = Math.max(3, 0.11 * a.d);
  P.rLegB = P.rInsertOut + P.wallB;
  P.restwandB = P.wallB;

  if (P.rLegB > P.rOut + 0.001) {
    throw new Error('K-Aqua ' + a.key + ': Gewindeschenkel Ø ' +
      (2 * P.rLegB).toFixed(2) + ' mm über dem Muffenschenkel D ' + a.D +
      ' mm — dann ist D nicht mehr das größte Maß');
  }

  /* Bogenradius: er muss in BEIDE Schenkel passen. _bend rechnet ihn nur
     gegen den ersten; hier kommt der Gewindeschenkel dazu, dessen freier
     Raum bei L1 − Einbautiefe endet. */
  const maxRA = (a.l - P.socket - 1.5) / Math.tan((ANGLE * D2R) / 2);
  const maxRB = (a.L1 - P.insertDepth - 1.5) / Math.tan((ANGLE * D2R) / 2);
  P.bendR = Math.max(a.d * 0.22, Math.min(a.d * 0.5, maxRA, maxRB));

  /* Muffengrund: flacher Ringabsatz mit kurzem Übergang auf die
     Rohrbohrung. Über eine Bahn lässt sich keine Kante bauen, die genau
     null Länge hat — groundLen ist die kürzeste, die die Bahnabtastung
     noch auflöst. Der Messpunkt liegt DAVOR, siehe index.js. */
  P.rSockGround = a.d / 2 - P.sockTaper * (P.socket - 2);
  P.groundLen = 1.0;
  P.probeR = P.rSockGround - 0.15;

  /* Absatz am PP-Ende: der breitere Ring, den das Foto kurz vor dem
     Messing zeigt. 0,3 mm über der Mantelfläche, wie der Bund am
     Mundloch jeder Muffe (Formensprache §2.1). */
  P.collarLen = Math.min(0.28 * a.L1, 8);
  /* Auf D gedeckelt: D ist ein Katalogmaß, und ein Absatz, der es
     überschreitet, macht den Gewindeschenkel zum größten Maß des Teils.
     Bei d25 × R¾" greift der Deckel (17,12 → 17,00). */
  P.collarR = Math.min(P.rLegB + 0.3, P.rOut);

  P.emR = Math.min(2.0, 0.05 * a.d);

  if (P.insertDepth >= a.L1 - P.bendR) {
    throw new Error('K-Aqua ' + a.key + ': Messingeinsatz ' +
      P.insertDepth.toFixed(1) + ' mm reicht in den Bogen hinein');
  }
  if (P.rInsertOut <= P.boreR + 1) {
    throw new Error('K-Aqua ' + a.key + ': Messingeinsatz Ø ' +
      (2 * P.rInsertOut).toFixed(1) + ' mm trägt die Bohrung ' +
      P.bore.toFixed(1) + ' mm nicht');
  }
  return P;
}
