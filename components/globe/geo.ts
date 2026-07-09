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
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { LANGUAGES, LANGUAGES_BY_COUNTRY } from '@/lib/i18n/languages';



export const MAP_W = 4096;
export const MAP_H = 2048;

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = (await res.json()) as any;
  const fc = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>;
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
    if (langIndex >= 0) {
      assigned.push({ f, langIndex, bounds: geoBounds(f) });
      const featuresArr = langFeatures[langIndex];
      if (featuresArr) {
        featuresArr.push(f);
      }
    }
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

export interface MapTheme {
  oceanTop: string;
  oceanBottom: string;
  landL: number;
  landC: number;
  landH: number;
  landJitterL: number;
  landJitterH: number;
  landAlpha?: number;
  border: string;
  graticule: string;
  noiseAlpha: number;
  hoverAlpha: number; pendingAlpha: number; activeAlpha: number;
  colorKey: 'color' | 'bright';
  markerRing: string;
}

const MAP_THEMES: Record<'light' | 'dark', MapTheme> = {
  light: {
    oceanTop: 'oklch(0.965 0.012 210)', oceanBottom: 'oklch(0.885 0.028 215)',
    landL: 0.98, landC: 0.01, landH: 84, landJitterL: 0.01, landJitterH: 10, landAlpha: 1,
    border: 'oklch(0.45 0.045 70 / 0.32)', graticule: 'oklch(0.5 0.04 250 / 0.10)',
    hoverAlpha: 0.66, pendingAlpha: 0.58, activeAlpha: 0.4,
    noiseAlpha: 0.02,
    colorKey: 'color', markerRing: 'rgba(255,255,255,0.9)',
  },
  dark: {
    oceanTop: 'oklch(0.235 0.03 265)', oceanBottom: 'oklch(0.135 0.025 272)',
    landL: 0.25, landC: 0.02, landH: 285, landJitterL: 0.015, landJitterH: 14, landAlpha: 1,
    border: 'oklch(0.85 0.02 280 / 0.17)', graticule: 'oklch(0.9 0.02 260 / 0.07)',
    hoverAlpha: 0.82, pendingAlpha: 0.74, activeAlpha: 0.5,
    noiseAlpha: 0.03,
    colorKey: 'bright', markerRing: 'rgba(10,10,18,0.85)',
  },
};

/** Convert HSL-like or OKLCH values to standard canvas string */
let __probe: HTMLDivElement | null = null;
const cache = new Map<string, string>();

export function toCss(oklchString: string): string {
  if (typeof document === 'undefined') return oklchString;
  const cached = cache.get(oklchString);
  if (cached) return cached;

  if (!__probe) {
    __probe = document.createElement('div');
    __probe.style.cssText = 'position:fixed;left:-9999px;top:-9999px;pointer-events:none;';
    document.body.appendChild(__probe);
  }
  __probe.style.color = oklchString;
  const rgb = getComputedStyle(__probe).color;
  cache.set(oklchString, rgb);
  return rgb;
}

function createHSL(l: number, c: number, h: number, a: number = 1): string {
  if (a < 1) return toCss(`oklch(${l} ${c} ${h} / ${a})`);
  return toCss(`oklch(${l} ${c} ${h})`);
}

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
    og.addColorStop(0, toCss(t.oceanTop));
    og.addColorStop(1, toCss(t.oceanBottom));
    x.fillStyle = og;
    x.fillRect(0, 0, MAP_W, MAP_H);

    x.strokeStyle = toCss(t.graticule);
    x.lineWidth = 1 * (MAP_W / 2048);
    x.stroke(this.graticulePath);

    this.world.features.forEach((f, i) => {
      const seed = this.world.seeds[i] ?? 7;
      const L = t.landL + (jitter(seed) - 0.5) * t.landJitterL;
      const H = t.landH + (jitter(seed * 3.7) - 0.5) * t.landJitterH;
      x.fillStyle = createHSL(L, t.landC, H, t.landAlpha ?? 1);
      const path = this.countryPaths[i];
      if (path) {
        x.fill(path);
      }
    });

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
      const role = roles[i] ?? 0;
      const heat = heats[i] ?? 0;
      const lang = LANGUAGES[i];
      const langPath = this.langPaths[i];
      if (!lang || !langPath) continue;

      const ceil = role === 3 ? t.hoverAlpha : role === 2 ? t.pendingAlpha : t.activeAlpha;
      const alpha = tint + heat * (ceil - tint);
      if (alpha < 0.006) continue;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = toCss(lang[t.colorKey]);
      ctx.fill(langPath);
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = toCss(t.border);
    ctx.lineWidth = 1 * (MAP_W / 2048);
    ctx.stroke(this.allBordersPath);

    const hot = opts.hotIndex;
    const hotHeat = hot >= 0 ? heats[hot] : undefined;
    const hotLang = hot >= 0 ? LANGUAGES[hot] : undefined;
    const hotPath = hot >= 0 ? this.langPaths[hot] : undefined;
    if (hot >= 0 && hotHeat !== undefined && hotHeat > 0.04 && hotLang && hotPath) {
      const col = toCss(hotLang[t.colorKey]);
      ctx.save();
      ctx.shadowColor = col;
      ctx.shadowBlur = 26 * opts.glow * hotHeat;
      ctx.strokeStyle = col;
      ctx.globalAlpha = 0.95 * hotHeat;
      ctx.lineWidth = 2.2 * (MAP_W / 2048);
      ctx.stroke(hotPath);
      ctx.restore();
      ctx.globalAlpha = 1;
    }

    for (const m of opts.markers) {
      const [px, py] = this.project(m.lonlat);
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 7);
      ctx.fillStyle = toCss(m.color);
      ctx.fill();
      ctx.lineWidth = 2 * (MAP_W / 2048);
      ctx.strokeStyle = toCss(t.markerRing);
      ctx.stroke();
    }

    // ganz am Ende von paint(), nach den Markern:
    ctx.globalCompositeOperation = 'multiply';
    ctx.globalAlpha = t.noiseAlpha;
    ctx.fillStyle = ctx.createPattern(this.ensureNoise(), 'repeat')!;
    ctx.fillRect(0, 0, MAP_W, MAP_H);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
}
