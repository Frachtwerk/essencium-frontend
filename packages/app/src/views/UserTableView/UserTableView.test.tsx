import { render, screen } from '@testing-library/react'
import ReactDOM, { createPortal } from 'react-dom'
import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from 'vitest'

import { useGetUsers } from '@/api'
import { UserTableView } from '@/views/UserTableView/UserTableView'

const data = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'leanne123',
    email: 'test@test.com',
  },
]

describe('UserTableView', () => {
  beforeAll(() => {
    vi.mock('@/api', () => {
      return {
        useGetUsers: vi.fn(),
      }
    })

    vi.mock('react-dom', async (): Promise<Awaited<typeof ReactDOM>> => {
      const actual = await vi.importActual<typeof ReactDOM>('react-dom')

      return {
        ...actual,
        createPortal: vi.fn().mockImplementation(() => null),
      }
    })
  })

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders a loader on initial load', () => {
    ;(useGetUsers as Mock).mockImplementation(() => ({
      data: null,
      isFetching: true,
      isInitialLoading: true,
      isError: false,
      error: null,
      isLoading: true,
    }))

    render(<UserTableView />)

    expect(screen.getByRole('presentation')).toBeDefined()
    expect(useGetUsers).toHaveBeenCalled()
    expect(createPortal).not.toHaveBeenCalled()
  })

  it('calls useGetUsers hook to fetch data and shows them', () => {
    ;(useGetUsers as Mock).mockImplementation(() => ({
      data,
      isFetching: false,
      isInitialLoading: false,
      isError: false,
      error: null,
      isLoading: false,
    }))

    render(<UserTableView />)

    expect(useGetUsers).toHaveBeenCalled()
    expect(createPortal).not.toHaveBeenCalled()
    expect(screen.getByRole('table')).toBeDefined()
    expect(screen.getByText('Leanne Graham')).toBeDefined()
  })

  it('shows http notification when refetching data', () => {
    ;(useGetUsers as Mock).mockImplementation(() => ({
      data,
      isFetching: true,
      isInitialLoading: false,
      isError: false,
      error: null,
      isLoading: false,
    }))

    render(<UserTableView />)

    expect(screen.getByRole('presentation')).toBeDefined()
    expect(useGetUsers).toHaveBeenCalled()
    expect(createPortal).toHaveBeenCalled()
  })

  it('shows http notification when an error occurd while fetching data', () => {
    ;(useGetUsers as Mock).mockImplementation(() => ({
      data,
      isFetching: false,
      isInitialLoading: false,
      isError: true,
      error: null,
      isLoading: false,
    }))

    render(<UserTableView />)

    expect(screen.getByRole('presentation')).toBeDefined()
    expect(useGetUsers).toHaveBeenCalled()
    expect(createPortal).toHaveBeenCalled()
  })
})
