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

import { contactFormSchema } from '@frachtwerk/essencium-types'
import { AppShell, MantineProvider } from '@mantine/core'
import { render, renderHook, screen, within } from '@testing-library/react'
import { beforeAll, describe, expect, it } from 'vitest'

import { useZodForm } from '../../hooks'
import { Contact } from './Contact'

describe('Contact', () => {
  beforeAll(() => {
    const { result } = renderHook(() =>
      useZodForm({
        schema: contactFormSchema,
        defaultValues: {
          mailAddress: '',
          name: '',
          subject: '',
          message: '',
        },
      }),
    )

    const examplePerson = {
      name: 'Jane Doe',
      phone: '1(123) 456-7890',
      email: 'jane.doe@example.com',
      address: '123 Maple Street. Anytown, PA 17101',
      linkedinUrl: 'https://www.linkedin.com/company/frachtwerk',
      instagramUrl: 'https://www.instagram.com/frachtwerk.de/',
    }

    const { control, formState } = result.current

    render(
      <MantineProvider>
        <AppShell>
          <Contact
            control={control}
            formState={formState}
            contactPerson={examplePerson}
          />
          ,
        </AppShell>
      </MantineProvider>,
    )
  })

  it('renders Contact component with correct layout', () => {
    const grid = screen.getByRole('grid')
    expect(grid).toBeDefined()

    const gridCols = within(grid).getAllByRole('gridcell')
    expect(gridCols).toHaveLength(2)

    const contactPersonCard = within(gridCols[0])
    expect(contactPersonCard).toBeDefined()

    const contactForm = within(gridCols[1])
    expect(contactForm).toBeDefined()
  })

  describe('ContactPersonCard', () => {
    it('renders correctly with all details', () => {
      const card = screen.getByRole('complementary')
      expect(card).toBeDefined()

      const title = within(card).getByRole('heading', { level: 3 })
      expect(title).toBeDefined()

      const avatar = within(card).getByText(/JD/)
      expect(avatar).toBeDefined()

      const name = within(card).getByRole('heading', { level: 5 })
      expect(name).toBeDefined()

      const information = within(card).getAllByLabelText('Contact info')
      expect(information).toHaveLength(4)

      const phone = information[0]
      const mail = information[1]
      const location = information[2]
      const socialIcons = information[3]

      expect(within(phone).getByText(/1(123) 456-7890/)).toBeDefined()
      expect(within(mail).getByText(/jane.doe@example.com/)).toBeDefined()
      expect(
        within(location).getByText(/123 Maple Street. Anytown, PA 17101/),
      ).toBeDefined()

      const social = within(socialIcons).getAllByLabelText('Social icon')
      expect(social).toHaveLength(2)
    })
  })

  describe('ContactForm', () => {
    it('renders correctly with all form elements', () => {
      const form = screen.getByRole('form')
      expect(form).toBeDefined()

      const title = within(form).getByRole('heading', { level: 3 })
      expect(title).toBeDefined()

      const emailInput = within(form).getByLabelText(/email/i)
      expect(emailInput).toBeDefined()

      const nameInput = within(form).getByLabelText(/name/i)
      expect(nameInput).toBeDefined()

      const subjectInput = within(form).getByLabelText(/subject/i)
      expect(subjectInput).toBeDefined()

      const messageTextarea = within(form).getByLabelText(/message/i)
      expect(messageTextarea).toBeDefined()

      const sendMessageButton = within(form).getByRole('button')
      expect(sendMessageButton).toBeDefined()
    })
  })
})
