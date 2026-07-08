// K-Aqua — PipeFX: firmenspezifische Canvas-Animationen (Wasser/Rohr/Produktion).
// Textfrei, hell, Token-Farben via KAquaGlobeEngine.readTokens(), reduced-motion-safe.
// <PipeFX variant="flow|droplet|reservoir|extruder|blueprint|scan|pressure|isonet" size={320} progress={0..1} />
const { useEffect: usePFE, useRef: usePFR } = React;

const K_PIPEFX_RATIO = { flow: 0.42, droplet: 0.7, reservoir: 0.78, extruder: 0.42, blueprint: 0.8, scan: 0.46, pressure: 0.8, isonet: 0.68 };

const K_PIPEFX = {
  /* laminar flow through a pipe — parabolic velocity profile */
  flow(ctx, w, h, t, tok) {
    const y1 = h * 0.22, y2 = h * 0.78;
    ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.75; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, y1); ctx.lineTo(w, y1); ctx.moveTo(0, y2); ctx.lineTo(w, y2); ctx.stroke();
    ctx.strokeStyle = tok.cardBorder; ctx.globalAlpha = 1; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, y1 + 5); ctx.lineTo(w, y1 + 5); ctx.moveTo(0, y2 - 5); ctx.lineTo(w, y2 - 5); ctx.stroke();
    for (let i = 0; i < 30; i++) {
      const seed = (i * 0.618034) % 1;
      const lane = (i % 6) / 5;                       // 0..1 across the bore
      const prof = Math.sin(Math.PI * (0.12 + lane * 0.76)); // fast center, slow walls
      const y = y1 + 8 + lane * (y2 - y1 - 16);
      const x = ((seed * (w + 40)) + t * (0.03 + 0.075 * prof)) % (w + 40) - 20;
      ctx.beginPath(); ctx.arc(x, y, 1.4 + prof * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = tok.primary; ctx.globalAlpha = 0.25 + prof * 0.55; ctx.fill();
    }
    ctx.globalAlpha = 1;
  },

  /* falling drop + impact rings */
  droplet(ctx, w, h, t, tok) {
    const cx = w / 2, iy = h * 0.72, T = 2400, ph = (t % T) / T;
    ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.5; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(w * 0.12, iy); ctx.lineTo(w * 0.88, iy); ctx.stroke(); ctx.globalAlpha = 1;
    if (ph < 0.42) {
      const f = ph / 0.42, y = 12 + (iy - 18 - 12) * f * f;
      ctx.beginPath(); ctx.arc(cx, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = tok.primary; ctx.fill();
    }
    for (let k = 0; k < 3; k++) {
      const rp = (ph - 0.42 - k * 0.1) / 0.55;
      if (rp > 0 && rp < 1) {
        ctx.beginPath(); ctx.ellipse(cx, iy, rp * w * 0.32, rp * w * 0.09, 0, 0, Math.PI * 2);
        ctx.strokeStyle = tok.primary; ctx.globalAlpha = (1 - rp) * 0.55; ctx.lineWidth = 1.5; ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  },

  /* reservoir fill level (progress-aware) with live surface + bubbles */
  reservoir(ctx, w, h, t, tok, progress) {
    const p = progress == null ? 0.66 : Math.min(1, Math.max(0, progress));
    const x0 = w * 0.18, x1 = w * 0.82, y0 = h * 0.1, y1 = h * 0.9, r = 14;
    ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.7; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1 - r); ctx.quadraticCurveTo(x0, y1, x0 + r, y1);
    ctx.lineTo(x1 - r, y1); ctx.quadraticCurveTo(x1, y1, x1, y1 - r); ctx.lineTo(x1, y0); ctx.stroke();
    ctx.globalAlpha = 1;
    const lvl = y1 - 6 - (y1 - y0 - 14) * p;
    ctx.beginPath(); ctx.moveTo(x0 + 3, lvl);
    for (let x = x0 + 3; x <= x1 - 3; x += 4) ctx.lineTo(x, lvl + Math.sin(t * 0.002 + x * 0.06) * 2.5);
    ctx.lineTo(x1 - 3, y1 - 3); ctx.lineTo(x0 + 3, y1 - 3); ctx.closePath();
    ctx.fillStyle = tok.primary; ctx.globalAlpha = 0.14; ctx.fill();
    ctx.globalAlpha = 0.8; ctx.strokeStyle = tok.primary; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = x0 + 3; x <= x1 - 3; x += 4) {
      const y = lvl + Math.sin(t * 0.002 + x * 0.06) * 2.5;
      x === x0 + 3 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const seed = (i * 0.618034) % 1;
      const bp = (t * 0.00035 + seed) % 1;
      const by = (y1 - 6) - bp * (y1 - 6 - lvl - 6);
      if (by > lvl + 4) {
        ctx.beginPath(); ctx.arc(x0 + 10 + seed * (x1 - x0 - 20), by, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = tok.primary; ctx.globalAlpha = 0.35 * (1 - bp); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  },

  /* extrusion line: pipe grows out of the die */
  extruder(ctx, w, h, t, tok) {
    const cy = h / 2, die = w * 0.14;
    ctx.fillStyle = tok.backgroundSubtle; ctx.strokeStyle = tok.mutedForeground; ctx.lineWidth = 1.5;
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.rect(6, h * 0.14, die, h * 0.72); ctx.fill(); ctx.stroke();
    const maxLen = w - die - 26, len = (t * 0.055) % maxLen;
    const x0 = 6 + die, xe = x0 + len;
    ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.85; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x0, cy - 13); ctx.lineTo(xe, cy - 13); ctx.moveTo(x0, cy + 13); ctx.lineTo(xe, cy + 13); ctx.stroke();
    ctx.globalAlpha = 0.4; ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.setLineDash([5, 6]);
    ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(xe, cy); ctx.stroke(); ctx.setLineDash([]);
    ctx.globalAlpha = 0.45; ctx.strokeStyle = tok.mutedForeground;
    for (let x = x0 + 34; x < xe; x += 34) { ctx.beginPath(); ctx.moveTo(x, cy - 13); ctx.lineTo(x, cy - 7); ctx.stroke(); }
    ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(xe, cy, 3 + Math.sin(t * 0.008) * 0.8, 0, Math.PI * 2); ctx.fillStyle = tok.primary; ctx.fill();
    ctx.beginPath(); ctx.moveTo(xe, cy - 13); ctx.lineTo(xe, cy + 13); ctx.strokeStyle = tok.primary; ctx.lineWidth = 1.5; ctx.stroke();
  },

  /* self-drawing technical cross-section with dimension line */
  blueprint(ctx, w, h, t, tok) {
    const cx = w / 2, cy = h / 2, R = h * 0.34, Ri = h * 0.22, T = 3000, ph = (t % T) / T;
    const arc1 = Math.min(1, ph / 0.38), arc2 = Math.min(1, Math.max(0, (ph - 0.3) / 0.38));
    ctx.strokeStyle = tok.mutedForeground; ctx.lineWidth = 1.4; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + arc1 * Math.PI * 2); ctx.stroke();
    if (arc2 > 0) { ctx.beginPath(); ctx.arc(cx, cy, Ri, -Math.PI / 2, -Math.PI / 2 + arc2 * Math.PI * 2); ctx.stroke(); }
    ctx.globalAlpha = 0.35; ctx.strokeStyle = tok.cardBorder; ctx.setLineDash([4, 5]);
    ctx.beginPath(); ctx.moveTo(cx - R - 12, cy); ctx.lineTo(cx + R + 12, cy);
    ctx.moveTo(cx, cy - R - 12); ctx.lineTo(cx, cy + R + 12); ctx.stroke(); ctx.setLineDash([]);
    const dp = Math.min(1, Math.max(0, (ph - 0.62) / 0.3));
    if (dp > 0) {
      const y = cy + R + 18, x0 = cx - R, x1 = cx - R + 2 * R * dp;
      ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.9; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0, y - 5); ctx.lineTo(x0, y + 5); ctx.stroke();
      if (dp === 1) { ctx.beginPath(); ctx.moveTo(x1, y - 5); ctx.lineTo(x1, y + 5); ctx.stroke(); }
    }
    ctx.globalAlpha = 1;
  },

  /* quality scan: laser sweeps the pipe profile, ticks confirm */
  scan(ctx, w, h, t, tok) {
    const y1 = h * 0.24, y2 = h * 0.66;
    ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.75; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(8, y1); ctx.lineTo(w - 8, y1); ctx.moveTo(8, y2); ctx.lineTo(w - 8, y2); ctx.stroke();
    ctx.strokeStyle = tok.cardBorder; ctx.globalAlpha = 1; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(8, y1 + 5); ctx.lineTo(w - 8, y1 + 5); ctx.moveTo(8, y2 - 5); ctx.lineTo(w - 8, y2 - 5); ctx.stroke();
    const lx = 8 + ((t * 0.07) % (w - 16));
    ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.18; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(lx, y1 - 12); ctx.lineTo(lx, y2 + 12); ctx.stroke();
    ctx.globalAlpha = 0.9; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(lx, y1 - 12); ctx.lineTo(lx, y2 + 12); ctx.stroke();
    for (let x = 20; x < w - 12; x += 26) {
      const done = x < lx;
      ctx.beginPath(); ctx.moveTo(x, h * 0.86); ctx.lineTo(x + 12, h * 0.86);
      ctx.strokeStyle = done ? tok.primary : tok.cardBorder; ctx.globalAlpha = done ? 0.8 : 0.6; ctx.lineWidth = 2; ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },

  /* pressure pulse rings around a cross-section */
  pressure(ctx, w, h, t, tok) {
    const cx = w / 2, cy = h / 2, core = h * 0.18;
    ctx.strokeStyle = tok.mutedForeground; ctx.lineWidth = 2; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(cx, cy, core, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.globalAlpha = 1;
    ctx.beginPath(); ctx.arc(cx, cy, core * 0.62, 0, Math.PI * 2); ctx.stroke();
    for (let k = 0; k < 3; k++) {
      const rp = ((t * 0.00045) + k / 3) % 1;
      ctx.beginPath(); ctx.arc(cx, cy, core + rp * h * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = tok.primary; ctx.globalAlpha = (1 - rp) * 0.45; ctx.lineWidth = 1.6 - rp; ctx.stroke();
    }
    ctx.globalAlpha = 1;
  },

  /* isometric pipe network assembling segment by segment */
  isonet(ctx, w, h, t, tok) {
    const ox = w * 0.5, oy = h * 0.24, u = Math.min(w, h) * 0.16;
    const iso = (x, y) => [ox + (x - y) * u, oy + (x + y) * u * 0.5];
    const segs = [[0,0,1,0],[1,0,2,0],[2,0,2,1],[2,1,2,2],[0,0,0,1],[0,1,1,1],[1,1,1,2],[1,2,2,2]];
    const cyc = segs.length + 2, idx = (t * 0.0011) % cyc;
    for (let i = 0; i < segs.length; i++) {
      const f = Math.min(1, Math.max(0, idx - i));
      if (f <= 0) continue;
      const [xa, ya, xb, yb] = segs[i];
      const [x0, y0] = iso(xa, ya), [x1, y1] = iso(xb, yb);
      const xe = x0 + (x1 - x0) * f, ye = y0 + (y1 - y0) * f;
      const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
      const nx = (-dy / L) * 3.5, ny = (dx / L) * 3.5;
      ctx.strokeStyle = tok.mutedForeground; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x0 + nx, y0 + ny); ctx.lineTo(xe + nx, ye + ny);
      ctx.moveTo(x0 - nx, y0 - ny); ctx.lineTo(xe - nx, ye - ny); ctx.stroke();
      ctx.beginPath(); ctx.arc(x0, y0, 2.6, 0, Math.PI * 2); ctx.fillStyle = tok.primary; ctx.globalAlpha = 0.9; ctx.fill();
      if (f === 1) { ctx.beginPath(); ctx.arc(x1, y1, 2.6, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(xe, ye, 2, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  },
};

function PipeFX({ variant = 'flow', size = 320, progress }) {
  const ref = usePFR(null);
  usePFE(() => {
    const canvas = ref.current;
    if (!canvas || !window.KAquaGlobeEngine) return;
    const { readTokens, prefersReducedMotion } = window.KAquaGlobeEngine;
    const draw = K_PIPEFX[variant] || K_PIPEFX.flow;
    const w = size, h = Math.round(size * (K_PIPEFX_RATIO[variant] || 0.5));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    if (prefersReducedMotion()) {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, 1300, readTokens(), progress);
      return;
    }
    let raf = null;
    const frame = (t) => {
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, t, readTokens(), progress);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [variant, size, progress]);
  return (
    <div style={{ display: 'grid', placeItems: 'center' }} data-screen-label={`PipeFX: ${variant}`}>
      <canvas ref={ref} aria-hidden="true"></canvas>
    </div>
  );
}

Object.assign(window, { PipeFX, K_PIPEFX });
