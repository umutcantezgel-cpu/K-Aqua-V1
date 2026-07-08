Bento-Karte — die Standard-Inhaltsfläche der Marke. In 6-Spalten-Bento-Rastern (`.k-bento`) mit `gridColumn: span 2/3/4` asymmetrisch mischen.

```jsx
<Card>
  <div className="k-icon-chip"><Shield size={24} /></div>
  <h3 className="k-h3">GENAU-Managementsystem</h3>
  <p className="k-body">Kontinuierliche Verbesserung …</p>
</Card>
<Card tint>…hervorgehobener Inhalt…</Card>
```

Anatomie: `--card`-Fläche, 1px `--card-border`, `--radius-lg`, `--shadow-diffuse` → Hover `translateY(-3px)` + `--shadow-lift`. Innenabstand 32px, vertikales `gap` 16px. Tint sparsam einsetzen.
