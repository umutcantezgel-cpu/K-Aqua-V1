// K-Aqua Globe Suite — KAquaLightGlobeShowcase. Pure light-mode, three
// switchable canvas variations built on kaqua-globe-engine.js + real
// coastline data (world-atlas, graticule fallback). Palette restricted to
// --primary (violet), --background/--card (white), and gray tokens only —
// no cyan, no dark surfaces anywhere.
const { useState, useEffect, useRef, useMemo } = React;
const { project, rotatePoint, fibonacciSphere, getWorldLines, readTokens, prefersReducedMotion } = window.KAquaGlobeEngine;

const GS_SIZE = 480;

/* illustrative demo nodes — NOT asserted real K-Aqua office locations */
const GS_NODES = [
  { id: 'NODE_A', lon: 8.4, lat: 50.5, label: 'Referenzstandort A' },
  { id: 'NODE_B', lon: -74.0, lat: 40.7, label: 'Referenzstandort B' },
  { id: 'NODE_C', lon: 103.8, lat: 1.35, label: 'Referenzstandort C' },
  { id: 'NODE_D', lon: 31.0, lat: -26.2, label: 'Referenzstandort D' },
];

function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => { setRm(prefersReducedMotion()); }, []);
  return rm;
}

function GlobeCanvas({ mode, speed, zoom, density, onTelemetry }) {
  const canvasRef = useRef(null);
  const rotRef = useRef(20);
  const tiltRef = useRef(-0.28);
  const dragRef = useRef({ dragging: false, sx: 0, sy: 0, sRot: 0, sTilt: 0 });
  const hoverRef = useRef(null);
  const linesRef = useRef(null);
  const particlesRef = useRef(fibonacciSphere(density));
  const reduced = useReducedMotion();

  useEffect(() => { getWorldLines((lines) => { linesRef.current = lines; }); }, []);
  useEffect(() => { particlesRef.current = fibonacciSphere(density); }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = GS_SIZE * dpr;
    canvas.height = GS_SIZE * dpr;
    canvas.style.width = GS_SIZE + 'px';
    canvas.style.height = GS_SIZE + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    const cx = GS_SIZE / 2, cy = GS_SIZE / 2;
    let raf = null;
    let last = 0;

    function nodeScreenPos(R) {
      return GS_NODES.map((n) => {
        const p = project(n.lon, n.lat, rotRef.current, tiltRef.current);
        return { ...n, x: cx + p.x * R, y: cy - p.y * R, z: p.z };
      });
    }

    function drawBlueprint(tok, R) {
      // sphere rim
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();

      const lines = linesRef.current || [];
      ctx.strokeStyle = tok.mutedForeground;
      ctx.lineWidth = 0.8; ctx.globalAlpha = 0.55; ctx.lineJoin = 'round';
      for (const line of lines) {
        let started = false; ctx.beginPath();
        for (const [lon, lat] of line) {
          const p = project(lon, lat, rotRef.current, tiltRef.current);
          if (p.z > 0.02) {
            const px = cx + p.x * R, py = cy - p.y * R;
            if (started) ctx.lineTo(px, py); else { ctx.moveTo(px, py); started = true; }
          } else started = false;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const nodes = nodeScreenPos(R);
      for (const n of nodes) {
        if (n.z <= 0.02) continue;
        const hot = hoverRef.current === n.id;
        ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 5.5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = hot ? tok.primary : tok.card;
        ctx.strokeStyle = hot ? tok.primary : tok.mutedForeground;
        ctx.lineWidth = 1.4; ctx.fill(); ctx.stroke();
        if (hot) {
          ctx.beginPath(); ctx.arc(n.x, n.y, 11, 0, Math.PI * 2);
          ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.4; ctx.lineWidth = 1.4; ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      return nodes;
    }

    function drawFluid(tok, R, t) {
      const grad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      grad.addColorStop(0, tok.background); grad.addColorStop(1, tok.backgroundSubtle);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      ctx.strokeStyle = tok.cardBorder; ctx.lineWidth = 1; ctx.stroke();

      // orbiting flow trails (violet only, varying opacity/radius)
      const trails = [
        { r: R * 1.14, sp: 0.00048, span: 2.0, w: 2.2 },
        { r: R * 1.26, sp: -0.00033, span: 1.5, w: 1.5 },
        { r: R * 1.38, sp: 0.00021, span: 2.4, w: 1.1 },
      ];
      for (const tr of trails) {
        const head = t * tr.sp * speed;
        const steps = 30;
        for (let i = 0; i < steps; i++) {
          const a0 = head - (i / steps) * tr.span;
          const a1 = head - ((i + 1) / steps) * tr.span;
          ctx.beginPath(); ctx.arc(cx, cy, tr.r, a1, a0);
          ctx.strokeStyle = tok.primary;
          ctx.globalAlpha = 0.5 * (1 - i / steps);
          ctx.lineWidth = tr.w * (1 - 0.5 * i / steps);
          ctx.lineCap = 'round'; ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // great-circle flow arcs connecting nodes (on-surface streams)
      const nodes = nodeScreenPos(R);
      for (let i = 0; i < GS_NODES.length; i++) {
        const a = GS_NODES[i], b = GS_NODES[(i + 1) % GS_NODES.length];
        const steps = 48;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= steps; s++) {
          const f = s / steps;
          const lon = a.lon + (b.lon - a.lon) * f;
          const lat = a.lat + (b.lat - a.lat) * f;
          const p = project(lon, lat, rotRef.current, tiltRef.current);
          if (p.z > 0.01) {
            const px = cx + p.x * R, py = cy - p.y * R;
            if (started) ctx.lineTo(px, py); else { ctx.moveTo(px, py); started = true; }
          } else started = false;
        }
        ctx.setLineDash([6, 7]);
        ctx.lineDashOffset = -t * 0.02 * speed;
        ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.6; ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        if (n.z <= 0.01) continue;
        const hot = hoverRef.current === n.id;
        const pulse = hot ? (Math.sin(t * 0.006) * 0.5 + 0.5) : 0;
        if (hot) {
          ctx.beginPath(); ctx.arc(n.x, n.y, 8 + pulse * 14, 0, Math.PI * 2);
          ctx.strokeStyle = tok.primary; ctx.globalAlpha = 0.35 * (1 - pulse); ctx.lineWidth = 2; ctx.stroke();
          ctx.globalAlpha = 1;
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, hot ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = tok.primary; ctx.fill();
      }
      return nodes;
    }

    function drawMatrix(tok, R, t, mouse) {
      const rotDeg = rotRef.current;
      const pts = particlesRef.current.map((p) => rotatePoint(p, rotDeg, tiltRef.current));
      const wobble = reduced ? 0 : Math.sin(t * 0.0012) * 0.012;
      for (const p of pts) {
        if (p.z < -0.15) continue;
        let px = cx + p.x * R * (1 + wobble);
        let py = cy - p.y * R * (1 + wobble);
        if (mouse) {
          const dx = px - mouse.x, dy = py - mouse.y;
          const d = Math.hypot(dx, dy);
          const field = 70;
          if (d < field && d > 0.01) {
            const f = (1 - d / field) * 16;
            px += (dx / d) * f; py += (dy / d) * f;
          }
        }
        const depth = (p.z + 1) / 2;
        const size = 0.7 + depth * 1.6;
        ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = depth > 0.55 ? tok.primary : tok.mutedForeground;
        ctx.globalAlpha = 0.35 + depth * 0.55;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // HUD rings with degree ticks, counter-rotating
      function ring(radiusMul, angDeg, color, dir) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((angDeg * dir) * Math.PI / 180);
        ctx.beginPath(); ctx.ellipse(0, 0, R * radiusMul, R * radiusMul * 0.32, 0, 0, Math.PI * 2);
        ctx.strokeStyle = color; ctx.globalAlpha = 0.35; ctx.lineWidth = 1; ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.font = '9px ui-monospace, monospace';
        ctx.fillStyle = color;
        for (let d = 0; d < 360; d += 30) {
          const rad = d * Math.PI / 180;
          const tx = Math.cos(rad) * R * radiusMul, ty = Math.sin(rad) * R * radiusMul * 0.32;
          ctx.globalAlpha = 0.6;
          ctx.fillText(d + '°', tx + 4, ty);
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }
      ring(1.22, (t * 0.006 * speed) % 360, tok.mutedForeground, 1);
      ring(1.34, (t * 0.004 * speed) % 360, tok.primary, -1);
      return [];
    }

    function frame(t) {
      const tok = readTokens();
      ctx.clearRect(0, 0, GS_SIZE, GS_SIZE);
      const R = GS_SIZE * 0.31 * zoom;
      const dt = t - last; last = t;
      const auto = reduced ? 0 : dt * 0.01 * speed;
      if (!dragRef.current.dragging) rotRef.current += auto;

      let nodes = [];
      if (mode === 'blueprint') nodes = drawBlueprint(tok, R);
      else if (mode === 'fluid') nodes = drawFluid(tok, R, t);
      else nodes = drawMatrix(tok, R, t, hoverRef.current && hoverRef.current.mouse);

      if (onTelemetry) {
        onTelemetry({
          rot: ((rotRef.current % 360) + 360) % 360,
          tilt: tiltRef.current,
          active: (hoverRef.current && hoverRef.current.id) || '—',
        });
      }
      raf = requestAnimationFrame(frame);
    }
    frame(0);                       // static first frame (non-painting preview iframes never fire rAF)
    raf = requestAnimationFrame(frame);

    function findNode(px, py, R) {
      const nodes = nodeScreenPos(R);
      for (const n of nodes) {
        if (n.z > 0.01 && Math.hypot(px - n.x, py - n.y) < 14) return n.id;
      }
      return null;
    }

    function onDown(e) {
      dragRef.current = { dragging: true, sx: e.clientX, sy: e.clientY, sRot: rotRef.current, sTilt: tiltRef.current };
      canvas.style.cursor = 'grabbing';
      try { canvas.setPointerCapture(e.pointerId); } catch (err) {}
    }
    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left, py = e.clientY - rect.top;
      const R = GS_SIZE * 0.31 * zoom;
      if (dragRef.current.dragging) {
        rotRef.current = dragRef.current.sRot + (e.clientX - dragRef.current.sx) * 0.4;
        tiltRef.current = Math.max(-1.4, Math.min(1.4, dragRef.current.sTilt + (e.clientY - dragRef.current.sy) * 0.007));
        return;
      }
      if (mode === 'matrix') {
        hoverRef.current = { mouse: { x: px, y: py } };
        canvas.style.cursor = 'default';
      } else {
        const hit = findNode(px, py, R);
        hoverRef.current = hit;
        canvas.style.cursor = hit ? 'pointer' : 'grab';
      }
    }
    function onUp() { dragRef.current.dragging = false; canvas.style.cursor = mode === 'matrix' ? 'default' : 'grab'; }
    function onLeave() { if (mode === 'matrix') hoverRef.current = null; }

    canvas.style.cursor = mode === 'matrix' ? 'default' : 'grab';
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [mode, speed, zoom, density, reduced]);

  return <canvas ref={canvasRef} aria-label="K-Aqua Globus-Visualisierung" role="img"></canvas>;
}

const MODES = [
  { id: 'blueprint', label: 'Clean Blueprint' },
  { id: 'fluid', label: 'Purple Fluid Core' },
  { id: 'matrix', label: 'Telemetry Matrix' },
];

function KAquaLightGlobeShowcase() {
  const [mode, setMode] = useState('blueprint');
  const [speed, setSpeed] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [density, setDensity] = useState(1400);
  const [tel, setTel] = useState({ rot: 0, tilt: 0, active: '—' });

  const telemetryFields = useMemo(() => {
    if (mode === 'blueprint') return [
      ['ROT_DEG', tel.rot.toFixed(1) + '°'],
      ['TILT_RAD', tel.tilt.toFixed(3)],
      ['ACTIVE_NODE', tel.active],
      ['SOURCE', 'world-atlas 110m'],
    ];
    if (mode === 'fluid') return [
      ['FLOW_VELOCITY', (speed * 1.8).toFixed(2) + ' m/s (demo)'],
      ['STREAM_COUNT', String(MODES.length + 1)],
      ['ACTIVE_NODE', tel.active],
      ['ROT_DEG', tel.rot.toFixed(1) + '°'],
    ];
    return [
      ['PARTICLE_COUNT', String(density)],
      ['ROTATION_SPEED', (speed * 4.2).toFixed(1) + ' RPM (demo)'],
      ['CURSOR_FIELD', 'AKTIV'],
      ['ROT_DEG', tel.rot.toFixed(1) + '°'],
    ];
  }, [mode, tel, speed, density]);

  return (
    <div className="gs-page">
      <div className="gs-head">
        <div className="gs-eyebrow"><span className="dot"></span>K-Aqua // Globe Suite — Light Mode</div>
        <h1 className="gs-title">Drei Visualisierungen. Ein Globus.</h1>
        <p className="gs-lead">Interaktive Demo-Varianten für globale Präsenz &amp; Vernetzung — rein hell, ohne Fremdfarben, aufgebaut auf den bestehenden K-Aqua-Tokens.</p>
      </div>

      <div className="gs-stage">
        <div className="gs-tabs" role="tablist" aria-label="Globus-Variation wählen">
          {MODES.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={mode === m.id}
              className={`gs-tab ${mode === m.id ? 'active' : ''}`} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="gs-canvas-wrap">
          <GlobeCanvas mode={mode} speed={speed} zoom={zoom} density={density} onTelemetry={setTel} />
          <span className="gs-caption">Ziehen zum Drehen{mode !== 'matrix' ? ' · Knoten anklicken' : ' · Maus als Kraftfeld'}</span>
        </div>

        <div className="gs-params">
          <div className="gs-param">
            <label>Rotationsgeschwindigkeit <span className="val">{speed.toFixed(1)}×</span></label>
            <input type="range" min="0" max="2.5" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} />
          </div>
          <div className="gs-param">
            <label>Zoom <span className="val">{Math.round(zoom * 100)}%</span></label>
            <input type="range" min="0.7" max="1.4" step="0.05" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} />
          </div>
          <div className={`gs-param ${mode !== 'matrix' ? 'disabled' : ''}`}>
            <label>Partikeldichte <span className="val">{density}</span></label>
            <input type="range" min="400" max="3000" step="100" value={density} onChange={(e) => setDensity(parseInt(e.target.value, 10))} disabled={mode !== 'matrix'} />
          </div>
        </div>

        <div className="gs-telemetry">
          {telemetryFields.map(([k, v]) => (
            <div className="gs-tel-item" key={k}><span className="gs-tel-k">{k}</span><span className="gs-tel-v">{v}</span></div>
          ))}
        </div>
      </div>

      <p className="gs-note" style={{ marginTop: 28 }}>Illustrative Demo-Visualisierung — Knotenpunkte sind Platzhalter, keine bestätigten K-Aqua-Standorte.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<KAquaLightGlobeShowcase />);
