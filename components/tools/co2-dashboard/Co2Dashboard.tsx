'use client';
import React, { useState as useSD, useMemo as useMemoD, useEffect as useED } from 'react';
import { Icons, KAquaLogo } from './Co2UI';
import { useTweenedValue } from '../../../lib/co2-anim';
import { Co2Chart, MiniSparkline } from './Co2ChartCore';
import { BreakEvenCard, EquivalentsCard, SensitivityCard, RegionTiles, LifecycleFeed, MaterialDrawer, Co2Coachmarks } from './Co2DashModules';
import { Co2Breakdown } from './Co2DashBreakdown';
import { Co2Scenarios } from './Co2DashScenarios';
import { Co2Portfolio } from './Co2DashPortfolio';
import { Co2Report } from './Co2DashReport';
import { useTheme } from 'next-themes';
import { 
  co2Trees, co2CarKm, co2Fmt,
  co2PressureLossPaPerM, co2LifespanGuide, computeFullResult, 
  computePortfolioResult, findBreakEven, CO2_PRESETS, CO2_DIAMETERS, 
  CO2_SDR_CLASSES, CO2_MATERIALS, CO2_REGIONS, CO2_OPERATING_MODES, 
  CO2_SEO_COPY, CO2_SOURCES, CO2_DISCLAIMER, CO2_PHASES 
} from '../../../lib/co2-data';
import { co2EncodeHash, co2DecodeHash } from '../../../lib/co2-share';

const CO2_INIT = ((typeof window !== 'undefined' && co2DecodeHash) ? co2DecodeHash() : {}) || {};
const co2Pk = (k: string, d: any) => (CO2_INIT[k] == null ? d : CO2_INIT[k]);

function RailRow({ result, kaquaTotal, onOpen }: any) {
  const val = useTweenedValue(result.grandTotal, 500);
  const deltaVal = useTweenedValue(result.grandTotal - kaquaTotal, 500);
  const isKaqua = result.material.id === 'kaqua';
  return (
    <button type="button" className="dash-rail-row" onClick={onOpen} title="Klick öffnet das Material-Dossier">
      <div className="dash-rail-row-top"><i style={{ background: result.material.color }}></i><span>{result.material.label}</span><Icons.ChevronDown size={13} /></div>
      <MiniSparkline points={result.points} color={result.material.color} width={64} height={26}></MiniSparkline>
      <div className="dash-rail-row-val">
        <strong>{co2Fmt(val)}</strong>
        {!isKaqua ? <small className="dash-rail-delta">+{co2Fmt(deltaVal)}</small> : <small className="dash-rail-delta is-ref">Referenz</small>}
      </div>
    </button>
  );
}
function Field({ label, children, fid }: any) {
  return (<div className="dash-field" id={fid ? `co2-field-${fid}` : undefined}><div className="dash-field-label">{label}</div>{children}</div>);
}
function ChipGroup({ options, value, onChange, render }: any) {
  return (
    <div className="k-chips">
      {options.map((opt: any) => {
        const id = opt && opt.id != null ? opt.id : opt;
        return (
          <button key={id} type="button" className={`k-filter-chip ${value === id ? 'is-on' : ''}`}
            aria-pressed={value === id} onClick={() => onChange(id)}>
            {render ? render(opt) : String(opt)}
          </button>
        );
      })}
    </div>
  );
}
function ThemeToggle({ theme, onToggle }: any) {
  return (
    <button type="button" className="dash-theme-btn" onClick={onToggle} aria-label="Theme wechseln">
      {theme === 'dark' ? <Icons.Sun size={17} /> : <Icons.Moon size={17} />}
    </button>
  );
}
function ShareButton() {
  const [ok, setOk] = useSD(false);
  return (
    <button type="button" className="dash-theme-btn" title="Link mit aktuellem Zustand kopieren"
      onClick={() => { try { navigator.clipboard.writeText(location.href).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); }); } catch (e) {} }}>
      {ok ? <Icons.Check size={17} /> : <Icons.ArrowUpRight size={17} />}
    </button>
  );
}

