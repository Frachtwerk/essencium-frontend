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

import '@mantine/spotlight/styles.css'
import '@frachtwerk/essencium-lib/src/globals.css'

import { mantineHtmlProps } from '@mantine/core'
import type { JSX } from 'react'

import TranslationProvider from '@/components/provider/translationProvider'

import initTranslations, { i18nConfig } from '../../config/i18n'
import { Providers } from './providers'

export function generateStaticParams(): { locale: string }[] {
  return i18nConfig.locales.map(locale => ({ locale }))
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout(props: Props): Promise<JSX.Element> {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const { resources } = await initTranslations(locale)

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <link rel="icon" href="/img/web/favicon.ico" sizes="any" />
        <script src="/runtimeConfig.js" />
      </head>

      <body>
        <div id="notification" />
        <TranslationProvider locale={locale} resources={resources}>
          <Providers>{children}</Providers>
        </TranslationProvider>
      </body>
    </html>
  )
}
