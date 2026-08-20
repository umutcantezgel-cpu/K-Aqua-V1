/* K-Aqua Winkelfamilie — Parametrik.

   Gemeinsam für Winkel 45° und 90°. Aus der Tabelle kommen d, D, das
   Schenkelmaß (bei 45° Spalte l, bei 90° Spalte L) und z.

   Die Muffentiefe wird NICHT geschätzt, sondern gerechnet: Schenkel − z.
   Gegenprobe gegen die Normreihe DVS 2207-11 steht in P.depthDeltaToNorm
   und erscheint im Prüfbericht. */

import { D2R, fusionDepth } from '../../core/index.js';

export function bendParams(article, opt) {
  const a = article;
  const P = Object.assign({}, a);
  const { d, D } = a;

  P.angle = opt.angle;
  P.leg = a.leg;                       // Achsenschnittstelle bis Stirnfläche
  P.OD = D;
  P.wallFitting = (D - d) / 2;
  /* Muffentiefe aus der Normreihe, nicht aus leg − z. Begründung im
     Kopfkommentar von products/tee/data.js: die Tiefe ist durch das
     Schweißwerkzeug je Nennweite festgelegt und muss bei Muffe, Winkel
     und T-Stück gleich sein. Die Muffentabelle belegt die Reihe exakt;
     leg − z streut bei Winkel und T-Stück um bis zu 3 mm. */
  P.socket = fusionDepth(d) ?? (a.leg - a.z);
  P.socketFromTable = a.leg - a.z;     // Gegenprobe, erscheint im Prüfbericht

  P.wallPipe = d / (opt.sdr ?? 6);
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.rOut = D / 2;

  P.sockTaper = Math.tan(0.6 * D2R);   // 0,6° Muffenkonus
  P.lead = 2 * Math.tan(15 * D2R);     // Einführfase 15° × 2 mm
  P.restwand = P.wallFitting;

  /* ASSUMPTION Bogenradius. Die Tabelle führt keinen. Angesetzt 0,5·d,
     begrenzt auf das, was der Schenkel hergibt (bendPath rechnet den
     Verbrauch R·tan(α/2) und bricht sonst ab). 0,5·d ist der Wert, bei
     dem die Außenkontur im Katalogfoto sichtbar rund über die Ecke
     läuft, ohne dass der Bogen in die Muffe hineinreicht.
     Gegen die Zeichnung zu verifizieren. */
  const maxR = (a.leg - P.socket - 1.5) / Math.tan((opt.angle * D2R) / 2);
  P.bendR = Math.max(d * 0.22, Math.min(d * 0.5, maxR));

  P.emR = Math.min(2.0, 0.05 * d);
  const norm = fusionDepth(d);
  P.normDepth = norm;
  P.depthDeltaToNorm = norm == null ? null
    : Math.round((P.socketFromTable - norm) * 10) / 10;

  if (P.restwand < 3) {
    throw new Error('K-Aqua Winkel d' + d + ': Restwand ' + P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket <= 0 || P.socket >= a.leg) {
    throw new Error('K-Aqua Winkel d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht zum Schenkel ' + a.leg + ' mm');
  }
  return P;
}
