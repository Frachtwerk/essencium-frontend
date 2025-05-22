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
  SetPasswordForm,
  SetPasswordSuccessMessage,
} from '@frachtwerk/essencium-lib'
import { SetPasswordInput } from '@frachtwerk/essencium-types'
import { Container, Paper, Title } from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { useSetPassword } from '@/api'

export default function SetPasswordView(): JSX.Element {
  const { t } = useTranslation()

  const { mutate: setPassword } = useSetPassword()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const searchParams = useSearchParams()

  const token = searchParams.get('token')

  const verification: SetPasswordInput['verification'] = String(token) || ''

  function handleSetPassword(password: SetPasswordInput['password']): void {
    setPassword(
      { password, verification },
      {
        onSuccess: () => setShowSuccessMessage(true),
      },
    )
  }

  return (
    <Container className="my-xl size-[450px]">
      {!showSuccessMessage && (
        <Title ta="center" order={2} fw="bold">
          {t('setPasswordView.title')}
        </Title>
      )}

      <Paper className="p-lg mt-md h-[270px] w-[400px] rounded-sm shadow-sm">
        {!showSuccessMessage && (
          <SetPasswordForm handleSetPassword={handleSetPassword} />
        )}

        {showSuccessMessage && <SetPasswordSuccessMessage />}
      </Paper>
    </Container>
  )
}
