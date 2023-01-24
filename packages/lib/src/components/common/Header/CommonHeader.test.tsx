import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import { CommonHeader } from './CommonHeader'

vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: (key: unknown) => key,
    }),
  }
})

describe('CommonHeader', () => {
  it('should render the header', () => {
    render(<CommonHeader isOpen handleOpenNav={() => {}} />)
  })
})
