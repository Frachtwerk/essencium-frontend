import { NextRequest, NextResponse } from 'next/server'

import { i18nConfig } from './config/i18n'

const { locales, defaultLocale } = i18nConfig

export function proxy(request: NextRequest): NextResponse | void {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const acceptLanguage = request.headers.get('accept-language')
  const preferredLocale = acceptLanguage?.split(',')[0]?.trim().substring(0, 2)
  const locale =
    locales.find(l =>
      l.toLowerCase().startsWith(preferredLocale?.toLowerCase() || ''),
    ) || defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}
