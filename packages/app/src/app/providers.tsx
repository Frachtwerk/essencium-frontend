/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

'use client'

import { MantineColorScheme, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationData, Notifications } from '@mantine/notifications'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useState } from 'react'

import { withBaseStylingShowNotification } from '@/utils'
import { MantineColorSchemes, theme } from '@/utils/mantine'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, version?: string) => ReactNode
}

/* type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  version?: string
} */

export function Providers({
  children /*   Component,
  pageProps,
  version, */,
}: {
  children: ReactNode
}): JSX.Element {
  /* const getLayout =
    Component.getLayout ?? (page => <PublicLayout>{page}</PublicLayout>) */

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (_, query) => {
            if (query?.meta?.errorNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                query.meta.errorNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'error',
                notificationType,
              })
            }
          },
          onSuccess: (_, query) => {
            if (query?.meta?.successNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                query.meta.successNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'success',
                notificationType,
              })
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, variables, context, mutation) => {
            if (mutation?.meta?.errorNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                mutation.meta.errorNotification

              withBaseStylingShowNotification({
                title,
                message,
                color: 'error',
                notificationType,
              })
            }
          },
          onSuccess: (error, variables, context, mutation) => {
            if (mutation?.meta?.successNotification) {
              const {
                title,
                message,
                notificationType,
              }: Omit<NotificationData, 'message'> =
                mutation.meta.successNotification
              withBaseStylingShowNotification({
                title,
                message,
                color: 'success',
                notificationType,
              })
            }
          },
        }),
      }),
  )

  let systemColorScheme: MantineColorScheme = MantineColorSchemes.LIGHT

  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: systemColorScheme,
    getInitialValueInEffect: true,
  })

  if (typeof window !== 'undefined') {
    systemColorScheme = window.matchMedia('(prefers-color-scheme: light)')
      .matches
      ? MantineColorSchemes.LIGHT
      : MantineColorSchemes.DARK

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', event => {
        setColorScheme(
          event.matches ? MantineColorSchemes.LIGHT : MantineColorSchemes.DARK,
        )
      })
  }

  function toggleColorScheme(value?: MantineColorScheme): void {
    setColorScheme(
      value ||
        (colorScheme === MantineColorSchemes.DARK
          ? MantineColorSchemes.LIGHT
          : MantineColorSchemes.DARK),
    )
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  /*   const router = useRouter()

  const pathname = usePathname()

  const user = useAtomValue(userAtom)

  useEffect(() => {
    // Check if the user's locale is different from the current locale
    if (user?.locale && router.locale !== user.locale) {
      router.push(pathname, pathname, { locale: user.locale })
    }
    // Depend on pathname and userLocale to avoid unnecessary redirects
  }, [pathname, user, router]) */

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Notifications limit={3} />
        {children}
      </QueryClientProvider>
    </MantineProvider>
  )
}

/* export default appWithTranslation(App) */
