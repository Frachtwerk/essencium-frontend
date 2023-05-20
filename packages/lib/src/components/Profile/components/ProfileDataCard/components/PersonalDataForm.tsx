import { i18n } from '@frachtwerk/essencium-translations'
import {
  UserOutput,
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
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

const { t } = i18n

type Props = {
  user: UserOutput
  handleUpdate: (data: UserUpdate) => void
}

export function PersonalDataForm({ user, handleUpdate }: Props): JSX.Element {
  const { handleSubmit, control, formState } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: { ...user, role: user.role.id },
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.firstName && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.firstName?.message}
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.lastName && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.lastName?.message}
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.phone && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.phone?.message}
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.mobile && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.mobile?.message}
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.email && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.email?.message}
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.locale && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.locale?.message}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Button type="submit" mt="md" variant="light">
        {t('profileView.dataCard.tabs.personalData.content.saveChanges')}
      </Button>
    </form>
  )
}
