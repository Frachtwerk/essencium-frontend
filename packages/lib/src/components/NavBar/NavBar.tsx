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

import { NavLink } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  AppShellNavbar,
  AppShellNavbarProps,
  AppShellSection,
  Box,
  Flex,
  NavLink as MantineNavLink,
} from '@mantine/core'
import { IconLogout, IconPinFilled, IconPinnedOff } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { Dispatch, type JSX, SetStateAction, useEffect, useState } from 'react'

import { NavLinks } from './components'
import classes from './NavBar.module.css'

type Props = AppShellNavbarProps & {
  isMobile: boolean
  links: NavLink[]
  userRights?: string[] | null
  handleLogout: () => void
  logo?: JSX.Element
  icon?: JSX.Element
  foldedNav: boolean
  setFoldedNav: Dispatch<SetStateAction<boolean>>
  fixedNav: boolean
  setFixedNav: Dispatch<SetStateAction<boolean>>
  handleOpenNav: () => void
}

export function NavBar({
  isMobile,
  links,
  userRights,
  logo,
  icon,
  handleLogout,
  foldedNav,
  setFoldedNav,
  fixedNav,
  setFixedNav,
  handleOpenNav,
  ...props
}: Props): JSX.Element {
  const { t } = useTranslation()

  const [currentTimeOutId, setCurrentTimeOutId] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined)

  function handleMouse(isEnter: boolean): void {
    const timeoutId = setTimeout(() => {
      setFoldedNav(!isEnter)
    }, 50)

    setCurrentTimeOutId(timeoutId)
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
          handleMouse(true)
        }
      }}
      onMouseLeave={() => {
        if (!fixedNav && !isMobile) {
          handleMouse(false)
        }
      }}
      zIndex={100}
      {...props}
      className={`${
        isMobile
          ? classes['navBar__container--mobile']
          : classes['navBar__container']
      } ${props.className ? props.className : ''}`}
    >
      <AppShellSection>
        <Flex gap="xs" className={classes['navBar__flex']}>
          <NextLink href="/">
            <Box className={classes['navBar__logo']}>
              {!logo || foldedNav || isMobile ? icon : logo}
            </Box>
          </NextLink>

          {!foldedNav && (
            <ActionIcon
              variant="transparent"
              color="text"
              className={classes['navBar__pinIcon']}
              onClick={() => setFixedNav(fixed => !fixed)}
              aria-label={t('navigation.toggleFixedNavIcon.arialabel')}
            >
              {fixedNav ? (
                <IconPinFilled size={20} />
              ) : (
                <IconPinnedOff size={20} />
              )}
            </ActionIcon>
          )}
        </Flex>
      </AppShellSection>

      <AppShellSection grow>
        <NavLinks
          links={links}
          userRights={userRights}
          foldedNav={foldedNav}
          isMobile={isMobile}
          handleOpenNav={handleOpenNav}
        />
      </AppShellSection>

      <AppShellSection>
        <MantineNavLink
          component="button"
          leftSection={<IconLogout />}
          label={t('navigation.logout.label')}
          onClick={handleLogout}
          classNames={{
            root: classes['navBar__navLink--root'],
            label: classes['navBar__navLink--label'],
          }}
        />
      </AppShellSection>
    </AppShellNavbar>
  )
}
