import { ReactRouter } from '@tanstack/react-router'

import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import {
  addUserRoute,
  contactRoute,
  indexRoute,
  loginRoute,
  profileRoute,
  rightsRoute,
  rolesRoute,
  rootRoute,
  setPasswordRoute,
  translationsRoute,
  userIndexRoute,
  usersRoute,
} from '@/router/routes'

// This enables type-safety for the router
declare module '@tanstack/react-router' {
  type Register = {
    router: typeof router
  }
}

// The hierarchy of all routes
const routeTree = rootRoute.addChildren([
  layoutRouteAppShell.addChildren([
    indexRoute,
    contactRoute,
    profileRoute,
    usersRoute.addChildren([addUserRoute, userIndexRoute]),
    rightsRoute,
    rolesRoute,
    translationsRoute,
  ]),
  layoutRouteLogin.addChildren([loginRoute, setPasswordRoute]),
])

export const router = new ReactRouter({ routeTree })
