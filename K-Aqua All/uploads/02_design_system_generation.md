# 02 - Design System Generation Pipeline

This document defines the complete pipeline for generating and persisting design systems. It is the authoritative source of truth for how aesthetic, color, typography, and layout decisions are synthesized into actionable CSS and component configurations for any web project.

## Generation Pipeline

### 1. UX Reasoning Layer
Before any visual decisions are made, the system consults a reasoning matrix that maps 163 distinct product categories (Doc 05) to:
- `Recommended_Pattern` — The landing page archetype (e.g., Hero + Features + CTA)
- `Style_Priority` — Two priority aesthetic styles (e.g., Glassmorphism, Flat Design)
- `Color_Mood` — The emotional color direction (e.g., "Trust blue + Accent contrast")
- `Typography_Mood` — The typographic character (e.g., "Modern, clean")
- `Key_Effects` — CSS effects to implement (e.g., "subtle hover 200-250ms", "backdrop-filter blur")
- `Decision_Rules` — Conditional logic for edge cases (JSON): `if_ux_focused → prioritize-minimalism`
- `Anti_Patterns` — Hard prohibitions (e.g., "Avoid excessive animation")
- `Severity` — How strictly rules must be enforced (LOW / MEDIUM / HIGH / CRITICAL)

If no matching rule exists, the system falls back to safe defaults:
- Pattern: `Hero + Features + CTA`
- Style Priority: `Minimalism`, `Flat Design`
- Severity: `MEDIUM`

### 2. Multi-Domain Aggregation
The generator queries five domains simultaneously and merges results:
1. **Product** → Determines the vertical (SaaS, Healthcare, E-commerce...)
2. **Style** → Returns CSS variables, effects, performance ratings, and accessibility scores
3. **Color** → Returns the full 16-token semantic palette
4. **Landing** → Returns section ordering, CTA placement, conversion mechanics
5. **Typography** → Returns font pairings, Google Fonts import URLs, Tailwind config

### 3. Style Selection and Synthesis
From the aggregated results, the best-matching style is selected by recursively scoring Style Priority keywords against results (Doc 01 scoring logic), then synthesizing the combined effects from both style data and reasoning constraints.

## Output Payload Structure
The generated design system emits a structured payload containing:
```
project_name      — The website/project identifier
category          — The resolved product vertical
pattern           — { name, sections_order[], cta_placement, conversion_metrics }
style             — { name, type, effects[], best_for, performance_rating, a11y_rating }
colors            — { primary, secondary, accent, background, card, text, destructive, ring }
typography        — { heading_font, body_font, mood, google_fonts_url, css_import, tailwind_config }
anti_patterns     — Critical "Do Not Use" constraints specific to this vertical
```

## Persistence Architecture: Master + Override Pattern

### MASTER.md (Global Source of Truth)
The design system is persisted as a `MASTER.md` file containing:
- Raw CSS custom properties (`:root` variables for colors, spacing, shadows, radii)
- Component class definitions (`.btn-primary`, `.card`, `.input`, `.modal`, `.nav`)
- Typography scale definitions
- Dark mode variant overrides (`[data-theme="dark"]` or `prefers-color-scheme: dark`)

### Page-Level Overrides
Individual pages can override the Master tokens:
- Stored as `pages/[page-name].md`
- **Rule: Page overrides always take precedence over Master defaults.**
- This teaches AI agents how to resolve CSS constraint conflicts when upgrading multi-page websites.

## Pre-Delivery Checklist (Auto-Injected)
Every generated design system includes these mandatory validations:
1. ✅ No emojis as icons — use SVG icon libraries (Lucide, Heroicons, Phosphor)
2. ✅ `cursor: pointer` on all clickable elements
3. ✅ Hover states with smooth transitions (150–300ms `ease-out`)
4. ✅ Light mode text contrast minimum 4.5:1 (WCAG AA)
5. ✅ Focus states visible for keyboard navigation (`focus-visible:ring-2`)
6. ✅ `prefers-reduced-motion` respected via `@media` queries
7. ✅ Responsive breakpoints: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop)
8. ✅ Dark mode tokens defined and tested for contrast compliance
