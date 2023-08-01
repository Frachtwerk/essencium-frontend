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

import { getTranslation, UserForm, useZodForm } from '@frachtwerk/essencium-lib'
import { UserUpdate, userUpdateSchema } from '@frachtwerk/essencium-types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserEdit } from '@tabler/icons-react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { axiosInstance, useGetUser, UsersResponse, useUpdateUser } from '@/api'
import { useGetRoles } from '@/api/roles'
import AuthLayout from '@/components/layouts/AuthLayout'
import { FORM_DEFAULTS } from '@/pages/users'
import { baseGetStaticProps } from '@/utils/next'

function UpdateUserView(): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const userIdParameter = router.query?.id

  const { data: user } = useGetUser(String(userIdParameter))

  const {
    handleSubmit,
    control,
    formState,
    setValue,
    reset: prefillForm,
  } = useZodForm({
    schema: userUpdateSchema,
    defaultValues: FORM_DEFAULTS,
  })

  useEffect(() => {
    if (user) {
      const parsedUser = userUpdateSchema.parse({
        ...user,
        role: user.role.name,
      })

      prefillForm({ ...parsedUser })
    }
  }, [user, prefillForm])

  const { mutate: updateUser } = useUpdateUser()

  const { data: rolesResponse } = useGetRoles({
    page: 0,
    size: 9999,
  })

  const roles = rolesResponse?.content || []

  function handleUpdateUser(updatedUser: UserUpdate): void {
    updateUser(updatedUser, {
      onSuccess: () => {
        router.push('/users')
      },
    })
  }

  const onSubmit = handleSubmit(handleUpdateUser)

  return (
    <>
      <Title py="md" order={2}>
        <Flex>
          <IconUserEdit size="32" />

          <Text ml="xs">{t('addUpdateUserView.update.title')}</Text>
        </Flex>
      </Title>

      <Card shadow="sm" p="lg" radius="sm" withBorder maw="81.25rem">
        <UserForm
          title={t('addUpdateUserView.form.userDataHeading')}
          roles={roles}
          onSubmit={onSubmit}
          control={control}
          formState={formState}
          setValue={setValue}
        />
      </Card>
    </>
  )
}

UpdateUserView.getLayout = function getLayout(
  page: React.ReactNode
): JSX.Element {
  return (
    <AuthLayout routeName={getTranslation('addUpdateUserView.update.title')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: tokenData } = await axiosInstance.post(
    '/auth/token',
    {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    }
  )

  const { data: usersData } = await axiosInstance.get<UsersResponse>('/users', {
    params: {
      page: 0,
      size: 9999,
    },
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  })

  const users = usersData?.content || []

  return {
    paths: users.map(user => ({
      params: {
        id: String(user.id),
      },
    })),
    fallback: true,
  }
}

export default UpdateUserView
