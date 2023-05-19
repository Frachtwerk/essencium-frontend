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
  Checkbox,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Transition,
} from '@mantine/core'
import { Dispatch, SetStateAction } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
      rememberUser: false,
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
                    {formState.errors.email?.message}
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
                    {formState.errors.password?.message}
                  </Text>
                )}
              </Box>

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
