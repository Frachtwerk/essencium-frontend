/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  RoleOutput,
  UserInput,
  UserSource,
  UserUpdate,
} from '@frachtwerk/essencium-types'
import {
  Badge,
  Box,
  Button,
  Flex,
  MultiSelect,
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

import classes from './UserForm.module.css'

type Props = {
  ssoProvider?: UserSource | string | undefined
  title: string
  roles: RoleOutput[]
  control: Control<UserInput | UserUpdate>
  formState: FormState<UserInput | UserUpdate>
  setValue: UseFormSetValue<UserInput | UserUpdate>
  onSubmit: () => void
  isLoading: boolean
}

export function UserForm({
  ssoProvider,
  title,
  roles,
  control,
  formState,
  onSubmit,
  isLoading,
}: Props): JSX.Element {
  const isSso = Boolean(ssoProvider && ssoProvider !== UserSource.LOCAL)

  const { t } = useTranslation()

  const rolesData = roles.map(role => {
    return { value: role.name, label: role.name }
  })

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" className={classes['userForm__header']}>
        <Title order={3}>{title}</Title>

        {isSso ? (
          <Badge className={classes['userForm__ssoBadge']} variant="light">
            {ssoProvider}
          </Badge>
        ) : null}
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.firstName'),
                )}
                label={t('addUpdateUserView.form.firstName')}
                size="sm"
                variant="filled"
                radius="sm"
                withAsterisk
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.firstName && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.firstName?.message
                  ? String(t(formState.errors.firstName.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.lastName'),
                )}
                label={t('addUpdateUserView.form.lastName')}
                size="sm"
                variant="filled"
                radius="sm"
                withAsterisk
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.lastName && (
              <Text className={classes['userForm__errorText']}>
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
        className={classes['userForm__newSection--margin-xs']}
      >
        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.email'),
                )}
                label={t('addUpdateUserView.form.email')}
                withAsterisk
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.email && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.email?.message
                  ? String(t(formState.errors.email.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.password'),
                )}
                label={t('addUpdateUserView.form.password')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.password && (
              <Text className={classes['userForm__errorText']}>
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
        className={classes['userForm__newSection--margin-xs']}
      >
        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.phone'),
                )}
                label={t('addUpdateUserView.form.phone')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.phone && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.phone?.message
                  ? String(t(formState.errors.phone.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('addUpdateUserView.form.placeholder.mobile'),
                )}
                label={t('addUpdateUserView.form.mobile')}
                size="sm"
                variant="filled"
                radius="sm"
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.mobile && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.mobile?.message
                  ? String(t(formState.errors.mobile.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Title className={classes['userForm__newSection--margin-lg']} order={3}>
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
            className={classes['userForm__enableToggle']}
            label={t('addUpdateUserView.form.status')}
          />
        )}
      />

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        className={classes['userForm__newSection--margin-sm']}
      >
        <Stack className={classes['userForm__inputContainer']}>
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

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.locale && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.locale?.message
                  ? String(t(formState.errors.locale.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className={classes['userForm__inputContainer']}>
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                disabled={isSso}
                radius="sm"
                label={t('addUpdateUserView.form.role')}
                data={rolesData}
                withAsterisk
                searchable
                hidePickedOptions
              />
            )}
          />

          <Box className={classes['userForm__errorContainer']}>
            {formState.errors.roles && (
              <Text className={classes['userForm__errorText']}>
                {formState.errors.roles?.message
                  ? String(t(formState.errors.roles.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Button
        type="submit"
        className={classes['userForm__saveButton']}
        loading={isLoading}
      >
        {t('addUpdateUserView.form.save')}
      </Button>
    </form>
  )
}
