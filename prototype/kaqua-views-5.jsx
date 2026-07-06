// K-Aqua Redesign — Views 5: Karriere-Tools (Benefits-Rechner, Culture Matcher) + Referenz-Globus
const { useState: useS5, useEffect: useE5, useRef: useRef5 } = React;

/* =====================  KARRIERE: BENEFITS-RECHNER + CULTURE MATCHER  ===================== */
const K_BENEFITS = [
  { id: 'sachbezug', label: 'Sachbezugskarte', net: 50, d: 'Steuerfreier Sachbezug — monatlich aufs Kartenkonto.' },
  { id: 'lunch', label: 'Essenszuschuss', net: 108, d: 'Digitale Essensmarken für Mittagessen & Supermarkt.' },
  { id: 'internet', label: 'Internetpauschale', net: 50, d: 'Zuschuss zur privaten Internetnutzung.' },
  { id: 'jobrad', label: 'JobRad-Leasing', net: 45, d: 'Wunschrad per Gehaltsumwandlung — Ersparnis vs. Privatkauf.' },
  { id: 'kita', label: 'Kita-Zuschuss', net: 100, d: 'Steuerfreier Zuschuss zur Kinderbetreuung.' },
  { id: 'vwl', label: 'Vermögenswirksame Leistungen', net: 40, d: 'Monatlicher Sparbeitrag vom Arbeitgeber.' },
];

const K_CULTURE = [
  { q: 'Wie arbeiten Sie am liebsten?', opts: ['Klare Abläufe, eingespieltes Team', 'Jeden Tag etwas Neues ausprobieren'], scores: [1, 0] },
  { q: 'Großserie läuft. Eine Maschine meldet eine Abweichung.', opts: ['Sofort hinschauen, Ursache finden', 'Erstmal weiterlaufen lassen'], scores: [1, 0] },
  { q: 'Was motiviert Sie mehr?', opts: ['Ein Produkt, das 50 Jahre hält', 'Schnelle, sichtbare Ergebnisse'], scores: [1, 0.5] },
  { q: 'Schichtarbeit ist für Sie …', opts: ['Planbar und okay', 'Eher schwierig'], scores: [1, 0] },
  { q: 'Ihr Verhältnis zu Technik?', opts: ['Ich will verstehen, wie Dinge funktionieren', 'Hauptsache es läuft'], scores: [1, 0.5] },
];

