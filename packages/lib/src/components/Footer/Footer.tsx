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
import { AppShellFooter, Flex, Text } from '@mantine/core'
import { IconCopyright } from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'

import classes from './Footer.module.css'

type Props = {
  links: FooterLink[]
}

export function Footer({ links }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <AppShellFooter className={classes['footer__app-shell']}>
      <Flex
        justify={{ base: 'center', xs: 'space-between' }}
        direction="row"
        wrap="wrap"
      >
        <Flex
          gap="xs"
          align="center"
          className={classes.footer__flex}
          visibleFrom="sm"
        >
          <IconCopyright size="16" />

          <Text> {t('footer.license')} </Text>
        </Flex>

        <Flex direction="row" gap="lg">
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
        </Flex>
      </Flex>
    </AppShellFooter>
  )
}
