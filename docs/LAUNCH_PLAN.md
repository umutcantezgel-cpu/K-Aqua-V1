# K-Aqua — Launch-Plan

**Stand:** 11.08.2026 · **Basis-Commit:** `eefe3a4` · **Ziel:** produktionsreifer Launch von k-aqua.de

Alle Zahlen in diesem Dokument sind gemessen, nicht geschätzt. Wo eine Aussage
nicht verifiziert werden konnte, steht das ausdrücklich dabei.

---

## 1. Ausgangslage

| | Wert |
|---|---|
| Getrackte Dateien | 742 |
| Getrackter Inhalt | 173 MB |
| Git-Historie (`.git`) | 343 MB |
| TypeScript-Fehler | 0 (Gate aktiv) |
| ESLint-Fehler | 0 (279 Warnungen) |
| Unit-Tests | 33/33 |
| Locale-Parität | 0 fehlende Keys |
| Build | grün, 4.350 statische Seiten |
| Sitemap-URLs | 540, alle Status 200 |
| Shared First Load JS | 103 kB |
| Unpushte Commits | 8 |

**Bereits erledigt** (aus den vorangegangenen Sessions): Kontaktformular-Datenverlust
behoben, Qualitäts-Gates scharf, Navigation/Footer/Karten-Suite in DE/EN/AR,
Favicon, Redirects für 15 tote Unterseiten, ~1,03 Mio. Zeilen Generierungs-Müll
entfernt, vertrauliche Dateien aus `public/` entfernt.

---

## 2. Entscheidungen E1–E6 — getroffen

Der Auftraggeber hat volle Entscheidungsbefugnis erteilt. Hier die Festlegungen
mit Begründung und Messwert.

### E1 — Zwei Animations-Runtimes → auf `framer-motion` konsolidieren

**Befund:** `framer-motion@12.42.2` (5,6 MB, 15 Dateien) **und** `motion@11.18.0`
(2,7 MB, 12 Dateien) sind parallel installiert und beide aktiv. Zwei
Animations-Bibliotheken im Client-Bundle.

**Entscheidung:** Auf `framer-motion@12` vereinheitlichen. Es ist die neuere
Version, hat die größere Nutzung im Code und steht bereits in
`experimental.optimizePackageImports`.

**Betroffene 12 Dateien:**
`app/[locale]/template.tsx`, `app/[locale]/dev/globe/page.tsx`,
`components/ui/LiquidMagneticButton.tsx`, `components/ui/FluidTransition.tsx`,
`components/ui/Reveal.tsx`, `components/sections/MarketsHub.tsx`,
`components/sections/HeroScrolly.tsx`, `components/globe/Globe.tsx`,
`components/layout/MegaMenu.tsx`, `components/layout/Header.tsx`,
`components/product/ProductFAQ.tsx`, `components/product/ProductGallery.tsx`

**Achtung:** `components/ui/Reveal.tsx` nutzt `motion.create()` mit einer
dokumentierten `any`-Ausnahme. Eine frühere Umtypisierung ist fehlgeschlagen
(JSX-Props kollabierten auf `never`). Diese Ausnahme muss beim Umschreiben
erhalten bleiben.

### E2 — RAG-Assistent → entfernen

**Befund:** `app/api/assistant/route.ts` ruft `ragService` (Pinecone + Gemini).
**Kein einziger Frontend-Aufrufer** — verifiziert per Grep über `app/`,
`components/`, `lib/`. Abhängigkeiten: `@pinecone-database/pinecone` (8,5 MB),
`@google/generative-ai` (612 KB) = **9,1 MB**.

**Entscheidung:** Entfernen. Zusätzlich zum toten Gewicht ist es ein
unauthentifizierter POST-Endpunkt, der — sobald jemand API-Keys hinterlegt —
kostenpflichtige Fremd-APIs ohne Rate-Limit aufrufen würde. Das ist ein
Kosten- und Missbrauchsrisiko, das kurz vor Launch nichts zu suchen hat.

