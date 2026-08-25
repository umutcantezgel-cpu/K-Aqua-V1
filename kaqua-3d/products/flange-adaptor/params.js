/* K-Aqua Flanschadapter — Parametrik.

   Zwei Bauarten, ein Produkt; welche gilt, steht in der Zeile. Die
   Muffenbauart baut aus l und der Muffentiefe, die Spitzendbauart aus
   z und der tabellierten Wandstärke s.

   Achse x, Nullpunkt in der Mitte. Links das Anschlussende (Muffe bzw.
   Spitzende), rechts der Bund mit der Dichtfläche. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article, FLANSCHBOHRUNG } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const spitz = a.bauart === 'spitzende';

  P.bund = spitz ? a.D1 : a.D;          // Bund-Außendurchmesser
  P.schaft = spitz ? a.d : a.D1;        // Schaft-Außendurchmesser
  P.rBund = P.bund / 2;
  P.rSchaft = P.schaft / 2;
  P.bundDicke = a.h;

  P.schaftLen = spitz ? a.z - a.h : a.l;
  P.len = P.schaftLen + a.h;
  P.xEnd = P.len / 2;                   // Bundstirnfläche
  P.xStart = -P.len / 2;                // Anschlussende
  P.xBund = P.xEnd - a.h;               // Bundunterkante

  if (spitz) {
    P.wall = a.s;                       // TABELLIERT
    P.bore = a.d - 2 * a.s;
    P.socket = 0;
    /* GEGENPROBE gegen die Fußnote SDR 11: s müsste d/11 sein. */
    P.wallFromSdr = Math.round((a.d / 11) * 10) / 10;
    P.wallDeltaToSdr = Math.round((a.s - P.wallFromSdr) * 10) / 10;
  } else {
    P.socket = fusionDepth(a.d) ?? (a.l - a.z);
    P.socketFromTable = Math.round((a.l - a.z) * 10) / 10;
    P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;
    P.wall = (a.D1 - a.d) / 2;
    P.bore = a.d - 2 * (a.d / 6);       // SDR 6 wie bei allen Fittings
  }
  P.boreR = P.bore / 2;
  P.sockTaper = spitz ? 0 : Math.tan(0.6 * D2R);
  P.lead = spitz ? 0 : 2 * Math.tan(15 * D2R);

  /* Die Dichtfläche trägt zwei flache Rillen — Stand der Technik bei
     Bundbuchsen, damit die Dichtung nicht wandert. Nicht bemaßt,
     deshalb als Gestalt und nicht als Maß behandelt. */
  P.rilleTiefe = Math.min(0.6, 0.03 * a.h);
  P.rilleR1 = P.boreR + (P.rBund - P.boreR) * 0.42;
  P.rilleR2 = P.boreR + (P.rBund - P.boreR) * 0.62;

  /* Die Bohrung des Gegenflansches, nur zur Prüfung mitgeführt. */
  P.flanschBohrung = FLANSCHBOHRUNG[a.d] ?? null;

  if (P.rBund <= P.rSchaft + 1.5) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Bund ' + P.bund +
      ' steht über dem Schaft ' + P.schaft + ' kaum vor');
  }
  if (P.boreR >= P.rSchaft - 1.5) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Schaftwand ' +
      (P.rSchaft - P.boreR).toFixed(2) + ' mm zu dünn');
  }
  if (!spitz && P.socket >= P.schaftLen - 2) {
    throw new Error('K-Aqua Flanschadapter d' + a.d + ': Muffentiefe ' +
      P.socket + ' passt nicht in den Schaft ' + P.schaftLen);
  }
  if (P.flanschBohrung != null &&
      !(P.schaft < P.flanschBohrung && P.flanschBohrung < P.bund)) {
    throw new Error('K-Aqua Flanschadapter d' + a.d +
      ': der Gegenflansch (Bohrung ' + P.flanschBohrung +
      ') passt nicht über den Schaft ' + P.schaft + ' unter den Bund ' + P.bund);
  }
  return P;
}
