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

import classes from './ThemeSelector.module.css'

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
          aria-label="theme-selector"
          size="xl"
          className={classes['theme-selector__icon']}
        >
          {isLightMode ? (
            <IconSun
              className={isAutoMode ? classes['theme-selector__auto-mode'] : ''}
            />
          ) : (
            <IconMoon
              className={isAutoMode ? classes['theme-selector__auto-mode'] : ''}
            />
          )}
        </ActionIcon>
      </PopoverTarget>

      <PopoverDropdown className={classes['theme-selector__popover-dropdown']}>
        <Group
          onClick={() => {
            setColorScheme(COLOR_SCHEME.LIGHT)
          }}
          className={
            colorScheme === COLOR_SCHEME.LIGHT && !isAutoMode
              ? `${classes['theme-selector__group']} ${classes['theme-selector__group--active']}`
              : classes['theme-selector__group']
          }
        >
          <IconSun size={20} />

          <Text className={classes['theme-selector__text']}>
            {t('header.themeToggle.lightMode')}
          </Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme(COLOR_SCHEME.DARK)
          }}
          className={
            colorScheme === COLOR_SCHEME.DARK && !isAutoMode
              ? `${classes['theme-selector__group']} ${classes['theme-selector__group--active']}`
              : classes['theme-selector__group']
          }
        >
          <IconMoon size={20} />

          <Text className={classes['theme-selector__text']}>
            {t('header.themeToggle.darkMode')}
          </Text>
        </Group>

        <Group
          onClick={() => {
            clearColorScheme()
          }}
          className={
            isAutoMode
              ? `${classes['theme-selector__group']} ${classes['theme-selector__group--active']}`
              : classes['theme-selector__group']
          }
        >
          <IconDeviceLaptop size={20} />

          <Text className={classes['theme-selector__text']}>
            {t('header.themeToggle.systemMode')}
          </Text>
        </Group>
      </PopoverDropdown>
    </Popover>
  )
}
