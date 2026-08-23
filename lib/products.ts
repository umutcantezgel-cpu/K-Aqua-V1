import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { unstable_cache } from 'next/cache';

const contentDir = path.join(process.cwd(), 'content', 'products');

export interface ProductData {
  slug: string;
  category: string;
  title: string;
  article_codes?: string;
  [key: string]: unknown;
  content: string;
  seoTextDe?: string;
  seoTextEn?: string;
  seoTextAr?: string;
  /**
   * Nennweitenbereich als Text, z. B. "d20-d75" — aus der Artikeltabelle
   * gelesen, nicht gepflegt. `undefined`, wenn das Produkt keine
   * Durchmesserspalte hat (Werkzeuge, Dichtmittel).
   * Wird im Seitentitel gebraucht: „PP-R Winkel 45°" allein ist zu unspezifisch,
   * „PP-R Winkel 45°, d20-d75" trifft die Suche nach Bauteil plus Dimension.
   */
  dimensionRange?: string;
}

/**
 * Liest den Durchmesserbereich aus der ersten Markdown-Tabelle eines Produkts.
 *
 * Die Tabellen haben eine Spalte „d (mm)" (bei Rohren auch „d"), deren Werte die
 * Nennweiten sind. Bewusst konservativ: Findet sich keine solche Spalte oder kein
 * Zahlenwert, wird nichts geraten, sondern `undefined` zurückgegeben. Lieber kein
 * Zusatz im Titel als ein falscher — im technischen Vertrieb ist eine erfundene
 * Dimension teurer als eine fehlende.
 */
export function extractDimensionRange(markdown: string): string | undefined {
  const lines = markdown.split('\n');
  const headerIndex = lines.findIndex(
    (l) => l.trimStart().startsWith('|') && /\|\s*d\s*(\(mm\))?\s*\|/i.test(l)
  );
  if (headerIndex === -1) return undefined;

  const header = lines[headerIndex];
  if (!header) return undefined;
  const cells = header.split('|').map((c) => c.trim());
  const col = cells.findIndex((c) => /^d\s*(\(mm\))?$/i.test(c));
  if (col === -1) return undefined;

  const values: number[] = [];
  // +2 überspringt die Trennzeile (|---|---|) direkt unter dem Kopf.
  for (let i = headerIndex + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line || !line.trimStart().startsWith('|')) break; // Tabelle zu Ende
    const cols = line.split('|').map((c) => c.trim());
    const raw = cols[col];
    if (!raw) continue;
    // „20", „20 x 1/2\"", „20–25" — die erste Zahl ist die Nennweite.
    const num = Number.parseFloat(raw.replace(',', '.'));
    if (Number.isFinite(num) && num > 0) values.push(num);
  }
  if (values.length === 0) return undefined;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const fmt = (n: number) => `d${Number.isInteger(n) ? n : n.toFixed(1)}`;
  return min === max ? fmt(min) : `${fmt(min)}-${fmt(max)}`;
}

