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
import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { SearchBar, ThemeSelector, UserMenu } from './components'
import { Header } from './Header'

describe('Header', () => {
  let HeaderMounted: RenderResult
  const applicationLogo = <img alt="Application Logo" />
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
  } as UserOutput

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      useRouter: () => ({}),
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

    HeaderMounted = render(
      <Header
        isOpen
        handleOpenNav={() => {}}
        logo={applicationLogo}
        user={mockUser}
      />,
    )
  })

  afterAll(() => {
    HeaderMounted.unmount()
  })

  it('should contain the correct header items', () => {
    expect(screen.getByText('header.title')).toBeDefined()
    expect(screen.getByRole('img')).toBeDefined()

    render(<SearchBar />)
    render(<UserMenu user={mockUser} />)
    render(<ThemeSelector />)
  })
})
