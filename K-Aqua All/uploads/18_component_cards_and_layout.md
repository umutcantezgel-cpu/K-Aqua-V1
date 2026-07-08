# 18 - Component Library: Cards, Layout & Responsive Grids

This document defines the architecture for card components and responsive layout systems in web applications using CSS Grid, Flexbox, and Tailwind CSS.

## 1. Card Architecture

### 1.1 Base Card Component
```tsx
<div className="rounded-lg border border-border bg-card text-card-foreground 
  shadow-sm overflow-hidden transition-all duration-200">
  <div className="p-6">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground mt-1">Card description</p>
  </div>
  <div className="px-6 pb-6">
    {/* Card content */}
  </div>
</div>
```

### 1.2 Visual Boundaries by Aesthetic
| Style | Border | Shadow | Radius | Background |
|-------|--------|--------|--------|------------|
| Modern/SaaS | `border-border/50` | `shadow-md` | `rounded-xl` | `bg-card` |
| Glassmorphism | `border-white/15` | `shadow-lg` | `rounded-2xl` | `bg-white/10 backdrop-blur-xl` |
| Brutalist | `border-2 border-black` | `shadow-[4px_4px_0_#000]` | `rounded-none` | `bg-card` |
| Bauhaus | `border-4 border-foreground` | Hard offset | `rounded-none` | Block color fill |
| Terminal | `border border-green-500/50` | `shadow-[0_0_8px_rgba(0,255,0,0.1)]` | `rounded-none` | `bg-black` |
| Neumorphism | None | Double shadow (light+dark) | `rounded-2xl` | `bg-background` |
| Monochrome | `border border-foreground` | `none` | `rounded-none` | `bg-background` |

### 1.3 Interactive Cards
```tsx
<a href="/detail" className="group block rounded-xl border border-border bg-card 
  shadow-sm transition-all duration-200
  hover:shadow-lg hover:-translate-y-1 hover:border-primary/30
  focus-visible:ring-2 focus-visible:ring-ring">
  <div className="overflow-hidden rounded-t-xl">
    <Image src="..." alt="..." className="transition-transform duration-300 
      group-hover:scale-105" />
  </div>
  <div className="p-6">...</div>
</a>
```
**Rules:**
- If the entire card is clickable, wrap in `<a>` or `<Link>`, not a click handler on a `<div>`.
- Use `group-hover:` for coordinated child animations.
- Maintain `focus-visible:ring` for keyboard accessibility.

### 1.4 Internal Spacing Rhythms
- Card padding: `p-4` (compact) / `p-6` (standard) / `p-8` (spacious)
- Title → Description gap: `mt-1` or `mt-2`
- Content sections gap: `space-y-4`
- Footer/Action bar: `mt-4 pt-4 border-t border-border`

## 2. Responsive Layout System

### 2.1 CSS Grid Layouts
```html
<!-- Auto-responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <!-- Cards auto-flow into columns based on breakpoint -->
</div>

<!-- Bento Grid (Asymmetric) -->
<div class="grid grid-cols-4 grid-rows-3 gap-4">
  <div class="col-span-2 row-span-2">Featured</div>
  <div class="col-span-2">Secondary</div>
  <div>Small</div>
  <div>Small</div>
</div>

<!-- Auto-fill responsive (no breakpoint needed) -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
  <!-- Cards resize fluidly without media queries -->
</div>
```

### 2.2 Container Strategy
```html
<!-- Centered, max-width container -->
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- Page content -->
</div>
```
| Container | Max Width | Use Case |
|-----------|-----------|----------|
| `max-w-sm` | 384px | Login forms, narrow content |
| `max-w-md` | 448px | Modals, single forms |
| `max-w-2xl` | 672px | Blog posts, article content |
| `max-w-4xl` | 896px | Dashboard panels |
| `max-w-6xl` | 1152px | Wide layouts |
| `max-w-7xl` | 1280px | Full page container (standard) |

### 2.3 Page Gutters (Global Padding)
Use consistent horizontal page padding across all pages:
```css
/* Global container padding */
.page-gutter { @apply px-4 sm:px-6 lg:px-8; }
```

### 2.4 Spacing Hierarchy (4pt/8pt Grid System)
| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` | 4px | Icon-to-text, tight inline elements |
| `gap-2` | 8px | Related items in a group |
| `gap-3` | 12px | List items, form field spacing |
| `gap-4` | 16px | Card internal padding, standard gaps |
| `gap-6` | 24px | Between card groups, section subsections |
| `gap-8` | 32px | Major section separations |
| `gap-12`–`gap-16` | 48–64px | Page section breaks, hero margins |

### 2.5 Content Width for Readability
```html
<!-- Optimal reading line length: 65–75 characters -->
<p class="max-w-prose">Long paragraph text stays readable...</p>
<!-- Or explicit: max-w-[65ch] -->
```

## 3. Section Layout Patterns

### Hero Section
```html
<section class="relative min-h-[80vh] flex items-center justify-center px-4">
  <div class="max-w-4xl text-center space-y-6">
    <h1 class="text-4xl md:text-6xl font-bold">Headline</h1>
    <p class="text-lg text-muted-foreground max-w-2xl mx-auto">Subline</p>
    <div class="flex gap-4 justify-center">
      <Button size="lg">Primary CTA</Button>
      <Button variant="outline" size="lg">Secondary CTA</Button>
    </div>
  </div>
</section>
```

### Feature Grid Section
```html
<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-bold text-center mb-12">Features</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Feature cards -->
    </div>
  </div>
</section>
```

### Two-Column Content + Image
```html
<section class="py-16 px-4">
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="space-y-6">
      <h2>Title</h2>
      <p>Description</p>
    </div>
    <div class="relative aspect-video rounded-xl overflow-hidden">
      <Image src="..." fill className="object-cover" />
    </div>
  </div>
</section>
```
