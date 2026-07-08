# Design System & CSS


## Globals (app/globals.css)
```css
/* ============================================================
   K-Aqua — globals.css
   Complete design-token layer for the Next.js build.

   Architecture: Tailwind CSS 4 (@theme inline) + semantic tokens
   switched by [data-theme]. Reconciles the K-Aqua brand palette
   with the Coday Design System conventions:
     · Type families  Outfit (display) + Inter (body)          ← Coday
     · φ-based type scale (--text-*)                           ← Coday
     · Fibonacci spacing, radii, shadow elevations            ← Coday
     · Semantic-token discipline (no raw hex in markup)       ← Coday
     · K-Aqua brand hue stays purple #5B2D8C + aqua accent    ← K-Aqua
   See docs/DESIGN_SYSTEM_BRIDGE.md for the full mapping.
   ============================================================ */

@import "tailwindcss";

/* Dark mode is attribute-driven (next-themes attribute="data-theme"). */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* ─────────────────────────────────────────────────────────────
   @theme inline — exposes the semantic tokens as Tailwind utilities.
   `bg-background`, `text-foreground`, `text-primary`, `bg-card`,
   `border-card-border`, `rounded-lg`, `shadow-lift`, `text-h1`, …
   Values resolve to the CSS variables defined under :root/[data-theme].
   ───────────────────────────────────────────────────────────── */
@theme inline {
  /* semantic colors */
  --color-background: var(--background);
  --color-background-subtle: var(--background-subtle);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-faint-foreground: var(--faint-foreground);
  --color-card: var(--card);
  --color-card-border: var(--card-border);
  --color-card-tint: var(--card-tint);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-soft: var(--primary-soft);
  --color-accent: var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-ring: var(--ring);
  --color-inverse-surface: var(--inverse-surface);
  --color-inverse-foreground: var(--inverse-foreground);

  /* brand ramp (escape hatch — prefer the semantic names above) */
  --color-brand-50: var(--brand-50);
  --color-brand-100: var(--brand-100);
  --color-brand-200: var(--brand-200);
  --color-brand-300: var(--brand-300);
  --color-brand-400: var(--brand-400);
  --color-brand-500: var(--brand-500);
  --color-brand-600: var(--brand-600);
  --color-brand-700: var(--brand-700);
  --color-brand-800: var(--brand-800);
  --color-brand-900: var(--brand-900);
  --color-aqua-300: var(--aqua-300);
  --color-aqua-400: var(--aqua-400);
  --color-aqua-500: var(--aqua-500);
  --color-aqua-600: var(--aqua-600);

  /* fonts */
  --font-heading: var(--font-outfit), ui-sans-serif, system-ui, sans-serif;
  --font-body: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* φ-based fluid type scale (Coday) */
  --text-display: var(--fs-display);
  --text-h1: var(--fs-h1);
  --text-h2: var(--fs-h2);
  --text-h3: var(--fs-h3);
  --text-h4: var(--fs-h4);
  --text-lead: var(--fs-lead);
  --text-body: var(--fs-body);
  --text-small: var(--fs-small);
  --text-tiny: var(--fs-tiny);

  /* radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;   /* buttons, inputs */
  --radius-xl: 24px;   /* cards */
  --radius-full: 9999px;

  /* shadows */
  --shadow-diffuse: var(--elev-diffuse);
  --shadow-lift: var(--elev-lift);
  --shadow-glow: var(--elev-glow);

  /* easings */
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-wipe: cubic-bezier(0.76, 0, 0.24, 1);
  --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out: var(--ease-out);

  /* transition durations */
  --duration-fast: var(--dur-fast);
  --duration-normal: var(--dur);
  --duration-slow: var(--dur-slow);
  --duration-slower: var(--dur-slower);

  /* spacing custom utilities */
  --spacing-section: var(--space-section);
  --spacing-container: var(--space-container);
}

/* ─────────────────────────────────────────────────────────────
   PRIMITIVES (theme-independent)
   ───────────────────────────────────────────────────────────── */
:root {
  /* brand hue ramp — K-Aqua purple, base #5B2D8C ≈ --brand-600 */
  --brand-50:  oklch(0.97 0.02 305);
  --brand-100: oklch(0.93 0.045 305);
  --brand-200: oklch(0.86 0.08 305);
  --brand-300: oklch(0.76 0.12 305);
  --brand-400: oklch(0.62 0.16 303);
  --brand-500: oklch(0.51 0.18 302);
  --brand-600: oklch(0.44 0.17 302);
  --brand-700: oklch(0.38 0.15 302);
  --brand-800: oklch(0.31 0.12 302);
  --brand-900: oklch(0.25 0.09 302);

  /* aqua accent ramp */
  --aqua-300: oklch(0.85 0.09 210);
  --aqua-400: oklch(0.77 0.11 215);
  --aqua-500: oklch(0.68 0.12 220);
  --aqua-600: oklch(0.56 0.11 225);

  /* φ-based type scale (phi = 1.618) — Coday convention */
  --fs-tiny:   0.786rem;  /* ~12.6px — overlines, meta */
  --fs-small:  0.875rem;  /* 14px    — captions */
  --fs-body:   1rem;      /* 16px    — body (min on web) */
  --fs-lead:   1.188rem;  /* ~19px   — lead paragraphs */
  --fs-h4:     clamp(1.125rem, 1.5vw + 0.5rem, 1.375rem);
  --fs-h3:     clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  --fs-h2:     clamp(1.875rem, 3.6vw + 0.5rem, 2.875rem);
  --fs-h1:     clamp(2rem, 6vw + 0.5rem, 4.75rem);
  --fs-display:clamp(2.25rem, 7vw + 0.5rem, 6.854rem);

  /* weights */
  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;
  --fw-extrabold: 800;
  --fw-black: 900;

  /* tracking */
  --tracking-tighter: -0.03em;
  --tracking-tight: -0.02em;
  --tracking-wide: 0.05em;
  --tracking-wider: 0.12em;

  /* spacing — 4 / 8pt + Fibonacci-adjacent (mirrors prototype --sp-*) */
  --sp-1: 4px;  --sp-2: 8px;  --sp-3: 12px; --sp-4: 16px;
  --sp-6: 24px; --sp-8: 32px; --sp-12: 48px; --sp-16: 64px; --sp-24: 96px;
  --space-section: clamp(64px, 9vw, 120px);
  --space-container: clamp(20px, 4vw, 48px);
  --container: 1200px;
  --radius: 16px;
  --radius-lg: 24px;
  --radius-full: 9999px;

  /* motion durations */
  --dur-fast: 150ms;
  --dur: 250ms;
  --dur-slow: 500ms;
  --dur-slower: 700ms;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  --success: oklch(0.55 0.15 140);
  --error: oklch(0.50 0.18 25);
}

/* ─────────────────────────────────────────────────────────────
   SEMANTIC — LIGHT
   ───────────────────────────────────────────────────────────── */
[data-theme="light"] {
  color-scheme: light;
  --background: oklch(0.985 0.004 300);
  --background-subtle: oklch(0.965 0.008 302);
  --foreground: oklch(0.22 0.03 300);
  --muted-foreground: oklch(0.40 0.025 300);
  --faint-foreground: oklch(0.48 0.025 300);
  --card: #ffffff;
  --card-border: oklch(0.91 0.012 302);
  --card-tint: var(--brand-50);
  --primary: var(--brand-600);
  --primary-hover: var(--brand-700);
  --primary-foreground: #ffffff;
  --primary-soft: oklch(0.95 0.03 305);
  --accent: var(--aqua-500);
  --accent-strong: var(--aqua-600);
  --ring: var(--brand-400);
  --inverse-surface: oklch(0.21 0.04 300);
  --inverse-foreground: oklch(0.97 0.01 300);
  --nav-glass: oklch(0.985 0.004 300 / 0.72);
  --nav-border: oklch(0.5 0.03 300 / 0.12);
  --elev-diffuse: 0 1px 2px oklch(0.3 0.05 300 / 0.05), 0 8px 24px -8px oklch(0.3 0.08 300 / 0.12);
  --elev-lift: 0 2px 4px oklch(0.3 0.05 300 / 0.06), 0 16px 40px -12px oklch(0.3 0.1 300 / 0.22);
  --elev-glow: 0 0 28px oklch(0.44 0.17 302 / 0.28);
  --hero-wash: radial-gradient(1100px 520px at 78% -10%, oklch(0.93 0.05 305 / 0.85), transparent 65%),
               radial-gradient(900px 480px at 12% 110%, oklch(0.93 0.05 215 / 0.7), transparent 60%);
}

/* ─────────────────────────────────────────────────────────────
   SEMANTIC — DARK (OLED, #0A0A0F — never pure black in markup)
   ───────────────────────────────────────────────────────────── */
[data-theme="dark"] {
  color-scheme: dark;
  --background: #0A0A0F;
  --background-subtle: oklch(0.17 0.015 300);
  --foreground: oklch(0.94 0.008 300);
  --muted-foreground: oklch(0.7 0.015 300);
  --faint-foreground: oklch(0.55 0.015 300);
  --card: oklch(0.185 0.02 300);
  --card-border: oklch(0.3 0.025 300 / 0.7);
  --card-tint: oklch(0.22 0.04 302);
  --primary: var(--brand-400);
  --primary-hover: var(--brand-300);
  --primary-foreground: oklch(0.13 0.02 300);
  --primary-soft: oklch(0.24 0.06 302);
  --accent: var(--aqua-400);
  --accent-strong: var(--aqua-300);
  --ring: var(--brand-300);
  --inverse-surface: oklch(0.94 0.008 300);
  --inverse-foreground: oklch(0.17 0.02 300);
  --nav-glass: oklch(0.12 0.015 300 / 0.66);
  --nav-border: oklch(0.9 0.02 300 / 0.1);
  --elev-diffuse: 0 1px 2px rgb(0 0 0 / 0.5), 0 8px 24px -8px rgb(0 0 0 / 0.6);
  --elev-lift: 0 2px 4px rgb(0 0 0 / 0.5), 0 16px 40px -12px rgb(0 0 0 / 0.7);
  --elev-glow: 0 0 28px oklch(0.62 0.16 303 / 0.4);
  --hero-wash: radial-gradient(1100px 520px at 78% -10%, oklch(0.3 0.08 302 / 0.55), transparent 65%),
               radial-gradient(900px 480px at 12% 110%, oklch(0.3 0.06 220 / 0.4), transparent 60%);
}

/* Default theme when next-themes hasn't resolved yet (SSR/first paint). */
:root:not([data-theme]) {
  color-scheme: light;
  --background: oklch(0.985 0.004 300);
  --foreground: oklch(0.22 0.03 300);
}

/* ─────────────────────────────────────────────────────────────
   BASE
   ───────────────────────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
  overflow-x: clip; /* Prevent horizontal scroll caused by any overflow on mobile */
}
body {
  font-family: var(--font-body);
  background: var(--background);
  color: var(--foreground);
  line-height: 1.65;
  overflow-x: clip;
  overflow-wrap: break-word;
  word-break: break-word;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

::selection { background: var(--primary); color: var(--primary-foreground); }

/* RTL: arrow-style icons flip; logical properties do the rest. */
[dir="rtl"] .rtl-flip { transform: scaleX(-1); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-thumb { background: var(--card-border); border-radius: 5px; }
::-webkit-scrollbar-track { background: transparent; }

/* ============================================================
   K-Aqua Redesign — Reveal Animations (from kaqua-tokens.css)
   ============================================================ */
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .reveal:not(.reveal-settled) {
    transition: opacity 600ms var(--ease-out), transform 600ms var(--ease-out);
    transition-delay: var(--reveal-delay, 0ms);
  }
  html.anim-ok .reveal.reveal-pre { opacity: 0; transform: translateY(22px); }
}

/* ============================================================
   K-Aqua Redesign — Components Layer (from kaqua-components.css)
   ============================================================ */

/* ---------- typography ---------- */
.k-eyebrow {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--sp-3);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}
.k-eyebrow::before {
  content: "";
  width: 24px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}
.k-h1 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(40px, 6vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
.k-h2 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(30px, 3.6vw, 46px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.k-h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 21px;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.k-lead {
  font-size: 18px;
  color: var(--muted-foreground);
  max-width: 62ch;
  margin-top: var(--sp-4);
  text-wrap: pretty;
}
.k-body { color: var(--muted-foreground); text-wrap: pretty; }
.k-section-head { max-width: 760px; margin-bottom: var(--sp-12); }

.k-grad-text {
  background: linear-gradient(100deg, var(--primary) 10%, var(--accent-strong) 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------- layout ---------- */
.k-container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: clamp(20px, 4vw, 48px);
}
.k-section { padding-block: clamp(64px, 9vw, 120px); }
.k-section--subtle { background: var(--background-subtle); }

.k-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--sp-4);
}
@media (max-width: 900px) {
  .k-bento { grid-template-columns: repeat(2, 1fr); }
  .k-bento > * { grid-column: span 2 !important; }
}

/* ---------- card ---------- */
.k-card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  box-shadow: var(--shadow-diffuse);
  /* transform/box-shadow only — NOT background-color/border-color: those are
     theme-token-driven (var(--card)/var(--card-border)) and, combined with a
     transition, got stuck at pre-swap values across a [data-theme] toggle. */
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.k-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lift);
}
.k-card--tint { background: var(--card-tint); }

.k-icon-chip {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary);
}

/* ---------- buttons ---------- */
.k-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  text-decoration: none;
  min-height: 48px;
  padding: 0 var(--sp-6);
  /* transform/box-shadow only — NOT background-color/color/border-color:
     variant rules below bind those directly to theme tokens, and combined
     with a transition they got stuck at pre-swap values across a
     [data-theme] toggle. */
  transition: transform var(--dur-fast) var(--ease), box-shadow var(--dur) var(--ease);
}
.k-btn:active { transform: scale(0.97); }
.k-btn:disabled, .k-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.k-btn--sm { min-height: 44px; padding: 0 var(--sp-4); font-size: 15px; }
.k-btn--lg { min-height: 56px; padding: 0 var(--sp-8); font-size: 17px; }

.k-btn--primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-diffuse);
}
.k-btn--primary:hover {
  background: var(--primary-hover);
  box-shadow: var(--shadow-lift);
  transform: translateY(-2px);
}
.k-btn--primary:hover:active { transform: scale(0.97); }

.k-btn--ghost {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--card-border);
}
.k-btn--ghost:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}

.k-btn--inverse {
  background: var(--inverse-foreground);
  color: var(--inverse-surface);
}
.k-btn--inverse:hover { transform: translateY(-2px); box-shadow: var(--shadow-lift); }

/* text link */
.k-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: gap var(--dur-fast) var(--ease);
}
.k-link:hover { gap: 10px; color: var(--primary-hover); }
.k-link:active { transform: scale(0.97); }

/* ---------- nav ---------- */
.k-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  /* no background-color/border-color transition — theme-token-driven values
     (var(--nav-glass)/var(--nav-border)) got stuck across a [data-theme]
     toggle when transitioned; see .k-card note. */
  transition: backdrop-filter var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  border-bottom: 1px solid transparent;
}
.k-nav.is-scrolled {
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  backdrop-filter: blur(16px) saturate(1.4);
  border-bottom-color: var(--nav-border);
  box-shadow: 0 4px 24px -12px rgb(0 0 0 / 0.15);
}
.k-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
  height: 72px;
}
.k-nav-links { display: flex; align-items: center; gap: var(--sp-1); }
.k-nav-link {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;
  color: var(--muted-foreground);
  background: none;
  border: none;
  border-radius: var(--radius-full);
  padding: 0 var(--sp-4);
  min-height: 44px;
  cursor: pointer;
}
.k-nav-link:hover { color: var(--foreground); background: var(--primary-soft); }
.k-nav-link:active { transform: scale(0.97); }
.k-nav-link.is-active { color: var(--primary); font-weight: 700; }

.k-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  background: none;
  border: 1px solid var(--card-border);
  color: var(--muted-foreground);
  cursor: pointer;
  /* no color/border-color/background-color transition here either — base
     state binds directly to theme tokens (var(--card-border)/var(--muted-foreground));
     see .k-card note. */
  transition: transform var(--dur-fast) var(--ease);
}
.k-icon-btn:hover { color: var(--primary); border-color: var(--primary); background: var(--primary-soft); }
.k-icon-btn:active { transform: scale(0.97); }

@media (max-width: 980px) {
  .k-nav-links { display: none; }
}
.k-mobile-menu {
  position: fixed;
  inset: 72px 0 auto 0;
  z-index: 49;
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--nav-border);
  display: flex;
  flex-direction: column;
  padding: var(--sp-4) clamp(20px, 4vw, 48px) var(--sp-6);
  gap: var(--sp-1);
}
.k-mobile-menu .k-nav-link { text-align: left; min-height: 48px; border-radius: var(--radius); }

/* ---------- chips / badges ---------- */
.k-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 13.5px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid var(--nav-border);
  color: var(--muted-foreground);
}
.k-chip strong { color: var(--primary); font-weight: 700; }

/* ---------- stat ---------- */
.k-stat-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(34px, 4vw, 52px);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--primary);
}
.k-stat-label { font-size: 14.5px; color: var(--muted-foreground); margin-top: var(--sp-2); }

/* ---------- light tinted CTA band (complying with never dark mandate) ---------- */
.k-cta-band {
  background: var(--primary-soft);
  color: var(--foreground);
  border-radius: var(--radius-lg);
  padding: clamp(40px, 6vw, 80px);
  position: relative;
  overflow: hidden;
}
.k-cta-band::after {
  content: "";
  position: absolute;
  width: 640px; height: 640px;
  right: -200px; top: -320px;
  background: radial-gradient(circle, oklch(0.6 0.16 302 / 0.15), transparent 65%);
  pointer-events: none;
}

/* ---------- tables ---------- */
.k-table { width: 100%; border-collapse: collapse; font-size: 15px; }
.k-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  text-align: left;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 2px solid var(--primary);
  white-space: nowrap;
}
.k-table td {
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--card-border);
  color: var(--muted-foreground);
}
.k-table tr:hover td { background: var(--primary-soft); color: var(--foreground); }

/* ---------- light tinted footer (complying with never dark mandate) ---------- */
.k-footer {
  background: var(--background-subtle);
  color: var(--foreground);
  margin-top: var(--sp-24);
  position: relative;
  overflow: hidden;
}
.k-footer::before {
  content: "";
  position: absolute;
  width: 900px; height: 900px;
  left: -300px; bottom: -600px;
  background: radial-gradient(circle, oklch(0.6 0.16 302 / 0.1), transparent 65%);
  pointer-events: none;
}
.k-footer a { text-decoration: none; }
.k-footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  color: var(--muted-foreground);
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 15px;
  cursor: pointer;
}
.k-footer-link:hover { color: var(--accent-strong); }

/* page transition — gated on html.anim-ok (frozen-timeline-safe) */
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-page.k-page-anim { transition: opacity 420ms var(--ease-out), transform 420ms var(--ease-out); }
  html.anim-ok .k-page.k-page-enter { opacity: 0; transform: translateY(14px); }
}

/* hero droplet float — gated on html.anim-ok */
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-float { animation: kfloat 7s ease-in-out infinite; }
  @keyframes kfloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
  }
}


/* ============================================================
   K-Aqua Redesign — FX Layer (from kaqua-fx.css)
   ============================================================ */

/* ---------- scroll progress bar ---------- */
.k-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  z-index: 60;
  background: linear-gradient(90deg, var(--primary), var(--accent-strong));
  width: 0;
  pointer-events: none;
}

/* ---------- marquee ---------- */
.k-marquee {
  overflow: hidden;
  border-block: 1px solid var(--card-border);
  background: var(--background-subtle);
  padding-block: var(--sp-4);
  display: flex;
}
.k-marquee-track {
  display: flex;
  gap: var(--sp-12);
  flex-shrink: 0;
  align-items: center;
  padding-right: var(--sp-12);
  white-space: nowrap;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 0.02em;
  color: var(--muted-foreground);
}
.k-marquee-track .dot { color: var(--accent-strong); }
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-marquee-track { animation: kmarquee 28s linear infinite; }
  @keyframes kmarquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
}

/* ---------- mega menu overlay ---------- */
.k-mega {
  position: fixed;
  inset: 0;
  z-index: 70;
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(28px) saturate(1.5);
  backdrop-filter: blur(28px) saturate(1.5);
  overflow-y: auto;
  padding: 96px clamp(20px, 5vw, 64px) 48px;
}
.k-mega-grid {
  max-width: 1100px;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--sp-2) var(--sp-8);
}
.k-mega-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: transform var(--dur-fast) var(--ease);
}
.k-mega-item:hover { background: var(--primary-soft); transform: translateX(4px); }
.k-mega-item:active { transform: scale(0.97); }
.k-mega-item .t {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(22px, 2.6vw, 30px);
  letter-spacing: -0.02em;
  color: var(--foreground);
  line-height: 1.15;
}
.k-mega-item.is-active .t { color: var(--primary); }
.k-mega-item .s { font-size: 14px; color: var(--muted-foreground); }
.k-mega-head {
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  margin: var(--sp-6) 0 var(--sp-2);
  grid-column: 1 / -1;
}

/* ---------- segmented filter chips ---------- */
.k-chips { display: flex; flex-wrap: wrap; gap: var(--sp-2); }
.k-filter-chip {
  min-height: 44px;
  padding: 0 var(--sp-4);
  border-radius: var(--radius-full);
  border: 1px solid var(--card-border);
  background: var(--card);
  color: var(--muted-foreground);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease);
}
.k-filter-chip:hover { border-color: var(--primary); color: var(--primary); }
.k-filter-chip:active { transform: scale(0.97); }
.k-filter-chip.is-on {
  background: var(--primary);
  border-color: var(--primary);
  color: var(--primary-foreground);
}

/* ---------- range slider ---------- */
.k-range { width: 100%; accent-color: var(--primary); min-height: 44px; cursor: pointer; }

/* ---------- big result number ---------- */
.k-result-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(44px, 5vw, 68px);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--primary);
  font-variant-numeric: tabular-nums;
}

/* ---------- bar chart ---------- */
.k-bar-row { display: grid; grid-template-columns: 120px 1fr 90px; gap: var(--sp-3); align-items: center; }
.k-bar-track { height: 22px; border-radius: 11px; background: var(--background-subtle); overflow: hidden; }
.k-bar-fill { height: 100%; border-radius: 11px; }

/* ---------- quiz ---------- */
.k-quiz-opt {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  width: 100%;
  min-height: 56px;
  padding: var(--sp-3) var(--sp-4);
  border-radius: var(--radius);
  border: 1.5px solid var(--card-border);
  background: var(--card);
  color: var(--foreground);
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease);
}
.k-quiz-opt:hover { border-color: var(--primary); background: var(--primary-soft); }
.k-quiz-opt:active { transform: scale(0.97); }
.k-quiz-opt.is-correct { border-color: var(--success); background: oklch(0.92 0.06 160 / 0.4); }
.k-quiz-opt.is-wrong { border-color: var(--error); background: oklch(0.93 0.05 25 / 0.4); }
.k-quiz-opt:disabled { cursor: default; }


/* ---------- glove / Baustellen mode ---------- */
html[data-glove="on"] body { font-size: 19px; }
html[data-glove="on"] .k-btn { min-height: 64px; font-size: 19px; padding: 0 var(--sp-8); }
html[data-glove="on"] .k-btn--sm { min-height: 64px; }
html[data-glove="on"] .k-nav-link { min-height: 56px; font-size: 17px; }
html[data-glove="on"] .k-icon-btn { width: 56px; height: 56px; }
html[data-glove="on"] .k-filter-chip { min-height: 64px; font-size: 17px; }
html[data-glove="on"] .k-quiz-opt { min-height: 72px; font-size: 19px; }
html[data-glove="on"] .k-body { font-size: 19px; }
html[data-glove="on"] [data-theme="light"] {
  --foreground: oklch(0.15 0.02 300);
  --muted-foreground: oklch(0.26 0.03 300);
  --card-border: oklch(0.62 0.02 300);
}

/* ---------- comparison table (Digital vs PDF-Wüste) ---------- */
.k-vs-col {
  border-radius: var(--radius-lg);
  padding: var(--sp-6);
  display: flex;
  flex-direction: column;
  gap: var(--sp-3);
}
.k-vs-col.bad { background: var(--background-subtle); border: 1px dashed var(--card-border); color: var(--muted-foreground); }
.k-vs-col.good { background: var(--primary-soft); color: var(--foreground); box-shadow: var(--shadow-lift); }
.k-vs-row { display: flex; gap: var(--sp-3); align-items: flex-start; font-size: 15.5px; }

/* ---------- onion model (KESSEL) ---------- */
.k-onion { position: relative; aspect-ratio: 1; max-width: 420px; margin-inline: auto; }
.k-onion-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px solid var(--card-border);
  display: grid;
  place-items: start center;
  cursor: pointer;
  background: var(--card);
}
.k-onion-ring:hover, .k-onion-ring.is-on { border-color: var(--primary); }
.k-onion-ring.is-on { background: var(--primary-soft); }
.k-onion-label {
  margin-top: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 13px;
  color: var(--muted-foreground);
  background: var(--card);
  padding: 2px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--card-border);
}
.k-onion-ring.is-on .k-onion-label { color: var(--primary); border-color: var(--primary); }

/* ---------- sticky tool result ---------- */
.k-sticky-result { position: sticky; top: 92px; }

/* ---------- geo: tooltip + market list ---------- */
.k-geo-tooltip {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lift);
  padding: 10px 18px;
  display: flex;
  flex-direction: column;
  gap: 1px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 2;
}
.k-geo-tooltip strong { font-family: var(--font-heading); font-size: 16px; }
.k-geo-tooltip span { font-size: 13px; color: var(--muted-foreground); }

.k-geo-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  width: 100%;
  min-height: 56px;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius);
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: transform var(--dur-fast) var(--ease);
}
.k-geo-item .city { font-family: var(--font-heading); font-weight: 700; font-size: 17px; color: var(--foreground); }
.k-geo-item .meta { font-size: 13px; color: var(--muted-foreground); }
.k-geo-item svg { position: absolute; right: var(--sp-4); top: 50%; translate: 0 -50%; color: var(--primary); opacity: 0; transition: opacity var(--dur-fast) var(--ease); }
.k-geo-item:hover, .k-geo-item.is-hot {
  background: var(--primary-soft);
  border-color: var(--card-border);
  transform: translateX(4px);
}
.k-geo-item:hover svg, .k-geo-item.is-hot svg { opacity: 1; }
.k-geo-item:active { transform: scale(0.97); }

/* ---------- page wipe transition (light tinted) ---------- */
.k-wipe {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: var(--primary-soft);
  display: grid;
  place-items: center;
  pointer-events: none;
  transform: translateY(100%);
}
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-wipe {
    animation: kwipe 820ms cubic-bezier(0.76, 0, 0.24, 1) forwards;
  }
  html.anim-ok .k-wipe .drop {
    animation: kwipedrop 820ms cubic-bezier(0.76, 0, 0.24, 1) forwards;
    opacity: 0;
  }
}
@keyframes kwipe {
  0% { transform: translateY(100%); border-radius: 40% 40% 0 0 / 8% 8% 0 0; }
  38% { transform: translateY(0); border-radius: 0; }
  62% { transform: translateY(0); border-radius: 0; }
  100% { transform: translateY(-100%); border-radius: 0 0 40% 40% / 0 0 8% 8%; }
}
@keyframes kwipedrop {
  0%, 25% { opacity: 0; transform: scale(0.6); }
  42%, 58% { opacity: 1; transform: scale(1); }
  75%, 100% { opacity: 0; transform: scale(1.25); }
}

/* ---------- hero scrollytelling globe ---------- */
.k-scrolly { position: relative; height: 380vh; }
.k-scrolly-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.k-scrolly-globe {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;
  z-index: 1;
}
.k-scrolly-globe canvas { display: block; cursor: grab; }
.k-scrolly-globe canvas:active { cursor: grabbing; }
.k-scrolly-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72vmin;
  height: 72vmin;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, var(--primary-soft) 0%, transparent 65%);
  opacity: 0.25;
  pointer-events: none;
}
.k-orbit-card {
  position: absolute;
  z-index: 2;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  backdrop-filter: blur(14px) saturate(1.3);
  border: 1px solid var(--nav-border);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
  box-shadow: var(--shadow-lift);
  opacity: 0;
  transform: translateY(28px) scale(0.92);
  transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
  pointer-events: none;
}
.k-orbit-card.is-in { opacity: 1; transform: none; pointer-events: auto; }
.k-orbit-card strong { font-family: var(--font-heading); font-size: 18px; letter-spacing: -0.01em; }
.k-orbit-card span { font-size: 14px; color: var(--muted-foreground); line-height: 1.55; }
.k-orbit-static {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--sp-4);
}
.k-orbit-static .k-orbit-card { position: static; max-width: none; }
.k-scrolly-hint {
  position: absolute;
  bottom: 22px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid var(--card-border);
  color: var(--muted-foreground);
  background: var(--card);
  opacity: 0;
  transition: opacity 400ms var(--ease);
  pointer-events: none;
}
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-scrolly-hint svg { animation: kshint 1.6s ease-in-out infinite; }
  @keyframes kshint { 0%,100% { transform: rotate(90deg) translateX(0); } 50% { transform: rotate(90deg) translateX(4px); } }
}

/* ---------- rfq: steps, type cards, inputs ---------- */
.k-steps { display: flex; gap: var(--sp-2); flex-wrap: wrap; margin-bottom: var(--sp-6); }
.k-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--card-border);
  font-size: 14px;
  font-weight: 600;
  color: var(--muted-foreground);
  background: var(--card);
}
.k-step i {
  font-style: normal;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  background: var(--background-subtle);
}
.k-step.is-now { border-color: var(--primary); color: var(--primary); }
.k-step.is-now i { background: var(--primary); color: var(--primary-foreground); }
.k-step.is-done { color: var(--foreground); }
.k-step.is-done i { background: var(--primary-soft); color: var(--primary); }

.k-type-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: var(--sp-4);
  min-height: 120px;
  border-radius: var(--radius);
  border: 1.5px solid var(--card-border);
  background: var(--card);
  cursor: pointer;
  text-align: start;
  font: inherit;
  color: var(--foreground);
  transition: transform var(--dur-fast) var(--ease);
}
.k-type-card strong { font-family: var(--font-heading); font-size: 16.5px; }
.k-type-card span:last-child { font-size: 13.5px; color: var(--muted-foreground); }
.k-type-card:hover { border-color: var(--primary); }
.k-type-card:active { transform: scale(0.97); }
.k-type-card.is-on { border-color: var(--primary); background: var(--primary-soft); }

.k-field { display: flex; flex-direction: column; gap: 6px; }
.k-field > span { font-size: 13.5px; font-weight: 600; color: var(--muted-foreground); }
.k-input {
  font: inherit;
  color: var(--foreground);
  background: var(--background);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  min-height: 48px;
  padding: 10px 14px;
}
textarea.k-input { resize: vertical; }
.k-input:hover { border-color: var(--primary); }
.k-input:focus { outline: 2px solid var(--ring); outline-offset: 1px; border-color: var(--primary); }

/* ---------- language picker ---------- */
.k-lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  inset-inline-end: 0;
  z-index: 75;
  min-width: 200px;
  max-height: 380px;
  overflow-y: auto;
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-lift);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.k-lang-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: none;
  color: var(--foreground);
  font: inherit;
  font-size: 14.5px;
  cursor: pointer;
  text-align: start;
}
.k-lang-item:hover { background: var(--primary-soft); }
.k-lang-item:active { transform: scale(0.97); }
.k-lang-item.is-on { color: var(--primary); font-weight: 600; }

/* ---------- RTL adjustments ---------- */
[dir="rtl"] .k-mega-item:hover { transform: translateX(-4px); }
[dir="rtl"] .k-geo-item:hover, [dir="rtl"] .k-geo-item.is-hot { transform: translateX(-4px); }
[dir="rtl"] .k-geo-item svg { right: auto; left: var(--sp-4); transform: translateY(-50%) scaleX(-1); }
[dir="rtl"] .k-link svg, [dir="rtl"] .k-btn svg, [dir="rtl"] .k-mega-item svg { transform: scaleX(-1); }
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4, [dir="rtl"] h5, [dir="rtl"] h6,
[dir="rtl"] .k-h1, [dir="rtl"] .k-h2, [dir="rtl"] .k-h3, [dir="rtl"] .font-heading,
[dir="rtl"] [class*="tracking-"] {
  letter-spacing: 0 !important;
}

.k-doc-check {
  display: flex;
  align-items: center;
  gap: var(--sp-3);
  min-height: 52px;
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius);
  border: 1px solid var(--card-border);
  background: var(--card);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease);
  font-size: 15.5px;
}
.k-doc-check:hover { border-color: var(--primary); }
.k-doc-check input { width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer; }
.k-doc-check.is-on { border-color: var(--primary); background: var(--primary-soft); }


/* ============================================================
   K-Aqua — CV / Application Generator Layer (from kaqua-cvgen.css)
   ============================================================ */
.k-cv-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr); gap: var(--sp-6); align-items: start; }
@media (max-width: 900px) { .k-cv-grid { grid-template-columns: 1fr; } }

.k-cv-block { display: flex; flex-direction: column; gap: var(--sp-3); }
.k-cv-block-head { display: flex; align-items: center; justify-content: space-between; }
.k-cv-row { display: grid; grid-template-columns: 1fr 1fr 0.7fr auto; gap: var(--sp-2); align-items: end; }
@media (max-width: 640px) { .k-cv-row { grid-template-columns: 1fr 1fr; } }
.k-cv-row-remove {
  min-height: 44px; min-width: 44px; border-radius: var(--radius);
  border: 1px solid var(--card-border); background: none; color: var(--muted-foreground);
  cursor: pointer; display: grid; place-items: center;
}
.k-cv-row-remove:hover { border-color: var(--error); color: var(--error); }

.k-cv-upload-list { display: flex; flex-direction: column; gap: 8px; }
.k-cv-upload-item {
  display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3);
  padding: 10px 14px; border: 1px solid var(--card-border); border-radius: var(--radius);
  background: var(--background-subtle); font-size: 14px;
}
.k-cv-upload-item button { min-height: 44px; min-width: 44px; border-radius: 8px; border: none; background: none; color: var(--muted-foreground); cursor: pointer; }
.k-cv-upload-item button:hover { color: var(--error); }

/* ---------- live preview (screen) ---------- */
.k-cv-preview {
  background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-lift);
  padding: var(--sp-8); display: flex; flex-direction: column; gap: var(--sp-4);
  position: sticky; top: 90px;
}
.k-cv-preview .name { font-family: var(--font-heading); font-weight: 800; font-size: 28px; letter-spacing: -0.01em; color: var(--foreground); }
.k-cv-preview .meta { font-size: 13.5px; color: var(--muted-foreground); }
.k-cv-preview .about { font-size: 14.5px; color: var(--foreground); border-top: 1px solid var(--card-border); padding-top: var(--sp-3); }
.k-cv-preview h4 {
  font-family: var(--font-heading); font-weight: 700; font-size: 12px; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--primary); margin: 0; border-top: 1px solid var(--card-border); padding-top: var(--sp-3);
}
.k-cv-entry { display: flex; flex-direction: column; gap: 1px; }
.k-cv-entry .t { font-weight: 700; font-size: 14.5px; color: var(--foreground); }
.k-cv-entry .s { font-size: 13px; color: var(--muted-foreground); }
.k-cv-preview .k-cv-skills { display: flex; flex-wrap: wrap; gap: 6px; }
.k-cv-preview .k-cv-skill { font-size: 12.5px; padding: 5px 10px; border-radius: var(--radius-full); background: var(--primary-soft); color: var(--primary-hover); }
.k-cv-preview .empty-hint { font-size: 13px; color: var(--faint-foreground, var(--muted-foreground)); font-style: italic; }

/* ---------- print: only the preview, on its own page ---------- */
@media print {
  body * { visibility: hidden; }
  #k-cv-print, #k-cv-print * { visibility: visible; }
  #k-cv-print {
    position: absolute; inset: 0; box-shadow: none; border: none; border-radius: 0;
    padding: 32px; width: auto; top: 0 !important;
  }
}


/* ============================================================
   K-Aqua — Decorative Globe Dividers (from kaqua-globe-variants.css)
   ============================================================ */
.k-globe-divider {
  position: relative;
  display: flex; align-items: center; justify-content: center;
  padding: clamp(28px, 5vw, 56px) 0;
  overflow: hidden;
}
.k-globe-divider canvas {
  opacity: 0;
  transform: scale(0.82);
  transition: opacity 900ms var(--ease-out), transform 900ms var(--ease-out);
}
.k-globe-divider.is-in canvas { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) {
  .k-globe-divider canvas { transition: none; opacity: 1; transform: scale(1); }
}

/* scroll-FX wrapper */
.k-globe-fx { padding: clamp(40px, 6vw, 72px) 0; }
.k-globe-fx canvas { opacity: 1; transform: none; transition: none; }
.k-globe-fx-inner { will-change: transform, opacity, filter; display: grid; place-items: center; }
.k-globe-divider--fade::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(60% 70% at 50% 50%, var(--background-subtle), transparent 75%);
  pointer-events: none; z-index: -1;
}


/* ============================================================
   K-Aqua — Globus Hub Overlay (from kaqua-globe-hub.css)
   ============================================================ */
.k-hub {
  position: fixed; inset: 0; z-index: 90;
  background: var(--background);
  display: grid; grid-template-columns: minmax(300px, 430px) 1fr;
  overflow: hidden;
}

.k-hub::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(55% 65% at 72% 50%, var(--primary-soft), transparent 70%);
  opacity: 0.55;
}

.k-hub-list {
  position: relative; overflow-y: auto;
  padding: 88px clamp(20px, 3vw, 40px) 48px;
  display: flex; flex-direction: column; gap: 6px;
  border-inline-end: 1px solid var(--card-border);
  background: var(--background-subtle);
}
.k-hub-list .k-mega-head { margin-top: 18px; }
.k-hub-list .k-mega-head:first-child { margin-top: 0; }

.k-hub-stage { position: relative; display: grid; place-items: center; }
.k-hub-stage canvas { cursor: grab; touch-action: none; }
.k-hub-stage canvas:active { cursor: grabbing; }

.k-hub-active {
  position: absolute; bottom: clamp(20px, 4vh, 44px); left: 50%; transform: translateX(-50%);
  font-family: var(--font-heading); font-weight: 700; font-size: 15px;
  color: var(--foreground);
  background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius-full); padding: 10px 22px;
  box-shadow: var(--shadow-diffuse);
  display: inline-flex; align-items: center; gap: 8px; white-space: nowrap;
}
.k-hub-active i { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); }

.k-hub-close { position: absolute; top: 18px; inset-inline-end: 22px; z-index: 2; background: var(--card); }
.k-hub-brand { position: absolute; top: 22px; inset-inline-start: clamp(20px, 3vw, 40px); z-index: 2; display: inline-flex; }

@media (max-width: 860px) {
  .k-hub { grid-template-columns: 1fr; grid-template-rows: minmax(300px, 44vh) 1fr; }
  .k-hub-stage { order: 0; }
  .k-hub-list { order: 1; border-inline-end: none; border-top: 1px solid var(--card-border); padding-top: 20px; }
  .k-hub-active { bottom: 12px; }
}

/* ============================================================
   K-Aqua — CV Generator Styles (from kaqua-cvgen.css)
   ============================================================ */

.k-cv-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr); gap: var(--sp-6); align-items: start; }
@media (max-width: 900px) { .k-cv-grid { grid-template-columns: 1fr; } }

.k-cv-block { display: flex; flex-direction: column; gap: var(--sp-3); }
.k-cv-block-head { display: flex; align-items: center; justify-content: space-between; }
.k-cv-row { display: grid; grid-template-columns: 1fr 1fr 0.7fr auto; gap: var(--sp-2); align-items: end; }
@media (max-width: 640px) { .k-cv-row { grid-template-columns: 1fr 1fr; } }
.k-cv-row-remove {
  min-height: 44px; min-width: 44px; border-radius: var(--radius);
  border: 1px solid var(--card-border); background: none; color: var(--muted-foreground);
  cursor: pointer; display: grid; place-items: center;
}
.k-cv-row-remove:hover { border-color: var(--error); color: var(--error); }

.k-cv-upload-list { display: flex; flex-direction: column; gap: 8px; }
.k-cv-upload-item {
  display: flex; align-items: center; justify-content: space-between; gap: var(--sp-3);
  padding: 10px 14px; border: 1px solid var(--card-border); border-radius: var(--radius);
  background: var(--background-subtle); font-size: 14px;
}
.k-cv-upload-item button { min-height: 44px; min-width: 44px; border-radius: 8px; border: none; background: none; color: var(--muted-foreground); cursor: pointer; }
.k-cv-upload-item button:hover { color: var(--error); }

/* ---------- live preview (screen) ---------- */
.k-cv-preview {
  background: var(--card); border: 1px solid var(--card-border);
  border-radius: var(--radius-lg); box-shadow: var(--shadow-lift);
  padding: var(--sp-8); display: flex; flex-direction: column; gap: var(--sp-4);
  position: sticky; top: 90px;
}
.k-cv-preview .name { font-family: var(--font-heading); font-weight: 800; font-size: 28px; letter-spacing: -0.01em; color: var(--foreground); }
.k-cv-preview .meta { font-size: 13.5px; color: var(--muted-foreground); }
.k-cv-preview .about { font-size: 14.5px; color: var(--foreground); border-top: 1px solid var(--card-border); padding-top: var(--sp-3); }
.k-cv-preview h4 {
  font-family: var(--font-heading); font-weight: 700; font-size: 12px; text-transform: uppercase;
  letter-spacing: 0.08em; color: var(--primary); margin: 0; border-top: 1px solid var(--card-border); padding-top: var(--sp-3);
}
.k-cv-entry { display: flex; flex-direction: column; gap: 1px; }
.k-cv-entry .t { font-weight: 700; font-size: 14.5px; color: var(--foreground); }
.k-cv-entry .s { font-size: 13px; color: var(--muted-foreground); }
.k-cv-preview .k-cv-skills { display: flex; flex-wrap: wrap; gap: 6px; }
.k-cv-preview .k-cv-skill { font-size: 12.5px; padding: 5px 10px; border-radius: var(--radius-full); background: var(--primary-soft); color: var(--primary-hover); }
.k-cv-preview .empty-hint { font-size: 13px; color: var(--faint-foreground, var(--muted-foreground)); font-style: italic; }

/* ---------- print: only the preview, on its own page ---------- */
@media print {
  body * { visibility: hidden; }
  #k-cv-print, #k-cv-print * { visibility: visible; }
  #k-cv-print {
    position: absolute; inset: 0; box-shadow: none; border: none; border-radius: 0;
    padding: 32px; width: auto; top: 0 !important;
  }
}







```

