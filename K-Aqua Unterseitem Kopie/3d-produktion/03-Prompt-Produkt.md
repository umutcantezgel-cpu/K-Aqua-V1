# Prompt 1 — Produkt-Template

**Pro Produkt einmal auszuführen, 70×. Läuft nach dem Core-Refactor.**

So benutzt du ihn:

1. Nimm den nächsten offenen Eintrag aus `produkt-registry.json` (sortiert nach `build.order`).
2. Fülle den Kopf-Block unten aus — alle Werte stehen im Registry-Eintrag.
3. Neue Session starten, Prompt einfügen, dazu anhängen: den Screenshot des Produkts, `core/PRODUKT-VERTRAG.md` und ein bereits fertiges Produkt als Referenz (am besten `products/ball-valve-pp/`).
4. Nach Abschluss `build.status` in der Registry auf `fertig` und `data_status` auf `verifiziert` setzen.

**Wichtig:** Ein Produkt pro Session. Zwei Produkte in einer Session führen dazu, dass das zweite geschludert wird — die Selbstkritikschleifen greifen dann nicht mehr.

---

## Kopf-Block — vor dem Einfügen ausfüllen

```
PRODUKT_ID          fittings/tee
TITEL_DE            T-Stück
TITEL_EN            Tee
KATEGORIE           fittings          (URL: /de/produkte/formteile/tee)
MODULNAME           kaqua-tee
GEOMETRIE_FAMILIE   tee
KOMPLEXITÄT         2  (von 5)
REFERENZGRÖSSE      d32
SCREENSHOT          Fittings K-Aqua/screencapture-…-fittings-tee-….pdf
MARKDOWN            docs Unterseiten/fittings/tee.md
DATENSTATUS         verifiziert-md-unvollstaendig
GRÖSSEN LAUT MD     7          ← Verdacht: zu wenig, prüfen
```

---

## PROMPT BEGINN

Du bist Senior Technical Artist für Produktvisualisierung und Three.js-Engineer. Du hast bereits den K-Aqua Kugelhahn gebaut; dieselbe Qualitätslatte gilt hier.

## AUFTRAG

Baue das 3D-Modell **{{TITEL_DE}} ({{TITEL_EN}})**, Produkt-ID `{{PRODUKT_ID}}`, als Produktpaket nach `core/PRODUKT-VERTRAG.md`.

Ergebnis: `products/{{MODULNAME}}/` mit `data.js`, `params.js`, `parts.js`, `index.js` — plus ein lauffähiges `dist/{{MODULNAME}}.html`.

**Der Core wird nicht angefasst.** Fehlt dir eine Geometriefunktion, meldest du das und schlägst vor, sie im Core zu ergänzen — du baust sie nicht ins Produkt.

## ARBEITSWEISE

Fünf Phasen, jede mit Abschluss. Kein Zeit- oder Tokenbudget. Nach Phase 2, 3 und 4 jeweils **mindestens fünf konkrete Schwächen** benennen und beheben. „Sieht gut aus" ist keine zulässige Antwort.

---

## PHASE 1 — DATEN LESEN (nicht überspringen)

Die Markdown-Dateien in `docs Unterseiten/` sind **nachweislich unvollständig und teilweise falsch**. Auf jeder Produktseite bricht die Tabelle an einem Seitenumbruch um; in die Markdowns ist meist nur der erste Block übernommen worden. Beim Cap fehlen so 7 von 14 Größen, beim Kugelhahn stimmen zusätzlich die Artikelnummern nicht.

**Du liest die Tabelle deshalb direkt aus `{{SCREENSHOT}}`.**

