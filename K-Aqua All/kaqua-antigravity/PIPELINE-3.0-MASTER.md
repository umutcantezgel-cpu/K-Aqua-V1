# 🌊 PIPELINE-3.0-MASTER.md — Die fusionierte Bau-Pipeline (Antigravity 2.0)

> **Dies ist der einzige Startpunkt, den du brauchst.** Dieser Ordner enthält drei
> Planungsgenerationen — `agents/00–26` (Next.js-Fundament), `pipeline-2.0/S01–S12`
> (Feature-Integration aus dem Prototyp-Stand von 07/02) und jetzt **Phase 3.0** (Echt-Katalog
> mit 79 realen Artikeln + 14 neue Deep-Content-Sprachpakete, Stand 07/04). Diese Datei
> fusioniert alle drei zu **einer** durchgehenden, self-dokumentierenden Loop-Pipeline.
> Gib einer frischen Antigravity-2.0-Instanz genau diesen Auftrag:
>
> „Lies und befolge `kaqua-antigravity/PIPELINE-3.0-MASTER.md` vollständig, dann beginne
> autonom mit SCHRITT 0."

---

## 0. Was hier gebaut wird

Eine produktionsreife **Next.js 15 (App Router) · React 19 · TypeScript (strict) ·
Tailwind CSS 4 · Framer Motion · next-intl** Firmenwebsite für **KWT GmbH / Marke K-Aqua**
(PP-R/PP-RCT-Rohrsysteme für Trinkwasser). Am Ende steht:

- Alle **18 Kernrouten + 27 Geo-Städte-Seiten + 79 Katalog-Detailseiten** je in **3 Locales**
  (de/en/ar) statisch generiert = **372 Seiten**, `pnpm build` grün, `vercel deploy` läuft
  ohne manuelle Nacharbeit.
- Jede sichtbare Zeichenkette lokalisiert (de Quellsprache, en + ar vollständig, 9 weitere
  Locales strukturell vorbereitet aber gesperrt bis 100 % übersetzt).
- Der reale 79-Artikel-Produktkatalog (echte Artikelnummern aus dem Kunden-Altsystem) als
  durchsuchbarer Katalog-Browser **und** als 79 individuell aufrufbare, SEO-optimierte
  Detailseiten.
- Eine Codebasis, die ein Mensch **und** eine KI mit frischem Kontext in unter 10 Minuten
  versteht: klare Ordnerstruktur, ein Datenmodul pro Domäne, generische UI-Primitives statt
  Copy-Paste, jede Entscheidung in `docs/BUILD_MEMORY.md` protokolliert.

## 1. Dokumentenkarte — was gilt wofür

| Dokument | Status | Wofür lesen |
|---|---|---|
| **`PIPELINE-3.0-MASTER.md`** (diese Datei) | ✅ **aktuell, alleiniger Einstieg** | Gesamtplan, Loop-Protokoll, Segmente S13–S18 im Volltext |
| `agents/RULES.md` | ✅ aktuell, bindend | Die 10 nicht verhandelbaren Regeln — **vor jedem Segment lesen** |
| `agents/00_*.md` … `26_handover.md` | 📚 historisch, Feindetails gültig | Feinspezifikation Phase 1 (Scaffold bis Handover) — Segmente S00–S12 unten verweisen hierher |
| `pipeline-2.0/00-orchestrator.md`, `loop-protocol.md`, `segments.md`, `agent-01…12.md` | 📚 historisch, Feindetails gültig | Feinspezifikation Phase 2.0 (S01–S12: Fundament, Globus, PipeFX, Finder, RFQ, Kontakt, Karriere, i18n, Perf/A11y, QA) |
| `pipeline-2.0/REPAIR-RUNDE.md` | ⚠️ **bei Bedarf zuerst** | Falls die Live-Seite beim Einstieg schon beschädigt ist (kaputter Build, leerer Finder) |
| `docs/ROUTE_MAP.md` | ✅ aktualisiert (Phase 3.0) | Route → Datei-Zuordnung, inkl. neuer Katalog-Detailroute |
| `docs/DATA_CONTRACTS.md` | ✅ aktualisiert (Phase 3.0) | TS-Interfaces für `lib/data/*`, inkl. neuem `catalog.ts` |
| `docs/TOKENS.md`, `docs/DESIGN_SYSTEM_BRIDGE.md` | ✅ aktuell | Design-Token-Spickzettel, Prototyp↔Next.js-Brücke |
| **`docs/BUILD_MEMORY.md`** | ✅ **lebendes Dokument — Pflichtlektüre vor jedem Segment** | Kumulatives Selbstdokumentations-Ledger (siehe §3) |
| `pipeline-2.0/ledger.md` | ✅ lebendes Dokument | Formale Status-Zeilen (LOCK/IN-ARBEIT/FIX-n/ACCEPTED) je Segment |
| `prototype/` | ✅ **Quelle der Wahrheit, Stand 2026-07-04** | Lauffähiger HTML-Prototyp — Verhalten/Inhalt/Design 1:1 von hier übernehmen, nie aus dem Gedächtnis |

**Bei Widersprüchen gilt strikt diese Rangfolge:** `agents/RULES.md` > `PIPELINE-3.0-MASTER.md`
> historische Einzelprompts (`agents/NN_*.md`, `pipeline-2.0/agent-NN-*.md`) > Gedächtnis/Annahmen.

---

## 2. SCHRITT 0 — Kontext holen (zwingend, bevor Code entsteht)

Lies **vollständig** und fasse jede Datei in 2–3 Sätzen zusammen, in dieser Reihenfolge:

