type LoginCredentials = {
  username: string
  password: string
}

type TokenResponse = {
  token: string
}

type SetPasswordRequest = {
  password: string
  resetToken: string
}

export type { LoginCredentials, SetPasswordRequest, TokenResponse }
