import { NavLink } from '@frachtwerk/essencium-types'
import {
  IconHome2,
  IconLanguage,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons-react'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { NavBar } from './NavBar'

describe('NavBar', () => {
  let NavBarMounted: RenderResult

  const NAV_LINKS: NavLink[] = [
    {
      icon: <IconHome2 size={20} />,
      color: 'blue',
      label: 'navigation.home.label',
      to: '/home',
      rights: [],
    },
    {
      icon: <IconUsers size={20} />,
      color: 'blue',
      label: 'navigation.users.label',
      to: '/users',
      rights: [],
    },
    {
      icon: <IconUserCheck size={20} />,
      color: 'blue',
      label: 'navigation.roles.label',
      to: '/roles',
      rights: [],
    },
    {
      icon: <IconShieldCheck size={20} />,
      color: 'blue',
      label: 'navigation.rights.label',
      to: '/rights',
      rights: [],
    },
    {
      icon: <IconLanguage size={20} />,
      color: 'blue',
      label: 'navigation.translations.label',
      to: '/translations',
      rights: [],
    },
  ]

  beforeAll(() => {
    vi.mock('next/router', () => ({
      useRouter: () => ({}),
    }))

    NavBarMounted = render(
      <NavBar isOpen links={NAV_LINKS} handleLogout={() => {}} />
    )
  })

  afterAll(() => {
    NavBarMounted.unmount()
  })

  it('should contain the correct navigation links', () => {
    expect(
      screen.getByText('navigation.home.label').closest('a')
    ).toHaveProperty('href', '/home')
    expect(
      screen.getByText('navigation.users.label').closest('a')
    ).toHaveProperty('href', '/users')
    expect(
      screen.getByText('navigation.roles.label').closest('a')
    ).toHaveProperty('href', '/roles')
    expect(
      screen.getByText('navigation.rights.label').closest('a')
    ).toHaveProperty('href', '/rights')
    expect(
      screen.getByText('navigation.translations.label').closest('a')
    ).toHaveProperty('href', '/translations')
  })
})
