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

import {
  Avatar,
  Card,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconLocation,
  IconMail,
  IconPhoneCall,
} from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

import classes from './ContactPersonCard.module.css'

export function ContactPersonCard(): JSX.Element {
  const { t } = useTranslation()

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
          color="var(--mantine-color-blue-6)"
          src={null}
          alt={String(t('contactView.contactPersonCard.avatar.alt'))}
          className={classes['contact-person-card__avatar']}
        />

        <Title order={5} className={classes['contact-person-card__title']}>
          Firstname Lastname
        </Title>

        <Flex direction="column" align="flex-start" gap="sm">
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

            <Text>555 - 5555 5555</Text>
          </Group>

          <Group gap="xl" aria-label="Contact info">
            <ThemeIcon
              className={classes['contact-person-card__theme-icon--radius']}
            >
              <IconMail
                className={classes['contact-person-card__icon--size']}
              />
            </ThemeIcon>

            <Text>test@email.de</Text>
          </Group>

          <Group gap="xl" aria-label="Contact info">
            <ThemeIcon
              className={classes['contact-person-card__theme-icon--radius']}
            >
              <IconLocation
                className={classes['contact-person-card__icon--size']}
              />
            </ThemeIcon>

            <Text>Teststreet 1, 12345 Testcity</Text>
          </Group>
        </Flex>

        <Group
          className={classes['contact-person-card__group']}
          aria-label="Contact info"
        >
          <ThemeIcon
            variant="light"
            className={classes['contact-person-card__theme-icon--radius']}
          >
            <IconBrandLinkedin
              className={classes['contact-person-card__icon--size']}
              aria-label="Social icon"
            />
          </ThemeIcon>

          <ThemeIcon
            variant="light"
            className={classes['contact-person-card__theme-icon--radius']}
          >
            <IconBrandFacebook
              className={classes['contact-person-card__icon--size']}
              aria-label="Social icon"
            />
          </ThemeIcon>

          <ThemeIcon
            variant="light"
            className={classes['contact-person-card__theme-icon--radius']}
          >
            <IconBrandInstagram
              className={classes['contact-person-card__icon--size']}
              aria-label="Social icon"
            />
          </ThemeIcon>
        </Group>
      </Flex>
    </Card>
  )
}
