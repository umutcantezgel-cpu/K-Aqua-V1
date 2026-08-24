/* K-Aqua Übergangsmuffe mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten. Aus der Tabelle kommen d, R, D, D1,
   l und z; die Gewindegeometrie aus der Normtabelle in data.js. */

import { D2R, fusionDepth, threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.R);
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde R' + a.R);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  P.len = a.l;
  P.xEnd = a.l / 2;
  P.OD = a.D;                       // Bund, größtes Maß
  P.rOut = a.D / 2;
  P.rSleeve = a.D1 / 2;             // PP-Muffenteil
  P.wallFitting = (a.D1 - a.d) / 2;

  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);
  P.wallPipe = a.d / 6;
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;

  /* ASSUMPTION Aufteilung der Länge. Die Tabelle nennt l und z, aber
     nicht, wo PP endet und Messing beginnt. Angesetzt: der PP-Teil ist
     so lang, wie die Muffentiefe plus Muffengrund braucht; der Rest ist
     Messing. Das PP-Teil wird nach unten auf die Muffentiefe + 3 mm
     begrenzt, damit der Muffengrund immer Material trägt.

     Gegenprobe bei d20/½": Muffentiefe 14,5 + 3 = 17,5 mm PP von 53 mm
     Gesamtlänge. Das Foto zeigt etwa ein Drittel PP — 17,5/53 = 0,33.
     Trifft. */
  P.ppLen = Math.max(P.socket + 3, Math.min(a.l * 0.42, a.l - P.threadOD * 0.55));
  P.brassLen = a.l - P.ppLen;

  /* Gewindelänge: der Zapfen trägt Gewinde über etwa zwei Drittel
     seiner Länge, davor ein glatter Bund mit Schlüsselflächen. */
  P.threadLen = Math.max(P.threadPitch * 4, P.brassLen * 0.62);
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));
  P.collarLen = P.brassLen - P.threadLen;

  /* Schlüsselweite. D ist der größte Außendurchmesser, also das
     Eckenmaß des Sechskants: Umkreis = D/2, Schlüsselweite = D·cos(30°).
     Der Rotationskörper darunter liegt auf dem Inkreis (af/2) — sonst
     umhüllt er den Sechskant und die Flächen sind unsichtbar. */
  P.af = Math.round(a.D * Math.cos(30 * D2R) * 10) / 10;
  P.hexLen = Math.max(4, P.collarLen * 0.78);

  /* Riffelung des PP-Körpers — im Produktfoto deutlich sichtbar.
     Zahl der Riffel wächst mit dem Umfang. */
  P.ribCount = Math.max(10, Math.round((Math.PI * a.D1) / 6.5));
  P.ribDepth = Math.max(0.35, a.D1 * 0.012);

  if (P.restwand < 2.4) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': Muffenwand ' +
      P.restwand.toFixed(2) + ' mm zu dünn');
  }
  if (P.ppLen <= P.socket) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': PP-Teil ' +
      P.ppLen.toFixed(1) + ' mm trägt die Muffentiefe ' + P.socket + ' mm nicht');
  }
  return P;
}
