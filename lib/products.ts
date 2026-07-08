import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDir = path.join(process.cwd(), 'content', 'products');

export interface ProductData {
  slug: string;
  category: string;
  title: string;
  article_codes?: string;
  [key: string]: unknown;
  content: string;
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

export async function getProductBySlug(category: string, slug: string): Promise<ProductData | null> {
  const products = getProductsByCategory(category);
  const product = products.find(p => p.slug === slug);
  if (!product) return null;

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(product.content);
    
  return {
    ...product,
    content: processedContent.toString()
  };
}

export async function getProductsIndex(): Promise<string | null> {
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
