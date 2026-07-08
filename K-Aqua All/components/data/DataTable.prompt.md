Technische Datentabelle — für Dimensionen, Druckstufen, Artikellisten. Immer in einer Card mit `padding: 24px`.

```jsx
<DataTable
  head={['Komponente', 'Dimension', 'Druckstufen']}
  rows={[
    ['Monolayer-Rohre', '20 – 630 mm', 'SDR 6 / 7,4 / 9 / 11 / 17'],
    ['Formteile', '20 – 315 mm', 'systemkompatibel'],
  ]} />
```

Kopfzeile: Outfit 700 mit 2px `--primary`-Unterlinie. Zeilen-Hover: `--primary-soft`. Zahlen nicht zentrieren — links bündig lassen.
