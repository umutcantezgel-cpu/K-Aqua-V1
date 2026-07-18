import React from 'react';
import { Icons, KAquaLogo } from './Co2UI';
import { catmullRomPath } from './Co2ChartCore';
import { CO2_PHASES, CO2_SEO_COPY, CO2_DISCLAIMER } from '../../../lib/co2-data';

export function Co2ReportChart({ series }: any) {
  const W = 1000, H = 240;
  const max = Math.max(1, ...series.flatMap((s: any) => s.points.map((p: any) => p.value)));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="co2-rep-svg" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        {series.map((s: any) => (
          <linearGradient id={`repgrad-${s.id}`} key={s.id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.3"></stop>
            <stop offset="100%" stopColor={s.color} stopOpacity="0"></stop>
          </linearGradient>
        ))}
      </defs>
      {series.map((s: any) => {
        const coords = s.points.map((p: any, i: number) => ({ x: (i / Math.max(1, s.points.length - 1)) * W, y: 10 + (1 - p.value / max) * (H - 16) }));
        const line = catmullRomPath(coords);
        return (
          <g key={s.id}>
            <path d={`${line} L ${W},${H} L 0,${H} Z`} fill={`url(#repgrad-${s.id})`}></path>
            <path d={line} fill="none" stroke={s.color} strokeWidth="2.5"></path>
          </g>
        );
      })}
    </svg>
  );
}

export function Co2Report({ paramRows, kaquaResult, opponentResult, savings, breakEven, horizon, co2Price, fmt }: any) {
  const euro = (savings / 1000) * co2Price;
  return (
    <div className="co2-report-wrap">
      <div className="co2-report-sheet">
        <div className="co2-rep-head">
          <KAquaLogo height={24}></KAquaLogo>
          <div className="co2-rep-head-r">
            <strong>CO₂-Lebenszyklus-Bericht</strong>
            <span>{new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
        <div className="co2-rep-params">
          {paramRows.map((p: any) => <div key={p[0]}><span>{p[0]}</span><strong>{p[1]}</strong></div>)}
        </div>
        <div className="co2-rep-hero">
          <span>CO₂e-Ersparnis über {horizon} Jahre — {kaquaResult.material.label} gegenüber {opponentResult.material.label}</span>
          <strong>{fmt(savings)}</strong>
          <small>{breakEven ? (breakEven.year === 0 ? 'K-Aqua liegt vom ersten Tag an vorn.' : `Amortisation ab Jahr ${breakEven.year}.`) : 'Kein Vorsprung im Betrachtungszeitraum.'} {co2Price > 0 ? `Vermiedene CO₂-Kosten bei ${co2Price} €/t: ca. ${Math.round(euro).toLocaleString('de-DE')} €.` : ''}</small>
        </div>
        <Co2ReportChart series={[
          { id: 'ka', label: kaquaResult.material.label, color: kaquaResult.material.color, points: kaquaResult.points },
          { id: 'op', label: opponentResult.material.label, color: opponentResult.material.color, points: opponentResult.points },
        ]}></Co2ReportChart>
        <div className="co2-rep-legend">
          <span><i style={{ background: kaquaResult.material.color }}></i>{kaquaResult.material.label}</span>
          <span><i style={{ background: opponentResult.material.color }}></i>{opponentResult.material.label}</span>
          <span className="co2-rep-legend-x">Kumulative kg CO₂e · Jahr 0–{horizon}</span>
        </div>
        <table className="co2-rep-table">
          <thead><tr><th>Lebenszyklus-Phase</th><th>{kaquaResult.material.label}</th><th>{opponentResult.material.label}</th></tr></thead>
          <tbody>
            {CO2_PHASES.map((p) => (
              <tr key={p.id}>
                <td><i className="co2-rep-dot" style={{ background: p.color }}></i>{p.label}</td>
                <td>{fmt(Math.max(0, kaquaResult.phaseValues[p.id] || 0))}</td>
                <td>{fmt(Math.max(0, opponentResult.phaseValues[p.id] || 0))}</td>
              </tr>
            ))}
            <tr className="is-total"><td>Gesamt ({horizon} Jahre)</td><td>{fmt(kaquaResult.grandTotal)}</td><td>{fmt(opponentResult.grandTotal)}</td></tr>
            <tr><td>Ersatzzyklen</td><td>{kaquaResult.replacements}×</td><td>{opponentResult.replacements}×</td></tr>
          </tbody>
        </table>
        <div className="co2-rep-meth">
          <strong>Methodik (Kurzfassung)</strong>
          <ul>{CO2_SEO_COPY.meth.map((m) => <li key={m.t}>{m.t}</li>)}</ul>
        </div>
        <p className="co2-rep-disclaimer">{CO2_DISCLAIMER} Äquivalente: ≈ 25 kg CO₂/Baum·Jahr, ≈ 0,15 kg CO₂e/Pkw-km. Scope-3- und EPD-Rohdaten auf Anfrage.</p>
        <div className="co2-rep-actions co2-no-print">
          <button type="button" className="co2-play-btn" onClick={() => window.print()}><Icons.FileText size={14} />Drucken / Als PDF sichern</button>
        </div>
      </div>
    </div>
  );
}
