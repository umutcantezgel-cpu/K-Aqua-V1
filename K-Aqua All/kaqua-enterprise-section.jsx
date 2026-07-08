// K-Aqua — Enterprise Section (production build). Fuses the strongest
// pieces from the visual-exploration round (live telemetry card, material
// layer diagram, compliance + range tiles, tokenized reference globe) into
// the real component system: kaqua-components.css classes, kaqua-tokens.css
// tokens, usePageL i18n. Works in light AND OLED dark theme automatically —
// no hardcoded colors, no separate design system.
const { useState: useES, useEffect: useEE, useRef: useER } = React;

function useJitterE(base, amp) {
  const [v, setV] = useES(base);
  useEE(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setV(base + (Math.random() * 2 - 1) * amp), 1800);
    return () => clearInterval(id);
  }, [base, amp]);
  return v;
}

function EnterpriseTelemetry({ L }) {
  const instant = useJitterE(1.99, 0.045);
  return (
    <BentoCard style={{ height: '100%', gap: 'var(--sp-6)' }}>
      <div className="k-tele-metrics">
        <div className="k-tele-metric">
          <span className="k-tele-label">{L.pressureLabel}</span>
          <div className="k-tele-num-row"><span className="k-tele-num">2.0</span><span className="k-tele-unit">MPa</span></div>
          <span className="k-tele-live"><span className="dot"></span>{instant.toFixed(2)} MPa live</span>
        </div>
        <div className="k-tele-metric">
          <span className="k-tele-label">{L.tempLabel}</span>
          <div className="k-tele-num-row"><span className="k-tele-num">70</span><span className="k-tele-unit">°C</span></div>
          <span className="k-tele-live"><span className="dot"></span>PN20 · Dauerbetrieb</span>
        </div>
      </div>
      <div className="k-flow" aria-hidden="true"></div>
      <div className="k-tele-meta">
        {L.telemetryMeta.map(([k, v]) => (
          <div className="k-tele-meta-row" key={k}><span className="k-tele-meta-k">{k}</span><span className="k-tele-meta-v">{v}</span></div>
        ))}
      </div>
    </BentoCard>
  );
}

function EnterpriseLayers({ L }) {
  return (
    <BentoCard style={{ height: '100%' }}>
      <div className="k-icon-chip"><Icons.Layers size={24} /></div>
      <h3 className="k-h3">{L.layerTitle}</h3>
      <p className="k-body">{L.layerLead}</p>
      <div className="k-layers" tabIndex={0} role="group" aria-label={L.layerTitle}>
        {L.layers.map((layer, i) => (
          <div className="k-layer-row" data-l={i + 1} key={layer.t}>
            <span className="idx">{i + 1}</span>
            <span className="tt"><b>{layer.t}</b><span>{layer.d}</span></span>
          </div>
        ))}
      </div>
    </BentoCard>
  );
}

function EnterpriseCompliance({ L }) {
  return (
    <BentoCard tint style={{ height: '100%' }}>
      <div className="k-icon-chip"><Icons.Shield size={24} /></div>
      <h3 className="k-h3">{L.complyTitle}</h3>
      <div className="k-comply-list">
        {L.comply.map(([k, v]) => (
          <div className="k-comply-row" key={k}><Icons.Check size={17} /><span><b>{k}</b> — {v}</span></div>
        ))}
      </div>
    </BentoCard>
  );
}

function EnterpriseRange({ L }) {
  const sdrs = ['SDR 6', 'SDR 7,4', 'SDR 9', 'SDR 11', 'SDR 17'];
  return (
    <BentoCard style={{ height: '100%' }}>
      <div className="k-icon-chip"><Icons.Ruler size={24} /></div>
      <h3 className="k-h3">{L.rangeTitle}</h3>
      <div className="k-range-scale"></div>
      <div className="k-range-marks"><span>d20</span><span>d630</span></div>
      <div className="k-range-chips">{sdrs.map((s) => <span className="k-range-chip" key={s}>{s}</span>)}</div>
    </BentoCard>
  );
}

function EnterpriseNetwork({ L, go }) {
  const canvasRef = useER(null);
  useEE(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: 320, interactive: true, whirl: false, speed: 0.005,
      markers: [
        { lat: 50.49, lon: 8.51, label: 'Waldsolms' },
        { lat: 25.2, lon: 55.3 }, { lat: 1.35, lon: 103.8 }, { lat: 51.5, lon: -0.1 },
      ],
    });
    return () => globe.stop();
  }, []);
  return (
    <BentoCard style={{ height: '100%' }}>
      <div className="k-network">
        <div>
          <div className="k-icon-chip"><Icons.Globe size={24} /></div>
          <h3 className="k-h3" style={{ marginTop: 'var(--sp-4)' }}>{L.networkTitle}</h3>
          <p className="k-body" style={{ marginTop: 'var(--sp-2)' }}>{L.networkText}</p>
          <button type="button" className="k-link" style={{ marginTop: 'var(--sp-4)' }} onClick={() => go('references')}>
            {L.networkCta} <Icons.ArrowRight size={16} />
          </button>
        </div>
        <div className="k-network-globe">
          <canvas ref={canvasRef} aria-label={L.networkTitle}></canvas>
          <span className="k-network-caption">Ziehen zum Drehen</span>
        </div>
      </div>
    </BentoCard>
  );
}

function EnterpriseSection({ go }) {
  const X = usePageL('homex');
  const L = X.enterprise;
  if (!L) return null;
  return (
    <section className="k-section" id="enterprise" data-screen-label="Home: Enterprise">
      <div className="k-container">
        <SectionHead eyebrow={L.eyebrow}
          title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
          lead={L.lead} />
        <div className="k-bento">
          <Reveal style={{ gridColumn: 'span 4' }}><EnterpriseTelemetry L={L} /></Reveal>
          <Reveal delay={80} style={{ gridColumn: 'span 2' }}><EnterpriseCompliance L={L} /></Reveal>
          <Reveal delay={120} style={{ gridColumn: 'span 4' }}><EnterpriseLayers L={L} /></Reveal>
          <Reveal delay={160} style={{ gridColumn: 'span 2' }}><EnterpriseRange L={L} /></Reveal>
          <Reveal delay={200} style={{ gridColumn: 'span 6' }}><EnterpriseNetwork L={L} go={go} /></Reveal>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { EnterpriseSection });
