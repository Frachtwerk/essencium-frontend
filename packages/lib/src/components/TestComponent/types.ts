import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  username: z.string().optional(),
})

export type User = z.infer<typeof userSchema>

export type UserProps = {
  users: User[]
  shouldLoadApiUsers?: boolean
}
