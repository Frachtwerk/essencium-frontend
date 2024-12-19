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
  AppShellFooterProps,
  Code,
  Flex,
  Text,
} from '@mantine/core'
import { IconCopyright } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

import classes from './Footer.module.css'

type Props = AppShellFooterProps & {
  links: FooterLink[]
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
    <AppShellFooter
      {...props}
      className={props.className ? props.className : ''}
    >
      <Flex
        justify={{ base: 'center', xs: 'space-between' }}
        direction="row"
        wrap="wrap"
        align="center"
        h="100%" // not applied with normal css
        className={classes.footer__flex}
      >
        <Flex gap="xs" align="center" visibleFrom="sm">
          <IconCopyright size="16" />

          <Text> {t('footer.license')} </Text>

          {version && <Code>{version}</Code>}
        </Flex>

        <Flex direction="row" gap="lg" align="center">
          {links.map(link => (
            <Text
              component={NextLink}
              key={link.label}
              href={link.to}
              className={classes.footer__text}
            >
              {t(link.label)}
            </Text>
          ))}

          {children}
        </Flex>
      </Flex>
    </AppShellFooter>
  )
}
