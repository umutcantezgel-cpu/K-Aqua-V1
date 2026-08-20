# Prüfbericht — Metallverschraubung mit PP-R-Mutter (Innengewinde)

Produkt-ID `transition-fittings/metal-union-female-thread` · Stand 20. August 2026

---

## Ergebnis

| Größen | Referenz | Dreiecke | Meshes | max. Abweichung |
|---|---|---|---|---|
| 6, d20–d63 | d32 | 31 624 | 2 | **0,00 mm** |

Selbsttest über alle 28 Produkte: **28/28 geladen, größte Abweichung
0,18 mm**, 619 344 Dreiecke, keine Auffälligkeiten.

---

## Phase 1 — vollständig bemaßt

Quelle `quellen/w3-metal-union-fem.png`. Spalten
`Code · d · Rp · DN · G · L · l · l1 · SW · SW1 · Pack.` — zehn Angaben je
Zeile, sechs Größen.

### Drei Gegenproben

**1 · Die Spalte `G` deckt sich mit der PP-R-Verschraubung.**
1 · 1¼ · 1½ · 2 · 2¼ · 2¾ — identisch mit `products/union/data.js`. Beide
Produkte tragen dieselbe Überwurfmutter; die Metallvariante ersetzt nur den
Stutzen durch ein Messingteil mit Innengewinde.

Das ist die **dritte** Tabelle, die sich mit einer anderen deckt: Verschraubung
gegen Kugelhahn (`D`), Bundflansch gegen DIN 2501 (`D`, `D1`, `D3`), und jetzt
Metallverschraubung gegen Verschraubung (`G`). Der Katalog ist in sich
konsistenter als die Markdown-Dateien, die aus ihm gemacht wurden.

**2 · `l + l1` gegen `L`, mit Vorzeichen über alle Zeilen** (Fall 28):

| | l + l1 | L | Differenz |
|---|---|---|---|
| d20 | 35 | 38 | −3 |
| d25 | 40 | 43 | −3 |
| d32 | 46 | 48 | −2 |
| d40 | 52 | 55 | −3 |
| d50 | 55 | 58 | −3 |
| d63 | 60 | 63 | −3 |

Durchgehend negativ, fast konstant −3 mm. Es fehlt ein Stück, es überlappt
nichts — dasselbe Muster wie bei der PP-R-Verschraubung, wo diese Lücke der
freiliegende Bundring ist.

**Diesmal war die Deutung von Anfang an richtig**, weil die Regel aus Fall 28
im Katalog stand. Bei der Verschraubung hatte ich dieselbe Differenz als
„Überlappung" gedeutet und `l1` dadurch 1 mm zu lang gebaut.

**3 · `SW > SW1` in jeder Zeile**, beide monoton. `SW/d` = 1,90 · 1,92 · 1,69 ·
1,83 · 1,70 · 1,70 — kein glatter Faktor, also tabellierte Werte und keine
Rechenreihe.

---

## Erstes Produkt mit zwei Schlüsselweiten

`SW` an der Mutter, `SW1` am Körper. Beide Sechskante sitzen auf einem
Rotationskörper, der auf dem **Inkreis** liegt (`af/2`) — läge er auf dem
Umkreis, umhüllte er den Sechskant und die Schlüsselflächen verschwänden im
Material. Das war Fall 11 beim Gewindeadaptor.

Die Messung schießt einen Strahl in −Z auf jede Sechskantmitte: `hexPrism`
legt die **Fläche** auf Z und die **Ecke** auf Y, eine `Box3` würde also das
Eckenmaß liefern, nicht die Schlüsselweite. Beide treffen exakt (54/54 und
37/37 bei d32).

### Die Zuordnung der beiden Weiten ist eine Annahme

Die Tabelle sagt nicht, welcher Sechskant welche Weite trägt. Das Foto zeigt
von links nach rechts: grüne PP-R-Muffe (rund), mittleren Metallsechskant,
rechts größeren Metallbund mit Gewindeöffnung.

Zugeordnet nach Größe: `SW` an den rechten Bund (Überwurfmutter), `SW1` an den
mittleren Sechskant (Gewindekörper). Der Größenvergleich stützt das — `SW1`
muss unter `SW` liegen, damit die Mutter über den Körper greift.

Sollte es umgekehrt sein, genügt ein Tausch der beiden Werte in `params.js`.
**Am Originalteil zu prüfen.**

---

## Registry-ID korrigiert

Mein erster Entwurf trug
`transition-fittings/metal-union-with-pp-r-nut-female-thread`. Die Registry
führt `transition-fittings/metal-union-female-thread`.

**Bei Produkt-IDs ist die Registry kanonisch** — sie stellt die Verknüpfung
zur Website her. Beim **Anzeigenamen** entscheidet dagegen die Quelle, deshalb
bleibt `titleDe` der ausgeschriebene Name. Dieselbe Trennung wie beim
Faserrohr (`sdr-7-4` statt `sdr-74`) und bei der Reduzierbuchse (Quelle sagt
„Reducing bush", Registry sagte „Reduziermuffe").

Gefunden hat es die Registry-Prüfung, die nach jedem Produkt läuft und
IDs ohne Eintrag meldet.

---

## Annahmen

| Annahme | Wert | Begründung | Zu verifizieren gegen |
|---|---|---|---|
| Zuordnung SW / SW1 | SW an der Mutter, SW1 am Körper | Foto plus Größenvergleich | Originalteil |
| Muffentiefe | Normreihe DVS 2207-11 | ein Schweißwerkzeug je Nennweite — `products/tee/data.js` | Zeichnung |
| Muffen-Außendurchmesser | 1,375 · d | Wert, den Muffe und T-Stück bei d20–d63 zeigen | Zeichnung |
| Längsaufteilung | PP-R nimmt `l`, Metall `l1` + Lücke | Foto zeigt etwa dieses Verhältnis | Zeichnung |
| Bundring | `L − (l + l1)` | Vorzeichenprobe über alle Zeilen, Fall 28 | Zeichnung |

---

## Abgabe

| | |
|---|---|
| `products/metal-union-female-thread/` — data · params · parts · index | ✅ |
| `dist/kaqua-metal-union-female-thread.html` | ✅ |
| Registry 28/71, Bibliothek 28 Module | ✅ |
| Prüfung §5.2b: 29 HTML in `dist/` = 28 + Galerie, keine Waisen | ✅ |
| Selbsttest 28/28, 0,18 mm | ✅ |
| Vergleichstest gegen Katalogfoto | durchgefuehrt, hat die SW-Zuordnung widerlegt |
| Registry-Status | prototyp, bis SW geklaert ist |

**Vorlage für drei weitere Produkte.** `metal-union-male-thread`,
`metal-union-female-thread-brass` und `metal-union-male-thread-brass` teilen
diese Baugruppe. Die Messingvarianten unterscheiden sich nur im
Materialschlüssel (`brass` statt `chrome`), die Außengewindevariante ersetzt
die Innengewindekontur durch `threadProfile(..., 'R')` — die Funktion trägt
beide Fälle bereits.
