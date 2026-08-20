/* K-Aqua Flachdichtung — Parametrik.

   Die Quelle führt nur die Nennweite. Alle drei Geometriemaße sind
   abgeleitet; die Herkunft steht in data.js. */

import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  /* ASSUMPTION Dicke 3 mm. Der Nachbarartikel „Flachdichtung für
     Verschraubungen" führt s = 3 über alle drei seiner Größen — bei
     d20, d25 und d32 gleichbleibend. Eine Flanschdichtung derselben
     Produktreihe wird kaum dünner sein. */
  P.s = 3;

  /* ASSUMPTION Innendurchmesser = Rohrbohrung bei SDR 6. Die Dichtung
     darf den Durchgang nicht verengen; jede engere Bohrung wäre eine
     Drosselstelle. */
  P.wallPipe = a.d / 6;
  P.d1 = Math.round((a.d - 2 * P.wallPipe) * 10) / 10;

  /* ASSUMPTION Außendurchmesser 1,55 × d. Hergeleitet aus der
     Bundbuchse: ihr Bunddurchmesser liegt bei etwa 2 × d, und die
     Dichtfläche endet vor dem Lochkreis. 1,55 × d deckt die Dichtfläche
     ab, ohne in die Schraubenlöcher zu reichen.
     Gegen fittings/flange-adaptor zu verifizieren. */
  P.D = Math.round(a.d * 1.55 * 10) / 10;

  P.rOut = P.D / 2;
  P.rIn = P.d1 / 2;

  /* Die Kanten sind NICHT verrundet — es ist ein Stanzteil. Nur eine
     minimale Fase gegen harte Aliasing-Kanten im Render. */
  P.edge = 0.2;

  if (P.rIn >= P.rOut - 2) {
    throw new Error('K-Aqua Flachdichtung d' + a.d + ': Dichtbreite ' +
      (P.rOut - P.rIn).toFixed(1) + ' mm zu schmal');
  }
  return P;
}
