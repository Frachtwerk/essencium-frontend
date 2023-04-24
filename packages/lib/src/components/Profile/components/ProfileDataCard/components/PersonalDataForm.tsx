import { Button, Flex, Select, Stack, Text, TextInput } from '@mantine/core'
import { Controller } from 'react-hook-form'
import { i18n } from 'translations'
import { UserOutput, UserUpate, userUpdateSchema } from 'types'

import { useZodForm } from '../../../../../hooks'

const { t } = i18n

type Props = {
  user: UserOutput
  handleUpdate: (data: UserUpate) => void
}

export function PersonalDataForm({ user, handleUpdate }: Props): JSX.Element {
  const { handleSubmit, control, formState } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...user, role: user.role.id },
  })

  function onSubmit(data: UserUpate): void {
    handleUpdate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack miw="45%" mb="md">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.firstName')
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.content.firstName'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.firstName && (
            <Text fz="xs" color="red">
              {formState.errors.firstName?.message}
            </Text>
          )}
        </Stack>

        <Stack mb="md" miw="45%">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.lastName')
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.content.lastName'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.lastName && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.lastName?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack mb="md" miw="45%">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.phone')
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.content.phone'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.phone && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.phone?.message}
            </Text>
          )}
        </Stack>

        <Stack mb="md" miw="45%">
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.mobile')
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.content.mobile'
                )}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.mobile && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.mobile?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack mb="md" miw="45%">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.email')
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.content.email'
                )}
                withAsterisk
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.email && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.email?.message}
            </Text>
          )}
        </Stack>

        <Stack mb="md" miw="45%">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                radius="sm"
                label={t(
                  'profileView.dataCard.tabs.personalData.content.language'
                )}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.content.language')
                )}
                data={[
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'English' },
                ]}
              />
            )}
          />

          {formState.errors.locale && (
            <Text mt={4} ml={5} fz="xs" color="red">
              {formState.errors.locale?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Button type="submit" mt="md" variant="light">
        {t('profileView.dataCard.tabs.personalData.content.saveChanges')}
      </Button>
    </form>
  )
}
