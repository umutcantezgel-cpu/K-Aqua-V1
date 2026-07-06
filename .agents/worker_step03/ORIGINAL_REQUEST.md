## 2026-06-14T12:30:43Z

Objective:
Execute the task defined in /Users/umurey/Downloads/kaqua-antigravity 2/agents/03_ui_primitives.md.
Specifically, implement the following components in `/Users/umurey/Downloads/kaqua-antigravity 2/components/ui/`:

1. `Button.tsx`:
   - Uses `class-variance-authority` (CVA) to define:
     - `variant`: `primary` (bg-primary, text-primary-foreground, shadow-diffuse, hover:bg-primary-hover hover:shadow-lift hover:-translate-y-0.5), `ghost` (bg-transparent text-foreground border border-card-border hover:border-primary hover:text-primary hover:bg-primary-soft), `inverse` (bg-inverse-foreground text-inverse-surface hover:shadow-lift hover:-translate-y-0.5).
     - `size`: `sm` (min-h-[44px] px-4 text-small), `md` (min-h-[48px] px-6 text-body), `lg` (min-h-[56px] px-8 text-lead).
   - Supports: `active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring outline-none transition-all duration-fast ease-out`.
   - Renders `<a>` if `href` is present, otherwise `<button type="button">`.
   - Supports leading/trailing `icon` slot.

2. `Card.tsx` (BentoCard):
   - Renders a card container: `bg-card border border-card-border rounded-xl shadow-diffuse p-8 transition-all duration-200 ease-out flex flex-col gap-4 hover:-translate-y-[3px] hover:shadow-lift relative`.
   - Supports `tint` boolean prop (which changes background to `bg-card-tint`).
   - Supports `span` number prop to style `grid-column: span [N]` (e.g. `gridColumn: span ${span}`).

3. `Eyebrow.tsx`:
   - Renders a styled overline tag: `flex items-center gap-2 text-tiny font-bold tracking-wider uppercase text-primary font-body before:content-[''] before:w-6 before:h-[2px] before:bg-accent before:rounded-sm`.

4. `SectionHead.tsx`:
   - A layout component displaying an optional `eyebrow`, `title` (using h2 heading, Outfit font, font-extrabold), and `lead` (pretty wrapped text). Supports alignment (`left` or `center`).

5. `IconChip.tsx`:
   - An icon wrapper: `w-12 h-12 rounded-[14px] grid place-items-center bg-primary-soft text-primary`.

6. `Chip.tsx`:
   - A static badge/pill: `inline-flex items-center gap-2 text-[13.5px] font-semibold px-3.5 py-1.5 rounded-full border border-card-border bg-background text-muted-foreground`.

7. `FilterChip.tsx`:
   - Interactive version of Chip with `aria-pressed`, selected state classes, and click handler.

8. `StatNumber.tsx`:
   - Renders statistics: large number (`font-heading font-extrabold text-h1 text-primary`) and label (`text-small text-muted-foreground mt-2`).

9. `CTABand.tsx`:
   - A banner component using `bg-inverse-surface text-inverse-foreground rounded-xl p-8 md:p-16 relative overflow-hidden`.
   - Renders a glowing radial orb: `after:content-[''] after:absolute after:w-[640px] after:h-[640px] after:-right-[200px] after:-top-[320px] after:bg-[radial-gradient(circle,oklch(0.6_0.16_302_/_0.35),transparent_65%)] after:pointer-events-none`.

10. `DataTable.tsx`:
    - Renders a responsive data table styled with hover row backgrounds: `tr:hover td` changes to `bg-primary-soft text-foreground`.

11. `Logo.tsx` (KAquaLogo):
    - Renders the brand logo: inline-flex wrapper, SVG droplet drop in `fill-primary` + inner loop path, and wordmark "K-AQUA" in `font-heading font-extrabold tracking-tight`.

12. `MediaSlot.tsx`:
    - Renders a visual placeholder representing images: `relative overflow-hidden aspect-[4/3] rounded-xl border border-card-border bg-[linear-gradient(135deg,var(--primary-soft),var(--background-subtle))]`.
    - Exposes label inside the slot for design debugging (representing the mock picture).

13. Create a dev checklist visualization page `app/[locale]/dev/ui/page.tsx` (accessible at `/de/dev/ui`):
    - Showcases all the above UI primitives side by side or neatly categorized in light and dark themes.
    - To satisfy `react/jsx-no-literals`, make sure to keep all string labels in variables outside the JSX tags.

Verify that `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm i18n:check` all pass with no errors or warnings.
Write a handoff report at `/Users/umurey/Downloads/kaqua-antigravity 2/.agents/worker_step03/handoff.md`.
