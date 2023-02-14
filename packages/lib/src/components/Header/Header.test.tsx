import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, assert, beforeAll, describe, expect, it, vi } from 'vitest'

import { SearchBar, UserMenu } from './components'
import { Header } from './Header'

describe('Header', () => {
  let HeaderMounted: RenderResult

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    vi.mock('@tanstack/react-router', () => ({
      Link: ({ children }: { children: React.ReactNode }) => children,
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

    HeaderMounted = render(<Header isOpen handleOpenNav={() => {}} />)
  })

  afterAll(() => {
    HeaderMounted.unmount()
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
