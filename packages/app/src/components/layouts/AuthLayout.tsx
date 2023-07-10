import { AuthLayout, logout } from '@frachtwerk/essencium-lib'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

import { useGetMe } from '@/api/me'

import packageJson from '../../../package.json'

type Props = {
  children: React.ReactNode
  routeName?: string
}

function AuthLayoutView({ children, routeName }: Props): JSX.Element | null {
  const router = useRouter()

  function handleLogout(): void {
    logout()

    router.push('/login')
  }

  const pageTitle = `${routeName ? `${routeName} -` : ''} Essencium`

  return (
    <AuthLayout
      version={packageJson.version}
      logout={handleLogout}
      useGetMe={useGetMe}
    >
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </AuthLayout>
  )
}

export default AuthLayoutView