function CareerToolsView({ go }) {
  const L = usePageL('career');
  const { lang } = useT();
  const [sel, setSel] = useS5(['sachbezug', 'lunch']);
  const [used, setUsed] = useS5(false);
  const [cStep, setCStep] = useS5(-1);
  const [cScore, setCScore] = useS5(0);

  const toggleB = (id) => {
    setSel(sel.includes(id) ? sel.filter((x) => x !== id) : sel.concat(id));
  };
  const net = K_BENEFITS.filter((b) => sel.includes(b.id)).reduce((s, b) => s + b.net, 0);
  const grossEquiv = Math.round(net / 0.55 / 10) * 10; // ≈ what a raise would need to be, demo

  const cAnswer = (i) => {
    const sc = cScore + K_CULTURE[cStep].scores[i];
    setCScore(sc);
    const s = cStep + 1;
    setCStep(s);
  };
  const cPct = Math.round((cScore / K_CULTURE.length) * 100);

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />

      {/* Benefits-Rechner */}
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 'var(--sp-8)', alignItems: 'start' }}>
          <div>
            <SectionHead eyebrow={L.benEyebrow} title={L.benTitle} lead={L.benLead} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--sp-3)' }}>
              {K_BENEFITS.map((b) => (
                <label key={b.id} className={`k-doc-check ${sel.includes(b.id) ? 'is-on' : ''}`} style={{ alignItems: 'flex-start', paddingBlock: 'var(--sp-3)' }}>
                  <input type="checkbox" checked={sel.includes(b.id)} onChange={() => toggleB(b.id)} style={{ marginTop: 3 }} />
                  <span>
                    <strong style={{ display: 'block', fontFamily: 'var(--font-heading)' }}>{(L.benefits[b.id] || [b.label])[0]} <span style={{ color: 'var(--primary)' }}>+{b.net} €</span></strong>
                    <span style={{ fontSize: 13.5, color: 'var(--muted-foreground)' }}>{(L.benefits[b.id] || [b.label, b.d])[1]}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
          <BentoCard tint className="k-sticky-result" style={{ gap: 'var(--sp-2)' }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>{L.resultLabel}</span>
            <span className="k-result-num">{net} €</span>
            <p className="k-body">{L.resultNote1} <strong style={{ color: 'var(--foreground)' }}>{kFmt(L.resultNote2, { n: grossEquiv.toLocaleString(lang) })}</strong> {L.resultNote3} <span style={{ fontSize: 13 }}>{L.resultNote4}</span></p>
            <KButton href="mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua" icon={<Icons.ArrowUpRight size={18} />}>{L.apply}</KButton>
            <a className="k-link" href="tel:+4960859868410">{L.call}</a>
          </BentoCard>
        </div>
      </section>

      {/* Culture Matcher */}
      <section className="k-section k-section--subtle">
        <div className="k-container" style={{ maxWidth: 720 }}>
          <SectionHead align="center" eyebrow={L.cmEyebrow} title={L.cmTitle} />
          <BentoCard style={{ minHeight: 280 }}>
            {cStep === -1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', alignItems: 'center', textAlign: 'center', margin: 'auto' }}>
                <div className="k-icon-chip" style={{ width: 64, height: 64 }}><Icons.Users size={32} /></div>
                <p className="k-body">{L.cmIntro}</p>
                <KButton onClick={() => { setCStep(0); setCScore(0); }} icon={<Icons.ArrowRight size={18} />}>{L.cmStart}</KButton>
              </div>
            ) : cStep < K_CULTURE.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--primary)' }}>{L.qLabel} {cStep + 1} / {K_CULTURE.length}</span>
                <h3 className="k-h3">{L.cmQ[cStep].q}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                  {L.cmQ[cStep].o.map((o, i) => (
                    <button key={o} type="button" className="k-quiz-opt" onClick={() => cAnswer(i)}>{o}</button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', alignItems: 'center', textAlign: 'center', margin: 'auto' }}>
                <span className="k-result-num">{cPct}%</span>
                <p className="k-body">
                  {cPct >= 80 ? L.resHigh : cPct >= 50 ? L.resMid : L.resLow}
                </p>
                <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <KButton href="mailto:andrea.nickel@k-aqua.de?subject=Bewerbung%20bei%20K-Aqua">{L.sendApp}</KButton>
                  <KButton variant="ghost" onClick={() => { setCStep(-1); setCScore(0); }}>{L.again}</KButton>
                </div>
              </div>
            )}
          </BentoCard>
        </div>
      </section>
    </main>
  );
}

/* =====================  REFERENZ-GLOBUS  ===================== */
const K_PROJECTS = [
  { lat: 50.4, lon: 8.5, title: 'Waldsolms, Deutschland', d: 'Stammwerk & Entwicklung — hier entsteht jedes K-Aqua-Rohr.' },
  { lat: 25.2, lon: 55.3, title: 'Dubai, VAE', d: 'Hochhaus-Steigleitungen — PP-RCT für Heißwasser unter Wüstenbedingungen.' },
  { lat: 52.2, lon: 21.0, title: 'Warschau, Polen', d: 'Wohnquartier-Neubau — komplette Trinkwasserinstallation d20–d110.' },
  { lat: 41.0, lon: 28.9, title: 'Istanbul, Türkei', d: 'Hotelkomplex — Zirkulationsleitungen mit Faserverbundrohr.' },
  { lat: 1.35, lon: 103.8, title: 'Singapur', d: 'Infrastrukturprojekt — Großdimensionen bis d630 im Stumpfschweißverfahren.' },
  { lat: -33.9, lon: 18.4, title: 'Kapstadt, Südafrika', d: 'Krankenhausneubau — hygienische Trinkwasserverteilung.' },
  { lat: 51.5, lon: -0.1, title: 'London, UK', d: 'Bürosanierung — korrosionsfreier Ersatz für Bestandsleitungen.' },
];

function GlobeRefView({ go }) {
  const L = usePageL('refs');
  const canvasRef = useRef5(null);
  const [active, setActive] = useS5(K_PROJECTS[0]);
  const [spun, setSpun] = useS5(false);

  useE5(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: 460, interactive: true, whirl: false, speed: 0.006,
      markers: K_PROJECTS.map((p) => ({ ...p })),
      onMarker: (mk) => setActive(K_PROJECTS.find((p) => p.title === mk.title) || K_PROJECTS[0]),
      onDrag: () => setSpun(true),
    });
    return () => globe.stop();
  }, []);

  return (
    <main className="k-page" style={{ paddingTop: 72 }}>
      <PageHero eyebrow={L.eyebrow} title={<span>{L.title1} <span className="k-grad-text">{L.titleGrad}</span></span>}
        lead={L.lead} />
      <section className="k-section" style={{ paddingTop: 0 }}>
        <div className="k-container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: 'var(--sp-8)', alignItems: 'center' }}>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <canvas ref={canvasRef} aria-label={L.canvasAria}></canvas>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <BentoCard tint>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                <div className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Icons.MapPin size={20} /></div>
                <h3 className="k-h3">{active.title}</h3>
              </div>
              <p className="k-body">{active.d}</p>
            </BentoCard>
            <div className="k-chips">
              {K_PROJECTS.map((p) => (
                <button key={p.title} type="button" className={`k-filter-chip ${active.title === p.title ? 'is-on' : ''}`}
                  onClick={() => setActive(p)}>{p.title.split(',')[0]}</button>
              ))}
            </div>
            <p className="k-body" style={{ fontSize: 13.5 }}>{L.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

Object.assign(window, { CareerToolsView, GlobeRefView, K_PROJECTS });
