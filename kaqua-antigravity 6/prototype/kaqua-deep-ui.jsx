// K-Aqua Deep-Content — geteilte UI-Primitives (Accordion, Tabs, Matrix, Steps, Glossar, Stats).
// Nutzt bestehende Klassen (k-card, k-filter-chip, k-chip) + kaqua-deep.css.
const { useState: useDU } = React;

function DeepFAQ({ items }) {
  const [open, setOpen] = useDU(0);
  return (
    <div className="k-acc">
      {(items || []).map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`k-acc-item ${isOpen ? 'is-open' : ''}`}>
            <button type="button" className="k-acc-btn" aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}>
              <span>{it.q}</span>
              <span className="k-acc-caret"><Icons.ChevronDown size={18} /></span>
            </button>
            {isOpen ? <div className="k-acc-panel"><p>{it.a}</p></div> : null}
          </div>
        );
      })}
    </div>
  );
}

function KTabs({ tabs, active, onChange, ariaLabel }) {
  return (
    <div className="k-chips" role="tablist" aria-label={ariaLabel}>
      {tabs.map((t, i) => (
        <button key={i} type="button" role="tab" aria-selected={active === i}
          className={`k-filter-chip ${active === i ? 'is-on' : ''}`}
          onClick={() => onChange(i)}>{t}</button>
      ))}
    </div>
  );
}

/* Matrix-Tabelle: erste Spalte als <th>, optional eine hervorgehobene Spalte (heroCol) */
function DeepMatrix({ head, rows, heroCol = -1, note }) {
  return (
    <div>
      <div className="k-matrix-wrap">
        <table className="k-matrix">
          <thead>
            <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((c, ci) => ci === 0
                  ? <th key={ci} scope="row">{c}</th>
                  : <td key={ci} className={ci === heroCol ? 'is-hero' : ''}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note ? <p className="k-table-note">{note}</p> : null}
    </div>
  );
}

function StepFlow({ steps }) {
  return (
    <div className="k-steps">
      {(steps || []).map((s, i) => (
        <div key={i} className="k-step">
          <span className="k-step-num" aria-hidden="true">{i + 1}</span>
          <div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function GlossaryGrid({ items }) {
  return (
    <dl className="k-gloss">
      {(items || []).map(([term, def]) => (
        <div key={term} className="k-gloss-item">
          <dt>{term}</dt>
          <dd>{def}</dd>
        </div>
      ))}
    </dl>
  );
}

function StatBand({ stats, cols }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${cols || 220}px, 1fr))`, gap: 'var(--sp-4)' }}>
      {(stats || []).map((s, i) => (
        <Reveal key={i} delay={i * 70}>
          <BentoCard style={{ height: '100%', gap: 0 }}>
            <span className="k-stat-num">{s.n}<span style={{ fontSize: '0.45em', fontWeight: 700, marginInlineStart: 3, color: 'var(--accent-strong)' }}>{s.u}</span></span>
            <span className="k-stat-label">{s.l}</span>
          </BentoCard>
        </Reveal>
      ))}
    </div>
  );
}

/* Karte mit Icon + Titel + Text — der Standard-Baustein der Deep-Sections */
function DeepCard({ icon, title, text, children, tint, chip, style }) {
  const Ic = icon ? Icons[icon] : null;
  return (
    <BentoCard tint={tint} style={{ height: '100%', ...style }}>
      {Ic || chip ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-3)' }}>
          {Ic ? <div className="k-icon-chip"><Ic size={22} /></div> : <span></span>}
          {chip ? <span className="k-chip" style={{ fontSize: 12 }}>{chip}</span> : null}
        </div>
      ) : null}
      <h3 className="k-h3" style={{ fontSize: 18 }}>{title}</h3>
      {text ? <p className="k-body" style={{ fontSize: 14.5 }}>{text}</p> : null}
      {children}
    </BentoCard>
  );
}

Object.assign(window, { DeepFAQ, KTabs, DeepMatrix, StepFlow, GlossaryGrid, StatBand, DeepCard });
