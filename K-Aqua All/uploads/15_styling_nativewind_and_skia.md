# 15 - Tailwind CSS & Advanced CSS Effects

This document defines the styling architecture for web projects using Tailwind CSS, CSS custom properties, and advanced visual effects. It replaces all mobile-specific styling references (NativeWind, Skia) with web-native approaches.

## 1. Tailwind CSS Configuration

### Base Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
    }
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}
```

### Utility Class Principles
- **Semantic tokens over raw values**: Use `bg-primary` not `bg-blue-500`. Use `text-muted-foreground` not `text-gray-500`.
- **Consistent spacing**: Use the Tailwind spacing scale (`p-4`, `gap-6`, `mt-8`). Never use arbitrary pixel values for common spacing.
- **Responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` for breakpoint-specific styles.

## 2. Glassmorphism (CSS `backdrop-filter`)
```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius);
}
```
With Tailwind:
```html
<div class="bg-white/10 backdrop-blur-xl border border-white/15 rounded-xl">
```

## 3. Advanced Gradients
### Text Gradient (Gradient Clip)
```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Mesh / Aurora Background
```css
.aurora {
  background: linear-gradient(125deg, #1a1a2e, #16213e, #0f3460, #533483);
  background-size: 400% 400%;
  animation: aurora-shift 12s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .aurora { animation: none; }
}
@keyframes aurora-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## 4. Shadow Systems

### Diffused, Tinted Shadows
Avoid generic black shadows. Use tinted, expanded shadows that match the element's context:
```css
.card-shadow { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06); }
.card-shadow-colored { box-shadow: 0 8px 30px rgba(37, 99, 235, 0.15); }
.card-shadow-dark { box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); }
```

### Elevation Hierarchy
| Level | Usage | Shadow |
|-------|-------|--------|
| 0 | Flat (inline) | `none` |
| 1 | Cards, inputs | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` |
| 2 | Dropdowns, popovers | `0 4px 6px -1px rgba(0,0,0,0.1)` |
| 3 | Modals, dialogs | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` |
| 4 | Toast, command palette | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` |

## 5. Dark Mode Architecture
Dark mode is NOT inverted colors. It uses a separate token set:
```css
:root {
  --background: 0 0% 100%;        /* White */
  --foreground: 222.2 84% 4.9%;   /* Near-black */
  --card: 0 0% 100%;
}
.dark {
  --background: 224 71% 4%;       /* Deep dark blue, NOT pure black */
  --foreground: 210 40% 98%;      /* Near-white */
  --card: 224 71% 6%;             /* Slightly lighter than bg for elevation */
}
```
**Critical Rules:**
- Never use pure `#000000` for dark mode backgrounds — causes OLED smearing and feels harsh. Use deep tinted grays (`#0A0A0F`, `#0F172A`).
- Elevate elements by lightening their background (not adding shadows, which are invisible on dark).
- Reduce high-saturation colors by 10–20% in dark mode to prevent eye strain.

## 6. CSS Performance
- Use `contain: layout style paint` on complex card grids.
- Limit `backdrop-filter` usage to above-the-fold hero/nav elements (GPU-intensive).
- Prefer `opacity` and `transform` for animated properties.
- Use `content-visibility: auto` for below-the-fold sections to reduce initial render cost.
