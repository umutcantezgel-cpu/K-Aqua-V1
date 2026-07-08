Klickbarer Filter-Chip für Facetten (Produktfinder: Typ/SDR; Märkte: Regionen).

```jsx
<FilterChip on={region === 'gulf'} onClick={() => setRegion('gulf')}>Naher & Mittlerer Osten (12)</FilterChip>
```

Aus: `--card`-Fläche mit Border. An (`on`): gefüllt mit `--primary`, Text `--primary-foreground`. Zähler im Label mitführen. Immer in einer Flex-Reihe mit `gap: 8px`.
