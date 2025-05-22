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

import { UserOutput, UserSource } from '@frachtwerk/essencium-types'
import {
  Avatar,
  Badge,
  Card,
  Flex,
  Indicator,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import type { JSX } from 'react'

type Props = {
  user: UserOutput
}

export function ProfileOverviewCard({ user }: Props): JSX.Element {
  const theme = useMantineTheme()

  const ssoProvider = user?.source

  const isSso = Boolean(ssoProvider && ssoProvider !== UserSource.LOCAL)

  return (
    <Card withBorder className="p-lg rounded-sm shadow-sm">
      <Flex
        className="gap-md"
        justify="center"
        align="center"
        direction="column"
      >
        <Indicator
          role="note"
          inline
          size={16}
          offset={7}
          position="bottom-end"
          color={user.enabled ? 'green' : 'red'}
          withBorder
        >
          <Avatar
            size="xl"
            radius="xl"
            name={`${user.firstName} ${user.lastName}`}
            color={theme.primaryColor}
          />
        </Indicator>

        <Title order={2}>
          {user.firstName} {user.lastName}
        </Title>

        {isSso ? (
          <Badge role="status" variant="light" size="xs">
            {ssoProvider}
          </Badge>
        ) : null}

        {user.roles.map(role => (
          <Text key={role.name} size="sm">
            {role.name}
          </Text>
        ))}
      </Flex>
    </Card>
  )
}
