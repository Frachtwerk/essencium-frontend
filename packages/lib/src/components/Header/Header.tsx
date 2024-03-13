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

import { UserOutput } from '@frachtwerk/essencium-types'
import {
  AppShellHeader,
  Burger,
  Flex,
  Group,
  useMantineTheme,
} from '@mantine/core'

import { SearchBar, ThemeSelector, UserMenu } from './components'
import classes from './Header.module.css'

type Props = {
  user: UserOutput | undefined
  marginLeft: string
  isOpen: boolean
  handleOpenNav: () => void
}

export function Header({
  user,
  marginLeft,
  isOpen,
  handleOpenNav,
}: Props): JSX.Element {
  const theme = useMantineTheme()

  return (
    <AppShellHeader
      p="md"
      withBorder={false}
      ml={marginLeft}
      className={classes['appShellHeader']}
    >
      <Flex
        className={classes['appShellHeader__content']}
        justify="space-between"
        align="center"
      >
        <Burger
          opened={isOpen}
          onClick={() => {
            handleOpenNav()
          }}
          size="sm"
          // not in CSS module because it's not applied there with CSS 'color' prop
          color={theme.colors.gray[5]}
          hiddenFrom="sm"
          className={classes['appShellHeader__burger']}
        />

        <SearchBar />

        <Group wrap="nowrap">
          <Group wrap="nowrap">
            <ThemeSelector />
          </Group>

          {user ? <UserMenu user={user} /> : null}
        </Group>
      </Flex>
    </AppShellHeader>
  )
}
