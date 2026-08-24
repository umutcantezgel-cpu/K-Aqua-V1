/* K-Aqua T-Stück 90° mit Gewinde im Abzweig — gemeinsame Parametrik.

   Zwei Produkte teilen sie:
     tee-90-female-thread   Rp, Messingring bündig    AQ130Gxxxx
     tee-90-male-thread     R,  Messingzapfen mit SW  AQ133Gxxxx

   Quellen und Spaltendeutung: pruefung/w4-tee-gewinde-phase1.md.
   Beide Zeichnungen liegen als zweite Miniatur unter dem Produktfoto.

   ── DIE BEIDEN SEITEN BENENNEN DIESELBE KANTE VERSCHIEDEN ──

   Die Innengewindeseite nennt die Höhe des PP-R-Körpers am Abzweig `h`,
   die Außengewindeseite nennt sie `l1`:

     fem  d20 Rp1/2  h  = 33        male d20 R1/2  l1 = 34
     fem  d25 Rp1/2  h  = 37        male d25 R1/2  l1 = 38

   Ein Millimeter Unterschied bei sonst gleichen d, D, l und z — das ist
   dieselbe Kante. Hier heißt sie einheitlich `ppTop`; welcher Buchstabe
   auf welcher Seite gedruckt steht, führt DIMENSION_KEY je Produkt.
   Fall 19: ein Begriff, der an zwei Stellen entsteht, driftet.

   ── DIE ZWEITE SPALTE z1 BEDEUTET JE VARIANTE ETWAS ANDERES ──

     fem   z1 = Achse Durchgang bis SCHULTER, wo der Messingring beginnt
           h − z1 = 13 · 13 · 15 · 15 · 18 — wächst mit dem Gewinde
     male  z1 = Achse Durchgang bis GEWINDESPITZE
           z1 − l1 = 15 · 15 · 15 · 15 — konstant, der Messingzapfen
           ist über beide Nennweiten und beide Gewinde derselbe

   Beide Deutungen sind über alle Zeilen durchgerechnet (Fall 28). Die
   Vorzeichen sind durchgehend positiv; keine Zeile bricht aus.

   ── l − z TRIFFT DIE NORMREIHE ──

     d20  28 − 14 = 14      Normreihe DVS 2207-11: 14,5
     d25  31 − 16 = 15  ·  32 − 16 = 16                16,0
     d32  38 − 20 = 18                                 18,0

   Die Muffentiefe kommt wie überall aus fusionDepth(d), der
   Tabellenwert wandert als socketFromTable in den Prüfbericht (Fall 4). */

import { D2R, fusionDepth } from '../../core/index.js';

/* R nach ISO 7-1 (kegelig), Rp nach ISO 228-1 (zylindrisch). */
export const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
};

/* Muffen-Außendurchmesser aus products/socket/data.js, Spalte D.
   Dient nur der Gegenprobe des Widerspruchs bei d25 (siehe unten). */
export const SOCKET_OD = { 20: 29, 25: 35, 32: 44 };

