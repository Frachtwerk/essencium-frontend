import { useNavigate } from '@tanstack/react-router'
import { Login, LoginForm } from 'lib'
import { useEffect } from 'react'

import { tokenAtom, useCreateToken } from '@/api/auth'
import { store } from '@/store'

export function LoginView(): JSX.Element {
  const navigate = useNavigate()

  const { mutate } = useCreateToken()

  const token = store.get(tokenAtom)

  function handleLogin(username: string, password: string): void {
    mutate({ username, password })
  }

  useEffect(() => {
    if (token) navigate({ to: '/' })
  }, [token, navigate])

  return <Login form={<LoginForm handleLogin={handleLogin} />} />
}
