/* K-Aqua CO2 Dashboard — Module: Break-even-Karte, interaktive Äquivalente,
   Sensitivitäts-Tornado, Regionen-Kacheln, Lebenszyklus-Feed, Material-Dossier,
   Onboarding-Coachmarks. */
const { useState: uMS, useMemo: uMM, useEffect: uME } = React;

function BreakEvenCard({ breakEven, savings, oppLabel, horizon, diffPoints, fmt }) {
  const anim = useTweenedValue(Math.max(0, savings), 550);
  return (
    <div className="co2-mod">
      <div className="co2-mod-head"><span>Break-even</span><Icons.Check size={14} /></div>
      <div className="co2-mod-big">{breakEven ? (breakEven.year === 0 ? 'Vom ersten Tag an vorn' : `Ab Jahr ${breakEven.year} vorn`) : `Kein Vorsprung in ${horizon} J.`}</div>
      <MiniSparkline points={diffPoints} color="var(--primary)" width={190} height={30}></MiniSparkline>
      <p className="co2-mod-note">Vorsprung nach {horizon} Jahren vs. {oppLabel}: <strong>{fmt(anim)}</strong></p>
    </div>
  );
}

function EquivalentsCard({ savings }) {
  const [idx, setIdx] = uMS(0);
  const eq = CO2_EQUIVALENTS[idx % CO2_EQUIVALENTS.length];
  const EqIcon = Icons[eq.icon] || Icons.Leaf;
  const val = useTweenedValue(Math.max(0, savings / eq.per), 550);
  return (
    <button type="button" className="co2-mod is-btn" onClick={() => setIdx(idx + 1)} title="Klick wechselt die Vergleichseinheit">
      <div className="co2-mod-head"><span>Äquivalent · {idx % CO2_EQUIVALENTS.length + 1}/{CO2_EQUIVALENTS.length}</span><EqIcon size={14} /></div>
      <div className="co2-eq-val">{Math.round(val).toLocaleString('de-DE')} <small>{eq.unit}</small></div>
      <div className="co2-mod-big is-sm">{eq.label}</div>
      <p className="co2-mod-note">{eq.note}</p>
    </button>
  );
}

const CO2_SENS_DEFS = [
  { id: 'length', label: 'Trassenlänge', vary: (c, f) => ({ ...c, lengthM: c.lengthM * f }) },
  { id: 'd', label: 'Nennweite', vary: (c, f) => ({ ...c, d: c.d * f }) },
  { id: 'flow', label: 'Durchfluss', vary: (c, f) => ({ ...c, flowLps: c.flowLps * f }) },
  { id: 'region', label: 'Strommix', vary: (c, f) => ({ ...c, region: { ...c.region, gridIntensity: c.region.gridIntensity * f } }) },
  { id: 'transport', label: 'Transportweg', vary: (c, f) => ({ ...c, transportKm: c.transportKm * f }) },
];
function SensitivityCard({ ctx, opponentId, horizon, onFocusField, fmt }) {
  const data = uMM(() => {
    const ka = CO2_MATERIALS[0];
    const opM = CO2_MATERIALS.find((m) => m.id === opponentId) || CO2_MATERIALS[3];
    const sav = (c) => computeFullResult(opM, c, horizon).grandTotal - computeFullResult(ka, c, horizon).grandTotal;
    const base = sav(ctx);
    const rows = CO2_SENS_DEFS.map((df) => {
      const a = sav(df.vary(ctx, 0.8)), b = sav(df.vary(ctx, 1.2));
      return { ...df, lo: Math.min(a, b), hi: Math.max(a, b), span: Math.abs(b - a) };
    }).sort((x, y) => y.span - x.span);
    const gmin = Math.min(base, ...rows.map((r) => r.lo));
    const gmax = Math.max(base, ...rows.map((r) => r.hi));
    return { base, rows, gmin, gmax };
  }, [ctx, opponentId, horizon]);
  const pos = (v) => ((v - data.gmin) / Math.max(1e-9, data.gmax - data.gmin)) * 100;
  return (
    <div className="co2-mod">
      <div className="co2-mod-head"><span>Sensitivität · ±20 %</span><Icons.Ruler size={14} /></div>
      <div className="co2-torn">
        {data.rows.map((r) => (
          <button type="button" className="co2-torn-row" key={r.id} onClick={() => onFocusField(r.id)} title={`Wirkung auf die Ersparnis: ${fmt(r.lo)} bis ${fmt(r.hi)} — Klick springt zum Regler`}>
            <span>{r.label}</span>
            <span className="co2-torn-track">
              <i className="co2-torn-seg" style={{ left: `${pos(r.lo)}%`, width: `${Math.max(2, pos(r.hi) - pos(r.lo))}%` }}></i>
              <i className="co2-torn-base" style={{ left: `${pos(data.base)}%` }}></i>
            </span>
          </button>
        ))}
      </div>
      <p className="co2-mod-note">Größter Hebel zuerst — Klick fokussiert den Regler.</p>
    </div>
  );
}

