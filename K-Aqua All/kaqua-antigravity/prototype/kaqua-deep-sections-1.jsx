// K-Aqua Deep-Content — Sections 1: Produkte (Dimensionen/Werkstoff/Normen/FAQ),
// Produktfinder-Lesehilfe, CO2-Rechner-Methodik. Ergänzt die bestehenden Views,
// ersetzt keine bestehenden Inhalte. Nutzt K_DEEP (kaqua-deep-data.js) für reale
// SDR-Geometrie und die productsx/finderx/co2x-Wörterbücher.
const { useState: useS1D } = React;

function ProductsDeep() {
  const L = usePageL('productsx');
  const { lang } = useT();
  const [sdr, setSdr] = useS1D(6);
  if (!L || !L.pipesTitle || !window.K_DEEP) return null;
  const K = window.K_DEEP;
  const fmtSdr = (s) => 'SDR ' + (lang === 'de' ? String(s).replace('.', ',') : s);
  const rows = K.tableForSdr(sdr).map((r) => [r.d, r.s, r.di, K.fmtPn(r.pn, lang), r.water, r.weight]);

  return (
    <React.Fragment>
      {/* Rohrfamilien */}
      <section className="k-section" data-screen-label="products-pipe-families">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.pipesEyebrow} title={L.pipesTitle} lead={L.pipesLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.pipes.map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 18 }}>{p.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{p.d}</p>
                  <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap', marginTop: 'var(--sp-2)' }}>
                    {p.tags.map((tg) => <span key={tg} className="k-chip">{tg}</span>)}
                  </div>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Dimensionstabellen */}
      <section className="k-section k-section--subtle" data-screen-label="products-dimensions">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.dimEyebrow} title={L.dimTitle} lead={L.dimLead} /></Reveal>
          <Reveal delay={80}>
            <div className="k-chips" role="tablist" aria-label={L.dimTabAria} style={{ marginBottom: 'var(--sp-5)' }}>
              {K.SDRS.map((s) => (
                <button key={s} type="button" role="tab" aria-selected={sdr === s}
                  className={`k-filter-chip ${sdr === s ? 'is-on' : ''}`} onClick={() => setSdr(s)}>{fmtSdr(s)}</button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <DeepMatrix head={L.dimHead} rows={rows} heroCol={3} note={L.dimNote} />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)', marginTop: 'var(--sp-6)' }}>
            {L.anchors.map((a, i) => (
              <Reveal key={a.t} delay={i * 80}>
                <BentoCard tint style={{ height: '100%' }}>
                  <span className="k-stat-num" style={{ fontSize: 32 }}>{a.v}</span>
                  <h3 className="k-h3" style={{ fontSize: 16 }}>{a.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{a.c}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
          <p className="k-table-note" style={{ marginTop: 'var(--sp-3)' }}>{L.anchorsTitle}</p>
        </div>
      </section>

      {/* Werkstoffdaten */}
      <section className="k-section" data-screen-label="products-material">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.matEyebrow} title={L.matTitle} lead={L.matLead} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.matHead} rows={L.matRows} heroCol={1} /></Reveal>
        </div>
      </section>

      {/* Normen & Nachweise */}
      <section className="k-section k-section--subtle" data-screen-label="products-norms">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.normEyebrow} title={L.normTitle} lead={L.normLead} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.normHead} rows={L.norms} heroCol={0} /></Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="k-section" data-screen-label="products-faq">
        <div className="k-container" style={{ maxWidth: 820 }}>
          <Reveal><SectionHead eyebrow={L.faqEyebrow} title={L.faqTitle} /></Reveal>
          <Reveal delay={80}><DeepFAQ items={L.faq} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function FinderDeep() {
  const L = usePageL('finderx');
  if (!L || !L.helpTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="finder-help">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.helpEyebrow} title={L.helpTitle} lead={L.helpLead} /></Reveal>
          <Reveal delay={80}><GlossaryGrid items={L.help} /></Reveal>
        </div>
      </section>
      <section className="k-section k-section--subtle" data-screen-label="finder-workflow">
        <div className="k-container" style={{ maxWidth: 720 }}>
          <Reveal><SectionHead title={L.flowTitle} /></Reveal>
          <Reveal delay={80}><StepFlow steps={L.flow} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function CO2Deep() {
  const L = usePageL('co2x');
  if (!L || !L.methTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="co2-methodology">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.methEyebrow} title={L.methTitle} lead={L.methLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.meth.map((m, i) => (
              <Reveal key={m.t} delay={i * 70}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 16.5 }}>{m.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{m.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="k-section k-section--subtle" data-screen-label="co2-green-building">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.certEyebrow} title={L.certTitle} lead={L.certLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)', marginBottom: 'var(--sp-8)' }}>
            {L.certs.map((c, i) => (
              <Reveal key={c.t} delay={i * 70}>
                <BentoCard tint style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{c.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{c.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <BentoCard>
              <h3 className="k-h3" style={{ fontSize: 17 }}>{L.scopeTitle}</h3>
              <p className="k-body">{L.scopeText}</p>
            </BentoCard>
          </Reveal>
          <p className="k-table-note" style={{ marginTop: 'var(--sp-3)' }}>{L.statNote}</p>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { ProductsDeep, FinderDeep, CO2Deep });
