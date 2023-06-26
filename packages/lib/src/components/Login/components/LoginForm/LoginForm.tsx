import {
  LoginForm as TLoginForm,
  loginFormSchema,
  ResetPassword,
} from '@frachtwerk/essencium-types'
import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../hooks'
import { ResetPasswordForm, ResetPasswordSuccessMessage } from './components'

type Props = {
  handleLogin: (name: string, pw: string) => void
  handlePasswordReset: (email: ResetPassword['email']) => void
  setIsPasswordResetFormOpened: Dispatch<SetStateAction<boolean>>
  isPasswordResetFormOpened: boolean
  isResetPasswordSent: boolean
  isResettingPassword: boolean
}

export function LoginForm({
  handleLogin,
  handlePasswordReset,
  setIsPasswordResetFormOpened,
  isPasswordResetFormOpened,
  isResetPasswordSent,
  isResettingPassword,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(credentials: TLoginForm): void {
    handleLogin(credentials.email, credentials.password)
  }

  return (
    <Paper shadow="sm" p="lg" mt="md" w={400} h={300} radius="sm">
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

              <Box mt="0.2rem" h="0.8rem">
                {formState.errors.email && (
                  <Text ml={5} fz="xs" color="red">
                    {formState.errors.email?.message
                      ? String(t(formState.errors.email.message))
                      : null}
                  </Text>
                )}
              </Box>

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
                    mt="xs"
                  />
                )}
              />

              <Box mt="0.2rem" h="0.8rem">
                {formState.errors.password && (
                  <Text ml={5} fz="xs" color="red">
                    {formState.errors.password?.message
                      ? String(t(formState.errors.password.message))
                      : null}
                  </Text>
                )}
              </Box>

              <Group position="apart" mt="md">
                <Anchor
                  size="xs"
                  fw="bold"
                  onClick={() => setIsPasswordResetFormOpened(true)}
                >
                  {t('loginView.form.resetPassword')}
                </Anchor>
              </Group>

              <Button type="submit" fullWidth mt="md">
                {t('loginView.form.submit')}
              </Button>
            </form>
          </div>
        )}
      </Transition>

      <Transition
        mounted={isPasswordResetFormOpened && !isResettingPassword}
        transition="fade"
        duration={350}
        timingFunction="ease-in-and-out"
        exitDuration={0}
      >
        {styles => (
          <div style={styles}>
            <ResetPasswordForm
              setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
              handlePasswordReset={handlePasswordReset}
            />
          </div>
        )}
      </Transition>

      {isResettingPassword && (
        <Center h="100%">
          <Loader size="lg" name="loader" />
        </Center>
      )}

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