**Umfang:** `app/api/assistant/`, `lib/services/RagService.*`, beide Pakete aus
`package.json`, Lockfile aktualisieren. Vorher prüfen, ob `RagService` noch
anderswo importiert wird.

### E3 — 15 Playwright-Specs → 4 behalten, 11 entfernen

**Befund:** 15 Specs, **kein npm-Script führt sie aus**. Namen wie `step15`,
`step16_adversarial`, `step20_challenger` deuten auf Wegwerf-Prüfskripte aus
Generierungsläufen.

**Entscheidung:** Differenziert statt alles-oder-nichts.

**Behalten und als `test:e2e` verdrahten:**
- `tests/seo.spec.ts` — prüft Canonical, hreflang, JSON-LD
- `tests/geo.spec.ts` — prüft die Markt-/Stadt-Routen
- `tests/e2e/hydration.spec.ts` — Hydration-Fehler
- `tests/step15.spec.ts` — deckt den Lead-Formular-Pfad ab (nach Sichtung ggf. umbenennen)

**Entfernen (11):** `geo-stress`, `hydration-check`, `seo-adversarial`,
`seo_adversarial`, `step16`, `step16_adversarial`, `step16_challenger`,
`step17`, `step18`, `step20`, `step20_adversarial`

**Wichtig:** Vor dem Entfernen jede Datei einmal lesen — bei den `adversarial`-
Varianten kann echte Prüflogik drinstecken, die in die vier behaltenen Specs
übernommen gehört. Nicht blind löschen.

### E4 — Git-Historie bereinigen → durchführen

**Befund:** `.git` = 343 MB. Die signierten Projektvereinbarungen sind
weiterhin in der Historie (**8 Treffer** über alle Commits). Löschen im
Arbeitsverzeichnis hat sie dort nicht entfernt.

**Entscheidung:** `git filter-repo` + Force-Push. Es handelt sich um signierte
Verträge mit personenbezogenen Daten, die öffentlich erreichbar waren — das ist
kein Aufräum-, sondern ein Datenschutzthema.

**Zwingende Reihenfolge:**
1. Vollständiges Backup-Klon **vor** jedem Eingriff (`git clone --mirror`)
2. Alle offenen Branches/PRs mergen oder sichern
3. Alle Mitarbeitenden informieren — **jeder bestehende Klon wird unbrauchbar**
4. `git filter-repo --invert-paths --path-glob '...'` für die Vertragspfade und die Müll-Verzeichnisse
5. Force-Push
6. Anschließend über die Google Search Console die Entfernung aus dem Cache beantragen

**Dieser Schritt ist nicht umkehrbar. Er gehört an das Ende, nach dem Launch,
nicht davor** — ein kaputter Repo-Zustand kurz vor Go-Live ist das größere Risiko.

### E5 — Zwei Kontaktformulare → beide behalten, i18n vereinheitlichen

**Befund:**
- `MultiStepContactForm` (437 Zeilen) — **nur** auf `/kontakt`, mehrstufiger Funnel
- `KontaktForm` (201 Zeilen) — überall sonst über `KontaktBlock`, plus `/loesungen`

Das mehrstufige Formular funktioniert seit dem Fix, trägt aber ein **eigenes,
hartkodiertes `DICTIONARY` für de/en/ar** — ein zweites Übersetzungssystem
parallel zu next-intl. Für die übrigen 62 Sprachen fällt es auf Englisch zurück.

**Entscheidung:** Beide behalten — sie erfüllen unterschiedliche Aufgaben (Funnel
auf der Kontaktseite, schlanker Inline-Block überall sonst). Aber das parallele
`DICTIONARY` auflösen und in next-intl überführen (`multiStepForm.*`). Ein
zweites i18n-System ist genau die Art von Altlast, die nach dem Launch niemand
mehr anfasst.

### E6 — Indexierung: nur DE / EN / AR

