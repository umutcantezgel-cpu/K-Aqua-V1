import React from 'react';

/** K-Aqua Chip — Glas-Pill für Meta-Infos und Badges (nicht klickbar). */
export function Chip({ children, icon = null, style }) {
  return (
    <span className="k-chip" style={style}>
      {icon}
      {children}
    </span>
  );
}
