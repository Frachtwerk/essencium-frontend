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

import { SetPasswordForm } from './SetPasswordForm'

describe('SetPassword', () => {
  let SetPasswordFormMounted: RenderResult

  const handleSetPassword = vi.fn()

  beforeAll(() => {
    SetPasswordFormMounted = render(
      <SetPasswordForm handleSetPassword={handleSetPassword} />
    )
  })

  afterAll(() => {
    SetPasswordFormMounted.unmount()
  })

  describe('SetPasswordForm', () => {
    it('renders correctly with all details and form elements', () => {
      expect(screen.getByLabelText(/new/i)).toBeDefined()
      expect(screen.getByLabelText(/confirm/i)).toBeDefined()
      expect(screen.getByRole('button')).toBeDefined()
    })
  })
})
