# Agent 05 — i18n-Infrastruktur

## Input
`prototype/kaqua-i18n.jsx`, `agents/RULES.md` (i18n + Sprach-Reinheit).

## Aufgabe — die Mechanik, NICHT die Vollübersetzung (das macht Agent 06)
1. **`lib/i18n/routing.ts`**: `defineRouting({ locales: ['de','en','ar'], defaultLocale: 'de',
   localePrefix: 'always' })`. Weitere Locales bleiben auskommentiert mit Kommentar
   „erst nach 100 % Übersetzung freischalten (RULES §2)".
2. **`lib/i18n/request.ts`**: lädt `messages/${locale}.json`.
3. **`lib/i18n/navigation.ts`**: `createNavigation(routing)` → typsichere `Link`, `redirect`, `usePathname`, `useRouter`.
4. **`messages/de.json`, `en.json`, `ar.json`** anlegen mit der **kompletten Schlüsselstruktur**
   (Namespaces siehe `docs/DATA_CONTRACTS.md`). Inhalt zunächst aus dem Prototyp für de/en/ar
   (diese drei sind im Prototyp bereits vollständig — übernehmen, nicht neu schreiben).
5. **`components/layout/LangPicker.tsx`**: listet NUR `routing.locales`; persistiert die Wahl
   (Cookie `NEXT_LOCALE` via next-intl); wechselt die Route locale-erhaltend. 44px/Focus/`aria`.
6. **`scripts/check-locale-parity.mjs`** scharf schalten: vergleicht die Schlüsselmengen aller
   `messages/*.json` rekursiv; listet fehlende/überzählige Keys; exit 1 bei Differenz.

## Regeln
- Marken-Eigennamen bleiben sprachübergreifend englisch (RULES §2).
- `ar` ist RTL — Texte sind logisch, kein `left/right` in Inhalten.

## Definition of Done
- `/de`, `/en`, `/ar` laden ihre Messages; LangPicker zeigt genau 3 Sprachen; Wahl überlebt Reload.
- `pnpm i18n:check` grün (de/en/ar schlüsselgleich).
