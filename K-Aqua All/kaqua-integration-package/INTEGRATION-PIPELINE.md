# Integrations-Pipeline — Katalog & Deep-Content in K-Aqua-V1

Zielrepo: `umutcantezgel-cpu/K-Aqua-V1` (main). Segmente sind additiv und sequenziell;
jedes Segment endet mit einem Pflicht-Eintrag in `INTEGRATION-MEMORY.md`. Bei Widerspruch
gilt `agents/RULES.md` (im Zielrepo) > dieses Dokument > Einzelmeinung.

**Globale Leitplanken (aus `agents/RULES.md` des Zielrepos übernommen, nicht neu erfunden):**
kein hartkodierter sichtbarer Text (alles über `useTranslations`/`getTranslations`), keine
erfundenen Inhalte, nur semantische Tailwind-Klassen/Tokens (kein Hex im Markup), RTL über
logische Properties, `useReducedMotion` respektieren, Touch-Targets ≥ 44×44px.

---

## I01 — Datenmodule

**Ziel:** Reale Katalog- und Deep-Content-Daten als typisierte TS-Module verfügbar machen,
ohne die bestehende `lib/data/products.ts` (Finder-Matrix) anzufassen.

**Referenzdateien (dieses Paket):** `data/catalog.ts`, `data/deep-content.ts`,
`data/repositories.additions.ts`.

**Zieldateien (echtes Repo):**
- `lib/data/catalog.ts` — neu, Inhalt aus `data/catalog.ts` unverändert übernehmen.
- `lib/data/deep.ts` — neu, Inhalt aus `data/deep-content.ts` unverändert übernehmen.
- `lib/data/repositories.ts` — **bestehende Datei erweitern** (nicht überschreiben): die
  Funktionen aus `data/repositories.additions.ts` in den bestehenden „Product Repository"-
  Block einfügen, den Import-Block am Kopf ergänzen, bestehende Funktionen (`getProducts`,
  `getMarkets`, …) unverändert lassen.

**Akzeptanzkriterien:**
- `pnpm typecheck` grün; `CatalogItem`/`CatalogCategory`/`DimRow` vollständig typisiert,
  kein `any`.
- `getCatalogTotalArticleCount()` liefert `71` zur Laufzeit (nicht hardcodiert geprüft).
- Bestehende Exporte aus `repositories.ts` (`getProducts`, `getMarkets`, …) weiterhin
  unverändert importierbar — kein Breaking Change für `ProductFinder.tsx`/`Co2Calculator.tsx`.

**Rollback:** Zwei neue Dateien löschen, die Erweiterung in `repositories.ts` per Diff
rückgängig machen. Nichts Bestehendes wurde ersetzt.

---

## I02 — UI-Primitives

**Ziel:** Die 7 generischen Anzeige-Primitives (Matrix-Tabelle, Tabs, Akkordeon, Schritte,
Glossar, Statistik-Band, Icon-Karte) als eigene Dateien nach dem bestehenden
Ein-Component-pro-Datei-Muster von `components/ui/`.

**Referenzdateien (dieses Paket):** `components/ui/{DeepMatrix,KTabs,DeepFAQ,StepFlow,
GlossaryGrid,StatBand,DeepCard}.tsx`.

**Zieldateien (echtes Repo):** `components/ui/DeepMatrix.tsx`, `KTabs.tsx`, `DeepFAQ.tsx`,
`StepFlow.tsx`, `GlossaryGrid.tsx`, `StatBand.tsx`, `DeepCard.tsx` — alle neu, keine
bestehende Datei wird angefasst.

**Akzeptanzkriterien:**
- Jede Komponente rendert mit Platzhalterdaten fehlerfrei (Storybook/`dev/ui`-Seite, siehe
  `app/[locale]/dev/ui/page.tsx` im Repo — dort exemplarisch ergänzen, nicht Pflicht).
- `DeepFAQ`/`KTabs` tragen `"use client"` (eigene Interaktion); `DeepMatrix`/`StepFlow`/
  `GlossaryGrid`/`StatBand`/`DeepCard` bleiben **ohne** `"use client"` (Server-Component-fähig).
- Tastaturbedienbar: `DeepFAQ`-Trigger und `KTabs`-Buttons mit `focus-visible:ring-2
  ring-ring`, `aria-expanded`/`aria-selected` korrekt.
- Kein Hex-Wert im Markup — nur `bg-card`, `text-foreground`, `border-card-border` usw.
  (siehe `docs/TOKENS.md` im Repo).

**Rollback:** 7 Dateien löschen. Nichts Bestehendes importiert sie vor Segment I03/I04.

---

## I03 — Katalog-Browser

**Ziel:** Den echten 71-Artikel-Katalog als durchsuchbaren Browser auf der bestehenden
Produktseite ergänzen — **zusätzlich** zum bestehenden Produktfinder (Dimensions-Matrix),
nicht als Ersatz.

