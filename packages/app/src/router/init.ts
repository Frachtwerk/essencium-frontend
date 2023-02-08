import { ReactRouter } from '@tanstack/react-router'

import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import {
  contactRoute,
  indexRoute,
  loginRoute,
  profileRoute,
  rootRoute,
  setPasswordRoute,
} from '@/router/routes'

// This enables type-safety for the router
declare module '@tanstack/react-router' {
  type Register = {
    router: typeof router
  }
}

// The hierarchy of all routes
export const routeTree = rootRoute.addChildren([
  layoutRouteAppShell.addChildren([indexRoute, contactRoute, profileRoute]),
  layoutRouteLogin.addChildren([loginRoute, setPasswordRoute]),
])

export const router = new ReactRouter({ routeTree })
