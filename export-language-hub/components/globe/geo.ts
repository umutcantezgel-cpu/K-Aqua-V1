// components/globe/geo.ts
// K-Aqua Language Switch Module — Geo-Kern (ohne React/Three-Abhängigkeit).
// 1) loadWorld(): lädt TopoJSON (public/data/countries-110m.json), ordnet
//    Länder den Sprachen zu, baut Bounds für schnellen Hit-Test.
// 2) pickLanguageAt(): lat/lon → Sprachindex (Bounds-Prefilter + geoContains).
// 3) latLonToVec3(): Kugelkoordinaten → three.js-Position (UV-Layout von
//    SphereGeometry, Textur-u=0 bei lon −180).
// 4) MapPainter: malt die äquirektangulare Karten-Textur (2048×1024) im
//    "physischen Atlas"-Look — Pergament-Landmassen mit deterministischem
//    Farb-Jitter, Papierkorn, Gradnetz, Sprach-Tönungen mit Heat-Werten,
//    Glow-Kontur der aktiven Region, Anker-Marker. Statische Ebenen werden
//    als Path2D/Offscreen-Canvas gecacht → Repaints kosten wenige ms.

import {
  geoEquirectangular, geoPath, geoGraticule10, geoBounds, geoContains,
} from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { LANGUAGES, LANGUAGES_BY_COUNTRY } from '@/lib/i18n/languages';

export const MAP_W = 2048;
export const MAP_H = 1024;

export interface AssignedRegion {
  f: Feature<Geometry>;
  langIndex: number;
  /** d3.geoBounds: [[w,s],[e,n]] */
  bounds: [[number, number], [number, number]];
}

export interface WorldData {
  features: Feature<Geometry>[];
  seeds: number[];
  assigned: AssignedRegion[];
  /** GeoJSON-Features je Sprachindex */
  langFeatures: Feature<Geometry>[][];
}

