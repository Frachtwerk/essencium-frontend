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
  Button,
  Group,
  MantineColorScheme,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

import classes from './ThemeSelector.module.css'

type Props = {
  className?: {
    iconSun?: string
    iconMoon?: string
  }
}

export function ThemeSelector({ className }: Props): JSX.Element {
  const { t } = useTranslation()

  const { setColorScheme } = useMantineColorScheme()

  let systemColorScheme: MantineColorScheme = 'light'

  if (typeof window !== 'undefined') {
    systemColorScheme = window.matchMedia('(prefers-color-scheme: light)')
      .matches
      ? 'light'
      : 'dark'
  }
  return (
    <Popover width={130} position="bottom" withArrow shadow="sm">
      <PopoverTarget>
        <Button
          aria-label="theme-selector"
          className={classes['theme-selector__button']}
          leftSection={
            <>
              <IconSun
                className={`${classes['theme-selector__iconLight']} ${
                  className?.iconSun ? className.iconSun : ''
                } `}
              />

              <IconMoon
                className={`${classes['theme-selector__iconDark']} ${
                  className?.iconMoon ? className.iconMoon : ''
                }`}
              />
            </>
          }
        />
      </PopoverTarget>

      <PopoverDropdown className={classes['theme-selector__popover-dropdown']}>
        <Group
          onClick={() => {
            setColorScheme('light')
          }}
          className={classes['theme-selector__group']}
        >
          <IconSun size={20} />

          <Text className={classes['theme-selector__text']}>
            {t('header.themeToggle.lightMode')}
          </Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme('dark')
          }}
          className={classes['theme-selector__group']}
        >
          <IconMoon size={20} />

          <Text className={classes['theme-selector__text']}>
            {t('header.themeToggle.darkMode')}
          </Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme(systemColorScheme)
          }}
          className={classes['theme-selector__group']}
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
