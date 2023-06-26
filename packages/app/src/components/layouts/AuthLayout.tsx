import { AuthLayout } from '@frachtwerk/essencium-lib'
import { useRouter } from 'next/router'
import React from 'react'

import { useGetMe } from '@/api/me'
import { logout } from '@/utils/logout'

import packageJson from '../../../package.json'

type Props = {
  children: React.ReactNode
}

function AuthLayoutView({ children }: Props): JSX.Element | null {
  const router = useRouter()

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  return (
    <AuthLayout
      version={packageJson.version}
      logout={handleLogout}
      useGetMe={useGetMe}
    >
      {children}
    </AuthLayout>
  )
}

export default AuthLayoutView
