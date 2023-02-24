import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { initReactI18next } from 'react-i18next'
import { i18n, initI18n } from 'translations'
import { afterAll, assert, beforeAll, describe, expect, it, vi } from 'vitest'

import { SearchBar, UserMenu } from './components'
import { Header } from './Header'

describe('Header', () => {
  let HeaderMounted: RenderResult

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      Link: ({ children }: { children: React.ReactNode }) => children,
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

    initI18n(initReactI18next)

    HeaderMounted = render(<Header isOpen handleOpenNav={() => {}} />)
  })

  afterAll(() => {
    HeaderMounted.unmount()
  })

  it('should contain the correct header items', () => {
    expect(screen.getByText('Essencium')).toBeDefined()

    render(<SearchBar />)
    render(<UserMenu />)

    const darkmodeToggle = screen.getByRole('button', {
      name: 'darkmode-toggle',
    })
    assert.ok(darkmodeToggle)

    const languageToggle = screen.getByRole('button', {
      name: 'language-toggle',
    })
    assert.ok(languageToggle)
  })

  it('should display the correct language', () => {
    expect(screen.getByLabelText('selected-language').textContent).toBe(
      i18n.language.toUpperCase()
    )
  })
})
