/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { UserOutput } from '@frachtwerk/essencium-types'
import { AppShell, MantineProvider } from '@mantine/core'
import { render, RenderResult } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

const MOCK_USER: UserOutput = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  enabled: true,
  locale: 'de',
  mobile: '0123456789',
  phone: '0123456789',
  roles: [],
} as const

vi.mock('@mantine/core', async () => {
  const mantineCore = (await vi.importActual('@mantine/core')) as Record<
    string,
    unknown
  >

  return {
    ...mantineCore,
    useMantineTheme: () => ({
      colors: { gray: [] },
    }),
  }
})

describe('Header.tsx', () => {
  let HeaderMounted: RenderResult

  beforeAll(() => {
    HeaderMounted = render(
      <MantineProvider>
        <AppShell>
          <Header
            isOpen
            handleOpenNav={() => {}}
            user={MOCK_USER}
            marginLeft="0"
          />
        </AppShell>
      </MantineProvider>,
    )
  })

  it('should render the spotlight search bar', () => {
    expect(HeaderMounted.getByRole('searchbox')).toBeDefined()
  })

  it('should render the theme selector', () => {
    expect(
      HeaderMounted.getByRole('button', {
        name: 'theme-selector',
      }),
    ).toBeDefined()
  })

  it('should render the logged in user menu', () => {
    expect(
      HeaderMounted.getByRole('link', {
        name: 'header.profile.arialLabel',
      }),
    ).toBeDefined()
  })
})
