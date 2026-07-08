Bereichsregler für Rechner-UIs (CO₂-Rechner, Projektgrößen). Label links, Live-Wert rechts in Outfit 700 `--primary`.

```jsx
<Slider label="Leitungslänge" value={len} min={50} max={5000} step={50} unit="m" onChange={setLen} />
```

Nativer `input[type=range]` mit `accent-color: var(--primary)`, 44px Mindesthöhe. Werte mit `toLocaleString()` formatieren.
