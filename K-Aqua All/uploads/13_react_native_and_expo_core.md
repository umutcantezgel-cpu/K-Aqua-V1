# 13 - React & Next.js Core Architecture

This document defines the foundational web application architecture using React and Next.js. It replaces all mobile-specific patterns with web-first implementations.

## 1. Core Principles
- **Server-First Rendering**: Leverage Next.js App Router for Server Components by default. Only add `"use client"` when interactivity is required (event handlers, hooks, browser APIs).
- **Progressive Enhancement**: The website must function with JavaScript disabled for critical content paths (SSR/SSG ensures this).
- **Performance Budget**: Target Lighthouse scores of 90+ across all categories (Performance, Accessibility, Best Practices, SEO).

## 2. Next.js App Router Architecture

### Layouts & Templates
```tsx
// app/layout.tsx — Root layout (renders once, persists across navigations)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontSerif.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### Data Fetching Patterns
- **Server Components**: Fetch data directly in the component using `async/await`. No `useEffect` needed.
- **Client Components**: Use React Query / SWR for client-side data with caching, revalidation, and optimistic updates.
- **API Routes**: Use `app/api/` route handlers for server-side logic (form submissions, external API proxies).

### Metadata & SEO
```tsx
// Per-page metadata
export const metadata: Metadata = {
  title: 'Page Title | Brand',
  description: 'Compelling meta description under 160 characters.',
  openGraph: { title: '...', description: '...', images: ['/og-image.png'] },
}
```

## 3. Component Architecture

### Server vs. Client Components
| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| Data fetching | Direct `async/await` | React Query / SWR |
| Event handlers | ❌ | ✅ `onClick`, `onChange` |
| State / Effects | ❌ | ✅ `useState`, `useEffect` |
| Browser APIs | ❌ | ✅ `window`, `localStorage` |
| Rendering | Server (HTML) | Client (Hydrated) |

### Component Composition Pattern
```
<ServerComponent>          ← Fetches data, renders static shell
  <ClientInteractiveChild> ← Handles hover, click, animations
  </ClientInteractiveChild>
</ServerComponent>
```

## 4. State Management (Web)
- **URL State**: Use `searchParams` and `useRouter` for filterable/shareable state (pagination, filters, tabs).
- **Local UI State**: `useState` / `useReducer` for component-scoped interactions.
- **Global Client State**: Zustand or Jotai for lightweight cross-component state (theme, sidebar open/close, toast notifications).
- **Server State**: React Query for async data with background refresh and stale-while-revalidate.

## 5. Image & Asset Optimization
```tsx
import Image from 'next/image'

<Image
  src="/hero.webp"
  alt="Descriptive alt text"
  width={1200}
  height={630}
  priority                    // Above-the-fold images
  className="object-cover"
/>
```
- Use `next/image` for automatic WebP conversion, responsive `srcset`, and lazy loading.
- Serve images from `/public` or external CDN with configured `remotePatterns`.
- Always specify `width` and `height` to prevent Cumulative Layout Shift (CLS).

## 6. Font Loading Strategy
```tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })
```
- Use `next/font` to self-host Google Fonts with zero layout shift.
- Map font variables to Tailwind via `tailwind.config.ts`.
- Apply `font-display: swap` inherently (handled by `next/font`).

## 7. Performance Best Practices
- **Code Splitting**: Automatic per-route. Use `dynamic()` for heavy client components.
- **Streaming SSR**: Wrap slow server components in `<Suspense>` with skeleton fallbacks.
- **Static Generation**: Use `generateStaticParams()` for known dynamic routes.
- **Bundle Analysis**: Run `ANALYZE=true next build` with `@next/bundle-analyzer`.
- **Core Web Vitals Targets**: LCP < 2.5s, FID < 100ms, CLS < 0.1.
