import { Center, Loader } from '@mantine/core'
import { Profile } from 'lib'
import { useTranslation } from 'react-i18next'
import { PasswordChange, UserUpdate } from '@frachtwerk/types'

import { useGetMe, useUpdateMe, useUpdatePassword } from '@/api/me'
import { useGetRoles } from '@/api/roles'
import { logout } from '@/utils/logout'

export function ProfileView(): JSX.Element {
  const { t } = useTranslation()

  const { data: user, isLoading: isLoadingUser } = useGetMe()

  const { mutate: updateUser } = useUpdateMe()

  const { mutate: updatePassword } = useUpdatePassword()

  const { data: rolesRequest } = useGetRoles({ page: 0, size: 9999 })

  const roles = rolesRequest?.content || []

  function handleUpdate(data: UserUpdate): void {
    updateUser(data)
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
