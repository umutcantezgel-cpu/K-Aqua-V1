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

export function getProductsByCategory(category: string): ProductData[] {
  return getAllProducts().filter(p => p.category === category);
}

async function getProductBySlugRaw(category: string, slug: string): Promise<ProductData | null> {
  const products = getProductsByCategory(category);
  const product = products.find(p => p.slug === slug);
  if (!product) return null;

  let rawContent = product.content;
  
  // Extract SEO blocks
  let seoTextDe = '';
  let seoTextEn = '';
  let seoTextAr = '';

  const seoMatchDe = rawContent.match(/##\s*SEO-CONTENT-DE\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(EN|AR)|$)/i);
  if (seoMatchDe) seoTextDe = seoMatchDe[1].trim();

  const seoMatchEn = rawContent.match(/##\s*SEO-CONTENT-EN\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(DE|AR)|$)/i);
  if (seoMatchEn) seoTextEn = seoMatchEn[1].trim();

  const seoMatchAr = rawContent.match(/##\s*SEO-CONTENT-AR\s*([\s\S]*?)(?=##\s*SEO-CONTENT-(DE|EN)|$)/i);
  if (seoMatchAr) seoTextAr = seoMatchAr[1].trim();

  // Remove SEO sections from rawContent
  rawContent = rawContent.replace(/##\s*SEO-CONTENT-(DE|EN|AR)[\s\S]*?(?=##\s*SEO-CONTENT-(DE|EN|AR)|$)/gi, '').trim();

  // We strip the english description at the top of the MD files to avoid Duplicate Content across locales.
  let cleanContent = rawContent;
  const match = cleanContent.match(/(?:## Article Table|## Available Sizes|\|.*\|)/i);
  if (match && match.index !== undefined) {
    cleanContent = cleanContent.substring(match.index);
  }

  const processMd = async (md: string) => {
    if (!md) return '';
    const res = await remark().use(remarkGfm).use(html).process(md);
    return res.toString();
  };

  const processedContent = await processMd(cleanContent);
  const processedSeoDe = await processMd(seoTextDe);
  const processedSeoEn = await processMd(seoTextEn);
  const processedSeoAr = await processMd(seoTextAr);
    
  return {
    ...product,
    content: processedContent,
    seoTextDe: processedSeoDe,
    seoTextEn: processedSeoEn,
    seoTextAr: processedSeoAr,
  };
}

export const getProductBySlug = unstable_cache(
  async (category: string, slug: string) => getProductBySlugRaw(category, slug),
  ['product-by-slug'], // Base key string
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
