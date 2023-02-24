import {
  IconHome2,
  IconLanguage,
  IconShieldCheck,
  IconUserCheck,
  IconUsers,
} from '@tabler/icons'
import { render, RenderResult, screen } from '@testing-library/react'
import { CSSProperties } from 'react'
import { initReactI18next } from 'react-i18next'
import { initI18n } from 'translations'
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
      Link: ({
        children,
        to,
        ...props
      }: {
        children: React.ReactNode
        to: string
        style: CSSProperties
      }) => (
        <a {...props} href={to}>
          {children}
        </a>
      ),
    }))

    initI18n(initReactI18next)

    NavBarMounted = render(<NavBar isOpen links={NAV_LINKS} />)
  })

  afterAll(() => {
    NavBarMounted.unmount()
  })

  it('should contain the correct navigation links', () => {
    expect(screen.getByText('Home').closest('a')).toHaveProperty(
      'href',
      '/home'
    )
    expect(screen.getByText('Users').closest('a')).toHaveProperty(
      'href',
      '/users'
    )
    expect(screen.getByText('Roles').closest('a')).toHaveProperty(
      'href',
      '/roles'
    )
    expect(screen.getByText('Rights').closest('a')).toHaveProperty(
      'href',
      '/rights'
    )
    expect(screen.getByText('Translations').closest('a')).toHaveProperty(
      'href',
      '/translations'
    )
  })
})
