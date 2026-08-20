/* K-Aqua Metallverschraubung mit PP-R-Mutter (Innengewinde) — Artikeltabelle.

   PHASE 1, verifiziert am 20.08.2026 gegen
   Transition Fittings K-Aqua/screencapture-…-metal-union-with-pp-r-nut-female-thread-….png
   (quellen/w3-metal-union-fem.png).

   Spaltenköpfe wie abgebildet:
     Code · d · Rp · DN · G · L · l · l1 · SW · SW1 · Pack.
   6 Größen, d20 bis d63. Vollständig bemaßt.

   MASSSCHLÜSSEL:
     d    Rohr-Außendurchmesser = Muffenbohrung der PP-R-Seite
     Rp   zylindrisches Innengewinde der Metallseite, in Zoll (ISO 228-1)
     DN   Nennweite des Gewindeanschlusses, informativ
     G    Gewinde der Überwurfmutter, in Zoll
     L    Gesamtlänge
     l    Länge des vorderen Abschnitts
     l1   Länge des hinteren Abschnitts
     SW   größere Schlüsselweite
     SW1  kleinere Schlüsselweite

   ── DREI GEGENPROBEN ──

   1 · Die Spalte G ist IDENTISCH mit der G-Spalte der PP-R-Verschraubung
       (products/union/data.js): 1 · 1¼ · 1½ · 2 · 2¼ · 2¾. Beide
       Produkte tragen dieselbe Überwurfmutter — die Metallvariante
       ersetzt nur den Stutzen durch ein Messingteil mit Innengewinde.
       Zwei unabhängig abgelesene Tabellen bestätigen sich gegenseitig.

   2 · l + l1 gegen L, über alle Zeilen und mit Vorzeichen (Fall 28):
         d20  19+16 = 35  L 38  → −3
         d25  22+18 = 40  L 43  → −3
         d32  23+23 = 46  L 48  → −2
         d40  26+26 = 52  L 55  → −3
         d50  29+26 = 55  L 58  → −3
         d63  32+28 = 60  L 63  → −3
       Durchgehend negativ, fast konstant −3 mm. Es fehlt ein Stück, es
       überlappt nichts — dasselbe Muster wie bei der PP-R-Verschraubung,
       wo diese Lücke der freiliegende Bundring ist.

   3 · SW > SW1 in jeder Zeile ✓, beide monoton steigend ✓.
       SW/d = 1,90 · 1,92 · 1,69 · 1,83 · 1,70 · 1,70 — kein glatter
       Faktor, also tabellierte Werte und keine Rechenreihe.

   ── DIE SPALTE SW WIRD NICHT MODELLIERT ──
   Werte: 38 · 48 · 54 · 73 · 85 · 107.

   Der erste Entwurf setzte SW als Schlüsselweite eines zweiten
   Sechskants an der Mutter. Der Vergleichstest gegen das Katalogfoto
   hat das widerlegt — und zwar eindeutig.

   Spaltenweise Auswertung von quellen/w3-metal-union-fem.png
   (Bereich x150–1550, y1700–2600):

     Bauteil x 335…745            → Länge 410 px
     größte Höhe 385 px bei x≈555 → Breite/Länge = 0,94
     Grünanteil x 340–410 zu über 90 % grün, ab x 460 zu 0 %
                                  → grüne Muffe etwa 30 % der Länge

   Das Foto ist schräg aufgenommen (die elliptische Stirnfläche der
   Muffe ist sichtbar), die Länge also verkürzt. Der wahre Aspekt
   Länge/Breite liegt damit bei mindestens 1,07 — das Teil ist länger
   als breit.

   Bei d32 mit L = 48 folgt daraus eine Maximalbreite von etwa 45 mm.

     SW = 54 über Fläche  → 62,3 mm über Ecke   ✗ ausgeschlossen
     SW1 = 37 über Fläche → 42,7 mm über Ecke   ✓ passt

   42,7 mm liegt knapp unter dem Muffendurchmesser von 44 mm, und im
   Foto sind grüne Muffe und Metallteil tatsächlich ähnlich breit. SW1
   ist damit die Schlüsselweite des einen sichtbaren Sechskants.

   Was SW bezeichnet, ist nicht auflösbar. Geprüfte Verhältnisse:

     SW/d      1,90 · 1,92 · 1,69 · 1,83 · 1,70 · 1,70
     SW/SW1    1,46 · 1,50 · 1,46 · 1,55 · 1,55 · 1,67
     SW/L      1,00 · 1,12 · 1,13 · 1,33 · 1,47 · 1,70
     SW gegen D der Verschraubung (products/union):
               38/46 · 48/56 · 54/66 · 73/79 · 85/87 · 107/107
               — nähert sich an, deckt sich aber nur bei d63

   Keine dieser Reihen ergibt einen Bezug zu einer Kante DIESES Teils.
   Denkbar ist ein Maß der zugehörigen PP-R-Mutter, die als
   Einzelartikel geführt wird — dann gehört SW nicht auf dieses Teil.

   SW wird deshalb NICHT modelliert und erscheint nur in der
   Fallback-Tabelle. Ein geratener Bezugspunkt wäre schlechter als eine
   benannte Lücke (Fall 29).

   ── STATUS: PROTOTYP ──
   Solange SW ungeklärt ist, bleibt die Gestalt des Metallteils eine
   Fotoableitung. Das Produkt trägt deshalb status 'prototyp' in der
   Registry — der Export liefert es sichtbar als vorläufig aus.
   Zu klären: was bezeichnet SW, und welcher Größe entspricht das
   Katalogfoto?

   ASSUMPTION Muffentiefe: Normreihe DVS 2207-11, nicht aus l oder l1.
   Begründung wie bei Winkel und T-Stück (products/tee/data.js): ein
   Schweißwerkzeug je Nennweite für alle Fittings. */

