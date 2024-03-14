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
  Flex,
  Group,
  NavLink as MantineNavLink,
  Stack,
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
  isOpen: boolean
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
  isOpen,
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
    <Box>
      <AppShellNavbar
        visibleFrom="sm"
        onMouseEnter={() => {
          if (!fixedNav) {
            handleMouseEnter()
          }
        }}
        onMouseLeave={() => {
          if (!fixedNav) {
            handleMouseLeave()
          }
        }}
        p="sm"
        className={fixedNav ? classes['fixedNavbar'] : classes['navbar']}
        zIndex={100}
        mt={isOpen ? '0' : '-3.6rem'}
      >
        <Stack h="100%" display="flex" dir="column" justify="space-between">
          <AppShellSection mb="lg">
            <Group gap="xs" align="center">
              <Flex justify="space-between" align="center" gap="xl">
                <NextLink href="/">
                  {foldedNav ? (
                    <Box className={classes['navBox']} pr={150}>
                      {icon}
                    </Box>
                  ) : (
                    <Box className={classes['navBox']}>{logo}</Box>
                  )}
                </NextLink>

                {!foldedNav ? (
                  <Box
                    onClick={() => toggleFixedNav()}
                    ml="lg"
                    mt="xs"
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
              </Flex>

              {version ? <Code>{version}</Code> : null}

              {process.env.NEXT_PUBLIC_ENV && !foldedNav ? (
                <Code>{process.env.NEXT_PUBLIC_ENV}</Code>
              ) : null}
            </Group>
          </AppShellSection>

          <AppShellSection grow>
            <NavLinks links={links} userRights={userRights} />
          </AppShellSection>

          <AppShellSection mt="auto" mb="70px">
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
        </Stack>
      </AppShellNavbar>

      <AppShellNavbar
        hidden={!isOpen}
        hiddenFrom="sm"
        p="sm"
        w="100%"
        zIndex={100}
        className={classes['navbar']}
      >
        <Stack
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <AppShellSection mb="xl">
            <Group gap="xs" align="center">
              <NextLink href="/">
                <Box>{logo}</Box>
              </NextLink>
              {version ? (
                <Box>
                  <Code>{version}</Code>

                  {process.env.NODE_ENV === 'development' ? (
                    <Code>{process.env.NODE_ENV}</Code>
                  ) : null}
                </Box>
              ) : null}
            </Group>
          </AppShellSection>

          <AppShellSection grow>
            <NavLinks links={links} userRights={userRights} />
          </AppShellSection>

          <AppShellSection mt="auto" grow>
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
        </Stack>
      </AppShellNavbar>
    </Box>
  )
}
