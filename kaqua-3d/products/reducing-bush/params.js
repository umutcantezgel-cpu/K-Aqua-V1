/* K-Aqua Reduzierbuchse — Parametrik.

   Zwei Nennweiten: d außen (Zapfen), d1 innen (Muffe). Alles Weitere
   aus D, l und z gerechnet. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  P.len = a.l;
  P.xEnd = a.l / 2;
  /* d ist der GRÖSSTE Durchmesser (Zapfen), D der des vorstehenden
     Muffenkragens — nachgewiesen über die Korrelation von D mit d1
     und den Muffen-Außendurchmessern, siehe data.js. */
  P.rSpigot = a.d / 2;              // Zapfen, versinkt in der d-Muffe
  P.rCollar = a.D / 2;              // vorstehender d1-Muffenkragen
  P.OD = Math.max(a.d, a.D);        // Silhouettenmaß
  P.rOut = P.OD / 2;
  P.rSockIn = a.d1 / 2;             // Innenmuffe für das d1-Rohr

  /* Muffentiefen aus der Normreihe — dieselbe Begründung wie bei
     Winkel und T-Stück: ein Schweißwerkzeug je Nennweite. Die Buchse
     hat zwei, eine je Seite. */
  P.socketIn = fusionDepth(a.d1) ?? Math.max(8, a.d1 * 0.55);
  P.spigotLen = fusionDepth(a.d) ?? Math.max(8, a.d * 0.55);

  P.wallPipe = a.d1 / (6);
  P.bore = a.d1 - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = (a.D - a.d1) / 2;    // Wand des Muffenkragens
  P.spigotWall = (a.d - a.d1) / 2;  // Wand am Zapfen über der d1-Bohrung
  P.emR = Math.min(1.6, 0.045 * a.d);

  /* Zapfenlänge = Schweißtiefe der d-Muffe, in der die Buchse sitzt.
     Der Rest der Länge ist der vorstehende Kragen. */
  P.spigotLenUsed = Math.min(P.spigotLen, a.l - Math.max(3, P.socketIn * 0.35));
  P.collarLen = a.l - P.spigotLenUsed;

  if (P.restwand < 1.2 || P.spigotWall < 1.2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Wand ' +
      Math.min(P.restwand, P.spigotWall).toFixed(2) + ' mm zu dünn');
  }
  if (P.socketIn >= a.l - 2) {
    throw new Error('K-Aqua Reduzierbuchse ' + a.key + ': Muffentiefe ' +
      P.socketIn + ' mm passt nicht in die Länge ' + a.l + ' mm');
  }
  return P;
}
