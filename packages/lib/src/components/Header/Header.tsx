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

'use client'

import { UserOutput } from '@frachtwerk/essencium-types'
import {
  Anchor,
  AppShellHeader,
  AppShellHeaderProps,
  Burger,
  Code,
  Flex,
  Group,
  useMantineTheme,
} from '@mantine/core'
import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '../../utils'
import { SearchBar, ThemeSelector, UserMenu } from './components'

type Props = AppShellHeaderProps & {
  user: UserOutput | undefined
  isOpen: boolean
  handleOpenNav: () => void
  environment: string | undefined
}

export function Header({
  user,
  isOpen,
  handleOpenNav,
  environment,
  className,
  ...props
}: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <AppShellHeader
      withBorder={false}
      {...props}
      className={cn('p-md z-100 sm:ml-0', className)}
    >
      <Flex className="gap-md h-full items-center justify-between">
        <Anchor
          className="not-focus-visible:sr-only"
          variant="transparent"
          href="#main-content"
        >
          {t('header.skipToMainContent')}
        </Anchor>

        <Burger
          opened={isOpen}
          onClick={() => {
            handleOpenNav()
          }}
          size="sm"
          // not in CSS module because it's not applied there with CSS 'color' prop
          color={theme.colors.gray[5]}
          hiddenFrom="sm"
        />

        <SearchBar />

        <Group className="ml-auto flex-nowrap justify-between">
          {environment && (
            <Code className="mr-[20px] overflow-visible">
              <span className="uppercase">{environment}</span>
            </Code>
          )}

          <Group className="flex-nowrap">
            <ThemeSelector />
          </Group>

          {user ? <UserMenu user={user} /> : null}
        </Group>
      </Flex>
    </AppShellHeader>
  )
}
