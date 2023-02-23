import { atom, useAtom } from 'jotai'
import { Login, LoginForm } from 'lib'
import { useEffect } from 'react'

import { useCreateToken } from '@/api/auth'

const usernameAtom = atom('')
const passwordAtom = atom('')

export function LoginView(): JSX.Element {
  const [username, setUsername] = useAtom(usernameAtom)
  const [password, setPassword] = useAtom(passwordAtom)

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