export async function loadWorld(url = '/data/countries-110m.json'): Promise<WorldData> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Kartendaten nicht ladbar: ${res.status} ${url}`);
  const topo = (await res.json()) as Topology;
  const fc = feature(
    topo,
    (topo.objects as Record<string, never>)['countries'],
  ) as unknown as FeatureCollection<Geometry>;

  const features = fc.features;
  const seeds: number[] = [];
  const assigned: AssignedRegion[] = [];
  const langFeatures: Feature<Geometry>[][] = LANGUAGES.map(() => []);

  for (const f of features) {
    const num = Number(f.id);
    seeds.push(Number.isNaN(num) ? 7 : num);
    const lang = Number.isNaN(num) ? undefined : LANGUAGES_BY_COUNTRY[num];
    if (!lang) continue;
    const langIndex = LANGUAGES.findIndex((l) => l.id === lang.id);
    assigned.push({ f, langIndex, bounds: geoBounds(f) });
    langFeatures[langIndex].push(f);
  }
  return { features, seeds, assigned, langFeatures };
}

/** lat/lon → Sprachindex oder −1 */
export function pickLanguageAt(world: WorldData, lat: number, lon: number): number {
  for (const a of world.assigned) {
    const [[w, s], [e, n]] = a.bounds;
    if (lat < s - 0.4 || lat > n + 0.4) continue;
    const lonIn = w <= e ? lon >= w - 0.4 && lon <= e + 0.4 : lon >= w - 0.4 || lon <= e + 0.4;
    if (!lonIn) continue;
    if (geoContains(a.f, [lon, lat])) return a.langIndex;
  }
  return -1;
}

/** Kugelposition passend zum SphereGeometry-UV-Layout (r = Radius). */
export function latLonToVec3(lat: number, lon: number, r: number): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}

/* ------------------------------------------------------------------ */

export interface PaintOptions {
  dark: boolean;
  /** Grundtönung der Regionen im Ruhezustand (0–0.35) */
  tint: number;
  /** Glow-Intensität der heißen Region (0–1) */
  glow: number;
  /** Index der Region mit Kontur/Glow (Hover > Pending > Active), −1 = keine */
  hotIndex: number;
  /** Anker-Marker: [lon, lat] + Farbe */
  markers: { lonlat: [number, number]; color: string }[];
}

interface MapTheme {
  oceanTop: string; oceanBottom: string;
  landL: number; landC: number; landH: number;
  landJitterL: number; landJitterH: number;
  border: string; graticule: string;
  noiseAlpha: number;
  hoverAlpha: number; pendingAlpha: number; activeAlpha: number;
  colorKey: 'color' | 'bright';
  markerRing: string;
}

const MAP_THEMES: Record<'light' | 'dark', MapTheme> = {
  light: {
    oceanTop: 'oklch(0.955 0.015 210)', oceanBottom: 'oklch(0.89 0.028 215)',
    landL: 0.925, landC: 0.02, landH: 84, landJitterL: 0.02, landJitterH: 10,
    border: 'oklch(0.45 0.045 70 / 0.32)', graticule: 'oklch(0.5 0.04 250 / 0.10)',
    noiseAlpha: 0.05,
    hoverAlpha: 0.66, pendingAlpha: 0.58, activeAlpha: 0.4,
    colorKey: 'color', markerRing: 'rgba(255,255,255,0.9)',
  },
  dark: {
    oceanTop: 'oklch(0.235 0.03 265)', oceanBottom: 'oklch(0.15 0.025 272)',
    landL: 0.3, landC: 0.02, landH: 285, landJitterL: 0.022, landJitterH: 14,
    border: 'oklch(0.85 0.02 280 / 0.17)', graticule: 'oklch(0.9 0.02 260 / 0.07)',
    noiseAlpha: 0.07,
    hoverAlpha: 0.82, pendingAlpha: 0.74, activeAlpha: 0.5,
    colorKey: 'bright', markerRing: 'rgba(10,10,18,0.85)',
  },
};

/** deterministischer Jitter je Land → handgefertigter Kartenlook */
function jitter(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export class MapPainter {
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private world: WorldData;
  private projection = geoEquirectangular().fitExtent(
    [[0, 0], [MAP_W, MAP_H]],
    { type: 'Sphere' } as never,
  );
  private countryPaths: Path2D[] = [];
  private langPaths: Path2D[] = [];
  private allBordersPath: Path2D;
  private graticulePath: Path2D;
  private bases: Partial<Record<'light' | 'dark', HTMLCanvasElement>> = {};
  private noise: HTMLCanvasElement | null = null;

  constructor(world: WorldData) {
    this.world = world;
    this.canvas = document.createElement('canvas');
    this.canvas.width = MAP_W;
    this.canvas.height = MAP_H;
    this.ctx = this.canvas.getContext('2d')!;

    const pathGen = geoPath(this.projection);
    this.countryPaths = world.features.map((f) => new Path2D(pathGen(f) ?? ''));
    this.langPaths = world.langFeatures.map((fs) => {
      const p = new Path2D();
      for (const f of fs) p.addPath(new Path2D(pathGen(f) ?? ''));
      return p;
    });
    const borders = new Path2D();
    for (const p of this.countryPaths) borders.addPath(p);
    this.allBordersPath = borders;
    this.graticulePath = new Path2D(pathGen(geoGraticule10()) ?? '');
  }

  project(lonlat: [number, number]): [number, number] {
    return this.projection(lonlat) ?? [0, 0];
  }

  private ensureNoise(): HTMLCanvasElement {
    if (this.noise) return this.noise;
    const s = 256;
    const c = document.createElement('canvas');
    c.width = s; c.height = s;
    const o = c.getContext('2d')!;
    for (let i = 0; i < 9000; i++) {
      const g = (Math.random() * 90) | 0;
      o.fillStyle = `rgba(${g},${(g * 0.9) | 0},${(g * 0.75) | 0},${(Math.random() * 0.5 + 0.1).toFixed(2)})`;
      o.fillRect(Math.random() * s, Math.random() * s, 1, 1);
    }
    this.noise = c;
    return c;
  }

  /** Statische Basis (Ozean, Gradnetz, Pergament-Landmassen, Korn) je Theme. */
  private ensureBase(mode: 'light' | 'dark'): HTMLCanvasElement {
    const cached = this.bases[mode];
    if (cached) return cached;
    const t = MAP_THEMES[mode];
    const c = document.createElement('canvas');
    c.width = MAP_W; c.height = MAP_H;
    const x = c.getContext('2d')!;

    const og = x.createLinearGradient(0, 0, 0, MAP_H);
    og.addColorStop(0, t.oceanTop);
    og.addColorStop(1, t.oceanBottom);
    x.fillStyle = og;
    x.fillRect(0, 0, MAP_W, MAP_H);

    x.strokeStyle = t.graticule;
    x.lineWidth = 1;
    x.stroke(this.graticulePath);

    this.world.features.forEach((f, i) => {
      const seed = this.world.seeds[i];
      const L = (t.landL + (jitter(seed) - 0.5) * t.landJitterL).toFixed(3);
      const H = (t.landH + (jitter(seed * 3.7) - 0.5) * t.landJitterH).toFixed(1);
      x.fillStyle = `oklch(${L} ${t.landC} ${H})`;
      x.fill(this.countryPaths[i]);
    });

    x.globalCompositeOperation = 'multiply';
    x.globalAlpha = t.noiseAlpha;
    x.fillStyle = x.createPattern(this.ensureNoise(), 'repeat')!;
    x.fillRect(0, 0, MAP_W, MAP_H);
    x.globalCompositeOperation = 'source-over';
    x.globalAlpha = 1;

    this.bases[mode] = c;
    return c;
  }

  /** Komplettes Neuzeichnen der Textur (Basis gecacht, Rest Path2D-Fills). */
  paint(heats: Float32Array, roles: Int8Array, opts: PaintOptions): void {
    const mode = opts.dark ? 'dark' : 'light';
    const t = MAP_THEMES[mode];
    const ctx = this.ctx;
    const tint = Math.min(0.35, Math.max(0, opts.tint));

    ctx.clearRect(0, 0, MAP_W, MAP_H);
    ctx.drawImage(this.ensureBase(mode), 0, 0);

    for (let i = 0; i < LANGUAGES.length; i++) {
      const ceil = roles[i] === 3 ? t.hoverAlpha : roles[i] === 2 ? t.pendingAlpha : t.activeAlpha;
      const alpha = tint + heats[i] * (ceil - tint);
      if (alpha < 0.006) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = LANGUAGES[i][t.colorKey];
      ctx.fill(this.langPaths[i]);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = t.border;
    ctx.lineWidth = 1;
    ctx.stroke(this.allBordersPath);

    const hot = opts.hotIndex;
    if (hot >= 0 && heats[hot] > 0.04) {
      const col = LANGUAGES[hot][t.colorKey];
      ctx.save();
      ctx.shadowColor = col;
      ctx.shadowBlur = 26 * opts.glow * heats[hot];
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.95 * heats[hot];
      ctx.lineWidth = 2.2;
      ctx.stroke(this.langPaths[hot]);
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    for (const m of opts.markers) {
      const [px, py] = this.project(m.lonlat);
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 7);
      ctx.fillStyle = m.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = t.markerRing;
      ctx.stroke();
    }
  }
}
