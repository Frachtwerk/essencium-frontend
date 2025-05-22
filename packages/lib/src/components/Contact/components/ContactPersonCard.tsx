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
  ActionIcon,
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

type Props = {
  contactPerson: ContactPerson
}

export function ContactPersonCard({ contactPerson }: Props): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  return (
    <Card withBorder role="complementary" className="p-xl rounded-md shadow-sm">
      <Flex className="gap-sm sm:gap-md flex-col items-center sm:justify-center md:items-start">
        <Title order={3}>{t('contactView.contactPersonCard.title')}</Title>

        <Avatar
          size="xl"
          // color gets not applied when outsourced to module.css
          color={theme.primaryColor}
          name={contactPerson.name}
          className="mt-xs rounded-xl"
        />

        <Title order={5} className="my-sm">
          {contactPerson.name}
        </Title>

        <Flex className="gap-sm flex-col items-start">
          {contactPerson?.phone ? (
            <Group
              className="gap-xl"
              aria-label={
                t(
                  'contactView.contactPersonCard.contactPerson.ariaLabel',
                ) as string
              }
            >
              <ThemeIcon className="rounded-md">
                <IconPhoneCall width={15} height={15} />
              </ThemeIcon>

              <Text>{contactPerson.phone}</Text>
            </Group>
          ) : null}

          <Group aria-label="Contact info" className="gap-xl">
            <ThemeIcon className="rounded-md">
              <IconMail width={15} height={15} />
            </ThemeIcon>

            <Text>{contactPerson.email}</Text>
          </Group>

          {contactPerson?.address ? (
            <Group className="gap-xl" aria-label="Contact info">
              <ThemeIcon className="rounded-md">
                <IconLocation width={15} height={15} />
              </ThemeIcon>

              <Text>{contactPerson.address}</Text>
            </Group>
          ) : null}
        </Flex>

        <Group className="mt-xl" aria-label="Contact info">
          {contactPerson?.linkedinUrl ? (
            <ActionIcon
              component={NextLink}
              href={contactPerson.linkedinUrl}
              passHref
              variant="light"
              className="rounded-md"
            >
              <IconBrandLinkedin
                width={15}
                height={15}
                aria-label="Social icon"
              />
            </ActionIcon>
          ) : null}

          {contactPerson.instagramUrl ? (
            <ActionIcon
              component={NextLink}
              href={contactPerson.instagramUrl}
              passHref
              variant="light"
              className="rounded-md"
            >
              <IconBrandInstagram
                width={15}
                height={15}
                aria-label="Social icon"
              />
            </ActionIcon>
          ) : null}
        </Group>
      </Flex>
    </Card>
  )
}
