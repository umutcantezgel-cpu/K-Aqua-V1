import React, { useState as uPS, useMemo as uPM } from 'react';
import { Icons } from './Co2UI';
import { MiniSparkline } from './Co2ChartCore';
import { computeFullResult, CO2_MATERIALS, CO2_DIAMETERS, CO2_SDR_CLASSES } from '../../../lib/co2-data';

export function Co2Portfolio({ rows, setRows, usePortfolio, setUsePortfolio, defaults, sharedCtx, opponentId, horizon, fmt }: any) {
  const calc = uPM(() => rows.map((r: any) => {
    const c = { ...sharedCtx, d: r.d, sdr: r.sdr, lengthM: r.lengthKm * 1000 };
    const ka = computeFullResult(CO2_MATERIALS[0], c, horizon);
    const opM = CO2_MATERIALS.find((m) => m.id === opponentId) || CO2_MATERIALS[3];
    const op = computeFullResult(opM, c, horizon);
    return { id: r.id, savings: op.grandTotal - ka.grandTotal, spark: ka.points };
  }), [rows, sharedCtx, opponentId, horizon]);
  const on = rows.filter((r: any) => r.on);
  const totalSav = rows.reduce((a: number, r: any) => a + (r.on ? (calc.find((c: any) => c.id === r.id) || { savings: 0 }).savings : 0), 0);
  const totalKm = on.reduce((a: number, r: any) => a + r.lengthKm, 0);
  function up(id: string, patch: any) { setRows(rows.map((r: any) => (r.id === id ? { ...r, ...patch } : r))); }
  function add() {
    setRows(rows.concat({ id: 'r' + Date.now(), name: `Strang ${rows.length + 1}`, lengthKm: defaults.lengthKm, d: defaults.diameter, sdr: defaults.sdr, on: true }));
  }
  return (
    <div className="co2-pf">
      <div className="co2-pf-top">
        <button type="button" className="co2-play-btn" onClick={add}><Icons.ArrowRight size={14} />Strang hinzufügen</button>
        <button type="button" className={`k-filter-chip ${usePortfolio ? 'is-on' : ''}`} aria-pressed={usePortfolio} onClick={() => setUsePortfolio(!usePortfolio)} disabled={on.length === 0}
          title="Aggregiert die aktiven Stränge in Kopfzeile, Chart und Aufschlüsselung">Portfolio speist Übersicht</button>
        <div className="dash-kpi"><Icons.Ruler size={15} /><span>Aktiv</span><strong>{on.length} / {rows.length}</strong></div>
        <div className="dash-kpi"><Icons.MapPin size={15} /><span>Gesamtlänge</span><strong>{totalKm.toLocaleString('de-DE', { maximumFractionDigits: 1 })} km</strong></div>
        <div className="dash-kpi"><Icons.Leaf size={15} /><span>Ersparnis gesamt</span><strong>{fmt(Math.max(0, totalSav))}</strong></div>
      </div>
      {rows.length === 0 ? (
        <p className="co2-mod-note">Noch keine Stränge. Jede Zeile ist eine eigene Trasse (Name, Länge, Nennweite, SDR) — die Checkbox nimmt sie in die Aggregation auf. Region, Betriebsart, Transport und Durchfluss kommen aus der Seitenleiste.</p>
      ) : (
        <div className="co2-pf-list">
          <div className="co2-pf-row is-head"><span></span><span>Strang</span><span>Länge</span><span>Nennweite</span><span>SDR</span><span>Ersparnis vs. Vergleich</span><span></span></div>
          {rows.map((r: any) => {
            const c = calc.find((x: any) => x.id === r.id) || { savings: 0, spark: [] };
            return (
              <div className={`co2-pf-row ${r.on ? '' : 'is-off'}`} key={r.id}>
                <input type="checkbox" checked={r.on} onChange={(e) => up(r.id, { on: e.target.checked })} aria-label={`${r.name} in Aggregation aufnehmen`} />
                <input type="text" className="co2-inp is-sm" value={r.name} maxLength={30} onChange={(e) => up(r.id, { name: e.target.value })} aria-label="Strang-Name" />
                <span className="co2-pf-len"><input type="number" className="co2-inp is-sm" min="0.1" max="80" step="0.1" value={r.lengthKm} onChange={(e) => up(r.id, { lengthKm: Math.max(0.1, +e.target.value || 0.1) })} aria-label="Länge in Kilometern" />km</span>
                <div className="dash-select-wrap is-sm">
                  <select className="dash-select" value={r.d} onChange={(e) => up(r.id, { d: +e.target.value })} aria-label="Nennweite">
                    {CO2_DIAMETERS.map((d) => <option key={d} value={d}>{d} mm</option>)}
                  </select><Icons.ChevronDown size={14} />
                </div>
                <div className="dash-select-wrap is-sm">
                  <select className="dash-select" value={r.sdr} onChange={(e) => up(r.id, { sdr: +e.target.value })} aria-label="SDR-Klasse">
                    {CO2_SDR_CLASSES.map((s) => <option key={s} value={s}>SDR {String(s).replace('.', ',')}</option>)}
                  </select><Icons.ChevronDown size={14} />
                </div>
                <span className="co2-pf-val"><MiniSparkline points={c.spark} color="var(--primary)" width={64} height={22}></MiniSparkline><strong>{fmt(Math.max(0, c.savings))}</strong></span>
                <button type="button" className="co2-mini-btn is-danger" onClick={() => setRows(rows.filter((x: any) => x.id !== r.id))} aria-label={`${r.name} löschen`}><Icons.X size={13} /></button>
              </div>
            );
          })}
        </div>
      )}
      <p className="co2-mod-note">Ist „Portfolio speist Übersicht" aktiv, zeigen Kopfzeile, Chart, Ticker und Aufschlüsselung die Summe der aktiven Stränge.</p>
    </div>
  );
}
