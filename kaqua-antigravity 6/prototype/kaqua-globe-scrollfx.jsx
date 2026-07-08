// K-Aqua — scroll-linked globe FX. 12 effects, combinable with every globe
// variant (GLOBE_VARIANTS in kaqua-globe-variants.jsx). Motion is applied to a
// wrapper div (the canvas keeps its own self-rotation), driven by scroll
// progress p ∈ [0,1] of the element through the viewport.
const { useEffect: useFXE, useRef: useFXR } = React;

const K_GLOBE_FX = {
  rise: (el, p) => { const c = Math.min(1, p * 2); el.style.opacity = c; el.style.transform = `translateY(${(1 - c) * 80}px)`; },
  zoom: (el, p) => { const c = Math.min(1, p * 1.6); el.style.opacity = Math.min(1, p * 3); el.style.transform = `scale(${0.6 + c * 0.4})`; },
  spin: (el, p) => { el.style.opacity = 1; el.style.transform = `rotate(${(p - 0.5) * 60}deg)`; },
  parallax: (el, p) => { el.style.opacity = 1; el.style.transform = `translateY(${(0.5 - p) * 60}px)`; },
  driftL: (el, p) => { el.style.opacity = Math.min(1, p * 2.5); el.style.transform = `translateX(${(0.5 - p) * 140}px)`; },
  driftR: (el, p) => { el.style.opacity = Math.min(1, p * 2.5); el.style.transform = `translateX(${(p - 0.5) * 140}px)`; },
  tilt: (el, p) => { el.style.opacity = 1; el.style.transform = `perspective(800px) rotateX(${(0.5 - p) * 40}deg)`; },
  sway: (el, p) => { el.style.opacity = 1; el.style.transform = `rotate(${Math.sin(p * Math.PI * 2) * 8}deg) translateY(${(0.5 - p) * 40}px)`; },
  blurIn: (el, p) => { const c = Math.min(1, p * 2.2); el.style.opacity = c; el.style.filter = `blur(${(1 - c) * 12}px)`; el.style.transform = 'none'; },
  orbit: (el, p) => { const a = (p - 0.5) * Math.PI; el.style.opacity = 1; el.style.transform = `translate(${Math.sin(a) * 70}px, ${(0.5 - p) * 50}px) rotate(${(p - 0.5) * 30}deg)`; },
  pulse: (el, p) => { el.style.opacity = Math.min(1, p * 3); el.style.transform = `scale(${1 + Math.sin(p * Math.PI) * 0.12})`; },
  horizon: (el, p) => { const c = Math.min(1, p * 2); el.style.opacity = c; el.style.transform = `translateY(${(1 - c) * 40}%) scale(${0.9 + c * 0.1})`; el.style.clipPath = `inset(0 0 ${(1 - c) * 55}% 0)`; },
};

function GlobeScrollFX({ fx = 'rise', variant = 'blueprint', size = 300, subtle = true }) {
  const wrapRef = useFXR(null);
  const innerRef = useFXR(null);
  useFXE(() => {
    const el = wrapRef.current, inner = innerRef.current;
    if (!el || !inner) return;
    const fn = K_GLOBE_FX[fx];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !fn) { inner.style.opacity = 1; inner.style.transform = 'none'; return; }
    let raf = null;
    const apply = () => {
      raf = null;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      fn(inner, p);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fx]);
  const Variant = (window.GLOBE_VARIANTS_MAP && window.GLOBE_VARIANTS_MAP[variant]) || window.GlobeBlueprint;
  return (
    <div ref={wrapRef} className={`k-globe-divider k-globe-fx ${subtle ? 'k-globe-divider--fade' : ''} is-in`}
      data-screen-label={`Globe FX: ${fx} / ${variant}`}>
      <div ref={innerRef} className="k-globe-fx-inner"><Variant size={size} /></div>
    </div>
  );
}

Object.assign(window, { GlobeScrollFX, K_GLOBE_FX });