## Tailwind Config (tailwind.config.ts)
```typescript
// Tailwind CSS 4 — tokens live in app/globals.css (@theme inline).
// This file only declares content globs + the dark-mode strategy.
// (Tailwind 4 reads most config from CSS; keep JS surface minimal.)
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
} satisfies Config;

```

## Prototype Components CSS (prototype/kaqua-components.css)
```css
/* K-Aqua Redesign — component styles */

/* ---------- typography ---------- */
.k-eyebrow {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  margin-bottom: var(--sp-3);
  display: flex;
  align-items: center;
  gap: var(--sp-2);
}
.k-eyebrow::before {
  content: "";
  width: 24px;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}
.k-h1 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(40px, 6vw, 76px);
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-wrap: balance;
}
.k-h2 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(30px, 3.6vw, 46px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  text-wrap: balance;
}
.k-h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 21px;
  letter-spacing: -0.01em;
  line-height: 1.25;
}
.k-lead {
  font-size: 18px;
  color: var(--muted-foreground);
  max-width: 62ch;
  margin-top: var(--sp-4);
  text-wrap: pretty;
}
.k-body { color: var(--muted-foreground); text-wrap: pretty; }
.k-section-head { max-width: 760px; margin-bottom: var(--sp-12); }

.k-grad-text {
  background: linear-gradient(100deg, var(--primary) 10%, var(--accent-strong) 90%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---------- layout ---------- */
.k-container {
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: clamp(20px, 4vw, 48px);
}
.k-section { padding-block: clamp(64px, 9vw, 120px); }
.k-section--subtle { background: var(--background-subtle); }

.k-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--sp-4);
}
@media (max-width: 900px) {
  .k-bento { grid-template-columns: repeat(2, 1fr); }
  .k-bento > * { grid-column: span 2 !important; }
}

/* ---------- card ---------- */
.k-card {
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  box-shadow: var(--shadow-diffuse);
  /* transform/box-shadow only — NOT background-color/border-color: those are
     theme-token-driven (var(--card)/var(--card-border)) and, combined with a
     transition, got stuck at pre-swap values across a [data-theme] toggle
     (same root cause as the body rule above). Theme swap snaps instantly. */
  transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sp-4);
}
.k-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lift);
}
.k-card--tint { background: var(--card-tint); }

.k-icon-chip {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary);
}

/* ---------- buttons ---------- */
.k-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sp-2);
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.01em;
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  text-decoration: none;
  min-height: 48px;
  padding: 0 var(--sp-6);
  /* transform/box-shadow only \u2014 NOT background-color/color/border-color:
     variant rules below bind those directly to theme tokens, and combined
     with a transition they got stuck at pre-swap values across a
     [data-theme] toggle (same root cause as the body/.k-card fix). */
  transition: transform var(--dur-fast) var(--ease), box-shadow var(--dur) var(--ease);
}
.k-btn:active { transform: scale(0.97); }
.k-btn:disabled, .k-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
.k-btn--sm { min-height: 44px; padding: 0 var(--sp-4); font-size: 15px; }
.k-btn--lg { min-height: 56px; padding: 0 var(--sp-8); font-size: 17px; }

.k-btn--primary {
  background: var(--primary);
  color: var(--primary-foreground);
  box-shadow: var(--shadow-diffuse);
}
.k-btn--primary:hover {
  background: var(--primary-hover);
  box-shadow: var(--shadow-lift);
  transform: translateY(-2px);
}
.k-btn--primary:hover:active { transform: scale(0.97); }

.k-btn--ghost {
  background: transparent;
  color: var(--foreground);
  border: 1px solid var(--card-border);
}
.k-btn--ghost:hover {
  border-color: var(--primary);
  color: var(--primary);
  background: var(--primary-soft);
}

.k-btn--inverse {
  background: var(--inverse-foreground);
  color: var(--inverse-surface);
}
.k-btn--inverse:hover { transform: translateY(-2px); box-shadow: var(--shadow-lift); }

/* text link */
.k-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: gap var(--dur-fast) var(--ease);
}
.k-link:hover { gap: 10px; color: var(--primary-hover); }
.k-link:active { transform: scale(0.97); }

/* ---------- nav ---------- */
.k-nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 50;
  /* no background-color/border-color transition — theme-token-driven values
     (var(--nav-glass)/var(--nav-border)) got stuck across a [data-theme]
     toggle when transitioned; see .k-card note. */
  transition: backdrop-filter var(--dur) var(--ease), box-shadow var(--dur) var(--ease);
  border-bottom: 1px solid transparent;
}
.k-nav.is-scrolled {
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  backdrop-filter: blur(16px) saturate(1.4);
  border-bottom-color: var(--nav-border);
  box-shadow: 0 4px 24px -12px rgb(0 0 0 / 0.15);
}
.k-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
  height: 72px;
}
.k-nav-links { display: flex; align-items: center; gap: var(--sp-1); }
.k-nav-link {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 500;
  color: var(--muted-foreground);
  background: none;
  border: none;
  border-radius: var(--radius-full);
  padding: 0 var(--sp-4);
  min-height: 44px;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease), background-color var(--dur-fast) var(--ease);
}
.k-nav-link:hover { color: var(--foreground); background: var(--primary-soft); }
.k-nav-link:active { transform: scale(0.97); }
.k-nav-link.is-active { color: var(--primary); font-weight: 700; }

/* ---------- comprehensive header dropdowns ---------- */
.k-nav-item { position: relative; }
.k-nav-dd-trigger { display: inline-flex; align-items: center; gap: 5px; }
.k-dd-caret { display: inline-flex; transition: transform var(--dur-fast) var(--ease); }
.k-nav-dd-trigger.is-open { color: var(--foreground); background: var(--primary-soft); }
.k-nav-dd-trigger.is-open .k-dd-caret { transform: rotate(180deg); }
.k-nav-dd-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  min-width: 460px;
  max-width: min(94vw, 640px);
  background: var(--card);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lift);
  padding: var(--sp-2);
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 2px;
  z-index: 60;
  /* Kein Entrance-Keyframe/Transition: Overlays mit opacity-0-Start blieben in
     dieser Umgebung unsichtbar hängen (siehe kaqua-globe-hub.css) — Panel
     erscheint sofort sichtbar. */
}
/* unsichtbare Hover-Brücke, damit die Maus die Lücke Trigger→Panel überqueren kann */
.k-nav-dd-panel::before { content: ""; position: absolute; top: -12px; left: 0; right: 0; height: 12px; }
.k-nav-dd-panel .k-mega-item { min-height: 56px; }

/* Gerätestufen: großzügig ≥1281, kompakt bis 981, darunter Menü-Button (Hub) */
@media (max-width: 1280px) {
  .k-nav-dd-panel { grid-template-columns: 1fr; min-width: 300px; }
  .k-nav-link { font-size: 14px; }
  .k-nav-links { gap: 0; }
}

.k-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  display: grid;
  place-items: center;
  background: none;
  border: 1px solid var(--card-border);
  color: var(--muted-foreground);
  cursor: pointer;
  /* no color/border-color/background-color transition here either — base
     state binds directly to theme tokens (var(--card-border)/var(--muted-foreground));
     see .k-card note. */
  transition: transform var(--dur-fast) var(--ease);
}
.k-icon-btn:hover { color: var(--primary); border-color: var(--primary); background: var(--primary-soft); }
.k-icon-btn:active { transform: scale(0.97); }

@media (max-width: 980px) {
  .k-nav-links { display: none; }
}
.k-mobile-menu {
  position: fixed;
  inset: 72px 0 auto 0;
  z-index: 49;
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--nav-border);
  display: flex;
  flex-direction: column;
  padding: var(--sp-4) clamp(20px, 4vw, 48px) var(--sp-6);
  gap: var(--sp-1);
}
.k-mobile-menu .k-nav-link { text-align: left; min-height: 48px; border-radius: var(--radius); }

/* ---------- chips / badges ---------- */
.k-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--sp-2);
  font-size: 13.5px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: var(--radius-full);
  background: var(--nav-glass);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  border: 1px solid var(--nav-border);
  color: var(--muted-foreground);
}
.k-chip strong { color: var(--primary); font-weight: 700; }

/* ---------- stat ---------- */
.k-stat-num {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(34px, 4vw, 52px);
  letter-spacing: -0.03em;
  line-height: 1;
  color: var(--primary);
}
.k-stat-label { font-size: 14.5px; color: var(--muted-foreground); margin-top: var(--sp-2); }

/* ---------- dark CTA band ---------- */
.k-cta-band {
  background: var(--inverse-surface);
  color: var(--inverse-foreground);
  border-radius: var(--radius-lg);
  padding: clamp(40px, 6vw, 80px);
  position: relative;
  overflow: hidden;
}
.k-cta-band::after {
  content: "";
  position: absolute;
  width: 640px; height: 640px;
  right: -200px; top: -320px;
  background: radial-gradient(circle, oklch(0.6 0.16 302 / 0.35), transparent 65%);
  pointer-events: none;
}

/* ---------- tables ---------- */
.k-table { width: 100%; border-collapse: collapse; font-size: 15px; }
.k-table th {
  font-family: var(--font-heading);
  font-weight: 700;
  text-align: left;
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 2px solid var(--primary);
  white-space: nowrap;
}
.k-table td {
  padding: var(--sp-3) var(--sp-4);
  border-bottom: 1px solid var(--card-border);
  color: var(--muted-foreground);
}
.k-table tr:hover td { background: var(--primary-soft); color: var(--foreground); }

/* ---------- footer ---------- */
.k-footer {
  background: var(--inverse-surface);
  color: var(--inverse-foreground);
  margin-top: var(--sp-24);
  position: relative;
  overflow: hidden;
}
.k-footer::before {
  content: "";
  position: absolute;
  width: 900px; height: 900px;
  left: -300px; bottom: -600px;
  background: radial-gradient(circle, oklch(0.6 0.16 302 / 0.22), transparent 65%);
  pointer-events: none;
}
.k-footer a { text-decoration: none; }
.k-footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  color: oklch(from var(--inverse-foreground) l c h / 0.7);
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  font-size: 15px;
  cursor: pointer;
}
.k-footer-link:hover { color: var(--accent-strong); }

/* page transition — gated on html.anim-ok (frozen-timeline-safe) */
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-page.k-page-anim { transition: opacity 420ms var(--ease-out), transform 420ms var(--ease-out); }
  html.anim-ok .k-page.k-page-enter { opacity: 0; transform: translateY(14px); }
}

/* hero droplet float — gated on html.anim-ok */
@media (prefers-reduced-motion: no-preference) {
  html.anim-ok .k-float { animation: kfloat 7s ease-in-out infinite; }
  @keyframes kfloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-14px); }
  }
}

```

