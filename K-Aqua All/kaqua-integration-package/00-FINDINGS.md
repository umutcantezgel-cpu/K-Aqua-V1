# 00 — Findings (Schritt 0 & 1: reale Zielcodebasis + Inventar)

Dieses Dokument protokolliert, was tatsächlich verifiziert wurde — gegen die reale
GitHub-Codebasis und den Live-Server, nicht gegen Annahmen aus Planungsdokumenten.
Wo Planungsdokumente (auch die in diesem Design-Projekt bereits vorhandenen) von der
Realität abweichen, steht das hier explizit, nicht stillschweigend korrigiert.

## 0.1 — Reale Zielcodebasis identifiziert

**`umutcantezgel-cpu/K-Aqua-V1`** (GitHub, Branch `main`) ist die Codebasis hinter
`https://k-aqua-v1.vercel.app`. Verifiziert über:

- `app/[locale]/{academy,co2-rechner,impressum,karriere,kontakt,loesungen,maerkte,
  news,partnerschaft,produkte,produkte/finder,projektanfrage,referenzen,service,
  trust-center,unternehmen}/page.tsx` — deckt sich 1:1 mit den Routen, die der Live-Fetch
  von `/de` zeigt.
- `docs/ROUTE_MAP.md` im Repo benennt exakt die Prototyp-Dateien dieses Design-Projekts
  (`kaqua-views-1…6.jsx`, `kaqua-geo.jsx`) als Quelle je Route.
- `docs/AGENT_LOG.md`: Alle 26 Fundament-Agenten sind als "Erledigt am 14.06.2026" abgehakt
  — die Seite ist kein Rohbau, sondern ein abgeschlossenes Phase-1-Projekt.

