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

import {
  Group,
  Kbd,
  MediaQuery,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

export function SearchBar(): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
      <UnstyledButton
        sx={{
          width: '35%',
          border: '1px solid',
          borderColor:
            theme.colorScheme === 'dark'
              ? theme.colors.gray[7]
              : theme.colors.gray[3],
          borderRadius: theme.radius.sm,
          padding: '5px 10px',
        }}
        onClick={() => openSpotlight()}
      >
        <Group position="apart">
          <Group>
            <IconSearch size="16" color={theme.colors.gray[4]} />

            <Text color={theme.colors.gray[5]}>
              {t('header.spotlight.placeholder')}
            </Text>
          </Group>

          <Kbd>⌘ + K</Kbd>
        </Group>
      </UnstyledButton>
    </MediaQuery>
  )
}
