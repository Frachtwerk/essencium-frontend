import { Center, Loader } from '@mantine/core'
import { Profile } from 'lib'
import { useTranslation } from 'react-i18next'
import { PasswordChange, UserInput } from 'types'

import { useGetUser, useUpdatePassword, useUpdateUser } from '@/api/me'
import { useGetRoles } from '@/api/roles'

export function ProfileView(): JSX.Element {
  const { t } = useTranslation()

  const { data: user, isLoading: isLoadingUser } = useGetUser()

  const { mutate: updateUser } = useUpdateUser()

  const { mutate: updatePassword } = useUpdatePassword()

  const { data: rolesRequest } = useGetRoles()

  const roles = rolesRequest?.content || []

  function handleUpdate(data: UserInput): void {
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
          console.log('logging out')
          // logout function invokations that is implemented in #191
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
