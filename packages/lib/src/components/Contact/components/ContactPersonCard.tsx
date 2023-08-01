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

export function ContactPersonCard(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder data-testid="card">
      <Flex
        direction={{ base: 'column', sm: 'column' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'center' }}
        align={{ base: 'center', md: 'flex-start' }}
      >
        <Title order={3}>{t('contactView.contactPersonCard.title')}</Title>

        <Avatar
          size="xl"
          radius="xl"
          mt="xs"
          src={null}
          alt={String(t('contactView.contactPersonCard.avatar.alt'))}
          color="indigo"
        />

        <Title order={5} mb="sm" mt="sm">
          Firstname Lastname
        </Title>

        <Flex direction="column" align="flex-start" gap="sm">
          <Group spacing="xl" aria-label="Contact info">
            <ThemeIcon radius="md">
              <IconPhoneCall size={16} />
            </ThemeIcon>

            <Text>555 - 5555 5555</Text>
          </Group>

          <Group spacing="xl" aria-label="Contact info">
            <ThemeIcon radius="md">
              <IconMail size={16} />
            </ThemeIcon>

            <Text>test@email.de</Text>
          </Group>

          <Group spacing="xl" aria-label="Contact info">
            <ThemeIcon radius="md">
              <IconLocation size={16} />
            </ThemeIcon>

            <Text>Teststreet 1, 12345 Testcity</Text>
          </Group>
        </Flex>

        <Group mt="xl" aria-label="Contact info">
          <ThemeIcon variant="light" radius="md">
            <IconBrandLinkedin size={15} aria-label="Social icon" />
          </ThemeIcon>

          <ThemeIcon variant="light" radius="md">
            <IconBrandFacebook size={15} aria-label="Social icon" />
          </ThemeIcon>

          <ThemeIcon variant="light" radius="md">
            <IconBrandInstagram size={15} aria-label="Social icon" />
          </ThemeIcon>
        </Group>
      </Flex>
    </Card>
  )
}
