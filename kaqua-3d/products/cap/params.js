/* K-Aqua Kappe — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · l bzw. d · L · s. Alles andere wird
   daraus gerechnet. Zwei Bauformen, ein Parametersatz:

     sdr 6   Muffenkappe:  Wand aus (D − d)/2, Bohrung Ø d mit
             Muffenkonus, Kalotte am geschlossenen Ende
     sdr 11  Stumpfschweißkappe: Wand = s, Außendurchmesser = d,
             kein Muffenkonus, längere Kalotte

   Alle Maße in Millimetern. X = Achse, Mundloch bei −xEnd. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

/* Die Muffenschweißtiefe kommt aus dem Core (core/geometry.js).
   Sie stand hier als lokale Tabelle mit ASSUMPTION-Vermerk; die
   Muffentabelle hat die Reihe inzwischen über ihre Spalte z bestätigt
   — bei d20 bis d63 auf die Zehntelstelle. */

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.butt = a.sdr === 11;
  P.len = P.butt ? a.L : a.l;                 // Gesamtlänge, je Bauform
  P.OD = P.butt ? d : a.D;                    // größter Außendurchmesser
  P.wall = P.butt ? a.s : (a.D - d) / 2;      // Wandstärke

  /* ASSUMPTION: Kalottenhöhe. Muffenkappe 0,19·D — am Produktfoto
     gemessen (Bugausladung 200 px bei 1050 px Durchmesser). Stumpf-
     schweißkappe 0,25·d, das ist der übliche 2:1-Klöpperboden für
     druckbelastete Abschlüsse. */
  P.domeRise = P.butt ? 0.25 * d : 0.19 * P.OD;

  P.xEnd = P.len / 2;                         // Mundloch bei −xEnd
  P.xShoulder = P.xEnd - P.domeRise;          // Beginn der Kalotte
  P.rOut = P.OD / 2;
  P.rIn = P.rOut - P.wall;

  if (P.butt) {
    P.sockDepth = 0;
    P.bore = d - 2 * a.s;
    P.lead = 0;
    P.sockTaper = 0;
  } else {
    P.sockDepth = fusionDepth(d);
    P.bore = d;                               // Muffenbohrung nimmt das Rohr auf
    P.sockTaper = Math.tan(0.6 * D2R);        // 0,6° Muffenkonus, nach innen verjüngend
    P.lead = 2 * Math.tan(15 * D2R);          // Einführfase 15° × 2 mm
  }

  /* Prüfgrößen */
  P.restwand = P.wall;                        // ≥ 3 mm über alle Größen
  P.crownWall = P.wall;                       // Kalotte in Wandstärke, kein Materialklotz
  P.cylLen = P.len - P.domeRise;              // zylindrischer Anteil
  P.emR = Math.min(2.0, 0.05 * d);            // Auswerferstift-Marken

  if (P.restwand < 3) {
    throw new Error('K-Aqua Kappe d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm — ein Parameter stimmt nicht');
  }
  if (!P.butt && P.sockDepth >= P.cylLen) {
    throw new Error('K-Aqua Kappe d' + d + ': Muffentiefe ' + P.sockDepth +
      ' mm passt nicht in den Zylinderteil (' + P.cylLen.toFixed(1) + ' mm)');
  }
  return P;
}
