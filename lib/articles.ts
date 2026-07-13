import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { unstable_cache } from 'next/cache';

const contentDir = path.join(process.cwd(), 'content', 'wissen');

export interface ArticleData {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  date: string;
  category: string;
  author?: string;
  tags?: string[];
  content: string;
}

export function getAllArticles(): ArticleData[] {
  if (!fs.existsSync(contentDir)) return [];
  
  const files = fs.readdirSync(contentDir);
  const articles: ArticleData[] = [];

  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      const parsedSlug = (data.slug || file.replace(/\.md$/, '')).split('/').pop() || '';
      
      articles.push({
        slug: parsedSlug,
        title: data.title || '',
        shortTitle: data.shortTitle || data.title || '',
        description: data.description || '',
        date: data.date || '',
        category: data.category || 'Allgemein',
        author: data.author || 'K-Aqua Team',
        tags: data.tags || [],
        content
      });
    }
  }
  
  // Sort by date descending
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function getArticleBySlugRaw(slug: string): Promise<ArticleData | null> {
  const articles = getAllArticles();
  const article = articles.find(a => a.slug === slug);
  if (!article) return null;

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(article.content);
    
  return {
    ...article,
    content: processedContent.toString()
  };
}

export const getArticleBySlug = unstable_cache(
  async (slug: string) => getArticleBySlugRaw(slug),
  ['article-by-slug'],
  { tags: ['article-data'] }
);