**Auftraggeber-Entscheidung, bestätigt.**

**Befund: bereits weitgehend umgesetzt** — Sitemap enthält ausschließlich
de/en/ar, die übrigen 62 Sprachen liefern `<meta name="robots" content="noindex, nofollow">`.

**Aber es gibt einen Fehler darin:** `app/robots.ts` setzt zusätzlich
`Disallow: /fr/`, `/ja/`, `/zh-Hans/` … für alle 62 Sprachen. Ein per robots.txt
gesperrter Pfad kann vom Crawler **nicht abgerufen werden — er sieht das
noindex-Meta also nie.** Wird eine dieser URLs extern verlinkt, kann Google sie
trotzdem indexieren, dann als nackte URL ohne Beschreibung. Die beiden
Maßnahmen heben sich gegenseitig auf.

**Entscheidung:** Die 62 `Disallow`-Zeilen aus `app/robots.ts` entfernen. Das
`noindex`-Meta allein ist der korrekte und wirksame Mechanismus. `/dev/`,
`/api/`, `/pdf/` bleiben gesperrt.

**Ebenfalls zu prüfen:** `Disallow: /*?*` blockiert sämtliche URLs mit
Query-String — darunter die Filter-Links des Produktfinders
(`?category=pipes&q=…`). Für Crawl-Budget ist das vertretbar, sollte aber eine
bewusste Entscheidung sein, keine Nebenwirkung.

**Zusätzliche Funde im selben Bereich:**
- `messages/seo/{de,en,ar}/markets_11.json` und `markets_12.json` — **153 KB, die
  `lib/i18n/request.ts` nie lädt** (die `seoModules`-Liste endet bei `markets_10`).
  Entweder in die Liste aufnehmen oder löschen. Aktuell: toter Inhalt.
- `messages/seo/` hat Ordner für 13 Sprachen; **10 davon** (cs, es-ES, fr, it, nl,
  pl, pt-BR, pt-PT, ru, tr, zusammen 1,3 MB) gehören zu Sprachen, die nicht
  indexiert werden. Sie werden zur Laufzeit trotzdem geladen. Entfernen spart
  Ladezeit im `getRequestConfig`-Pfad.
- Die 62 nicht-indexierten Sprachdateien machen **42 MB der 44 MB** in `messages/`
  aus (de+en+ar = 1,8 MB). Sie bleiben — es sind echte Übersetzungen, sie
  bedienen die Sprachauswahl, und da sie per ISR statt SSG gebaut werden, kosten
  sie keine Build-Zeit. **Das ist bewusst keine Löschempfehlung.**

---

## 3. Launch-Blocker

Diese Punkte müssen **vor** Go-Live erledigt sein. Alles andere kann danach.

| # | Blocker | Wer |
|---|---|---|
| **B1** | **Lead-Zustellung**: ohne `RESEND_API_KEY` bzw. `SMTP_*` in Vercel landet jede Anfrage nur im Konsolen-Log. Der Code ist fertig und end-to-end verifiziert — es fehlen ausschließlich die Zugangsdaten. | **Auftraggeber** |
| **B2** | **Datenschutzerklärung**: liegt als Entwurf vor, braucht juristische Freigabe. | **Auftraggeber / DSB** |
| **B3** | robots.txt/noindex-Konflikt (E6) auflösen | Umsetzung |
| **B4** | 8 unpushte Commits pushen, CI grün bestätigen | Umsetzung |
| **B5** | `NEXT_PUBLIC_SITE_URL` in Vercel auf `https://k-aqua.de` — sonst zeigen Canonicals, `robots.txt` `Host:` und die Sitemap auf die falsche Domain | **Auftraggeber** |
| **B6** | Redeploy **ohne Build-Cache**, damit ISR-/Data-Cache der alten Version verworfen wird | **Auftraggeber** |

---

## 4. Phasenplan

