# 17 - Component Library: Buttons, Inputs & Forms

This document defines the architecture for core interactive components in web applications. All patterns use standard web technologies (HTML, CSS, React, Tailwind).

## 1. Button Architecture

### 1.1 Visual Hierarchy
```tsx
// Primary — High-emphasis actions (Submit, Save, Purchase)
<button className="bg-primary text-primary-foreground hover:bg-primary/90 
  h-11 px-8 rounded-md font-medium transition-all duration-200
  active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring">
  Submit
</button>

// Secondary — Medium-emphasis (Cancel, Back, Alternative)
<button className="border border-border bg-background hover:bg-accent 
  hover:text-accent-foreground h-11 px-6 rounded-md transition-all duration-200">
  Cancel
</button>

// Ghost — Low-emphasis (Tertiary, text-only)
<button className="hover:bg-accent hover:text-accent-foreground 
  h-11 px-4 rounded-md transition-all duration-200">
  Learn More
</button>

// Destructive — Dangerous actions (Delete, Remove)
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90
  h-11 px-6 rounded-md font-medium transition-all duration-200">
  Delete
</button>
```

### 1.2 Interaction States
| State | Visual | CSS |
|-------|--------|-----|
| Default | Normal appearance | — |
| Hover | Slight bg shift, subtle lift | `hover:bg-primary/90`, `hover:-translate-y-px` |
| Active/Press | Scale down | `active:scale-[0.97]` |
| Focus | Ring outline | `focus-visible:ring-2 focus-visible:ring-ring` |
| Disabled | Reduced opacity, no pointer events | `disabled:opacity-50 disabled:pointer-events-none` |
| Loading | Spinner replaces text, width preserved | `min-w-[120px]` + spinner SVG |

### 1.3 Loading State Pattern
```tsx
<button disabled={isLoading} className="relative min-w-[120px] h-11">
  {isLoading && <Loader2 className="absolute animate-spin h-4 w-4" />}
  <span className={cn(isLoading && "opacity-0")}>Submit</span>
</button>
```
**Rule:** Never change button dimensions during loading. Use fixed `min-w` and swap content opacity.

### 1.4 Design System Specifics
- **Bauhaus**: Thick borders (`border-2` / `border-4`), `rounded-none`, solid offset shadows (`shadow-[4px_4px_0_#000]`)
- **Monochrome**: `rounded-full`, severe B/W contrast, inverted colors on hover/active
- **Modern Dark / SaaS**: `rounded-xl`, subtle inner glow, glass-morphed background
- **Brutalist**: `rounded-none`, 3px black border, hard offset shadow, uppercase text

## 2. Input Fields

### 2.1 Anatomy
```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium text-foreground">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    autoComplete="email"
    placeholder="you@example.com"
    className="h-11 w-full rounded-md border border-border bg-background px-3 
      text-base text-foreground placeholder:text-muted-foreground
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      disabled:cursor-not-allowed disabled:opacity-50
      transition-colors duration-200"
  />
</div>
```

### 2.2 Critical Rules
- **Height**: Minimum `44px` (`h-11`) for touch target compliance
- **Font Size**: Minimum `16px` (`text-base`) to prevent iOS Safari auto-zoom
- **Labels**: Always use visible `<label>` elements. Never rely on `placeholder` alone
- **Autocomplete**: Always set `autoComplete` attribute for browser auto-fill support

### 2.3 Interaction States
| State | Visual |
|-------|--------|
| Default | `border-border` |
| Focus | `ring-2 ring-ring` (visible keyboard focus) |
| Error | `border-destructive ring-destructive` + error text below |
| Disabled | `opacity-50 cursor-not-allowed` |
| Success | `border-green-500` (optional) |

### 2.4 Error Display
```tsx
<input className={cn("...", hasError && "border-destructive focus-visible:ring-destructive")} />
{hasError && (
  <p className="text-sm text-destructive mt-1" role="alert">
    Please enter a valid email address.
  </p>
)}
```

### 2.5 Clearable Input Pattern
```tsx
<div className="relative">
  <input value={value} onChange={...} className="pr-10 ..." />
  {value && (
    <button 
      onClick={() => setValue("")}
      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 
        text-muted-foreground hover:text-foreground"
      aria-label="Clear input"
    >
      <X className="h-4 w-4" />
    </button>
  )}
</div>
```

## 3. Form Architecture

### 3.1 Validation Strategy
- **Client-side**: Validate inline on `blur` for immediate feedback. Use `onChange` for character-count or format constraints.
- **Server-side**: Always re-validate on the server. Never trust client validation alone.
- **Libraries**: Use `react-hook-form` + `zod` for type-safe, performant form handling.

### 3.2 Form Layout
```tsx
<form className="space-y-6 max-w-md">
  {/* Fields stacked with consistent spacing */}
  <div className="space-y-2">...</div>
  <div className="space-y-2">...</div>
  
  {/* Actions at bottom, primary on right */}
  <div className="flex justify-end gap-3 pt-4">
    <Button variant="secondary">Cancel</Button>
    <Button type="submit" disabled={isSubmitting}>Save Changes</Button>
  </div>
</form>
```

### 3.3 Keyboard UX
- `Enter` submits the form when focus is on the last input
- `Tab` moves forward through focusable elements in DOM order
- `Shift+Tab` moves backward
- `Escape` closes dropdowns/modals without submitting
