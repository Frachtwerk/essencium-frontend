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

  it('renders SetPassword component and its child component', () => {
    const center = screen.getByRole('article')
    expect(center).toBeDefined()

    const SetPasswordForm = within(center)
    expect(SetPasswordForm).toBeDefined()
  })
})
