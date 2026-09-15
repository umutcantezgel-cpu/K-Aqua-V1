# Übersetzungsauftrag K-Aqua — ein Bearbeiter, Handarbeit, ohne Unterbrechung

## 0. Die wichtigste Regel zuerst

### Keine Unteragenten

**Du arbeitest selbst. Du startest keine Agenten, keine Unteraufgaben, keinen
Fan-out, keine parallelen Bearbeiter — nicht einen.**

Der Grund ist gemessen, nicht theoretisch: Jeder gestartete Agent liest sich
erst in Projekt, Auftrag und Befund ein, bevor er den ersten Satz übersetzt.
Bei zwanzig Agenten wird dieses Einlesen zwanzigmal bezahlt, das Kontingent ist
aufgebraucht, und übersetzt ist am Ende fast nichts. Ein Bearbeiter, der
durchgehend an derselben Sache bleibt, hat das Projekt einmal im Kopf und
arbeitet danach nur noch.

Zweiter Grund: Am 2026-09-01 hat ein paralleler Lauf **elf Sprachdateien
zerstört** — abgeschnittene Zeichenketten mitten im Wort, ineinander
geschriebene Zeilen, ungültige UTF-8-Bytes. Zwei Bearbeiter an einer Datei,
oder ein Bearbeiter mit einem stückweise schreibenden Werkzeug, erzeugen genau
das. Eine Datei, ein Bearbeiter, eine Änderung nach der anderen.

### Keine Skripte

**Es wird kein einziges Skript ausgeführt und kein einziges geschrieben.**

Das gilt ohne Ausnahme für:

* die Skripte, die im Repo unter `scripts/` liegen — auch `scripts/i18n-*.mjs`,
  auch wenn sie nach genau diesem Zweck aussehen. Sie sind für diesen Auftrag
  gesperrt.
* selbst geschriebene Helfer, egal in welcher Sprache — Node, Python, Bash,
  `sed`, `awk`, `jq`, `perl -i`, Editor-Makros, Suchen-und-Ersetzen über
  mehrere Zeilen oder Dateien.
* jede Form von Massenoperation auf einer Datei.

Jeder Wert wird **einzeln gelesen, einzeln übersetzt und einzeln von Hand an
seine Stelle geschrieben**. Der Grund ist nicht Umständlichkeit: Ein
Suchen-und-Ersetzen, das 500 Werte gleichzeitig anfasst, macht seinen Fehler
auch 500-mal, und in einer 5000-Zeilen-JSON-Datei fällt das erst auf der
fertigen Seite auf. Ein Wert, den jemand gelesen hat, ist ein Wert, für den
jemand geradesteht.

Erlaubt ist: Dateien lesen, in Dateien an einer bestimmten Stelle schreiben,
und die Suche im Editor, um eine Stelle zu **finden**.

### Nicht aufhören

Arbeite durch. Halte nicht an, um Zwischenstände zu berichten, um Rückfragen zu
stellen oder um eine Bestätigung abzuwarten. Ist ein Namensraum fertig, fängst
du ohne Pause den nächsten an; ist eine Sprache fertig, ohne Pause die nächste
aus der Warteschlange in Abschnitt 6. Berichtet wird am Ende, nicht zwischendrin.

---

## 1. Worum es geht

K-Aqua (Hersteller: KWT GmbH) verkauft PP-R- und PP-RCT-Rohrleitungssysteme —
Rohre, Fittings, Armaturen, Schweißwerkzeuge — an Fachbetriebe aus Sanitär,
Heizung und Tiefbau. Die Website ist mehrsprachig; die Texte liegen als JSON
unter `messages/`, eine Datei je Sprache.

`lib/i18n/request.ts` mischt die Sprachdateien in der Reihenfolge
**de → en → Zielsprache**. Daraus folgt das Entscheidende:

