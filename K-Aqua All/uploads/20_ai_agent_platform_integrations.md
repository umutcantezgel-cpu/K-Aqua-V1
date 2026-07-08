# 20 - AI Agent Context Injection & Platform Integration

This document defines how the 20 context documents are consumed by AI coding assistants to upgrade existing websites. It replaces all legacy CLI/Python engine references with universal context injection strategies.

## 1. Purpose of These Context Documents
These 20 documents form a **self-contained design knowledge base** that any AI coding assistant can use to:
- Upgrade an existing website's visual design and UX
- Generate new components following established design system rules
- Resolve aesthetic conflicts and maintain consistency
- Apply the correct design tokens for a given product vertical

## 2. Context Injection Strategy

### How to Feed These Documents to an AI Agent
When starting a website upgrade project, provide the AI agent with the relevant documents as context:

#### Minimal Context (Quick Component Work)
Provide 3–5 documents:
- **Doc 06** (Color Palettes) — For the correct semantic tokens
- **Doc 07** (Typography) — For the correct font pairing
- **Doc 15** (Tailwind CSS) — For the styling implementation
- **Doc 17** (Buttons/Inputs) — For interactive component patterns
- **Doc 18** (Cards/Layout) — For layout and grid structure

#### Full Context (Complete Website Upgrade)
Provide all relevant documents in this priority order:
1. **Doc 01** (Token Resolution) — Understand the design token pipeline
2. **Doc 02** (Design System Generation) — Understand how tokens are synthesized
3. **Doc 05** (UI Reasoning) — Match the product vertical to aesthetics
4. **Doc 06** (Colors) — Apply the correct palette
5. **Doc 07** (Typography) — Apply the correct fonts
6. **Doc 08** (Styles) — Apply the correct aesthetic system
7. **Doc 09** (Landing Pages) — Apply the correct page architecture
8. **Doc 13** (React/Next.js) — Framework implementation patterns
9. **Doc 14** (Animation) — Motion design with Framer Motion
10. **Doc 15** (Tailwind CSS) — Styling and effects
11. **Doc 16** (Interaction/A11y) — Responsive interaction and accessibility
12. **Doc 17–19** (Components) — Buttons, Cards, Icons, Images

### Document Cross-Reference Map
| If you need... | Read Document(s) |
|----------------|-------------------|
| Which colors to use | 06 (palettes) + 05 (reasoning by vertical) |
| Which fonts to pair | 07 (typography matrix) |
| Which aesthetic style | 08 (80 styles) + 05 (reasoning auto-selection) |
| Landing page structure | 09 (36 archetypes) + 10 (product adaptations) |
| Chart/data visualization | 11 (chart types) + 06 (color rules) |
| Icon implementation | 12 (Phosphor dictionary) + 19 (Lucide web patterns) |
| Next.js architecture | 13 (App Router) + 03 (scaffolding) |
| Animation approach | 14 (Framer Motion) + 04 (UX timing rules) |
| Tailwind config | 15 (config) + 01 (CSS variable output) |
| Accessibility requirements | 16 (WCAG checklist) + 04 (UX heuristics) |

## 3. AI Platform Integration Points

### Claude Code / Antigravity / Cursor
Place context documents in the project directory (e.g., `context_documents/` or `.agents/context/`) and reference them in the AI agent's configuration:
```
# In .cursorrules, CLAUDE.md, or agent workflow:
Reference: context_documents/06_color_theory_and_palettes.md
Reference: context_documents/07_typography_and_fonts.md
Reference: context_documents/15_styling_nativewind_and_skia.md
```

### Design System Override Pattern
When the AI agent generates CSS or components:
1. **Read** the relevant context document first
2. **Extract** the design tokens (colors, fonts, spacing, radii)
3. **Apply** tokens via CSS custom properties in `globals.css`
4. **Map** to Tailwind utilities in `tailwind.config.ts`
5. **Validate** against the Pre-Delivery Checklist (Doc 02)

## 4. Upgrade Workflow (Existing Website)

### Step 1: Analyze the Existing Site
- Identify the product vertical (SaaS, e-commerce, portfolio, etc.)
- Audit current tech stack (React, Next.js, vanilla, etc.)
- Check current color palette, typography, and spacing

### Step 2: Resolve Design Tokens
- Use Doc 05 to match product vertical → recommended style + color mood
- Use Doc 06 to get the exact hex palette for that vertical
- Use Doc 07 to select the typography pairing
- Use Doc 08 to identify the target aesthetic and its CSS rules

### Step 3: Implement Token Migration
- Create/update `globals.css` with new CSS custom properties (Doc 01 schema)
- Update `tailwind.config.ts` to reference the new tokens (Doc 15)
- Replace all hardcoded colors/spacing with semantic tokens

### Step 4: Rebuild Components
- Rebuild buttons following Doc 17 interaction state patterns
- Rebuild cards following Doc 18 grid and spacing rules
- Update icons following Doc 19 (Lucide React + `next/image`)
- Add animations following Doc 14 (Framer Motion timing table)

### Step 5: Validate
- Run WCAG accessibility audit (Doc 16 checklist)
- Check responsive behavior across all breakpoints (Doc 16 breakpoint table)
- Verify Pre-Delivery Checklist (Doc 02, Section: Pre-Delivery)
- Test dark mode contrast and token correctness (Doc 15)

## 5. Pre-Delivery Validation Checklist (Consolidated)
Before any website upgrade is considered complete:
- [ ] No emojis used as icons — SVG only (Lucide/Phosphor/Heroicons)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover states have smooth transitions (150–300ms, `ease-out`)
- [ ] Active states provide immediate visual feedback (`scale(0.97)`)
- [ ] Focus states visible for keyboard navigation (`focus-visible:ring-2`)
- [ ] Text contrast ≥ 4.5:1 (WCAG AA)
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 640px, 768px, 1024px, 1280px, 1536px
- [ ] Dark mode tokens defined and tested
- [ ] All images have `alt` text
- [ ] All form inputs have labels
- [ ] All interactive targets ≥ 44x44px
- [ ] No CLS (Cumulative Layout Shift) — all images have dimensions
