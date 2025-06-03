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

import { Group, Text, UnstyledButton } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

import { cn } from '../../../../utils'

type Props = {
  className?: {
    group?: string
    icon?: string
    text?: string
  }
}

export function SearchBar({ className }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <UnstyledButton
      visibleFrom="sm"
      onClick={() => openSpotlight()}
      role="search"
    >
      <Group className={className?.group}>
        <Group className="gap-sm">
          <IconSearch className={cn('size-4 text-gray-500', className?.icon)} />

          <Text
            className={cn('text-sm', className?.text)}
            c="gray.5"
            role="searchbox"
          >
            {t('header.spotlight.placeholder')}
          </Text>
        </Group>
      </Group>
    </UnstyledButton>
  )
}
