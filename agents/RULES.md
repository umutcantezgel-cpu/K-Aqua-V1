# RULES.md — verbindliche Regeln für ALLE Agenten

> Diese Datei vor jedem Arbeitspaket lesen. Sie hat Vorrang vor Einzel-Prompts,
> wenn etwas im Konflikt steht. Verstöße = Build gilt als nicht fertig.

## 1. Universelle i18n (höchste Priorität)
- **Kein** nutzersichtbarer String wird hartkodiert. Jeder Text läuft über `useTranslations(namespace)` (Client) bzw. `getTranslations` (Server).
- Die ESLint-Regel `react/jsx-no-literals` (in `eslint.config.mjs`) markiert Literale als **Fehler**. Ausnahmen nur für Marken-Eigennamen aus der erlaubten Liste.
- Alle `messages/*.json` haben **identische Schlüsselmengen** — CI-Schema-Test (`pnpm i18n:check`) muss grün sein.
- **Deutsch ist Quellsprache.** Bei Textfragen ist das `de`-Dictionary maßgeblich.

## 2. Sprach-Reinheit (verbindlich)
- Eine Locale erscheint **erst dann** im Sprachwähler und in `routing.locales`, wenn ihre Schlüsselmenge **zu 100 %** übersetzt ist.
- **Niemals** gemischtsprachige Seiten ausliefern. **Kein** automatischer EN-Fallback in Produktion für sichtbaren Text.
- Heute freigeschaltet: `de`, `en`, `ar`. Weitere (`fr, es, it, pt, nl, pl, tr, ru, zh`) erst nach vollständiger, geprüfter Übersetzung.
- Marken-Claims bleiben in **allen** Sprachen englisch: Produktnamen, „Trust Center", „Academy", „PP-R/PP-RCT". (KESSEL-Eigenclaim „Leading in drainage" unverändert.)

## 3. Keine Bilder im Code
- Keine `<img src>`-URLs, keine Remote-Hotlinks, keine erfundenen Bild-Assets.
- Jede Bildfläche ist eine **`<MediaSlot>`**-Komponente (Label + festes Seitenverhältnis). Echte Fotos kommen später aus CMS/`public/`.
- `next/image` erst verdrahten, wenn echte Assets vorliegen.

## 4. Keine erfundenen Inhalte
- Texte/Daten stammen aus dem Prototyp und den Dictionaries.
- Markierte Platzhalter (CO₂-Faktoren, Zertifikat-IDs, Referenzprojekte, Normen je Markt, Benefits-Beträge) **so belassen** und mit `// TODO(content)` kennzeichnen. Nicht „plausibel ausfüllen".

## 5. Styling-Disziplin
- **Nur semantische Tailwind-Klassen / Tokens** — kein einziger Hex-Wert im Markup. Erlaubte Namen: siehe `docs/TOKENS.md`.
- Dark Mode ausschließlich über `[data-theme="dark"]` (next-themes), OLED `#0A0A0F`, nie reines Schwarz im Markup.
- 4/8pt-Spacing, asymmetrische **Bento-Grids** (6-Spalten-Basis), **diffuse** Schatten — keine harten.

## 6. Interaktion & A11y (WCAG AA)
- Jede Interaktion: Hover-State, `active:scale-[0.97]`, `focus-visible:ring-2 ring-ring`, Touch-Target **≥ 44×44px**.
- `aria-current` (Nav), `aria-pressed` (Toggles/Chips), Skip-Link, korrekte Fokusreihenfolge im Mega-Menü.
- Kontraste ≥ 4.5:1 in **beiden** Themes. axe-clean auf jedem Template.

## 7. Motion
- UI-Transitions 150–300ms, Reveals 600ms (`whileInView`, `viewport={{ once: true }}`, 22px y-Offset, Stagger via delay).
- Page-Wipe in `template.tsx` via `AnimatePresence` (`--ease-wipe`, 820ms, Tropfen-Icon).
- **Immer** `useReducedMotion()` — bei Reduktion nur Fade/kein Transform; Globus zeigt statisches Bild.

## 8. RTL
- Durchgängig **logische Eigenschaften** (`ps-/pe-/ms-/me-`, `start/end`, `text-start`) statt `left/right`.
- Pfeil-Icons in RTL spiegeln (`rtl-flip` / `rtl:-scale-x-100`). `<html dir>` setzt das Root-Layout aus der Locale.

## 9. Globus = Logik 1:1 übernehmen
- `prototype/kaqua-loader.js` ist framework-frei und ausgereift (360°-Drag, Trägheit, flyTo, Marker). **Nicht neu erfinden** — als Client Component kapseln.
- world-atlas TopoJSON **zur Build-Zeit** nach `public/data/` vendoren (kein Runtime-CDN-Fetch).

## 10. Definition of Done (global)
- `pnpm build` ohne Errors/Warnings; alle freigeschalteten Seiten statisch generiert.
- `pnpm lint` (inkl. i18n-Guard) + `pnpm typecheck` + `pnpm i18n:check` grün.
- Lighthouse ≥ 95 (Performance/A11y/SEO/Best Practices) auf Home, Märkte, einer Geo-Seite.
- `ar` vollständig RTL ohne Layout-Brüche; Dark Mode ohne Flash (`suppressHydrationWarning`).
