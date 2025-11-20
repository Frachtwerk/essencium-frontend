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

import { UserForm, useZodForm } from '@frachtwerk/essencium-lib'
import { UserInput, userInputSchema } from '@frachtwerk/essencium-types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserEdit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { type JSX, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetRoles, useGetUser, useUpdateUser } from '@/api'

import { FORM_DEFAULTS_USERS_VIEW } from '../UsersView'

export default function UpdateUserView({
  params,
}: {
  params: { id: number }
}): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const { data: user } = useGetUser(Number(params.id))

  const ssoProvider = user?.source

  const {
    handleSubmit,
    control,
    setValue,
    reset: resetAndFillForm,
  } = useZodForm({
    schema: userInputSchema,
    defaultValues: FORM_DEFAULTS_USERS_VIEW,
  })

  useEffect(() => {
    if (user) {
      const parsedUser = userInputSchema.parse({
        ...user,
        roles: user.roles.flatMap(role => role.name),
      })

      resetAndFillForm({ ...parsedUser })
    }
  }, [user, resetAndFillForm])

  const { mutate: updateUser, isPending } = useUpdateUser()

  const { data: rolesResponse } = useGetRoles({
    requestConfig: {
      page: 0,
      size: 9999,
    },
  })

  const roles = rolesResponse?.content || []

  function handleUpdateUser(updatedUser: UserInput): void {
    updateUser(updatedUser, {
      onSuccess: () => {
        router.push('/admin/users')
      },
    })
  }

  const onSubmit = handleSubmit(handleUpdateUser)

  return (
    <>
      <Title className="py-md" order={2}>
        <Flex>
          <IconUserEdit className="size-8" />

          <Text className="ml-xs">{t('addUpdateUserView.update.title')}</Text>
        </Flex>
      </Title>

      <Card withBorder className="p-lg max-w-[82.25rem] rounded-sm shadow-sm">
        <UserForm
          ssoProvider={ssoProvider}
          title={t('addUpdateUserView.form.userDataHeading')}
          roles={roles}
          onSubmit={onSubmit}
          control={control}
          setValue={setValue}
          isLoading={isPending}
        />
      </Card>
    </>
  )
}
