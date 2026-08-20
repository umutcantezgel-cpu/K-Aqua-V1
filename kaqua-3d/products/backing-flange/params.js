/* K-Aqua Bundflansch — Parametrik.

   Sechs Maße stehen in der Tabelle, die Lochzahl ist über die Normreihe
   hergeleitet (Begründung in data.js). Zu rechnen bleibt fast nichts —
   genau so soll ein Produktpaket aussehen. */

import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);

  P.rOut = a.D / 2;
  P.rIn = a.D2 / 2;
  P.rHole = a.D3 / 2;
  P.boltCircleD = a.D1;
  P.thick = a.H;
  P.holeCount = a.holes;

  /* Ringbreite zwischen Lochkreis und Rand — die Fläche, die die
     Schraubenkraft überträgt. */
  P.rimWidth = Math.round((a.D - a.D1) / 2 * 10) / 10;
  P.hubWidth = Math.round((a.D1 - a.D2) / 2 * 10) / 10;

  /* Lochmuster um eine halbe Teilung gedreht: bei geraden Lochzahlen
     läge sonst ein Loch genau auf der Schnittebene z = 0, und der
     Halbschnitt zeigte ein halbes Loch statt einer klaren Kante. */
  P.startDeg = 180 / a.holes;

  /* ASSUMPTION Fase 0,8 mm an den Stirnflächen. Das Foto zeigt eine
     schmale, gleichmäßige Kantenfase — typisch für ein gedrehtes oder
     gefrästes Teil. Sie nimmt vom Außendurchmesser, deshalb klein
     gehalten und im Maßtest eingerechnet. */
  P.bevel = 0.8;

  /* Stahlkern in PP-Mantel: das Foto zeigt eine graue, matte Oberfläche
     mit metallischem Glanz an den Lochrändern. Die Produktbezeichnung
     nennt „PP-Steel". Modelliert als ein Teil in Stahl — eine
     Zweistoff-Darstellung bräuchte die Mantelstärke, und die steht
     nicht in der Quelle. */

  if (P.hubWidth < 3) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Nabenbreite ' +
      P.hubWidth + ' mm zu schmal für Ø' + a.D3 + '-Löcher');
  }
  if (a.D2 <= a.d) {
    throw new Error('K-Aqua Bundflansch d' + a.d + ': Bohrung Ø' + a.D2 +
      ' lässt das Rohr Ø' + a.d + ' nicht durch');
  }
  return P;
}
