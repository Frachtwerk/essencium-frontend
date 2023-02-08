import { Center } from '@mantine/core'
import { Outlet, Route } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import App from '@/App'
import { rootRoute } from '@/router/routes'

// This layout route is covered with the AppShell for all routes where a user is logged in.
export const layoutRouteAppShell = new Route({
  getParentRoute: () => rootRoute,
  id: 'appShell',
  component: () => (
    <App>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </App>
  ),
})

// This layout route is covered with the Login component for all routes where a user is not logged in.
export const layoutRouteLogin = new Route({
  getParentRoute: () => rootRoute,
  id: 'login',
  component: () => (
    <Center>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </Center>
  ),
})
