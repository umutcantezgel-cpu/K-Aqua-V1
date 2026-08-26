/* K-Aqua Überbögen — gemeinsame Parametrik.

   Zwei Produkte, eine Bahn: das Fitting mit Schweißmuffen an beiden
   Enden (AQ287) und das gebogene Rohr mit Spitzenden (AQ285). Beide
   führen ein Rohr über ein kreuzendes hinweg, beide haben ihre Enden in
   einer Flucht, beide brauchen deshalb VIER Bögen. Die Bahn selbst
   rechnet `bridgePath` im Core.

   ── H IST DIE BAUHÖHE, NICHT DIE ACHSANHEBUNG ──

   Beide Maßskizzen auf S. 91 spannen H über das GANZE Teil: von der
   Unterkante des Anschlusses bis zur Oberkante des Scheitels. Was
   `bridgePath` braucht, ist aber die Anhebung der ACHSE. Der Unterschied
   ist der halbe Anschlussdurchmesser unten plus der halbe
   Scheiteldurchmesser oben — und der ist bei den beiden Produkten
   verschieden, weil das Fitting unten eine Muffe trägt und das Rohr
   nicht.

   Diese Umrechnung steht hier und nicht in den Produkten: zweimal
   geschrieben würde sie driften (Fall 32).

   ── DIE MASSE ENTSCHEIDET, WELCHE DEUTUNG GILT ──

   Für H kamen drei Lesarten in Frage. Die Maßskizze legt die erste nahe
   (die Pfeile enden an der Unterkante der Muffe und an der Oberkante des
   Scheitels), aber diese Skizzen haben sich in diesem Katalog schon als
   maßstabslos erwiesen. Entschieden hat es die tabellierte MASSE: aus
   der Bahnlänge und den Querschnitten lässt sich das Gewicht rechnen,
   und nur eine Lesart trifft es.

       Deutung von H                d20      d25      d32
       Bauhöhe                     −7,5 %   +8,3 %   +0,8 %
       Achse bis Scheitelspitze   +15 %    +38 %    +32 %
       Achsanhebung               +43 %    +75 %    +70 %

   Die erste liegt in allen drei Zeilen innerhalb der Rundung einer auf
   zwei Nachkommastellen angegebenen Kilogrammzahl. Die beiden anderen
   sind systematisch zu schwer, und zwar zunehmend mit der Größe — das
   ist die Handschrift eines zu langen Bogens, nicht die einer Rundung.

   Die Rechnung läuft unten als P.kgGerechnet mit und steht damit in
   jedem Prüfbericht.

   ── WAS DABEI AUFFÄLLT UND NICHT AUFGELÖST IST ──

   Mit dieser Deutung bleibt unter dem Scheitel nur wenig Luft: 3,8 mm
   bei d20 bis 5,3 mm bei d32, also rund ein Fünftel der Nennweite. Ein
   kreuzendes Rohr GLEICHER Nennweite passt da nicht hindurch — dafür
   bräuchte es mehr als den halben Rohrdurchmesser.

   Naheliegend wäre gewesen, daraus auf eine andere Lesart von H zu
   schließen. Die Masse verbietet das. Der Überbogen überquert also
   entweder etwas Dünneres als ein gleich großes Rohr, oder die beiden
   Rohre liegen ohnehin schon versetzt und er überbrückt nur den Rest.
   NICHT aufgelöst; die lichte Höhe wird als P.durchlass mitgeführt,
   damit die Zahl im Bericht steht statt in einer Vermutung. */

import { D2R, fusionDepth, socketOD } from '../../core/index.js';

