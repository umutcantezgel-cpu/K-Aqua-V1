// K-Aqua ENTERPRISE.CORE — page shell (top bar, hero, closing strip, app
// root + tweaks wiring). Depends on kaqua-ui.jsx, tweaks-panel.jsx and
// kaqua-ent-modules.jsx being loaded first.
const { useState, useEffect } = React;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function TopBar() {
  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(clock.getHours()).padStart(2, '0');
  const mm = String(clock.getMinutes()).padStart(2, '0');
  const ss = String(clock.getSeconds()).padStart(2, '0');
  return (
    <header className="ent-topbar">
      <div className="ent-topbar-brand">
        <KAquaLogo height={26} />
        <span className="ent-topbar-tag">ENTERPRISE.CORE — CONCEPT V1</span>
      </div>
      <div className="ent-topbar-right">
        <span className="stat"><span className="ent-status-dot"></span> ALL SYSTEMS NOMINAL</span>
        <span className="clk">{hh}:{mm}:{ss}</span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="ent-hero">
      <span className="ent-eyebrow"><span className="ent-status-dot"></span>K-Aqua // Neo-Tech Design Language</span>
      <h1 className="ent-hero-title">Jedes Rohr ein Datenpunkt. <em>Jede Zahl ein Beweis.</em></h1>
      <p className="ent-hero-lead">PP-R/PP-RCT-Rohrsysteme für Trinkwasser, d20 bis d630 — entwickelt, geprüft und überwacht mit der Präzision einer Leitwarte.</p>
      <div className="ent-hero-specs">
        <span className="ent-chip"><b>d20–d630</b>&nbsp;Nennweitenbereich</span>
        <span className="ent-chip"><b>SDR 6–17</b>&nbsp;Druckstufen</span>
        <span className="ent-chip"><b>ISO 9001 · 14001 · 50001</b>&nbsp;zertifiziert</span>
      </div>
    </section>
  );
}

function ClosingStrip() {
  return (
    <footer className="ent-closing">
      <span>KWT GmbH — K-Aqua // Leading in Water Supply</span>
      <span>ENTERPRISE.CORE — Design-Konzept, nicht die Live-Website</span>
    </footer>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "glow": 100,
  "accent": "balanced",
  "grid": true,
  "pulse": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <div className="ent-page" data-accent={t.accent} style={{ '--ent-glow-mix': t.glow / 100 }}>
      <div className="ent-bg-glow" aria-hidden="true">
        <div className="ent-blob ent-blob--v1"></div>
        <div className="ent-blob ent-blob--a1"></div>
        <div className="ent-blob ent-blob--v2"></div>
      </div>
      <div className="ent-bg-grid" aria-hidden="true" style={{ opacity: t.grid ? 1 : 0 }}></div>

      <TopBar />
      <Hero />

      <div className="ent-bento">
        <TelemetryCard />
        <ComplianceTile />
        <RangeTile />
        <MaterialScanner />
      </div>

      <CommandCenter pulse={t.pulse} />
      <ClosingStrip />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphäre" />
        <TweakSlider label="Glow-Intensität" value={t.glow} min={40} max={160} step={5} unit="%" onChange={(v) => setTweak('glow', v)} />
        <TweakRadio label="Akzent" value={t.accent}
          options={[{ value: 'violet', label: 'Violet' }, { value: 'balanced', label: 'Balanced' }, { value: 'aqua', label: 'Aqua' }]}
          onChange={(v) => setTweak('accent', v)} />
        <TweakSection label="Effekte" />
        <TweakToggle label="Blueprint-Raster" value={t.grid} onChange={(v) => setTweak('grid', v)} />
        <TweakToggle label="Command-Pulse" value={t.pulse} onChange={(v) => setTweak('pulse', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
