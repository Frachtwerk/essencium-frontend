import { render, RenderResult, screen, within } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { SetPassword } from './SetPassword'

describe('SetPassword', () => {
  let SetPasswordMounted: RenderResult

  beforeAll(() => {
    SetPasswordMounted = render(<SetPassword />)
  })

  afterAll(() => {
    SetPasswordMounted.unmount()
  })

  it('renders SetPassword component with correct layout', () => {
    const center = screen.getByRole('article')
    expect(center).toBeDefined()

    const SetPasswordForm = within(center)
    expect(SetPasswordForm).toBeDefined()
  })

  describe('SetPasswordForm', () => {
    it('renders correctly with all details and form elements', () => {
      const card = screen.getByTestId('card')
      expect(card).toBeDefined()

      const title = within(card).getByRole('heading', { level: 2 })
      expect(title).toBeDefined()

      const newPasswordInput = within(card).getByLabelText(/new/i)
      expect(newPasswordInput).toBeDefined()

      const confirmPasswordInput = within(card).getByLabelText(/confirm/i)
      expect(confirmPasswordInput).toBeDefined()

      const submitButton = within(card).getByRole('button')
      expect(submitButton).toBeDefined()
    })
  })
})