Jede Phase endet in einem eigenen Commit und einer Verifikation. Die
Reihenfolge ist bewusst gewählt: erst was den Launch blockiert, dann was ihn
verbessert, zuletzt was nicht umkehrbar ist.

### Phase 1 — Launch-Blocker im Code (B3, B4)

1. `app/robots.ts`: die 62 Locale-`Disallow`-Einträge entfernen; `/dev/`,
   `/api/`, `/pdf/` behalten. `Disallow: /*?*` bewusst bestätigen oder streichen.
2. Verifizieren: `curl /robots.txt` enthält keine Sprachpfade mehr; `/fr` liefert
   weiterhin `noindex, nofollow`.
3. `npx tsc --noEmit` (vorher `tsconfig.tsbuildinfo` löschen — der inkrementelle
   Cache hat in dieser Codebasis schon einmal einen echten Fehler verdeckt),
   `npx eslint .`, `npm run i18n:check`, `npx vitest run`, `npm run build`.
4. Commit. Push. CI-Lauf abwarten und grün bestätigen.

### Phase 2 — RAG-Assistent entfernen (E2)

1. Prüfen, ob `RagService` außerhalb von `app/api/assistant/route.ts` importiert wird.
2. `app/api/assistant/` und `lib/services/RagService.*` entfernen.
3. `@pinecone-database/pinecone` und `@google/generative-ai` aus `package.json`;
   Lockfile mit `pnpm install` aktualisieren (**nicht** `npm install` — das Repo
   nutzt `pnpm-lock.yaml`, und die CI läuft mit `--frozen-lockfile`).
4. Gates + Build. Erwartung: `node_modules` ~9 MB kleiner, Seitenzahl unverändert.
5. Commit.

### Phase 3 — Animations-Runtime konsolidieren (E1)

1. In den 12 gelisteten Dateien `from 'motion/react'` → `from 'framer-motion'`.
2. `components/ui/Reveal.tsx` gesondert behandeln: die dokumentierte
   `motion.create()`-Ausnahme muss bleiben.
3. `motion` aus `package.json` und aus `experimental.optimizePackageImports`
   in `next.config.ts` entfernen; Lockfile aktualisieren.
4. Gates + Build. **Shared First Load JS gegen die 103 kB von heute vergleichen
   und den Wert festhalten** — das ist der Nachweis, dass die Konsolidierung
   etwas gebracht hat.
5. Browser-Prüfung der animationslastigen Seiten: `/`, `/loesungen`,
   `/referenzen`, `/produkte` — Scroll-Reveals, Mega-Menü, Seitenübergänge.
6. Commit.

### Phase 4 — Kontaktformular-i18n vereinheitlichen (E5)

1. Das `DICTIONARY` aus `components/sections/MultiStepContactForm.tsx` in
   `messages/{de,en,ar}.json` unter `multiStepForm.*` überführen.
2. Komponente auf `useTranslations('multiStepForm')` umstellen, `FormLang`-Typ
   und `DICTIONARY` entfernen.
3. `multiStepForm` in die `clientMessages`-pick-Liste in
   `app/[locale]/layout.tsx` aufnehmen — **sonst rendert das Formular leere
   Keys**, und zwar ohne Build-Fehler.
4. `npm run i18n:check` muss 0 fehlende Keys melden.
5. Formular in allen drei Sprachen absenden und den Lead im Server-Log
   verifizieren (Feldnamen, `interest`, `quellSeite`).
6. Commit.

### Phase 5 — Toter SEO-Inhalt (E6-Nachlauf)

1. `markets_11` / `markets_12` entscheiden: in die `seoModules`-Liste in
   `lib/i18n/request.ts` aufnehmen **oder** die 6 Dateien löschen. Vorher
   stichprobenhaft prüfen, ob der Inhalt inhaltlich brauchbar ist.
2. `messages/seo/` für die 10 nicht-indexierten Sprachen entfernen (cs, es-ES,
   fr, it, nl, pl, pt-BR, pt-PT, ru, tr).
