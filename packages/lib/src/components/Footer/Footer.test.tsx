import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'
import type { FooterLink } from './types'

describe('Footer', () => {
  let FooterMounted: RenderResult

  const FOOTER_LINKS: FooterLink[] = [
    {
      label: 'footer.privacy',
      to: '/',
    },
    {
      label: 'footer.imprint',
      to: '/',
    },
    {
      label: 'footer.contact',
      to: '/contact',
    },
  ]

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      Link: ({ children }: { children: React.ReactNode }) => children,
    }))

    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    FooterMounted = render(<Footer links={FOOTER_LINKS} />)
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
