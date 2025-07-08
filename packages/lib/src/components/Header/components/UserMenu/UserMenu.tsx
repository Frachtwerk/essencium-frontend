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
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

import { cn } from '../../../../utils'

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
      className={className?.button}
      aria-label={t('header.profile.arialLabel') as string}
    >
      <Group
        className={cn(
          'px-sm flex-nowrap hover:bg-gray-50 dark:hover:bg-gray-900',
          className?.group,
        )}
      >
        <Avatar
          size="md"
          radius="lg"
          name={`${user.firstName} ${user.lastName}`}
          color={avatarColor ?? theme.primaryColor}
        />
        <Box>
          <Text className="text-sm font-medium">
            {user.firstName} {user.lastName}
          </Text>

          <Text className={cn('text-dimmed text-xs', className?.mail)}>
            {user.email}
          </Text>
        </Box>

        <IconChevronRight size={18} />
      </Group>
    </UnstyledButton>
  )
}
