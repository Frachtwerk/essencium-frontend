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

import { UserOutput, UserSource } from '@frachtwerk/essencium-types'
import { Badge, Box, Flex, Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight, IconUser } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

import classes from './UserMenu.module.css'

type Props = {
  isSso: boolean
  ssoProvider?: UserSource | string | undefined
  user: UserOutput
}

export function UserMenu({ isSso, ssoProvider, user }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <UnstyledButton
      component={NextLink}
      href="/profile"
      className={classes['userMenuButton']}
      aria-label={t('header.profile.arialLabel') as string}
    >
      <Group className={classes['userMenuGroup']} wrap="nowrap">
        <IconUser size="28" />

        <Box className={classes['userMenuBox']}>
          <Flex align="center" justify="space-between">
            <Text size="sm" className={classes['userMenuBox__name']}>
              {user.firstName} {user.lastName}
            </Text>

            {isSso ? (
              <Badge
                role="status"
                variant="light"
                size="xs"
                className={classes['userMenuBox__ssoBadge']}
              >
                {ssoProvider}
              </Badge>
            ) : null}
          </Flex>

          <Text className={classes['userMenuBox__mail']} size="xs">
            {user.email}
          </Text>
        </Box>

        <IconChevronRight size={18} />
      </Group>
    </UnstyledButton>
  )
}
