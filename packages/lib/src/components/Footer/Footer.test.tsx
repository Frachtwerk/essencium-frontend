/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { FooterLink } from '@frachtwerk/essencium-types'
import { render, RenderResult, screen } from '@testing-library/react'
import { CSSProperties } from 'react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

const FOOTER_LINKS: FooterLink[] = [
  {
    label: 'footer.privacy.label',
    to: 'privacy',
  },
  {
    label: 'footer.imprint.label',
    to: 'imprint',
  },
  {
    label: 'footer.contact.label',
    to: 'contact',
  },
]

describe('Footer', () => {
  let FooterMounted: RenderResult

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

    FooterMounted = render(<Footer links={FOOTER_LINKS} />)
  })

  it('should render all footer links with their target', () => {
    expect(
      screen
        .getByText('footer.privacy.label')
        .closest('a')
        ?.getAttribute('href'),
    ).toBe('privacy')

    expect(
      screen
        .getByText('footer.imprint.label')
        .closest('a')
        ?.getAttribute('href'),
    ).toBe('imprint')

    expect(
      screen
        .getByText('footer.contact.label')
        .closest('a')
        ?.getAttribute('href'),
    ).toBe('contact')
  })

  it('should render the copyright', () => {
    expect(FooterMounted.getByText('footer.license')).toBeDefined()
  })
})
