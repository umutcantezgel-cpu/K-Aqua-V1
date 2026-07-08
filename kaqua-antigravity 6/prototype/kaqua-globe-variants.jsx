// K-Aqua — textless decorative globe variants + scroll-reveal wrapper.
// Pure visual widgets (no labels/markers/copy) meant to be dropped into any
// page as a segment. Built on kaqua-globe-engine.js (project(), fibonacciSphere(),
// rotatePoint(), readTokens(), getWorldLines()) — must load AFTER that script.
const { useEffect: useGVE, useRef: useGVR, useState: useGVS } = React;

function useInViewOnce(ref) {
  const [inView, setInView] = useGVS(false);
  useGVE(() => {
    if (!ref.current) return;
    if (!('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

/* ---------- shared canvas engine hook ---------- */
function useGlobeCanvas(canvasRef, size, drawFn) {
  useGVE(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { getWorldLines, prefersReducedMotion } = window.KAquaGlobeEngine;
    const reduced = prefersReducedMotion();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = size + 'px'; canvas.style.height = size + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    let linesRef = null;
    getWorldLines((l) => { linesRef = l; });
    let raf = null, rot = Math.random() * 360;
    function frame(t) {
      drawFn(ctx, size, rot, t, () => linesRef);
      if (!reduced) rot += 0.012;
      raf = requestAnimationFrame(frame);
    }
    frame(0);
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [size]);
}

/* ---------- 1. Blueprint: fine coastlines, gray + primary accents ---------- */
function GlobeBlueprint({ size = 320 }) {
  const ref = useGVR(null);
  useGlobeCanvas(ref, size, (ctx, sz, rotDeg, t, getLines) => {
    const { project, readTokens } = window.KAquaGlobeEngine;
    const tok = readTokens();
    const cx = sz / 2, cy = sz / 2, R = sz * 0.42, tilt = -0.3;
    ctx.clearRect(0, 0, sz, sz);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();
    const lines = getLines() || [];
    ctx.strokeStyle = tok.mutedForeground; ctx.lineWidth = 0.8; ctx.globalAlpha = 0.6;
    for (const line of lines) {
      let started = false; ctx.beginPath();
      for (const [lon, lat] of line) {
        const p = project(lon, lat, rotDeg, tilt);
        if (p.z > 0.02) {
          const px = cx + p.x * R, py = cy - p.y * R;
          if (started) ctx.lineTo(px, py); else { ctx.moveTo(px, py); started = true; }
        } else started = false;
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

/* ---------- 2. Fluid Core: violet flowing streams ---------- */
function GlobeFluid({ size = 320 }) {
  const ref = useGVR(null);
  useGlobeCanvas(ref, size, (ctx, sz, rotDeg, t) => {
    const { readTokens } = window.KAquaGlobeEngine;
    const tok = readTokens();
    const cx = sz / 2, cy = sz / 2, R = sz * 0.4;
    ctx.clearRect(0, 0, sz, sz);
    const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
    grad.addColorStop(0, tok.background); grad.addColorStop(1, tok.backgroundSubtle);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();
    const trails = [
      { r: R * 1.12, sp: 0.0006, span: 2.0, w: 2.2 },
      { r: R * 1.24, sp: -0.0004, span: 1.5, w: 1.5 },
      { r: R * 1.36, sp: 0.00026, span: 2.4, w: 1.1 },
    ];
    for (const tr of trails) {
      const head = t * tr.sp;
      const steps = 30;
      for (let i = 0; i < steps; i++) {
        const a0 = head - (i / steps) * tr.span;
        const a1 = head - ((i + 1) / steps) * tr.span;
        ctx.beginPath(); ctx.arc(cx, cy, tr.r, a1, a0);
        ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.5 * (1 - i / steps);
        ctx.lineWidth = tr.w * (1 - 0.5 * i / steps); ctx.lineCap = 'round'; ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  });
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

/* ---------- 3. Telemetry Matrix: dot-matrix sphere + HUD rings ---------- */
function GlobeMatrix({ size = 320, density = 900 }) {
  const ref = useGVR(null);
  const ptsRef = useGVR(null);
  useGlobeCanvas(ref, size, (ctx, sz, rotDeg, t) => {
    const { rotatePoint, fibonacciSphere, readTokens } = window.KAquaGlobeEngine;
    if (!ptsRef.current) ptsRef.current = fibonacciSphere(density);
    const tok = readTokens();
    const cx = sz / 2, cy = sz / 2, R = sz * 0.4, tilt = -0.3;
    ctx.clearRect(0, 0, sz, sz);
    const pts = ptsRef.current.map((p) => rotatePoint(p, rotDeg, tilt));
    for (const p of pts) {
      if (p.z < -0.15) continue;
      const px = cx + p.x * R, py = cy - p.y * R;
      const depth = (p.z + 1) / 2;
      ctx.beginPath(); ctx.arc(px, py, 0.6 + depth * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = depth > 0.55 ? tok.primary : tok.mutedForeground;
      ctx.globalAlpha = 0.3 + depth * 0.55; ctx.fill();
    }
    ctx.globalAlpha = 1;
    function ring(mul, ang, color, dir) {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate((ang * dir) * Math.PI / 180);
      ctx.beginPath(); ctx.ellipse(0, 0, R * mul, R * mul * 0.32, 0, 0, Math.PI * 2);
      ctx.strokeStyle = color; ctx.globalAlpha = 0.3; ctx.lineWidth = 1; ctx.stroke();
      ctx.globalAlpha = 1; ctx.restore();
    }
    ring(1.2, (t * 0.006) % 360, tok.mutedForeground, 1);
    ring(1.32, (t * 0.004) % 360, tok.primary, -1);
  });
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

/* ---------- 4. Orbit Network: hub nodes + animated connection arcs ---------- */
function GlobeNetwork({ size = 320 }) {
  const ref = useGVR(null);
  const HUBS = [[8.6, 50.1], [-74, 40.7], [55.3, 25.2], [103.8, 1.35], [18.4, -33.9], [-46.6, -23.5], [139.7, 35.7], [151.2, -33.9]];
  useGlobeCanvas(ref, size, (ctx, sz, rotDeg, t) => {
    const { project, readTokens } = window.KAquaGlobeEngine;
    const tok = readTokens();
    const cx = sz / 2, cy = sz / 2, R = sz * 0.4, tilt = -0.3;
    ctx.clearRect(0, 0, sz, sz);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();
    const pts = HUBS.map(([lon, lat]) => { const p = project(lon, lat, rotDeg, tilt); return { x: cx + p.x * R, y: cy - p.y * R, z: p.z }; });
    ctx.lineWidth = 1;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 3) % pts.length];
      if (a.z < 0.05 || b.z < 0.05) continue;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const ox = mx - cx, oy = my - cy, olen = Math.hypot(ox, oy) || 1;
      const lift = Math.min(46, len * 0.25);
      ctx.beginPath(); ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(mx + (ox / olen) * lift, my + (oy / olen) * lift, b.x, b.y);
      ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.35;
      ctx.setLineDash([4, 5]); ctx.lineDashOffset = -t * 0.02; ctx.stroke();
      ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
    for (const p of pts) {
      if (p.z < 0.05) continue;
      const pulse = 2.2 + Math.sin(t * 0.003 + p.x) * 0.8;
      ctx.beginPath(); ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2); ctx.fillStyle = tok.primary; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, pulse + 3.5, 0, Math.PI * 2);
      ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.25; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1;
    }
  });
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

/* ---------- 5. Contour Grid: graticule wireframe, accented equator ---------- */
function GlobeContour({ size = 320 }) {
  const ref = useGVR(null);
  useGlobeCanvas(ref, size, (ctx, sz, rotDeg) => {
    const { project, readTokens } = window.KAquaGlobeEngine;
    const tok = readTokens();
    const cx = sz / 2, cy = sz / 2, R = sz * 0.42, tilt = -0.35;
    ctx.clearRect(0, 0, sz, sz);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();
    ctx.lineWidth = 0.9;
    function trace(gen, color, alpha) {
      ctx.beginPath(); let started = false;
      for (const [lon, lat] of gen) {
        const p = project(lon, lat, rotDeg, tilt);
        if (p.z > 0) {
          const x = cx + p.x * R, y = cy - p.y * R;
          if (started) ctx.lineTo(x, y); else { ctx.moveTo(x, y); started = true; }
        } else started = false;
      }
      ctx.strokeStyle = color; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1;
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const seg = []; for (let lat = -88; lat <= 88; lat += 4) seg.push([lon, lat]);
      trace(seg, tok.mutedForeground, 0.35);
    }
    for (let lat = -60; lat <= 60; lat += 20) {
      const seg = []; for (let lon = 0; lon <= 360; lon += 4) seg.push([lon, lat]);
      trace(seg, lat === 0 ? tok.primary : tok.mutedForeground, lat === 0 ? 0.85 : 0.35);
    }
  });
  return <canvas ref={ref} aria-hidden="true"></canvas>;
}

const GLOBE_VARIANTS = { blueprint: GlobeBlueprint, fluid: GlobeFluid, matrix: GlobeMatrix, network: GlobeNetwork, contour: GlobeContour };
window.GLOBE_VARIANTS_MAP = GLOBE_VARIANTS;

/* ---------- textless, scroll-revealed page segment ---------- */
function GlobeDivider({ variant = 'blueprint', size = 320, subtle = true }) {
  const wrapRef = useGVR(null);
  const inView = useInViewOnce(wrapRef);
  const Variant = GLOBE_VARIANTS[variant] || GlobeBlueprint;
  return (
    <div ref={wrapRef} className={`k-globe-divider ${subtle ? 'k-globe-divider--fade' : ''} ${inView ? 'is-in' : ''}`} data-screen-label={`Globe: ${variant}`}>
      <Variant size={size} />
    </div>
  );
}

Object.assign(window, { GlobeBlueprint, GlobeFluid, GlobeMatrix, GlobeNetwork, GlobeContour, GlobeDivider });
