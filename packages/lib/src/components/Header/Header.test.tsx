import { UserOutput } from '@frachtwerk/essencium-types'
import * as mantine from '@mantine/core'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { SearchBar, UserMenu } from './components'
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
      useRouter: () => ({}),
    }))

    vi.spyOn(mantine, 'useMantineColorScheme').mockImplementation(() => ({
      colorScheme: 'light',
      toggleColorScheme: () => {},
    }))

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
    expect(screen.getByText('header.title')).toBeDefined()
    expect(screen.getByRole('img')).toBeDefined()

    render(<SearchBar />)
    render(<UserMenu user={mockUser} />)
    render(<ThemeSelector />)
  })
})