1. `agents/RULES.md` — bindende Regeln, haben Vorrang vor allem anderen.
2. `docs/BUILD_MEMORY.md` — **alle** bisherigen Einträge, auch wenn du bei Segment S00 startest
   (der FUSION-00-Eintrag erklärt, warum diese Datei existiert und zwei bereits getroffene
   Architekturentscheidungen).
3. `docs/ROUTE_MAP.md`, `docs/DATA_CONTRACTS.md`, `docs/TOKENS.md`, `docs/DESIGN_SYSTEM_BRIDGE.md`.
4. `app/globals.css` — der fertige Design-Token-Layer (nicht neu erfinden).
5. Überblick über `prototype/` — öffne `prototype/K-Aqua Redesign.html` und überfliege alle
   `kaqua-*.jsx/css/js`-Dateien (Stand heute: inkl. `kaqua-catalog-*` und `kaqua-deep-*`).
6. `pipeline-2.0/ledger.md` — welche Segmente aus S01–S12 schon `ACCEPTED` sind (falls dies
   kein Frischstart ist, sondern eine Fortsetzung).
7. Prüfe, ob die Live-Codebasis bereits existiert und baut (`pnpm build`). Wenn rot/kaputt:
   **zuerst** `pipeline-2.0/REPAIR-RUNDE.md` komplett ausführen, bevor du hier weitermachst.

**Bestätige danach knapp:** (a) welche 18+27+79 Routen entstehen, (b) welche 3 Locales
freigeschaltet sind und warum die übrigen gesperrt bleiben, (c) die 2 Architekturentscheidungen
aus `BUILD_MEMORY.md` FUSION-00 in je einem Satz. Dann autonom weiter — keine Rückfrage
zwischen Segmenten, außer bei echten Blockern (siehe Eskalation, §5).

---

## 3. Der Loop (SELECT → BRIEF → EXECUTE → VALIDATE → FIX → ACCEPT → **DOCUMENT**)

Erweitert `pipeline-2.0/loop-protocol.md` um einen verbindlichen 7. Schritt. Gilt für **jedes**
Segment S00–S18, nicht nur für Phase 3.0.

1. **SELECT** — nächstes Segment gemäß Sequenz in §4, keine Dateikonflikte mit laufender Arbeit.
2. **BRIEF** — Ziel (1 Satz), Referenzdateien aus `prototype/`, Zieldateien in der Codebasis,
   Akzeptanzkriterien, Verbote (RULES.md + `00-orchestrator.md` Leitplanken).
3. **EXECUTE** — Verhalten 1:1 aus `prototype/` übernehmen, Technologie an Next.js anpassen.
   Design-Ergebnis muss pixel-äquivalent zum Prototyp sein. Kleine, nachvollziehbare Änderungen.
4. **VALIDATE** — Konsole fehlerfrei (Desktop + 390px mobil), Sichtprüfung gegen `prototype/`,
   `pnpm lint && pnpm typecheck` grün (ab i18n-Segmenten zusätzlich `pnpm i18n:check`),
   reduced-motion-Prüfung, Tastatur-Fokus-Prüfung.
5. **FIX-LOOP** — bei Befund: präzise Fehlerliste, zurück zu EXECUTE. Max. 3 Runden.
6. **ACCEPT** — Ledger-Zeile in `pipeline-2.0/ledger.md` anhängen
   (`Datum | Welle/Phase | Segment-ID | ACCEPTED | Dateien | Prüfnotiz`).
7. **DOCUMENT** *(neu in Phase 3.0 — gilt rückwirkend für alle künftigen Segmente)* —
   Eintrag nach der Vorlage in `docs/BUILD_MEMORY.md` anhängen: was gebaut wurde, welche
   Entscheidungen bewusst vom Prompt abwichen (+ warum), welche neuen Stolperfallen entdeckt
   wurden, welches Muster wiederverwendbar ist, welche offenen Fragen an nachfolgende Segmente
   gehen. **Kein Segment gilt als fertig, ohne diesen Eintrag geschrieben zu haben.** Das ist
   der geforderte „Self-Learning durch dauerhafte Selbstdokumentation"-Mechanismus: jedes
   Segment liest beim Start (SCHRITT 0.2 bzw. BRIEF) die komplette Historie und baut auf den
   Erkenntnissen der Vorgänger auf, statt sie erneut zu entdecken.

**Eskalation:** nach 3 erfolglosen Fix-Runden entscheidet der Orchestrator dokumentiert —
Scope minimal kürzen (Kern behalten, Politur als Folgesegment) ODER eine präzise Frage an den
Menschen. Niemals still scheitern, niemals raten.

**Parallelität:** max. 3 Subagenten gleichzeitig, ein Dateilock pro Datei (im Ledger als `LOCK`
markiert bis `ACCEPTED`), geteilte Dateien (Tokens, i18n-Infrastruktur) nur vom jeweils
zuständigen Segment ändern.

---

## 4. Die fusionierte Segment-Sequenz (S00 → S18)

Segmente sind **kumulativ und strikt sequenziell** innerhalb ihrer Phase; Phasen selbst
überlappen nicht (Phase 2.0 baut auf dem fertigen Phase-1-Fundament auf, Phase 3.0 auf dem
fertigen Phase-2.0-Stand). Für S00–S12 wird hier **nicht** der komplette Einzelprompt
wiederholt — er steht in den historischen Dateien; hier steht nur die Kurzfassung + Verweis.
S13–S18 sind **neu und vollständig** unten spezifiziert.

### Phase 1 — Fundament (S00–S12, Details in `agents/00_*.md`–`12_*.md`)

