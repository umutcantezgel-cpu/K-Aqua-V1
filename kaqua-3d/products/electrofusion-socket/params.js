/* K-Aqua Elektroschweißmuffe — Parametrik.

   Zwei Maße, die anderswo geschätzt werden müssten, sind hier
   ABGELEITET: der Stiftüberstand aus h − D und die Anschlagbreite aus
   L − 2·L₁. Beide Eingänge stehen in der Tabelle.

   ASSUMPTION bleiben nur die Kontaktdome selbst — Durchmesser und Lage.
   Die Tabelle bemaßt sie nicht. Angesetzt aus der Maßzeichnung, in
   Anteilen von D bzw. L; die Zeichnung ist dabei nicht maßstäblich (ihr
   d/D liegt bei 0,85 und trifft damit nur die großen Zeilen), sie
   ordnet aber Lage und Größenordnung zu. */

import { D2R, fusionDepth } from '../../core/index.js';
import { article, SDR } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  P.OD = a.D;
  P.rOut = a.D / 2;
  P.len = a.L;
  P.xEnd = a.L / 2;
  P.socket = a.L1;
  P.wallFitting = (a.D - a.d) / 2;
  P.restwand = P.wallFitting;

  /* Anschlag in der Mitte, Breite aus der Tabelle. Bei d250 und d315
     ist sie null — dort läuft die Bohrung durch. */
  P.stop = Math.round((a.L - 2 * a.L1) * 100) / 100;
  if (P.stop < 0) {
    throw new Error('K-Aqua ' + a.key + ': L − 2·L₁ = ' + P.stop +
      ' mm — die Einstecktiefen überschneiden sich');
  }
  P.xStop = P.stop / 2;
  P.hasStop = P.stop > 0.05;

  P.wallPipe = a.d / SDR;
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  /* Anders als bei der Schweißmuffe KEIN Muffenkonus: das Rohr wird
     nicht eingepresst, sondern eingeschoben und dann verschweißt. Die
     Zeichnung zeigt eine zylindrische Bohrung. Nur die Einführfase
     bleibt. */
  P.sockTaper = 0;
  P.lead = 2 * Math.tan(15 * D2R);

  /* Stiftüberstand über dem Mantel — abgeleitet, nicht geschätzt. */
  P.termProud = Math.round((a.h - a.D) * 100) / 100;
  if (P.termProud < 0) {
    throw new Error('K-Aqua ' + a.key + ': h − D = ' + P.termProud +
      ' mm — die Gesamthöhe läge unter dem Außendurchmesser');
  }
  /* ── ASSUMPTION Kontaktdome — KORRIGIERT beim ersten Maßtest ──
     Zuerst am Außendurchmesser bemessen (Ø 0,22·D). Das geht bei den
     kleinen Größen durch und bricht bei den großen: bei d315 ist D
     372,5 mm, L aber nur 240 — die Dome ragten 21,8 mm über die
     Stirnflächen hinaus, und der Maßtest las L = 261,78 statt 240.

     Sie skalieren mit der LÄNGE, nicht mit dem Durchmesser. In der
     Maßzeichnung misst ein Dom rund 0,22 der Körperlänge und sitzt bei
     0,36·L ab der Mitte. Damit bleibt sein äußerer Rand in jeder der
     14 Zeilen auf dem Körper — geprüft, nicht gehofft, siehe Wächter. */
  P.termR = Math.round(0.11 * a.L * 100) / 100;
  P.termX = Math.round(0.36 * a.L * 100) / 100;
  if (P.termX + P.termR > P.xEnd - 0.8) {
    throw new Error('K-Aqua ' + a.key + ': Kontaktdom reicht bis ' +
      (P.termX + P.termR).toFixed(1) + ' mm, die Stirnfläche liegt bei ' +
      P.xEnd.toFixed(1) + ' mm');
  }

  P.emR = Math.min(2.0, 0.055 * a.d);
  P.cornerR = Math.min(2.5, P.wallFitting * 0.35);

  /* Gegenprobe: die Einstecktiefe gegen die Normreihe. Bei der
     Elektroschweißmuffe ist sie ABSICHTLICH tiefer als beim
     Muffenschweißen — die Heizwendel braucht Länge. Der Wert wandert in
     den Prüfbericht, er steuert nichts. */
  P.normDepth = fusionDepth(a.d);
  P.depthDeltaToNorm = P.normDepth == null ? null
    : Math.round((a.L1 - P.normDepth) * 10) / 10;

  return P;
}
