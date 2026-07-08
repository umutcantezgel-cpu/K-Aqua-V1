// K-Aqua — echter Produktkatalog-Browser (79 Artikelfamilien aus dem Altsystem).
// Zeigt reale Artikelnummern, Maße und Gewichte — Quelle: kaqua-catalog-data.js.
const { useState: useCatS } = React;

function CatalogDeep() {
  const L = usePageL('catalogx');
  const { lang } = useT();
  const [cat, setCat] = useCatS(0);
  const [q, setQ] = useCatS('');
  const [openIdx, setOpenIdx] = useCatS(-1);

  if (!L || !L.title || !window.K_REAL_CATALOG) return null;
  const CATS = window.K_REAL_CATALOG.categories;
  const active = CATS[cat] || CATS[0];
  const catMeta = (L.cats || {})[active.id];

  const items = active.items.filter((it) => {
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return it.title.toLowerCase().includes(s) || it.codes.toLowerCase().includes(s);
  });

  return (
    <section className="k-section k-section--subtle" data-screen-label="products-catalog">
      <div className="k-container">
        <Reveal><SectionHead eyebrow={L.eyebrow} title={L.title} lead={L.lead} /></Reveal>

        <Reveal delay={80}>
          <div className="k-chips" role="tablist" aria-label={L.eyebrow} style={{ marginBottom: 'var(--sp-4)' }}>
            {CATS.map((c, i) => (
              <button key={c.id} type="button" role="tab" aria-selected={cat === i}
                className={`k-filter-chip ${cat === i ? 'is-on' : ''}`}
                onClick={() => { setCat(i); setOpenIdx(-1); }}>
                {((L.cats || {})[c.id] || {}).label || c.id} · {c.count}
              </button>
            ))}
          </div>
        </Reveal>

        {catMeta ? (
          <Reveal delay={100}>
            <p className="k-body" style={{ marginBottom: 'var(--sp-5)', maxWidth: 680 }}>{catMeta.desc}</p>
          </Reveal>
        ) : null}

        <Reveal delay={120}>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={L.searchPlaceholder}
            aria-label={L.searchPlaceholder}
            style={{
              display: 'block', width: '100%', maxWidth: 520, minHeight: 48, marginBottom: 'var(--sp-6)',
              padding: '0 var(--sp-4)', borderRadius: 'var(--radius)', border: '1px solid var(--card-border)',
              background: 'var(--card)', color: 'var(--foreground)', fontSize: 15, fontFamily: 'var(--font-body)',
            }} />
        </Reveal>

        <div className="k-acc">
          {items.length === 0 ? (
            <p className="k-body">{L.noResults}</p>
          ) : items.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={it.title} className={`k-acc-item ${isOpen ? 'is-open' : ''}`}>
                <button type="button" className="k-acc-btn" aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}>
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, minWidth: 0 }}>
                    <span>{it.title}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--faint-foreground)', fontFamily: 'var(--font-body)' }}>{it.codes}</span>
                  </span>
                  <span className="k-acc-caret"><Icons.ChevronDown size={18} /></span>
                </button>
                {isOpen ? (
                  <div className="k-acc-panel">
                    {(it.material || it.sdr || it.series || it.pressure || it.len) ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', marginBottom: 'var(--sp-4)' }}>
                        {it.material ? <span className="k-chip">{L.materialLabel}: <strong>{it.material}</strong></span> : null}
                        {it.sdr ? <span className="k-chip">{L.sdrLabel}: <strong>{it.sdr}</strong></span> : null}
                        {it.series ? <span className="k-chip">{L.seriesLabel}: <strong>{it.series}</strong></span> : null}
                        {it.pressure ? <span className="k-chip">{L.pressureLabel}: <strong>{it.pressure}</strong></span> : null}
                        {it.len ? <span className="k-chip">{L.lenLabel}: <strong>{it.len}</strong></span> : null}
                      </div>
                    ) : null}
                    <DeepMatrix head={window.K_REAL_CATALOG.resolveHead(it.head, lang)} rows={it.rows} />
                    {lang === 'de' && it.note ? <p className="k-table-note">{it.note}</p> : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CatalogDeep });
