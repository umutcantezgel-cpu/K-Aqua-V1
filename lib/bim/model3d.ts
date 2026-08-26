/* Zugriff auf die parametrischen 3D-Module — serverseitig, ohne Browser.
 *
 * Unter public/kaqua-3d/lib/products/ liegen 50 ES-Module, die je ein Produkt
 * parametrisch beschreiben. Sie sind fuer den Browser gebaut, laufen aber
 * vollstaendig in Node: die Geometrie ist reine Rechnung, three.js braucht
 * dafuer kein WebGL und kein Fenster.
 *
 * ZWEI WEGE, und die Unterscheidung ist der Kern dieser Datei:
 *
 *   params(key)  — liefert die aufgeloeste Parametrik als schlichtes Objekt.
 *                  Braucht KEINE Abhaengigkeit, kein three.js, keinen Shim.
 *                  45 der 50 Module stellen sie bereit; gemessen laeuft sie
 *                  fuer alle 45 fehlerfrei durch. Das ist der bevorzugte Weg:
 *                  aus diesen Zahlen entstehen analytische IFC-Koerper.
 *
 *   build(size)  — baut das Dreiecksnetz. Braucht three.js und stolpert ueber
 *                  genau eine Stelle im Core: `noiseTexture()` legt eine
 *                  Canvas-Textur an. Die ist rein kosmetisch und im IFC ohne
 *                  Bedeutung; ein winziger DOM-Ersatz genuegt, damit alle 50
 *                  Module durchlaufen.
 *
 * `kaqua-3d/**` und `public/kaqua-3d/**` werden ausschliesslich GELESEN. An
 * diesen Modulen arbeitet eine andere Session. */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolve3DProductId } from '@/lib/3d/resolve';

const LIB_DIR = path.join(process.cwd(), 'public', 'kaqua-3d', 'lib');
const PRODUCTS_DIR = path.join(LIB_DIR, 'products');
const REGISTRY_FILE = path.join(LIB_DIR, 'registry.json');

interface RegistryEntry {
  /** Dateiname ohne Endung unter products/. */
  slug: string;
  /** Kennung mit Kategorie, z. B. `fittings/elbow-90`. */
  id: string;
  module: string;
  titleDe: string;
  titleEn: string;
  category: string;
}

/** Ein Artikel, wie das 3D-Modul ihn fuehrt. Die Feldnamen sind katalogtreu. */
export interface ModuleArticle {
  code?: string;
  [key: string]: unknown;
}

/** Das Produktobjekt, wie der Produktvertrag es festlegt. */
export interface ProductModule {
  id: string;
  titleDe: string;
  titleEn: string;
  category: string;
  articles: ModuleArticle[];
  sizes: (number | string)[];
  defaultSize: number | string;
  /** Feld, ueber das eine Groesse ihre Artikelzeile findet. Vorgabe `d`. */
  sizeKey?: string;
  build: (size: number | string, variant: unknown, clipPlane: unknown) => Assembly;
}

export interface Assembly {
  root: Object3DLike;
  /** Die aufgeloeste Parametrik. Nur ueber `build` erreichbar. */
  P?: Record<string, unknown>;
  dims?: { label: string; value: unknown }[];
}

/** So viel von three.js, wie hier gebraucht wird — ohne three.js zu importieren. */
export interface Object3DLike {
  name?: string;
  geometry?: {
    attributes?: { position?: BufferAttributeLike };
    index?: { count: number; getX(i: number): number } | null;
  };
  updateMatrixWorld?: (force?: boolean) => void;
  matrixWorld?: { elements: number[] };
  traverse: (fn: (o: Object3DLike) => void) => void;
}

export interface BufferAttributeLike {
  count: number;
  getX(i: number): number;
  getY(i: number): number;
  getZ(i: number): number;
}

interface LoadedModule {
  default: ProductModule;
  params?: (key: number | string) => Record<string, unknown>;
  ARTICLES?: ModuleArticle[];
  [key: string]: unknown;
}

let registry: RegistryEntry[] | null = null;
const moduleCache = new Map<string, LoadedModule | null>();

function loadRegistry(): RegistryEntry[] {
  if (registry) return registry;
  if (!fs.existsSync(REGISTRY_FILE)) {
    registry = [];
    return registry;
  }
  registry = JSON.parse(fs.readFileSync(REGISTRY_FILE, 'utf8')) as RegistryEntry[];
  return registry;
}

/**
 * Findet das 3D-Modul zu einem Produkt-Slug aus content/products.
 *
 * Die Zuordnung laeuft ueber `resolve3DProductId`, das die erzeugte Slug-Karte
 * und die redaktionellen Ausnahmen aus lib/3d/aliases.ts zusammenfuehrt. Damit
 * greifen dieselben Ausnahmen wie im Viewer — `elbow-45-femalemale` findet sein
 * Modul `elbow-45-female-male`, `backing-flange-pp-steel-sfbf` sein
 * `backing-flange`. Eine zweite Zuordnungstabelle waere genau der Fehler, den
 * app/api/3d-view/[slug]/route.ts schon einmal gekostet hat.
 *
 * @returns der Dateiname unter products/, oder null wenn es kein Modell gibt
 */
export function moduleSlugForProduct(productSlug: string): string | null {
  const id = resolve3DProductId(productSlug);
  if (!id) return null;
  const entry = loadRegistry().find((e) => e.id === id);
  return entry?.slug ?? null;
}

