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
  Avatar,
  Badge,
  Card,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconUser } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

type Props = {
  user: UserOutput
}

export function ProfileOverviewCard({ user }: Props): JSX.Element {
  const { t } = useTranslation()
  const theme = useMantineTheme()

  return (
    <Card shadow="sm" p="lg" radius="sm" withBorder>
      <Flex gap="md" justify="center" align="center" direction="column">
        <Avatar
          size="xl"
          radius="xl"
          src={null}
          alt={`${user.firstName} ${user.lastName} avatar`}
          color={theme.colors.blue[6]}
        >
          <IconUser size={50} />
        </Avatar>

        <Title order={2}>
          {user.firstName} {user.lastName}
        </Title>

        {user.roles.map(role => (
          <Text key={role.name} size="sm" mt={-8}>
            {role.name}
          </Text>
        ))}

        <Badge variant="light" size="lg">
          {user.enabled
            ? t('profileView.overviewCard.active')
            : t('profileView.overviewCard.inactive')}
        </Badge>
      </Flex>
    </Card>
  )
}
