/* K-Aqua Flachdichtung für Verschraubungen — Parametrik.

   Hier ist fast nichts zu rechnen: D, d1 und s stehen in der Tabelle.
   Genau so soll es sein. */

import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  P.D = a.D;
  P.d1 = a.d1;
  P.s = a.s;
  P.rOut = a.D / 2;
  P.rIn = a.d1 / 2;
  P.width = Math.round((a.D - a.d1) / 2 * 10) / 10;

  /* Stanzteil: scharfe Kanten. Die 0,2-mm-Fase ist nur gegen
     Aliasing im Render, keine Konstruktionsfase. */
  P.edge = 0.2;

  if (P.width < 2) {
    throw new Error('K-Aqua Flachdichtung d' + a.d + ': Dichtbreite ' +
      P.width + ' mm zu schmal');
  }
  return P;
}
