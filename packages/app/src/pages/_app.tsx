import { UserOutput } from '@frachtwerk/essencium-types'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Fira_Code, Fira_Sans } from 'next/font/google'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import React, { ReactElement, ReactNode, useEffect, useState } from 'react'

import PublicLayout from '@/components/layouts/PublicLayout'

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})
const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const router = useRouter()

  const getLayout =
    Component.getLayout ?? (page => <PublicLayout>{page}</PublicLayout>)

  const [queryClient] = useState(() => new QueryClient())

  let systemColorScheme: ColorScheme = 'light'

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
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

  function toggleColorScheme(value?: ColorScheme): void {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  useEffect(() => {
    // useAtom
    let user: UserOutput | string | null = localStorage.getItem('user')

    if (!user || typeof user !== 'string') return

    user = JSON.parse(user) as UserOutput

    router.replace(router.asPath, undefined, {
      locale: user?.locale,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
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
          loader: 'dots',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Notifications limit={3} />

            {getLayout(<Component {...pageProps} />)}
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default appWithTranslation(App)
