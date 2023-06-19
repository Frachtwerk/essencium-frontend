import { RoleOutput, UserInput, UserUpdate } from '@frachtwerk/essencium-types'
import {
  Box,
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
import { useTranslation } from 'next-i18next'
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from 'react-hook-form'

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
  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit}>
      <Title order={3} mb="lg">
        {title}
      </Title>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack miw="45%">
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
                placeholder={String(t('addUpdateUserView.form.lastName'))}
                label={t('addUpdateUserView.form.lastName')}
                size="sm"
                variant="filled"
                radius="sm"
                withAsterisk
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
                placeholder={String(t('addUpdateUserView.form.phone'))}
                label={t('addUpdateUserView.form.phone')}
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
                placeholder={String(t('addUpdateUserView.form.mobile'))}
                label={t('addUpdateUserView.form.mobile')}
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
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        mt="sm"
      >
        <Stack miw="45%">
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

        <Stack miw="45%">
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

          <Box mt="-0.6rem" h="0.8rem">
            {formState.errors.role && (
              <Text ml={5} fz="xs" color="red">
                {formState.errors.role?.message
                  ? String(t(formState.errors.role.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Button type="submit" mt="md">
        {t('addUpdateUserView.form.save')}
      </Button>
    </form>
  )
}
