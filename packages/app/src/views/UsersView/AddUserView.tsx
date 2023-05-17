import { UserForm, useZodForm } from '@frachtwerk/lib'
import { UserInput, userInputSchema } from '@frachtwerk/types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useCreateUser } from '@/api'
import { useGetRoles } from '@/api/roles'
import { FORM_DEFAULTS } from '@/views/UsersView/UsersView'

export function AddUserView(): JSX.Element {
  const { t } = useTranslation()

  const navigate = useNavigate()

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
        navigate({ to: '../' })
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
