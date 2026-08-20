/* K-Aqua Metallverschraubung (Innengewinde) — Parametrik.

   Neun Maße stehen in der Tabelle. Gerechnet wird nur die Aufteilung
   der Längen und die Gewindegeometrie aus der Normreihe. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article, THREAD } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = THREAD[a.Rp];
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  P.len = a.L;
  P.xEnd = a.L / 2;

  /* Aufteilung. Die Lücke L − (l + l1) ist der freiliegende Bundring
     zwischen Mutter und Körper — dieselbe Deutung wie bei der
     PP-R-Verschraubung (Fall 28: durchgehend negatives Vorzeichen). */
  P.frontLen = a.l;
  P.rearLen = a.l1;
  P.collarGap = Math.max(0, a.L - a.l - a.l1);

  /* NUR SW1 bestimmt die Silhouette. Begründung in data.js: die
     Fotoauswertung begrenzt die Breite auf etwa 45 mm bei L = 48, und
     SW = 54 über Fläche ergäbe 62 mm über Ecke. SW1 = 37 ergibt 42,7 —
     das passt und liegt knapp unter dem Muffendurchmesser 44.

     SW ist damit NICHT auflösbar und wird nicht modelliert. */
  P.afBody = a.SW1;
  P.rBodyCirc = a.SW1 / Math.sqrt(3);      // Umkreis = Eckenmaß/2

  /* PP-R-Muffe links: Außendurchmesser wie bei jedem Fitting dieser
     Nennweite. ASSUMPTION 1,375·d — der Wert, den Muffe und T-Stück bei
     d20 bis d63 zeigen (Muffe d32: D = 44 = 1,375·32). */
  P.sleeveOD = Math.round(1.375 * d * 10) / 10;
  P.rSleeve = P.sleeveOD / 2;
  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Längsaufteilung. Die Fotoauswertung ergibt einen Grünanteil von
     etwa 30 % der Gesamtlänge (x 340–410 von 335–745 zu über 90 %
     grün). Der vordere Tabellenabschnitt l entspricht bei d32 mit
     23/48 = 48 % nicht dem, was das Foto zeigt — l umfasst offenbar
     mehr als die sichtbare Muffe.

     Modelliert wird deshalb der Fotoanteil: PP-R 30 %, danach Bundring,
     dann Sechskantkörper, dann Bundmutter mit Innengewinde. */
  /* WIDERSPRUCH ZWISCHEN FOTO UND SCHWEISSTIEFE.

     Die Fotoauswertung ergibt einen Grünanteil von etwa 30 % der Länge.
     Die Schweißmuffe braucht aber die volle Normtiefe plus Muffengrund:
     bei d32 sind das 18 + 2 = 20 mm von L = 48, also 42 %.

     Die Schweißtiefe gewinnt. Sie ist durch das Schweißwerkzeug
     festgelegt, in der Normreihe belegt und mehrfach gegengeprüft
     (products/socket/data.js). Ein PP-R-Teil, das kürzer ist als die
     Muffentiefe, ließe sich nicht verschweißen — das Foto kann täuschen,
     das Werkzeug nicht.

     Wahrscheinliche Erklärung des Fotos: der Metallbund überdeckt den
     hinteren Teil der grünen Muffe, sichtbar bleiben nur 30 %.
     Am Originalteil zu klären, Vermerk in data.js. */
  P.sleeveLen = P.socket + Math.max(2, P.wallPipe * 0.5);
  P.sleeveShare = Math.round(P.sleeveLen / a.L * 1000) / 10;
  P.xSleeveEnd = -P.xEnd + P.sleeveLen;
  P.xBodyStart = P.xSleeveEnd + P.collarGap;
  P.bodyLen = Math.max(4, (P.xEnd - P.xBodyStart) * 0.46);
  P.xNutStart = P.xBodyStart + P.bodyLen;
  P.nutLen = P.xEnd - P.xNutStart;

  /* Der Bund am Gewindeende bleibt unter dem Muffendurchmesser — die
     Fotoauswertung zeigt Metall- und PP-Teil ähnlich breit, das Metall
     nicht breiter. */
  P.rCollar = Math.min(P.rSleeve, P.rBodyCirc * 1.02);
  P.aspect = Math.round((a.L / (2 * P.rBodyCirc)) * 100) / 100;

  /* Innengewinde: Gänge über die Mutterlänge, mindestens vier. */
  P.turns = Math.max(4, Math.round((P.nutLen - 2) / P.threadPitch));

  P.restwand = Math.round((P.sleeveOD - d) / 2 * 10) / 10;

  if (P.nutLen < P.threadPitch * 4) {
    throw new Error('K-Aqua Metallverschraubung d' + d + ': Mutterlänge ' +
      P.nutLen.toFixed(1) + ' mm trägt kein Gewinde Rp' + a.Rp);
  }
  if (P.threadOD >= 2 * P.rCollar - 4) {
    throw new Error('K-Aqua Metallverschraubung d' + d + ': Gewinde Rp' + a.Rp +
      ' (Ø' + P.threadOD.toFixed(1) + ') passt nicht in den Bund Ø' +
      (2 * P.rCollar).toFixed(1));
  }
  return P;
}
