import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import { CommonNavBar } from './CommonNavBar'

vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: (key: unknown) => key,
    }),
  }
})

describe('CommonNavBar', () => {
  it('should render the navigation bar', () => {
    render(<CommonNavBar isOpen />)
  })
})