/** Alle Produkt-Slugs aus content/products, zu denen es ein Modell gibt. */
export function hasModel(productSlug: string): boolean {
  return moduleSlugForProduct(productSlug) !== null;
}

/**
 * Setzt den DOM-Ersatz, den `noiseTexture()` im 3D-Core braucht.
 *
 * Der Core legt fuer die Oberflaechenanmutung eine Canvas-Textur an
 * (kaqua-3d-core.mjs, `noiseTexture`). Das ist die einzige Stelle im
 * Geometriepfad, die einen Browser voraussetzt. Sie wird hier durch das
 * Noetigste ersetzt: ein Canvas, das einen Kontext liefert, der einen
 * Pixelpuffer der richtigen Groesse zurueckgibt. Die Textur entsteht damit
 * schwarz — im IFC steht ohnehin keine Textur, nur Geometrie.
 *
 * Der Ersatz wird nur gesetzt, wenn kein echtes `document` da ist, und nur
 * einmal. Auf dem Serverpfad gibt es keines; im Browser wird diese Datei nicht
 * ausgefuehrt.
 */
let shimInstalled = false;
export function installHeadlessDom(): void {
  if (shimInstalled) return;
  const g = globalThis as { document?: unknown };
  if (g.document) {
    shimInstalled = true;
    return;
  }
  g.document = {
    createElement: () => ({
      width: 0,
      height: 0,
      getContext: () => ({
        createImageData: (w: number, h: number) => ({
          data: new Uint8ClampedArray(w * h * 4),
          width: w,
          height: h,
        }),
        putImageData: () => {},
        fillRect: () => {},
        drawImage: () => {},
        getImageData: (_x: number, _y: number, w: number, h: number) => ({
          data: new Uint8ClampedArray(w * h * 4),
          width: w,
          height: h,
        }),
      }),
    }),
  };
  shimInstalled = true;
}

/**
 * Laedt ein Produktmodul.
 *
 * Der Import geht ueber eine `file://`-URL auf public/, weil die Module dort
 * als fertig gebaute ES-Module liegen und nicht Teil des Next-Bundles sind.
 * `moduleCache` haelt das Ergebnis: die Module sind zur Bauzeit fest, und ein
 * erneuter Import kostet bei den groesseren spuerbar Zeit.
 */
export async function loadProductModule(
  moduleSlug: string,
): Promise<LoadedModule | null> {
  if (moduleCache.has(moduleSlug)) return moduleCache.get(moduleSlug) ?? null;

  const file = path.join(PRODUCTS_DIR, `${moduleSlug}.mjs`);
  if (!fs.existsSync(file)) {
    moduleCache.set(moduleSlug, null);
    return null;
  }

  try {
    const mod = (await import(
      /* webpackIgnore: true */ pathToFileURL(file).href
    )) as LoadedModule;
    moduleCache.set(moduleSlug, mod);
    return mod;
  } catch {
    moduleCache.set(moduleSlug, null);
    return null;
  }
}

/**
 * Liest die aufgeloeste Parametrik zu einer Groesse — ohne Geometrie zu bauen.
 *
 * Fuenf der 50 Module (die beiden Ueberboegen und die drei Einschweisssaettel)
 * fuehren ihre Parametrik in einem Familienmodul mit abweichender Signatur und
 * stellen kein `params` bereit. Fuer sie gibt es hier nichts; sie gehen ueber
 * den Netzweg.
 */
export async function getModuleParams(
  moduleSlug: string,
  sizeKeyValue: number | string,
): Promise<Record<string, unknown> | null> {
  const mod = await loadProductModule(moduleSlug);
  if (!mod || typeof mod.params !== 'function') return null;
  try {
    return mod.params(sizeKeyValue);
  } catch {
    return null;
  }
}

/**
 * Findet zu einer Artikelnummer den Groessenschluessel des Moduls.
 *
 * Die meisten Module schluesseln ueber die Nennweite `d`. 22 der 50 setzen
 * `sizeKey: 'key'` und benutzen einen zusammengesetzten Schluessel wie
 * `20x1/2` oder `63x32` — bei Reduzierungen und Uebergangsstuecken wird eine
 * Zeile erst durch das Maßpaar eindeutig. Deshalb wird hier ueber die
 * Artikelnummer gesucht und nicht ueber den Durchmesser.
 */
export async function sizeKeyForArticle(
  moduleSlug: string,
  articleCode: string,
): Promise<number | string | null> {
  const mod = await loadProductModule(moduleSlug);
  if (!mod) return null;
  const product = mod.default;
  const articles = product?.articles ?? mod.ARTICLES ?? [];
  const article = articles.find((a) => a.code === articleCode);
  if (!article) return null;
  const field = product?.sizeKey ?? 'd';
  const value = article[field];
  if (typeof value === 'number' || typeof value === 'string') return value;
  return null;
}

/** Baut das Netz zu einer Groesse. Setzt den DOM-Ersatz selbst. */
export async function buildAssembly(
  moduleSlug: string,
  size: number | string,
): Promise<Assembly | null> {
  const mod = await loadProductModule(moduleSlug);
  if (!mod?.default?.build) return null;
  installHeadlessDom();
  try {
    return mod.default.build(size, null, null);
  } catch {
    return null;
  }
}

/** Alle Modulnamen unter products/. */
export function allModuleSlugs(): string[] {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];
  return fs
    .readdirSync(PRODUCTS_DIR)
    .filter((f) => f.endsWith('.mjs'))
    .map((f) => f.replace(/\.mjs$/, ''))
    .sort();
}
