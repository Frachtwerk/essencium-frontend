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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from '@tanstack/react-router'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { router } from './router/init'

function Root() {
  const queryClient = new QueryClient()

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

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
          white: '#fff',
          black: '#000',
          defaultGradient: { deg: 45, from: 'indigo', to: 'cyan' },
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
