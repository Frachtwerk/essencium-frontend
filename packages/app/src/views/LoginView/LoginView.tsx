import { CommonLogin, LoginForm } from 'lib'

export function LoginView(): JSX.Element {
  return (
    <CommonLogin
      form={
        <LoginForm
          loginCredentials={{
            email: '',
            password: '',
            rememberUser: false,
          }}
        />
      }
    />
  )
}
