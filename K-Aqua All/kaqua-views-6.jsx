// K-Aqua — Käufer-Strecke: Persona-Sektion (Home) + RFQ-Projektanfrage in 4 Schritten.
const { useState: useB, useMemo: useBM } = React;

/* =====================  HOME: FÜR KÄUFER & PLANER  ===================== */
function HomeBuyers({ go }) {
  const B = usePageL('buyers');
  const icons = ['FileText', 'Wrench', 'Factory'];
  const whyIcons = ['Flame', 'Shield', 'Recycle', 'Handshake'];
  return (
    <React.Fragment>
      <section className="k-section">
        <div className="k-container">
          <SectionHead eyebrow={B.eyebrow}
            title={<span>{B.title1} <span className="k-grad-text">{B.titleGrad}</span></span>}
            lead={B.lead} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
            {(B.personas || []).map((p, i) => {
              const Ic = Icons[icons[i]] || Icons.Users;
              return (
                <Reveal key={i} delay={i * 80}>
                  <BentoCard style={{ height: '100%' }}>
                    <div className="k-icon-chip"><Ic size={24} /></div>
                    <h3 className="k-h3">{p.t}</h3>
                    <p className="k-body" style={{ flex: 1 }}>{p.d}</p>
                    <button type="button" className="k-link" onClick={() => go(p.goto)}>{p.cta} <Icons.ArrowRight size={16} /></button>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead eyebrow={B.whyEyebrow} title={B.whyTitle} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--sp-4)' }}>
            {(B.why || []).map((w, i) => {
              const Ic = Icons[whyIcons[i]] || Icons.Check;
              return (
                <Reveal key={i} delay={i * 70}>
                  <BentoCard style={{ height: '100%' }}>
                    <div className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Ic size={20} /></div>
                    <h3 className="k-h3" style={{ fontSize: 18 }}>{w.t}</h3>
                    <p className="k-body" style={{ fontSize: 14.5 }}>{w.d}</p>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={120}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-12)' }}>
              {(B.promise || []).map((pr) => (
                <span key={pr} className="k-chip"><Icons.Check size={14} style={{ color: 'var(--accent-strong)' }} /><strong>{pr}</strong></span>
              ))}
              <KButton size="lg" onClick={() => go('rfq')} icon={<Icons.ArrowRight size={18} />}>{B.ctaAll}</KButton>
            </div>
          </Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

/* =====================  RFQ — PROJEKTANFRAGE  ===================== */
function RFQView({ go }) {
  const L = usePageL('rfq');
  const { lang } = useT();
  const [step, setStep] = useB(0);
  const [sent, setSent] = useB(false);
  const [d, setD] = useDraft('rfq', { type: null, material: null, meters: 1000, dims: [], timeline: null, region: null, name: '', company: '', email: '', phone: '', msg: '', fileName: '' });
  const set = (k, v) => setD((o) => ({ ...o, [k]: v }));
  const toggleDim = (v) => set('dims', d.dims.includes(v) ? d.dims.filter((x) => x !== v) : d.dims.concat(v));

  const typeIcons = ['Factory', 'MapPin', 'Layers', 'Handshake'];
  const materialIcons = ['Layers', 'Thermometer', 'Handshake'];
  const DIM_GROUPS = ['d20 – d63', 'd75 – d160', 'd200 – d315', 'd355 – d630'];
  const valid = [d.type !== null, d.material !== null, d.dims.length > 0, d.timeline && d.region, d.name && d.company && /.+@.+\..+/.test(d.email)];

  const send = () => {
    const body = [
      `${L.fType}: ${(L.types[d.type] || {}).t || '-'}`,
      `${L.fMaterial}: ${(L.materials[d.material] || {}).t || '-'}`,
      `${L.fDims}: ${d.dims.join(', ')} · ~${d.meters.toLocaleString(lang)} m`,
      `${L.fTime}: ${d.timeline} · ${L.fRegion}: ${d.region}`,
      `${L.fName}: ${d.name} · ${L.fCompany}: ${d.company}`,
      `${L.fEmail}: ${d.email} · ${L.fPhone}: ${d.phone || '-'}`,
      d.fileName ? `${L.fUpload}: ${d.fileName} (bitte manuell anhängen)` : '',
      d.msg ? `${L.fMsg}: ${d.msg}` : '',
    ].filter(Boolean).join('\n');
    window.open('mailto:info@k-aqua.de?subject=' + encodeURIComponent(L.mailSubject + ' — ' + d.company) + '&body=' + encodeURIComponent(body), '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <main className="k-page" style={{ paddingTop: 72 }}>
        <section className="k-section">
          <div className="k-container" style={{ maxWidth: 640, textAlign: 'center' }}>
            <div className="k-icon-chip" style={{ width: 72, height: 72, borderRadius: 22, margin: '0 auto var(--sp-6)' }}><Icons.Check size={36} /></div>
            <h1 className="k-h2">{L.doneTitle}</h1>
            <p className="k-lead" style={{ marginInline: 'auto' }}>{L.doneText}</p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--sp-8)' }}>
              <KButton href="tel:+4960859868410" variant="ghost" icon={<Icons.Phone size={18} />}>+49 (0)60 85 / 9868-410</KButton>
              <KButton onClick={() => go('home')}>{L.doneBack}</KButton>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>} lead={L.lead} />
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ maxWidth: 860 }}>
          {/* steps */}
          <div className="k-steps" role="list">
            {L.steps.map((s, i) => (
              <span key={s} role="listitem" className={`k-step ${i === step ? 'is-now' : ''} ${i < step ? 'is-done' : ''}`}>
                <i>{i < step ? <Icons.Check size={13} /> : i + 1}</i>{s}
              </span>
            ))}
          </div>

          <BentoCard style={{ minHeight: 360 }}>
            {step === 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-3)' }}>
                {L.types.map((tp, i) => {
                  const Ic = Icons[typeIcons[i]] || Icons.Factory;
                  return (
                    <button key={i} type="button" className={`k-type-card ${d.type === i ? 'is-on' : ''}`} aria-pressed={d.type === i} onClick={() => set('type', i)}>
                      <span className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Ic size={20} /></span>
                      <strong>{tp.t}</strong>
                      <span>{tp.d}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {step === 1 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-3)' }}>
                {L.materials.map((mt, i) => {
                  const Ic = Icons[materialIcons[i]] || Icons.Layers;
                  return (
                    <button key={i} type="button" className={`k-type-card ${d.material === i ? 'is-on' : ''}`} aria-pressed={d.material === i} onClick={() => set('material', i)}>
                      <span className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Ic size={20} /></span>
                      <strong>{mt.t}</strong>
                      <span>{mt.d}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {step === 2 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 'var(--sp-2)' }}>{L.fDims}</p>
                  <div className="k-chips">
                    {DIM_GROUPS.map((g) => (
                      <button key={g} type="button" className={`k-filter-chip ${d.dims.includes(g) ? 'is-on' : ''}`} aria-pressed={d.dims.includes(g)} onClick={() => toggleDim(g)}>{g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <p style={{ fontWeight: 600 }}>{L.fMeters}</p>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--primary)' }}>~{d.meters.toLocaleString(lang)} m</span>
                  </div>
                  <input className="k-range" type="range" min="100" max="50000" step="100" value={d.meters} aria-label={L.fMeters} onChange={(e) => set('meters', +e.target.value)} />
                </div>
                <p className="k-body" style={{ fontSize: 13.5 }}>{L.dimsHint}</p>
              </div>
            ) : null}

            {step === 3 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 'var(--sp-2)' }}>{L.fTime}</p>
                  <div className="k-chips">
                    {L.timelines.map((tl) => (
                      <button key={tl} type="button" className={`k-filter-chip ${d.timeline === tl ? 'is-on' : ''}`} aria-pressed={d.timeline === tl} onClick={() => set('timeline', tl)}>{tl}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 'var(--sp-2)' }}>{L.fRegion}</p>
                  <div className="k-chips">
                    {L.regions.map((r) => (
                      <button key={r} type="button" className={`k-filter-chip ${d.region === r ? 'is-on' : ''}`} aria-pressed={d.region === r} onClick={() => set('region', r)}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {step === 4 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-3)' }}>
                  <label className="k-field"><span>{L.fName} *</span><input className="k-input" type="text" value={d.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" /></label>
                  <label className="k-field"><span>{L.fCompany} *</span><input className="k-input" type="text" value={d.company} onChange={(e) => set('company', e.target.value)} autoComplete="organization" /></label>
                  <label className="k-field"><span>{L.fEmail} *</span><input className="k-input" type="email" value={d.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" /></label>
                  <label className="k-field"><span>{L.fPhone}</span><input className="k-input" type="tel" value={d.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" /></label>
                </div>
                <label className="k-field">
                  <span>{L.fUpload}</span>
                  <input className="k-input" type="file" onChange={(e) => set('fileName', e.target.files[0] ? e.target.files[0].name : '')} />
                </label>
                {d.fileName ? <p className="k-body" style={{ fontSize: 13 }}>{L.uploadHint}</p> : null}
                <label className="k-field"><span>{L.fMsg}</span><textarea className="k-input" rows="3" value={d.msg} onChange={(e) => set('msg', e.target.value)}></textarea></label>
                <p className="k-body" style={{ fontSize: 13 }}>{L.privacy}</p>
              </div>
            ) : null}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'auto', paddingTop: 'var(--sp-4)' }}>
              {step > 0 ? <KButton variant="ghost" onClick={() => setStep(step - 1)}>{L.back}</KButton> : <span></span>}
              <PipeFX variant="reservoir" size={92} progress={(step + 1) / 5} />
              {step < 4
                ? <KButton onClick={() => setStep(step + 1)} disabled={!valid[step]} icon={<Icons.ArrowRight size={18} />}>{L.next}</KButton>
                : <KButton onClick={send} disabled={!valid[4]} icon={<Icons.ArrowUpRight size={18} />}>{L.send}</KButton>}
            </div>
          </BentoCard>

          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--sp-6)' }}>
            {(L.promise || []).map((pr) => (
              <span key={pr} className="k-chip"><Icons.Check size={14} style={{ color: 'var(--accent-strong)' }} /><strong>{pr}</strong></span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomeBuyers, RFQView });
