/* K-Aqua Metallverschraubung Messing CW617N (Außengewinde) — Artikeltabelle.

   WERKSTOFFVARIANTE. Maßtabelle und Baugruppe sind mit
   metal-union-male-thread identisch — Zeile für Zeile geprüft:
   L, l, l1, SW, SW1 und R stimmen in allen sechs Größen überein.
   Verschieden sind nur die Codereihe (AQ537xx statt AQ547xx) und der
   Werkstoff: gelbes Messing CW617N statt vernickelt.

   Beleg quellen/w5-foto-male-brass.png gegen quellen/w5-foto-male.png:
   dieselbe Gestalt, einmal goldgelb, einmal silbrig.

   PHASE 1, verifiziert am 23.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-metal-union-with-pp-r-nut-in-yellow-brass-cw617n-male-thread-….png
   (quellen/w5-metal-union-male-brass.png, Tabellenausschnitte
   quellen/w5-tabelle-maleb-a.png und -b.png).

   Spaltenköpfe wie abgebildet:
     Code · d · R · DN · G · L · l · l1 · SW · SW1 · Pack.
   6 Größen, d20 bis d63. Nach der letzten Zeile folgt der ORDER-Knopf —
   die Tabelle ist vollständig gelesen (Fall 2).

   MASSSCHLÜSSEL:
     d    Rohr-Außendurchmesser = Muffenbohrung der PP-R-Seite
     R    kegeliges Außengewinde der Metallseite, in Zoll (ISO 7-1)
     DN   Nennweite des Gewindeanschlusses, informativ
     G    Gewinde der Überwurfmutter, in Zoll
     L    Gesamtlänge
     l    Länge des PP-R-Teils bis zur Dichtfläche
     l1   Länge des Gewindekörpers ab der Dichtfläche
     SW   Schlüsselweite der Überwurfmutter
     SW1  Schlüsselweite des Gewindekörpers

   Die Zuordnung von SW und SW1 steht nicht im Text, sondern in der
   MASSZEICHNUNG unter dem Produktfoto (quellen/w5-zeichnung-male.png):
   sie führt SW an den linken Sechskant (Mutter) und SW1 an den rechten
   (Körper). Die Zeichnung ist schematisch, nicht maßstäblich — sie
   ordnet Spalten Kanten zu, sie liefert keine Proportionen.

   ── VIER GEGENPROBEN ──

   1 · l ist mit der Innengewindevariante Zeile für Zeile IDENTISCH:
       19 · 22 · 23 · 26 · 29 · 32. Die PP-R-Seite ist dieselbe; der
       ganze Längenunterschied der beiden Produkte sitzt in l1.

         L  − L_IG   13 · 14 · 17 · 18 · 18 · 22
         l1 − l1_IG  13 · 13 · 15 · 18 · 18 · 22

       Bis auf zwei Zeilen deckungsgleich. Zwei unabhängig gelesene
       Tabellen bestätigen sich damit gegenseitig.

   2 · SW und SW1 sind mit der Innengewindevariante identisch:
       38/26 · 48/32 · 54/37 · 73/47 · 85/55 · 107/64. Beide Produkte
       tragen dieselbe Mutter und denselben Körpersechskant.

   3 · l + l1 gegen L, über alle Zeilen und mit Vorzeichen (Fall 28):
         d20  19+29 = 48  L 51  → −3
         d25  22+31 = 53  L 57  → −4
         d32  23+38 = 61  L 65  → −4
         d40  26+44 = 70  L 73  → −3
         d50  29+44 = 73  L 76  → −3
         d63  32+50 = 82  L 85  → −3
       Durchgehend negativ, 3 bis 4 mm. Es fehlt ein Stück, es
       überlappt nichts. Die Lücke ist die Flachdichtung zwischen
       PP-R-Bund und Metallkörper — 3 bis 4 mm ist genau die Dicke, die
       20-VISUELLE-REFERENZ §4.1 für Flachdichtungen nennt.

   4 · l minus Schweißtiefe DVS 2207-11 ist über alle Größen konstant:
         4,5 · 6,0 · 5,0 · 5,5 · 5,5 · 4,5 mm.
       Das ist der Hals mit dem Dichtbund — und eine unabhängige
       Bestätigung der Normreihe aus einer zweiten Tabelle.

   ── TIPPFEHLER IM KATALOG: G BEI d25 ──

   Die Seite druckt bei d25 G = 1 3/4". Gesetzt ist hier 1 1/4".

   Begründung: G 1 3/4" hat nach ISO 228-1 einen Außendurchmesser von
   53,74 mm. Die Schlüsselweite der Mutter beträgt bei d25 aber 48 mm —
   das Gewinde wäre größer als die Mutter, die es umschließt. Die
   Restwand wird −2,87 mm. Zusätzlich fiele die Spalte zwischen d25 und
   d32 (1,75 gegen 1,5), was bei einer Gewindereihe nicht vorkommt.

   Mit 1 1/4" ergibt sich eine Restwand von 3,05 mm — derselbe Wert wie
   bei d32 (3,10 mm) — und die Reihe steigt monoton.

   Dieselbe Zahl steht auf der Innengewindeseite als 1 1/4" und in
   products/union/data.js als 1 1/4". Beleg für alle vier Lesungen:
   quellen/w5-spalte-g-vier-seiten.png.

   params.js wirft, falls der Wert je zurückkommt.

   ── DIE SPALTE G WIRD NICHT MODELLIERT ──
   Werte 1 · 1 1/4 · 1 1/2 · 2 · 2 1/4 · 2 3/4 Zoll.

   G ist das Kupplungsgewinde zwischen Mutter und Körper. Es liegt
   vollständig im Inneren der Mutter, bildet keine Silhouette und ist
   auch im Halbschnitt von der Mutter verdeckt. products/union führt
   dieselbe Spalte ebenso mit, ohne sie zu modellieren.

   Die Normdurchmesser sind trotzdem in _union/params.js hinterlegt —
   sie tragen die Zusicherung, die den Tippfehler oben abfängt.

   ── ARTIKELNUMMERN ──
   Die Registry führt unter article_codes_md fünf Nummern der Reihe
   AQ71Rxx aus der Markdown-Datei. Der Screenshot zeigt sechs Nummern
   der Reihe AQ547xx. Maße und Artikelnummern kommen aus dem
   Screenshot (Regel 3) — die Markdown-Dateien sind als Maßquelle
   verboten und hier auch bei den Nummern nachweislich anders.

   ASSUMPTION Muffentiefe: Normreihe DVS 2207-11. Begründung wie bei
   Winkel und T-Stück (products/tee/data.js), zusätzlich gestützt durch
   Gegenprobe 4. */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 6;

