import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { CommonFooter } from './CommonFooter'

vi.mock('react-i18next', () => {
  return {
    useTranslation: () => ({
      t: (key: unknown) => key,
    }),
  }
})

describe('CommonFooter', () => {
  it('should render the footer', () => {
    render(<CommonFooter />)
  })

  it('should contain the correct content', () => {
    expect(screen.getAllByText('footer.license')).toBeDefined()
    expect(screen.getAllByText('footer.privacy')).toBeDefined()
    expect(screen.getAllByText('footer.imprint')).toBeDefined()
    expect(screen.getAllByText('footer.contact')).toBeDefined()
  })
})
