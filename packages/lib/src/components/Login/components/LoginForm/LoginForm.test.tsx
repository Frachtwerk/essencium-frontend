import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

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

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    vi.mock('translations', () => ({
      i18n: {
        t: (str: unknown) => str,
      },
    }))
  })

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
