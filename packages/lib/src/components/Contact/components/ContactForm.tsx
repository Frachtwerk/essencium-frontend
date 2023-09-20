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

import { ContactFormType } from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { Control, Controller, FormState } from 'react-hook-form'

type Props = {
  control: Control<ContactFormType>
  formState: FormState<ContactFormType>
}

export function ContactForm({ formState, control }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Title order={3} mb="md">
        {t('contactView.contactForm.title')}
      </Title>

      <Grid gutter={30}>
        <Grid.Col md={6}>
          <Container p={0} m={0}>
            <Stack>
              <Controller
                name="mailAddress"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    mb="md"
                    label={t('contactView.contactForm.form.email')}
                    withAsterisk
                    size="sm"
                    radius="md"
                  />
                )}
              />

              <Box mt="-1.5rem" h="0.8rem">
                {formState.errors.mailAddress && (
                  <Text ml={5} fz="xs" color="red">
                    {formState.errors.mailAddress?.message
                      ? String(t(formState.errors.mailAddress.message))
                      : null}
                  </Text>
                )}
              </Box>
            </Stack>

            <Stack mt="md">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    mb="md"
                    label={t('contactView.contactForm.form.name')}
                    size="sm"
                    radius="md"
                    withAsterisk
                  />
                )}
              />

              <Box mt="-1.5rem" h="0.8rem">
                {formState.errors.name && (
                  <Text ml={5} fz="xs" color="red">
                    {formState.errors.name?.message
                      ? String(t(formState.errors.name.message))
                      : null}
                  </Text>
                )}
              </Box>
            </Stack>
          </Container>
        </Grid.Col>

        <Grid.Col md={6}>
          <Stack>
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  mb="md"
                  label={t('contactView.contactForm.form.subject')}
                  size="sm"
                  radius="md"
                  variant="filled"
                  withAsterisk
                />
              )}
            />

            <Box mt="-1.5rem" h="0.8rem">
              {formState.errors.subject && (
                <Text ml={5} fz="xs" color="red">
                  {formState.errors.subject?.message
                    ? String(t(formState.errors.subject.message))
                    : null}
                </Text>
              )}
            </Box>
          </Stack>

          <Stack mt="md">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
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
              )}
            />

            <Box mt="-0.6em" h="0.8rem">
              {formState.errors.message && (
                <Text ml={5} fz="xs" color="red">
                  {formState.errors.message?.message
                    ? String(t(formState.errors.message?.message))
                    : null}
                </Text>
              )}
            </Box>
          </Stack>
        </Grid.Col>
      </Grid>

      <Group position="right" mt="md">
        <Button type="submit" leftIcon={<IconSend size={20} />}>
          {t('contactView.contactForm.form.sendMessage')}
        </Button>
      </Group>
    </Card>
  )
}
