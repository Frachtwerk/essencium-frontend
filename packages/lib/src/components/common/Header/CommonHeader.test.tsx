import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, assert, beforeAll, describe, expect, it, vi } from 'vitest'

import { CommonHeader } from './CommonHeader'
import { SearchBar, UserMenu } from './components'

describe('CommonHeader', () => {
  let CommonHeaderMounted: RenderResult

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

    CommonHeaderMounted = render(
      <CommonHeader isOpen handleOpenNav={() => {}} />
    )
  })

  afterAll(() => {
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
