import React from 'react';

/** K-Aqua Logo — Tropfen-Bildmarke + Wortmarke. */
export function Logo({ height = 30 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <svg width={height} height={height} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z" fill="var(--primary)"></path>
        <path d="M11.5 21.5a5 5 0 0 0 4 4.5" stroke="var(--primary-foreground)" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9"></path>
      </svg>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: height * 0.74, letterSpacing: '-0.02em', lineHeight: 1 }}>
        K-AQUA
      </span>
    </span>
  );
}
