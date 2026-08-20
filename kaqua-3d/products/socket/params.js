/* K-Aqua Muffe — Parametrik.

   Nach Phase 1 ist hier fast nichts mehr zu rechnen: D, l und z stehen
   in der Tabelle. Genau so soll es sein — die Prototypfassung hatte
   beide Werte geschätzt und beide falsch. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

export const SDR = 6; // PN 20, dieselbe Reihe wie das K-Rohr

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.l;
  P.OD = a.D;
  P.wallFitting = (a.D - d) / 2;      // tabelliert, nicht geschätzt
  P.stop = a.z;                       // tabelliert, nicht geschätzt
  P.socket = (a.l - a.z) / 2;         // Muffentiefe

  // Rohrwand und Durchgang: SDR 6 wie beim K-Rohr
  P.wallPipe = d / SDR;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.xEnd = a.l / 2;
  P.xStop = a.z / 2;

  P.sockTaper = Math.tan(0.6 * D2R);  // 0,6° Muffenkonus, nach innen verjüngend
  P.lead = 2 * Math.tan(15 * D2R);    // Einführfase 15° × 2 mm am Mundloch
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.055 * d);   // Auswerferstift-Marken

  /* Abweichung der Muffentiefe von der Normreihe. Kein Fehler, sondern
     eine Herstellerentscheidung — ab d75 baut K-Aqua flacher. Der Wert
     wird geführt, damit er im Prüfbericht erscheint. */
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null : Math.round((P.socket - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Muffe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0) {
    throw new Error('K-Aqua Muffe d' + d + ': Muffentiefe ' + P.socket +
      ' mm — l und z passen nicht zusammen');
  }
  return P;
}
