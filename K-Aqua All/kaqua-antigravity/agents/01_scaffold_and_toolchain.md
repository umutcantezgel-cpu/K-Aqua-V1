# Agent 01 — Scaffold & Toolchain

## Ausgangslage
Die Konfig-Dateien liegen bereits im Ordner-Root (`package.json`, `tsconfig.json`,
`next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`,
`middleware.ts`, `app/globals.css`, `fonts/`). Du machst daraus ein lauffähiges Next.js-Projekt.

## Aufgabe
1. `pnpm install` (Lockfile committen).
2. Lege die Ordnerstruktur an:
   ```
   app/[locale]/{layout.tsx,page.tsx,template.tsx}
   components/{ui,layout,globe,sections,tools}/
   lib/{data,i18n}/
   messages/
   public/data/
   scripts/
   ```
3. **Fonts** über `next/font/local` aus `fonts/outfit-variable-latin.woff2` + `inter-variable-latin.woff2`
   laden und als CSS-Variablen `--font-outfit` / `--font-inter` exponieren (die `@theme` in
   `globals.css` liest exakt diese Namen). In `app/[locale]/layout.tsx` an `<body>` hängen.
4. **next-intl**: `lib/i18n/routing.ts` (Locales `de` default, `en`, `ar`), `lib/i18n/request.ts`,
   `lib/i18n/navigation.ts` (Link/redirect/usePathname/useRouter-Wrapper). Middleware ist verdrahtet.
5. `app/[locale]/layout.tsx`: `generateStaticParams` über die Locales, `<html lang={locale}
   dir={locale==='ar'?'rtl':'ltr'}>`, `next-themes` `ThemeProvider` (`attribute="data-theme"`,
   `defaultTheme="light"`, `enableSystem={false}`, `suppressHydrationWarning` am `<html>`),
   `NextIntlClientProvider`. `globals.css` importieren.
6. Platzhalter-`app/[locale]/page.tsx` (Hello World) + leere `template.tsx` (gibt `children` durch).
7. `scripts/check-locale-parity.mjs`: prüft, dass alle `messages/*.json` identische Schlüsselmengen haben (exit 1 bei Abweichung). Noch tolerant, solange messages/ leer ist.

## Definition of Done
- `pnpm dev` startet; `/de` und `/ar` rendern „Hello World"; `/ar` hat `dir="rtl"` am `<html>`.
- `pnpm typecheck` grün. Theme-Attribut wird ohne Hydration-Flash gesetzt.
- Reihenfolge der Provider: `ThemeProvider > NextIntlClientProvider > {children}`.
