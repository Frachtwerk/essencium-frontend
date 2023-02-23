import { render, RenderResult, screen } from '@testing-library/react'
import { CSSProperties } from 'react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Home } from './Home'

describe('Home', () => {
  let HomeMounted: RenderResult

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

    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))
    HomeMounted = render(<Home />)
  })

  afterAll(() => {
    HomeMounted.unmount()
  })

  it('should render the correct actions', () => {
    expect(screen.getByText('homeView.action.search')).toBeDefined()

    expect(
      screen.getByText('homeView.action.users').closest('a')
    ).toHaveProperty('href', 'users')

    expect(
      screen.getByText('homeView.action.profile').closest('a')
    ).toHaveProperty('href', 'profile')
  })
})
