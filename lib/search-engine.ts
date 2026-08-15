// lib/search-engine.ts
// Leistungsfähige Such-, Ranking-, Normalisierungs- und Snippet-Engine für K-Aqua

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
 * Normalizes text for forgiving matching (stripping punctuation, umlauts, hyphens)
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/&/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove remaining diacritics
    .replace(/[-_./\\(),;:'"?!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips all non-alphanumeric characters for compact matching (e.g. 'pp-rct' -> 'pprct')
 */
export function stripAlphanumeric(text: string): string {
  if (!text) return '';
  return text.toLowerCase().replace(/[^a-z0-9]/g, '');
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
  const normQ = normalizeSearchText(rawQ);
  const compactQ = stripAlphanumeric(rawQ);

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
  const normQueryTerms = normQ.split(/\s+/).filter((t) => t.length > 0);

  const scoredResults: SearchResult[] = [];

  for (const entry of SEARCH_INDEX) {
    // Check Category Filter
    if (category !== 'all' && entry.category !== category) {
      continue;
    }

    const title = (entry.title[locale] || entry.title['de'] || '').toLowerCase();
    const normTitle = normalizeSearchText(title);
    const compactTitle = stripAlphanumeric(title);

    const desc = (entry.description[locale] || entry.description['de'] || '').toLowerCase();
    const normDesc = normalizeSearchText(desc);

    const originSection = (entry.origin?.section[locale] || entry.origin?.section['de'] || '').toLowerCase();
    const originPath = (entry.origin?.path[locale] || entry.origin?.path['de'] || '').toLowerCase();
    
    const keywords = (entry.keywords || []).map((k) => k.toLowerCase());
    const normKeywords = (entry.keywords || []).map(normalizeSearchText);
    const compactKeywords = (entry.keywords || []).map(stripAlphanumeric);

    const specs = (entry.specs || []).map((s) => s.toLowerCase());
    const articleCodes = (entry.articleCodes || []).map((c) => c.toLowerCase());
    const compactArticleCodes = (entry.articleCodes || []).map(stripAlphanumeric);

    let score = 0;
    let matchedField: SearchResult['matchedField'] = 'description';

    // 1. Article code match (highest precision)
    for (let i = 0; i < articleCodes.length; i++) {
      const code = articleCodes[i] || '';
      const compactCode = compactArticleCodes[i] || '';
      if (code === q || (compactQ.length >= 4 && compactCode === compactQ)) {
        score += 250;
        matchedField = 'articleCodes';
      } else if (code.includes(q) || (compactQ.length >= 4 && compactCode.includes(compactQ))) {
        score += 160;
        matchedField = 'articleCodes';
      }
    }

    // 2. Title matching
    if (title === q || normTitle === normQ || (compactQ.length >= 4 && compactTitle === compactQ)) {
      score += 200;
      matchedField = 'title';
    } else if (title.includes(q) || normTitle.includes(normQ) || (compactQ.length >= 4 && compactTitle.includes(compactQ))) {
      score += 120;
      matchedField = 'title';
    } else {
      for (let i = 0; i < queryTerms.length; i++) {
        const term = queryTerms[i] || '';
        const normTerm = normQueryTerms[i] || term;
        const compactTerm = stripAlphanumeric(term);
        if (
          title.includes(term) ||
          normTitle.includes(normTerm) ||
          (compactTerm.length >= 3 && compactTitle.includes(compactTerm))
        ) {
          score += 50;
          matchedField = 'title';
        }
      }
    }

    // 3. Keyword matching
    for (let i = 0; i < keywords.length; i++) {
      const kw = keywords[i] || '';
      const normKw = normKeywords[i] || '';
      const compactKw = compactKeywords[i] || '';
      if (kw === q || normKw === normQ || (compactQ.length >= 3 && compactKw === compactQ)) {
        score += 90;
        if (matchedField === 'description') matchedField = 'keywords';
      } else if (kw.includes(q) || normKw.includes(normQ) || (compactQ.length >= 3 && compactKw.includes(compactQ))) {
        score += 50;
        if (matchedField === 'description') matchedField = 'keywords';
      } else {
        for (let j = 0; j < queryTerms.length; j++) {
          const term = queryTerms[j] || '';
          const normTerm = normQueryTerms[j] || term;
          const compactTerm = stripAlphanumeric(term);
          if (
            kw.includes(term) ||
            normKw.includes(normTerm) ||
            (compactTerm.length >= 3 && compactKw.includes(compactTerm))
          ) {
            score += 25;
            if (matchedField === 'description') matchedField = 'keywords';
          }
        }
      }
    }

    // 4. Specs matching
    for (const spec of specs) {
      const normSpec = normalizeSearchText(spec);
      const compactSpec = stripAlphanumeric(spec);
      if (spec.includes(q) || normSpec.includes(normQ) || (compactQ.length >= 3 && compactSpec.includes(compactQ))) {
        score += 60;
        matchedField = 'specs';
      } else {
        for (const term of queryTerms) {
          if (spec.includes(term)) {
            score += 25;
          }
        }
      }
    }

    // 5. Origin / Path matching
    if (originSection.includes(q) || originPath.includes(q) || normSection(originSection).includes(normQ)) {
      score += 35;
      matchedField = 'origin';
    }

    // 6. Description matching
    if (desc.includes(q) || normDesc.includes(normQ)) {
      score += 45;
    } else {
      for (let i = 0; i < queryTerms.length; i++) {
        const term = queryTerms[i] || '';
        const normTerm = normQueryTerms[i] || term;
        if (desc.includes(term) || normDesc.includes(normTerm)) {
          score += 18;
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

function normSection(s: string) {
  return normalizeSearchText(s);
}
