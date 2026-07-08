# 03 - Project Scaffolding & Build Tooling

This document defines the standard project scaffolding, build tooling, and developer experience configurations for web projects. It replaces all legacy CLI-specific references with universal web development patterns.

## Recommended Technology Stacks

### Stack 1: Next.js + Tailwind CSS (Primary)
The default stack for most web projects. Provides SSR/SSG, API routes, and optimized image handling.
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
**Key Dependencies:**
- `next` — Framework core (App Router)
- `tailwindcss` — Utility-first CSS
- `framer-motion` — Animation library
- `lucide-react` — SVG icon library
- `next-themes` — Dark mode management
- `clsx` / `tailwind-merge` — Conditional class utilities

### Stack 2: Vite + React + Tailwind
For single-page applications or non-SSR projects:
```bash
npx -y create-vite@latest ./ --template react-ts
npm install tailwindcss @tailwindcss/vite
```

### Stack 3: Astro + Tailwind
For content-heavy, static-first sites with partial hydration:
```bash
npx -y create-astro@latest ./ --template basics
npx astro add tailwind
```

## Project Structure Convention
```
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── layout.tsx        # Root layout (fonts, metadata, theme provider)
│   ├── page.tsx          # Homepage
│   ├── globals.css       # CSS variables, @tailwind directives, base styles
│   └── [feature]/
│       └── page.tsx
├── components/
│   ├── ui/               # Primitive components (Button, Input, Card, Modal)
│   ├── layout/           # Structural (Header, Footer, Sidebar, Container)
│   └── sections/         # Page sections (Hero, Features, Pricing, FAQ)
├── lib/                  # Utilities, constants, helpers
│   ├── utils.ts          # cn() helper, formatters
│   └── constants.ts      # Site metadata, navigation config
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/               # Static assets (images, fonts, favicon)
tailwind.config.ts        # Design token definitions
next.config.ts            # Next.js configuration
```

## Design Token Integration
The `globals.css` file serves as the bridge between design system tokens (Doc 01) and Tailwind:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    /* ... all tokens from Doc 01 */
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* dark mode overrides */
  }
}
```

## Build & Development Commands
```bash
# Development
npm run dev          # Start dev server with HMR

# Production
npm run build        # Create optimized production build
npm run start        # Serve production build locally

# Quality
npm run lint         # ESLint analysis
npm run type-check   # TypeScript validation (tsc --noEmit)
```

## AI Agent Integration Points
When an AI coding assistant operates on the project, it should:
1. **Read** `globals.css` to understand the active design tokens
2. **Read** `tailwind.config.ts` to understand the extended theme
3. **Read** `components/ui/` to understand the component library conventions
4. **Generate** new components using existing tokens and utility classes — never hardcode hex values or pixel values directly

## Essential Utility: `cn()` Helper
Every project must include the `cn()` function for conditional class merging:
```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
