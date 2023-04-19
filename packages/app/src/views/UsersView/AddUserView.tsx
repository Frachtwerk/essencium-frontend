import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { UserForm } from 'lib'
import { useTranslation } from 'react-i18next'
import { UserInput } from 'types'

import { useCreateUser } from '@/api'
import { useGetRoles } from '@/api/roles'

export function AddUserView(): JSX.Element {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { mutate: addUser } = useCreateUser()

  const { data: rolesRequest } = useGetRoles({
    page: 0,
    size: 9999,
  })

  const roles = rolesRequest?.content || []

  function handleAddUser(data: UserInput): void {
    addUser(data, {
      onSuccess: () => {
        navigate({ to: '../' })
      },
    })
  }

  return (
    <>
      <Title py="md" order={2}>
        <Flex>
          <IconUserPlus size="32" />

          <Text ml="xs"> {t('addUserView.title')}</Text>
        </Flex>
      </Title>

      <Card shadow="sm" p="lg" radius="sm" withBorder maw="81.25rem">
        <UserForm
          title={t('addUserView.form.userDataHeading')}
          roles={roles}
          handleForm={handleAddUser}
        />
      </Card>
    </>
  )
}
