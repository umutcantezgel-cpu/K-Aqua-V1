/* K-Aqua T-Stück-Familie — Parametrik.

   Aus der Tabelle: d, D, l (Achse Abzweig → Stirnfläche Durchgang),
   L (Gesamtlänge Durchgang), l1 (Achse Durchgang → Stirnfläche
   Abzweig), z.

   Gegenprobe der Transkription: L muss 2·l ergeben. Bei d20 steht
   L = 55 gegen 2·l = 54 — eine Rundung des Herstellers, kein
   Ablesefehler. Maßgeblich ist L; l wird daraus gerechnet, damit das
   Modell symmetrisch bleibt. */

import { D2R, fusionDepth } from '../../core/index.js';

export function teeParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  /* L steht nur beim gleichschenkligen T-Stück in der Tabelle. Das
     Reduzier-T führt keine Gesamtlänge, sondern nur l — dort ist der
     Durchgang zwangsläufig 2·l. Das `??` lässt das T-Stück unberührt,
     denn es HAT ein L. */
  P.run = a.L ?? 2 * a.l;
  P.half = P.run / 2;
  P.branch = a.l1;                // Achse Durchgang → Stirnfläche Abzweig
  P.lTable = a.l;
  P.lDelta = Math.round((a.l - P.run / 2) * 10) / 10;

  P.OD = D;
  P.wallFitting = (D - d) / 2;
  P.rOut = D / 2;

  /* Muffentiefe aus der Normreihe. Begründung im Kopfkommentar von
     data.js: sie ist durch das Schweißwerkzeug je Nennweite festgelegt
     und bei Muffe, Winkel und T-Stück identisch. */
  P.socket = fusionDepth(d) ?? (a.l - a.z);
  P.socketFromTable = a.l - a.z;

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);

  /* ASSUMPTION Kehlenradius am Abzweig. Die Tabelle führt keinen.
     Angesetzt 0,18·d — der Wert, bei dem die Kehle im Katalogfoto
     sichtbar rund ausläuft, ohne die Abzweigmuffe zu verkürzen.
     Gegen die Zeichnung zu verifizieren. */
  P.filletR = Math.max(1.5, 0.18 * d);

  /* ABZWEIG. Beim gleichschenkligen T-Stück ist er in allem gleich dem
     Durchgang; beim Reduzier-T hat er eigene Nennweite d1 und eigenen
     Muffenaußendurchmesser D1. Alle Felder fallen ohne d1 auf die Werte
     des Durchgangs zurück — deshalb ändert sich für das T-Stück und die
     Gewinde-T-Stücke KEINE Zahl. Nachgewiesen im Prüfbericht. */
  P.dB = a.d1 ?? d;
  P.ODB = a.D1 ?? D;
  P.rOutB = P.ODB / 2;
  P.socketB = fusionDepth(P.dB) ?? P.socket;
  P.wallPipeB = P.dB / (opt.sdr ?? 6);
  P.boreRB = (P.dB - 2 * P.wallPipeB) / 2;
  P.wallFittingB = (P.ODB - P.dB) / 2;
  P.reduziert = P.dB !== d;

  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua T-Stück d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket >= P.half) {
    throw new Error('K-Aqua T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half.toFixed(1) + ' mm');
  }
  if (P.socket >= P.branch - P.rOut * 0.4) {
    throw new Error('K-Aqua T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den Abzweig ' + P.branch + ' mm');
  }
  return P;
}