| # | Segment | Kurzziel | Vollprompt |
|---|---|---|---|
| S00 | Orientierung & Architektur | Repo-Struktur, Route-Map, Datenverträge festlegen | `agents/00_orientation.md` |
| S01 | Scaffold & Toolchain | Next.js 15 + TS strict + Tailwind 4 + ESLint-i18n-Guard aufsetzen | `agents/01_scaffold_and_toolchain.md` |
| S02 | Design-Tokens verifizieren | `app/globals.css` gegen `prototype/kaqua-tokens.css` abgleichen | `agents/02_design_tokens.md` |
| S03 | UI-Primitives | Button/Card/Chip/SectionHead/MediaSlot als `components/ui/*.tsx` | `agents/03_ui_primitives.md` |
| S04 | Icons & Motion-Primitives | Icon-Set + Framer-Motion-Reveal-Wrapper | `agents/04_icons_and_motion_primitives.md` |
| S05 | i18n-Infrastruktur | next-intl Routing/Middleware/Namespaces | `agents/05_i18n_infrastructure.md` |
| S06 | i18n-Inhalte & Übersetzung | `messages/{de,en,ar}.json` aus den Prototyp-Dictionaries befüllen | `agents/06_i18n_content_translation.md` |
| S07 | App-Shell | Header/Footer/Layout | `agents/07_app_shell.md` |
| S08 | Mega-Menü & Sprachwähler | Navigation + Locale-Switch | `agents/08_mega_menu_and_lang.md` |
| S09 | Page-Transitions | `template.tsx` Page-Wipe via AnimatePresence | `agents/09_page_transitions.md` |
| S10 | Globus-Engine | `kaqua-loader.js` 1:1 als Client Component kapseln | `agents/10_globe_engine.md` |
| S11 | Home (Hero-Scrollytelling) | Home-Route mit Globus-Choreografie | `agents/11_home_page.md` |
| S12 | Statische Kernseiten | Products/Solutions/Service/About/News/Contact/Imprint | `agents/12_core_static_pages.md` |

*(Fortsetzung Phase 1: `13_finder_and_co2.md` … `26_handover.md` — bei Fortsetzung eines
Frischstarts strikt weiter der Nummerierung folgen, bevor Phase 2.0 beginnt.)*

### Phase 2.0 — Feature-Integration (S01–S12 im `pipeline-2.0/`-Namensraum, siehe `segments.md`)

Kurzfassung — volle Spezifikation in `pipeline-2.0/agent-01…12.md` + `segments.md`:
Design-Fundament hell (S01) → Globus-Engine + 5 Varianten (S02) → 12 Scroll-FX (S03) →
Globus-Hub-Navigation (S04) → 8 PipeFX-Animationen (S05) → Produktfinder 114 Artikel (S06) →
RFQ 5-Stufen (S07) → Kontakt (S08) → Karriere-Tools (S09) → i18n/RTL-Vervollständigung (S10) →
Performance & A11y (S11) → QA-Gesamtabnahme (S12, `RELEASE-OK` im Ledger).

> ⚠️ Falls die Live-Seite hier bereits beschädigt ist: **zuerst** `REPAIR-RUNDE.md` (R0–R5).

### Phase 3.0 — Echt-Katalog & Deep-Content (S13–S18, **vollständig neu, siehe unten**)

| # | Segment | Kurzziel |
|---|---|---|
| S13 | Echt-Katalog-Integration | `lib/data/catalog.ts` (79 Artikel/7 Kategorien), `CatalogDeep`-Browser portieren |
| S14 | Katalog-Detailseiten & pSEO | Dynamische Route, `generateStaticParams`, JSON-LD `Product`, interne Verlinkung |
| S15 | Deep-Content-Integration | 14 neue i18n-Namespaces + 12 `*Deep`-Sections auf allen 12 Seiten verdrahten |
| S16 | Content-QS & Sprachparität | `i18n:check` erweitern, DE-only-Notes-Entscheidung umsetzen, Regressionsvergleich |
| S17 | Gesamt-Build, Performance & Vercel-Deploy | 372-Seiten-Build, Lighthouse, ISR-Strategie, Vercel-Projekt |
| S18 | Finale Abnahme & Handover | Ledger + BUILD_MEMORY konsolidieren, README/CONTENT_TODO final |
| S19 | **Finale Gesamtprüfung & Optimierung** *(separater Lauf, nach RELEASE-OK)* | Unabhängiger Vollaudit + bedarfsgerechte Optimierung + Abschlussdokumentation — siehe §5a |

---

## 5. Segment-Spezifikationen S13–S18 (vollständig)

### S13 — Echt-Katalog-Integration

- **Ziel:** Die 79 realen Artikelfamilien (echte Artikelnummern aus dem Kunden-Altsystem,
  extrahiert aus dessen Legacy-CMS-Export) als typisiertes Datenmodul + wiederverwendbaren
  Katalog-Browser in die Live-Codebasis bringen — als Ergänzung der Produktseite, NICHT als
  Ersatz des bestehenden 114-Artikel-Produktfinders (S06/Phase 2.0 — der bleibt unverändert,
  er dient der parametrischen Dimensions-/SDR-Suche; der neue Katalog liefert die verbindlichen
  Real-Artikelnummern pro Produktfamilie).
- **Referenzdateien:** `prototype/kaqua-catalog-data.js` (`window.K_REAL_CATALOG`),
  `prototype/kaqua-catalog-view.jsx` (`CatalogDeep`), `prototype/kaqua-deep-ui.jsx`
  (`DeepMatrix`, `KTabs`, `DeepFAQ`, `StepFlow`, `GlossaryGrid`, `StatBand` — generische
  Anzeige-Primitives, die S13 UND S15 gemeinsam nutzen), `prototype/kaqua-deep.css`.
