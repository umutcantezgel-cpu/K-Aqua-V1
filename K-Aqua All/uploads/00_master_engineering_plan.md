# Master Engineering Plan: Website Upgrade Framework
**Status:** Planning Phase | **Source of Truth:** Documents `01` to `20`

This master task list provides the comprehensive blueprint for upgrading any existing website using the 20 context documents as the definitive design and architecture knowledge base.

---

## Phase 1: Audit & Token Resolution (Docs 01, 02, 05, 06, 07, 08)
- [ ] **Task 1.1:** Identify the website's product vertical (SaaS, e-commerce, portfolio, etc.) using Doc 05's reasoning matrix.
- [ ] **Task 1.2:** Resolve the target aesthetic system via Doc 08 (80 styles) and Doc 05 (style priority boosting).
- [ ] **Task 1.3:** Extract the exact semantic color palette from Doc 06 for the identified vertical.
- [ ] **Task 1.4:** Select the typography pairing from Doc 07 (73 font systems) matching the vertical's mood.
- [ ] **Task 1.5:** Define CSS custom properties in `globals.css` following Doc 01's `:root` variable schema.
- [ ] **Task 1.6:** Configure `tailwind.config.ts` to reference the new semantic tokens (Doc 15).

## Phase 2: Framework & Scaffolding (Docs 03, 13)
- [ ] **Task 2.1:** Audit the existing tech stack and identify the target framework (Next.js App Router, Vite, Astro).
- [ ] **Task 2.2:** Set up the project structure following Doc 03's conventions (`components/ui/`, `lib/`, `hooks/`).
- [ ] **Task 2.3:** Configure `next/font` for self-hosted Google Fonts with zero layout shift (Doc 13).
- [ ] **Task 2.4:** Set up `next-themes` for dark mode toggle supporting `prefers-color-scheme` (Doc 13).
- [ ] **Task 2.5:** Implement the `cn()` utility helper using `clsx` + `tailwind-merge` (Doc 03).

## Phase 3: Component Library (Docs 17, 18, 19, 12)
- [ ] **Task 3.1:** Build `<Button>` variants (Primary, Secondary, Ghost, Destructive) with all interaction states: hover, active (`scale-[0.97]`), focus-visible, disabled, loading (Doc 17).
- [ ] **Task 3.2:** Build `<Input>` with floating/top labels, focus ring, error state with `role="alert"`, clearable pattern (Doc 17).
- [ ] **Task 3.3:** Build `<Card>` component with aesthetic variants (Modern, Glass, Brutalist, Terminal) following Doc 18.
- [ ] **Task 3.4:** Implement responsive grid layouts using CSS Grid with `auto-fill/minmax` and explicit breakpoint columns (Doc 18).
- [ ] **Task 3.5:** Standardize icon usage via Lucide React with correct stroke weight matching, `aria-label` on icon buttons (Doc 19).
- [ ] **Task 3.6:** Implement `next/image` patterns for hero, cards, and avatars with `sizes`, `priority`, and fallbacks (Doc 19).

## Phase 4: Animation & Motion (Docs 14, 04)
- [ ] **Task 4.1:** Integrate Framer Motion for scroll-triggered reveals (`whileInView`, `once: true`) (Doc 14).
- [ ] **Task 4.2:** Implement staggered list entrance animations using `variants` and `staggerChildren` (Doc 14).
- [ ] **Task 4.3:** Configure spring physics for interactive elements: `whileHover`, `whileTap` (Doc 14).
- [ ] **Task 4.4:** Implement `prefers-reduced-motion` global CSS override and `useReducedMotion()` hook (Doc 14).
- [ ] **Task 4.5:** Ensure all transitions follow the timing guidelines: hover 150–200ms, modals 250–350ms, pages 300–400ms (Doc 14).

## Phase 5: Page Architecture (Docs 09, 10, 11)
- [ ] **Task 5.1:** Rebuild the landing page following the relevant archetype from Doc 09's 36 patterns (e.g., Hero+Features+CTA for SaaS).
- [ ] **Task 5.2:** Apply product-specific adaptations from Doc 10 (dashboard type, navigation pattern, color focus).
- [ ] **Task 5.3:** Implement data visualizations (if applicable) following Doc 11's chart rules, accessibility tabular fallbacks, and color constraints.

## Phase 6: Accessibility & Responsive Validation (Docs 04, 16)
- [ ] **Task 6.1:** Audit all touch targets to guarantee ≥44x44px on all interactive elements (Doc 16).
- [ ] **Task 6.2:** Verify focus-visible indicators on ALL interactive elements — no `outline: none` without alternative (Doc 16).
- [ ] **Task 6.3:** Test responsive layout at all breakpoints: 375px, 640px, 768px, 1024px, 1280px, 1536px (Doc 16).
- [ ] **Task 6.4:** Validate text contrast ratios: ≥4.5:1 normal text, ≥3:1 large text (Doc 04, 06).
- [ ] **Task 6.5:** Verify `prefers-reduced-motion` respect across all animated elements (Doc 04, 14).
- [ ] **Task 6.6:** Complete WCAG 2.1 AA checklist from Doc 16 Section 7.

## Phase 7: Final Pre-Delivery (Doc 02, 20)
- [ ] **Task 7.1:** Run the consolidated Pre-Delivery Validation Checklist from Doc 20 Section 5.
- [ ] **Task 7.2:** Validate dark mode token correctness across all components (Doc 15).
- [ ] **Task 7.3:** Run Lighthouse audit — target 90+ on Performance, Accessibility, Best Practices, SEO (Doc 13).
- [ ] **Task 7.4:** Verify no CLS issues — all images have explicit dimensions, async content has reserved space (Doc 04).
- [ ] **Task 7.5:** Final production build (`npm run build`) with zero errors and zero warnings.
