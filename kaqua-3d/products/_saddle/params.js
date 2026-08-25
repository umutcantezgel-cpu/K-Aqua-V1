/* K-Aqua Anbohrsättel — gemeinsame Parametrik.

   Koordinaten: Hauptrohrachse auf X, Abzweigachse auf Y (nach oben),
   Nullpunkt in der Rohrachse. Die Höhe h zählt ab der ROHROBERFLÄCHE,
   also ab y = mainR.

   ── DIE EINZIGE WIRKLICHE ANNAHME: WELCHES ROHR? ──

   Die Spalte d ist ein Bereich („40 - 63"). Ein Sattel hat eine
   gekrümmte Unterseite; der Katalog sagt nicht, auf welchen Durchmesser
   sie gekrümmt ist. Die Frage ist nicht kosmetisch — die Satteltiefe
   ändert sich über den Bereich um mehr als das Anderthalbfache.

   Angesetzt ist das GRÖSSTE Rohr der Gruppe, und das ist keine
   Geschmacksfrage, sondern folgt aus dem Spaltmaß. Legt man einen
   Sattel mit Unterseitenradius Rs auf ein Rohr mit Radius Rr, so
   beträgt der Spalt im Abstand z von der Scheitellinie

       (z² / 2) · (1/Rr − 1/Rs)

   Ist der Sattel ENGER als das Rohr (Rs < Rr), wird das negativ: er
   liegt auf seinen Rändern auf und HEBT IN DER MITTE AB — genau dort,
   wo die Bohrung sitzt und wo die Schweißnaht dicht sein muss. Ist er
   weiter (Rs > Rr), liegt er in der Mitte an, und der Spalt wandert an
   den Rand, wo ihn die Schmelze schließt.

   Rs muss also für JEDES Rohr der Gruppe mindestens so groß sein wie
   das Rohr — das ist erfüllt, wenn Rs das größte der Gruppe ist.

   Bei der Gruppe 40–63 ergibt das eine Satteltiefe von 2,6 mm statt
   4,4 mm bei der Gegenannahme. Die Zahl steht im Prüfbericht, damit
   sichtbar bleibt, was von dieser Annahme abhängt. */

import { D2R, fusionDepth, socketOD, threadSpec } from '../../core/index.js';
import { rohrgruppe } from './data-gemeinsam.js';
import { satteltiefe } from './parts.js';

