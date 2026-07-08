# Merge-Anleitung — Deep-Content i18n-Fragmente

`de.json` / `en.json` / `ar.json` in diesem Ordner sind **keine eigenständigen Dateien für
die Produktion** — next-intl im Zielrepo lädt pro Locale genau eine Datei
(`messages/{locale}.json`), Namespaces liegen darin als Top-Level-Keys (siehe
`docs/DATA_CONTRACTS.md` im Zielrepo). Diese Fragmente enthalten **nur die 15 neuen
Top-Level-Keys** (14 Deep-Content-Namespaces + `catalogx`) — zum Mergen:

```ts
// Beispiel (einmalig, pro Sprache):
import existing from '../../messages/de.json';
import fragment from './deep-fragments/de.json';
const merged = { ...existing, ...fragment }; // fragment-Keys sind alle NEU, keine Kollision
```

Oder manuell: die 15 Top-Level-Keys aus `de.json`/`en.json`/`ar.json` hier per Copy-Paste
ans Ende des jeweiligen `messages/{locale}.json` im Zielrepo einfügen (Komma nicht
vergessen).

## Was bereits geprüft ist

- **Schlüsselparität:** automatisiert verifiziert (Skript-Diff, nicht manuell) — alle 15
  Namespaces haben in `de`/`en`/`ar` identische Top-Level- und Erste-Ebene-Schlüssel.
  0 Abweichungen.
- **Keine Kollision:** die 15 Keys (`productsx, solutionsx, trustx, partnerx, academyx,
  servicex, aboutx, newsx, contactx, careerx, refsx, finderx, co2x, catalogx, homedeep`)
  existieren in keiner bestehenden `messages/{locale}.json` (verifiziert gegen
  `docs/DATA_CONTRACTS.md`s Namespace-Liste des Zielrepos).

## Was noch offen ist

- **9 gesperrte Locales** (`fr,es,it,pt,nl,pl,tr,ru,zh`): nicht in diesem Ordner enthalten.
  Falls `pnpm i18n:check` über alle 12 Dateien laufen soll, `en.json`-Fragment als
  Fallback-Inhalt in die 9 übrigen Dateien kopieren (entspricht dem im Zielrepo bereits
  etablierten Verfahren für die anderen Namespaces, siehe dessen `docs/AGENT_LOG.md`) —
  siehe offene Frage in `00-FINDINGS.md` §0.10.5.
- **`note`-Felder in `catalogx`-Konsumenten** (`CatalogBrowser.tsx`) sind nur in `de.json`
  fachlich relevant befüllt und werden von der Komponente bewusst nur bei `locale==='de'`
  angezeigt — siehe `00-FINDINGS.md` §0.7.

## Struktur-Referenz (erste Ebene je Namespace)

`productsx`: pipesEyebrow/pipesTitle/pipesLead/pipes[]/dimEyebrow…dimNote/anchorsTitle/
anchors[]/matEyebrow…matRows[]/fitEyebrow…fitGroups[]/normEyebrow…norms[]/faqEyebrow/
faqTitle/faq[] — `solutionsx`: seg…/cmp…/life… — `trustx`: stake…/stat…/inst…/audit…/faq…
— `partnerx`: eco…/flow…/road…/spec… — `academyx`: param…/step…/procTabs/procs[]/err…/
gloss[] — `servicex`: lib…/sup…/faq… — `aboutx`: num…/prod…/house…/mile… — `newsx`:
more…/posts[]/ish… — `contactx`: route…/facts[]/faq… — `careerx`: area…/why…/proc… —
`refsx`: sec…/sectors[] — `finderx`: help[]/flow[] — `co2x`: meth…/cert…/scope… —
`catalogx`: eyebrow/title/lead/search…/cats{} — `homedeep`: plant…/badges[]/badgeCta.

Vollständige Feldnamen: siehe die JSON-Dateien selbst (sie sind die Quelle der Wahrheit,
diese Liste ist nur Navigationshilfe).
