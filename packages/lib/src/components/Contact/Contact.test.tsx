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

import { render, RenderResult, screen, within } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { Contact } from './Contact'

describe('Contact', () => {
  let ContactMounted: RenderResult

  beforeAll(() => {
    ContactMounted = render(<Contact />)
  })

  afterAll(() => {
    ContactMounted.unmount()
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
      const card = screen.getByTestId('card')
      expect(card).toBeDefined()

      const title = within(card).getByRole('heading', { level: 3 })
      expect(title).toBeDefined()

      const avatar = within(card).getByTitle('User avatar')
      expect(avatar).toBeDefined()

      const name = within(card).getByRole('heading', { level: 5 })
      expect(name).toBeDefined()

      const information = within(card).getAllByLabelText('Contact info')
      expect(information).toHaveLength(4)

      const phone = information[0]
      const mail = information[1]
      const location = information[2]
      const socialIcons = information[3]

      expect(within(phone).getByText(/555 - 5555 5555/)).toBeDefined()
      expect(within(mail).getByText(/test@email.de/)).toBeDefined()
      expect(
        within(location).getByText(/Teststreet 1, 12345 Testcity/),
      ).toBeDefined()

      const social = within(socialIcons).getAllByLabelText('Social icon')
      expect(social).toHaveLength(3)
    })
  })

  describe('ContactForm', () => {
    it('renders correctly with all form elements', () => {
      const form = screen.getByTestId('form')
      expect(form).toBeDefined()

      const title = within(form).getByRole('heading', { level: 3 })
      expect(title).toBeDefined()

      const emailInput = within(form).getByLabelText(/email/i)
      expect(emailInput).toBeDefined()

      const nameInput = within(form).getByLabelText(/name/i)
      expect(nameInput).toBeDefined()

      const numberInput = within(form).getByLabelText(/number/i)
      expect(numberInput).toBeDefined()

      const subjectInput = within(form).getByLabelText(/subject/i)
      expect(subjectInput).toBeDefined()

      const messageTextarea = within(form).getByLabelText(/message/i)
      expect(messageTextarea).toBeDefined()

      const sendMessageButton = within(form).getByRole('button')
      expect(sendMessageButton).toBeDefined()
    })
  })
})
