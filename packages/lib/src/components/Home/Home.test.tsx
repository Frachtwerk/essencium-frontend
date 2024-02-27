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

import * as MantineSpotlight from '@mantine/spotlight'
import { fireEvent, render, screen } from '@testing-library/react'
import mockRouter from 'next-router-mock'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Home } from './Home'

vi.mock('next/router', () => vi.importActual('next-router-mock'))

describe('Home', () => {
  beforeAll(() => {
    render(<Home />)
  })

  it('should render the Essencium logo', () => {
    expect(screen.getByAltText('header.logo')).toBeDefined()
  })

  it('should render all buttons', () => {
    expect(screen.getByText('homeView.action.search')).toBeDefined()

    expect(screen.getByText('homeView.action.users')).toBeDefined()

    expect(screen.getByText('homeView.action.profile')).toBeDefined()
  })

  it('should trigger the Mantine spotlight', () => {
    const openSpotlightSpy = vi.spyOn(MantineSpotlight, 'openSpotlight')
    const searchButton = screen.getByText('homeView.action.search')
    fireEvent.click(searchButton)
    expect(openSpotlightSpy).toHaveBeenCalledOnce()
  })

  it('should navigate to corresponding routes', () => {
    const usersButton = screen.getByText('homeView.action.users')
    fireEvent.click(usersButton)
    expect(mockRouter.pathname).toEqual('/users')

    const profileButton = screen.getByText('homeView.action.profile')
    fireEvent.click(profileButton)
    expect(mockRouter.pathname).toEqual('/profile')
  })
})
