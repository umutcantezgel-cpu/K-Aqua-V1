/* K-Aqua Reduzier-T-Stück — Parametrik.

   Zwei Bauarten, ein Produkt. Welche gilt, steht in der Zeile selbst
   (`bauart`) und nicht in einer Variantenauswahl — nur so misst der
   Selbsttest beide Hälften.

   MUFFENBAUART: die Familie rechnet. `teeParams` fällt ohne L auf
   2·l zurück und übernimmt d1/D1 als Abzweigmaße; ohne diese Felder
   ändert sich für das gleichschenklige T-Stück nichts.

   SPITZENDBAUART: eigene Rechnung, weil es keine Muffen gibt. Aus der
   Tabelle kommen z (Achse → Stirnfläche), l (Länge des Spitzendes) und
   die Wandstärken s und s1. */

import { D2R, fusionDepth } from '../../core/index.js';
import { teeParams } from '../_tee/params.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  if (a.bauart === 'muffe') return muffenParams(a);
  return spitzendParams(a);
}

function muffenParams(a) {
  const P = teeParams(a, { sdr: 6 });
  P.bauart = 'muffe';
  P.key = a.key;

  /* Die Tabelle nennt die Muffentiefe indirekt: l − z. Sie wird NICHT
     zum Bauen benutzt (dafür steht die Normreihe im Core), aber als
     Gegenprobe mitgeführt — bis d63 stimmen beide auf einen halben
     Millimeter, darüber rechnet der Katalog kürzer. */
  P.socketFromTable = a.l - a.z;
  P.socketFromTableB = a.l1 - a.z1;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - (fusionDepth(a.d) ?? 0)) * 10) / 10;

  if (P.socketB >= P.branch) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Abzweigmuffe ' +
      P.socketB + ' mm passt nicht in die Abzweiglänge ' + P.branch + ' mm');
  }
  /* D1 ≤ D gilt in 26 von 27 Zeilen. AQ1307563 führt 101 gegen 100 —
     ein Millimeter, dokumentiert in data.js §4. Die Schranke lässt das
     zu und meldet alles darüber. */
  if (P.rOutB > P.rOut + 0.75) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Abzweigmuffe D1 = ' +
      P.ODB + ' ist deutlich dicker als der Durchgang D = ' + P.OD);
  }
  return P;
}

function spitzendParams(a) {
  const P = Object.assign({}, a);
  P.bauart = 'spitzende';

  P.half = a.z;                 // Achse → Stirnfläche Durchgang
  P.run = 2 * a.z;
  P.branch = a.z1;              // Achse → Stirnfläche Abzweig
  P.spigot = a.l;               // Länge des dünnwandigen Spitzendes
  P.spigotB = a.l1;

  P.OD = a.d;                   // Spitzende: außen Rohrmaß, keine Muffe
  P.rOut = a.d / 2;
  P.ODB = a.d1;
  P.rOutB = a.d1 / 2;

  P.wallPipe = a.s;             // TABELLIERT, nicht aus SDR gerechnet
  P.wallPipeB = a.s1;
  P.bore = a.d - 2 * a.s;
  P.boreR = P.bore / 2;
  P.boreB = a.d1 - 2 * a.s1;
  P.boreRB = P.boreB / 2;

  /* GEGENPROBE der Wandstärken gegen SDR 11: die Fußnote nennt SDR 11,
     also s = d/11. Bei d160 wären das 14,5 gegen tabellierte 14,6, bei
     d315 28,6 gegen 28,6. Die Tabelle folgt der Norm — das bestätigt
     zugleich, dass s wirklich die Wandstärke ist und nicht etwa ein
     Abstand. */
  P.wallFromSdr = Math.round((a.d / 11) * 10) / 10;
  P.wallDeltaToSdr = Math.round((a.s - P.wallFromSdr) * 10) / 10;

  /* ASSUMPTION Körperwand. Der Katalog bemaßt nur die Wand der
     SPITZENDEN. Die Zeichnung zeigt, dass der Körper dahinter dicker
     ist — sonst hätte die Spalte l (Länge des Spitzendes) keinen Sinn,
     denn es gäbe nichts, wovon sie sich abgrenzt. Angesetzt: 1,55·s,
     mit einem 45°-Übergang. Der Wert ist so gewählt, dass die
     Körperbohrung bei ALLEN zehn Zeilen noch über der Abzweigbohrung
     bleibt — das ist die Bedingung, die ihn nach oben begrenzt. */
  P.wallBody = 1.55 * a.s;
  P.boreBodyR = P.rOut - P.wallBody;
  P.xStep = a.z - a.l;          // Ende des Spitzendes
  P.uebergang = Math.min(P.wallBody - P.wallPipe, 0.5 * P.xStep);

  P.wallBodyB = 1.55 * a.s1;
  P.boreBodyRB = P.rOutB - P.wallBodyB;
  P.yStep = a.z1 - a.l1;

  P.sockTaper = 0;
  P.lead = 0;
  P.filletR = Math.max(3, 0.10 * a.d);
  P.emR = Math.min(2.0, 0.05 * a.d);
  P.wallFitting = P.wallBody;
  P.restwand = P.wallBody;
  P.reduziert = true;

  /* Die Bedingung lautet: die Abzweig-BOHRUNG muss in die Körperbohrung
     münden. Der erste Anlauf verglich mit dem AUSSENdurchmesser des
     Abzweigs und schlug bei 200×160 und 315×250 an — zu Unrecht. Der
     Abzweig sitzt AUF dem Durchgang; sein Mantel muss nicht
     hineinpassen, nur sein Durchfluss. */
  if (P.boreBodyR <= P.boreRB) {
    throw new Error('K-Aqua Reduzier-T ' + a.key + ': Körperbohrung r' +
      P.boreBodyR.toFixed(1) + ' mündet nicht in die Abzweigbohrung r' +
      P.boreRB.toFixed(1));
  }
  if (P.xStep <= 5) {
    throw new Error('K-Aqua Reduzier-T ' + a.key +
      ': zwischen Spitzende und Achse bleibt kein Körper');
  }
  if (P.yStep <= 2) {
    throw new Error('K-Aqua Reduzier-T ' + a.key +
      ': Abzweig-Spitzende reicht bis an die Achse');
  }
  return P;
}