> Ein Wert, der in `messages/tr.json` zeichengleich so dasteht wie im
> Deutschen oder Englischen, ist **kein fertiger Eintrag**. Er ist genau das,
> was der Fallback ohnehin geliefert hätte — ein deutscher Satz auf einer
> türkischen Seite.

Drei Befunde gelten deshalb gleichermaßen als unübersetzt:

| Befund | Was man sieht |
|---|---|
| Schlüssel fehlt ganz | Die Seite zeigt englischen Fallback-Text |
| Wert steht wörtlich deutsch oder englisch da | dito, nur fest eingetragen |
| Wert ist ein Füllstring | `am.json` hat 3954 Werte „የተተረጎመ" (= „übersetzt"), `km.json` 2534-mal „x" |

Insgesamt sind es **76.154 Werte in 59 Sprachen**.

---

## 2. Deine Arbeitsgrundlage: drei Dateien

Du brauchst keine Werkzeuge, sondern drei Dateien:

**1. Dein Befund:** `docs/i18n/befunde/<locale>.md`

Darin steht — vorab ermittelt, du musst nichts selbst vergleichen — jeder
offene Wert deiner Sprache, gruppiert nach Namensraum:

```
## academy (217)

- `academy.qLabel` Frage
- `academy.hero.title` [fehlt] Wissen, das auf der Baustelle trägt
- `catalogx.items.socket.faq.0.q` [füllstring] Wofür ist die Muffe geeignet?
```

Hinter dem Schlüssel steht der **deutsche Originaltext**. `[fehlt]` heißt: der
Schlüssel muss neu angelegt werden. `[füllstring]` heißt: da steht ein
Platzhalter, der ersetzt wird. Ohne Marke: der deutsche oder englische Satz
steht wörtlich in der Datei.

**2. Die Quelle:** `messages/de.json` — nur lesen, nie ändern. Hier siehst du
den Originaltext im Zusammenhang und die genaue Struktur.

**3. Deine Zieldatei:** `messages/<locale>.json` — die einzige Datei, die du
schreibst.

Bei Zweifeln an einer Formulierung darfst du zusätzlich `messages/en.json`
lesen (auch nur lesen). Sie hilft, wenn das Deutsche mehrdeutig ist.

---

## 3. Das Verfahren

Arbeite **Namensraum für Namensraum**, in der Reihenfolge deines Befunds.
Ein Namensraum ist die oberste Ebene eines Schlüssels — `academy`, `catalogx`,
`nav`. Namensräume sind unterschiedlich groß; `catalogx` ist in vielen Sprachen
der größte.

Für jeden Namensraum:

1. Lies den Abschnitt im Befund vollständig, bevor du etwas schreibst. Ein
   Namensraum gehört inhaltlich zusammen: dieselben Fachbegriffe müssen darin
   überall gleich übersetzt sein.
2. Öffne `messages/de.json` an dieser Stelle und lies den Zusammenhang —
   gehört der Text zu einer Überschrift, einem Knopf, einem FAQ?
3. Öffne `messages/<locale>.json` an derselben Stelle.
4. Gehe die Einträge der Reihe nach durch. Für jeden: übersetzen, an seine
   Stelle schreiben, weiter zum nächsten.
5. Ist der Namensraum fertig, trage im Befund hinter der Überschrift
   ` — ERLEDIGT` ein. Das ist dein Fortschrittsvermerk; nur so weißt du nach
   einer Unterbrechung, wo du standest. Lösche keine Zeilen aus dem Befund.

Arbeite in Abschnitten von etwa 50 bis 100 Einträgen und lies danach die
geänderte Stelle noch einmal (Abschnitt 5). Große Sprünge ohne Gegenlesen sind
genau der Weg, auf dem eine kaputte Klammer 2000 Zeilen weiter unten landet.

---

## 4. Übersetzungsregeln

