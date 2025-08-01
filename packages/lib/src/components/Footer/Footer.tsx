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
  Anchor,
  AppShellFooter,
  AppShellFooterProps,
  Code,
  Flex,
  Text,
} from '@mantine/core'
import { IconCopyright } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

type Props = AppShellFooterProps & {
  links: NavLink[]
  version?: string
}

export function Footer({
  links,
  version,
  children,
  ...props
}: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <AppShellFooter {...props} className={props.className}>
      <Flex className="xs:justify-between px-lg h-full flex-row-reverse flex-wrap items-center justify-center">
        <Flex className="gap-lg flex-row items-center">
          {links.map(link => (
            <Anchor
              component={NextLink}
              key={link.label}
              href={link.to}
              className="text-default"
            >
              {t(link.label)}
            </Anchor>
          ))}

          {children}
        </Flex>

        <Flex className="gap-xs items-center">
          <IconCopyright className="size-4" />

          <Text> {t('footer.license')} </Text>

          {version && <Code>{version}</Code>}
        </Flex>
      </Flex>
    </AppShellFooter>
  )
}
