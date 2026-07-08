// K-Aqua — Globus-Hub: the site menu as a giant interactive geo globe.
// Every page is pinned to a real location; hover a page → the globe flies
// there; click a marker or list item → navigate. Replaces the mega menu
// (toggle in Tweaks). Built on KAquaLoader.createGlobe (markers, flyTo, drag).
const { useEffect: useHE, useRef: useHR, useState: useHS } = React;

const K_HUB_GEO = {
  home: [50.42, 8.62],      // HQ Waldsolms
  products: [53.55, 9.99],  // Hamburg
  finder: [47.37, 8.54],    // Zürich
  co2: [59.91, 10.75],      // Oslo
  rfq: [48.14, 11.58],      // München
  solutions: [48.21, 16.37],// Wien
  academy: [50.11, 8.68],   // Frankfurt
  trust: [50.85, 4.35],     // Brüssel
  service: [51.92, 4.48],   // Rotterdam
  partner: [48.76, 11.42],  // Lenting (KESSEL)
  markets: [1.35, 103.82],  // Singapur
  references: [25.2, 55.27],// Dubai
  about: [50.58, 8.68],     // Gießen
  career: [52.52, 13.4],    // Berlin
  news: [51.51, -0.13],     // London
  contact: [50.94, 6.96],   // Köln
};

const K_HUB_LAYOUT = [
  { group: 'tools', items: ['home', 'products', 'finder', 'co2', 'rfq', 'solutions'] },
  { group: 'knowledge', items: ['academy', 'trust', 'service', 'partner'] },
  { group: 'company', items: ['markets', 'references', 'about', 'career', 'news', 'contact'] },
];

function GlobeHub({ page, go, onClose }) {
  const { t } = useT();
  const canvasRef = useHR(null);
  const globeRef = useHR(null);
  const navT = useHR(null);
  const [active, setActive] = useHS(page);

  const label = (id) => {
    const meta = (t.pages && t.pages[id]) || null;
    return meta ? meta : [(t.nav && t.nav[id]) || id, ''];
  };

  useHE(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (navT.current) clearTimeout(navT.current);
    };
  }, []);

  useHE(() => {
    if (!canvasRef.current || !window.KAquaLoader) return;
    const desktop = window.innerWidth > 860;
    const size = desktop
      ? Math.round(Math.max(340, Math.min(620, window.innerWidth - 480, window.innerHeight - 150)))
      : Math.round(Math.min(340, window.innerWidth - 48));
    const markers = Object.keys(K_HUB_GEO).map((id) => ({
      lat: K_HUB_GEO[id][0], lon: K_HUB_GEO[id][1], title: id, label: label(id)[0],
    }));
    const globe = KAquaLoader.createGlobe(canvasRef.current, {
      size, interactive: true, whirl: false, speed: 0,
      markers,
      onMarker: (mk) => navTo(mk.title),
      onHover: (mk) => { if (mk) setActive(mk.title); },
    });
    const home = K_HUB_GEO[page] || K_HUB_GEO.home;
    globe.flyTo(home[1], home[0]);
    globe.setActive(page);
    globeRef.current = globe;
    return () => globe.stop();
  }, []);

  const fly = (id) => {
    setActive(id);
    const g = K_HUB_GEO[id];
    if (globeRef.current && g) { globeRef.current.flyTo(g[1], g[0]); globeRef.current.setActive(id); }
  };
  const navTo = (id) => {
    fly(id);
    if (navT.current) clearTimeout(navT.current);
    navT.current = setTimeout(() => { go(id); onClose(); }, 420);
  };

  return (
    <div className="k-hub" role="dialog" aria-modal="true" aria-label={t.nav.menu} data-screen-label="Globus-Hub">
      <div className="k-hub-list">
        {K_HUB_LAYOUT.map((sec) => (
          <React.Fragment key={sec.group}>
            <span className="k-mega-head">{t.groups[sec.group]}</span>
            {sec.items.map((id) => {
              const meta = label(id);
              return (
                <button key={id} type="button" className={`k-mega-item ${active === id ? 'is-active' : ''}`}
                  onMouseEnter={() => fly(id)} onFocus={() => fly(id)} onClick={() => navTo(id)}>
                  <span className="t">{meta[0]}</span>
                  {meta[1] ? <span className="s">{meta[1]}</span> : null}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <div className="k-hub-stage">
        <canvas ref={canvasRef}></canvas>
        <span className="k-hub-active"><i></i>{label(active)[0]}</span>
      </div>
      <button type="button" className="k-icon-btn k-hub-close" aria-label="Schließen" onClick={onClose}>
        <Icons.X size={20} />
      </button>
    </div>
  );
}

Object.assign(window, { GlobeHub });
