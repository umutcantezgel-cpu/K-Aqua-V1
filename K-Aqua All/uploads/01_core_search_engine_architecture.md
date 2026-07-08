# 01 - Design Token Resolution Architecture

This document defines the universal architecture for resolving design tokens across any web application. It serves as the foundational lookup system that maps product categories, user intents, and aesthetic styles to concrete CSS variables and Tailwind configurations.

## Token Resolution Pipeline

### 1. Domain Detection
When upgrading an existing website, the first step is identifying the product domain to select the correct design tokens:
- **Color Domain**: Triggered by hex values, rgb references, semantic color tokens. Resolves to palette definitions (Doc 06).
- **Typography Domain**: Triggered by font family, serif, sans-serif, monospace keywords. Resolves to font pairings (Doc 07).
- **Style Domain**: Triggered by minimalist, glassmorphism, brutalist keywords. Resolves to aesthetic systems (Doc 08).
- **Landing Domain**: Triggered by CTA, conversion, hero, pricing keywords. Resolves to page architectures (Doc 09).
- **Product Domain**: Triggered by SaaS, ecommerce, fintech, healthcare keywords. Resolves to vertical-specific configurations (Doc 10).
- **Chart Domain**: Triggered by visualization, trend, pie, scatter. Resolves to data viz constraints (Doc 11).

### 2. Multi-Domain Semantic Search
When generating a design system for a website upgrade, the resolver queries multiple domains simultaneously:
- `product` (max 1 result) — Determines the vertical-specific aesthetic
- `style` (max 3 results) — Returns CSS variable definitions and effect parameters
- `color` (max 2 results) — Returns the full semantic palette (Primary, Secondary, Accent, Background, Card, Destructive, Ring)
- `landing` (max 2 results) — Returns section ordering and CTA placement strategy
- `typography` (max 2 results) — Returns font pairings with Google Fonts URLs and Tailwind config

### 3. Style Priority Boosting
The resolver appends up to two "style priority" keywords to the search query based on the product domain's reasoning rules, steering the selection toward contextually appropriate aesthetics. For example:
- A `SaaS` query auto-boosts `Glassmorphism` and `Flat Design`
- A `Healthcare` query auto-boosts `Neumorphism` and `Accessible & Ethical`

### 4. Match Selection Scoring
Results are ranked via an algorithmic score:
- Exact match in Style Category name = **+10**
- Match in Keywords string = **+3**
- Match in any other field = **+1**
- Falls back to the first result if no matches surface.

## CSS Variable Output Schema
Every resolved design system emits these standard CSS custom properties for the `:root`:
```css
:root {
  --color-primary: #2563EB;
  --color-on-primary: #FFFFFF;
  --color-secondary: #64748B;
  --color-accent: #EA580C;
  --color-background: #F8FAFC;
  --color-foreground: #0F172A;
  --color-card: #FFFFFF;
  --color-card-foreground: #0F172A;
  --color-muted: #F1F5F9;
  --color-muted-foreground: #64748B;
  --color-border: #E2E8F0;
  --color-destructive: #DC2626;
  --color-ring: #2563EB;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
}
```

## Tailwind Integration
These CSS variables map directly into `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        muted: 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        border: 'var(--color-border)',
        destructive: 'var(--color-destructive)',
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    }
  }
}
```

## Application to Website Upgrades
When upgrading an existing website:
1. **Audit** the current site's product domain (SaaS, e-commerce, portfolio, etc.)
2. **Resolve** the optimal design tokens via the domain detection pipeline
3. **Replace** the existing ad-hoc color/spacing values with the resolved CSS variables
4. **Map** to Tailwind utility classes or vanilla CSS as per the target tech stack
5. **Validate** contrast ratios (min 4.5:1 for text) and consistency across all pages
