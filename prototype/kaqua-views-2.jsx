// K-Aqua Redesign — Views 2: Service, About, News, Contact, Imprint
// Alle Texte über usePageL() — universelle Übersetzung (de/en/ar + Fallback).

function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="k-section" style={{ position: 'relative', overflow: 'hidden', paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
      <div className="k-container" style={{ position: 'relative' }}>
        <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>
        <Reveal delay={60}><h1 className="k-h1" style={{ fontSize: 'clamp(36px, 4.6vw, 60px)' }}>{title}</h1></Reveal>
        {lead ? <Reveal delay={140}><p className="k-lead">{lead}</p></Reveal> : null}
      </div>
    </section>
  );
}

/* =====================  SERVICE  ===================== */
const K_DL_LINKS = [
  'https://www.k-aqua.de/PDF/K-Aqua_Product_Range_en.pdf',
  'https://www.k-aqua.de/PDF/K-Aqua_Product_Features_en.pdf',
  'https://www.k-aqua.de/PDF/K-Aqua_Quality_Assurance_en.pdf',
];
const K_VIDEO_LINKS = [
  'https://www.youtube.com/watch?v=d56p048YB2o&t=20s',
  'https://www.youtube.com/watch?v=yD99teROIKc&t=59s',
  'https://www.youtube.com/watch?v=ob2wMFZgm0k',
  'https://www.youtube.com/watch?v=Ws7-whaL-q8&t=43s',
];

