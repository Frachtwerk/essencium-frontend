export type LoginFormProps = {
  loginCredentials: LoginCredentials
}

export type LoginCredentials = {
  email: string
  password: string
  rememberUser: boolean
}
