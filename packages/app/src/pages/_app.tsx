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

import '@mantine/core/styles.css'
import '@mantine/spotlight/styles.css'

import { UserOutput } from '@frachtwerk/essencium-types'
import {
  createTheme,
  Loader,
  MantineColorScheme,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationData, Notifications } from '@mantine/notifications'
import {
  HydrationBoundary,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Fira_Code, Fira_Sans } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'
import { appWithTranslation } from 'next-i18next'
import { ReactElement, ReactNode, useEffect, useState } from 'react'

import { PublicLayout } from '@/components/layouts/PublicLayout'
import { withBaseStylingShowNotification } from '@/utils'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, version?: string) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  version?: string
}

function App({
  Component,
  pageProps,
  version,
}: AppPropsWithLayout): JSX.Element {
  const getLayout =
    Component.getLayout ?? (page => <PublicLayout>{page}</PublicLayout>)

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

  let systemColorScheme: MantineColorScheme = 'light'

  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: systemColorScheme,
    getInitialValueInEffect: true,
  })

  if (typeof window !== 'undefined') {
    systemColorScheme = window.matchMedia('(prefers-color-scheme: light)')
      .matches
      ? 'light'
      : 'dark'

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addEventListener('change', event => {
        setColorScheme(event.matches ? 'light' : 'dark')
      })
  }

  function toggleColorScheme(value?: MantineColorScheme): void {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // useAtom
    let user: UserOutput | string | null = localStorage.getItem('user')

    if (!user || typeof user !== 'string') return

    user = JSON.parse(user) as UserOutput

    if (user.locale === 'en') {
      router.push(`${pathname}`)
    } else {
      router.push(`/${user.locale}${pathname}`)
    }
  }, [pathname, router])

  const theme = createTheme({
    focusRing: 'auto',
    respectReducedMotion: true,
    defaultRadius: 'sm',
    cursorType: 'pointer',
    colors: {
      blue: [
        '#E5FBFF',
        '#B8F4FF',
        '#8AEDFF',
        '#5CE6FF',
        '#2EDFFF',
        '#00D8FF',
        '#00ADCC',
        '#008199',
        '#005666',
        '#002B33',
      ],
      orange: [
        '#FFF3E5',
        '#FFDDB8',
        '#FFC78A',
        '#FFB15C',
        '#FF9B2E',
        '#FF8500',
        '#CC6A00',
        '#995000',
        '#663500',
        '#331B00',
      ],
    },
    white: '#ffffff',
    black: '#131313',
    primaryColor: 'blue',
    primaryShade: { light: 6, dark: 7 },
    defaultGradient: {
      from: 'blue',
      to: 'orange',
      deg: 135,
    },
    fontFamily: firaSans.style.fontFamily,
    fontFamilyMonospace: firaCode.style.fontFamily,
    headings: {
      fontFamily: firaSans.style.fontFamily,
    },
    components: {
      Loader: Loader.extend({
        defaultProps: {
          type: 'dots',
        },
      }),
    },
  })

  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Notifications limit={3} />

          {getLayout(
            <Component {...pageProps} />,
            version &&
              process.env.NEXT_PUBLIC_SHOW_VERSION &&
              process.env.NEXT_PUBLIC_SHOW_VERSION === '1'
              ? version
              : undefined,
          )}
        </HydrationBoundary>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default appWithTranslation(App)
