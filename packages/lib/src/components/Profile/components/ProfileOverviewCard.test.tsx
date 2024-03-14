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
import { describe, expect, it } from 'vitest'

import { ProfileOverviewCard } from './ProfileOverviewCard'

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
  user: MOCK_USER,
}

describe('ProfileOverviewCard.tsx', () => {
  let ProfileOverviewCardMounted = render(
    <MantineProvider>
      <ProfileOverviewCard {...props} />
    </MantineProvider>,
  )

  it('should render all static profile information', () => {
    expect(
      ProfileOverviewCardMounted.getByTitle(
        `${MOCK_USER.firstName} ${MOCK_USER.lastName} avatar`,
      ),
    ).toBeDefined()

    expect(
      ProfileOverviewCardMounted.getByText(
        `${MOCK_USER.firstName} ${MOCK_USER.lastName}`,
      ),
    ).toBeDefined()

    expect(
      ProfileOverviewCardMounted.getByText(
        `${MOCK_USER.roles.map(role => role.name)}`,
      ),
    ).toBeDefined()
  })

  it('should render green dot if user is enabled', () => {
    const indicator = ProfileOverviewCardMounted.getByRole('note').style
    expect(
      indicator.cssText.includes(
        '--indicator-color: var(--mantine-color-green-filled)',
      ),
    ).toBe(true)
  })

  it('should render red dot if user is disabled', () => {
    ProfileOverviewCardMounted.unmount()

    ProfileOverviewCardMounted = render(
      <MantineProvider>
        <ProfileOverviewCard
          {...props}
          user={{ ...props.user, enabled: false }}
        />
      </MantineProvider>,
    )

    const indicator = ProfileOverviewCardMounted.getByRole('note').style
    expect(
      indicator.cssText.includes(
        '--indicator-color: var(--mantine-color-red-filled)',
      ),
    ).toBe(true)
  })

  it('should render SSO badge if user is logged in via SSO i.e. GitLab', () => {
    ProfileOverviewCardMounted.unmount()

    ProfileOverviewCardMounted = render(
      <MantineProvider>
        <ProfileOverviewCard
          {...props}
          user={{ ...props.user, source: 'gitlab' }}
        />
      </MantineProvider>,
    )

    const ssoBadge = ProfileOverviewCardMounted.getByRole('status')

    expect(ssoBadge.innerText).toBe('gitlab')

    expect(ssoBadge).toBeDefined()
  })
})
