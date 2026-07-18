import React, { useState as uCS, useRef as uCR, useMemo as uCM, useEffect as uCE } from 'react';
import { Icons } from './Co2UI';
import { Co2GridLabels, Co2Flag, Co2BreakEvenTag, Co2TooltipPanel } from './Co2ChartOverlay';
import { useTweenedSeries } from '../../../lib/co2-anim';
const CO2_RANGES = [
  { id: '1y', label: '1 Jahr', years: 1 },
  { id: '5y', label: '5 Jahre', years: 5 },
  { id: '10y', label: '10 Jahre', years: 10 },
  { id: '50y', label: '50 Jahre', years: 50 },
  { id: 'max', label: 'Maximum', years: 9999 },
];
const CO2_VIEWS = [
  { id: 'cum', label: 'Kumulativ' },
  { id: 'annual', label: 'Jährlich' },
  { id: 'diff', label: 'Differenz' },
  { id: 'index', label: 'Indexiert' },
];
const CO2_VIEW_CAPTIONS = {
  cum: 'Aufsummierte Emissionen seit Jahr 0 — die grüne Fläche zwischen den Kurven ist die bis dahin erzielte Ersparnis, steile Stufen sind Ersatzzyklen.',
  annual: 'Emissionen je einzelnem Jahr — Spitzen sind Ersatzzyklen.',
  diff: 'Eine Kurve: der kumulative Vorsprung von K-Aqua. Nulllinie = Gleichstand.',
  index: 'Alle Werkstoffe starten bei 100 % — relatives Wachstum im Vergleich.',
};
const VB_W = 1000, VB_H = 380, PAD_TOP = 22, PAD_BOTTOM = 6;
const CO2_REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* Monotone kubische Interpolation (Fritsch-Carlson): glatt, aber ohne Überschwingen —
   kumulierte Emissionen können nie sinken, also darf es die Kurve auch nicht. */
function monoSegs(pts) {
  const n = pts.length; if (n < 2) return [];
  const dx = [], m = [], t = new Array(n);
  for (let i = 0; i < n - 1; i++) { dx.push((pts[i + 1].x - pts[i].x) || 1e-6); m.push((pts[i + 1].y - pts[i].y) / dx[i]); }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i++) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], s = a * a + b * b;
    if (s > 9) { const tau = 3 / Math.sqrt(s); t[i] = tau * a * m[i]; t[i + 1] = tau * b * m[i]; }
  }
  const segs = [];
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i];
    segs.push({ p0: pts[i], c1: { x: pts[i].x + h / 3, y: pts[i].y + t[i] * h / 3 }, c2: { x: pts[i + 1].x - h / 3, y: pts[i + 1].y - t[i + 1] * h / 3 }, p1: pts[i + 1] });
  }
  return segs;
}
function catmullRomPath(pts) {
  const s = monoSegs(pts); if (!s.length) return '';
  return `M ${s[0].p0.x},${s[0].p0.y}` + s.map((g) => ` C ${g.c1.x},${g.c1.y} ${g.c2.x},${g.c2.y} ${g.p1.x},${g.p1.y}`).join('');
}
function monotonePathReverse(pts) {
  const s = monoSegs(pts); if (!s.length) return '';
  let d = '';
  for (let i = s.length - 1; i >= 0; i--) { const g = s[i]; d += ` C ${g.c2.x},${g.c2.y} ${g.c1.x},${g.c1.y} ${g.p0.x},${g.p0.y}`; }
  return d;
}

function co2ViewTransform(series, view) {
  if (view === 'diff') {
    const ka = series.find((s) => s.id === 'kaqua') || series[0];
    const op = series.find((s) => s.isOpp) || series.find((s) => s.id !== ka.id) || ka;
    return [{ id: 'diff', label: `Vorsprung K-Aqua vs. ${op.label}`, color: ka.color, points: ka.points.map((p, i) => ({ year: p.year, value: (op.points[i] ? op.points[i].value : p.value) - p.value })) }];
  }
  if (view === 'annual') return series.map((s) => ({ ...s, points: s.points.slice(1).map((p, i) => ({ year: p.year, value: Math.max(0, p.value - s.points[i].value) })) }));
  if (view === 'index') return series.map((s) => { const base = Math.max(1e-9, s.points[0].value); return { ...s, points: s.points.map((p) => ({ year: p.year, value: (p.value / base) * 100 })) }; });
  return series;
}

