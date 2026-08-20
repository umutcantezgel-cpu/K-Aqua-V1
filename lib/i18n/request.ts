import fs from 'fs';
import path from 'path';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { TRANSLATED_LOCALES } from './languages';
import merge from 'lodash/merge';

const AVAILABLE_LOCALES: readonly string[] = TRANSLATED_LOCALES;

export default getRequestConfig(async ({ requestLocale }) => {
  // Calculate/resolve the locale
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Exclude<typeof locale, undefined>)) {
    locale = routing.defaultLocale;
  }
  
  // Assert locale is definitely string now
  const resolvedLocale = locale as string;

  // Map to the best available translation file
  let targetLocale = routing.defaultLocale;
  if (AVAILABLE_LOCALES.includes(resolvedLocale)) {
    targetLocale = resolvedLocale;
  } else {
    // Try base locale, e.g. "en-US" -> "en"
    const baseLocale = resolvedLocale.split('-')[0] || '';
    if (AVAILABLE_LOCALES.includes(baseLocale)) {
      targetLocale = baseLocale;
    }
  }


  const loadJson = (filePath: string) => {
    if (fs.existsSync(filePath)) {
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        console.error(`Error parsing JSON file ${filePath}:`, e);
      }
    }
    return {};
  };

  // Load reference messages (German as canonical default, English as international fallback)
  const deMessages = loadJson(path.join(process.cwd(), 'messages', 'de.json'));
  const enMessages = loadJson(path.join(process.cwd(), 'messages', 'en.json'));
  const baseMessages = targetLocale === 'de' 
    ? deMessages 
    : targetLocale === 'en' 
    ? enMessages 
    : loadJson(path.join(process.cwd(), 'messages', `${targetLocale}.json`));
  
  // Deep merge canonical default -> english -> target messages
  let messages = merge({}, deMessages, enMessages, baseMessages);

  // Load SEO Expansion files dynamically if they exist (for Swarm)
  const seoModules = [
    'products_pipes',
    'products_fittings',
    'products_valves',
    'products_saddles_acc',
    'products_tools',
    'markets_1',
    'markets_2',
    'markets_3',
    'markets_4',
    'markets_5',
    'markets_6',
    'markets_7',
    'markets_8',
    'markets_9',
    'markets_10',
    'categories'
  ];

  for (const mod of seoModules) {
    const deSeoPath = path.join(process.cwd(), 'messages', 'seo', 'de', `${mod}.json`);
    const enSeoPath = path.join(process.cwd(), 'messages', 'seo', 'en', `${mod}.json`);
    const targetSeoPath = path.join(process.cwd(), 'messages', 'seo', targetLocale, `${mod}.json`);

    const deSeo = loadJson(deSeoPath);
    const enSeo = loadJson(enSeoPath);
    const targetSeo = targetLocale === 'de' ? deSeo : targetLocale === 'en' ? enSeo : loadJson(targetSeoPath);

    const mergedSeo = merge({}, deSeo, enSeo, targetSeo);
    messages = merge({}, messages, mergedSeo);
  }

  return {
    locale: resolvedLocale,
    messages,
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        const lastPart = key || namespace || path;
        return String(lastPart);
      }
      return path;
    },
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') {
        // Log gracefully instead of throwing during build
        console.warn('Missing translation:', error.originalMessage);
      } else {
        console.warn('Next-intl error:', error);
      }
    }
  };
});
