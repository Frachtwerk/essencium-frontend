import { Profile } from '@frachtwerk/essencium-lib'
import { PasswordChange, UserUpdate } from '@frachtwerk/essencium-types'
import { Center, Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'

import { useGetMe, useUpdateMe, useUpdatePassword } from '@/api/me'
import { useGetRoles } from '@/api/roles'
import Layout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'
import { logout } from '@/utils/logout'

function ProfileView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const { data: user, isLoading: isLoadingUser } = useGetMe()

  const { mutate: updateUser } = useUpdateMe()

  const { mutate: updatePassword } = useUpdatePassword()

  const { data: rolesRequest } = useGetRoles({ page: 0, size: 9999 })

  const roles = rolesRequest?.content || []

  function handleUpdate(updatedUser: UserUpdate): void {
    updateUser(updatedUser)

    router.push('/profile', undefined, { locale: updatedUser.locale })
  }

  function handlePasswordUpdate(
    password: PasswordChange['password'],
    verification: PasswordChange['password']
  ): void {
    updatePassword(
      { password, verification },
      {
        onSuccess: () => {
          logout()

          router.push('/login')
        },
      }
    )
  }

  if (user) {
    return (
      <Profile
        user={user}
        roles={roles}
        handleUpdate={handleUpdate}
        handlePasswordUpdate={handlePasswordUpdate}
      />
    )
  }

  if (isLoadingUser) {
    return (
      <Center h="100%">
        <Loader size="xl" name="loader" />
      </Center>
    )
  }

  return (
    <Center w="100%" h="100%">
      {t('profileView.userNotFound')}
    </Center>
  )
}

ProfileView.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps = baseGetStaticProps()

export default ProfileView
