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
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from 'react-hook-form'
import { i18n } from 'translations'
import { RoleOutput, UserInput, UserUpdate } from 'types'

type Props = {
  title: string
  roles: RoleOutput[]
  control: Control<UserInput | UserUpdate>
  formState: FormState<UserInput | UserUpdate>
  setValue: UseFormSetValue<UserInput | UserUpdate>
  onSubmit: () => void
}

export function UserForm({
  title,
  roles,
  control,
  formState,
  setValue,
  onSubmit,
}: Props): JSX.Element {
  const { t } = i18n

  return (
    <form onSubmit={onSubmit}>
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
                placeholder={String(t('addUpdateUserView.form.firstName'))}
                label={t('addUpdateUserView.form.firstName')}
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
                placeholder={String(t('addUpdateUserView.form.lastName'))}
                label={t('addUpdateUserView.form.lastName')}
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
                placeholder={String(t('addUpdateUserView.form.email'))}
                label={t('addUpdateUserView.form.email')}
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
                placeholder={String(t('addUpdateUserView.form.password'))}
                label={t('addUpdateUserView.form.password')}
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
                placeholder={String(t('addUpdateUserView.form.phone'))}
                label={t('addUpdateUserView.form.phone')}
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
                placeholder={String(t('addUpdateUserView.form.mobile'))}
                label={t('addUpdateUserView.form.mobile')}
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
        {t('addUpdateUserView.form.userSettingsHeading')}
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
            label={t('addUpdateUserView.form.status')}
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
                label={t('addUpdateUserView.form.language')}
                placeholder={String(t('addUpdateUserView.form.language'))}
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
                label={t('addUpdateUserView.form.role')}
                placeholder={String(t('addUpdateUserView.form.role'))}
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
        {t('addUpdateUserView.form.save')}
      </Button>
    </form>
  )
}
