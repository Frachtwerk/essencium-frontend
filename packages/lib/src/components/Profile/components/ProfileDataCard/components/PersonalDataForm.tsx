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
import {
  Box,
  Button,
  Flex,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type JSX, useEffect } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../../../../hooks'

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
    formState,
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
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 'xs', sm: 'md' }}
        justify={{ sm: 'space-between' }}
      >
        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t(
                    'profileView.dataCard.tabs.personalData.placeholder.firstName',
                  ),
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.label.firstName',
                )}
                size="sm"
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

        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t(
                    'profileView.dataCard.tabs.personalData.placeholder.lastName',
                  ),
                )}
                label={t(
                  'profileView.dataCard.tabs.personalData.label.lastName',
                )}
                size="sm"
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
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        className="mt-xs"
      >
        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.placeholder.phone'),
                )}
                label={t('profileView.dataCard.tabs.personalData.label.phone')}
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

        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder={String(
                  t(
                    'profileView.dataCard.tabs.personalData.placeholder.mobile',
                  ),
                )}
                label={t('profileView.dataCard.tabs.personalData.label.mobile')}
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

      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'md' }}
        justify={{ sm: 'space-between' }}
        className="mt-xs"
      >
        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                disabled={isSso}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.placeholder.email'),
                )}
                label={t('profileView.dataCard.tabs.personalData.label.email')}
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

        <Stack className="w-[45%] max-md:w-full">
          <Controller
            name="locale"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                radius="sm"
                allowDeselect={false}
                label={t(
                  'profileView.dataCard.tabs.personalData.label.language',
                )}
                placeholder={String(
                  t('profileView.dataCard.tabs.personalData.label.language'),
                )}
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
      </Flex>

      <Button type="submit" className="mt-md" loading={isLoading}>
        {t('profileView.dataCard.tabs.personalData.saveChanges')}
      </Button>
    </form>
  )
}
