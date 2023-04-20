import {
  Button,
  Flex,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useEffect, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import { i18n } from 'translations'
import { RoleOutput, UserInput, userInputSchema, UserOutput } from 'types'

import { useZodForm } from '../../hooks'

const { t } = i18n

type Props = {
  title: string
  userToEdit?: UserOutput
  roles: RoleOutput[]
  handleForm: (data: UserInput) => void
}

export function UserForm({
  title,
  roles,
  handleForm,
  userToEdit,
}: Props): JSX.Element {
  const DEFAULT_VALUES = useMemo(
    () => ({
      firstName: userToEdit?.firstName || '',
      lastName: userToEdit?.lastName || '',
      phone: userToEdit?.phone || '',
      mobile: userToEdit?.mobile || '',
      email: userToEdit?.email || '',
      password: '',
      enabled: userToEdit?.enabled || true,
      locale: userToEdit?.locale || 'de',
      role: userToEdit?.role?.id || undefined,
    }),
    [userToEdit]
  )

  const { handleSubmit, control, formState, setValue, reset } = useZodForm({
    schema: userInputSchema,
    defaultValues: DEFAULT_VALUES,
  })

  useEffect(() => {
    if (userToEdit) {
      reset(DEFAULT_VALUES)
    }
  }, [userToEdit, reset, DEFAULT_VALUES])

  function onSubmit(user: UserInput): void {
    handleForm(user)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title order={3} mb="lg">
        {title}
      </Title>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('addUserView.form.firstName'))}
                label={t('addUserView.form.firstName')}
                size="sm"
                variant="filled"
                radius="sm"
                withAsterisk
              />
            )}
          />

          {formState.errors.firstName && (
            <Text fz="xs" color="red">
              {formState.errors.firstName?.message}
            </Text>
          )}
        </Stack>

        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('addUserView.form.lastName'))}
                label={t('addUserView.form.lastName')}
                size="sm"
                variant="filled"
                radius="sm"
                withAsterisk
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
        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('addUserView.form.email'))}
                label={t('addUserView.form.email')}
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

        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                placeholder={String(t('addUserView.form.password'))}
                label={t('addUserView.form.password')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.password && (
            <Text fz="xs" color="red">
              {formState.errors.password?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack mb="md" miw="45%" spacing="xs">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('addUserView.form.phone'))}
                label={t('addUserView.form.phone')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.phone && (
            <Text fz="xs" color="red">
              {formState.errors.phone?.message}
            </Text>
          )}
        </Stack>

        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(t('addUserView.form.mobile'))}
                label={t('addUserView.form.mobile')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          {formState.errors.mobile && (
            <Text fz="xs" color="red">
              {formState.errors.mobile?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Title mt="lg" order={3}>
        {t('addUserView.form.userSettingsHeading')}
      </Title>

      <Controller
        name="enabled"
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value}
            value={String(field.value)}
            color="blue"
            size="md"
            mt="sm"
            label={t('addUserView.form.status')}
          />
        )}
      />

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'space-between' }}
        mt="lg"
      >
        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                radius="sm"
                withAsterisk
                label={t('addUserView.form.language')}
                placeholder={String(t('addUserView.form.language'))}
                data={[
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'English' },
                ]}
              />
            )}
          />

          {formState.errors.locale && (
            <Text fz="xs" color="red">
              {formState.errors.locale?.message}
            </Text>
          )}
        </Stack>

        <Stack miw="45%" mb="md" spacing="xs">
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={String(field.value)}
                onChange={newVal => setValue(field.name, Number(newVal))}
                radius="sm"
                label={t('addUserView.form.role')}
                placeholder={String(t('addUserView.form.role'))}
                data={(roles || []).map(role => ({
                  value: String(role.id),
                  label: role.name,
                }))}
                withAsterisk
              />
            )}
          />

          {formState.errors.role && (
            <Text fz="xs" color="red">
              {formState.errors.role?.message}
            </Text>
          )}
        </Stack>
      </Flex>

      <Button type="submit" mt="md">
        {t('addUserView.form.save')}
      </Button>
    </form>
  )
}
