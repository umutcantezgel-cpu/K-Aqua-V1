/* K-Aqua Rohrschelle — Parametrik.

   Die Quelle führt nur die Nennweite. Alle Geometriemaße sind aus dem
   Produktfoto abgeleitet; jede Zeile trägt entsprechend ASSUMPTION.

   Gegenprobe über das Gewicht bei d32:
     Schale: Ring Ø32 innen, 4,5 mm Schalenwand, 22 mm breit, halb offen
       → etwa (π·36,5·0,9)·4,5·22 ≈ 10,2 cm³ PP × 0,9 = 9,2 g
     Gummi: π·33·2·22 ≈ 4,6 cm³ × 1,2 = 5,5 g
     Zwei M8-Schrauben mit Mutter ≈ 2 × 11 g = 22 g
     Mutterblock M8 ≈ 25 g
     Summe ≈ 62 g gegen tabellierte 70 g
   Brauchbare Übereinstimmung für eine aus Pixeln abgeleitete Geometrie;
   die 8 g Differenz gehen auf Scheiben und Laschenmaterial. */

import { D2R } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  /* ASSUMPTION Gummieinlage 2 mm dick bis d50, 2,5 mm darüber. Im Foto
     als deutlich dunklerer Ring erkennbar, etwa 6 % des Nenndurchmessers. */
  P.rubber = d <= 50 ? 2 : 2.5;
  P.rInner = d / 2;                        // liegt am Rohr an
  P.rShellIn = P.rInner + P.rubber;

  /* ASSUMPTION Schalenwand 0,14·d, mindestens 4 mm. Aus dem
     Verhältnis von Außen- zu Innenkontur im Foto. */
  P.shellWall = Math.max(4, Math.round(d * 0.14 * 10) / 10);
  P.rOut = P.rShellIn + P.shellWall;
  P.D = Math.round(2 * P.rOut * 10) / 10;

  /* ASSUMPTION Bandbreite 0,68·d, mindestens 18 mm — im Foto etwa
     zwei Drittel des Rohrdurchmessers. */
  P.width = Math.max(18, Math.round(d * 0.68));

  /* ASSUMPTION Schraubengröße: M8 bis d50, M10 darüber. Der Gewichts-
     sprung von 0,08 auf 0,13 kg zwischen d50 und d63 deutet auf einen
     Wechsel dort hin (siehe data.js). */
  P.boltM = d <= 50 ? 8 : 10;
  P.boltD = P.boltM;
  P.boltHeadAF = P.boltM === 8 ? 13 : 17;  // Schlüsselweite Sechskant
  P.boltHeadH = P.boltM === 8 ? 5.3 : 6.4;

  /* Laschen: zwei Ohren, an denen die Schrauben durchgehen. Sie stehen
     seitlich ab; die Schraubenachse liegt parallel zur Rohrachse-Normalen. */
  P.lugLen = P.boltM * 2.6;
  P.lugThick = Math.max(4, P.shellWall * 0.85);
  P.lugWidth = P.width * 0.62;

  /* ASSUMPTION Anschlussgewinde M8 bis d63, M10 darüber. Übliche
     Deckenbefestigung; die Mutter sitzt unten am Bogen. */
  P.threadM = d <= 63 ? 8 : 10;
  P.M = 'M' + P.threadM;
  P.nutAF = P.threadM === 8 ? 13 : 17;
  P.nutH = P.threadM === 8 ? 12 : 15;

  /* Die Schelle öffnet nicht ganz: die beiden Schalen laufen an der
     Scharnierseite in einem Steg zusammen. Öffnungswinkel je Lasche. */
  P.gapDeg = 14;

  if (P.shellWall < 3) {
    throw new Error('K-Aqua Rohrschelle d' + d + ': Schalenwand ' +
      P.shellWall + ' mm zu dünn');
  }
  return P;
}
