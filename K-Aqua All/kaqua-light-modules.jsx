// K-Aqua × Coday — Light Enterprise page. Plain-icon helper + logo, all
// colored via Coday tokens (teal/slate/amber). Depends on tweaks-panel.jsx
// loaded first (for TweaksPanel + hooks).
const { useState } = React;

function LIcon({ d, size = 18, sw = 2.2, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, ...style }} aria-hidden="true">
      <path d={d}></path>
    </svg>
  );
}
const LIcons = {
  Check: (p) => <LIcon {...p} d="M20 6 9 17l-5-5" />,
  Arrow: (p) => <LIcon {...p} d="M5 12h14M13 5l7 7-7 7" />,
  Shield: (p) => <LIcon {...p} d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />,
  Leaf: (p) => <LIcon {...p} d="M4 20c8 0 14-6 14-14V4h-2C8 4 4 10 4 18z" />,
  Bolt: (p) => <LIcon {...p} d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  Phone: (p) => <LIcon {...p} d="M22 16.9v3a2 2 0 0 1-2.2 2 20 20 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A20 20 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L7.9 9.8a16 16 0 0 0 6 6l1.5-1.5a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2z" />,
};

function LogoLight({ height = 34, dark = false }) {
  const drop = dark ? '#fff' : 'var(--color-primary-700)';
  const inner = dark ? 'var(--color-secondary-900)' : '#fff';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={height} height={height} viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 2.5C16 2.5 26 13 26 20a10 10 0 1 1-20 0C6 13 16 2.5 16 2.5Z" fill={drop}></path>
        <path d="M11.5 21.5a5 5 0 0 0 4 4.5" stroke={inner} strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.9"></path>
      </svg>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: height * 0.62, letterSpacing: '-0.02em', lineHeight: 1, color: dark ? '#fff' : 'var(--color-secondary-900)' }}>
        K-AQUA
      </span>
    </span>
  );
}

/* ---------- hero cross-section diagram (flat, engineering-style) ---------- */
function PipeDiagram() {
  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="PP-RCT Mehrschichtrohr im Querschnitt">
      <circle cx="160" cy="160" r="140" fill="var(--color-primary-800)" />
      <circle cx="160" cy="160" r="112" fill="var(--color-secondary-500)" />
      <circle cx="160" cy="160" r="86" fill="var(--color-primary-600)" />
      <circle cx="160" cy="160" r="52" fill="var(--color-secondary-900)" />
      <circle cx="160" cy="160" r="52" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x="160" y="167" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="15" fill="rgba(255,255,255,0.85)">DN110</text>
    </svg>
  );
}

