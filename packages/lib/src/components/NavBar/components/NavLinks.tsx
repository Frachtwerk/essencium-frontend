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

import { NavLink, UserOutput } from '@frachtwerk/essencium-types'
import {
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type Props = {
  links: NavLink[]
  user?: UserOutput
}

export function NavLinks({ links, user }: Props): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const theme = useMantineTheme()

  function hasRequiredRights(rights: string[]): boolean {
    return Boolean(
      rights.every(right =>
        user?.role.rights.map(userRight => userRight.authority).includes(right)
      )
    )
  }

  return (
    <Stack spacing="md">
      {links.map(link =>
        !link.rights.length ||
        (link.rights && hasRequiredRights(link.rights)) ? (
          <NextLink
            key={link.label}
            href={link.to}
            style={{ textDecoration: 'none' }}
          >
            <MantineNavLink
              icon={link.icon}
              label={t(link.label)}
              active={link.to === router.pathname}
              styles={{
                root: {
                  borderRadius: theme.radius.sm,
                },
                label: {
                  fontSize: theme.fontSizes.sm,
                  whiteSpace: 'nowrap',
                },
              }}
            />
          </NextLink>
        ) : null
      )}
    </Stack>
  )
}
