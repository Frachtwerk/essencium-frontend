import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Home } from './Home'

describe('Home', () => {
  let HomeMounted: RenderResult

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      useRouter: () => ({}),
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
    ).toHaveProperty('href', '/users')

    expect(
      screen.getByText('homeView.action.profile').closest('a')
    ).toHaveProperty('href', '/profile')
  })
})
