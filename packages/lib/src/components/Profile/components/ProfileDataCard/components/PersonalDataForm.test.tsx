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
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PersonalDataForm } from './PersonalDataForm'

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
  handleUpdate: () => undefined,
  isLoading: false,
}

describe('PersonalDataForm.tsx', () => {
  let ProfileOverviewCardMounted = render(
    <MantineProvider>
      <PersonalDataForm {...props} />
    </MantineProvider>,
  )

  it('should render error message for firstname if data is invalid', async () => {
    const submitButton = ProfileOverviewCardMounted.getByRole('button')

    const firstNameInput = ProfileOverviewCardMounted.getByRole('textbox', {
      name: 'profileView.dataCard.tabs.personalData.label.firstName',
    }) as HTMLInputElement

    expect(firstNameInput).toBeDefined()

    fireEvent.input(firstNameInput, {
      target: {
        value: '',
      },
    })

    expect(firstNameInput.value).toBe('')

    fireEvent.submit(submitButton)

    expect(
      await ProfileOverviewCardMounted.findByText(
        'validation.firstName.minLength',
      ),
    ).toBeDefined()
  })

  it('should render error message for lastname if data is invalid', async () => {
    const submitButton = ProfileOverviewCardMounted.getByRole('button')

    const lastNameInput = ProfileOverviewCardMounted.getByRole('textbox', {
      name: 'profileView.dataCard.tabs.personalData.label.lastName',
    }) as HTMLInputElement

    expect(lastNameInput).toBeDefined()

    fireEvent.input(lastNameInput, {
      target: {
        value: '',
      },
    })

    expect(lastNameInput.value).toBe('')

    fireEvent.submit(submitButton)

    expect(
      await ProfileOverviewCardMounted.findByText(
        'validation.lastName.minLength',
      ),
    ).toBeDefined()
  })

  it('should render error message for email if data is invalid', async () => {
    const submitButton = ProfileOverviewCardMounted.getByRole('button')

    const emailInput = ProfileOverviewCardMounted.getByRole('textbox', {
      name: 'profileView.dataCard.tabs.personalData.label.email',
    }) as HTMLInputElement

    expect(emailInput).toBeDefined()

    fireEvent.input(emailInput, {
      target: {
        value: '',
      },
    })

    expect(emailInput.value).toBe('')

    fireEvent.submit(submitButton)

    expect(
      await ProfileOverviewCardMounted.findByText('validation.email.notValid'),
    ).toBeDefined()
  })

  it('should submit the form if data is valid', async () => {
    ProfileOverviewCardMounted.unmount()

    ProfileOverviewCardMounted = render(
      <MantineProvider>
        <PersonalDataForm {...props} />
      </MantineProvider>,
    )

    const submitButton = ProfileOverviewCardMounted.getByRole('button', {
      name: 'profileView.dataCard.tabs.personalData.saveChanges',
    })

    fireEvent.click(submitButton)
  })
})