/* ---------- nav ---------- */
function Nav() {
  return (
    <header className="kl-nav">
      <div className="kl-container kl-nav-inner">
        <LogoLight height={30} />
        <nav className="kl-nav-links">
          <a href="#produkt">Produktsystem</a>
          <a href="#compliance">Qualität</a>
          <a href="#sortiment">Sortiment</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <div className="kl-nav-spacer"></div>
        <div className="kl-nav-phone"><LIcons.Phone size={16} /><strong>+49 (0) 202 · 123 456</strong></div>
        <a className="kl-btn primary" href="#kontakt">Projekt anfragen<LIcons.Arrow size={17} /></a>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function Hero({ showDots }) {
  return (
    <section className="kl-hero">
      <div className="kl-hero-dots" style={{ opacity: showDots ? 0.5 : 0 }}></div>
      <div className="kl-container kl-hero-inner">
        <div>
          <div className="kl-chip">
            <span className="kl-chip-dot"><LIcons.Shield size={13} /></span>
            <span>Zertifiziert nach <b>ISO 9001 · 14001 · 50001</b></span>
          </div>
          <h1>PP-R/PP-RCT-Rohrsysteme,<br /><span className="grad">die Generationen halten.</span></h1>
          <p className="kl-hero-sub">Rohre und Formteile für Trinkwasser, Heizung und Industrie — von d20 bis d630. Entwickelt und gefertigt unter einem zertifizierten Managementsystem, verlässlich seit Jahrzehnten in Partnerschaft mit KESSEL.</p>
          <div className="kl-hero-ctas">
            <a className="kl-btn primary" href="#kontakt">Projekt anfragen<LIcons.Arrow size={18} /></a>
            <a className="kl-btn outline" href="#produkt">Produktsystem ansehen</a>
          </div>
          <div className="kl-hero-trust">
            <div className="item"><LIcons.Check size={16} />PP-R &amp; PP-RCT</div>
            <div className="item"><LIcons.Check size={16} />d20–d630 mm</div>
            <div className="item"><LIcons.Check size={16} />SDR 6–17</div>
            <div className="item"><LIcons.Check size={16} />Partner von KESSEL</div>
          </div>
        </div>
        <div className="kl-hero-visual">
          <PipeDiagram />
          <div className="kl-hero-visual-card">
            <div className="dot"><LIcons.Bolt size={20} /></div>
            <div>
              <div className="meta">Systemdaten</div>
              <div className="title">SDR 11 · PN 20 · 70 °C Dauerbetrieb</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- stats band ---------- */
function StatsBand({ glow }) {
  return (
    <section className="kl-band kl-stats">
      <div className="kl-band-glow" style={{ opacity: glow / 100 }}></div>
      <div className="kl-container kl-stats-grid">
        <div><div className="kl-stat-num">d20–630</div><div className="kl-stat-label">Nennweitenbereich (mm)</div></div>
        <div><div className="kl-stat-num">SDR 6–17</div><div className="kl-stat-label">verfügbare Druckstufen</div></div>
        <div><div className="kl-stat-num">3×</div><div className="kl-stat-label">ISO-Zertifizierungen (9001·14001·50001)</div></div>
        <div><div className="kl-stat-num">Jahrzehnte</div><div className="kl-stat-label">Partnerschaft mit KESSEL</div></div>
      </div>
    </section>
  );
}

/* ---------- product / layer section ---------- */
function ProductSection() {
  const layers = [
    { name: 'PP-RCT Außenschicht', spec: 'UV-stabilisiert', tt: 1 },
    { name: 'Faserverstärkter Kern', spec: 'Glasfaser-PP · formstabil', tt: 2 },
    { name: 'PP-RCT Innenschicht', spec: 'Trinkwassertauglich', tt: 3 },
  ];
  return (
    <section className="kl-section" id="produkt">
      <div className="kl-container">
        <div className="kl-section-head">
          <div className="kl-eyebrow">Produktsystem</div>
          <h2 className="kl-section-title">Aufbau eines PP-RCT-Mehrschichtrohrs.</h2>
          <p className="kl-section-lead">Mono- und mehrschichtige, glasfaserverstärkte Rohre — konstruiert für Formstabilität bei hohen Temperaturen und geringer Längenausdehnung.</p>
        </div>
        <div className="kl-layer-card">
          <div className="kl-layer-diagram">
            {layers.map((l, i) => (
              <div className="kl-layer-row" data-l={i + 1} key={l.name}>
                <span className="idx">{i + 1}</span>
                <span className="tt"><b>{l.name}</b><span>{l.spec}</span></span>
              </div>
            ))}
          </div>
          <div className="kl-layer-legend">
            <p>Die glasfaserverstärkte Mittelschicht reduziert die Wärmeausdehnung deutlich gegenüber PP-R-Monoschichtrohren und ermöglicht größere Abstände zwischen Rohrschellen.</p>
            <div className="specs">
              <span className="kl-spec-chip">PN 10–20</span>
              <span className="kl-spec-chip">70 °C Dauerbetrieb</span>
              <span className="kl-spec-chip">d20–d630 mm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- compliance + range bento ---------- */
function ComplianceAndRange() {
  const rows = [
    ['ISO 9001:2015', 'Qualitätsmanagement'],
    ['ISO 14001:2015', 'Umweltmanagement'],
    ['ISO 50001:2018', 'Energiemanagement'],
    ['GENAU-System', 'Integriertes Managementsystem'],
  ];
  const sdrs = ['SDR 6', 'SDR 7.4', 'SDR 9', 'SDR 11', 'SDR 17'];
  return (
    <section className="kl-section" id="compliance" style={{ paddingTop: 0 }}>
      <div className="kl-container">
        <div className="kl-bento">
          <div className="kl-card">
            <div className="kl-eyebrow">Qualität &amp; Compliance</div>
            <div className="kl-comply-list" style={{ marginTop: 8 }}>
              {rows.map(([k, v]) => (
                <div className="kl-comply-row" key={k}><LIcons.Check size={18} /><span><b>{k}</b> — {v}</span></div>
              ))}
            </div>
          </div>
          <div className="kl-card" id="sortiment">
            <div className="kl-eyebrow">Nennweiten &amp; Druckstufen</div>
            <div className="kl-range-scale"></div>
            <div className="kl-range-marks"><span>d20</span><span>d630</span></div>
            <div className="kl-chips-wrap">{sdrs.map((s) => <span className="kl-chip-pill" key={s}>{s}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */
function CtaBand({ glow }) {
  return (
    <section className="kl-band kl-cta" id="kontakt">
      <div className="kl-band-glow" style={{ opacity: glow / 100 }}></div>
      <div className="kl-container kl-cta-inner">
        <div>
          <h2 className="kl-cta-title">d20 bis d630. Ein Anruf genügt.</h2>
          <p className="kl-cta-sub">Vom Rohbau bis zur Übergabe liefert Ihr K-Aqua-Team Systemkomponenten, Prüfprotokolle und technische Beratung — abgestimmt auf jede Baustelle.</p>
        </div>
        <div className="kl-cta-actions">
          <a className="kl-btn primary" href="#" style={{ height: 58, fontSize: 17 }}>Projekt anfragen<LIcons.Arrow size={19} /></a>
          <a className="kl-btn ghost" href="#">Produktkatalog laden (PDF)</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="kl-footer">
      <div className="kl-band-glow"></div>
      <div className="kl-container kl-footer-top">
        <div>
          <LogoLight height={32} dark />
          <p className="kl-footer-slogan">K-Aqua — Leading in Water Supply. PP-R/PP-RCT-Rohrsysteme der KWT GmbH.</p>
        </div>
        <div className="kl-footer-col">
          <h5>Produkte</h5>
          <a href="#">Rohre</a>
          <a href="#">Formteile</a>
          <a href="#">Armaturen</a>
          <a href="#">Schweißtechnik</a>
        </div>
        <div className="kl-footer-col">
          <h5>Unternehmen</h5>
          <a href="#">Über KWT</a>
          <a href="#">Qualität</a>
          <a href="#">Referenzen</a>
          <a href="#">Karriere</a>
        </div>
        <div className="kl-footer-col">
          <h5>Kontakt</h5>
          <a href="#">Anfrage senden</a>
          <a href="#">Standorte</a>
          <a href="#">Impressum</a>
        </div>
      </div>
      <div className="kl-container kl-footer-bottom">
        <div>© 2026 KWT GmbH · K-Aqua</div>
        <div>PP-R/PP-RCT-Systeme für Trinkwasser, Heizung und Industrie</div>
      </div>
    </footer>
  );
}

Object.assign(window, { LIcons, LogoLight, PipeDiagram, Nav, Hero, StatsBand, ProductSection, ComplianceAndRange, CtaBand, Footer });