export function teeThreadParams(a, cfg) {
  const kind = cfg.threadKind;                 // 'R' oder 'Rp'
  const P = Object.assign({}, a);
  const d = a.d;
  const gewinde = kind === 'R' ? a.R : a.Rp;

  const th = THREAD[gewinde];
  if (!th) throw new Error('K-Aqua Gewinde-T-Stück: kein Normmaß für ' + kind + gewinde);
  P.threadKind = kind;
  P.threadLabel = gewinde;
  P.threadOD = th.od;
  P.threadPitch = th.pitch;
  P.threadH = 0.640327 * th.pitch;
  P.threadCore = Math.round((th.od - 2 * P.threadH) * 1000) / 1000;
  P.threadRd = Math.max(0.3, 0.137 * th.pitch);
  P.threadRootRise = Math.round(2 * P.threadRd * (1 / Math.sin(27.5 * D2R) - 1) * 1000) / 1000;

  /* Durchgang. l ist die HALBE Baulänge (Achse bis Stirnfläche), anders
     als beim reinen T-Stück, wo L die Gesamtlänge führt. */
  P.half = a.l;
  P.run = 2 * a.l;
  P.OD = a.D;
  P.rOut = a.D / 2;
  P.wallFitting = (a.D - d) / 2;

  P.socket = fusionDepth(d);
  if (!P.socket) throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': keine Schweißtiefe in der Normreihe');
  P.socketFromTable = a.l - a.z;
  P.depthDeltaToNorm = Math.round((P.socketFromTable - P.socket) * 10) / 10;

  P.wallPipe = d / 6;                          // SDR 6
  P.bore = d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;
  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;
  P.emR = Math.min(2.0, 0.05 * d);
  /* Lage des Mundlochbunds. D liegt AUF diesem Bund; davor zieht die
     Entformungsschräge, dahinter die Stirnfase. Der Maßtest tastet
     genau hier ab (Fall 15: am Nennmaßort messen). runProfile in
     ../_tee/parts.js übernimmt den Wert. */
  P.xBell = P.half - Math.max(3, 0.10 * P.socket);
  /* ASSUMPTION Kehlenradius, übernommen aus products/_tee/params.js. */
  P.filletR = Math.max(1.5, 0.18 * d);

  /* Abzweig. */
  P.ppTop = kind === 'R' ? a.l1 : a.h;
  if (kind === 'R') {
    P.threadTip = a.z1;
    P.brassStick = Math.round((a.z1 - a.l1) * 10) / 10;
    /* ASSUMPTION Einbettung des Messingzapfens: 0,62·Gewinde-Ø. Der
       Faktor kommt aus der Innengewindevariante, wo die Ringhöhe
       tabelliert ist — h − z1 gegen threadOD ergibt 0,62 · 0,62 · 0,57
       · 0,57 · 0,54. Genommen wird der Wert der kleinen Gewinde, weil
       nur 1/2" und 3/4" in dieser Tabelle vorkommen. */
    P.brassEmbed = Math.round(0.62 * P.threadOD * 10) / 10;
    P.brassBottom = P.ppTop - P.brassEmbed;
    P.brassTop = a.z1;
    /* ASSUMPTION Schlüsselweite. Die Zeichnung zeigt einen Sechskant am
       Zapfen und beschriftet ihn SW; die Tabelle führt ihn NICHT.
       Angesetzt 1,32·Gewinde-Ø — der Faktor, den der Gewindeadaptor bei
       denselben Gewinden zeigt. Am Originalteil zu prüfen. */
    P.afHex = Math.round(1.32 * P.threadOD * 10) / 10;
    P.hexFillet = Math.max(0.3, P.afHex * 0.03);
    P.cornerHex = Math.round((2 * (P.afHex / Math.sqrt(3)
      - (1 / Math.sin(60 * D2R) - 1) * P.hexFillet)) * 100) / 100;
    P.hexLen = Math.round(Math.max(4, P.brassStick * 0.42) * 10) / 10;
  } else {
    P.brassBottom = a.z1;
    P.brassTop = a.h;
    P.brassRing = Math.round((a.h - a.z1) * 10) / 10;
    P.threadTip = a.h;
  }
  P.branchTotal = kind === 'R' ? P.threadTip : P.ppTop;

  /* Gänge über die tragende Gewindelänge, mindestens drei. */
  P.threadLen = kind === 'R' ? P.brassStick - (P.hexLen ?? 0) - 1.2 : P.brassRing - 2.0;
  P.turns = Math.max(3, Math.floor((P.threadLen - 0.6) / P.threadPitch));

  /* Außendurchmesser des Messingteils im PP-Körper. */
  P.brassOD = Math.min(P.OD - 2.2, P.threadOD + 2 * Math.max(2.2, 0.09 * P.threadOD));
  P.brassR = P.brassOD / 2;

  /* ── Zusicherungen ── */
  if (P.restwand < 3) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Restwand ' +
      P.restwand.toFixed(2) + ' mm < 3 mm');
  }
  if (P.socket >= P.half) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Muffentiefe ' + P.socket +
      ' mm passt nicht in den halben Durchgang ' + P.half.toFixed(1) + ' mm');
  }
  if (!(P.brassBottom > P.rOut * 0.5)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Messingteil beginnt bei ' +
      P.brassBottom.toFixed(1) + ' mm und ragt in den Durchgang');
  }
  if (!(P.brassOD < P.OD - 2)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Messing-Ø ' +
      P.brassOD.toFixed(1) + ' sprengt den Abzweig Ø' + P.OD);
  }
  if (P.threadLen < P.threadPitch * 3) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Gewindelänge ' +
      P.threadLen.toFixed(1) + ' mm trägt kein Gewinde ' + kind + gewinde);
  }
  if (kind === 'Rp' && !(P.threadCore > P.bore * 0.5)) {
    throw new Error('K-Aqua Gewinde-T-Stück d' + d + ': Innengewindekern Ø' +
      P.threadCore.toFixed(2) + ' unplausibel');
  }
  /* Der Widerspruch in D bei d25: die Innengewindetabelle führt 35 und
     34, die Muffentabelle 35. Nicht geworfen — nur vermerkt, damit er
     im Prüfbericht auftaucht (Fall 31: dokumentieren, nicht nachgeben). */
  P.socketTableOD = SOCKET_OD[d] ?? null;
  P.odDeltaToSocket = P.socketTableOD == null ? null
    : Math.round((a.D - P.socketTableOD) * 10) / 10;
  return P;
}
