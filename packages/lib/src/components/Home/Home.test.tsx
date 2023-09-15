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
      screen.getByText('homeView.action.users').closest('a'),
    ).toHaveProperty('href', '/users')

    expect(
      screen.getByText('homeView.action.profile').closest('a'),
    ).toHaveProperty('href', '/profile')
  })
})
