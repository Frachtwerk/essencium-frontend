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
import { Box, Flex, Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight, IconUser } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

import classes from './UserMenu.module.css'

type Props = {
  user: UserOutput
  className?: {
    button?: string
    group?: string
    mail?: string
  }
}

export function UserMenu({ user, className }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <UnstyledButton
      component={NextLink}
      href="/profile"
      className={`${classes['user-menu__button']} ${
        className?.button ? className.button : ''
      }`}
      aria-label={t('header.profile.arialLabel') as string}
    >
      <Group
        className={`${classes['user-menu__group']} ${
          className?.group ? className.group : ''
        }`}
        wrap="nowrap"
      >
        <IconUser size="28" />

        <Box className={classes['user-menu__box']}>
          <Flex align="center" justify="space-between">
            <Text className={classes['user_menu__box--name']}>
              {user.firstName} {user.lastName}
            </Text>
          </Flex>

          <Text
            className={`${classes['user-menu__box--mail']} ${
              className?.mail ? className.mail : ''
            }`}
          >
            {user.email}
          </Text>
        </Box>

        <IconChevronRight size={18} />
      </Group>
    </UnstyledButton>
  )
}
