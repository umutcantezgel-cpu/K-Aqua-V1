# Integrations-Memory

Lebendes Protokoll, analog zu `docs/AGENT_LOG.md` im Zielrepo fortgeführt (nicht neu
erfunden). Vor jedem Segment lesen; nach jedem Segment einen Eintrag anhängen: was gebaut
wurde, welche Entscheidungen bewusst vom Plan abwichen (+ warum), welche Stolperfallen
entdeckt wurden, was wiederverwendbar ist, welche offenen Fragen an das nächste Segment
gehen. Kein Segment gilt ohne diesen Eintrag als abgeschlossen.

---

### I00 — Paketerstellung (dieser Durchlauf)

**Datum:** 2026-07-04
**Was:** Reale Zielcodebasis ermittelt (`K-Aqua-V1`, gegen Live-Fetch + GitHub verifiziert),
alle 68+ Design-Projekt-Dateien systematisch gesichtet, Katalog- und Deep-Content-Daten
per Skript-Extraktion (nicht Abtippen) verifiziert und als `data/catalog.ts` +
`data/deep-content.ts` + `messages/deep-fragments/*.json` ausgegeben. Komponentenbrücke
Prototyp→Repo Datei-für-Datei verglichen (`kaqua-ui.jsx` gegen `components/ui/*.tsx`).

**Bewusste Abweichungen vom Auftragstext:**
- `messages/deep/{de,en,ar}.json` (Auftragstext-Beispielpfad) → tatsächlich
  `messages/deep-fragments/{de,en,ar}.json` als **Merge-Fragmente**, weil das reale Repo
  Namespaces **innerhalb** von `messages/{locale}.json` führt, keine separaten Dateien pro
  Content-Bereich (verifiziert gegen `docs/DATA_CONTRACTS.md` + `docs/AGENT_LOG.md` im
  Zielrepo). Neue Dateien anzulegen hätte `pnpm i18n:check` nicht bedient.
- „79 Artikel" → **71**, siehe `00-FINDINGS.md` §0.5. Zahl wird nirgends hardcodiert,
  nur zur Laufzeit gezählt.
- Phase-2.0-Material (Globe-Hub/PipeFX/Enterprise-Section/CV-Generator) **nicht**
  mitgebaut — im Auftragstext nicht genannt, im echten Repo nicht nachweisbar integriert.

**Stolperfallen für nachfolgende Segmente:**
- `Reveal`-`delay` ist im Prototyp Millisekunden, im echten `Reveal.tsx` (Framer Motion)
  Sekunden. Nicht 1:1 kopieren — durch 1000 teilen.
- next-intl `t('key')` liefert nur Strings — strukturierte Werte (Arrays/Objekte:
  `pipes`, `faq`, `matRows`, `norms`, `gloss`, `procs`, …) brauchen `t.raw('key')`.
- `components/ui/icon.tsx` fehlt `ChevronDown` — vor Segment I03 ergänzen, sonst bricht
  `DeepFAQ`/`CatalogBrowser`/`NewsDeep` beim Import.
- `Button.tsx` kennt keine `secondary`-Variante — Entscheidung in `00-FINDINGS.md` §0.10.4
  noch offen, Default hier: auf `ghost` mappen.

**Wiederverwendbares Muster:** Skript-Extraktion (JS-Objektliteral → `new Function` →
`JSON.stringify`) statt manuellem Abtippen — verhindert Transkriptionsfehler bei großen
Datensätzen und lässt sich für jede künftige Prototyp→Repo-Datenportierung wiederverwenden.

**Offene Fragen an Segment I01+:** siehe `00-FINDINGS.md` §0.10 (5 Punkte) — insbesondere
Schreibzugriff aufs Zielrepo und die 9-Locales-Fallback-Frage, bevor I05 vollständig
abgeschlossen werden kann.

---

<!-- Nächster Eintrag: I01 — ... -->
