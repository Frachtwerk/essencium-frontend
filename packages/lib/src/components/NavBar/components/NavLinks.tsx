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

import { hasRequiredRights } from '../../../utils'
import classes from './NavLinks.module.css'

type Props = {
  links: NavLink[]
  userRights?: string[] | null
  foldedNav: boolean
  handleOpenNav: () => void
}

export function NavLinks({
  links,
  userRights,
  foldedNav,
  handleOpenNav,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const pathname = usePathname()

  function isLinkActive(link: string): boolean {
    return pathname.endsWith(link)
  }

  function isSubLinkActive(sublinks: NavLink[] = []): boolean {
    return sublinks.some(sublink => isLinkActive(sublink.to))
  }

  return (
    <>
      {links.map(link =>
        !link.rights.length ||
        (link.rights && hasRequiredRights(userRights, link.rights)) ? (
          <MantineNavLink
            component={NextLink}
            key={crypto.randomUUID()}
            href={link.to}
            target={link?.isExternalLink ? '_blank' : '_self'}
            leftSection={link.icon}
            label={t(link.label)}
            active={isLinkActive(link.to) || isSubLinkActive(link.navLinks)}
            color={
              isLinkActive(link.to) ? undefined : 'var(--mantine-color-gray-9)'
            }
            className={classes['nav-bar__navlink']}
            classNames={{
              root: classes['nav-bar__navlink--root'],
              label: classes['nav-bar__navlink--label'],
            }}
            onClick={() => !link.navLinks?.length && handleOpenNav()}
            prefetch={link.prefetch ?? true}
          >
            {!foldedNav
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
                      active={isLinkActive(sublink.to)}
                      className={classes['nav-bar__navlink--sublink']}
                      classNames={{
                        root: classes['nav-bar__navlink--root'],
                        label: classes['nav-bar__navlink--label'],
                      }}
                      onClick={() => handleOpenNav()}
                      prefetch={sublink.prefetch ?? true}
                    />
                  ) : null,
                )
              : null}
          </MantineNavLink>
        ) : null,
      )}
    </>
  )
}
