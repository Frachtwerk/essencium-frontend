import {
  Anchor,
  Button,
  Checkbox,
  Code,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useZodForm } from '../../../../hooks'
import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'
import type { LoginCredentials } from './types'
import { loginFormSchema } from './types'

export function LoginForm(): JSX.Element {
  const { t } = useTranslation()

  const [isPasswordResetFormOpened, setIsPasswordResetFormOpened] =
    useState(false)
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)

  const { handleSubmit, control, formState } = useZodForm({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberUser: false,
    },
  })

  // Temporary code to show form data and test the component
  const [showData, setShowData] = useState<Record<string, string | boolean>>({})

  function onSubmit(data: LoginCredentials): void {
    setShowData(data)
  }

  return (
    <Paper shadow="sm" p="lg" mt="md" w={400} radius="sm">
      {!isPasswordResetFormOpened && !isResetPasswordSent && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('loginView.form.emailPlaceholder'))}
                label={t('loginView.form.email')}
                required
                styles={{
                  label: {
                    fontWeight: 'bold',
                  },
                }}
                withAsterisk
              />
            )}
          />

          {formState.errors.email && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.email?.message}
            </Text>
          )}

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder={String(t('loginView.form.passwordPlaceholder'))}
                label={t('loginView.form.password')}
                required
                styles={{
                  label: {
                    fontWeight: 'bold',
                  },
                }}
                withAsterisk
                mt="md"
              />
            )}
          />

          {formState.errors.password && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.password?.message}
            </Text>
          )}

          <Group position="apart" mt="md">
            <Controller
              name="rememberUser"
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  value={undefined}
                  checked={field.value}
                  label={t('loginView.form.rememberLogin')}
                  color="cyan"
                  size="xs"
                />
              )}
            />

            <Anchor
              size="xs"
              color="cyan"
              fw="bold"
              onClick={() => setIsPasswordResetFormOpened(true)}
            >
              {t('loginView.form.resetPassword')}
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="md" color="cyan">
            {t('loginView.form.submit')}
          </Button>
        </form>
      )}

      {Object.keys(showData).length ? (
        <Code mt="xs" block data-testid="entered-data">
          {JSON.stringify(showData, null, 2)}
        </Code>
      ) : null}

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
