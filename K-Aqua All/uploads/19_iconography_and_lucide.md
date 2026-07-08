# 19 - Iconography, Imagery & Asset Management

This document defines the icon system, image handling, and asset management strategy for web applications. It replaces mobile-specific references (lucide-react-native, expo-image) with web-native equivalents.

## 1. Icon Libraries

### Primary: Lucide React (Web)
```tsx
import { ArrowRight, Check, Loader2, Menu, X } from "lucide-react"

<ArrowRight className="h-5 w-5" />
<Loader2 className="h-4 w-4 animate-spin" />
```

### Fallback: Phosphor Icons / Heroicons
```tsx
// Phosphor
import { MagnifyingGlass, Gear } from "@phosphor-icons/react"
<MagnifyingGlass size={20} weight="regular" />

// Heroicons
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
<ArrowLeftIcon className="h-5 w-5" />
```

**Rule:** Pick ONE icon library per project. Never mix solid/filled and outline variants inconsistently.

## 2. Icon Sizing & Stroke Weight Consistency

### Size Rules
| Context | Icon Size | Tailwind Class |
|---------|-----------|----------------|
| Inline with small text | 16px | `h-4 w-4` |
| Standard UI controls | 20px | `h-5 w-5` |
| Navigation, headers | 24px | `h-6 w-6` |
| Feature highlights | 32–40px | `h-8 w-8` / `h-10 w-10` |
| Hero/decorative | 48–64px | `h-12 w-12` / `h-16 w-16` |

### Stroke Weight Matching
The stroke width of icons **MUST** match the visual weight of accompanying text:
| Text Weight | Icon `strokeWidth` | Lucide Prop |
|-------------|-------------------|-------------|
| Light (300) | 1 – 1.5 | `strokeWidth={1.5}` |
| Regular (400) | 1.5 – 2 (default) | Default |
| Medium (500) | 2 | `strokeWidth={2}` |
| Bold (700) | 2.5 – 3 | `strokeWidth={2.5}` |

## 3. Icon Button Best Practices
```tsx
<button
  className="inline-flex items-center justify-center h-10 w-10 rounded-md 
    hover:bg-accent transition-colors focus-visible:ring-2 focus-visible:ring-ring"
  aria-label="Close dialog"  /* MANDATORY for icon-only buttons */
>
  <X className="h-5 w-5" />
</button>
```
- **Touch target**: Minimum `40x40px` (`h-10 w-10`), ideally `44x44px`
- **Always add `aria-label`** for accessibility — screen readers cannot read SVG icons
- **Visible tooltip** on hover (optional but recommended for discoverability)

## 4. Image Handling with `next/image`

### Standard Image
```tsx
import Image from "next/image"

<Image
  src="/images/hero.webp"
  alt="Descriptive alt text for accessibility"
  width={1200}
  height={630}
  priority              // For above-the-fold images
  className="rounded-lg object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Fill Image (Container-Relative)
```tsx
<div className="relative aspect-video rounded-xl overflow-hidden">
  <Image
    src="/images/feature.webp"
    alt="..."
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### Image Loading Performance
- Always supply `sizes` prop for responsive `srcset` generation
- Use `priority` only for visible-above-fold images (hero, logo)
- All other images lazy-load by default (`loading="lazy"`)
- Use WebP format with JPEG/PNG fallback
- Set `width` and `height` to prevent CLS (Cumulative Layout Shift)

## 5. Avatar System
```tsx
<div className="relative h-10 w-10 rounded-full overflow-hidden bg-muted">
  {imageUrl ? (
    <Image src={imageUrl} alt={name} fill className="object-cover" />
  ) : (
    <span className="flex h-full w-full items-center justify-center 
      text-sm font-medium text-muted-foreground">
      {initials}
    </span>
  )}
</div>
```
### Avatar Shape by Aesthetic
| Style | Shape | Border |
|-------|-------|--------|
| Modern/SaaS | `rounded-full` | Subtle `ring-2 ring-muted` |
| Bauhaus | `rounded-none` (square) | `border-2 border-foreground` |
| Monochrome | `rounded-full` | `ring-1 ring-foreground` |
| Brutalist | `rounded-none` | `border-2 border-black` |

**Always include an initials fallback** with a deterministic background color (hash the user ID to pick from a curated palette).

## 6. Aspect Ratio Standards
Maintain strict aspect ratios for consistency in grid layouts:
| Ratio | Tailwind Class | Use Case |
|-------|---------------|----------|
| 16:9 | `aspect-video` | Hero images, video thumbnails |
| 4:3 | `aspect-[4/3]` | Product photos, cards |
| 1:1 | `aspect-square` | Avatars, profile photos |
| 3:2 | `aspect-[3/2]` | Portfolio, gallery items |

## 7. Favicon & OG Image Standards
```
public/
├── favicon.ico          (32x32, legacy)
├── icon.svg             (scalable, modern browsers)
├── apple-touch-icon.png (180x180)
└── og-image.png         (1200x630, Open Graph)
```
