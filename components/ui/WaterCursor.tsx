'use client';

/**
 * WaterCursor — Custom-Cursor mit elastischem Ribbon-Schweif (WebGL2).
 *
 * Design direkt am React-Bits-<Ribbons/>-Background ausgerichtet
 * (Referenz-Konfiguration: 1 Farbe, baseSpring 0.03, baseFriction 0.9,
 * baseThickness 10, maxAge 500, pointCount 50, speedMultiplier 0.6,
 * enableFade false, enableShaderEffect false):
 *   - EIN glattes, flaches Band in Marken-Violett folgt der Maus elastisch
 *     (Feder+Reibung am Kopf, Kettenpunkte lerpen mit maxAge-Timing nach —
 *     exakt die Ribbons-Update-Schleife)
 *   - konstante Dicke mit spitz zulaufenden Enden (Ribbons-Taper)
 *   - deckende, flache Farbe — kein Noise, kein Verlauf
 * Rendering bewusst OHNE ogl/Three.js als Fullscreen-SDF-Shader (Kapsel-
 * Kette mit hartem min — kein Metaball-Verklumpen beim Anhalten). Farben
 * kommen aus echten CSS-Custom-Properties (auch oklch(), via
 * Canvas2D-fillStyle geparst) statt aus ogl's Color-Klasse.
 *
 * Dazu: Klick = "Stein im Teich" (Sog + radiale Spritzer + Ringwelle),
 * Magnet-Hover an interaktiven Elementen, solider Punkt in Marken-Violett
 * als verlässlicher Fixpunkt.
 *
 * Einbindung — EINMAL nahe der Wurzel mounten, z. B. app/[locale]/layout.tsx:
 *
 *   import WaterCursor from '@/components/ui/WaterCursor';
 *   ...
 *   <body>
 *     <WaterCursor />
 *     {children}
 *   </body>
 *
 * Deaktiviert sich automatisch (native Maus bleibt sichtbar) bei grobem
 * Zeiger/Touch, prefers-reduced-motion:reduce, fehlendem WebGL2 oder
 * enabled={false}. Keine Abhängigkeiten, keine Änderungen an package.json.
 */

import { useEffect, useRef } from 'react';

export interface WaterCursorProps {
  /** Voreingestellte Bandfarbe. 'violet' (Standard, Marken-Violett) · 'aqua' · 'mono'. */
  tint?: 'violet' | 'aqua' | 'mono';
  /** Explizite Bandfarbe (erster Eintrag zählt) — überschreibt `tint`. */
  colors?: string[];
  /** Banddicke, Multiplikator um 1 (Basis ≙ Ribbons baseThickness 10). */
  trailScale?: number;
  /** Ribbons maxAge: wie lang das Band nachzieht (ms). */
  trailMs?: number;
  /** Ribbons speedMultiplier. */
  speed?: number;
  /** Ribbons baseSpring — Federstärke des Kopfes. */
  spring?: number;
  /** Ribbons baseFriction — Reibung/Dämpfung des Kopfes. */
  friction?: number;
  /** Intensität des Klick-Spritzers, Multiplikator um 1. */
  splashScale?: number;
  /** Stärke des Magnet-Andockens an Hover-Ziele, 0..1. */
  magnetStrength?: number;
  /** CSS-Selektor für Magnet-Hover-Ziele. */
  magneticSelector?: string;
  /** Kompletter Ein/Aus-Schalter, z. B. routenabhängig. */
  enabled?: boolean;
}

const NPTS = 50; // Punkte des Bands (Ribbons: pointCount 50)
const SMAX = 40; // max. gleichzeitige Spritzer-Partikel (Ringpuffer)
const RES_SCALE = 0.8; // interne Canvas-Auflösung relativ zu CSS-Pixeln
const GATHER_MS = 170; // Dauer des "Sog"-Fensters nach Klick

const DEFAULT_SELECTOR =
  'a, button, input, select, textarea, [role="button"], [data-cursor-magnetic]';

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---------- Farben: CSS-Farbe -> [r,g,b] 0..1 über Canvas2D (versteht oklch() nativ) ---------- */
let swatch: HTMLCanvasElement | null = null;
function parseColor(str: string, fallback = '#5B2D8C'): [number, number, number] {
  try {
    if (!swatch) {
      swatch = document.createElement('canvas');
      swatch.width = swatch.height = 1;
    }
    const ctx = swatch.getContext('2d', { willReadFrequently: true })!;
    ctx.fillStyle = '#000';
    ctx.fillStyle = str || fallback;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0] / 255, d[1] / 255, d[2] / 255];
  } catch {
    return [0.36, 0.18, 0.55];
  }
}
/** Probiert mehrere Var-Namen (verschiedene Token-Konventionen) der Reihe nach. */
function readFirstCSSVar(names: string[], fallback: string): string {
  for (const n of names) {
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
      if (v) return v;
    } catch {
      /* weiter */
    }
  }
  return fallback;
}