**Ton.** Professionelles B2B-Deutsch der SHK-Branche, in die Zielsprache
übertragen. Adressat ist ein Fachbetrieb, kein Endverbraucher. Sachlich,
knapp, kein Marketing-Überschwang, den das Original nicht hat. Innerhalb einer
Sprache ein einheitliches Vokabular: „Fitting", „Muffe", „Nennweite" sollen
nicht auf drei Seiten drei verschiedene Wörter bekommen.

**Unverändert bleiben:**

* Markennamen: K-Aqua, KWT, Coday
* Werkstoff- und Normbezeichnungen: PP-R, PP-RCT, SDR, DIN, ISO, EN, DVGW,
  SKZ, KIWA, DIN 8077 / 8078, EN ISO 15874
* Artikelnummern (AQ50020), Nennweiten (d20, d20–d315), Maße und Zahlen
* Dateiformate: PDF, GLB, GLTF, OBJ, IFC, BIM, CAD
* URLs, E-Mail-Adressen, Telefonnummern

**Platzhalter zeichengenau erhalten.** `{count}`, `{name}`, `{date}`,
`{count, plural, one {…} other {…}}`, `<b>…</b>`. Der Text drumherum wird
übersetzt, die geschweiften Klammern und ihr Inhalt nicht. Bei Plural-Formen
die Regeln der Zielsprache anwenden, die ICU-Syntax aber beibehalten. Fehlt
ein Platzhalter in der Übersetzung, wirft die Seite zur Laufzeit einen Fehler
— und zwar auf der Unterseite, die niemand vorher aufruft.

**Leerzeichen am Rand sind Inhalt.** Manche Werte beginnen oder enden bewusst
mit einem Leerzeichen, weil zwei Schlüssel zu einer Überschrift zusammengesetzt
werden: `"GENAU"` + `" Management System"`. Übernimmst du das führende
Leerzeichen nicht, steht auf der Seite „GENAUSystème". Schau bei jedem Wert
auf das Zeichen direkt hinter dem öffnenden und vor dem schließenden
Anführungszeichen im Deutschen und mache es genauso.

**Wenn die Übersetzung wirklich identisch ist.** In manchen Sprachen ist das
richtige Wort dasselbe wie im Englischen — „Question" heißt auf Französisch
„Question". Dann schreibst du es genauso hin und vermerkst den Schlüssel in
deinem Abschlussbericht unter „bewusst identisch". Nutze das sparsam und nur,
wenn es wirklich stimmt; im Zweifel übersetzen.

**Rechts-nach-links-Sprachen** (ar, fa, he, ur): normaler Text, keine
Steuerzeichen, keine manuelle Richtungsmarkierung. Das Layout macht die
Website.

---

## 5. JSON von Hand ändern — worauf zu achten ist

Ohne Skript prüft nichts deine Datei außer dir. Diese fünf Punkte sind die
Fehler, die dabei tatsächlich passieren.

**Arrays bleiben Arrays.** Zahlen im Schlüssel sind Array-Indizes:
`catalogx.items.socket.faq.0.q` ist die Frage des **ersten** FAQ-Eintrags.
45 % des gesamten Bestands liegt in solchen Arrays, vor allem die
Produkt-FAQs. In der Datei sieht das so aus:

```json
"faq": [
  { "q": "…", "a": "…" },
  { "q": "…", "a": "…" }
]
```

Wird daraus versehentlich `"faq": { "0": {...} }`, bleibt die Datei gültiges
JSON — aber die Seite läuft mit `.map()` darüber, findet nichts, und die
gesamte FAQ-Sektion verschwindet, ohne dass irgendwo ein Fehler erscheint.
Eckige Klammern bleiben eckig.

**Einen fehlenden Schlüssel legst du an der Stelle an, an der er im Deutschen
steht** — gleiche Verschachtelung, gleiche Nachbarn, gleicher Behältertyp.
Nicht ans Ende der Datei hängen.

