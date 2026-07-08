// K-Aqua Deep-Content — Sections 2: Academy (Schweißparameter/Verfahren/Fehler/Glossar),
// Trust Center (Stakeholder/Statistiken/Institute/Audit/FAQ), Service (Dokumente/Support/FAQ),
// KESSEL-Partnerschaft (Ökosystem/Wasserwege/Roadmap/Spezifikation).
const { useState: useS2D } = React;

function AcademyDeep() {
  const L = usePageL('academyx');
  const { lang } = useT();
  const [proc, setProc] = useS2D(0);
  if (!L || !L.paramTitle || !window.K_DEEP) return null;
  const weldRows = window.K_DEEP.WELD.map((w) => w.slice());

  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="academy-params">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.paramEyebrow} title={L.paramTitle} lead={L.paramLead} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.paramHead} rows={weldRows} note={L.paramNote} /></Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="academy-procedures">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.stepEyebrow} title={L.stepTitle} lead={L.stepLead} /></Reveal>
          <Reveal delay={80}>
            <div className="k-chips" style={{ marginBottom: 'var(--sp-5)' }}>
              {L.procTabs.map((t, i) => (
                <button key={t} type="button" className={`k-filter-chip ${proc === i ? 'is-on' : ''}`}
                  aria-pressed={proc === i} onClick={() => setProc(i)}>{t}</button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BentoCard>
              <h3 className="k-h3" style={{ fontSize: 18, marginBottom: 'var(--sp-3)' }}>{L.procs[proc].t}</h3>
              <StepFlow steps={L.procs[proc].steps} />
            </BentoCard>
          </Reveal>
        </div>
      </section>

      <section className="k-section" data-screen-label="academy-errors">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.errEyebrow} title={L.errTitle} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.errHead} rows={L.errRows} heroCol={2} /></Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="academy-glossary">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.glossEyebrow} title={L.glossTitle} /></Reveal>
          <Reveal delay={80}><GlossaryGrid items={L.gloss} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function TrustDeep() {
  const L = usePageL('trustx');
  if (!L || !L.stakeTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="trust-stakeholders">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.stakeEyebrow} title={L.stakeTitle} lead={L.stakeLead} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.stakeHead} rows={L.stakeRows} /></Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="trust-stats">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.statEyebrow} title={L.statTitle} /></Reveal>
          <Reveal delay={80}><StatBand stats={L.stats} /></Reveal>
          <p className="k-table-note" style={{ marginTop: 'var(--sp-3)' }}>{L.statNote}</p>
        </div>
      </section>

      <section className="k-section" data-screen-label="trust-institutes">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.instEyebrow} title={L.instTitle} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.inst.map((it, i) => (
              <Reveal key={it.t} delay={i * 80}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{it.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{it.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="trust-audit">
        <div className="k-container" style={{ maxWidth: 720 }}>
          <Reveal><SectionHead eyebrow={L.auditEyebrow} title={L.auditTitle} lead={L.auditLead} /></Reveal>
          <Reveal delay={80}><StepFlow steps={L.audit} /></Reveal>
        </div>
      </section>

      <section className="k-section" data-screen-label="trust-faq">
        <div className="k-container" style={{ maxWidth: 820 }}>
          <Reveal><SectionHead eyebrow={L.faqEyebrow} title={L.faqTitle} /></Reveal>
          <Reveal delay={80}><DeepFAQ items={L.faq} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function ServiceDeep() {
  const L = usePageL('servicex');
  if (!L || !L.libTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="service-library">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.libEyebrow} title={L.libTitle} lead={L.libLead} /></Reveal>
          <Reveal delay={80}>
            <div className="k-acc">
              {L.libRows.map((r) => (
                <div key={r.t} className="k-acc-item is-open">
                  <div className="k-acc-btn" style={{ cursor: 'default' }}>
                    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                      <span>{r.t}</span>
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted-foreground)' }}>{r.s} · {r.lang}</span>
                    </span>
                    {r.href
                      ? <KButton variant="secondary" size="sm" href={r.href} icon={<Icons.Download size={15} />}>{L.libOpen}</KButton>
                      : <span className="k-chip">{L.libRequest}</span>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="service-support">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.supEyebrow} title={L.supTitle} lead={L.supLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.sup.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{s.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{s.d}</p>
                  {s.href
                    ? <KButton variant="secondary" size="sm" href={s.href} style={{ marginTop: 'var(--sp-2)' }}>{s.c}</KButton>
                    : <p style={{ fontWeight: 650, marginTop: 'var(--sp-2)', fontSize: 14 }}>{s.c}</p>}
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" data-screen-label="service-faq">
        <div className="k-container" style={{ maxWidth: 820 }}>
          <Reveal><SectionHead eyebrow={L.faqEyebrow} title={L.faqTitle} /></Reveal>
          <Reveal delay={80}><DeepFAQ items={L.faq} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function PartnerDeep() {
  const L = usePageL('partnerx');
  if (!L || !L.ecoTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="partner-ecosystem">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.ecoEyebrow} title={L.ecoTitle} lead={L.ecoLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.eco.map((e, i) => (
              <Reveal key={e.t} delay={i * 70}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 16.5 }}>{e.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{e.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="partner-flow">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.flowEyebrow} title={L.flowTitle} lead={L.flowLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.flow.map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <BentoCard tint={i === 2} style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{f.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{f.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" data-screen-label="partner-roadmap">
        <div className="k-container" style={{ maxWidth: 760 }}>
          <Reveal><SectionHead eyebrow={L.roadEyebrow} title={L.roadTitle} /></Reveal>
          <div className="k-steps">
            {L.road.map((r, i) => (
              <div key={r.t} className="k-step">
                <span className="k-step-num" aria-hidden="true">{i + 1}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0 }}>{r.t}</h4>
                    <span className="k-chip" style={{ fontSize: 11.5 }}>{r.s}</span>
                  </div>
                  <p>{r.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="partner-spec">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.specEyebrow} title={L.specTitle} lead={L.specLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.spec.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 16.5 }}>{s.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{s.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { AcademyDeep, TrustDeep, ServiceDeep, PartnerDeep });