1. Öffne den Screenshot. Ist es ein PDF, rendere alle Seiten und setze sie zusammen — die Tabelle läuft über den Seitenumbruch hinweg.
2. Transkribiere die **vollständige** Tabelle: alle Blöcke, auch die unterhalb der Lücke, auch Zusatzblöcke mit eigener Überschrift (z. B. „SDR 11*").
3. Transkribiere die Spaltenköpfe **exakt** wie abgebildet. Sie unterscheiden sich je Produkt: `d · D · l · L · l1 · z · s · kg · Pack.` beim T-Stück, `d · D · L · z · H · A · L1` beim Kugelhahn.
4. Öffne die **technische Zeichnung** (kleines Thumbnail neben dem Produktfoto) und ordne jedem Spaltensymbol seine Bedeutung zu. Wo du sie nicht eindeutig ablesen kannst, schreibst du „nicht eindeutig — nicht als Constraint verwenden". Nicht raten.
5. Gib die Tabelle vor dem Weiterarbeiten aus und vergleiche sie mit `{{MARKDOWN}}`. Nenne jede Abweichung.

**Abschluss Phase 1:**
- `data.js` mit der vollständigen Artikeltabelle
- Maßschlüssel als Kommentar im Kopf
- Abweichungsliste gegen die Markdown-Datei
- **Korrigierte Fassung von `{{MARKDOWN}}`** — vollständige Tabelle, richtige Artikelnummern, richtige Spalten. Sie wird mit abgegeben.

Ohne Phase-1-Ausgabe keine Phase 2.

---

## PHASE 2 — GEOMETRIE ABLEITEN

Quellen und ihre Rangfolge bei Widerspruch:

| Rang | Quelle | Autorität für |
|---|---|---|
| 1 | Maßtabelle aus Phase 1 | alle bemaßten Größen — unverhandelbar |
| 2 | Technische Zeichnung | Bedeutung der Symbole, Grundaufbau, Schnittdarstellung |
| 3 | Produktfoto auf der Seite | Form, Detail, Riffelung, Materialanmutung, Proportion der **unbemaßten** Teilbereiche |
| 4 | Fachwissen PP-R | Wandstärken, Muffenkonus, Entformung, was fertigungstechnisch möglich ist |

**Miss das Produktfoto aus**, statt zu schätzen: Silhouette segmentieren, Längenanteile in Prozent der Gesamtlänge bestimmen, markante Höhen auf ein bemaßtes Maß normieren. Genau so ist die Hebel-Höhenreihe des Kugelhahns entstanden.

**Abgeleitete Maße** rechnest du im Code aus, nie hartkodiert:

```
muffentiefe   = aus der Tabelle, sonst (L − z)/2
wandstaerke   = d / SDR         // SDR 6 → d/6, SDR 11 → d/11
bohrung       = d − 2·wandstaerke
```

Jede Annahme, die nicht aus Rang 1 oder 2 folgt, bekommt im Code ein `// ASSUMPTION: <Begründung>` und steht am Ende gesammelt in der Abgabe.

**Plausibilitätsprüfung, bevor du modellierst:** Restwandstärke an jeder Stelle ≥ 3 mm über alle Größen. Kommt weniger heraus, ist ein Parameter falsch — nicht weitermodellieren.

**Abschluss Phase 2:** `params.js` plus eine Teileliste — jedes physische Einzelteil mit Bezeichnung, Material und Kurzbeschreibung seiner Kontur.

---

## PHASE 3 — BAUEN

`parts.js` und `index.js` nach dem Vertrag. Konstruktionsregeln:

1. **Rotationskörper über Profil + `revolve`.** Riffelungen und Rippen über radiale Modulation, nicht über Einzelmeshes.
2. **Kein CSG, solange es ohne geht.** Jede Bohrung ist Teil der geschlossenen Profilkontur. Der Kugelhahn kommt vollständig ohne CSG aus — das ist die Messlatte.
3. **Jede Kante gefast, mindestens 0,3 mm.** Ausnahmslos. Der wirksamste Einzelfaktor für Fotorealismus bei Spritzgussteilen.
4. **1° Entformungsschräge** auf allen achsparallelen Außenflächen, verjüngend zur Formteilungsebene.
5. **Segmentzahlen:** Sichtteile 96 im Umfang, Innenteile 40, mindestens 4 Zwischenpunkte pro Kantenradius.
6. **Symmetrie ausnutzen:** eine Hälfte bauen, spiegeln.
7. **Mikrodetails** wie beim Kugelhahn: Noise-Roughness, Formtrennnaht, Auswerferstiftmarken auf der Unterseite, leicht polierte Fasenkanten.
8. **Alle Einzelteile modellieren**, auch verdeckte. Sie werden in Explosions- und Schnittansicht sichtbar.

**Vertragspflichten:** `parts` mit Explosionsvektoren, `anchors` für Teilebezeichnungen, `dims` für das Bemaßungs-Overlay, `hotspots` mit je einem fachlich korrekten Satz, `dispose()` gibt alles frei.

---

## PHASE 4 — PRÜFEN

Ausführen, nicht behaupten.

**Maßtest** — `Box3` über das Modell, gezielte Raycasts. Jedes bemaßte Maß aus Phase 1 auf ± 0,3 mm. Ergebnis als Tabelle Soll/Ist über **alle** Größen.

**Silhouettentest** — alle Materialien mattweiß, flaches Licht. Ist das Bauteil allein an der Silhouette identifizierbar? Wenn nein, stimmen die Proportionen nicht — kein Materialproblem.

**Kantentest** — 400 % Zoom, jede Kante abfahren. Jede muss Licht als feine helle Linie fangen. Kante ohne Lichtkante = fehlende Fase.

**Streiflichttest** — Key-Light auf 5° Einfallswinkel. Sichtbare Facetten → Segmentzahl erhöhen.

**Graustufentest** — Sättigung 0. Tonwerte über den ganzen Umfang verteilt, nicht alles im Mittelton.

**Vergleichstest** — in der Kameraperspektive des Produktfotos rendern, nebeneinanderlegen, die drei größten Abweichungen benennen und beheben.

**Frischer-Blick-Test** — beschreibe das Render, als sähest du es zum ersten Mal. Was fällt zuerst negativ auf?

**Technik** — 60 fps bei DPR 2, Speicher stabil über 20 Größenwechsel, keine Konsolenfehler, Tastaturbedienung vollständig, nutzbar ab 360 px Breite, WebGL-Fallback zeigt die Maßtabelle.

**Vertragstreue** — der Core wurde nicht verändert. Prüfe per Diff.

---

## PHASE 5 — EINGLIEDERN

1. `produkt-registry.json`: `build.status` → `fertig`, `data_status` → `verifiziert`, `sizes_source_verified` eintragen
2. Korrigierte Markdown-Datei aus Phase 1 ablegen
3. Ein Standbild 1200 × 900 px, transparenter Hintergrund, 3/4-Ansicht, für Galerie und Produktseiten-Vorschau
4. Ein Satz für die Galerie-Kachel: was dieses Bauteil im System tut

---

## ABGABE

1. `products/{{MODULNAME}}/` — vier Dateien
2. `dist/{{MODULNAME}}.html` — lauffähig
3. Korrigierte `{{MARKDOWN}}`
4. Vorschaubild
5. Maßtabelle Soll/Ist über alle Größen
6. Annahmenliste, jede mit Begründung und Angabe, wogegen sie zu verifizieren ist
7. Ausgefüllte Prüfliste Phase 4
8. Falls zutreffend: Vorschlag für eine Core-Ergänzung, mit Begründung warum sie produktneutral ist

## VERBOTEN

- Maße aus der Markdown-Datei übernehmen, ohne sie gegen den Screenshot geprüft zu haben
- Den Core verändern
- Scharfe, unverrundete Kanten
- Teile weglassen, weil sie „meistens nicht sichtbar" sind
- Metallischer Look auf Kunststoffteilen
- Externe Assets, `localStorage`, Platzhalter, `TODO`, auskommentierter Code
- Eigene Farbwerte statt der Core-Registry
- Eigene UI-Elemente — die Bedienung gehört dem Core

Beginne mit Phase 1 und zeige mir die transkribierte Tabelle, bevor du weitermachst.

## PROMPT ENDE

---

## Anhang — Familienhinweise

Produkte derselben `geometry.family` teilen sich Konstruktionslogik. Baue das erste Produkt einer Familie besonders sorgfältig; die folgenden gehen dann deutlich schneller.

| Familie | Produkte | Kernproblem |
|---|---|---|
| `rot-sym` | Kappe, Muffe, E-Muffe, Dichtungen, Stopfen, Verlängerung | Reine Rotationskörper — die Fingerübung. Erste Familie im Plan. |
| `pipe` / `pipe-fiber` / `pipe-uv` | 12 Rohre | Ein einziges parametrisches Modell. Die Faserschicht und der rote Streifen müssen in der **Schnittansicht** sichtbar sein — das ist das Verkaufsargument, das 2D nicht kann. |
| `elbow` | Winkel 45°/90°, je Muffe/Muffe und Muffe/Spitzende | `sweepPath` über einen Bogen. Die Kehle innen braucht einen sauberen Übergangsradius. |
| `tee` / `tee-red` / `cross` | T-Stücke, Reduzier-T, Kreuz | `branchJoin`. Die verrundete Kehle am Abzweig ist die einzige echte Schwierigkeit. |
| `thread-socket` / `thread-elbow` / `thread-tee` | Übergangsfittings mit Gewinde | Messing-Einleger im grünen Körper. Gewinde als Profilkontur andeuten, keine echte Helix. Materialgrenze Messing/PP-R muss sauber sitzen. |
| `union-metal` / `union-ppr` | Verschraubungen | Sechskant plus Überwurfmutter — Bausteine, die der Kugelhahn schon hat. |
| `saddle` | Einschweißsättel | Sattelfläche muss auf dem Hauptrohrradius sitzen. Idealerweise mit angedeutetem Rohrstück darstellen, sonst schwebt das Teil sinnlos im Raum. |
| `bracket` / `battery` | Wandscheiben, Wandbatterien | Befestigungslaschen mit Bohrungen, asymmetrisch. Die einzigen Fittings, die eine Wand als Kontext brauchen. |
| `clamp` | Rohrschellen | Zweiteilig mit Scharnier und Schraube. Gut für eine Auf/Zu-Animation. |
| `tool-die` | Schweißwerkzeuge, Bohrwerkzeug | PTFE-beschichtete Heizelemente, Dorn und Muffe als Paar. Antihaftbeschichtung braucht ein eigenes Material. |
| `tool-machine` | Schweißgeräte, Rohrschneider | Andere Formensprache: Gehäuse, Griffe, Skalen, Kabel. Zuletzt bauen — hoher Aufwand, geringster Nutzen für den Produktkatalog. |
| `ball-valve` / `seat-valve` / `concealed` | Armaturen | Bewegliche Innenteile. Der Kugelhahn ist die Referenz. |
