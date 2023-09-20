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
  getTranslation,
  useCreateUser,
  useGetRoles,
  UserForm,
  useZodForm,
} from '@frachtwerk/essencium-lib'
import { UserInput, userInputSchema } from '@frachtwerk/essencium-types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import AuthLayout from '@/components/layouts/AuthLayout'
import { FORM_DEFAULTS } from '@/pages/users'
import { baseGetStaticProps } from '@/utils/next'

function AddUserView(): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const { handleSubmit, control, formState, setValue } = useZodForm({
    schema: userInputSchema,
    defaultValues: FORM_DEFAULTS,
  })

  const { mutate: addUser } = useCreateUser()

  const { data: rolesResponse } = useGetRoles({
    page: 0,
    size: 9999,
  })

  const roles = rolesResponse?.content || []

  function handleAddUser(user: UserInput): void {
    addUser(user, {
      onSuccess: () => {
        router.push('/users')
      },
    })
  }

  const onSubmit = handleSubmit(handleAddUser)

  return (
    <>
      <Title py="md" order={2}>
        <Flex>
          <IconUserPlus size="32" />

          <Text ml="xs">{t('addUpdateUserView.add.title')}</Text>
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

AddUserView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <AuthLayout routeName={getTranslation('addUpdateUserView.add.title')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default AddUserView
