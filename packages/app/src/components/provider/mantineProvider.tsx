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
import { ReactNode } from 'react'

import { MantineColorSchemes, theme } from '@/config/mantine'

export function MantineThemeProvider({
  children,
}: {
  children: ReactNode
}): JSX.Element {
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

  return <MantineProvider theme={theme}>{children}</MantineProvider>
}
