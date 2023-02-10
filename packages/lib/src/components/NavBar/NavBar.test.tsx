import {
  IconHome2,
  IconLanguage,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { NavLink } from './components'
import { NavBar } from './NavBar'

describe('NavBar', () => {
  let NavBarMounted: RenderResult

  const NAV_LINKS: NavLink[] = [
    {
      icon: <IconHome2 size={20} />,
      color: 'blue',
      label: 'navigation.home',
      to: '/home',
    },
    {
      icon: <IconUsers size={20} />,
      color: 'blue',
      label: 'navigation.users',
      to: '/users',
    },
    {
      icon: <IconUserCheck size={20} />,
      color: 'blue',
      label: 'navigation.roles',
      to: '/roles',
    },
    {
      icon: <IconShieldCheck size={20} />,
      color: 'blue',
      label: 'navigation.rights',
      to: '/rights',
    },
    {
      icon: <IconLanguage size={20} />,
      color: 'blue',
      label: 'navigation.translations',
      to: '/translations',
    },
  ]

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      Link: ({ children }: { children: React.ReactNode }) => children,
    }))

    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    NavBarMounted = render(<NavBar isOpen links={NAV_LINKS} />)
  })

  afterAll(() => {
    NavBarMounted.unmount()
  })

  it('should contain the correct navigation links', () => {
    expect(screen.getByText('navigation.home')).toBeDefined()
    expect(screen.getByText('navigation.users')).toBeDefined()
    expect(screen.getByText('navigation.roles')).toBeDefined()
    expect(screen.getByText('navigation.rights')).toBeDefined()
    expect(screen.getByText('navigation.translations')).toBeDefined()
  })
})
