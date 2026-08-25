/* K-Aqua Kugelhahn PP-R (Kugel Messing verchromt) — Parametrik.

   Rang 1 sind d · A · C · H · L · P. Der Katalog bemaßt damit mehr als
   beim PP-Kugelhahn: Muffentiefe UND Durchgang stehen in der Tabelle
   und müssen nicht angenommen werden.

   Was die Tabelle NICHT nennt, ist der Außendurchmesser des Korpus. Er
   kommt aus der Schnittzeichnung S. 107 — und zwar erst, nachdem
   feststand, WELCHE Größe dort gezeichnet ist (Fall 35). Das Verhältnis
   A/H der Zeichnung beträgt 235/215 = 1,09; in der Tabelle liegt d20
   bei 1,125 und alles darüber bei 1,18 bis 1,37. Gezeichnet ist also
   d20, und nur für d20 dürfen Verhältnisse abgegriffen werden.

   Alle Maße in Millimetern. X = Durchflussachse, Y = oben, Z = Tiefe. */

import { article } from './data.js';

export function params(dNom) {
  const a = article(dNom);
  const { d, A, C, H, L } = a;
  const P = Object.assign({}, a);

  P.len = A;
  P.xEnd = A / 2;
  P.socket = C;                    // TABELLIERT
  P.bore = a.P;                    // TABELLIERT
  P.boreR = P.bore / 2;

  /* ASSUMPTION Korpusdurchmesser, aus der Zeichnung bei d20:
     158 px von 235 px Baulänge = 0,672·A. Angesetzt 0,67·A.
     Über A skaliert und nicht über d, weil der Hahn NICHT
     selbstähnlich ist: A/d fällt von 3,38 bei d20 auf 1,92 bei d90. */
  P.bodyOD = 0.67 * A;

  /* ASSUMPTION Muffenstutzen, gleiche Zeichnung: die Stirnfläche misst
     102 px = 29,3 mm, also 1,465·d bei d20. Statt dieses Verhältnis
     blind hochzuziehen, ist es gegen die MUFFENTABELLE des Katalogs
     (AQ270xx, Spalte D) gefittet, die für dieselben Nennweiten
     29/35/44/52/65/84/99/120 führt:

         d + 2·max(4,5; 0,165·d)
         →  29 · 34 · 42,6 · 53,2 · 66,5 · 83,8 · 99,8 · 119,7

     Das trifft die Muffentabelle über alle acht Zeilen auf 1,5 mm.
     Nach oben begrenzt durch den Korpus, damit der Stutzen nie dicker
     wird als der Bauch. */
  P.socketOD = Math.min(0.90 * P.bodyOD, d + 2 * Math.max(4.5, 0.165 * d));
  P.rSocket = P.socketOD / 2;
  P.rBody = P.bodyOD / 2;

  /* ASSUMPTION Kugeldurchmesser: Zeichnung 78 px gegen 235 px Baulänge
     = 22,4 mm bei d20, das ist 1,49·P. Über den DURCHGANG skaliert und
     nicht über A oder d — die Kugel trägt den Durchgang, und nur ihn.
     Über A gerechnet käme bei d90 eine Kugel von 57 mm heraus, die den
     eigenen Durchgang von 65 mm nicht fassen kann. */
  P.ballD = 1.49 * P.bore;

  P.seatW = 0.125 * d;
  P.seatT = 0.094 * d;
  P.seatOD = P.bore + 2 * P.seatW;
  P.seatSphR = P.ballD / 2 + 0.15;
  P.seatBack = Math.sqrt(P.seatSphR ** 2 - P.boreR ** 2) + P.seatT;
  P.chamberR = P.ballD / 2 + 0.2;

  /* Der Innenverlauf hat DREI Stufen, nicht zwei. Der erste Entwurf
     führte die Korpusbohrung durchgehend auf Sitzmaß — bei d20 wurde
     sie damit WEITER als die Muffenbohrung (10,2 gegen 10,0), und dem
     Rohr fehlte der Anschlag. Richtig ist:

       Muffe Ø d  →  Kanal auf Durchgangsmaß  →  Sitzaufnahme  →  Kammer

     Der Kanal trägt den Durchfluss, die Sitzaufnahme nimmt den PTFE-Ring
     auf, und zwischen Muffe und Kanal liegt die Schulter, an der das
     Rohr aufsitzt. */
  P.kanalR = P.boreR + 0.4;
  P.seatRingR = P.seatOD / 2 + 0.2;
  P.chamberX = Math.sqrt(Math.max(0.01, P.chamberR ** 2 - P.seatRingR ** 2));
  P.xSeatBack = P.seatBack;              // Rückseite des Sitzrings
  P.xShoulder = P.xEnd - P.socket;       // Muffengrund = Rohranschlag


  /* Der Kegel von der Stirnfläche auf den Bauch läuft unter 45° — in
     der Zeichnung 25 px lang bei einer Radiendifferenz von 28 px.
     45° heißt: die Kegellänge IST die Radiendifferenz. */
  P.coneLen = P.rBody - P.rSocket;
  P.xCone = P.xEnd - P.coneLen;

  /* Spindeldom. Zeichnung bei d20: Domoberkante 34,5 mm über der Achse
     bei H = 60, also 0,575·H. */
  P.domeTop = 0.575 * H;
  P.domeOD = Math.max(P.ballD * 0.62, 2 * (P.boreR + 4));
  P.stemOD = Math.max(6, 0.34 * P.bore);
  /* O-Ringe sitzen bei DIESER Bauart auf der SPINDEL, nicht im
     Durchfluss — es gibt keine Anschlussstutzen, die zu dichten wären.
     Zwei Stück im Dom, wie in der Schnittzeichnung.

     STEHT HIER UND NICHT WEITER OBEN: die Höhen hängen an domeTop, und
     domeTop wird erst darüber gesetzt. Beim ersten Anlauf stand der
     Block vor domeTop — das Ergebnis war NaN, und ein einziges
     NaN-Teil macht die Bounding-Box der ganzen Baugruppe ungültig. Die
     Seite blieb leer, WÄHREND ALLE ACHT MASSE 0,00 mm meldeten, weil
     keines die O-Ringe anfasst. Nur der Blick auf die Seite hat es
     gezeigt (Fall 38). */
  P.oringY = [0.42 * P.domeTop, 0.72 * P.domeTop];
  P.oringCord = Math.max(1.8, 0.030 * d);
  P.oringDepth = 0.7 * P.oringCord;

  /* Hebel: flacher Stahlbügel, kunststoffummantelt, gekröpft. Nur zwei
     Maße sind tabelliert — L (Länge ab Spindel) und H (Oberkante über
     der Achse). Der Rest ist Gestalt aus der Zeichnung. */
  P.lever = {
    len: L,
    thick: Math.max(4, 0.09 * H),          // Bügeldicke
    wRoot: Math.max(8, 0.115 * H),         // Breite an der Nabe
    wTip: Math.max(6, 0.085 * H),          // Breite an der Spitze
    hubBot: P.domeTop - 2,
    hubOD: Math.max(P.stemOD + 7, 0.34 * P.bodyOD),
    xBend: 0.30 * L,                       // Ende der Kröpfung
    yBend: P.domeTop + 3.0,                // Höhe an der Nabe
  };

  if (P.chamberR > P.rBody - 3.5) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kugelkammer ' +
      P.chamberR.toFixed(1) + ' passt nicht in den Korpus r' + P.rBody.toFixed(1));
  }
  if (P.socketOD - d < 7) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Muffenwand ' +
      ((P.socketOD - d) / 2).toFixed(2) + ' mm zu dünn');
  }
  if (P.ballD <= P.bore + 3) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kugelwand zu dünn');
  }
  if (P.xSeatBack + 2 >= P.xShoulder) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Sitzring endet bei ' +
      P.xSeatBack.toFixed(1) + ', der Muffengrund liegt schon bei ' +
      P.xShoulder.toFixed(1));
  }
  if (P.kanalR >= P.d / 2 - 0.8) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Kanal r' +
      P.kanalR.toFixed(2) + ' lässt der Muffe r' + (d / 2).toFixed(1) +
      ' keine Schulter');
  }
  if (P.seatRingR >= P.chamberR) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d +
      ': Sitzaufnahme ist weiter als die Kugelkammer');
  }
  if (P.lever.yBend + P.lever.thick > H) {
    throw new Error('K-Aqua Kugelhahn Messing d' + d + ': Dom ' +
      P.domeTop.toFixed(1) + ' lässt für den Hebel unter H = ' + H + ' keinen Platz');
  }
  return P;
}
