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
  UserOutput,
  UserUpdate,
  userUpdateSchema,
} from '@frachtwerk/essencium-types'
import { Button, Grid } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type JSX, useEffect } from 'react'

import { useZodForm } from '../../../../../hooks'
import { ControlledSelect, ControlledTextInput } from '../../../../Form'
import classes from './PersonalDataForm.module.css'

type Props = {
  isSso: boolean
  user: UserOutput
  handleUpdate: (data: UserUpdate) => void
  isLoading: boolean
}

export function PersonalDataForm({
  isSso,
  user,
  handleUpdate,
  isLoading,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    reset: resetAndFillForm,
  } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      mobile: '',
      email: '',
      password: '',
      enabled: true,
      locale: 'de',
      roles: [],
    },
  })

  useEffect(() => {
    if (user) {
      const parsedUser = userUpdateSchema.parse({
        ...user,
        roles: user.roles.map(role => role.name),
        enabled: true,
      })

      resetAndFillForm({ ...parsedUser })
    }
  }, [user, resetAndFillForm])

  function onSubmit(updatedUser: UserUpdate): void {
    handleUpdate(updatedUser)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid gutter="xs">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="firstName"
            control={control}
            disabled={isSso}
            placeholder={String(
              t('profileView.dataCard.tabs.personalData.placeholder.firstName'),
            )}
            label={t('profileView.dataCard.tabs.personalData.label.firstName')}
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
              t('profileView.dataCard.tabs.personalData.placeholder.lastName'),
            )}
            label={t('profileView.dataCard.tabs.personalData.label.lastName')}
            size="sm"
            withAsterisk
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="phone"
            control={control}
            placeholder={String(
              t('profileView.dataCard.tabs.personalData.placeholder.phone'),
            )}
            label={t('profileView.dataCard.tabs.personalData.label.phone')}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <ControlledTextInput
            name="mobile"
            control={control}
            placeholder={String(
              t('profileView.dataCard.tabs.personalData.placeholder.mobile'),
            )}
            label={t('profileView.dataCard.tabs.personalData.label.mobile')}
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <ControlledTextInput
            name="email"
            control={control}
            disabled={isSso}
            placeholder={String(
              t('profileView.dataCard.tabs.personalData.placeholder.email'),
            )}
            label={t('profileView.dataCard.tabs.personalData.label.email')}
            withAsterisk
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <ControlledSelect
            name="locale"
            control={control}
            radius="sm"
            allowDeselect={false}
            label={t('profileView.dataCard.tabs.personalData.label.language')}
            placeholder={String(
              t('profileView.dataCard.tabs.personalData.label.language'),
            )}
            data={[
              { value: 'de', label: 'Deutsch' },
              { value: 'en', label: 'English' },
            ]}
            withAsterisk
          />
        </Grid.Col>
      </Grid>

      <Button
        type="submit"
        className={classes['personal-data-form__button']}
        loading={isLoading}
      >
        {t('profileView.dataCard.tabs.personalData.saveChanges')}
      </Button>
    </form>
  )
}