**Kommadisziplin.** Nach jedem Eintrag ein Komma, nach dem letzten in einem
Block keins. Das ist der häufigste Weg, eine Sprachdatei unbrauchbar zu machen.

**Anführungszeichen im Text escapen:** `\"`. Ein Backslash im Text: `\\`.
Zeilenumbrüche im Text: `\n` — kein echter Umbruch innerhalb eines Strings.

**Nichts umformatieren.** Reihenfolge der Schlüssel, Einrückung und Struktur
bleiben, wie sie sind. Du änderst Werte, nichts sonst. Wer eine Datei
„aufräumt", erzeugt einen Unterschied über tausende Zeilen, in dem die echte
Änderung nicht mehr zu finden ist.

**Nach jedem Abschnitt gegenlesen:** die geänderte Stelle noch einmal von oben
nach unten. Klammern paarig? Kommas richtig? Platzhalter noch da?

---

## 6. Die Warteschlange

Du arbeitest die Sprachen **in dieser Reihenfolge** ab, eine nach der anderen,
und beginnst die nächste erst, wenn die vorige vollständig fertig ist.

Die Reihenfolge ist nicht zufällig: Sie geht von der Sprache mit dem
geringsten Restaufwand zur größten. Reißt der Lauf irgendwann ab, sind dann
möglichst viele Sprachen **ganz** fertig statt aller Sprachen halb — eine
halb übersetzte Sprache nützt keinem Besucher, eine fertige sofort.

| # | Sprache | offene Einträge | kumuliert |
|---|---|---|---|
| 1 | `ar` | 114 | 114 |
| 2 | `es-419` | 351 | 465 |
| 3 | `bn` | 409 | 874 |
| 4 | `fa` | 409 | 1283 |
| 5 | `he` | 410 | 1693 |
| 6 | `mn` | 410 | 2103 |
| 7 | `bg` | 426 | 2529 |
| 8 | `lt` | 438 | 2967 |
| 9 | `az` | 441 | 3408 |
| 10 | `hy` | 442 | 3850 |
| 11 | `pt-AO` | 446 | 4296 |
| 12 | `ja` | 449 | 4745 |
| 13 | `mk` | 453 | 5198 |
| 14 | `lv` | 475 | 5673 |
| 15 | `fr` | 502 | 6175 |
| 16 | `fr-SN` | 504 | 6679 |
| 17 | `ro` | 517 | 7196 |
| 18 | `ms` | 529 | 7725 |
| 19 | `hu` | 540 | 8265 |
| 20 | `hi` | 551 | 8816 |
| 21 | `zh-Hans` | 552 | 9368 |
| 22 | `zh-Hant` | 554 | 9922 |
| 23 | `th` | 561 | 10483 |
| 24 | `sw` | 575 | 11058 |
| 25 | `sk` | 580 | 11638 |
| 26 | `no` | 581 | 12219 |
| 27 | `sq` | 581 | 12800 |
| 28 | `fi` | 582 | 13382 |
| 29 | `el` | 595 | 13977 |
| 30 | `sl` | 601 | 14578 |
| 31 | `da` | 617 | 15195 |
| 32 | `is` | 645 | 15840 |
| 33 | `ur` | 704 | 16544 |
| 34 | `ka` | 724 | 17268 |
| 35 | `kk` | 733 | 18001 |
| 36 | `sv` | 745 | 18746 |
| 37 | `lo` | 1054 | 19800 |
| 38 | `si` | 1054 | 20854 |
| 39 | `id` | 1090 | 21944 |
| 40 | `et` | 1146 | 23090 |
| 41 | `vi` | 1156 | 24246 |
| 42 | `uz` | 1459 | 25705 |
| 43 | `hr` | 1537 | 27242 |
| 44 | `fil` | 1836 | 29078 |
| 45 | `cs` | 1904 | 30982 |
| 46 | `it` | 2142 | 33124 |
| 47 | `es-ES` | 2193 | 35317 |
| 48 | `nl` | 2201 | 37518 |
| 49 | `uk` | 2306 | 39824 |
| 50 | `ko` | 2453 | 42277 |
| 51 | `sr` | 2547 | 44824 |
| 52 | `my` | 2798 | 47622 |
| 53 | `km` | 2905 | 50527 |
| 54 | `pt-BR` | 4087 | 54614 |
| 55 | `am` | 4244 | 58858 |
| 56 | `pt-PT` | 4286 | 63144 |
| 57 | `tr` | 4318 | 67462 |
| 58 | `ru` | 4321 | 71783 |
| 59 | `pl` | 4371 | 76154 |

