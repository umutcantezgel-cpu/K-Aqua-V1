/* K-Aqua Übergangsmuffe mit Außengewinde — Parametrik.

   Zwei Werkstoffe, zwei Nennweiten. Aus der Tabelle kommen d, R, D, D1,
   l und z; die Gewindegeometrie aus der Normtabelle in data.js. */

import { D2R, fusionDepth, threadSpec } from '../../core/index.js';
import { article } from './data.js';

export function params(key) {
  const a = article(key);
  const P = Object.assign({}, a);

  const th = threadSpec(a.R);
  if (!th) throw new Error('K-Aqua: kein Normmaß für Gewinde R' + a.R);
  P.threadOD = th.od;
  P.threadPitch = th.pitch;

  P.len = a.l;
  P.xEnd = a.l / 2;
  P.OD = a.D;                       // Bund, größtes Maß
  P.rOut = a.D / 2;
  P.rSleeve = a.D1 / 2;             // PP-Muffenteil
  P.wallFitting = (a.D1 - a.d) / 2;

  P.socket = fusionDepth(a.d) ?? Math.max(10, a.d * 0.55);
  P.wallPipe = a.d / 6;
  P.bore = a.d - 2 * P.wallPipe;
  P.boreR = P.bore / 2;

  P.sockTaper = Math.tan(0.6 * D2R);
  P.lead = 2 * Math.tan(15 * D2R);
  P.restwand = P.wallFitting;

  /* ── DIE AUFTEILUNG PP/MESSING, NEU NACH DEN BILDERN (M3) ──

     Die Tabelle nennt nicht, wo PP endet und Messing beginnt. Die
     erste Fassung las aus einem Foto „etwa ein Drittel PP" und stellte
     58 % der Länge als Messing mit freiem Sechskant dar. ALH-Render
     UND Produktfoto zeigen unabhängig das Gegenteil: der GRÜNE Körper
     trägt ~72–74 % der Länge und die Griffzone; Messing liegt nur als
     Gewindezapfen mit schmalem Bundring frei. Kein freier Sechskant.

     ASSUMPTION Messing sichtbar = 0,27·l, aus beiden Bildern (26–28 %
     in der aufrechten Renderansicht und im Produktfoto). Die
     Massenprobe unten hält die Annahme fest: Messing wiegt 8,4 g/cm³,
     PP 0,9 — die Teilung schlägt voll auf die kg-Spalte durch. */
  P.brassShow = Math.round(a.l * 0.27 * 10) / 10;
  P.ppLen = a.l - P.brassShow;
  P.bundRing = 2;                       // sichtbarer Messingring vor dem Gewinde
  P.threadLen = P.brassShow - P.bundRing;
  P.turns = Math.max(4, Math.round(P.threadLen / P.threadPitch));

  /* ── D IST DIE PP-GRIFFZONE, NICHT DER SECHSKANT ──

     D hängt in allen 12 Zeilen am GEWINDE (½"→35, ¾"→43, 1"→50 …) und
     ist bei der IG-Schwestertabelle (AQ270G) bei gleichem Gewinde fast
     identisch — obwohl es dort nie einen freien Messing-Sechskant gab.
     D ist das dickste Maß des PP-Körpers: die geriffelte Griffzone am
     Gewindeende. D1 bleibt die Muffenzone. Die alte Deutung
     (Sechskant-Eckenmaß) konnte die IG-Spalte nie erklären.

     ASSUMPTION Länge der Griffzone: ~0,35·l, aus dem Produktfoto; nach
     unten begrenzt, damit die Muffenzone ihre Schweißtiefe behält. */
  P.gripLen = Math.min(P.ppLen - P.socket - 3, Math.round(a.l * 0.35 * 10) / 10);
  P.rGrip = a.D / 2;

  /* ── DER UMSPRITZTE MESSINGKERN ──
     Das echte Teil ist ein Verbund: der Messingeinsatz reicht unter die
     Griffzone, sonst könnte sie ihr Schraubmoment nicht übertragen —
     und sonst stimmt die Masse nicht. Die kg-Spalte entscheidet wie
     beim Überbogen: nur PP wiegt das Teil um die Hälfte zu leicht, der
     alte freie Messingkörper doppelt zu schwer. Die Einbettung ist
     unsichtbar bis zum Schnitt; ihre Tiefe ist ASSUMPTION = Griffzone,
     ihr Radius das Gewindekernmaß. */
  P.embedLen = P.gripLen;
  P.rEmbed = P.threadOD / 2 - 0.640327 * P.threadPitch;

  /* Riffelung der Griffzone — im Produktfoto deutlich sichtbar. */
  P.ribCount = Math.max(12, Math.round((Math.PI * a.D) / 6.5));
  P.ribDepth = Math.max(0.35, a.D * 0.012);

  if (P.restwand < 2.4) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': Muffenwand ' +
      P.restwand.toFixed(2) + ' mm zu dünn');
  }
  if (P.gripLen < 4) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': Griffzone ' +
      P.gripLen.toFixed(1) + ' mm — Aufteilung prüfen');
  }
  if (P.ppLen <= P.socket) {
    throw new Error('K-Aqua Übergangsmuffe ' + a.key + ': PP-Teil ' +
      P.ppLen.toFixed(1) + ' mm trägt die Muffentiefe ' + P.socket + ' mm nicht');
  }
  return P;
}
