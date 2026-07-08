# 14 - Web Animation & Motion Design

This document defines the animation architecture for web applications. All motion must enhance usability, feel intentional, and respect accessibility preferences.

## 1. Core Philosophy: Meaningful Motion
Every animation must serve a purpose:
- **Spatial Orientation**: Help users understand where they are (page transitions, tab switches)
- **Feedback**: Confirm user actions (button clicks, form submissions, toggle states)
- **Hierarchy**: Guide attention to important elements (hero entrance, CTA pulse)
- **Continuity**: Maintain context during state changes (list reordering, modal open/close)

Animations without purpose are noise. Remove them.

## 2. Primary Library: Framer Motion
The standard animation library for React/Next.js web projects is **Framer Motion** (`motion/react`).

### Basic Component Animation
```tsx
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content fades up on mount
</motion.div>
```

### Spring Physics (Preferred for Interactive Elements)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  Click Me
</motion.button>
```

### Layout Animations (Automatic Smooth Transitions)
```tsx
<motion.div layout layoutId="card-expand">
  {/* Automatically animates position/size changes */}
</motion.div>
```

### Staggered List Entrance
```tsx
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i} variants={item}>{i}</motion.li>)}
</motion.ul>
```

## 3. CSS-Only Animations (When Framer Motion is Overkill)
For simple hover/focus transitions, pure CSS is preferred for performance:
```css
.btn { transition: all 200ms ease-out; }
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: scale(0.97); }

.card { transition: box-shadow 200ms ease, transform 200ms ease; }
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
```

### Timing Guidelines
| Context | Duration | Easing |
|---------|----------|--------|
| Hover effects | 150–200ms | `ease-out` |
| Button press | 100–150ms | `ease-in` |
| Modal open | 250–350ms | `ease-out` / spring |
| Modal close | 200–250ms | `ease-in` |
| Page transition | 300–400ms | `ease-in-out` / spring |
| Tooltip show | 150ms | `ease-out` |
| Loading skeleton | 1.5–2s | `ease-in-out` (loop) |

## 4. Scroll-Triggered Animations
Use Framer Motion's `whileInView` for revealing elements on scroll:
```tsx
<motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```
- Set `once: true` to prevent re-triggering on scroll back.
- Use `margin` to trigger slightly before the element enters the viewport.

## 5. Page Transitions (Next.js App Router)
Wrap page content in `AnimatePresence` for smooth route transitions:
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

## 6. Accessibility: `prefers-reduced-motion`
**MANDATORY.** All animations must respect the user's system preference:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In Framer Motion, use the `useReducedMotion()` hook to conditionally disable animations.

## 7. Performance Rules
- Only animate `transform` and `opacity` — never animate `width`, `height`, `top`, `left` (triggers reflow/repaint).
- Use `will-change: transform` sparingly on elements that will animate.
- Limit concurrent animations to 2–3 elements per viewport to maintain 60fps.
- Use CSS animations for looping effects (skeleton loading, spinner rotation).

## 8. Anti-Patterns
- ❌ Animating more than 3 elements simultaneously on page load
- ❌ Using `animation-duration > 500ms` for UI feedback
- ❌ `linear` easing for UI transitions (feels robotic)
- ❌ Animations that block user interaction (use `pointer-events: auto` during exit)
- ❌ Auto-playing heavy animations above the fold without `prefers-reduced-motion` check
