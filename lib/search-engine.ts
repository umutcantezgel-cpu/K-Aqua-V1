// lib/search-engine.ts
// Leistungsfähige Such-, Ranking- und Snippet-Engine für K-Aqua

import { SEARCH_INDEX, SearchEntry } from './search-data';

export interface SearchResult {
  entry: SearchEntry;
  score: number;
  snippet: string;
  matchedField: 'title' | 'keywords' | 'specs' | 'articleCodes' | 'description' | 'origin';
  deepHref: string;
}

export interface SearchOptions {
  query: string;
  category?: string; // 'all' or specific SearchCategory
  locale?: string;
  maxResults?: number;
}

/**
 * Escapes a string for regex matching
 */
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Generates an intelligent snippet centered around the matching query
 */
export function generateSearchSnippet(text: string, query: string, maxLength: number = 160): string {
  if (!text) return '';
  if (!query.trim()) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  if (terms.length === 0) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  // Find the earliest match of any term
  let bestIndex = -1;
  let bestTerm = '';
  const lowerText = text.toLowerCase();

  for (const term of terms) {
    const idx = lowerText.indexOf(term);
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx;
      bestTerm = term;
    }
  }

  if (bestIndex === -1) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  // Calculate slice boundaries
  const halfWindow = Math.floor(maxLength / 2);
  let start = Math.max(0, bestIndex - halfWindow);
  let end = Math.min(text.length, start + maxLength);

  // Adjust start if end hit the wall
  if (end - start < maxLength && start > 0) {
    start = Math.max(0, end - maxLength);
  }

  // Find whole word boundary if possible
  if (start > 0) {
    const spaceIdx = text.indexOf(' ', start);
    if (spaceIdx !== -1 && spaceIdx < bestIndex) {
      start = spaceIdx + 1;
    }
  }
  if (end < text.length) {
    const spaceIdx = text.lastIndexOf(' ', end);
    if (spaceIdx !== -1 && spaceIdx > bestIndex + bestTerm.length) {
      end = spaceIdx;
    }
  }

  let snippet = text.substring(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < text.length) snippet = snippet + '...';

  return snippet;
}

/**
 * Builds the deep-link target URL with highlight param and anchor
 */
export function buildDeepLink(entry: SearchEntry, query: string): string {
  const cleanQuery = query.trim();
  const highlightParam = cleanQuery ? `highlight=${encodeURIComponent(cleanQuery)}` : '';
  
  const hasParams = entry.href.includes('?');
  const separator = hasParams ? '&' : '?';
  
  let url = entry.href;
  if (highlightParam) {
    url += `${separator}${highlightParam}`;
  }
  
  if (entry.anchorId) {
    url += `#${entry.anchorId}`;
  }
  
  return url;
}

/**
 * Searches the entire K-Aqua index with multi-token ranking and score weights
 */
export function searchKAqua(options: SearchOptions): SearchResult[] {
  const { query, category = 'all', locale = 'de', maxResults = 50 } = options;
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();

  // If query is empty, return all items in the category or whole catalog
  if (!q) {
    return SEARCH_INDEX.filter((entry) => category === 'all' || entry.category === category)
      .slice(0, maxResults)
      .map((entry) => {
        const desc = entry.description[locale] || entry.description['de'] || '';
        return {
          entry,
          score: 1,
          snippet: desc,
          matchedField: 'description',
          deepHref: buildDeepLink(entry, ''),
        };
      });
  }

  const queryTerms = q.split(/\s+/).filter((t) => t.length > 0);

  const scoredResults: SearchResult[] = [];

  for (const entry of SEARCH_INDEX) {
    // Check Category Filter
    if (category !== 'all' && entry.category !== category) {
      continue;
    }

    const title = (entry.title[locale] || entry.title['de'] || '').toLowerCase();
    const desc = (entry.description[locale] || entry.description['de'] || '').toLowerCase();
    const originSection = (entry.origin?.section[locale] || entry.origin?.section['de'] || '').toLowerCase();
    const originPath = (entry.origin?.path[locale] || entry.origin?.path['de'] || '').toLowerCase();
    const keywords = (entry.keywords || []).map((k) => k.toLowerCase());
    const specs = (entry.specs || []).map((s) => s.toLowerCase());
    const articleCodes = (entry.articleCodes || []).map((c) => c.toLowerCase());

    let score = 0;
    let matchedField: SearchResult['matchedField'] = 'description';

    // 1. Article code match (highest precision)
    for (const code of articleCodes) {
      if (code === q || code.includes(q)) {
        score += 150;
        matchedField = 'articleCodes';
      }
    }

    // 2. Title matching
    if (title === q) {
      score += 200;
      matchedField = 'title';
    } else if (title.includes(q)) {
      score += 100;
      matchedField = 'title';
    } else {
      for (const term of queryTerms) {
        if (title.includes(term)) {
          score += 40;
          matchedField = 'title';
        }
      }
    }

    // 3. Keyword matching
    for (const kw of keywords) {
      if (kw === q) {
        score += 80;
        if (matchedField === 'description') matchedField = 'keywords';
      } else if (kw.includes(q)) {
        score += 40;
        if (matchedField === 'description') matchedField = 'keywords';
      } else {
        for (const term of queryTerms) {
          if (kw.includes(term)) {
            score += 15;
            if (matchedField === 'description') matchedField = 'keywords';
          }
        }
      }
    }

    // 4. Specs matching
    for (const spec of specs) {
      if (spec.includes(q)) {
        score += 50;
        matchedField = 'specs';
      } else {
        for (const term of queryTerms) {
          if (spec.includes(term)) {
            score += 20;
          }
        }
      }
    }

    // 5. Origin / Path matching
    if (originSection.includes(q) || originPath.includes(q)) {
      score += 30;
      matchedField = 'origin';
    }

    // 6. Description matching
    if (desc.includes(q)) {
      score += 40;
    } else {
      for (const term of queryTerms) {
        if (desc.includes(term)) {
          score += 15;
        }
      }
    }

    // If score > 0, include in results
    if (score > 0) {
      const rawDesc = entry.description[locale] || entry.description['de'] || '';
      const snippet = generateSearchSnippet(rawDesc, rawQ, 180);
      scoredResults.push({
        entry,
        score,
        snippet,
        matchedField,
        deepHref: buildDeepLink(entry, rawQ),
      });
    }
  }

  // Sort descending by score
  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.slice(0, maxResults);
}
