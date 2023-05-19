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
