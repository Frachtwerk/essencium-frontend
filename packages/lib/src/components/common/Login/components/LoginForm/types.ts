export type LoginCredentials = {
  email: string
  password: string
  rememberUser: boolean
}

export type LoginFormProps = {
  loginCredentials: LoginCredentials
}
