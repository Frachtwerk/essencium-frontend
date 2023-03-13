import { useNavigate } from '@tanstack/react-router'
import { Login, LoginForm } from 'lib'

import { useCreateToken } from '@/api/auth'

export function LoginView(): JSX.Element {
  const navigate = useNavigate()

  const { mutate } = useCreateToken()

  function handleLogin(username: string, password: string): void {
    mutate(
      { username, password },
      {
        onSuccess: () => {
          navigate({ to: '/' })
        },
      }
    )
  }

  return <Login form={<LoginForm handleLogin={handleLogin} />} />
}
