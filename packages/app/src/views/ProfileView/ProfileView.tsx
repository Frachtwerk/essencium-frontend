import { Profile, UpdatedUserData } from 'lib'

import { useGetUser, useUpdatePassword, useUpdateUser } from '@/api/me'
import { useGetRoles } from '@/api/roles'

export function ProfileView(): JSX.Element {
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: updatePassword } = useUpdatePassword()

  useGetUser()
  const { data: rolesRequest } = useGetRoles()
  const roles = rolesRequest?.content || []

  function getSavedUser(): any {
    const savedUser = localStorage.getItem('user')
    if (savedUser != null) {
      return JSON.parse(savedUser)
    }
    return {}
  }

  const user = getSavedUser()

  function handleUpdate(data: UpdatedUserData): void {
    updateUser(data)
  }
  function handlePasswordUpdate(password: string, verification: string): void {
    updatePassword({ password, verification })
  }

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
