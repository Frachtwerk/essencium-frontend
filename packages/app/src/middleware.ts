import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals
  // - Static files (e.g. images)
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