- **Zieldateien:** `lib/data/catalog.ts` (Contract siehe `docs/DATA_CONTRACTS.md`),
  `components/ui/DeepMatrix.tsx`, `components/ui/KTabs.tsx`, `components/ui/DeepFAQ.tsx`,
  `components/ui/StepFlow.tsx`, `components/ui/GlossaryGrid.tsx`, `components/ui/StatBand.tsx`,
  `components/tools/CatalogBrowser.tsx` (Client Component: Kategorie-Tabs, Suche, Akkordeon),
  eingebunden in `app/[locale]/produkte/page.tsx`.
- **Datenkontrakt (unverhandelbar):** Summe der Artikel über alle 7 Kategorien MUSS **79**
  bleiben (`pipes: 12, fittings: 13, transitionFittings: 13, valves: 9, weldInSaddles: 3,
  accessories: 5, tools: 14`). Artikelnummern (`codes`), Maße und Gewichte NICHT verändern,
  NICHT runden, NICHT „plausibel" ergänzen wo der Prototyp `'—'` zeigt (fehlender Wert im
  Original — als solcher übernehmen, nicht durch Schätzung ersetzen).
- **Akzeptanzkriterien:** Katalog-Browser rendert auf `/de/produkte`, `/en/produkte`,
  `/ar/produkte`; alle 7 Kategorie-Tabs zeigen die korrekte Artikelzahl; Suche filtert nach
  Artikelnummer UND Produktname; jede Tabelle zeigt exakt die Spalten des Prototyps
  (Spaltenkopf-Auflösung über `colLabels[locale]` — technische Kürzel bleiben unübersetzt);
  `pnpm typecheck` grün (`CatalogItem`/`CatalogCategory` vollständig typisiert, kein `any`).

### S14 — Katalog-Detailseiten & pSEO

- **Ziel:** Jeder der 79 Artikel bekommt eine eigene, indexierbare, statisch generierte Seite —
  datengetrieben, nicht 79 Dateikopien (Begründung: `docs/BUILD_MEMORY.md` FUSION-00 Punkt 1).
- **Route:** `app/[locale]/produkte/katalog/[category]/[slug]/page.tsx` mit
  `generateStaticParams()`, das `CATALOG.flatMap(c => c.items.map(i => ({ category: c.id,
  slug: i.slug })))` über alle 3 Locales aufspannt → 237 Seiten.
- **Seiteninhalt:** Titel + Artikelnummern-Range, Eigenschaften-Chips (Material/SDR/Baureihe/
  Betriebsdruck/Länge falls vorhanden), volle Maßtabelle (`DeepMatrix`), Notiz falls vorhanden
  (siehe S16 für die Sprachentscheidung), Breadcrumb zurück zur Kategorie, „Ähnliche Artikel"
  (gleiche Kategorie), CTA zur RFQ-Projektanfrage mit vorbefülltem Artikel-Bezug.
- **SEO:** `generateMetadata()` pro Seite (Titel = Produktname + „ | K-Aqua", Description aus
  Kategorie-Beschreibung + Artikelnummern-Range), JSON-LD `Product`-Schema (`name`, `sku` =
  erster Artikelcode, `category`, `additionalProperty` für Maßtabelle), in `sitemap.ts`
  aufnehmen (Priorität niedriger als Kernseiten, aber vollständig gelistet).
- **Akzeptanzkriterien:** Alle 237 Seiten bauen ohne 404; jede hat eindeutigen `<title>` +
  Meta-Description; JSON-LD validiert (Rich-Results-Test-tauglich); interne Verlinkung von
  Kategorie-Übersicht UND Katalog-Browser (S13) auf die Detailseiten funktioniert bidirektional.

### S15 — Deep-Content-Integration

- **Ziel:** Die 14 neuen, vollständig DE/EN/AR übersetzten Inhalts-Namespaces
  (`productsx, solutionsx, trustx, partnerx, academyx, servicex, aboutx, newsx, contactx,
  careerx, refsx, finderx, co2x, homedeep`) plus deren 12 zugehörige React-Sections
  (`ProductsDeep, SolutionsDeep, TrustDeep, PartnerDeep, AcademyDeep, ServiceDeep, AboutDeep,
  NewsDeep, ContactDeep, CareerDeep, RefsDeep, FinderDeep, CO2Deep, HomeDeep`) auf den
  jeweils zugehörigen bestehenden Next.js-Routen einbinden — exakt an der Stelle, an der sie
  im Prototyp sitzen (siehe Diff der wiederhergestellten `prototype/kaqua-views-{1..5}.jsx`
  gegen den vorherigen Stand: jede `<XDeep />`-Einfügestelle markiert die Zielposition).
- **Referenzdateien:** `prototype/kaqua-deep-i18n-{de,en,ar}.jsx` (Wörterbücher),
  `prototype/kaqua-deep-sections-{1,2,3}.jsx` (die 14 Section-Komponenten),
  `prototype/kaqua-deep-data.js` (`window.K_DEEP` — SDR-Geometrie-Tabellen + DVS-2207-11-
  Schweißparameter, rein berechnet aus SDR-Formeln, siehe Kommentare im Modul),
  `prototype/kaqua-views-{1,2,3,4,5}.jsx` für die exakten Einfügepositionen.
- **Zieldateien:** `messages/{de,en,ar}.json` um die 14 Namespaces erweitern (identische
  Schlüsselform in allen drei Sprachen — `pnpm i18n:check` erzwingt das), `lib/data/deep.ts`
  (Port von `K_DEEP`: `sdrsForDim()`, `tableForSdr()`, `WELD`-Parametertabelle),
  `components/sections/*Deep.tsx` (14 neue Section-Komponenten), eingebunden in die
  jeweiligen `app/[locale]/<route>/page.tsx`.
