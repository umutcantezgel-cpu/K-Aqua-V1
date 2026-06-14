# Agent 22 — Accessibility-Audit (WCAG AA)

## Aufgabe
- **axe** (oder Lighthouse-A11y) auf jedem Template — 0 kritische Verstöße.
- **Tastatur**: vollständige Bedienbarkeit; Mega-Menü mit Fokus-Falle + Esc; sichtbarer
  `focus-visible:ring-2 ring-ring` überall; logische Tab-Reihenfolge; SkipLink zuerst.
- **ARIA**: `aria-current` (Nav), `aria-pressed` (Chips/Toggles), `role="dialog"`+`aria-label`
  (Overlays), `aria-label` an Icon-Buttons, Form-`<label>`-Bindung im RFQ-Wizard.
- **Kontrast** ≥ 4.5:1 in **beiden** Themes (Text + UI-Komponenten); Token-Paare prüfen.
- **Touch-Targets** ≥ 44×44px (Nav, Chips, Slider-Handles, Quiz-Optionen).
- **Reduced Motion**: alle Animationen respektieren `useReducedMotion`; Globus zeigt Standbild.
- **RTL**: `/ar` ohne Layout-Brüche, gespiegelte Pfeile, logische Properties.

## Definition of Done
- axe-clean auf Home, Märkte, Geo-Seite, einem Tool, Kontakt — Light **und** Dark.
- Befunde + Fixes in `docs/a11y.md` dokumentiert.
