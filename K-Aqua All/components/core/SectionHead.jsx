import React from 'react';

/** K-Aqua SectionHead — Eyebrow + H2 + Lead, der Standard-Sektionskopf. */
export function SectionHead({ eyebrow, title, lead, align = 'left' }) {
  return (
    <div className="k-section-head" style={{ textAlign: align, marginInline: align === 'center' ? 'auto' : 0 }}>
      {eyebrow ? <p className="k-eyebrow">{eyebrow}</p> : null}
      <h2 className="k-h2">{title}</h2>
      {lead ? <p className="k-lead">{lead}</p> : null}
    </div>
  );
}
