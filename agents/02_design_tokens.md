# Agent 02 — Design-Tokens verifizieren & Theme-Schalter

## Ausgangslage
`app/globals.css` enthält bereits den **vollständigen** Token-Layer (Primitive, Light, OLED-Dark,
φ-Typo, Spacing, Radii, Schatten, Motion) als Tailwind-4 `@theme inline`. Du portierst NICHTS neu —
du **verifizierst** und ergänzt nur den Theme-Schalter + eine Token-Testseite.

## Aufgabe
1. Prüfe, dass jede in `docs/TOKENS.md` gelistete Utility tatsächlich auflöst (z. B. `bg-background`,
   `text-h1`, `shadow-lift`, `text-accent-strong`). Fehlt eine Zuordnung im `@theme inline`, ergänze sie.
2. `components/layout/ThemeToggle.tsx` (Client): schaltet `next-themes` `setTheme('light'|'dark')`,
   Sonne/Mond-Icon, `aria-label`, 44px-Target, `active:scale-[0.97]`, `focus-visible:ring-2 ring-ring`.
3. **Dev-Token-Seite** `app/[locale]/dev/tokens/page.tsx` (nur Dev): zeigt alle Farb-Swatches,
   Typo-Stufen, Radii, Schatten in **beiden** Themes nebeneinander.
4. Bestätige: **kein Hex-Wert** in irgendeinem JSX (nur Token-Utilities/`var()`).

## Hinweise
- Dark = `[data-theme="dark"]`, OLED `#0A0A0F`. Nie reines Schwarz im Markup.
- Brand-Migration (Coday-Teal statt Violett) ist **nicht** Teil dieses Pakets — siehe DESIGN_SYSTEM_BRIDGE; nur falls separat beauftragt.

## Definition of Done
- `/de/dev/tokens` zeigt alle Tokens in Light und Dark korrekt; Umschalten ohne Flash.
- `pnpm lint` (inkl. jsx-no-literals — Dev-Seite darf Token-Namen als Code-Strings zeigen, kein sichtbarer Fließtext) + `pnpm typecheck` grün.
