import { render, RenderResult, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CommonFooter } from './CommonFooter'

describe('CommonFooter', () => {
  let CommonFooterMounted: RenderResult

  beforeEach(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    CommonFooterMounted = render(<CommonFooter />)
  })

  afterEach(() => {
    CommonFooterMounted.unmount()
  })

  it('should contain the correct content', () => {
    expect(screen.getAllByText('footer.license')).toBeDefined()
    expect(screen.getAllByText('footer.privacy')).toBeDefined()
    expect(screen.getAllByText('footer.imprint')).toBeDefined()
    expect(screen.getAllByText('footer.contact')).toBeDefined()
  })
})
