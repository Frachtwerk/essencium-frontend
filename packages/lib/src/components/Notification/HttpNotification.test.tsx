/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { render, RenderResult, screen } from '@testing-library/react'
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
      <HttpNotification isLoading={false} isError={false} />,
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  it('returns loading state if loading property is true', () => {
    mountedHttpNotificaton = render(
      <HttpNotification
        isLoading
        isError={false}
        loadingTitle="Loading..."
        loadingMessage="Retrieving data from the server"
      />,
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
        errorTitle="Error"
        errorMessage="Unable to fetch data"
      />,
    )

    expect(screen.queryByRole('alert')).toBeDefined()
    expect(screen.getByText('Error')).toBeDefined()
    expect(screen.getByText('Unable to fetch data')).toBeDefined()
    expect(screen.getByTestId('error-icon')).toBeDefined()
  })
})
