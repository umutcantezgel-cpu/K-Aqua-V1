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

  const baseMessages = (await import(`../../messages/${targetLocale}.json`)).default;
  let messages = { ...baseMessages };

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
    try {
      const extension = (await import(`../../messages/seo/${targetLocale}/${mod}.json`)).default;
      messages = merge({}, messages, extension);
    } catch (e) {
      // Ignore missing files
    }
  }

  return {
    locale: resolvedLocale,
    messages
  };
});
