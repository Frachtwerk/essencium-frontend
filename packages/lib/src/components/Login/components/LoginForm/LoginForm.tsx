import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { LoginForm as TLoginForm, loginFormSchema } from 'types'

import { useZodForm } from '../../../../hooks'
import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'

type Props = {
  handleLogin: (name: string, pw: string) => void
}

export function LoginForm({ handleLogin }: Props): JSX.Element {
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

  function onSubmit(credentials: TLoginForm): void {
    handleLogin(credentials.email, credentials.password)
  }

  return (
    <Paper shadow="sm" p="lg" mt="md" w={400} h={270} radius="sm">
      <Transition
        mounted={!isPasswordResetFormOpened && !isResetPasswordSent}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
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
                    placeholder={String(
                      t('loginView.form.passwordPlaceholder')
                    )}
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
          </div>
        )}
      </Transition>

      <Transition
        mounted={isPasswordResetFormOpened}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
            <ResetPasswordForm
              setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
              setIsResetPasswordSent={setIsResetPasswordSent}
            />
          </div>
        )}
      </Transition>

      <Transition
        mounted={isResetPasswordSent}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
      >
        {styles => (
          <div style={styles}>
            <ResetPasswordSuccessMessage />
          </div>
        )}
      </Transition>
    </Paper>
  )
}
