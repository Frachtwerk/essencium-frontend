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

import { NavLink } from '@frachtwerk/essencium-types'
import { NavLink as MantineNavLink, Stack } from '@mantine/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { hasRequiredRights } from '../../../utils/hasRequiredRights'
import classes from './NavLinks.module.css'

type Props = {
  links: NavLink[]
  userRights?: string[] | null
}

export function NavLinks({ links, userRights }: Props): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  function isLinkActive(path: string): boolean {
    if (path === '/') {
      return router.pathname === path
    }

    return router.pathname?.startsWith(path)
  }

  return (
    <Stack gap="md">
      {links.map(link =>
        !link.rights.length ||
        (link.rights && hasRequiredRights(userRights, link.rights)) ? (
          <MantineNavLink
            component={NextLink}
            key={link.label}
            href={link.to}
            leftSection={link.icon}
            label={t(link.label)}
            active={isLinkActive(link.to)}
            classNames={{
              root: classes['nav-bar__navlink--root'],
              label: classes['nav-bar__navlink--label'],
            }}
          />
        ) : null,
      )}
    </Stack>
  )
}
