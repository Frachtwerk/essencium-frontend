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
  ActionIcon,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { type JSX } from 'react'

export const COLOR_SCHEME = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
} as const

export function ThemeSelector(): JSX.Element {
  const { t } = useTranslation()

  const { setColorScheme, colorScheme, clearColorScheme } =
    useMantineColorScheme()

  const isLightMode = colorScheme === COLOR_SCHEME.LIGHT

  const isAutoMode = colorScheme === COLOR_SCHEME.AUTO

  return (
    <Popover width={130} position="bottom" withArrow shadow="sm">
      <PopoverTarget>
        <ActionIcon
          variant="subtle"
          className="hover:bg-gray-50 dark:hover:bg-gray-900"
          aria-label="theme-selector"
          size="xl"
        >
          {isLightMode ? (
            <IconSun
              className={
                isAutoMode ? 'hover:bg-gray-50 dark:hover:bg-gray-900' : ''
              }
            />
          ) : (
            <IconMoon
              className={
                isAutoMode ? 'hover:bg-gray-50 dark:hover:bg-gray-900' : ''
              }
            />
          )}
        </ActionIcon>
      </PopoverTarget>

      <PopoverDropdown p={0}>
        <Group
          onClick={() => {
            setColorScheme(COLOR_SCHEME.LIGHT)
          }}
          p="xs"
          className={
            colorScheme === COLOR_SCHEME.LIGHT && !isAutoMode
              ? `text-primary-600 dark:text-primary-200 cursor-pointer bg-gray-50 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-900`
              : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900'
          }
        >
          <IconSun size={20} />

          <Text size="sm">{t('header.themeToggle.lightMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme(COLOR_SCHEME.DARK)
          }}
          p="xs"
          className={
            colorScheme === COLOR_SCHEME.DARK && !isAutoMode
              ? `text-primary-600 dark:text-primary-200 cursor-pointer bg-gray-50 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-900`
              : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900'
          }
        >
          <IconMoon size={20} />

          <Text size="sm">{t('header.themeToggle.darkMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            clearColorScheme()
          }}
          p="xs"
          className={
            isAutoMode
              ? `text-primary-600 dark:text-primary-200 cursor-pointer bg-gray-50 hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-900`
              : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900'
          }
        >
          <IconDeviceLaptop size={20} />

          <Text size="sm">{t('header.themeToggle.systemMode')}</Text>
        </Group>
      </PopoverDropdown>
    </Popover>
  )
}
