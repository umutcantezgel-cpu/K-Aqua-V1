// K-Aqua — Hero-Scrollytelling: auto-rotierender Globus, der beim Scrollen
// in einer Kreisbewegung zur Mitte wandert, wächst und Schwerpunkt-Karten
// aufploppen lässt. Danach scrollt die Seite normal weiter.
function HeroScrolly({ go }) {
  const { t } = useT();
  const wrapRef = React.useRef(null);
  const globeWrapRef = React.useRef(null);
  const mobWrapRef = React.useRef(null);
  const glowRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const copyRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const hintRef = React.useRef(null);
  const [staticMode] = React.useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 900);

  const [GSIZE] = React.useState(() => staticMode
    ? Math.round(Math.min(440, window.innerWidth * 0.86))
    : Math.round(Math.min(480, window.innerWidth * 0.42)));
  const cards = t.home.scrolly || [];
  const cardPos = [
    { left: 'max(3vw, 16px)', top: '16%' },
    { right: 'max(3vw, 16px)', top: '22%' },
    { left: 'max(5vw, 20px)', bottom: '16%' },
    { right: 'max(5vw, 20px)', bottom: '13%' },
  ];
  const cardIcons = ['Factory', 'Ruler', 'Award', 'Globe'];

  // globe
  React.useEffect(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size: GSIZE, interactive: true, whirl: false, speed: 0.004,
      markers: [
        { lat: 50.49, lon: 8.51, label: 'Waldsolms' },
        { lat: 25.2, lon: 55.3 }, { lat: 1.35, lon: 103.8 }, { lat: 51.5, lon: -0.1 },
      ],
    });
    return () => globe.stop();
  }, []);

  // scroll choreography (direct DOM writes, rAF-throttled)
  React.useEffect(() => {
    if (staticMode) return;
    let ticking = false;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const update = () => {
      ticking = false;
      const wrap = wrapRef.current, gw = globeWrapRef.current;
      if (!wrap || !gw) return;
      const vh = window.innerHeight;
      const total = wrap.offsetHeight - vh;
      const p = Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total));

      // 1) hero copy fades up and out
      const fade = Math.min(1, p / 0.12);
      const copy = copyRef.current;
      if (copy) {
        copy.style.opacity = String(1 - fade);
        copy.style.transform = `translateY(${-fade * 70}px)`;
        copy.style.pointerEvents = fade > 0.4 ? 'none' : '';
      }

      // 2) globe arcs from hero-right to center on a circular path + grows
      const e = ease(Math.min(1, p / 0.42));
      const x0 = Math.min(window.innerWidth * 0.27, 560);
      const th = e * Math.PI * 1.12;          // Kreisbogen: rechts → unten → Mitte
      const R = x0 * (1 - e);
      const x = Math.cos(th) * R;   // Start RECHTS (Copy links), Bogen unten herum zur Mitte
      const y = Math.sin(th) * R * 0.55;
      const s = 0.92 + e * 0.5;
      gw.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${s})`;
      if (glowRef.current) glowRef.current.style.opacity = String(0.25 + e * 0.75);

      // 3) focus cards pop in sequentially
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('is-in', p >= 0.45 + i * 0.125);
      });
      if (hintRef.current) hintRef.current.style.opacity = p > 0.93 ? '1' : '0';
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [staticMode]);

  // Mode B (kompakte Endgeräte / reduced-motion): Globus dreht weiter (Engine),
  // dazu sanfte Scroll-Parallax + gestaffelte Karten-Reveals — Animation auf
  // sämtlichen Endgeräten, nur bei reduced-motion statisch.
  React.useEffect(() => {
    if (!staticMode) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = cardRefs.current.filter(Boolean);
    let io = null;
    if (reduced || !('IntersectionObserver' in window)) {
      cards.forEach((el) => el.classList.add('is-in'));
    } else {
      io = new IntersectionObserver((es) => {
        es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { threshold: 0.3 });
      cards.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(el); });
    }
    if (reduced) return () => { if (io) io.disconnect(); };
    const gw = mobWrapRef.current;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (gw) gw.style.transform = `translateY(${Math.min(70, window.scrollY * 0.14)}px)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (io) io.disconnect();
    };
  }, [staticMode]);

  const heroCopy = (
    <div ref={copyRef} style={{ maxWidth: 620, position: 'relative', zIndex: 2 }}>
      <Reveal>
        <div className="k-chip" style={{ marginBottom: 'var(--sp-6)' }}>
          <Icons.Award size={15} />
          <span><strong>ISO 9001 · 14001 · 50001</strong> {t.home.chip}</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="k-h1">{t.home.h1a} <span className="k-grad-text">{t.home.h1b}</span></h1>
      </Reveal>
      <Reveal delay={160}><p className="k-lead" style={{ fontSize: 19 }}>{t.home.lead}</p></Reveal>
      <Reveal delay={240}>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', marginTop: 'var(--sp-8)' }}>
          <KButton size="lg" onClick={() => go('products')} icon={<Icons.ArrowRight size={18} />}>{t.home.ctaProducts}</KButton>
          <KButton size="lg" variant="ghost" onClick={() => go('contact')}>{t.home.ctaContact}</KButton>
        </div>
      </Reveal>
    </div>
  );

  const cardEls = cards.map((c, i) => {
    const Ic = Icons[cardIcons[i]] || Icons.Droplet;
    return (
      <div key={i} ref={(el) => { cardRefs.current[i] = el; }}
        className="k-orbit-card"
        style={staticMode ? {} : cardPos[i]}>
        <div className="k-icon-chip" style={{ width: 40, height: 40, borderRadius: 12 }}><Ic size={20} /></div>
        <strong>{c.t}</strong>
        <span>{c.d}</span>
      </div>
    );
  });

  if (staticMode) {
    return (
      <React.Fragment>
        <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 72 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
          <div className="k-container k-hero-static">
            {heroCopy}
            <div ref={mobWrapRef} className="k-hero-globe">
              <canvas ref={canvasRef} aria-label={t.home.globeAria} style={{ maxWidth: '100%' }}></canvas>
            </div>
          </div>
        </section>
        <section className="k-section" style={{ paddingTop: 0 }}>
          <div className="k-container k-orbit-static">{cardEls}</div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <div ref={wrapRef} className="k-scrolly">
      <div className="k-scrolly-stage">
        <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-wash)', pointerEvents: 'none' }}></div>
        <div ref={glowRef} className="k-scrolly-glow" aria-hidden="true"></div>
        <div className="k-container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
          {heroCopy}
        </div>
        <div ref={globeWrapRef} className="k-scrolly-globe">
          <canvas ref={canvasRef} aria-label={t.home.globeAria}></canvas>
        </div>
        {cardEls}
        <div ref={hintRef} className="k-scrolly-hint" aria-hidden="true">
          <Icons.ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroScrolly });
