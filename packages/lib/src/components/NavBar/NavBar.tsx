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

import { NavLink } from '@frachtwerk/essencium-types'
import {
  AppShellNavbar,
  AppShellSection,
  Box,
  Code,
  Group,
  NavLink as MantineNavLink,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconLogout, IconPinFilled, IconPinnedOff } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { NavLinks } from './components'
import classes from './NavBar.module.css'

type Props = {
  isMobile: boolean
  links: NavLink[]
  userRights?: string[] | null
  handleLogout: () => void
  logo: JSX.Element
  icon: JSX.Element
  version?: string
  foldedNav: boolean
  setFoldedNav: Dispatch<SetStateAction<boolean>>
  fixedNav: boolean
  setFixedNav: Dispatch<SetStateAction<boolean>>
}

export function NavBar({
  isMobile,
  links,
  userRights,
  logo,
  icon,
  version,
  handleLogout,
  foldedNav,
  setFoldedNav,
  fixedNav,
  setFixedNav,
}: Props): JSX.Element {
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [currentTimeOutId, setCurrentTimeOutId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined)

  function toggleFixedNav(): void {
    setFixedNav(fixed => !fixed)
  }

  function handleMouseEnter(): void {
    const timeoutId = setTimeout(() => {
      setFoldedNav(false)
    }, 350)

    setCurrentTimeOutId(timeoutId)
  }

  function handleMouseLeave(): void {
    setFoldedNav(true)

    clearTimeout(currentTimeOutId)
  }

  useEffect(() => {
    return () => {
      clearTimeout(currentTimeOutId)
    }
  }, [currentTimeOutId])

  return (
    <AppShellNavbar
      onMouseEnter={() => {
        if (!fixedNav && !isMobile) {
          handleMouseEnter()
        }
      }}
      onMouseLeave={() => {
        if (!fixedNav && !isMobile) {
          handleMouseLeave()
        }
      }}
      className={isMobile ? classes['mobileNavbar'] : classes['navbar']}
      zIndex={100}
    >
      <AppShellSection className={classes['versionContainer']}>
        <Group gap="xs" align="center">
          <NextLink href="/">
            {foldedNav || isMobile ? (
              <Box className={classes['navBox']}>{icon}</Box>
            ) : (
              <Box>{logo}</Box>
            )}
          </NextLink>

          {!foldedNav && !isMobile ? (
            <Box
              onClick={() => toggleFixedNav()}
              className={classes['unfoldedNavBox']}
            >
              {fixedNav ? (
                <IconPinFilled
                  size={20}
                  color={
                    colorScheme === 'dark'
                      ? theme.colors.gray[3]
                      : theme.colors.dark[9]
                  }
                />
              ) : (
                <IconPinnedOff
                  size={20}
                  color={
                    colorScheme === 'dark'
                      ? theme.colors.gray[3]
                      : theme.colors.dark[9]
                  }
                />
              )}
            </Box>
          ) : null}

          {version ? <Code>{version}</Code> : null}

          {process.env.NEXT_PUBLIC_ENV && !foldedNav && !isMobile ? (
            <Code>{process.env.NEXT_PUBLIC_ENV}</Code>
          ) : null}
        </Group>
      </AppShellSection>

      <AppShellSection grow>
        <NavLinks links={links} userRights={userRights} />
      </AppShellSection>

      <AppShellSection>
        <MantineNavLink
          leftSection={<IconLogout />}
          label={t('navigation.logout.label')}
          onClick={() => handleLogout()}
          classNames={{
            root: classes['navlinkRoot'],
            label: classes['navlinkLabel'],
          }}
        />
      </AppShellSection>
    </AppShellNavbar>
  )
}
