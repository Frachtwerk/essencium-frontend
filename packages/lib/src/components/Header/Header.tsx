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
  Burger,
  Flex,
  Group,
  Header as MantineHeader,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core'

import { SearchBar, ThemeSelector, UserMenu } from './components'

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
    <MediaQuery smallerThan="sm" styles={{ marginLeft: '0' }}>
      <MantineHeader
        height={{ base: 60 }}
        p="md"
        fixed
        withBorder={false}
        ml={marginLeft}
      >
        <Flex
          sx={{
            height: '100%',
          }}
          justify="space-between"
          align="center"
        >
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={isOpen}
              onClick={() => {
                handleOpenNav()
              }}
              size="sm"
              color={theme.colors.gray[5]}
              style={{ zIndex: 200 }}
            />
          </MediaQuery>

          <SearchBar />

          <Group noWrap>
            <Group noWrap>
              <ThemeSelector />
            </Group>

            {user ? <UserMenu user={user} /> : null}
          </Group>
        </Flex>
      </MantineHeader>
    </MediaQuery>
  )
}