function RegionTiles({ ctx, opponentId, horizon, currentId, onPick, fmt }) {
  const tiles = uMM(() => CO2_REGIONS.map((rg) => {
    const c = { ...ctx, region: rg };
    const ka = computeFullResult(CO2_MATERIALS[0], c, horizon);
    const opM = CO2_MATERIALS.find((m) => m.id === opponentId) || CO2_MATERIALS[3];
    const op = computeFullResult(opM, c, horizon);
    return { rg, savings: op.grandTotal - ka.grandTotal, diff: ka.points.map((p, i) => ({ value: op.points[i].value - p.value })) };
  }), [ctx, opponentId, horizon]);
  return (
    <div className="co2-regions">
      {tiles.map((t) => (
        <button key={t.rg.id} type="button" className={`co2-region-tile ${currentId === t.rg.id ? 'is-active' : ''}`} onClick={() => onPick(t.rg.id)} title="Klick übernimmt die Region">
          <span>{t.rg.label}</span>
          <strong>{fmt(Math.max(0, t.savings))}</strong>
          <MiniSparkline points={t.diff} color="var(--accent-strong)" width={110} height={20}></MiniSparkline>
        </button>
      ))}
    </div>
  );
}

function LifecycleFeed({ events, horizon, onHoverYear, fmt }) {
  return (
    <div className="co2-feed" onMouseLeave={() => onHoverYear(null)}>
      {events.map((ev, i) => (
        <div className="co2-feed-row" key={i} onMouseEnter={() => onHoverYear(ev.year)}>
          <span className="co2-feed-year">J {ev.year}</span>
          <span className="co2-feed-label"><i style={{ background: ev.color }}></i>{ev.materialLabel} · {ev.label}</span>
          <strong>{fmt(ev.value)}</strong>
        </div>
      ))}
      <div className="co2-feed-row is-end"><span className="co2-feed-year">J {horizon}</span><span className="co2-feed-label">Ende Betrachtungszeitraum</span><strong></strong></div>
    </div>
  );
}

