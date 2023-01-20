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

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
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
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
)
