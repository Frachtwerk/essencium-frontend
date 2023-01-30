import { render, RenderResult, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CommonNavBar } from './CommonNavBar'

describe('CommonNavBar', () => {
  let CommonNavBarMounted: RenderResult

  beforeEach(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    CommonNavBarMounted = render(<CommonNavBar isOpen />)
  })

  afterEach(() => {
    CommonNavBarMounted.unmount()
  })

  it('should contain the correct navigation links', () => {
    expect(screen.getByText('navigation.home')).toBeDefined()
    expect(screen.getByText('navigation.users')).toBeDefined()
    expect(screen.getByText('navigation.roles')).toBeDefined()
    expect(screen.getByText('navigation.rights')).toBeDefined()
    expect(screen.getByText('navigation.translations')).toBeDefined()
  })
})
