import { showNotification } from '@mantine/notifications'
import { useNavigate } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { Login, LoginForm } from 'lib'

import { useCreateToken } from '@/api/auth'

export function LoginView(): JSX.Element {
  const navigate = useNavigate()

  const { mutate } = useCreateToken()

  function handleLogin(username: string, password: string): void {
    mutate(
      { username, password },
      {
        onSuccess: () => navigate({ to: '/' }),
        onError: (data: AxiosError) => {
          showNotification({
            autoClose: 4000,
            title: 'We are sorry! Your login was not successful.',
            message: data.message,
            color: 'red',
            style: { position: 'fixed', top: '20px', right: '10px' },
          })
        },
      }
    )
  }

  return <Login form={<LoginForm handleLogin={handleLogin} />} />
}