**Vorbedingung (kleine Lücke im echten Repo, siehe `00-FINDINGS.md` §0.8):**
1. `components/ui/icon.tsx`: `ChevronDown`-Export ergänzen
   (`import { ChevronDown as LucideChevronDown } from "lucide-react";
   export const ChevronDown = createIcon(LucideChevronDown);`).
2. `components/ui/Button.tsx`: Entscheidung treffen (siehe `00-FINDINGS.md` §0.10.4) —
   Default in diesem Paket: `variant="secondary"`-Aufrufe werden beim Portieren zu
   `variant="ghost"`, `Button.tsx` bleibt unverändert.

**Referenzdateien (dieses Paket):** `components/tools/CatalogBrowser.tsx`
(Quelle: `kaqua-catalog-view.jsx` + `kaqua-catalog-data.js`).

**Zieldateien (echtes Repo):**
- `components/tools/CatalogBrowser.tsx` — neu, `"use client"`.
- `app/[locale]/produkte/page.tsx` — bestehende Datei erweitern: `<CatalogBrowser />` **nach**
  dem bestehenden Produktinhalt einfügen (siehe Segment I04 für die exakte Position, die mit
  `<ProductsDeep />` zusammen eingebaut wird).

**Akzeptanzkriterien:**
- Alle 7 Kategorie-Chips zeigen die korrekte, zur Laufzeit gezählte Artikelzahl.
- Suche filtert live nach Artikelnummer UND Produktname (Case-insensitive).
- Jede aufgeklappte Zeile zeigt exakt die Spalten des Prototyps; Spaltenkopf-Auflösung über
  `resolveCatalogHead(head, locale)` — technische Kürzel (d, s, L, H, DN, Rp, R) bleiben
  unlokalisiert.
- `note`-Feld erscheint **nur bei `locale === 'de'`** (geerbtes, noch offenes
  Produktverhalten — siehe `00-FINDINGS.md` §0.7 — hier nicht eigenmächtig geändert).
- Rendert fehlerfrei auf `/de/produkte`, `/en/produkte`, `/ar/produkte` (RTL-Layout der
  Akkordeon-Carets prüfen).

**Rollback:** `CatalogBrowser.tsx` löschen, die eine eingefügte Zeile in
`produkte/page.tsx` entfernen.

---

## I04 — Deep-Content-Sections je Seite

**Ziel:** Die 14 `*Deep`-Sections an exakt der Stelle einbinden, an der sie im Prototyp
(`kaqua-views-{1,2,3,4,5}.jsx`) sitzen — verifiziert per Grep, nicht geschätzt.

**Referenzdateien (dieses Paket):** `components/sections/{Products,Solutions,Trust,Partner,
Academy,Service,About,News,Contact,Career,Refs,Finder,CO2,Home}Deep.tsx`.

**Einfügepositionen (verifiziert gegen `kaqua-views-*.jsx`):**

| Section | Zieldatei (echtes Repo) | Position | Client? |
|---|---|---|---|
| `HomeDeep` | `app/[locale]/page.tsx` | nach dem letzten Home-Abschnitt, vor der Schluss-CTA | Server |
| `ProductsDeep` + `CatalogBrowser` (I03) | `app/[locale]/produkte/page.tsx` | am Ende, in dieser Reihenfolge: `<ProductsDeep /><CatalogBrowser />` | `ProductsDeep`: Client (SDR-Tab) |
| `SolutionsDeep` | `app/[locale]/loesungen/page.tsx` | am Seitenende | Server |
| `FinderDeep` | `app/[locale]/produkte/finder/page.tsx` | am Seitenende, nach `<ProductFinder />` | Server |
| `CO2Deep` | `app/[locale]/co2-rechner/page.tsx` | am Seitenende, nach `<Co2Calculator />` | Server |
| `AcademyDeep` | `app/[locale]/academy/page.tsx` | am Seitenende, nach `<Academy />` | Client (Verfahren-Tab) |
| `TrustDeep` | `app/[locale]/trust-center/page.tsx` | am Seitenende, nach `<TrustCenter />` | Server |
| `PartnerDeep` | `app/[locale]/partnerschaft/page.tsx` | am Seitenende, nach `<Partner />` | Server |
| `ServiceDeep` | `app/[locale]/service/page.tsx` | am Seitenende | Server |
| `AboutDeep` | `app/[locale]/unternehmen/page.tsx` | am Seitenende | Server |
| `NewsDeep` | `app/[locale]/news/page.tsx` | am Seitenende | Client (Read-more) |
| `ContactDeep` | `app/[locale]/kontakt/page.tsx` | am Seitenende | Server |
| `CareerDeep` | `app/[locale]/karriere/page.tsx` | am Seitenende, nach `<Career />` | Server |
| `RefsDeep` | `app/[locale]/referenzen/page.tsx` | am Seitenende, nach `<References />` | Server |

