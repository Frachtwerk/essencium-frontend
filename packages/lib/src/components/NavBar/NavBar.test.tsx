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

import { NavLink, RIGHTS } from '@frachtwerk/essencium-types'
import { AppShell, MantineProvider } from '@mantine/core'
import {
  IconHome,
  IconLanguage,
  IconShieldHalf,
  IconUsers,
  IconUserStar,
} from '@tabler/icons-react'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { NavBar } from './NavBar'

const BASE_PATH = 'http://localhost:3000'

describe('NavBar', () => {
  const NAV_LINKS: NavLink[] = [
    {
      icon: <IconHome />,
      color: 'blue',
      label: 'navigation.home.label',
      to: '/',
      description: 'navigation.home.description',
      rights: [],
    },
    {
      icon: <IconUsers />,
      color: 'blue',
      label: 'navigation.users.label',
      to: '/users',
      description: 'navigation.users.description',
      rights: [RIGHTS.USER_READ],
    },
    {
      icon: <IconUserStar />,
      color: 'blue',
      label: 'navigation.roles.label',
      to: '/roles',
      description: 'navigation.roles.description',
      rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
    },
    {
      icon: <IconShieldHalf />,
      color: 'blue',
      label: 'navigation.rights.label',
      to: '/rights',
      description: 'navigation.rights.description',
      rights: [RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ],
    },
    {
      icon: <IconLanguage />,
      color: 'blue',
      label: 'navigation.translations.label',
      to: '/translations',
      description: 'navigation.translations.description',
      rights: [RIGHTS.TRANSLATION_READ],
    },
  ]

  const props = {
    links: NAV_LINKS,
    userRights: [],
    handleLogout: () => {},
    logo: <div>Logo</div>,
    icon: <div>Icon</div>,
    foldedNav: false,
    setFoldedNav: () => {},
    fixedNav: false,
    setFixedNav: () => {},
    isMobile: false,
  }
  beforeAll(() => {
    const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
      <MantineProvider>
        <AppShell>{children}</AppShell>
      </MantineProvider>
    )

    render(<NavBar {...props} />, { wrapper })

    vi.mock('next/router', () => ({
      useRouter: () => ({}),
    }))
  })

  it('should contain the correct navigation links', () => {
    expect(
      screen.getByText('navigation.home.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/home`)
    expect(
      screen.getByText('navigation.users.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/users`)
    expect(
      screen.getByText('navigation.roles.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/roles`)
    expect(
      screen.getByText('navigation.rights.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/rights`)
    expect(
      screen.getByText('navigation.translations.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/translations`)
  })
})
