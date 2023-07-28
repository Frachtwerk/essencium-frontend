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
  Navbar,
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

import { NavLinks } from './components'

type Props = {
  isOpen: boolean
  links: NavLink[]
  user?: UserOutput
  handleLogout: () => void
}

export function NavBar({
  isOpen,
  links,
  user,
  handleLogout,
}: Props): JSX.Element {
  const theme = useMantineTheme()

  const { t } = useTranslation()

  return (
    <Navbar
      hidden={!isOpen}
      p="sm"
      hiddenBreakpoint="sm"
      width={{ sm: 250 }}
      fixed
    >
      <Stack
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Navbar.Section grow>
          <NavLinks links={links} user={user} />
        </Navbar.Section>

        <Navbar.Section mt="auto">
          <MantineNavLink
            icon={<IconLogout />}
            label={t('navigation.logout.label')}
            onClick={() => handleLogout()}
            styles={{
              root: {
                borderRadius: theme.radius.sm,
              },
              label: {
                fontSize: theme.fontSizes.sm,
              },
            }}
          />
        </Navbar.Section>
      </Stack>
    </Navbar>
  )
}