/* Bandfarbe: EINE flache Farbe (Ribbons-Design), pro Preset. */
const TINTS: Record<string, [string[], string]> = {
  violet: [['--primary', '--color-primary'], '#5B2D8C'],
  aqua: [['--accent-strong', '--color-accent-strong'], '#3f93a8'],
  mono: [[], '#ffffff']
};

function resolveColor(tint: WaterCursorProps['tint'], colors?: string[] | null): [number, number, number] {
  if (colors && colors.length) return parseColor(String(colors[0]));
  const [vars, fallback] = TINTS[tint || 'violet'] || TINTS.violet;
  return vars.length ? parseColor(readFirstCSSVar(vars, fallback), fallback) : parseColor(fallback);
}

/* ---------- Shader ---------- */
const VERT = `#version 300 es
void main(){
  vec2 pos[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
#define NPTS ${NPTS}
#define SMAX ${SMAX}
out vec4 fragColor;
uniform vec3 uPts[NPTS];
uniform vec3 uColor;
uniform int uSplashCount;
uniform vec4 uSplashPos[SMAX];
uniform float uSplashAlpha[SMAX];
uniform vec2 uClickPos;
uniform float uClickAge;
uniform vec4 uBounds;

float capsule(vec2 p, vec2 a, vec2 b, float ra, float rb){
  vec2 pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),1e-5), 0.0, 1.0);
  return length(pa - ba*h) - mix(ra, rb, h);
}
float distSeg(vec2 p, vec2 a, vec2 b){
  vec2 pa = p-a, ba = b-a;
  float h = clamp(dot(pa,ba)/max(dot(ba,ba),1e-5), 0.0, 1.0);
  return length(pa - ba*h);
}

void main(){
  vec2 p = gl_FragCoord.xy;
  if (p.x < uBounds.x || p.y < uBounds.y || p.x > uBounds.z || p.y > uBounds.w) {
    discard;
  }
  float d = 1.0e6;
  for (int i=0; i<NPTS-1; i++){
    vec3 a = uPts[i];
    vec3 b = uPts[i+1];
    d = min(d, capsule(p, a.xy, b.xy, a.z, b.z));
  }
  float band = 1.0 - smoothstep(-1.0, 1.0, d);
  float alpha = band * 0.92;
  float splash = 0.0;
  for (int j=0; j<SMAX; j++){
    if (j >= uSplashCount) break;
    float sa0 = uSplashAlpha[j];
    if (sa0 <= 0.002) continue;
    vec4 s = uSplashPos[j];
    float speed = length(s.zw);
    vec2 dir = speed > 0.001 ? s.zw/speed : vec2(0.0,-1.0);
    float len = clamp(speed*0.05, 4.0, 34.0);
    float ds = distSeg(p, s.xy, s.xy - dir*len);
    float ww = mix(0.55, 1.5, sa0);
    splash += (1.0 - smoothstep(0.0, ww, ds)) * sa0;
  }
  float ring = 0.0;
  if (uClickAge >= 0.0 && uClickAge < 0.62) {
    float rr = uClickAge * 260.0;
    float rd = abs(length(p-uClickPos) - rr);
    ring = (1.0 - smoothstep(0.0, 3.2, rd)) * (1.0 - uClickAge/0.62) * 0.6;
  }
  float acc = clamp(alpha + splash*0.8 + ring*0.5, 0.0, 1.0);
  if (acc < 0.004) discard;
  fragColor = vec4(uColor, acc);
}`;

function compile(gl: WebGL2RenderingContext, src: string, type: number): WebGLShader | null {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('WaterCursor: Shader-Fehler', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}
function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('WaterCursor: Link-Fehler', gl.getProgramInfoLog(p));
    return null;
  }
  return p;
}

type Pt = { x: number; y: number };
type Particle = { x: number; y: number; vx: number; vy: number; born: number; life: number; alpha: number; active: boolean };

