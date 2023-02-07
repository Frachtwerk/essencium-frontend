import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'
import type { LoginFormProps } from './types'

export function LoginForm({ loginCredentials }: LoginFormProps): JSX.Element {
  const { t } = useTranslation()

  const [isPasswordResetFormOpened, setIsPasswordResetFormOpened] =
    useState(false)
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)

  return (
    <Paper shadow="sm" p="lg" mt="md" radius="sm">
      {!isPasswordResetFormOpened && !isResetPasswordSent && (
        <form>
          <TextInput
            value={loginCredentials.email}
            placeholder={t('login.form.emailPlaceholder') as string}
            label={t('login.form.email')}
            required
            styles={{
              label: {
                fontWeight: 'bold',
              },
            }}
            withAsterisk
          />

          <PasswordInput
            // value={loginCredentials.password}
            placeholder={t('login.form.passwordPlaceholder') as string}
            label={t('login.form.password')}
            required
            styles={{
              label: {
                fontWeight: 'bold',
              },
            }}
            withAsterisk
            mt="md"
          />

          <Group position="apart" mt="md">
            <Checkbox
              label={t('login.form.rememberLogin')}
              color="cyan"
              size="xs"
            />

            <Anchor
              size="xs"
              color="cyan"
              fw="bold"
              onClick={() => setIsPasswordResetFormOpened(true)}
            >
              {t('login.form.resetPassword')}
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="md" color="cyan">
            {t('login.form.submit')}
          </Button>
        </form>
      )}

      {isPasswordResetFormOpened && !isResetPasswordSent && (
        <ResetPasswordForm
          setOpen={setIsPasswordResetFormOpened}
          setSent={setIsResetPasswordSent}
        />
      )}

      {isResetPasswordSent && <ResetPasswordSuccessMessage />}
    </Paper>
  )
}
