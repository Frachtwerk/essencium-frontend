import { Container, Paper, Title } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { AxiosError } from 'axios'
import { t } from 'i18next'
import { SetPasswordForm, SetPasswordSuccessMessage } from 'lib'
import { useState } from 'react'
import { SetPasswordInput } from 'types'

import { useSetPassword } from '@/api/auth'
import { router } from '@/router/init'

export function SetPasswordView(): JSX.Element {
  const { mutate: setPassword } = useSetPassword()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const verification: SetPasswordInput['verification'] =
    router.state.currentLocation.search.token || ''

  function handleSetPassword(password: SetPasswordInput['password']): void {
    setPassword(
      { password, verification },
      {
        onSuccess: () => setShowSuccessMessage(true),
        onError: (data: AxiosError) => {
          showNotification({
            autoClose: 4000,
            title: t('notifications.updatedDataError.title'),
            message: data.message,
            color: 'red',
            style: { position: 'fixed', top: '20px', right: '10px' },
          })
        },
      }
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
