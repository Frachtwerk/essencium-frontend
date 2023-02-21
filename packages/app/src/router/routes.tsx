import { RootRoute, Route } from '@tanstack/react-router'
import { SetPassword } from 'lib'

import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import { ContactView } from '@/views/ContactView'
import { HomeView } from '@/views/HomeView'
import { LoginView } from '@/views/LoginView'
import { ProfileView } from '@/views/ProfileView'
import { UserTableView } from '@/views/UserTableView/UserTableView'

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
  component: ContactView,
})

export const profileRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'profile',
  component: ProfileView,
})

export const userTableRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'users',
  component: UserTableView,
})
