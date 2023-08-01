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
  ColorScheme,
  Group,
  Popover,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconDeviceLaptop, IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export function ThemeSelector(): JSX.Element {
  const { t } = useTranslation()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const [hasSelectedLight, setSelectedLight] = useState(false)
  const [hasSelectedDark, setSelectedDark] = useState(false)

  let systemColorScheme: ColorScheme = 'light'

  if (typeof window !== 'undefined') {
    systemColorScheme = window.matchMedia('(prefers-color-scheme: light)')
      .matches
      ? 'light'
      : 'dark'
  }
  return (
    <Popover width={130} position="bottom" withArrow shadow="sm">
      <Popover.Target>
        <Button
          aria-label="theme-selector"
          leftIcon={
            colorScheme === 'light' ? (
              <IconSun
                color={
                  colorScheme === 'light' && hasSelectedLight
                    ? theme.colors.blue[6]
                    : theme.colors.gray[9]
                }
              />
            ) : (
              <IconMoon
                color={
                  colorScheme === 'dark' && hasSelectedDark
                    ? theme.colors.blue[6]
                    : theme.colors.gray[5]
                }
              />
            )
          }
          style={{
            backgroundColor: 'transparent',
            color:
              colorScheme === 'light'
                ? theme.colors.gray[9]
                : theme.colors.gray[5],
            padding: 0,
          }}
        />
      </Popover.Target>

      <Popover.Dropdown p={0}>
        <Group
          onClick={() => {
            toggleColorScheme('light')
            setSelectedLight(true)
          }}
          sx={{
            padding: '0.7rem 0 0.5rem 1rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[9]
                  : theme.colors.gray[0],
            },
          }}
        >
          <IconSun size={20} />

          <Text size="sm">{t('header.themeToggle.lightMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            toggleColorScheme('dark')
            setSelectedDark(true)
          }}
          sx={{
            padding: '0.7rem 0 0.5rem 1rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[9]
                  : theme.colors.gray[0],
            },
          }}
        >
          <IconMoon size={20} />

          <Text size="sm">{t('header.themeToggle.darkMode')}</Text>
        </Group>

        <Group
          onClick={() => {
            toggleColorScheme(systemColorScheme)
            setSelectedLight(false)
            setSelectedDark(false)
          }}
          sx={{
            padding: '0.7rem 0 0.7rem 1rem',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.gray[9]
                  : theme.colors.gray[0],
            },
          }}
        >
          <IconDeviceLaptop size={20} />

          <Text size="sm">{t('header.themeToggle.systemMode')}</Text>
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}
