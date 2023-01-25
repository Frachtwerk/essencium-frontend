import { render, RenderResult, screen } from '@testing-library/react'
import { afterEach, assert, beforeEach, describe, expect, it, vi } from 'vitest'

import { CommonHeader } from './CommonHeader'
import { SearchBar, UserMenu } from './components'

describe('CommonHeader', () => {
  let CommonHeaderMounted: RenderResult

  beforeEach(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    CommonHeaderMounted = render(
      <CommonHeader isOpen handleOpenNav={() => {}} />
    )
  })

  afterEach(() => {
    CommonHeaderMounted.unmount()
  })

  it('should contain the correct header items', () => {
    expect(screen.getByText('header.title')).toBeDefined()

    render(<SearchBar />)
    render(<UserMenu />)

    const darkmodeToggle = screen.getByTestId('darkmode-toggle')
    assert.ok(darkmodeToggle)

    const languageToggle = screen.getByTestId('language-toggle')
    assert.ok(languageToggle)
  })
})
