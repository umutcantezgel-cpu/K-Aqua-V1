/* K-Aqua Übergangsmuffe mit Innengewinde — Parametrik.

   Aus der Tabelle kommen d, Rp, D, D1 und l. Die Gewindemaße kommen
   aus der Normtabelle im Core (threadSpec), die Muffentiefe aus
   fusionDepth — das ist (l − z)/2 der Muffentabelle des Katalogs,
   nicht geschätzt.

   Die Länge teilt sich in drei Abschnitte, alle drei aus belegten
   Zahlen und nicht aus einem Verhältnis:
     Muffe   fusionDepth(d)             Katalog, Muffentabelle
     Steg    der Rest                   ergibt sich
     Messing threadEngage(Rp) + Sitz    Katalog, AG-Tabelle S. 94 */

import { D2R, fusionDepth, threadSpec } from '../../core/index.js';
import { article, threadEngage } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * P.threadPitch;
  P.threadRd = Math.max(0.3, 0.137 * P.threadPitch);
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  P.len = a.l;
  P.xEnd = a.l / 2;                 // +x = Gewindestirn, −x = Muffenmund
  P.OD = a.D;
  P.rCollar = a.D / 2;              // Bund am Gewindeende
  P.rSleeve = a.D1 / 2;             // Muffenteil
  P.wallSleeve = (a.D1 - a.d) / 2;

  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);
  P.wallPipe = a.d / 6;             // SDR 6, wie bei allen Fittings
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);  // Einführfase am Muffenmund
  P.xNenn = -P.xEnd + 1.5;          // Ebene, in der die Muffe auf d liegt

  /* Messingring: nutzbare Gewindetiefe = Einschraubtiefe des Gegen-
     zapfens (Herleitung in data.js), dazu 1,5 mm Sitz unter dem
     Gewinde, damit der Ring am Grund noch Material trägt. */
  P.threadLen = threadEngage(a.Rp);
  P.brassLen = P.threadLen + 1.5;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* Ringwand: 0,14·Gewinde-Außendurchmesser, mindestens 2 mm — und in
     jedem Fall so, dass außen noch 2,5 mm PP stehen bleiben. */
  P.rBrass = Math.min(
    P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD),
    P.rCollar - 2.5,
  );
  P.brassWall = P.rBrass - P.threadOD / 2;

  /* Der Bund umschließt den Ring und läuft 2 mm darüber hinaus. */
  P.collarLen = P.brassLen + 2;
  P.xStep = P.xEnd - P.collarLen;   // Absatz D1 → D
  P.steg = a.l - P.socket - P.brassLen;

  /* Facetten des Mantels, im Katalogfoto sichtbar. Zahl nach derselben
     Regel wie bei der AG-Muffe, hier auf den Bund bezogen, weil er die
     Silhouette trägt. Die Nuten schneiden nach INNEN — D und D1 bleiben
     die größten Maße. */
  P.ribCount = Math.max(10, Math.round((Math.PI * a.D) / 6.5));
  P.ribDepth = Math.max(0.35, a.D * 0.012);

  if (P.wallSleeve < 2.4) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Muffenwand ' +
      P.wallSleeve.toFixed(2) + ' mm zu dünn');
  }
  if (P.brassWall < 1.5) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Ringwand ' +
      P.brassWall.toFixed(2) + ' mm — D = ' + a.D + ' trägt Rp' + a.Rp + ' nicht');
  }
  if (P.steg < 3) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Steg ' +
      P.steg.toFixed(1) + ' mm zwischen Muffengrund und Ring zu kurz');
  }
  if (P.xStep <= -P.xEnd + P.socket) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key +
      ': der Bund reicht in die Schweißmuffe');
  }
  if (P.threadCore <= P.bore) {
    throw new Error('K-Aqua Übergangsmuffe IG ' + a.key + ': Gewindekern ' +
      P.threadCore.toFixed(2) + ' liegt nicht über der Bohrung ' + P.bore.toFixed(2));
  }
  return P;
}
