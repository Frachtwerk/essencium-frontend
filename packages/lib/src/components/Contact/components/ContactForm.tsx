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

import { ContactFormType } from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconSend } from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'
import { Control, Controller, FormState } from 'react-hook-form'

import classes from './ContactForm.module.css'

type Props = {
  control: Control<ContactFormType>
  formState: FormState<ContactFormType>
}

export function ContactForm({ formState, control }: Props): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card withBorder role="form" className={classes['contact-form__card']}>
      <Title order={3} className={classes['contact-form__title']}>
        {t('contactView.contactForm.title')}
      </Title>

      <Stack className={classes['contact-form__stack']}>
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              className={classes['contact-from__text-input']}
              label={t('contactView.contactForm.form.subject')}
              placeholder={String(
                t('contactView.contactForm.form.subjectPlaceholder'),
              )}
              size="sm"
              withAsterisk
            />
          )}
        />

        <Box className={classes['contact-form__error-box']}>
          {formState.errors.subject && (
            <Text className={classes['contact-form__error-text']}>
              {formState.errors.subject?.message
                ? String(t(formState.errors.subject.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Stack className={classes['contact-form__stack']}>
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
              rows={6}
            />
          )}
        />

        <Box className={classes['contact-form__error-box-message']}>
          {formState.errors.message && (
            <Text className={classes['contact-form__error-text']}>
              {formState.errors.message?.message
                ? String(t(formState.errors.message?.message))
                : null}
            </Text>
          )}
        </Box>
      </Stack>

      <Group className={classes['contact-form__group']}>
        <Button type="submit" leftSection={<IconSend size={20} />}>
          {t('contactView.contactForm.form.sendMessage')}
        </Button>
      </Group>
    </Card>
  )
}