3. Verifizieren, dass `/fr`, `/it`, `/ru` weiterhin fehlerfrei rendern (sie
   fallen auf die Basis-Sprachdatei zurück, nicht auf die SEO-Erweiterung).
4. Gates + Build. Commit.

### Phase 6 — Testabdeckung ordnen (E3)

1. Alle 15 Specs lesen. Aus den 11 zu entfernenden alles übernehmen, was echte
   Prüflogik ist.
2. 11 Specs entfernen, 4 behalten.
3. `"test:e2e": "playwright test"` in `package.json`; die vier Specs müssen
   gegen einen laufenden Server grün sein.
4. `test:e2e` in `.github/workflows/ci.yml` aufnehmen — mit vorgeschaltetem
   `npm run build && npm run start &` und Warten auf Port 3000.
5. Commit.

### Phase 7 — Launch-Freigabe

1. Vollständiger Crawl aller Sitemap-URLs → alle 200.
2. Sprachprüfung: DE/EN/AR auf den Kernseiten, keine Fremdsprachen-Reste.
3. Konsole und Netzwerk-Tab auf `/`, `/produkte`, `/kontakt`, `/referenzen` sauber.
4. Lighthouse auf `/de`, `/en`, `/ar` (mobil und Desktop).
5. Formular-Absendung in Produktion mit echter Zustellung an `info@k-aqua.de`.
6. Go-Live.

### Phase 8 — **Nach** dem Launch: Git-Historie (E4)

Siehe E4. Erst durchführen, wenn die Seite stabil live ist. Mirror-Backup
zwingend vorher.

---

## 5. Verifikationsregeln — für jede Phase bindend

Diese Regeln stammen aus Fehlern, die in diesem Projekt real aufgetreten sind:

1. **Vor jedem `tsc --noEmit` erst `rm -f tsconfig.tsbuildinfo`.** Der
   inkrementelle Cache hat hier bereits einen echten Typfehler verdeckt, der
   erst im Build auffiel.
2. **Nie `npm install`.** Das Repo nutzt `pnpm-lock.yaml`; die CI läuft mit
   `pnpm install --frozen-lockfile`. Ein npm-Lauf zerstört die Konsistenz.
3. **Gerendertes HTML prüfen, nicht nur den Lint.** Die größten i18n-Fehler
   dieses Projekts lagen in Konstanten-Arrays und waren für
   `react/jsx-no-literals` unsichtbar.
4. **Jede neue Client-Komponente braucht ihren Namespace in der
   `pick()`-Liste.** Fehlt er, rendert die Komponente Key-Pfade statt Text — und
   der Build bleibt grün.
5. **Der Dev-Server ist unter Parallellast unzuverlässig.** Vereinzelte 500er
   und Verbindungsabbrüche beim Crawlen sind Turbopack-Artefakte. Immer
   einzeln nachprüfen, bevor daraus ein Befund wird. Maßgeblich ist der
   Produktions-Build.
6. **Vor jedem Löschen greppen.** Frühere Referenz-Treffer waren durchweg
   False Positives (`r.json()`, Routenpfade, `locale === 'es'`) — aber die
   Prüfung muss trotzdem laufen.

---

## 6. Ausführungs-Prompt

Für die schrittweise autonome Abarbeitung. Als Systemauftrag verwenden; pro
Durchlauf **genau eine** Phase.

