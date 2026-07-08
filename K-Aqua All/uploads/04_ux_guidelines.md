# 04 - UX Guidelines

This document extracts the molecular-level constraints and directives from `ux-guidelines.csv`. These rules are strict UI/UX best practices and heuristics designed to prevent common usability errors.

## Categorized Heuristics

### 1. Navigation & Routing
- **Smooth Scroll (Web)**: Anchor links must scroll smoothly. Use `html { scroll-behavior: smooth; }`. Never jump directly without transition.
- **Sticky Navigation**: Fixed navs shouldn't obscure content. Apply `padding-top` to `body` equal to nav height.
- **Active State**: Visually indicate current page/section (e.g., `text-primary border-b-2`).
- **History Management**: Never break the back button behavior (`history.pushState()`).
- **Deep Linking**: URLs must reflect current state for sharing (Use query params or hash).
- **Breadcrumbs**: Use for sites with 3+ levels of depth (`Home > Category > Product`).

### 2. Animation & Motion Design
- **Motion Restraint**: Animate 1-2 key elements per view maximum. Avoid `animate-bounce` on 5+ elements.
- **Micro-interaction Duration**: UI transitions should feel responsive (150-300ms). Never use >500ms for UI actions.
- **Accessibility (`prefers-reduced-motion`)**: MUST respect user's motion preferences via `@media` queries.
- **Loading States**: Show feedback during async operations (use skeletal screens or spinners). Do not freeze UI.
- **Device Support**: Never rely solely on hover for important actions; hover fails on touch devices. Use click/tap.
- **CSS Performance**: Use `transform` and `opacity` to avoid expensive repaints. Do not animate `top`, `left`, `width`, `height`.
- **Easing**: Use `ease-out` for entering and `ease-in` for exiting. Avoid `linear` for UI transitions.

### 3. Layout Mechanics
- **Z-Index Management**: Define strict z-index scales (`10`, `20`, `30`, `50`). Avoid arbitrary `z-[9999]`.
- **Overflow Hidden**: Do not blindly apply `overflow-hidden`. Ensure content isn't clipped.
- **Viewport Units**: Avoid `100vh` on mobile browsers due to UI chrome shifting; use `100dvh`.
- **Readability**: Limit `max-width` for text content (65-75ch) using `max-w-prose` or `max-w-3xl`.
- **Content Jumping**: Reserve space for async content (`aspect-ratio` or fixed height). Fix Cumulative Layout Shift (CLS).

### 4. Touch & Mobile Ergonomics
- **Target Size**: Minimum `44x44px` touch targets on mobile (`min-h-[44px] min-w-[44px]`).
- **Touch Spacing**: Minimum 8px gap (`gap-2`) between adjacent touch targets.
- **Gesture Conflicts**: Avoid custom horizontal swipes on main content that override system gestures.
- **Tap Delay**: Ensure `touch-action: manipulation` is set to prevent 300ms lag.
- **Haptic Feedback**: Use `navigator.vibrate` sparingly for confirmations, not every tap.

### 5. Interaction States
- **Focus Rings**: Keyboard users MUST have visible focus indicators (`focus:ring-2 focus:ring-blue-500`). NEVER use `outline-none` without an alternative.
- **Interaction Visuals**: Provide visual responses across states (`hover`, `active`, `disabled`). E.g., `active:scale-95`, `opacity-50 cursor-not-allowed`.
- **Button Debouncing**: Disable buttons and show loading state during async actions to prevent double-submissions.
- **System Feedback**: Provide clear error messages near the problem (not silently) and success toasts upon completion. Use destructive confirmation dialogs.

### 6. Accessibility (WCAG Compliance)
- **Contrast**: Minimum `4.5:1` ratio for normal text.
- **Color Independence**: Never convey information by color alone (e.g., Red Border ONLY). Add icons/text.
- **Semantics**: Use logical heading hierarchies (`h1` -> `h2` -> `h3`). Apply `alt` text. Add `aria-label` for icon-only buttons.
- **Keyboard Traps & Screen Readers**: Ensure logical tab order. Use `role="alert"` or `aria-live` for error messages. Provide "Skip to main content" links.

### 7. Performance Diagnostics
- **Assets**: Optimize images (WebP, `srcset`).
- **Loading**: Use `loading="lazy"` below the fold.
- **Code**: Implement Code Splitting (`dynamic import()`), Caching headers, inline critical CSS, load external scripts (`async`, `defer`). Use `font-display: swap` to prevent invisible text.

### 8. Forms & Inputs
- **Labels**: Every input needs a visible label. Never rely solely on placeholders.
- **Validation**: Validate inline (on blur/type), place error messages directly below inputs.
- **UX Enablers**: Use `autocomplete`, specific HTML5 `inputmode` (e.g., numeric), `type="email"`, visual required indicators, and password visibility toggles.
- **Affordance**: Inputs must look interactive (visible borders/backgrounds).

### 9. Typographic Rules
- **Line Height**: Use `1.5-1.75` for body text. E.g., `leading-relaxed`.
- **Font Scanning**: Use modular scales instead of arbitrary font sizes. Body text -> Min 16px on mobile.
- **Contrast**: Ensure high contrast for readability (`text-gray-900` on white, not `text-gray-400`).

### 10. AI / Spatial / Sustainability Specific
- **AI Disclaimer**: Clearly label AI-generated content.
- **AI Streaming**: Stream text token-by-token instead of waiting 10s for full response.
- **Spatial UI (VisionOS)**: Use `z-offset` and glass layers to create depth. Implement gaze hover scaling effects.
- **Sustainability**: Auto-play high-res video should be disabled or lazy-loaded. Compress 3D assets heavily.
