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
  Button,
  Flex,
  Grid,
  Input,
  PasswordInput,
  Switch,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import { type JSX, useState } from 'react'
import { Control, Controller, UseFormSetValue } from 'react-hook-form'

import {
  ControlledMultiSelect,
  ControlledSelect,
  ControlledTextInput,
  InputErrorStack,
} from '../Form'
import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator'

type Props = {
  ssoProvider?: UserSource | string | undefined
  title: string
  roles: RoleOutput[]
  control: Control<UserInput | UserUpdate>
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

  const [passwordValue, setPasswordValue] = useState<string | null>(null)

  return (
    <form onSubmit={onSubmit}>
      <Flex className="mb-lg items-center">
        <Title order={3}>{title}</Title>

        {isSso ? (
          <Badge className="ml-[10px]" variant="light">
            {ssoProvider}
          </Badge>
        ) : null}
      </Flex>

      <Grid gutter="xs">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="firstName"
            control={control}
            disabled={isSso}
            placeholder={String(
              t('addUpdateUserView.form.placeholder.firstName'),
            )}
            label={t('addUpdateUserView.form.firstName')}
            size="sm"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="lastName"
            control={control}
            disabled={isSso}
            placeholder={String(
              t('addUpdateUserView.form.placeholder.lastName'),
            )}
            label={t('addUpdateUserView.form.lastName')}
            size="sm"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="email"
            control={control}
            disabled={isSso}
            placeholder={String(t('addUpdateUserView.form.placeholder.email'))}
            label={t('addUpdateUserView.form.email')}
            withAsterisk
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => {
              let message = fieldState.error?.message

              if (!isAddUserForm && !message && field.value) {
                message = 'addUpdateUserView.form.passwordWarning'
              }

              return (
                <InputErrorStack message={message}>
                  <Input.Label>
                    <Flex className="gap-1">
                      {t('addUpdateUserView.form.password')}

                      {isAddUserForm ? (
                        <Tooltip
                          label={t('addUpdateUserView.form.passwordTooltip')}
                          position="right"
                          withArrow
                          multiline
                          bg=" var(--mantine-color-gray-6)"
                          w="250px"
                        >
                          <IconInfoCircle className="size-5" />
                        </Tooltip>
                      ) : null}
                    </Flex>
                  </Input.Label>

                  <PasswordStrengthIndicator
                    passwordValue={passwordValue}
                    offset={3}
                  >
                    <PasswordInput
                      {...field}
                      onChange={event => {
                        field.onChange(event)

                        setPasswordValue(event.target.value)
                      }}
                      disabled={isSso}
                      placeholder={String(
                        t('addUpdateUserView.form.placeholder.password'),
                      )}
                      size="sm"
                      error={fieldState.invalid}
                    />
                  </PasswordStrengthIndicator>
                </InputErrorStack>
              )
            }}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="phone"
            control={control}
            placeholder={String(t('addUpdateUserView.form.placeholder.phone'))}
            label={t('addUpdateUserView.form.phone')}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="mobile"
            control={control}
            placeholder={String(t('addUpdateUserView.form.placeholder.mobile'))}
            label={t('addUpdateUserView.form.mobile')}
            size="sm"
          />
        </Grid.Col>
      </Grid>

      <Title className="mt-lg" order={3}>
        {t('addUpdateUserView.form.userSettingsHeading')}
      </Title>

      <Grid>
        <Grid.Col>
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
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledSelect
            name="locale"
            control={control}
            withAsterisk
            allowDeselect={false}
            label={t('addUpdateUserView.form.language')}
            placeholder={String(t('addUpdateUserView.form.language'))}
            data={[
              { value: 'de', label: 'Deutsch' },
              { value: 'en', label: 'English' },
            ]}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledMultiSelect
            name="roles"
            control={control}
            disabled={isSso && !rolesEnabledForSsoUser}
            label={t('addUpdateUserView.form.role')}
            data={rolesData}
            searchable
            hidePickedOptions
          />
        </Grid.Col>
      </Grid>

      <Button type="submit" className="mt-md" loading={isLoading}>
        {t('addUpdateUserView.form.save')}
      </Button>
    </form>
  )
}
