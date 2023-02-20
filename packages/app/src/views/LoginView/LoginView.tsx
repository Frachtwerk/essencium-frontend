import { Login, LoginForm } from 'lib'
import { useEffect, useState } from 'react'

import { useCreateToken } from '@/api/auth'

export function LoginView(): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { mutate } = useCreateToken(username, password)

  function handleLogin(name: string, pw: string): void {
    setUsername(() => name)
    setPassword(() => pw)
  }

  useEffect(() => {
    if (username && password) mutate()
  }, [username, password, mutate])

  return <Login form={<LoginForm handleLogin={handleLogin} />} />
}
