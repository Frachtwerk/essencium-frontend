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
  getTranslation,
  SetPasswordForm,
  SetPasswordSuccessMessage,
} from '@frachtwerk/essencium-lib'
import { SetPasswordInput } from '@frachtwerk/essencium-types'
import { Container, Paper, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

import { useSetPassword } from '@/api/auth'
import PublicLayout from '@/components/layouts/PublicLayout'
import { baseGetStaticProps } from '@/utils/next'

function SetPasswordView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const { mutate: setPassword } = useSetPassword()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const verification: SetPasswordInput['verification'] =
    String(router.query.token) || ''

  function handleSetPassword(password: SetPasswordInput['password']): void {
    setPassword(
      { password, verification },
      {
        onSuccess: () => setShowSuccessMessage(true),
      },
    )
  }

  return (
    <Container size={450} my="xl">
      {!showSuccessMessage && (
        <Title align="center" order={2} fw="bold">
          {t('setPasswordView.title')}
        </Title>
      )}

      <Paper shadow="sm" p="lg" mt="md" w={400} h={270} radius="sm">
        {!showSuccessMessage && (
          <SetPasswordForm handleSetPassword={handleSetPassword} />
        )}

        {showSuccessMessage && <SetPasswordSuccessMessage />}
      </Paper>
    </Container>
  )
}

SetPasswordView.getLayout = function getLayout(
  page: React.ReactNode,
): JSX.Element {
  return (
    <PublicLayout routeName={getTranslation('setPasswordView.title')}>
      {page}
    </PublicLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default SetPasswordView
