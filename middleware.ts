import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 1. Generate cryptographic nonce
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  // 2. Define Content Security Policy (CSP)
  const isDev = process.env.NODE_ENV === 'development';
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // 3. Inject nonce and CSP into request headers for Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  // 4. Extract GEO-IP country (Vercel specific header)
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  requestHeaders.set('x-user-country', country);

  // 5. Detect RTL languages (Arabic, Hebrew, Persian, Urdu)
  const pathname = request.nextUrl.pathname;
  const isRTL = /^\/(ar|he|fa|ur)(\/|$)/.test(pathname);
  requestHeaders.set('x-direction', isRTL ? 'rtl' : 'ltr');
  requestHeaders.set('x-pathname', pathname);

  const reqWithHeaders = new NextRequest(request, {
    headers: requestHeaders,
  });

  // 6. Run the internationalization middleware
  const response = intlMiddleware(reqWithHeaders);

  // 7. Append CSP and nonce headers to the outgoing response
  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('x-user-country', country);
  response.headers.set('x-direction', isRTL ? 'rtl' : 'ltr');

  return response;
}

export const config = {
  // Match everything except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