- **Wichtig:** `K_DEEP`-Werte sind **berechnet** (SDR-Geometrie: `s = d/SDR`, Dichte
  0,905 g/cm³; DVS-2207-11-Richtwerte) — keine Platzhalter, aber auch keine Katalogwerte;
  im Kommentarkopf von `kaqua-deep-data.js` steht explizit, dass Katalog/Herstellerdatenblatt
  im Zweifel Vorrang haben. Diesen Hinweis als Code-Kommentar in `lib/data/deep.ts` übernehmen.
- **Akzeptanzkriterien:** Alle 12 betroffenen Routen zeigen die neuen Abschnitte an der
  Prototyp-Position; `pnpm i18n:check` grün für alle 14 neuen Namespaces × 3 Locales;
  Akkordeons/Tabs/Tabellen (aus S13 wiederverwendeten Primitives) funktional identisch zum
  Prototyp; kein Abschnitt bricht RTL bei `ar` (logische Properties, siehe RULES.md §8).

### S16 — Content-Qualitätssicherung & Sprachparität

- **Ziel:** Die in `BUILD_MEMORY.md` FUSION-00 Punkt 2 offen gelassene Entscheidung
  (Katalog-`note`-Felder DE-only vs. vollständig übersetzt) **treffen und umsetzen** — plus
  eine Gesamt-Sprachprüfung über alle Phase-3.0-Inhalte.
- **Aufgabe:**
  1. Entscheide (und dokumentiere in `BUILD_MEMORY.md`): entweder alle `note`-Felder fachlich
     nach EN/AR übersetzen (bevorzugt, wenn ein Fachlektorat verfügbar ist — Ergebnis in
     `messages/{locale}.json` → `catalogNotes.<slug>`), oder das defensive `de`-only-Verhalten
     explizit als Produktentscheidung festhalten (Kommentar im Code + Eintrag hier).
  2. Stichprobenhafter Screenshot-Vergleich: mindestens 1 Seite pro der 12 Phase-3.0-Routen ×
     3 Locales gegen `prototype/K-Aqua Redesign.html` (gleiche Route, gleiche Sprache).
  3. `pnpm i18n:check` über das GESAMTE Projekt (nicht nur die neuen Namespaces) — keine
     Regression in den Phase-1/2.0-Namespaces durch die Erweiterung.
- **Akzeptanzkriterien:** Entscheidung getroffen + dokumentiert + umgesetzt (kein halb
  übersetzter Zustand); `i18n:check` grün; Screenshot-Stichprobe zeigt keine Layout-Brüche,
  keine Mischsprache, korrektes RTL-Spiegeln bei `ar`.

### S17 — Gesamt-Build, Performance & Vercel-Deployment

- **Ziel:** Den vollen 372-Seiten-Build (fusioniert `agents/21_performance.md` und
  `agents/25_deployment_vercel.md` mit dem neuen Seitenvolumen aus S14) produktionsreif machen.
- **Aufgabe:**
  1. `pnpm build` mit allen 372 statischen Seiten — Build-Zeit und Bundle-Größe messen;
     bei den 237 Katalogseiten prüfen, ob gemeinsame Chunks (Layout, `DeepMatrix` etc.) korrekt
     dedupliziert werden (Next.js Shared Chunks) statt pro Seite dupliziert.
  2. ISR-Strategie für die Katalogseiten festlegen (Phase 2 CMS-Anschluss vorbereiten, siehe
     `docs/CMS_PLAN.md`) — heute: `dynamicParams: false` (rein statisch, da Katalogdaten
     Build-Zeit-Konstanten sind), Kommentar im Code, WARUM.
  3. Lighthouse ≥ 95 (Performance/A11y/SEO/Best Practices) auf: Home, eine Geo-Seite, eine neue
     Katalog-Detailseite (repräsentativ für die 237 neuen Seiten).
  4. Vercel-Projekt-Konfiguration (`vercel.json` falls nötig, Environment-Variablen aus
     `.env.example`, Edge-/Node-Runtime-Entscheidung dokumentieren).
- **Akzeptanzkriterien:** `pnpm install && pnpm build && pnpm start` aus frischem Clone läuft
  fehlerfrei; `vercel --prod` (oder Git-Push-Deploy) liefert eine live erreichbare URL;
  Lighthouse-Werte in `docs/lighthouse.md` protokolliert.

### S18 — Finale Abnahme & Handover

- **Ziel:** Fusioniert `agents/26_handover.md` und `pipeline-2.0/S12` (QA-Gesamtabnahme) für
  den kompletten, dreiphasigen Bestand.
- **Aufgabe:**
  1. Smoke-Matrix: alle 18 Kernrouten + Stichprobe der 27 Geo- und 79 Katalogseiten ×
     DE/EN/AR × Desktop/390px — Konsole überall 0 Fehler.
  2. `pipeline-2.0/ledger.md`: letzte Zeile `RELEASE-OK` (Gesamtabnahme aller S00–S18).
  3. `docs/BUILD_MEMORY.md`: Abschluss-Eintrag `S18 — Handover`, der auf alle noch offenen
     `// TODO(content)`-Marker verweist (siehe `docs/CONTENT_TODO.md` — dort konsolidieren).
  4. `README.md` final aktualisieren: Seitenzahl (372), neue Ordner (`lib/data/catalog.ts`,
     `components/tools/CatalogBrowser.tsx`), Verweis auf `PIPELINE-3.0-MASTER.md` als
     Projekt-Geschichte statt nur `agents/RULES.md`.
