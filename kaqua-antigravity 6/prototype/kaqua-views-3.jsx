// K-Aqua Redesign — Views 3: Produktfinder + CO₂-Rechner (search/sort/cards/detail)
const { useState: useS3, useMemo: useMemo3, useEffect: useE3 } = React;

/* ---------- product data model (derived from SDR geometry) ----------
   114 article variants total — representative range pending live ERP/catalog
   integration. Larger dimensions realistically ship in fewer SDR (wall
   thickness) classes than small ones, which this availability rule reflects. */
const K_DIMS = [20, 25, 32, 40, 50, 63, 75, 90, 110, 125, 160, 200, 250, 315, 400, 500, 630];
const K_SDRS = [6, 7.4, 9, 11, 17];
const K_TYPES = [
  { id: 'mono', label: 'PP-R Monolayer', short: 'PP-R' },
  { id: 'fiber', label: 'PP-RCT Faserverbund (GF)', short: 'K-Fiber' },
  { id: 'fitting', label: 'Formteile', short: 'Fitting' },
];

function sdrsForDim(d) {
  if (d <= 63) return K_SDRS;                  // full range for common small sizes
  if (d <= 160) return [7.4, 9, 11, 17];        // drop the heaviest wall class
  if (d <= 315) return [9, 11, 17];
  return [11, 17];                              // large-bore: two standard classes
}

function makeRow(typeId, d, sdr) {
  const t = K_TYPES.find((x) => x.id === typeId);
  const wall = sdr ? Math.max(1.9, Math.round((d / sdr) * 10) / 10) : null;
  return {
    type: typeId,
    typeLabel: t.label,
    short: t.short,
    d,
    sdr,
    wall,
    di: wall ? Math.round((d - 2 * wall) * 10) / 10 : null,
    pn: sdr ? ({ 6: 'PN 20', 7.4: 'PN 16', 9: 'PN 12,5', 11: 'PN 10', 17: 'PN 6' })[sdr] : '—',
  };
}

function buildCatalog() {
  const rows = [];
  // PP-R Monolayer — economical standard, common residential sizes d20–d75 (35 rows)
  K_DIMS.slice(0, 7).forEach((d) => K_SDRS.forEach((sdr) => rows.push(makeRow('mono', d, sdr))));
  // PP-RCT Faserverbund — full range d20–d630, tapering SDR availability (65 rows)
  K_DIMS.forEach((d) => sdrsForDim(d).forEach((sdr) => rows.push(makeRow('fiber', d, sdr))));
  // Formteile — complementary line, d20–d315, one representative row per size (14 rows)
  K_DIMS.filter((d) => d <= 315).forEach((d) => rows.push(makeRow('fitting', d, null)));
  return rows; // 35 + 65 + 14 = 114
}
const K_CATALOG = buildCatalog();

/* =====================  PRODUKTFINDER  ===================== */
function DetailPanel({ row, L, onClose, onRequest }) {
  useE3(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, []);
  return (
    <div role="dialog" aria-modal="true" aria-label={row.short}
      style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'grid', placeItems: 'center', padding: 'var(--sp-4)', background: 'oklch(0.1 0.02 300 / 0.55)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <BentoCard style={{ gap: 'var(--sp-4)' }}>
          <image-slot id={'product-photo-' + row.type} style={{ width: '100%', height: 180, display: 'block' }}
            shape="rounded" radius="14" placeholder={row.typeLabel + ' — Foto ablegen'}></image-slot>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--sp-3)' }}>
            <div>
              <span className="k-chip" style={{ marginBottom: 8 }}>{row.typeLabel}</span>
              <h3 className="k-h3" style={{ fontSize: 26 }}>{'d' + row.d}{row.sdr ? ' · SDR ' + String(row.sdr).replace('.', ',') : ''}</h3>
            </div>
            <button type="button" className="k-icon-btn" aria-label={L.detailClose} onClick={onClose}><Icons.X size={18} /></button>
          </div>
          <table className="k-table" style={{ fontSize: 14.5 }}>
            <tbody>
              <tr><th style={{ borderBottom: '1px solid var(--card-border)' }}>{L.detailType}</th><td style={{ textAlign: 'right' }}>{row.typeLabel}</td></tr>
              <tr><th style={{ borderBottom: '1px solid var(--card-border)' }}>{L.detailWall}</th><td style={{ textAlign: 'right' }}>{row.wall == null ? '—' : row.wall} mm</td></tr>
              <tr><th style={{ borderBottom: '1px solid var(--card-border)' }}>{L.detailDi}</th><td style={{ textAlign: 'right' }}>{row.di == null ? '—' : row.di} mm</td></tr>
              <tr><th>{L.detailPn}</th><td style={{ textAlign: 'right' }}>{row.pn}</td></tr>
            </tbody>
          </table>
          <PipeFX variant="pressure" size={230} />
          <KButton icon={<Icons.ArrowRight size={18} />} onClick={onRequest}>{L.detailCta}</KButton>
        </BentoCard>
      </div>
    </div>
  );
}

