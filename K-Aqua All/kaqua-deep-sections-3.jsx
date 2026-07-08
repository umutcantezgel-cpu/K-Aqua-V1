// K-Aqua Deep-Content — Sections 3: Über uns, Karriere, News, Kontakt,
// Referenzen, Lösungen (Werkstoffvergleich/Lebenszyklus), Home (Werk-Kennzahlen).
const { useState: useS3D } = React;

function AboutDeep() {
  const L = usePageL('aboutx');
  if (!L || !L.numTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="about-numbers">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.numEyebrow} title={L.numTitle} lead={L.numLead} /></Reveal>
          <Reveal delay={80}><StatBand stats={L.nums} /></Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="about-production">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.prodEyebrow} title={L.prodTitle} lead={L.prodLead} /></Reveal>
          <Reveal delay={80}><StepFlow steps={L.prod} /></Reveal>
        </div>
      </section>

      <section className="k-section" data-screen-label="about-house-of-kwt">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.houseEyebrow} title={L.houseTitle} lead={L.houseLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.house.map((h, i) => (
              <Reveal key={h.t} delay={i * 70}>
                <BentoCard tint style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 16.5 }}>{h.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{h.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="about-milestones">
        <div className="k-container" style={{ maxWidth: 760 }}>
          <Reveal><SectionHead eyebrow={L.mileEyebrow} title={L.mileTitle} /></Reveal>
          <div className="k-steps">
            {L.miles.map((m) => (
              <div key={m.t} className="k-step">
                <span className="k-step-num" aria-hidden="true" style={{ fontSize: 12.5, padding: '0 4px', width: 'auto', minWidth: 40, borderRadius: 999 }}>{m.y}</span>
                <div><h4>{m.t}</h4><p>{m.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function CareerDeep() {
  const L = usePageL('careerx');
  if (!L || !L.areaTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="career-areas">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.areaEyebrow} title={L.areaTitle} lead={L.areaLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.areas.map((a, i) => (
              <Reveal key={a.t} delay={i * 80}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{a.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{a.d}</p>
                  <p style={{ fontSize: 13, color: 'var(--faint-foreground)', marginTop: 'var(--sp-2)' }}>{a.p}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
          <p className="k-table-note" style={{ marginTop: 'var(--sp-4)' }}>{L.areaNote}</p>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="career-why">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.whyEyebrow} title={L.whyTitle} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.why.map((w, i) => (
              <Reveal key={w.t} delay={i * 70}>
                <BentoCard tint style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 16.5 }}>{w.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{w.d}</p>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section" data-screen-label="career-process">
        <div className="k-container" style={{ maxWidth: 720 }}>
          <Reveal><SectionHead eyebrow={L.procEyebrow} title={L.procTitle} /></Reveal>
          <Reveal delay={80}><StepFlow steps={L.proc} /></Reveal>
          <p style={{ fontWeight: 650, marginTop: 'var(--sp-4)' }}>{L.procContact}</p>
        </div>
      </section>
    </React.Fragment>
  );
}

function NewsDeep() {
  const L = usePageL('newsx');
  const [open, setOpen] = useS3D(-1);
  if (!L || !L.moreTitle) return null;
  return (
    <section className="k-section k-section--subtle" data-screen-label="news-more">
      <div className="k-container">
        <Reveal><SectionHead eyebrow={L.moreEyebrow} title={L.moreTitle} lead={L.moreLead} /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
          {L.posts.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.t} delay={i * 70}>
                <BentoCard className="k-article" style={{ height: '100%' }}>
                  <div className="k-article-meta"><span>{p.date}</span><span className="k-article-tag">{p.tag}</span></div>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{p.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{p.teaser}</p>
                  {isOpen ? (
                    <div className="k-article-body" style={{ marginTop: 'var(--sp-3)' }}>
                      {p.body.map((para, pi) => <p key={pi}>{para}</p>)}
                    </div>
                  ) : null}
                  <button type="button" onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{ marginTop: 'var(--sp-3)', background: 'none', border: 0, color: 'var(--primary)', fontWeight: 700, fontSize: 14, cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {isOpen ? L.readLess : L.readMore}
                    <Icons.ChevronDown size={15} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </BentoCard>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
          <BentoCard style={{ marginTop: 'var(--sp-6)' }}>
            <h3 className="k-h3" style={{ fontSize: 16.5 }}>{L.ishTitle}</h3>
            <p className="k-body">{L.ishText}</p>
          </BentoCard>
        </Reveal>
      </div>
    </section>
  );
}

function ContactDeep() {
  const L = usePageL('contactx');
  if (!L || !L.routeTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="contact-routes">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.routeEyebrow} title={L.routeTitle} lead={L.routeLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.routes.map((r, i) => (
              <Reveal key={r.t} delay={i * 80}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{r.t}</h3>
                  <p className="k-body" style={{ fontSize: 14.5 }}>{r.d}</p>
                  <KButton variant="secondary" size="sm" href={r.href} style={{ marginTop: 'var(--sp-2)' }}>{r.c}</KButton>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="contact-facts">
        <div className="k-container">
          <Reveal><SectionHead title={L.factsTitle} /></Reveal>
          <Reveal delay={80}>
            <div className="k-acc">
              {L.facts.map(([k, v]) => (
                <div key={k} className="k-acc-item is-open">
                  <div className="k-acc-btn" style={{ cursor: 'default' }}>
                    <span style={{ fontWeight: 700 }}>{k}</span>
                    <span style={{ fontWeight: 500, color: 'var(--muted-foreground)', fontSize: 14, textAlign: 'end' }}>{v}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="k-section" data-screen-label="contact-faq">
        <div className="k-container" style={{ maxWidth: 820 }}>
          <Reveal><SectionHead eyebrow={L.faqEyebrow} title={L.faqTitle} /></Reveal>
          <Reveal delay={80}><DeepFAQ items={L.faq} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function RefsDeep() {
  const L = usePageL('refsx');
  if (!L || !L.secTitle) return null;
  return (
    <section className="k-section k-section--subtle" data-screen-label="references-sectors">
      <div className="k-container">
        <Reveal><SectionHead eyebrow={L.secEyebrow} title={L.secTitle} lead={L.secLead} /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-4)' }}>
          {L.sectors.map((s, i) => (
            <Reveal key={s.t} delay={i * 80}>
              <BentoCard style={{ height: '100%' }}>
                <h3 className="k-h3" style={{ fontSize: 17 }}>{s.t}</h3>
                <p className="k-body" style={{ fontSize: 14.5 }}>{s.d}</p>
              </BentoCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionsDeep() {
  const L = usePageL('solutionsx');
  if (!L || !L.segTitle) return null;
  return (
    <React.Fragment>
      <section className="k-section" data-screen-label="solutions-segments">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.segEyebrow} title={L.segTitle} lead={L.segLead} /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.segments.map((s, i) => (
              <Reveal key={s.t} delay={i * 70}>
                <BentoCard style={{ height: '100%' }}>
                  <h3 className="k-h3" style={{ fontSize: 17 }}>{s.t}</h3>
                  <p className="k-body" style={{ fontSize: 14 }}>{s.d}</p>
                  <ul style={{ margin: 'var(--sp-2) 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {s.pts.map((pt) => (
                      <li key={pt} style={{ display: 'flex', gap: 6, fontSize: 13, color: 'var(--muted-foreground)' }}>
                        <Icons.Check size={14} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />{pt}
                      </li>
                    ))}
                  </ul>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle" data-screen-label="solutions-comparison">
        <div className="k-container">
          <Reveal><SectionHead eyebrow={L.cmpEyebrow} title={L.cmpTitle} lead={L.cmpLead} /></Reveal>
          <Reveal delay={80}><DeepMatrix head={L.cmpHead} rows={L.cmpRows} heroCol={1} note={L.cmpNote} /></Reveal>
        </div>
      </section>

      <section className="k-section" data-screen-label="solutions-lifecycle">
        <div className="k-container" style={{ maxWidth: 760 }}>
          <Reveal><SectionHead eyebrow={L.lifeEyebrow} title={L.lifeTitle} lead={L.lifeLead} /></Reveal>
          <Reveal delay={80}><StepFlow steps={L.life} /></Reveal>
        </div>
      </section>
    </React.Fragment>
  );
}

function HomeDeep({ go }) {
  const L = usePageL('homedeep');
  if (!L || !L.plantTitle) return null;
  return (
    <section className="k-section k-section--subtle" data-screen-label="home-plant-numbers">
      <div className="k-container">
        <Reveal><SectionHead eyebrow={L.plantEyebrow} title={L.plantTitle} /></Reveal>
        <Reveal delay={80}><StatBand stats={L.plant} /></Reveal>
        <Reveal delay={140}>
          <div style={{ marginTop: 'var(--sp-8)', textAlign: 'center' }}>
            <div className="k-badge-strip">
              {L.badges.map((b) => <span key={b} className="k-chip">{b}</span>)}
            </div>
            <p className="k-table-note" style={{ marginTop: 'var(--sp-3)' }}>{L.badgeNote}</p>
            {go ? (
              <div style={{ marginTop: 'var(--sp-4)' }}>
                <KButton variant="secondary" onClick={() => go('trust')} icon={<Icons.ArrowRight size={16} />}>{L.badgeCta}</KButton>
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { AboutDeep, CareerDeep, NewsDeep, ContactDeep, RefsDeep, SolutionsDeep, HomeDeep });
