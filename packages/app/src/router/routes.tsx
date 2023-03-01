import { RootRoute, Route } from '@tanstack/react-router'
import { SetPassword } from 'lib'

import { tokenAtom } from '@/api/auth'
import { layoutRouteAppShell, layoutRouteLogin } from '@/router/layouts'
import { store } from '@/store'
import { ContactView } from '@/views/ContactView'
import { HomeView } from '@/views/HomeView'
import { LoginView } from '@/views/LoginView'
import { ProfileView } from '@/views/ProfileView'
import { UsersView } from '@/views/UsersView/UsersView'

export const rootRoute = new RootRoute()

export const indexRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: '/',
  component: HomeView,
  beforeLoad: ({ router }) => {
    const token = store.get(tokenAtom)
    if (!token) {
      router.navigate({ to: `/login` })
    }
  },
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
  beforeLoad: ({ router }) => {
    const token = store.get(tokenAtom)
    if (!token) {
      router.navigate({ to: `/login` })
    }
  },
})

export const profileRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'profile',
  component: ProfileView,
  beforeLoad: ({ router }) => {
    const token = store.get(tokenAtom)
    if (!token) {
      router.navigate({ to: `/login` })
    }
  },
})

export const usersRoute = new Route({
  getParentRoute: () => layoutRouteAppShell,
  path: 'users',
  component: UsersView,
  beforeLoad: ({ router }) => {
    const token = store.get(tokenAtom)
    if (!token) {
      router.navigate({ to: `/login` })
    }
  },
})
