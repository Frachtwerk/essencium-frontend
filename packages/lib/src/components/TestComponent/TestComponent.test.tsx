import { render, RenderResult, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { TestComponent } from './TestComponent'

/**
 * This is only a demo that does not cover a full coverage test of the component.
 */
describe('TestComponent', () => {
  const users = [
    {
      id: Math.floor(Math.random() * 100),
      name: 'Daniel Dino',
      username: 'dinopower',
      email: 'dino@power.io',
    },
  ]

  let TestComponentMounted: RenderResult

  beforeEach(() => {
    vi.mock('@tanstack/react-query', () => ({
      QueryClient: vi.fn(),
      QueryClientProvider: vi.fn(),
      useQuery: vi.fn(),
    }))

    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    TestComponentMounted = render(<TestComponent users={users} />)
  })

  afterEach(() => {
    TestComponentMounted.unmount()
  })

  it('should render the length of the users prop', () => {
    expect(screen.getByText(`${users.length} usersGivenByProp`)).toBeDefined()
  })

  it('should render the first item of the list of given users by prop', () => {
    expect(
      screen.getByText(`${users[0].username} (${users[0].id})`)
    ).toBeDefined()
  })
})
