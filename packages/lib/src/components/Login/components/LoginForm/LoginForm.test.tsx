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

import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  let LoginFormMounted: RenderResult

  let emailInput: HTMLInputElement
  let passwordInput: HTMLInputElement
  let submitButton: HTMLButtonElement

  const handlePasswordReset = vi.fn()
  const setIsPasswordResetFormOpened = vi.fn()
  const isPasswordResetFormOpened = false
  const isResetPasswordSent = false
  const isResettingPassword = false

  beforeEach(() => {
    LoginFormMounted = render(
      <LoginForm
        handleLogin={() => {}}
        handlePasswordReset={handlePasswordReset}
        setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
        isResetPasswordSent={isResetPasswordSent}
        isPasswordResetFormOpened={isPasswordResetFormOpened}
        isResettingPassword={isResettingPassword}
      />
    )
  })

  afterEach(() => {
    LoginFormMounted.unmount()
  })

  it('should display error messages for email and password field', async () => {
    emailInput = screen.getByRole('textbox', {
      name: /email/i,
    }) as HTMLInputElement

    passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    submitButton = screen.getByRole('button')

    fireEvent.input(emailInput, {
      target: {
        value: 'me@example',
      },
    })

    fireEvent.input(passwordInput, {
      target: {
        value: 'shortPw',
      },
    })

    fireEvent.submit(submitButton)

    expect(emailInput.value).toBe('me@example')
    expect(passwordInput.value).toBe('shortPw')
  })

  it('should display entered data if form is valid', async () => {
    emailInput = screen.getByRole('textbox', {
      name: /email/i,
    }) as HTMLInputElement

    passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

    submitButton = screen.getByRole('button')

    fireEvent.input(emailInput, {
      target: {
        value: 'me@example.de',
      },
    })

    fireEvent.input(passwordInput, {
      target: {
        value: 'mySecretPassword',
      },
    })

    fireEvent.submit(submitButton)

    expect(emailInput.value).toBe('me@example.de')
    expect(passwordInput.value).toBe('mySecretPassword')
  })
})
