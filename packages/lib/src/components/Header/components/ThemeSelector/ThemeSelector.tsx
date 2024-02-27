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
  useMantineTheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import classes from './ThemeSelector.module.css'

export function ThemeSelector(): JSX.Element {
  const { t } = useTranslation()

  const { setColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const [hasSelectedLight, setSelectedLight] = useState(false)
  const [hasSelectedDark, setSelectedDark] = useState(false)

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
          p={0}
          bg="transparent"
          className={classes.button}
          leftSection={
            <>
              <IconSun
                className={classes.iconLight}
                color={
                  hasSelectedLight ? theme.colors.blue[6] : theme.colors.gray[9]
                }
              />
              <IconMoon
                className={classes.iconDark}
                color={
                  hasSelectedDark ? theme.colors.blue[6] : theme.colors.gray[5]
                }
              />
            </>
          }
        />
      </PopoverTarget>

      <PopoverDropdown p={0}>
        <Group
          onClick={() => {
            setColorScheme('light')
            setSelectedLight(true)
          }}
          className={classes.group}
        >
          <IconSun size={20} />

          <Text size="sm">{t('header.themeToggle.lightMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme('dark')
            setSelectedDark(true)
          }}
          className={classes.group}
        >
          <IconMoon size={20} />

          <Text size="sm">{t('header.themeToggle.darkMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            setColorScheme(systemColorScheme)
            setSelectedLight(false)
            setSelectedDark(false)
          }}
          className={classes.group}
        >
          <IconDeviceLaptop size={20} />

          <Text size="sm">{t('header.themeToggle.systemMode')}</Text>
        </Group>
      </PopoverDropdown>
    </Popover>
  )
}
