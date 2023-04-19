import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useParams } from '@tanstack/react-router'
import { UserForm } from 'lib'
import { useTranslation } from 'react-i18next'
import { UserInput } from 'types'

import { useGetRoles, useGetUser, useUpdateUser } from '@/api'

export function UpdateUserView(): JSX.Element {
  const { t } = useTranslation()

  const { userId: userIdParameter }: { userId: string } = useParams()

  const { data: user } = useGetUser(Number(userIdParameter))

  const { mutate: updateUser } = useUpdateUser()

  const { data: rolesRequest } = useGetRoles({
    page: 0,
    size: 9999,
  })

  const roles = rolesRequest?.content || []

  function handleUpdateUser(updatedUser: UserInput): void {
    updateUser({
      // workaround before refactoring Input/Output logic of API --> #263
      userId: Number(userIdParameter),
      user: { ...updatedUser, id: Number(userIdParameter) },
    })
  }

  return (
    <>
      <Title py="md" order={2}>
        <Flex>
          <IconUserPlus size="32" />

          <Text ml="xs">{t('updateUserView.title')}</Text>
        </Flex>
      </Title>

      <Card shadow="sm" p="lg" radius="sm" withBorder maw="81.25rem">
        <UserForm
          title={t('updateUserView.form.userDataHeading')}
          roles={roles}
          handleForm={handleUpdateUser}
          userToEdit={user}
        />
      </Card>
    </>
  )
}
