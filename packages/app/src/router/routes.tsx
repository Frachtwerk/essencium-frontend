import { RootRoute, Route } from '@tanstack/react-router'
import { ContactView, ProfileView, SetPasswordView } from 'lib'

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
  component: SetPasswordView,
})

export const loginRoute = new Route({
  getParentRoute: () => layoutRouteLogin,
  path: 'login',
  component: LoginView,
})

export const contactRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'contact',
  component: ContactView,
})

export const profileRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'profile',
  component: ProfileView,
})
