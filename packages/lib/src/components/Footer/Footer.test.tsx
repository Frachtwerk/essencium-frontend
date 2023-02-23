import { render, RenderResult, screen } from '@testing-library/react'
import { CSSProperties } from 'react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'
import type { FooterLink } from './types'

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
    expect(screen.getByText('footer.privacy').closest('a')).toHaveProperty(
      'href',
      'privacy'
    )

    expect(screen.getByText('footer.imprint').closest('a')).toHaveProperty(
      'href',
      'imprint'
    )

    expect(screen.getByText('footer.contact').closest('a')).toHaveProperty(
      'href',
      'contact'
    )
  })
})