export default function WaterCursor(props: WaterCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Aktuelle Props gespiegelt, damit die rAF-Schleife sie live lesen kann,
  // ohne den WebGL-Kontext bei jeder Prop-Änderung neu aufzubauen.
  const optsRef = useRef<WaterCursorProps>(props);
  optsRef.current = props;

  const colorRef = useRef<[number, number, number]>([0.36, 0.18, 0.55]);

  // Farbe auflösen: initial + bei Änderung von tint/colors + bei
  // Theme-Wechsel (MutationObserver auf data-theme).
  useEffect(() => {
    colorRef.current = resolveColor(props.tint, props.colors);
    const obs = new MutationObserver(() => {
      colorRef.current = resolveColor(optsRef.current.tint, optsRef.current.colors);
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tint, JSON.stringify(props.colors || null)]);

  useEffect(() => {
    if (props.enabled === false) return;
    const canvas = canvasRef.current;
    const dotEl = dotRef.current;
    if (!canvas || !dotEl) return;

    const fine = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vs = compile(gl, VERT, gl.VERTEX_SHADER);
    const fs = compile(gl, FRAG, gl.FRAGMENT_SHADER);
    const prog = vs && fs ? link(gl, vs, fs) : null;
    if (!prog) return;

    gl.useProgram(prog);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(gl.createVertexArray());

    const U: Record<string, WebGLUniformLocation | null> = {};
    [
      'uPts', 'uColor', 'uSplashCount', 'uSplashPos', 'uSplashAlpha',
      'uClickPos', 'uClickAge', 'uBounds'
    ].forEach((name) => { U[name] = gl.getUniformLocation(prog, name); });

    document.documentElement.classList.add('kq-water-on');

    /* ---------- Zustand ---------- */
    const pts: Pt[] = [];
    for (let i = 0; i < NPTS; i++) pts.push({ x: innerWidth / 2, y: innerHeight / 2 });
    const vel: Pt = { x: 0, y: 0 };

    /* Ribbons-Taper: volle Dicke in der Mitte, spitze Enden. */
    const taper: number[] = [];
    for (let i = 0; i < NPTS; i++) {
      const tt = Math.abs(i / (NPTS - 1) - 0.5) * 2;
      taper.push(lerp(1, 0.1, Math.pow(tt, 2)));
    }

    const particles: Particle[] = [];
    for (let i = 0; i < SMAX; i++) particles.push({ x: 0, y: 0, vx: 0, vy: 0, born: 0, life: 1, alpha: 0, active: false });
    let poolIdx = 0;

    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    let hoverEl: Element | null = null;
    let hoverT = 0;
    let gathering = false, gatherStart = 0;
    const gatherOrigin = { x: 0, y: 0 };
    const clickPos = { x: -9999, y: -9999 };
    let clickTime = -9999;
    let bufW = 1, bufH = 1, pxScale = 1;
    let raf = 0, lastT = performance.now(), destroyed = false;

    function resize() {
      const w = innerWidth, h = innerHeight;
      // 4K Ultra HD: Wir nehmen die echte Pixeldichte (devicePixelRatio)
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      bufW = Math.max(1, Math.round(w * dpr));
      bufH = Math.max(1, Math.round(h * dpr));
      canvas!.width = bufW; canvas!.height = bufH;
      pxScale = bufW / w;
      gl!.viewport(0, 0, bufW, bufH);
    }
    resize();
    window.addEventListener('resize', resize);

    function toDevice(x: number, y: number): [number, number] { return [x * pxScale, bufH - y * pxScale]; }

    function findMagnetic(target: EventTarget | null): Element | null {
      if (!target || !(target as Element).closest) return null;
      return (target as Element).closest(optsRef.current.magneticSelector || DEFAULT_SELECTOR);
    }
    function onMove(e: PointerEvent) { mouse.x = e.clientX; mouse.y = e.clientY; }
    function onOver(e: Event) { hoverEl = findMagnetic((e as PointerEvent).target); }
    function onOut(e: Event) {
      const rel = (e as PointerEvent).relatedTarget as Element | null;
      const stillInside = !!(rel && hoverEl && hoverEl.contains(rel));
      if (!stillInside) hoverEl = null;
    }
    function onDown(e: PointerEvent) {
      gathering = true;
      gatherStart = performance.now();
      gatherOrigin.x = e.clientX; gatherOrigin.y = e.clientY;
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);
    // Am window erfasst (nicht am pointer-events:none-Canvas), damit Klicks
    // auf echten Seiteninhalt unterhalb des Overlays den Burst auslösen.
    window.addEventListener('pointerdown', onDown as EventListener, { passive: true });

    function spawnSplash(x: number, y: number) {
      const scale = optsRef.current.splashScale ?? 1;
      const count = Math.max(1, Math.round(16 * scale));
      for (let n = 0; n < count; n++) {
        const p = particles[poolIdx]; poolIdx = (poolIdx + 1) % SMAX;
        const ang = Math.random() * Math.PI * 2;
        const spd = (95 + Math.random() * 210) * scale;
        p.x = x; p.y = y;
        p.vx = Math.cos(ang) * spd;
        p.vy = Math.sin(ang) * spd - 50;
        p.born = performance.now();
        p.life = 420 + Math.random() * 280;
        p.alpha = 1; p.active = true;
      }
    }

    function onContextLost(e: Event) { e.preventDefault(); cancelAnimationFrame(raf); }
    canvas.addEventListener('webglcontextlost', onContextLost, false);

    const ptsBuf = new Float32Array(NPTS * 3);
    const splashPosBuf = new Float32Array(SMAX * 4);
    const splashAlphaBuf = new Float32Array(SMAX);

    function frame(t: number) {
      if (destroyed) return;
      const dtMs = Math.min(t - lastT, 48); lastT = t;
      const dt = dtMs / 1000;
      const o = optsRef.current;
      const magnetStrength = o.magnetStrength ?? 0.6;
      const trailScale = o.trailScale ?? 1;
      const trailMs = Math.max(1, o.trailMs ?? 500);
      const speed = o.speed ?? 0.6;
      const spring = o.spring ?? 0.03;
      const friction = o.friction ?? 0.9;

      const rect = hoverEl ? (hoverEl as Element).getBoundingClientRect() : null;
      hoverT = clamp(hoverT + (rect ? 9 : -7) * dt, 0, 1);

      let tx = mouse.x, ty = mouse.y;
      if (rect) {
        const pad = 10;
        const rx0 = rect.left - pad, ry0 = rect.top - pad, rx1 = rect.right + pad, ry1 = rect.bottom + pad;
        const cx = clamp(mouse.x, rx0, rx1), cy = clamp(mouse.y, ry0, ry1);
        const ctrX = (rx0 + rx1) / 2, ctrY = (ry0 + ry1) / 2;
        const mx = lerp(cx, ctrX, magnetStrength * 0.35);
        const my = lerp(cy, ctrY, magnetStrength * 0.35);
        tx = lerp(mouse.x, mx, magnetStrength);
        ty = lerp(mouse.y, my, magnetStrength);
      }

      let gatherWeight = 0;
      if (gathering) {
        const gp = (t - gatherStart) / GATHER_MS;
        if (gp >= 1) {
          gathering = false;
          spawnSplash(gatherOrigin.x, gatherOrigin.y);
          clickPos.x = gatherOrigin.x; clickPos.y = gatherOrigin.y; clickTime = t;
        } else {
          gatherWeight = Math.sin(gp * Math.PI);
          tx = lerp(tx, gatherOrigin.x, gatherWeight * 0.88);
          ty = lerp(ty, gatherOrigin.y, gatherWeight * 0.88);
        }
      }

      /* Ribbons-Physik: Kopf = Feder+Reibung, Kette lerpt mit maxAge-Timing. */
      const steps = Math.max(1, Math.ceil(dtMs / 16.667));
      const sf = dtMs / 16.667 / steps;
      const head = pts[0];
      for (let kstep = 0; kstep < steps; kstep++) {
        vel.x = (vel.x + (tx - head.x) * spring * sf) * Math.pow(friction, sf);
        vel.y = (vel.y + (ty - head.y) * spring * sf) * Math.pow(friction, sf);
        head.x += vel.x * sf;
        head.y += vel.y * sf;
      }
      
      // FIX für den "zwei fliegende Punkte"-Bug: Die Punkte dürfen nicht sofort zum Kopf snappen!
      const alpha = clamp((dtMs * speed) / 30, 0.1, 0.95);
      for (let i = 1; i < NPTS; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * alpha;
        pts[i].y += (pts[i - 1].y - pts[i].y) * alpha;
      }

      let minX = 99999, maxX = -99999, minY = 99999, maxY = -99999;

      /* packen: konstante Dicke × Ribbons-Taper an den Enden */
      const baseR = 5 * trailScale * (1 + hoverT * 0.3);
      for (let i = 0; i < NPTS; i++) {
        const dv = toDevice(pts[i].x, pts[i].y);
        ptsBuf[i * 3] = dv[0];
        ptsBuf[i * 3 + 1] = dv[1];
        ptsBuf[i * 3 + 2] = baseR * taper[i] * pxScale;
        
        const r = ptsBuf[i * 3 + 2] + 4.0;
        if (dv[0] - r < minX) minX = dv[0] - r;
        if (dv[0] + r > maxX) maxX = dv[0] + r;
        if (dv[1] - r < minY) minY = dv[1] - r;
        if (dv[1] + r > maxY) maxY = dv[1] + r;
      }

      for (let i = 0; i < SMAX; i++) {
        const p = particles[i];
        if (!p.active) { splashAlphaBuf[i] = 0; continue; }
        const frx = Math.pow(0.90, dtMs / 16.67);
        p.vx *= frx;
        p.vy = p.vy * Math.pow(0.94, dtMs / 16.67) + 300 * dt;
        p.x += p.vx * dt; p.y += p.vy * dt;
        const age = t - p.born, ttp = age / p.life;
        if (ttp >= 1) { p.active = false; splashAlphaBuf[i] = 0; continue; }
        p.alpha = (1 - ttp) * (1 - ttp * 0.25);
        const dvp = toDevice(p.x, p.y);
        splashPosBuf[i * 4] = dvp[0]; splashPosBuf[i * 4 + 1] = dvp[1];
        splashPosBuf[i * 4 + 2] = p.vx * pxScale; splashPosBuf[i * 4 + 3] = -p.vy * pxScale;
        splashAlphaBuf[i] = p.alpha * (o.splashScale ?? 1);
        
        const r = 45.0 * pxScale;
        if (dvp[0] - r < minX) minX = dvp[0] - r;
        if (dvp[0] + r > maxX) maxX = dvp[0] + r;
        if (dvp[1] - r < minY) minY = dvp[1] - r;
        if (dvp[1] + r > maxY) maxY = dvp[1] + r;
      }

      if (t - clickTime < 620) {
        const cp = toDevice(clickPos.x, clickPos.y);
        const rr = ((t - clickTime) / 1000) * 260.0 * pxScale + 12.0 * pxScale;
        if (cp[0] - rr < minX) minX = cp[0] - rr;
        if (cp[0] + rr > maxX) maxX = cp[0] + rr;
        if (cp[1] - rr < minY) minY = cp[1] - rr;
        if (cp[1] + rr > maxY) maxY = cp[1] + rr;
      }
      
      minX -= 10.0; minY -= 10.0; maxX += 10.0; maxY += 10.0;

      dotEl!.classList.add('is-active');
      dotEl!.style.transform = `translate3d(${mouse.x}px,${mouse.y}px,0) scale(${1 + hoverT * 1.5})`;

      const col = colorRef.current;
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform3fv(U.uPts, ptsBuf);
      gl!.uniform3f(U.uColor, col[0], col[1], col[2]);
      gl!.uniform1i(U.uSplashCount, SMAX);
      gl!.uniform4fv(U.uSplashPos, splashPosBuf);
      gl!.uniform1fv(U.uSplashAlpha, splashAlphaBuf);
      const cp = toDevice(clickPos.x, clickPos.y);
      gl!.uniform2f(U.uClickPos, cp[0], cp[1]);
      gl!.uniform1f(U.uClickAge, (t - clickTime) / 1000);
      gl!.uniform4f(U.uBounds, minX, minY, maxX, maxY);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    function onVisibility() {
      if (document.hidden) { cancelAnimationFrame(raf); }
      else if (!destroyed) { lastT = performance.now(); raf = requestAnimationFrame(frame); }
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      destroyed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
      window.removeEventListener('pointerdown', onDown as EventListener);
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      document.documentElement.classList.remove('kq-water-on');
      const lose = gl.getExtension('WEBGL_lose_context');
      if (lose) lose.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.enabled]);

  if (props.enabled === false) return null;

  return (
    <div aria-hidden="true" className="wc-root">
      <canvas ref={canvasRef} className="wc-canvas" />
      <div ref={dotRef} className="wc-dot" />
      <style>{`
        html.kq-water-on, html.kq-water-on * { cursor: none !important; }
        html.kq-water-on input, html.kq-water-on textarea,
        html.kq-water-on select, html.kq-water-on [contenteditable="true"] { cursor: text !important; }

        .wc-root { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; }
        .wc-canvas { position: fixed; inset: 0; width: 100%; height: 100%; display: block; }

        .wc-dot {
          position: fixed; left: 0; top: 0; width: 10px; height: 10px;
          margin: -5px 0 0 -5px; border-radius: 50%; background: var(--primary, #5B2D8C);
          box-shadow: 0 0 0 2px rgb(255 255 255 / 0.95), 0 0 0 3px rgb(0 0 0 / 0.14), 0 2px 10px -2px rgb(91 45 140 / 0.55);
          opacity: 0; transition: opacity 300ms ease; will-change: transform;
        }
        .wc-dot.is-active { opacity: 1; }

        @media (prefers-reduced-motion: reduce) { .wc-root { display: none !important; } }
      `}</style>
    </div>
  );
}
