import React from 'react';

/** K-Aqua IconButton — runde 44px-Schaltfläche für Einzel-Icons (Theme, Menü, Sprache). */
export function IconButton({ children, label, onClick, active = false, expanded }) {
  return (
    <button type="button" className="k-icon-btn" aria-label={label}
      aria-pressed={active || undefined} aria-expanded={expanded} onClick={onClick}>
      {children}
    </button>
  );
}
