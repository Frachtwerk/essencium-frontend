import { Login, LoginForm } from 'lib'

export function LoginView(): JSX.Element {
  return <Login form={<LoginForm />} />
}
