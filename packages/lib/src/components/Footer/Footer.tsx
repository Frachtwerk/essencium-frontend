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

import { FooterLink } from '@frachtwerk/essencium-types'
import {
  AppShellFooter,
  Flex,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconCopyright } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

type Props = {
  links: FooterLink[]
}

export function Footer({ links }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()

  // AppShellFooter height={{ base: 58 }}

  return (
    <AppShellFooter p="md">
      <Flex
        justify={{ base: 'center', xs: 'space-between' }}
        direction="row"
        wrap="wrap"
      >
        <Flex gap="xs" align="center" ml="xs" visibleFrom="sm">
          <IconCopyright size="16" />

          <Text> {t('footer.license')} </Text>
        </Flex>

        <Flex direction="row" gap="xl">
          {links.map(link => (
            <NextLink
              key={link.label}
              href={link.to}
              style={{
                textDecoration: 'none',
                color:
                  colorScheme === 'dark'
                    ? theme.colors.gray[4]
                    : theme.colors.dark[9],
              }}
            >
              <Text>{t(link.label)}</Text>
            </NextLink>
          ))}
        </Flex>
      </Flex>
    </AppShellFooter>
  )
}
