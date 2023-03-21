import {
  Button,
  Flex,
  MediaQuery,
  PasswordInput,
  Stack,
  Text,
} from '@mantine/core'
import { Controller } from 'react-hook-form'
import { i18n } from 'translations'
import { z } from 'zod'

import { useZodForm } from '../../../../../hooks'
import { ChangePassword, PasswordChangeFormProps } from '../../../types'

const { t } = i18n

export const passwordChangeSchema = z
  .object({
    verification: z.string().min(8, String(t('validation.password.minLength'))),
    password: z.string().min(8, String(t('validation.password.minLength'))),
    confirmPassword: z
      .string()
      .min(8, String(t('validation.password.minLength'))),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: String(t('validation.password.confirmError')),
    path: ['confirmPassword'],
  })

export function PasswordChangeForm({
  handlePasswordUpdate,
}: PasswordChangeFormProps): JSX.Element {
  const { handleSubmit, control, formState } = useZodForm({
    schema: passwordChangeSchema,
  })

  function onSubmit(data: ChangePassword): void {
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

            {formState.errors.verification && (
              <Text fz="xs" color="red">
                {formState.errors.verification?.message}
              </Text>
            )}
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
            {formState.errors.password && (
              <Text fz="xs" color="red">
                {formState.errors.password?.message}
              </Text>
            )}
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
            {formState.errors.confirmPassword && (
              <Text fz="xs" color="red">
                {formState.errors.confirmPassword?.message}
              </Text>
            )}
          </Stack>
        </MediaQuery>

        <Button type="submit" mt="md" variant="light">
          {t('profileView.dataCard.tabs.passwordChange.content.savePassword')}
        </Button>
      </Flex>
    </form>
  )
}
