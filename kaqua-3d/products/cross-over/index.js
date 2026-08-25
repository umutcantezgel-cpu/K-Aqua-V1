/* K-Aqua Überbogen — Produktpaket.

   Die Deutung der Spalte H hat die MASSE entschieden, nicht die
   Maßskizze: von drei möglichen Lesarten trifft nur „Bauhöhe" das
   tabellierte Gewicht, die beiden anderen liegen 15 bis 75 Prozent
   daneben. Begründung in _crossover/params.js.

   Deshalb führt der Messsatz die Masse als eigene Zeile — sie prüft
   Bahn, Wandstärken und die Deutung von H auf einmal, am gebauten Netz
   gegen eine Katalogzahl. */

import { ARTICLES, DATA_STATUS, DIMENSION_KEY, SIZES, article } from './data.js';
import { buildUeberbogen } from '../_crossover/assembly.js';

const product = {
  id: 'fittings/cross-over',
  module: 'kaqua-cross-over',
  titleDe: 'Überbogen',
  titleEn: 'Cross over',
  category: 'fittings',
  brandLine: 'K-Aqua PP-R',
  dataStatus: DATA_STATUS,

  articles: ARTICLES,
  sizes: SIZES,
  sizeKey: 'd',
  sizeLabel: (k) => 'd' + k,
  sizeTitle: 'Nennweite',
  defaultSize: 25,

  dimensionKey: DIMENSION_KEY,
  metaFields: ['d', 'L', 'H', 'kg'],
  dimensions: ['L', 'H'],
  ariaFields: ['d', 'L', 'H'],

  variants: [],
  states: null,

  tile: 'Führt ein Rohr über ein kreuzendes hinweg — vier Bögen, ' +
        'beide Enden in einer Flucht.',

  build(size, variant, clipPlane) {
    return buildUeberbogen({
      art: 'muffe',
      article,
      dimensionKey: DIMENSION_KEY,
      exportName: 'K-Aqua_Ueberbogen',
      teilName: 'Ueberbogen',
      teilLabel: 'Überbogen (PP-R)',
      seed: 163,
      messungen: (P, a, { imBand }) => [
        /* Das Anschlussmaß, an der STIRNFLÄCHE gemessen. Die Muffe ist um
           0,6° konisch; misst man weiter innen, liegt die Bohrung
           planmäßig enger, und der Betrag hängt davon ab, wo genau eine
           Sweep-Station liegt. An der Stirnfläche liegt immer eine, und
           dort trägt die Bohrung das Nennmaß plus die Einführfase — ein
           erklärter Betrag, der in den Sollwert gehört (Fall 23). */
        { key: 'd', label: DIMENSION_KEY.d,
          soll: 'muffe' === 'rohr' ? a.d
            : Math.round((a.d + 2 * P.lead) * 100) / 100,
          ist: () => {
            const g = imBand(-P.len / 2 - 0.1, -P.len / 2 + 0.1);
            return g.n ? Math.round(('muffe' === 'rohr' ? 2 * g.max : 2 * g.min) * 100) / 100 : NaN;
          } },
      ],
    }, size, variant, clipPlane);
  },
};

export default product;