Gibt es Märkte, die für den nächsten Termin zählen, zieh sie vor — sag es
vorher, dann wird die Reihenfolge geändert. Ohne solche Ansage gilt die
Tabelle.

Regionalvarianten sind eigenständig und werden **nicht** voneinander kopiert:
`pt-PT` ist europäisches Portugiesisch, `pt-BR` brasilianisches, `pt-AO`
angolanisches; `es-ES` gegen `es-419` (Lateinamerika); `fr` gegen `fr-SN`
(Senegal). Jede Variante wird eigenständig in ihrer regionalen Norm übersetzt.

---

## 7. Leitplanken

* **Keine Unteragenten, kein Fan-out, keine parallelen Bearbeiter.** Siehe
  Abschnitt 0. Du arbeitest selbst, durchgehend, an einer Sprache zur Zeit.
* **Kein Skript ausführen, kein Skript schreiben.** Ebenfalls Abschnitt 0.
  Diese beiden Regeln sind die, deren Verletzung den Auftrag ungültig macht.
* **Immer nur eine Datei gleichzeitig offen und in Bearbeitung.** Nie zwei
  Sprachdateien nebenher. Genau daran sind am 2026-09-01 elf Dateien
  zerbrochen.
* **Niemals ändern:** `messages/de.json`, `messages/en.json`,
  `messages/en-*.json` — das sind die Quellen der Merge-Kette. Und nichts
  außerhalb von `messages/`, außer dem eigenen Fortschrittsvermerk im eigenen
  Befund.
* **Keine Git-Befehle.** Kein `commit`, kein `push`, kein `checkout`, kein
  `stash`, kein `restore`. Das Zusammenführen macht der Auftraggeber.
* **Kein `npm run build`, kein `npm run dev`, kein Installieren von Paketen.**
  In dieser Arbeitskopie läuft bereits ein Entwicklungsserver; ein zweiter
  Build zerstört den `.next`-Ordner. Das ist in diesem Projekt schon zweimal
  passiert.

---

## 8. Fertig und Abschlussbericht

Eine Sprache ist fertig, wenn **jeder Namensraum in ihrem Befund als ERLEDIGT
markiert ist** und du jeden Eintrag darin tatsächlich angefasst hast. Dann
beginnst du ohne Pause die nächste Sprache aus der Warteschlange.

Die Endabnahme über alle 59 Sprachen macht der Auftraggeber; du führst sie
nicht selbst durch und rufst dafür nichts auf.

**Am Ende des gesamten Laufs meldest du, je bearbeiteter Sprache:**

* Zahl der übersetzten Einträge und die Liste der erledigten Namensräume
* Schlüssel, die du **bewusst identisch** gelassen hast, mit Begründung
* Fachbegriffe, für die du dich auf eine bestimmte Übersetzung festgelegt
  hast (damit später niemand daran vorbeiübersetzt)
* alles, was du nicht auflösen konntest — mit Schlüssel und Grund

Lieber ein offener Punkt im Bericht als eine geratene Übersetzung in einem
Fachbegriff. Ein gemeldeter Zweifel kostet eine Rückfrage; eine falsche
Übersetzung einer Nennweite kostet eine Reklamation.
