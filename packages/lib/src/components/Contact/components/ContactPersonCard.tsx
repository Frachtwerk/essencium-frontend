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
  contactPerson?: ContactPerson
}

export function ContactPersonCard({ contactPerson }: Props): JSX.Element {
  const { t } = useTranslation()

  const examplePerson = {
    name: 'Jane Doe',
    phone: '+1(123) 456-7890',
    email: 'jane.doe@example.com',
    address: '123 Maple Street. Anytown, PA 17101',
    linkedinUrl: 'https://www.linkedin.com/company/frachtwerk',
    instagramUrl: 'https://www.instagram.com/frachtwerk.de/',
  }

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
          name={contactPerson?.name ?? examplePerson.name}
          className={classes['contact-person-card__avatar']}
        />

        <Title order={5} className={classes['contact-person-card__title']}>
          {contactPerson?.name ?? examplePerson.name}
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

            <Text>{contactPerson?.phone ?? examplePerson.phone}</Text>
          </Group>

          <Group gap="xl" aria-label="Contact info">
            <ThemeIcon
              className={classes['contact-person-card__theme-icon--radius']}
            >
              <IconMail
                className={classes['contact-person-card__icon--size']}
              />
            </ThemeIcon>

            <Text>{contactPerson?.email ?? examplePerson.email}</Text>
          </Group>

          <Group gap="xl" aria-label="Contact info">
            <ThemeIcon
              className={classes['contact-person-card__theme-icon--radius']}
            >
              <IconLocation
                className={classes['contact-person-card__icon--size']}
              />
            </ThemeIcon>

            <Text>{contactPerson?.address ?? examplePerson.address}</Text>
          </Group>
        </Flex>

        <Group
          className={classes['contact-person-card__group']}
          aria-label="Contact info"
        >
          <NextLink
            href={contactPerson?.linkedinUrl ?? examplePerson.linkedinUrl}
            passHref
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
          </NextLink>

          <NextLink
            href={contactPerson?.instagramUrl ?? examplePerson.instagramUrl}
            passHref
          >
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
        </Group>
      </Flex>
    </Card>
  )
}
