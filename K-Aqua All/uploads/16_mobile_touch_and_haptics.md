# 16 - Responsive Interaction Design & Accessibility

This document defines the interaction model for web applications across all device types (desktop, tablet, mobile). It replaces all mobile-only references (React Native touch, expo-haptics) with platform-agnostic web interaction patterns.

## 1. The Responsive Interaction Paradigm
Web applications must handle three simultaneous input modalities:
- **Mouse** (desktop): Hover, click, right-click, drag
- **Touch** (mobile/tablet): Tap, swipe, pinch, long-press
- **Keyboard** (power users, accessibility): Tab, Enter, Space, Escape, Arrow keys

## 2. Touch Targets (Universal)
**Strict Rule:** No interactive element can have a clickable area smaller than **44x44px** (Apple HIG) / **48x48dp** (Material Design).
```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
/* Small icon buttons — expand hit area with padding */
.icon-btn {
  padding: 12px;   /* icon 20px + padding 12px×2 = 44px total */
}
```
- Never place small touch targets flush against each other. Minimum `8px` gap between adjacent targets.
- Use `touch-action: manipulation` to eliminate the 300ms tap delay on mobile browsers.

## 3. Interaction States

### Hover (Desktop Only)
```css
.interactive {
  transition: all 200ms ease-out;
}
.interactive:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```
**Rule:** Never rely solely on hover for critical information. Touch devices have no hover. Use `onClick` / visible labels as the fallback.

### Active / Press State (All Devices)
```css
.interactive:active {
  transform: scale(0.97);
  transition-duration: 100ms;
}
```

### Focus State (Keyboard Navigation)
```css
.interactive:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-radius: var(--radius);
}
/* Remove outline for mouse users, keep for keyboard */
.interactive:focus:not(:focus-visible) {
  outline: none;
}
```
**WCAG Rule:** NEVER use `outline: none` globally. Keyboard users MUST have visible focus indicators.

### Disabled State
```css
.interactive:disabled,
.interactive[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

## 4. Mobile-Specific Web Considerations
- Use `100dvh` instead of `100vh` to account for mobile browser chrome (address bar).
- Prevent accidental zooming on input focus: ensure all input text is `≥16px`.
- Use `overscroll-behavior: contain` to prevent pull-to-refresh interference.
- Implement `@media (hover: none)` to detect touch-only devices:
```css
@media (hover: none) {
  .card:hover { transform: none; } /* Disable hover effects on touch */
}
```

## 5. Responsive Breakpoint Strategy
```css
/* Tailwind default breakpoints */
sm:  640px   /* Large phones (landscape) */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

### Mobile-First Design
Always design for the smallest screen first, then add complexity:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Content Reflow Priorities
| Breakpoint | Layout | Content Strategy |
|------------|--------|------------------|
| < 640px | Single column, stacked | Full-width cards, hamburger nav |
| 640–767px | Single column, wider gutters | Slightly more horizontal space |
| 768–1023px | 2-column grid possible | Side-by-side comparisons |
| 1024–1279px | Multi-column, sidebar visible | Full navigation, expanded cards |
| ≥ 1280px | Max-width container, centered | `max-w-7xl mx-auto`, generous whitespace |

## 6. Scroll Behavior
```css
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
```
- Use `scroll-margin-top: 80px` on anchor targets to offset sticky headers.
- Implement `IntersectionObserver` for scroll-triggered effects (not scroll event listeners).

## 7. WCAG 2.1 Compliance Checklist
- [ ] All interactive elements have visible focus indicators
- [ ] Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] No information conveyed by color alone (add icons, patterns, or text)
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative)
- [ ] Headings follow logical hierarchy (h1 → h2 → h3, no skipping)
- [ ] `aria-label` on icon-only buttons
- [ ] Modal focus trap: Tab key cycles within modal, Escape closes
- [ ] Skip-to-content link for keyboard users
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages use `role="alert"` or `aria-live="polite"`