function ServiceView() {
  const L = usePageL('service');
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>} lead={L.lead} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container">
          <SectionHead eyebrow={L.dlEyebrow} title={L.dlTitle} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.downloads.map((d, i) => (
              <Reveal key={d.t} delay={i * 80}>
                <a href={K_DL_LINKS[i]} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <BentoCard style={{ height: '100%', flexDirection: 'row', alignItems: 'center', gap: 'var(--sp-4)' }}>
                    <div className="k-icon-chip"><Icons.FileText size={24} /></div>
                    <div style={{ flex: 1 }}>
                      <h3 className="k-h3" style={{ fontSize: 17 }}>{d.t}</h3>
                      <p className="k-body" style={{ fontSize: 14 }}>{d.s}</p>
                    </div>
                    <Icons.Download size={20} style={{ color: 'var(--primary)' }} />
                  </BentoCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead eyebrow={L.vidEyebrow} title={L.vidTitle} lead={L.vidLead} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--sp-4)' }}>
            {L.videos.map((v, i) => (
              <Reveal key={v.t} delay={i * 80}>
                <a href={K_VIDEO_LINKS[i]} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <BentoCard style={{ height: '100%' }}>
                    <div style={{ aspectRatio: '16 / 9', borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--inverse-surface), oklch(0.3 0.08 302))', display: 'grid', placeItems: 'center', color: '#fff' }}>
                      <span style={{ width: 56, height: 56, borderRadius: '50%', background: 'oklch(1 0 0 / 0.15)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center', border: '1px solid oklch(1 0 0 / 0.3)' }}>
                        <Icons.Play size={26} strokeWidth={1.8} />
                      </span>
                    </div>
                    <h3 className="k-h3" style={{ fontSize: 17 }}>{v.t}</h3>
                    <p className="k-body" style={{ fontSize: 14, marginTop: -8 }}>{v.s}</p>
                  </BentoCard>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* =====================  ABOUT  ===================== */
function AboutView({ go }) {
  const L = usePageL('about');
  const cardIcons = ['Users', 'Handshake', 'Leaf'];
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>} lead={L.lead} />

      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--sp-12)', alignItems: 'center' }}>
          <Reveal>
            <Photo src="kaqua" alt={L.h2} ratio="4 / 3" radius="var(--radius-lg)" style={{ boxShadow: 'var(--shadow-lift)' }} />
          </Reveal>
          <Reveal delay={120}>
            <div>
              <h2 className="k-h2" style={{ marginBottom: 'var(--sp-4)' }}>{L.h2}</h2>
              <p className="k-body" style={{ marginBottom: 'var(--sp-4)' }}>{L.p1}</p>
              <p className="k-body">{L.p2}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="k-section k-section--subtle">
        <div className="k-container">
          <SectionHead eyebrow={L.polEyebrow} title={L.polTitle} lead={L.polLead} />
          <div className="k-bento">
            {L.cards.map((c, i) => {
              const Ic = Icons[cardIcons[i]];
              return (
                <Reveal key={c.t} delay={i * 80} style={{ gridColumn: 'span 2' }}>
                  <BentoCard style={{ height: '100%' }}>
                    <div className="k-icon-chip"><Ic size={24} /></div>
                    <h3 className="k-h3">{c.t}</h3>
                    <p className="k-body">{c.d}</p>
                  </BentoCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="k-section">
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 'var(--sp-12)', alignItems: 'start' }}>
          <Reveal>
            <div>
              <SectionHead eyebrow={L.genauEyebrow} title={L.genauTitle} lead={L.genauLead} />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
                {L.points.map((t) => (
                  <li key={t} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'flex-start', color: 'var(--muted-foreground)' }}>
                    <span style={{ color: 'var(--accent-strong)', marginTop: 3 }}><Icons.Check size={18} /></span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <BentoCard tint>
              <div className="k-icon-chip"><Icons.Award size={24} /></div>
              <h3 className="k-h3">{L.certTitle}</h3>
              <p className="k-body">{L.certText}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                {['ISO 9001:2015', 'ISO 14001:2015', 'ISO 50001:2018'].map((c) => (
                  <span key={c} className="k-chip" style={{ background: 'var(--card)', fontSize: 13 }}><strong>{c}</strong></span>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* =====================  NEWS & EVENTS  ===================== */
function NewsView() {
  const L = usePageL('news');
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>} />
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 0.7fr)', gap: 'var(--sp-4)', alignItems: 'start' }}>
          <Reveal>
            <BentoCard>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--faint-foreground)' }}>{L.date}</span>
              <h2 className="k-h2" style={{ fontSize: 'clamp(24px, 2.6vw, 34px)' }}>{L.h2}</h2>
              <p className="k-body">{L.p}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {L.iso.map(([code, label]) => (
                  <li key={code} style={{ display: 'flex', gap: 'var(--sp-3)', alignItems: 'center', color: 'var(--muted-foreground)' }}>
                    <span style={{ color: 'var(--accent-strong)' }}><Icons.Check size={18} /></span>
                    <span><strong style={{ color: 'var(--foreground)' }}>{code}</strong> — {label}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-2)' }}>
                <KButton size="sm" href="https://www.k-aqua.de/PDF/KWT%20Zertifikat%20Deutsch.pdf" icon={<Icons.Download size={16} />}>{L.btnDe}</KButton>
                <KButton size="sm" variant="ghost" href="https://www.k-aqua.de/PDF/KWT%20Zertifikate%20English.pdf" icon={<Icons.Download size={16} />}>{L.btnEn}</KButton>
              </div>
            </BentoCard>
          </Reveal>
          <Reveal delay={120}>
            <BentoCard tint>
              <div className="k-icon-chip"><Icons.MapPin size={24} /></div>
              <h3 className="k-h3">{L.eventsTitle}</h3>
              <p className="k-body">{L.eventsText}</p>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* =====================  CONTACT  ===================== */
function ContactView() {
  const L = usePageL('contact');
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>} />
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--sp-4)' }}>
          <Reveal>
            <BentoCard style={{ height: '100%' }}>
              <div className="k-icon-chip"><Icons.MapPin size={24} /></div>
              <h3 className="k-h3">{L.locTitle}</h3>
              <p className="k-body">KWT GmbH<br />Auweg 3<br />35647 Waldsolms-Brandoberndorf</p>
            </BentoCard>
          </Reveal>
          <Reveal delay={80}>
            <BentoCard style={{ height: '100%' }}>
              <div className="k-icon-chip"><Icons.Phone size={24} /></div>
              <h3 className="k-h3">{L.salesTitle}</h3>
              <p className="k-body">Tel. +49 (0)60 85 / 9868-410<br />Fax +49 (0)60 85 / 9868-420</p>
              <a className="k-link" href="mailto:info@k-aqua.de">info@k-aqua.de <Icons.ArrowUpRight size={16} /></a>
            </BentoCard>
          </Reveal>
          <Reveal delay={160}>
            <BentoCard tint style={{ height: '100%' }}>
              <div className="k-icon-chip"><Icons.Wrench size={24} /></div>
              <h3 className="k-h3">{L.supportTitle}</h3>
              <p className="k-body">{L.supportText}</p>
              <a className="k-link" href="mailto:support@k-aqua.de">support@k-aqua.de <Icons.ArrowUpRight size={16} /></a>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* =====================  IMPRINT  ===================== */
function ImprintView() {
  const L = usePageL('imprint');
  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={L.title} />
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ maxWidth: 820 }}>
          <Reveal>
            <BentoCard style={{ padding: 'var(--sp-6)' }}>
              <table className="k-table">
                <tbody>
                  {L.rows.map(([k, v]) => (
                    <tr key={k}><th style={{ borderBottom: '1px solid var(--card-border)', width: 180 }}>{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </BentoCard>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { ServiceView, AboutView, NewsView, ContactView, ImprintView, PageHero });