**Akzeptanzkriterien:**
- Alle 14 Routen zeigen die neue Section an der dokumentierten Position, auf
  `de`/`en`/`ar`, Desktop + 390px mobil, Konsole fehlerfrei.
- Kein Abschnitt bricht RTL bei `ar` (logische Properties, keine hartkodierten
  `left`/`right`).
- `useReducedMotion` respektiert (alle `Reveal`-Delays sind Sekundenwerte — **nicht** die
  Millisekunden-Werte aus dem Prototyp, siehe `00-FINDINGS.md` §0.8).

**Rollback:** 14 Dateien löschen, die jeweils eine eingefügte Zeile pro `page.tsx` entfernen.
Jede Seite bleibt sonst unverändert nutzbar (additiv, keine bestehende Sektion entfernt).

---

## I05 — i18n-Merge & Sprachparität

**Ziel:** Die 15 neuen Namespaces (14 Deep-Content + `catalogx`) in die bestehenden
`messages/{locale}.json`-Dateien mergen — **keine neuen Dateien**, siehe
`00-FINDINGS.md` §0.6/§0.8 zur Konvention.

**Referenzdateien (dieses Paket):** `messages/deep-fragments/{de,en,ar}.json` (bereits
Schlüssel-Parität-geprüft, 0 Abweichungen), `messages/deep-fragments/README.md`
(Merge-Anleitung).

**Zieldateien (echtes Repo):** `messages/de.json`, `messages/en.json`, `messages/ar.json` —
bestehende Dateien, die 15 Top-Level-Keys aus den Fragmenten per `Object.assign`/Merge
ergänzen. **Nicht** überschreiben, nicht bestehende Namespaces anfassen.

**Aufgabe zusätzlich (offene Frage 0.10.5):** falls gewünscht, dieselben Fragmente
(inhaltlich identisch zu `en.json`, als Fallback) in die 9 gesperrten Locale-Dateien
(`fr,es,it,pt,nl,pl,tr,ru,zh`) mergen, damit `i18n:check` über alle 12 Dateien grün bleibt
— **nur nach Bestätigung**, da das reine Kopierarbeit ohne echte Übersetzung ist (entspricht
aber dem bereits im Repo etablierten Verfahren für die übrigen Namespaces, siehe
`docs/AGENT_LOG.md`).

**Akzeptanzkriterien:**
- `pnpm i18n:check` grün (bzw. das jeweilige Schema-Parity-Script des Repos).
- Kein Namespace-Key kollidiert mit einem bestehenden Key (Merge, kein Überschreiben —
  vorher `git diff` gegenprüfen).
- Stichprobe: 1 Seite je der 14 Deep-Routen × 3 Sprachen zeigt keine Mischsprache, keine
  `MISSING_MESSAGE`-Fehler.

**Rollback:** Die 15 gemergten Keys pro Datei per Diff entfernen (Merge ist reversibel,
solange keine bestehenden Keys überschrieben wurden — Akzeptanzkriterium oben erzwingt das).

---

## I06 — Build-, Typecheck- und Visual-Verifikation

**Ziel:** Bestätigen, dass die additive Integration den bestehenden, bereits produktiven
Zustand nicht regressiert.

**Aufgabe:**
1. `pnpm install && pnpm build` — 0 Fehler, 0 neue Warnungen gegenüber dem Stand vor I01.
2. `pnpm lint && pnpm typecheck` (inkl. `react/jsx-no-literals`-Guard) grün.
3. Visueller Abgleich: je 1 Screenshot pro der 14 Deep-Routen + `/produkte` (Katalog-Browser)
   gegen `prototype/K-Aqua Redesign.html`-Verhalten (aus diesem Design-Projekt), Desktop +
   390px, `de` + `ar` (RTL).
4. Tastatur-Fokus-Durchlauf auf mindestens einer Seite mit `DeepFAQ` + `KTabs`.
5. Kein Hex-Wert, kein hartkodierter sichtbarer String neu eingeführt (Grep nach `#[0-9a-f]{3,6}`
   in den neuen Dateien — sollte 0 Treffer liefern außer in Code-Kommentaren).

**Akzeptanzkriterien:** alle Punkte oben grün/bestätigt; keine Regression an den 18
bestehenden Kernrouten (Stichprobe: Home + eine unveränderte Route wie `/impressum`).

**Rollback:** N/A (reine Verifikation, kein Codeeingriff). Bei Befund: zurück zum
betroffenen Segment (I01–I05), Fix, erneut I06.

---

## Reihenfolge-Zusammenfassung

I01 (Daten) → I02 (Primitives) → I03 (Katalog-Browser, hängt von I02 ab) →
I04 (Deep-Sections, hängt von I02 + I01/`deep.ts` ab) → I05 (i18n-Merge, kann parallel zu
I02–I04 laufen, muss aber vor I06 fertig sein) → I06 (Gesamtverifikation).
