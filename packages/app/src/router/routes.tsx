import { RootRoute, Route } from '@tanstack/react-router'
import { Contact, Profile, SetPassword } from 'lib'

import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import { HomeView } from '@/views/HomeView'
import { LoginView } from '@/views/LoginView'

export const rootRoute = new RootRoute()

export const indexRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: '/',
  component: HomeView,
})

export const setPasswordRoute = new Route({
  getParentRoute: () => layoutRouteLogin,
  path: 'set-password',
  component: SetPassword,
})

export const loginRoute = new Route({
  getParentRoute: () => layoutRouteLogin,
  path: 'login',
  component: LoginView,
})

export const contactRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'contact',
  component: Contact,
})

export const profileRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'profile',
  component: Profile,
})
