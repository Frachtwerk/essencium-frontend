import { UserForm, useZodForm } from '@frachtwerk/lib'
import { UserUpdate, userUpdateSchema } from '@frachtwerk/types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetUser, useUpdateUser } from '@/api'
import { useGetRoles } from '@/api/roles'
import { FORM_DEFAULTS } from '@/views/UsersView/UsersView'

export function UpdateUserView(): JSX.Element {
  const { t } = useTranslation()

  const navigate = useNavigate()

  const { userId: userIdParameter }: { userId: string } = useParams()

  const { data: user } = useGetUser(Number(userIdParameter))

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
        role: user.role.id,
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
        navigate({ to: '../' })
      },
    })
  }

  const onSubmit = handleSubmit(handleUpdateUser)

  return (
    <>
      <Title py="md" order={2}>
        <Flex>
          <IconUserPlus size="32" />

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