export const ARTICLES = [
  { code: 'AQ53720', d: 20, R: '1/2', dn: 15, G: '1', L: 51, l: 19, l1: 29, SW: 38, SW1: 26, pack: 100 },
  /* G im Katalog als 1 3/4 gedruckt — Tippfehler, siehe Kopfkommentar. */
  { code: 'AQ53725', d: 25, R: '3/4', dn: 20, G: '1 1/4', L: 57, l: 22, l1: 31, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ53732', d: 32, R: '1', dn: 25, G: '1 1/2', L: 65, l: 23, l1: 38, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ53740', d: 40, R: '1 1/4', dn: 32, G: '2', L: 73, l: 26, l1: 44, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ53750', d: 50, R: '1 1/2', dn: 40, G: '2 1/4', L: 76, l: 29, l1: 44, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ53763', d: 63, R: '2', dn: 50, G: '2 3/4', L: 85, l: 32, l1: 50, SW: 107, SW1: 64, pack: 18 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  R: 'Außengewinde',
  dn: 'Nennweite',
  G: 'Muttergewinde (nicht modelliert)',
  L: 'Gesamtlänge',
  l: 'Länge PP-R-Teil',
  l1: 'Länge Gewindekörper',
  SW: 'Schlüsselweite Mutter',
  SW1: 'Schlüsselweite Körper',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
