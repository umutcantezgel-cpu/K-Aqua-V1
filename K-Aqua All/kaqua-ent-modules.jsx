// K-Aqua ENTERPRISE.CORE — signature modules (Telemetry / Material Scanner /
// Compliance / Range / Command Center). Depends on kaqua-ui.jsx (Icons,
// KAquaLogo) being loaded first. Scoped entirely via .ent-* classes.
const { useState, useEffect, useRef } = React;

/* ---------- local icon helper (same recipe as kaqua-ui.jsx KIcon) ---------- */
function EIcon({ d, size = 16, sw = 2, style, children }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }} aria-hidden="true">
      {d ? <path d={d}></path> : children}
    </svg>
  );
}
const EIcons = {
  CheckCircle: (p) => <EIcon {...p}><circle cx="12" cy="12" r="9"></circle><path d="m8.3 12.4 2.5 2.5 4.6-5"></path></EIcon>,
  ChevronRight: (p) => <EIcon {...p} d="m9 6 6 6-6 6" />,
};

function Crosshair({ corner = 'tl' }) {
  return (
    <svg className={`ent-crosshair ent-crosshair--${corner}`} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M12 2v6M12 16v6M2 12h6M16 12h6"></path>
    </svg>
  );
}

/* ---------- small live-value helpers (respect prefers-reduced-motion) ---------- */
function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function useUptime() {
  const [s, setS] = useState(862);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(s / 3600)).padStart(2, '0');
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

function useJitter(base, amp) {
  const [v, setV] = useState(base);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setV(base + (Math.random() * 2 - 1) * amp);
    }, 1800);
    return () => clearInterval(id);
  }, [base, amp]);
  return v;
}

/* ---------- 1. Telemetry data card ---------- */
function TelemetryCard() {
  const uptime = useUptime();
  const instant = useJitter(1.99, 0.045);
  return (
    <div className="ent-glass ent-tele ent-span-4">
      <Crosshair corner="tl" />
      <Crosshair corner="br" />
      <div className="ent-mod-head">
        <span className="ent-tag-live"><span className="ent-status-dot"></span>[SYS_STAT: OK]</span>
        <span className="ent-tag-right">UPTIME {uptime}</span>
      </div>

      <div className="ent-tele-metrics">
        <div className="ent-metric">
          <span className="ent-metric-label">// ROHRDRUCK</span>
          <div className="ent-metric-num-row">
            <span className="ent-metric-num">2.0</span>
            <span className="ent-metric-unit">MPa</span>
          </div>
          <span className="ent-metric-live">INSTANT {instant.toFixed(2)} MPa</span>
        </div>
        <div className="ent-metric">
          <span className="ent-metric-label">// MEDIENTEMPERATUR</span>
          <div className="ent-metric-num-row">
            <span className="ent-metric-num">70</span>
            <span className="ent-metric-unit">°C</span>
          </div>
          <span className="ent-metric-live">RATED PN20 · CONT.</span>
        </div>
      </div>

      <div className="ent-flow" aria-hidden="true">
        <div className="ent-flow-fill" style={{ '--fill': '78%' }}></div>
      </div>

      <div className="ent-tele-meta">
        <div className="ent-meta-row"><span className="ent-meta-k">MAT</span><span className="ent-meta-v">PP-RCT</span></div>
        <div className="ent-meta-row"><span className="ent-meta-k">DN // SDR</span><span className="ent-meta-v">d110 · SDR 11</span></div>
        <div className="ent-meta-row"><span className="ent-meta-k">NODE</span><span className="ent-meta-v">WSN-04 · DEMO</span></div>
        <div className="ent-meta-row"><span className="ent-meta-k">VOL_FLOW_RATE</span><span className="ent-meta-v">4.8 m³/h</span></div>
      </div>
    </div>
  );
}

