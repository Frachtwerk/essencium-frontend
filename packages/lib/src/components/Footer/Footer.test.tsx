import { render, RenderResult, screen } from '@testing-library/react'
import { CSSProperties } from 'react'
import { initReactI18next } from 'react-i18next'
import { initI18n } from 'translations'
import { FooterLink } from 'types'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

describe('Footer', () => {
  let FooterMounted: RenderResult

  const FOOTER_LINKS: FooterLink[] = [
    {
      label: 'footer.privacy',
      to: 'privacy',
    },
    {
      label: 'footer.imprint',
      to: 'imprint',
    },
    {
      label: 'footer.contact',
      to: 'contact',
    },
  ]

  beforeAll(() => {
    vi.mock('@tanstack/react-router', () => ({
      Link: ({
        children,
        to,
        ...props
      }: {
        children: React.ReactNode
        to: string
        style: CSSProperties
      }) => (
        <a {...props} href={to}>
          {children}
        </a>
      ),
    }))

    initI18n(initReactI18next)

    FooterMounted = render(<Footer links={FOOTER_LINKS} />)
  })

  afterAll(() => {
    FooterMounted.unmount()
  })

  it('should contain the correct content', () => {
    expect(screen.getByText('Privacy').closest('a')).toHaveProperty(
      'href',
      'privacy'
    )

    expect(screen.getByText('Imprint').closest('a')).toHaveProperty(
      'href',
      'imprint'
    )

    expect(screen.getByText('Contact').closest('a')).toHaveProperty(
      'href',
      'contact'
    )
  })
})