export const DATA_STATUS = 'tabelle-verifiziert-gestalt-prototyp';
export const SIZES_SOURCE_VERIFIED = 6;
export const SDR = 6;

/* Rp-Innengewinde nach ISO 228-1, zylindrisch. */
export const THREAD = {
  '1/2': { od: 20.955, pitch: 1.814 },
  '3/4': { od: 26.441, pitch: 1.814 },
  '1': { od: 33.249, pitch: 2.309 },
  '1 1/4': { od: 41.910, pitch: 2.309 },
  '1 1/2': { od: 47.803, pitch: 2.309 },
  '2': { od: 59.614, pitch: 2.309 },
};

export const ARTICLES = [
  { code: 'AQ54220', d: 20, Rp: '1/2', dn: 15, G: '1', L: 38, l: 19, l1: 16, SW: 38, SW1: 26, pack: 100 },
  { code: 'AQ54225', d: 25, Rp: '3/4', dn: 20, G: '1 1/4', L: 43, l: 22, l1: 18, SW: 48, SW1: 32, pack: 100 },
  { code: 'AQ54232', d: 32, Rp: '1', dn: 25, G: '1 1/2', L: 48, l: 23, l1: 23, SW: 54, SW1: 37, pack: 100 },
  { code: 'AQ54240', d: 40, Rp: '1 1/4', dn: 32, G: '2', L: 55, l: 26, l1: 26, SW: 73, SW1: 47, pack: 25 },
  { code: 'AQ54250', d: 50, Rp: '1 1/2', dn: 40, G: '2 1/4', L: 58, l: 29, l1: 26, SW: 85, SW1: 55, pack: 25 },
  { code: 'AQ54263', d: 63, Rp: '2', dn: 50, G: '2 3/4', L: 63, l: 32, l1: 28, SW: 107, SW1: 64, pack: 18 },
];

export const SIZES = ARTICLES.map((a) => a.d);

export const DIMENSION_KEY = {
  d: 'Nennmaß',
  Rp: 'Innengewinde',
  G: 'Muttergewinde',
  L: 'Gesamtlänge',
  l: 'Länge vorderer Abschnitt',
  l1: 'Länge hinterer Abschnitt',
  SW: 'Schlüsselweite (nicht auflösbar, nicht modelliert)',
  SW1: 'Schlüsselweite Sechskant',
};

export function article(d) {
  const a = ARTICLES.find((x) => x.d === d);
  if (!a) throw new Error('K-Aqua: unbekannte Nennweite d' + d);
  return a;
}
