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

import { AppShell, MantineProvider } from '@mantine/core'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  let LoginFormMounted: RenderResult

  const setIsPasswordResetFormOpened = vi.fn()
  const handlePasswordReset = vi.fn()
  const handleLogin = vi.fn()

  const isResetPasswordSent = false
  const isResettingPassword = false

  beforeEach(() => {
    const isPasswordResetFormOpened = false

    LoginFormMounted = render(
      <MantineProvider>
        <AppShell>
          <LoginForm
            handleLogin={handleLogin}
            handlePasswordReset={handlePasswordReset}
            setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
            isResetPasswordSent={isResetPasswordSent}
            isPasswordResetFormOpened={isPasswordResetFormOpened}
            isResettingPassword={isResettingPassword}
          />
          ,
        </AppShell>
      </MantineProvider>,
    )
  })

  afterEach(cleanup)

  it('should render email and password inputs as well as the login button and password reset link', () => {
    expect(
      screen.getByRole('textbox', { name: 'loginView.form.email' }),
    ).toBeDefined()

    // a password does not have a 'role' property so it needs to be queried by its label, see: https://github.com/testing-library/dom-testing-library/issues/567#issue-616906804
    expect(
      screen.getByPlaceholderText('loginView.form.passwordPlaceholder'),
    ).toBeDefined()

    expect(
      screen.getByRole('button', { name: 'loginView.form.submit' }),
    ).toBeDefined()

    expect(
      screen.getByRole('link', { name: 'loginView.form.resetPassword' }),
    ).toBeDefined()
  })

  it('should show the password reset form', async () => {
    LoginFormMounted.unmount()

    const isPasswordResetFormOpened = true

    LoginFormMounted = render(
      <MantineProvider>
        <AppShell>
          <LoginForm
            handleLogin={handleLogin}
            handlePasswordReset={handlePasswordReset}
            setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
            isResetPasswordSent={isResetPasswordSent}
            isPasswordResetFormOpened={isPasswordResetFormOpened}
            isResettingPassword={isResettingPassword}
          />
          ,
        </AppShell>
      </MantineProvider>,
    )

    expect(
      LoginFormMounted.getByText('loginView.resetPassword.form.description'),
    ).toBeDefined()
  })

  it('should display an error message for the email field if mail is invalid', async () => {
    const emailInput = screen.getByRole('textbox', {
      name: 'loginView.form.email',
    }) as HTMLInputElement

    const submitButton = screen.getByRole('button')

    fireEvent.input(emailInput, {
      target: {
        value: 'meexample.de',
      },
    })

    fireEvent.submit(submitButton)

    expect(emailInput.value).toBe('meexample.de')

    expect(await screen.findByText('validation.email.notValid')).toBeDefined()
  })

  it('should display an error messages for the password field if input is invalid', async () => {
    const passwordInput = screen.getByPlaceholderText(
      'loginView.form.passwordPlaceholder',
    ) as HTMLInputElement

    const submitButton = screen.getByRole('button')

    fireEvent.input(passwordInput, {
      target: {
        value: 'shortPw',
      },
    })

    fireEvent.submit(submitButton)

    expect(passwordInput.value).toBe('shortPw')

    expect(
      await screen.findByText('validation.password.minLength'),
    ).toBeDefined()
  })

  it('should not display any error message if inputs are valid', async () => {
    const emailInput = screen.getByRole('textbox', {
      name: 'loginView.form.email',
    }) as HTMLInputElement

    const passwordInput = screen.getByPlaceholderText(
      'loginView.form.passwordPlaceholder',
    ) as HTMLInputElement

    const submitButton = screen.getByRole('button')

    fireEvent.input(emailInput, {
      target: {
        value: 'me@example.de',
      },
    })

    fireEvent.input(passwordInput, {
      target: {
        value: 'thisIsALongPassword',
      },
    })

    fireEvent.submit(submitButton)

    expect(emailInput.value).toBe('me@example.de')
    expect(passwordInput.value).toBe('thisIsALongPassword')

    expect(screen.queryAllByText('validation.email.notValid')).toHaveLength(0)
    expect(screen.queryAllByText('validation.password.minLength')).toHaveLength(
      0,
    )
  })
})
