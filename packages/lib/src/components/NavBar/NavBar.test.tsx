import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { NavBar } from './NavBar'

describe('NavBar', () => {
  let NavBarMounted: RenderResult

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    NavBarMounted = render(<NavBar isOpen />)
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
