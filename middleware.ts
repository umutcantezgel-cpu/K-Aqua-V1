import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  //
  // `apple-icon` muss ausdrücklich ausgenommen werden: Next.js liefert
  // app/apple-icon.tsx unter genau diesem Pfad aus — ohne Dateiendung. Die
  // Regel `.*\..*` nimmt nur Pfade MIT Punkt aus, deshalb griff die
  // Locale-Weiterleitung und machte aus /apple-icon ein /de/apple-icon, das es
  // nicht gibt: HTTP 404. Der Favicon war davon nie betroffen, weil er als
  // /icon.svg einen Punkt trägt — was den Fehler beim Lesen leicht übersieht.
  matcher: ['/((?!api|_next|_vercel|apple-icon|.*\\..*).*)'],
};
