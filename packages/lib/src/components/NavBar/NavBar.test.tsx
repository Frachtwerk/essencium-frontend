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
import { fireEvent, render, screen } from '@testing-library/react'
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

  const sharedProps = {
    links: NAV_LINKS,
    handleLogout: () => {},
    isMobile: false,
    fixedNav: false,
    setFixedNav: vi.fn(),
    setFoldedNav: vi.fn(),
  }

  const allUserRights = [
    RIGHTS.USER_READ,
    RIGHTS.ROLE_READ,
    RIGHTS.RIGHT_READ,
    RIGHTS.TRANSLATION_READ,
  ]

  const someUserRights = [RIGHTS.USER_READ, RIGHTS.ROLE_READ, RIGHTS.RIGHT_READ]

  const propsAllUserRights = {
    ...sharedProps,
    userRights: allUserRights,
    foldedNav: true,
  }

  const propsSomeUserRights = {
    ...sharedProps,
    userRights: someUserRights,
    foldedNav: true,
  }

  const propsUnfoldedNav = {
    ...sharedProps,
    userRights: allUserRights,
    foldedNav: false,
  }

  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => (
    <MantineProvider>
      <AppShell>{children}</AppShell>
    </MantineProvider>
  )

  beforeAll(() => {
    vi.mock('next/router', () => ({
      useRouter: () => ({}),
    }))
  })

  it('should render the NavBar', () => {
    const renderedComponent = render(<NavBar {...propsAllUserRights} />, {
      wrapper,
    })

    const navBar = screen.getByRole('navigation')

    expect(navBar).toBeDefined()

    renderedComponent.unmount()
  })

  it('should contain all navigation links with all rights', () => {
    const renderedComponent = render(<NavBar {...propsAllUserRights} />, {
      wrapper,
    })

    expect(
      screen.getByText('navigation.home.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/`)

    expect(
      screen.getByText('navigation.users.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/users`)

    expect(
      screen.getByText('navigation.roles.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/roles`)

    expect(
      screen.getByText('navigation.rights.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/rights`)

    expect(
      screen.getByText('navigation.translations.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/translations`)

    renderedComponent.unmount()
  })

  it('should not contain all links with just some rights', () => {
    const renderedComponent = render(<NavBar {...propsSomeUserRights} />, {
      wrapper,
    })

    expect(
      screen.getByText('navigation.home.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/`)

    expect(
      screen.getByText('navigation.users.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/users`)

    expect(
      screen.getByText('navigation.roles.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/roles`)

    expect(
      screen.getByText('navigation.rights.label').closest('a'),
    ).toHaveProperty('href', `${BASE_PATH}/admin/rights`)

    expect(screen.queryByText('navigation.translations.label')).toBeNull()

    renderedComponent.unmount()
  })

  it('should not render the pin icon if NavBar is folded ', () => {
    const renderedComponent = render(<NavBar {...propsSomeUserRights} />, {
      wrapper,
    })

    const pinIcon = screen.queryByLabelText(
      'navigation.toggleFixedNavIcon.arialabel',
    )

    expect(pinIcon).toBeNull()

    renderedComponent.unmount()
  })

  it('should render the pin icon if NavBar is unfolded and call the correct function on click ', () => {
    const renderedComponent = render(<NavBar {...propsUnfoldedNav} />, {
      wrapper,
    })

    const pinIcon = screen.getByLabelText(
      'navigation.toggleFixedNavIcon.arialabel',
    ) as HTMLInputElement

    expect(pinIcon).toBeDefined()

    fireEvent.click(pinIcon)

    expect(sharedProps.setFixedNav).toHaveBeenCalledOnce()

    renderedComponent.unmount()
  })
})
