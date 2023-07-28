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
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight, IconUser } from '@tabler/icons-react'
import NextLink from 'next/link'

type Props = {
  user: UserOutput
}

export function UserMenu({ user }: Props): JSX.Element {
  const theme = useMantineTheme()

  return (
    <Box>
      <NextLink href="/profile" style={{ textDecoration: 'none' }}>
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
          }}
        >
          <Group
            p="sm"
            sx={{
              borderRadius: theme.radius.sm,
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[9]
                    : theme.colors.gray[0],
              },
            }}
            noWrap
          >
            <IconUser size="28" />

            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight="500">
                {user.firstName} {user.lastName}
              </Text>

              <Text color="dimmed" size="xs">
                {user.email}
              </Text>
            </Box>

            <IconChevronRight size={18} />
          </Group>
        </UnstyledButton>
      </NextLink>
    </Box>
  )
}
