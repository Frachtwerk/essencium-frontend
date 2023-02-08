import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

describe('Footer', () => {
  let FooterMounted: RenderResult

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    FooterMounted = render(<Footer />)
  })

  afterAll(() => {
    FooterMounted.unmount()
  })

  it('should contain the correct content', () => {
    expect(screen.getAllByText('footer.license')).toBeDefined()
    expect(screen.getAllByText('footer.privacy')).toBeDefined()
    expect(screen.getAllByText('footer.imprint')).toBeDefined()
    expect(screen.getAllByText('footer.contact')).toBeDefined()
  })
})
