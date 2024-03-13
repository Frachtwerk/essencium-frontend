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

import { RoleOutput, UserOutput } from '@frachtwerk/essencium-types'
import { MantineProvider } from '@mantine/core'
import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ProfileDataCard } from './ProfileDataCard'

const MOCK_USER: UserOutput = {
  id: '3fde69ac-2885-4c8b-9f7c-683131d34e17',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@email.com',
  enabled: true,
  locale: 'de',
  mobile: '0123456789',
  phone: '0123456789',
  roles: [{ name: 'USER' } as RoleOutput],
  source: 'local',
} as const

const props = {
  isSso: false,
  user: MOCK_USER,
  handleUpdate: vi.fn(),
  handlePasswordUpdate: vi.fn(),
  isUpdatingPassword: false,
  isUpdatingUser: false,
}

describe('ProfileDataCard.tsx', () => {
  let ProfileOverviewCardMounted = render(
    <MantineProvider>
      <ProfileDataCard {...props} />
    </MantineProvider>,
  )

  it('should render all available tabs (login via mail + password)', () => {
    expect(ProfileOverviewCardMounted.getByRole('tablist')).toBeDefined()

    expect(
      ProfileOverviewCardMounted.getByRole('tab', {
        name: 'profileView.dataCard.tabs.personalData.title',
      }),
    ).toBeDefined()

    expect(
      ProfileOverviewCardMounted.getByRole('tab', {
        name: 'profileView.dataCard.tabs.passwordChange.title',
      }),
    ).toBeDefined()

    expect(ProfileOverviewCardMounted.getAllByRole('tab')).toHaveLength(2)
  })

  it('should render all available tabs (login via SSO)', () => {
    ProfileOverviewCardMounted.unmount()

    ProfileOverviewCardMounted = render(
      <MantineProvider>
        <ProfileDataCard {...props} isSso />
      </MantineProvider>,
    )

    expect(ProfileOverviewCardMounted.getByRole('tablist')).toBeDefined()

    expect(
      ProfileOverviewCardMounted.getByRole('tab', {
        name: 'profileView.dataCard.tabs.personalData.title',
      }),
    ).toBeDefined()

    expect(ProfileOverviewCardMounted.getAllByRole('tab')).toHaveLength(1)
  })
})
