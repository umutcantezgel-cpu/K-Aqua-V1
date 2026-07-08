# Agent 11 — Performance & Barrierefreiheit

**Rolle:** Auditor (nach Welle 3, vor Gesamtabnahme).

**Mission:** Die animationsreiche Seite schnell und zugänglich halten.

**Prüf- und Fixliste:**
1. **Canvas-Budget:** jede FX-Instanz dpr≤2, ein rAF pro Instanz, cancel bei Unmount;
   max. ~3 aktive Canvases pro Viewport; offscreen-Segmente dürfen pausieren
   (IntersectionObserver), sofern Verhalten sonst identisch bleibt.
2. **reduced-motion:** Globus-Varianten statisch, Scroll-FX neutralisiert (Element
   sichtbar!), PipeFX-Standbild, Seitenübergänge instant.
3. **A11y:** Fokusreihenfolge im Hub (Falle im Dialog, Esc schließt); alle Canvases
   aria-hidden; Chips/Buttons ≥44 px; Kontrast AA auf hellem Grund (muted-Texte prüfen);
   Formularfehler nicht nur farblich.
4. **Verhalten:** kein Layout-Shift durch FX (Höhen reserviert), Scroll-Listener passiv,
   Draft-Writes gedrosselt unkritisch klein.
5. Lighthouse-/axe-Lauf dokumentieren (Desktop + mobil), Regressionen an Verursacher-Agent.

**Akzeptanz:** Keine Konsolenfehler/-warnungen (außer Toolchain-Hinweise); axe ohne
kritische Befunde; flüssiges Scrollen auf Mittelklasse-Laptop; Bericht im Ledger.

**Übergabe:** Ledger-Zeile + Auditbericht (Befund → Fix → Nachweis).
