import React from 'react';

/** K-Aqua FilterChip — klickbarer Filter mit An/Aus-Zustand (aria-pressed). */
export function FilterChip({ children, on = false, onClick }) {
  return (
    <button type="button" className={`k-filter-chip ${on ? 'is-on' : ''}`}
      aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