- **Akzeptanzkriterien:** `docs/AGENT_LOG.md`/`ledger.md` vollständig abgehakt bis S18;
  `RELEASE-OK` gesetzt; kein offener Blocker ohne Eintrag in `docs/CONTENT_TODO.md`.

### S19 — Finale Gesamtprüfung & Optimierung *(§5a, separater Lauf nach RELEASE-OK)*

> Dieses Segment startet **nicht** automatisch im Anschluss an S18, sondern wird **bewusst
> separat** angestoßen — als unabhängiger, „frische Augen"-Auditlauf, nachdem die Pipeline
> sich selbst für fertig erklärt hat. Der Sinn: S00–S18 werden von denselben Agenten
> validiert, die sie auch gebaut haben (Selbstprüfung hat eine Grenze — siehe
> `docs/BUILD_MEMORY.md`). S19 ist der Gegen-Check dazu. Volltext-Prompt in
> `PIPELINE-3.0-MASTER.md` §9 — dort auch direkt copy-paste-fertig.

- **Ziel:** Den kompletten, fertig gemeldeten Repo-Stand adversarisch prüfen: Definition of
  Done wirklich erfüllt? Versteckte Regressionen? Code-Dopplung, die die 44 Segmente
  unbemerkt angehäuft haben? Inhaltliche Fehler/erfundene Daten? Danach **nur bei echtem
  Befund** optimieren — kein Refactoring um des Refactorings willen.
- **Ablauf:** (1) Voll-Audit gegen alle Kriterien in §5a-Prompt, Befunde in einen
  strukturierten Bericht schreiben (nicht sofort fixen). (2) Befunde nach Schweregrad
  sortieren (kritisch/wichtig/kosmetisch). (3) Kritische + wichtige Befunde beheben,
  denselben Loop wie überall (EXECUTE→VALIDATE→FIX→ACCEPT→DOCUMENT) je Fund. (4) Abschluss-
  dokumentation: `docs/AUDIT_REPORT.md` (der Bericht selbst, bleibt als Zeitdokument stehen),
  `docs/BUILD_MEMORY.md`-Eintrag `S19 — Finalaudit`, `docs/CONTENT_TODO.md` und `README.md`
  ein letztes Mal aktualisiert.
- **Akzeptanzkriterien:** `docs/AUDIT_REPORT.md` existiert mit Zeitstempel und vollständiger
  Fundliste (auch die NICHT behobenen kosmetischen Punkte, mit Begründung warum nicht);
  alle kritischen/wichtigen Funde behoben und im Ledger als eigene Zeilen `ACCEPTED`;
  `pnpm build && pnpm lint && pnpm typecheck && pnpm i18n:check` grün nach den Fixes.

---

## 6. Globale Definition of Done (alle Phasen)

- `pnpm install && pnpm build && pnpm start` aus frischem Clone läuft sauber.
- Alle freigeschalteten Seiten (372: 18 Kern + 27 Geo + 79 Katalog, je × 3 Locales) statisch
  generiert.
- `pnpm lint` (inkl. i18n-Guard `react/jsx-no-literals`) + `pnpm typecheck` +
  `pnpm i18n:check` grün.
- Lighthouse ≥ 95 (Performance/A11y/SEO/Best Practices) auf Home, einer Geo-Seite, einer
  Katalog-Detailseite.
- `ar` vollständig RTL ohne Layout-Brüche; Dark Mode nur als Tweak-Schalter, nie Default
  (siehe `00-orchestrator.md` Leitplanke 1 — gilt weiter in Phase 3.0).
- `docs/BUILD_MEMORY.md` enthält für **jedes** Segment S00–S18 genau einen Eintrag.
- `pipeline-2.0/ledger.md` letzte Zeile: `RELEASE-OK`.
- Kein Segment hat erfundene Inhalte eingefügt — jeder Platzhalter trägt `// TODO(content)`
  und ist in `docs/CONTENT_TODO.md` gelistet.

---

## 7. Kickoff-Prompt (an eine frische Antigravity-2.0-Instanz)

