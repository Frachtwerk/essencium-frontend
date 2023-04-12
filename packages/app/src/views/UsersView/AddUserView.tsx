import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { AddUserForm } from 'lib'
import { useTranslation } from 'react-i18next'
import { NewUserInput } from 'types'

import { useAddUser } from '@/api'
import { useGetRoles } from '@/api/roles'

export function AddUserView(): JSX.Element {
  const { t } = useTranslation()
  const { mutate: addUser } = useAddUser()

  const { data: rolesRequest } = useGetRoles()

  const roles = rolesRequest?.content || []

  function handleAddUser(data: NewUserInput): void {
    addUser(data)
  }

  return (
    <>
      <Title order={2} mb="lg">
        <Flex>
          <IconUserPlus size="32" />

          <Text ml="xs"> {t('addUserView.title')}</Text>
        </Flex>
      </Title>

      <Card shadow="sm" p="lg" radius="sm" withBorder maw="81.25rem">
        <AddUserForm roles={roles} handleAddUser={handleAddUser} />
      </Card>
    </>
  )
}
