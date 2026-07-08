Checkbox-Zeile im Karten-Stil — das Formular-Muster der Marke (RFP-Paket-Builder, Benefits-Rechner). Ganze Zeile ist klickbar.

```jsx
<CheckItem checked={sel.includes('iso')} onChange={(v) => toggle('iso', v)}
  title={<span>ISO-Zertifikate <span style={{color:'var(--primary)'}}>3 PDFs</span></span>}
  description="9001, 14001, 50001 — DE + EN" />
```

Aktiv (`is-on`): `--primary-soft`-Fläche + `--primary`-Border. Mindesthöhe 44px.
