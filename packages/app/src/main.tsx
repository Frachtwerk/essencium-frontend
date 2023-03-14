import './plugins'
// Fira Sans Font
import '@fontsource/fira-sans/100.css'
import '@fontsource/fira-sans/200.css'
import '@fontsource/fira-sans/300.css'
import '@fontsource/fira-sans/400.css'
import '@fontsource/fira-sans/500.css'
import '@fontsource/fira-sans/600.css'
import '@fontsource/fira-sans/700.css'
import '@fontsource/fira-sans/800.css'
import '@fontsource/fira-sans/900.css'
// Fira Code Font
import '@fontsource/fira-code/300.css'
import '@fontsource/fira-code/400.css'
import '@fontsource/fira-code/500.css'
import '@fontsource/fira-code/600.css'
import '@fontsource/fira-code/700.css'

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { router } from './router/init'

function Root(): JSX.Element {
  const queryClient = new QueryClient()

  const systemColorScheme = window.matchMedia('(prefers-color-scheme: light)')
    .matches
    ? 'light'
    : 'dark'

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: systemColorScheme,
    getInitialValueInEffect: true,
  })

  function toggleColorScheme(value?: ColorScheme): void {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', event => {
      setColorScheme(event.matches ? 'light' : 'dark')
    })

  useHotkeys([['mod+J', () => toggleColorScheme()]])

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
          fontFamily: 'Fira Sans,  sans-serif',
          fontFamilyMonospace: 'Fira Code, monospace',
          headings: {
            fontFamily: 'Fira Sans, sans-serif',
          },
          loader: 'dots',
          transitionTimingFunction: 'ease-in-out',
          dateFormat: 'YYYY-MM-DD',
          datesLocale: 'en',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

          <NotificationsProvider />

          <RouterProvider router={router} />
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
