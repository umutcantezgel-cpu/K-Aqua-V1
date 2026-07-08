K-Aqua Button für alle Handlungsaufforderungen — primary für die EINE Hauptaktion pro Ansicht, ghost daneben, inverse nur auf dunklen Flächen (`--inverse-surface`).

```jsx
<Button onClick={start} icon={<ArrowRight size={18} />}>Produktsystem entdecken</Button>
<Button variant="ghost" href="katalog.pdf">Katalog (PDF)</Button>
<Button variant="inverse" size="lg">Jetzt Kontakt aufnehmen</Button>
```

Varianten: `primary` (violett, Schatten-Lift bei Hover), `ghost` (1px Border → `--primary-soft`-Fläche bei Hover), `inverse`. Größen sm/md/lg (44/48/56px — nie kleiner, Touch-Regel). Press-Zustand `scale(0.97)`, Fokus-Ring automatisch. Label imperativ („Jetzt filtern"), maximal ein Icon.
