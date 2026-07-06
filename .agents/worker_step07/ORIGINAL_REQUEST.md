## 2026-06-14T12:49:40Z
You are a worker with role: App-Shell Developer.
Your working directory is /Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step07.
The project root directory is /Users/umurey/Downloads/kaqua-antigravity 2.

Objective:
Execute the task defined in /Users/umurey/Downloads/kaqua-antigravity 2/agents/07_app_shell.md.
Specifically, implement the following components in `/Users/umurey/Downloads/kaqua-antigravity 2/components/layout/` and update `layout.tsx`:

1. `components/layout/SkipLink.tsx`:
   - Renders a skip navigation link: "Zum Inhalt springen" (or localized equivalent). It must be visually hidden offscreen by default and move into view when focused (`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 min-h-[44px]`). Targets href `#main-content`.

2. `components/layout/ScrollProgress.tsx`:
   - Renders a 2px top progress bar: `fixed top-0 left-0 h-0.5 bg-primary z-50 transition-[width] ease-out`.
   - Client component with `requestAnimationFrame`-throttled scroll listener calculating scroll percentage of the page scroll height, with `aria-hidden="true"`.

3. `components/layout/NavLinks.tsx`:
   - Client component rendering the main navigation links:
     - Map pages: `home` (url `/`), `products` (url `/produkte`), `finder` (url `/produkte/finder`), `co2` (url `/co2-rechner`), `markets` (url `/maerkte`), `trust` (url `/trust-center`).
     - Uses next-intl `Link` from `@/lib/i18n/navigation`.
     - Detects active link using `usePathname()` (matching active locale-stripped pathname) and sets `aria-current="page"`.
     - Applies navigation styles: `min-h-[44px] px-4 inline-flex items-center text-muted-foreground hover:text-foreground font-heading font-medium hover:bg-primary-soft rounded-full transition-colors active:scale-[0.97]`. Active state receives `text-primary font-bold`.

4. `components/layout/Header.tsx`:
   - Client component, positioned `fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out border-b border-transparent h-[72px] flex items-center`.
   - Scroll listener: after scroll > 8px (or menu open), applies glassmorphism styles: `bg-[var(--nav-glass)] backdrop-blur-[16px] saturate-[1.4] border-[var(--nav-border)] shadow-sm`.
   - Layout:
     - Logo (`KAquaLogo` or `Logo`) linked to `/`.
     - `NavLinks` (desktop navigation).
     - Action bar containing: `LangPicker`, `ThemeToggle`, `Button` (Primary CTA "Angebot anfragen" with `size="sm"` linking to `/projektanfrage` / `#rfq`), and a Menu Toggle icon button (Menu/X, touch target >= 44x44px, `aria-label`, `aria-expanded` attributes).
     - Renders a placeholder or setup state for the mega menu (will be fully implemented in step 08).

5. `components/layout/Footer.tsx`:
   - Bg/text: `bg-inverse-surface text-inverse-foreground mt-24 relative overflow-hidden py-12 md:py-20`.
   - Renders a glowing radial orb: `before:content-[''] before:absolute before:w-[900px] before:h-[900px] before:-left-[300px] before:-bottom-[600px] before:bg-[radial-gradient(circle,oklch(0.6_0.16_302_/_0.22),transparent_65%)] before:pointer-events-none`.
   - Layout:
     - 4 Columns:
       1. Wordmark logo (`Logo`) + Tagline paragraph.
       2. Tools (Col title from `footer.colTools`): Products (`/produkte`), Finder (`/produkte/finder`), CO₂-Rechner (`/co2-rechner`), Materialvorteile (`/loesungen`), Academy (`/academy`).
       3. Company (Col title from `footer.colCompany`): Über uns (`/unternehmen`), Märkte (`/maerkte`), Trust Center (`/trust-center`), Partnerschaft (`/partnerschaft`), Referenz-Globus (`/referenzen`), News (`/news`), Karriere (`/karriere`).
       4. Contact (Col title from `footer.colContact`): Contact link (`/kontakt`), Address/Directions details.
     - Lower bar: Impressum (`/impressum`), Datenschutz (`/datenschutz`) and Copyright.
     - All links must use next-intl `Link`.
     - Logical styling (RTL-aware e.g. text align start, logical pad/margin).

6. Integrate these layout components in `/Users/umurey/Downloads/kaqua-antigravity 2/app/[locale]/layout.tsx`:
   - Structure inside `body`:
     ```tsx
     <SkipLink />
     <ScrollProgress />
     <Header />
     <main id="main-content" className="pt-[72px] min-h-screen">
       {children}
     </main>
     <Footer />
     ```

Ensure all translation strings are retrieved using next-intl (no hardcoded JSX text strings to satisfy ESLint `react/jsx-no-literals`).
Verify that `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm i18n:check` all pass with no warnings or errors.
Write a handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step07/handoff.md`.
