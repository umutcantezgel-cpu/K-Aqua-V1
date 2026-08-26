/* K-Aqua Verstellbarer Batterieanschluss — Parametrik.

   Die Verstellung L = 100…150 ist als Variantenachse gebaut (drei
   Stellungen aus der Tabelle). Der Bockdurchmesser folgt derselben
   Gegenprobe wie beim festen Batterieanschluss: die ½"-Griffzone der
   Gewindereihe (D = 35). */

import { D2R, fusionDepth, socketOD, threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params(dNom, L) {
  const a = article(dNom);
  const P = Object.assign({}, a);
  const { d } = a;

  const th = threadSpec(a.Rp);
  if (!th) throw new Error('K-Aqua Batterie (verstellbar): kein Normmaß für Rp' + a.Rp);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadCore = Math.round((th.od - 2 * 0.640327 * th.pitch) * 100) / 100;

  P.L = L ?? a.Lmax;
  /* Mundabstand folgt der Stellung; die GESAMTLÄNGE rechnet der Index
     aus Mundabstand und Schienenüberstand (data.js). */
  P.mundAbstand = a.L1 - (a.Lmax - P.L);
  P.len = P.mundAbstand;
  P.xEnd = P.mundAbstand / 2;
  P.xAchse = P.L / 2;

  P.blockOD = 35;                          // ½"-Griffzone, wie AQ490G belegt
  P.rBlock = P.blockOD / 2;
  /* Sechskant der Griffzone (Foto): Schlüsselweite = blockOD·cos30°. */
  P.afBlock = Math.round(P.blockOD * Math.cos(30 * D2R) * 10) / 10;

  P.socket = fusionDepth(d) ?? Math.max(10, d * 0.55);
  P.sockOD = socketOD(d) ?? Math.round(d * 1.45);
  P.rSock = P.sockOD / 2;
  P.wallPipe = d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* ASSUMPTION Schienenaufbau, aus dem Foto: Rohr-Außen = d (die
     Schiene IST ein Rohrstück), die beiden Schienen liegen mit
     Achsabstand ~1,15·d übereinander; Muffenkörper an den Außenenden;
     Bockhöhe über der Schienenachse = 24 mm. */
  P.rohrOD = d;
  /* Schienenwand d/4 statt Druckrohr-d/6: die Schiene ist ein
     Führungsteil, das Foto zeigt dickwandige Enden — und die
     Massenprobe verlangt es (erster Wurf −29 %). */
  P.schienenWand = d / 4;
  P.schienenBore = d - 2 * P.schienenWand;
  P.schienenAbstand = Math.round(1.15 * d * 10) / 10;
  P.muffH = P.socket + 14;
  P.bockH = 24;
  P.bockLen = Math.round(P.blockOD * 0.9);
  P.ringLen = Math.round(P.bockLen * 0.55);
  P.rRing = Math.min(P.threadOD / 2 + Math.max(2.0, 0.14 * P.threadOD), P.rBlock - 2.5);
  P.turns = Math.max(4, Math.floor((P.ringLen - 2) / P.threadPitch));

  P.fussH = 9; P.fussB = 14; P.fussT = 4;

  if (P.L < a.Lmin || P.L > a.Lmax) {
    throw new Error('K-Aqua Batterie (verstellbar) d' + d + ': Stellung L=' + P.L +
      ' liegt außerhalb ' + a.Lmin + '…' + a.Lmax);
  }
  return P;
}