function MethodikTab() {
  const c = CO2_SEO_COPY;
  return (
    <div className="dash-methodik">
      <div className="dash-methodik-block">
        <span className="dash-eyebrow">{c.methEyebrow}</span>
        <h2 className="k-h3">{c.methTitle}</h2>
        <p className="k-body">{c.methLead}</p>
        <div className="dash-accordion">
          {c.meth.map((m) => <details key={m.t}><summary>{m.t}</summary><p>{m.d}</p></details>)}
          <details><summary>Klimapfad des Strommixes</summary><p>Optional sinkt die Netz-Intensität der gewählten Region um 2,5 % pro Jahr (Untergrenze 40 g CO₂e/kWh) — angelehnt an den UBA-Trend der letzten Jahre (379 → 353 → 344 g). Der Betrieb späterer Jahre wird dadurch leichter gewichtet als mit statischem Strommix.</p></details>
          <details><summary>Formteil- &amp; Verschnitt-Zuschlag</summary><p>Der Zuschlag erhöht die Rohrmasse pauschal um den eingestellten Prozentsatz für Fittings, Bögen und Verschnitt — er wirkt proportional auf Herstellung, Fertigung, Transport und Ersatzzyklen.</p></details>
          <details><summary>CO₂-Preis-Kopplung</summary><p>Die vermiedene Menge wird mit dem eingestellten CO₂-Preis (€/t) bewertet — eine Kalkulationshilfe, kein Marktpreisversprechen.</p></details>
        </div>
      </div>
      <div className="dash-methodik-block">
        <span className="dash-eyebrow">Datenquellen</span>
        <h2 className="k-h3">Jeder Faktor hat eine Quelle.</h2>
        <p className="k-body">Stand Juli 2026 — produktspezifische Typ-III-EPDs ersetzen die Branchenwerte, sobald sie vorliegen.</p>
        <div className="dash-accordion">
          {CO2_SOURCES.map((s) => <details key={s.t}><summary>{s.t}</summary><p>{s.d}</p></details>)}
        </div>
      </div>
      <div className="dash-methodik-block">
        <span className="dash-eyebrow">{c.certEyebrow}</span>
        <h2 className="k-h3">{c.certTitle}</h2>
        <p className="k-body">{c.certLead}</p>
        <div className="dash-accordion">
          {c.certs.map((x) => <details key={x.t}><summary>{x.t}</summary><p>{x.d}</p></details>)}
        </div>
      </div>
      <div className="dash-methodik-block">
        <h2 className="k-h3">{c.scopeTitle}</h2>
        <p className="k-body">{c.scopeText}</p>
      </div>
    </div>
  );
}
function SeoEngine() {
  const c = CO2_SEO_COPY;
  const c2s = CO2_SOURCES;
  return (
    <article className="sr-only-co2">
      <h1>{c.h1}</h1><p>{c.intro}</p>
      <section><h2>{c.methTitle}</h2><p>{c.methLead}</p>{c.meth.map((m) => (<React.Fragment key={m.t}><h3>{m.t}</h3><p>{m.d}</p></React.Fragment>))}</section>
      <section><h2>{c.certTitle}</h2><p>{c.certLead}</p>{c.certs.map((x) => (<React.Fragment key={x.t}><h3>{x.t}</h3><p>{x.d}</p></React.Fragment>))}</section>
      <section><h2>{c.scopeTitle}</h2><p>{c.scopeText}</p></section>
      <section><h2>Datenquellen</h2>{c2s.map((s) => (<React.Fragment key={s.t}><h3>{s.t}</h3><p>{s.d}</p></React.Fragment>))}</section>
      <p>{c.closing}</p>
    </article>
  );
}

const CO2_TABS = [
  { id: 'overview', label: 'Rechner' },
  { id: 'analysis', label: 'Analyse' },
  { id: 'breakdown', label: 'Aufschlüsselung' },
  { id: 'scenarios', label: 'Szenarien' },
  { id: 'portfolio', label: 'Stränge' },
  { id: 'report', label: 'Bericht' },
  { id: 'methodik', label: 'Methodik' },
];

