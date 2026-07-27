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

  const fs = require('fs');
  const path = require('path');

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

  // Fallback to English for missing translations
  const fallbackLocale = 'en';
  const fallbackMessages = targetLocale === fallbackLocale 
    ? {} 
    : loadJson(path.join(process.cwd(), 'messages', `${fallbackLocale}.json`));

  const baseMessages = loadJson(path.join(process.cwd(), 'messages', `${targetLocale}.json`));
  
  // Deep merge fallback and target messages
  let messages = merge({}, fallbackMessages, baseMessages);

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
    const seoFilePath = path.join(process.cwd(), 'messages', 'seo', targetLocale, `${mod}.json`);
    if (fs.existsSync(seoFilePath)) {
      try {
        const content = fs.readFileSync(seoFilePath, 'utf8');
        const extension = JSON.parse(content);
        messages = merge({}, messages, extension);
      } catch (e) {
        console.error(`Error loading SEO module ${mod} for locale ${targetLocale}:`, e);
      }
    }
  }

  return {
    locale: resolvedLocale,
    messages,
    getMessageFallback({ namespace, key, error }) {
      const path = [namespace, key].filter((part) => part != null).join('.');
      if (error.code === 'MISSING_MESSAGE') {
        return path;
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
