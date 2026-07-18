import React, { useState as useSB } from 'react';

export function Co2Breakdown({ results, phases, fmt, horizonYears }: any) {
  const [hover, setHover] = useSB<any>(null);
  const sorted = [...results].sort((a, b) => b.grandTotal - a.grandTotal);

  return (
    <div className="co2-breakdown">
      <div className="co2-phase-legend">
        {phases.map((p: any) => (
          <span className="co2-legend-item" key={p.id}><i style={{ background: p.color }}></i>{p.label}</span>
        ))}
      </div>
      <div className="co2-breakdown-rows">
        {sorted.map((r) => {
          const total = Math.max(1, r.grandTotal);
          return (
            <div className="co2-breakdown-row" key={r.material.id}>
              <div className="co2-breakdown-label">
                <span>{r.material.label}</span>
                <strong>{fmt(r.grandTotal)}</strong>
              </div>
              <div className="co2-breakdown-bar">
                {phases.map((p: any) => {
                  const value = Math.max(0, r.phaseValues[p.id] || 0);
                  const pct = (value / total) * 100;
                  if (pct <= 0) return null;
                  const isHover = hover && hover.materialId === r.material.id && hover.phaseId === p.id;
                  return (
                    <div key={p.id} className={`co2-breakdown-seg ${isHover ? 'is-hover' : ''}`}
                      style={{ width: `${pct}%`, background: p.color }}
                      onMouseEnter={() => setHover({ materialId: r.material.id, phaseId: p.id })}
                      onMouseLeave={() => setHover(null)}>
                      {isHover ? (
                        <div className="co2-breakdown-tooltip">
                          <span>{p.label}</span><strong>{fmt(value)}</strong><small>{pct.toFixed(1)}%</small>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              {r.replacements > 0 ? (
                <span className="co2-breakdown-note">{r.replacements} Ersatzzyklen über {horizonYears} Jahre{r.recyclingCreditTotal > 0 ? ` · davon ${fmt(r.recyclingCreditTotal)} Recycling-Gutschrift gegengerechnet` : ''}</span>
              ) : (
                <span className="co2-breakdown-note">Kein Ersatzzyklus innerhalb von {horizonYears} Jahren nötig</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
