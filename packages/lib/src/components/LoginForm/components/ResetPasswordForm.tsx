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

import { ResetPassword, resetPasswordSchema } from '@frachtwerk/essencium-types'
import { Button, Container, Group, Text } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Dispatch, type JSX, SetStateAction } from 'react'

import { useZodForm } from '../../../hooks'
import { ControlledTextInput } from '../../Form'

type Props = {
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  handlePasswordReset: (email: ResetPassword['email']) => void
}

export function ResetPasswordForm({
  setIsPasswordResetFormOpened,
  handlePasswordReset,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control } = useZodForm({
    schema: resetPasswordSchema,
    defaultValues: {
      email: '',
    },
  })

  function onSubmit({ email }: ResetPassword): void {
    handlePasswordReset(email)
  }
  return (
    <Container className="m-0 p-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text className="my-md text-sm">
          {t('loginView.resetPassword.form.description')}
        </Text>

        <ControlledTextInput
          name="email"
          control={control}
          placeholder={String(t('loginView.resetPassword.form.placeholder'))}
          label={String(t('loginView.resetPassword.form.label'))}
          withAsterisk
          className="mb-md"
        />

        <Group>
          <Button className="mt-lg" type="submit">
            {t('loginView.resetPassword.form.submitButton')}
          </Button>

          <Button
            className="mt-lg"
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
