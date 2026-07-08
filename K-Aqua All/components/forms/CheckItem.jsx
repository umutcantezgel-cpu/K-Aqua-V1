import React from 'react';

/** K-Aqua CheckItem — Checkbox-Zeile mit Titel + Beschreibung (RFP-Builder, Benefits). */
export function CheckItem({ checked, onChange, title, description }) {
  return (
    <label className={`k-doc-check ${checked ? 'is-on' : ''}`} style={{ alignItems: 'flex-start' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ marginTop: 3 }} />
      <span>
        <strong style={{ display: 'block', fontFamily: 'var(--font-heading)' }}>{title}</strong>
        {description ? <span style={{ fontSize: 13.5, color: 'var(--muted-foreground)' }}>{description}</span> : null}
      </span>
    </label>
  );
}
