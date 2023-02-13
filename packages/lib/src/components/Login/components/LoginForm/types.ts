import { z } from 'zod'

export type LoginCredentials = {
  email: string
  password: string
  rememberUser: boolean
}

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), // TODO: check which backend validation is used
  rememberUser: z.boolean(),
})