export function getProductCategories(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

export function getAllProducts(): ProductData[] {
  const categories = getProductCategories();
  const allProducts: ProductData[] = [];

  for (const category of categories) {
    const categoryPath = path.join(contentDir, category);
    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (file.endsWith('.md') && file !== 'index.md') {
        const filePath = path.join(categoryPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        const parsedSlug = (data.slug || file.replace(/\.md$/, '')).split('/').pop() || '';
        allProducts.push({
          ...data,
          slug: parsedSlug,
          category: category.toLowerCase(),
          title: data.title || '',
          content
        });
      }
    }
  }
  
  return allProducts;
}

const CATEGORY_MAP: Record<string, string> = {
  armaturen: 'valves',
  formteile: 'fittings',
  rohre: 'pipes',
  uebergangsfittings: 'transition-fittings',
  'übergangsfittings': 'transition-fittings',
  werkzeuge: 'tools',
  zubehoer: 'accessories',
  'zubehör': 'accessories',
  einschweisssattel: 'weld-in-saddles',
  'einschweißsattel': 'weld-in-saddles',
  transitionfittings: 'transition-fittings',
  transitionFittings: 'transition-fittings',
  weldinsaddles: 'weld-in-saddles',
  weldInSaddles: 'weld-in-saddles',
};

const SLUG_ALIASES: Record<string, string> = {
  'k-fiber-pipe-pp-r-sdr-7-4': 'k-fiber-pipe-pp-r-sdr-74',
  'k-fiber-pipe-pp-rct-sdr-7-4': 'k-fiber-pipe-pp-rct-sdr-74',
  'k-pipe-pp-rct-sdr-7-4': 'k-pipe-pp-rct-sdr-74',
  'k-fiber-uv-pipe-pp-r-sdr-7-4': 'k-fiber-uv-pipe-pp-r-sdr-74',
  'k-fiber-uv-pipe-pp-rct-sdr-7-4': 'k-fiber-uv-pipe-pp-rct-sdr-74',
  'ball-valve-pp': 'pp-r-ball-valve-ball-in-pp',
  'pp-r-ball-valve-brass': 'pp-r-ball-valve-ball-in-brass-chromium-plated',
  'backing-flange': 'backing-flange-pp-steel-sfbf',
  'flat-gasket-for-unions': 'flat-gasket-for-unions-pp-r',
  'elbow-45-female-male': 'elbow-45-femalemale',
  'elbow-90-female-male': 'elbow-90-femalemale',
  'reducing-tee-large': 'reducing-tee-large-sizes',
  'tee-90-female-thread-internal-valve': 'tee-90-female-thread-for-internal-valve',
  'pipe-cutter-20-40': 'pipe-cutter-2040',
  'hand-welding-machine-20-32': 'hand-welding-machine-2032-complete-set',
  'hand-welding-machine-mirror-50125': 'hand-welding-machine-mirror-50-125',
};

export function normalizeCategory(cat: string): string {
  const c = cat.toLowerCase().trim();
  return CATEGORY_MAP[c] || c;
}

export function normalizeSlug(s: string): string {
  const slug = s.toLowerCase().trim();
  return SLUG_ALIASES[slug] || slug;
}

export function getProductsByCategory(category: string): ProductData[] {
  const normCat = normalizeCategory(category);
  return getAllProducts().filter(p => p.category === normCat);
}

async function getProductBySlugRaw(category: string, slug: string): Promise<ProductData | null> {
  const normCat = normalizeCategory(category);
  const normSlug = normalizeSlug(slug);

  const all = getAllProducts();
  
  // Try exact category + normalized slug
  let product = all.find(p => p.category === normCat && (p.slug === normSlug || p.slug === slug));
  
  // Fallback: search across all categories by slug
  if (!product) {
    product = all.find(p => p.slug === normSlug || p.slug === slug);
  }

  // Fallback 2: search by slug without hyphens/dots
  if (!product) {
    const clean = normSlug.replace(/[-_.]/g, '');
    product = all.find(p => p.slug.replace(/[-_.]/g, '') === clean);
  }

  if (!product) return null;

  let rawContent = product.content;
  
  // Extract SEO blocks
  let seoTextDe = '';
  let seoTextEn = '';
  let seoTextAr = '';

  const seoMatchDe = rawContent.match(/##\s*SEO-CONTENT-DE\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(EN|AR)|$)/i);
  if (seoMatchDe?.[1]) seoTextDe = seoMatchDe[1].trim();

  const seoMatchEn = rawContent.match(/##\s*SEO-CONTENT-EN\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(DE|AR)|$)/i);
  if (seoMatchEn?.[1]) seoTextEn = seoMatchEn[1].trim();

  const seoMatchAr = rawContent.match(/##\s*SEO-CONTENT-AR\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(DE|EN)|$)/i);
  if (seoMatchAr?.[1]) seoTextAr = seoMatchAr[1].trim();

  // Remove SEO sections from rawContent cleanly
  rawContent = rawContent.replace(/##\s*SEO-CONTENT-(DE|EN|AR)[\s\S]*?(?=##\s*SEO-CONTENT-(DE|EN|AR)|$)/gi, '').trim();

  const processMd = async (md: string) => {
    if (!md) return '';
    const res = await remark().use(remarkGfm).use(html).process(md);
    return res.toString();
  };

  const processedContent = await processMd(rawContent);
  const processedSeoDe = await processMd(seoTextDe);
  const processedSeoEn = await processMd(seoTextEn);
  const processedSeoAr = await processMd(seoTextAr);
    
  return {
    ...product,
    content: processedContent,
    seoTextDe: processedSeoDe,
    seoTextEn: processedSeoEn,
    seoTextAr: processedSeoAr,
    // Aus dem Markdown lesen, nicht aus dem erzeugten HTML: Die Tabellenstruktur
    // ist dort eindeutig, im HTML müsste sie erst wieder zerlegt werden.
    dimensionRange: extractDimensionRange(rawContent),
  };
}

export const getProductBySlug = unstable_cache(
  async (category: string, slug: string) => getProductBySlugRaw(category, slug),
  ['product-by-slug-v2'],
  { tags: ['product-data'] }
);

async function getProductsIndexRaw(): Promise<string | null> {
  const indexPath = path.join(contentDir, 'index.md');
  if (!fs.existsSync(indexPath)) return null;
  const fileContent = fs.readFileSync(indexPath, 'utf8');
  const { content } = matter(fileContent);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
  return processedContent.toString();
}

export const getProductsIndex = unstable_cache(
  async () => getProductsIndexRaw(),
  ['products-index'],
  { tags: ['product-data'] }
);
