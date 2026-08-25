/* K-Aqua Verschraubung — Parametrik.

   Sieben Maße stehen in der Tabelle. Die Teilung folgt der dritten
   Deutung (data.js): Mutter in der Mitte, links das Gewindeteil (l1),
   rechts das Muffenstück (L − l1). Alle Zonen kommen aus der Tabelle —
   die Bilder haben nur entschieden, WELCHES Teil welches ist. */

import { D2R, fusionDepth, socketOD } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  P.len = a.L;
  P.xEnd = a.L / 2;
  P.OD = a.D;
  P.rOut = a.D / 2;

  /* Zonen entlang der Achse, von links:
       Stub sichtbar   l1 − l     (geriffelt, mit der Muffe des Gewindeteils)
       Mutter          l
       rechts sichtbar L − l1     (Muffenstück mit Bund)
     Summe = L per Konstruktion. */
  P.nutLen = a.l;
  P.stubLen = a.l1;                       // Gesamtlänge des Gewindeteils
  P.stubShow = a.l1 - a.l;                // sichtbar links der Mutter
  P.tailShow = a.L - a.l1;                // sichtbar rechts der Mutter
  P.xNutA = -P.xEnd + P.stubShow;         // linke Mutterkante
  P.xNutB = P.xNutA + a.l;                // rechte Mutterkante = Stub-Ende
  P.xJoint = P.xNutB;                     // Fuge Stub-Stirn / rechtes Teil

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Die sichtbaren Stutzen führen den Muffen-Außendurchmesser der
     Normreihe — beide Sichtzonen SIND Schweißmuffenzonen. Kein
     Bildmaß: socketOD steht im Core. */
  P.stubOD = socketOD(d) ?? Math.round(d * 1.36);
  P.rStub = P.stubOD / 2;

  /* ASSUMPTION Gewindezonen-Durchmesser: das Außengewinde des linken
     Teils füllt die Mutter. Angesetzt 0,80·D wie beim Kugelhahn —
     vollständig verdeckt, nur die Wandstärkenrechnung hängt daran. */
  P.threadOD = Math.round(a.D * 0.80 * 10) / 10;
  P.rThread = P.threadOD / 2;
  P.nutWall = Math.round((a.D - P.threadOD) / 2 * 10) / 10;

  /* ASSUMPTION O-Ring: dichtet an der Fuge zwischen Stub-Stirn und
     rechtem Bund, Schnurstärke 0,055·d wie beim Kugelhahn. Er liegt
     vollständig unter der Mutter — sichtbar erst in der Explosion. */
  P.oRingD = Math.round(Math.max(2, d * 0.055) * 10) / 10;
  P.oRingR = P.boreR + P.oRingD * 1.1;
  P.oRingX = P.xJoint + P.oRingD * 0.7;

  /* Mutterriffelung wie gehabt; die Sichtstutzen tragen nach beiden
     Bildern eine feine axiale Riffelung. ASSUMPTION Zahl und Tiefe aus
     dem Foto: „fein, dicht" — 18 Rippen, 0,6 mm. */
  P.ribCount = 12;
  P.ribDepth = Math.max(0.8, a.D * 0.022);
  P.stubRibs = 18;
  P.stubRibDepth = 0.6;

  P.restwand = P.nutWall;
  P.emR = Math.min(1.8, 0.045 * d);

  if (P.nutWall < 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Mutterwand ' +
      P.nutWall + ' mm zu dünn');
  }
  if (P.stubShow <= 2) {
    throw new Error('K-Aqua Verschraubung d' + d + ': sichtbarer Stutzen ' +
      P.stubShow + ' mm — die Teilung kann nicht stimmen');
  }
  if (P.socket >= P.stubLen) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in das Gewindeteil (' + P.stubLen + ' mm)');
  }
  if (P.socket + 2 > P.tailShow + 2.5) {
    throw new Error('K-Aqua Verschraubung d' + d + ': Muffentiefe ' +
      P.socket + ' mm passt nicht in das rechte Muffenstück');
  }
  return P;
}
