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

import { D2R, threadSpec } from '../../core/index.js';
import { bendParams } from '../_bend/params.js';
import { ANGLE, SDR, article } from './data.js';

export function params(key) {
  const a = article(key);

  /* Der Winkelteil: _bend rechnet mit `leg` und `z`. Für diesen Winkel
     ist `leg` der MUFFENSCHENKEL l — der kürzere der beiden und damit
     der, an dem der Bogenradius sich messen lassen muss. */
  const P = bendParams({ d: a.d, D: a.D, leg: a.l, z: a.z }, { angle: ANGLE, sdr: SDR });
  Object.assign(P, a);
  P.l = a.l;
  P.leg = a.l;

  const th = threadSpec(a.R);
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
       das die Zähne trägt. Ergibt 11,08 · 11,08 · 13,82 · 17,22 mm
       Radius.
       Einbautiefe = 0,55 · Gewinde-Ø, mindestens 6 mm. Das ist die
       Länge, über die die Zeichnung die Zähne zeigt.

       Die frühere Begründung nannte hier zusätzlich, der Einsatz bleibe
       „in jeder Zeile unter D" und verglich 14,08 · 14,08 · 16,82 · 20,74
       gegen D/2. Diese Zahlen waren nicht der Einsatz, sondern der PP
       Körper darüber, und der Vergleich mit D ist hinfällig — siehe den
       nächsten Block. */
  P.rInsertOut = P.threadOD / 2 + 0.6;
  P.insertDepth = Math.max(6, P.threadOD * 0.55);

  /* ── ASSUMPTION Wand über dem Einsatz — KORRIGIERT 24.08.2026 ──

     Der frühere Stand setzte `Math.max(3, 0.11 * a.d)` und erzwang mit
     einer Ausnahme, dass der Gewindeschenkel unter D bleibt. Beides ist
     falsch, und zwar aus derselben Ursache: D ist hier NICHT das größte
     Maß des Teils.

     KEINE Tabellenspalte bemaßt diesen Körper. Die Katalogtabelle S. 96
     führt `Code d R D l z L1 z1`, die Maßzeichnung die Marken
     `d D z l R L z1`. D liegt in beiden am MUFFENSCHENKEL — die
     Zeichnung setzt die Maßhilfslinien unten an das runde Rohrende, nicht
     an den Gewindeschenkel.

     Damit greift die Rangregel aus pipeline/25-BILDQUELLEN.md §1.2:
     Ein Bild darf eine Gestalt bestimmen, die keine Tabelle bemaßt.

     MESSUNG, zwei unabhängige Bilder, Maßstab jeweils über den bekannten
     Gewindeaußendurchmesser (der Katalog nennt R je Zeile):

       Marketing/Produktbilder/grün (RAL 6024)/AQ092GP …png   1,62
       Katalog S. 96, Produktfoto oben links                   1,78
                                    Körper-Ø / Gewinde-Ø  ø   1,70 ± 0,08

     Aufgelöst nach der Wand ergibt das in ALLEN VIER Zeilen denselben
     Beiwert — 0,32 · Gewinde-Ø (6,7 / 6,7 / 8,7 / 11,0 mm). Das ist kein
     Zufall: der Körper umschließt den Messingeinsatz und wird von dessen
     Durchmesser bestimmt, nicht von d. Genau deshalb trug die alte Formel
     über d den Fehler.

     GEGENPROBE gegen D: der Körper liegt damit bei 1,23 · D (d20×½"),
     1,05 · D (d25×½"), 1,31 · D (d25×¾") und 1,30 · D (d32×1") — in
     JEDER Zeile über D. Die Aussage „Körper breiter als D" hängt also
     nicht daran, welche Größe die Fotos zeigen; sie gilt für alle vier.
     Das ist wichtig, weil sich die abgebildete Größe nach Fall 35 aus
     diesen Fotos NICHT sicher bestimmen ließ.

     NICHT bestimmt und deshalb nicht modelliert: die Fotos zeigen den
     Körper FACETTIERT (Flächen, kein glatter Zylinder). Wie viele
     Flächen und über welche Länge, geben sie nicht her — die
     Facettierung bleibt offen und steht in LOOP-STATUS.md. Modelliert
     ist der Umkreis, also das größte Maß. */
  P.wallB = 0.32 * P.threadOD;
  P.rLegB = P.rInsertOut + P.wallB;
  P.restwandB = P.wallB;

  /* Wächter jetzt nach unten statt nach oben: die Restwand über dem
     Einsatz darf die Fittingregel von 3 mm nicht unterschreiten. Dass
     der Schenkel D überschreitet, ist gewollt und belegt (siehe oben). */
  if (P.restwandB < 3) {
    throw new Error('K-Aqua ' + a.key + ': Restwand über dem Einsatz ' +
      P.restwandB.toFixed(2) + ' mm < 3 mm');
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
  /* Deckel auf D entfernt (24.08.2026). Er stammte aus derselben
     Fehlannahme wie der alte Wächter — D ist nicht das größte Maß des
     Teils. Gedeckelt hätte er den Absatz UNTER den Schenkel gedrückt,
     den er umgibt. */
  P.collarR = P.rLegB + 0.3;

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
