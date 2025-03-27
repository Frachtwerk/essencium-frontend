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

import { ContactPerson } from '@frachtwerk/essencium-types'
import {
  Avatar,
  Card,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from '@mantine/core'
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLocation,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons-react'
import NextLink from 'next/link'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

import classes from './ContactPersonCard.module.css'

type Props = {
  contactPerson: ContactPerson
}

export function ContactPersonCard({ contactPerson }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <Card
      withBorder
      role="complementary"
      className={classes['contact-person-card__card']}
    >
      <Flex
        direction={{ base: 'column', sm: 'column' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'center' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Title order={3}>{t('contactView.contactPersonCard.title')}</Title>

        <Avatar
          size="xl"
          // color gets not applied when outsourced to module.css
          color={theme.primaryColor}
          name={contactPerson.name}
          className={classes['contact-person-card__avatar']}
        />

        <Title order={5} className={classes['contact-person-card__title']}>
          {contactPerson.name}
        </Title>

        <Flex direction="column" align="flex-start" gap="sm">
          {contactPerson?.phone ? (
            <Group
              gap="xl"
              aria-label={
                t(
                  'contactView.contactPersonCard.contactPerson.ariaLabel',
                ) as string
              }
            >
              <ThemeIcon
                className={classes['contact-person-card__theme-icon--radius']}
              >
                <IconPhoneCall
                  className={classes['contact-person-card__icon--size']}
                />
              </ThemeIcon>

              <Text>{contactPerson.phone}</Text>
            </Group>
          ) : null}

          <Group gap="xl" aria-label="Contact info">
            <ThemeIcon
              className={classes['contact-person-card__theme-icon--radius']}
            >
              <IconMail
                className={classes['contact-person-card__icon--size']}
              />
            </ThemeIcon>

            <Text>{contactPerson.email}</Text>
          </Group>

          {contactPerson?.address ? (
            <Group gap="xl" aria-label="Contact info">
              <ThemeIcon
                className={classes['contact-person-card__theme-icon--radius']}
              >
                <IconLocation
                  className={classes['contact-person-card__icon--size']}
                />
              </ThemeIcon>

              <Text>{contactPerson.address}</Text>
            </Group>
          ) : null}
        </Flex>

        <Group
          className={classes['contact-person-card__group']}
          aria-label="Contact info"
        >
          {contactPerson?.linkedinUrl ? (
            <NextLink href={contactPerson.linkedinUrl} passHref>
              <ThemeIcon
                variant="light"
                className={classes['contact-person-card__theme-icon--radius']}
              >
                <IconBrandLinkedin
                  className={classes['contact-person-card__icon--size']}
                  aria-label="Social icon"
                />
              </ThemeIcon>
            </NextLink>
          ) : null}

          {contactPerson.instagramUrl ? (
            <NextLink href={contactPerson.instagramUrl} passHref>
              <ThemeIcon
                variant="light"
                className={classes['contact-person-card__theme-icon--radius']}
              >
                <IconBrandInstagram
                  className={classes['contact-person-card__icon--size']}
                  aria-label="Social icon"
                />
              </ThemeIcon>
            </NextLink>
          ) : null}
        </Group>
      </Flex>
    </Card>
  )
}