**Nicht** die Zielcodebasis: `umutcantezgel-cpu/k-aqua` (Kleinschreibung, ohne „-V1"). Andere
Routennamen (`about/career/contact/imprint/products/solutions` statt der echten deutschen
Slugs), nur ein Stub-`messages/de.json` (267 Bytes), keine Übereinstimmung mit dem Live-Fetch.
Enthält denselben gecrawlten Alt-Content (`019eb205…/www.k-aqua.de_*.json`) wie dieses
Design-Projekts `uploads/`-Ordner — vermutlich ein separater, verworfener Anlauf.

## 0.2 — Stack (verifiziert aus `package.json`, `next.config.ts`, `tailwind.config.ts`)

Next.js 15.5.19 (App Router) · React 19.1 · TypeScript strict · Tailwind CSS 4
(`@theme inline` in `app/globals.css`, **kein** `tailwind.config.ts`-Farbschema) ·
next-intl 3.26 (Config unter `lib/i18n/{routing,request,navigation}.ts`, **nicht** an der
Root wie in älteren next-intl-Versionen) · motion (Framer Motion) 11.18 · lucide-react ·
class-variance-authority · pnpm 9. `i18n:check`-Script unter `scripts/check-locale-parity.mjs`
erzwingt identische Schlüsselmengen über **alle** `messages/*.json`.

## 0.3 — Live vs. neu vs. Überschneidung

| Bereich | Status |
|---|---|
| 18 Kernrouten, Design-Tokens, App-Shell, Globus (Basis), Finder (Dimensions-Matrix), RFQ, Career, CO2-Rechner (Basis-Slider), Academy (Basis-Quiz), Trust Center (Basis) | **Live, fertig** (Agents 00–26) |
| Realer 71-Artikel-Katalog (`kaqua-catalog-data.js`/`-view.jsx`) | **Neu** — in keiner Form im Repo |
| 14 Deep-Content-Namespaces + Sections (`kaqua-deep-*`) | **Neu** — in keiner Form im Repo |
| Design-System-Brücke (K-Aqua-Violett statt Coday-Teal, oklch, Outfit+Inter, φ-Skala) | **Überschneidung, bereits entschieden** — `docs/DESIGN_SYSTEM_BRIDGE.md` im Repo trifft diese Entscheidung schon. Dieses Paket erfindet keine neuen Tokens, nutzt nur bestehende (siehe `docs/TOKENS.md`). |
| Globe-Hub-Menü, PipeFX-Animationen, Globe-Varianten, CV-Generator (`kaqua-globe-hub/-variants/-scrollfx`, `kaqua-pipefx`, `kaqua-cvgen`, `kaqua-enterprise-section`) | **Unklar / nicht Teil dieses Pakets.** Diese Dateien werden von `K-Aqua Redesign.html` mitgeladen, tauchen aber in **keinem** Repo-Dokument (`ROUTE_MAP.md`, `AGENT_LOG.md`, `DATA_CONTRACTS.md`) auf — sie sind im Live-Repo nicht integriert. Der Auftragstext dieser Runde nennt sie nicht. Siehe offene Frage 0.6.4 — **nicht unaufgefordert mitgebaut.** |

## 0.4 — Vorbefund: `kaqua-antigravity/PIPELINE-3.0-MASTER.md`

Dieses Design-Projekt enthält bereits einen **eigenen, früheren Versuch**, exakt diese
Integration zu planen (`kaqua-antigravity/PIPELINE-3.0-MASTER.md`, Segmente S13–S19).
Wichtig für die Einordnung dieses Pakets:

- Er ist als Kickoff-Prompt für eine **andere, autonome Coding-Agent-Instanz** ("Antigravity")
  mit direktem Schreib-/Build-Zugriff geschrieben (`pnpm build`, Vercel-Deploy) — nicht für
  ein Handoff-Paket wie dieses hier.
- Er verweist auf `docs/BUILD_MEMORY.md` und einen `pipeline-2.0/`-Ordner
  (`ledger.md`, `REPAIR-RUNDE.md`, `segments.md`, `agent-01…12.md`) — **beide existieren
  nicht im echten Repo.** Nur `docs/AGENT_LOG.md` existiert dort wirklich. Die
  „Phase 2.0"-Features, die dieser Plan als bereits erledigt voraussetzt (Globe-Hub-Nav,
  Produktfinder „114 Artikel", PipeFX, RFQ-5-Stufen etc.), sind — siehe 0.3 — **nicht** im
  echten Repo nachweisbar.
- Er geht von **79** Katalogartikeln und **372** Gesamtseiten (18+27+79 Routen × 3 Locales,
  inkl. 79 einzelner pSEO-Detailseiten) aus — beides unten in 0.5 korrigiert.
- **Diese Runde übernimmt bewusst nur den fachlich validen Kern** dieses Vorbefunds
  (Referenzdateien, Zieldateipfade, die Erkenntnis „`messages/{locale}.json` erweitern statt
  neue Dateien anlegen") und verpackt ihn neu als eigenständiges, in sich geprüftes
  Handoff-Paket — kleinteiliger, gegen das echte Repo verifiziert, ohne die nicht
  nachweisbare Phase-2.0-Altlast und ohne die S14-pSEO-Erweiterung (79 Einzelseiten),
  die hier niemand beauftragt hat.

## 0.5 — Zahlen-Korrekturen (verifiziert per Skript-Extraktion, nicht abgetippt)

| Zahl | Kolportiert (Planungsdokumente) | Real (verifiziert) |
|---|---|---|
| Katalog-Artikelfamilien gesamt | „79" | **71** — `pipes 12, fittings 15, transitionFittings 13, valves 9, weldInSaddles 3, accessories 5, tools 14` |
| Formteile-Kategorie | Quellcode-Kommentar sagt „13" | **15** (Kommentar im Quellcode ist veraltet; die ausgelieferte `count` ist immer `items.length`, also korrekt — nur der Freitext-Kommentar irrt) |
| Produktfinder-Zeilen ("Phase 2.0") | „114 Artikel" | Nicht verifizierbar als feste Zahl — `lib/data/products.ts` generiert die Matrix aus `K_TYPES × K_DIMS × K_SDRS` zur Laufzeit (aktuell 3 Typen × 17 Dimensionen × bis 5 SDR ⇒ rechnerisch ≈ 184 Zeilen, kein Hardcode) |
| Gesamtseiten bei vollem Ausbau | „372" (18+27+**79** Routen × 3 Locales, inkl. 79 Einzelseiten) | Mit korrigierten 71 Artikeln UND ohne die hier nicht beauftragten 71 Einzel-Detailseiten: dieses Paket fügt **0 neue Routen** hinzu (Katalog ist ein Browser auf der bestehenden `/produkte`-Seite, keine eigene Route pro Artikel) |

**Konsequenz:** `data/catalog.ts` in diesem Paket hardcodet nirgendwo „71" oder „79" —
`getCatalogTotalArticleCount()` zählt zur Laufzeit. Die Doku hier nennt die verifizierte
Zahl, damit niemand „79" unreflektiert weiterträgt.

## 0.6 — Namespace-Klarstellung

Der Nutzer-Auftrag nennt **14 Deep-Content-Namespaces**
(`productsx, solutionsx, trustx, partnerx, academyx, servicex, aboutx, newsx, contactx,
careerx, refsx, finderx, co2x, homedeep`) — **das stimmt exakt** (verifiziert per
Skript-Extraktion aus `kaqua-deep-i18n-{de,en,ar}.jsx`). Zusätzlich existiert ein 15.,
separater Namespace **`catalogx`** (aus `kaqua-catalog-view.jsx`) — er gehört fachlich zum
Katalog-Browser (Segment I03), nicht zu den 14 Deep-Content-Sections (Segment I04), wird in
diesem Paket aber genauso mitgeführt.

**Schlüsselparität DE/EN/AR ist zu 100 % verifiziert** (automatisierter Diff aller
Top-Level- und Erste-Ebene-Schlüssel über alle 15 Namespaces × 3 Sprachen: **0 Abweichungen**).
Das entlastet Segment I05 von einer Übersetzungslücken-Suche — es bleibt nur der
Merge in `messages/{locale}.json` und die offene DE-only-`note`-Entscheidung (0.7).

## 0.7 — Offene Entscheidung, geerbt aus dem Vorbefund (nicht von mir getroffen)

`kaqua-antigravity/PIPELINE-3.0-MASTER.md` (Segment S16) hält explizit fest, dass die
Katalog-`note`-Freitexte (`kaqua-catalog-data.js`, Feld `note`) bislang **nur Deutsch**
vorliegen und `CatalogDeep` sie im Prototyp bewusst nur bei `lang === 'de'` anzeigt
(kein Halbübersetzt-Zustand). Diese Entscheidung — Notizen professionell nachübersetzen
lassen vs. das DE-only-Verhalten als bewusste Produktentscheidung festschreiben — ist
**weiterhin offen** und wird in diesem Paket **unverändert als DE-only-Verhalten portiert**
(siehe `components/tools/CatalogBrowser.tsx`), nicht stillschweigend „vervollständigt".

## 0.8 — Komponentenbrücke Prototyp → reales Repo (verifiziert per Dateivergleich)

| Prototyp (dieses Projekt) | Reales Äquivalent (`K-Aqua-V1`) | Befund |
|---|---|---|
| `BentoCard` (`kaqua-ui.jsx`) | `components/ui/Card.tsx` | **Deckungsgleiche Props** (`tint`, `span`, `className`, `style`, `children`) — direkt ersetzen, keine neue Komponente nötig. |
| `KButton` (`kaqua-ui.jsx`) | `components/ui/Button.tsx` | Gleiche Props (`variant`, `size`, `icon`, `href`, `onClick`). **Lücke:** reales `Button` kennt nur `variant: primary|ghost|inverse` — kein `secondary`, das die Deep-Sections mehrfach nutzen. Empfehlung: `secondary` → `ghost` mappen (visuell am nächsten, keine neue Variante nötig). Alternative (nicht standardmäßig umgesetzt): `secondary`-Variante in `buttonVariants` ergänzen. |
| `Icons.X` (`kaqua-ui.jsx`, Objekt-Map) | `components/ui/icon.tsx` (benannte Exporte) | 26 von 27 genutzten Icons existieren 1:1. **Lücke:** `ChevronDown` fehlt in `icon.tsx` — wird von `DeepFAQ`, `CatalogBrowser` und `NewsDeep` gebraucht. Ergänzung ist eine Zeile (lucide-react hat `ChevronDown`), siehe Segment I03. |
| `Reveal` (`kaqua-ui.jsx`, CSS/IntersectionObserver) | `components/ui/Reveal.tsx` (Framer Motion) | Gleiche Prop-Form (`children`, `delay`), **aber andere Einheit**: Prototyp-`delay` ist **Millisekunden** (`delay={80}`), reales `Reveal` reicht `delay` direkt an Framer Motions `transition.delay` durch, das **Sekunden** erwartet. **Jeder portierte `delay`-Wert muss durch 1000 geteilt werden** (`delay={80}` → `delay={0.08}`). In diesem Paket bereits so umgesetzt — siehe Musterbeleg in `components/tools/Academy.tsx` (`delay={idx * 0.07}`). |
| `SectionHead` (`kaqua-ui.jsx`) | `components/ui/SectionHead.tsx` | Gleiche Props (`eyebrow`, `title`, `lead`, `align`). Kein Unterschied. |
| `usePageL(ns)` / `useT()` (`kaqua-i18n-pages.jsx`) | `useTranslations(ns)` / `getTranslations(ns)` (next-intl) | **Wichtigste Anpassung:** `usePageL` liefert ein rohes JS-Objekt (Strings, Arrays, verschachtelte Objekte). next-intls `t('key')` liefert nur Strings. Für Array-/Objekt-Werte (z. B. `pipes`, `faq`, `matRows`, `norms`, `gloss`, `procs`, …) **muss** `t.raw('key')` verwendet werden, nicht `t('key')`. Betrifft praktisch jeden Deep-Namespace, da die meisten Inhalte strukturiert sind, nicht nur Überschriften. |
| `go(id)` (Hash-Router-Callback, `kaqua-app.jsx`) | `Link`/`href` aus `lib/i18n/navigation.ts` | `HomeDeep`s CTA (`onClick={() => go('trust')}`) wird zu einem echten, lokalisierten Link (`href="/trust-center"` über den next-intl-`Link`). Kein `go`-Prop mehr nötig — vereinfacht `HomeDeep` zur reinen Server Component. |

## 0.9 — Client/Server-Component-Einstufung (Next.js App Router)

Nur **4 von 15** neuen Komponenten brauchen `"use client"` (eigener `useState`):
`ProductsDeep` (SDR-Tab), `AcademyDeep` (Verfahren-Tab), `NewsDeep` (Read-more-Toggle),
`CatalogBrowser` (Kategorie/Suche/Akkordeon). Die übrigen 11 Sections sind reine Server
Components (`async function ... { const t = await getTranslations(...) }`) — das entspricht
den `SSG`-Markierungen in `docs/ROUTE_MAP.md` und ist besser für Performance/Lighthouse
als alles pauschal zu Client Components zu machen. `DeepFAQ` und `KTabs` (Leaf-Primitives
mit `onClick`) sind selbst `"use client"`, können aber problemlos innerhalb von Server-
Component-Sections gerendert werden.

## 0.10 — Offene Fragen an den Nutzer

1. **Schreibzugriff:** Dieses Paket ist ein Datei-Handoff (Ordner zum Download/Copy-Paste).
   Besteht Schreibzugriff auf `umutcantezgel-cpu/K-Aqua-V1`, damit ein Folgeauftrag die
   Dateien direkt per PR einspielen kann, oder soll der Ordner ausschließlich als Zip an ein
   menschliches/anderes agentisches Team übergeben werden?
2. **Scope Phase 2.0 (Globe-Hub/PipeFX/Enterprise-Section/CV-Generator):** Bewusst **nicht**
   in diesem Paket. Separates Folgepaket gewünscht, oder bleibt das vorerst reine
   Explorationsmaterial in diesem Design-Projekt?
3. **`note`-Felder DE-only vs. übersetzen** (0.7): Soll ein Fachlektorat EN/AR-Übersetzungen
   liefern, oder bleibt das DE-only-Verhalten explizite Produktentscheidung?
4. **`Button`-Variante `secondary`:** Auf `ghost` mappen (Default in diesem Paket) oder eine
   echte `secondary`-CVA-Variante in `components/ui/Button.tsx` ergänzen?
5. **9 gesperrte Locales** (`fr,es,it,pt,nl,pl,tr,ru,zh`): Sollen die 15 neuen Namespaces für
   diese Sprachen ebenfalls (mit EN-Fallback-Inhalt, analog zum bestehenden Verfahren laut
   `docs/AGENT_LOG.md`) ergänzt werden, damit `i18n:check` über **alle** 12 Dateien grün
   bleibt? Ohne das schlägt der bestehende CI-Schema-Test vermutlich fehl, sobald die 15
   Namespaces nur in `de/en/ar` landen. Dieses Paket liefert nur `de/en/ar` (echte Inhalte,
   0.6) — die Fallback-Befüllung der 9 übrigen Dateien ist nicht Teil davon, aber technisch
   trivial (Kopie der `en.json`-Fragmente in die 9 Dateien).
