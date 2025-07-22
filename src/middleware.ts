/**
 * Next.js Middleware for handling redirects and logging
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getRedirectForUrl, redirectAnalytics } from './config/redirects';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this URL needs a redirect
  const redirect = getRedirectForUrl(pathname);
  
  if (redirect) {
    // Log the redirect for analytics
    redirectAnalytics.logRedirect({
      source: pathname,
      destination: redirect.destination,
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
      ip: request.ip || request.headers.get('x-forwarded-for') || undefined
    });

    // Create the redirect URL
    const redirectUrl = new URL(redirect.destination, request.url);
    
    // Preserve query parameters
    redirectUrl.search = request.nextUrl.search;

    // Return appropriate redirect response
    if (redirect.permanent) {
      return NextResponse.redirect(redirectUrl, 301);
    } else {
      return NextResponse.redirect(redirectUrl, 302);
    }
  }

  // Handle 404 fallback for resource pages
  if (pathname.startsWith('/ressources/') && !isKnownResourcePage(pathname)) {
    // Log the 404 attempt
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔍 404 attempt: ${pathname} - redirecting to /ressources`);
    }

    redirectAnalytics.logRedirect({
      source: pathname,
      destination: '/ressources',
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
      ip: request.ip || request.headers.get('x-forwarded-for') || undefined
    });

    const fallbackUrl = new URL('/ressources', request.url);
    fallbackUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(fallbackUrl, 302);
  }

  return NextResponse.next();
}

/**
 * Check if a resource page is known to exist
 */
function isKnownResourcePage(pathname: string): boolean {
  const knownPages = [
    '/ressources',
    '/ressources/scripts-prospection',
    '/ressources/linkedin-prospection',
    '/ressources/systeme-suivi-prospects',
    '/ressources/techniques-motivation-equipe',
    '/ressources/guide-recrutement-commercial',
    '/ressources/meilleurs-livres',
    // Add other known resource pages here
  ];

  return knownPages.some(page => pathname.startsWith(page));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*$).*)',
  ],
};