export default function Co2Dashboard() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  const [tab, setTab] = useSD('overview');
  const [lengthKm, setLengthKm] = useSD(co2Pk('l', 4));
  const [diameter, setDiameter] = useSD(co2Pk('d', 110));
  const [sdr, setSdr] = useSD(co2Pk('s', 11));
  const [opponentId, setOpponentId] = useSD(co2Pk('o', 'steel'));
  const [regionId, setRegionId] = useSD(co2Pk('r', 'de'));
  const [transportKm, setTransportKm] = useSD(co2Pk('t', 150));
  const [opModeId, setOpModeId] = useSD(co2Pk('m', 'cold'));
  const [flowLps, setFlowLps] = useSD(co2Pk('f', 3));
  const [oppLife, setOppLife] = useSD<any>(() => Object.assign({ pvc: 50, copper: 50, steel: 50 }, co2Pk('ls', {})));
  const [horizon, setHorizon] = useSD(co2Pk('h', 50));
  const [gridPath, setGridPath] = useSD(co2Pk('g', 'static'));
  const [fittingsPct, setFittingsPct] = useSD(co2Pk('fp', 0));
  const [co2Price, setCo2Price] = useSD(co2Pk('cp', 55));
  const [chartView, setChartView] = useSD(co2Pk('v', 'cum'));
  const [showBand, setShowBand] = useSD(!!co2Pk('b', 0));
  const [seriesMode, setSeriesMode] = useSD(co2Pk('sm', 'duel'));
  const [presetId, setPresetId] = useSD(null);
  const [scenarios, setScenarios] = useSD<any[]>(() => { try { return JSON.parse(localStorage.getItem('kaqua-co2-scenarios-v1') || '[]'); } catch (e) { return []; } });
  const [overlayIds, setOverlayIds] = useSD<string[]>([]);
  const [portfolioRows, setPortfolioRows] = useSD<any[]>(() => { try { return JSON.parse(localStorage.getItem('kaqua-co2-portfolio-v1') || '[]'); } catch (e) { return []; } });
  const [usePortfolio, setUsePortfolio] = useSD(false);
  const [drawerId, setDrawerId] = useSD(null);
  const [extHoverYear, setExtHoverYear] = useSD(null);

  useED(() => { try { localStorage.setItem('kaqua-co2-scenarios-v1', JSON.stringify(scenarios)); } catch (e) {} }, [scenarios]);
  useED(() => { try { localStorage.setItem('kaqua-co2-portfolio-v1', JSON.stringify(portfolioRows)); } catch (e) {} }, [portfolioRows]);
  useED(() => {
    const h = co2EncodeHash({ l: lengthKm, d: diameter, s: sdr, o: opponentId, r: regionId, t: transportKm, m: opModeId, f: flowLps, h: horizon, g: gridPath, fp: fittingsPct, cp: co2Price, v: chartView, b: showBand ? 1 : 0, sm: seriesMode, ls: oppLife });
    try { window.history.replaceState(null, '', h || window.location.pathname); } catch (e) {}
  }, [lengthKm, diameter, sdr, opponentId, regionId, transportKm, opModeId, flowLps, horizon, gridPath, fittingsPct, co2Price, chartView, showBand, seriesMode, oppLife]);

  const manual = (fn: any) => (v: any) => { fn(v); setPresetId(null); };
  function applyPreset(p: any) {
    setLengthKm(p.params.lengthKm); setDiameter(p.params.diameter); setSdr(p.params.sdr);
    setOpModeId(p.params.opModeId); setFlowLps(p.params.flowLps); setPresetId(p.id);
  }
  function applyParams(p: any) {
    setLengthKm(p.l == null ? 4 : p.l); setDiameter(p.d || 110); setSdr(p.s || 11); setOpponentId(p.o || 'steel');
    setRegionId(p.r || 'de'); setTransportKm(p.t == null ? 150 : p.t); setOpModeId(p.m || 'cold'); setFlowLps(p.f || 3);
    setGridPath(p.g || 'static'); setFittingsPct(p.fp == null ? 0 : p.fp); if (p.ls) setOppLife(Object.assign({ pvc: 50, copper: 50, steel: 50 }, p.ls)); setPresetId(null); setTab('overview');
  }
  function focusField(fid: string) {
    setTab('overview');
    const el = document.getElementById(`co2-field-${fid}`);
    if (!el) return;
    const sb = el.closest('.dash-sidebar');
    if (sb) sb.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top - sb.getBoundingClientRect().top + sb.scrollTop - 90), behavior: 'smooth' });
    el.classList.add('is-pulse');
    setTimeout(() => el.classList.remove('is-pulse'), 1600);
  }

  const region = CO2_REGIONS.find((r) => r.id === regionId) || CO2_REGIONS[0];
  const opMode = CO2_OPERATING_MODES.find((m) => m.id === opModeId) || CO2_OPERATING_MODES[0];
  const ctx = useMemoD(() => ({ d: diameter, sdr, lengthM: lengthKm * 1000, region, transportKm, opMode, flowLps, gridPath, fittingsPct, lifespans: oppLife }),
    [diameter, sdr, lengthKm, region, transportKm, opMode, flowLps, gridPath, fittingsPct, oppLife]);

  const allResults = useMemoD(() => {
    const active = usePortfolio ? portfolioRows.filter((r) => r.on) : [];
    if (active.length) {
      const list = active.map((r) => ({ ...ctx, d: r.d, sdr: r.sdr, lengthM: r.lengthKm * 1000 }));
      return CO2_MATERIALS.map((m) => computePortfolioResult(m, list, horizon));
    }
    return CO2_MATERIALS.map((m) => computeFullResult(m, ctx, horizon));
  }, [ctx, horizon, portfolioRows, usePortfolio]);
  const portfolioActive = usePortfolio && portfolioRows.some((r) => r.on);
  const kaquaResult = allResults[0];
  const opponentResult = allResults.find((r) => r.material.id === opponentId) || allResults[3];

  const savings = Math.max(0, opponentResult.grandTotal - kaquaResult.grandTotal);
  const euro = (savings / 1000) * co2Price;
  const animSavings = useTweenedValue(savings, 550);
  const animTrees = useTweenedValue(co2Trees(savings), 550);
  const animCarKm = useTweenedValue(co2CarKm(savings), 550);
  const animEuro = useTweenedValue(euro, 550);
  const animReplacements = useTweenedValue(opponentResult.replacements, 400);
  const breakEven = findBreakEven(kaquaResult.points, opponentResult.points);
  const diffPoints = useMemoD(() => kaquaResult.points.map((p: any, i: number) => ({ value: (opponentResult.points[i] ? opponentResult.points[i].value : 0) - p.value })), [kaquaResult, opponentResult]);

  const chartSeries = useMemoD(() => {
    if (seriesMode === 'all') return allResults.map((r) => ({ id: r.material.id, label: r.material.label, color: r.material.color, points: r.points, isOpp: r.material.id === opponentId }));
    return [
      { id: 'kaqua', label: kaquaResult.material.label, color: kaquaResult.material.color, points: kaquaResult.points },
      { id: opponentResult.material.id, label: opponentResult.material.label, color: opponentResult.material.color, points: opponentResult.points, isOpp: true },
    ];
  }, [allResults, seriesMode, opponentId]);
  const chartEvents = useMemoD(() => {
    const rs = seriesMode === 'all' ? allResults : [kaquaResult, opponentResult];
    return rs.flatMap((r) => r.events.filter((e: any) => e.type === 'replace').map((e: any) => ({ ...e, seriesId: r.material.id === 'kaqua' && seriesMode !== 'all' ? 'kaqua' : r.material.id, materialLabel: r.material.label, color: r.material.color })));
  }, [allResults, seriesMode, opponentId]);
  const feedEvents = useMemoD(() => [kaquaResult, opponentResult]
    .flatMap((r) => r.events.map((e: any) => ({ ...e, materialLabel: r.material.label, color: r.material.color })))
    .sort((a, b) => a.year - b.year || a.materialLabel.localeCompare(b.materialLabel)), [kaquaResult, opponentResult]);

  const overlaySeries = useMemoD(() => {
    const cols = ['oklch(0.68 0.09 90)', 'oklch(0.64 0.09 330)'];
    const out: any[] = [];
    overlayIds.forEach((id, k) => {
      const sc = scenarios.find((s) => s.id === id);
      if (!sc) return;
      const p = sc.params;
      const rg = CO2_REGIONS.find((r) => r.id === p.r) || CO2_REGIONS[0];
      const om = CO2_OPERATING_MODES.find((m) => m.id === p.m) || CO2_OPERATING_MODES[0];
      const c = { d: p.d, sdr: p.s, lengthM: p.l * 1000, region: rg, transportKm: p.t, opMode: om, flowLps: p.f, gridPath: p.g, fittingsPct: p.fp, lifespans: p.ls };
      const opM = CO2_MATERIALS.find((m) => m.id === p.o) || CO2_MATERIALS[3];
      out.push({ id: sc.id + '-ka', label: `${sc.name} · K-Aqua`, color: cols[k % 2], points: computeFullResult(CO2_MATERIALS[0], c, horizon).points });
      out.push({ id: sc.id + '-op', label: `${sc.name} · ${opM.label}`, color: cols[k % 2], points: computeFullResult(opM, c, horizon).points });
    });
    return out;
  }, [overlayIds, scenarios, horizon]);

  const paramsNow = { l: lengthKm, d: diameter, s: sdr, o: opponentId, r: regionId, t: transportKm, m: opModeId, f: flowLps, g: gridPath, fp: fittingsPct, ls: oppLife };
  function summarize(p: any) {
    const rg = CO2_REGIONS.find((r) => r.id === p.r) || CO2_REGIONS[0];
    const om = CO2_OPERATING_MODES.find((m) => m.id === p.m) || CO2_OPERATING_MODES[0];
    const c = { d: p.d, sdr: p.s, lengthM: p.l * 1000, region: rg, transportKm: p.t, opMode: om, flowLps: p.f, gridPath: p.g, fittingsPct: p.fp, lifespans: p.ls };
    const opM = CO2_MATERIALS.find((m) => m.id === p.o) || CO2_MATERIALS[3];
    return { savings: Math.max(0, computeFullResult(opM, c, horizon).grandTotal - computeFullResult(CO2_MATERIALS[0], c, horizon).grandTotal), oppLabel: opM.label };
  }
  function describe(p: any) {
    const rg = CO2_REGIONS.find((r) => r.id === p.r) || CO2_REGIONS[0];
    const om = CO2_OPERATING_MODES.find((m) => m.id === p.m) || CO2_OPERATING_MODES[0];
    return `${(p.l || 0).toLocaleString('de-DE')} km · DN ${p.d} · SDR ${String(p.s).replace('.', ',')} · ${rg.label} · ${om.label}${p.g === 'path' ? ' · Klimapfad' : ''}${p.fp ? ` · +${p.fp} % Formteile` : ''}`;
  }
  const metaCaption = `${lengthKm.toLocaleString('de-DE')} km · DN ${diameter} · SDR ${String(sdr).replace('.', ',')} · vs. ${opponentResult.material.label} · ${region.label} · ${horizon} Jahre`;
  const paramRows = [
    ['Trassenlänge', `${lengthKm.toLocaleString('de-DE', { maximumFractionDigits: 1 })} km`],
    ['Nennweite', `${diameter} mm`], ['SDR-Klasse', `SDR ${String(sdr).replace('.', ',')}`],
    ['Vergleich gegen', opponentResult.material.label], ['Nutzungsdauer Vergleich', `${oppLife[opponentId] || 50} Jahre (Annahme)`], ['Energiemix', `${region.label} (${region.gridIntensity} g/kWh)`],
    ['Strommix-Pfad', gridPath === 'path' ? 'Klimapfad −2,5 %/a' : 'Statisch'], ['Betriebsart', opMode.label],
    ['Transportweg', `${transportKm.toLocaleString('de-DE')} km`], ['Durchfluss', `${flowLps.toLocaleString('de-DE', { maximumFractionDigits: 1 })} l/s`],
    ['Formteil-Zuschlag', `${fittingsPct} %`], ['Horizont', `${horizon} Jahre`],
    ['Quelle', portfolioActive ? `Portfolio (${portfolioRows.filter((r) => r.on).length} Stränge)` : 'Einzeltrasse'],
  ];
  const drawerResult = drawerId ? allResults.find((r) => r.material.id === drawerId) : null;
  const oppV = co2PressureLossPaPerM(opponentResult.material, diameter, sdr, flowLps, 0).v;
  const lifeGuide = co2LifespanGuide(opponentId, opModeId, oppV);
  return (
    <div className="dash-shell is-norail" data-screen-label="CO2-Dashboard">
      <aside className="dash-sidebar">
        <span className="dash-sheet-handle"></span>
        <div className="dash-brand">
          <KAquaLogo height={26} /><span className="dash-brand-tag">CO₂-Rechner</span>
          <div className="dash-brand-actions">
            <ShareButton></ShareButton>
            <ThemeToggle theme={currentTheme} onToggle={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} />
          </div>
        </div>
        <div className="dash-controls">
          <Field label="Gebäude-Preset">
            <div className="k-chips">
              {CO2_PRESETS.map((p) => {
                const PIcon = Icons[p.icon] || Icons.Layers;
                return <button key={p.id} type="button" className={`k-filter-chip ${presetId === p.id ? 'is-on' : ''}`} aria-pressed={presetId === p.id} onClick={() => applyPreset(p)}><PIcon size={13} /> {p.label}</button>;
              })}
            </div>
          </Field>
          <Field fid="length" label={<div className="dash-field-row"><span>Trassenlänge</span><strong>{lengthKm.toLocaleString('de-DE', { maximumFractionDigits: 1 })} km</strong></div>}>
            <input type="range" className="k-range" min="0.1" max="50" step="0.1" value={lengthKm} onChange={(e) => manual(setLengthKm)(+e.target.value)} aria-label="Trassenlänge in Kilometern" />
          </Field>
          <Field fid="d" label="Nennweite">
            <div className="dash-select-wrap">
              <select className="dash-select" value={diameter} onChange={(e) => manual(setDiameter)(+e.target.value)} aria-label="Nennweite">
                {CO2_DIAMETERS.map((d) => <option key={d} value={d}>{d} Millimeter</option>)}
              </select>
              <Icons.ChevronDown size={16} />
            </div>
          </Field>
          <Field label="SDR-Klasse">
            <ChipGroup options={CO2_SDR_CLASSES} value={sdr} onChange={manual(setSdr)} render={(s: any) => `SDR ${String(s).replace('.', ',')}`} />
          </Field>
          <Field label="Vergleich gegen">
            <ChipGroup options={CO2_MATERIALS.filter((m) => m.id !== 'kaqua')} value={opponentId} onChange={setOpponentId} render={(m: any) => m.label} />
          </Field>
          <Field fid="opplife" label={<div className="dash-field-row"><span>Nutzungsdauer {opponentResult.material.label}</span><strong>{oppLife[opponentId] || 50} Jahre</strong></div>}>
            <input type="range" className="k-range" min="15" max="70" step="5" value={oppLife[opponentId] || 50} onChange={(e) => setOppLife({ ...oppLife, [opponentId]: +e.target.value })} aria-label="Angenommene Nutzungsdauer des Vergleichswerkstoffs in Jahren" />
            <p className="co2-mod-note">Projektannahme — K-Aqua PP-RCT ist normativ mit 50 Jahren angesetzt (ISO 10508 Klasse II). Liegt der Wert unter dem Horizont, entstehen Ersatzzyklen (Sprünge im Chart).</p>
            {lifeGuide ? (
              <div className={`co2-guide ${lifeGuide.over ? 'is-over' : ''}`}>
                <span>{lifeGuide.reason}</span>
                {lifeGuide.over && (oppLife[opponentId] || 50) !== lifeGuide.years ? (
                  <button type="button" className="co2-mini-btn is-on" onClick={() => setOppLife({ ...oppLife, [opponentId]: lifeGuide.years })}>Empfehlung {lifeGuide.years} J. übernehmen</button>
                ) : null}
              </div>
            ) : null}
          </Field>
          <Field fid="region" label="Energiemix (Region)">
            <ChipGroup options={CO2_REGIONS} value={regionId} onChange={setRegionId} render={(r: any) => r.label} />
          </Field>
          <Field label="Strommix-Entwicklung">
            <ChipGroup options={[{ id: 'static', label: 'Statisch' }, { id: 'path', label: 'Klimapfad −2,5 %/a' }]} value={gridPath} onChange={setGridPath} render={(o: any) => o.label} />
          </Field>
          <Field label="Betriebsart">
            <ChipGroup options={CO2_OPERATING_MODES} value={opModeId} onChange={manual(setOpModeId)} render={(m: any) => m.label} />
          </Field>
          <Field fid="transport" label={<div className="dash-field-row"><span>Transportweg (Werk → Baustelle)</span><strong>{transportKm.toLocaleString('de-DE')} km</strong></div>}>
            <input type="range" className="k-range" min="0" max="1500" step="10" value={transportKm} onChange={(e) => setTransportKm(+e.target.value)} aria-label="Transportweg in Kilometern" />
          </Field>
          <Field fid="flow" label={<div className="dash-field-row"><span>Durchfluss</span><strong>{flowLps.toLocaleString('de-DE', { maximumFractionDigits: 1 })} l/s</strong></div>}>
            <input type="range" className="k-range" min="0.5" max="12" step="0.1" value={flowLps} onChange={(e) => manual(setFlowLps)(+e.target.value)} aria-label="Durchfluss in Liter pro Sekunde" />
          </Field>
          <Field fid="horizon" label={<div className="dash-field-row"><span>Betrachtungshorizont</span><strong>{horizon} Jahre</strong></div>}>
            <input type="range" className="k-range" min="10" max="100" step="5" value={horizon} onChange={(e) => setHorizon(+e.target.value)} aria-label="Betrachtungshorizont in Jahren" />
          </Field>
          <Field fid="fittings" label={<div className="dash-field-row"><span>Formteil- &amp; Verschnitt-Zuschlag</span><strong>{fittingsPct} %</strong></div>}>
            <input type="range" className="k-range" min="0" max="30" step="1" value={fittingsPct} onChange={(e) => setFittingsPct(+e.target.value)} aria-label="Formteil- und Verschnitt-Zuschlag in Prozent" />
          </Field>
          <Field fid="price" label={<div className="dash-field-row"><span>CO₂-Preis (nEHS 2026: 55–65 €)</span><strong>{co2Price} €/t</strong></div>}>
            <input type="range" className="k-range" min="0" max="300" step="5" value={co2Price} onChange={(e) => setCo2Price(+e.target.value)} aria-label="CO₂-Preis in Euro je Tonne" />
          </Field>
        </div>
        <p className="dash-disclaimer">{CO2_DISCLAIMER}</p>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <span className="dash-eyebrow">CO₂e-Ersparnis · {horizon} Jahre{portfolioActive ? ` · Portfolio (${portfolioRows.filter((r) => r.on).length} Stränge)` : ''} · vs. {opponentResult.material.label}</span>
          <div className="dash-hero-row"><div className="dash-bignum">{co2Fmt(animSavings)}</div>
          <div className="dash-kpis">
            <div className="dash-kpi"><Icons.Leaf size={15} /><span>Bäume-Äquivalent</span><strong>{Math.round(animTrees).toLocaleString('de-DE')}</strong></div>
            <div className="dash-kpi"><Icons.MapPin size={15} /><span>Pkw-Kilometer</span><strong>{Math.round(animCarKm).toLocaleString('de-DE')}</strong></div>
            <div className="dash-kpi"><Icons.Wrench size={15} /><span>Ersatzzyklen</span><strong>{Math.round(animReplacements)}×</strong></div>
            {co2Price > 0 ? <div className="dash-kpi"><span className="co2-eur">€</span><span>Vermiedene CO₂-Kosten</span><strong>{Math.round(animEuro).toLocaleString('de-DE')} €</strong></div> : null}
          </div></div>
        </header>

        <div className="dash-tabs">
          {CO2_TABS.map((t) => (
            <button key={t.id} type="button" className={`k-filter-chip ${tab === t.id ? 'is-on' : ''}`} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>

        <div className="dash-tab-content">
          {tab === 'overview' ? (
            <div className="dash-chart-card">
              <Co2Chart series={chartSeries} horizonYears={horizon} fmt={co2Fmt} events={chartEvents} breakEven={breakEven}
                view={chartView} onView={setChartView} showBand={showBand} onBand={setShowBand}
                seriesMode={seriesMode} onSeriesMode={setSeriesMode} overlays={overlaySeries}
                extYear={extHoverYear} metaCaption={metaCaption}></Co2Chart>
            </div>
          ) : null}
          {tab === 'analysis' ? (
            <div className="co2-tab-scroll co2-ana">
              <div className="dash-modules">
                <BreakEvenCard breakEven={breakEven} savings={savings} oppLabel={opponentResult.material.label} horizon={horizon} diffPoints={diffPoints} fmt={co2Fmt}></BreakEvenCard>
                <EquivalentsCard savings={savings}></EquivalentsCard>
                <SensitivityCard ctx={ctx} opponentId={opponentId} horizon={horizon} onFocusField={focusField} fmt={co2Fmt}></SensitivityCard>
              </div>
              <div className="co2-ana-grid">
                <section className="co2-ana-sec">
                  <span className="dash-rail-head">Materialvergleich · {horizon} Jahre</span>
                  <div className="dash-rail-list">
                    {allResults.map((r) => <RailRow key={r.material.id} result={r} kaquaTotal={kaquaResult.grandTotal} onOpen={() => setDrawerId(r.material.id)} />)}
                  </div>
                </section>
                <section className="co2-ana-sec">
                  <span className="dash-rail-head">Regionen im Vergleich</span>
                  <RegionTiles ctx={ctx} opponentId={opponentId} horizon={horizon} currentId={regionId} onPick={setRegionId} fmt={co2Fmt}></RegionTiles>
                </section>
                <section className="co2-ana-sec">
                  <span className="dash-rail-head">Lebenszyklus-Ereignisse</span>
                  <LifecycleFeed events={feedEvents} horizon={horizon} onHoverYear={setExtHoverYear} fmt={co2Fmt}></LifecycleFeed>
                </section>
              </div>
            </div>
          ) : null}
          {tab === 'breakdown' ? (
            <div className="dash-chart-card">
              <Co2Breakdown results={allResults} phases={CO2_PHASES} fmt={co2Fmt} horizonYears={horizon} />
            </div>
          ) : null}
          {tab === 'scenarios' ? (
            <div className="co2-tab-scroll">
              <Co2Scenarios paramsNow={paramsNow} scenarios={scenarios} setScenarios={setScenarios} overlayIds={overlayIds} setOverlayIds={setOverlayIds}
                onApply={applyParams} summarize={summarize} describe={describe} fmt={co2Fmt}></Co2Scenarios>
            </div>
          ) : null}
          {tab === 'portfolio' ? (
            <div className="co2-tab-scroll">
              <Co2Portfolio rows={portfolioRows} setRows={setPortfolioRows} usePortfolio={usePortfolio} setUsePortfolio={setUsePortfolio}
                defaults={{ lengthKm, diameter, sdr }} sharedCtx={ctx} opponentId={opponentId} horizon={horizon} fmt={co2Fmt}></Co2Portfolio>
            </div>
          ) : null}
          {tab === 'report' ? (
            <Co2Report paramRows={paramRows} kaquaResult={kaquaResult} opponentResult={opponentResult} savings={savings}
              breakEven={breakEven} horizon={horizon} co2Price={co2Price} fmt={co2Fmt}></Co2Report>
          ) : null}
          {tab === 'methodik' ? <MethodikTab /> : null}
        </div>
      </main>

      {drawerResult ? <MaterialDrawer result={drawerResult} horizon={horizon} onClose={() => setDrawerId(null)} fmt={co2Fmt}></MaterialDrawer> : null}
      <Co2Coachmarks></Co2Coachmarks>
      <SeoEngine />
    </div>
  );
}
