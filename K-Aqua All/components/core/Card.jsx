import React from 'react';

/** K-Aqua Card — Bento-Karte. Standardfläche für Inhalte; tint für Hervorhebung. */
export function Card({ children, tint = false, hover = true, style, as = 'div' }) {
  const Tag = as;
  return (
    <Tag className={`k-card ${tint ? 'k-card--tint' : ''}`}
      style={hover ? style : { ...style, transform: 'none' }}>
      {children}
    </Tag>
  );
}