function Co2MiniMap({ series, horizon, domain, onDomain }) {
  const ref = uCR(null); const drag = uCR(null);
  const paths = uCM(() => series.map((s) => {
    const vals = s.points.map((p) => p.value); const max = Math.max(1, ...vals);
    return { id: s.id, color: s.color, d: s.points.map((p, i) => `${i ? 'L' : 'M'} ${(p.year / horizon) * 1000},${41 - (p.value / max) * 36}`).join(' ') };
  }), [series, horizon]);
  const x1 = (domain[0] / horizon) * 1000, x2 = (domain[1] / horizon) * 1000;
  function toYear(clientX) {
    const r = ref.current.getBoundingClientRect();
    return Math.max(0, Math.min(horizon, Math.round(((clientX - r.left) / r.width) * horizon)));
  }
  function down(e) {
    const y = toYear(e.clientX); const px = (y / horizon) * 1000;
    if (Math.abs(px - x1) < 26) drag.current = 'l';
    else if (Math.abs(px - x2) < 26) drag.current = 'r';
    else if (px > x1 && px < x2) drag.current = { m: y };
    else {
      const span = domain[1] - domain[0];
      let a = Math.max(0, Math.min(horizon - span, Math.round(y - span / 2)));
      onDomain([a, a + span]); drag.current = { m: y };
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (!drag.current) return;
    const y = toYear(e.clientX);
    if (drag.current === 'l') onDomain([Math.min(y, domain[1] - 3), domain[1]]);
    else if (drag.current === 'r') onDomain([domain[0], Math.max(y, domain[0] + 3)]);
    else {
      const dy = y - drag.current.m;
      if (!dy) return;
      let a = domain[0] + dy, b = domain[1] + dy;
      if (a < 0) { b -= a; a = 0; }
      if (b > horizon) { a -= b - horizon; b = horizon; }
      onDomain([a, b]); drag.current = { m: y };
    }
  }
  return (
    <div className="co2-minimap" ref={ref} onPointerDown={down} onPointerMove={move} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} title="Zeitfenster wählen: Fenster ziehen, Griffe verschieben">
      <svg viewBox="0 0 1000 44" preserveAspectRatio="none" aria-hidden="true">
        {paths.map((p) => <path key={p.id} d={p.d} fill="none" stroke={p.color} strokeWidth="1.6" opacity="0.75"></path>)}
        <rect className="co2-minimap-dim" x="0" y="0" width={Math.max(0, x1)} height="44"></rect>
        <rect className="co2-minimap-dim" x={x2} y="0" width={Math.max(0, 1000 - x2)} height="44"></rect>
        <rect className="co2-minimap-win" x={x1} y="1" width={Math.max(3, x2 - x1)} height="42" rx="4"></rect>
        <rect className="co2-minimap-hd" x={Math.max(0, x1 - 3.5)} y="8" width="7" height="28" rx="3"></rect>
        <rect className="co2-minimap-hd" x={Math.min(992.5, x2 - 3.5)} y="8" width="7" height="28" rx="3"></rect>
      </svg>
      <span className="co2-minimap-lbl">Jahr {domain[0]}–{domain[1]}</span>
    </div>
  );
}

