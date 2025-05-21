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
  MultiSelect,
  PasswordInput,
  Select,
  Switch,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import { type JSX, useState } from 'react'
import {
  Control,
  Controller,
  FormState,
  UseFormSetValue,
} from 'react-hook-form'

import { PasswordStrengthIndicator } from '../PasswordStrengthIndicator/PasswordStrengthIndicator'
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
  rolesEnabledForSsoUser?: boolean
  isUpdate?: boolean
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
  isUpdate = false,
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
      <Flex align="center" className={classes['userForm__header']}>
        <Title order={3}>{title}</Title>

        {isSso ? (
          <Badge className={classes['userForm__ssoBadge']} variant="light">
            {ssoProvider}
          </Badge>
        ) : null}
      </Flex>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.firstName?.message &&
                  t(formState.errors.firstName.message)
                }
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.lastName?.message &&
                  t(formState.errors.lastName.message)
                }
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.email?.message &&
                  t(formState.errors.email.message)
                }
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <PasswordStrengthIndicator passwordValue={passwordValue}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <Input.Label>
                    <Flex gap={5}>
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
                          <IconInfoCircle
                            size={20}
                            className={
                              classes['set-password-form__password-tooltip']
                            }
                          />
                        </Tooltip>
                      ) : null}
                    </Flex>
                  </Input.Label>

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
                    styles={{
                      description: {
                        color: 'red',
                      },
                    }}
                    description={
                      field.value
                        ? t('addUpdateUserView.form.passwordWarning')
                        : ''
                    }
                    inputWrapperOrder={[
                      'label',
                      'input',
                      'description',
                      'error',
                    ]}
                    error={
                      formState.errors?.password?.message &&
                      t(formState.errors.password.message)
                    }
                  />
                </>
              )}
            />
          </PasswordStrengthIndicator>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.phone?.message &&
                  t(formState.errors.phone.message)
                }
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.mobile?.message &&
                  t(formState.errors.mobile.message)
                }
              />
            )}
          />
        </Grid.Col>
      </Grid>

      <Title className={classes['userForm__newSection--margin-lg']} order={3}>
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
                className={classes['userForm__enableToggle']}
                label={t('addUpdateUserView.form.activeStatus')}
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.locale?.message &&
                  t(formState.errors.locale.message)
                }
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
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
                error={
                  formState.errors?.roles?.message &&
                  t(formState.errors.roles.message)
                }
              />
            )}
          />
        </Grid.Col>
      </Grid>

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
