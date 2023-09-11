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
  Box,
  Code,
  Flex,
  Group,
  MediaQuery,
  Navbar,
  NavLink as MantineNavLink,
  Stack,
  useMantineTheme,
} from '@mantine/core'
import { useTimeout } from '@mantine/hooks'
import { IconLogout, IconPinFilled, IconPinnedOff } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

import { NavLinks } from './components'

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
  const theme = useMantineTheme()

  const { t } = useTranslation()

  const { start, clear } = useTimeout(() => setFoldedNav(false), 270)

  function toggleFixedNav(): void {
    setFixedNav(fixed => !fixed)
  }

  const width = fixedNav ? '250px' : '80px'

  return (
    <Box>
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Navbar
          onMouseEnter={() => {
            if (!fixedNav) {
              start()
            }
          }}
          onMouseLeave={() => {
            if (!fixedNav) {
              setFoldedNav(true)
              clear()
            }
          }}
          p="sm"
          hiddenBreakpoint="sm"
          sx={{
            width,
            transition: 'width 0.4s ease-in-out',
            '&:hover': {
              width: '250px',
            },
          }}
          height="100%"
          zIndex={100}
          fixed
          mt={isOpen ? '0' : '-3.6rem'}
        >
          <Stack
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Navbar.Section mb="xl">
              <Group spacing="xs" align="center">
                <Flex justify="space-between" align="center" gap="xl">
                  <NextLink href="/">
                    {foldedNav ? (
                      <Box pr={150}>{icon}</Box>
                    ) : (
                      <Box sx={{ height: '50px' }}>{logo}</Box>
                    )}
                  </NextLink>

                  {!foldedNav ? (
                    <Box
                      onClick={() => toggleFixedNav()}
                      ml="xl"
                      mt="xs"
                      sx={{ cursor: 'pointer' }}
                    >
                      {fixedNav ? (
                        <IconPinFilled size={20} color="black" />
                      ) : (
                        <IconPinnedOff size={20} color="black" />
                      )}
                    </Box>
                  ) : null}
                </Flex>

                {version ? <Code>{version}</Code> : null}

                {process.env.NEXT_PUBLIC_ENV && !foldedNav ? (
                  <Code>{process.env.NEXT_PUBLIC_ENV}</Code>
                ) : null}
              </Group>
            </Navbar.Section>

            <Navbar.Section grow>
              <NavLinks links={links} userRights={userRights} />
            </Navbar.Section>

            <Navbar.Section mt="auto" mb="70px">
              <MantineNavLink
                icon={<IconLogout />}
                label={t('navigation.logout.label')}
                onClick={() => handleLogout()}
                styles={{
                  root: {
                    borderRadius: theme.radius.sm,
                  },
                  label: {
                    fontSize: theme.fontSizes.sm,
                  },
                }}
              />
            </Navbar.Section>
          </Stack>
        </Navbar>
      </MediaQuery>

      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Navbar
          hidden={!isOpen}
          p="sm"
          hiddenBreakpoint="sm"
          height="100%"
          zIndex={100}
          fixed
        >
          <Stack
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Navbar.Section mb="xl">
              <Group spacing="xs" align="center">
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
            </Navbar.Section>

            <Navbar.Section grow>
              <NavLinks links={links} userRights={userRights} />
            </Navbar.Section>

            <Navbar.Section mt="auto" grow>
              <MantineNavLink
                icon={<IconLogout />}
                label={t('navigation.logout.label')}
                onClick={() => handleLogout()}
                styles={{
                  root: {
                    borderRadius: theme.radius.sm,
                  },
                  label: {
                    fontSize: theme.fontSizes.sm,
                  },
                }}
              />
            </Navbar.Section>
          </Stack>
        </Navbar>
      </MediaQuery>
    </Box>
  )
}
