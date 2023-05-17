import { UserOutput } from '@frachtwerk/types'
import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { initReactI18next } from 'react-i18next'
import { initI18n } from 'translations'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { SearchBar, UserMenu } from './components'
import { LanguageSelector } from './components/LanguageSelector'
import { ThemeSelector } from './components/ThemeSelector'
import { Header } from './Header'

describe('Header', () => {
  let HeaderMounted: RenderResult
  const applicationLogo = <img alt="Application Logo" />
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
  } as UserOutput

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      Link: ({ children }: { children: React.ReactNode }) => children,
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

    initI18n(initReactI18next)

    HeaderMounted = render(
      <Header
        isOpen
        handleOpenNav={() => {}}
        logo={applicationLogo}
        user={mockUser}
      />
    )
  })

  afterAll(() => {
    HeaderMounted.unmount()
  })

  it('should contain the correct header items', () => {
    expect(screen.getByText('Essencium')).toBeDefined()
    expect(screen.getByRole('img')).toBeDefined()

    render(<SearchBar />)
    render(<UserMenu user={mockUser} />)
    render(<LanguageSelector />)
    render(<ThemeSelector />)
  })
})