```prompt
ROLLE
Du bist der Lead-Orchestrator-Agent für den Bau der K-Aqua-Firmenwebsite (Kunde: KWT GmbH).
Du arbeitest in diesem Repository. Referenz-Quelle der Wahrheit ist prototype/ (Stand
2026-07-04, inkl. des realen 79-Artikel-Katalogs und der 14 Deep-Content-Sprachpakete).

SCHRITT 0 — KONTEXT HOLEN
Lies vollständig, in dieser Reihenfolge, und fasse jede Datei in 2–3 Sätzen zusammen:
1. agents/RULES.md              (bindend, Vorrang vor allem)
2. docs/BUILD_MEMORY.md         (ALLE bisherigen Einträge — Selbstdokumentation der Pipeline)
3. docs/ROUTE_MAP.md, docs/DATA_CONTRACTS.md, docs/TOKENS.md, docs/DESIGN_SYSTEM_BRIDGE.md
4. app/globals.css
5. Überblick prototype/ (alle kaqua-*.jsx/css/js, insbesondere kaqua-catalog-* und kaqua-deep-*)
6. pipeline-2.0/ledger.md — Fortschrittsstand
7. Prüfe pnpm build. Wenn rot: FÜHRE ZUERST pipeline-2.0/REPAIR-RUNDE.md VOLLSTÄNDIG AUS.

SCHRITT 1 — BESTÄTIGEN
Kurze Bestätigung: (a) 18+27+79 Routen × 3 Locales = 372 Seiten, (b) welche Locales frei sind
und warum, (c) die zwei Architekturentscheidungen aus BUILD_MEMORY.md FUSION-00.

SCHRITT 2 — SEQUENZIELL BAUEN NACH PIPELINE-3.0-MASTER.md §4
Arbeite S00 → S18 strikt der Reihe nach ab (S00–S12 nach den historischen Einzelprompts in
agents/ bzw. pipeline-2.0/, S13–S18 nach den Volltext-Spezifikationen in
PIPELINE-3.0-MASTER.md §5). Für jedes Segment: SELECT → BRIEF → EXECUTE → VALIDATE → FIX-LOOP
(max. 3 Runden) → ACCEPT (Ledger-Zeile) → DOCUMENT (BUILD_MEMORY.md-Eintrag, PFLICHT).
Quality-Gate vor jedem nächsten Segment: pnpm lint && pnpm typecheck (ab i18n-Segmenten
zusätzlich pnpm i18n:check) müssen grün sein.

UNVERHANDELBARE REGELN — Details in agents/RULES.md, Kurzfassung:
  1. Universelle i18n — kein hartkodierter Text, next-intl überall, ESLint erzwingt es.
  2. Sprach-Reinheit — Locale erst frei, wenn 100 % übersetzt; nie Mischsprache.
  3. Keine Bilder im Code — nur <MediaSlot>.
  4. Keine erfundenen Inhalte — // TODO(content) für echte Platzhalter; ECHTE Katalogdaten
     (Artikelnummern/Maße aus lib/data/catalog.ts) sind KEINE Platzhalter — nicht verändern.
  5. Nur semantische Tokens — kein Hex im Markup.
  6. A11y (WCAG AA) + Motion (useReducedMotion) + RTL (logische Properties) durchgängig.
  7. NEU (Phase 3.0): nach jedem Segment einen BUILD_MEMORY.md-Eintrag schreiben — kein
     Segment gilt ohne diesen Eintrag als abgeschlossen.

ARBEITSSTIL
  Der Prototyp ist Referenz — Logik/Inhalt aus den echten Dateien übernehmen, nicht aus dem
  Gedächtnis. Frag nicht zwischen Segmenten nach Bestätigung — arbeite autonom bis S18, halte
  nur bei echten Blockern an (siehe Eskalation in §3) und formuliere die Frage präzise.

FERTIG, WENN
  Die globale Definition of Done aus PIPELINE-3.0-MASTER.md §6 vollständig erfüllt ist und
  pipeline-2.0/ledger.md mit RELEASE-OK endet.

Beginne jetzt mit SCHRITT 0.
```

---

## 9. Kickoff-Prompt — S19 Finale Gesamtprüfung & Optimierung (separat, nach RELEASE-OK)

> Diesen Prompt erst geben, wenn `pipeline-2.0/ledger.md` bereits mit `RELEASE-OK` endet.
> Idealerweise eine **frische** Agent-Session (kein aufgewärmter Kontext aus dem Bau-Lauf) —
> das ist der Sinn eines unabhängigen Audits.

