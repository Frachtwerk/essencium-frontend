import {
  PasswordChange,
  passwordChangeSchema,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Flex,
  MediaQuery,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

type Props = {
  handlePasswordUpdate: (
    oldPassword: PasswordChange['password'],
    newPassword: PasswordChange['password']
  ) => void
}

export function PasswordChangeForm({
  handlePasswordUpdate,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: passwordChangeSchema,
    defaultValues: {
      verification: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: PasswordChange): void {
    handlePasswordUpdate(data.password, data.verification)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" align="flex-start">
        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Stack miw="60%" mb="md">
            <Controller
              name="verification"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={String(
                    t(
                      'profileView.dataCard.tabs.passwordChange.content.currentPassword'
                    )
                  )}
                  label={t(
                    'profileView.dataCard.tabs.passwordChange.content.currentPassword'
                  )}
                  radius="sm"
                  withAsterisk
                />
              )}
            />

            <Box mt="-0.6rem" h="0.8rem">
              {formState.errors.verification && (
                <Text ml={5} fz="xs" color="red">
                  {formState.errors.verification?.message
                    ? String(t(formState.errors.verification.message))
                    : null}
                </Text>
              )}
            </Box>
          </Stack>
        </MediaQuery>

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Stack miw="60%" mb="md">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={String(
                    t(
                      'profileView.dataCard.tabs.passwordChange.content.newPassword'
                    )
                  )}
                  label={t(
                    'profileView.dataCard.tabs.passwordChange.content.newPassword'
                  )}
                  radius="sm"
                  withAsterisk
                />
              )}
            />

            <Box mt="-0.6rem" h="0.8rem">
              {formState.errors.password && (
                <Text ml={5} fz="xs" color="red">
                  {formState.errors.password?.message
                    ? String(t(formState.errors.password.message))
                    : null}
                </Text>
              )}
            </Box>
          </Stack>
        </MediaQuery>

        <MediaQuery query="(max-width: 600px)" styles={{ minWidth: '100%' }}>
          <Stack miw="60%" mb="md">
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  {...field}
                  placeholder={String(
                    t(
                      'profileView.dataCard.tabs.passwordChange.content.confirmNewPassword'
                    )
                  )}
                  label={t(
                    'profileView.dataCard.tabs.passwordChange.content.confirmNewPassword'
                  )}
                  radius="sm"
                  withAsterisk
                />
              )}
            />

            <Box mt="-0.6rem" h="0.8rem">
              {formState.errors.confirmPassword && (
                <Text ml={5} fz="xs" color="red">
                  {formState.errors.confirmPassword?.message
                    ? String(t(formState.errors.confirmPassword.message))
                    : null}
                </Text>
              )}
            </Box>
          </Stack>
        </MediaQuery>

        <Button type="submit" mt="md" variant="light">
          {t('profileView.dataCard.tabs.passwordChange.content.savePassword')}
        </Button>
      </Flex>
    </form>
  )
}
