// K-Aqua Redesign — Views 1: Home, Products, Solutions
// Keine Bild-URLs im Code — PICS sind reine Slot-IDs (Nutzer zieht eigene Fotos hinein).
const PICS = {
  house: 'house',
  products: 'products',
  env: 'env',
  recycle: 'recycle',
  superior: 'superior',
  kaqua: 'kaqua',
  kessel: 'kessel',
  dakks: 'dakks',
};

/* =====================  HOME  ===================== */
function HomeView({ go }) {
  const { t } = useT();
  const X = usePageL('homex');
  return (
    <main className="k-page">
      {/* HERO + SCROLLY GLOBE */}
      <HeroScrolly go={go} />

      {/* MARQUEE */}
      <div className="k-marquee" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="k-marquee-track">
            {X.marquee.map((m, i) => (
              <React.Fragment key={i}><span>{m}</span><span className="dot">●</span></React.Fragment>
            ))}
          </div>
        ))}
      </div>

      {/* STATS */}
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--sp-4)' }}>
            {X.stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 70}>
                <BentoCard style={{ height: '100%', gap: 0 }}>
                  <span className="k-stat-num">{s.n}<span style={{ fontSize: '0.45em', fontWeight: 700, marginLeft: 3, color: 'var(--accent-strong)' }}>{s.u}</span></span>
                  <span className="k-stat-label">{s.l}</span>
                </BentoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FÜR KÄUFER & PLANER */}
      <HomeBuyers go={go} />

      {/* ENTERPRISE: live telemetry, material layup, compliance, range, global network */}
      <EnterpriseSection go={go} />

      {/* INTERACTIVE TOOLS */}
      <section className="k-section">
        <div className="k-container">
          <SectionHead eyebrow={t.home.toolsEyebrow} title={<span>{t.home.toolsTitle1} <span className="k-grad-text">{t.home.toolsTitle2}</span></span>}
            lead={t.home.toolsLead} />
          <div className="k-bento">
            {X.tools.map((c, i) => {
              const icons = { finder: 'Ruler', co2: 'Recycle', academy: 'Flame', references: 'Globe', trust: 'Shield', career: 'Users' };
              const Ic = Icons[icons[c.id]];
              return (
                <Reveal key={c.id} delay={(i % 3) * 80} style={{ gridColumn: 'span 2' }}>
                  <BentoCard style={{ height: '100%' }}>
                    <div className="k-icon-chip"><Ic size={24} /></div>
                    <h3 className="k-h3">{c.t}</h3>
                    <p className="k-body" style={{ flex: 1 }}>{c.d}</p>
                    <button type="button" className="k-link" onClick={() => go(c.id)}>{c.cta} <Icons.ArrowRight size={16} /></button>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* DIGITAL VS PDF */}
      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead align="center" eyebrow={X.vsEyebrow} title={X.vsTitle} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--sp-4)', maxWidth: 900, marginInline: 'auto' }}>
            <Reveal>
              <div className="k-vs-col bad">
                <h3 className="k-h3" style={{ fontSize: 18 }}>{X.vsBadTitle}</h3>
                {X.vsBad.map((x) => (
                  <div key={x} className="k-vs-row"><Icons.X size={18} style={{ flexShrink: 0, marginTop: 3 }} /><span>{x}</span></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="k-vs-col good">
                <h3 className="k-h3" style={{ fontSize: 18 }}>{X.vsGoodTitle}</h3>
                {X.vsGood.map((x) => (
                  <div key={x} className="k-vs-row"><Icons.Check size={18} style={{ flexShrink: 0, marginTop: 3, color: 'var(--accent-strong)' }} /><span>{x}</span></div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BENTO: company + partnership */}
      <section className="k-section">
        <div className="k-container">
          <SectionHead
            eyebrow={X.coEyebrow}
            title={<span>{X.coTitle1} <span className="k-grad-text">{X.coTitle2}</span></span>}
            lead={X.coLead}
          />
          <div className="k-bento">
            <Reveal style={{ gridColumn: 'span 4' }}>
              <BentoCard style={{ height: '100%' }}>
                <Photo src={PICS.kessel} alt="Partnerschaft mit KESSEL" ratio="16 / 7" />
                <div>
                  <h3 className="k-h3" style={{ marginBottom: 'var(--sp-2)' }}>{X.kesselTitle}</h3>
                  <p className="k-body">{X.kesselText}</p>
                </div>
                <button type="button" className="k-link" onClick={() => go('partner')}>{X.kesselCta} <Icons.ArrowRight size={16} /></button>
              </BentoCard>
            </Reveal>
            <Reveal delay={100} style={{ gridColumn: 'span 2' }}>
              <BentoCard tint style={{ height: '100%', justifyContent: 'space-between' }}>
                <div className="k-icon-chip"><Icons.Globe size={24} /></div>
                <div>
                  <h3 className="k-h3" style={{ marginBottom: 'var(--sp-2)' }}>{X.worldTitle}</h3>
                  <p className="k-body">{X.worldText}</p>
                </div>
                <button type="button" className="k-link" onClick={() => go('references')}>{X.worldCta} <Icons.ArrowRight size={16} /></button>
              </BentoCard>
            </Reveal>
            <Reveal delay={60} style={{ gridColumn: 'span 2' }}>
              <BentoCard style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Shield size={24} /></div>
                <h3 className="k-h3">{X.cards[0].t}</h3>
                <p className="k-body">{X.cards[0].d}</p>
              </BentoCard>
            </Reveal>
            <Reveal delay={120} style={{ gridColumn: 'span 2' }}>
              <BentoCard style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Factory size={24} /></div>
                <h3 className="k-h3">{X.cards[1].t}</h3>
                <p className="k-body">{X.cards[1].d}</p>
              </BentoCard>
            </Reveal>
            <Reveal delay={180} style={{ gridColumn: 'span 2' }}>
              <BentoCard style={{ height: '100%' }}>
                <div className="k-icon-chip"><Icons.Recycle size={24} /></div>
                <h3 className="k-h3">{X.cards[2].t}</h3>
                <p className="k-body">{X.cards[2].d}</p>
              </BentoCard>
            </Reveal>
          </div>
        </div>
      </section>

      <HomeDeep go={go} />

      {/* CTA */}
      <section className="k-section k-section--subtle">
        <div className="k-container">
          <Reveal>
            <div className="k-cta-band">
              <div style={{ position: 'relative', maxWidth: 640 }}>
                <h2 className="k-h2" style={{ marginBottom: 'var(--sp-4)' }}>{t.home.bandTitle}</h2>
                <p style={{ opacity: 0.75, marginBottom: 'var(--sp-8)', fontSize: 17 }}>{t.home.bandLead}</p>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
                  <KButton variant="inverse" size="lg" onClick={() => go('contact')} icon={<Icons.ArrowRight size={18} />}>{t.home.bandBtn}</KButton>
                  <KButton variant="ghost" size="lg" onClick={() => go('service')}>{t.home.bandBtn2}</KButton>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* =====================  PRODUCTS  ===================== */
function ProductsView({ go }) {
  const L = usePageL('products');
  const rangeIcons = ['Layers', 'Wrench', 'Flame', 'Thermometer'];
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <section className="k-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
        <div className="k-container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)', gap: 'var(--sp-12)', alignItems: 'center' }}>
            <div>
              <Reveal><Eyebrow>{L.eyebrow}</Eyebrow></Reveal>
              <Reveal delay={60}><h1 className="k-h1" style={{ fontSize: 'clamp(36px, 4.6vw, 60px)' }}>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></h1></Reveal>
              <Reveal delay={140}>
                <p className="k-lead">{L.lead}</p>
              </Reveal>
              <Reveal delay={220}>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-8)' }}>
                  <KButton href="https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf" icon={<Icons.Download size={18} />}>{L.ctaCatalog}</KButton>
                  <KButton variant="ghost" onClick={() => go('service')}>{L.ctaVideos}</KButton>
                </div>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <Photo src={PICS.products} alt="K-Aqua Produktprogramm" ratio="4 / 3.4" radius="var(--radius-lg)" style={{ boxShadow: 'var(--shadow-lift)' }} />
            </Reveal>
          </div>
        </div>
      </section>

      <GlobeScrollFX variant="blueprint" fx="horizon" size={300} />

      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead eyebrow={L.sysEyebrow} title={L.sysTitle} />
          <PipeFX variant="flow" size={520} />
          <div className="k-bento">
            {L.range.map((r, i) => {
              const Ic = Icons[rangeIcons[i]];
              return (
                <Reveal key={r.t} delay={i * 80} style={{ gridColumn: 'span 3' }}>
                  <BentoCard style={{ height: '100%' }}>
                    <div className="k-icon-chip"><Ic size={24} /></div>
                    <h3 className="k-h3">{r.t}</h3>
                    <p className="k-body">{r.d}</p>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="k-section">
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: 'var(--sp-12)', alignItems: 'start' }}>
          <Reveal>
            <div>
              <SectionHead eyebrow={L.techEyebrow} title={L.techTitle} lead={L.techLead} />
              <KButton href="https://www.k-aqua.de/PDF/K-Aqua_Product_Features_en.pdf" variant="ghost" icon={<Icons.Download size={18} />}>{L.ctaFeatures}</KButton>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BentoCard style={{ padding: 'var(--sp-6)' }}>
              <table className="k-table">
                <thead>
                  <tr>{L.tableHead.map((h) => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {L.tableRows.map((row) => (
                    <tr key={row[0]}>{row.map((c, j) => <td key={j}>{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </BentoCard>
          </Reveal>
        </div>
      </section>

      <ProductsDeep />
      <CatalogDeep />
    </main>
  );
}

/* =====================  SOLUTIONS  ===================== */
function SolutionsView({ go }) {
  const L = usePageL('solutions');
  const benefitIcons = ['Leaf', 'Recycle', 'Shield', 'Thermometer'];
  const benefitImgs = [PICS.env, PICS.recycle, PICS.superior, null];
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <section className="k-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
        <div className="k-container" style={{ position: 'relative' }}>
          <Reveal><Eyebrow>{L.eyebrow}</Eyebrow></Reveal>
          <Reveal delay={60}><h1 className="k-h1" style={{ fontSize: 'clamp(36px, 4.6vw, 60px)' }}>{L.title1} <span className="k-grad-text">{L.titleGrad}</span> {L.title2}</h1></Reveal>
          <Reveal delay={140}><p className="k-lead">{L.lead}</p></Reveal>
        </div>
      </section>

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container">
          <div className="k-bento">
            {L.benefits.map((b, i) => {
              const Ic = Icons[benefitIcons[i]];
              const img = benefitImgs[i];
              const wide = i === 0 || i === 3;
              return (
                <Reveal key={b.t} delay={i * 80} style={{ gridColumn: `span ${wide ? 4 : 2}` }}>
                  <BentoCard tint={i === 3} style={{ height: '100%' }}>
                    {img ? <Photo src={img} alt={b.t} ratio={wide ? '16 / 6' : '16 / 9'} /> : <div className="k-icon-chip" style={{ width: 56, height: 56 }}><Ic size={28} /></div>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                      {img ? <div className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Ic size={20} /></div> : null}
                      <h3 className="k-h3">{b.t}</h3>
                    </div>
                    <p className="k-body">{b.d}</p>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <SolutionsDeep />

      <GlobeScrollFX variant="fluid" fx="parallax" size={300} />

      <section className="k-section k-section--subtle">
        <div className="k-container" style={{ textAlign: 'center' }}>
          <Reveal>
            <SectionHead align="center" eyebrow={L.nextEyebrow} title={L.nextTitle} lead={L.nextLead} />
            <KButton size="lg" onClick={() => go('products')} icon={<Icons.ArrowRight size={18} />}>{L.nextCta}</KButton>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { HomeView, ProductsView, SolutionsView, PICS });