export function sattelParams(a, cfg) {
  const P = Object.assign({}, a);
  const gruppe = rohrgruppe(a.bereich);
  P.rohrMin = gruppe.min;
  P.rohrMax = gruppe.max;

  /* ANNAHME, begründet im Kopfkommentar. */
  P.mainD = gruppe.max;
  P.mainR = P.mainD / 2;
  P.mainDGegen = gruppe.min;
  P.satteltiefe = Math.round(satteltiefe(P.mainR, a.d2 / 2) * 100) / 100;
  P.satteltiefeGegen = Math.round(satteltiefe(gruppe.min / 2, a.d2 / 2) * 100) / 100;

  P.rFuss = a.d2 / 2;                 // Bohrung im Hauptrohr
  P.h = a.h;
  P.yTop = P.mainR + a.h;             // Stirnfläche des Abzweigs

  /* ANNAHME Schürzenbreite. Nicht bemaßt — weder in der Tabelle noch in
     einer der drei Zeichnungen. Zwei Schranken halten sie fest:

       · sie muss die Bohrung mit Schweißfläche umgeben,
       · sie darf das Rohr seitlich nicht überragen.

     Dazwischen entscheidet das Produktfoto. Am Bild ist der Bogen FLACH:
     Sehne rund 160 px bei einer Stichhöhe von rund 18 px, das ergibt
     einen Sitzdurchmesser von etwa dem Zwei- bis Dreifachen der
     Schürzenbreite. Bei der Gruppe 40–63 mit ihrer 25-mm-Bohrung führt
     das auf eine Schürze von gut 30 mm. Ein erster Entwurf mit
     0,35·d2 Zugabe kam auf 42 mm und damit auf ein Verhältnis von 1,5 —
     das wäre ein deutlich tieferer Trog, als das Foto zeigt.

     Die obere Schranke ist der SITZRADIUS, nicht ein Bruchteil davon:
     jenseits davon verlöre die Schnittgleichung ihre Lösung, die
     Schürze liefe über den Äquator ihres eigenen Sitzzylinders hinaus.
     Ein erster Entwurf begrenzte auf 0,55·R und schlug ausgerechnet bei
     AQ270S406334 an — der Größe, für die auf S. 115 auch das
     Schweißwerkzeug fehlt (40–63 × 32). Ein 32-mm-Loch in einem 40er
     Rohr braucht eine breite Schürze; das Verhältnis fällt dort auf
     1,5 und damit unter das am Foto gemessene. Die Zahl steht im
     Prüfbericht, denn sie zeigt dieselbe Auffälligkeit von der
     geometrischen Seite. */
  P.rTeller = Math.min(P.rFuss + Math.max(4, 0.16 * a.d2), 0.80 * P.mainR);
  P.schuerzeBreite = Math.round(2 * P.rTeller * 10) / 10;
  P.sitzVerhaeltnis = Math.round((P.mainD / (2 * P.rTeller)) * 100) / 100;
  P.tellerDicke = Math.max(3, 0.14 * a.d2);

  /* Abzweigseite. Bei der Muffenversion aus der Muffentabelle des
     Katalogs (socketOD im Core), bei den Gewindeversionen aus der
     Normreihe plus Wand. */
  if (cfg.art === 'muffe') {
    P.d1 = a.d1;
    P.socket = fusionDepth(a.d1);
    if (!P.socket) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': keine Schweißtiefe für d' + a.d1);
    P.bossOD = socketOD(a.d1);
    if (!P.bossOD) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': kein Muffen-Außendurchmesser für d' + a.d1);
    P.boreOben = a.d1;
    P.wallPipe = a.d1 / 6;
    P.bore = a.d1 - 2 * P.wallPipe;
  } else {
    const th = threadSpec(a.gewinde);
    if (!th) throw new Error('K-Aqua Anbohrsattel ' + a.code + ': kein Normmaß für Gewinde ' + a.gewinde);
    P.gewindeArt = cfg.gewindeArt;          // 'Rp' oder 'R'
    P.threadOD = th.od;
    P.threadPitch = th.pitch;
    P.threadH = 0.640327 * th.pitch;
    P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
    P.threadRd = Math.max(0.3, 0.137 * th.pitch);
    P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;
    /* Der Messingteil sitzt im PP-Körper; der Bund darüber muss ihn
       fassen. ANNAHME: 0,32·Gewinde-Außendurchmesser Wand, wie bei der
       Übergangsmuffe mit Innengewinde. */
    P.ringOD = th.od + 2 * Math.max(2.0, 0.14 * th.od);
    P.bossOD = P.ringOD + 2 * Math.max(2.5, 0.10 * th.od);
    P.ringLen = cfg.gewindeArt === 'Rp' ? Math.min(a.h * 0.45, 18) : Math.min(a.h * 0.42, 16);
    P.turns = Math.max(3, Math.floor((P.ringLen - 1.6) / th.pitch));
    P.bore = Math.min(P.threadCore - 2, a.d2 - 6);
    P.boreOben = P.threadCore;
  }
  P.rBoss = P.bossOD / 2;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  if (P.rTeller <= P.rFuss + 3) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Fußteller r' +
      P.rTeller.toFixed(1) + ' umgibt die Bohrung r' + P.rFuss.toFixed(1) +
      ' mit weniger als 3 mm Schweißfläche');
  }
  if (P.rTeller >= P.mainR) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code +
      ': Fußteller ragt seitlich über das Rohr hinaus');
  }
  if (cfg.art === 'muffe' && P.socket + 4 >= a.h) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Muffentiefe ' +
      P.socket + ' passt nicht in die Höhe ' + a.h);
  }
  if (P.boreR >= P.rFuss) {
    throw new Error('K-Aqua Anbohrsattel ' + a.code + ': Durchgang r' +
      P.boreR.toFixed(1) + ' ist weiter als die Bohrung r' + P.rFuss.toFixed(1));
  }
  return P;
}
