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

import { ResetPassword, resetPasswordSchema } from '@frachtwerk/essencium-types'
import { Box, Button, Container, Group, Text, TextInput } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

type Props = {
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  handlePasswordReset: (email: ResetPassword['email']) => void
}

export function ResetPasswordForm({
  setIsPasswordResetFormOpened,
  handlePasswordReset,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: resetPasswordSchema,
    defaultValues: {
      email: '',
    },
  })

  function onSubmit({ email }: ResetPassword): void {
    handlePasswordReset(email)
  }
  return (
    <Container p={0} m={0}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text size="sm" fw="bold" my="md">
          {t('loginView.resetPassword.form.description')}
        </Text>

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder={String(
                t('loginView.resetPassword.form.placeholder'),
              )}
              label={String(t('loginView.resetPassword.form.label'))}
              withAsterisk
              radius="sm"
              mb="md"
            />
          )}
        />

        <Box mt="-0.6rem" h="0.8rem">
          {formState.errors.email && (
            <Text ml={5} fz="xs" color="red">
              {formState.errors.email?.message
                ? String(t(formState.errors.email.message))
                : null}
            </Text>
          )}
        </Box>

        <Group>
          <Button mt="lg" type="submit">
            {t('loginView.resetPassword.form.submitButton')}
          </Button>

          <Button
            mt="md"
            variant="light"
            onClick={() => {
              setIsPasswordResetFormOpened(false)
            }}
          >
            {t('loginView.resetPassword.form.cancelButton')}
          </Button>
        </Group>
      </form>
    </Container>
  )
}
