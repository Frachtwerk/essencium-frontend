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
    LoginFormMounted = render(<LoginForm />)
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

    expect(await screen.findByText('validation.email.notValid')).toBeDefined()
    expect(
      await screen.findByText('validation.password.minLength')
    ).toBeDefined()
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

    const enteredData = await screen.findByTestId('entered-data')
    expect(enteredData).toBeDefined()
    expect(enteredData).toMatch(/me@example.de/i)
    expect(enteredData).toMatch(/mySecretPassword/i)
  })
})
