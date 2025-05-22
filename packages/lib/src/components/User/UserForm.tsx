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

'use client'

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
  Group,
  MultiSelect,
  PasswordInput,
  Select,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from 'react-hook-form'

type Props = {
  ssoProvider?: UserSource | string | undefined
  title: string
  roles: RoleOutput[]
  control: Control<UserInput | UserUpdate>
  formState: FormState<UserInput | UserUpdate>
  setValue: UseFormSetValue<UserInput | UserUpdate>
  onSubmit: () => void
  isLoading: boolean
  rolesEnabledForSsoUser?: boolean
}

export function UserForm({
  ssoProvider,
  title,
  roles,
  control,
  formState,
  onSubmit,
  isLoading,
  rolesEnabledForSsoUser = false,
}: Props): JSX.Element {
  const isSso = Boolean(ssoProvider && ssoProvider !== UserSource.LOCAL)

  const { t } = useTranslation()

  const pathname = usePathname()

  const isAddUserForm = pathname.endsWith('add')

  const rolesData = roles.map(role => {
    return { value: role.name, label: role.name }
  })

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" className="mb-lg">
        <Title order={3}>{title}</Title>

        {isSso ? (
          <Badge className="ml-[10px]" variant="light">
            {ssoProvider}
          </Badge>
        ) : null}
      </Flex>

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack className="min-w-[45%]">
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
                withAsterisk
              />
            )}
          />

          <Box>
            {formState.errors.firstName && (
              <Text>
                {formState.errors.firstName?.message
                  ? String(t(formState.errors.firstName.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className="min-w-[45%]">
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
                withAsterisk
              />
            )}
          />

          <Box>
            {formState.errors.lastName && (
              <Text>
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
        className="mt-xs"
      >
        <Stack className="min-w-[45%]">
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
              />
            )}
          />

          <Box>
            {formState.errors.email && (
              <Text>
                {formState.errors.email?.message
                  ? String(t(formState.errors.email.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className="min-w-[45%]">
          <Group align="vertical" className="gap-0.4rem mb-[0.8rem]">
            <Text className="text-sm font-medium">
              {t('addUpdateUserView.form.password')}
            </Text>

            {isAddUserForm ? (
              <Tooltip
                label={t('addUpdateUserView.form.passwordTooltip')}
                position="right"
                withArrow
                multiline
                bg=" var(--mantine-color-gray-6)"
                w="250px"
              >
                <IconInfoCircle size={20} />
              </Tooltip>
            ) : null}
          </Group>

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
                size="sm"
                styles={{
                  description: {
                    color: 'red',
                  },
                }}
                description={
                  field.value ? t('addUpdateUserView.form.passwordWarning') : ''
                }
                inputWrapperOrder={['label', 'input', 'description', 'error']}
              />
            )}
          />

          <Box>
            {formState.errors.password && (
              <Text>
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
        className="mt-xs"
      >
        <Stack className="min-w-[45%]">
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
              />
            )}
          />

          <Box>
            {formState.errors.phone && (
              <Text>
                {formState.errors.phone?.message
                  ? String(t(formState.errors.phone.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className="min-w-[45%]">
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
              />
            )}
          />

          <Box>
            {formState.errors.mobile && (
              <Text>
                {formState.errors.mobile?.message
                  ? String(t(formState.errors.mobile.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Title className="mt-lg" order={3}>
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
            size="md"
            className="mt-sm"
            label={t('addUpdateUserView.form.activeStatus')}
          />
        )}
      />

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        className="mt-sm"
      >
        <Stack className="min-w-[45%]">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                withAsterisk
                allowDeselect={false}
                label={t('addUpdateUserView.form.language')}
                placeholder={String(t('addUpdateUserView.form.language'))}
                data={[
                  { value: 'de', label: 'Deutsch' },
                  { value: 'en', label: 'English' },
                ]}
              />
            )}
          />

          <Box>
            {formState.errors.locale && (
              <Text>
                {formState.errors.locale?.message
                  ? String(t(formState.errors.locale.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>

        <Stack className="min-w-[45%]">
          <Controller
            name="roles"
            control={control}
            render={({ field }) => (
              <MultiSelect
                {...field}
                disabled={isSso && !rolesEnabledForSsoUser}
                label={t('addUpdateUserView.form.role')}
                data={rolesData}
                withAsterisk
                searchable
                hidePickedOptions
              />
            )}
          />

          <Box>
            {formState.errors.roles && (
              <Text>
                {formState.errors.roles?.message
                  ? String(t(formState.errors.roles.message))
                  : null}
              </Text>
            )}
          </Box>
        </Stack>
      </Flex>

      <Button type="submit" className="mt-md" loading={isLoading}>
        {t('addUpdateUserView.form.save')}
      </Button>
    </form>
  )
}
