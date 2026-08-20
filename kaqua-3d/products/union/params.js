/* K-Aqua Verschraubung — Parametrik.

   Sieben Maße stehen in der Tabelle. Gerechnet wird nur, was die
   Riffelung und die Dichtnut betrifft.

   Die Geometrie folgt der Verschraubung des Kugelhahns — dieselbe
   Überwurfmutter, derselbe Stutzen, derselbe O-Ring. Der Vergleich der
   D-Spalten belegt das (siehe data.js). */

import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.L;
  P.xEnd = a.L / 2;
  P.OD = a.D;
  P.rOut = a.D / 2;

  /* Teilung: Mutterteil links, Stutzenteil rechts.

     l + l1 ist in jeder Zeile um 0 bis 2 mm KLEINER als L — es fehlt
     ein Stück, es überlappt nichts. Dieser Ring bleibt zwischen
     Mutterkante und Stutzenschulter sichtbar: der freiliegende Teil des
     Stutzenbundes, gegen den die Mutter zieht. An einer angezogenen
     Verschraubung ist er genau dort zu sehen.

     Eine erste Fassung deutete die Differenz als Überlappung und ließ
     den Stutzen sie auffüllen — l1 wurde dadurch 1 mm zu lang, und
     keine Messung fasste l1 an. */
  P.nutLen = a.l;
  P.tailLen = a.l1;
  P.collarGap = Math.max(0, a.L - a.l - a.l1);
  P.xNutEnd = -P.xEnd + a.l;             // Mutterkante
  P.xJoint = P.xNutEnd + P.collarGap;    // Stutzenanfang (Schulter)

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Stutzendurchmesser: der Stutzen trägt das Gewinde, auf
     das die Mutter greift. Sein Außendurchmesser liegt damit unter D
     minus Mutterwand. Angesetzt 0,80·D — beim Kugelhahn ergibt dieses
     Verhältnis die im Foto sichtbare Abstufung. */
  P.tailOD = Math.round(a.D * 0.80 * 10) / 10;
  P.rTail = P.tailOD / 2;
  P.nutWall = Math.round((a.D - P.tailOD) / 2 * 10) / 10;

  /* ASSUMPTION O-Ring: sitzt in einer Nut am Stutzenbund, Schnurstärke
     0,055·d. Beim Kugelhahn dieselbe Größenordnung. */
  P.oRingD = Math.round(Math.max(2, d * 0.055) * 10) / 10;
  P.oRingR = P.rTail * 0.72;
  P.oRingX = P.xJoint + P.oRingD * 1.4;

  /* Riffelung der Mutter — im Katalogfoto des Kugelhahns deutlich
     sichtbar, zwölf Riffel über den Umfang. */
  P.ribCount = 12;
  P.ribDepth = Math.max(0.8, a.D * 0.022);

  P.restwand = P.nutWall;
  P.emR = Math.min(1.8, 0.045 * d);

  if (P.nutWall < 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Mutterwand ' +
      P.nutWall + ' mm zu dünn');
  }
  if (P.socket >= a.l1) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in den Stutzen (' + a.l1 + ' mm)');
  }
  return P;
}
