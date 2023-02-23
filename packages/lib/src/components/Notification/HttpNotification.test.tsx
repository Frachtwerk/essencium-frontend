import { render, RenderResult, screen } from '@testing-library/react'
import { AxiosError } from 'axios'
import ReactDOM from 'react-dom'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { HttpNotification } from './HttpNotification'

describe('HttpNotification', () => {
  let mountedHttpNotificaton: RenderResult

  beforeAll(() => {
    vi.mock('react-dom', async (): Promise<Awaited<typeof ReactDOM>> => {
      const actual = await vi.importActual<typeof ReactDOM>('react-dom')

      return {
        ...actual,
        createPortal: vi.fn().mockImplementation(children => children),
      }
    })
  })

  beforeEach(() => {
    if (mountedHttpNotificaton) {
      mountedHttpNotificaton.unmount()
    }
  })

  it('returns nothing if no truthy loading or error state', () => {
    mountedHttpNotificaton = render(
      <HttpNotification isLoading={false} isError={false} error={null} />
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('returns loading state if loading property is true', () => {
    mountedHttpNotificaton = render(
      <HttpNotification isLoading isError={false} error={null} />
    )

    expect(screen.queryByRole('alert')).toBeDefined()
    expect(screen.getByText('Loading...')).toBeDefined()
    expect(screen.getByText('Retrieving data from the server')).toBeDefined()
  })

  it('returns error state if error property is true', () => {
    mountedHttpNotificaton = render(
      <HttpNotification
        isLoading={false}
        isError
        error={{ message: 'Unable to fetch data' } as AxiosError}
      />
    )

    expect(screen.queryByRole('alert')).toBeDefined()
    expect(screen.getByText('Error')).toBeDefined()
    expect(screen.getByText('Unable to fetch data')).toBeDefined()
    expect(screen.getByTestId('error-icon')).toBeDefined()
  })
})
