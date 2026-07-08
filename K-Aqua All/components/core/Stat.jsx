import React from 'react';

/** K-Aqua Stat — große Kennzahl mit Einheit und Beschriftung. */
export function Stat({ value, unit, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span className="k-stat-num">
        {value}
        {unit ? <span style={{ fontSize: '0.45em', fontWeight: 700, marginLeft: 3, color: 'var(--accent-strong)' }}>{unit}</span> : null}
      </span>
      <span className="k-stat-label">{label}</span>
    </div>
  );
}