```
Du arbeitest am Repository /Users/umurey/Downloads/K-Aqua-V1-main
(Next.js 15 App Router, next-intl, Tailwind 4, pnpm, TypeScript strict mit
noUncheckedIndexedAccess).

Maßgeblich ist docs/LAUNCH_PLAN.md. Lies es zuerst vollständig.

Aufgabe: Führe genau die nächste noch offene Phase aus Abschnitt 4 aus.
Danach hältst du an und berichtest. Beginne keine zweite Phase.

Vorgehen je Phase:
1. Bestimme die nächste offene Phase (letzte Commits mit `git log --oneline -10`).
2. Führe die Schritte dieser Phase der Reihe nach aus.
3. Halte dich ausnahmslos an die Verifikationsregeln in Abschnitt 5.
4. Qualitäts-Gates, alle müssen bestehen:
   rm -f tsconfig.tsbuildinfo && npx tsc --noEmit      → 0 Fehler
   npx eslint .                                        → 0 Errors
   npm run i18n:check                                  → Exit 0
   npx vitest run                                      → 33/33
   rm -rf .next && npm run build                       → grün, ~4.350 Seiten
5. Verifiziere das Phasenergebnis am gerenderten HTML oder per HTTP, nicht nur
   am Quellcode. Belege das Ergebnis mit der tatsächlichen Ausgabe.
6. Ein Commit pro Phase. Commit-Nachricht: was war kaputt, was ist jetzt anders,
   womit belegt. Kein Push ohne ausdrückliche Freigabe.

Harte Regeln:
- Schlägt ein Gate fehl: reparieren, nicht umgehen. `ignoreBuildErrors` und
  `ignoreDuringBuilds` in next.config.ts bleiben auf `false`.
- Phase 8 (Git-Historie) niemals ohne ausdrückliche Freigabe im selben
  Durchlauf — sie ist nicht umkehrbar.
- Zugangsdaten, API-Keys und Environment-Variablen trägst du nicht ein. Das
  sind Operator-Schritte (Abschnitt 7).
- Findest du ein Problem außerhalb der aktuellen Phase: dokumentieren, nicht
  nebenbei mitreparieren.
- Berichte Fehlschläge im Klartext, mit der Ausgabe. Keine beschönigten
  Statusmeldungen.
```

---

## 7. Nur vom Auftraggeber ausführbar

Diese Schritte kann und soll die Umsetzung nicht übernehmen.

| Schritt | Detail |
|---|---|
| **Vercel Environment** | `RESEND_API_KEY` **oder** `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM`; optional `CRM_WEBHOOK_URL`. Für Production **und** Preview. |
| **`NEXT_PUBLIC_SITE_URL`** | Auf `https://k-aqua.de` — steuert Canonicals, Sitemap und `robots.txt` `Host:`. |
| **Datenschutz-Freigabe** | Der überarbeitete Text ist als Entwurf gekennzeichnet und braucht juristische Prüfung. |
| **Redeploy ohne Cache** | Nach dem ersten Deploy einmal ohne Build-Cache, damit alter ISR-Inhalt verworfen wird. |
| **Freigabe Git-Historie** | E4 bricht alle bestehenden Klone. Braucht eine bewusste Entscheidung und die Information aller Beteiligten. |
| **Search Console** | Nach E4 die Entfernung der Vertrags-URLs aus dem Google-Cache beantragen. |
| **Post-Launch-Prüfung** | Vertrauliche URLs → 404; `/pdf/…` → 200; Testanfrage kommt bei `info@k-aqua.de` an, mit korrektem Reply-To. |

---

## 8. Erwartetes Ergebnis

| | heute | nach Phase 7 |
|---|---|---|
| Animations-Runtimes | 2 | **1** |
| `node_modules` | — | **~9 MB kleiner** (E2) |
| Ungenutzte API-Endpunkte | 1 | **0** |
| Parallele i18n-Systeme | 2 | **1** |
| Playwright-Specs (nie ausgeführt) | 15 | **0** — 4 laufen in der CI |
| robots.txt / noindex | widersprüchlich | **konsistent** |
| Toter SEO-Inhalt | 153 KB + 1,3 MB | **0** |
| CI-Stufen | 5 | **6** (mit E2E) |
| Leads | Konsolen-Mock | **Zustellung an info@k-aqua.de** |

Nach Phase 8 zusätzlich: `.git` deutlich unter 343 MB, signierte Verträge aus
der Historie entfernt.