function MaterialDrawer({ result, horizon, onClose, fmt }) {
  uME(() => {
    function onEsc(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);
  const m = result.material;
  const total = Math.max(1, result.grandTotal);
  const segs = CO2_PHASES.map((p) => ({ p, v: Math.max(0, result.phaseValues[p.id] || 0) })).filter((s) => s.v > 0);
  const C = 2 * Math.PI * 44;
  let acc = 0;
  const aging = [];
  for (let y = 0; y <= 40; y += 2) aging.push({ value: co2PressureLossPaPerM(m, 110, 11, 3, y).paPerM });
  const facts = [
    ['Dichte', m.density.toLocaleString('de-DE') + ' g/cm³'],
    ['Herstellung A1–3 (EPD)', m.productionFactor.toLocaleString('de-DE') + ' kg CO₂e/kg'],
    ['Wanddicke bei DN 110', co2WallMm(m, 110, 11).toLocaleString('de-DE', { maximumFractionDigits: 1 }) + ' mm' + (m.wallMode === 'sdr' ? ' (SDR 11)' : ' (Systemreihe)')],
    ['Masse bei DN 110', pipeMassKg(m, 110, 11, 1).toLocaleString('de-DE', { maximumFractionDigits: 2 }) + ' kg/m'],
    ['Installationslast', m.installFactor.toLocaleString('de-DE') + ' kg CO₂e/m'],
    ['Rauheit neu (k₀)', m.roughnessMm.toLocaleString('de-DE') + ' mm'],
    ['Rauheitszuwachs', m.roughnessGrowthMmPerYr.toLocaleString('de-DE') + ' mm/Jahr'],
    ['Nutzungsdauer (Ansatz)', m.lifespanYears + ' Jahre'],
    ['Recyclingquote', Math.round(m.recyclingRate * 100) + ' %'],
    ['Modul-D-Gutschrift', Math.round(m.recyclingCreditShare * 100) + ' % der Produktionslast'],
  ];
  return (
    <React.Fragment>
      <div className="co2-drawer-backdrop" onClick={onClose}></div>
      <aside className="co2-drawer" role="dialog" aria-label={`Material-Dossier ${m.label}`}>
        <div className="co2-drawer-head">
          <span className="co2-drawer-title"><i style={{ background: m.color }}></i>{m.label}</span>
          <button type="button" className="co2-icon-btn" onClick={onClose} aria-label="Dossier schließen"><Icons.X size={16} /></button>
        </div>
        <div className="co2-donut-wrap">
          <svg width="110" height="110" viewBox="0 0 110 110" aria-hidden="true">
            <circle cx="55" cy="55" r="44" fill="none" stroke="var(--background-subtle)" strokeWidth="14"></circle>
            {segs.map((s) => {
              const frac = s.v / total;
              const el = <circle key={s.p.id} cx="55" cy="55" r="44" fill="none" stroke={s.p.color} strokeWidth="14" strokeDasharray={`${frac * C} ${C}`} strokeDashoffset={-acc * C} transform="rotate(-90 55 55)"></circle>;
              acc += frac;
              return el;
            })}
          </svg>
          <div className="co2-donut-side">
            <strong>{fmt(result.grandTotal)}</strong>
            <span>über {horizon} Jahre · {result.replacements}× Ersatz</span>
          </div>
        </div>
        <div className="co2-drawer-sec">Modellfaktoren</div>
        <div className="co2-facts">{facts.map((f) => <React.Fragment key={f[0]}><span>{f[0]}</span><strong>{f[1]}</strong></React.Fragment>)}</div>
        <div className="co2-drawer-sec">Druckverlust-Verlauf über 40 Jahre (DN 110, 3 l/s)</div>
        <MiniSparkline points={aging} color={m.color} width={340} height={40}></MiniSparkline>
        <p className="co2-mod-note">Pa/m nach Darcy-Weisbach/Swamee-Jain mit alternder Rauheit k(t) — Kunststoff bleibt glatt, Metall inkrustiert. {CO2_DISCLAIMER}</p>
      </aside>
    </React.Fragment>
  );
}

const CO2_COACH_STEPS = [
  { t: 'Fadenkreuz', d: 'Mit Maus, Finger oder Pfeiltasten über die Kurve fahren — Klick oder Enter fixiert das Wertefenster.' },
  { t: 'Zoomen', d: 'Zeitfenster in der Mini-Map ziehen, im Chart einen Bereich aufziehen oder mit dem Mausrad zoomen. Doppelklick setzt zurück.' },
  { t: 'Szenarien', d: 'Im Tab „Szenarien" den aktuellen Stand einfrieren, als Overlay vergleichen — und per Link teilen.' },
];
function Co2Coachmarks() {
  const [step, setStep] = uMS(() => {
    try { return localStorage.getItem('kaqua-co2-coach-v1') ? null : 0; } catch (e) { return null; }
  });
  if (step == null || step >= CO2_COACH_STEPS.length) return null;
  const s = CO2_COACH_STEPS[step];
  function next() {
    if (step + 1 >= CO2_COACH_STEPS.length) { try { localStorage.setItem('kaqua-co2-coach-v1', '1'); } catch (e) {} setStep(null); }
    else setStep(step + 1);
  }
  function done() { try { localStorage.setItem('kaqua-co2-coach-v1', '1'); } catch (e) {} setStep(null); }
  return (
    <div className="co2-coach" role="note">
      <strong>{step + 1}/3 · {s.t}</strong>
      <p>{s.d}</p>
      <div className="co2-coach-actions">
        <button type="button" className="co2-mini-btn" onClick={done}>Überspringen</button>
        <button type="button" className="co2-mini-btn is-on" onClick={next}>{step + 1 >= CO2_COACH_STEPS.length ? 'Fertig' : 'Weiter'}</button>
      </div>
    </div>
  );
}

Object.assign(window, { BreakEvenCard, EquivalentsCard, SensitivityCard, RegionTiles, LifecycleFeed, MaterialDrawer, Co2Coachmarks });
