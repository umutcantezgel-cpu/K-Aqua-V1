/* K-Aqua CO2 Dashboard — Chart-Overlay: gebündeltes Tooltip-Panel, Ereignis-
   Flags mit Popover, Break-even-Pill, Gitterwert-Labels (Details on Demand). */
function Co2TooltipPanel({ pct, title, rows, delta, note, pinned }) {
  const side = pct > 55 ? 'left' : 'right';
  return (
    <div className={`co2-panel is-${side}`} style={{ left: `${pct}%` }} role="status">
      <div className="co2-panel-title"><span>{title}</span>{pinned ? <em>Fixiert · Esc löst</em> : null}</div>
      {rows.map((r) => (
        <div className="co2-panel-row" key={r.id}><i style={{ background: r.color }}></i><span>{r.label}</span><strong>{r.value}</strong></div>
      ))}
      {delta ? <div className="co2-panel-delta">{delta}</div> : null}
      {note ? <div className="co2-panel-note">{note}</div> : null}
    </div>
  );
}
function Co2Flag({ pct, row, ev, open, onToggle, fmt }) {
  return (
    <div className={`co2-flag-wrap ${row ? 'is-row2' : ''}`} style={{ left: `clamp(18px, ${pct}%, calc(100% - 18px))` }}>
      <button type="button" className={`co2-flag ${open ? 'is-open' : ''}`} style={{ borderColor: ev.color, color: ev.color }}
        onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onToggle(); }}
        aria-expanded={open} title={`${ev.materialLabel}: ${ev.label} (Jahr ${ev.year})`}>
        <i style={{ background: ev.color }}></i>{ev.year}
        <em className="co2-flag-amt">+{ev.value >= 1000 ? (ev.value / 1000).toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' t' : Math.round(ev.value) + ' kg'}</em>
      </button>
      {open ? (
        <div className="co2-flag-pop" onPointerDown={(e) => e.stopPropagation()}>
          <div className="co2-flag-pop-t"><i style={{ background: ev.color }}></i>{ev.materialLabel} · Jahr {ev.year}</div>
          <div className="co2-flag-pop-l">{ev.label}</div>
          {ev.detail ? (
            <div className="co2-flag-pop-rows">
              <span>Neubau-Last</span><strong>{fmt(ev.detail.neubau)}</strong>
              <span>Rückbau (brutto)</span><strong>{fmt(ev.detail.rueckbau)}</strong>
              <span>Recycling-Gutschrift (angerechnet)</span><strong>−{fmt(ev.detail.gutschrift)}</strong>
            </div>
          ) : null}
          <div className="co2-flag-pop-sum"><span>Ereignislast</span><strong>{fmt(ev.value)}</strong></div>
        </div>
      ) : null}
    </div>
  );
}
function Co2BreakEvenTag({ pct, year }) {
  return <div className="co2-be-tag" style={{ left: `clamp(80px, ${pct}%, calc(100% - 80px))` }}><i></i>Amortisation ab Jahr {year}</div>;
}
function Co2GridLabels({ lines }) {
  return (
    <React.Fragment>
      {lines.map((l, i) => (
        <span className="co2-grid-label" key={i} style={{ top: `${(l.y / 380) * 100}%` }}>{l.label}</span>
      ))}
    </React.Fragment>
  );
}
Object.assign(window, { Co2TooltipPanel, Co2Flag, Co2BreakEvenTag, Co2GridLabels });