function Co2Chart({ series, horizonYears, fmt, events = [], breakEven = null, view, onView, showBand, onBand, seriesMode, onSeriesMode, overlays = [], extYear = null, metaCaption = '' }) {
  const [domain, setDomain] = uCS([0, horizonYears]);
  const [hidden, setHidden] = uCS([]);
  const [focusId, setFocusId] = uCS(null);
  const [hover, setHover] = uCS(null);
  const [pinned, setPinned] = uCS(null);
  const [flagOpen, setFlagOpen] = uCS(null);
  const [sel, setSel] = uCS(null);
  const [play, setPlay] = uCS({ on: false, t: null, speed: 1 });
  const [menuOpen, setMenuOpen] = uCS(false);
  const svgRef = uCR(null); const wrapRef = uCR(null);
  const domRef = uCR(domain); domRef.current = domain;
  const ptrs = uCR(new Map()); const gesture = uCR(null);

  uCE(() => { setDomain([0, horizonYears]); setPinned(null); setHover(null); }, [horizonYears]);
  function setDomainSafe(d) {
    let a = Math.max(0, Math.min(Math.round(d[0]), horizonYears - 3));
    let b = Math.min(horizonYears, Math.max(Math.round(d[1]), a + 3));
    setDomain([a, b]); setPinned(null); setFlagOpen(null);
  }

  const animBase = useTweenedSeries(series, 550);
  const viewSeries = uCM(() => co2ViewTransform(animBase, view), [animBase, view]);
  const visible = uCM(() => viewSeries.filter((s) => view === 'diff' || hidden.indexOf(s.id) === -1), [viewSeries, hidden, view]);
  const sliced = uCM(() => visible.map((s) => ({ ...s, pts: s.points.filter((p) => p.year >= domain[0] && p.year <= domain[1]) })), [visible, domain]);
  const ovSliced = uCM(() => (view === 'cum' ? overlays.map((o) => ({ ...o, pts: o.points.filter((p) => p.year >= domain[0] && p.year <= domain[1]) })) : []), [overlays, domain, view]);
  const n = sliced[0] ? sliced[0].pts.length : 0;

  const allVals = [];
  sliced.forEach((s) => s.pts.forEach((p) => allVals.push(p.value)));
  ovSliced.forEach((s) => s.pts.forEach((p) => allVals.push(p.value)));
  const bandF = showBand && (view === 'cum' || view === 'index') ? 1.15 : 1;
  const maxV = Math.max(1e-6, ...allVals) * bandF;
  const minV = view === 'diff' ? Math.min(0, ...allVals) : 0;
  const yFor = (v) => PAD_TOP + (1 - (v - minV) / (maxV - minV)) * (VB_H - PAD_TOP - PAD_BOTTOM);
  const zeroY = yFor(Math.max(0, minV));
  const xForYear = (y) => ((y - domain[0]) / Math.max(1, domain[1] - domain[0])) * VB_W;
  const scaled = uCM(() => sliced.map((s) => ({ ...s, coords: s.pts.map((p, i) => ({ x: n > 1 ? (i / (n - 1)) * VB_W : 0, y: yFor(p.value) })) })), [sliced, maxV, minV, n]);

  uCE(() => { if (pinned != null && pinned >= n) setPinned(null); if (hover != null && hover >= n) setHover(null); }, [n]);

  /* Playback */
  uCE(() => {
    if (!play.on) return undefined;
    let last = Date.now();
    const timer = setInterval(() => {
      const now = Date.now(); const dt = now - last; last = now;
      setPlay((p) => {
        if (!p.on) return p;
        const [a, b] = domRef.current;
        const t = (p.t == null ? a : p.t) + (dt / 6500) * p.speed * (b - a);
        if (t >= b) return { on: false, t: null, speed: p.speed };
        return { ...p, t };
      });
    }, 40);
    return () => clearInterval(timer);
  }, [play.on]);
  uCE(() => {
    if (CO2_REDUCED) return undefined;
    const timer = setTimeout(() => setPlay((p) => (p.t == null && !p.on ? { ...p, on: true } : p)), 800);
    return () => clearTimeout(timer);
  }, []);

  /* Wheel-Zoom (non-passive) */
  uCE(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    function onWheel(e) {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const fx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const [a, b] = domRef.current; const span = b - a;
      const ns = Math.max(3, Math.min(horizonYears, span * (e.deltaY > 0 ? 1.22 : 0.82)));
      let na = a + fx * span - fx * ns, nb = na + ns;
      if (na < 0) { na = 0; nb = ns; }
      if (nb > horizonYears) { nb = horizonYears; na = nb - ns; }
      setDomainSafe([na, nb]);
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [horizonYears]);

  function idxFromEvent(e) {
    const rect = svgRef.current.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    return Math.max(0, Math.min(n - 1, Math.round(rel * (n - 1))));
  }
  function onDown(e) {
    if (n < 2) return;
    wrapRef.current.setPointerCapture(e.pointerId);
    ptrs.current.set(e.pointerId, e.clientX);
    setFlagOpen(null);
    if (ptrs.current.size === 2) {
      const xs = [...ptrs.current.values()];
      gesture.current = { type: 'pinch', d0: Math.abs(xs[0] - xs[1]) || 1, dom: [...domRef.current] };
      setSel(null);
      return;
    }
    gesture.current = { type: 'maybe', x0: e.clientX, i0: idxFromEvent(e), ptype: e.pointerType };
  }
  function onMove(e) {
    if (n < 2) return;
    if (ptrs.current.has(e.pointerId)) ptrs.current.set(e.pointerId, e.clientX);
    const g = gesture.current;
    if (g && g.type === 'pinch' && ptrs.current.size === 2) {
      const xs = [...ptrs.current.values()];
      const d1 = Math.abs(xs[0] - xs[1]) || 1;
      const span0 = g.dom[1] - g.dom[0];
      const ns = Math.max(3, Math.min(horizonYears, span0 * (g.d0 / d1)));
      const mid = (g.dom[0] + g.dom[1]) / 2;
      setDomainSafe([mid - ns / 2, mid + ns / 2]);
      return;
    }
    if (g && g.ptype === 'mouse' && (g.type === 'maybe' || g.type === 'drag')) {
      const dx = e.clientX - g.x0;
      if (g.type === 'maybe' && Math.abs(dx) > 10) g.type = 'drag';
      if (g.type === 'drag') { setSel([g.i0, idxFromEvent(e)]); return; }
    }
    if (play.t == null) setHover(idxFromEvent(e));
  }
  function onUp(e) {
    ptrs.current.delete(e.pointerId);
    const g = gesture.current; gesture.current = null;
    if (!g || g.type === 'pinch') { setSel(null); return; }
    if (g.type === 'drag' && sel) {
      const a = Math.min(sel[0], sel[1]), b = Math.max(sel[0], sel[1]);
      setSel(null);
      if (b - a >= 2 && sliced[0]) setDomainSafe([sliced[0].pts[a].year, sliced[0].pts[b].year]);
      setHover(null);
      return;
    }
    if (g.type === 'maybe') { const i = idxFromEvent(e); setPinned(pinned === i ? null : i); }
  }
  function onKey(e) {
    if (n < 2) return;
    const cur = pinned != null ? pinned : hover != null ? hover : 0;
    const step = e.shiftKey ? 5 : 1;
    let next = null;
    if (e.key === 'ArrowRight') next = Math.min(n - 1, cur + step);
    else if (e.key === 'ArrowLeft') next = Math.max(0, cur - step);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    else if (e.key === 'Escape') { setPinned(null); setHover(null); setFlagOpen(null); return; }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPinned(pinned == null ? cur : null); return; }
    else return;
    e.preventDefault();
    if (pinned != null) setPinned(next); else setHover(next);
  }

  const playIdx = play.t != null && n > 1 && sliced[0] ? Math.max(0, Math.min(n - 1, Math.round(play.t) - sliced[0].pts[0].year)) : null;
  const extIdx = extYear != null && sliced[0] ? sliced[0].pts.findIndex((p) => p.year === extYear) : -1;
  const hi = pinned != null ? pinned : hover != null ? hover : playIdx != null ? playIdx : extIdx >= 0 ? extIdx : null;
  const hiYear = hi != null && sliced[0] && sliced[0].pts[hi] ? sliced[0].pts[hi].year : null;
  const hoverX = hi != null && n > 1 ? (hi / (n - 1)) * VB_W : null;
  const pct = hoverX != null ? (hoverX / VB_W) * 100 : null;
  const fmtView = view === 'index' ? (v) => v.toLocaleString('de-DE', { maximumFractionDigits: 0 }) + ' %' : fmt;
  const op = (s) => (focusId && focusId !== s.id ? 0.22 : 1);
  const cut = (coords, pts) => (play.t == null ? coords : coords.filter((c, i) => pts[i].year <= play.t));

  const flagEvents = uCM(() => events
    .filter((ev) => ev.type === 'replace' && ev.year > domain[0] && ev.year < domain[1] && sliced.some((s) => s.id === ev.seriesId || view === 'diff'))
    .slice(0, 12), [events, domain, sliced, view]);
  const gridLines = hi != null ? [0.25, 0.5, 0.75].map((f) => { const v = minV + f * (maxV - minV); return { y: yFor(v), label: fmtView(v) }; }) : [];
  const beIdx = view === 'cum' && breakEven && breakEven.year > domain[0] && breakEven.year <= domain[1] && sliced[0] ? sliced[0].pts.findIndex((p) => p.year === breakEven.year) : -1;

  const panelRows = hi != null ? sliced.map((s) => ({ id: s.id, color: s.color, label: s.label, value: s.pts[hi] ? fmtView(s.pts[hi].value) : '—' })) : [];
  const panelDelta = hi != null && sliced.length === 2 && view !== 'diff' && sliced[0].pts[hi] && sliced[1].pts[hi]
    ? `Differenz: ${fmtView(Math.abs(sliced[1].pts[hi].value - sliced[0].pts[hi].value))}` : null;
  const panelNote = hi != null ? (() => { const ev = events.find((x) => x.year === hiYear && x.type === 'replace' && (view === 'diff' || sliced.some((s) => s.id === x.seriesId))); return ev ? `${ev.materialLabel}: ${ev.label}` : null; })() : null;
  const liveText = hi != null ? `Jahr ${hiYear}: ` + panelRows.map((r) => `${r.label} ${r.value}`).join(', ') : '';

  const rangeActive = (r) => domain[0] === 0 && domain[1] === Math.min(r.years, horizonYears);
  const zoomed = domain[0] !== 0 || domain[1] !== horizonYears;

  return (
    <div className="co2-chart">
      <div className="co2-toolbar">
        <div className="k-chips co2-views">
          {CO2_VIEWS.map((v) => <button key={v.id} type="button" className={`k-filter-chip ${view === v.id ? 'is-on' : ''}`} aria-pressed={view === v.id} title={CO2_VIEW_CAPTIONS[v.id]} onClick={() => { onView(v.id); setPinned(null); }}>{v.label}</button>)}
        </div>
        <div className="co2-legend">
          {viewSeries.map((s) => {
            const off = hidden.indexOf(s.id) !== -1 && view !== 'diff';
            return (
              <button key={s.id} type="button" className={`co2-legend-item ${off ? 'is-off' : ''}`}
                onMouseEnter={() => setFocusId(s.id)} onMouseLeave={() => setFocusId(null)}
                onClick={() => { if (view === 'diff') return; setHidden((h) => (h.indexOf(s.id) !== -1 ? h.filter((x) => x !== s.id) : (visible.length > 1 ? h.concat(s.id) : h))); }}
                aria-pressed={!off} title={view === 'diff' ? undefined : 'Klick blendet die Serie ein/aus'}>
                <i style={{ background: s.color }}></i>{s.label}
              </button>
            );
          })}
          {ovSliced.map((o) => <span key={o.id} className="co2-legend-item is-ov"><i style={{ background: o.color }}></i>{o.label}</span>)}
        </div>
        <div className="co2-tools">
          <button type="button" className="co2-play-btn" onClick={() => setPlay((p) => ({ ...p, on: !p.on, t: p.on ? p.t : (p.t != null && p.t < domain[1] - 0.5 ? p.t : null) }))}>
            <Icons.Play size={14} />{play.on ? 'Pause' : play.t != null ? 'Weiter' : 'Zeitverlauf'}
          </button>
          {play.t != null ? <button type="button" className="co2-speed-btn" onClick={() => setPlay((p) => ({ ...p, speed: p.speed === 4 ? 1 : p.speed * 2 }))} title="Wiedergabe-Geschwindigkeit">{play.speed}×</button> : null}
          <div className="co2-kebab">
            <button type="button" className="co2-icon-btn" aria-expanded={menuOpen} aria-haspopup="true" onClick={() => setMenuOpen(!menuOpen)} title="Weitere Chart-Optionen"><span className="co2-kebab-glyph">⋯</span></button>
            {menuOpen ? (
              <React.Fragment>
                <div className="co2-panelmenu-backdrop" onClick={() => setMenuOpen(false)}></div>
                <div className="co2-panelmenu-pop">
                  <span className="co2-panelmenu-t">Chart-Optionen</span>
                  {onSeriesMode ? <label className="co2-panelmenu-row"><input type="checkbox" checked={seriesMode === 'all'} onChange={(e) => onSeriesMode(e.target.checked ? 'all' : 'duel')} />Alle 4 Werkstoffe zeigen</label> : null}
                  <label className={`co2-panelmenu-row ${view === 'annual' || view === 'diff' ? 'is-dis' : ''}`}><input type="checkbox" checked={showBand} disabled={view === 'annual' || view === 'diff'} onChange={(e) => onBand(e.target.checked)} />± 15 % Bandbreite anzeigen</label>
                  <div className="co2-kebab-sep"></div>
                  <button type="button" className="co2-panelmenu-row is-btn" onClick={() => { setMenuOpen(false); window.co2ExportCsv(series, horizonYears, metaCaption); }}><Icons.FileText size={14} />Daten als CSV exportieren</button>
                  <button type="button" className="co2-panelmenu-row is-btn" onClick={() => { setMenuOpen(false); window.co2ExportPng(svgRef.current, metaCaption); }}><Icons.Download size={14} />Chart als PNG exportieren</button>
                </div>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
      <div className={`co2-chart-svg-wrap ${play.t != null ? 'is-playing' : ''}`} ref={wrapRef} tabIndex={0} role="application"
        aria-label="Interaktiver Lebenszyklus-Chart. Pfeiltasten bewegen das Fadenkreuz, Enter fixiert, Escape löst."
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onKeyDown={onKey}
        onPointerLeave={() => { if (pinned == null) setHover(null); }} onDoubleClick={() => setDomainSafe([0, horizonYears])}>
        <span className="co2-axis-max">{fmtView(maxV)}</span>
        <span className="co2-axis-min">{fmtView(minV)}</span>
        <span className="sr-only-co2" aria-live="polite">{liveText}</span>
        {n < 2 ? <div className="co2-chart-empty">Zeitfenster zu klein — Zoom zurücksetzen.</div> : null}
        <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="co2-svg">
          <defs>
            <filter id="co2glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" result="b"></feGaussianBlur><feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
            {scaled.map((s) => (
              <linearGradient id={`co2grad-${s.id}`} key={s.id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor={s.color} stopOpacity="0"></stop>
              </linearGradient>
            ))}
          </defs>
          {gridLines.map((l, i) => <line key={i} className="co2-gridline" x1="0" y1={l.y} x2={VB_W} y2={l.y}></line>)}
          {minV < 0 ? <line className="co2-zeroline" x1="0" y1={zeroY} x2={VB_W} y2={zeroY}></line> : null}
          {showBand && (view === 'cum' || view === 'index') ? scaled.map((s) => {
            const hiC = s.pts.map((p, i) => ({ x: s.coords[i].x, y: yFor(p.value * 1.15) }));
            const loC = s.pts.map((p, i) => ({ x: s.coords[i].x, y: yFor(p.value * 0.85) }));
            if (hiC.length < 2) return null;
            const d = `M ${hiC.map((c) => `${c.x},${c.y}`).join(' L ')} L ${loC.slice().reverse().map((c) => `${c.x},${c.y}`).join(' L ')} Z`;
            return <path key={s.id} d={d} fill={s.color} opacity={0.1 * op(s)}></path>;
          }) : null}
          {view === 'cum' && scaled.length === 2 ? (() => {
            const ka = scaled.find((s) => s.id === 'kaqua') || scaled[0];
            const other = scaled.find((s) => s !== ka);
            const a = cut(ka.coords, ka.pts), b = cut(other.coords, other.pts);
            const m = Math.min(a.length, b.length);
            if (m < 2) return null;
            const d = catmullRomPath(b.slice(0, m)) + ` L ${a[m - 1].x},${a[m - 1].y}` + monotonePathReverse(a.slice(0, m)) + ' Z';
            return <path d={d} fill="var(--primary)" opacity={0.13 * Math.min(op(ka), op(other))}></path>;
          })() : null}
          {view === 'annual' ? scaled.map((s, si) => (
            <g key={s.id} opacity={op(s)}>
              {s.coords.map((c, i) => {
                if (play.t != null && s.pts[i].year > play.t) return null;
                const bw = Math.max(2, ((VB_W / Math.max(1, n)) * 0.66) / scaled.length);
                return <rect key={i} x={c.x - (scaled.length * bw) / 2 + si * bw} y={c.y} width={bw} height={Math.max(0.5, zeroY - c.y)} rx="2" fill={s.color} opacity="0.88"></rect>;
              })}
            </g>
          )) : scaled.map((s) => {
            const dc = cut(s.coords, s.pts);
            if (dc.length < 2) return null;
            const line = catmullRomPath(dc);
            const first = dc[0], last = dc[dc.length - 1];
            const area = `${line} L ${last.x},${zeroY} L ${first.x},${zeroY} Z`;
            return (
              <g key={s.id} opacity={op(s)} style={{ transition: 'opacity .18s ease' }}>
                <path d={area} fill={`url(#co2grad-${s.id})`} stroke="none"></path>
                <path d={line} fill="none" stroke={s.color} strokeWidth={s.id === 'kaqua' ? 3.5 : 3} strokeLinecap="round" strokeLinejoin="round" filter={s.id === 'kaqua' ? 'url(#co2glow)' : undefined}></path>
              </g>
            );
          })}
          {view === 'cum' ? ovSliced.map((o) => {
            const coords = o.pts.map((p, i) => ({ x: o.pts.length > 1 ? (i / (o.pts.length - 1)) * VB_W : 0, y: yFor(p.value) }));
            if (coords.length < 2) return null;
            return <path key={o.id} d={catmullRomPath(coords)} fill="none" stroke={o.color} strokeWidth="2" strokeDasharray="7 6" opacity="0.6"></path>;
          }) : null}
          {sel ? (() => { const a = Math.min(sel[0], sel[1]) / (n - 1) * VB_W, b = Math.max(sel[0], sel[1]) / (n - 1) * VB_W; return <rect className="co2-selrect" x={a} y={PAD_TOP - 10} width={Math.max(1, b - a)} height={VB_H - PAD_TOP - PAD_BOTTOM + 10}></rect>; })() : null}
          {flagEvents.map((ev, i) => <g key={i}><rect className="co2-flagband" x={xForYear(ev.year) - 6} y={PAD_TOP - 6} width="12" height={VB_H - PAD_TOP - PAD_BOTTOM + 6} fill={ev.color}></rect><line className="co2-flagline" x1={xForYear(ev.year)} y1={PAD_TOP - 6} x2={xForYear(ev.year)} y2={VB_H - PAD_BOTTOM} stroke={ev.color}></line></g>)}
          {hoverX != null ? <line x1={hoverX} y1={PAD_TOP - 8} x2={hoverX} y2={VB_H - PAD_BOTTOM} stroke="var(--muted-foreground)" strokeWidth="1" strokeDasharray="4 4"></line> : null}
          {beIdx >= 0 && scaled[0] && scaled[0].coords[beIdx] ? <circle className="co2-be-dot" cx={scaled[0].coords[beIdx].x} cy={scaled[0].coords[beIdx].y} r="7" fill="none" stroke="var(--primary)" strokeWidth="2.5"></circle> : null}
          {hi != null && view !== 'annual' ? scaled.map((s) => (s.coords[hi] ? <circle key={s.id} className="co2-dot" cx={s.coords[hi].x} cy={s.coords[hi].y} r="5" fill={s.color} stroke="var(--background)" strokeWidth="2" opacity={op(s)}></circle> : null)) : null}
        </svg>
        {hi != null ? <Co2GridLabels lines={gridLines}></Co2GridLabels> : null}
        {flagEvents.map((ev, i) => (
          <Co2Flag key={`${ev.seriesId}-${ev.year}`} pct={(xForYear(ev.year) / VB_W) * 100} row={i % 2 === 1}
            ev={ev} open={flagOpen === `${ev.seriesId}-${ev.year}`} fmt={fmt}
            onToggle={() => setFlagOpen(flagOpen === `${ev.seriesId}-${ev.year}` ? null : `${ev.seriesId}-${ev.year}`)}></Co2Flag>
        ))}
        {beIdx >= 0 ? <Co2BreakEvenTag pct={(xForYear(breakEven.year) / VB_W) * 100} year={breakEven.year}></Co2BreakEvenTag> : null}
        {hi != null && pct != null ? <Co2TooltipPanel pct={pct} title={`Jahr ${hiYear}`} rows={panelRows} delta={panelDelta} note={panelNote} pinned={pinned != null}></Co2TooltipPanel> : null}
        {play.t != null ? <div className="co2-play-badge">Jahr {Math.round(play.t)} / {domain[1]}</div> : null}
      </div>
      <div className="co2-chart-bottom">
        <div className="co2-bottom-row">
        <div className="co2-timeline">
          <div className={`co2-minimap-slot ${play.t != null ? 'is-hidden' : ''}`}>
            <Co2MiniMap series={series.slice(0, 2)} horizon={horizonYears} domain={domain} onDomain={setDomainSafe}></Co2MiniMap>
          </div>
          {play.t != null ? (
            <div className="co2-scrub-row">
              <input type="range" className="k-range co2-scrub" min={domain[0]} max={domain[1]} step="0.25" value={play.t}
                onChange={(e) => setPlay((p) => ({ ...p, t: +e.target.value }))} aria-label="Wiedergabe-Position in Jahren" />
              <button type="button" className="co2-icon-btn" onClick={() => setPlay((p) => ({ ...p, on: false, t: null }))} title="Wiedergabe beenden"><Icons.X size={14} /></button>
            </div>
          ) : null}
        </div>
        <div className="k-chips co2-range-chips">
          {zoomed ? <button type="button" className="k-filter-chip is-reset" onClick={() => setDomainSafe([0, horizonYears])}>Reset</button> : null}
          {CO2_RANGES.filter((r) => r.years <= horizonYears || r.id === 'max').map((r) => (
            <button key={r.id} type="button" className={`k-filter-chip ${rangeActive(r) ? 'is-on' : ''}`} aria-pressed={rangeActive(r)} onClick={() => setDomainSafe([0, Math.min(r.years, horizonYears)])}>{r.label}</button>
          ))}
        </div>
        </div>
        <div className="co2-hint">
          <span className="co2-hint-cap">{CO2_VIEW_CAPTIONS[view]}</span>
          <span className="co2-hint-keys">Ziehen = Zoom · Klick = fixieren · Doppelklick = Reset · Pfeiltasten = Jahr</span>
        </div>
      </div>
    </div>
  );
}

function MiniSparkline({ points, color, width = 64, height = 26 }) {
  const vals = points.map((p) => p.value);
  const max = Math.max(1, ...vals), min = Math.min(...vals);
  const range = Math.max(1e-9, max - min);
  const coords = points.map((p, i) => ({
    x: points.length > 1 ? (i / (points.length - 1)) * width : 0,
    y: height - 2 - ((p.value - min) / range) * (height - 4),
  }));
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="co2-spark">
      <path d={catmullRomPath(coords)} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

export { Co2Chart, MiniSparkline, catmullRomPath, CO2_VIEWS };
