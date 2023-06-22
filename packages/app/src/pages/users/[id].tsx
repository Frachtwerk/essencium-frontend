import { UserForm, useZodForm } from '@frachtwerk/essencium-lib'
import { UserUpdate, userUpdateSchema } from '@frachtwerk/essencium-types'
import { Card, Flex, Text, Title } from '@mantine/core'
import { IconUserPlus } from '@tabler/icons-react'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

import { axiosInstance, useGetUser, UsersResponse, useUpdateUser } from '@/api'
import { useGetRoles } from '@/api/roles'
import AuthLayout from '@/components/layouts/AuthLayout'
import { FORM_DEFAULTS } from '@/pages/users'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'

function UpdateUserView(): JSX.Element {
  const router = useRouter()

  const { t } = useTranslation()

  const userIdParameter = router.query?.id

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
        router.push('/users')
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

UpdateUserView.getLayout = function getLayout(
  page: React.ReactNode
): JSX.Element {
  return <AuthLayout>{page}</AuthLayout>
}

export const getStaticProps = baseGetStaticProps()

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: tokenData } = await axiosInstance.post('/auth/token', {
    username: 'admin@frachtwerk.de',
    password: 'adminAdminAdmin',
  })

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
        id: user.id as unknown as string,
      },
    })),
    fallback: true,
  }
}

export default UpdateUserView