export function crossoverParams(a, cfg) {
  const P = Object.assign({}, a);
  const d = a.d;

  P.len = a.L;
  P.hoehe = a.H;
  P.wallPipe = cfg.art === 'rohr' ? a.s : d / 6;
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);

  /* Der Scheitel führt bei beiden Produkten das Rohrmaß. */
  P.scheitelOD = cfg.art === 'rohr' ? d : d + 2 * P.wallPipe;
  P.rScheitel = P.scheitelOD / 2;

  if (cfg.art === 'rohr') {
    /* Spitzenden: unten liegt das Rohr selbst an. */
    P.endOD = d;
    P.socket = 0;
    /* ANNAHME gerade Endstrecke. Nicht bemaßt. Angesetzt 0,35·L —
       NACHGESCHÄRFT am 25.08.2026 gegen den ALH-Seitenriss (M6): die
       Parallellage des Renders ist über die Rohrdicke links = rechts
       BEWIESEN, und der Hügel nimmt dort 30,5 % der Länge ein, also
       t ≈ (1 − 0,305)/2 ≈ 0,35·L. Der frühere Wert 0,27·L stammte aus
       der maßstabslosen Skizze. Achtung B1: die Renderproportionen
       gehören zur d32-Zeile — der HÜGELANTEIL ist aber über die drei
       Größen nahezu konstant (L wächst kaum, H moderat), deshalb trägt
       die Übernahme auf alle drei.

       VERSUCHT UND VERWORFEN, sie aus der Masse herzuleiten. Die Idee
       war richtig, die Empfindlichkeit reicht nicht: die Bahnlänge
       wächst bei d20 von 371 mm (t = 0) auf nur 382 mm (t = 100), also
       um drei Prozent über den ganzen plausiblen Bereich. Eine auf zwei
       Nachkommastellen gerundete Kilogrammzahl kann daraus nichts
       festlegen. Die Masse bestätigt den Gesamtmaßstab — mehr nicht, und
       das steht hier, damit niemand die Rechnung für schärfer hält als
       sie ist.

       Was an der Annahme hängt, ist der Biegeradius. Er wird unten
       mitgeführt; bleibt er über dem Rohrdurchmesser, ist die Annahme
       wenigstens fertigbar. */
    P.tEnde = 0.35 * a.L;
  } else {
    P.endOD = socketOD(d);
    if (!P.endOD) throw new Error('K-Aqua Überbogen d' + d + ': kein Muffen-Außendurchmesser');
    P.socket = fusionDepth(d);
    if (!P.socket) throw new Error('K-Aqua Überbogen d' + d + ': keine Schweißtiefe');
    /* Die Tabelle führt t — die gerade Strecke am Ende. */
    P.tEnde = a.t;
  }
  P.rEnd = P.endOD / 2;

  /* Umrechnung Bauhöhe → Achsanhebung. */
  P.hAchse = a.H - P.rEnd - P.rScheitel;

  if (P.hAchse <= 1) {
    throw new Error('K-Aqua Überbogen d' + d + ': Bauhöhe ' + a.H +
      ' lässt nach Abzug der Anschlüsse nur ' + P.hAchse.toFixed(1) +
      ' mm Achsanhebung — die Deutung von H kann nicht stimmen');
  }

  /* Was bridgePath daraus macht, hier zur Probe nachgerechnet. */
  const half = a.L / 2 - P.tEnde;
  P.bogenWinkel = Math.round((2 * Math.atan2(P.hAchse, half)) / D2R * 10) / 10;
  P.bogenR = Math.round((P.hAchse / (2 * (1 - Math.cos(P.bogenWinkel * D2R)))) * 10) / 10;
  P.bogenRJeD = Math.round((P.bogenR / d) * 100) / 100;

  /* Lichte Höhe unter dem Scheitel. KEIN Wächter, nur eine Zahl: was
     dort hindurchpassen soll, sagt der Katalog nicht, und eine Schranke
     ohne Beleg wäre eine Vermutung mit Abbruchrecht. */
  P.durchlass = Math.round((P.hAchse - P.rScheitel) * 10) / 10;
  P.durchlassJeD = Math.round((P.durchlass / d) * 100) / 100;

  /* ── Massenprobe ──
     Die Bahnlänge ist 2t + 4·R·α. Mit den Querschnitten ergibt das ein
     Gewicht, das gegen die Tabelle steht. PP-R hat 0,9 g/cm³. */
  const bahnLen = 2 * P.tEnde + 4 * P.bogenR * (P.bogenWinkel * D2R);
  P.bahnLen = Math.round(bahnLen * 10) / 10;
  const aRohr = (Math.PI / 4) * (P.scheitelOD ** 2 - P.bore ** 2);
  const aMuffe = cfg.art === 'muffe'
    ? (Math.PI / 4) * (P.endOD ** 2 - d ** 2) : 0;
  const vol = 2 * P.socket * aMuffe + (bahnLen - 2 * P.socket) * aRohr;
  P.kgGerechnet = Math.round((vol * 0.9) / 1e6 * 1000) / 1000;
  P.kgAbweichung = a.kg ? Math.round((P.kgGerechnet / a.kg - 1) * 1000) / 10 : null;

  if (half <= 1) {
    throw new Error('K-Aqua Überbogen d' + d + ': die geraden Enden lassen keinen Platz für den Bogen');
  }
  /* Die Massenprobe ist die schärfste Zusicherung, die dieses Produkt
     hat — sie prüft Bahn, Querschnitte und die Deutung von H auf einmal.
     Zwanzig Prozent lassen Rundung und Formteilzugaben zu; darüber
     stimmt etwas Grundsätzliches nicht. */
  if (P.kgAbweichung != null && Math.abs(P.kgAbweichung) > 20) {
    throw new Error('K-Aqua Überbogen d' + d + ': gerechnete Masse ' +
      P.kgGerechnet + ' kg weicht um ' + P.kgAbweichung + ' % von der Tabelle (' +
      a.kg + ' kg) ab — Bahn oder Deutung von H stimmen nicht');
  }
  if (cfg.art === 'muffe' && P.socket >= P.tEnde + 2) {
    throw new Error('K-Aqua Überbogen d' + d + ': Muffentiefe ' + P.socket +
      ' passt nicht in die gerade Endstrecke ' + P.tEnde);
  }
  if (P.bogenR < 0.6 * d) {
    throw new Error('K-Aqua Überbogen d' + d + ': Bogenradius ' + P.bogenR +
      ' ist enger als 0,6·d — so eng lässt sich das nicht formen');
  }
  return P;
}
