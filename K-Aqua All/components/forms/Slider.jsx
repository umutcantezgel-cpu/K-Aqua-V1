import React from 'react';

/** K-Aqua Slider — beschrifteter Bereichsregler mit Live-Wert. */
export function Slider({ label, value, min, max, step = 1, unit = '', onChange }) {
  const id = React.useId();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <label htmlFor={id} style={{ fontWeight: 600, fontSize: 15 }}>{label}</label>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)' }}>
          {Number(value).toLocaleString()} {unit}
        </span>
      </div>
      <input id={id} className="k-range" type="range" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(+e.target.value)} />
    </div>
  );
}
