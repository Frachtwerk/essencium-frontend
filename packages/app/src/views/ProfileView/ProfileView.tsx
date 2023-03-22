import { Center, Loader } from '@mantine/core'
import { Profile, UpdatedUserData } from 'lib'
import { useTranslation } from 'react-i18next'

import { useGetUser, useUpdatePassword, useUpdateUser } from '@/api/me'
import { useGetRoles } from '@/api/roles'

export function ProfileView(): JSX.Element {
  const { data: user, isLoading: isLoadingUser } = useGetUser()
  const { t } = useTranslation()
  const { mutate: updateUser } = useUpdateUser()

  const { mutate: updatePassword } = useUpdatePassword()

  const { data: rolesRequest } = useGetRoles()

  const roles = rolesRequest?.content || []

  function handleUpdate(data: UpdatedUserData): void {
    updateUser(data)
  }

  function handlePasswordUpdate(password: string, verification: string): void {
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
        user={{
          lastName: user.lastName,
          firstName: user.firstName,
          id: user.id,
          email: user.email,
          phone: user.phone,
          mobile: user.mobile,
          locale: user.locale,
          role: {
            id: user.role.id,
            name: user.role.name,
          },
          enabled: user.enabled,
        }}
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
