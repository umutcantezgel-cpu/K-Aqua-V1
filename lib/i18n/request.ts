import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const AVAILABLE_LOCALES = [
  'ar', 'de', 'en', 'en-GB', 'es', 'es-ES', 'fr', 'it', 'nl', 'pl', 'pt-BR', 'pt', 'ru', 'tr', 'zh'
];

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

  const messages = (await import(`../../messages/${targetLocale}.json`)).default;
  console.log('LOADED MESSAGES FOR', targetLocale, 'KEYS:', Object.keys(messages).filter(k => k === 'homex'));

  return {
    locale: resolvedLocale,
    messages
  };
});
