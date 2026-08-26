/* K-Aqua Kugelhahn PP-R (Kugel in PP) — Parametrik.

   Rang 1 (Maßtabelle) sind d · D · L · z · H · A. Alles andere wird
   daraus gerechnet, nie hartkodiert. Jede Annahme, die nicht aus der
   Tabelle oder der technischen Zeichnung folgt, trägt ein ASSUMPTION.

   Alle Maße in Millimetern. X = Durchflussachse, Y = oben, Z = Tiefe. */

import { DRAFT } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const { d, D, L, z, H, A } = a;
  const P = Object.assign({}, a);

  P.socket = (L - z) / 2;                       // Muffentiefe
  P.bore = 0.667 * d;                           // ASSUMPTION: Vollstrom = Rohr-ID bei SDR 6 / PN 20
  P.ballD = 1.0 * d;                            // ASSUMPTION: ergibt ~4,5 mm Restwand
  P.bodyOD = Math.max(0.62 * D, d + 9);
  P.tailOD = P.bodyOD;
  P.bundOD = 0.82 * D;
  P.threadOD = 0.78 * D;
  P.collarOD = 0.76 * D;
  P.collarT = 0.07 * D;
  P.nutLen = 0.19 * L;
  P.bundW = 0.08 * D;

  // Axiale Aufteilung: sichtbare Zonen ergeben in Summe exakt L
  P.xEnd = L / 2;                               // Stirnfläche
  P.xNutOut = 0.395 * L;                        // äußere Mutterkante
  P.xNutIn = 0.205 * L;                         // innere Mutterkante = sichtbares Korpusende
  P.xSocket = z / 2;                            // Muffengrund (= Rohrende)
  // ASSUMPTION: Stirnfläche Korpus / Anlagefläche Stutzen. Aus der Zeichnung
  // nicht ableitbar; so gewählt, dass hinter dem Muffengrund 0,16·d Material
  // bleibt und der Stutzenkragen innerhalb der Mutter liegt.
  P.xJoint = z / 2 - 0.16 * d;

  P.boreR = P.bore / 2;
  P.seatW = 0.125 * d;                          // Sitzringbreite (3,9 mm bei d32 ~ "bohrung+8")
  P.seatT = 0.094 * d;                          // Sitzdicke (3,0 mm bei d32)
  P.seatOD = P.bore + 2 * P.seatW;
  P.seatSphR = P.ballD / 2 + 0.15;
  P.seatBack = Math.sqrt(P.seatSphR ** 2 - P.boreR ** 2) + P.seatT;
  P.chamberR = P.ballD / 2 + 0.2;               // Kugelkammer
  P.bodyBoreR = P.boreR + P.seatW + 0.2;        // Korpusbohrung (nimmt Stutzennase auf)
  P.noseR = P.bodyBoreR - 0.2;                  // Stutzennase
  P.chamberX = Math.sqrt(Math.max(0.01, P.chamberR ** 2 - P.bodyBoreR ** 2));

  P.domeOD = 0.36 * D;
  P.domeTop = 0.42 * H;
  P.stemOD = 0.20 * D;
  P.padZ = 0.30 * D;                            // Lasche: Breite
  P.padX = 0.22 * D;                            // Lasche: Dicke in X
  P.padH = 0.05 * D;                            // Lasche: Höhe über Zylinder

  P.oringCord = 2.4;
  P.oringDepth = 1.8;

  /* ── ZUR GRIFFLÄNGE, nach dem Bildabgleich vom 25.08.2026 ──
     Der Mangelverdacht M9 („Griff zu lang") hat sich als Fehler des
     PRÜFERS erwiesen: die Grifflänge ist TABELLIERT (Spalte A), und
     A/L = 0,73 deckt sich mit dem Foto — verglichen worden war
     fälschlich gegen die Korpuslänge ohne Überwurfmuttern. Die Länge
     bleibt A. Aus dem Foto übernommen ist nur die GRÜNE DECKEINLAGE
     auf dem Griffkopf (zweiter Werkstoff des Griffs). */
  const gripA = A;
  P.lever = {
    hubBot: 0.41 * H,
    hubTop: 0.85 * H,
    hubBotOD: 0.46 * D,
    hubTopOD: 0.34 * D,
    armTop: H,
    thRoot: 0.30 * H,
    thTip: 0.15 * H,
    len: gripA,
    longFrac: 0.73,
    xLong: 0.73 * gripA,
    xShort: 0.27 * gripA,
    wRoot: 0.26 * gripA,
    wTip: 0.11 * gripA,
    ribs: 12,
    inlayOD: 0.30 * D,          // grüne Einlage auf dem Kopf, aus dem Foto
    inlayH: 0.9,
  };
  return P;
}
