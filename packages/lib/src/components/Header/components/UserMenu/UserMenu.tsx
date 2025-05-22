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
  Box,
  Flex,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

type Props = {
  user: UserOutput
  className?: {
    button?: string
    group?: string
    mail?: string
  }
  avatarColor?: string
}

export function UserMenu({ user, className, avatarColor }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <UnstyledButton
      component={NextLink}
      href="/profile"
      className={`${className?.button ? className.button : ''}`}
      aria-label={t('header.profile.arialLabel') as string}
    >
      <Group
        p="sm"
        className={`hover:bg-gray-50 dark:hover:bg-gray-900 ${
          className?.group ? className.group : ''
        }`}
        wrap="nowrap"
      >
        <Avatar
          size="md"
          radius="lg"
          name={`${user.firstName} ${user.lastName}`}
          color={avatarColor ?? theme.primaryColor}
        />

        <Box>
          <Flex align="center" justify="space-between">
            <Text className="font-medium" size="sm">
              {user.firstName} {user.lastName}
            </Text>
          </Flex>

          <Text
            className={`text-dimmed ${className?.mail ? className.mail : ''}`}
            size="xs"
          >
            {user.email}
          </Text>
        </Box>

        <IconChevronRight size={18} />
      </Group>
    </UnstyledButton>
  )
}
