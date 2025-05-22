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

'use client'

import { NavLink } from '@frachtwerk/essencium-types'
import { NavLink as MantineNavLink } from '@mantine/core'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'
import { getI18n } from 'react-i18next'

import { hasRequiredRights } from '../../../utils'

type Props = {
  links: NavLink[]
  userRights?: string[] | null
  foldedNav: boolean
  isMobile: boolean
  handleOpenNav: () => void
}

export function NavLinks({
  links,
  userRights,
  foldedNav,
  isMobile,
  handleOpenNav,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const currentLocale = getI18n().language

  const pathname = usePathname().replace(`/${currentLocale}`, '')

  function isLinkActive(link: string): boolean {
    return link === '/' ? pathname === '' : pathname.endsWith(link)
  }

  function isParentActive(link: string): boolean {
    return pathname.includes(link)
  }

  function isSubLinkActive(sublinks: NavLink[] = []): boolean {
    return sublinks.some(sublink => isLinkActive(sublink.to))
  }

  return (
    <>
      {links.map(link => {
        const isParentLink = link.navLinks?.length

        // Check if the link is a parent link
        if (!isParentLink) {
          return !link.rights.length ||
            (link.rights && hasRequiredRights(userRights, link.rights)) ? (
            <MantineNavLink
              component={NextLink}
              href={link.to}
              target={link?.isExternalLink ? '_blank' : '_self'}
              key={link.label}
              leftSection={link.icon}
              label={t(link.label)}
              active={isLinkActive(link.to)}
              className="mb-sm"
              classNames={{
                root: 'rounded-sm',
                label: 'text-sm whitespace-nowrap',
              }}
              onClick={() => handleOpenNav()}
              prefetch={link.prefetch ?? true}
            />
          ) : null
        }

        // if link is a parent link display it as a button without href & co. and add sublinks
        return !link.rights.length ||
          (link.rights && hasRequiredRights(userRights, link.rights)) ? (
          <MantineNavLink
            component="button"
            key={link.label}
            leftSection={link.icon}
            label={t(link.label)}
            active={isParentActive(link.to) && isSubLinkActive(link.navLinks)}
            className="mb-sm"
            classNames={{
              root: 'rounded-sm',
              label: 'text-sm whitespace-nowrap',
            }}
          >
            {!foldedNav || isMobile
              ? link.navLinks?.map(sublink =>
                  !sublink.rights.length ||
                  (sublink.rights &&
                    hasRequiredRights(userRights, sublink.rights)) ? (
                    <MantineNavLink
                      component={NextLink}
                      key={sublink.label}
                      href={`${link.to === '/' ? '' : link.to}${sublink.to}`}
                      leftSection={sublink.icon}
                      target={sublink?.isExternalLink ? '_blank' : '_self'}
                      label={t(sublink.label)}
                      active={
                        isParentActive(link.to) && isLinkActive(sublink.to)
                      }
                      className="my-sm"
                      classNames={{
                        root: 'rounded-sm',
                        label: 'text-sm whitespace-nowrap',
                      }}
                      onClick={() => handleOpenNav()}
                      prefetch={sublink.prefetch ?? true}
                    />
                  ) : null,
                )
              : null}
          </MantineNavLink>
        ) : null
      })}
    </>
  )
}
