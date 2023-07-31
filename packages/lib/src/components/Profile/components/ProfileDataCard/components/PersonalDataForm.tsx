import {
  UserOutput,
  userOutputSchema,
  UserUpdate,
  userUpdateSchema,
} from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

type Props = {
  user: UserOutput
  handleUpdate: (data: UserUpdate) => void
}

export function PersonalDataForm({ user, handleUpdate }: Props): JSX.Element {
  const { t } = useTranslation()

  const { handleSubmit, control, formState } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...userOutputSchema.parse(user), role: user.role.name },
  })

  function onSubmit(updatedUser: UserUpdate): void {
    handleUpdate(updatedUser)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'xs', sm: 'md' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack miw="45%">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t(
                    'profileView.dataCard.tabs.personalData.placeholder.firstName'
                  )
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.label.firstName'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.firstName && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.firstName?.message
                  ? String(t(formState.errors.firstName.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack miw="45%">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t(
                    'profileView.dataCard.tabs.personalData.placeholder.lastName'
                  )
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.label.lastName'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.lastName && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.lastName?.message
                  ? String(t(formState.errors.lastName.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        mt="xs"
      >
        <Stack miw="45%">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.placeholder.phone')
                )}
                label={t('profileView.dataCard.tabs.personalData.label.phone')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.phone && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.phone?.message
                  ? String(t(formState.errors.phone.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack miw="45%">
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.placeholder.mobile')
                )}
                label={t('profileView.dataCard.tabs.personalData.label.mobile')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.mobile && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.mobile?.message
                  ? String(t(formState.errors.mobile.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        mt="xs"
      >
        <Stack miw="45%">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.placeholder.email')
                )}
                label={t('profileView.dataCard.tabs.personalData.label.email')}
                withAsterisk
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.email && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.email?.message
                  ? String(t(formState.errors.email.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack miw="45%">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                radius="sm"
                label={t(
                  'profileView.dataCard.tabs.personalData.label.language'
                )}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.label.language')
                )}
                data={[
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'English' },
                ]}
              />
            )}
          />

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.locale && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.locale?.message
                  ? String(t(formState.errors.locale.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Button type="submit" mt="md">
        {t('profileView.dataCard.tabs.personalData.saveChanges')}
      </Button>
    </form>
  )
}
