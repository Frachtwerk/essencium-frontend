import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { SetPasswordForm } from './SetPasswordForm'

describe('SetPassword', () => {
  let SetPasswordFormMounted: RenderResult

  beforeAll(() => {
    SetPasswordFormMounted = render(<SetPasswordForm />)
  })

  afterAll(() => {
    SetPasswordFormMounted.unmount()
  })

  describe('SetPasswordForm', () => {
    it('renders correctly with all details and form elements', () => {
      expect(screen.getByRole('heading', { level: 2 })).toBeDefined()
      expect(screen.getByLabelText(/new/i)).toBeDefined()
      expect(screen.getByLabelText(/confirm/i)).toBeDefined()
      expect(screen.getByRole('button')).toBeDefined()
    })
  })
})
