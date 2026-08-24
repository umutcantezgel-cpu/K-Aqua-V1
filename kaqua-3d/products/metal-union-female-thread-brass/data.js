/* K-Aqua Metallverschraubung Messing CW617N (Innengewinde) — Artikeltabelle.

   WERKSTOFFVARIANTE. Maßtabelle und Baugruppe sind mit
   metal-union-female-thread identisch — Zeile für Zeile geprüft:
   L, l, l1, SW, SW1 und Rp stimmen in allen sechs Größen überein.
   Verschieden sind nur die Codereihe (AQ532xx statt AQ542xx) und der
   Werkstoff: gelbes Messing CW617N statt vernickelt.

   Der Unterschied ist im Katalogfoto sichtbar und der einzige Grund,
   warum es zwei Artikel gibt — quellen/w5-foto-fem-brass.png gegen
   quellen/w5-foto-fem.png: dieselbe Gestalt, einmal goldgelb, einmal
   silbrig.

   ACHTUNG G BEI d25: Diese Seite druckt 1 3/4". Gesetzt ist 1 1/4"
   wie beim Zwilling — G 1 3/4" hat 53,74 mm Außendurchmesser und passt
   nicht in eine Mutter mit Schlüsselweite 48. Rechnung im
   Kopfkommentar von metal-union-male-thread/data.js.

   PHASE 1, verifiziert am 20.08.2026, Gestalt korrigiert am 23.08.2026
   gegen
   Transition Fittings K-Aqua/screencapture-…-metal-union-with-pp-r-nut-in-yellow-brass-cw617n-female-thread-….png
   (quellen/w5-metal-union-fem-brass.png).

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · DN · G · L · l · l1 · SW · SW1 · Pack.
   6 Größen, d20 bis d63. Nach der letzten Zeile folgt der ORDER-Knopf.

   MASSSCHLÜSSEL:
     d    Rohr-Außendurchmesser = Muffenbohrung der PP-R-Seite
     Rp   zylindrisches Innengewinde der Metallseite, in Zoll (ISO 228-1)
     DN   Nennweite des Gewindeanschlusses, informativ
     G    Gewinde der Überwurfmutter, in Zoll
     L    Gesamtlänge
     l    Länge des PP-R-Teils bis zur Dichtfläche
     l1   Länge des Gewindekörpers ab der Dichtfläche
     SW   Schlüsselweite der Überwurfmutter
     SW1  Schlüsselweite des Gewindekörpers

   ── KORREKTUR VOM 23.08.2026: SW IST DOCH AUFLÖSBAR ──

   Der frühere Stand führte hier:

     „Was SW bezeichnet, ist nicht auflösbar. […] SW wird deshalb NICHT
      modelliert und erscheint nur in der Fallback-Tabelle."

   und setzte das Produkt auf status 'prototyp'.

   Die Maßzeichnung liegt auf der Produktseite, unter dem Foto, als
   zweite Miniatur (Ausschnitt quellen/w5-zeichnung-fem.png). Sie führt
   SW an den linken Sechskant und SW1 an den rechten. SW ist die
   Schlüsselweite der Überwurfmutter.

   Die Fotoableitung, die SW ausgeschlossen hatte, setzte voraus, dass
   das Katalogfoto d32 zeigt — eine Annahme, die derselbe Absatz als
   offene Frage führte. Die Silhouettenvermessung beantwortet sie:

     gemessen  Länge 557 px, größte Höhe 514 px  →  L/B = 1,08
     d20   L 38, SW 38 über Fläche … 43,9 über Ecke   →  L/B 0,87…1,00  ✓
     d25   L 43, SW 48 …………………… 55,4              →  L/B 0,78…0,90  ✗
     d32   L 48, SW 54 …………………… 62,4              →  L/B 0,77…0,89  ✗
     d63   L 63, SW 107 ………………… 123,6             →  L/B 0,51…0,59  ✗

   Nur d20 trägt die Messung. Beim Außengewindefoto ergibt dieselbe
   Auswertung dasselbe Ergebnis (L/B 1,30; nur d20 liegt im Bereich).
   Beide Katalogfotos zeigen die kleinste Größe.

   Damit kehrt sich die alte Rechnung um: bei d20 ist SW = 38 genau die
   Breite, die das Foto zeigt. Der Sechskant ist da, und er ist der
   breiteste Punkt des Teils.

   Rangfolge nach Fall 31: Tabellenmaß (Rang 1) und Zeichnung (Rang 2)
   stehen über der Fotoableitung (Rang 3). Alle drei sagen jetzt
   dasselbe.

   ── VIER GEGENPROBEN ──

   1 · l ist mit der Außengewindevariante Zeile für Zeile IDENTISCH:
       19 · 22 · 23 · 26 · 29 · 32. SW und SW1 ebenso. Die beiden
       Produkte unterscheiden sich nur in L und l1 — also nur im
       Gewindekörper.

   2 · l + l1 gegen L, über alle Zeilen und mit Vorzeichen (Fall 28):
         d20  19+16 = 35  L 38  → −3      d40  26+26 = 52  L 55  → −3
         d25  22+18 = 40  L 43  → −3      d50  29+26 = 55  L 58  → −3
         d32  23+23 = 46  L 48  → −2      d63  32+28 = 60  L 63  → −3
       Durchgehend negativ. Die Lücke ist die Flachdichtung zwischen
       PP-R-Bund und Metallkörper — 2 bis 3 mm, genau die Dicke, die
       20-VISUELLE-REFERENZ §4.1 für Flachdichtungen nennt.

   3 · SW > SW1 in jeder Zeile, beide monoton steigend.
       SW/d = 1,90 · 1,92 · 1,69 · 1,83 · 1,70 · 1,70 — kein glatter
       Faktor, also tabellierte Werte und keine Rechenreihe.

   4 · l minus Schweißtiefe DVS 2207-11 ist über alle Größen konstant:
       4,5 · 6,0 · 5,0 · 5,5 · 5,5 · 4,5 mm — der Hals mit dem
       Dichtbund, auf dem die Mutter sitzt.

   ── DIE SPALTE G WIRD NICHT MODELLIERT ──
   Werte 1 · 1 1/4 · 1 1/2 · 2 · 2 1/4 · 2 3/4 Zoll.

   G ist das Kupplungsgewinde zwischen Mutter und Körper, liegt
   vollständig im Inneren der Mutter und bildet keine Silhouette.
   products/union führt dieselbe Spalte ebenso mit, ohne sie zu
   modellieren.

   Diese Seite druckt bei d25 als einzige der vier Metallverschraubungs-
   seiten 1 1/4"; die drei anderen drucken 1 3/4". 1 1/4" ist richtig:
   G 1 3/4" hat 53,74 mm Außendurchmesser und passt nicht in eine
   Mutter mit Schlüsselweite 48. Beleg und Rechnung im Kopfkommentar
   von metal-union-male-thread/data.js.

   ── ARTIKELNUMMERN ──
   Die Registry führt fünf Nummern der Reihe AQ71RPxx aus der
   Markdown-Datei. Der Screenshot zeigt sechs der Reihe AQ542xx. Maße
   und Nummern kommen aus dem Screenshot (Regel 3).

   ASSUMPTION Muffentiefe: Normreihe DVS 2207-11, gestützt durch
   Gegenprobe 4. */

export const DATA_STATUS = 'tabelle-verifiziert-zeichnung-gelesen';
export const SIZES_SOURCE_VERIFIED = 6;

export const ARTICLES = [
  { code: 'AQ53220', d: 20, Rp: '1/2', dn: 15, G: '1', L: 38, l: 19, l1: 16, SW: 38, SW1: 26, pack: 100 },
  { code: 'AQ53225', d: 25, Rp: '3/4', dn: 20, G: '1 1/4', L: 43, l: 22, l1: 18, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ53232', d: 32, Rp: '1', dn: 25, G: '1 1/2', L: 48, l: 23, l1: 23, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ53240', d: 40, Rp: '1 1/4', dn: 32, G: '2', L: 55, l: 26, l1: 26, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ53250', d: 50, Rp: '1 1/2', dn: 40, G: '2 1/4', L: 58, l: 29, l1: 26, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ53263', d: 63, Rp: '2', dn: 50, G: '2 3/4', L: 63, l: 32, l1: 28, SW: 107, SW1: 64, pack: 18 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
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
