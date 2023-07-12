import {
  getTranslation,
  SetPasswordForm,
  SetPasswordSuccessMessage,
  withBaseStylingShowNotification,
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

SetPasswordView.getLayout = function getLayout(
  page: React.ReactNode
): JSX.Element {
  return (
    <PublicLayout routeName={getTranslation('setPasswordView.title')}>
      {page}
    </PublicLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default SetPasswordView