/* ---------- 2. Holographic material scanner ---------- */
function MaterialScanner() {
  const [open, setOpen] = useState(false);
  const [hoverLayer, setHoverLayer] = useState(null);
  const layers = [
    { name: 'PP-RCT Außenschicht', spec: 'UV-stabilisiert · 1.8 mm', color: 'var(--brand-400)' },
    { name: 'Faserverstärkter Kern', spec: 'Glasfaser-PP · 0.6 mm', color: 'var(--aqua-400)' },
    { name: 'PP-RCT Innenschicht', spec: 'Trinkwassertauglich · 1.6 mm', color: 'var(--brand-600)' },
  ];
  const toggle = () => setOpen((o) => !o);
  return (
    <div className="ent-glass ent-scan ent-span-4">
      <Crosshair corner="tl" />
      <Crosshair corner="br" />
      <div className="ent-mod-head">
        <span className="ent-tag-live"><span className="ent-status-dot"></span>// MATERIAL_SCAN</span>
        <span className="ent-tag-right">{open ? 'SCHICHTEN GETRENNT' : 'HOVER ZUM TRENNEN'}</span>
      </div>

      <div className="ent-scan-body">
        <div
          className={`ent-scan-canvas ${open ? 'is-open' : ''}`}
          role="button" tabIndex={0} aria-pressed={open} aria-label="Materialschichten auffächern"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => { setOpen(false); setHoverLayer(null); }}
          onClick={toggle}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
        >
          <div className="ent-scan-stack">
            {layers.map((l, i) => (
              <div key={l.name} className="ent-scan-layer" data-l={i + 1}
                onMouseEnter={() => setHoverLayer(i)}>
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ent-scan-legend">
          {layers.map((l, i) => (
            <div key={l.name} className={`ent-scan-legend-row ${hoverLayer === i ? 'active' : ''}`}>
              <span className="sw" style={{ background: l.color }}></span>
              <span className="tt"><b>{l.name}</b>{l.spec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. Compliance tile ---------- */
function ComplianceTile() {
  const rows = [
    ['ISO 9001:2015', 'Qualitätsmanagement'],
    ['ISO 14001:2015', 'Umweltmanagement'],
    ['ISO 50001:2018', 'Energiemanagement'],
    ['GENAU-System', 'Integriertes Managementsystem'],
  ];
  return (
    <div className="ent-glass ent-comply ent-span-2">
      <Crosshair corner="tl" />
      <div className="ent-mod-head"><span className="ent-tag-live"><span className="ent-status-dot"></span>// COMPLIANCE</span></div>
      <div className="ent-comply-list">
        {rows.map(([k, v]) => (
          <div className="ent-comply-row" key={k}>
            <EIcons.CheckCircle size={16} />
            <span><b>{k}</b> — {v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 4. Size / range tile ---------- */
function RangeTile() {
  const sdrs = ['SDR 6', 'SDR 7.4', 'SDR 9', 'SDR 11', 'SDR 17'];
  return (
    <div className="ent-glass ent-range ent-span-2">
      <Crosshair corner="tl" />
      <div className="ent-mod-head"><span className="ent-tag-live"><span className="ent-status-dot"></span>// SIZE_RANGE</span></div>
      <div className="ent-range-scale">
        <span className="ent-range-tick" style={{ left: '1%' }}></span>
        <span className="ent-range-tick" style={{ left: '97%' }}></span>
      </div>
      <div className="ent-range-marks"><span>d20</span><span>d630</span></div>
      <div className="ent-chips-wrap">
        {sdrs.map((s) => <span key={s} className="ent-chip">{s}</span>)}
      </div>
    </div>
  );
}

/* ---------- 5. Command center CTA ---------- */
function CommandCenter({ pulse = true }) {
  const messages = [
    '[SYS_STAT: OK] ALLE SYSTEME NOMINAL',
    '// QA: ISO 9001:2015 VERIFIZIERT',
    '// PARTNER: KESSEL — LEADING IN DRAINAGE',
    '// MAT: PP-R / PP-RCT · d20–d630',
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % messages.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="ent-command">
      <div className={`ent-command-inner ${pulse ? '' : 'no-pulse'}`}>
        <div className="ent-command-glow" aria-hidden="true"><span className="b1"></span><span className="b2"></span></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640 }}>
          <span className="ent-command-ticker ent-mono">{messages[idx]}</span>
          <h2 className="ent-command-title">d20 bis d630. Ein Anruf genügt.</h2>
          <p className="ent-command-sub">Vom Rohbau bis zur Übergabe liefert Ihr K-Aqua-Team Systemkomponenten, Prüfprotokolle und technische Beratung — abgestimmt auf jede Baustelle.</p>
        </div>
        <div className="ent-command-actions">
          <button type="button" className="ent-mech-btn ent-command-btn">
            Projekt anfragen <EIcons.ChevronRight size={20} />
          </button>
          <a className="ent-mech-btn ent-command-ghost" href="#">Produktsystem entdecken</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Crosshair, TelemetryCard, MaterialScanner, ComplianceTile, RangeTile, CommandCenter, EIcons });
