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
  Button,
  Card,
  Container,
  Grid,
  Group,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'

export function ContactForm(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <form data-testid="form">
        <Title order={3} mb="md">
          {t('contactView.contactForm.title')}
        </Title>

        <Grid gutter={30}>
          <Grid.Col md={6}>
            <Container p={0} m={0}>
              <TextInput
                mb="md"
                label={t('contactView.contactForm.form.email')}
                withAsterisk
                size="sm"
                radius="md"
              />

              <TextInput
                mb="md"
                label={t('contactView.contactForm.form.name')}
                size="sm"
                radius="md"
              />

              <TextInput
                mb="md"
                label={t('contactView.contactForm.form.number')}
                size="sm"
                radius="md"
              />
            </Container>
          </Grid.Col>

          <Grid.Col md={6}>
            <TextInput
              mb="md"
              label={t('contactView.contactForm.form.subject')}
              size="sm"
              radius="md"
              variant="filled"
            />

            <Textarea
              placeholder={String(
                t('contactView.contactForm.form.messagePlaceholder'),
              )}
              label={t('contactView.contactForm.form.message')}
              withAsterisk
              minRows={8}
              maxRows={15}
              miw="45%"
              variant="filled"
            />
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button leftIcon={<IconSend size={20} />}>
            {t('contactView.contactForm.form.sendMessage')}
          </Button>
        </Group>
      </form>
    </Card>
  )
}