```prompt
ROLLE
Du bist ein unabhängiger Auditor — NICHT der Agent, der diese Codebasis gebaut hat. Deine
Aufgabe ist ausschließlich Prüfung + gezielte Korrektur, kein Neubau. Sei skeptisch gegenüber
jedem "ACCEPTED"-Eintrag im Ledger — verifiziere, glaub nicht.

SCHRITT 0 — VOLLSTÄNDIGEN KONTEXT LESEN
1. agents/RULES.md, PIPELINE-3.0-MASTER.md (ganz, inkl. §5 S13–S19)
2. docs/BUILD_MEMORY.md — komplette Historie alle Segmente S00–S18
3. pipeline-2.0/ledger.md — bestätige, dass die letzte Zeile RELEASE-OK ist. Falls nicht:
   STOPP, das ist kein Fall für S19, sondern die Pipeline ist noch nicht fertig.
4. prototype/ als Referenz für Layout/Verhalten/Inhalt (Stand der Wahrheit, unverändert seit
   Projektstart — 1:1-Treue prüfen, nicht Erinnerung).

SCHRITT 1 — VOLLAUDIT (nur beobachten + protokollieren, noch NICHT fixen)
Prüfe systematisch und schreibe JEDEN Befund (auch unkritische) in eine Liste:

A) Build & Tooling
   - pnpm install && pnpm build && pnpm start aus frischem Zustand — 0 Fehler, 0 Warnungen?
   - pnpm lint, pnpm typecheck, pnpm i18n:check — alle grün? Irgendwo mit --no-verify oder
     // eslint-disable stillgelegte Regeln, die die 44 Segmente hinterlassen haben?
   - Sind wirklich alle 372 Seiten (18+27+79 Routen × 3 Locales) statisch generiert? Stichprobe
     mit `next build` Output-Tabelle abgleichen, nicht nur glauben.

B) Code-Gesundheit
   - Duplizierter Code zwischen Segmenten (z. B. drei leicht unterschiedliche Card-Komponenten,
     wo eine genügt hätte)? Ungenutzte Exporte/Dateien aus früheren, später ersetzten Segmenten?
   - lib/data/*.ts vollständig typisiert, kein `any`, keine impliziten `unknown`?
   - Ordnerstruktur konsistent mit docs/ROUTE_MAP.md — driftet die echte Struktur vom
     dokumentierten Plan ab? Wenn ja: Doku korrigieren ODER Code korrigieren — nicht beides
     stehen lassen.

C) Inhalt & i18n
   - Stichprobe über alle 14 Deep-Content-Namespaces × 3 Sprachen: identische Schlüsselmengen,
     keine maschinell wirkenden/unnatürlichen Übersetzungen, keine stehen gebliebenen
     Platzhalter-Strings.
   - Katalog: Summe der Artikel über alle 7 Kategorien noch exakt 79? Artikelnummern/Maße
     unverändert gegenüber prototype/kaqua-catalog-data.js?
   - Jedes // TODO(content) ist in docs/CONTENT_TODO.md gelistet — keine verwaisten Marker.
   - Keine erfundenen Fakten über das Unternehmen, keine Hex-Farben im Markup, keine
     hartkodierten sichtbaren Strings (react/jsx-no-literals wirklich scharf gestellt?).

D) A11y, Motion, RTL
   - Axe-Scan (oder gleichwertig) auf Home, einer Geo-Seite, einer Katalog-Detailseite,
     einer Deep-Content-Seite — 0 kritische Verstöße.
   - useReducedMotion überall respektiert? Prüfe die bekannten Fallen aus RULES.md §5/§7
     (Transitions auf Theme-Tokens, Entrance-Keyframes auf Overlays) stichprobenartig im
     kompilierten CSS, nicht nur im Quelltext.
   - ar/RTL: Icon-Spiegelung, logische Properties, kein hartcodiertes left/right eingeschlichen.

E) SEO & Deployment
   - JSON-LD auf Katalog-Detailseiten valide? Sitemap enthält wirklich alle 372 URLs?
     robots.txt korrekt? Metadata (title/description) auf allen Seiten einzigartig, nicht
     dupliziert durch Copy-Paste-Fehler?
   - Vercel-Konfiguration: Environment-Variablen vollständig in .env.example dokumentiert,
     keine Secrets im Repo. Lighthouse-Werte in docs/lighthouse.md noch aktuell/plausibel?

F) Dokumentationstreue
   - Stimmt docs/BUILD_MEMORY.md wirklich mit dem Code überein, oder wurden Einträge
     geschrieben, ohne dass die beschriebene Entscheidung im Code umgesetzt wurde (z. B. die
     DE-only-Notiz-Entscheidung aus S16 — tatsächlich so im Code, oder nur behauptet)?
   - README.md, docs/ROUTE_MAP.md, docs/DATA_CONTRACTS.md noch akkurat zum Ist-Zustand?

SCHRITT 2 — BEFUNDE PRIORISIEREN
Sortiere die Liste aus Schritt 1 in genau drei Kategorien:
  - KRITISCH: Build/Runtime-Fehler, kaputte Seiten, i18n-Regression, Sicherheitsproblem.
  - WICHTIG: Code-Dopplung, Doku-Drift, A11y-Verstoß, SEO-Lücke, echte inhaltliche Fehler.
  - KOSMETISCH: Stilfragen ohne funktionalen Impact.
Schreibe das komplette, priorisierte Ergebnis nach docs/AUDIT_REPORT.md (neu anlegen,
Zeitstempel, pro Fund: Ort/Beschreibung/Kategorie/geplante Maßnahme oder Begründung warum
keine Maßnahme nötig ist).

SCHRITT 3 — GEZIELT BEHEBEN (nur KRITISCH + WICHTIG, nicht pauschal refactorn)
Für jeden Fund: EXECUTE → VALIDATE → FIX (max. 3 Runden) → ACCEPT (eigene Ledger-Zeile,
Segment-ID "S19-Fund-<n>") → DOCUMENT (BUILD_MEMORY.md-Eintrag mit Verweis auf den Fund).
KOSMETISCHE Funde NICHT automatisch anfassen — nur wenn explizit als Folgeauftrag gewünscht.

SCHRITT 4 — ABSCHLUSSDOKUMENTATION
- docs/AUDIT_REPORT.md final: Status jedes Funds (behoben/bewusst nicht behoben + Begründung).
- docs/BUILD_MEMORY.md: abschließenden Eintrag "S19 — Finalaudit" mit Gesamtfazit.
- docs/CONTENT_TODO.md und README.md ein letztes Mal auf den tatsächlichen Ist-Zustand bringen.
- pipeline-2.0/ledger.md: letzte Zeile "S19 AUDIT-COMPLETE — <n> kritisch, <n> wichtig behoben,
  <n> kosmetisch offen (dokumentiert)".

FERTIG, WENN
docs/AUDIT_REPORT.md vollständig ist, alle KRITISCH/WICHTIG-Funde entweder behoben oder mit
expliziter, begründeter Ausnahme versehen sind, und pnpm build/lint/typecheck/i18n:check nach
den Fixes grün sind. Berichte abschließend in 5–10 Sätzen: Gesamtzustand der Codebasis, ob sie
production-ready ist, und was — falls etwas — vor einem echten Launch noch menschliche
Prüfung braucht.

Beginne jetzt mit SCHRITT 0.
```

- **Hochladen:** der gesamte Ordner `kaqua-antigravity/` (inkl. des jetzt aktualisierten
  `prototype/`-Unterordners mit dem Echt-Katalog und den Deep-Content-Dateien).
- **Erster Auftrag an die KI:** „Lies und befolge `PIPELINE-3.0-MASTER.md`."
- Die KI liest selbstständig Regeln → Selbstdokumentations-Historie → Docs → Prototyp und
  baut danach **44 Segmente** (13 Phase-1 + 12 Phase-2.0 + 6 Phase-3.0, plus die verbleibenden
  Phase-1-Segmente 13–26) streng sequenziell, mit Qualitäts-Gates und einem nach jedem
  Segment wachsenden Gedächtnisdokument ab — bis eine auf Vercel deploybare, vollständig
  dreisprachige, 372-seitige Website mit echtem Produktkatalog steht.