function FinderView({ go }) {
  const L = usePageL('finder');
  const { lang } = useT();
  const [types, setTypes] = useS3([]);   // leer = kein Typfilter → alle 114 Artikel sichtbar
  const [sdrs, setSdrs] = useS3([]);
  const [maxD, setMaxD] = useS3(630);
  const [query, setQuery] = useS3('');
  const [sortKey, setSortKey] = useS3('d');
  const [sortDir, setSortDir] = useS3('asc');
  const [view, setView] = useS3('table');
  const [selected, setSelected] = useS3(null);

  const toggle = (arr, set, v) => {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : arr.concat(v));
  };

  const rows = useMemo3(() => {
    const q = query.trim().toLowerCase();
    let out = K_CATALOG.filter((r) =>
      (types.length === 0 || types.includes(r.type)) &&
      (sdrs.length === 0 || (r.sdr && sdrs.includes(r.sdr))) &&
      r.d <= maxD &&
      (!q || (r.short + ' d' + r.d + ' sdr ' + (r.sdr || '') + ' ' + r.typeLabel).toLowerCase().includes(q))
    );
    out = out.slice().sort((a, b) => {
      let av, bv;
      if (sortKey === 'sdr') { av = a.sdr || 0; bv = b.sdr || 0; }
      else if (sortKey === 'type') { av = a.type; bv = b.type; }
      else { av = a.d; bv = b.d; }
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return out;
  }, [types, sdrs, maxD, query, sortKey, sortDir]);

  const cap = view === 'table' ? 120 : 48;
  const shown = rows.slice(0, cap);
  const requestFromDetail = () => { setSelected(null); go('rfq'); };

  const exportCsv = () => {
    const head = L.tableHead.join(';');
    const lines = rows.map((r) => [r.typeLabel, r.d, r.sdr ? String(r.sdr).replace('.', ',') : '—', r.wall != null ? r.wall : '—', r.di != null ? r.di : '—', r.pn].join(';'));
    const blob = new Blob(['\ufeff' + [head].concat(lines).join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'k-aqua-produkte.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.62fr) minmax(0, 1.38fr)', gap: 'var(--sp-8)', alignItems: 'start' }}>
          <div className="k-sticky-result" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
            <BentoCard>
              <h3 className="k-h3" style={{ fontSize: 17 }}>{L.type}</h3>
              <div className="k-chips">
                {K_TYPES.map((t) => (
                  <button key={t.id} type="button" className={`k-filter-chip ${types.includes(t.id) ? 'is-on' : ''}`}
                    aria-pressed={types.includes(t.id)} onClick={() => toggle(types, setTypes, t.id)}>{t.short}</button>
                ))}
              </div>
              <h3 className="k-h3" style={{ fontSize: 17, marginTop: 8 }}>{L.sdr}</h3>
              <div className="k-chips">
                {K_SDRS.map((s) => (
                  <button key={s} type="button" className={`k-filter-chip ${sdrs.includes(s) ? 'is-on' : ''}`}
                    aria-pressed={sdrs.includes(s)} onClick={() => toggle(sdrs, setSdrs, s)}>SDR {String(s).replace('.', ',')}</button>
                ))}
              </div>
              <h3 className="k-h3" style={{ fontSize: 17, marginTop: 8 }}>{L.maxD}</h3>
              <input type="range" className="k-range" min="20" max="630" step="5" value={maxD}
                aria-label={L.maxDAria}
                onChange={(e) => setMaxD(+e.target.value)} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--muted-foreground)' }}>
                <span>d20</span>
                <strong style={{ color: 'var(--primary)', fontSize: 17 }}>{L.upTo} d{maxD}</strong>
                <span>d630</span>
              </div>
            </BentoCard>
            <BentoCard tint style={{ gap: 'var(--sp-2)' }}>
              <span className="k-result-num" style={{ fontSize: 44 }}>{rows.length}</span>
              <span className="k-body">{L.found}</span>
              <span className="k-body" style={{ fontSize: 12.5 }}>{L.totalNote}</span>
              <KButton size="sm" variant="ghost" href="https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf" icon={<Icons.Download size={16} />}>{L.catalog}</KButton>
            </BentoCard>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <BentoCard style={{ padding: 'var(--sp-4)', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--sp-3)' }}>
              <input type="search" className="k-input" style={{ flex: '1 1 220px' }} placeholder={L.searchPlaceholder}
                value={query} onChange={(e) => setQuery(e.target.value)} aria-label={L.searchPlaceholder} />
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'var(--muted-foreground)' }}>
                {L.sortLabel}
                <select className="k-input" style={{ minWidth: 130 }} value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                  {Object.entries(L.sortOptions).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </label>
              <button type="button" className="k-icon-btn" aria-label="toggle sort direction"
                onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}>
                {sortDir === 'asc' ? '\u2193' : '\u2191'}
              </button>
              <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
                <button type="button" className={`k-filter-chip ${view === 'table' ? 'is-on' : ''}`} aria-pressed={view === 'table'} onClick={() => setView('table')}>{L.viewTable}</button>
                <button type="button" className={`k-filter-chip ${view === 'cards' ? 'is-on' : ''}`} aria-pressed={view === 'cards'} onClick={() => setView('cards')}>{L.viewCards}</button>
                <button type="button" className="k-filter-chip" onClick={exportCsv}>{L.exportCsv}</button>
              </div>
            </BentoCard>

            {view === 'table' ? (
              <BentoCard style={{ padding: 'var(--sp-4)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto', maxHeight: 560, overflowY: 'auto' }}>
                  <table className="k-table">
                    <thead style={{ position: 'sticky', top: 0, background: 'var(--card)', zIndex: 1 }}>
                      <tr>{L.tableHead.map((h) => <th key={h}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {shown.map((r, i) => (
                        <tr key={i} onClick={() => setSelected(r)} style={{ cursor: 'pointer' }}>
                          <td style={{ fontWeight: 600, color: 'var(--foreground)' }}>{r.short}</td>
                          <td>{r.d}</td>
                          <td>{r.sdr ? String(r.sdr).replace('.', ',') : '—'}</td>
                          <td>{r.wall ?? '—'}</td>
                          <td>{r.di ?? '—'}</td>
                          <td>{r.pn}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {rows.length > cap ? <p className="k-body" style={{ padding: 'var(--sp-3)', fontSize: 13.5 }}>{kFmt(L.more, { n: rows.length - cap })}</p> : null}
                  {rows.length === 0 ? <p className="k-body" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>{L.none}</p> : null}
                </div>
              </BentoCard>
            ) : (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--sp-3)' }}>
                  {shown.map((r, i) => (
                    <button key={i} type="button" className="k-type-card" style={{ minHeight: 0, padding: 0, overflow: 'hidden' }} onClick={() => setSelected(r)}>
                      <image-slot id={'product-photo-' + r.type} style={{ width: '100%', height: 96, display: 'block' }}
                        shape="rect" placeholder={r.typeLabel}></image-slot>
                      <div style={{ padding: 'var(--sp-3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span className="k-chip" style={{ fontSize: 11.5 }}>{r.short}</span>
                        <strong style={{ fontSize: 20 }}>{'d' + r.d}</strong>
                        <span>{r.sdr ? 'SDR ' + String(r.sdr).replace('.', ',') + ' · ' + r.pn : r.pn}</span>
                      </div>
                    </button>
                  ))}
                </div>
                {rows.length > cap ? <p className="k-body" style={{ padding: 'var(--sp-3)', fontSize: 13.5 }}>{kFmt(L.more, { n: rows.length - cap })}</p> : null}
                {rows.length === 0 ? <p className="k-body" style={{ padding: 'var(--sp-6)', textAlign: 'center' }}>{L.none}</p> : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {selected ? <DetailPanel row={selected} L={L} onClose={() => setSelected(null)} onRequest={requestFromDetail} /> : null}

      <section className="k-section k-section--subtle">
        <div className="k-container" style={{ textAlign: 'center' }}>
          <SectionHead align="center" eyebrow={L.nextEyebrow} title={L.nextTitle} lead={L.nextLead} />
          <KButton size="lg" onClick={() => go('co2')} icon={<Icons.ArrowRight size={18} />}>{L.nextCta}</KButton>
        </div>
      </section>

      <FinderDeep />
    </main>
  );
}

/* =====================  CO₂-RECHNER  ===================== */
/* Demonstrationsfaktoren (kg CO₂e pro Meter, dimensionsskaliert) — finale Werte
   gehören aus ecoinvent/produktspezifischen EPDs (Typ III, EN 15804). */
const K_MATERIALS = [
  { id: 'kaqua', label: 'K-Aqua PP-RCT', factor: 1.0, color: 'var(--primary)' },
  { id: 'pvc', label: 'PVC-C', factor: 1.6, color: 'oklch(0.62 0.02 300)' },
  { id: 'copper', label: 'Kupfer', factor: 4.4, color: 'oklch(0.55 0.1 50)' },
  { id: 'steel', label: 'Edelstahl', factor: 5.2, color: 'oklch(0.5 0.01 260)' },
];
function co2PerMeter(d, sdr) {
  // mass ∝ ring cross-section; base PP ≈ 1.9 kg CO2e/kg, density 0.9 → demo formula
  const wall = d / sdr;
  const area = Math.PI * (d - wall) * wall; // mm²
  return area * 0.9 * 1.9 / 1000; // kg CO2e per meter (demo)
}

function CO2View({ go }) {
  const L = usePageL('co2');
  const { lang } = useT();
  const [d, setD] = useS3(110);
  const [len, setLen] = useS3(500);
  const [sdr, setSdr] = useS3(11);
  const [used, setUsed] = useS3(false);

  const mark = () => {};

  const base = co2PerMeter(d, sdr) * len;
  const results = K_MATERIALS.map((m) => ({ ...m, total: base * m.factor }));
  const worst = Math.max(...results.map((r) => r.total));
  const saved = Math.max(...results.filter((r) => r.id !== 'kaqua').map((r) => r.total)) - base;
  const trees = Math.round(saved / 25);     // ~25 kg CO2/Baum/Jahr
  const carKm = Math.round(saved / 0.15);   // ~0,15 kg CO2e/km Pkw

  const fmt = (n) => n >= 1000 ? (n / 1000).toLocaleString(lang, { maximumFractionDigits: 1 }) + ' t' : Math.round(n).toLocaleString(lang) + ' kg';

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 'var(--sp-8)', alignItems: 'start' }}>
          <BentoCard>
            <h3 className="k-h3">{L.project}</h3>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label htmlFor="co2-d" style={{ fontWeight: 600, fontSize: 15 }}>{L.dia}</label>
                <strong style={{ color: 'var(--primary)' }}>d{d}</strong>
              </div>
              <input id="co2-d" type="range" className="k-range" min="20" max="250" step="5" value={d}
                onChange={(e) => { setD(+e.target.value); mark(); }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label htmlFor="co2-len" style={{ fontWeight: 600, fontSize: 15 }}>{L.length}</label>
                <strong style={{ color: 'var(--primary)' }}>{len.toLocaleString(lang)} m</strong>
              </div>
              <input id="co2-len" type="range" className="k-range" min="50" max="10000" step="50" value={len}
                onChange={(e) => { setLen(+e.target.value); mark(); }} />
            </div>
            <div>
              <span style={{ fontWeight: 600, fontSize: 15, display: 'block', marginBottom: 8 }}>{L.sdrClass}</span>
              <div className="k-chips">
                {[6, 7.4, 9, 11].map((s) => (
                  <button key={s} type="button" className={`k-filter-chip ${sdr === s ? 'is-on' : ''}`}
                    aria-pressed={sdr === s} onClick={() => { setSdr(s); mark(); }}>SDR {String(s).replace('.', ',')}</button>
                ))}
              </div>
            </div>
            <p className="k-body" style={{ fontSize: 13, marginTop: 4 }}>{L.disclaimer}</p>
          </BentoCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <BentoCard tint style={{ gap: 'var(--sp-2)' }}>
              <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>{L.savedLabel}</span>
              <span className="k-result-num">{fmt(saved)}</span>
              <span className="k-body">{L.savedBody1} <strong style={{ color: 'var(--foreground)' }}>{kFmt(L.trees, { n: trees.toLocaleString(lang) })}</strong> {L.or} <strong style={{ color: 'var(--foreground)' }}>{kFmt(L.carKm, { n: carKm.toLocaleString(lang) })}</strong>.</span>
            </BentoCard>
            <BentoCard>
              <h3 className="k-h3" style={{ fontSize: 17 }}>{L.compareTitle}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {results.map((r) => (
                  <div key={r.id} className="k-bar-row">
                    <span style={{ fontSize: 14.5, fontWeight: r.id === 'kaqua' ? 700 : 500, color: r.id === 'kaqua' ? 'var(--primary)' : 'var(--muted-foreground)' }}>{L.materials[r.id]}</span>
                    <div className="k-bar-track">
                      <div className="k-bar-fill" style={{ width: `${Math.max(4, (r.total / worst) * 100)}%`, background: r.color }}></div>
                    </div>
                    <span style={{ fontSize: 14.5, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{fmt(r.total)}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
            <BentoCard style={{ flexDirection: 'row', alignItems: 'center', gap: 'var(--sp-4)' }}>
              <div className="k-icon-chip"><Icons.Award size={24} /></div>
              <p className="k-body" style={{ fontSize: 14.5 }}>
                <strong style={{ color: 'var(--foreground)' }}>{L.auditor}</strong> {L.auditorBody} <button type="button" className="k-link" style={{ minHeight: 0, display: 'inline' }} onClick={() => go('trust')}>{L.trustLink}</button>.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      <CO2Deep />
    </main>
  );
}

Object.assign(window, { FinderView, CO2View, K_CATALOG });
